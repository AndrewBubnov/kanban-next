import { Comment } from '@/modules/Comments/types';
import { HTMLAttributes } from 'react';
import { FormControlProps } from '@mui/material/FormControl/FormControl';
import { ImageProps } from 'next/image';

export type Assignee = {
	id: string;
	userId: string;
	email: string;
	username: string;
	isAdmin: boolean;
	imageUrl: string | null;
};

export type TaskItem = {
	title: string;
	description: string;
	id: string;
	status: string;
	createdAt: Date;
	index: number;
	assignee: Assignee;
	comments: Comment[];
	estimateDays: number;
};

export interface FlexContainerProps extends HTMLAttributes<HTMLDivElement> {
	isReverse?: boolean;
	marginTop?: boolean;
	justify?: boolean;
}

export interface ConditionalFullWidthProps extends FormControlProps {
	fullWidth: boolean;
}

export type ColumnType = { name: string; shown: boolean; columnListId?: string | null; tableId?: number };
export type AdminList = { admins: { email: string; adminListId: number | null }[] };

export interface UserPhotoImageProps extends ImageProps {
	size: 'small' | 'big';
}

export interface UserPhotoStubProps extends HTMLAttributes<HTMLDivElement> {
	size: 'small' | 'big';
}

export interface UserPhotoProps {
	size: 'small' | 'big';
	username: string;
	imageUrl: string | null;
}
