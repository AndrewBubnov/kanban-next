import { Status, TaskItem } from "types.ts";

export const updateConfigAdd = (
  config: TaskItem[],
  draggedId: number,
  status?: Status,
): TaskItem[] => {
  if (!status) return config;
  const element = config.find((el) => el.id === draggedId);
  if (!element) return config;
  const elementIndex = config.findIndex((el) => el.id === draggedId);
  return [
    ...config.slice(0, elementIndex),
    ...config.slice(elementIndex + 1, config.length),
    { ...element, status },
  ];
};
