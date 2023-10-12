import { Positions, RecalculateProps } from "../types.ts";

export const recalculatePositions =
  ({ draggedId, hoveredId }: RecalculateProps) =>
  (prevState: Positions) => {
    const {
      status: draggedColumn,
      index: draggedIndex,
      top: draggedTop,
      left: draggedLeft,
      dX: draggedDX,
      dY: draggedDY,
    } = prevState[draggedId];
    const {
      status: hoveredColumn,
      index: hoveredIndex,
      top: hoveredTop,
      left: hoveredLeft,
      dY: hoveredDY,
    } = prevState[hoveredId];
    if (draggedColumn === hoveredColumn) {
      return {
        ...prevState,
        [hoveredId]: {
          ...prevState[hoveredId],
          dY: draggedTop - hoveredTop + draggedDY,
          index: draggedIndex,
        },
        [draggedId]: {
          ...prevState[draggedId],
          dY: hoveredTop - draggedTop + hoveredDY,
          index: hoveredIndex,
        },
      };
    }

    return Object.keys(prevState).reduce((acc, el) => {
      const id = +el;
      if (id === draggedId) {
        acc[id] = {
          ...prevState[id],
          status: hoveredColumn,
          dX: draggedLeft - hoveredLeft + draggedDX,
          index: hoveredIndex,
        };
        return acc;
      }
      if (
        prevState[id].status === draggedColumn &&
        prevState[id].index > draggedIndex
      ) {
        acc[id] = {
          ...prevState[id],
          dY: prevState[id].dY - 166,
          index: prevState[id].index - 1,
        };
        return acc;
      }
      if (
        prevState[id].status === hoveredColumn &&
        prevState[id].index >= hoveredIndex
      ) {
        acc[id] = {
          ...prevState[id],
          dY: prevState[id].dY + 166,
          index: prevState[id].index + 1,
        };
        return acc;
      }
      acc[id] = prevState[id];
      return acc;
    }, {} as Positions);
  };
