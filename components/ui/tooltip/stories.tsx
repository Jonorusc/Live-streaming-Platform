import type { Meta, StoryObj } from '@storybook/react'
import ToolTip from '.'
import Card from '@/components/ui/card'

const CardProps = {
  title: 'DevByLucas',
  streamer: {
    stream_game: 'League of Legends',
    picture:
      'https://res.cloudinary.com/jaumlu/image/upload/v1688753296/c7av9escep1rga52nxup.png',
    name: 'DevByLucas',
    stream_title: "Let's talk about Typescript, are you ready?",
    islive: true,
    viewers: 300
  }
}

const meta: Meta<typeof ToolTip> = {
  title: 'Components/Ui/ToolTip',
  component: ToolTip,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    children: <Card {...CardProps}></Card>,
    $position: 'top',
    $content: 'Tooltip content',
    $arrow: true
  },
  argTypes: {
    $background: {
      options: [
        undefined,
        'surface',
        'primary',
        'secondary',
        'success',
        'error',
        'warn',
        'success',
        'info',
        'grey',
        'accent',
        'transparent'
      ],
      control: { type: 'select' }
    }
  }
} satisfies Meta<typeof ToolTip>

export default meta
type Story = StoryObj<typeof ToolTip>

export const Primary: Story = {
  render: (args) => <ToolTip {...args} />
}
