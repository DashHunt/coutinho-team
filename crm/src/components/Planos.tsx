import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { useState } from "react";
import { Modal } from "./ui/Modal";
import LeadForm from "./LeadForm";
import { CarouselComponent } from "./ui/Carousel";

interface PlanoData {
  id: string;
  title: string;
  tag?: string;
  pricePrefix?: string;
  price: string;
  priceSuffix?: string;
  note: string;
  badge?: string;
  featured?: boolean;
}

const PLANOS: PlanoData[] = [
  {
    id: "mensal",
    title: "Mensal",
    price: "R$ 220",
    note: "À vista ou no cartão",
  },
  {
    id: "trimestral",
    title: "Trimestral",
    tag: "7% OFF",
    pricePrefix: "3x",
    price: "R$ 200",
    note: "Ou R$ 600 à vista (10% OFF)",
    badge: "Mais vendido",
    featured: true,
  },
  {
    id: "semestral",
    title: "Semestral",
    tag: "10% OFF",
    pricePrefix: "6x",
    price: "R$ 180",
    note: "Ou R$ 1080 à vista (14% OFF)",
  },
];

interface ModalState {
  isOpen: boolean;
  plan: string;
}

export default function Planos() {
  const [modal, setModal] = useState<ModalState>({ isOpen: false, plan: "" });

  const openModal = (plan: string) => setModal({ isOpen: true, plan });
  const closeModal = () => setModal((prev) => ({ ...prev, isOpen: false }));

  return (
    <section id="planos" className="py-[90px] bg-elevated border-t border-b border-bone/12">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center max-w-[640px] mx-auto mb-14">
          <p className="font-body text-[13px] font-bold uppercase tracking-[2.5px] text-ember mb-1">
            Faça parte
          </p>
          <h2 className="font-display text-[clamp(28px,4vw,42px)] leading-[1.15]">
            Planos disponíveis
          </h2>
        </div>

        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px] items-stretch">
          {PLANOS.map((planos) => (
            <Card
              key={planos.id}
              variant={planos.featured ? "raised" : "base"}
              featured={planos.featured}
              padding="md"
              rounded="lg"
              className="relative flex flex-col"
              hover="scale"
            >
              {planos.badge && (
                <span className="absolute -top-3.5 left-6 bg-ember text-[#160a05] text-[11px] font-extrabold uppercase tracking-[0.4px] px-3 py-1 rounded-full">
                  {planos.badge}
                </span>
              )}

              <h3 className="text-[18px] mb-2.5 flex items-center gap-2 flex-wrap">
                {planos.title}
                {planos.tag && (
                  <span className="font-body text-[11px] font-semibold bg-ember-deep text-cream px-2 py-0.5 rounded uppercase tracking-[0.3px]">
                    {planos.tag}
                  </span>
                )}
              </h3>

              <p className="font-display font-extrabold text-[32px] text-ember my-1.5 leading-none">
                {planos.pricePrefix && (
                  <span className="font-body text-[14px] text-cream font-normal normal-case">
                    {planos.pricePrefix}{" "}
                  </span>
                )}
                {planos.price}
                {planos.priceSuffix && (
                  <span className="font-body text-[14px] text-cream font-normal normal-case">
                    {planos.priceSuffix}
                  </span>
                )}
              </p>

              <p className="text-[13px] text-cream/65 mb-6 grow">{planos.note}</p>

              <Button
                variant={planos.featured ? "ember" : "outline-ember"}
                className="w-full"
                onClick={() => openModal(planos.title)}
              >
                Escolher plano
              </Button>
            </Card>
          ))}
        </div>
      </div>

      <div className="block md:hidden">
        <div className="">
          <CarouselComponent initialIndex={PLANOS.findIndex((p) => p.featured)}>
            {PLANOS.map((planos, index) => (
              <Card
                key={planos.id}
                variant={planos.featured ? "raised" : "base"}
                featured={planos.featured}
                padding="md"
                rounded="lg"
                className="relative flex flex-col"
                hover="scale"
                alt={index + 1}
              >
                {planos.badge && (
                  <span className="absolute -top-3.5 left-6 bg-ember text-[#160a05] text-[11px] font-extrabold uppercase tracking-[0.4px] px-3 py-1 rounded-full">
                    {planos.badge}
                  </span>
                )}

                <h3 className="text-[18px] mb-2.5 flex items-center gap-2 flex-wrap">
                  {planos.title}
                  {planos.tag && (
                    <span className="font-body text-[11px] font-semibold bg-ember-deep text-cream px-2 py-0.5 rounded uppercase tracking-[0.3px]">
                      {planos.tag}
                    </span>
                  )}
                </h3>

                <p className="font-display font-extrabold text-[32px] text-ember my-1.5 leading-none">
                  {planos.pricePrefix && (
                    <span className="font-body text-[14px] text-cream font-normal normal-case">
                      {planos.pricePrefix}{" "}
                    </span>
                  )}
                  {planos.price}
                  {planos.priceSuffix && (
                    <span className="font-body text-[14px] text-cream font-normal normal-case">
                      {planos.priceSuffix}
                    </span>
                  )}
                </p>

                <p className="text-[13px] text-cream/65 mb-6 grow">{planos.note}</p>

                <Button
                  variant={planos.featured ? "ember" : "outline-ember"}
                  className="w-full"
                  onClick={() => openModal(planos.title)}
                >
                  Escolher plano
                </Button>
              </Card>
            ))}
          </CarouselComponent>
        </div>
      </div>

      <Modal isOpen={modal.isOpen} onClose={closeModal}>
        <LeadForm selectedPlan={modal.plan}></LeadForm>
      </Modal>
    </section>
  );
}
