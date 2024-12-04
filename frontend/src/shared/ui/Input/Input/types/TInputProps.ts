import { type ComponentPropsWithRef, type ReactElement } from 'react';

type TInputOwnProps = {
  icon?: ReactElement<HTMLOrSVGElement>;
  size: 'large' | 'regular';
  type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
};

type TInputProps = Omit<ComponentPropsWithRef<'input'>, keyof TInputOwnProps> & TInputOwnProps;

export { type TInputProps };
