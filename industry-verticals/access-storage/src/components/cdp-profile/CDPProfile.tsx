'use client';

import { JSX } from 'react';
import { CdpPageViewTracker } from 'src/components/cdp-profile/CdpPageViewTracker';
import { CdpProfilePanel } from 'src/components/cdp-profile/CdpProfilePanel';

interface CDPProfileProps {
  params?: {
    RenderingIdentifier?: string;
  };
}

export const Default = ({ params }: CDPProfileProps): JSX.Element => {
  const id = params?.RenderingIdentifier;

  return (
    <div id={id}>
      <CdpPageViewTracker />
      <CdpProfilePanel />
    </div>
  );
};

export default Default;
