import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>instagram Clone</title>
        <link rel="shortcut icon" href="/Instagarm logo.png" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
