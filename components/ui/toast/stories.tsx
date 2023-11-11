import type { Meta, StoryObj } from '@storybook/react'
import Toast from '.'

const meta: Meta<typeof Toast> = {
  title: 'Components/Ui/Toast',
  component: Toast,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof Toast>

export const Profile: Story = {
  args: {
    toast: {
      id: Date.now(),
      timeout: 5000,
      type: 'success',
      position: 'top-right',
      data: {
        profile: {
          picture: 'https://i.pravatar.cc/300',
          name: 'John Doe'
        },
        title: 'Toast title',
        message: 'Toast message'
      }
    }
  }
}

export const NoProfile: Story = {
  args: {
    toast: {
      id: Date.now(),
      timeout: 5000,
      type: 'success',
      position: 'top-left',
      data: {
        title: 'Toast title',
        message: 'Toast message'
      }
    }
  }
}

export const NoTitle: Story = {
  args: {
    toast: {
      id: Date.now(),
      timeout: 5000,
      type: 'success',
      position: 'top-left',
      data: {
        message: 'Toast message'
      }
    }
  }
}

export const Live: Story = {
  args: {
    toast: {
      id: Date.now(),
      timeout: 5000,
      type: 'islive',
      position: 'top-left',
      data: {
        profile: {
          picture: 'https://i.pravatar.cc/300',
          name: 'John Doe'
        },
        title: 'John Doe is live now!',
        message: 'Playing Valorant'
      }
    }
  }
}
