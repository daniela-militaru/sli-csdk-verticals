import { JSX } from 'react';
import { ImageField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { AnimateIn } from 'src/lib/animate-in';
import { FieldImage } from 'src/lib/field-image';

type Fields = { Image1?: ImageField; Image2?: ImageField; Image3?: ImageField };
type Props = ComponentProps & { fields?: Fields };

const HeroView = ({
  fields,
  params,
  rendering,
  animated,
}: Props & { animated?: boolean }): JSX.Element => {
  const frames = (
    <>
      <figure>
        <FieldImage field={fields?.Image1} mode="cover" />
      </figure>
      <figure>
        <FieldImage field={fields?.Image2} mode="cover" />
      </figure>
      <figure>
        <FieldImage field={fields?.Image3} mode="cover" />
      </figure>
    </>
  );
  return (
    <section
      className={`ash-hero ${params?.styles ?? ''}`}
      key={params?.RenderingIdentifier ?? rendering?.uid}
    >
      {animated ? <AnimateIn>{frames}</AnimateIn> : frames}
    </section>
  );
};

export const Default = (props: Props): JSX.Element => <HeroView {...props} />;
export const Animated = (props: Props): JSX.Element => <HeroView {...props} animated />;
export const ImageTop = (props: Props): JSX.Element => <HeroView {...props} />;
export const ImageBottom = (props: Props): JSX.Element => <HeroView {...props} />;
