import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRightIcon, ShieldCheckIcon, CpuChipIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="AI-powered content moderation visualization" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 rounded-full bg-gradient-primary shadow-primary">
                <ShieldCheckIcon className="h-12 w-12 text-primary-foreground" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 animate-slide-in">
              Advanced Content
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Moderation Assistant
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Intelligent, context-aware content moderation powered by advanced AI. 
              Detect harmful content while understanding context to minimize false positives.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/demo">
                <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                  Try Live Demo
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced AI-powered moderation with explainable decisions and adaptive learning
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-gradient-card border-border hover:shadow-primary transition-all duration-300">
              <div className="p-3 rounded-lg bg-gradient-primary w-fit mb-6 shadow-primary">
                <CpuChipIcon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4">
                Context-Aware AI
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Advanced NLP models understand context and nuance to reduce false positives while catching harmful content.
              </p>
            </Card>
            
            <Card className="p-8 bg-gradient-card border-border hover:shadow-primary transition-all duration-300">
              <div className="p-3 rounded-lg bg-gradient-warning w-fit mb-6 shadow-warning">
                <ShieldCheckIcon className="h-8 w-8 text-warning-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4">
                Explainable Decisions
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Every moderation decision comes with clear explanations showing why content was flagged.
              </p>
            </Card>
            
            <Card className="p-8 bg-gradient-card border-border hover:shadow-primary transition-all duration-300">
              <div className="p-3 rounded-lg bg-gradient-success w-fit mb-6 shadow-success">
                <ChartBarIcon className="h-8 w-8 text-success-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4">
                Adaptive Learning
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                System learns from moderator feedback to continuously improve accuracy and reduce manual work.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to revolutionize your content moderation?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the power of AI-driven content moderation with real-time analysis and comprehensive insights.
          </p>
          <Link to="/demo">
            <Button variant="hero" size="lg" className="text-lg px-12 py-4">
              Get Started Now
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;