import { TaskItem } from '@/modules/Shared/types';

import { UserIdsArrayItem } from '@/app/dashboard/types';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export type EditedTaskContent = Omit<TaskItem, 'id' | 'index' | 'assignee' | 'createdAt' | 'comments'>;

export interface CardFormCreateProps {
	userIdsArray: UserIdsArrayItem[];
	isAdmin: boolean;
	onCancel: () => void;
}

export interface StatusColumn {
	name: string;
	shown: boolean;
	columnListId: string | null;
}

export interface CardFormUpdateProps {
	task: TaskItem;
	isAdmin: boolean;
	userIdsArray: UserIdsArrayItem[];
	statusList: StatusColumn[];
}

export type AddTaskAction = {
	userId: string;
	title: string;
	description: string;
	estimateDays: string;
};

export interface CardEstimateSelectProps {
	createdAt: Date;
	estimateDays: string;
	setEstimateDays: Dispatch<SetStateAction<string>>;
	fullWidth: boolean;
}

export interface CardAssigneeSelectProps {
	userIdsArray: UserIdsArrayItem[];
	userId: string;
	setAssigneeId: Dispatch<SetStateAction<string>>;
}

export interface ConfirmDialogProps {
	title: ReactNode;
	text: ReactNode;
	open: boolean;

	onCancel(): void;

	onConfirm(): void;
}
