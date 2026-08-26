import { apiAuthFetch } from "./client";
import type {
  ChecklistItem,
  ProgressItem,
  UpdateChecklistItemResult,
} from "@/types/onboarding";

export const onboarding = {
  getChecklist() {
    return apiAuthFetch<ChecklistItem[]>("/api/onboarding/checklist-items");
  },

  getProgress() {
    return apiAuthFetch<ProgressItem[]>("/api/onboarding/progress");
  },

  updateChecklistItem(itemId: number, completed: boolean) {
    return apiAuthFetch<UpdateChecklistItemResult>(
      `/api/onboarding/progress/${itemId}`,
      {
        method: "PATCH",
        body: { completed },
      }
    );
  },
};