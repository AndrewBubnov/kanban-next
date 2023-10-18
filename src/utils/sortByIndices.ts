import { TaskItem } from '@/types';

export const sortByIndices = (taskA: TaskItem, taskB: TaskItem) => taskA.index - taskB.index;
