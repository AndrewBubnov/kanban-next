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

export type TaskContent = { title: string; description: string; id: number };

export type TaskItem = {
	title: string;
	description: string;
	id: number;
	status: Status;
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

export interface HeaderProps {
	onAddNewTask(arg: TaskContent): void;
}

export interface ModalProps {
	open: boolean;
	onConfirm(arg: TaskContent): void;
	onCancel(): void;
}

export interface CardFormProps {
	onCancel: () => void;
	onConfirm: ((formData: FormData) => void) | undefined;
}
