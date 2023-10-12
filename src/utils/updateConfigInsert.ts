import { TaskItem, Positions } from "../types.ts";

export const updateConfigInsert = (config: TaskItem[], pos: Positions) =>
  config
    .map((el) => ({
      ...el,
      status: pos[el.id].status,
    }))
    .sort((el1, el2) => pos[el1.id].index - pos[el2.id].index);
