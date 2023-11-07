'use client';
import { createContext } from 'react';
import { ControlsContextProps, ControlsProviderProps } from '@/types';

export const ControlsContext = createContext<ControlsContextProps>({} as ControlsContextProps);

export const ControlsProvider = ({ children, userIdsArray, isAdmin, columnConfig }: ControlsProviderProps) => {
	return (
		<ControlsContext.Provider
			value={{
				userIdsArray,
				isAdmin,
				columnConfig,
			}}
		>
			{children}
		</ControlsContext.Provider>
	);
};
