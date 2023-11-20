import { FunctionalButton, FunctionalButtonWrapper, StyledDivider } from '@/modules/Comments/styled';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { PopoverContentProps } from '@/modules/Comments/types';

export const PopoverContent = ({ onEdit, onDelete, onClose }: PopoverContentProps) => {
	const editHandler = () => {
		onEdit();
		onClose();
	};
	const deleteHandler = async () => {
		onClose();
		await onDelete();
	};
	return (
		<FunctionalButtonWrapper>
			<FunctionalButton onClick={editHandler} size="small" startIcon={<EditIcon />}>
				Edit
			</FunctionalButton>
			<StyledDivider />
			<FunctionalButton onClick={deleteHandler} size="small" startIcon={<DeleteIcon />}>
				Delete
			</FunctionalButton>
		</FunctionalButtonWrapper>
	);
};
