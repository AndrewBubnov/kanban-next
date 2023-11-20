import { useState, MouseEvent } from 'react';
import Popover from '@mui/material/Popover';
import { SmallIconButton, SmallMoreIcon } from '@/modules/Comments/styled';
import { FunctionalPopoverProps } from '@/modules/Comments/types';

export default function FunctionalPopover({ children }: FunctionalPopoverProps) {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const clickHandler = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
	const onClose = () => setAnchorEl(null);

	const open = Boolean(anchorEl);

	return (
		<div>
			<SmallIconButton onClick={clickHandler}>
				<SmallMoreIcon />
			</SmallIconButton>
			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={onClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				{children({ onClose })}
			</Popover>
		</div>
	);
}
