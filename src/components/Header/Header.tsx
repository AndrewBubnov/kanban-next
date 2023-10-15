import { AppBar } from '@mui/material';
import { StyledToolbar } from '@/components/StyledComponents';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import styles from './Header.module.css';

export const Header = ({ userId }: { userId: string }) => {
	return (
		<AppBar position="static" color="transparent">
			<StyledToolbar>
				{userId ? (
					<UserButton />
				) : (
					<>
						<Link href="/sign-in" className={styles.link}>
							Sign in
						</Link>
						<Link href="/sign-up" className={styles.link}>
							Sign up
						</Link>
					</>
				)}
			</StyledToolbar>
		</AppBar>
	);
};
