const react = require('@vitejs/plugin-react');

module.exports = {
  stories: [
    '../packages/**/*.stories.mdx',
    '../packages/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config) {
    config.plugins = mergePlugins(
      config.plugins,
      react({
        babel: {
          plugins: ['@shopify/react-i18n/babel'],
        },
      }),
    );
    return config;
  },
};

const mergePlugins = (originalPlugins, newPlugins) => {
  // Clone the original plugins and flat the array to facilitate working with it
  const finalPlugins = [...originalPlugins.flat()];

  newPlugins.flat().forEach((newPlugin) => {
    const name = newPlugin.name;

    // Find if new plugin exists already in the original plugins
    const originalPluginIndex = finalPlugins.findIndex(
      (finalPlugin) => finalPlugin.name === name,
    );

    // If new plugin does not exist, append it
    if (originalPluginIndex < 0) {
      return finalPlugins.append(newPlugin);
    }

    // If new plugin does exist, replace it
    finalPlugins.splice(originalPluginIndex, 1, newPlugin);
  });

  return finalPlugins;
};
