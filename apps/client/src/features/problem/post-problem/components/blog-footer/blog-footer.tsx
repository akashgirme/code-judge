import { Typography } from '@skill-street-ui/core-design';
import { LogoWithName } from 'apps/home/components';
import { ListContainer } from './list-container';
import { CopyrightContainer } from './copyright-container';

export const BlogFooter = () => {
  return (
    <div className="w-full">
      <footer className="w-full py-6 gap-8 px-4 lg:p-20 flex flex-col lg:flex-row justify-between bg-secondary-border-fill">
        <div>
          <LogoWithName />
          <Typography
            fontFamily={'inter'}
            fontSize={'h6'}
            fontWeight={'medium'}
            className="text-body-tertiary"
          >
            Revolutionising the journey from Goal to Career...
          </Typography>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          <ListContainer
            title="Product"
            items={['Features', 'Enterprise', 'Update Log', 'Pricing', 'Docs']}
          />
          <ListContainer
            title="Platform"
            items={[
              'Horizon',
              'SkillStreet Edu.',
              'Freelance Guru',
              'Analytics',
            ]}
          />
          <ListContainer
            title="Company"
            items={['About us', 'Careers', 'Blog', 'Press', 'Merch']}
          />
          <ListContainer
            title="Support"
            items={['Contact', 'Saled', 'Technical', 'Comunity']}
          />
        </div>
      </footer>
      <CopyrightContainer />
    </div>
  );
};
