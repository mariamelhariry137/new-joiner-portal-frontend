"use client";

import { useState } from "react";
import { ChecklistItemDialog } from "@/components/onboarding/ChecklistItemDialog";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { TasksSummaryCard } from "@/components/dashboard/TasksSummaryCard";
import { CompletionCard } from "@/components/dashboard/CompletionCard";
import { ChecklistCard } from "@/components/dashboard/ChecklistCard";
import { CompanyHubCard } from "@/components/dashboard/CompanyHubCard";
import { TipCard } from "@/components/dashboard/TipCard";
import { AllDoneCard } from "@/components/dashboard/AllDoneCard";
import { useOnboardingProgress } from "@/app/hooks/useOnboardingProgress";
import { getStoredUser } from "@/lib/auth/token";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function DashboardPage() {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [celebrationOpen, setCelebrationOpen] = useState(false);

  const {
    progress,
    loading,
    error,
    pendingItemId,
    errorItemId,
    handleToggle,
  } = useOnboardingProgress(() => setCelebrationOpen(true));

  const firstName = getStoredUser()?.firstName ?? "there";
  const completedCount = progress.filter((p) => p.completed).length;
  const isComplete =
    progress.length > 0 && completedCount === progress.length;

  const dialogItem =
    progress.find((p) => p.checklistItemId === selectedItemId) ?? null;

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 p-6">
        <Skeleton className="h-8 w-56" />

        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>

        <Skeleton className="h-16 w-full rounded-lg" />
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
      <WelcomeHeader firstName={firstName} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <TasksSummaryCard
            total={progress.length}
            completed={completedCount}
            remaining={progress.length - completedCount}
          />

          <CompletionCard
            percentage={progress[0]?.completionPercentage ?? 0}
            completed={completedCount}
            total={progress.length}
            isComplete={isComplete}
          />
        </div>

        <div className="flex flex-col gap-6">
          <CompanyHubCard />
          <TipCard />
        </div>
      </div>

      <ChecklistCard
        items={progress}
        pendingItemId={pendingItemId}
        errorItemId={errorItemId}
        onOpenItem={(item) => {
          setSelectedItemId(item.checklistItemId);
          setDialogOpen(true);
        }}
        onToggleItem={handleToggle}
      />

      <ChecklistItemDialog
        item={dialogItem}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onToggle={() => dialogItem && handleToggle(dialogItem)}
        isPending={pendingItemId === dialogItem?.checklistItemId}
      />

      <AllDoneCard
        open={celebrationOpen}
        onOpenChange={setCelebrationOpen}
      />
    </div>
  );
}