import { prisma } from '@/db';
import { ADMINS_LIST } from '@/constants';

export const getAdminList = async (userId: string): Promise<string[]> => {
	const adminListContent = await prisma.adminList.findFirst({
		include: {
			admins: true,
		},
	});
	if (!adminListContent) {
		await prisma.adminList.create({
			data: {
				listId: 1,
				admins: {
					create: [],
				},
			},
		});
		await prisma.adminList.update({
			where: { id: 1 },
			data: {
				admins: {
					create: ADMINS_LIST,
				},
			},
		});
		await getAdminList(userId);
	}
	return adminListContent?.admins.map(el => el.email) || [];
};
