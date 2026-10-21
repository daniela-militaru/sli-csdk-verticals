import { JSX } from 'react';
import { RichText, RichTextField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = Record<string, TextField | RichTextField | undefined> & {
  Title?: TextField;
  Intro?: RichTextField;
  HoursTitle?: TextField;
  Hours?: RichTextField;
  ContactTitle?: TextField;
  Contact?: RichTextField;
};

const StoreFacts = ({ fields }: ComponentProps & { fields?: Fields }): JSX.Element => (
  <section className="as-wrap as-facts">
    <h2>
      <Text field={fields?.Title} />
    </h2>
    <RichText field={fields?.Intro} />
    <dl>
      {[1, 2, 3, 4, 5, 6].map((slot) => {
        const label = fields?.[`Fact${slot}Label`] as TextField | undefined;
        const value = fields?.[`Fact${slot}Value`] as TextField | undefined;
        if (!label?.value) return null;
        return (
          <div key={slot}>
            <dt>
              <Text field={label} />
            </dt>
            <dd>
              <Text field={value} />
            </dd>
          </div>
        );
      })}
    </dl>
    <h3>
      <Text field={fields?.HoursTitle} />
    </h3>
    <RichText field={fields?.Hours} />
    <h3>
      <Text field={fields?.ContactTitle} />
    </h3>
    <RichText field={fields?.Contact} />
  </section>
);

export const Default = StoreFacts;
export default StoreFacts;
