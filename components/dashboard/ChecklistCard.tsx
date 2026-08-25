import { Sparkles, ListChecks } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChecklistItemRow } from "@/components/dashboard/ChecklistItemRow";
import type { ProgressItem } from "@/types/onboarding";

type ChecklistCardProps = {
  items: ProgressItem[];
  pendingItemId: number | null;
  errorItemId: number | null;
  onOpenItem: (item: ProgressItem) => void;
  onToggleItem: (item: ProgressItem) => void;
};

export function ChecklistCard({
  items,
  pendingItemId,
  errorItemId,
  onOpenItem,
  onToggleItem,
}: ChecklistCardProps) {
  const nextItem = items.find((item) => !item.completed);

  return (
    <div className="space-y-6">
      {nextItem && (
        <Card className="border-primary/20 bg-primary/5 shadow-sm">
          <CardContent className="flex items-center justify-between gap-4 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground">
                  Next up
                </p>
                <p className="truncate text-sm font-medium">
                  {nextItem.title}
                </p>
              </div>
            </div>

            <Button
              size="sm"
              disabled={pendingItemId === nextItem.checklistItemId}
              onClick={() => onToggleItem(nextItem)}
            >
              Mark complete
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        <h2 className="text-sm font-medium text-muted-foreground">
          Checklist
        </h2>

        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <ListChecks className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              No checklist items yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <ChecklistItemRow
                key={item.checklistItemId}
                item={item}
                onOpenDrawer={() => onOpenItem(item)}
                onToggle={() => onToggleItem(item)}
                isPending={pendingItemId === item.checklistItemId}
                hasError={errorItemId === item.checklistItemId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}