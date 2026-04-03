// src/components/interactive/CarrierCarousel.tsx
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface Carrier {
  name: string;
  logo: {
    src: string;
    width?: number;
    height?: number;
    format?: string;
  };
}

interface CarrierCarouselProps {
  carriers: Carrier[];
}

export default function CarrierCarousel({ carriers }: CarrierCarouselProps) {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);

  return (
    <div className="embla relative">
      {/* Left fade gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />

      {/* Right fade gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

      <div className="embla__viewport overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="embla__container flex">
          {carriers.map((carrier, index) => (
            <div
              key={index}
              className="embla__slide flex-[0_0_280px] px-3"
            >
              <div
                className="h-24 bg-white rounded-2xl flex items-center justify-center p-4"
                style={{ boxShadow: '0 4px 16px rgba(93,70,40,0.09)' }}
              >
                <img
                  src={carrier.logo.src}
                  alt={`${carrier.name} logo`}
                  className="h-14 w-28 object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
