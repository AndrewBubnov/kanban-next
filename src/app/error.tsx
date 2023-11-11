'use client';

import { useEffect } from 'react';
import { HeroContainer, StyledActionButton } from '@/components/StyledComponents';


export default function Error({ reset, error }: { reset(): void; error: Error & { digest?: string } }) {
	useEffect(() => console.error(error), [error]);
	return (
		<div>
			<HeroContainer>
				Sorry, something went wrong..
				<StyledActionButton onClick={reset} isLight>Try again</StyledActionButton>
			</HeroContainer>
		</div>
	);
}
