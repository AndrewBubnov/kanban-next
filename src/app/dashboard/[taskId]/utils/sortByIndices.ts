import { TaskItem } from '@/modules/Shared/types';

export const sortByIndices = (taskA: TaskItem, taskB: TaskItem) => taskA.index - taskB.index;
