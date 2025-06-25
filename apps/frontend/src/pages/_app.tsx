import type { AppProps } from 'next/app'
import Head from 'next/head'
import { I18nextProvider } from 'react-i18next'
import { Provider } from '@/components/ui/provider'
import { AuthProvider } from '@/contexts/AuthContext'
import Layout from '../components/custom/Layout'
import i18n from '../i18n/config'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <I18nextProvider i18n={i18n}>
        <Provider>
          <AuthProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </Provider>
      </I18nextProvider>
    </>
  )
}
