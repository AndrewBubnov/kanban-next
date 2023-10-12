import { ColCoords, Status, Positions } from "types.ts";

export const getInitPositions = (ref: HTMLDivElement) => {
  const columnDOMRects = {} as ColCoords;

  const cardPositions = [...ref.children]
    .map((columnElement) => {
      columnDOMRects[columnElement.id as Status] =
        columnElement.getBoundingClientRect();
      return [...columnElement.children].filter((el) => !!el.id);
    })
    .map((el) =>
      el.reduce((acc, card, index) => {
        const [status, cardId] = card.id.split("-");
        const cardElement = card as HTMLDivElement;
        acc[+cardId] = {
          top: cardElement.offsetTop,
          left: cardElement.offsetLeft,
          width: cardElement.clientWidth,
          height: cardElement.clientHeight,
          dX: 0,
          dY: 0,
          index,
          status: status as Status,
        };
        return acc;
      }, {} as Positions),
    )
    .reduce((acc, cur) => {
      acc = { ...acc, ...cur };
      return acc;
    }, {} as Positions);
  return { cardPositions, columnDOMRects };
};
