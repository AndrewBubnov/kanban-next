import { HTMLAttributes, ReactElement } from 'react';

export type Comment = {
	id: string;
	taskId: string;
	username: string;
	userId: string;
	createdAt: Date;
	text: string;
};

export type AddCommentToTask = { taskId: string; text: string };

export type EditHandlerArgs = { id: string; text: string };

export interface SingleCommentProps {
	comment: Comment;
	onDelete(): Promise<void>;
	onEdit(): void;
}

export type TaggedSpanProps = HTMLAttributes<HTMLSpanElement>;

export interface PopoverContentInjectedProps {
	onClose(): void;
}

export interface FunctionalPopoverProps {
	children: ({ onClose }: PopoverContentInjectedProps) => ReactElement;
}

export interface PopoverContentProps {
	onDelete(): Promise<void>;
	onEdit(): void;
	onClose(): void;
}
