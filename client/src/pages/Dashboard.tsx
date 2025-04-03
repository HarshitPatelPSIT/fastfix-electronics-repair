import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { formatDateTime, getStatusColor } from '@/lib/utils';

// Mock user for the dashboard
const mockUser = {
  id: 1,
  name: 'Demo User',
  email: 'demo@example.com',
  phone: '(123) 456-7890',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState('repairs');

  // Fetch user repairs
  const { data: userRepairs, isLoading } = useQuery({
    queryKey: [`/api/users/${mockUser.id}/repairs`],
    staleTime: 60000, // 1 minute
  });

  return (
    <div>
      {/* Dashboard Header */}
      <section className="bg-white py-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Avatar className="w-16 h-16 mr-4">
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-dark">Welcome, {mockUser.name}</h1>
                <p className="text-neutral-dark text-sm">Manage your repair orders and account settings</p>
              </div>
            </div>
            <Button asChild>
              <a href="/booking">Book New Repair</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="bg-neutral-light py-12">
        <div className="container mx-auto">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="repairs">My Repairs</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            {/* Repairs Tab */}
            <TabsContent value="repairs">
              <Card>
                <CardHeader>
                  <CardTitle>Your Repair Orders</CardTitle>
                  <CardDescription>View and track all your repair requests</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <p className="text-center py-4">Loading your repairs...</p>
                  ) : userRepairs && userRepairs.length > 0 ? (
                    <div className="space-y-4">
                      {userRepairs.map((repair: any) => {
                        const statusColors = getStatusColor(repair.status);
                        
                        return (
                          <div key={repair.id} className="border border-neutral-medium rounded-lg p-4">
                            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                              <div>
                                <h3 className="font-bold">{repair.deviceModel}</h3>
                                <p className="text-sm text-neutral-dark">{repair.trackingCode}</p>
                              </div>
                              <div className={`${statusColors.bg} ${statusColors.text} px-3 py-1 rounded-full text-sm font-medium mt-2 md:mt-0 inline-block`}>
                                {repair.status.charAt(0).toUpperCase() + repair.status.slice(1)}
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="font-medium">Issue</p>
                                <p>{repair.issueDescription}</p>
                              </div>
                              <div>
                                <p className="font-medium">Created</p>
                                <p>{formatDateTime(repair.createdAt)}</p>
                              </div>
                              <div>
                                <p className="font-medium">Estimated Completion</p>
                                <p>{repair.estimatedCompletion ? formatDateTime(repair.estimatedCompletion) : 'TBD'}</p>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <Button variant="outline" size="sm" asChild>
                                <a href={`/booking?track=${repair.trackingCode}`}>Track Details</a>
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-neutral-dark mb-4">You don't have any repair orders yet.</p>
                      <Button asChild>
                        <a href="/booking">Book Your First Repair</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={mockUser.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={mockUser.email} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" defaultValue={mockUser.phone} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="Enter your address" />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how we contact you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Repair Status Updates</h3>
                      <p className="text-sm text-neutral-dark">Receive notifications when your repair status changes</p>
                    </div>
                    <Switch id="repair-updates" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-neutral-dark">Receive updates via email</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">SMS Notifications</h3>
                      <p className="text-sm text-neutral-dark">Receive updates via text message</p>
                    </div>
                    <Switch id="sms-notifications" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Marketing Communications</h3>
                      <p className="text-sm text-neutral-dark">Receive special offers and promotions</p>
                    </div>
                    <Switch id="marketing-communications" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
