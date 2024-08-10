'use client';
import { BlogPost } from '@skill-street-ui/auth-client';
import {
  BlogCard,
  BlogNavPills,
  BlogDetails,
  BlogFooter,
  BlogPageTopbar,
  BlogHeroSection,
} from './components';
import { Typography } from '@skill-street-ui/core-design';
import { parseHTMLHeadings } from 'apps/home/utils';
import { useMemo } from 'react';

interface PostDetailViewProps {
  data: BlogPost;
}

export const PostDetailView = ({ data }: PostDetailViewProps) => {
  const dataContent = data?.content || '';

  const { headingsArray, modifiedHTMLString } = useMemo(() => {
    return parseHTMLHeadings(dataContent, ['h2']);
  }, [dataContent]);

  return (
    <div className="flex flex-col w-full items-center lg:gap-y-16 bg-surface-container">
      <BlogPageTopbar />
      <BlogHeroSection
        title={data.title}
        description={data.intro}
        imgSrc={data.coverImagePublicId}
        blogDate={data.createdAt}
      />
      <BlogNavPills navPills={headingsArray} />
      <BlogDetails
        blogTitle={data.title}
        content={modifiedHTMLString ?? data.content}
      />
      <div className="flex flex-col gap-12 w-full lg:w-5/6 px-4 py-12 lg:p-0">
        <Typography fontSize="h2" fontWeight={'bold'}>
          Related Articles
        </Typography>
        <div className="w-full grid md:grid-cols-[repeat(2,minmax(0,auto))] gap-10  2xl:grid-cols-[repeat(3,minmax(0,auto))] justify-between">
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
      <div className="flex flex-col gap-12 w-full lg:w-5/6 px-4 py-12 lg:p-0">
        <Typography fontSize="h2" fontWeight={'bold'}>
          From SkillStreet
        </Typography>
        <div className="w-full grid md:grid-cols-[repeat(2,minmax(0,auto))] gap-10  2xl:grid-cols-[repeat(3,minmax(0,auto))] justify-between">
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
      <BlogFooter />
    </div>
  );
};
