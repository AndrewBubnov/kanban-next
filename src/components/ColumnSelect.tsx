'use client';
import { ChangeEvent, useContext, useMemo, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { ColumnNameDTO, columns } from '@/constants';
import { DashboardContext } from '@/components/DashboardProvider';
import { Select } from '@/components/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import { sortColumns } from '@/utils/sortColumns';
import { Status } from '@/types';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/material';
import { CreateColumnInput } from '@/components/StyledComponents';

export const ColumnSelect = () => {
	const { columnConfig, setColumnConfig } = useContext(DashboardContext);
	const [newColumnName, setNewColumnName] = useState<string>('');
	const changeHandler = (event: SelectChangeEvent<unknown>) => {
		const value = event.target.value as Status[];
		if (value.at(-1)) {
			setColumnConfig(value.sort(sortColumns));
		}
	};

	const newColumnHandler = (evt: ChangeEvent<HTMLInputElement>) => setNewColumnName(evt.target.value);

	const createColumn = async () => {
		setNewColumnName('');
	};

	const menuItemArray = useMemo(() => {
		const main = columns.map(status => (
			<MenuItem key={status} value={status}>
				<Checkbox checked={columnConfig.indexOf(status) > -1} />
				<ListItemText primary={ColumnNameDTO[status]} />
			</MenuItem>
		));
		return main.concat(
			<MenuItem key="input">
				<Box>
					<Box sx={{ fontSize: '0.8rem' }}>Type new column name:</Box>
					<form action={createColumn}>
						<FormControl sx={{ maxWidth: 170 }}>
							<CreateColumnInput
								name="column"
								autoComplete="off"
								value={newColumnName}
								onChange={newColumnHandler}
							/>
						</FormControl>
					</form>
				</Box>
			</MenuItem>
		);
	}, [columnConfig, newColumnName]);

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
