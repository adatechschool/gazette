import { Heading } from "@chakra-ui/react";

type PageTitleCCProps = {
  fontColor: string;
  text: string;
  fontSize?: number;
};

const PageTitleCC = ({ fontColor, fontSize, text }: PageTitleCCProps) => {
  return (
    <Heading
      fontFamily="Staatliches"
      color={fontColor}
      fontSize={fontSize}
      margin={10}
    >
      {text.toUpperCase()}
    </Heading>
  );
};

export default PageTitleCC;
