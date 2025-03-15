import { Boid, Vec2 } from './types';
import {
  add,
  angle,
  length,
  multiplyScalar,
  multiplyScalarTo,
  normalize,
  normalizeTo,
  rotate,
  subtract,
  subtractTo
} from './vectors';

type BoundingBox =
{
  min: Vec2;
  max: Vec2;
};

type Options =
{
  cruiseSpeed: number;
  sprintSpeed: number;
  sprintDuration: number;
  sprintRegenDuration: number;
  turnSpeed: number;
  acceleration: number;
  deceleration: number;
  cohesionRange?: number;
  cohesionStrength?: number;
  separationRange?: number;
  separationStrength?: number;
  alignmentRange?: number;
  alignmentStrength?: number;
  bounds?: BoundingBox;
  boundsStrength?: number;
  seekTargets?: Vec2[];
  seekRange?: number;
  seekStrength?: number;
  avoidTargets?: Vec2[];
  avoidRange?: number;
  avoidStrength?: number;
};

// Based on https://vergenet.net/~conrad/boids/pseudocode.html
export const updateBoids = (time: number, deltaTime: number, boids: Boid[], options: Options) =>
{
  const velocities: Vec2[] = boids.map(boid => ({ ...boid.velocity }));

  for (let index = 0; index < boids.length; index++)
  {
    const boid = boids[index];
    const velocity = velocities[index];
    const previouslySprinting = boid.sprinting;
    boid.sprinting = false;

    if (options.cohesionRange && options.cohesionStrength)
    {
      add(velocity, cohesion(boids, boid, options.cohesionRange, options.cohesionStrength));
    }

    if (options.separationRange && options.separationStrength)
    {
      add(velocity, separation(boids, boid, options.separationRange, options.separationStrength));
    }

    if (options.alignmentRange && options.alignmentStrength)
    {
      add(velocity, alignment(boids, boid, options.alignmentRange, options.alignmentStrength));
    }

    if (options.bounds)
    {
      add(velocity, bound(boids, boid, options.bounds, options.boundsStrength ?? 1));
    }

    if (options.seekTargets)
    {
      const seekVelocity = seek(boids, boid, options.seekTargets, options.seekRange ?? 100, options.seekStrength ?? 1);
      add(velocity, seekVelocity);

      if (length(seekVelocity) > options.cruiseSpeed && boid.sprintDuration > 0)
      {
        boid.sprinting = true;
      }
    }

    if (options.avoidTargets)
    {
      const avoidVelocity = avoid(boids, boid, options.avoidTargets, options.avoidRange ?? 100, options.avoidStrength ?? 1);
      add(velocity, avoidVelocity);

      if (length(avoidVelocity) > options.cruiseSpeed && boid.sprintDuration > 0)
      {
        boid.sprinting = true;
      }
    }

    const desiredSpeed = length(velocity);
    const maxSpeed = boid.sprinting ? options.sprintSpeed : options.cruiseSpeed;
    if (desiredSpeed > maxSpeed)
    {
      normalize(velocity);
      multiplyScalar(velocity, maxSpeed);
    }

    if (boid.sprinting)
    {
      boid.sprintDuration -= deltaTime;
    }

    if (previouslySprinting && !boid.sprinting)
    {
      boid.sprintCompletedTime = time;
    }

    if (!boid.sprinting && time > boid.sprintCompletedTime + options.sprintRegenDuration)
    {
      boid.sprintDuration = options.sprintDuration;
    }

    const desiredTurnAngle = angle(velocity) - angle(boid.velocity);
    const maxTurnAngle = (desiredTurnAngle > 0 ? 1 : -1) * options.turnSpeed * deltaTime;
    if (Math.abs(desiredTurnAngle) > Math.abs(maxTurnAngle))
    {
      rotate(velocity, -desiredTurnAngle + maxTurnAngle);
    }

    const previousSpeed = length(boid.velocity);
    const desiredAcceleration = length(velocity) - previousSpeed;
    const maxAcceleration = options.acceleration * deltaTime;
    const minAcceleration = -options.deceleration * deltaTime;
    if (desiredAcceleration > maxAcceleration)
    {
      normalize(velocity);
      multiplyScalar(velocity, previousSpeed + maxAcceleration);
    }
    if (desiredAcceleration < minAcceleration)
    {
      normalize(velocity);
      multiplyScalar(velocity, previousSpeed + minAcceleration);
    }
  }

  for (let index = 0; index < boids.length; index++)
  {
    const boid = boids[index];

    boid.velocity = velocities[index];
    add(boid.position, multiplyScalarTo(boid.velocity, deltaTime));
  }
};

const cohesion = (boids: Boid[], boid: Boid, range: number, strength: number) =>
{
  const pull: Vec2 = { x: 0, y: 0 };

  let boidsInRange = 0;
  for (const otherBoid of boids)
  {
    const toOtherBoid = subtractTo(otherBoid.position, boid.position);
    if (otherBoid === boid || length(toOtherBoid) > range)
    {
      continue;
    }

    boidsInRange++;

    add(pull, multiplyScalarTo(normalizeTo(toOtherBoid), 1 - length(toOtherBoid) / range));
  }

  if (boidsInRange)
  {
    multiplyScalar(pull, 1 / boidsInRange);
  }

  multiplyScalar(pull, strength);

  return pull;
};

const separation = (boids: Boid[], boid: Boid, range: number, strength: number) =>
{
  const push: Vec2 = { x: 0, y: 0 };

  let boidsInRange = 0;
  for (const otherBoid of boids)
  {
    const toOtherBoid = subtractTo(otherBoid.position, boid.position);
    if (otherBoid === boid || length(toOtherBoid) > range)
    {
      continue;
    }

    boidsInRange++;

    subtract(push, multiplyScalarTo(normalizeTo(toOtherBoid), 1 - length(toOtherBoid) / range));
  }

  if (boidsInRange)
  {
    multiplyScalar(push, 1 / boidsInRange);
  }

  multiplyScalar(push, strength);

  return push;
};

const alignment = (boids: Boid[], boid: Boid, range: number, strength: number) =>
{
  const desiredVelocity: Vec2 = { x: 0, y: 0 };

  let boidsInRange = 0;
  for (const otherBoid of boids)
  {
    const toOtherBoid = subtractTo(otherBoid.position, boid.position);
    if (otherBoid === boid || length(toOtherBoid) > range)
    {
      continue;
    }

    boidsInRange++;

    add(desiredVelocity, multiplyScalarTo(normalizeTo(otherBoid.velocity), 1 - length(toOtherBoid) / range));
  }

  if (boidsInRange)
  {
    multiplyScalar(desiredVelocity, 1 / boidsInRange);
  }

  multiplyScalar(desiredVelocity, strength);

  return desiredVelocity;
};

const bound = (boids: Boid[], boid: Boid, bounds: BoundingBox, strength: number) =>
{
  const inclusion: Vec2 = { x: 0, y: 0 };

  if (boid.position.x < bounds.min.x)
  {
    inclusion.x = bounds.min.x - boid.position.x;
  }
  else if (boid.position.x > bounds.max.x)
  {
    inclusion.x = bounds.max.x - boid.position.x;
  }

  if (boid.position.y < bounds.min.y)
  {
    inclusion.y = bounds.min.y - boid.position.y;
  }
  else if (boid.position.y > bounds.max.y)
  {
    inclusion.y = bounds.max.y - boid.position.y;
  }

  multiplyScalar(inclusion, strength);

  return inclusion;
};

const seek = (boids: Boid[], boid: Boid, targets: Vec2[], range: number, strength: number) =>
{
  const pull: Vec2 = { x: 0, y: 0 };

  for (const target of targets)
  {
    const toTarget = subtractTo(target, boid.position);
    if (length(toTarget) > range)
    {
      continue;
    }

    add(pull, multiplyScalarTo(normalizeTo(toTarget), 1 - length(toTarget) / range));
  }

  multiplyScalar(pull, strength);

  return pull;
};

const avoid = (boids: Boid[], boid: Boid, targets: Vec2[], range: number, strength: number) =>
{
  const pull: Vec2 = { x: 0, y: 0 };

  for (const target of targets)
  {
    const toTarget = subtractTo(target, boid.position);
    if (length(toTarget) > range)
    {
      continue;
    }

    subtract(pull, multiplyScalarTo(normalizeTo(toTarget), 1 - length(toTarget) / range));
  }

  multiplyScalar(pull, strength);

  return pull;
};
