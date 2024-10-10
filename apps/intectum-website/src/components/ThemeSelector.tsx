'use client';

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FC, useEffect, useState } from 'react';

import { intectumThemes } from 'apps-core';
import { Button, Circle, Icon, Panel } from 'apps-web';

const ThemeSelector: FC = () =>
{
  const [ darkMode, setDarkMode ] = useState<boolean>();
  const [ open, setOpen ] = useState<boolean>();
  const [ primary, setPrimary ] = useState<string>('stone');
  const [ accent, setAccent ] = useState<string>('water');

  useEffect(() =>
  {
    if (darkMode === undefined)
    {
      setDarkMode(!window.matchMedia?.('(prefers-color-scheme: light)').matches);
    }

    if (darkMode)
    {
      document.body.classList.add('dark-mode');
    }
    else
    {
      document.body.classList.remove('dark-mode');
    }

    document.body.style.setProperty('--theme-main-back', darkMode ? intectumThemes[primary].front : intectumThemes[primary].back);
    document.body.style.setProperty('--theme-main-middle', intectumThemes[primary].middle);
    document.body.style.setProperty('--theme-main-front', darkMode ? intectumThemes[primary].back : intectumThemes[primary].front);
    document.body.style.setProperty('--theme-main-accent', intectumThemes[accent].accent);
  }, [ darkMode, primary, accent ]);

  const themeNames = Object.keys(intectumThemes).filter(themeName => themeName !== 'monochrome');

  return (
    <>
      <div className="o-row c-theme-selector u-align--center">
        <Button circle className="c-button--minimal" onClick={() => setOpen(!open)} title="Modify theme">
          <Circle shade="middle" size="small" className="c-theme-selector__primary" />
          <Circle shade="accent" size="small" className="c-theme-selector__accent" />
        </Button>
        <Button circle className="c-button--minimal" onClick={() => setDarkMode(!darkMode)} title={darkMode ? 'Light mode' : 'Dark mode'}>
          <Icon icon={darkMode ? faMoon : faSun}/>
        </Button>
        {open &&
          <>
            <div className="c-theme-selector__backdrop" onClick={() => setOpen(false)} />
            <Panel invert className="o-row c-theme-selector__dropdown u-rounded u-p--sm">
              <div className="o-column">
                {themeNames.map(themeName =>
                  <Button
                    key={themeName}
                    circle
                    className="c-button--minimal"
                    onClick={() => setPrimary(themeName)}
                    title={`Primary color: ${themeName}`}
                  >
                    <Circle theme={themeName} shade="middle" className="c-theme-selector__primary" />
                  </Button>
                )}
              </div>
              <div className="o-column">
                {themeNames.map(themeName =>
                  <Button
                    key={themeName}
                    circle
                    className="c-button--minimal"
                    onClick={() => setAccent(themeName)}
                    title={`Accent color: ${themeName}`}
                  >
                    <Circle theme={themeName} shade="accent" className="c-theme-selector__accent" />
                  </Button>
                )}
              </div>
            </Panel>
          </>
        }
      </div>
    </>
  );
};

export default ThemeSelector;
