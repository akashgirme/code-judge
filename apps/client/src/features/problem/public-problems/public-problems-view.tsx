import { Badge, Card, CardDescription, CardHeader, CardTitle } from '@code-judge/ui';
import { useGetProblemsQuery } from '@code-judge/api-client';
import { Link } from 'react-router-dom';

export const PublicProblemsView = () => {
  const { data: { problems = [] } = {} } = useGetProblemsQuery({
    pageIndex: 0,
    pageSize: 100,
  });

  return (
    <div className="grid gap-6">
      {problems?.map((problem) => (
        <Link key={`post-${problem.id}`} to={`/problems/${problem.id}`}>
          <Card className="" key={problem.id}>
            <CardHeader>
              <CardTitle>{problem.title}</CardTitle>
              <CardDescription className="flex gap-3">
                {problem.topics?.map((topic) => (
                  <Badge>{topic.name}</Badge>
                ))}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
};
