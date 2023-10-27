import { Dispatch, DragEvent, HTMLAttributes, ReactElement, ReactNode, SetStateAction } from 'react';

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
};

export interface DashboardProviderProps {
	children: ReactNode;
	userIdsArray: UserIdsArrayItem[];
	isAdmin: boolean;
	tasks: TaskItem[];
}

export interface DashboardContextProps {
	userIdsArray: UserIdsArrayItem[];
	isAdmin: boolean;
	tasks: TaskItem[];
	filteredTasks: TaskItem[];
	setFilteredTasks: Dispatch<SetStateAction<TaskItem[]>>;
	columnConfig: string[];
	setColumnConfig: Dispatch<SetStateAction<string[]>>;
}

export interface CardAssigneeSelectProps {
	userIdsArray: UserIdsArrayItem[];
	username: string;
	setUsername: Dispatch<SetStateAction<string>>;
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

export interface FlexWrapperProps extends HTMLAttributes<HTMLDivElement> {
	noJustify?: boolean;
}
