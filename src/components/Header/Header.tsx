import { Box } from '@mui/material';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import styles from './Header.module.css';

export const Header = ({ userId }: { userId: string }) => {
	return (
		<Box className={styles.container}>
			{/*<StyledToolbar>*/}
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
			{/*</StyledToolbar>*/}
		</Box>
	);
};
