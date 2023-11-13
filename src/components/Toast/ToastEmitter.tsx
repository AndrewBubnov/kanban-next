'use client';
import { useEffect, useState } from 'react';
import { Toast } from '@/components/Toast/Toast';
import { LAUNCH_TOAST, TOAST_ANIMATION_AND_DELAY_TIME, TOAST_GAP, TOAST_HEIGHT } from './constants';
import { filterDeletedNotifications, remapBackup, remapNotifications } from '@/components/Toast/utils';
import { NotificationMap } from './types';
import { useLatest } from '@/hooks/useLatest';

export const ToastEmitter = ({ notifications }: { notifications: string[] }) => {
	const [backup, setBackup] = useState<NotificationMap>({});
	const [notificationMap, setNotificationMap] = useState<NotificationMap>({});

	const notificationMapRef = useLatest(notificationMap);
	const deleteHandler = (deletedKey: string) => () => {
		setNotificationMap(remapNotifications(deletedKey, backup));
		setBackup(remapBackup(deletedKey));
		setTimeout(() => setNotificationMap(filterDeletedNotifications(deletedKey)), TOAST_ANIMATION_AND_DELAY_TIME);
	};

	useEffect(() => {
		const newNotifications = notifications.filter(
			(el, index) => el !== notificationMapRef.current[String(index)]?.text
		);
		newNotifications.forEach((text, index) => {
			const verticalMoves = Array.from({ length: notifications.length - 1 - index }, (_, arrayIndex) => ({
				move: `translate3d(calc(-100% - 20px), ${-(arrayIndex + 1) * (TOAST_HEIGHT + TOAST_GAP)}px, 0px)`,
				timeout: (index + arrayIndex + 1) * TOAST_ANIMATION_AND_DELAY_TIME,
			}));
			const moves = [{ move: LAUNCH_TOAST, timeout: index * TOAST_ANIMATION_AND_DELAY_TIME }, ...verticalMoves];
			setNotificationMap(prevState => ({
				...prevState,
				[String(index)]: {
					moves,
					text,
				},
			}));
			setBackup(prevState => ({
				...prevState,
				[String(index)]: {
					moves,
					text,
				},
			}));
		});
	}, [notificationMapRef, notifications]);

	return Object.keys(notificationMap).map(el => {
		const { text, moves } = notificationMap[el];
		return <Toast key={`${el}${text}`} text={text} moves={moves} onDelete={deleteHandler(el)} />;
	});
};
