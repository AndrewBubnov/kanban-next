import { Box, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { StyledModalButton } from '@/components/StyledComponents';
import { ChangeEvent, useState } from 'react';
import { CardFormCreateProps } from '@/types';
import { addTask } from '@/actions/addTask';

export const CardFormCreate = ({ onCancel }: CardFormCreateProps) => {
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const titleHandler = (evt: ChangeEvent<HTMLInputElement>) => setTitle(evt.target.value);
	const descriptionHandler = (evt: ChangeEvent<HTMLInputElement>) => setDescription(evt.target.value);
	const confirmHandler = async (data: FormData) => {
		const title = data.get('title') as string;
		const description = data.get('description') as string;
		if (!title) return;
		await addTask({ title, description });
		onCancel();
	};
	return (
		<form action={confirmHandler}>
			<Box>Title</Box>
			<TextField onChange={titleHandler} value={title} name="title" margin="dense" fullWidth />
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
