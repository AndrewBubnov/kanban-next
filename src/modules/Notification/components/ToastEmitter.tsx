'use client';
import { useEffect, useMemo, useState } from 'react';
import { deleteNotification } from '@/modules/Notification/actions/deleteNotification';
import { createTimerState, onDeleteNotification } from '@/modules/Notification/utils';
import { Toast } from '@/modules/Notification/components/Toast';
import { TOAST_ANIMATION_AND_DELAY_TIME } from '../constants';
import { MoveStateItem, ToastEmitterProps } from '../types';

export const ToastEmitter = ({ notifications }: ToastEmitterProps) => {
	const [moveState, setMoveState] = useState<MoveStateItem[]>([]);
	const [mountNumber, setMountNumber] = useState<number>(0);

	useEffect(() => () => setMountNumber(prevState => prevState + 1), []);

	const timerState = useMemo(() => createTimerState(notifications), [notifications]);

	useEffect(() => {
		if (process.env.NODE_ENV === 'development' && !mountNumber) return;
		timerState.forEach((el, index) => setTimeout(() => setMoveState(el), TOAST_ANIMATION_AND_DELAY_TIME * index));
	}, [mountNumber, timerState]);

	const deleteHandler = (deletedKey: string) => async () => {
		setMoveState(onDeleteNotification(deletedKey));
		await deleteNotification(deletedKey);
	};

	return moveState.map(({ id, move, link, text, row }) => (
		<Toast key={id} text={text} link={link} move={move} row={row} onDelete={deleteHandler(id)} />
	));
};
