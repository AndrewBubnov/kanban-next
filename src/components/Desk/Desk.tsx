'use client';
import { DragEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Task } from '@/components/Task/Task';
import styles from './Desk.module.css';
import { Draggable } from '@/components/Draggable/Draggable';
import { ColumnNameDTO, INTERSECTION_RATIO } from '../../../constants';
import { ColCoords, DeskProps, Positions, Status, TaskItem } from '../../../types';
import { recalculatePositions } from '@/utils/recalculatePositions';
import { getInitPositions } from '@/utils/getInitPositions';
import { updateConfigInsert } from '@/utils/updateConfigInsert';
import { updateConfigAdd } from '@/utils/updateConfigAdd';

export function Desk({ tasks, columns }: DeskProps) {
	const [config, setConfig] = useState<TaskItem[]>(tasks);
	const [draggedId, setDraggedId] = useState<number>(0);
	const [hoveredId, setHoveredId] = useState<number>(0);
	const [draggedDX, setDraggedDX] = useState<number>(0);
	const [draggedDY, setDraggedDY] = useState<number>(0);
	const [positions, setPositions] = useState<Positions>({});
	const [colCoords, setColCoords] = useState<ColCoords>({} as ColCoords);
	const [hoveredColumn, setHoveredColumn] = useState<Status | undefined>();

	const configUpdated = useRef<boolean>(false);
	const offsetX = useRef(0);
	const offsetY = useRef(0);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => setConfig(tasks), [tasks]);

	useEffect(() => {
		if (!draggedId || !hoveredId) return;
		setPositions(recalculatePositions({ draggedId, hoveredId }));
	}, [draggedId, hoveredId]);

	useEffect(() => {
		const positionKeys = Object.keys(positions);
		if (!positionKeys.length) return;
		if (!draggedDX || !draggedDY || !draggedId) return;

		const hoveredCol = (Object.keys(colCoords) as Status[]).find(name => {
			const distanceX = colCoords[name]?.left - draggedDX - positions[draggedId].left;
			return Math.abs(distanceX) < colCoords[name]?.width * INTERSECTION_RATIO;
		});

		const foundHoveredTask = positionKeys
			.filter(el => positions[+el].status === hoveredCol && +el !== draggedId)
			.find(el => {
				const key = +el;
				const draggedPosition = positions[draggedId].top + draggedDY;
				const keyPosition = positions[key].top + positions[key].dY;
				return Math.abs(draggedPosition - keyPosition) < positions[+el].height * INTERSECTION_RATIO;
			});

		setHoveredId(foundHoveredTask ? +foundHoveredTask : 0);

		setHoveredColumn(hoveredCol);
	}, [colCoords, draggedDX, draggedDY, draggedId, positions]);

	useLayoutEffect(() => {
		if (!ref.current) return;
		const { cardPositions, columnDOMRects } = getInitPositions(ref.current);
		setPositions(cardPositions);
		setColCoords(columnDOMRects);
		return () => {
			configUpdated.current = true;
			setPositions({});
			setDraggedDX(0);
			setDraggedDY(0);
			offsetX.current = 0;
			offsetY.current = 0;
		};
	}, [config]);

	const dragStartHandler = (id: number) => (event: DragEvent<HTMLDivElement>) => {
		if (!positions) return;
		event.dataTransfer.setDragImage(new Image(), 0, 0);
		setDraggedId(id);
		offsetX.current = event.clientX - positions[id].left;
		offsetY.current = event.clientY - positions[id].top;
	};

	const dragHandler = (evt: DragEvent) => {
		if (!positions) return;
		configUpdated.current = false;
		setDraggedDX(evt.clientX - positions[draggedId].left - offsetX.current);
		setDraggedDY(evt.clientY - positions[draggedId].top - offsetY.current);
	};

	const dropHandler = () => {
		const isInserted = !!Object.values(positions)
			.filter(el => el.status === hoveredColumn)
			.find(el => el.index > positions[draggedId].index);
		setConfig(prevState =>
			isInserted ? updateConfigInsert(prevState, positions) : updateConfigAdd(prevState, draggedId, hoveredColumn)
		);
	};

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
							configUpdated={configUpdated.current}
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
