'use client';
import { ChangeEvent, useCallback, useContext, useMemo, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { columns } from '@/constants';
import { DashboardContext } from '@/components/DashboardProvider';
import { Select } from '@/components/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import { sortColumns } from '@/utils/sortColumns';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/material';
import { CreateColumnInput } from '@/components/StyledComponents';

export const ColumnSelect = () => {
	const { columnConfig, setColumnConfig } = useContext(DashboardContext);
	const [newColumnName, setNewColumnName] = useState<string>('');
	const changeHandler = (event: SelectChangeEvent<unknown>) => {
		const value = event.target.value as string[];
		if (!value.at(-1)) return;
		setColumnConfig(value.sort(sortColumns));
	};

	const newColumnHandler = (evt: ChangeEvent<HTMLInputElement>) => {
		setNewColumnName(evt.target.value);
	};

	const createColumn = useCallback(async () => {
		setColumnConfig(prevState => [...prevState, newColumnName]);
		setNewColumnName('');
	}, [newColumnName, setColumnConfig]);

	const menuItemArray = useMemo(() => {
		const main = columns.map(status => (
			<MenuItem key={status} value={status}>
				<Checkbox checked={columnConfig.indexOf(status) > -1} />
				<ListItemText primary={status} />
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
			renderValue={() => `${columnConfig.length} shown`}
		>
			{menuItemArray}
		</Select>
	);
};
