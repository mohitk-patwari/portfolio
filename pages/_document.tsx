import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <meta
          name="description"
          content="Portfolio of Mohit Kumar, showcasing frontend engineering, product-focused UI, and full-stack projects."
        />
        {/* Replace /public/favicon.ico with your personal brand favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
