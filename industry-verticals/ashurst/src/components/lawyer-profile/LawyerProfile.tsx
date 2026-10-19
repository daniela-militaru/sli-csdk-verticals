import { JSX, useState } from 'react';
import {
  ImageField,
  Link,
  LinkField,
  RichText,
  RichTextField,
  Text,
  TextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { AnimateIn } from 'src/lib/animate-in';
import { FieldImage } from 'src/lib/field-image';

type Fields = {
  Name?: TextField;
  Role?: TextField;
  Office?: TextField;
  Image?: ImageField;
  Phone?: TextField;
  Mobile?: TextField;
  Email?: TextField;
  LinkedIn?: LinkField;
  Headline?: TextField;
  Bio?: RichTextField;
  Quote?: TextField;
  QuoteSource?: TextField;
  Sectors?: RichTextField;
  Services?: RichTextField;
  Experience?: RichTextField;
  Credentials?: RichTextField;
};
type Props = ComponentProps & { fields?: Fields };
type Tab = 'overview' | 'experience';

const Contact = ({
  field,
  scheme,
  editing,
}: {
  field?: TextField;
  scheme: 'tel' | 'mailto';
  editing: boolean;
}): JSX.Element | null => {
  if (!field?.value && !editing) return null;
  if (editing) return <Text field={field} tag="span" />;
  return <a href={`${scheme}:${field?.value}`}>{field?.value}</a>;
};

const Profile = ({
  fields,
  params,
  rendering,
  animated,
}: Props & { animated?: boolean }): JSX.Element => {
  const { page } = useSitecore();
  const editing = page.mode.isEditing;
  const [tab, setTab] = useState<Tab>('overview');
  const hasExperience = editing || !!fields?.Experience?.value;
  const show = (target: Tab) => editing || tab === target;

  const card = (
    <div className="ash-profile-card">
      <p className="ash-kicker">
        <Text field={fields?.Office} />
      </p>
      <h1>
        <Text field={fields?.Name} />
      </h1>
      <p className="ash-profile-role">
        <Text field={fields?.Role} />
      </p>
      <div className="ash-profile-contact">
        <Contact field={fields?.Phone} scheme="tel" editing={editing} />
        <Contact field={fields?.Mobile} scheme="tel" editing={editing} />
        <Contact field={fields?.Email} scheme="mailto" editing={editing} />
        {fields?.LinkedIn && (fields.LinkedIn.value?.href || editing) ? (
          <Link field={fields.LinkedIn} />
        ) : null}
      </div>
    </div>
  );

  return (
    <section
      className={`ash-profile ${params?.styles ?? ''}`}
      key={params?.RenderingIdentifier ?? rendering?.uid}
    >
      <header className="ash-profile-hero">
        <figure>
          <FieldImage field={fields?.Image} mode="cover" />
        </figure>
        {animated ? <AnimateIn>{card}</AnimateIn> : card}
      </header>

      {hasExperience && !editing ? (
        <div className="ash-profile-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'overview'}
            onClick={() => setTab('overview')}
          >
            Overview
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'experience'}
            onClick={() => setTab('experience')}
          >
            Experience
          </button>
        </div>
      ) : null}

      {show('overview') ? (
        <div className="ash-profile-body" role="tabpanel">
          <div className="ash-profile-main">
            <h2>Introduction</h2>
            <h3>
              <Text field={fields?.Headline} />
            </h3>
            <RichText field={fields?.Bio} />
            {fields?.Quote?.value || editing ? (
              <blockquote>
                <p>
                  <Text field={fields?.Quote} />
                </p>
                <cite>
                  <Text field={fields?.QuoteSource} />
                </cite>
              </blockquote>
            ) : null}
          </div>
          <aside className="ash-profile-focus">
            <h2>Areas of focus</h2>
            <h3>Sectors</h3>
            <RichText field={fields?.Sectors} />
            <h3>Services</h3>
            <RichText field={fields?.Services} />
            {fields?.Credentials?.value || editing ? (
              <>
                <h3>Education &amp; credentials</h3>
                <RichText field={fields?.Credentials} />
              </>
            ) : null}
          </aside>
        </div>
      ) : null}

      {hasExperience && show('experience') ? (
        <div className="ash-profile-experience" role="tabpanel">
          <h2>Professional experience</h2>
          <RichText field={fields?.Experience} />
        </div>
      ) : null}
    </section>
  );
};

export const Default = (props: Props): JSX.Element => <Profile {...props} />;
export const Animated = (props: Props): JSX.Element => <Profile {...props} animated />;
