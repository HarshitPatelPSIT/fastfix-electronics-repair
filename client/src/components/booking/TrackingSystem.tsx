import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { formatDateTime, generateTrackingSteps, getStatusColor } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  CircleCheck,
  Wrench,
  Flask,
  CheckSquare,
  Loader2,
} from "lucide-react";

const TrackingSystem = () => {
  const { toast } = useToast();
  const [trackingId, setTrackingId] = useState("");
  const [searchTrackingId, setSearchTrackingId] = useState<string | null>(null);

  const {
    data: trackingData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: searchTrackingId ? [`/api/track/${searchTrackingId}`] : [],
    enabled: !!searchTrackingId,
  });

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a tracking ID",
        variant: "destructive",
      });
      return;
    }
    setSearchTrackingId(trackingId);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "received":
        return <CheckCircle2 className="text-white text-sm" />;
      case "diagnosed":
        return <CircleCheck className="text-white text-sm" />;
      case "in_progress":
        return <Wrench className="text-white text-sm" />;
      case "testing":
        return <Flask className="text-white text-sm" />;
      case "completed":
        return <CheckSquare className="text-white text-sm" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Track Your Repair</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleTrackSubmit} className="mb-8">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter your tracking ID"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Track"}
            </Button>
          </div>
        </form>

        {isLoading && (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
            <p>Loading tracking information...</p>
          </div>
        )}

        {isError && (
          <div className="text-center py-8 text-red-500">
            <p>Error: {(error as Error)?.message || "Failed to load tracking information"}</p>
          </div>
        )}

        {trackingData && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-bold">
                Repair Status:{" "}
                <span className="text-primary">
                  {trackingData.booking.status.charAt(0).toUpperCase() +
                    trackingData.booking.status.slice(1).replace(/_/g, " ")}
                </span>
              </h3>
              <p className="text-gray-600">
                Tracking ID: <span className="font-medium">{trackingData.booking.trackingId}</span>
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-4 inset-y-0 w-0.5 bg-gray-200"></div>

              {generateTrackingSteps(trackingData.booking.status).map((step, index) => (
                <div
                  key={step.key}
                  className="relative flex items-start mb-8 pl-8"
                >
                  <div
                    className={`absolute left-0 mt-1.5 -ml-3.5 h-7 w-7 rounded-full flex items-center justify-center ${
                      step.status === "upcoming"
                        ? "bg-gray-300"
                        : step.status === "current"
                        ? getStatusColor(step.key) + " animate-pulse"
                        : getStatusColor(step.key)
                    }`}
                  >
                    {getStatusIcon(step.key)}
                  </div>
                  <div className={step.status === "upcoming" ? "opacity-50" : ""}>
                    <h4 className="font-medium">{step.label}</h4>
                    {step.status !== "upcoming" && trackingData.statuses && (
                      <p className="text-sm text-gray-600">
                        {trackingData.statuses.find(
                          (s: any) => s.status === step.key
                        )
                          ? formatDateTime(
                              trackingData.statuses.find(
                                (s: any) => s.status === step.key
                              ).updatedAt
                            )
                          : "Pending"}
                      </p>
                    )}
                    {step.status !== "upcoming" && trackingData.statuses && (
                      <p className="text-sm text-gray-600 mt-1">
                        {trackingData.statuses.find(
                          (s: any) => s.status === step.key
                        )?.notes || "Status updated"}
                      </p>
                    )}
                    {step.status === "upcoming" && (
                      <p className="text-sm text-gray-600">Pending</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {trackingData.booking.status !== "completed" && (
              <div className="mt-6 text-center">
                <p className="text-gray-600 mb-2">
                  Estimated completion:{" "}
                  <span className="font-medium text-primary">
                    {new Date(
                      new Date(trackingData.booking.createdAt).getTime() + 2 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </p>
                <Button variant="outline">Request Update</Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrackingSystem;
