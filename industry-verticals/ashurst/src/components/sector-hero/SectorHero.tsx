import { JSX } from 'react';
import { ImageField, RichText, RichTextField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { AnimateIn } from 'src/lib/animate-in';
import { FieldImage } from 'src/lib/field-image';

type Fields = {
  Eyebrow?: TextField;
  Title?: TextField;
  Intro?: RichTextField;
  Image?: ImageField;
};
type Props = ComponentProps & { fields?: Fields };

const Hero = ({
  fields,
  params,
  rendering,
  animated,
}: Props & { animated?: boolean }): JSX.Element => {
  const copy = (
    <div className="ash-sector-hero-copy">
      <p className="ash-kicker">
        <Text field={fields?.Eyebrow} />
      </p>
      <h1>
        <Text field={fields?.Title} />
      </h1>
      <RichText field={fields?.Intro} />
    </div>
  );
  return (
    <section
      className={`ash-sector-hero ${params?.styles ?? ''}`}
      key={params?.RenderingIdentifier ?? rendering?.uid}
    >
      <FieldImage field={fields?.Image} mode="cover" />
      {animated ? <AnimateIn>{copy}</AnimateIn> : copy}
    </section>
  );
};

export const Default = (props: Props): JSX.Element => <Hero {...props} />;
export const Animated = (props: Props): JSX.Element => <Hero {...props} animated />;
