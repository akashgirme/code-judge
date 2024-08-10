import {
  BlogFeedbackField,
  EmailShare,
  FacebookShare,
  LinkShare,
  LinkedInShare,
  TwitterShare,
  Typography,
} from '@skill-street-ui/core-design';
import { ThumbsDown, ThumbsUp } from 'iconoir-react';
import { useState } from 'react';

interface ExternalLinksProps {
  blogTitle: string;
}

export const ExternalLinks = ({ blogTitle }: ExternalLinksProps) => {
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(
    null
  );
  return (
    <div className="w-max  justify-evenly gap-8 rounded-3xl py-6 px-9 bg-secondary-border-fill mx-auto hidden lg:grid grid-cols-2">
      <div className="w-80 space-y-3">
        <Typography fontSize="h2" fontFamily={'helvetica'} fontWeight={'bold'}>
          Did you find this blog helpful?
        </Typography>
        {!userReaction && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setUserReaction('like')}
              className="size-12 bg-surface-container flex items-center justify-center rounded-xl"
            >
              <ThumbsUp className="size-6" />
            </button>
            <button
              onClick={() => setUserReaction('dislike')}
              className="size-12 bg-surface-container flex items-center justify-center rounded-xl"
            >
              <ThumbsDown className="size-6" />
            </button>
          </div>
        )}

        {userReaction === 'like' && (
          <Typography
            className="h-12 animate-slideup flex items-end py-2"
            fontFamily={'roboto'}
            fontSize={'body-m'}
            fontWeight={'regular'}
          >
            Thank you for the Feedback ❤️️
          </Typography>
        )}

        {userReaction === 'dislike' && <BlogFeedbackField />}
      </div>
      <div style={{ width: '288px' }} className="flex flex-col flex-1  w-max">
        <Typography
          fontSize="body-l"
          fontFamily={'helvetica'}
          fontWeight="medium"
        >
          Spread the blog to those in need. Share the knowledge!
        </Typography>
        <div className="flex gap-3 flex-1 items-end">
          <LinkShare />
          <FacebookShare
            url={window.location.href}
            quote={blogTitle}
            // TODO: Add Hashtags
            hashtag={undefined}
          />
          <TwitterShare
            url={window.location.href}
            // TODO: Twitter username comes here
            via="SkillStreetinc"
            title={blogTitle}
            hashtags={[]}
          />
          <LinkedInShare url={window.location.href} />
          <EmailShare
            url={window.location.href}
            subject={`${blogTitle} | Blog by SkillStreet.io`}
          />
        </div>
      </div>
    </div>
  );
};
