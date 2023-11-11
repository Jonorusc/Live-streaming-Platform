import type { Meta, StoryObj } from '@storybook/react'
import ToolTip from '.'
import Card from '@/components/ui/sidenav/card'

const CardProps = {
  title: 'DevByLucas',
  message: 'League of Legends',
  streamer: {
    picture:
      'https://res.cloudinary.com/jaumlu/image/upload/v1688753296/c7av9escep1rga52nxup.png',
    name: 'DevByLucas',
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
  args: {
    children: <Card {...CardProps}></Card>,
    $position: 'top',
    $content: 'Tooltip content'
  }
} satisfies Meta<typeof ToolTip>

export default meta
type Story = StoryObj<typeof ToolTip>

export const Primary: Story = {
  render: (args) => <ToolTip {...args} />
}
