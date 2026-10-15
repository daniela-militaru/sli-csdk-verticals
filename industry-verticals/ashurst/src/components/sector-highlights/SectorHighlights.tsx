import { JSX } from 'react';
import { RichText, RichTextField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = {
  Title?: TextField;
  Card1Kicker?: TextField;
  Card1Title?: TextField;
  Card1Body?: RichTextField;
  Card2Kicker?: TextField;
  Card2Title?: TextField;
  Card2Body?: RichTextField;
  Card3Kicker?: TextField;
  Card3Title?: TextField;
  Card3Body?: RichTextField;
};
type Props = ComponentProps & { fields?: Fields };

const cards = [1, 2, 3] as const;

const Highlights = ({ fields, params, rendering }: Props): JSX.Element => (
  <section
    className={`ash-sector-highlights ${params?.styles ?? ''}`}
    key={params?.RenderingIdentifier ?? rendering?.uid}
  >
    {fields?.Title?.value ? (
      <h2>
        <Text field={fields.Title} />
      </h2>
    ) : null}
    <div>
      {cards.map((slot) => {
        const title = fields?.[`Card${slot}Title`];
        if (!title?.value) return null;
        return (
          <article key={slot}>
            <p className="ash-kicker">
              <Text field={fields?.[`Card${slot}Kicker`]} />
            </p>
            <h3>
              <Text field={title} />
            </h3>
            <RichText field={fields?.[`Card${slot}Body`]} />
          </article>
        );
      })}
    </div>
  </section>
);

export const Default = (props: Props): JSX.Element => <Highlights {...props} />;
export const Animated = (props: Props): JSX.Element => <Highlights {...props} />;
