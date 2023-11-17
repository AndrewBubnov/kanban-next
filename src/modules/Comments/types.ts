import { HTMLAttributes } from 'react';

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

	deleteHandler(): Promise<void>;

	editHandler(): void;
}

export interface TaggedSpanProps extends HTMLAttributes<HTMLSpanElement> {}
