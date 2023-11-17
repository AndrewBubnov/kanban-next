import { DragEvent, HTMLAttributes, ReactElement, ReactNode } from 'react';
import { TaskItem } from '@/modules/Shared/types';

export type TaskMiniProps = {
	title: string;
	description: string;
	id: string;
	username: string;
	email: string;
	imageUrl: string | null;
};

export interface DraggableProps {
	children: ReactElement;
	isSaved: boolean;

	onDragStart(event: DragEvent<HTMLDivElement>): void;

	onDrag(evt: DragEvent): void;

	onDrop(): void;

	isDragged: boolean;
	isConfigUpdated: boolean;
	dX: number;
	dY: number;
	id: string;
}

export interface ParameterItem {
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

export interface DraggableBoxProps extends HTMLAttributes<HTMLDivElement> {
	isDragged: boolean;
	isConfigUpdated: boolean;
	isSaved: boolean;
	children: ReactNode;
}

export type ColCoords = Record<string, DOMRect>;

export interface DraggableImageProps {
	imageParameters: {
		width: number;
		height: number;
		imgSrc: string;
	};
}

export interface DeskClientProps {
	tasks: TaskItem[];
}
