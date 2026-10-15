import { JSX } from 'react';
import {
  ImageField,
  Link,
  LinkField,
  RichText,
  RichTextField,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { AnimateIn } from 'src/lib/animate-in';
import { FieldImage } from 'src/lib/field-image';

type Fields = {
  Eyebrow?: TextField;
  Title?: TextField;
  Body?: RichTextField;
  Link?: LinkField;
  Image?: ImageField;
};
type Props = ComponentProps & { fields?: Fields };

const Split = ({
  fields,
  params,
  rendering,
  inversed,
  animated,
  dark,
}: Props & { inversed?: boolean; animated?: boolean; dark?: boolean }): JSX.Element => {
  const copy = (
    <div className="ash-split-copy">
      <p className="ash-kicker">
        <Text field={fields?.Eyebrow} />
      </p>
      <h2>
        <Text field={fields?.Title} />
      </h2>
      <RichText field={fields?.Body} />
      {fields?.Link ? <Link field={fields.Link} className="ash-button" /> : null}
    </div>
  );
  return (
    <section
      className={`ash-split ${inversed ? 'inversed' : ''} ${dark ? 'dark' : ''} ${params?.styles ?? ''}`}
      key={params?.RenderingIdentifier ?? rendering?.uid}
    >
      <div>{animated ? <AnimateIn>{copy}</AnimateIn> : copy}</div>
      <FieldImage field={fields?.Image} mode="cover" />
    </section>
  );
};

export const Default = (props: Props): JSX.Element => <Split {...props} dark />;
export const Inversed = (props: Props): JSX.Element => <Split {...props} inversed />;
export const Animated = (props: Props): JSX.Element => <Split {...props} animated />;
export const ImageTop = (props: Props): JSX.Element => <Split {...props} />;
export const ImageBottom = (props: Props): JSX.Element => <Split {...props} inversed />;
