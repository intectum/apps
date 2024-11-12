import renderOSHOQuoteHTML from './quote';

const renderOSHOPageHTML = () =>
{
  return `
    <section>
      ${renderOSHOQuoteHTML()}
    </section>

    <section class="u-fc u-gap">
      <h2>OSHO Active Meditations</h2>
      <p>Everyone is welcome to come and experience OSHO's active meditations! They are designed to help modern people enter into meditation. To learn more, see <a is="basis-a" href="https://www.osho.com/meditation/osho-active-meditations/why-active-meditations">Why active meditations?</a> We host meditations at a few locations so make sure you come to the right one :P</p>
      <p><strong><em>Please arrive ten minutes before the meditation starts. It is best to join the mailing list (below) so that we can notify you if we have a cancellation.</em></strong></p>
      <h3>This week's meditations</h3>
      <osho-events></osho-events>
    </section>

    <section class="u-fc u-gap">
      <h2>Got questions? Want to join the mailing list?</h2>
      <p>Don't hesitate to contact Gyan at <a is="basis-a" href="mailto:info@osho.nz">info@osho.nz</a>. For more information about Osho, you can also go to <a is="basis-a" href="https://www.osho.com">www.osho.com</a>.</p>
    </section>
  `;
};

export default renderOSHOPageHTML;
