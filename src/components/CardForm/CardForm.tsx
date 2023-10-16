import { Box, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { StyledModalButton } from '@/components/StyledComponents';
import { ChangeEvent, useState } from 'react';
import { CardFormProps } from '@/types';

export const CardForm = ({ onCancel, onConfirm }: CardFormProps) => {
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const titleHandler = (evt: ChangeEvent<HTMLInputElement>) => setTitle(evt.target.value);
	const descriptionHandler = (evt: ChangeEvent<HTMLInputElement>) => setDescription(evt.target.value);
	return (
		<form action={onConfirm}>
			<Box>Title</Box>
			<TextField onChange={titleHandler} value={title} name="title" margin="dense" variant="standard" fullWidth />
			<Box mt={2}>Description</Box>
			<TextField
				onChange={descriptionHandler}
				value={description}
				margin="dense"
				variant="outlined"
				name="description"
				fullWidth
				multiline
				rows={4}
			/>
			<Grid container flexDirection="row-reverse">
				<Grid item>
					<StyledModalButton variant="text" onClick={onCancel}>
						Cancel
					</StyledModalButton>
					<StyledModalButton type="submit" variant="text">
						Confirm
					</StyledModalButton>
				</Grid>
			</Grid>
		</form>
	);
};
