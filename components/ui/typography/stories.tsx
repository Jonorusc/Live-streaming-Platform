import type { Meta, StoryObj } from '@storybook/react'
import Typrography, { TyprographyProps } from '.'

const meta: Meta<typeof Typrography> = {
  title: 'Components/Ui/Typrography',
  component: Typrography,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    $bgcolor: {
      control: {
        type: 'select'
      },
      options: [
        'primary',
        'secondary',
        'grey',
        'transparent',
        'accent',
        undefined
      ]
    },
    $color: {
      control: {
        type: 'select'
      },
      options: ['primary', 'secondary', 'grey', 'transparent', 'accent']
    },
    $borderColor: {
      control: {
        type: 'select'
      },
      options: [
        'primary',
        'secondary',
        'grey',
        'transparent',
        'accent',
        undefined
      ]
    },
    $hoverColor: {
      control: {
        type: 'select'
      },
      options: [
        'primary',
        'secondary',
        'grey',
        'transparent',
        'accent',
        undefined
      ]
    },
    $fontSize: {
      control: {
        type: 'select'
      },
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge']
    },
    $fontWeight: {
      control: {
        type: 'select'
      },
      options: ['normal', 'bold', 'semibold', 'light']
    },
    $margin: {
      control: {
        type: 'select'
      },
      options: ['small', 'medium', 'large', 'xlarge', undefined]
    },
    $position: {
      control: {
        type: 'select'
      },
      options: ['unset', 'absolute', 'relative', 'fixed']
    },
    $top: {
      control: {
        type: 'select'
      },
      options: ['unset', '0', '50%', '100%']
    },
    $right: {
      control: {
        type: 'select'
      },
      options: ['unset', '0', '50%', '100%']
    },
    $left: {
      control: {
        type: 'select'
      },
      options: ['unset', '0', '50%', '100%']
    },
    $bottom: {
      control: {
        type: 'select'
      },
      options: ['unset', '0', '50%', '100%']
    },
    $type: {
      control: {
        type: 'select'
      },
      options: ['span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'label']
    }
  }
} satisfies Meta<typeof Typrography>

export default meta
type Story = StoryObj<typeof Typrography>

export const Example: Story = {
  args: {
    children: <h1>Hello everyone!</h1>,
    $text: undefined,
    $type: 'h1',
    $border: false,
    $borderColor: undefined,
    $bgcolor: undefined,
    $hoverColor: undefined,
    $color: 'primary',
    $borderSize: undefined,
    $fontSize: 'medium',
    $fontWeight: 'normal',
    $width: 'auto',
    $margin: undefined,
    $position: 'unset',
    $top: 'unset',
    $right: 'unset',
    $left: 'unset',
    $bottom: 'unset'
  }
}
