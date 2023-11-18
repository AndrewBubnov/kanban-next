import { styled } from '@mui/material/styles';
import { Box, Switch, SwitchProps } from '@mui/material';
import LightModeMuiIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeMuiIcon from '@mui/icons-material/DarkModeOutlined';
import { ThemedIconProps } from '@/modules/ThemeSwitch/types';

export const StyledSwitch = styled((props: SwitchProps) => (
	<Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(() => ({
	'width': 42,
	'height': 26,
	'padding': 0,
	'margin': '0 0.5rem',
	'& .MuiSwitch-switchBase': {
		'padding': 0,
		'margin': 2,
		'transitionDuration': '300ms',
		'&.Mui-checked': {
			'transform': 'translateX(16px)',
			'color': 'lightgray',
			'& + .MuiSwitch-track': {
				backgroundColor: '#2ECA45',
				opacity: 1,
				border: 0,
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: 0.5,
			},
		},
		'&.Mui-focusVisible .MuiSwitch-thumb': {
			color: '#33cf4d',
			border: '6px solid #fff',
		},
		'&.Mui-disabled + .MuiSwitch-track': {
			opacity: 0.7,
		},
	},
	'& .MuiSwitch-thumb': {
		boxSizing: 'border-box',
		width: 22,
		height: 22,
	},
	'& .MuiSwitch-track': {
		borderRadius: 26 / 2,
		backgroundColor: 'lightgray',
		opacity: 1,
	},
}));
export const SwitchWrapper = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	marginRight: '2rem',
}));
export const LightModeIcon = styled(({ isLight, ...props }: ThemedIconProps) => <LightModeMuiIcon {...props} />)`
	fill: ${({ isLight }) => (isLight ? '#1a1a1a' : 'lightgray')};
`;
export const DarkModeIcon = styled(({ isLight, ...props }: ThemedIconProps) => <DarkModeMuiIcon {...props} />)`
	fill: ${({ isLight }) => (isLight ? '#1a1a1a' : 'lightgray')};
`;
