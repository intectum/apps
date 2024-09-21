'use client';

import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FC, useContext, useEffect, useState } from 'react';

import { themes } from 'apps-core';
import { Button, Circle, Icon, Panel, ThemeContext } from 'apps-web';

import { MainThemeContext } from '../common/themes';

const ThemeSelector: FC = () =>
{
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [ _, setMainTheme ] = useContext(MainThemeContext);

  const [ open, setOpen ] = useState<boolean>();
  const [ primary, setPrimary ] = useState<string>('stone');
  const [ accent, setAccent ] = useState<string>('water');

  useEffect(() =>
  {
    setMainTheme({ ...themes[primary], accent: themes[accent].accent });
  }, [ primary, accent ]);

  const themeNames = Object.keys(themes).filter(themeName => themeName !== 'main' && themeName !== 'monochrome');

  return (
    <>
      <div className="o-row c-theme-selector u-align--center">
        <Button circle className="c-button--minimal" onClick={() => setOpen(!open)} title="Modify theme">
          <Circle shade="medium" size="small" className="c-theme-selector__primary" />
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
                    <Circle theme={themeName} shade="medium" className="c-theme-selector__primary" />
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
