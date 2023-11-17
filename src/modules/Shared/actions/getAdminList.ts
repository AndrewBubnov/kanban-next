import { prisma } from '@/db';
import { ADMINS_LIST } from '@/modules/Shared/constants';
import { AdminList } from '@/modules/Shared/types';

export const getAdminList = async (): Promise<string[]> => {
	let adminListContent: AdminList | null = await prisma.adminList.findFirst({
		where: { id: 1 },
		include: {
			admins: true,
		},
	});

	if (!adminListContent) {
		adminListContent = await prisma.adminList.create({
			data: {
				id: 1,
				admins: { create: ADMINS_LIST },
			},
			include: {
				admins: true,
			},
		});
	}
	return adminListContent?.admins.map(el => el.email);
};
