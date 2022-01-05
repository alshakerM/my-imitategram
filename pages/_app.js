import Head from 'next/head';
import { useRouter } from 'next/router';
import '../styles/globals.css';

const routeTitleMap = {
  '/direct/t/[userId]': 'Inbox • Direct',
  '/direct/inbox': 'Inbox • Direct',
  '/stories/[userId]': 'Stories • Instagram',
};

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  return (
    <div>
      <Head>
        <title>{routeTitleMap[pathname] || 'Instagram Clone'}</title>
        <link rel="shortcut icon" href="/Instagarm logo.png" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
