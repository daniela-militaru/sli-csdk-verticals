import { JSX } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = { Tag?: TextField; Title?: TextField; Date?: TextField };
type Props = ComponentProps & { fields?: Fields };

const Hero = ({ fields, params, rendering }: Props): JSX.Element => (
  <header
    className={`ash-article ${params?.styles ?? ''}`}
    key={params?.RenderingIdentifier ?? rendering?.uid}
  >
    <p className="ash-kicker">
      <Text field={fields?.Tag} />
    </p>
    <h1>
      <Text field={fields?.Title} />
    </h1>
    <p>
      <Text field={fields?.Date} />
    </p>
  </header>
);

export const Default = (props: Props): JSX.Element => <Hero {...props} />;
export const Animated = (props: Props): JSX.Element => <Hero {...props} />;
