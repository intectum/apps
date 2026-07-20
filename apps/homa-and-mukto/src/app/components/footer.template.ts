import renderArrowUpRightFromSquare from '../icons/arrow-up-right-from-square';

const renderFooterHTML = () => `
  <footer class="u-hide-md u-fr u-justify--center u-px--lg u-py" style="border-top: 2px solid var(--color-dark);">
    <a href="https://homaandmukto.com/groups" class="u-fr u-align--center u-gap--sm" style="text-decoration: underline;">
      ${renderArrowUpRightFromSquare()}
      Upcoming groups
    </a>
  </footer>
`;

export default renderFooterHTML;
