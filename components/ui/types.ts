import { DefaultTheme } from 'styled-components'

export type WIDTH =
  | '100%'
  | '100vw'
  | 'auto'
  | 'initial'
  | 'inherit'
  | 'unset'
  | string

export type HEIGHT =
  | '100%'
  | '100vh'
  | 'auto'
  | 'initial'
  | 'inherit'
  | 'unset'
  | string

export type JUSTIFY =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'initial'
  | 'inherit'

export type ALIGN =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'stretch'
  | 'baseline'
  | 'inherit'

export type PLACEITEMS =
  | 'center'
  | 'start'
  | 'end'
  | 'stretch'
  | 'initial'
  | 'inherit'

export type DIRECTION = 'row' | 'column' | 'row-reverse' | 'column-reverse'
export type DIRECTION_FLOW =
  | 'row'
  | 'column'
  | 'row-reverse'
  | 'column-reverse'
  | 'nowrap'
  | 'row wrap'
  | 'row-reverse nowrap'
  | 'column wrap'
  | 'column wrap-reverse'
export type ALINGSELF = 'center' | 'start' | 'end' | 'stretch' | 'inherit'
export type ALIGNCONTENT =
  | 'center'
  | 'start'
  | 'space-between'
  | 'space-around'
  | 'inherit'

export type COLORS = keyof Omit<DefaultTheme['palette'], 'text'>
export type FONT_SIZE = keyof DefaultTheme['font']['size']
export type FONT_WEIGHT = keyof Omit<DefaultTheme['font'], 'size' | 'family'>
export type FONT_ALIGN = 'left' | 'right' | 'center' | 'justify'

export type PADDING = keyof DefaultTheme['spacing']
export type POSITION =
  | 'relative'
  | 'absolute'
  | 'fixed'
  | 'sticky'
  | 'initial'
  | 'inherit'
  | 'unset'

export type ANIMATIONS = 'blink' | 'rotate' | 'scale' | 'shake' | 'slide'
export type TEXTFIELD_TYPES =
  | 'text'
  | 'password'
  | 'email'
  | 'search'
  | 'textarea'
export type TYPOGRAPHY_TYPES =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'label'

export type BREAK_WORD =
  | 'break-word'
  | 'normal'
  | 'break-all'
  | 'keep-all'
  | 'initial'
  | 'inherit'
  | 'unset'
