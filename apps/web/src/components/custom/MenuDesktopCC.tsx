import {
	MenuContent,
	MenuItem,
	MenuRoot,
	MenuTrigger,
} from '@/components/ui/menu';
import { Button } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

const MenuDesktopCC = () => {
	const { t } = useTranslation('common', {
		keyPrefix: 'navigateApp',
	});
	return (
		<MenuRoot>
			<MenuTrigger asChild>
				<Button
					bgColor="color.white"
					width="0"
					height="0"
					borderLeft="4.375rem solid transparent"
					borderRight="4.375rem solid transparent"
					borderTop="3.125rem solid #606c38"
					padding="0"
					minW="0"
					minH="0"
					_focus={{
						boxShadow: 'none',
						outline: 'none',
					}}
				></Button>
			</MenuTrigger>
			<MenuContent
				flexDirection="column"
				fontFamily="Staatliches"
				display="flex"
				justifyContent="center"
				alignItems="center"
				boxSizing="border-box"
				height="100%"
				width="100%"
			>
				<MenuItem
					fontSize="3.75rem"
					color="color.chaletGreen"
					textAlign="center"
					justifyContent="center"
					alignItems="center"
					value="accueil"
					_hover={{
						bg: 'color.chaletGreen',
						color: 'color.white',
					}}
					_active={{
						bg: 'color.chaletGreen',
						color: 'color.white',
					}}
					padding="2.5rem 2.5rem"
					_focus={{
						boxShadow: 'none',
						outline: 'none',
					}}
				>
					<Link to="/">{t('home')}</Link>
				</MenuItem>
				<MenuItem
					fontSize="3.75rem"
					color="color.chaletGreen"
					textAlign="center"
					justifyContent="center"
					alignItems="center"
					value="explorer"
					_hover={{
						bg: 'color.chaletGreen',
						color: 'color.white',
					}}
					_active={{
						bg: 'color.chaletGreen',
						color: 'color.white',
					}}
					padding="2.5rem 2.5rem"
					_focus={{
						boxShadow: 'none',
						outline: 'none',
					}}
				>
					<Link to="/explore">{t('explore')}</Link>
				</MenuItem>
				<MenuItem
					fontSize="3.75rem"
					color="color.chaletGreen"
					textAlign="center"
					justifyContent="center"
					alignItems="center"
					value="mon-compte"
					_hover={{
						bg: 'color.chaletGreen',
						color: 'color.white',
					}}
					_active={{
						bg: 'color.chaletGreen',
						color: 'color.white',
					}}
					padding="2.5rem 2.5rem"
					_focus={{
						boxShadow: 'none',
						outline: 'none',
					}}
				>
					<Link to="/parameters">{t('account')}</Link>
				</MenuItem>
			</MenuContent>
		</MenuRoot>
	);
};

export default MenuDesktopCC;
