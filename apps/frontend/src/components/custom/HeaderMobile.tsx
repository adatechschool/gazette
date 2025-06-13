import { Flex } from '@chakra-ui/react'
import LogoHeaderMobile from './LogoHeaderMobile'
import PageTitle from './PageTitle'

export interface HeaderMobileCCProps {
  text: string
}

function HeaderMobileCC({ text }: HeaderMobileCCProps) {
  return (
    <Flex flexDirection="column" gap="6" marginLeft="1rem" marginTop="2rem">
      <LogoHeaderMobile />
      <PageTitle fontColor="color.black" text={text} />
    </Flex>
  )
}

export default HeaderMobileCC
