import { HStack } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import {
	DialogBody,
	DialogCloseTrigger,
	DialogContent,
	DialogHeader,
	DialogRoot,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

const WelcomeDialogDesktopCC = () => {
	return (
		<HStack wrap="wrap" gap="4" margin={4}>
			<DialogRoot placement="center" motionPreset="slide-in-bottom">
				<DialogTrigger asChild>
					<Button
						bgColor="#606C38"
						width={343}
						height={50}
						fontFamily="Poppins"
						fontStyle="bold"
						fontSize={22}
						borderRadius="md"
					>
						S'inscrire
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Bienvenue sur Gazette !</DialogTitle>
					</DialogHeader>
					<DialogBody>
						<p>
							Pour personnaliser ton fil d'actualités, abonne-toi aux médias qui
							t'intéressent depuis la page Explorer.
						</p>
						<br />
						<p>
							Leurs contenus apparaîtront automatiquement sur ta page d'Accueil.
						</p>
						<br />
						<p>
							Sans abonnement, ta page d'Accueil restera vide. Tu peux choisir
							de t'abonner maintenant ou plus tard - c'est toi qui décides !
						</p>
					</DialogBody>
					<DialogCloseTrigger />
				</DialogContent>
			</DialogRoot>
		</HStack>
	);
};

export default WelcomeDialogDesktopCC;
