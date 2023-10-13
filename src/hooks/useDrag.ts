import { DragEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ColCoords, Positions, Status, TaskItem } from '@/types';
import { INTERSECTION_RATIO } from '@/constants';
import { ascent } from '@/utils/ascent';
import { recalculatePositions } from '@/utils/recalculatePositions';
import { getInitPositions } from '@/utils/getInitPositions';
import { updateConfigInsert } from '@/utils/updateConfigInsert';
import { updateConfigAdd } from '@/utils/updateConfigAdd';

export const useDrag = (tasks: TaskItem[]) => {
	const [config, setConfig] = useState<TaskItem[]>(tasks);
	const [colCoords, setColCoords] = useState<ColCoords>({} as ColCoords);
	const [leftSiteStatus, setLeftSiteStatus] = useState<Status | null>(null);
	const [leftSiteTop, setLeftSiteTop] = useState<number>(0);
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
			setLeftSiteTop(positions[draggedId].top + positions[draggedId].dY);
		}
		if (hoveredCol) setHoveredColumn(hoveredCol);
	}, [colCoords, draggedDX, draggedDY, draggedId, positions]);

	useEffect(() => {
		setPositions(prevState => ascent(prevState, leftSiteStatus, leftSiteTop));
	}, [leftSiteTop, leftSiteStatus]);

	useEffect(() => {
		if (!draggedId || !hoveredId) return;
		setPositions(recalculatePositions({ draggedId, hoveredId }));
	}, [draggedId, hoveredId]);

	useEffect(() => {
		if (hoveredColumn) {
			setPositions(prevState => ({
				...prevState,
				[draggedId]: { ...prevState[draggedId], status: hoveredColumn },
			}));
		}
	}, [draggedId, hoveredColumn]);

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
			setLeftSiteTop(0);
			setHoveredColumn(undefined);
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
		const isInserted = Object.values(positions).filter(el => el.status === hoveredColumn).length > 1;
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
