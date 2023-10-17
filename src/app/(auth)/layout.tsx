import { ReactNode } from 'react';
import { Wrapper } from '@/components/StyledComponents';

export default function AuthLayout({ children }: { children: ReactNode }) {
	return <Wrapper>{children}</Wrapper>;
}
