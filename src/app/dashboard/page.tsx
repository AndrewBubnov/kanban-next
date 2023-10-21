import { Desk } from '@/components/Desk';
import { Header } from '@/components/Header';
import { auth } from '@clerk/nextjs';
import { columns } from '@/constants';
import { AddTask } from '@/components/AddTask';
import { getTasks } from '@/actions/getTasks';
import { MainContainer } from '@/components/StyledComponents';
import { sortByIndices } from '@/utils/sortByIndices';

export default async function Dashboard() {
	const userId = auth().userId as string;
	const tasks = await getTasks(userId);
	console.log(tasks);
	return (
		<MainContainer>
			<Header userId={userId} />
			<AddTask userId={userId} />
			<Desk tasks={tasks.sort(sortByIndices)} columns={columns} />
		</MainContainer>
	);
}
