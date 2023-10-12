import { DragEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ascent } from '@/utils/ascent';
import { recalculatePositions } from '@/utils/recalculatePositions';
import { getInitPositions } from '@/utils/getInitPositions';
import { updateConfigInsert } from '@/utils/updateConfigInsert';
import { updateConfigAdd } from '@/utils/updateConfigAdd';
import { INTERSECTION_RATIO } from '../../constants';
import { ColCoords, Positions, Status, TaskItem } from '../../types';

export const useDrag = (tasks: TaskItem[]) => {
	const [config, setConfig] = useState<TaskItem[]>(tasks);
	const [colCoords, setColCoords] = useState<ColCoords>({} as ColCoords);
	const [leftSiteStatus, setLeftSiteStatus] = useState<Status | null>(null);
	const [leftSiteIndex, setLeftSiteIndex] = useState<number>(0);
	const [hoveredColumn, setHoveredColumn] = useState<Status | undefined>();
	const [hoveredId, setHoveredId] = useState<number>(0);
	const [positions, setPositions] = useState<Positions>({});
	const [draggedDX, setDraggedDX] = useState<number>(0);
	const [draggedDY, setDraggedDY] = useState<number>(0);
	const [draggedId, setDraggedId] = useState<number>(0);

	const configUpdated = useRef<boolean>(false);
	const offsetX = useRef(0);
	const offsetY = useRef(0);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => setConfig(tasks), [tasks]);

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
		if (hoveredCol && hoveredCol !== positions[draggedId].status) {
			setLeftSiteStatus(positions[draggedId].status);
			setLeftSiteIndex(positions[draggedId].index);
		}
		setHoveredColumn(hoveredCol);
	}, [colCoords, draggedDX, draggedDY, draggedId, positions]);

	useEffect(() => {
		setPositions(prevState => ascent(prevState, leftSiteStatus, leftSiteIndex));
	}, [leftSiteIndex, leftSiteStatus]);

	useEffect(() => {
		if (!draggedId || !hoveredId) return;
		setPositions(recalculatePositions({ draggedId, hoveredId }));
	}, [draggedId, hoveredId]);

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
			setLeftSiteStatus(null);
			setLeftSiteIndex(0);
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

	const dragHandler = useCallback(
		(evt: DragEvent) => {
			if (!positions) return;
			configUpdated.current = false;
			setDraggedDX(evt.clientX - positions[draggedId].left - offsetX.current);
			setDraggedDY(evt.clientY - positions[draggedId].top - offsetY.current);
		},
		[draggedId, positions]
	);

	const dropHandler = useCallback(() => {
		const isInserted = !!Object.values(positions)
			.filter(el => el.status === hoveredColumn)
			.find(el => el.index > positions[draggedId].index);
		setConfig(prevState =>
			isInserted ? updateConfigInsert(prevState, positions) : updateConfigAdd(prevState, draggedId, hoveredColumn)
		);
	}, [draggedId, hoveredColumn, positions]);

	return {
		positions,
		config,
		draggedDX,
		draggedDY,
		ref,
		draggedId,
		dragStartHandler,
		dragHandler,
		dropHandler,
		configUpdated: configUpdated.current,
	};
};
