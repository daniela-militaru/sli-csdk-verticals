import { JSX, useState } from 'react';
import { RichText, RichTextField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = {
  Title?: TextField;
  Item1Title?: TextField;
  Item1Teaser?: TextField;
  Item1Body?: RichTextField;
  Item2Title?: TextField;
  Item2Teaser?: TextField;
  Item2Body?: RichTextField;
  Item3Title?: TextField;
  Item3Teaser?: TextField;
  Item3Body?: RichTextField;
  Item4Title?: TextField;
  Item4Teaser?: TextField;
  Item4Body?: RichTextField;
  Item5Title?: TextField;
  Item5Teaser?: TextField;
  Item5Body?: RichTextField;
  Item6Title?: TextField;
  Item6Teaser?: TextField;
  Item6Body?: RichTextField;
  Item7Title?: TextField;
  Item7Teaser?: TextField;
  Item7Body?: RichTextField;
  Item8Title?: TextField;
  Item8Teaser?: TextField;
  Item8Body?: RichTextField;
};
type Props = ComponentProps & { fields?: Fields };

const slots = [1, 2, 3, 4, 5, 6, 7, 8] as const;

const Accordion = ({ fields, params, rendering }: Props): JSX.Element => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section
      className={`ash-sector-accordion ${params?.styles ?? ''}`}
      key={params?.RenderingIdentifier ?? rendering?.uid}
    >
      <h2>
        <Text field={fields?.Title} />
      </h2>
      <div>
        {slots.map((slot) => {
          const title = fields?.[`Item${slot}Title`];
          if (!title?.value) return null;
          const expanded = open === slot;
          return (
            <article key={slot} className={expanded ? 'open' : ''}>
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : slot)}
              >
                <span>
                  <strong>
                    <Text field={title} />
                  </strong>
                  <em>
                    <Text field={fields?.[`Item${slot}Teaser`]} />
                  </em>
                </span>
                <span>{expanded ? 'Close' : 'Read more'}</span>
              </button>
              {expanded ? (
                <div className="ash-sector-panel">
                  <RichText field={fields?.[`Item${slot}Body`]} />
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export const Default = (props: Props): JSX.Element => <Accordion {...props} />;
export const Animated = (props: Props): JSX.Element => <Accordion {...props} />;
