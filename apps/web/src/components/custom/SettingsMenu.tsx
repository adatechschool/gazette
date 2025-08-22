import { Link, List } from '@chakra-ui/react';
import { LogOut, Trash, CircleHelp, FileBadge } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { deleteUserAccount } from '@/services/api';

const SettingsMenu = () => {
	const { t } = useTranslation('common', {
		keyPrefix: 'accountManagement',
	});

	const handleDeleteAccount = async () => {
		try {
			await deleteUserAccount();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<List.Root gap="2" variant="plain" align="center">
			<List.Item>
				<List.Indicator asChild>
					<LogOut />
				</List.Indicator>
				<Link
					href="/"
					fontFamily={{ base: 'Poppins', lg: 'Staatliches' }}
					fontSize={{ base: '1rem', lg: '2rem' }}
				>
					{t('logout')}
				</Link>
			</List.Item>
			<List.Item>
				<List.Indicator asChild>
					<Trash />
				</List.Indicator>
				<Link
					onClick={() => handleDeleteAccount()}
					href="/"
					fontFamily={{ base: 'Poppins', lg: 'Staatliches' }}
					fontSize={{ base: '1rem', lg: '2rem' }}
				>
					{t('delete')}
				</Link>
			</List.Item>
			<List.Item>
				<List.Indicator asChild>
					<CircleHelp />
				</List.Indicator>
				<Link
					href="/about"
					fontFamily={{ base: 'Poppins', lg: 'Staatliches' }}
					fontSize={{ base: '1rem', lg: '2rem' }}
				>
					{t('about')}
				</Link>
			</List.Item>
			<List.Item>
				<List.Indicator asChild>
					<FileBadge />
				</List.Indicator>
				<Link
					fontFamily={{ base: 'Poppins', lg: 'Staatliches' }}
					fontSize={{ base: '1rem', lg: '2rem' }}
				>
					{t('policy')}
				</Link>
			</List.Item>
		</List.Root>
	);
};

export default SettingsMenu;
