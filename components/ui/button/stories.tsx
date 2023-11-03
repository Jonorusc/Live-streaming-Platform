import type { Meta, StoryObj } from '@storybook/react'
import Button from '.'

const meta: Meta<typeof Button> = {
  title: 'Components/Ui/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    children: 'Button',
    $bgcolor: 'primary',
    $color: 'dark',
    $fontSize: 'medium',
    $fontWeight: 'bold',
    $error: false,
    disabled: false
  },
  argTypes: {
    $bgcolor: {
      control: {
        type: 'select'
      },
      options: ['primary', 'secondary', 'grey', 'transparent']
    },
    $color: {
      control: {
        type: 'select'
      },
      options: ['primary', 'secondary', 'dark', 'light', 'grey']
    },
    $borderColor: {
      control: {
        type: 'select'
      },
      options: ['primary', 'secondary', 'dark', 'light', 'grey', 'transparent']
    },
    $fontSize: {
      control: {
        type: 'select'
      },
      options: ['small', 'medium', 'large']
    },
    $fontWeight: {
      control: {
        type: 'select'
      },
      options: ['normal', 'bold']
    },
    $padding: {
      control: {
        type: 'select'
      },
      options: ['small', 'medium', 'large', 'none']
    },
    $position: {
      control: {
        type: 'select'
      },
      options: ['unset', 'absolute', 'relative', 'fixed']
    }
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  render: (args) => <Button {...args} />
}
