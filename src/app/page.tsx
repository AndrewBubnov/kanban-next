import { prisma } from '@/db';
import { Desk } from '@/components/Desk/Desk';
import { columns } from '../../constants';
import { TaskItem } from '../../types';
import { Header } from '@/components/Header/Header';

const userId = '1';

// const newUser = await prisma.user.create({         // register new userId
//     data: {
//         userId,
//     },
// });

export default async function Home() {
	// await prisma.task.deleteMany()
	const tasks = (await prisma.task.findMany({
		where: { userId },
	})) as TaskItem[];
	return (
		<>
			<Header />
			<Desk tasks={tasks} columns={columns} />
		</>
	);
}
