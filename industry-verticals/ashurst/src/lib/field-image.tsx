import { Image, ImageField } from '@sitecore-content-sdk/nextjs';
import { JSX } from 'react';

type FieldImageProps = {
  field?: ImageField;
  mode?: 'cover' | 'contain' | 'fill-width' | 'column-cover';
  className?: string;
};

export const FieldImage = ({ field, className }: FieldImageProps): JSX.Element | null => {
  if (!field?.value?.src) return null;
  return <Image field={field} className={className} />;
};
