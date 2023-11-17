import { ReactNode } from 'react';
import { Wrapper } from '@/modules/StyledComponents';

export default function AuthLayout({ children }: { children: ReactNode }) {
	return <Wrapper>{children}</Wrapper>;
}
