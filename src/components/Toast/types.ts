export interface Move {
	move: 'up' | 'left' | 'right' | `down${string}`;
	timeout: number;
}
export interface ToastProps {
	moves: Move[];
	text: string;
	link: string;
	onDelete(): void;
}

export interface NotificationMap {
	[key: string]: {
		text: string;
		link: string;
		moves: Move[];
	};
}
