import { Desk } from '@/components/Desk';
import { Header } from '@/components/Header';
import { auth } from '@clerk/nextjs';
import { AddTask } from '@/components/AddTask';
import { getTasks } from '@/actions/getTasks';
import { ControlsContainer, MainContainer } from '@/components/StyledComponents';
import { AssigneeSelect } from '@/components/AssigneeSelect';
import { getMappedUserIds } from '@/actions/getMappedUserIds';
import { SELECT_ALL_USERS } from '@/constants';
import { getUser } from '@/actions/getUser';

export default async function Dashboard() {
	const { isAdmin, userId } = await getUser();
	const tasks = await getTasks();
	const userIdsArray = await getMappedUserIds();

	return (
		<MainContainer>
			<Header userId={userId} />
			<ControlsContainer>
				<AddTask userIdsArray={userIdsArray} isAdmin={isAdmin} />
				<AssigneeSelect userIdsArray={[SELECT_ALL_USERS, ...userIdsArray]} tasks={tasks} />
			</ControlsContainer>
			<Desk />
		</MainContainer>
	);
}
