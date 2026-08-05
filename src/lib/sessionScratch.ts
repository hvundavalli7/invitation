import { weddingData } from "@/data/wedding";

const KEY = weddingData.scratchCard.sessionKey;

let revealed = false;
let didHydrate = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function subscribeScratchSession(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

export function getScratchSessionSnapshot() {
  if (!didHydrate) {
    didHydrate = true;
    try {
      revealed = sessionStorage.getItem(KEY) === "1";
    } catch {
      revealed = false;
    }
  }
  return revealed;
}

export function getScratchSessionServerSnapshot() {
  return false;
}

export function markScratchSessionRevealed() {
  revealed = true;
  didHydrate = true;
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    // ignore
  }
  emit();
}
