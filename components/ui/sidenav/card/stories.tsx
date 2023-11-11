import type { Meta, StoryObj } from '@storybook/react'
import Card from '.'

const meta: Meta<typeof Card> = {
  title: 'Components/Ui/Card',
  component: Card,
  parameters: {
    layout: 'centered'
  },
  args: {
    title: 'DevByLucas',
    message: 'League of Legends',
    streamer: {
      picture:
        'https://res.cloudinary.com/jaumlu/image/upload/v1688753296/c7av9escep1rga52nxup.png',
      name: 'jaumzera',
      islive: true,
      viewers: 300
    }
  }
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof Card>

export const Primary: Story = {
  render: (args) => <Card {...args} />
}
