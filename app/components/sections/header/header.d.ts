interface PositionIndex {
  x: number;
  y: number;
}

type PositionKeys = 'top' | 'right' | 'bottom' | 'left';

type PositionStyle = {
  [key in PositionKeys]: number;
};
