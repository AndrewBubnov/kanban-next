'use client';
import { createContext, useState } from 'react';
import { DashboardContextProps, DashboardProviderProps, Status, TaskItem } from '@/types';
import { columns } from '@/constants';

export const DashboardContext = createContext<DashboardContextProps>({} as DashboardContextProps);

export const DashboardProvider = ({ children, userIdsArray, isAdmin, tasks }: DashboardProviderProps) => {
	const [filteredTasks, setFilteredTasks] = useState<TaskItem[]>([]);
	const [columnConfig, setColumnConfig] = useState<Status[]>(columns);

	return (
		<DashboardContext.Provider
			value={{
				userIdsArray,
				isAdmin,
				tasks,
				filteredTasks,
				setFilteredTasks,
				columnConfig,
				setColumnConfig,
			}}
		>
			{children}
		</DashboardContext.Provider>
	);
};
