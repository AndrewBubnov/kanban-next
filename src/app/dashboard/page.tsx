import { Desk } from '@/components/Desk/Desk';
import { Header } from '@/components/Header/Header';
import { auth } from '@clerk/nextjs';
import { columns } from '@/constants';
import { AddTask } from '@/components/AddTask/AddTask';
import { getTasks } from '@/actions/getTasks';
import { MainContainer } from '@/components/StyledComponents';
import { sortByIndices } from '@/utils/sortByIndices';

export default async function Dashboard() {
	const userId = auth().userId as string;
	const tasks = await getTasks(userId);
	return (
		<MainContainer>
			<Header userId={userId} />
			<AddTask userId={userId} />
			<Desk tasks={tasks.sort(sortByIndices)} columns={columns} />
		</MainContainer>
	);
}
