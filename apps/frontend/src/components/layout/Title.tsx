import { Heading, HeadingProps } from '@chakra-ui/react'
import { memo } from 'react'

export interface TitleProps extends HeadingProps {
  fontColor: string
  text: string
}

const Title = memo(({ fontColor, text, ...props }: TitleProps) => {
  return (
    <Heading
      fontFamily={{
        base: 'var(--font-poppins), Poppins',
        lg: 'var(--font-bebas-neue), Bebas Neue',
      }}
      color={fontColor}
      fontSize="6rem"
      transition="all 0.3s ease"
      {...props}
    >
      {text}
    </Heading>
  )
})

export default Title
