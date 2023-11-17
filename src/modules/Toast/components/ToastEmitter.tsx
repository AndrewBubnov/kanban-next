'use client';
import { useEffect, useState } from 'react';
import { deleteNotification } from '@/modules/Toast/actions/deleteNotification';
import { createNotificationMap, filterDeletedNotifications, remapNotifications } from '@/modules/Toast/utils';
import { Toast } from '@/modules/Toast/components/Toast';
import { TOAST_ANIMATION_AND_DELAY_TIME } from '../constants';
import { NotificationMap } from '../types';

export const ToastEmitter = ({ notifications }: { notifications: { text: string; link: string }[] }) => {
	const [notificationMap, setNotificationMap] = useState<NotificationMap>({});

	const deleteHandler = (deletedKey: string) => async () => {
		setNotificationMap(remapNotifications(deletedKey));
		await deleteNotification(+deletedKey);
		setTimeout(() => setNotificationMap(filterDeletedNotifications(deletedKey)), TOAST_ANIMATION_AND_DELAY_TIME);
	};

	useEffect(() => setNotificationMap(createNotificationMap(notifications)), [notifications]);

	return Object.keys(notificationMap).map(el => {
		const { text, moves, link } = notificationMap[el];
		return <Toast key={`${el}${text}`} text={text} link={link} moves={moves} onDelete={deleteHandler(el)} />;
	});
};
