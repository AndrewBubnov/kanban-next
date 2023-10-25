'use client';
import { useContext } from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { ColumnNameDTO, columns } from '@/constants';
import { DashboardContext } from '@/components/DashboardProvider';
import { Select } from '@/components/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import { sortColumns } from '@/utils/sortColumns';
import { Status } from '@/types';

export const ColumnSelect = () => {
	const { columnConfig, setColumnConfig } = useContext(DashboardContext);
	const handleChange = (event: SelectChangeEvent<unknown>) =>
		setColumnConfig((event.target.value as Status[]).sort(sortColumns));

	return (
		<Select
			label="Columns"
			multiple
			value={columnConfig}
			onChange={handleChange}
			renderValue={() => `${columnConfig.length} items`}
		>
			{columns.map(status => (
				<MenuItem key={status} value={status}>
					<Checkbox checked={columnConfig.indexOf(status) > -1} />
					<ListItemText primary={ColumnNameDTO[status]} />
				</MenuItem>
			))}
		</Select>
	);
};
