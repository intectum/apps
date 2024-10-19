'use client';

import { FC } from 'react';

import { Button, Panel } from 'apps-web';

const Header: FC = () =>
  <header>
    <Panel theme="alt" className="u-fr u-align--center u-justify--space-between u-p--lg">
      <img src="/logo-full.svg" height={60} />
      <Button theme="alt" invert href="/#contact-form">Book</Button>
    </Panel>
  </header>;

export default Header;
