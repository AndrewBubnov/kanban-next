import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { CardAssigneeSelectProps } from '@/types';

export const CardAssigneeSelect = ({ userIdsArray, username, setUsername, setAssigneeId }: CardAssigneeSelectProps) => {
	const changeHandler = (event: SelectChangeEvent<unknown>) => {
		const value = event.target.value as string;
		const currentUserId = userIdsArray.find(item => value === item.username)?.userId || '';
		setUsername(value);
		setAssigneeId(currentUserId);
	};
	return (
		<FormControl fullWidth>
			<InputLabel>Assignee</InputLabel>
			<Select value={username} label="Assignee" onChange={changeHandler}>
				{userIdsArray.map(el => (
					<MenuItem key={el.userId} value={el.username}>
						{el.username}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};
