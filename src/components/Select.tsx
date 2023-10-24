import { LightInputLabel, LightSelect } from '@/components/StyledComponents';
import { CombinedSelectProps } from '@/types';

const MenuProps = {
	PaperProps: {
		style: {
			marginTop: 2,
		},
	},
};

export const Select = ({ children, labelText, ...props }: CombinedSelectProps) => (
	<>
		<LightInputLabel shrink>{labelText}</LightInputLabel>
		<LightSelect {...props} MenuProps={MenuProps} notched>
			{children}
		</LightSelect>
	</>
);
