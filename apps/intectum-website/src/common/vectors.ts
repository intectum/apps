import { Vec2 } from './types';

export const length = (vec: Vec2) => Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));

export const angle = (vec: Vec2) => Math.atan2(vec.y, vec.x);

export const add = (lhs: Vec2, rhs: Vec2) =>
{
  lhs.x += rhs.x;
  lhs.y += rhs.y;
};

export const subtract = (lhs: Vec2, rhs: Vec2) =>
{
  lhs.x -= rhs.x;
  lhs.y -= rhs.y;
};

export const subtractTo = (lhs: Vec2, rhs: Vec2) => ({ x: lhs.x - rhs.x, y: lhs.y - rhs.y });

export const multiplyScalar = (lhs: Vec2, rhs: number) =>
{
  lhs.x *= rhs;
  lhs.y *= rhs;
};

export const multiplyScalarTo = (lhs: Vec2, rhs: number) => ({ x: lhs.x * rhs, y: lhs.y * rhs });

export const normalize = (vec: Vec2) =>
{
  const divisor = length(vec);
  vec.x /= divisor;
  vec.y /= divisor;
};

export const normalizeTo = (vec: Vec2): Vec2 =>
{
  const divisor = length(vec);
  return { x: vec.x / divisor, y: vec.y / divisor };
};

export const rotate = (vec: Vec2, angle: number) =>
{
  const newX = vec.x * Math.cos(angle) - vec.y * Math.sin(angle);
  const newY = vec.x * Math.sin(angle) + vec.y * Math.cos(angle);

  vec.x = newX;
  vec.y = newY;
};
