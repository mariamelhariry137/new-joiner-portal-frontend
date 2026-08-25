import { Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function TipCard() {
  return (
    <Card className="border-amber-200 bg-amber-50 shadow-sm dark:border-amber-900 dark:bg-amber-950/30">
      <CardContent className="flex gap-3 p-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
          <Lightbulb className="h-4 w-4 text-amber-600" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">Tip</p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Click any checklist item to see more details and track when it was
            completed.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}