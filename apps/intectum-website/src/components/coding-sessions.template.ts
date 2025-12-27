import renderYouTubeSvg from '../icons/youtube';

const renderCodingSessionsHTML = () => `
  <div class="u-h--screen u-container u-fc-dfr u-center">
    <iframe src="https://www.youtube.com/embed/dSHXL844HKk?si=DB-9TLCWqGNYDvMU" class="u-w--full u-df1 u-aspect--16-9 u-rounded" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <div class="u-df1 u-fc u-gap u-align--center u-text-center u-m">
      ${renderYouTubeSvg(72)}
      <h2>Coding Sessions</h2>
      <div class="u-text-large">Join me for some coding sessions while I work on projects ranging from compilers to graphics, real-time simulations, games and whatever else interests me in the moment.</div>
      <a href="https://www.youtube.com/@intectum" class="c-button u-panel--accent u-rounded">Watch more</a>
    </div>
  </div>
`;

export default renderCodingSessionsHTML;
