'use client';

import { JSX, useEffect } from 'react';
import { useRouter } from 'next/router';
import { recordPageView, recordVisitOnce } from 'src/lib/cdp/cdp-session-tracker';

export function CdpPageViewTracker(): JSX.Element | null {
  const router = useRouter();

  useEffect(() => {
    recordVisitOnce();
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    const [path, search = ''] = (router.asPath || '/').split('?');
    recordPageView(path || '/', search);
  }, [router.isReady, router.asPath]);

  return null;
}
