import { classes } from 'based';

const renderLogoHTML = (className?: string) => `
  <div class="${classes([ 'c-logo', className ])}">
    <div>~</div>
    <div>~</div>
    <div>~</div>
  </div>
`;

export default renderLogoHTML;
