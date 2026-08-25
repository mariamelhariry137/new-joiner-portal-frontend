import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ListChecks, PartyPopper } from "lucide-react";

interface CompletionCardProps {
  percentage: number;
  completed: number;
  total: number;
  isComplete: boolean;
}

export function CompletionCard({
  percentage,
  completed,
  total,
  isComplete,
}: CompletionCardProps) {
  return (
    <Card className="overflow-hidden border-muted-foreground/10 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-muted-foreground" />
            Onboarding progress
          </CardTitle>
          <Badge
            variant={isComplete ? "default" : "secondary"}
            className={isComplete ? "bg-green-600 hover:bg-green-600" : ""}
          >
            {isComplete ? (
              <span className="flex items-center gap-1">
                <PartyPopper className="h-3 w-3" />
                All done
              </span>
            ) : (
              `${completed}/${total} completed`
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <Progress
            value={percentage}
            className={
              isComplete ? "h-2.5 flex-1 [&>div]:bg-green-600" : "h-2.5 flex-1"
            }
          />
          <span className="text-sm font-semibold tabular-nums w-11 text-right">
            {percentage}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}