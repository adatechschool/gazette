import { List } from '@chakra-ui/react';
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
				{t('logout')}
			</List.Item>
			<List.Item>
				<List.Indicator asChild>
					<Trash />
				</List.Indicator>
				{t('delete')}
			</List.Item>
			<List.Item>
				<List.Indicator asChild>
					<CircleHelp />
				</List.Indicator>
				{t('about')}
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
