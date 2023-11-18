import { auth, UserButton } from '@clerk/nextjs';
import { HeaderContainer, HeaderLink, UserButtonWrapper } from '@/modules/Header/styled';
import { ThemeSwitch } from '@/modules/ThemeSwitch/components/ThemeSwitch';
import { FlexWrapper } from '@/modules/Shared/styled';

export const Header = () => {
	const { userId } = auth();
	return (
		<HeaderContainer>
			<FlexWrapper>
				<ThemeSwitch />
				{userId ? (
					<UserButtonWrapper>
						<UserButton afterSignOutUrl="/" />
					</UserButtonWrapper>
				) : (
					<>
						<HeaderLink href="/sign-in">Sign in</HeaderLink>
						<HeaderLink href="/sign-up">Sign up</HeaderLink>
					</>
				)}
			</FlexWrapper>
		</HeaderContainer>
	);
};
