'use client';
import { useCallback, useEffect, useState } from 'react';
import { ErrorToast } from '@/modules/Notification/components/ErrorToast';

export const emitErrorNotification = (message: string) =>
	window.dispatchEvent(new CustomEvent('customError', { bubbles: true, detail: { message } }));

export const ErrorNotificationEmitter = () => {
	const [isShown, setIsShown] = useState<boolean>(false);
	const [isActive, setIsActive] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');

	useEffect(() => {
		const listener = (evt: CustomEvent) => {
			setIsActive(true);
			setIsShown(true);
			setMessage(evt.detail.message);
		};
		window.addEventListener('customError', listener);
		return () => window.removeEventListener('customError', listener);
	}, []);

	const deleteHandler = useCallback(() => setIsShown(false), []);

	const transitionEndHandler = () => {
		if (!isShown) {
			setIsActive(false);
			setMessage('');
		}
	};

	return isActive ? (
		<ErrorToast
			isShown={isShown}
			onDelete={deleteHandler}
			onTransitionEnd={transitionEndHandler}
			message={message}
		/>
	) : null;
};
