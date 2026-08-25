import { useEffect, useState } from "react";
import { onboarding } from "@/lib/api/onboarding";
import { ApiError } from "@/lib/api/client";
import type { ProgressItem } from "@/types/onboarding";

export function useOnboardingProgress() {
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingItemId, setPendingItemId] = useState<number | null>(null);
  const [errorItemId, setErrorItemId] = useState<number | null>(null);

  useEffect(() => {
    onboarding.getProgress()
      .then(setProgress)
      .catch((err) =>
        setError(
          err instanceof ApiError
            ? err.message
            : "Failed to load checklist."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  async function handleToggle(item: ProgressItem) {
    setPendingItemId(item.checklistItemId);
    setErrorItemId(null);

    try {
      const result = await onboarding.updateChecklistItem(
        item.checklistItemId,
        !item.completed
      );

      setProgress((prev) =>
        prev.map((p) => ({
          ...p,
          ...(p.checklistItemId === result.checklistItemId && {
            completed: result.completed,
            completedAt: result.completedAt,
          }),
          completionPercentage: result.completionPercentage,
        }))
      );
    } catch {
      setErrorItemId(item.checklistItemId);
    } finally {
      setPendingItemId(null);
    }
  }

  return {
    progress,
    loading,
    error,
    pendingItemId,
    errorItemId,
    handleToggle,
  };
}