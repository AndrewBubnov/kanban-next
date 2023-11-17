'use client';
import { createContext, useState } from 'react';
import { useStatusConfig } from '@/modules/StatusSelect/hooks/useStatusConfig';
import { useTheme } from 'next-themes';

import { LIGHT } from '@/modules/ThemeSwitch/constants';
import { DashboardContextProps, DashboardProviderProps } from '@/modules/Providers/types';

export const DashboardContext = createContext<DashboardContextProps>({} as DashboardContextProps);

export const DashboardProvider = ({
	children,
	userIdsArray,
	isAdmin,
	columnConfig,
	emptyColumnNames,
}: DashboardProviderProps) => {
	const { columnConfigState, toggleColumnState, addCustomColumn, removeColumn } = useStatusConfig(columnConfig);
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
				emptyColumnNames,
			}}
		>
			{children}
		</DashboardContext.Provider>
	);
};
