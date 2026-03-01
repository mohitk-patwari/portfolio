import { Html, Head, Main, NextScript } from 'next/document';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mohit Kumar',
  jobTitle: 'Full Stack Developer',
  url: 'https://example.com',
  sameAs: [],
  description:
    'Full Stack Developer helping teams turn complex product problems into fast, accessible, and scalable web experiences.',
};

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <title>Mohit Kumar | Full Stack Developer</title>
        <meta
          name="description"
          content="I help teams solve slow, inconsistent web experiences by building accessible, high-performance full-stack products that scale cleanly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Mohit Kumar | Full Stack Developer" />
        <meta
          property="og:description"
          content="I help teams solve slow, inconsistent web experiences by building accessible, high-performance full-stack products that scale cleanly."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://example.com" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
