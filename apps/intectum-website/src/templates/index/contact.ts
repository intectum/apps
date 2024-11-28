import { cvUrl } from '../../common/types';

const renderContactHTML = () => `
  <div class="c-home-contact u-container u-fc u-gap u-center u-text-center">
    <img
      class="c-home-contact__profile"
      src="/images/profile.jpg"
      alt="Me"
      loading="lazy"
    />
    <div>Senior developer with 17 years of experience</div>
    <div class="u-text-large">Let's get in touch</div>
    <div class="u-fr u-gap u-center u-wrap">
      <div class="u-fr u-gap u-center">
        <a
          is="basis-a"
          class="u-p"
          href="tel://+447733626352"
          title="Phone (UK)"
        >
          <i class="fa-solid fa-phone u-icon"></i>
        </a>
        <a
          is="basis-a"
          class="u-p"
          href="https://wa.me/64226754763"
          title="WhatsApp"
        >
          <i class="fa-brands fa-whatsapp u-icon"></i>
        </a>
        <a
          is="basis-a"
          class="u-p"
          href="mailto:gyan@intectum.nz"
          title="Email"
        >
          <i class="fa-solid fa-envelope u-icon"></i>
        </a>
      </div>
      <div class="u-fr u-gap u-center">
        <a
          is="basis-a"
          class="u-p"
          href="https://www.linkedin.com/in/intectum"
          title="LinkedIn"
        >
          <i class="fa-brands fa-linkedin u-icon"></i>
        </a>
        <a
          is="basis-a"
          class="u-p"
          href="https://github.com/intectum"
          title="GitHub"
        >
          <i class="fa-brands fa-github u-icon"></i>
        </a>
        <a
          is="basis-a"
          class="u-p"
          href="https://stackexchange.com/users/389835/gyan"
          title="Stack Exchange"
        >
          <i class="fa-brands fa-stack-exchange u-icon"></i>
        </a>
      </div>
    </div>
    <a
      is="basis-a"
      class="u-fr u-center"
      href="https://arc.dev/@premgyan"
      title="arc() Profile"
    >
      <img
        class="c-home-contact__certification u-mr--sm"
        src="/images/arc-dot-dev.jpg"
        alt="arc()"
        loading="lazy"
      />
      Certified Remote Developer
    </a>
    <a
      is="basis-a"
      class="u-fr u-center"
      href="${cvUrl}"
      title="Curriculum Vitae Download"
    >
      <i class="fa-solid fa-file-pdf u-icon u-mr--sm"></i>
      Curriculum Vitae
    </a>
  </div>
`;

export default renderContactHTML;
