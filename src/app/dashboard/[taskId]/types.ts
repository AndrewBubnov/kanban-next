import { LinkProps } from 'next/link';
import { ReactNode } from 'react';
import { TaskItem } from '@/modules/Shared/types';

export interface EditPageLinkProps extends LinkProps {
	children: ReactNode;
	color?: string;
	paddingTop?: number;
}

export interface EstimatedTimeProps {
	task: TaskItem;
	editPage: string;
}
