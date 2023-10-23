import { Dispatch, DragEvent, HTMLAttributes, ReactElement, ReactNode, SetStateAction } from 'react';

export enum Status {
	NEW = 'new',
	PROGRESS = 'progress',
	PENDING = 'pending',
	DONE = 'done',
}

export interface DeskProps {
	tasks: TaskItem[];
	columns: Status[];
}

type Assignee = {
	id: number;
	userId: string;
	email: string;
	username: string;
	isAdmin: boolean;
};

export type TaskItem = {
	title: string;
	description: string;
	id: string;
	status: Status;
	index: number;
	assignee: Assignee;
};

export type EditedTaskContent = Omit<TaskItem, 'id' | 'index' | 'assignee'>;

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
	status: Status;
	imgSrc: string;
}

export type Parameters = Record<string, ParameterItem>;

export type RecalculateProps = {
	draggedId: string;
	hoveredId: string;
};

export enum ColumnName {
	NEW = 'New',
	PROGRESS = 'In progress',
	PENDING = 'Pending',
	DONE = 'Done',
}

export type ColCoords = Record<Status, DOMRect>;

export interface CardFormCreateProps {
	userIdsArray: UserIdsArrayItem[];
	isAdmin: boolean;
	onCancel: () => void;
}

export interface CardFormUpdateProps {
	initTitle: string;
	initDescription: string;
	initStatus: Status;
	taskId: string;
}

export interface TaskIdParam {
	params: { taskId: string };
}

export interface DraggableBoxProps extends HTMLAttributes<HTMLDivElement> {
	isDragged: boolean;
	isConfigUpdated: boolean;
	children: ReactNode;
}

export interface DraggableImageProps {
	imageParameters: {
		width: number;
		height: number;
		imgSrc: string;
	};
}

export interface UseTasks {
	filteredTasks: TaskItem[];
	setFilteredTasks(arg: TaskItem[]): void;
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
	extendedUserIdsArray: UserIdsArrayItem[];
	isAdmin: boolean;
	tasks: TaskItem[];
}

export interface DashboardContextProps {
	userIdsArray: UserIdsArrayItem[];
	extendedUserIdsArray: UserIdsArrayItem[];
	isAdmin: boolean;
	tasks: TaskItem[];
	filteredTasks: TaskItem[];
	setFilteredTasks: Dispatch<SetStateAction<TaskItem[]>>;
}
