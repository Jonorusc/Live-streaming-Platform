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
    streamer: {
      stream_game: 'League of Legends',
      picture:
        'https://res.cloudinary.com/jaumlu/image/upload/v1688753296/c7av9escep1rga52nxup.png',
      name: 'jaumzera',
      stream_title: "Let's talk about Typescript, are you ready?",
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
