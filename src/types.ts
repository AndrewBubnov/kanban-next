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

export type TaskContent = { title: string; description: string; status: Status; id: number };

export type EditedTaskContent = Omit<TaskContent, 'id'>;

export type TaskMiniProps = Omit<TaskContent, 'status'>;

export type TaskItem = {
	title: string;
	description: string;
	id: number;
	status: Status;
	index: number;
};

interface StoreItem {
	top: number;
	left: number;
	width: number;
	height: number;
	dX: number;
	dY: number;
	status: Status;
}

export type Positions = {
	[key: number]: StoreItem;
};

export type RecalculateProps = {
	draggedId: number;
	hoveredId: number;
};

export enum ColumnName {
	NEW = 'New',
	PROGRESS = 'In progress',
	PENDING = 'Pending',
	DONE = 'Done',
}

export type ColCoords = Record<Status, DOMRect>;

export interface CardFormCreateProps {
	onCancel: () => void;
}

export interface CardFormUpdateProps {
	initTitle: string;
	initDescription: string;
	initStatus: Status;
	taskId: number;
}

export interface TaskIdParam {
	params: { taskId: string };
}
