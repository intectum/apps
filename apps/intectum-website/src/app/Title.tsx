import { FC } from 'react';

import { Icon } from 'apps-web';

const Title: FC = () =>
  <div className="c-home-title u-flex u-flex--column u-flex--centered u-text-center">
    <div className="c-home-title__welcome u-text-large">Welcome to</div>
    <div className="c-home-title__intectum">
      {Array.from('intectum').map((char, index) =>
        <span key={index} className={`o-scroll-animation c-home-title__intectum__char c-home-title__intectum__char-${index}`}>
          {char}
        </span>
      )}
    </div>
    <div className="o-scroll-animation c-home-title__scroll-icon">
      <div className="c-home-title__scroll-icon__bobbing">
        <Icon icon="angles-down" size="large" />
      </div>
    </div>
  </div>;

export default Title;
