import type { Meta, StoryObj } from '@storybook/react'
import Select from '.'

const meta: Meta<typeof Select> = {
  title: 'Components/Ui/Select',
  component: Select,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' }
    ],
    name: 'select',
    label: 'Select',
    placeholder: 'Select an option',
    onChange: (value) => console.log(value)
  },
  argTypes: {}
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof Select>

export const Primary: Story = {
  render: (args) => <Select {...args} />
}
