import { defineConfig, devices } from "next/experimental/testmode/playwright/msw";

const PORT = process.env.PORT || 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  timeout: 30 * 1000,
  outputDir: "test-results/",
  reporter: process.env.CI ? "blob" : "html",
  retries: !process.env.CI ? 0 : 2,
  webServer: {
    command: "yarn start --experimental-test-proxy",
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
