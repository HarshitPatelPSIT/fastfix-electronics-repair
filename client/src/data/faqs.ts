export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: 'How long do repairs usually take?',
    answer: 'Most smartphone and tablet repairs are completed within 1-2 hours. Computer repairs typically take 24-48 hours, and game console repairs can take 1-3 days depending on the issue complexity and parts availability.'
  },
  {
    question: 'Do you offer warranty on repairs?',
    answer: 'Yes, all our repairs come with a 90-day warranty covering parts and labor. If any issue arises related to the repair we\'ve performed, we\'ll fix it at no additional cost within the warranty period.'
  },
  {
    question: 'What happens if my device can\'t be repaired?',
    answer: 'If we determine that your device cannot be repaired, we\'ll only charge a diagnostic fee. We can also offer recommendations for replacement options and may provide trade-in services for certain devices.'
  },
  {
    question: 'Do I need an appointment for repairs?',
    answer: 'While walk-ins are welcome, we recommend booking an appointment through our online system to minimize wait times and ensure we have the necessary parts for your specific repair.'
  },
  {
    question: 'Will my data be safe during the repair?',
    answer: 'We take data privacy seriously. Our technicians are trained to handle devices without accessing personal data. However, we always recommend backing up your data before any repair service as a precaution.'
  }
];
