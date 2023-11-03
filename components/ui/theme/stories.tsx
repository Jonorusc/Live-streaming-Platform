import type { Meta, StoryObj } from '@storybook/react'
import ThemeSwitcher from '.'

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Components/Ui/ThemeSwitcher',
  component: ThemeSwitcher,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof ThemeSwitcher>

export default meta
type Story = StoryObj<typeof ThemeSwitcher>

export const Primary: Story = {
  render: (args) => <ThemeSwitcher />
}
