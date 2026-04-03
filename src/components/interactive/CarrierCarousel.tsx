// src/components/interactive/CarrierCarousel.tsx
import useEmblaCarousel from 'embla-carousel-react';

interface CarrierCarouselProps {
  carriers: string[];
}

export default function CarrierCarousel({ carriers }: CarrierCarouselProps) {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  return (
    <div className="embla">
      <div className="embla__viewport overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="embla__container flex gap-4">
          {carriers.map((name, index) => (
            <div
              key={index}
              className="embla__slide flex-[0_0_calc(25%-12px)] min-w-0"
            >
              <div
                className="h-16 bg-white rounded-2xl flex items-center justify-center px-2 text-[11px] font-semibold text-brown-light text-center leading-tight"
                style={{ boxShadow: '0 4px 16px rgba(93,70,40,0.09)' }}
              >
                {name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
