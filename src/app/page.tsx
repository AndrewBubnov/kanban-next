import { auth } from '@clerk/nextjs';
import { Header } from '@/modules/Header';
import { Grid } from '@mui/material';
import { HeroContainer } from '@/modules/StyledComponents';

export default async function Home() {
	const userId = auth().userId as string;
	return (
		<>
			<Header userId={userId} />
			{userId ? null : <HeroContainer>Please register or sign in to continue</HeroContainer>}
		</>
	);
}
