import { HeroContainer, NotFoundPageLink, NotFoundPageText } from '@/modules/Shared/styled';

export const NotFoundPage = () => {
	return (
		<HeroContainer>
			<NotFoundPageText>Page not found</NotFoundPageText>
			<NotFoundPageLink href="/">back home</NotFoundPageLink>
		</HeroContainer>
	);
};
