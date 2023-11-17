import { ButtonProps, SelectProps } from '@mui/material';
import { InputLabelProps } from '@mui/material/InputLabel/InputLabel';
import { BoxProps } from '@mui/material/Box/Box';
import { OutlinedTextFieldProps } from '@mui/material/TextField/TextField';
import { SvgIconProps } from '@mui/material/SvgIcon/SvgIcon';

export interface ThemedSelectProps extends SelectProps {
	isLight: boolean;
}

export interface ThemedInputLabelProps extends InputLabelProps {
	isLight: boolean;
}

export interface ThemedColumnNameProps extends BoxProps {
	isLight: boolean;
}

export interface ThemedActionButtonProps extends ButtonProps {
	isLight: boolean;
}

export interface ThemedTextFieldProps extends OutlinedTextFieldProps {
	isLight: boolean;
}

export interface ThemedIconProps extends SvgIconProps {
	isLight: boolean;
}
