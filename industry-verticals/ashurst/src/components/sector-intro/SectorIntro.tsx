import { JSX } from 'react';
import { RichText, RichTextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { AnimateIn } from 'src/lib/animate-in';

type Fields = { Body?: RichTextField };
type Props = ComponentProps & { fields?: Fields };

const Intro = ({
  fields,
  params,
  rendering,
  animated,
}: Props & { animated?: boolean }): JSX.Element => {
  const body = <RichText field={fields?.Body} />;
  return (
    <section
      className={`ash-sector-intro ${params?.styles ?? ''}`}
      key={params?.RenderingIdentifier ?? rendering?.uid}
    >
      {animated ? <AnimateIn>{body}</AnimateIn> : body}
    </section>
  );
};

export const Default = (props: Props): JSX.Element => <Intro {...props} />;
export const Animated = (props: Props): JSX.Element => <Intro {...props} animated />;
