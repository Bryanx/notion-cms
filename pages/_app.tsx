import React from "react";
import Head from 'next/head';
import "../styles/tailwind.css";
import "../styles/global.css";
import "../styles/index.css";
import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'rc-dropdown/assets/index.css'

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
