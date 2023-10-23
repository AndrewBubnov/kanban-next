import { create } from 'zustand';
import { TaskItem, UseTasks } from '@/types';

export const useFilteredStore = create<UseTasks>(set => ({
	filteredTasks: [],
	setFilteredTasks: (tasks: TaskItem[]) => set({ filteredTasks: tasks }),
}));
