import { DeskClient } from '@/components/DeskClient';
import { getTasksShown } from '@/actions/getTasksShown';
import { DeskServerProps } from '@/types';

export const DeskServer = async ({ columnConfig }: DeskServerProps) => {
	const tasks = await getTasksShown();
	return <DeskClient tasks={tasks} columnConfig={columnConfig} />;
};
