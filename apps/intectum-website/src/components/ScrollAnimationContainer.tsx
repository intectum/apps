'use client';

import { FC, HTMLAttributes, useEffect, useRef } from 'react';

const ScrollAnimationContainer: FC<HTMLAttributes<HTMLDivElement>> = props =>
{
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() =>
  {
    const animate = () =>
    {
      if (!ref.current)
      {
        return;
      }

      const scrollTopZero = ref.current.offsetTop - window.innerHeight;
      const scrollTopOne = ref.current.offsetTop + ref.current.offsetHeight;
      const time = (document.documentElement.scrollTop - scrollTopZero) / (scrollTopOne - scrollTopZero);
      ref.current.style.setProperty('--scroll-animation-time', time.toString());
      ref.current.style.setProperty('visibility', time < 0 || time >= 1 ? 'hidden' : 'visible');
    };

    animate();

    document.addEventListener('scroll', animate);
    return () => document.removeEventListener('scroll', animate);
  }, []);

  return <div ref={ref} style={{ visibility: 'hidden' }} {...props} />;
};

export default ScrollAnimationContainer;
