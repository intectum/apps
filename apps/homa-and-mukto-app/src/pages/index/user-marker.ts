const renderUserMarkerHTML = (count: number, id?: string) => `
  <div class="c-button u-fr u-center" style="padding: 0; transform: translateY(50%);" data-user-id="${id ?? ''}">
    <svg style="position: absolute; z-index: -1" fill="var(--color-gold)" width="96px" height="96px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
      <circle cx="120" cy="120" opacity=".6" r="70" />
      <circle cx="120" cy="120" opacity=".3" r="90" />
      <circle cx="120" cy="120" opacity=".2" r="110" />
      <circle cx="120" cy="120" opacity=".1" r="130" />
    </svg>
    <div style="color: #000; font-size: 24px">${count}</div>
  </div>
`;

export default renderUserMarkerHTML;
