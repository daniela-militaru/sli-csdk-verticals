import { JSX } from 'react';
import { Image, ImageField, Link, LinkField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = {
  Title?: TextField;
  Intro?: TextField;
  Step1Title?: TextField;
  Step1Text?: TextField;
  Step2Title?: TextField;
  Step2Text?: TextField;
  Step3Title?: TextField;
  Step3Text?: TextField;
  Link?: LinkField;
  Image?: ImageField;
};

const HowItWorks = ({ fields }: ComponentProps & { fields?: Fields }): JSX.Element => (
  <section className="as-wrap as-steps">
    <div>
      <h2>
        <Text field={fields?.Title} />
      </h2>
      <p>
        <Text field={fields?.Intro} />
      </p>
      <ol>
        {[1, 2, 3].map((slot) => {
          const title = fields?.[`Step${slot}Title` as 'Step1Title'];
          const text = fields?.[`Step${slot}Text` as 'Step1Text'];
          return (
            <li key={slot}>
              <h3>
                <Text field={title} />
              </h3>
              <p>
                <Text field={text} />
              </p>
            </li>
          );
        })}
      </ol>
      {fields?.Link ? <Link className="as-btn" field={fields.Link} /> : null}
    </div>
    <Image field={fields?.Image} />
  </section>
);

export const Default = HowItWorks;
export default HowItWorks;
