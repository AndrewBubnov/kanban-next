import { HTMLAttributes } from 'react';

export enum Move {
	UP = 'up',
	LEFT = 'left',
	RIGHT = 'right',
	DOWN = 'down',
}

export interface ToastProps {
	move: Move;
	text: string;
	link: string;
	row: number;
	onDelete(): void;
}

export type MoveStateItem = { id: string; move: Move; text: string; link: string; row: number };

export type Notification = { text: string; link: string; id: string };

export interface ToastEmitterProps {
	notifications: Notification[];
}

export type ToastSpanProps = HTMLAttributes<HTMLSpanElement>;
