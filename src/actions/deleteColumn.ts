'use server';
import { DASHBOARD } from '@/constants';
import { revalidatePath } from 'next/cache';
import { getExistingColumns } from '@/actions/getExistingColumns';
import { updateColumns } from '@/actions/updateColumns';

export const deleteColumn = async (name?: string) => {
	if (!name) return;

	const existed = await getExistingColumns();

	if (!existed) return;

	const updated = existed.columns.filter(el => el.name !== name);

	await updateColumns(updated);

	revalidatePath(DASHBOARD);
};
