import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toBulletPoints, formatCompletedAt } from "@/lib/api/onboarding-utils";
import type { ProgressItem } from "@/types/onboarding";

interface ChecklistItemDialogProps {
  item: ProgressItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggle: () => void;
  isPending: boolean;
}

export function ChecklistItemDialog({
  item,
  open,
  onOpenChange,
  onToggle,
  isPending,
}: ChecklistItemDialogProps) {
  const completedLabel = formatCompletedAt(item?.completedAt);
  const bullets = item?.description ? toBulletPoints(item.description) : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="items-center text-center">
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-full",
              item?.completed
                ? "bg-green-600 text-white"
                : "bg-primary/10 text-primary"
            )}
          >
            {item?.completed ? (
              <CheckCircle2 className="h-7 w-7" />
            ) : (
              <FileText className="h-7 w-7" />
            )}
          </div>
          <DialogTitle className="mt-2 text-lg">{item?.title}</DialogTitle>
          <Badge
            variant={item?.completed ? "default" : "secondary"}
            className={item?.completed ? "bg-green-600 hover:bg-green-600" : ""}
          >
            {item?.completed ? "Completed" : "Not completed"}
          </Badge>
        </DialogHeader>

        <div className="space-y-4">
          <Separator />

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

          {item?.completed && completedLabel && (
            <>
              <Separator />
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Completed on</h3>
                <p className="text-sm text-muted-foreground">{completedLabel}</p>
              </div>
            </>
          )}
        </div>

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
      </DialogContent>
    </Dialog>
  );
}