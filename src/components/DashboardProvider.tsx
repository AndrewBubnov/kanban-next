'use client';
import { createContext } from 'react';
import { useColumnConfig } from '@/hooks/useColumnConfig';
import { DashboardContextProps, DashboardProviderProps } from '@/types';

export const DashboardContext = createContext<DashboardContextProps>({} as DashboardContextProps);

export const DashboardProvider = ({ children, userIdsArray, isAdmin, columnConfig }: DashboardProviderProps) => {
	const { columnConfigState, toggleColumnState, addCustomColumn, removeColumn } = useColumnConfig(columnConfig);
	return (
		<DashboardContext.Provider
			value={{
				userIdsArray,
				isAdmin,
				columnConfigState,
				toggleColumnState,
				addCustomColumn,
				removeColumn,
			}}
		>
			{children}
		</DashboardContext.Provider>
	);
};
