import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

interface Props {
  children: React.ReactNode;
  stagger?: number;
  y?: number;
  duration?: number;
}

export default function StaggerReveal({
  children,
  stagger = 0.15,
  y = 40,
  duration = 0.7,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current!.children, {
        opacity: 0,
        y,
        stagger,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [stagger, y, duration]);

  return <div ref={ref}>{children}</div>;
}
