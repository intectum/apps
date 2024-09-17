import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { FC } from 'react';

import { Icon } from 'apps-web';

const Title: FC = () =>
  <div className="c-home-title u-fc u-center u-text-center">
    <div className="c-home-title__welcome u-text-large">Welcome to</div>
    <h1 className="c-home-title__intectum">
      {Array.from('intectum').map((char, index) =>
        <span key={index} className={`o-scroll-animation c-home-title__intectum__char c-home-title__intectum__char-${index}`}>
          {char}
        </span>
      )}
    </h1>
    <div className="o-scroll-animation c-home-title__scroll-icon">
      <div className="c-home-title__scroll-icon__bobbing">
        <Icon icon={faAnglesDown} size="large" />
      </div>
    </div>
  </div>;

export default Title;
