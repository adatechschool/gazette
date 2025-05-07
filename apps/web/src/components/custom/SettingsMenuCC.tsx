import { Link, List } from '@chakra-ui/react';
import { LogOut, Trash, CircleHelp, FileBadge } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SettingsMenuCC = () => {
	const { t } = useTranslation('common', {
		keyPrefix: 'accountManagement',
	});

	return (
		<List.Root gap="2" variant="plain" align="center">
			<List.Item>
				<List.Indicator asChild>
					<LogOut />
				</List.Indicator>
				<Link 
					href="/">
				{t('logout')}
				</Link>
			</List.Item>
			<List.Item>
				<List.Indicator asChild>
					<Trash />
				</List.Indicator>
				<Link
					href="/">
				{t('delete')}
				</Link>
			</List.Item>
			<List.Item>
				<List.Indicator asChild>
					<CircleHelp />
				</List.Indicator>
				<Link
					href="/about">
				{t('about')}
				</Link>
			</List.Item>
			<List.Item>
				<List.Indicator asChild>
					<FileBadge />
				</List.Indicator>
				{t('policy')}
			</List.Item>
		</List.Root>
	);
};

export default SettingsMenuCC;
