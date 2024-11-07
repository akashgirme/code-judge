import { Typography } from '@code-judge/core-design';

interface ListContainerProps {
  title?: string;
  items?: Array<string>;
}

export const ListContainer = ({
  title = 'List Title',
  items = [],
}: ListContainerProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Typography fontSize={'h5'} fontWeight={'bold'}>
        {title}
      </Typography>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item}>
            <Typography
              className="text-body-tertiary"
              fontSize="body-m"
              fontFamily={'roboto'}
              fontWeight={'regular'}
            >
              {item}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};
