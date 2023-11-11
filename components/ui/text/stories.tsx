import { Meta, Story } from '@storybook/react'
import { useForm, FormProvider } from 'react-hook-form'
import TextField, { TextFieldProps } from '.'
// import Button from '../button'

export default {
  title: 'Components/Ui/TextField',
  component: TextField,
  parameters: {
    layout: 'centered'
  },
  args: {
    label: 'Label',
    type: 'text',
    $response: false,
    $error: '',
    $success: false,
    $loading: false
  },
  argTypes: {
    type: {
      control: {
        type: 'select'
      },
      options: ['text', 'password', 'email']
    }
  },
  tags: ['autodocs']
} as Meta

const Template: Story<TextFieldProps> = (args) => {
  const FormWrapper = () => {
    const methods = useForm()
    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
          <TextField {...args} />

          {/* <Button
            type="submit"
            bgcolor="accent"
            fontSize="small"
            color="whiteSmoke"
          >
            Submit
          </Button> */}
        </form>
      </FormProvider>
    )
  }

  return <FormWrapper />
}

export const Primary = Template.bind({})
Primary.args = {
  label: 'Username',
  name: 'username'
}
