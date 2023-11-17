'use client';
import { useDrag } from '@/modules/Desk/hooks/useDrag';
import { Draggable } from '@/modules/Desk/components/Draggable';
import { TaskMini } from '@/modules/Desk/components/TaskMini';
import { DeskContainer, HeroContainer } from '@/modules/Shared/styled';
import { DraggableImage } from '@/modules/Desk/components/DraggableImage';
import { useContext } from 'react';
import { DashboardContext } from '@/modules/Providers/DashboardProvider';
import { useTheme } from 'next-themes';
import { Column, ColumnName, LoadingIndicator } from '@/modules/Desk/styled';
import { LIGHT } from '@/modules/ThemeSwitch/constants';
import { ColumnType } from '@/modules/Shared/types';
import { DeskClientProps } from '@/modules/Desk/types';

export function Desk({ tasks }: DeskClientProps) {
	const { columnConfigState: columnConfig } = useContext(DashboardContext);
	const { theme } = useTheme();
	const isLight = theme === LIGHT;

	const {
		parameters,
		config,
		draggedDX,
		draggedDY,
		ref,
		draggedId,
		dragStartHandler,
		dragHandler,
		dropHandler,
		isSaved,
		isLoading,
		isConfigUpdated,
	} = useDrag(tasks);

	if (isLoading)
		return (
			<HeroContainer>
				<LoadingIndicator />
			</HeroContainer>
		);

	const renderMapper = (column: ColumnType) => (
		<Column key={column.name} id={column.name}>
			<ColumnName component="span" isLight={isLight}>
				{column.name}
			</ColumnName>
			{config
				.filter(card => card.status === column.name)
				.map(({ title, description, id, assignee: { email, username, imageUrl } }) => {
					const cardId = `${column.name}:${id}`;
					const isDragged = id === draggedId;
					const imageParameters = parameters[draggedId];
					return (
						<Draggable
							key={cardId}
							isSaved={isSaved}
							onDragStart={dragStartHandler(id)}
							onDrag={dragHandler}
							onDrop={dropHandler}
							isDragged={isDragged}
							dX={isDragged ? draggedDX : parameters[id]?.dX}
							dY={isDragged ? draggedDY : parameters[id]?.dY}
							id={cardId}
							isConfigUpdated={isConfigUpdated}
						>
							{isDragged && imageParameters ? (
								<DraggableImage imageParameters={imageParameters} />
							) : (
								<TaskMini
									title={title}
									description={description}
									id={id}
									email={email}
									username={username}
									imageUrl={imageUrl}
								/>
							)}
						</Draggable>
					);
				})}
		</Column>
	);

	return (
		<DeskContainer ref={ref}>
			{tasks.length ? (
				columnConfig.filter(el => el.shown).map(renderMapper)
			) : (
				<HeroContainer>No tasks so far</HeroContainer>
			)}
		</DeskContainer>
	);
}
