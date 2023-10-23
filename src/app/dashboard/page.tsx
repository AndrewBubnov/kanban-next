import { Desk } from '@/components/Desk';
import { Header } from '@/components/Header';
import { auth } from '@clerk/nextjs';
import { AddTask } from '@/components/AddTask';
import { getTasks } from '@/actions/getTasks';
import { ControlsContainer, MainContainer } from '@/components/StyledComponents';
import { Switch } from '@/components/Switch';
import { getMappedUserIds } from '@/actions/getMappedUserIds';

export default async function Dashboard() {
	const userId = auth().userId as string;
	const tasks = await getTasks();
	const userIdsArray = await getMappedUserIds();

	return (
		<MainContainer>
			<Header userId={userId} />
			<ControlsContainer>
				<AddTask userId={userId} />
				<Switch userIdsArray={userIdsArray} tasks={tasks} />
			</ControlsContainer>
			<Desk />
		</MainContainer>
	);
}
