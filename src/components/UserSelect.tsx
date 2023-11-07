'use client';
import { useContext, useEffect, useMemo, useState } from 'react';
import { DashboardContext } from '@/components/DashboardProvider';
import { Select } from '@/components/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import { ALL_USERNAMES, SELECT_ALL_USERS } from '@/constants';
import { getTasksByUserId } from '@/actions/getTasksByUserId';

export const UserSelect = () => {
	const { userIdsArray, setTasks } = useContext(DashboardContext);
	const [userId, setUserId] = useState<string>('');
	const [username, setUsername] = useState<string>(ALL_USERNAMES);

	const extendedUserIdsArray = useMemo(() => [SELECT_ALL_USERS, ...userIdsArray], [userIdsArray]);

	useEffect(() => {
		(async function () {
			const tasks = await getTasksByUserId(userId);
			setTasks(tasks);
		})();
	}, [setTasks, userId]);

	const changeHandler = (event: SelectChangeEvent<unknown>) => {
		const value = event.target.value as string;
		const currentUserId = extendedUserIdsArray.find(item => value === item.username)?.userId || '';
		setUsername(value);
		setUserId(currentUserId);
	};

	return (
		<Select value={username} label="Assignee" onChange={changeHandler}>
			{extendedUserIdsArray.map(el => (
				<MenuItem key={el.userId} value={el.username}>
					{el.username}
				</MenuItem>
			))}
		</Select>
	);
};
