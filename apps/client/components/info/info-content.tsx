import { InfoData } from './types';

interface InfoContentProps {
  infoData: InfoData;
}

export const InfoContent: React.FC<InfoContentProps> = ({
  infoData: { heading, intro, sections },
}) => {
  return (
    <div>
      <h2 className="font-bold text-2xl lg:text-4xl mb-3 lg:mb-6">{heading}</h2>
      <div className="bg-[#292B2F] p-4 rounded-lg lg:p-9 lg:rounded-2xl border-[#414348] border">
        {intro && <p className="text-sm lg:text-lg mb-3 lg:mb-6">{intro}</p>}
        {sections.map(({ header, paragraphs }, index) => (
          <div key={index}>
            <h3 className="text-cn-primary font-semibold text-lg lg:text-xl mb-3 lg:mb-6">
              {header}
            </h3>
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-sm lg:text-lg mb-3 lg:mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
