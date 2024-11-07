import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@code-judge/core-design';
import { useGetProblemsQuery } from '@code-judge/api-hooks';
import Link from 'next/link';
import { TagBadges } from '../../components/tag-badges';

export const PublicProblemsView = () => {
  const { data: { problems = [] } = {} } = useGetProblemsQuery({
    pageIndex: 0,
    pageSize: 1000,
    order: 'ASC',
  });

  return (
    <div className="grid gap-6">
      {problems?.map((problem) => (
        <Link key={`problem-${problem.id}`} href={`/problems/${problem.id}`}>
          <Card className="" key={problem.id}>
            <CardHeader>
              <CardTitle>{problem.title}</CardTitle>
              <CardDescription className="flex gap-3">
                <TagBadges tags={problem.tags} />
                <Badge>{problem.difficulty}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>{''}</CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
