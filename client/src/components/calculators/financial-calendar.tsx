import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface FinancialDeadline {
  date: string;
  title: string;
  description: string;
  type: "tax" | "quarterly" | "annual" | "banking" | "payroll";
  priority: "high" | "medium" | "low";
  completed?: boolean;
}

export default function FinancialCalendar() {
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [deadlines, setDeadlines] = useState<FinancialDeadline[]>([
    {
      date: `${currentYear}-01-31`,
      title: "Issue 1099s to Contractors",
      description: "Deadline to issue 1099-NEC forms to independent contractors",
      type: "tax",
      priority: "high"
    },
    {
      date: `${currentYear}-02-28`,
      title: "File 1099s with IRS",
      description: "Submit 1099 forms to the IRS",
      type: "tax",
      priority: "high"
    },
    {
      date: `${currentYear}-03-15`,
      title: "Corporate Tax Returns",
      description: "C-Corp tax returns due (Form 1120)",
      type: "tax",
      priority: "high"
    },
    {
      date: `${currentYear}-04-15`,
      title: "Individual Tax Returns",
      description: "Personal income tax returns due (Form 1040)",
      type: "tax",
      priority: "high"
    },
    {
      date: `${currentYear}-04-15`,
      title: "Q1 Estimated Tax Payments",
      description: "First quarter estimated tax payments due",
      type: "quarterly",
      priority: "high"
    },
    {
      date: `${currentYear}-05-15`,
      title: "Partnership Tax Returns",
      description: "Partnership tax returns due (Form 1065)",
      type: "tax",
      priority: "high"
    },
    {
      date: `${currentYear}-06-15`,
      title: "Q2 Estimated Tax Payments",
      description: "Second quarter estimated tax payments due",
      type: "quarterly",
      priority: "high"
    },
    {
      date: `${currentYear}-09-15`,
      title: "Q3 Estimated Tax Payments",
      description: "Third quarter estimated tax payments due",
      type: "quarterly",
      priority: "high"
    },
    {
      date: `${currentYear}-10-15`,
      title: "Extended Tax Returns",
      description: "Extended individual tax returns due",
      type: "tax",
      priority: "high"
    },
    {
      date: `${currentYear}-12-31`,
      title: "Year-End Tax Planning",
      description: "Final day for most tax planning strategies",
      type: "annual",
      priority: "medium"
    },
    {
      date: `${currentYear + 1}-01-15`,
      title: "Q4 Estimated Tax Payments",
      description: "Fourth quarter estimated tax payments due",
      type: "quarterly",
      priority: "high"
    }
  ]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDeadlinesForMonth = (month: number) => {
    return deadlines.filter(deadline => {
      const deadlineDate = new Date(deadline.date);
      return deadlineDate.getMonth() === month;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const toggleCompleted = (index: number) => {
    const updatedDeadlines = [...deadlines];
    updatedDeadlines[index].completed = !updatedDeadlines[index].completed;
    setDeadlines(updatedDeadlines);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "tax": return "🏛️";
      case "quarterly": return "📅";
      case "annual": return "📊";
      case "banking": return "🏦";
      case "payroll": return "💰";
      default: return "📋";
    }
  };

  const currentMonthDeadlines = getDeadlinesForMonth(selectedMonth);
  const upcomingDeadlines = deadlines
    .filter(deadline => {
      const deadlineDate = new Date(deadline.date);
      const today = new Date();
      const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
      return deadlineDate >= today && deadlineDate <= thirtyDaysFromNow && !deadline.completed;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Financial Calendar</h2>
        <p className="text-gray-600">
          Track important tax deadlines, quarterly payments, and financial milestones throughout the year.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.length > 0 ? (
                upcomingDeadlines.map((deadline, index) => {
                  const deadlineDate = new Date(deadline.date);
                  const today = new Date();
                  const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={index} className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{deadline.title}</p>
                          <p className="text-xs text-gray-600 mt-1">{deadline.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {daysUntil === 0 ? "Today" : daysUntil === 1 ? "Tomorrow" : `${daysUntil} days`}
                            </Badge>
                            <span className="text-xs">{getTypeIcon(deadline.type)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-sm">No upcoming deadlines in the next 30 days</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Month Navigation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Select Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {months.map((month, index) => (
                <Button
                  key={index}
                  variant={selectedMonth === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMonth(index)}
                  className="text-xs"
                >
                  {month.slice(0, 3)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start">
                📧 Set Email Reminders
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                📱 Add to Phone Calendar
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                📄 Download PDF Calendar
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                🔔 Schedule Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Deadlines */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {months[selectedMonth]} {currentYear} - Financial Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentMonthDeadlines.length > 0 ? (
              currentMonthDeadlines.map((deadline, index) => {
                const actualIndex = deadlines.findIndex(d => d === deadline);
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 transition-opacity ${
                      deadline.completed ? 'opacity-60 bg-gray-50 border-gray-300' : 'bg-white border-primary'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-lg">{getTypeIcon(deadline.type)}</span>
                          <h3 className={`font-semibold ${deadline.completed ? 'line-through' : ''}`}>
                            {deadline.title}
                          </h3>
                          <Badge className={getPriorityColor(deadline.priority)}>
                            {deadline.priority}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{deadline.description}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium">
                            📅 {new Date(deadline.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCompleted(actualIndex)}
                        className={deadline.completed ? 'text-green-600' : 'text-gray-400'}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No financial deadlines for {months[selectedMonth]}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}