export const higtherPriority = (
  { priority }: { priority: number },
  { priority: priority2 }: { priority: number }
): -1 | 0 | 1 => (priority > priority2 ? 1 : priority === priority2 ? 0 : -1);
