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