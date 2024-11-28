import renderOSHOQuoteHTML from './quote';

const renderPageHTML = () => `
  ${renderOSHOQuoteHTML()}
  <div class="u-fc u-gap">
    <h2>OSHO Active Meditations</h2>
    <p>Everyone is welcome to come and experience OSHO's active meditations! They are designed to help modern people enter into meditation. To learn more, see <a is="basis-a" href="https://www.osho.com/meditation/osho-active-meditations/why-active-meditations">Why active meditations?</a> We host meditations at a few locations so make sure you come to the right one :P</p>
    <p><strong><em>Please arrive ten minutes before the meditation starts. It is best to join the mailing list (below) so that we can notify you if we have a cancellation.</em></strong></p>
    <h3>This week's meditations</h3>
    <div is="osho-events" class="c-events u-fc u-gap">
      Searching for meditations...
    </div>
  </div>
`;

export default renderPageHTML;
