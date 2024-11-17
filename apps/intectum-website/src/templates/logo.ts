import { classes } from 'apps-web';

const renderLogoHTML = (className?: string) => `
  <div class="${classes([ 'c-logo', className ])}">
    <div>~</div>
    <div>~</div>
    <div>~</div>
  </div>
`;

export default renderLogoHTML;
