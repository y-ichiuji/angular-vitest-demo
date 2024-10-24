import { defineConfig } from "vitest/config";
import angular from "@analogjs/vite-plugin-angular";

export default defineConfig({
  plugins: [angular({ tsconfig: "tsconfig.spec.json" })],
  test: {
    globals: true,
    setupFiles: ["src/setup-vitest.ts"],
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    reporters: ["default"],
    browser: {
      enabled: true,
      name: "chromium",
      headless: false, // set to true in CI
      provider: "playwright",
    },
  },
});
