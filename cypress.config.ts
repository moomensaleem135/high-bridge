import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const isDev = config.watchForFileChanges;
      const port = process.env.PORT ?? (isDev ? '7777' : '7777');
      const configOverrides: Partial<Cypress.PluginConfigOptions> = {
        baseUrl: `http://localhost:${port}`,
        video: !process.env.CI,
        screenshotOnRunFailure: !process.env.CI,
      };
      return { ...config, ...configOverrides };
    },
    baseUrl: 'http://localhost:7777 ',
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
  viewportHeight: 1200,
  viewportWidth: 1400,
});
