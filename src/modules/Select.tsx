'use client';
import { LightInputLabel, ThemedSelect, StyledFormControl } from '@/modules/StyledComponents';
import { SelectProps } from '@mui/material';
import { useTheme } from 'next-themes';
import { LIGHT } from '@/constants';

const getMenuProps = (isLight: boolean) => ({
	PaperProps: {
		style: {
			marginTop: 2,
			background: isLight ? '#2f2f2f' : '#fff',
			color: isLight ? '#fff' : '#2f2f2f',
		},
	},
});

export const Select = ({ children, ...props }: SelectProps) => {
	const { theme } = useTheme();
	const isLight = theme === LIGHT;
	return (
		<StyledFormControl>
			<LightInputLabel shrink isLight={isLight}>
				{props.label}
			</LightInputLabel>
			<ThemedSelect {...props} MenuProps={getMenuProps(isLight)} notched isLight={isLight}>
				{children}
			</ThemedSelect>
		</StyledFormControl>
	);
};
