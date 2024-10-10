'use client';

import { faFish, faFishFins, faTriangleExclamation, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import Victor from 'victor';

import { Button, classes, Icon, Panel } from 'apps-web';

import { updateBoids } from '../common/boids';
import { Boid } from '../common/types';

type SlidingWindowValue<T> =
{
  value: T;
  time: number;
};

type BoidData =
{
  fish: Boid[];
  fishDistancesTravelled: number[];
  sharks: Boid[];
  sharkDistancesTravelled: number[];
  requestId?: number;
  time?: number;
  mouseClick?: boolean;
  mousePosition?: Victor;
  mouseSpeed?: number;
  mouseSpeedSlidingWindow: SlidingWindowValue<number>[];
};

const fishMemoryDuration = 1;
const fishSprintDuration = 5;
const sharkSprintDuration = 3;

const Boids: FC = () =>
{
  const ref = useRef<HTMLDivElement>(null);
  const boidData = useRef<BoidData>({
    fish: [],
    fishDistancesTravelled: [],
    sharks: [],
    sharkDistancesTravelled: [],
    mouseSpeedSlidingWindow: []
  });

  const [ fishCount, setFishCount ] = useState<number>(0);
  const [ sharkCount, setSharkCount ] = useState<number>(0);

  const bounds = () =>
    ({
      min: new Victor(0, 200),
      max: new Victor(ref.current?.offsetWidth ?? 0, ref.current?.offsetHeight ?? 0)
    });

  useEffect(() =>
  {
    if (!ref.current)
    {
      return;
    }

    const data = boidData.current;

    const spawnBounds = bounds();

    while (data.fish.length < fishCount)
    {
      data.fish.push({
        position: new Victor(
          spawnBounds.min.x + Math.random() * (spawnBounds.max.x - spawnBounds.min.x),
          spawnBounds.min.y + Math.random() * (spawnBounds.max.y - spawnBounds.min.y)
        ),
        velocity: new Victor(Math.random() * 100 - 50, Math.random() * 100 - 50),
        sprinting: false,
        sprintDuration: fishSprintDuration,
        sprintCompletedTime: 0
      });
      data.fishDistancesTravelled.push(0);
    }

    if (data.fish.length > fishCount)
    {
      data.fish = data.fish.slice(0, fishCount);
      data.fishDistancesTravelled = data.fishDistancesTravelled.slice(0, fishCount);
    }

    while (data.sharks.length < sharkCount)
    {
      data.sharks.push({
        position: new Victor(
          spawnBounds.min.x + Math.random() * (spawnBounds.max.x - spawnBounds.min.x),
          spawnBounds.max.y + 100
        ),
        velocity: new Victor(Math.random() * 100 - 50, Math.random() * -100),
        sprinting: false,
        sprintDuration: sharkSprintDuration,
        sprintCompletedTime: 0
      });
      data.sharkDistancesTravelled.push(0);
    }

    if (data.sharks.length > sharkCount)
    {
      data.sharks = data.sharks.slice(0, sharkCount);
      data.sharkDistancesTravelled = data.sharkDistancesTravelled.slice(0, sharkCount);
    }

    const swim = (time: number) =>
    {
      if (!ref.current)
      {
        return;
      }

      const timeSeconds = time / 1000;

      if (data.time === undefined)
      {
        data.time = timeSeconds;
      }

      const deltaTime = timeSeconds - data.time;
      data.time = timeSeconds;

      if (data.mouseSpeed)
      {
        data.mouseSpeedSlidingWindow.push({ value: data.mouseSpeed, time: data.time });
      }

      while (data.mouseSpeedSlidingWindow.length && data.mouseSpeedSlidingWindow[0].time < data.time - fishMemoryDuration)
      {
        data.mouseSpeedSlidingWindow.shift();
      }

      data.mouseSpeed = 0;

      const mouseFear = data.mouseSpeedSlidingWindow.length
        ? data.mouseSpeedSlidingWindow.reduce((previousValue, currentValue) =>
          previousValue + currentValue.value * (1 - ((data.time ?? 0) - currentValue.time) / fishMemoryDuration), 0)
        : 0;

      let mouseSeekStrength = mouseFear * -1 + 5;

      if (data.mouseClick)
      {
        // fish are not attracted after the click
        mouseSeekStrength = Math.min(mouseSeekStrength, 0);
      }

      updateBoids(
        data.time,
        deltaTime,
        data.fish,
        {
          cruiseSpeed: 100,
          sprintSpeed: 250,
          sprintDuration: fishSprintDuration,
          sprintRegenDuration: 5,
          turnSpeed: 10,
          acceleration: 1000,
          deceleration: 500,
          cohesionRange: 100,
          cohesionStrength: 2,
          separationRange: 50,
          separationStrength: 10,
          alignmentRange: 100,
          alignmentStrength: 5,
          bounds: bounds(),
          boundsStrength: 0.1,
          seekTargets: data.mousePosition ? [ data.mousePosition ] : undefined,
          seekRange: 200,
          seekStrength: mouseSeekStrength,
          avoidTargets: data.sharks.map(boid => boid.position),
          avoidRange: 150,
          avoidStrength: 500
        }
      );

      updateBoids(
        data.time,
        deltaTime,
        data.sharks,
        {
          cruiseSpeed: 50,
          sprintSpeed: 200,
          sprintDuration: sharkSprintDuration,
          sprintRegenDuration: 10,
          acceleration: 200,
          deceleration: 100,
          turnSpeed: 0.5,
          bounds: bounds(),
          boundsStrength: 0.01,
          seekTargets: data.fish.map(boid => boid.position),
          seekRange: 200,
          seekStrength: 100
        }
      );

      const drawBoids = (name: string, boids: Boid[], distancesTravelled: number[], elementStart: number, wagAngle: number, wagSpeed: number, sprintSpeed: number) =>
      {
        for (let index = 0; index < boids.length; index++)
        {
          const element = ref.current?.children[elementStart + index] as HTMLElement | undefined;
          if (!element || !element.classList.contains(`c-boids__boid--${name}`))
          {
            continue;
          }

          const boid = boids[index];
          distancesTravelled[index] += boid.velocity.clone().multiplyScalar(deltaTime).magnitude();
          const distanceTravelled = distancesTravelled[index];

          const tailWagAngle = (Math.sin(distanceTravelled * wagSpeed) * 2 - 1) * wagAngle;

          element.style.left = `${boid.position.x}px`;
          element.style.top = `${boid.position.y}px`;
          element.style.transform = `translate(-50%, -50%) rotate(${boid.velocity.angle() + tailWagAngle}rad)`;
          element.style.filter = `brightness(${(boid.velocity.magnitude() / sprintSpeed) + 0.5})`;
        }
      };

      drawBoids('fish', data.fish, data.fishDistancesTravelled, 0, 0.1, 0.2, 200);
      drawBoids('shark', data.sharks, data.sharkDistancesTravelled, data.fish.length, 0.01, 0.2, 150);

      data.requestId = requestAnimationFrame(swim);
    };

    const pauseResume = () =>
    {
      if (data.time)
      {
        cancelAnimationFrame(data.requestId ?? 0);
        data.time = undefined;
      }
      else
      {
        data.requestId = requestAnimationFrame(swim);
      }
    };

    const updateFishCount = () =>
    {
      setFishCount(Math.round((ref.current?.offsetWidth ?? 0) / 20));
    };

    if (!fishCount)
    {
      updateFishCount();
    }

    data.requestId = requestAnimationFrame(swim);
    window.addEventListener('resize', updateFishCount);
    document.addEventListener('visibilitychange', pauseResume);

    return () =>
    {
      cancelAnimationFrame(data.requestId ?? 0);
      window.removeEventListener('resize', updateFishCount);
      document.removeEventListener('visibilitychange', pauseResume);
    };
  }, [ fishCount, sharkCount ]);

  const onMouseMove: MouseEventHandler = event =>
  {
    const data = boidData.current;

    const newMousePosition = new Victor(event.pageX, event.pageY - (ref.current?.offsetTop ?? 0));

    if (data.mousePosition)
    {
      data.mouseSpeed = (data.mouseSpeed ?? 0) + newMousePosition.clone().subtract(data.mousePosition).magnitude();
    }

    data.mouseClick = false;
    data.mousePosition = newMousePosition;
  };

  const onMouseLeave = () =>
  {
    const data = boidData.current;

    data.mousePosition = undefined;
    data.mouseSpeed = undefined;
    data.mouseSpeedSlidingWindow = [];
  };

  const onClick: MouseEventHandler = event =>
  {
    const data = boidData.current;

    data.mouseClick = true;
    data.mousePosition = new Victor(event.pageX, event.pageY - (ref.current?.offsetTop ?? 0));
    data.mouseSpeed = 1000;
  };

  return (
    <div
      ref={ref}
      className="c-boids"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {Array.from({ length: fishCount }).map((_, index) =>
        <Icon key={index} className="c-boids__boid c-boids__boid--fish" icon={faFish} />
      )}
      {Array.from({ length: sharkCount }).map((_, index) =>
        <Icon key={index} className="c-boids__boid c-boids__boid--shark" icon={faFishFins} />
      )}
      <div className="o-scroll-animation c-boids__wave c-boids__wave--1" />
      <div className="o-scroll-animation c-boids__wave c-boids__wave--2" />
      <Panel invert className="c-boids__warning u-fr u-center u-rounded u-small-down u-px u-py--sm">
        <Icon className="u-mr--sm" icon={faTriangleExclamation} />
        Please do not tap the glass
      </Panel>
      <Panel invert className="c-boids__shark-lock u-fr u-align--center">
        <div className="u-ml u-mr--sm u-medium-up">DANGER: Do not unlock!</div>
        <Button invert circle onClick={() => setSharkCount(1)} title="Do not unlock!">
          <Icon icon={sharkCount ? faLockOpen : faLock} />
        </Button>
      </Panel>
    </div>
  );
};

export default Boids;
