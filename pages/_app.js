import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { WarningPage } from '../components/pages/WarningPage/WarningPage';
import '../styles/globals.css';

const routeTitleMap = {
  '/direct/t/[userId]': 'Inbox • Direct',
  '/direct/inbox': 'Inbox • Direct',
  '/stories/[userId]': 'Stories • Imitategram',
};

function MyApp({ Component, pageProps }) {
  const [shouldWarn, setShouldWarn] = React.useState(true);
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (window.localStorage.getItem('wasUserWarned')) {
      setShouldWarn(false);
    }
  }, []);

  React.useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };
    const handleEnd = () => {
      setIsLoading(false);
    };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routerChangeComplete', handleEnd);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routerChangeComplete', handleEnd);
    };
  }, [router]);
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover"
        ></meta>
        <title>{routeTitleMap[router.pathname] || 'Imitategram'}</title>
        <link rel="shortcut icon" href="/Imitategram logo.png" />
      </Head>
      {shouldWarn && <WarningPage setShouldWarn={setShouldWarn} />}
      {isLoading && <div className="loading-bar"></div>}
      {!shouldWarn && <Component {...pageProps} />}
    </div>
  );
}

export default MyApp;
