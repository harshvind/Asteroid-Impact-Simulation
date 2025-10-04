import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { BackgroundStars } from "@/components/BackgroundStars";

const RealPhysics = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundStars />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-6">
          <Link to="/dashboard">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              Asteroid Impact Effects
            </h1>
            <p className="text-xl text-muted-foreground">
              Scientific Estimation and Consequences
            </p>
          </div>

          {/* Crater Formation */}
          <Card className="glassmorphic">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">1. Crater Formation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/90">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Formation Process</h3>
                <p className="mb-4">
                  When an asteroid strikes Earth, the immense kinetic energy converts into heat, shock, and mechanical excavation. The sequence involves:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Contact and compression:</strong> The impactor transfers momentum and pressure to the ground.</li>
                  <li><strong>Excavation:</strong> Shockwaves excavate material outward and upward.</li>
                  <li><strong>Modification:</strong> Gravity collapses steep walls into a final, stable crater.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Key Factors</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Asteroid diameter (D):</strong> Larger projectiles excavate proportionally larger craters.</li>
                  <li><strong>Impact velocity (V):</strong> Typical asteroid speeds are 11–72 km/s; higher speeds yield more energy.</li>
                  <li><strong>Angle of impact:</strong> Vertical strikes produce circular craters; shallow angles may create elliptical ones.</li>
                  <li><strong>Target material:</strong> Rock, soil, ice, or water respond differently.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Estimation Models</h3>
                <p className="mb-2">The transient crater diameter (Dt) is estimated by scaling laws:</p>
                <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm">
                  Dt ∝ D<sup>0.78</sup> × V<sup>0.44</sup> × g<sup>-0.22</sup>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Where g is surface gravity. The final crater (Df) is usually larger (2–3 times the projectile size for simple craters, up to 20–30 times for large complex craters).
                </p>
              </div>

              <div className="bg-accent/20 p-4 rounded-lg border border-primary/20">
                <h4 className="font-semibold mb-2 text-primary">Example</h4>
                <p>
                  A 1 km asteroid hitting Earth at 20 km/s would produce a 15–20 km wide crater and several km deep cavity. Over time, the crater collapses to form a central uplift and terraces.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Blast Radius */}
          <Card className="glassmorphic">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">2. Blast Radius (Shockwave Effects)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/90">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Mechanism</h3>
                <p>
                  The supersonic entry of an asteroid compresses air, generating intense shockwaves. Upon impact, additional blast waves radiate from the explosion of kinetic energy.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Effects</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Overpressure:</strong> Measured in psi (pounds per square inch), determines building damage and human injury.</li>
                  <li><strong>Wind speed:</strong> Strong blast winds can flatten forests and structures (as in Tunguska, 1908).</li>
                  <li><strong>Range:</strong> The blast zone depends on energy release.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Estimation</h3>
                <p className="mb-2">Blast energy is often compared to nuclear explosions:</p>
                <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm">
                  E = ½ mv<sup>2</sup>
                </div>
                <p className="mt-4 mb-2">
                  For a 500 m asteroid at 20 km/s, kinetic energy exceeds 100,000 megatons of TNT. Models estimate blast radius by scaling with cube root of energy.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>1 psi overpressure</strong> (window shattering): up to hundreds of km.</li>
                  <li><strong>20 psi</strong> (reinforced concrete destruction): within 10–30 km for mid-sized impactors.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Thermal Radiation */}
          <Card className="glassmorphic">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">3. Thermal Radiation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/90">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Mechanism</h3>
                <p>
                  The fireball generated during an impact emits thermal radiation, much like a nuclear detonation. Radiation heats the ground, ignites vegetation, and causes burns.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Key Parameters</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Luminosity:</strong> Determined by fireball temperature (several thousand Kelvin).</li>
                  <li><strong>Duration:</strong> Seconds to minutes.</li>
                  <li><strong>Range:</strong> Depends on energy and atmospheric absorption.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Estimation</h3>
                <p className="mb-2">Thermal flux at distance R is approximated by:</p>
                <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm">
                  Q = fE / (4πR<sup>2</sup>t)
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Where f is fraction of energy radiated, E total impact energy, and t emission time.
                </p>
              </div>

              <div className="bg-accent/20 p-4 rounded-lg border border-primary/20">
                <h4 className="font-semibold mb-2 text-primary">Example</h4>
                <p>
                  The Chicxulub impact (65 million years ago) released enough radiation to ignite global wildfires. For smaller impacts (50–200 m), thermal effects are localized to tens of km.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Seismic Effects */}
          <Card className="glassmorphic">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">4. Seismic Effects (Earthquakes)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/90">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Mechanism</h3>
                <p>
                  Part of the impact energy transfers into seismic waves, producing an earthquake equivalent to very high magnitudes on the Richter scale.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Factors</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Energy partitioning:</strong> Typically 1–10% of impact energy goes into seismic waves.</li>
                  <li className="font-mono text-sm">
                    Mw = (2/3)(log<sub>10</sub> E<sub>s</sub> - 4.8)
                    <span className="block mt-1 text-muted-foreground font-sans">Where E<sub>s</sub> is seismic energy (in joules).</span>
                  </li>
                </ul>
              </div>

              <div className="bg-accent/20 p-4 rounded-lg border border-primary/20">
                <h4 className="font-semibold mb-2 text-primary">Example</h4>
                <p>
                  A 1 km asteroid impact may generate an earthquake of magnitude 9–10, felt globally. However, seismic damage is secondary compared to blast and thermal effects.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tsunami Height */}
          <Card className="glassmorphic">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">5. Tsunami Height (Ocean Impacts)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/90">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Mechanism</h3>
                <p>
                  When an asteroid strikes an ocean, it displaces massive amounts of water, generating waves that propagate outward. These can devastate coastlines thousands of kilometers away.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Parameters</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Projectile size & velocity</li>
                  <li><strong>Impact depth:</strong> Shallow water produces smaller tsunamis than deep ocean.</li>
                  <li><strong>Energy coupling efficiency:</strong> Not all kinetic energy transfers into water motion.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Estimation</h3>
                <p className="mb-2">Tsunami wave height (H) near the impact can be several hundred meters, decaying with distance roughly as:</p>
                <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm">
                  H ∝ 1/√R
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Where R is distance from the impact point.
                </p>
              </div>

              <div className="bg-accent/20 p-4 rounded-lg border border-primary/20">
                <h4 className="font-semibold mb-2 text-primary">Example</h4>
                <p>
                  A 500 m asteroid striking deep ocean may generate initial waves &gt;300 m high. Upon reaching coastlines, run-up heights can still exceed 50–100 m, depending on topography.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Atmospheric Effects */}
          <Card className="glassmorphic">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">6. Atmospheric Effects</CardTitle>
              <CardDescription>Dust, Fireball, and Shockwave</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/90">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Dust & Aerosols</h3>
                <p>
                  Large impacts eject billions of tons of dust, soot, and vapor into the stratosphere. This can block sunlight, reducing global temperatures — an effect called <strong>impact winter</strong>.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Fireball & Shockwave</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Fireball:</strong> Superheated plasma expands rapidly, visible globally for large impacts.</li>
                  <li><strong>Airburst shockwaves:</strong> If the asteroid disintegrates in the atmosphere (as in Chelyabinsk, 2013), shockwaves break windows and injure people even without surface impact.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Climate Impact</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Chicxulub (65 Mya):</strong> Dust and aerosols blocked sunlight for months–years, collapsing food chains and causing mass extinction.</li>
                  <li>Even smaller events (1 km bodies) could inject enough material to cool climate for several years.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Integration */}
          <Card className="glassmorphic">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">Integrating the Effects</CardTitle>
              <CardDescription>How Scientists Calculate Outcomes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/90">
              <p>
                The <strong>Earth Impact Effects Program</strong> integrates physical equations, scaling laws, and empirical data:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Inputs:</strong> size, density, velocity, impact angle, target surface (land/water).</li>
                <li><strong>Outputs:</strong> crater size, thermal flux, blast distances, seismic magnitude, tsunami heights, ejecta distribution.</li>
                <li>Validated by observations from nuclear test data, meteorite impacts (Barringer Crater, Tunguska, Chelyabinsk), and space missions.</li>
              </ul>
            </CardContent>
          </Card>

          {/* References */}
          <Card className="glassmorphic border-primary/30">
            <CardHeader>
              <CardTitle className="text-xl gradient-text">References</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Collins, Melosh & Marcus (2005). Earth Impact Effects Program.</li>
                <li>• NASA JPL CNEOS: Near-Earth Object Studies.</li>
                <li>• Melosh, H. J. (1989). Impact Cratering: A Geologic Process.</li>
                <li>• Toon, O. et al. (1997). Environmental perturbations caused by asteroid impacts.</li>
                <li>• NASA DART Mission (planetary defense demonstration).</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RealPhysics;
