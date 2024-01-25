import { Meta, StoryObj } from '@storybook/react'
import { useForm, FormProvider } from 'react-hook-form'
import Menu from '.'
// import Button from '../button'

const meta: Meta<typeof Menu> = {
  title: 'Components/Ui/Menu',
  component: Menu,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof Menu>

export const Primary: Story = {
  render: (args) => <Menu />
}
