import { Flex } from "@chakra-ui/react";
import AppTitleHeaderCC from "./AppTitleHeaderCC";
import TitleCC from "./PageTitleCC";
import MenuCC from "./MenuDisplayCC";

const HeaderDesktopCC = () => {
  return (
    <div>
      <Flex justifyContent="space-between" padding={6}>
        <AppTitleHeaderCC />
        <MenuCC />
      </Flex>
      <Flex justifyContent="center">
        <TitleCC fontColor="#606c38" fontSize={80} text="créer un compte" />;
      </Flex>
    </div>
  );
};

export default HeaderDesktopCC;
