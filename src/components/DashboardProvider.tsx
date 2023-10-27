'use client';
import { createContext, useState } from 'react';
import { ColumnType, DashboardContextProps, DashboardProviderProps, TaskItem } from '@/types';
import { columns } from '@/constants';

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
