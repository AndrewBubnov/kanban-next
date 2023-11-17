import { ReactNode } from 'react';
import { Wrapper } from '@/modules/Shared/styled';

export default function AuthLayout({ children }: { children: ReactNode }) {
	return <Wrapper>{children}</Wrapper>;
}
