import {
  Badge,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@code-judge/core-design';
import { ProblemDifficulty, useGetProblemsQuery } from '@code-judge/api-hooks';
import Link from 'next/link';

export const PublicProblemsView = () => {
  const { data: { problems = [] } = {} } = useGetProblemsQuery({
    pageIndex: 0,
    pageSize: 1000,
    order: 'ASC',
  });

  const getDifficultyColor = (difficulty: ProblemDifficulty) => {
    const colors = {
      easy: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
      medium: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
      hard: 'bg-orange-500/10 text-orange-500 hover:bg-red-500/20',
    };
    return colors[difficulty] || 'bg-primary/10 text-primary hover:bg-primary/20';
  };

  return (
    <div className="container py-6">
      <div className="mx-auto max-w-4xl space-y-4">
        {problems?.map((problem) => (
          <Card key={problem.id} className="group transition-all hover:shadow-md ">
            <CardHeader className="flex flex-row items-center justify-between h-28 space-y-0 py-6 px-6">
              <div className="space-y-1">
                <CardTitle className="text-xl">
                  <Link
                    href={`/problems/${problem.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {problem.title}
                  </Link>
                </CardTitle>
                <CardDescription className="flex flex-wrap items-center gap-2">
                  {problem.tags?.map((tag) => (
                    <Badge key={tag.id} variant="outline" className="text-s">
                      {tag.name}
                    </Badge>
                  ))}
                  <Badge className={`text-s ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </Badge>
                </CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/problems/${problem.id}`}>
                  <Button variant="secondary-outline" className="whitespace-nowrap">
                    Solve Challenge
                  </Button>
                </Link>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
