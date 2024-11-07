import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';
export type IconType = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
>;

export type Prettify<T> = {
  [k in keyof T]: T[k];
};
