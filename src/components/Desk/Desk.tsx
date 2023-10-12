'use client';
import { useDrag } from '@/hooks/useDrag';
import { Draggable } from '@/components/Draggable/Draggable';
import { Task } from '@/components/Task/Task';
import { ColumnNameDTO } from '../../../constants';
import { DeskProps, Status } from '../../../types';
import styles from './Desk.module.css';

export function Desk({ tasks, columns }: DeskProps) {
	const {
		positions,
		config,
		draggedDX,
		draggedDY,
		ref,
		draggedId,
		dragStartHandler,
		dragHandler,
		dropHandler,
		configUpdated,
	} = useDrag(tasks);

	const renderMapper = (status: Status) => (
		<div className={styles.column} key={status} id={status}>
			<span className={styles.columnName}>{ColumnNameDTO[status]}</span>
			{config
				.filter(card => card.status === status)
				.map(({ title, body, id }) => {
					const cardId = `${status}-${id}`;
					const isDragged = id === draggedId;
					return (
						<Draggable
							key={cardId}
							onDragStart={dragStartHandler(id)}
							onDrag={dragHandler}
							onDrop={dropHandler}
							isDragged={isDragged}
							dX={isDragged ? draggedDX : positions[id]?.dX}
							dY={isDragged ? draggedDY : positions[id]?.dY}
							id={cardId}
							configUpdated={configUpdated}
						>
							<Task title={title} body={body} />
						</Draggable>
					);
				})}
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.columnWrapper} ref={ref}>
				{columns.map(renderMapper)}
			</div>
		</div>
	);
}
