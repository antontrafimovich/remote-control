import { Coord, Figure } from "./model";

const isCompleteOctet = (figure: Figure) => {
  const lastCoord = figure.at(-1);

  return lastCoord.x > lastCoord.y;
};

const completeOctetToQuadrant = (octet: Figure): Figure => {
  const result = octet.slice(0, octet.length - 1);

  for (let i = octet.length - 1; i >= 0; i--) {
    const coord = octet[i];

    if (coord.x >= coord.y) {
      continue;
    }

    result.push({ x: coord.y, y: coord.x });
  }

  return result;
};

const getOctetFromTopCoord = (top: Coord, radius: number): Figure => {
  const figure: Figure = [top];

  let p = 1 - radius;

  do {
    const lastCoord = figure.at(-1);

    if (p >= 0) {
      figure.push({ x: lastCoord.x + 1, y: lastCoord.y - 1 });
      p = p + 2 * (lastCoord.x - lastCoord.y) + 5;
    } else {
      figure.push({ x: lastCoord.x + 1, y: lastCoord.y });
      p = p + 2 * lastCoord.x + 3;
    }
  } while (!isCompleteOctet(figure));

  return figure;
};

const getFourthQuadrantFromFirst = (firstQuadrant: Figure): Figure => {
  return [...firstQuadrant]
    .reverse()
    .slice(1)
    .map((coord) => {
      return {
        x: coord.x,
        y: -coord.y,
      };
    });
};

const getThirdQuadrantFromFirst = (firstQuadrant: Figure): Figure => {
  return firstQuadrant.slice(1).map((coord) => {
    return {
      x: -coord.x,
      y: -coord.y,
    };
  });
};

const getSecondQuadrantFromFourth = (fourthQuadrant: Figure): Figure => {
  return fourthQuadrant.map((coord) => {
    return {
      x: -coord.x,
      y: -coord.y,
    };
  });
};

export const draw = ({
  top,
  radius,
}: {
  top: Coord;
  radius: number;
}): Figure => {
  const octet = getOctetFromTopCoord(top, radius);
  const firstQuadrant = completeOctetToQuadrant(octet);
  const fourthQuadrant = getFourthQuadrantFromFirst(firstQuadrant);
  const thirdQuadrant = getThirdQuadrantFromFirst(firstQuadrant);
  const secondQuadrant = getSecondQuadrantFromFourth(fourthQuadrant);

  return [
    ...firstQuadrant,
    ...fourthQuadrant,
    ...thirdQuadrant,
    ...secondQuadrant,
  ];
};
