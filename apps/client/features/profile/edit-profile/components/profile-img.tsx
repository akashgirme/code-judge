import React from 'react';

import { ImageUploader, UserAvatar, UploadPreset } from 'apps/home/components';
import { Camera } from 'iconoir-react';

interface ProfileImgProps {
  cldImgURL?: string;
}

export const ProfileImg: React.FC<ProfileImgProps> = ({ cldImgURL }) => {
  return (
    <div className=" py-6 flex items-center justify-center ">
      <div className="relative">
        <UserAvatar cldImgURL={cldImgURL} imgHeight={100} imgWidth={100} />
        <div className="size-7 flex items-center justify-center absolute right-1 bottom-1 bg-secondary-border-fill rounded-full">
          <ImageUploader
            uploadPreset={UploadPreset.profilePics}
            uploaderOptions={{ croppingAspectRatio: 1 }}
            className="h-max w-max"
          >
            <Camera className="size-5 text-body-secondary" />
          </ImageUploader>
        </div>
      </div>
    </div>
  );
};
