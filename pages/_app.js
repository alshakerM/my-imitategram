import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Instagram Clone</title>
        <link rel="shortcut icon" href="/Instagarm logo.png" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
