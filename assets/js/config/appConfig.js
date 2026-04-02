// assets/js/config/appConfig.js

import { getEnv } from "./envHelper.js";

export const APP_CONFIG = {
  NAME: getEnv("APP_NAME", "My App"),
  ENV: getEnv("APP_ENV", "development"),
  DEBUG: getEnv("DEBUG", true),

  APP_TYPE: getEnv("APP_TYPE", "web"),
  APP_VERSION: getEnv("APP_VERSION", "1.0.0"),
};
