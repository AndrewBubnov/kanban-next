'use client';
import { useContext, useEffect, useMemo, useState } from 'react';
import { DashboardContext } from '@/components/DashboardProvider';
import MenuItem from '@mui/material/MenuItem';
import { StyledFormControl } from '@/components/StyledComponents';
import { SelectChangeEvent } from '@mui/material/Select';
import { Select } from '@/components/Select';
import { ALL_USERNAMES, SELECT_ALL_USERS } from '@/constants';

export const UserSelect = () => {
	const { tasks, userIdsArray, setFilteredTasks } = useContext(DashboardContext);
	const [userId, setUserId] = useState<string>('');
	const [username, setUsername] = useState<string>(ALL_USERNAMES);

	const extendedUserIdsArray = useMemo(() => [SELECT_ALL_USERS, ...userIdsArray], [userIdsArray]);

	useEffect(() => {
		const filtered = tasks.filter(el => el.assignee.userId.includes(userId));
		setFilteredTasks(filtered);
	}, [setFilteredTasks, tasks, userId]);

	const changeHandler = (event: SelectChangeEvent<unknown>) => {
		const value = event.target.value as string;
		const currentUserId = extendedUserIdsArray.find(item => value === item.username)?.userId || '';
		setUsername(value);
		setUserId(currentUserId);
	};

	return (
		<StyledFormControl>
			<Select value={username} labelText="Assignee" label="Assignee" onChange={changeHandler}>
				{extendedUserIdsArray.map(el => (
					<MenuItem key={el.userId} value={el.username}>
						{el.username}
					</MenuItem>
				))}
			</Select>
		</StyledFormControl>
	);
};