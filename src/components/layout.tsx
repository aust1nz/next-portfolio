import Head from "next/head";
import Navigation from "./navigation";
import Footer from "./footer";

export const siteTitle = "Austin Zentz";

interface LayoutProps {
  children: any;
  home?: boolean;
}

export default function Layout(props: LayoutProps) {
  return (
    <div className="text-gray-800 min-h-screen leading-normal tracking-normal">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Personal website for Austin Zentz, a web developer in Washington, DC"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>{siteTitle}</title>
      </Head>
      <Navigation />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}
