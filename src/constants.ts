import { ColumnName, Status } from '@/types';

export const DELTA_X = '--delta-x';
export const DELTA_Y = '--delta-y';
export const ColumnNameDTO: Record<Status, ColumnName> = {
	[Status.NEW]: ColumnName.NEW,
	[Status.PROGRESS]: ColumnName.PROGRESS,
	[Status.PENDING]: ColumnName.PENDING,
	[Status.DONE]: ColumnName.DONE,
};
export const INTERSECTION_RATIO = 1 / 2;

export const columns: Status[] = [Status.NEW, Status.PROGRESS, Status.PENDING, Status.DONE];
