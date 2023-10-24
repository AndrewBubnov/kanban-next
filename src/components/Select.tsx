import { LightInputLabel, LightSelect, StyledFormControl } from '@/components/StyledComponents';
import { CombinedSelectProps } from '@/types';

const MenuProps = {
	PaperProps: {
		style: {
			marginTop: 2,
		},
	},
};

export const Select = ({ children, labelText, ...props }: CombinedSelectProps) => (
	<StyledFormControl>
		<LightInputLabel shrink>{labelText}</LightInputLabel>
		<LightSelect {...props} MenuProps={MenuProps} notched>
			{children}
		</LightSelect>
	</StyledFormControl>
);
