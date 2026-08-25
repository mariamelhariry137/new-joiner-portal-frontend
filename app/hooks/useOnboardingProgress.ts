import { useEffect, useState } from "react";
import { onboarding } from "@/lib/api/onboarding";
import { ApiError } from "@/lib/api/client";
import type { ProgressItem } from "@/types/onboarding";

export function useOnboardingProgress(onComplete?: () => void) {
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingItemId, setPendingItemId] = useState<number | null>(null);
  const [errorItemId, setErrorItemId] = useState<number | null>(null);

  useEffect(() => {
    onboarding
      .getProgress()
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

      const wasLastItem =
        !item.completed &&
        result.completed &&
        progress.every((p) =>
          p.checklistItemId === item.checklistItemId
            ? result.completed
            : p.completed
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

      if (wasLastItem) {
        onComplete?.();
      }
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