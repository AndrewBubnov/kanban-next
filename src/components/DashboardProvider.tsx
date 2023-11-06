'use client';
import { createContext, useState } from 'react';
import { DashboardContextProps, DashboardProviderProps, TaskItem } from '@/types';

export const DashboardContext = createContext<DashboardContextProps>({} as DashboardContextProps);

export const DashboardProvider = ({ children, userIdsArray, isAdmin, tasks, columnConfig }: DashboardProviderProps) => {
	const [filteredTasks, setFilteredTasks] = useState<TaskItem[]>([]);

	return (
		<DashboardContext.Provider
			value={{
				userIdsArray,
				isAdmin,
				tasks,
				filteredTasks,
				setFilteredTasks,
				columnConfig,
			}}
		>
			{children}
		</DashboardContext.Provider>
	);
};
