import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn, understand, enhance wine tasting!"
          />
          <meta property="og:site_name" content="vno" />
          <meta
            property="og:description"
            content="Learn, understand, enhance wine tasting!"
          />
          <meta property="og:title" content="Learn, understand, enhance wine tasting!" />
          <meta
            name="twitter:description"
            content="Learn, understand, enhance wine tasting!"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
