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
					bgColor="#ffffff"
					width="0"
					height="0"
					borderLeft="70px solid transparent"
					borderRight="70px solid transparent"
					borderTop="50px solid #606C38"
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
					fontSize={60}
					color="#606C38"
					textAlign="center"
					justifyContent="center"
					alignItems="center"
					value="accueil"
					_hover={{
						bg: '#606C38',
						color: '#ffffff',
					}}
					_active={{
						bg: '#606C38',
						color: '#ffffff',
					}}
					padding="40px 40px"
				>
					<Link to="/">{t('home')}</Link>
				</MenuItem>
				<MenuItem
					fontSize={60}
					color="#606C38"
					textAlign="center"
					justifyContent="center"
					alignItems="center"
					value="explorer"
					_hover={{
						bg: '#606C38',
						color: '#ffffff',
					}}
					_active={{
						bg: '#606C38',
						color: '#ffffff',
					}}
					padding="40px 40px"
				>
					<Link to="/explore">{t('explore')}</Link>
				</MenuItem>
				<MenuItem
					fontSize={60}
					color="#606C38"
					textAlign="center"
					justifyContent="center"
					alignItems="center"
					value="mon-compte"
					_hover={{
						bg: '#606C38',
						color: '#ffffff',
					}}
					_active={{
						bg: '#606C38',
						color: '#ffffff',
					}}
					padding="40px 40px"
				>
					<Link to="/parameters">{t('account')}</Link>
				</MenuItem>
			</MenuContent>
		</MenuRoot>
	);
};

export default MenuDesktopCC;
