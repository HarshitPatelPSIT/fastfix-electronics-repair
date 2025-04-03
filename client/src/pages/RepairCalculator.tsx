import RepairCalculator from '@/components/ui/repair-calculator';
import { motion } from 'framer-motion';

const RepairCalculatorPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-3">Repair Cost Estimator</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get an instant estimate for your device repair. Answer a few simple questions about your 
            device and the issue, and we'll provide you with an approximate cost and timeframe.
          </p>
        </div>

        <RepairCalculator />

        <div className="mt-12 bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">About Our Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium">Transparent Pricing</h3>
              <p className="text-sm text-muted-foreground">
                Our estimates include both parts and labor costs with no hidden fees or surprises.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">No-Fix, No-Fee Guarantee</h3>
              <p className="text-sm text-muted-foreground">
                If we can't fix your device, you don't pay for the repair attempt.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Price Match Promise</h3>
              <p className="text-sm text-muted-foreground">
                Found a lower price elsewhere? We'll match any legitimate quote from an authorized repair service.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RepairCalculatorPage;