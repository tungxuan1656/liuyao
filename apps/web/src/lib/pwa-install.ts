type InstallChoiceEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

type PwaInstallSnapshot = {
  prompt: InstallChoiceEvent | null;
  installed: boolean;
};

const initialSnapshot: PwaInstallSnapshot = { prompt: null, installed: false };
let snapshot = initialSnapshot;
let initialized = false;
const subscribers = new Set<() => void>();

function publish(update: Partial<PwaInstallSnapshot>): void {
  const next = { ...snapshot, ...update };
  if (next.prompt === snapshot.prompt && next.installed === snapshot.installed) return;
  snapshot = next;
  subscribers.forEach(subscriber => {
    subscriber();
  });
}

export function initPwaInstall(): void {
  if (initialized) return;
  initialized = true;

  window.addEventListener('beforeinstallprompt', event => {
    const choice = event as InstallChoiceEvent;
    if (typeof choice.prompt !== 'function' || !choice.userChoice) return;
    event.preventDefault();
    publish({ prompt: choice });
  });

  window.addEventListener('appinstalled', () => publish({ prompt: null, installed: true }));
}

export function getPwaInstallSnapshot(): PwaInstallSnapshot {
  return snapshot;
}

export function subscribePwaInstall(subscriber: () => void): () => void {
  subscribers.add(subscriber);
  return () => subscribers.delete(subscriber);
}

export async function triggerPwaInstallPrompt(): Promise<'accepted' | 'dismissed' | null> {
  const prompt = snapshot.prompt;
  if (!prompt) return null;

  try {
    await prompt.prompt();
    return (await prompt.userChoice).outcome;
  } finally {
    if (snapshot.prompt === prompt) publish({ prompt: null });
  }
}
