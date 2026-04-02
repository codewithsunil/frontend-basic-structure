// assets/js/config/envHelper.js

export function getEnv(key, defaultValue = null) {
  const value = window.__ENV__?.[key];

  if (!value) {
    console.warn(`⚠️ Missing ENV: ${key}`);
  }

  return value ?? defaultValue;
}

export function hasEnv(key) {
  return key in (window.__ENV__ || {});
}
