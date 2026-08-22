export interface ChecklistItem {
  id: number;
  title: string;
  description: string;
  orderIndex: number;
}

export interface ProgressItem {
  checklistItemId: number;
  title: string;
  description: string;
  orderIndex: number;
  completed: boolean;
  completedAt: string | null;
  completionPercentage: number;
}

export interface UpdateChecklistItemResult {
  checklistItemId: number;
  completed: boolean;
  completedAt: string | null;
  completionPercentage: number;
}