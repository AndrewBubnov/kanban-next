'use client';
import { createContext, useState } from 'react';
import { DashboardContextProps, DashboardProviderProps, TaskItem } from '@/types';

export const DashboardContext = createContext<DashboardContextProps>({} as DashboardContextProps);

export const DashboardProvider = ({
	children,
	userIdsArray,
	extendedUserIdsArray,
	isAdmin,
	tasks,
}: DashboardProviderProps) => {
	const [filteredTasks, setFilteredTasks] = useState<TaskItem[]>([]);
	return (
		<DashboardContext.Provider
			value={{
				userIdsArray,
				extendedUserIdsArray,
				isAdmin,
				tasks,
				filteredTasks,
				setFilteredTasks,
			}}
		>
			{children}
		</DashboardContext.Provider>
	);
};
