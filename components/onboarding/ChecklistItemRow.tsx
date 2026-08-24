import { Check, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProgressItem } from "@/types/onboarding";

interface ChecklistItemRowProps {
  item: ProgressItem;
  onOpenDrawer: () => void;
  onToggle: () => void;
  isPending: boolean;
  hasError: boolean;
}

function formatCompletedAt(dateString?: string | null) {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function ChecklistItemRow({
  item,
  onOpenDrawer,
  onToggle,
  isPending,
  hasError,
}: ChecklistItemRowProps) {
  const completedLabel = formatCompletedAt(item.completedAt);

  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-lg border p-4 transition-colors",
        item.completed ? "bg-muted/50" : "hover:bg-muted/30",
        hasError && "border-destructive"
      )}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        disabled={isPending}
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors disabled:opacity-50",
          item.completed
            ? "border-green-600 bg-green-600 text-white"
            : "border-muted-foreground/30 hover:border-muted-foreground/60"
        )}
        aria-label={item.completed ? "Mark incomplete" : "Mark complete"}
      >
        {isPending ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          item.completed && <Check className="h-4 w-4" />
        )}
      </button>

      <button
        onClick={onOpenDrawer}
        className="flex min-w-0 flex-1 items-center justify-between gap-3 text-left"
      >
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "text-sm font-medium",
              item.completed && "text-muted-foreground line-through"
            )}
          >
            {item.title}
          </p>

          {item.description && !hasError && (
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {item.description}
            </p>
          )}

          {hasError && (
            <p className="mt-0.5 text-xs text-destructive">
              Update failed — try again
            </p>
          )}

          {item.completed && completedLabel && !hasError && (
            <p className="mt-0.5 text-xs text-green-600">
              Completed {completedLabel}
            </p>
          )}
        </div>

        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}