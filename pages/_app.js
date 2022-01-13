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

function MyApp({ Component, pageProps, cookie }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
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
      {isLoading && <div className="loading-bar"></div>}
      {cookie === undefined || cookie === 'hasSeenWarning=false' ? (
        <WarningPage />
      ) : (
        ''
      )}
      <Component {...pageProps} />
    </div>
  );
}
MyApp.getInitialProps = async function (context) {
  const { req, res } = context.ctx;
  const cookie = req.headers?.cookie;

  return { cookie };
};

export default MyApp;
