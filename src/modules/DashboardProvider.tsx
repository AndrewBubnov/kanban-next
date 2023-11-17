'use client';
import { createContext, useState } from 'react';
import { useColumnConfig } from '@/hooks/useColumnConfig';
import { DashboardContextProps, DashboardProviderProps } from '@/types';
import { useTheme } from 'next-themes';
import { LIGHT } from '@/constants';

export const DashboardContext = createContext<DashboardContextProps>({} as DashboardContextProps);

export const DashboardProvider = ({ children, userIdsArray, isAdmin, columnConfig }: DashboardProviderProps) => {
	const { columnConfigState, toggleColumnState, addCustomColumn, removeColumn } = useColumnConfig(columnConfig);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { theme } = useTheme();
	const isLight = theme === LIGHT;
	return (
		<DashboardContext.Provider
			value={{
				userIdsArray,
				isAdmin,
				columnConfigState,
				toggleColumnState,
				addCustomColumn,
				removeColumn,
				isLoading,
				setIsLoading,
				isLight,
			}}
		>
			{children}
		</DashboardContext.Provider>
	);
};
