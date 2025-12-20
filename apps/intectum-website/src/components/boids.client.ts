import { init, toElement } from 'based/client';

import { updateBoids } from '../common/boids';
import { Boid, Vec2 } from '../common/types';
import { angle, length, subtractTo, multiplyScalarTo } from '../common/vectors';
import renderFishHTML from '../icons/fish';
import renderLockOpenSvg from '../icons/lock-open';
import renderSharkHTML from '../icons/shark';

type State =
{
  time: number;
  requestId: number;
  fish: Boid[];
  fishDistancesTravelled: number[];
  sharks: Boid[];
  sharkDistancesTravelled: number[];
  mouseClick: boolean;
  mousePosition: Vec2 | undefined;
  mouseSpeed: number | undefined;
  mouseSpeedSlidingWindow: SlidingWindowValue<number>[];
};

type SlidingWindowValue<T> =
{
  value: T;
  time: number;
};

const fishMemoryDuration = 1;
const fishSprintDuration = 5;
const sharkSprintDuration = 3;

const fishElement = toElement(renderFishHTML());
const sharkElement = toElement(renderSharkHTML());

init['[data-name="boids"]'] = element =>
{
  let ready = false;
  const state: State =
    {
      time: 0,
      requestId: 0,
      fish: [],
      fishDistancesTravelled: [],
      sharks: [],
      sharkDistancesTravelled: [],
      mouseClick: false,
      mousePosition: undefined,
      mouseSpeed: undefined,
      mouseSpeedSlidingWindow: []
    };

  const playPause = () =>
  {
    cancelAnimationFrame(state.requestId);

    if (ready && document.visibilityState === 'visible')
    {
      state.requestId = requestAnimationFrame(time => update(element, time, state));
    }
    else
    {
      state.time = 0;
    }
  };

  const intersectionObserver = new IntersectionObserver(entries =>
  {
    for (const entry of entries)
    {
      if (entry.isIntersecting)
      {
        ready = true;
        playPause();
      }
    }
  });

  const mutationObserver = new MutationObserver(mutations =>
  {
    for (const mutation of mutations)
    {
      for (const removedNode of mutation.removedNodes)
      {
        if (removedNode !== element) continue;

        cancelAnimationFrame(state.requestId);
        document.removeEventListener('visibilitychange', playPause);

        mutationObserver.disconnect();
      }
    }
  });

  document.addEventListener('visibilitychange', playPause);

  const unlock = element.querySelector<HTMLButtonElement>('[data-name="unlock"]');
  if (unlock)
  {
    unlock.addEventListener('click', () =>
    {
      unlockShark(element, state);
      unlock.firstElementChild?.replaceWith(toElement(renderLockOpenSvg()) as Element);
    });
  }

  element.addEventListener('mousemove', event =>
  {
    const newMousePosition: Vec2 = { x: event.pageX, y: event.pageY - (element.offsetTop ?? 0) };

    if (state.mousePosition)
    {
      state.mouseSpeed = (state.mouseSpeed ?? 0) + length(subtractTo(newMousePosition, state.mousePosition));
    }

    state.mouseClick = false;
    state.mousePosition = newMousePosition;
  });

  element.addEventListener('mouseleave', () =>
  {
    state.mousePosition = undefined;
    state.mouseSpeed = undefined;
    state.mouseSpeedSlidingWindow = [];
  });

  element.addEventListener('click', event =>
  {
    state.mouseClick = true;
    state.mousePosition = { x: event.pageX, y: event.pageY - (element.offsetTop ?? 0) };
    state.mouseSpeed = 1000;
  });

  intersectionObserver.observe(element);
  mutationObserver.observe(element.parentElement as HTMLElement, { childList: true });
};

const updateFish = (element: HTMLElement, state: State) =>
{
  const count = Math.round(element.offsetWidth / 20);

  if (state.fish.length < count)
  {
    const bounds = getBounds(element);
    const size = subtractTo(bounds.max, bounds.min);

    const newFish: Boid =
    {
      position: {
        x: bounds.min.x + Math.random() * size.x,
        y: bounds.min.y + Math.random() * size.y
      },
      velocity: {
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50
      },
      sprinting: false,
      sprintDuration: fishSprintDuration,
      sprintCompletedTime: 0
    };

    state.fish.push(newFish);
    state.fishDistancesTravelled.push(0);
    element.prepend(fishElement.cloneNode(true));
  }

  if (state.fish.length > count)
  {
    state.fish = state.fish.slice(0, count);
    state.fishDistancesTravelled = state.fishDistancesTravelled.slice(0, count);
    const excessFishElements = Array.from(element.querySelectorAll('.c-boids__boid--fish')).slice(count);
    excessFishElements.forEach(excessFishElement => excessFishElement.remove());
  }
};

const unlockShark = (element: HTMLElement, state: State) =>
{
  const bounds = getBounds(element);
  const fishElements = element.querySelectorAll('.c-boids__boid--fish');
  const lastFishElement = fishElements[fishElements.length - 1];

  const shark: Boid =
  {
    position: {
      x: bounds.min.x + Math.random() * (bounds.max.x - bounds.min.x),
      y: bounds.max.y + 100
    },
    velocity: {
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50
    },
    sprinting: false,
    sprintDuration: sharkSprintDuration,
    sprintCompletedTime: 0
  };

  state.sharks.push(shark);
  state.sharkDistancesTravelled.push(0);
  lastFishElement.insertAdjacentElement('afterend', sharkElement.cloneNode(true) as Element);
};

const update = (element: HTMLElement, time: number, state: State) =>
{
  updateFish(element, state);

  const timeSeconds = time / 1000;

  if (!state.time)
  {
    state.time = timeSeconds;
  }

  const deltaTime = timeSeconds - state.time;
  state.time = timeSeconds;

  swim(element, deltaTime, state);

  draw(element, deltaTime, 'fish', state.fish, state.fishDistancesTravelled, 0, 0.1, 0.2, 200);
  draw(element, deltaTime, 'shark', state.sharks, state.sharkDistancesTravelled, state.fish.length, 0.01, 0.2, 150);

  state.requestId = requestAnimationFrame(time => update(element, time, state));
};

const swim = (element: HTMLElement, deltaTime: number, state: State) =>
{
  if (state.mouseSpeed)
  {
    state.mouseSpeedSlidingWindow.push({ value: state.mouseSpeed, time: state.time });
  }

  while (state.mouseSpeedSlidingWindow.length && state.mouseSpeedSlidingWindow[0].time < state.time - fishMemoryDuration)
  {
    state.mouseSpeedSlidingWindow.shift();
  }

  state.mouseSpeed = 0;

  const mouseFear = state.mouseSpeedSlidingWindow.length
    ? state.mouseSpeedSlidingWindow.reduce((previousValue, currentValue) =>
      previousValue + currentValue.value * (1 - ((state.time ?? 0) - currentValue.time) / fishMemoryDuration), 0)
    : 0;

  let mouseSeekStrength = mouseFear * -1 + 5;

  if (state.mouseClick)
  {
    // fish are not attracted after the click
    mouseSeekStrength = Math.min(mouseSeekStrength, 0);
  }

  updateBoids(
    state.time,
    deltaTime,
    state.fish,
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
      bounds: getBounds(element),
      boundsStrength: 0.1,
      seekTargets: state.mousePosition ? [ state.mousePosition ] : undefined,
      seekRange: 200,
      seekStrength: mouseSeekStrength,
      avoidTargets: state.sharks.map(boid => boid.position),
      avoidRange: 150,
      avoidStrength: 500
    }
  );

  updateBoids(
    state.time,
    deltaTime,
    state.sharks,
    {
      cruiseSpeed: 50,
      sprintSpeed: 200,
      sprintDuration: sharkSprintDuration,
      sprintRegenDuration: 10,
      acceleration: 200,
      deceleration: 100,
      turnSpeed: 0.5,
      bounds: getBounds(element),
      boundsStrength: 0.01,
      seekTargets: state.fish.map(boid => boid.position),
      seekRange: 200,
      seekStrength: 100
    }
  );
};

const draw = (element: HTMLElement, deltaTime: number, name: string, boids: Boid[], distancesTravelled: number[], elementStart: number, wagAngle: number, wagSpeed: number, sprintSpeed: number) =>
{
  for (let index = 0; index < boids.length; index++)
  {
    const childElement = element.children[elementStart + index] as HTMLElement | undefined;
    if (!childElement || !childElement.classList.contains(`c-boids__boid--${name}`))
    {
      continue;
    }

    const boid = boids[index];
    distancesTravelled[index] += length(multiplyScalarTo(boid.velocity, deltaTime));
    const distanceTravelled = distancesTravelled[index];

    const tailWagAngle = (Math.sin(distanceTravelled * wagSpeed) * 2 - 1) * wagAngle;

    childElement.style.left = `${boid.position.x}px`;
    childElement.style.top = `${boid.position.y}px`;
    childElement.style.transform = `translate(-50%, -50%) rotate(${angle(boid.velocity) + tailWagAngle}rad)`;
    childElement.style.filter = `brightness(${(length(boid.velocity) / sprintSpeed) + 0.5})`;
  }
};

const getBounds = (element: HTMLElement) =>
  ({
    min: { x: 0, y: 200 },
    max: { x: element.offsetWidth, y: element.offsetHeight }
  });
