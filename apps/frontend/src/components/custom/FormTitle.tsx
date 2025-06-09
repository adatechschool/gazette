import { Heading } from '@chakra-ui/react'

export interface FormTitleProps {
  fontColor: string
  text: string
}

function FormTitle({ fontColor, text }: FormTitleProps) {
  return (
    <Heading
      fontFamily={{
        base: 'Poppins',
        lg: 'Staatliches',
      }}
      color={fontColor}
      fontSize={{
        base: '1.125rem',
        lg: '5rem',
      }}
    >
      {text}
    </Heading>
  )
}

export default FormTitle
