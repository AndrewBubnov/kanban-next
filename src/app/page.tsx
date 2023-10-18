import { auth } from '@clerk/nextjs';
import { Header } from '@/components/Header';
import { Grid } from '@mui/material';

export default async function Home() {
	const userId = auth().userId as string;
	return (
		<>
			<Header userId={userId} />
			{userId ? null : (
				<Grid container justifyContent="center" mt={20} sx={{ color: '#fff', fontSize: '1.5rem' }}>
					Please register or sign in to continue
				</Grid>
			)}
		</>
	);
}
