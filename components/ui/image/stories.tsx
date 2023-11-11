import type { Meta, StoryObj } from '@storybook/react'
import Avatar from '.'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Ui/Image',
  component: Avatar,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  args: {
    $url: 'https://res.cloudinary.com/jaumlu/image/upload/v1688753296/y2xixoqgvt3zdkhkhl3s.png',
    alt: 'DevByLucas',
    $size: 50,
    $rounded: false
  }
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof Avatar>

export const Primary: Story = {
  // eslint-disable-next-line jsx-a11y/alt-text
  render: (args) => <Avatar {...args} />
}
