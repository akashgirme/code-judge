'use client';
import { SkillStreetLogoAlt_SRC } from '../constants';
import dynamic from 'next/dynamic';

const Player = dynamic(
  () =>
    import('@lottiefiles/react-lottie-player').then((lottie) => lottie.Player),
  {
    ssr: false,
  }
);

export const SkillStreetLogoAlt = () => {
  return (
    <div className="flex flex-wrap">
      <Player
        autoplay
        keepLastFrame
        src={SkillStreetLogoAlt_SRC}
        style={{ height: '800px', width: '800px' }}
        className="border"
      />
    </div>
  );
};
