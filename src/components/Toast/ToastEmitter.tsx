'use client';
import { useEffect, useState } from 'react';
import { Toast } from '@/components/Toast/Toast';
import { TOAST_ANIMATION_AND_DELAY_TIME } from './constants';
import { deleteNotification } from '@/actions/deleteNotification';
import {
	createNotificationMap,
	filterDeletedNotifications,
	remapBackup,
	remapNotifications,
} from '@/components/Toast/utils';
import { NotificationMap } from './types';

export const ToastEmitter = ({ notifications }: { notifications: { text: string; link: string }[] }) => {
	const [backup, setBackup] = useState<NotificationMap>({});
	const [notificationMap, setNotificationMap] = useState<NotificationMap>({});

	const deleteHandler = (deletedKey: string) => async () => {
		setNotificationMap(remapNotifications(deletedKey, backup));
		setBackup(remapBackup(deletedKey));
		await deleteNotification(+deletedKey);
		setTimeout(() => setNotificationMap(filterDeletedNotifications(deletedKey)), TOAST_ANIMATION_AND_DELAY_TIME);
	};

	useEffect(() => {
		setNotificationMap(prevState => {
			const { updated, backUpUpdated } = createNotificationMap(prevState, notifications);
			setBackup(backUpUpdated);
			return updated;
		});
	}, [notifications]);

	return Object.keys(notificationMap).map(el => {
		const { text, moves, link } = notificationMap[el];
		return <Toast key={`${el}${text}`} text={text} link={link} moves={moves} onDelete={deleteHandler(el)} />;
	});
};
