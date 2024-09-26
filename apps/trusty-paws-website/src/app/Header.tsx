'use client';

import { FC } from 'react';

import { Button, Panel } from 'apps-web';

const Header: FC = () =>
  <header>
    <Panel theme="alt" className="u-fr u-align--center u-justify--space-between u-p">
      Trusty Paws
      <Button invert onClick={() => console.log('book')}>Book</Button>
    </Panel>
  </header>;

export default Header;
