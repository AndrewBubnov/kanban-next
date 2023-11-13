'use client';
import { useEffect, useMemo, useState } from 'react';
import { Toast } from '@/components/Toast/Toast';
import { LAUNCH_TOAST, TOAST_ANIMATION_AND_DELAY_TIME, TOAST_GAP, TOAST_HEIGHT } from './constants';
import { filterDeletedNotifications, remapBackup, remapNotifications } from '@/components/Toast/utils';
import { NotificationMap } from './types';
import { deleteNotifications } from '@/actions/deleteNotifications';

export const ToastEmitter = ({ notifications }: { notifications: { text: string; link: string }[] }) => {
	const [backup, setBackup] = useState<NotificationMap>({});
	const [notificationMap, setNotificationMap] = useState<NotificationMap>({});

	const notificationMapLength = useMemo(() => Object.keys(notificationMap).length, [notificationMap]);

	useEffect(() => {
		(async function () {
			if (!notificationMapLength) await deleteNotifications();
		})();
	}, [notificationMapLength]);

	const deleteHandler = (deletedKey: string) => () => {
		setNotificationMap(remapNotifications(deletedKey, backup));
		setBackup(remapBackup(deletedKey));
		setTimeout(() => setNotificationMap(filterDeletedNotifications(deletedKey)), TOAST_ANIMATION_AND_DELAY_TIME);
	};

	useEffect(() => {
		notifications.forEach(({ text, link }, index) => {
			const verticalMoves = Array.from({ length: notifications.length - 1 - index }, (_, arrayIndex) => ({
				move: `translate3d(calc(-100% - 40px), ${-(arrayIndex + 1) * (TOAST_HEIGHT + TOAST_GAP)}px, 0px)`,
				timeout: (index + arrayIndex + 1) * TOAST_ANIMATION_AND_DELAY_TIME,
			}));
			const moves = [{ move: LAUNCH_TOAST, timeout: index * TOAST_ANIMATION_AND_DELAY_TIME }, ...verticalMoves];
			setNotificationMap(prevState => ({
				...prevState,
				[String(index)]: {
					moves,
					link,
					text,
				},
			}));
			setBackup(prevState => ({
				...prevState,
				[String(index)]: {
					moves,
					link,
					text,
				},
			}));
		});
	}, [notifications]);

	return Object.keys(notificationMap).map(el => {
		const { text, moves, link } = notificationMap[el];
		return <Toast key={`${el}${text}`} text={text} link={link} moves={moves} onDelete={deleteHandler(el)} />;
	});
};
