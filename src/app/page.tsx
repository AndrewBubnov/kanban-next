import { auth } from '@clerk/nextjs';
import { Header } from '@/modules/Header/components/Header';
import { Grid } from '@mui/material';
import { HeroContainer } from '@/modules/Shared/styled';

export default async function Home() {
	const userId = auth().userId as string;
	return (
		<>
			<Header userId={userId} />
			{userId ? null : <HeroContainer>Please register or sign in to continue</HeroContainer>}
		</>
	);
}
