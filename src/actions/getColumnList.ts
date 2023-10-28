import { prisma } from '@/db';
import { COLUMN_LIST, DASHBOARD } from '@/constants';
import { revalidatePath } from 'next/cache';

export const getColumnList = async () => {
	let columnList = await prisma.columnList.findFirst({
		where: { id: 1 },
		include: {
			columns: true,
		},
	});

	if (!columnList) {
		columnList = await prisma.columnList.create({
			data: {
				id: 1,
				columns: {
					create: COLUMN_LIST,
				},
			},
			include: {
				columns: true,
			},
		});
	}
	revalidatePath(DASHBOARD);

	return columnList.columns;
};
