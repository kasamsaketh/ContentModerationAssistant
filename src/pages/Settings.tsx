import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  CogIcon, 
  ShieldCheckIcon,
  BoltIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";

const Settings = () => {
  const [moderationMode, setModerationMode] = useState<'strict' | 'casual'>('strict');
  const [autoModeration, setAutoModeration] = useState(true);
  const [realTimeProcessing, setRealTimeProcessing] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Configure your content moderation preferences and system behavior
            </p>
          </div>
          <Button variant="hero">
            Save Changes
          </Button>
        </div>

        {/* Moderation Settings */}
        <Card className="p-6 bg-gradient-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-primary shadow-primary">
              <ShieldCheckIcon className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-card-foreground">
              Moderation Settings
            </h2>
          </div>

          <div className="space-y-6">
            {/* Moderation Mode */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-foreground">Moderation Mode</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose how strictly content should be moderated
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Card 
                  className={`p-4 cursor-pointer transition-all duration-200 ${
                    moderationMode === 'strict' 
                      ? 'border-primary bg-primary/10 shadow-primary' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setModerationMode('strict')}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gradient-warning shadow-warning">
                      <ExclamationTriangleIcon className="h-4 w-4 text-warning-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Strict Mode</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Flag anything potentially harmful, including borderline content
                      </p>
                      <Badge variant="warning" className="mt-2">More False Positives</Badge>
                    </div>
                  </div>
                </Card>
                
                <Card 
                  className={`p-4 cursor-pointer transition-all duration-200 ${
                    moderationMode === 'casual' 
                      ? 'border-primary bg-primary/10 shadow-primary' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setModerationMode('casual')}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gradient-success shadow-success">
                      <ShieldCheckIcon className="h-4 w-4 text-success-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Casual Mode</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Only flag clearly harmful or abusive content
                      </p>
                      <Badge variant="success" className="mt-2">Fewer False Positives</Badge>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Confidence Threshold */}
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-foreground">
                  Confidence Threshold: {confidenceThreshold}%
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Minimum confidence level required to flag content
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">50%</span>
                <input
                  type="range"
                  min="50"
                  max="99"
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                  className="flex-1 h-2 bg-background rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-muted-foreground">99%</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Current: {confidenceThreshold < 70 ? 'More sensitive' : confidenceThreshold < 85 ? 'Balanced' : 'Less sensitive'}
              </p>
            </div>
          </div>
        </Card>

        {/* Automation Settings */}
        <Card className="p-6 bg-gradient-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-primary shadow-primary">
              <BoltIcon className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-card-foreground">
              Automation Settings
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between py-3">
              <div>
                <Label className="text-sm font-medium text-foreground">Auto-Moderation</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Automatically moderate content without manual review
                </p>
              </div>
              <Switch 
                checked={autoModeration}
                onCheckedChange={setAutoModeration}
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <Label className="text-sm font-medium text-foreground">Real-Time Processing</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Process content as it's submitted in real-time
                </p>
              </div>
              <Switch 
                checked={realTimeProcessing}
                onCheckedChange={setRealTimeProcessing}
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <Label className="text-sm font-medium text-foreground">Notifications</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Receive notifications for flagged content
                </p>
              </div>
              <Switch 
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
          </div>
        </Card>

        {/* API Configuration */}
        <Card className="p-6 bg-gradient-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-primary shadow-primary">
              <CogIcon className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-card-foreground">
              API Configuration
            </h2>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">API Endpoint</Label>
                <Input 
                  value="https://api.contentmoderator.com/v1"
                  readOnly
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Rate Limit</Label>
                <Input 
                  value="1000 requests/hour"
                  readOnly
                  className="bg-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">API Key</Label>
              <div className="flex gap-2">
                <Input 
                  type="password"
                  value="cm_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  readOnly
                  className="bg-background"
                />
                <Button variant="outline">Regenerate</Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Webhook URL</Label>
              <Input 
                placeholder="https://your-app.com/webhooks/moderation"
                className="bg-background"
              />
              <p className="text-xs text-muted-foreground">
                Optional: Receive real-time notifications when content is flagged
              </p>
            </div>
          </div>
        </Card>

        {/* Advanced Settings */}
        <Card className="p-6 bg-gradient-card border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-warning shadow-warning">
              <ClockIcon className="h-5 w-5 text-warning-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-card-foreground">
              Advanced Settings
            </h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Custom Rules</Label>
              <Textarea 
                placeholder="Define custom moderation rules using JSON format..."
                className="min-h-24 bg-background"
              />
              <p className="text-xs text-muted-foreground">
                Advanced users can define custom moderation rules
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Batch Size</Label>
                <Input 
                  type="number"
                  value={100}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Timeout (seconds)</Label>
                <Input 
                  type="number"
                  value={30}
                  className="bg-background"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Save Changes */}
        <div className="flex justify-end gap-3 pt-6 border-t border-border">
          <Button variant="outline">
            Reset to Defaults
          </Button>
          <Button variant="hero">
            Save All Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;