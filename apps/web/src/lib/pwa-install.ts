type InstallChoiceEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

type PwaInstallSnapshot = {
  prompt: InstallChoiceEvent | null;
};

const initialSnapshot: PwaInstallSnapshot = { prompt: null };
let snapshot = initialSnapshot;
let initialized = false;
const subscribers = new Set<() => void>();

function publish(prompt: InstallChoiceEvent | null): void {
  if (snapshot.prompt === prompt) return;
  snapshot = { prompt };
  subscribers.forEach(subscriber => subscriber());
}

export function initPwaInstall(): void {
  if (initialized) return;
  initialized = true;

  window.addEventListener('beforeinstallprompt', event => {
    const choice = event as InstallChoiceEvent;
    if (typeof choice.prompt !== 'function' || !choice.userChoice) return;
    event.preventDefault();
    publish(choice);
  });
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
    if (snapshot.prompt === prompt) publish(null);
  }
}
