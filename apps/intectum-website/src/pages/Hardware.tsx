import { FC } from 'react';

const Hardware: FC = () =>
{
  return (
    <div className="o-container">
      <h1>woodworking & hardware</h1>
      <h2>High Performance Wood</h2>
      <p>A custom open-case wooden PC that has almost completed the design phase.</p>
      <iframe
        title="High Performance Wood"
        src="https://myhub.autodesk360.com/ue2b54ade/shares/public/SH7f1edQT22b515c761e8548b111ac9653e6?mode=embed"
        allowFullScreen
      />
      <h2>Stealth Camper</h2>
      <p>A custom campervan based on a Toyota Hiace that provides a lot of internal space while also providing a lot of functionality and is complemented with some nice Arduino and Raspberry Pi powered tech. More details to come later.</p>
      <iframe
        title="Stealth Camper"
        src="https://myhub.autodesk360.com/ue2b54ade/shares/public/SH7f1edQT22b515c761ecb228acfb3748c77?mode=embed"
        allowFullScreen
      />
    </div>
  );
};

export default Hardware;
