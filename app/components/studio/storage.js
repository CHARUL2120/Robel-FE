export const STUDIO_SAVED_DESIGNS_KEY = 'robel-studio-saved-designs';
export const STUDIO_ADMIN_STATE_KEY = 'robel-studio-admin-state';

export function loadJsonStorage(key, fallbackValue) {
  if (typeof window === 'undefined') {
    return fallbackValue;
  }

  try {
    const rawValue = window.localStorage.getItem(key);

    if (!rawValue) {
      return fallbackValue;
    }

    return JSON.parse(rawValue);
  } catch {
    return fallbackValue;
  }
}

export function saveJsonStorage(key, value) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function encodeStudioConfig(config) {
  try {
    return typeof window === 'undefined'
      ? ''
      : window.btoa(JSON.stringify(config));
  } catch {
    return '';
  }
}

export function decodeStudioConfig(value) {
  if (!value || typeof window === 'undefined') {
    return null;
  }

  try {
    return JSON.parse(window.atob(value));
  } catch {
    return null;
  }
}

export function buildDesignSnapshot({
  spaceId,
  selectedMaterialId,
  assignments,
  lightingPreset,
  lightIntensity,
  warmth
}) {
  return {
    version: 1,
    spaceId,
    selectedMaterialId,
    assignments,
    lightingPreset,
    lightIntensity,
    warmth
  };
}
