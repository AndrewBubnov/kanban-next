import { Dispatch, DragEvent, HTMLAttributes, ReactElement, ReactNode, RefAttributes, SetStateAction } from 'react';
import { FormControlProps } from '@mui/material/FormControl/FormControl';
import { LinkProps } from 'next/link';

export type Assignee = {
	id: number;
	userId: string;
	email: string;
	username: string;
	isAdmin: boolean;
};

export type Comment = {
	id: number;
	taskId: string;
	username: string;
	userId: string;
	createdAt: Date;
	text: string;
};

export type TaskItem = {
	title: string;
	description: string;
	id: string;
	status: string;
	createdAt: Date;
	index: number;
	assignee: Assignee;
	comments: Comment[];
	estimateDays: number;
};

export type EditedTaskContent = Omit<TaskItem, 'id' | 'index' | 'assignee' | 'createdAt' | 'comments'>;

export type TaskMiniProps = {
	title: string;
	description: string;
	id: string;
	username: string;
	email: string;
};

export interface DraggableProps {
	children: ReactElement;
	onDragStart(event: DragEvent<HTMLDivElement>): void;
	onDrag(evt: DragEvent): void;
	onDrop(): void;
	isDragged: boolean;
	isConfigUpdated: boolean;
	dX: number;
	dY: number;
	id: string;
}

interface ParameterItem {
	top: number;
	left: number;
	width: number;
	height: number;
	dX: number;
	dY: number;
	status: string;
	imgSrc: string;
}

export type Parameters = Record<string, ParameterItem>;

export type RecalculateProps = {
	draggedId: string;
	hoveredId: string;
};

export type ColCoords = Record<string, DOMRect>;

export interface CardFormCreateProps {
	userIdsArray: UserIdsArrayItem[];
	isAdmin: boolean;
	onCancel: () => void;
}

export interface CardFormUpdateProps {
	task: TaskItem;
	isAdmin: boolean;
	userIdsArray: UserIdsArrayItem[];
}

export interface TaskIdParam {
	params: { taskId: string };
}

export interface DraggableBoxProps extends HTMLAttributes<HTMLDivElement> {
	isDragged: boolean;
	isConfigUpdated: boolean;
	children: ReactNode;
}

export interface FlexContainerProps extends HTMLAttributes<HTMLDivElement> {
	isReverse?: boolean;
	marginTop?: boolean;
}

export interface ConditionalFullWidthProps extends FormControlProps {
	fullWidth: boolean;
}

export interface DraggableImageProps {
	imageParameters: {
		width: number;
		height: number;
		imgSrc: string;
	};
}

interface UserIdsArrayItem {
	userId: string;
	username: string;
}

export type AddTaskAction = {
	userId: string;
	title: string;
	description: string;
	estimateDays: string;
};

export type ColumnType = { name: string; shown: boolean; id?: number; tableId?: number };

export interface DashboardProviderProps {
	children: ReactNode;
	userIdsArray: UserIdsArrayItem[];
	isAdmin: boolean;
	tasks: TaskItem[];
	columnConfig: ColumnType[];
}

export interface DashboardContextProps {
	userIdsArray: UserIdsArrayItem[];
	isAdmin: boolean;
	tasks: TaskItem[];
	filteredTasks: TaskItem[];
	setFilteredTasks: Dispatch<SetStateAction<TaskItem[]>>;
	columnConfig: ColumnType[];
}

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

export type AdminList = { admins: { id: number; email: string; listId: number }[] };

export type AddCommentToTask = { taskId: string; username: string; userId: string; text: string };

export type EditHandlerArgs = { id: number; text: string };

export interface EditPageLinkProps extends LinkProps {
	children: ReactNode;
	color?: string;
	paddingTop?: number;
}

export interface EstimatedTimeProps {
	task: TaskItem;
	editPage: string;
}
