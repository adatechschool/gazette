import { Button Text } from "@chakra-ui/react";

type ButtonProps = {
  //extends ButtonProps to include all props of Chakra UI.
  fontColor: string;
  backgroundColor: string;
  text: string;
  height?: string;
  width?: string;
  fontSize?: string;
  capitalizeText?: boolean; // Conditionnal prop to handle text's style
};

const Button = ({
  fontColor,
  backgroundColor,
  text,
  capitalizeText,
  ...props
}: ButtonProps) => {
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

export default Button;