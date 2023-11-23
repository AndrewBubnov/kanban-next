'use client';
import { useEffect, useState } from 'react';
import { Toast } from '@/modules/Notification/components/Toast';
import { deleteNotification } from '@/modules/Notification/actions/deleteNotification';
import { createMoveState, onDeleteNotification } from '@/modules/Notification/utils';
import { MoveStateItem, ToastEmitterProps } from '../types';

export const ToastEmitter = ({ notifications }: ToastEmitterProps) => {
	const [moveState, setMoveState] = useState<MoveStateItem[]>([]);

	useEffect(() => {
		setMoveState(prevState => createMoveState(prevState, notifications));
	}, [notifications]);

	const deleteHandler = (deletedKey: string) => async () => {
		setMoveState(onDeleteNotification(deletedKey));
		await deleteNotification(deletedKey);
	};

	return moveState.map(el => (
		<Toast key={el.id} moves={el.moves} text={el.text} link={el.link} onDelete={deleteHandler(el.id)} />
	));
};
