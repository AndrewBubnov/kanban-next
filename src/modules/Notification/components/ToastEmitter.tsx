'use client';
import { useEffect, useState } from 'react';
import { TOAST_ANIMATION_AND_DELAY_TIME } from '../constants';
import { NotificationMap } from '../types';
import { createNotificationMap, filterDeletedNotifications, remapNotifications } from '@/modules/Notification/utils';
import { deleteNotification } from '@/modules/Notification/actions/deleteNotification';
import { Toast } from '@/modules/Notification/components/Toast';

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
