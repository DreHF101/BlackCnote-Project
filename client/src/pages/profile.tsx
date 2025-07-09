import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Bell, 
  Globe, 
  Camera, 
  Check, 
  AlertCircle,
  Star,
  TrendingUp,
  Calendar
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    timezone: "",
    bio: "",
    website: "",
    linkedin: "",
    twitter: ""
  });

  const [preferences, setPreferences] = useState({
    language: "en",
    currency: "USD",
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    twoFactorAuth: false,
    sessionTimeout: "24",
    theme: "dark"
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user profile
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["/api/users/1/profile"],
    onSuccess: (data) => {
      if (data) {
        setProfileData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          city: data.city || "",
          country: data.country || "",
          timezone: data.timezone || "",
          bio: data.bio || "",
          website: data.website || "",
          linkedin: data.linkedin || "",
          twitter: data.twitter || ""
        });
      }
    }
  });

  // Fetch user stats
  const { data: userStats } = useQuery({
    queryKey: ["/api/users/1/stats"],
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("PUT", "/api/users/1/profile", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/users/1/profile"] });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    }
  });

  // Update preferences mutation
  const updatePreferencesMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("PUT", "/api/users/1/preferences", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Preferences Updated",
        description: "Your preferences have been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update preferences",
        variant: "destructive",
      });
    }
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(profileData);
  };

  const handlePreferencesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferencesMutation.mutate(preferences);
  };

  const countries = [
    "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", 
    "Japan", "Singapore", "United Arab Emirates", "Switzerland", "Netherlands", "Sweden"
  ];

  const timezones = [
    "UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00", "UTC-08:00", "UTC-07:00",
    "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC-03:00", "UTC-02:00", "UTC-01:00",
    "UTC+00:00", "UTC+01:00", "UTC+02:00", "UTC+03:00", "UTC+04:00", "UTC+05:00",
    "UTC+06:00", "UTC+07:00", "UTC+08:00", "UTC+09:00", "UTC+10:00", "UTC+11:00", "UTC+12:00"
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "ja", name: "日本語" },
    { code: "zh", name: "中文" }
  ];

  const currencies = [
    "USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CHF", "SGD", "AED"
  ];

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Profile Settings</h1>
          <p className="text-xl text-gray-300">Manage your account information and preferences</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user?.avatar} alt={user?.firstName} />
                    <AvatarFallback className="bg-gradient-to-br from-amber-400 to-orange-600 text-white text-2xl">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full p-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1">
                  {user?.firstName} {user?.lastName}
                </h3>
                <p className="text-gray-400 mb-4">{user?.email}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Plan Type</span>
                    <Badge className="bg-gold-600/20 text-gold-400 border-gold-600/30">
                      {user?.planType || "Basic"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Member Since</span>
                    <span className="text-white text-sm">
                      {user?.createdAt ? new Date(user.createdAt).getFullYear() : "2024"}
                    </span>
                  </div>

                  {userStats && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Total Invested</span>
                        <span className="text-green-400 text-sm font-medium">
                          ${parseFloat(userStats.totalInvested || "0").toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Total Returns</span>
                        <span className="text-green-400 text-sm font-medium">
                          ${parseFloat(userStats.totalReturns || "0").toLocaleString()}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Verification Status */}
                <div className="mt-6 pt-4 border-t border-white/20">
                  <h4 className="text-sm font-medium text-white mb-3">Verification Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Email</span>
                      <Check className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Phone</span>
                      <AlertCircle className="h-4 w-4 text-yellow-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Identity</span>
                      <AlertCircle className="h-4 w-4 text-yellow-400" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white/10 border-white/20">
                <TabsTrigger value="personal" className="text-white">Personal Info</TabsTrigger>
                <TabsTrigger value="preferences" className="text-white">Preferences</TabsTrigger>
                <TabsTrigger value="security" className="text-white">Security</TabsTrigger>
                <TabsTrigger value="notifications" className="text-white">Notifications</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center">
                      <User className="h-6 w-6 mr-2 text-blue-400" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                          <Input
                            id="firstName"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                          <Input
                            id="lastName"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address" className="text-gray-300">Address</Label>
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city" className="text-gray-300">City</Label>
                          <Input
                            id="city"
                            value={profileData.city}
                            onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          />
                        </div>
                        <div>
                          <Label htmlFor="country" className="text-gray-300">Country</Label>
                          <Select value={profileData.country} onValueChange={(value) => setProfileData({ ...profileData, country: value })}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              {countries.map((country) => (
                                <SelectItem key={country} value={country} className="text-white hover:bg-slate-700">
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="bio" className="text-gray-300">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          placeholder="Tell us about yourself..."
                          rows={3}
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="website" className="text-gray-300">Website</Label>
                          <Input
                            id="website"
                            value={profileData.website}
                            onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                            placeholder="https://..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="linkedin" className="text-gray-300">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            value={profileData.linkedin}
                            onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                            placeholder="linkedin.com/in/..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="twitter" className="text-gray-300">Twitter</Label>
                          <Input
                            id="twitter"
                            value={profileData.twitter}
                            onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                            className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                            placeholder="@username"
                          />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={updateProfileMutation.isPending}
                      >
                        {updateProfileMutation.isPending ? "Updating..." : "Update Profile"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center">
                      <Globe className="h-6 w-6 mr-2 text-blue-400" />
                      Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePreferencesSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="language" className="text-gray-300">Language</Label>
                          <Select value={preferences.language} onValueChange={(value) => setPreferences({ ...preferences, language: value })}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              {languages.map((lang) => (
                                <SelectItem key={lang.code} value={lang.code} className="text-white hover:bg-slate-700">
                                  {lang.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="currency" className="text-gray-300">Preferred Currency</Label>
                          <Select value={preferences.currency} onValueChange={(value) => setPreferences({ ...preferences, currency: value })}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              {currencies.map((currency) => (
                                <SelectItem key={currency} value={currency} className="text-white hover:bg-slate-700">
                                  {currency}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="timezone" className="text-gray-300">Timezone</Label>
                        <Select value={profileData.timezone} onValueChange={(value) => setProfileData({ ...profileData, timezone: value })}>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            {timezones.map((tz) => (
                              <SelectItem key={tz} value={tz} className="text-white hover:bg-slate-700">
                                {tz}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="sessionTimeout" className="text-gray-300">Session Timeout (hours)</Label>
                        <Select value={preferences.sessionTimeout} onValueChange={(value) => setPreferences({ ...preferences, sessionTimeout: value })}>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white">
                            <SelectValue placeholder="Select timeout" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700">
                            <SelectItem value="1" className="text-white hover:bg-slate-700">1 hour</SelectItem>
                            <SelectItem value="8" className="text-white hover:bg-slate-700">8 hours</SelectItem>
                            <SelectItem value="24" className="text-white hover:bg-slate-700">24 hours</SelectItem>
                            <SelectItem value="168" className="text-white hover:bg-slate-700">1 week</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button 
                        type="submit" 
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={updatePreferencesMutation.isPending}
                      >
                        {updatePreferencesMutation.isPending ? "Updating..." : "Update Preferences"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center">
                      <Shield className="h-6 w-6 mr-2 text-blue-400" />
                      Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert className="bg-yellow-600/20 border-yellow-600/30">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-yellow-300">
                        For enhanced security features like 2FA, password changes, and login history, please visit the Security page.
                      </AlertDescription>
                    </Alert>

                    <div className="grid gap-4">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                          <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                        </div>
                        <Badge className={preferences.twoFactorAuth ? "bg-green-600/20 text-green-400 border-green-600/30" : "bg-gray-600/20 text-gray-400 border-gray-600/30"}>
                          {preferences.twoFactorAuth ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <h4 className="text-white font-medium">Email Verification</h4>
                          <p className="text-gray-400 text-sm">Your email address is verified</p>
                        </div>
                        <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                          Verified
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div>
                          <h4 className="text-white font-medium">Phone Verification</h4>
                          <p className="text-gray-400 text-sm">Verify your phone number for additional security</p>
                        </div>
                        <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">
                          Pending
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white flex items-center">
                      <Bell className="h-6 w-6 mr-2 text-blue-400" />
                      Notification Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePreferencesSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div>
                            <h4 className="text-white font-medium">Email Notifications</h4>
                            <p className="text-gray-400 text-sm">Receive notifications via email</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={preferences.emailNotifications}
                            onChange={(e) => setPreferences({ ...preferences, emailNotifications: e.target.checked })}
                            className="toggle toggle-primary"
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div>
                            <h4 className="text-white font-medium">SMS Notifications</h4>
                            <p className="text-gray-400 text-sm">Receive notifications via SMS</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={preferences.smsNotifications}
                            onChange={(e) => setPreferences({ ...preferences, smsNotifications: e.target.checked })}
                            className="toggle toggle-primary"
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div>
                            <h4 className="text-white font-medium">Marketing Emails</h4>
                            <p className="text-gray-400 text-sm">Receive marketing and promotional emails</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={preferences.marketingEmails}
                            onChange={(e) => setPreferences({ ...preferences, marketingEmails: e.target.checked })}
                            className="toggle toggle-primary"
                          />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={updatePreferencesMutation.isPending}
                      >
                        {updatePreferencesMutation.isPending ? "Updating..." : "Update Notification Settings"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}