import { UserPhotoImage, UserPhotoStub } from '@/modules/StyledComponents';
import { UserPhotoProps } from '@/types';

export const UserPhoto = ({ size, username, imageUrl }: UserPhotoProps) =>
	imageUrl ? (
		<UserPhotoImage src={imageUrl} size={size} alt="photo" />
	) : (
		<UserPhotoStub size={size}>{username.at(0)?.toUpperCase()}</UserPhotoStub>
	);
