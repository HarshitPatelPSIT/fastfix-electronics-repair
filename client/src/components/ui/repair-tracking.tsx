import { useState } from 'react';
import { 
  CheckCircle2, 
  Search, 
  Settings, 
  AlertCircle,
  ClipboardCheck,
  ClipboardList
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { formatDateTime } from '@/lib/utils';

interface TrackingProps {
  initialTrackingId?: string;
}

const RepairTracking = ({ initialTrackingId = '' }: TrackingProps) => {
  const [trackingId, setTrackingId] = useState(initialTrackingId);
  const { toast } = useToast();

  const { 
    data, 
    isLoading, 
    error, 
    refetch,
    isSuccess
  } = useQuery({
    queryKey: [`/api/repairs/track/${trackingId}`],
    enabled: false // Don't fetch automatically
  });

  const handleTrack = async () => {
    if (!trackingId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a tracking code",
        variant: "destructive"
      });
      return;
    }

    await refetch();
  };

  const getStepStatus = (step: string) => {
    if (!data?.repair) return 'incomplete';
    
    const statuses = ['received', 'diagnosed', 'repairing', 'ready'];
    const currentIndex = statuses.indexOf(data.repair.status);
    const stepIndex = statuses.indexOf(step);
    
    if (stepIndex < currentIndex) return 'complete';
    if (stepIndex === currentIndex) return 'current';
    return 'incomplete';
  };

  const renderProgressSteps = () => {
    const steps = [
      { key: 'received', label: 'Received' },
      { key: 'diagnosed', label: 'Diagnosed' },
      { key: 'repairing', label: 'Repairing' },
      { key: 'ready', label: 'Ready' }
    ];
    
    return (
      <div className="flex mb-2">
        {steps.map((step, index) => {
          const status = getStepStatus(step.key);
          
          return (
            <div key={step.key} className="w-1/4 text-center">
              <div className="relative">
                <div className={`h-1 absolute left-0 right-0 top-3 ${
                  status === 'complete' || status === 'current' ? 'bg-success' : 'bg-neutral-medium'
                }`}></div>
                <div className={`h-6 w-6 rounded-full mx-auto flex items-center justify-center relative z-10 ${
                  status === 'complete' ? 'bg-success' : 
                  status === 'current' ? 'bg-primary' : 
                  'bg-neutral-medium'
                }`}>
                  {status === 'complete' ? (
                    <CheckCircle2 className="text-white" size={14} />
                  ) : (
                    <span className="text-white text-xs">{index + 1}</span>
                  )}
                </div>
              </div>
              <p className={`text-xs mt-1 ${
                status === 'current' ? 'text-primary font-medium' : 'text-neutral-dark'
              }`}>{step.label}</p>
            </div>
          );
        })}
      </div>
    );
  };

  const renderProgressDetails = () => {
    if (!data?.progress || data.progress.length === 0) return null;
    
    const sortedProgress = [...data.progress].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    return (
      <div className="mt-6 space-y-3">
        {sortedProgress.map((item, index) => {
          let icon;
          if (item.status === 'received') icon = <ClipboardCheck className="text-success" />;
          else if (item.status === 'diagnosed') icon = <Search className="text-success" />;
          else if (item.status === 'repairing') icon = <Settings className="text-primary" />;
          else if (item.status === 'ready') icon = <CheckCircle2 className="text-success" />;
          else icon = <AlertCircle className="text-neutral-dark" />;
          
          return (
            <div key={index} className="flex items-start">
              <div className={`bg-opacity-10 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 ${
                item.status === 'repairing' ? 'bg-primary' : 'bg-success'
              }`}>
                {icon}
              </div>
              <div>
                <p className={`text-sm font-medium ${
                  item.status === 'repairing' ? 'text-primary' : 'text-neutral-dark'
                }`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  {item.notes ? `: ${item.notes}` : ''}
                </p>
                <p className="text-xs text-neutral-dark">{formatDateTime(item.timestamp)}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="flex items-center mb-4">
        <Input
          type="text"
          id="tracking-id"
          placeholder="Enter your repair ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="rounded-r-none"
        />
        <Button 
          id="track-repair-btn" 
          className="rounded-l-none"
          onClick={handleTrack}
          disabled={isLoading}
        >
          Track
        </Button>
      </div>
      
      {isLoading && <p className="text-center py-4">Loading tracking information...</p>}
      
      {error && (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center text-error mb-2">
            <AlertCircle className="mr-2" size={18} />
            <h4 className="font-bold">Tracking Not Found</h4>
          </div>
          <p className="text-sm text-neutral-dark">
            We couldn't find a repair with that tracking code. Please check the code and try again.
          </p>
        </div>
      )}

      {isSuccess && data?.repair && (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-lg text-neutral-dark">Repair #{data.repair.trackingCode}</h4>
            <span className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {data.repair.status.charAt(0).toUpperCase() + data.repair.status.slice(1)}
            </span>
          </div>
          
          <div className="relative pb-4">
            {renderProgressSteps()}
            {renderProgressDetails()}
          </div>
          
          <div className="mt-4 pt-4 border-t border-neutral-medium">
            <h5 className="font-medium text-neutral-dark mb-2">Repair Details</h5>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-neutral-dark">Device:</span>
              <span className="font-medium text-neutral-dark">{data.repair.deviceModel}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-neutral-dark">Issue:</span>
              <span className="font-medium text-neutral-dark">{data.repair.issueDescription}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-dark">Estimated Completion:</span>
              <span className="font-medium text-neutral-dark">
                {data.repair.estimatedCompletion ? formatDateTime(data.repair.estimatedCompletion) : 'To be determined'}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RepairTracking;
