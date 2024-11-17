const renderProjectsPageHTML = (index: number, frontHTML: string, backHTML: string) => `
  <div
    class="c-home-projects__page u-scroll-animation"
    style="--page-index: ${index};"
  >
    <div class="c-home-projects__page-side c-home-projects__page-side--front u-panel--invert">
      ${frontHTML}
    </div>
    <div class="c-home-projects__page-side c-home-projects__page-side--back u-panel--invert u-scroll-animation">
      ${backHTML}
    </div>
  </div>
`;

export default renderProjectsPageHTML;
