import Victor from 'victor';

import { Boid } from './types';

type BoundingBox =
{
  min: Victor;
  max: Victor;
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
  seekTargets?: Victor[];
  seekRange?: number;
  seekStrength?: number;
  avoidTargets?: Victor[];
  avoidRange?: number;
  avoidStrength?: number;
};

// Based on https://vergenet.net/~conrad/boids/pseudocode.html
export const updateBoids = (time: number, deltaTime: number, boids: Boid[], options: Options) =>
{
  const velocities = boids.map(boid => boid.velocity.clone());

  for (let index = 0; index < boids.length; index++)
  {
    const boid = boids[index];
    const velocity = velocities[index];
    const previouslySprinting = boid.sprinting;
    boid.sprinting = false;

    if (options.cohesionRange && options.cohesionStrength)
    {
      velocity.add(cohesion(boids, boid, options.cohesionRange, options.cohesionStrength));
    }

    if (options.separationRange && options.separationStrength)
    {
      velocity.add(separation(boids, boid, options.separationRange, options.separationStrength));
    }

    if (options.alignmentRange && options.alignmentStrength)
    {
      velocity.add(alignment(boids, boid, options.alignmentRange, options.alignmentStrength));
    }

    if (options.bounds)
    {
      velocity.add(bound(boids, boid, options.bounds, options.boundsStrength ?? 1));
    }

    if (options.seekTargets)
    {
      const seekVelocity = seek(boids, boid, options.seekTargets, options.seekRange ?? 100, options.seekStrength ?? 1);
      velocity.add(seekVelocity);

      if (seekVelocity.magnitude() > options.cruiseSpeed && boid.sprintDuration > 0)
      {
        boid.sprinting = true;
      }
    }

    if (options.avoidTargets)
    {
      const avoidVelocity = avoid(boids, boid, options.avoidTargets, options.avoidRange ?? 100, options.avoidStrength ?? 1);
      velocity.add(avoidVelocity);

      if (avoidVelocity.magnitude() > options.cruiseSpeed && boid.sprintDuration > 0)
      {
        boid.sprinting = true;
      }
    }

    const desiredSpeed = velocity.magnitude();
    const maxSpeed = boid.sprinting ? options.sprintSpeed : options.cruiseSpeed;
    if (desiredSpeed > maxSpeed)
    {
      velocity.normalize().multiplyScalar(maxSpeed);
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

    const desiredTurnAngle = velocity.angle() - boid.velocity.angle();
    const maxTurnAngle = (desiredTurnAngle > 0 ? 1 : -1) * options.turnSpeed * deltaTime;
    if (Math.abs(desiredTurnAngle) > Math.abs(maxTurnAngle))
    {
      velocity.rotate(-desiredTurnAngle + maxTurnAngle);
    }

    const previousSpeed = boid.velocity.magnitude();
    const desiredAcceleration = velocity.magnitude() - previousSpeed;
    const maxAcceleration = options.acceleration * deltaTime;
    const minAcceleration = -options.deceleration * deltaTime;
    if (desiredAcceleration > maxAcceleration)
    {
      velocity.normalize().multiplyScalar(previousSpeed + maxAcceleration);
    }
    if (desiredAcceleration < minAcceleration)
    {
      velocity.normalize().multiplyScalar(previousSpeed + minAcceleration);
    }
  }

  for (let index = 0; index < boids.length; index++)
  {
    const boid = boids[index];

    boid.velocity = velocities[index];
    boid.position.add(boid.velocity.clone().multiplyScalar(deltaTime));
  }
};

const cohesion = (boids: Boid[], boid: Boid, range: number, strength: number) =>
{
  const pull = new Victor(0, 0);

  let boidsInRange = 0;
  for (const otherBoid of boids)
  {
    const toOtherBoid = otherBoid.position.clone().subtract(boid.position);
    if (otherBoid === boid || toOtherBoid.magnitude() > range)
    {
      continue;
    }

    boidsInRange++;

    pull.add(toOtherBoid.normalize().multiplyScalar(1 - toOtherBoid.magnitude() / range));
  }

  if (boidsInRange)
  {
    pull.multiplyScalar(1 / boidsInRange);
  }

  pull.multiplyScalar(strength);

  return pull;
};

const separation = (boids: Boid[], boid: Boid, range: number, strength: number) =>
{
  const push = new Victor(0, 0);

  let boidsInRange = 0;
  for (const otherBoid of boids)
  {
    const toOtherBoid = otherBoid.position.clone().subtract(boid.position);
    if (otherBoid === boid || toOtherBoid.magnitude() > range)
    {
      continue;
    }

    boidsInRange++;

    push.subtract(toOtherBoid.normalize().multiplyScalar(1 - toOtherBoid.magnitude() / range));
  }

  if (boidsInRange)
  {
    push.multiplyScalar(1 / boidsInRange);
  }

  push.multiplyScalar(strength);

  return push;
};

const alignment = (boids: Boid[], boid: Boid, range: number, strength: number) =>
{
  const desiredVelocity = new Victor(0, 0);

  let boidsInRange = 0;
  for (const otherBoid of boids)
  {
    const toOtherBoid = otherBoid.position.clone().subtract(boid.position);
    if (otherBoid === boid || toOtherBoid.magnitude() > range)
    {
      continue;
    }

    boidsInRange++;

    desiredVelocity.add(otherBoid.velocity.clone().normalize().multiplyScalar(1 - toOtherBoid.magnitude() / range));
  }

  if (boidsInRange)
  {
    desiredVelocity.multiplyScalar(1 / boidsInRange);
  }

  desiredVelocity.multiplyScalar(strength);

  return desiredVelocity;
};

const bound = (boids: Boid[], boid: Boid, bounds: BoundingBox, strength: number) =>
{
  const inclusion = new Victor(0, 0);

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

  inclusion.multiplyScalar(strength);

  return inclusion;
};

const seek = (boids: Boid[], boid: Boid, targets: Victor[], range: number, strength: number) =>
{
  const pull = new Victor(0, 0);

  for (const target of targets)
  {
    const toTarget = target.clone().subtract(boid.position);
    if (toTarget.magnitude() > range)
    {
      continue;
    }

    pull.add(toTarget.normalize().multiplyScalar(1 - toTarget.magnitude() / range));
  }

  pull.multiplyScalar(strength);

  return pull;
};

const avoid = (boids: Boid[], boid: Boid, targets: Victor[], range: number, strength: number) =>
{
  const pull = new Victor(0, 0);

  for (const target of targets)
  {
    const toTarget = target.clone().subtract(boid.position);
    if (toTarget.magnitude() > range)
    {
      continue;
    }

    pull.subtract(toTarget.normalize().multiplyScalar(1 - toTarget.magnitude() / range));
  }

  pull.multiplyScalar(strength);

  return pull;
};
