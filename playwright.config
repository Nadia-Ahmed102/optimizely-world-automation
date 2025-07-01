// playwright.config.ts

import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',            // Where your test files are
  retries: 1,                    // Retry failed tests once
  use: {
    baseURL: 'https://world.optimizely.com/',  // Site under test
    headless: true,              // Run browsers in headless mode
    screenshot: 'only-on-failure', // Take screenshots only if tests fail
    video: 'retain-on-failure',    // Save videos for failed tests
    trace: 'retain-on-failure',    // Capture trace for failed tests (helps with debugging)
  },
});
