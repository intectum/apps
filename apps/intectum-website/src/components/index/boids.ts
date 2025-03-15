
import { toElement } from 'apps-web';

import { updateBoids } from '../../common/boids';
import { Boid, Vec2 } from '../../common/types';
import { angle, length, subtractTo, multiplyScalarTo } from '../../common/vectors';
import renderLockOpenSvg from '../../templates/icons/lock-open';
import renderFishHTML from '../../templates/index/fish';
import renderSharkHTML from '../../templates/index/shark';

type SlidingWindowValue<T> =
{
  value: T;
  time: number;
};

const fishMemoryDuration = 1;
const fishSprintDuration = 5;
const sharkSprintDuration = 3;

const fishElement = toElement(renderFishHTML()) as Element;
const sharkElement = toElement(renderSharkHTML()) as Element;

export class Boids extends HTMLDivElement
{
  private ready = false;
  private fish: Boid[] = [];
  private fishDistancesTravelled: number[] = [];
  private sharks: Boid[] = [];
  private sharkDistancesTravelled: number[] = [];
  private requestId = 0;
  private time = 0;
  private mouseClick = false;
  private mousePosition?: Vec2;
  private mouseSpeed?: number;
  private mouseSpeedSlidingWindow: SlidingWindowValue<number>[] = [];

  private observer = new IntersectionObserver(entries =>
  {
    for (const entry of entries)
    {
      if (entry.isIntersecting)
      {
        this.ready = true;
        this.playPause();
      }
    }
  });

  private playPauseCallback = this.playPause.bind(this);

  connectedCallback()
  {
    document.addEventListener('visibilitychange', this.playPauseCallback);

    const unlockShark = this.querySelector<HTMLButtonElement>('[data-action="unlock-shark"]');
    if (unlockShark)
    {
      unlockShark.onclick = () =>
      {
        this.unlockShark();
        unlockShark.firstElementChild?.replaceWith(toElement(renderLockOpenSvg()) as Element);
      };
    }

    this.onmousemove = event =>
    {
      const newMousePosition: Vec2 = { x: event.pageX, y: event.pageY - (this.offsetTop ?? 0) };

      if (this.mousePosition)
      {
        this.mouseSpeed = (this.mouseSpeed ?? 0) + length(subtractTo(newMousePosition, this.mousePosition));
      }

      this.mouseClick = false;
      this.mousePosition = newMousePosition;
    };

    this.onmouseleave = () =>
    {
      this.mousePosition = undefined;
      this.mouseSpeed = undefined;
      this.mouseSpeedSlidingWindow = [];
    };

    this.onclick = event =>
    {
      this.mouseClick = true;
      this.mousePosition = { x: event.pageX, y: event.pageY - (this.offsetTop ?? 0) };
      this.mouseSpeed = 1000;
    };

    this.observer.observe(this);
  }

  disconnectedCallback()
  {
    cancelAnimationFrame(this.requestId);
    document.removeEventListener('visibilitychange', this.playPauseCallback);
  }

  updateFish()
  {
    const count = Math.round(this.offsetWidth / 20);

    if (this.fish.length < count)
    {
      const bounds = this.bounds();
      const size = subtractTo(bounds.max, bounds.min);

      const fish: Boid =
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

      this.fish.push(fish);
      this.fishDistancesTravelled.push(0);
      this.prepend(fishElement.cloneNode(true));
    }

    if (this.fish.length > count)
    {
      this.fish = this.fish.slice(0, count);
      this.fishDistancesTravelled = this.fishDistancesTravelled.slice(0, count);
      const excessFishElements = Array.from(this.querySelectorAll('.c-boids__boid--fish')).slice(count);
      excessFishElements.forEach(excessFishElement => excessFishElement.remove());
    }
  }

  unlockShark()
  {
    const bounds = this.bounds();
    const fishElements = this.querySelectorAll('.c-boids__boid--fish');
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

    this.sharks.push(shark);
    this.sharkDistancesTravelled.push(0);
    lastFishElement.insertAdjacentElement('afterend', sharkElement.cloneNode(true) as Element);
  }

  update(time: number)
  {
    this.updateFish();

    const timeSeconds = time / 1000;

    if (!this.time)
    {
      this.time = timeSeconds;
    }

    const deltaTime = timeSeconds - this.time;
    this.time = timeSeconds;

    this.swim(deltaTime);

    this.draw(deltaTime, 'fish', this.fish, this.fishDistancesTravelled, 0, 0.1, 0.2, 200);
    this.draw(deltaTime, 'shark', this.sharks, this.sharkDistancesTravelled, this.fish.length, 0.01, 0.2, 150);

    this.requestId = requestAnimationFrame(time => this.update(time));
  }

  playPause()
  {
    cancelAnimationFrame(this.requestId);

    if (this.ready && document.visibilityState === 'visible')
    {
      this.requestId = requestAnimationFrame(time => this.update(time));
    }
    else
    {
      this.time = 0;
    }
  }

  swim(deltaTime: number)
  {
    if (this.mouseSpeed)
    {
      this.mouseSpeedSlidingWindow.push({ value: this.mouseSpeed, time: this.time });
    }

    while (this.mouseSpeedSlidingWindow.length && this.mouseSpeedSlidingWindow[0].time < this.time - fishMemoryDuration)
    {
      this.mouseSpeedSlidingWindow.shift();
    }

    this.mouseSpeed = 0;

    const mouseFear = this.mouseSpeedSlidingWindow.length
      ? this.mouseSpeedSlidingWindow.reduce((previousValue, currentValue) =>
        previousValue + currentValue.value * (1 - ((this.time ?? 0) - currentValue.time) / fishMemoryDuration), 0)
      : 0;

    let mouseSeekStrength = mouseFear * -1 + 5;

    if (this.mouseClick)
    {
      // fish are not attracted after the click
      mouseSeekStrength = Math.min(mouseSeekStrength, 0);
    }

    updateBoids(
      this.time,
      deltaTime,
      this.fish,
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
        bounds: this.bounds(),
        boundsStrength: 0.1,
        seekTargets: this.mousePosition ? [ this.mousePosition ] : undefined,
        seekRange: 200,
        seekStrength: mouseSeekStrength,
        avoidTargets: this.sharks.map(boid => boid.position),
        avoidRange: 150,
        avoidStrength: 500
      }
    );

    updateBoids(
      this.time,
      deltaTime,
      this.sharks,
      {
        cruiseSpeed: 50,
        sprintSpeed: 200,
        sprintDuration: sharkSprintDuration,
        sprintRegenDuration: 10,
        acceleration: 200,
        deceleration: 100,
        turnSpeed: 0.5,
        bounds: this.bounds(),
        boundsStrength: 0.01,
        seekTargets: this.fish.map(boid => boid.position),
        seekRange: 200,
        seekStrength: 100
      }
    );
  }

  draw(deltaTime: number, name: string, boids: Boid[], distancesTravelled: number[], elementStart: number, wagAngle: number, wagSpeed: number, sprintSpeed: number)
  {
    for (let index = 0; index < boids.length; index++)
    {
      const element = this.children[elementStart + index] as HTMLElement | undefined;
      if (!element || !element.classList.contains(`c-boids__boid--${name}`))
      {
        continue;
      }

      const boid = boids[index];
      distancesTravelled[index] += length(multiplyScalarTo(boid.velocity, deltaTime));
      const distanceTravelled = distancesTravelled[index];

      const tailWagAngle = (Math.sin(distanceTravelled * wagSpeed) * 2 - 1) * wagAngle;

      element.style.left = `${boid.position.x}px`;
      element.style.top = `${boid.position.y}px`;
      element.style.transform = `translate(-50%, -50%) rotate(${angle(boid.velocity) + tailWagAngle}rad)`;
      element.style.filter = `brightness(${(length(boid.velocity) / sprintSpeed) + 0.5})`;
    }
  }

  bounds()
  {
    return {
      min: { x: 0, y: 200 },
      max: { x: this.offsetWidth, y: this.offsetHeight }
    };
  }
}

export const defineHomeBoids = () =>
  customElements.define('intectum-home-boids', Boids, { extends: 'div' });
