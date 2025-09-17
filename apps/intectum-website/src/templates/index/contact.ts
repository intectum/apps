import { cvUrl } from '../../common/types';
import renderPhoneSvg from '../icons/phone';
import renderWhatsappSvg from '../icons/whatsapp';
import renderEnvelopeSvg from '../icons/envelope';
import renderLinkedInSvg from '../icons/linkedin';
import renderGitHubSvg from '../icons/github';
import renderStackExchangeSvg from '../icons/stack-exchange';
import renderFilePdfSvg from '../icons/file-pdf';

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
          ${renderPhoneSvg()}
        </a>
        <a
          is="basis-a"
          class="u-p"
          href="https://wa.me/64226754763"
          title="WhatsApp"
        >
          ${renderWhatsappSvg()}
        </a>
        <a
          is="basis-a"
          class="u-p"
          href="mailto:gyan@intectum.io"
          title="Email"
        >
          ${renderEnvelopeSvg()}
        </a>
      </div>
      <div class="u-fr u-gap u-center">
        <a
          is="basis-a"
          class="u-p"
          href="https://www.linkedin.com/in/intectum"
          title="LinkedIn"
        >
          ${renderLinkedInSvg()}
        </a>
        <a
          is="basis-a"
          class="u-p"
          href="https://github.com/intectum"
          title="GitHub"
        >
          ${renderGitHubSvg()}
        </a>
        <a
          is="basis-a"
          class="u-p"
          href="https://stackexchange.com/users/389835/gyan"
          title="Stack Exchange"
        >
          ${renderStackExchangeSvg()}
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
      ${renderFilePdfSvg('u-mr--sm')}
      Curriculum Vitae
    </a>
  </div>
`;

export default renderContactHTML;
