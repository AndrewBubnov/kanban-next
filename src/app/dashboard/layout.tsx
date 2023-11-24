import { ReactNode } from 'react';
import { ErrorNotificationEmitter } from '@/modules/Notification/components/ErrorNotificationEmitter';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<>
			{children}
			<ErrorNotificationEmitter />
		</>
	);
}
