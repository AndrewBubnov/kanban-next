'use client';
import { useContext, useEffect, useMemo, useState } from 'react';
import { DashboardContext } from '@/modules/Providers/DashboardProvider';
import { Select } from '@/modules/Shared/components/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import { useRouter, useSearchParams } from 'next/navigation';
import { ALL_USERNAMES_SELECTED, SELECT_ALL_USERS } from '@/modules/UserSelect/constants';
import { ALL_USERS, DASHBOARD } from '@/modules/Shared/constants';

export const UserSelect = () => {
	const { userIdsArray, setIsLoading } = useContext(DashboardContext);
	const [username, setUsername] = useState<string>(ALL_USERNAMES_SELECTED);
	const searchParamsUser = useSearchParams().get('user');
	const router = useRouter();

	const extendedUserIdsArray = useMemo(() => [SELECT_ALL_USERS, ...userIdsArray], [userIdsArray]);

	useEffect(() => {
		if (searchParamsUser) return;
		setIsLoading(true);
		router.replace(`${DASHBOARD}?username=${username === ALL_USERNAMES_SELECTED ? ALL_USERS : username}`);
	}, [router, searchParamsUser, setIsLoading, username]);

	const changeHandler = async (event: SelectChangeEvent<unknown>) => setUsername(event.target.value as string);

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
