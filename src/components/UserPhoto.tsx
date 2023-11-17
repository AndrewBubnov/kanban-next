import { UserPhotoImage, UserPhotoStub } from '@/components/StyledComponents';
import { UserPhotoProps } from '@/types';

export const UserPhoto = ({ size, username, imageUrl }: UserPhotoProps) =>
	imageUrl ? (
		<UserPhotoImage src={imageUrl} size={size} alt="photo" />
	) : (
		<UserPhotoStub size={size}>{username.at(0)?.toUpperCase()}</UserPhotoStub>
	);
