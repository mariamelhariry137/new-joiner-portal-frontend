"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onboarding } from "@/lib/api/onboarding";
import { ChecklistItemRow } from "@/components/onboarding/ChecklistItemRow";
import { ChecklistItemDrawer } from "@/components/onboarding/ChecklistItemDrawer";
import type { ProgressItem } from "@/types/onboarding";
import { ApiError } from "@/lib/api/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getStoredUser } from "@/lib/auth/token";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Circle,
  ListChecks,
  Lightbulb,
  PartyPopper,
  Sparkles,
} from "lucide-react";

export default function DashboardPage() {
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedItem, setSelectedItem] = useState<ProgressItem | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [pendingItemId, setPendingItemId] = useState<number | null>(null);
  const [errorItemId, setErrorItemId] = useState<number | null>(null);

  const user = getStoredUser();
  const firstName = user?.firstName ?? "there";

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const progressData = await onboarding.getProgress();
        setProgress(progressData);
      } catch (err) {
        setError(
          err instanceof ApiError ? err.message : "Failed to load checklist."
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function handleOpenDrawer(item: ProgressItem) {
    setSelectedItem(item);
    setDrawerOpen(true);
  }

  async function handleToggle(item: ProgressItem) {
    setPendingItemId(item.checklistItemId);
    setErrorItemId(null);

    try {
      const result = await onboarding.updateChecklistItem(
        item.checklistItemId,
        !item.completed
      );

      setProgress((prev) =>
        prev.map((p) =>
          p.checklistItemId === result.checklistItemId
            ? {
                ...p,
                completed: result.completed,
                completedAt: result.completedAt,
                completionPercentage: result.completionPercentage,
              }
            : {
                ...p,
                completionPercentage: result.completionPercentage,
              }
        )
      );
    } catch {
      setErrorItemId(item.checklistItemId);
    } finally {
      setPendingItemId(null);
    }
  }

  const completionPercentage = progress[0]?.completionPercentage ?? 0;
  const completedCount = progress.filter((p) => p.completed).length;
  const remainingCount = progress.length - completedCount;
  const isComplete = progress.length > 0 && completedCount === progress.length;
  const nextItem = progress.find((p) => !p.completed);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 p-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-2">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
          <Skeleton className="h-40 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome back, {firstName}
        </h1>
        <p className="text-muted-foreground mt-1.5">
          Here&apos;s where you stand in your onboarding journey.
        </p>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardContent className="flex items-center gap-3 py-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
              <ListChecks className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-semibold tabular-nums">{progress.length}</p>
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
              <p className="text-2xl font-semibold tabular-nums">{completedCount}</p>
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
              <p className="text-2xl font-semibold tabular-nums">{remainingCount}</p>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main two-column layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: progress + next up + checklist */}
        <div className="space-y-6 lg:col-span-2">
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
                    `${completedCount}/${progress.length} completed`
                  )}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Progress
                  value={completionPercentage}
                  className={isComplete ? "h-2.5 flex-1 [&>div]:bg-green-600" : "h-2.5 flex-1"}
                />
                <span className="text-sm font-semibold tabular-nums w-11 text-right">
                  {completionPercentage}%
                </span>
              </div>
            </CardContent>
          </Card>

          {nextItem && (
            <Card className="border-primary/20 bg-primary/5 shadow-sm">
              <CardContent className="flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground">
                      Next up
                    </p>
                    <p className="truncate text-sm font-medium">{nextItem.title}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  disabled={pendingItemId === nextItem.checklistItemId}
                  onClick={() => handleToggle(nextItem)}
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

            <div className="space-y-2">
              {progress.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <ListChecks className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No checklist items yet. Check back soon.
                  </p>
                </div>
              ) : (
                progress.map((item) => (
                  <ChecklistItemRow
                    key={item.checklistItemId}
                    item={item}
                    onOpenDrawer={() => handleOpenDrawer(item)}
                    onToggle={() => handleToggle(item)}
                    isPending={pendingItemId === item.checklistItemId}
                    hasError={errorItemId === item.checklistItemId}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: sidebar */}
        <div className="flex flex-col gap-6">
          <Link href="/company">
            <Card className="shadow-sm transition-colors hover:bg-accent/50">
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Company hub</p>
                    <p className="text-xs text-muted-foreground">
                      Teams, contacts, policies, resources
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Card className="border-amber-200 bg-amber-50 shadow-sm dark:border-amber-900 dark:bg-amber-950/30">
            <CardContent className="flex gap-3 py-4">
              <Lightbulb className="h-5 w-5 shrink-0 text-amber-600" />
              <div>
                <p className="text-sm font-medium">Tip</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Click any checklist item to see more details and track when it
                  was completed.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ChecklistItemDrawer
  item={
    selectedItem
      ? progress.find((p) => p.checklistItemId === selectedItem.checklistItemId) ??
        selectedItem
      : null
  }
  open={drawerOpen}
  onOpenChange={setDrawerOpen}
  onToggle={() => selectedItem && handleToggle(selectedItem)}
  isPending={pendingItemId === selectedItem?.checklistItemId}
/>
    </div>
  );
}