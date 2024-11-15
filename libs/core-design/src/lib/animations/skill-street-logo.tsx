'use client';
import { SkillStreetLogo_SRC } from '../constants';
import dynamic from 'next/dynamic';

const Player = dynamic(
  () =>
    import('@lottiefiles/react-lottie-player').then((lottie) => lottie.Player),
  {
    ssr: false,
  }
);

export const SkillStreetLogo = () => {
  return (
    <div className="flex flex-wrap">
      <Player
        autoplay
        keepLastFrame
        src={SkillStreetLogo_SRC}
        style={{ height: '800px', width: '800px' }}
        className="border"
      />
    </div>
  );
};
