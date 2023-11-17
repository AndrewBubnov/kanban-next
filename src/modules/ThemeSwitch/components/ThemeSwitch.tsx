'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { DarkModeIcon, LightModeIcon, StyledSwitch, SwitchWrapper } from '@/modules/ThemeSwitch/styled';
import { DARK, LIGHT } from '@/modules/ThemeSwitch/constants';

export const ThemeSwitch = () => {
	const { theme, setTheme } = useTheme();
	const [checked, setChecked] = useState<boolean>(true);
	const isLight = theme === LIGHT;

	useEffect(() => setTheme(checked ? DARK : LIGHT), [checked, setTheme]);
	const changeHandler = (event: ChangeEvent<HTMLInputElement>) => setChecked(event.target.checked);
	return (
		<SwitchWrapper>
			<LightModeIcon isLight={isLight} />
			<StyledSwitch checked={checked} onChange={changeHandler} />
			<DarkModeIcon isLight={isLight} />
		</SwitchWrapper>
	);
};
