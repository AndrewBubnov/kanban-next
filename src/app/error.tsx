'use client';

import { HeroContainer, StyledActionButton } from '@/components/StyledComponents';

export default function Error({ reset }: { reset(): void }) {
	return (
		<div>
			<HeroContainer>
				Sorry, something went wrong..
				<StyledActionButton onClick={reset}>Try again</StyledActionButton>
			</HeroContainer>
		</div>
	);
}
