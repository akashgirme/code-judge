import { ListContainer } from './list-container';

export const FooterLists = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
      <ListContainer
        title="Product"
        items={['Features', 'Enterprise', 'Update Log', 'Pricing', 'Docs']}
      />
      <ListContainer
        title="Platform"
        items={['Horizon', 'SkillStreet Edu.', 'Freelance Guru', 'Analytics']}
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
  );
};
