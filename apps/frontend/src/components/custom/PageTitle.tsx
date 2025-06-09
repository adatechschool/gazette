import { Heading } from '@chakra-ui/react'

export interface PageTitleProps {
  fontColor: string
  text: string
}

function PageTitle({ fontColor, text }: PageTitleProps) {
  return (
    <Heading
      fontFamily={{
        base: 'Poppins',
        lg: 'Staatliches',
      }}
      color={fontColor}
      fontSize={{
        base: '1.125rem',
        lg: '6.25rem',
      }}
    >
      {text}
    </Heading>
  )
}

export default PageTitle
