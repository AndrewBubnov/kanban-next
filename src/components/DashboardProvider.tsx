'use client';
import { createContext, useState } from 'react';
import { DashboardContextProps, DashboardProviderProps, TaskItem } from '@/types';

export const DashboardContext = createContext<DashboardContextProps>({} as DashboardContextProps);

export const DashboardProvider = ({ children, userIdsArray, isAdmin, columnConfig }: DashboardProviderProps) => {
	const [tasks, setTasks] = useState<TaskItem[]>([]);

	return (
		<DashboardContext.Provider
			value={{
				userIdsArray,
				isAdmin,
				tasks,
				setTasks,
				columnConfig,
			}}
		>
			{children}
		</DashboardContext.Provider>
	);
};
