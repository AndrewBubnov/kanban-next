'use client';
import { useEffect, useState } from 'react';
import { deleteNotification } from '@/modules/Notification/actions/deleteNotification';
import { createTimerState, onDeleteNotification } from '@/modules/Notification/utils';
import { Toast } from '@/modules/Notification/components/Toast';
import { TOAST_ANIMATION_AND_DELAY_TIME } from '../constants';
import { MoveStateItem, ToastEmitterProps } from '../types';

export const ToastEmitter = ({ notifications }: ToastEmitterProps) => {
	const [timerState, setTimerState] = useState<MoveStateItem[][]>([]);
	const [moveState, setMoveState] = useState<MoveStateItem[]>([]);

	useEffect(() => {
		setTimerState(prevState => createTimerState(prevState, notifications));
	}, [notifications]);

	useEffect(() => {
		timerState.forEach((el, index) => setTimeout(() => setMoveState(el), TOAST_ANIMATION_AND_DELAY_TIME * index));
	}, [timerState]);

	const deleteHandler = (deletedKey: string) => async () => {
		setMoveState(onDeleteNotification(deletedKey));
		await deleteNotification(deletedKey);
	};

	return moveState.map(({ id, move, link, text, row }) => (
		<Toast key={id} text={text} link={link} move={move} row={row} onDelete={deleteHandler(id)} />
	));
};
