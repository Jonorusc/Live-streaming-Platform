import type { Meta, StoryObj } from '@storybook/react'
import SignUpModal from '.'

const meta: Meta<typeof SignUpModal> = {
  title: 'Components/Modals/Sign Up',
  component: SignUpModal,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {}
} satisfies Meta<typeof SignUpModal>

export default meta
type Story = StoryObj<typeof SignUpModal>

export const Primary: Story = {
  render: (args) => <SignUpModal {...args} />
}
