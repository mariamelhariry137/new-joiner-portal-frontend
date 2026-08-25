import { Card, CardContent } from "@/components/ui/card";
import { ListChecks, CheckCircle2, Circle } from "lucide-react";

interface TasksSummaryCardProps {
  total: number;
  completed: number;
  remaining: number;
}

export function TasksSummaryCard({
  total,
  completed,
  remaining,
}: TasksSummaryCardProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="shadow-sm">
        <CardContent className="flex items-center gap-3 py-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
            <ListChecks className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-2xl font-semibold tabular-nums">{total}</p>
            <p className="text-xs text-muted-foreground">Total tasks</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="flex items-center gap-3 py-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600/10">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-semibold tabular-nums">{completed}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="flex items-center gap-3 py-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Circle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-semibold tabular-nums">{remaining}</p>
            <p className="text-xs text-muted-foreground">Remaining</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}