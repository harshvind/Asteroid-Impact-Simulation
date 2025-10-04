import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BackgroundStars } from '@/components/BackgroundStars';
import { EarthModel3D } from '@/components/EarthModel3D';
import { Rocket, Zap, Satellite, Sun, Users, Trophy, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
type GameScreen = 'start' | 'scenario' | 'strategy' | 'result' | 'leaderboard';
interface DefenseStrategy {
  id: string;
  name: string;
  icon: typeof Rocket;
  description: string;
  cost: number;
  effectiveness: number;
  color: string;
}
const defenseStrategies: DefenseStrategy[] = [{
  id: 'kinetic',
  name: 'Kinetic Impactor',
  icon: Rocket,
  description: 'RAM spacecraft into asteroid to alter trajectory',
  cost: 500,
  effectiveness: 85,
  color: 'primary'
}, {
  id: 'nuclear',
  name: 'Nuclear Detonation',
  icon: Zap,
  description: 'Detonate nuclear device to vaporize or deflect asteroid',
  cost: 1000,
  effectiveness: 95,
  color: 'warning'
}, {
  id: 'gravity',
  name: 'Gravity Tractor',
  icon: Satellite,
  description: 'Use spacecraft gravity to slowly pull asteroid off course',
  cost: 750,
  effectiveness: 70,
  color: 'secondary'
}, {
  id: 'laser',
  name: 'Laser Ablation',
  icon: Sun,
  description: 'Use focused lasers to vaporize surface and create thrust',
  cost: 600,
  effectiveness: 75,
  color: 'accent'
}, {
  id: 'evacuation',
  name: 'Evacuation & Shelters',
  icon: Users,
  description: 'Mass evacuation and shelter construction',
  cost: 300,
  effectiveness: 50,
  color: 'destructive'
}];
const Game = () => {
  const { toast } = useToast();
  const [screen, setScreen] = useState<GameScreen>('start');
  const [selectedStrategy, setSelectedStrategy] = useState<DefenseStrategy | null>(null);
  const [score, setScore] = useState(0);
  const [showFact, setShowFact] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState<Array<{ player_name: string; score: number; created_at: string }>>([]);
  const [asteroid] = useState({
    name: 'Impactor-2025',
    size: Math.floor(Math.random() * 500) + 100,
    speed: Math.floor(Math.random() * 30) + 10,
    distance: Math.floor(Math.random() * 100) + 20,
    daysToImpact: Math.floor(Math.random() * 365) + 30
  });
  const nasaFacts = ["Did you know? NASA's DART mission in 2022 successfully deflected an asteroid by 32 minutes!", "The Chicxulub impact 66 million years ago was 10 billion times more powerful than the atomic bombs at Hiroshima and Nagasaki.", "Over 90% of near-Earth asteroids larger than 1km have been discovered and tracked by NASA.", "A 1km asteroid impact would create a crater about 20km wide and cause global climate effects.", "NASA's Planetary Defense Coordination Office was established in 2016 to detect and track near-Earth objects."];
  
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const { data, error } = await supabase
      .from('player_scores')
      .select('player_name, score, created_at')
      .order('score', { ascending: false })
      .limit(10);
    
    if (!error && data) {
      setLeaderboard(data);
    }
  };

  const saveScore = async (finalScore: number, strategy: DefenseStrategy) => {
    if (!playerName.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name to save your score",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from('player_scores')
      .insert({
        player_name: playerName,
        score: finalScore,
        asteroid_diameter: asteroid.size,
        strategy_used: strategy.name
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save score",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success!",
        description: "Your score has been saved to the leaderboard"
      });
      fetchLeaderboard();
    }
  };

  const handleStrategySelect = async (strategy: DefenseStrategy) => {
    setSelectedStrategy(strategy);
    setScreen('result');

    // Calculate score based on effectiveness and cost efficiency
    const calculatedScore = Math.floor(strategy.effectiveness * 10 - strategy.cost / 10);
    setScore(calculatedScore);
    
    // Save score to database
    await saveScore(calculatedScore, strategy);
    
    setTimeout(() => setShowFact(true), 2000);
  };

  const handleReplay = () => {
    setScreen('scenario');
    setSelectedStrategy(null);
    setShowFact(false);
    setScore(0);
  };

  const handleStartGame = () => {
    if (!playerName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name to start the game",
        variant: "destructive"
      });
      return;
    }
    setScreen('scenario');
  };
  return <div className="relative min-h-screen overflow-hidden bg-background">
      <BackgroundStars />
      
      <div className="relative z-10 min-h-screen p-4">
        {/* Back to Home */}
        <Link to="/">
          <Button variant="ghost" className="absolute top-4 left-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Start Screen */}
        {screen === 'start' && <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-display font-black text-glow-primary leading-tight animate-pulse-glow">
                DEFEND EARTH
                <br />
                <span className="bg-gradient-neon bg-clip-text text-transparent">
                  THE ASTEROID CHALLENGE
                </span>
              </h1>
              
              <div className="relative w-64 h-64 mx-auto animate-float">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-green-500/20 blur-2xl"></div>
                <div className="relative w-full h-full">
                  <EarthModel3D />
                </div>
                <div className="absolute -top-8 -right-8 animate-[slide-in-right_3s_ease-in-out_infinite]">
                  
                </div>
              </div>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                An incoming asteroid threatens Earth! Choose the right defense strategy to save humanity while learning real NASA science.
              </p>

              <div className="max-w-md mx-auto space-y-4 pt-4">
                <div className="glassmorphic p-6 rounded-lg border border-primary/30">
                  <Label htmlFor="playerName" className="text-lg font-display font-semibold mb-2 block">
                    Enter Your Name
                  </Label>
                  <Input
                    id="playerName"
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Commander Name"
                    className="text-lg"
                    maxLength={50}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={handleStartGame} className="bg-gradient-neon hover:shadow-glow-primary font-display font-bold text-lg px-10 py-6">
                    <Rocket className="w-6 h-6 mr-2" />
                    START GAME
                  </Button>
                  <Button size="lg" variant="secondary" onClick={() => setScreen('leaderboard')} className="font-display font-semibold text-lg px-10 py-6">
                    <Trophy className="w-6 h-6 mr-2" />
                    LEADERBOARD
                  </Button>
                </div>
              </div>
            </div>
          </div>}

        {/* Scenario Screen */}
        {screen === 'scenario' && <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="glassmorphic p-8 rounded-2xl border-2 border-warning/50 shadow-glow-warning animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-8 h-8 text-warning" />
                  <h2 className="text-3xl font-display font-bold text-warning">⚠️ INCOMING THREAT DETECTED</h2>
                </div>
                <p className="text-xl text-foreground/90">
                  NASA has detected asteroid <span className="font-bold text-warning">{asteroid.name}</span> on collision course with Earth!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="glassmorphic p-6 border-primary/30">
                  <h3 className="text-xl font-display font-bold mb-4 text-primary">Asteroid Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-bold">{asteroid.size} meters</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Speed:</span>
                      <span className="font-bold">{asteroid.speed} km/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Distance:</span>
                      <span className="font-bold">{asteroid.distance} million km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time to Impact:</span>
                      <span className="font-bold text-warning">{asteroid.daysToImpact} days</span>
                    </div>
                  </div>
                </Card>

                <Card className="glassmorphic p-6 border-secondary/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-4 animate-pulse">🌍</div>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-32 bg-warning/50 rotate-45 animate-pulse"></div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-8">Projected trajectory</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="text-center">
                <Button size="lg" onClick={() => setScreen('strategy')} className="bg-gradient-neon hover:shadow-glow-primary font-display font-bold text-lg px-10 py-6">
                  CHOOSE DEFENSE STRATEGY
                </Button>
              </div>
            </div>
          </div>}

        {/* Strategy Selection Screen */}
        {screen === 'strategy' && <div className="flex flex-col items-center justify-center min-h-screen py-20">
            <div className="max-w-6xl mx-auto space-y-8">
              <h2 className="text-4xl font-display font-bold text-center mb-8 text-glow-primary">
                SELECT YOUR DEFENSE STRATEGY
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {defenseStrategies.map(strategy => {
              const Icon = strategy.icon;
              return <Card key={strategy.id} className="glassmorphic p-6 border-2 hover:border-primary/50 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-glow-primary" onClick={() => handleStrategySelect(strategy)}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-lg bg-${strategy.color}/20 flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 text-${strategy.color}`} />
                        </div>
                        <h3 className="text-lg font-display font-bold">{strategy.name}</h3>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">{strategy.description}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Effectiveness</span>
                            <span>{strategy.effectiveness}%</span>
                          </div>
                          <Progress value={strategy.effectiveness} className="h-2" />
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">Cost:</span>
                          <span className="text-sm font-bold">${strategy.cost}M</span>
                        </div>
                      </div>
                    </Card>;
            })}
              </div>
            </div>
          </div>}

        {/* Result Screen */}
        {screen === 'result' && selectedStrategy && <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="max-w-4xl mx-auto space-y-8 text-center">
              <div className={`text-6xl mb-8 ${score > 700 ? 'animate-bounce' : 'animate-pulse'}`}>
                {score > 700 ? '🎉' : score > 500 ? '✅' : '⚠️'}
              </div>

              <h2 className={`text-5xl font-display font-bold ${score > 700 ? 'text-green-500' : score > 500 ? 'text-yellow-500' : 'text-warning'}`}>
                {score > 700 ? 'MISSION SUCCESS!' : score > 500 ? 'PARTIAL SUCCESS' : 'EARTH DAMAGED'}
              </h2>

              <Card className="glassmorphic p-8 border-primary/30">
                <h3 className="text-2xl font-display font-bold mb-6">Strategy: {selectedStrategy.name}</h3>
                
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="p-4 rounded-lg bg-primary/10">
                    <div className="text-3xl font-bold text-primary">{score > 700 ? '98%' : score > 500 ? '75%' : '45%'}</div>
                    <div className="text-sm text-muted-foreground">Population Saved</div>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/10">
                    <div className="text-3xl font-bold text-secondary">${selectedStrategy.cost}M</div>
                    <div className="text-sm text-muted-foreground">Budget Spent</div>
                  </div>
                  <div className="p-4 rounded-lg bg-accent/10">
                    <div className="text-3xl font-bold text-accent">{asteroid.daysToImpact} days</div>
                    <div className="text-sm text-muted-foreground">Time Used</div>
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Trophy className="w-8 h-8 text-primary" />
                    <span className="text-2xl font-display font-bold">YOUR SCORE</span>
                  </div>
                  <div className="text-5xl font-display font-black text-glow-primary">{score}</div>
                </div>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" onClick={handleReplay} className="bg-gradient-neon hover:shadow-glow-primary font-display font-bold text-lg px-10 py-6">
                  <Rocket className="w-6 h-6 mr-2" />
                  TRY AGAIN
                </Button>
                <Button size="lg" variant="secondary" onClick={() => setScreen('leaderboard')} className="font-display font-semibold text-lg px-10 py-6">
                  <Trophy className="w-6 h-6 mr-2" />
                  VIEW LEADERBOARD
                </Button>
                <Link to="/">
                  <Button size="lg" variant="outline" className="font-display font-semibold text-lg px-10 py-6">
                    BACK TO HOME
                  </Button>
                </Link>
              </div>
            </div>
          </div>}

        {/* Leaderboard Screen */}
        {screen === 'leaderboard' && <div className="flex flex-col items-center justify-center min-h-screen py-20">
            <div className="max-w-4xl mx-auto space-y-8 w-full">
              <div className="text-center">
                <Trophy className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
                <h2 className="text-4xl font-display font-bold text-glow-primary mb-2">
                  LEADERBOARD
                </h2>
                <p className="text-muted-foreground">Top 10 Earth Defenders</p>
              </div>

              <Card className="glassmorphic p-6 border-primary/30">
                {leaderboard.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No scores yet. Be the first to defend Earth!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {leaderboard.map((entry, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                          index === 0 ? 'bg-primary/20 border-primary/50 shadow-glow-primary' :
                          index === 1 ? 'bg-secondary/20 border-secondary/50' :
                          index === 2 ? 'bg-accent/20 border-accent/50' :
                          'bg-background/50 border-border/50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`text-2xl font-display font-bold w-8 ${
                            index === 0 ? 'text-primary' :
                            index === 1 ? 'text-secondary' :
                            index === 2 ? 'text-accent' :
                            'text-muted-foreground'
                          }`}>
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                          </div>
                          <div>
                            <div className="font-display font-bold text-lg">{entry.player_name}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(entry.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-2xl font-display font-bold text-primary">
                          {entry.score}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              <div className="flex justify-center gap-4">
                <Button size="lg" onClick={() => setScreen('start')} className="bg-gradient-neon hover:shadow-glow-primary font-display font-bold text-lg px-10 py-6">
                  <Rocket className="w-6 h-6 mr-2" />
                  PLAY GAME
                </Button>
                <Link to="/">
                  <Button size="lg" variant="outline" className="font-display font-semibold text-lg px-10 py-6">
                    BACK TO HOME
                  </Button>
                </Link>
              </div>
            </div>
          </div>}
      </div>
    </div>;
};
export default Game;