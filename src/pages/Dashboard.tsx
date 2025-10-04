import { useState } from 'react';
import { BackgroundStars } from '@/components/BackgroundStars';
import { AsteroidInputPanel } from '@/components/AsteroidInputPanel';
import { EarthVisualization } from '@/components/EarthVisualization';
import { ResultsPanel } from '@/components/ResultsPanel';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AsteroidParams {
  size: number;
  speed: number;
  angle: number;
  latitude: number;
  longitude: number;
}

interface ImpactResults {
  craterDiameter: number;
  blastRadius: number;
  firestormArea: number;
  casualties: number;
  riskLevel: 'Low' | 'Medium' | 'Severe' | 'Catastrophic';
}

// Removed local calculation function - using backend instead

const Dashboard = () => {
  const [results, setResults] = useState<ImpactResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [impactData, setImpactData] = useState<{
    latitude: number;
    longitude: number;
    craterRadius: number;
  } | null>(null);

  const handleSimulate = async (params: AsteroidParams) => {
    setIsCalculating(true);
    toast.info('Initializing impact simulation...', {
      description: 'Using NASA physics models and real data...',
    });

    try {
      const { data, error } = await supabase.functions.invoke('calculate-impact', {
        body: params,
      });

      if (error) throw error;

      const calculatedResults = data as ImpactResults;
      setResults(calculatedResults);
      setImpactData({
        latitude: params.latitude,
        longitude: params.longitude,
        craterRadius: calculatedResults.craterDiameter,
      });
      setIsCalculating(false);

      toast.success('Simulation Complete', {
        description: `Risk Level: ${calculatedResults.riskLevel} | Using real NASA data`,
      });
    } catch (error) {
      console.error('Simulation error:', error);
      setIsCalculating(false);
      toast.error('Simulation Failed', {
        description: 'Please try again',
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundStars />

      {/* Header */}
      <header className="relative z-20 border-b border-primary/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-display font-bold text-glow-primary">
              MISSION CONTROL
            </h1>
            <Link to="/real-physics">
              <Button variant="outline" size="sm">
                Real Physics
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Panel - Input */}
          <div className="lg:col-span-3">
            <AsteroidInputPanel onSimulate={handleSimulate} />
          </div>

          {/* Center - 3D Visualization */}
          <div className="lg:col-span-6 glassmorphic rounded-xl border border-primary/20 overflow-hidden h-[600px]">
            <EarthVisualization impactData={impactData} />
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-3">
            <ResultsPanel results={results} isCalculating={isCalculating} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
