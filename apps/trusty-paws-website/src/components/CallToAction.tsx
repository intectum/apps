import { FC } from 'react';

import { Button, Panel } from 'apps-web';

import { CallToAction as CallToActionType } from '../graphql/types';

type Props =
{
  callToAction: CallToActionType;
};

const CallToAction: FC<Props> = ({ callToAction }) =>
{
  if (!callToAction.description)
  {
    return (
      <div className="c-call-to-action--compact u-fr u-justify--center">
        <Button invert size="large" square className="c-button c-button--primary">{callToAction.linkLabel}</Button>
      </div>
    );
  }

  return (
    <Panel theme="alt" className="u-py--xl">
      <div className="o-container o-column">
        <h2>{callToAction.title}</h2>
        <div>{callToAction.description}</div>
        <div className="u-fr u-justify--center">
          <Button theme="alt" invert className="c-button c-button--primary">{callToAction.linkLabel}</Button>
        </div>
      </div>
    </Panel>
  );
};

export default CallToAction;
