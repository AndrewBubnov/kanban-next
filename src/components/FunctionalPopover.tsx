import { useState, MouseEvent, ReactElement } from 'react';
import Popover from '@mui/material/Popover';
import { SmallEditIcon, SmallIconButton, SmallMoreIcon } from '@/components/StyledComponents';

interface FunctionalPopoverProps {
	children: ReactElement;
}
export default function FunctionalPopover({ children }: FunctionalPopoverProps) {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const clickHandler = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
	const closeHandler = () => setAnchorEl(null);

	const open = Boolean(anchorEl);

	return (
		<div>
			<SmallIconButton onClick={clickHandler}>
				<SmallMoreIcon />
			</SmallIconButton>
			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={closeHandler}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				{children}
			</Popover>
		</div>
	);
}
