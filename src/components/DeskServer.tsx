import { DeskClient } from '@/components/DeskClient';
import { getTasksShown } from '@/actions/getTasksShown';

export const DeskServer = async () => {
	const tasks = await getTasksShown();
	return <DeskClient tasks={tasks} />;
};
