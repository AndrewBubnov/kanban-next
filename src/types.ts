import { Dispatch, DragEvent, HTMLAttributes, ReactElement, ReactNode, SetStateAction } from 'react';
import { FormControlProps } from '@mui/material/FormControl/FormControl';
import { LinkProps } from 'next/link';
import { ButtonProps, SelectProps } from '@mui/material';
import { InputLabelProps } from '@mui/material/InputLabel/InputLabel';
import { BoxProps } from '@mui/material/Box/Box';
import { OutlinedTextFieldProps } from '@mui/material/TextField/TextField';
import { SvgIconProps } from '@mui/material/SvgIcon/SvgIcon';

export type Assignee = {
	id: string;
	userId: string;
	email: string;
	username: string;
	isAdmin: boolean;
};

export type Comment = {
	id: string;
	taskId: string;
	username: string;
	userId: string;
	createdAt: Date;
	text: string;
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

export interface DashboardPageProps {
	searchParams: { username: string };
}

export type EditedTaskContent = Omit<TaskItem, 'id' | 'index' | 'assignee' | 'createdAt' | 'comments'>;

export type TaskMiniProps = {
	title: string;
	description: string;
	id: string;
	username: string;
	email: string;
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

interface ParameterItem {
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

export type ColCoords = Record<string, DOMRect>;

export interface CardFormCreateProps {
	userIdsArray: UserIdsArrayItem[];
	isAdmin: boolean;
	onCancel: () => void;
}

export interface CardFormUpdateProps {
	task: TaskItem;
	isAdmin: boolean;
	userIdsArray: UserIdsArrayItem[];
}

export interface TaskIdParam {
	params: { taskId: string };
}

export interface DraggableBoxProps extends HTMLAttributes<HTMLDivElement> {
	isDragged: boolean;
	isConfigUpdated: boolean;
	isSaved: boolean;
	children: ReactNode;
}

export interface FlexContainerProps extends HTMLAttributes<HTMLDivElement> {
	isReverse?: boolean;
	marginTop?: boolean;
	justify?: boolean;
}

export interface ConditionalFullWidthProps extends FormControlProps {
	fullWidth: boolean;
}

export interface DraggableImageProps {
	imageParameters: {
		width: number;
		height: number;
		imgSrc: string;
	};
}

export interface UserIdsArrayItem {
	userId: string;
	username: string;
}

export type AddTaskAction = {
	userId: string;
	title: string;
	description: string;
	estimateDays: string;
};

export type ColumnType = { name: string; shown: boolean; columnListId?: string | null; tableId?: number };

export interface DeskClientProps {
	tasks: TaskItem[];
}

export interface DetailsContextProps {
	userIdsArray: UserIdsArrayItem[];
}

export interface DetailsProviderProps {
	userIdsArray: UserIdsArrayItem[];
	children: ReactNode;
}
export interface DashboardContextProps {
	userIdsArray: UserIdsArrayItem[];
	isAdmin: boolean;
	columnConfigState: ColumnType[];
	toggleColumnState(name?: string): Promise<void>;
	addCustomColumn(name: string): void;
	removeColumn(name: string): void;
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	isLight: boolean;
}

export interface DashboardProviderProps {
	userIdsArray: UserIdsArrayItem[];
	isAdmin: boolean;
	columnConfig: ColumnType[];
	children: ReactNode;
}

export interface CardEstimateSelectProps {
	createdAt: Date;
	estimateDays: string;
	setEstimateDays: Dispatch<SetStateAction<string>>;
	fullWidth: boolean;
}

export interface CardAssigneeSelectProps {
	userIdsArray: UserIdsArrayItem[];
	userId: string;
	setAssigneeId: Dispatch<SetStateAction<string>>;
}

export interface ConfirmDialogProps {
	title: ReactNode;
	text: ReactNode;
	open: boolean;
	onCancel(): void;
	onConfirm(): void;
}

export type AdminList = { admins: { email: string; adminListId: number | null }[] };

export type AddCommentToTask = { taskId: string; text: string };

export type EditHandlerArgs = { id: string; text: string };

export interface EditPageLinkProps extends LinkProps {
	children: ReactNode;
	color?: string;
	paddingTop?: number;
}

export interface EstimatedTimeProps {
	task: TaskItem;
	editPage: string;
}

export interface SingleCommentProps {
	comment: Comment;
	deleteHandler(): Promise<void>;
	editHandler(): void;
}
export interface ThemedSelectProps extends SelectProps {
	isLight: boolean;
}
export interface ThemedInputLabelProps extends InputLabelProps {
	isLight: boolean;
}

export interface ThemedColumnNameProps extends BoxProps {
	isLight: boolean;
}
export interface ThemedActionButtonProps extends ButtonProps {
	isLight: boolean;
}
export interface ThemedTextFieldProps extends OutlinedTextFieldProps {
	isLight: boolean;
}
export interface ThemedIconProps extends SvgIconProps {
	isLight: boolean;
}

export interface TaggedSpanProps extends HTMLAttributes<HTMLSpanElement> {}
