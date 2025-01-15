import { HStack, Input, Stack, Text, VStack } from "@chakra-ui/react";
import ButtonCC from "./ButtonCC";
import { useForm } from "react-hook-form";
import { Field } from "../ui/field";
import { Toaster } from "../ui/toaster";

type FormValues = {
    email: string;
    password: string;
}

const FormLoginCC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()

    const onSubmit = handleSubmit((data) => console.log(data))


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
                            label="Adresse mail"
                            invalid={!!errors.email}
                            errorText={errors.email?.message}
                        >
                            <Input shadow="md"
                                {...register("email")}
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
                            <Input shadow="md"
                                {...register("password")}
                            />
                        </Field>
                    </HStack>

                    <ul color="red.500">
                        Votre mot de passe doit inclure :
                        <li>au moins 8 caractères</li>
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
                                description: "Vous êtes connecté·e",
                                type: "success",
                            })
                        }
                    >
                    </ButtonCC>
                    <Text>
                        Vous n'avez pas de compte ? <a href="http://localhost:5173/"> <b>S'inscrire</b></a>
                    </Text>
                </VStack>
            </Stack>
            <Toaster />
        </form>
    )
}

export default FormLoginCC;
