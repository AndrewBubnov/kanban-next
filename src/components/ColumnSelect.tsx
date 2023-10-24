'use client';
import { useContext } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { ColumnNameDTO, columns } from '@/constants';
import { StyledFormControl } from '@/components/StyledComponents';
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
		<StyledFormControl>
			<Select
				labelText="Columns"
				multiple
				value={columnConfig}
				onChange={handleChange}
				input={<OutlinedInput label="Columns" />}
				renderValue={sel => `${(sel as Status[]).length} items`}
			>
				{columns.map(name => (
					<MenuItem key={name} value={name}>
						<Checkbox checked={columnConfig.indexOf(name) > -1} />
						<ListItemText primary={ColumnNameDTO[name]} />
					</MenuItem>
				))}
			</Select>
		</StyledFormControl>
	);
};
