import type { Meta, StoryObj } from '@storybook/react'
import Box2D from '.'

const meta: Meta<typeof Box2D> = {
  title: 'Components/Ui/Box2D',
  component: Box2D,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    $active: false,
    $color: 'primary',
    children: (
      <div
        style={{
          height: '15rem',
          width: '20rem',
          background: 'red',
          display: 'grid',
          placeItems: 'center'
        }}
      >
        hover me
      </div>
    )
  },
  argTypes: {
    $color: {
      control: {
        type: 'select'
      },
      options: ['primary', 'secondary', 'dark', 'light', 'grey']
    },
    $active: {
      control: {
        type: 'boolean'
      }
    }
  }
} satisfies Meta<typeof Box2D>

export default meta
type Story = StoryObj<typeof Box2D>

export const Primary: Story = {
  render: (args) => <Box2D {...args} />
}
