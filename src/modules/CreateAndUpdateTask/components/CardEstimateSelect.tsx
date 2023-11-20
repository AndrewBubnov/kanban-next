import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { estimation } from '@/modules/CreateAndUpdateTask/constants';
import { CardEstimateSelectProps } from '@/modules/CreateAndUpdateTask/types';
import { ConditionalFullWidth } from '@/modules/CreateAndUpdateTask/styled';
import { timeUnits } from '@/modules/Shared/constants';

export const CardEstimateSelect = ({
	createdAt,
	estimateDays,
	setEstimateDays,
	fullWidth,
}: CardEstimateSelectProps) => {
	const changeHandler = (event: SelectChangeEvent<string>) => setEstimateDays(event.target.value as string);

	return (
		<ConditionalFullWidth fullWidth={fullWidth}>
			<InputLabel>Estimate</InputLabel>
			<Select value={estimateDays} label="Estimate" onChange={changeHandler}>
				{estimation.map(el => {
					const disabled = Date.parse(createdAt.toString()) + parseFloat(el) * timeUnits.day < Date.now();
					return (
						<MenuItem key={el} value={el} disabled={disabled}>
							{el}
						</MenuItem>
					);
				})}
			</Select>
		</ConditionalFullWidth>
	);
};
