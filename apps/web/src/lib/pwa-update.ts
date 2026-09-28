import { registerSW } from 'virtual:pwa-register';

export type PwaUpdateSnapshot = {
  updateAvailable: boolean;
  offlineReady: boolean;
};

const initialSnapshot: PwaUpdateSnapshot = {
  updateAvailable: false,
  offlineReady: false,
};

let snapshot = initialSnapshot;
let initialized = false;
let updateServiceWorker: ((reloadPage?: boolean) => Promise<void>) | undefined;
let onNeedReload: (() => void) | undefined;
const subscribers = new Set<() => void>();

function publish(update: Partial<PwaUpdateSnapshot>) {
  const next = { ...snapshot, ...update };
  if (
    next.updateAvailable === snapshot.updateAvailable &&
    next.offlineReady === snapshot.offlineReady
  ) {
    return;
  }

  snapshot = next;
  subscribers.forEach(subscriber => subscriber());
}

export function initPwaUpdate(): void {
  if (initialized) return;
  initialized = true;

  updateServiceWorker = registerSW({
    immediate: true,
    onNeedRefresh() {
      publish({ updateAvailable: true });
    },
    onNeedReload() {
      const reload = onNeedReload;
      onNeedReload = undefined;
      reload?.();
    },
    onOfflineReady() {
      publish({ offlineReady: true });
    },
  });
}

export function subscribePwaUpdate(subscriber: () => void): () => void {
  subscribers.add(subscriber);
  return () => subscribers.delete(subscriber);
}

export function getPwaUpdateSnapshot(): PwaUpdateSnapshot {
  return snapshot;
}

export async function applyPwaUpdate(reload: () => void): Promise<void> {
  if (!updateServiceWorker || !snapshot.updateAvailable) return;
  onNeedReload = reload;
  try {
    await updateServiceWorker(true);
  } catch (error) {
    onNeedReload = undefined;
    throw error;
  }
}
