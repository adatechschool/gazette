import { Heading } from '@chakra-ui/react'
import { useResponsiveTokens } from '../../theme/responsive'

export interface TitleProps {
  fontColor: string
  text: string
}

function Title({ fontColor, text }: TitleProps) {
  const { titleFontSize } = useResponsiveTokens()

  return (
    <Heading
      fontFamily={{
        base: 'Poppins',
        lg: 'Staatliches',
      }}
      color={fontColor}
      fontSize={titleFontSize}
    >
      {text}
    </Heading>
  )
}

export default Title
