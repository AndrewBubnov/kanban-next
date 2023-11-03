import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { DASHBOARD } from '@/constants';

export default authMiddleware({
	afterAuth(auth, req, evt) {
		if (auth.userId && !auth.orgId && !req.nextUrl.pathname.startsWith(DASHBOARD)) {
			const orgSelection = new URL(DASHBOARD, req.url);
			return NextResponse.redirect(orgSelection);
		}
	},
});

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
