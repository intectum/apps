import { faGithub, faLinkedinIn, faStackExchange, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFilePdf, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FC } from 'react';

import { Icon, Link } from 'apps-web';

const Contact: FC = () =>
  <div className="c-home-contact u-container u-fc u-gap u-center u-text-center">
    <img
      className="c-home-contact__profile"
      src="/images/profile.jpg"
      alt="Me"
      loading="lazy"
    />
    <div>Senior developer with 17 years of experience</div>
    <div className="u-text-large">Let's get in touch</div>
    <div className="u-fr u-gap u-center u-wrap">
      <div className="u-fr u-gap u-center">
        <Link
          className="u-p"
          href="tel://+447733626352"
          title="Phone (UK)"
        >
          <Icon icon={faPhone} />
        </Link>
        <Link
          className="u-p"
          href="https://wa.me/64226754763"
          title="WhatsApp"
        >
          <Icon icon={faWhatsapp} />
        </Link>
        <Link
          className="u-p"
          href="mailto:gyan@intectum.nz"
          title="Email"
        >
          <Icon icon={faEnvelope} />
        </Link>
      </div>
      <div className="u-fr u-gap u-center">
        <Link
          className="u-p"
          href="https://www.linkedin.com/in/intectum"
          title="LinkedIn"
        >
          <Icon icon={faLinkedinIn} />
        </Link>
        <Link
          className="u-p"
          href="https://github.com/intectum"
          title="GitHub"
        >
          <Icon icon={faGithub} />
        </Link>
        <Link
          className="u-p"
          href="https://stackexchange.com/users/389835/gyan"
          title="Stack Exchange"
        >
          <Icon icon={faStackExchange} />
        </Link>
      </div>
    </div>
    <Link
      className="u-fr u-center"
      href="https://arc.dev/@premgyan"
      title="arc() Profile"
    >
      <img
        className="c-home-contact__certification u-mr--sm"
        src="/images/arc-dot-dev.jpg"
        alt="arc()"
        loading="lazy"
      />
      Certified Remote Developer
    </Link>
    <Link
      className="u-fr u-center"
      href="https://docs.google.com/document/d/15zjwNuKiEQEht9gHmLw94-1vkTog9jSKBGfKJvu7vJc"
      title="Curriculum Vitae Download"
    >
      <Icon className="u-mr--sm" icon={faFilePdf} />
      Curriculum Vitae
    </Link>
  </div>;

export default Contact;
