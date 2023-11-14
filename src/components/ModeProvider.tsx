'use client';
import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';

export function ModeProvider({ children }: { children: ReactNode }) {
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	return <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>;
}
