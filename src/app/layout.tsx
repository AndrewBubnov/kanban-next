import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ModeProvider } from '@/modules/Providers/ModeProvider';
import './globals.css';
import { Header } from '@/modules/Header/components/Header';

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
					<ModeProvider>
						<Header />
						{children}
					</ModeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
