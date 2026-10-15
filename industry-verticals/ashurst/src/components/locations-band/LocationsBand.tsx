import { JSX } from 'react';
import { ImageField, RichText, RichTextField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { FieldImage } from 'src/lib/field-image';

type Fields = { Title?: TextField; Body?: RichTextField; Image?: ImageField };
type Props = ComponentProps & { fields?: Fields };

const Band = ({ fields, params, rendering }: Props): JSX.Element => (
  <section
    className={`ash-locations ${params?.styles ?? ''}`}
    key={params?.RenderingIdentifier ?? rendering?.uid}
  >
    <h2>
      <Text field={fields?.Title} />
    </h2>
    <RichText field={fields?.Body} />
    <div className="ash-map">
      <FieldImage field={fields?.Image} mode="fill-width" />
    </div>
  </section>
);

export const Default = (props: Props): JSX.Element => <Band {...props} />;
export const Animated = (props: Props): JSX.Element => <Band {...props} />;
export const ImageTop = (props: Props): JSX.Element => <Band {...props} />;
export const ImageBottom = (props: Props): JSX.Element => <Band {...props} />;
