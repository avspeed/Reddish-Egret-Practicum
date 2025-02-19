import Head from "next/head";
import Header from "./mainPage/Header";
import Footer from "./mainPage/Footer";

export const siteTitle = "UTab app";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Social media app for immigrants" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <title>{siteTitle}</title>
      </Head>

      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
