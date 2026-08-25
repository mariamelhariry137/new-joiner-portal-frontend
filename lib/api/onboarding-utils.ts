export function toBulletPoints(description: string): string[] {
  return description
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

export function formatCompletedAt(dateString?: string | null) {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}