import { FC } from 'react';

import { Icon } from 'apps-web';

const Contact: FC = () =>
  <div className="c-home-contact u-flex u-flex--column u-flex--centered u-flex--spaced u-text-center">
    <img className="c-home-contact__profile" src="/images/profile.jpg" alt="Me"/>
    <div>Senior developer with 17 years of experience</div>
    <div className="u-text-large">Let's get in touch</div>
    <div className="u-flex u-flex--centered u-flex--spaced u-flex--wrap">
      <div className="u-flex u-flex--centered u-flex--spaced">
        <a
          className="u-p"
          href="tel://+447733626352"
          target="_blank"
          referrerPolicy="no-referrer"
          title="Phone (UK)"
        >
          <Icon icon="phone"/>
        </a>
        <a
          className="u-p"
          href="https://wa.me/64226754763"
          target="_blank"
          referrerPolicy="no-referrer"
          title="WhatsApp"
        >
          <Icon icon={[ 'fab', 'whatsapp' ]}/>
        </a>
        <a
          className="u-p"
          href="mailto:gyan@intectum.nz"
          target="_blank"
          referrerPolicy="no-referrer"
          title="Email"
        >
          <Icon icon="envelope"/>
        </a>
      </div>
      <div className="u-flex u-flex--centered u-flex--spaced">
        <a
          className="u-p"
          href="https://www.linkedin.com/in/intectum"
          target="_blank"
          referrerPolicy="no-referrer"
          title="LinkedIn"
        >
          <Icon icon={[ 'fab', 'linkedin-in' ]}/>
        </a>
        <a
          className="u-p"
          href="https://github.com/intectum"
          target="_blank"
          referrerPolicy="no-referrer"
          title="GitHub"
        >
          <Icon icon={[ 'fab', 'github' ]}/>
        </a>
        <a
          className="u-p"
          href="https://stackexchange.com/users/389835/gyan"
          target="_blank"
          referrerPolicy="no-referrer"
          title="Stack Exchange"
        >
          <Icon icon={[ 'fab', 'stack-exchange' ]}/>
        </a>
      </div>
    </div>
    <a
      className="u-flex u-flex--centered"
      href="https://arc.dev/@premgyan"
      target="_blank"
      referrerPolicy="no-referrer"
      title="arc() Profile"
    >
      <img className="c-home-contact__certification u-mr--sm" src="/images/arc-dot-dev.jpg" alt="arc()"/>
      Certified Remote Developer
    </a>
    <a
      className="u-flex u-flex--centered"
      href="https://docs.google.com/document/d/15zjwNuKiEQEht9gHmLw94-1vkTog9jSKBGfKJvu7vJc"
      target="_blank"
      referrerPolicy="no-referrer"
      title="Curriculum Vitae Download"
    >
      <Icon className="u-mr--sm" icon="file-pdf"/>
      Curriculum Vitae
    </a>
  </div>;

export default Contact;
