'use client';
import { useEffect, useMemo, useState } from 'react';
import { useIsDomLoaded } from '@/modules/Shared/hooks/useIsDomLoaded';
import { DateContainer } from '@/modules/Shared/styled';
import { getElapsedTimeDetails } from '@/modules/Comments/getElapsedTimeDetails';
import { timeUnits } from '@/modules/Shared/constants';
import { timeUnitDuration } from '@/modules/Comments/constants';

export const ElapsedTime = ({ createdAt }: { createdAt: Date }) => {
	const [unit, setUnit] = useState<keyof typeof timeUnits>(getElapsedTimeDetails(createdAt).unit);
	const [unitNumber, setUnitNumber] = useState<number>(getElapsedTimeDetails(createdAt).unitNumber);

	const isDomLoaded = useIsDomLoaded();

	const elapsedString = useMemo<string>(
		() => `${unitNumber} ${unit}${unitNumber > 1 ? 's' : ''} ago`,
		[unitNumber, unit]
	);

	useEffect(() => {
		const timeout = window.setTimeout(
			() =>
				setUnitNumber(prevState => {
					const updated = prevState + 1;
					if (updated === timeUnitDuration[unit]) {
						setUnit(getElapsedTimeDetails(createdAt).unit);
						setUnitNumber(getElapsedTimeDetails(createdAt).unitNumber);
					}
					return updated;
				}),
			timeUnits[unit]
		);
		return () => clearTimeout(timeout);
	}, [createdAt, unit, unitNumber]);

	if (!isDomLoaded) return null;

	return <DateContainer component="span">{elapsedString}</DateContainer>;
};

//
// 'use client';
// import { useEffect, useMemo, useState } from 'react';
// import { DateContainer } from '@/modules/Shared/styled';
// import { getElapsedTime } from '@/modules/Comments/utils/getElapsedTime';
// import { MILLISECOND_IN_MIN, MILLISECOND_IN_SEC, SEC_IN_MIN, TIMER_DELAY } from '@/modules/Comments/constants';
//
// export const ElapsedTime = ({ createdAt }: { createdAt: Date }) => {
// 	getElapsedTime(createdAt);
// 	const mountTimeElapsed = useMemo(() => Date.now() - Date.parse(createdAt.toString()), [createdAt]);
//
// 	const [seconds, setSeconds] = useState<number>(Math.floor(mountTimeElapsed / MILLISECOND_IN_SEC));
// 	const [isDomLoaded, setIsDomLoaded] = useState(false);
//
// 	useEffect(() => setIsDomLoaded(true), []);
//
// 	const elapsedString = useMemo<string>(() => {
// 		if (Date.now() - Date.parse(createdAt.toString()) > MILLISECOND_IN_MIN) return getElapsedTime(createdAt);
// 		return `${seconds} seconds ago`;
// 	}, [createdAt, seconds]);
//
// 	useEffect(() => {
// 		if (mountTimeElapsed > MILLISECOND_IN_MIN) return;
// 		let timeout: number;
// 		if (seconds < SEC_IN_MIN) {
// 			timeout = window.setTimeout(() => setSeconds(prevState => prevState + 1), TIMER_DELAY);
// 		}
// 		return () => {
// 			if (timeout) clearTimeout(timeout);
// 		};
// 	}, [createdAt, seconds, mountTimeElapsed]);
//
// 	if (!isDomLoaded) return null;
//
// 	return <DateContainer component="span">{elapsedString}</DateContainer>;
// };
