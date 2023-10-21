import { UserButton } from '@clerk/nextjs';
import { HeaderContainer, HeaderLink } from '@/components/StyledComponents';

export const Header = ({ userId }: { userId: string }) => {
	return (
		<HeaderContainer>
			{userId ? (
				<UserButton afterSignOutUrl="/" />
			) : (
				<>
					<HeaderLink href="/sign-in">Sign in</HeaderLink>
					<HeaderLink href="/sign-up">Sign up</HeaderLink>
				</>
			)}
		</HeaderContainer>
	);
};
