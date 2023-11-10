import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ModeProvider } from '@/components/ModeProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Kanban desk',
	description: 'Task manager',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body className={inter.className}>
					<ModeProvider>{children}</ModeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
