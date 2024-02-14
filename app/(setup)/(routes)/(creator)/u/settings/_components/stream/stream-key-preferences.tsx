import { Section } from '@creator/u/_components/styles'
import TextField from '@/components/ui/text/no-hrf'
import Typrography from '@/components/ui/typography'
import NoSsr from '@/components/NoSsr'
import Flex from '@/components/ui/flex'
import RegenerateIngress from './regenerate_ingress'

type Props = {
  channel: {
    stream_server_url: string
    stream_key: string
    id: string
    name: string
  }
}

const StreamKeyPreferences = ({ channel }: Props) => {
  return (
    <NoSsr>
      <Typrography
        $color="triadic2"
        $text="Stream Key & Preferences"
        $type="h5"
        $fontSize="small"
        $fontWeight="semiBold"
      />
      <Section>
        <Flex $direction="column" $margin="0 0 8rem 0">
          <TextField
            $copy
            label="Server Url"
            name="serverUrl"
            $success={false}
            $value={channel.stream_server_url!}
            type="password"
            disabled
          />
          <TextField
            $copy
            label="Stream Key"
            name="streamkey"
            $success={false}
            $value={channel.stream_key!}
            type="password"
            disabled
          />
        </Flex>
        <Flex
          $justify="flex-end"
          $background="surface"
          $width="100%"
          $gapY="1rem"
          $align="center"
          $padding="2rem"
          aria-label="section-footer"
        >
          <RegenerateIngress
            channel={{
              id: channel.id,
              name: channel.name as string
            }}
          />
        </Flex>
      </Section>
    </NoSsr>
  )
}

export default StreamKeyPreferences
