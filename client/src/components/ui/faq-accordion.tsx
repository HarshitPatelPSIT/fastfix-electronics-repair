import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { FAQ } from '@/data/faqs';

interface FAQAccordionProps {
  faqs: FAQ[];
}

const FAQAccordion = ({ faqs }: FAQAccordionProps) => {
  return (
    <div className="space-y-3">
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border border-neutral-medium rounded-md overflow-hidden">
            <AccordionTrigger className="flex justify-between items-center w-full p-4 text-left bg-neutral-light hover:bg-neutral-medium transition-colors">
              <span className="font-medium text-neutral-dark">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="p-4 bg-white">
              <p className="text-neutral-dark">
                {faq.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQAccordion;
