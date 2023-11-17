import { UserIdsArrayItem } from '@/app/dashboard/types';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { ColumnType } from '@/modules/Shared/types';

export interface DetailsContextProps {
	userIdsArray: UserIdsArrayItem[];
}

export interface DetailsProviderProps {
	userIdsArray: UserIdsArrayItem[];
	children: ReactNode;
}

export interface DashboardContextProps {
	userIdsArray: UserIdsArrayItem[];
	isAdmin: boolean;
	columnConfigState: ColumnType[];
	toggleColumnState(name?: string): Promise<void>;
	addCustomColumn(name: string): void;
	removeColumn(name: string): void;
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	isLight: boolean;
	emptyColumnNames: string[];
}

export interface DashboardProviderProps {
	userIdsArray: UserIdsArrayItem[];
	isAdmin: boolean;
	columnConfig: ColumnType[];
	children: ReactNode;
	emptyColumnNames: string[];
}
