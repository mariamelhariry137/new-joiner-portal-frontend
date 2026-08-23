import { apiFetch } from "./client";
import type {
  ChecklistItem,
  ProgressItem,
  UpdateChecklistItemResult,
} from "@/types/onboarding";
import { getToken } from "../auth/token";

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const onboarding = {
  getChecklist() {
    return apiFetch<ChecklistItem[]>("/api/onboarding/checklist-items", {
      headers: authHeaders(),
    });
  },

  getProgress() {
    return apiFetch<ProgressItem[]>("/api/onboarding/progress", {
      headers: authHeaders(),
    });
  },

  updateChecklistItem(itemId: number, completed: boolean) {
    return apiFetch<UpdateChecklistItemResult>(
      `/api/onboarding/progress/${itemId}`,
      {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ completed }),
      }
    );
  },
};