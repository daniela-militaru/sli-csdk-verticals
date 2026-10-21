/**
 * This Layout is needed for Starter Kit.
 */
import { JSX } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Placeholder, DesignLibrary, Page, PageMetaTags } from '@sitecore-content-sdk/nextjs';
import Scripts from 'src/Scripts';
import SitecoreStyles from 'src/components/content-sdk/SitecoreStyles';

const CDPProfile = dynamic(
  () => import('src/components/cdp-profile/CDPProfile').then((mod) => mod.Default),
  { ssr: false }
);

interface LayoutProps {
  page: Page;
}

const Layout = ({ page }: LayoutProps): JSX.Element => {
  const { layout, mode } = page;
  const { route } = layout.sitecore;
  const mainClassPageEditing = mode.isEditing ? 'editing-mode' : 'prod-mode';

  return (
    <>
      <Scripts />
      <SitecoreStyles layoutData={layout} />
      <PageMetaTags route={route} />
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* root placeholder for the app, which we add components to using route data */}
      <div className={mainClassPageEditing}>
        {mode.isDesignLibrary ? (
          <DesignLibrary />
        ) : (
          <>
            <header>
              <div id="header">
                {route && <Placeholder name="headless-header" rendering={route} />}
              </div>
            </header>
            <main>
              <div id="content">
                {route && <Placeholder name="headless-main" rendering={route} />}
              </div>
            </main>
            <footer>
              <div id="footer">
                {route && <Placeholder name="headless-footer" rendering={route} />}
              </div>
            </footer>
            <CDPProfile params={{}} />
          </>
        )}
      </div>
    </>
  );
};

export default Layout;
