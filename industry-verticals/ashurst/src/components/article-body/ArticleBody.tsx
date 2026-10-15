import { JSX } from 'react';
import { RichText, RichTextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Props = ComponentProps & { fields?: { Body?: RichTextField } };

const Body = ({ fields, params, rendering }: Props): JSX.Element => (
  <article
    className={`ash-article ${params?.styles ?? ''}`}
    key={params?.RenderingIdentifier ?? rendering?.uid}
  >
    <RichText field={fields?.Body} />
  </article>
);

export const Default = (props: Props): JSX.Element => <Body {...props} />;
export const Animated = (props: Props): JSX.Element => <Body {...props} />;
