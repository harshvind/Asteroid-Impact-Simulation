import { BackgroundStars } from '@/components/BackgroundStars';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import itokawaImg from '@/assets/asteroid-itokawa.jpg';
import ganymedImg from '@/assets/asteroid-ganymed.jpg';
import bennuImg from '@/assets/asteroid-bennu.jpg';
import ryuguImg from '@/assets/asteroid-ryugu.jpg';
import erosImg from '@/assets/asteroid-eros.jpg';
import phaethonImg from '@/assets/asteroid-phaethon.jpg';

const asteroids = [
  { name: '25143 Itokawa', image: itokawaImg },
  { name: '1036 Ganymed', image: ganymedImg },
  { name: '101955 Bennu', image: bennuImg },
  { name: '162173 Ryugu', image: ryuguImg },
  { name: '433 Eros', image: erosImg },
  { name: '3200 Phaethon', image: phaethonImg },
];

const Visualization3D = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundStars />
      
      <div className="relative z-10 min-h-screen px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <Link to="/">
              <Button variant="outline" size="lg">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Title Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-display font-black text-glow-primary mb-6">
              3D VISUALIZATION
            </h1>
            <p className="text-xl md:text-2xl text-foreground/90 font-body max-w-3xl mx-auto">
              Interactive Earth globe with realistic impact overlays and effects
            </p>
          </div>

          {/* Asteroids Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {asteroids.map((asteroid, index) => (
              <div
                key={asteroid.name}
                className="glassmorphic rounded-xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-500 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative aspect-square overflow-hidden bg-background/50">
                  <img
                    src={asteroid.image}
                    alt={asteroid.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 animate-[spin_20s_linear_infinite]"
                    style={{ animationPlayState: 'running' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-display font-bold text-primary">
                    {asteroid.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>
    </div>
  );
};

export default Visualization3D;
