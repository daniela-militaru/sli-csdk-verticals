import { JSX } from 'react';
import { Link, LinkField, TextField } from '@sitecore-content-sdk/nextjs';

export const QuoteForm = ({
  placeholder,
  buttonLabel,
  buttonLink,
}: {
  placeholder?: TextField;
  buttonLabel?: TextField;
  buttonLink?: LinkField;
}): JSX.Element => (
  <form action={buttonLink?.value?.href || '#'}>
    <input
      aria-label="Search by postcode or location"
      placeholder={placeholder?.value?.toString() || 'Search by postcode or location'}
    />
    {buttonLink?.value?.href ? (
      <Link className="as-btn" field={buttonLink} />
    ) : (
      <button className="as-btn" type="submit">
        {buttonLabel?.value || 'Get a quote'}
      </button>
    )}
  </form>
);
