import { JSX, useEffect, useState } from 'react';
import { Link, LinkField, TextField } from '@sitecore-content-sdk/nextjs';
import { recordSearchEvent } from 'src/lib/cdp/cdp-session-tracker';

export const QuoteForm = ({
  placeholder,
  buttonLabel,
  buttonLink,
}: {
  placeholder?: TextField;
  buttonLabel?: TextField;
  buttonLink?: LinkField;
}): JSX.Element => {
  const [query, setQuery] = useState('');
  useEffect(() => {
    const value = query.trim();
    if (value.length < 2) return undefined;
    const timer = window.setTimeout(() => recordSearchEvent(value, 'quote'), 400);
    return () => window.clearTimeout(timer);
  }, [query]);

  return (
    <form action={buttonLink?.value?.href || '#'}>
      <input
        aria-label="Search by postcode or location"
        placeholder={placeholder?.value?.toString() || 'Search by postcode or location'}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
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
};
