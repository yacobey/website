import { useState } from "react";
import Dashboard from "@/components/dashboard";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail) {
      setIsAuthenticated(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="py-12">
        {!isAuthenticated ? (
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>Access Your Dashboard</CardTitle>
                  <CardDescription>
                    Enter the email address used for your purchase to access your personalized learning dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Access Dashboard
                    </Button>
                  </form>
                  
                  <div className="mt-6 text-center text-sm text-gray-600">
                    <p>Don't have access yet?</p>
                    <Button variant="link" asChild>
                      <a href="/digital-guides">Purchase Digital Guidelines</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Dashboard userEmail={userEmail} />
        )}
      </div>
      
      <Footer />
    </div>
  );
}