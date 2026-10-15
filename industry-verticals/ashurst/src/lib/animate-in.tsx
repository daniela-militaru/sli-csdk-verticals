import { JSX, ReactNode } from 'react';

type AnimateInProps = {
  children: ReactNode;
  motion?: string;
  delay?: number;
};

export const AnimateIn = ({ children }: AnimateInProps): JSX.Element => (
  <div className="ash-animate">{children}</div>
);
