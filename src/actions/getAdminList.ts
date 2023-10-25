import { ADMINS_LIST } from '@/constants';
import { prisma } from '@/db';
import { AdminList } from '@/types';

export const getAdminList = async (): Promise<string[]> => {
	let adminListContent: AdminList | null = await prisma.adminList.findFirst({
		where: { listId: 1 },
		include: {
			admins: true,
		},
	});

	if (!adminListContent) {
		adminListContent = await prisma.adminList.create({
			data: {
				listId: 1,
				admins: {
					create: ADMINS_LIST,
				},
			},
			include: {
				admins: true,
			},
		});
	}
	return adminListContent.admins.map(el => el.email);
};
