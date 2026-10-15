import { JSX } from 'react';
import { RichText, RichTextField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = {
  Title?: TextField;
  Group1Title?: TextField;
  Group1Items?: RichTextField;
  Group2Title?: TextField;
  Group2Items?: RichTextField;
  Group3Title?: TextField;
  Group3Items?: RichTextField;
  Group4Title?: TextField;
  Group4Items?: RichTextField;
  Group5Title?: TextField;
  Group5Items?: RichTextField;
  Group6Title?: TextField;
  Group6Items?: RichTextField;
  Group7Title?: TextField;
  Group7Items?: RichTextField;
};
type Props = ComponentProps & { fields?: Fields };

const groups = [1, 2, 3, 4, 5, 6, 7] as const;

const Capabilities = ({ fields, params, rendering }: Props): JSX.Element => (
  <section
    className={`ash-sector-capabilities ${params?.styles ?? ''}`}
    key={params?.RenderingIdentifier ?? rendering?.uid}
  >
    <h2>
      <Text field={fields?.Title} />
    </h2>
    {groups.map((slot) => {
      const title = fields?.[`Group${slot}Title`];
      if (!title?.value) return null;
      return (
        <article key={slot}>
          <h3>
            <Text field={title} />
          </h3>
          <RichText field={fields?.[`Group${slot}Items`]} />
        </article>
      );
    })}
  </section>
);

export const Default = (props: Props): JSX.Element => <Capabilities {...props} />;
export const Animated = (props: Props): JSX.Element => <Capabilities {...props} />;
