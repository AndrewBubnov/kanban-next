import { DragEvent, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ColCoords, Parameters, TaskItem } from '@/types';
import { INTERSECTION_RATIO } from '@/constants';
import { ascent } from '@/utils/ascent';
import { recalculatePositions } from '@/utils/recalculatePositions';
import { getInitParameters } from '@/utils/getInitParameters';
import { updateConfig } from '@/utils/updateConfig';
import { updateAllTasks } from '@/actions/updateAllTasks';
import { useLatest } from '@/hooks/useLatest';
import { DashboardContext } from '@/modules/DashboardProvider';

export const useDrag = (tasks: TaskItem[]) => {
	const { isLoading, setIsLoading } = useContext(DashboardContext);
	const [isSaved, setIsSaved] = useState<boolean>(false);
	const [colCoords, setColCoords] = useState<ColCoords>({} as ColCoords);
	const [leftSiteStatus, setLeftSiteStatus] = useState<string | null>(null);
	const [leftSiteTop, setLeftSiteTop] = useState<number>(0);
	const [parameters, setParameters] = useState<Parameters>({});
	const [draggedDX, setDraggedDX] = useState<number>(0);
	const [draggedDY, setDraggedDY] = useState<number>(0);
	const [draggedId, setDraggedId] = useState<string>('');

	const parametersRef = useLatest(parameters);

	const updatedStatus = useRef<string | undefined>();
	const isConfigUpdated = useRef<boolean>(false);
	const offsetX = useRef(0);
	const offsetY = useRef(0);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => setIsLoading(false), [tasks, setIsLoading]);

	useEffect(() => {
		const currentParameters = parametersRef.current;
		const positionKeys = Object.keys(currentParameters);
		if (!positionKeys.length) return;
		if (!draggedDX || !draggedDY || !draggedId) return;

		const draggedParameters = currentParameters[draggedId];
		const hoveredCol = Object.keys(colCoords).find(name => {
			const distanceX = colCoords[name]?.left - draggedDX - draggedParameters.left;
			return Math.abs(distanceX) < colCoords[name]?.width * INTERSECTION_RATIO;
		});

		const hoveredId = positionKeys
			.filter(el => currentParameters[el].status === hoveredCol && el !== draggedId)
			.find(el => {
				const draggedPosition = draggedParameters.top + draggedDY;
				const keyPosition = currentParameters[el].top + currentParameters[el].dY;
				return Math.abs(draggedPosition - keyPosition) < currentParameters[el].height * INTERSECTION_RATIO;
			});
		if (hoveredId) setParameters(recalculatePositions({ draggedId, hoveredId }));
		if (hoveredCol && hoveredCol !== draggedParameters.status) {
			setLeftSiteStatus(draggedParameters.status);
			setLeftSiteTop(draggedParameters.top + draggedParameters.dY);
		}
		if (hoveredCol) updatedStatus.current = hoveredCol;
	}, [colCoords, draggedDX, draggedDY, draggedId, parametersRef]);

	useEffect(() => setParameters(ascent(leftSiteStatus, leftSiteTop)), [leftSiteTop, leftSiteStatus]);

	const resetState = useCallback(() => {
		isConfigUpdated.current = true;
		setParameters({});
		setDraggedId('');
		setDraggedDX(0);
		setDraggedDY(0);
		setLeftSiteStatus(null);
		setLeftSiteTop(0);
		updatedStatus.current = undefined;
		offsetX.current = 0;
		offsetY.current = 0;
	}, []);

	useLayoutEffect(() => {
		(async () => {
			if (!ref.current || !tasks.length) return;
			const { cardPositions, columnDOMRects } = await getInitParameters(ref.current, parametersRef.current);
			setParameters(cardPositions);
			setColCoords(columnDOMRects);
			setIsSaved(false);
		})();
		return resetState;
	}, [parametersRef, resetState, tasks]);

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
		setIsSaved(true);
		await updateAllTasks(updateConfig(tasks, parameters, draggedId, updatedStatus.current));
	}, [tasks, parameters, draggedId, updatedStatus]);

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
		isSaved,
		isLoading,
		isConfigUpdated: isConfigUpdated.current,
	};
};
