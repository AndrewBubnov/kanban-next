'use client';
import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { useIsDomLoaded } from '@/modules/Shared/hooks/useIsDomLoaded';

export function ModeProvider({ children }: { children: ReactNode }) {
	const isDomLoaded = useIsDomLoaded();

	if (!isDomLoaded) return children;

	return <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>;
}
