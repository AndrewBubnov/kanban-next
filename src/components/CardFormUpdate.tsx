'use client';
import { Box, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { StyledModalButton } from '@/components/StyledComponents';
import { ChangeEvent, useState } from 'react';
import { CardFormUpdateProps, Status } from '@/types';
import { updateSingleTask } from '@/actions/updateSingleTask';
import { useRouter } from 'next/navigation';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ColumnNameDTO, columns } from '@/constants';

export const CardFormUpdate = ({ taskId, initTitle, initStatus, initDescription }: CardFormUpdateProps) => {
	const { push } = useRouter();
	const [title, setTitle] = useState<string>(initTitle);
	const [description, setDescription] = useState<string>(initDescription);
	const [status, setStatus] = useState<Status>(initStatus);

	const titleHandler = (evt: ChangeEvent<HTMLInputElement>) => setTitle(evt.target.value);
	const descriptionHandler = (evt: ChangeEvent<HTMLInputElement>) => setDescription(evt.target.value);
	const statusHandler = (event: SelectChangeEvent) => setStatus(event.target.value as Status);
	const cancelHandler = () => push(`/dashboard/${taskId}`);
	const confirmHandler = async () => {
		if (!title) return;
		await updateSingleTask(taskId, { title, description, status });
		cancelHandler();
	};

	return (
		<form action={confirmHandler}>
			<Box>Title</Box>
			<TextField onChange={titleHandler} value={title} name="title" margin="dense" fullWidth />
			<Box mt={2}>
				<FormControl fullWidth>
					<InputLabel id="status">Status</InputLabel>
					<Select value={status} label="Status" onChange={statusHandler}>
						{columns.map(el => (
							<MenuItem key={el} value={el}>
								{ColumnNameDTO[el]}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
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
					<StyledModalButton variant="text" onClick={cancelHandler}>
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
