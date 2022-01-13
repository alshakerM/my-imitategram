import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { WarningPage } from '../components/pages/WarningPage/WarningPage';
import '../styles/globals.css';

const routeTitleMap = {
  '/direct/t/[userId]': 'Inbox • Direct',
  '/direct/inbox': 'Inbox • Direct',
  '/stories/[userId]': 'Stories • Instagram',
};

function MyApp({ Component, pageProps }) {
  const [shouldWarn, setShouldWarn] = React.useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!window.localStorage.getItem('wasUserWarned')) {
      setShouldWarn(true);
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
        <title>{routeTitleMap[router.pathname] || 'Instagram Clone'}</title>
        <link rel="shortcut icon" href="/Instagarm logo.png" />
      </Head>
      {shouldWarn && <WarningPage setShouldWarn={setShouldWarn} />}
      {isLoading && <div className="loading-bar"></div>}
      {!shouldWarn && <Component {...pageProps} />}
    </div>
  );
}

export default MyApp;
