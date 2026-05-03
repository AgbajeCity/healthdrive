import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
  return (
    <section className="py-14" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-8">
          <h2 id="testimonials-heading" className="text-3xl font-bold text-foreground">
            Voices from the community
          </h2>
          <p className="text-muted-foreground mt-2">Real stories from patients and health workers.</p>
        </div>

        <Carousel opts={{ loop: true, align: "start" }} className="w-full">
          <CarouselContent>
            {items.map((it, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2">
                <Card className="bg-card/90 backdrop-blur-sm border-border/50 h-full">
                  <CardContent className="p-6 flex flex-col gap-4 h-full">
                    <Quote className="w-8 h-8 text-primary/60" aria-hidden="true" />
                    <blockquote className="text-foreground/90 leading-relaxed flex-1">
                      "{it.quote}"
                    </blockquote>
                    <div className="flex items-center gap-3 pt-2 border-t border-border/40">
                      <img
                        src={it.image}
                        alt={`${it.name} portrait`}
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
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
