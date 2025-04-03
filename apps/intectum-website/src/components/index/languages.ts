export class Languages extends HTMLDivElement
{
  connectedCallback()
  {
    const setTabAll = this.querySelectorAll<HTMLButtonElement>('[data-action="set-tab"]');
    for (const setTab of setTabAll)
    {
      setTab.onclick = () => this.setTab(Number(setTab.dataset.index));
    }
  }

  setTab(index: number)
  {
    const isGpuTabActive = index === 1;

    const cpuCodeAll = this.querySelectorAll<HTMLElement>('[data-section="cpu-code"]');
    for (const cpuCode of cpuCodeAll)
    {
      cpuCode.style.display = isGpuTabActive ? 'none' : '';
    }

    const gpuCodeAll = this.querySelectorAll<HTMLElement>('[data-section="gpu-code"]');
    for (const gpuCode of gpuCodeAll)
    {
      gpuCode.style.display = isGpuTabActive ? '' : 'none';
    }

    const setTabAll = this.querySelectorAll<HTMLButtonElement>('[data-action="set-tab"]');
    for (const setTab of setTabAll)
    {
      const isActiveTab = Number(setTab.dataset.index) === index;
      setTab.classList.toggle('c-tab-block__tab--selected', isActiveTab);
      setTab.classList.remove('u-pulse');
    }
  }
}

export const defineHomeLanguages = () =>
  customElements.define('intectum-home-languages', Languages, { extends: 'div' });
