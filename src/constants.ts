import { ColumnType } from '@/types';

export const DELTA_X = '--delta-x';
export const DELTA_Y = '--delta-y';
export const INTERSECTION_RATIO = 1 / 2;
export const columns = ['New', 'In progress', 'Pending', 'Done'];
export const COLUMN_LIST: ColumnType[] = [
	{ name: 'New', shown: true },
	{ name: 'In progress', shown: true },
	{ name: 'Pending', shown: true },
	{ name: 'Done', shown: true },
];
export const DRAGGED_TRANSLATE = 'translate(var(--delta-x), var(--delta-y))';
export const COMMON_TRANSITION = 'transform 0.3s';
export const COMMON_TRANSLATE = 'translateY(var(--delta-y))';
export const ADMINS_LIST = [{ email: 'andrew.bubnov75@gmail.com' }];
export const ALL_USERNAMES = 'All';
export const SELECT_ALL_USERS = { userId: '', username: ALL_USERNAMES };
export const DASHBOARD = '/dashboard';
export const TASK_MINI_HEIGHT = 150;
export const GAP = 16;
export const SINGLE_VERTICAL_MOVE = TASK_MINI_HEIGHT + GAP;
