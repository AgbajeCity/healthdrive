import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote, Star } from "lucide-react";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";

const items = [
  {
    quote:
      "I dialled *911# when my grandson was sick. A health worker called us back within minutes — we didn't have to walk hours to a clinic.",
    name: "Mukamana A.",
    role: "Patient, Bugesera, Rwanda",
    image: t1,
  },
  {
    quote:
      "The solar van comes to our settlement every two weeks. We finally have continuous follow-up for hypertension and diabetes.",
    name: "Chinedu O.",
    role: "Community Health Volunteer, Borno, Nigeria",
    image: t2,
  },
  {
    quote:
      "Before HealthDrive, the nearest clinic was 18 km away. Now a CHV checks on me every week and the van brings my medication.",
    name: "Bizimana J.",
    role: "Elder, Kayonza, Rwanda",
    image: t3,
  },
];

const Testimonials = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(items.length);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section
      className="py-14"
      aria-labelledby="testimonials-heading"
      aria-roledescription="carousel"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-8">
          <h2 id="testimonials-heading" className="text-3xl font-bold text-foreground">
            Voices from the community
          </h2>
          <p className="text-muted-foreground mt-2">Real stories from patients and health workers.</p>
        </div>

        <Carousel
          opts={{ loop: true, align: "start" }}
          setApi={setApi}
          className="w-full focus-visible:outline-none"
        >
          <CarouselContent
            aria-live="polite"
            aria-atomic="false"
          >
            {items.map((it, i) => (
              <CarouselItem
                key={i}
                className="md:basis-1/2 lg:basis-1/2"
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${items.length}`}
                aria-hidden={current !== i && current + 1 !== i}
              >
                <Card className="bg-card/90 backdrop-blur-sm border-border/50 h-full">
                  <CardContent className="p-6 flex flex-col gap-4 h-full">
                    <Quote className="w-8 h-8 text-primary/60" aria-hidden="true" />
                    <blockquote className="text-foreground/90 leading-relaxed flex-1">
                      "{it.quote}"
                    </blockquote>
                    <figcaption className="flex items-center gap-3 pt-2 border-t border-border/40">
                      <img
                        src={it.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-foreground">{it.name}</div>
                        <div className="text-xs text-muted-foreground">{it.role}</div>
                      </div>
                      <div className="flex" aria-label="5 out of 5 stars">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                        ))}
                      </div>
                    </figcaption>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            aria-label="Previous testimonial"
            className="hidden md:flex focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <CarouselNext
            aria-label="Next testimonial"
            className="hidden md:flex focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </Carousel>

        {/* Pagination dots — keyboard reachable */}
        <div
          className="flex justify-center gap-2 mt-6"
          role="tablist"
          aria-label="Select testimonial"
        >
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={current === i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                current === i ? "bg-primary w-6" : "bg-muted-foreground/40 w-2.5"
              }`}
            />
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          Showing testimonial {current + 1} of {count}
        </p>
      </div>
    </section>
  );
};

export default Testimonials;
