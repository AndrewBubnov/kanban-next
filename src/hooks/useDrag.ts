import { DragEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ColCoords, Parameters, TaskItem } from '@/types';
import { INTERSECTION_RATIO } from '@/constants';
import { ascent } from '@/utils/ascent';
import { recalculatePositions } from '@/utils/recalculatePositions';
import { getInitParameters } from '@/utils/getInitParameters';
import { updateConfigInsert } from '@/utils/updateConfigInsert';
import { updateConfigAdd } from '@/utils/updateConfigAdd';
import { updateAllTasks } from '@/actions/updateAllTasks';
import { updateIndices } from '@/utils/updateIndices';
import { applyHoveredColumn } from '@/utils/applyHoveredColumn';

export const useDrag = (tasks: TaskItem[]) => {
	const [colCoords, setColCoords] = useState<ColCoords>({} as ColCoords);
	const [leftSiteStatus, setLeftSiteStatus] = useState<string | null>(null);
	const [leftSiteTop, setLeftSiteTop] = useState<number>(0);
	const [hoveredColumn, setHoveredColumn] = useState<string | undefined>();
	const [hoveredId, setHoveredId] = useState<string>('');
	const [parameters, setParameters] = useState<Parameters>({});
	const [draggedDX, setDraggedDX] = useState<number>(0);
	const [draggedDY, setDraggedDY] = useState<number>(0);
	const [draggedId, setDraggedId] = useState<string>('');

	const isConfigUpdated = useRef<boolean>(false);
	const offsetX = useRef(0);
	const offsetY = useRef(0);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const positionKeys = Object.keys(parameters);
		if (!positionKeys.length) return;
		if (!draggedDX || !draggedDY || !draggedId) return;

		const hoveredCol = Object.keys(colCoords).find(name => {
			const distanceX = colCoords[name]?.left - draggedDX - parameters[draggedId].left;
			return Math.abs(distanceX) < colCoords[name]?.width * INTERSECTION_RATIO;
		});

		const foundHoveredTask = positionKeys
			.filter(el => parameters[el].status === hoveredCol && el !== draggedId)
			.find(el => {
				const draggedPosition = parameters[draggedId].top + draggedDY;
				const keyPosition = parameters[el].top + parameters[el].dY;
				return Math.abs(draggedPosition - keyPosition) < parameters[el].height * INTERSECTION_RATIO;
			});
		setHoveredId(foundHoveredTask ? foundHoveredTask : '');
		if (hoveredCol && hoveredCol !== parameters[draggedId].status) {
			setLeftSiteStatus(parameters[draggedId].status);
			setLeftSiteTop(parameters[draggedId].top + parameters[draggedId].dY);
		}
		if (hoveredCol) setHoveredColumn(hoveredCol);
	}, [colCoords, draggedDX, draggedDY, draggedId, parameters]);

	useEffect(() => setParameters(ascent(leftSiteStatus, leftSiteTop)), [leftSiteTop, leftSiteStatus]);

	useEffect(() => {
		if (!draggedId || !hoveredId) return;
		setParameters(recalculatePositions({ draggedId, hoveredId }));
	}, [draggedId, hoveredId]);

	useEffect(() => {
		if (hoveredColumn) setParameters(applyHoveredColumn(draggedId, hoveredColumn));
	}, [draggedId, hoveredColumn]);

	const resetState = useCallback(() => {
		isConfigUpdated.current = true;
		setParameters({});
		setDraggedId('');
		setHoveredId('');
		setDraggedDX(0);
		setDraggedDY(0);
		setLeftSiteStatus(null);
		setLeftSiteTop(0);
		setHoveredColumn(undefined);
		offsetX.current = 0;
		offsetY.current = 0;
	}, []);

	useLayoutEffect(() => {
		(async () => {
			if (!ref.current) return;
			const { cardPositions, columnDOMRects } = await getInitParameters(ref.current);
			setParameters(cardPositions);
			setColCoords(columnDOMRects);
		})();
		return resetState;
	}, [resetState, tasks]);

	const dragStartHandler = (id: string) => async (event: DragEvent<HTMLDivElement>) => {
		if (!parameters[id]) return;
		event.dataTransfer.setDragImage(new Image(0, 0), 0, 0);
		setDraggedId(id);
		offsetX.current = event.clientX - parameters[id].left;
		offsetY.current = event.clientY - parameters[id].top;
	};

	const dragHandler = useCallback(
		(evt: DragEvent) => {
			if (!parameters[draggedId]) return;
			isConfigUpdated.current = false;
			setDraggedDX(evt.clientX - parameters[draggedId].left - offsetX.current);
			setDraggedDY(evt.clientY - parameters[draggedId].top - offsetY.current);
		},
		[draggedId, parameters]
	);

	const dropHandler = useCallback(async () => {
		const isInserted = Object.values(parameters).filter(el => el.status === hoveredColumn).length > 1;
		const newConfig = isInserted
			? updateConfigInsert(tasks, parameters)
			: updateConfigAdd(tasks, draggedId, hoveredColumn);
		await updateAllTasks(updateIndices(newConfig, parameters));
	}, [tasks, draggedId, hoveredColumn, parameters]);

	return {
		parameters: parameters,
		config: tasks,
		draggedDX,
		draggedDY,
		ref,
		draggedId,
		dragStartHandler,
		dragHandler,
		dropHandler,
		isConfigUpdated: isConfigUpdated.current,
	};
};
