import { Skeleton, Typography } from '@skill-street-ui/core-design';

export const BlogCard = () => {
  return (
    <div className="flex w-full max-w-96 flex-col gap-3">
      <Skeleton className="rounded-lg w-full aspect-video overflow-hidden" />
      <div className="flex flex-col gap-2">
        <Typography
          fontFamily={'roboto'}
          fontSize="body-s"
          fontWeight={'semibold'}
          gradientColor
        >
          Front-end Development
        </Typography>
        <Typography
          fontSize="h3"
          fontWeight={'medium'}
          fontFamily={'helvetica'}
        >
          Crafting Seamless User Experiences
        </Typography>
        <Typography fontFamily={'roboto'} className="text-body-secondary">
          The demand for Full Stack Developers is robust and continues to grow.
          Companies across industries require professionals who can build and
          maintain end-to-end web applications.
        </Typography>
        <div className="flex items-center justify-between my-2">
          <Typography fontSize="h6" fontFamily={'roboto'} fontWeight={'bold'}>
            Rushikesh Bijapurkar
          </Typography>
          <Typography
            fontSize="body-s"
            fontFamily={'roboto'}
            className="text-body-tertiary"
          >
            9 Feb, 2024
          </Typography>
        </div>
      </div>
    </div>
  );
};
