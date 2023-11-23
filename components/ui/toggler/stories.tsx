import type { Meta, StoryObj } from '@storybook/react'
import Toggler from '.'

const meta: Meta<typeof Toggler> = {
  title: 'Components/Ui/Toggler',
  component: Toggler,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {}
} satisfies Meta<typeof Toggler>

export default meta
type Story = StoryObj<typeof Toggler>

export const Primary: Story = {
  render: (args) => <Toggler {...args} />
}
