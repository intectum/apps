'use client';

import { FC, useEffect, useState } from 'react';

import { classes } from 'apps-web';

import { Skill, SkillCategory } from '../common/types';

type Props =
{
  skills: Skill[];
};

const Skills: FC<Props> = ({ skills }) =>
{
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
          <button
            type="button"
            className={classes([ 'c-button', category === 'lang' && 'c-button c-button--primary' ])}
            onClick={() => setCategory('lang')}
          >
            Languages
          </button>
          <button
            type="button"
            className={classes([ 'c-button', category === 'front' && 'c-button c-button--primary' ])}
            onClick={() => setCategory('front')}
          >
            Front End
          </button>
          <button
            type="button"
            className={classes([ 'c-button', category === 'back' && 'c-button c-button--primary' ])}
            onClick={() => setCategory('back')}
          >
            Back End
          </button>
          <button
            type="button"
            className={classes([ 'c-button', category === 'other' && 'c-button--primary' ])}
            onClick={() => setCategory('other')}
          >
            Other
          </button>
        </div>
        {skillsInCategory.map(skill =>
          <div
            key={skill.slug}
            className="c-home-skills__skill u-flex"
          >
            <div className="c-home-skills__skill-name">{skill.name}</div>
            <div
              className="c-home-skills__skill-bar u-flex-item--1"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              style={{ ['--skill-proficiency' as any]: skill.proficiency }}
            >
              <div className="c-home-skills__skill-bar-filled"/>
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
