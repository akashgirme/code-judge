'use client';
import Image from 'next/image';
import backgroundImage from '../../public/images/Auth-Background.jpg';
import { useMediaQuery } from 'apps/client/features/hooks';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const isWebView = useMediaQuery('(min-width:800px)');
  return (
    <div className="flex min-h-screen overflow-auto">
      {isWebView && (
        <div className="relative w-full min-h-screen">
          <Image
            src={backgroundImage}
            alt="Background Image"
            fill
            className="absolute z-0 object-cover object-center"
          />
        </div>
      )}
      <div className="flex flex-grow justify-center w-full md:pt-20 ">
        <div className=" flex flex-col w-full md:w-100">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
