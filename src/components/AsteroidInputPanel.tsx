import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Rocket, Target, Gauge, MapPin } from 'lucide-react';

interface AsteroidParams {
  size: number;
  speed: number;
  angle: number;
  latitude: number;
  longitude: number;
}

interface AsteroidInputPanelProps {
  onSimulate: (params: AsteroidParams) => void;
}

export const AsteroidInputPanel = ({ onSimulate }: AsteroidInputPanelProps) => {
  const [params, setParams] = useState<AsteroidParams>({
    size: 100,
    speed: 20,
    angle: 45,
    latitude: 40.7128,
    longitude: -74.006,
  });

  const handleSimulate = () => {
    onSimulate(params);
  };

  return (
    <div className="glassmorphic neon-border rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Rocket className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-display font-bold text-glow-primary">
          Asteroid Parameters
        </h2>
      </div>

      {/* Size */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Target className="w-4 h-4 text-accent" />
            Diameter (m)
          </Label>
          <span className="text-primary font-mono text-sm">{params.size}m</span>
        </div>
        <Slider
          value={[params.size]}
          onValueChange={(value) => setParams({ ...params, size: value[0] })}
          min={10}
          max={1000}
          step={10}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">
          {params.size < 100 && "Small asteroid - local damage"}
          {params.size >= 100 && params.size < 500 && "Medium asteroid - regional impact"}
          {params.size >= 500 && "Large asteroid - continental threat"}
        </p>
      </div>

      {/* Speed */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Gauge className="w-4 h-4 text-accent" />
            Velocity (km/s)
          </Label>
          <span className="text-primary font-mono text-sm">{params.speed} km/s</span>
        </div>
        <Slider
          value={[params.speed]}
          onValueChange={(value) => setParams({ ...params, speed: value[0] })}
          min={5}
          max={70}
          step={1}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">
          Average NEO velocity: ~20 km/s
        </p>
      </div>

      {/* Impact Angle */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Target className="w-4 h-4 text-accent" />
            Impact Angle (°)
          </Label>
          <span className="text-primary font-mono text-sm">{params.angle}°</span>
        </div>
        <Slider
          value={[params.angle]}
          onValueChange={(value) => setParams({ ...params, angle: value[0] })}
          min={15}
          max={90}
          step={5}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">
          45° is most common impact angle
        </p>
      </div>

      {/* Location */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <MapPin className="w-4 h-4 text-accent" />
          Impact Location
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="latitude" className="text-xs text-muted-foreground">
              Latitude
            </Label>
            <Input
              id="latitude"
              type="number"
              value={params.latitude}
              onChange={(e) => setParams({ ...params, latitude: parseFloat(e.target.value) || 0 })}
              className="mt-1 bg-card/50 border-primary/30"
              step="0.1"
            />
          </div>
          <div>
            <Label htmlFor="longitude" className="text-xs text-muted-foreground">
              Longitude
            </Label>
            <Input
              id="longitude"
              type="number"
              value={params.longitude}
              onChange={(e) => setParams({ ...params, longitude: parseFloat(e.target.value) || 0 })}
              className="mt-1 bg-card/50 border-primary/30"
              step="0.1"
            />
          </div>
        </div>
      </div>

      {/* Simulate Button */}
      <Button
        onClick={handleSimulate}
        className="w-full bg-gradient-neon hover:shadow-glow-primary transition-all duration-300 animate-pulse-glow font-display font-bold text-lg py-6"
      >
        <Rocket className="w-5 h-5 mr-2" />
        RUN SIMULATION
      </Button>
    </div>
  );
};
