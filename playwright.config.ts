import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.PORT || 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  timeout: 30 * 1000,
  retries: 2,
  outputDir: "test-results/",
  webServer: {
    command: "yarn dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL,
    trace: "retry-with-trace",
  },
  projects: [
    {
      name: "Desktop_Chrome",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "Mobile_Chrome",
      use: {
        ...devices["Pixel 5"],
      },
    },
    {
      name: "Mobile_Safari",
      use: devices["iPhone 12"],
    },
  ],
});
