export interface Move {
	move: string;
	timeout: number;
}
export interface ToastProps {
	moves: Move[];
	text: string;
	onDelete(): void;
}

export interface NotificationMap {
	[key: string]: {
		text: string;
		moves: Move[];
	};
}
