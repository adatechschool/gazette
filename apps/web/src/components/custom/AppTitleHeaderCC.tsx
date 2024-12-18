import { Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const AppTitleHeaderCC = () => {
  // const { t } = useTranslation();
  return (
    <Heading fontFamily="Staatliches" color="#606c38" fontSize={80} margin={10}>
      Gazette
    </Heading>
  );
};

export default AppTitleHeaderCC;
