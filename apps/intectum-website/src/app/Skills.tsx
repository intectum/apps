'use client';

import { FC, useEffect, useState } from 'react';

import { Button, Panel, useThemes } from 'apps-web';

import { Skill, SkillCategory } from '../common/types';

type Props =
{
  skills: Skill[];
};

const Skills: FC<Props> = ({ skills }) =>
{
  const themes = useThemes();

  const [ category, setCategory ] = useState<SkillCategory>('lang');

  const goodEnoughSkills = skills.filter(skill => skill.proficiency > 1);
  const skillCounts = goodEnoughSkills
    .reduce<Partial<Record<SkillCategory, number>>>((previousValue, currentValue) =>
      ({
        ...previousValue,
        [currentValue.category]: (previousValue[currentValue.category] ?? 0) + 1
      }), {});

  const maxSkillCount = Object.values(skillCounts)
    .reduce((previousValue, currentValue) => Math.max(previousValue, currentValue), 0);

  const skillsInCategory = goodEnoughSkills.filter(skill => skill.category === category);
  skillsInCategory.sort((a, b) => b.proficiency - a.proficiency);

  useEffect(() =>
  {
    const observer = new IntersectionObserver(entries =>
    {
      for (const entry of entries)
      {
        entry.target.classList.toggle('c-home-skills__skill-bar-filled--animated', entry.isIntersecting);
      }
    });

    const elements = document.querySelectorAll('.c-home-skills__skill-bar-filled');
    for (let index = 0; index < elements.length; index++)
    {
      observer.observe(elements[index]);
    }

    return () => observer.disconnect();
  }, [ category ]);

  return (
    <div className="c-home-skills u-flex u-flex--centered">
      <div className="c-home-skills__detail u-flex u-flex--column u-flex--spaced u-text-center u-m">
        <h2>Toolbox</h2>
        <div className="u-text-large">I have a passion for high quality code that is as simple as possible, learn new tech and concepts very quickly and pay a lot of attention to the details</div>
      </div>
      <div className="c-home-skills__matrix u-flex u-flex--column u-flex--centered u-flex--spaced u-m">
        <div className="u-flex u-flex--centered u-flex--spaced u-flex--wrap">
          <Button
            shade={category === 'lang' ? 'accent' : undefined}
            onClick={() => setCategory('lang')}
          >
            Languages
          </Button>
          <Button
            shade={category === 'front' ? 'accent' : undefined}
            onClick={() => setCategory('front')}
          >
            Front End
          </Button>
          <Button
            shade={category === 'back' ? 'accent' : undefined}
            onClick={() => setCategory('back')}
          >
            Back End
          </Button>
          <Button
            shade={category === 'other' ? 'accent' : undefined}
            onClick={() => setCategory('other')}
          >
            Other
          </Button>
        </div>
        {skillsInCategory.map(skill =>
          <div
            key={skill.slug}
            className="c-home-skills__skill u-flex"
          >
            <Panel shade="front" className="c-home-skills__skill-name u-p--xs">{skill.name}</Panel>
            <div
              className="c-home-skills__skill-bar u-flex-item--1"
              style={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ['--skill-proficiency' as any]: skill.proficiency,
                backgroundColor: themes.current.medium
              }}
            >
              <div
                className="c-home-skills__skill-bar-filled"
                style={{ backgroundColor: themes.current.accent }}
              />
            </div>
          </div>
        )}
        {Array.from(Array(maxSkillCount - skillsInCategory.length)).map(index =>
          <div key={`padding-${index}`} className="c-home-skills__skill" />
        )}
      </div>
    </div>
  );
};

export default Skills;
