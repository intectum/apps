'use client';

import { FC } from 'react';

import { Button, Panel } from 'apps-web';

import { alt } from '../common/themes';

const Header: FC = () =>
  <header>
    <Panel theme={alt} className="u-flex u-flex--centered u-flex--space-between u-p">
      Trusty Paws
      <Button shade="front" onClick={() => console.log('book')}>Book</Button>
    </Panel>
  </header>;

export default Header;
