import { Button, HStack, Input, Stack, Text, VStack } from "@chakra-ui/react";
import ButtonCC from "./ButtonCC";
import { useForm } from "react-hook-form";
import { Field } from "../ui/field";
import { Toaster, toaster } from "@/components/ui/toaster";

type FormValues = {
  pseudo: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const FormSignUpCC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <Stack maxWidth="-webkit-fit-content" padding="10">
        <Text color="fg.error" fontSize="sm" alignSelf="flex-end">
          * Champs obligatoires
        </Text>

        <VStack gap="4">
          <HStack gap="4">
            <Field
              required
              label="Pseudo"
              invalid={!!errors.pseudo}
              errorText={errors.pseudo?.message}
            >
              <Input
                shadow="md"
                {...register("pseudo", { required: "Champ obligatoire" })}
              />
            </Field>
            <Field
              required
              label="Adresse mail"
              invalid={!!errors.email}
              errorText={errors.email?.message}
            >
              <Input
                shadow="md"
                {...register("email", { required: "Champ obligatoire" })}
              />
            </Field>
          </HStack>

          <HStack gap="4">
            <Field
              required
              label="Mot de passe"
              invalid={!!errors.password}
              errorText={errors.password?.message}
            >
              <Input
                shadow="md"
                {...register("password", { required: "Champ obligatoire" })}
              />
            </Field>

            <Field
              required
              label="Confirmer le mot de passe"
              invalid={!!errors.passwordConfirmation}
              errorText={errors.passwordConfirmation?.message}
            >
              <Input
                shadow="md"
                {...register("passwordConfirmation", {
                  required: "Champ obligatoire",
                })}
              />
            </Field>
          </HStack>

          <ul color="red.500">
            Votre mot de passe doit inclure :<li>au moins 8 caractères</li>
            <li>une majuscule</li>
            <li>une minuscule</li>
            <li>un chiffre</li>
            <li>un caractère spécial (+ - [ ] * ~ _ # : ?)</li>
          </ul>

          <ButtonCC
            type="submit"
            width="72"
            fontSize="xl"
            fontWeight="bold"
            fontColor="#ffffff"
            backgroundColor="#606C38"
            text="S'inscrire"
            onClick={() =>
              toaster.create({
                description: "Votre compte a bien été créé",
                type: "success",
              })
            }
          ></ButtonCC>
          <Text>
            Vous avez un compte ?{" "}
            <a href="http://localhost:5173/">
              {" "}
              <b>Se connecter</b>
            </a>
          </Text>
        </VStack>
      </Stack>
      <Toaster />
    </form>
  );
};

export default FormSignUpCC;
