import { Badge, Card, Typography } from '@code-judge/core-design';
import { ProblemDifficulty } from '@code-judge/api-hooks';

interface ProblemHeroSectionProps {
  title?: string;
  difficulty?: ProblemDifficulty;
}

export const ProblemHeroSection = ({ title, difficulty }: ProblemHeroSectionProps) => {
  return (
    <Card className="w-full p-6 rounded-none border-0 border-b">
      <div className="flex flex-col gap-4">
        <Typography variant="body1" fontSize={'body-l'} fontWeight={'bold'}>
          {title}
        </Typography>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-medium">Difficulty:</span>
            <Badge
              variant="outline"
              className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
            >
              {difficulty}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};
