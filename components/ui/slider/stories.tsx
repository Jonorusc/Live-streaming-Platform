import type { Meta, StoryObj } from '@storybook/react'
import Slider from '.'

const meta: Meta<typeof Slider> = {
  title: 'Components/Ui/Slider',
  component: Slider,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    name: 'slider',
    showIcons: true,
    min: 1,
    max: 3,
    step: 0.2,
    label: 'Slider label',
    $color: 'primary'
  },
  argTypes: {
    $color: {
      control: {
        type: 'select'
      },
      options: ['primary', 'secondary', 'background', 'grey', 'accent']
    }
  }
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof Slider>

export const Primary: Story = {
  render: (args) => <Slider {...args} />
}
