import { AlertCircle, Flame, Mountain, Users } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

interface ImpactResults {
  craterDiameter: number;
  blastRadius: number;
  firestormArea: number;
  casualties: number;
  riskLevel: 'Low' | 'Medium' | 'Severe' | 'Catastrophic';
}

interface ResultsPanelProps {
  results: ImpactResults | null;
  isCalculating: boolean;
}

const getRiskColor = (level: string) => {
  switch (level) {
    case 'Low':
      return 'text-accent';
    case 'Medium':
      return 'text-warning';
    case 'Severe':
      return 'text-destructive';
    case 'Catastrophic':
      return 'text-destructive';
    default:
      return 'text-muted-foreground';
  }
};

const getRiskProgress = (level: string) => {
  switch (level) {
    case 'Low':
      return 25;
    case 'Medium':
      return 50;
    case 'Severe':
      return 75;
    case 'Catastrophic':
      return 100;
    default:
      return 0;
  }
};

export const ResultsPanel = ({ results, isCalculating }: ResultsPanelProps) => {
  if (isCalculating) {
    return (
      <div className="glassmorphic neon-border rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-primary animate-pulse" />
          <h2 className="text-xl font-display font-bold text-glow-primary">
            Calculating Impact...
          </h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-primary/20 rounded mb-2"></div>
              <div className="h-8 bg-primary/10 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="glassmorphic neon-border rounded-xl p-6 flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto opacity-50" />
          <p className="text-muted-foreground">
            Configure parameters and run simulation to see results
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glassmorphic neon-border rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <AlertCircle className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-display font-bold text-glow-primary">
          Impact Analysis
        </h2>
      </div>

      {/* Risk Level Card */}
      <Card className="bg-gradient-impact p-4 border-destructive/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-destructive-foreground">Risk Level</span>
          <span className={`text-2xl font-display font-bold ${getRiskColor(results.riskLevel)}`}>
            {results.riskLevel.toUpperCase()}
          </span>
        </div>
        <Progress value={getRiskProgress(results.riskLevel)} className="h-2" />
      </Card>

      {/* Metrics */}
      <div className="space-y-4">
        {/* Crater */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mountain className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Crater Diameter</span>
            </div>
            <span className="text-xl font-display font-bold text-primary">
              {results.craterDiameter.toFixed(2)} km
            </span>
          </div>
          <Progress value={Math.min((results.craterDiameter / 10) * 100, 100)} className="h-1" />
        </div>

        {/* Blast Radius */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              <span className="text-sm font-medium">Blast Radius</span>
            </div>
            <span className="text-xl font-display font-bold text-warning">
              {results.blastRadius.toFixed(1)} km
            </span>
          </div>
          <Progress value={Math.min((results.blastRadius / 100) * 100, 100)} className="h-1" />
        </div>

        {/* Firestorm */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-destructive" />
              <span className="text-sm font-medium">Firestorm Area</span>
            </div>
            <span className="text-xl font-display font-bold text-destructive">
              {results.firestormArea.toFixed(0)} km²
            </span>
          </div>
          <Progress value={Math.min((results.firestormArea / 10000) * 100, 100)} className="h-1" />
        </div>

        {/* Casualties */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-destructive" />
              <span className="text-sm font-medium">Estimated Casualties</span>
            </div>
            <span className="text-xl font-display font-bold text-destructive">
              {results.casualties.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Scientific Insight */}
      <Card className="bg-card/50 border-primary/30 p-4 mt-6">
        <h3 className="text-sm font-display font-bold text-primary mb-2">Scientific Insight</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {results.riskLevel === 'Catastrophic' &&
            "This impact would cause global devastation comparable to the Chicxulub event that ended the dinosaurs. Immediate planetary defense measures required."}
          {results.riskLevel === 'Severe' &&
            "Continental-scale destruction expected. Multiple countries would be affected. International coordination essential for mitigation."}
          {results.riskLevel === 'Medium' &&
            "Regional devastation likely. Similar to the Tunguska event of 1908. Early warning systems critical."}
          {results.riskLevel === 'Low' &&
            "Localized damage expected. Comparable to the 2013 Chelyabinsk meteor. Monitoring and evacuation protocols recommended."}
        </p>
      </Card>
    </div>
  );
};
