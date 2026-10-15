import { JSX } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Props = ComponentProps & { fields?: { Title?: TextField } };

const Hero = ({ fields, params, rendering }: Props): JSX.Element => (
  <section
    className={`ash-insights-hero ${params?.styles ?? ''}`}
    key={params?.RenderingIdentifier ?? rendering?.uid}
  >
    <h1>
      <Text field={fields?.Title} />
    </h1>
  </section>
);

export const Default = (props: Props): JSX.Element => <Hero {...props} />;
export const Animated = (props: Props): JSX.Element => <Hero {...props} />;
