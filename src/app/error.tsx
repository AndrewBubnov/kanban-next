'use client';

import { useEffect } from 'react';
import { HeroContainer, StyledActionButton } from '@/modules/Shared/styled';
import { useTheme } from 'next-themes';

export default function Error({ reset, error }: { reset(): void; error: Error & { digest?: string } }) {
	const { theme } = useTheme();
	useEffect(() => console.error(error), [error]);
	return (
		<div>
			<HeroContainer>
				Sorry, something went wrong
				<StyledActionButton onClick={reset} isLight={theme !== 'dark'}>
					Please try again
				</StyledActionButton>
			</HeroContainer>
		</div>
	);
}
