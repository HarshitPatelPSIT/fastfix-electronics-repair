import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const FAQ = () => {
  const { data: faqs, isLoading } = useQuery({
    queryKey: ['/api/faqs'],
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="mb-4 last:mb-0">
              <Skeleton className="h-8 w-full mb-2" />
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs && faqs.length > 0 ? (
            faqs.map((faq: any) => (
              <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <div className="py-4 text-center text-gray-500">
              No FAQs available at the moment.
            </div>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default FAQ;
