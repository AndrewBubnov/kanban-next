'use client';
import { createContext } from 'react';
import { DetailsContextProps, DetailsProviderProps } from '@/types';

export const DetailsContext = createContext<DetailsContextProps>({} as DetailsContextProps);

export const DetailsProvider = ({ userIdsArray, children }: DetailsProviderProps) => {
	return (
		<DetailsContext.Provider
			value={{
				userIdsArray,
			}}
		>
			{children}
		</DetailsContext.Provider>
	);
};
