import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProgressItem } from "@/types/onboarding";

interface ChecklistItemDrawerProps {
  item: ProgressItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggle: () => void;
  isPending: boolean;
}

function formatCompletedAt(dateString?: string | null) {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function toBulletPoints(description: string): string[] {
  return description
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

export function ChecklistItemDrawer({
  item,
  open,
  onOpenChange,
  onToggle,
  isPending,
}: ChecklistItemDrawerProps) {
  const completedLabel = formatCompletedAt(item?.completedAt);
  const bullets = item?.description ? toBulletPoints(item.description) : [];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="flex flex-col p-0">
        <div
          className={cn(
            "flex items-center gap-4 border-b p-6 transition-colors",
            item?.completed ? "bg-green-600/5" : "bg-muted/30"
          )}
        >
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
              item?.completed
                ? "bg-green-600 text-white"
                : "bg-background border-2 border-muted-foreground/20"
            )}
          >
            {item?.completed ? (
              <CheckCircle2 className="h-6 w-6" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <SheetHeader className="flex-1 space-y-1 text-left">
            <SheetTitle className="text-left leading-tight">
              {item?.title}
            </SheetTitle>
            <Badge
              variant={item?.completed ? "default" : "secondary"}
              className={cn(
                "w-fit",
                item?.completed && "bg-green-600 hover:bg-green-600"
              )}
            >
              {item?.completed ? "Completed" : "Not completed"}
            </Badge>
          </SheetHeader>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Description</h3>
            {bullets.length > 0 ? (
              <ul className="space-y-2">
                {bullets.map((sentence, index) => (
                  <li
                    key={index}
                    className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                    <span>{sentence}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground">
                No description available for this task.
              </p>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Status</h3>
            {item?.completed && completedLabel ? (
              <p className="text-sm text-muted-foreground">
                Completed on <span className="text-foreground">{completedLabel}</span>
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                This task hasn&apos;t been completed yet.
              </p>
            )}
          </div>
        </div>

        <SheetFooter className="flex-col gap-2 border-t p-6 sm:flex-col">
          <Button
            className="w-full"
            disabled={isPending}
            onClick={onToggle}
            variant={item?.completed ? "outline" : "default"}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : item?.completed ? (
              "Mark as incomplete"
            ) : (
              "Mark as complete"
            )}
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}