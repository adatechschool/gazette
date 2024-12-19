import { Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const TitleMenuDesktopCC = () => {
  const { t } = useTranslation();
  return (
    <Heading fontFamily="Staatliches" color="#606C38" fontSize={60} margin={5}>
      {t("navigateApp.menu")}
    </Heading>
  );
};

export default TitleMenuDesktopCC;
