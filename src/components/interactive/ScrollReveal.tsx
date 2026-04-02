import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

interface Props {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
}

export default function ScrollReveal({
  children,
  delay = 0,
  y = 50,
  duration = 0.8,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [delay, y, duration]);

  return <div ref={ref}>{children}</div>;
}
