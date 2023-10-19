import { DragEvent, HTMLAttributes, ReactElement, ReactNode } from 'react';

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

export interface DraggableProps {
	children: ReactElement;
	onDragStart(event: DragEvent<HTMLDivElement>): void;
	onDrag(evt: DragEvent): void;
	onDrop(): void;
	isDragged: boolean;
	configUpdated: boolean;
	dX: number;
	dY: number;
	id: string;
}

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

export interface DraggableBoxProps extends HTMLAttributes<HTMLDivElement> {
	isDragged: boolean;
	isConfigUpdated: boolean;
	children: ReactNode;
}
