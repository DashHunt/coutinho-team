import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: React.ReactNode;
  initialIndex?: number;
}

const centerOn = (slide: HTMLElement, el: HTMLDivElement) =>
  slide.offsetLeft - (el.clientWidth - slide.offsetWidth) / 2;

const chevronStyle = "w-9 h-9 flex items-center justify-center rounded-full border border-bone/20 text-cream/50 transition-colors hover:border-ember hover:text-ember disabled:opacity-20 disabled:cursor-default"

export function CarouselComponent({ children, initialIndex = 0 }: CarouselProps) {
  const items = React.Children.toArray(children);
  const count = items.length;
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Posiciona no card inicial sem animação
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const slide = element.children[initialIndex] as HTMLElement;

    if (slide) {
      element.scrollLeft = centerOn(slide, element);
    }
  }, [initialIndex]);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, count - 1));
    const element = scrollRef.current;

    if (!element) return;

    const slide = element.children[clamped] as HTMLElement;
    if (slide) {
      element.scrollTo({ left: centerOn(slide, element), behavior: "smooth" });
    }
    setActiveIndex(clamped);
  };

  // Sincroniza dot ativo durante swipe manual
  const onScroll = () => {
    const element = scrollRef.current;

    if (!element) return;

    const centerElement = element.scrollLeft + element.clientWidth / 2;
    let closest = 0;
    let minimalDistance = Infinity;

    Array.from(element.children).forEach((child, index) => {
      const childElement = child as HTMLElement;
      const distance = Math.abs(childElement.offsetLeft + childElement.offsetWidth / 2 - centerElement);

      if (distance < minimalDistance) {
        minimalDistance = distance;
        closest = index;
      }
    });
    
    setActiveIndex(closest);
  };

  return (
    <div className="overflow-y-hidden">
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 px-[10%] py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((child, index) => (
          <div key={index} className="snap-center shrink-0 w-[80%]">
            {child}
          </div>
        ))}
      </div>

      {/* Seta ← · dots · seta → */}
      <div className="flex items-center justify-center gap-4 pb-2">
        <button
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Anterior"
          className={chevronStyle}
        >
          <ChevronLeft size={18} />
        </button>

        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Item ${index + 1}`}
            className={`rounded-full transition-all duration-200 ${
              activeIndex === index ? "w-4 h-4 bg-ember" : "w-2 h-2 bg-bone/25"
            }`}
          />
        ))}

        <button
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === count - 1}
          aria-label="Próximo"
          className={chevronStyle}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
