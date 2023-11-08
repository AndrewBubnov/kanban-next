import { prisma } from '@/db';
import { SINGLE_ID } from '@/constants';

export const getExistingColumns = async () =>
	await prisma.columnList.findFirst({
		where: { id: SINGLE_ID },
		include: {
			columns: true,
		},
	});
