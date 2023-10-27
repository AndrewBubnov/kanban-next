'use client';
import { ChangeEvent, useCallback, useContext, useMemo, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { DashboardContext } from '@/components/DashboardProvider';
import { Select } from '@/components/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/material';
import { CreateColumnInput } from '@/components/StyledComponents';
import { updateColumnList } from '@/actions/updateColumnList';

export const ColumnSelect = () => {
	const { columnConfig } = useContext(DashboardContext);

	const [newColumnName, setNewColumnName] = useState<string>('');
	const changeHandler = async (event: SelectChangeEvent<unknown>) => {
		const value = (event.target.value as string[]).at(-1);
		await updateColumnList(value);
	};

	const newColumnHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		setNewColumnName(evt.target.value);
	};

	const createColumn = useCallback(async () => {
		setNewColumnName('');
	}, []);

	const menuItemArray = useMemo(() => {
		const main = columnConfig.map(column => (
			<MenuItem key={column.name} value={column.name}>
				<Checkbox checked={column.shown} />
				<ListItemText primary={column.name} />
			</MenuItem>
		));
		return main.concat(
			<Box key="input" sx={{ padding: '6px 16px' }}>
				<Box sx={{ fontSize: '0.8rem' }}>Type new column name:</Box>
				<form action={createColumn}>
					<FormControl sx={{ maxWidth: 170 }}>
						<CreateColumnInput
							autoFocus
							name="column"
							autoComplete="off"
							value={newColumnName}
							onChange={newColumnHandler}
						/>
					</FormControl>
				</form>
			</Box>
		);
	}, [columnConfig, newColumnName, createColumn]);

	return (
		<Select
			label="Columns"
			multiple
			value={columnConfig}
			onChange={changeHandler}
			renderValue={() => `${columnConfig.filter(el => el.shown).length} shown`}
		>
			{menuItemArray}
		</Select>
	);
};
