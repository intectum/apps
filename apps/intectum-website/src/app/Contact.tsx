import { faGithub, faLinkedinIn, faStackExchange, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFilePdf, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FC } from 'react';

import { Icon } from 'apps-web';

const Contact: FC = () =>
  <div className="o-container o-column c-home-contact u-center u-text-center">
    <img
      className="c-home-contact__profile"
      src="/images/profile.jpg"
      alt="Me"
      loading="lazy"
    />
    <div>Senior developer with 17 years of experience</div>
    <div className="u-text-large">Let's get in touch</div>
    <div className="o-row u-center u-wrap">
      <div className="o-row u-center">
        <a
          className="u-p"
          href="tel://+447733626352"
          target="_blank"
          referrerPolicy="no-referrer"
          title="Phone (UK)"
        >
          <Icon icon={faPhone} />
        </a>
        <a
          className="u-p"
          href="https://wa.me/64226754763"
          target="_blank"
          referrerPolicy="no-referrer"
          title="WhatsApp"
        >
          <Icon icon={faWhatsapp} />
        </a>
        <a
          className="u-p"
          href="mailto:gyan@intectum.nz"
          target="_blank"
          referrerPolicy="no-referrer"
          title="Email"
        >
          <Icon icon={faEnvelope} />
        </a>
      </div>
      <div className="o-row u-center">
        <a
          className="u-p"
          href="https://www.linkedin.com/in/intectum"
          target="_blank"
          referrerPolicy="no-referrer"
          title="LinkedIn"
        >
          <Icon icon={faLinkedinIn} />
        </a>
        <a
          className="u-p"
          href="https://github.com/intectum"
          target="_blank"
          referrerPolicy="no-referrer"
          title="GitHub"
        >
          <Icon icon={faGithub} />
        </a>
        <a
          className="u-p"
          href="https://stackexchange.com/users/389835/gyan"
          target="_blank"
          referrerPolicy="no-referrer"
          title="Stack Exchange"
        >
          <Icon icon={faStackExchange} />
        </a>
      </div>
    </div>
    <a
      className="u-fr u-center"
      href="https://arc.dev/@premgyan"
      target="_blank"
      referrerPolicy="no-referrer"
      title="arc() Profile"
    >
      <img
        className="c-home-contact__certification u-mr--sm"
        src="/images/arc-dot-dev.jpg"
        alt="arc()"
        loading="lazy"
      />
      Certified Remote Developer
    </a>
    <a
      className="u-fr u-center"
      href="https://docs.google.com/document/d/15zjwNuKiEQEht9gHmLw94-1vkTog9jSKBGfKJvu7vJc"
      target="_blank"
      referrerPolicy="no-referrer"
      title="Curriculum Vitae Download"
    >
      <Icon className="u-mr--sm" icon={faFilePdf} />
      Curriculum Vitae
    </a>
  </div>;

export default Contact;
