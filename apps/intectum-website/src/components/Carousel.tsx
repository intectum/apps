'use client';

import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { HTMLAttributes, FC, ReactNode, useEffect, useRef, useState } from 'react';

import { Button, Icon } from 'apps-web';

type Props =
{
  children: ReactNode[];
} & HTMLAttributes<HTMLDivElement>;

const Carousel: FC<Props> = ({ children, ...divProps }) =>
{
  const timeoutRef = useRef<number>();
  const [ currentIndex, setCurrentIndex ] = useState(0);

  const stopAutoScroll = () => clearTimeout(timeoutRef.current);

  const autoScroll = () =>
  {
    stopAutoScroll();
    timeoutRef.current = window.setTimeout(() => setCurrentIndex((currentIndex + 1) % children.length), 5000);
  };

  useEffect(() =>
  {
    autoScroll();
  }, [ currentIndex ]);

  return (
    <div
      className="c-carousel"
      onMouseEnter={() => stopAutoScroll()}
      onMouseLeave={() => autoScroll()}
      {...divProps}
    >
      <div
        className="c-carousel__track"
        style={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ['--carousel-current-slide-index' as any]: currentIndex
        }}
      >
        {children.map((child, index) =>
          <div
            key={index}
            className="c-carousel__slide"
            style={{
              position: index ? 'absolute' : undefined,
              left: index ? `${index * 100}%` : undefined,
              top: index ? 0 : undefined,
              width: index ? '100%' : undefined
            }}
          >
            {child}
          </div>
        )}
      </div>
      <div className="c-carousel__blur c-carousel__blur--left" />
      <div className="c-carousel__blur c-carousel__blur--right" />
      <Button
        invert
        circle
        className="c-carousel__shift c-carousel__shift--previous"
        onClick={() => setCurrentIndex(currentIndex ? currentIndex - 1 : children.length - 1)}
      >
        <Icon icon={faAngleLeft} />
      </Button>
      <Button
        invert
        circle
        className="c-carousel__shift c-carousel__shift--next"
        onClick={() => setCurrentIndex((currentIndex + 1) % children.length)}
      >
        <Icon icon={faAngleRight} />
      </Button>
      <div className="o-row u-center u-m">
        {Array.from(Array(children.length)).map((_, index) =>
          <Button
            key={index}
            shade={index !== currentIndex ? 'middle' : undefined}
            invert={index === currentIndex}
            circle
            className="c-carousel__jump"
            onClick={() => setCurrentIndex(index)}
          />
        )}
      </div>
    </div>
  );
};

export default Carousel;
