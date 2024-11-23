import Victor from 'victor';

import { toElement } from 'apps-web';

import { updateBoids } from '../../common/boids';
import { Boid } from '../../common/types';

type SlidingWindowValue<T> =
{
  value: T;
  time: number;
};

const fishMemoryDuration = 1;
const fishSprintDuration = 5;
const sharkSprintDuration = 3;

const fishElement = toElement('<i class="c-boids__boid c-boids__boid--fish fa-solid fa-fish u-icon"></i>') as Element;
const sharkElement = toElement('<i class="c-boids__boid c-boids__boid--shark fa-solid fa-fish-fins"></i>') as Element;

export class Boids extends HTMLDivElement
{
  private fish: Boid[] = [];
  private fishDistancesTravelled: number[] = [];
  private sharks: Boid[] = [];
  private sharkDistancesTravelled: number[] = [];
  private requestId = 0;
  private time = 0;
  private mouseClick = false;
  private mousePosition?: Victor;
  private mouseSpeed?: number;
  private mouseSpeedSlidingWindow: SlidingWindowValue<number>[] = [];

  private updateFishCallback = this.updateFish.bind(this);
  private playPauseCallback = this.playPause.bind(this);

  connectedCallback()
  {
    this.updateFish();
    window.addEventListener('resize', this.updateFishCallback);

    this.playPause();
    document.addEventListener('visibilitychange', this.playPauseCallback);

    const unlockShark = this.querySelector<HTMLButtonElement>('[data-action="unlock-shark"]');
    if (unlockShark)
    {
      unlockShark.onclick = () =>
      {
        this.unlockShark();
        unlockShark.firstElementChild?.classList.remove('fa-lock');
        unlockShark.firstElementChild?.classList.add('fa-lock-open');
      };
    }

    this.onmousemove = event =>
    {
      const newMousePosition = new Victor(event.pageX, event.pageY - (this.offsetTop ?? 0));

      if (this.mousePosition)
      {
        this.mouseSpeed = (this.mouseSpeed ?? 0) + newMousePosition.clone().subtract(this.mousePosition).magnitude();
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
      this.mousePosition = new Victor(event.pageX, event.pageY - (this.offsetTop ?? 0));
      this.mouseSpeed = 1000;
    };
  }

  disconnectedCallback()
  {
    window.removeEventListener('resize', this.updateFishCallback);

    cancelAnimationFrame(this.requestId);
    document.removeEventListener('visibilitychange', this.playPauseCallback);
  }

  updateFish()
  {
    const count = Math.round(this.offsetWidth / 20);

    while (this.fish.length < count)
    {
      const bounds = this.bounds();

      const fish: Boid =
      {
        position: new Victor(
          bounds.min.x + Math.random() * (bounds.max.x - bounds.min.x),
          bounds.min.y + Math.random() * (bounds.max.y - bounds.min.y)
        ),
        velocity: new Victor(Math.random() * 100 - 50, Math.random() * 100 - 50),
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
      position: new Victor(
        bounds.min.x + Math.random() * (bounds.max.x - bounds.min.x),
        bounds.max.y + 100
      ),
      velocity: new Victor(Math.random() * 100 - 50, Math.random() * -100),
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
    if (this.time)
    {
      cancelAnimationFrame(this.requestId);
      this.time = 0;
    }
    else
    {
      this.requestId = requestAnimationFrame(time => this.update(time));
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
      distancesTravelled[index] += boid.velocity.clone().multiplyScalar(deltaTime).magnitude();
      const distanceTravelled = distancesTravelled[index];

      const tailWagAngle = (Math.sin(distanceTravelled * wagSpeed) * 2 - 1) * wagAngle;

      element.style.left = `${boid.position.x}px`;
      element.style.top = `${boid.position.y}px`;
      element.style.transform = `translate(-50%, -50%) rotate(${boid.velocity.angle() + tailWagAngle}rad)`;
      element.style.filter = `brightness(${(boid.velocity.magnitude() / sprintSpeed) + 0.5})`;
    }
  }

  bounds()
  {
    return {
      min: new Victor(0, 200),
      max: new Victor(this.offsetWidth, this.offsetHeight)
    };
  }
}

export const defineHomeBoids = () =>
  customElements.define('intectum-home-boids', Boids, { extends: 'div' });
