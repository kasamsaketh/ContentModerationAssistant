import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ExclamationTriangleIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

// Mock moderation engine
const mockModerationEngine = (text: string) => {
  const harmfulKeywords = [
    'hate', 'kill', 'die', 'stupid', 'idiot', 'loser', 'trash', 'garbage',
    'attack', 'destroy', 'hurt', 'pain', 'violence', 'threat'
  ];
  
  const flaggedWords = harmfulKeywords.filter(word => 
    text.toLowerCase().includes(word.toLowerCase())
  );
  
  const severity = flaggedWords.length > 2 ? 'high' : flaggedWords.length > 0 ? 'medium' : 'low';
  const isHarmful = flaggedWords.length > 0;
  
  return {
    isHarmful,
    severity,
    flaggedWords,
    confidence: isHarmful ? Math.min(0.95, 0.6 + (flaggedWords.length * 0.15)) : 0.05,
    explanation: isHarmful 
      ? `Content flagged due to potentially harmful language: ${flaggedWords.join(', ')}`
      : 'Content appears safe with no harmful language detected',
    category: isHarmful ? 'harmful_language' : 'safe_content'
  };
};

const Demo = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeText = useCallback(async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const analysis = mockModerationEngine(inputText);
    setResult(analysis);
    setIsAnalyzing(false);
  }, [inputText]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      default: return 'success';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <XCircleIcon className="h-5 w-5" />;
      case 'medium': return <ExclamationTriangleIcon className="h-5 w-5" />;
      default: return <CheckCircleIcon className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Real-Time Content Moderation Demo
            </h1>
            <p className="text-muted-foreground mt-2">
              Type any text to see instant AI-powered moderation analysis
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6 bg-gradient-card border-border">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">
              Input Text for Analysis
            </h2>
            
            <Textarea
              placeholder="Type your message here to see real-time moderation analysis..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-32 mb-4 resize-none bg-background border-border"
            />
            
            <div className="flex gap-3">
              <Button 
                onClick={analyzeText}
                disabled={!inputText.trim() || isAnalyzing}
                variant="hero"
                className="flex-1"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Content'}
              </Button>
              
              <Button 
                onClick={() => {
                  setInputText("");
                  setResult(null);
                }}
                variant="outline"
              >
                Clear
              </Button>
            </div>
          </Card>

          {/* Results Section */}
          <Card className="p-6 bg-gradient-card border-border">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">
              Moderation Analysis
            </h2>
            
            {!result && !isAnalyzing && (
              <div className="text-center py-12 text-muted-foreground">
                <ExclamationTriangleIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter text above and click "Analyze Content" to see results</p>
              </div>
            )}
            
            {isAnalyzing && (
              <div className="text-center py-12">
                <div className="animate-pulse-glow mb-4">
                  <div className="h-12 w-12 mx-auto rounded-full bg-gradient-primary"></div>
                </div>
                <p className="text-muted-foreground">Analyzing content with AI...</p>
              </div>
            )}
            
            {result && (
              <div className="space-y-4 animate-slide-in">
                {/* Overall Status */}
                <div className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border">
                  <Badge 
                    variant={result.isHarmful ? "destructive" : "default"}
                    className="flex items-center gap-2"
                  >
                    {getSeverityIcon(result.severity)}
                    {result.isHarmful ? 'FLAGGED' : 'SAFE'}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Confidence: {(result.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                
                {/* Explanation */}
                <div className="p-4 rounded-lg bg-background border border-border">
                  <h3 className="font-medium text-foreground mb-2">Explanation</h3>
                  <p className="text-sm text-muted-foreground">{result.explanation}</p>
                </div>
                
                {/* Flagged Words */}
                {result.flaggedWords.length > 0 && (
                  <div className="p-4 rounded-lg bg-background border border-border">
                    <h3 className="font-medium text-foreground mb-2">Flagged Terms</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.flaggedWords.map((word: string, index: number) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          {word}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Category & Severity */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-background border border-border">
                    <h3 className="font-medium text-foreground mb-1">Category</h3>
                    <p className="text-sm text-muted-foreground">{result.category.replace('_', ' ')}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-background border border-border">
                    <h3 className="font-medium text-foreground mb-1">Severity</h3>
                    <Badge variant={getSeverityColor(result.severity)} className="text-xs">
                      {result.severity.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Example Texts */}
        <Card className="mt-8 p-6 bg-gradient-card border-border">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">
            Try These Examples
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="text-left h-auto p-4 flex-col items-start"
              onClick={() => setInputText("I really enjoyed this movie! Great storyline and acting.")}
            >
              <span className="font-medium text-success">Safe Content</span>
              <span className="text-sm text-muted-foreground mt-1">
                Positive movie review
              </span>
            </Button>
            
            <Button
              variant="outline"
              className="text-left h-auto p-4 flex-col items-start"
              onClick={() => setInputText("This is stupid and makes me want to attack someone.")}
            >
              <span className="font-medium text-warning">Medium Risk</span>
              <span className="text-sm text-muted-foreground mt-1">
                Contains aggressive language
              </span>
            </Button>
            
            <Button
              variant="outline"
              className="text-left h-auto p-4 flex-col items-start"
              onClick={() => setInputText("I hate everyone and want to hurt people and destroy things.")}
            >
              <span className="font-medium text-destructive">High Risk</span>
              <span className="text-sm text-muted-foreground mt-1">
                Multiple harmful terms
              </span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Demo;