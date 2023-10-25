import { LightInputLabel, LightSelect, StyledFormControl } from '@/components/StyledComponents';
import { SelectProps } from '@mui/material';

const MenuProps = {
	PaperProps: {
		style: {
			marginTop: 2,
		},
	},
};

export const Select = ({ children, ...props }: SelectProps) => (
	<StyledFormControl>
		<LightInputLabel shrink>{props.label}</LightInputLabel>
		<LightSelect {...props} MenuProps={MenuProps} notched>
			{children}
		</LightSelect>
	</StyledFormControl>
);
