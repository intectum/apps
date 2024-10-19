import NextLink, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes, FC, PropsWithChildren } from 'react';

import { Themed } from 'apps-core';

export type Props = Themed & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps;

const Button: FC<PropsWithChildren<Props>> = ({ theme = 'main', shade = 'accent', style, ...linkProps }) =>
{
  const external = typeof linkProps.href === 'string' ? !!linkProps.href.match(/^[a-z]+:/)?.length : !!linkProps.href.protocol;

  return (
    <NextLink
      style={{
        color: theme && `var(--theme-${theme}-${shade})`,
        ...style
      }}
      target={external ? '_blank' : undefined}
      referrerPolicy={external ? 'no-referrer' : undefined}
      {...linkProps}
    />
  );
};

export default Button;
