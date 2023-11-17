import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { ThemedTextFieldProps } from '@/modules/ThemeSwitch/types';

export const HoverSensitiveMenuItem = styled(MenuItem)`
	&:hover > button {
		opacity: 1;
	}
`;
export const SmallIconTransparentButton = styled(IconButton)(() => ({
	padding: 2,
	opacity: 0,
	transition: 'opacity 0.3s ease',
}));
export const SmallDeleteIcon = styled(DeleteIcon)(() => ({
	width: '1rem',
	height: '1rem',
}));
export const NewColumnLabel = styled(Box)(() => ({
	fontSize: '0.8rem',
}));
export const CustomColumnFormControl = styled(FormControl)(() => ({
	maxWidth: 170,
}));
export const CreateColumnInput = styled(({ isLight, ...props }: ThemedTextFieldProps) => <TextField {...props} />)`
	margin-top: 5px;

	.MuiOutlinedInput-notchedOutline {
		border-color: ${({ isLight }) => (isLight ? 'lightgray' : '#1a1a1a')};
	}

	&:hover .MuiOutlinedInput-notchedOutline {
		border-color: ${({ isLight }) => (isLight ? '#fff' : '#000')};
	}

	& .MuiOutlinedInput-root {
		& > input {
			padding: 5px;
			color: ${({ isLight }) => (isLight ? '#fff' : '#1a1a1a')};
		}
	}
`;
export const NewColumnInputWrapper = styled(Box)(() => ({
	padding: '6px 16px',
}));
