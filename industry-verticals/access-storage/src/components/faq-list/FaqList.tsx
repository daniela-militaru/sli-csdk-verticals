import { JSX } from 'react';
import { RichText, RichTextField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = Record<string, TextField | RichTextField | undefined> & { Title?: TextField };

const FaqList = ({ fields }: ComponentProps & { fields?: Fields }): JSX.Element => (
  <section className="as-wrap as-faq">
    <h2>
      <Text field={fields?.Title} />
    </h2>
    {[1, 2, 3, 4].map((slot) => {
      const question = fields?.[`Item${slot}Question`] as TextField | undefined;
      const answer = fields?.[`Item${slot}Answer`] as RichTextField | undefined;
      if (!question?.value) return null;
      return (
        <details key={slot}>
          <summary>
            <Text field={question} />
          </summary>
          <RichText field={answer} />
        </details>
      );
    })}
    <details>
      <summary>
        <Text field={fields?.Group1Title as TextField} />
      </summary>
      <RichText field={fields?.Group1Body as RichTextField} />
    </details>
    <details>
      <summary>
        <Text field={fields?.Group2Title as TextField} />
      </summary>
      <RichText field={fields?.Group2Body as RichTextField} />
    </details>
  </section>
);

export const Default = FaqList;
export default FaqList;
