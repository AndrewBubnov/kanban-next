import { auth } from '@clerk/nextjs';
import { HeroContainer } from '@/modules/Shared/styled';

export default async function Home() {
	const userId = auth().userId as string;
	return <>{userId ? null : <HeroContainer>Please register or sign in to continue</HeroContainer>}</>;
}
