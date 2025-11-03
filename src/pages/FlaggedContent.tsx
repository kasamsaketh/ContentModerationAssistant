import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  XMarkIcon,
  EyeIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

// Mock flagged content data
const flaggedContent = [
  {
    id: 1,
    content: "I hate this stupid app and want to destroy everything about it. The developers are idiots and should die.",
    platform: "Forum Comment",
    timestamp: "2024-01-15 14:32:00",
    severity: "high",
    confidence: 0.95,
    flaggedTerms: ["hate", "stupid", "destroy", "idiots", "die"],
    category: "harmful_language",
    status: "pending"
  },
  {
    id: 2,
    content: "This product is trash garbage and a complete waste of money. Total scam.",
    platform: "Product Review",
    timestamp: "2024-01-15 13:45:00",
    severity: "medium",
    confidence: 0.78,
    flaggedTerms: ["trash", "garbage"],
    category: "negative_sentiment",
    status: "pending"
  },
  {
    id: 3,
    content: "I'm going to attack the competition and hurt their business strategy.",
    platform: "Chat Message",
    timestamp: "2024-01-15 12:15:00",
    severity: "medium",
    confidence: 0.65,
    flaggedTerms: ["attack", "hurt"],
    category: "potential_threat",
    status: "under_review"
  }
];

const FlaggedContent = () => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'under_review': return 'default';
      case 'approved': return 'success';
      case 'rejected': return 'destructive';
      default: return 'default';
    }
  };

  const handleAction = (id: number, action: 'approve' | 'reject') => {
    console.log(`${action} content with id: ${id}`);
    // Here you would typically make an API call to update the content status
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Flagged Content</h1>
            <p className="text-muted-foreground mt-2">
              Review and moderate content flagged by the AI system
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <EyeIcon className="h-4 w-4 mr-2" />
              Bulk Review
            </Button>
            <Button variant="hero">
              Process All
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        <Card className="p-4 bg-gradient-card border-border">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">All (23)</Button>
              <Button variant="outline" size="sm">High Risk (8)</Button>
              <Button variant="outline" size="sm">Medium Risk (12)</Button>
              <Button variant="outline" size="sm">Under Review (3)</Button>
            </div>
            <div className="ml-auto flex gap-2">
              <Button variant="ghost" size="sm">Sort by Date</Button>
              <Button variant="ghost" size="sm">Sort by Severity</Button>
            </div>
          </div>
        </Card>

        {/* Flagged Content List */}
        <div className="space-y-4">
          {flaggedContent.map((item) => (
            <Card key={item.id} className="p-6 bg-gradient-card border-border hover:shadow-primary transition-all duration-300">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant={getSeverityColor(item.severity)} className="flex items-center gap-1">
                      <ExclamationTriangleIcon className="h-3 w-3" />
                      {item.severity.toUpperCase()}
                    </Badge>
                    <Badge variant={getStatusColor(item.status)}>
                      {item.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {item.platform} • {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Confidence: {(item.confidence * 100).toFixed(1)}%
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 rounded-lg bg-background border border-border">
                  <Textarea
                    value={item.content}
                    readOnly
                    className="min-h-20 resize-none border-none bg-transparent p-0 focus:ring-0"
                  />
                </div>

                {/* Analysis Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-background border border-border">
                    <h4 className="text-sm font-medium text-foreground mb-2">Flagged Terms</h4>
                    <div className="flex flex-wrap gap-1">
                      {item.flaggedTerms.map((term, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          {term}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-background border border-border">
                    <h4 className="text-sm font-medium text-foreground mb-2">Category</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.category.replace('_', ' ').toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleAction(item.id, 'approve')}
                    >
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleAction(item.id, 'reject')}
                    >
                      <XMarkIcon className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <EyeIcon className="h-4 w-4 mr-2" />
                      View Context
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      Snooze
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center py-6">
          <Button variant="outline" size="lg">
            Load More Content
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FlaggedContent;