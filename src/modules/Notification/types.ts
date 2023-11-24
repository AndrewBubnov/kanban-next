import { HTMLAttributes } from 'react';

export enum Move {
	UP = 'up',
	LEFT = 'left',
	RIGHT = 'right',
	DOWN = 'down',
}

export interface ToastProps {
	moves: ToastMove[];
	text: string;
	link: string;
	onDelete(): void;
}

export interface ToastMove {
	move: Move;
	timeout: number;
	row: number;
}

export type MoveStateItem = { id: string; moves: ToastMove[]; text: string; link: string };

export type Notification = { text: string; link: string; id: string };

export interface ToastEmitterProps {
	notifications: Notification[];
}

export type ToastSpanProps = HTMLAttributes<HTMLSpanElement>;

export interface ErrorToastProgressProps extends HTMLAttributes<HTMLDivElement> {
	width: number;
}

export interface ErrorToastProps {
	isShown: boolean;
	message: string;
	onDelete(): void;
	onTransitionEnd(): void;
}

declare global {
	interface WindowEventMap {
		customError: CustomEvent;
	}
}
