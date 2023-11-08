'use server';
import { DASHBOARD } from '@/constants';
import { revalidatePath } from 'next/cache';
import { getExistingColumns } from '@/actions/getExistingColumns';
import { updateColumns } from '@/actions/updateColumns';

export const addColumn = async (name: string) => {
	const existed = await getExistingColumns();

	if (!existed) return;

	const updated = [...existed.columns, { name, shown: true }];

	await updateColumns(updated);

	revalidatePath(DASHBOARD);
};
