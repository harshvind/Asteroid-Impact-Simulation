import { Button } from '@/components/ui/button';
import { BackgroundStars } from '@/components/BackgroundStars';
import { Rocket, Target, Satellite } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundStars />
      
      {/* Parallel Lines for Rocket Path */}
      <div className="absolute top-6 left-0 w-full h-16 z-10 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </div>

      {/* Animated Rocket */}
      <div className="absolute top-8 left-0 w-full overflow-hidden z-20 pointer-events-none">
        <div className="animate-[slide-in-right_15s_linear_infinite]">
          <span className="text-5xl inline-block rotate-45">🚀</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-24">
        <div className="text-center max-w-5xl mx-auto space-y-8">
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-display font-black text-glow-primary leading-tight">
            ASTEROID IMPACT
            <br />
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              SIMULATION
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-foreground/90 font-body max-w-3xl mx-auto leading-relaxed">
            Simulate asteroid impacts, visualize global effects in real-time,
            and explore planetary defense strategies with scientific accuracy
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link to="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-neon hover:shadow-glow-primary transition-all duration-300 animate-pulse-glow font-display font-bold text-lg px-8 py-6"
              >
                <Rocket className="w-6 h-6 mr-2" />
                START SIMULATION
              </Button>
            </Link>
            <Link to="/game">
              <Button
                size="lg"
                variant="secondary"
                className="font-display font-bold text-lg px-8 py-6 hover:shadow-glow-secondary transition-all duration-300"
              >
                <Target className="w-6 h-6 mr-2" />
                SIMULATION GAME
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto">
            <Link to="/real-physics" className="block">
              <div className="glassmorphic p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-bold mb-2">Real Physics</h3>
                <p className="text-sm text-muted-foreground">
                  Scientific calculations based on NASA's Earth Impact Effects Program
                </p>
              </div>
            </Link>

            <Link to="/visualization-3d" className="block">
              <div className="glassmorphic p-6 rounded-xl border border-secondary/20 hover:border-secondary/50 transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-lg font-display font-bold mb-2">3D Visualization</h3>
                <p className="text-sm text-muted-foreground">
                  Interactive Earth globe with realistic impact overlays and effects
                </p>
              </div>
            </Link>

            <Link to="/nasa-data" className="block">
              <div className="glassmorphic p-6 rounded-xl border border-accent/20 hover:border-accent/50 transition-all duration-300 cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                  <Satellite className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-display font-bold mb-2">NASA Data</h3>
                <p className="text-sm text-muted-foreground">
                  Access real Near-Earth Object data and historical impact events
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>
    </div>
  );
};

export default LandingPage;
