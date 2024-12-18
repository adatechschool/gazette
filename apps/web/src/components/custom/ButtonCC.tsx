import { Button, ButtonProps, Text } from "@chakra-ui/react";

type ButtonCCProps = ButtonProps & {
  //extends ButtonProps to include all props of Chakra UI.
  fontColor: string;
  backgroundColor: string;
  text: string;
  height?: number;
  width?: number;
  fontSize?: number;
  capitalizeText?: boolean; // Conditionnal prop to handle text's style
};

const ButtonCC = ({
  fontColor,
  backgroundColor,
  text,
  capitalizeText,
  ...props
}: ButtonCCProps) => {
  return (
    <Button
      color={fontColor}
      bgColor={backgroundColor}
      shadow="sm"
      borderRadius="xl"
      margin="3"
      {...props} // all the other props of chakra ui are transmetted here
    >
      <Text textTransform={capitalizeText ? "capitalize" : "uppercase"}>
        {/* if capitalizetext is true, text transform become capitalize (only the first letter uppercase)
                    otherwise if capitalizetext is false, text transform stay uppercase */}
        {text}
      </Text>
    </Button>
  );
};

export default ButtonCC;
