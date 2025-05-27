import React from 'react';
import AppTitleHeader from '@/components/custom/AppTitle';
import FormSignUp from '@/components/custom/FormSignUp';
import FormTitle from '@/components/custom/FormTitle';
import GazetteIllu from '@/components/custom/GazetteIllu';
import Layout from '@/components/custom/Layout';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const Signin = () => {
  const { t } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  });
  const isMobile = useBreakpointValue({ base: true, lg: false });
  return (
    <Layout>
    {isMobile ? (
      <Flex
        flexDirection="column"
        marginLeft="1rem"
        marginTop="2rem"
        gap="6"
        alignContent="center"
        justifyContent="center"
        alignItems="center"
      >
        <AppTitleHeader />
        <FormTitle text={t('signIn')} fontColor="color.black" />
        <FormSignUp />
      </Flex>
    ) : (
      <Flex>
        <GazetteIllu />
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="50vw"
        >
          <FormTitle text={t('signIn')} fontColor="color.chaletGreen" />
          <FormSignUp />
        </Flex>
      </Flex>
    )}
  </Layout>
  );
};

export default Signin; 