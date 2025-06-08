import React from 'react';
import HeaderMobile from '@/components/custom/HeaderMobile';
import Layout from '@/components/custom/Layout';
import Navbar from '@/components/custom/Navbar';
import { useBreakpointValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation('common', {
		keyPrefix: 'accountManagement',
	});

	const isMobile = useBreakpointValue({ base: true, lg: false });

	return (
		<Layout>
			{isMobile ? (
				<div>
					<HeaderMobile text={t('about')} />
					<Navbar />
				</div>
			) : (
			<p>About</p>
			)}
		</Layout>
	);
};

export default About; 