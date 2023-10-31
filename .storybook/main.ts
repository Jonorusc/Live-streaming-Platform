import type { StorybookConfig } from '@storybook/nextjs'

import path from 'path'

const toPath = (_path) => path.join(process.cwd(), _path)

const config: StorybookConfig = {
  stories: [
    // '../stories/**/*.mdx',
    // '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../components/**/stories.tsx'
    // '../components/**/*.stories.tsx'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-styling',
    '@storybook/addon-themes'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  webpackFinal: async (storybookWebpackConfig, { configType }) => {
    const { resolve = {} } = storybookWebpackConfig
    const { alias = {} } = resolve
    // Add the '@' alias to ./
    alias['@'] = toPath('.')

    // Update the config
    storybookWebpackConfig.resolve = { ...resolve, alias }

    // Return the updated config
    return storybookWebpackConfig
  }
}
export default config
