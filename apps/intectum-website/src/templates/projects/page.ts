const renderPageHTML = () => `
  <div is="intectum-projects-page" class="u-container u-py">
    <h1 class="u-text-center">projects</h1>
    <form class="u-text-center u-my">
      <input
        type="search"
        name="search"
        class="c-project-grid__search"
        placeholder="What are you looking for?"
      />
    </form>
    <div data-name="project-grid" class="c-project-grid__grid"></div>
  </div>
`;

export default renderPageHTML;
