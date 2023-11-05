'use server';
import { prisma } from '@/db';
import { auth, currentUser } from '@clerk/nextjs';
import { getAdminList } from '@/actions/getAdminList';

export const getUser = async () => {
	const userId = auth().userId as string;
	if (!userId) {
		console.log('userId is not defined');
		return;
	}
	const user = await currentUser();
	const adminList = await getAdminList();
	const username = user?.username || '';
	const email = user?.emailAddresses[0].emailAddress || '';

	let existingUser = await prisma.user.findUnique({
		where: { userId },
		include: {
			tasks: true,
		},
	});

	if (!existingUser) {
		const createUser = await prisma.user.create({
			data: {
				userId,
				email,
				username,
				isAdmin: adminList.includes(email),
				tasks: {
					create: [],
				},
			},
		});
		existingUser = {
			id: createUser.id,
			userId: createUser.userId,
			email: createUser.email,
			username: createUser.username,
			isAdmin: createUser.isAdmin,
			tasks: [],
		};
	}
	return existingUser;
};
