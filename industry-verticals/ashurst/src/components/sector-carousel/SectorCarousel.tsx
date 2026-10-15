import { JSX, useRef } from 'react';
import { Link, LinkField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = {
  Title?: TextField;
  ViewAll?: LinkField;
  Card1Tag?: TextField;
  Card1Title?: TextField;
  Card1Date?: TextField;
  Card1Link?: LinkField;
  Card2Tag?: TextField;
  Card2Title?: TextField;
  Card2Date?: TextField;
  Card2Link?: LinkField;
  Card3Tag?: TextField;
  Card3Title?: TextField;
  Card3Date?: TextField;
  Card3Link?: LinkField;
  Card4Tag?: TextField;
  Card4Title?: TextField;
  Card4Date?: TextField;
  Card4Link?: LinkField;
  Card5Tag?: TextField;
  Card5Title?: TextField;
  Card5Date?: TextField;
  Card5Link?: LinkField;
  Card6Tag?: TextField;
  Card6Title?: TextField;
  Card6Date?: TextField;
  Card6Link?: LinkField;
};
type Props = ComponentProps & { fields?: Fields };

const slots = [1, 2, 3, 4, 5, 6] as const;

const Carousel = ({ fields, params, rendering }: Props): JSX.Element => {
  const scroller = useRef<HTMLDivElement>(null);
  const move = (direction: number) => {
    scroller.current?.scrollBy({ left: direction * 340, behavior: 'smooth' });
  };
  return (
    <section
      className={`ash-sector-carousel ${params?.styles ?? ''}`}
      key={params?.RenderingIdentifier ?? rendering?.uid}
    >
      <header>
        <h2>
          <Text field={fields?.Title} />
        </h2>
        <div>
          {fields?.ViewAll?.value?.href ? <Link field={fields.ViewAll} /> : null}
          <button type="button" aria-label="Previous" onClick={() => move(-1)}>
            Previous
          </button>
          <button type="button" aria-label="Next" onClick={() => move(1)}>
            Next
          </button>
        </div>
      </header>
      <div className="ash-sector-track" ref={scroller}>
        {slots.map((slot) => {
          const title = fields?.[`Card${slot}Title`];
          const cardLink = fields?.[`Card${slot}Link`];
          if (!title?.value) return null;
          return (
            <article key={slot}>
              <p className="ash-kicker">
                <Text field={fields?.[`Card${slot}Tag`]} />
              </p>
              <h3>
                <Text field={title} />
              </h3>
              <p>
                <Text field={fields?.[`Card${slot}Date`]} />
              </p>
              {cardLink?.value?.href ? <Link field={cardLink} className="ash-text-link" /> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export const Default = (props: Props): JSX.Element => <Carousel {...props} />;
export const Animated = (props: Props): JSX.Element => <Carousel {...props} />;
