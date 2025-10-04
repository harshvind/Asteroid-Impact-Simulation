import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BackgroundStars } from "@/components/BackgroundStars";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const asteroidData = {
  "99942 Apophis": {
    designation: "99942 Apophis (2004 MN4)",
    discovery: "19 June 2004 (Roy Tucker, David Tholen, Fabrizio Bernardi)",
    size: "~340 m diameter",
    orbitClass: "Aten/Apollo (near‑Earth; Earth‑crossing)",
    closeApproach: "Very close flyby on 13 April 2029 — will pass closer than geostationary satellites. No impact risk for at least the next century.",
    hazardStatus: "Classified as a potentially hazardous asteroid (PHA) due to its size and minimum orbit intersection distance (MOID), but current data rules out impact in 2029 and for decades beyond.",
    composition: "Stony/compatible with S‑type or other rocky taxonomy",
    notable: "One of the most famous NEOs because of the initially non‑negligible impact probability after its discovery and the very close 2029 Earth flyby that will be visible to the naked eye."
  },
  "101955 Bennu": {
    designation: "101955 Bennu (1999 RQ36)",
    discovery: "11 September 1999 (LINEAR)",
    size: "~490 m mean diameter",
    orbitClass: "Apollo (NEO)",
    closeApproach: "Future approaches are monitored; Bennu has a relatively higher long‑term impact probability over centuries.",
    hazardStatus: "Classified as a PHA because of size and Earth‑crossing orbit; long‑term impact probabilities have been quantified precisely by JPL analyses.",
    composition: "Carbonaceous (C‑type) — very primitive, rich in organic and volatile material",
    notable: "NASA's OSIRIS‑REx rendezvoused with Bennu, mapped it, and touched down to collect samples in 2020; returned a sample to Earth in 2023."
  },
  "162173 Ryugu": {
    designation: "162173 Ryugu",
    discovery: "Discovered in 1999",
    size: "~850 m diameter",
    orbitClass: "Apollo/Near‑Earth",
    closeApproach: "Regularly monitored; not an imminent impact threat.",
    hazardStatus: "Not classified as an immediate hazard but tracked as an NEO.",
    composition: "Carbonaceous (C‑type). Spectra and mission data indicate a rubble‑pile structure with low density.",
    notable: "JAXA's Hayabusa2 visited Ryugu (arrived 2018), deployed rovers/landers, and returned samples to Earth in 2020–2021."
  },
  "(65803) Didymos & Dimorphos": {
    designation: "(65803) Didymos (primary) and its moonlet Dimorphos",
    discovery: "Didymos discovered 26 April 1996",
    size: "Dimorphos: ~160–190 m",
    orbitClass: "Apollo binary system",
    closeApproach: "NASA's DART mission intentionally impacted Dimorphos on 26 September 2022 as a planetary‑defense demonstration.",
    hazardStatus: "Not an Earth impact threat in the near term; invaluable testbed for asteroid deflection techniques.",
    composition: "Silicate/rocky (S‑type); Dimorphos is a small rubble aggregate.",
    notable: "First planetary defense kinetic‑impact demonstration; follow‑up mission ESA Hera will visit the system."
  },
  "433 Eros": {
    designation: "433 Eros",
    discovery: "13 August 1898 (Gustav Witt and A. Charlois)",
    size: "~16.8 × 6.8 × 6.8 km (elongated)",
    orbitClass: "Amor (near‑Earth but does not cross Earth's orbit presently)",
    closeApproach: "NASA's NEAR Shoemaker spacecraft orbited Eros and landed on it in 2001.",
    hazardStatus: "Monitored as one of the largest near‑Earth asteroids.",
    composition: "Stony (S‑type); made of silicate minerals and metal.",
    notable: "First asteroid to be orbited and landed on by a dedicated spacecraft."
  },
  "3200 Phaethon": {
    designation: "3200 Phaethon (1983 TB)",
    discovery: "11 October 1983 (IRAS)",
    size: "~5.1–5.8 km diameter",
    orbitClass: "Apollo / rock/comet‑like orbit",
    closeApproach: "Approaches the Sun very closely and displays activity (dust ejection).",
    hazardStatus: "Large but its orbit is well known; monitored.",
    composition: "Rock/comet hybrid",
    notable: "Parent body of the Geminid meteor shower; rare example of an asteroid associated with a major meteor shower."
  },
  "367943 Duende": {
    designation: "367943 Duende (2012 DA14)",
    discovery: "23 February 2012 (La Sagra Observatory)",
    size: "~20–40 m",
    orbitClass: "Aten/Apollo",
    closeApproach: "Passed extremely close to Earth on 15 February 2013 — about 27,700 km above Earth's surface, inside geosynchronous altitude.",
    hazardStatus: "Too small to be globally dangerous, but could produce local damage if on an impact trajectory.",
    composition: "Rocky",
    notable: "One of the closest recorded approaches for an object of its measured size."
  },
  "1862 Apollo": {
    designation: "1862 Apollo",
    discovery: "24 April 1932 (Karl Reinmuth)",
    size: "~1.5–2 km",
    orbitClass: "Apollo — Earth‑crossing asteroid",
    closeApproach: "Regularly monitored",
    hazardStatus: "Well tracked",
    composition: "Rocky",
    notable: "Type object that defines the Apollo class of near‑Earth asteroids."
  },
  "25143 Itokawa": {
    designation: "25143 Itokawa",
    discovery: "26 September 1998",
    size: "~535 × 294 × 209 m (irregular)",
    orbitClass: "Apollo",
    closeApproach: "JAXA's Hayabusa visited Itokawa in 2005 and returned samples to Earth in 2010.",
    hazardStatus: "Monitored",
    composition: "Rubble‑pile asteroid",
    notable: "First asteroid sample returned to Earth (Hayabusa mission), showed space weathering and small loose regolith."
  },
  "1036 Ganymed": {
    designation: "1036 Ganymed",
    discovery: "23 October 1924 (Walter Baade)",
    size: "~32–34 km diameter (largest known near‑Earth asteroid)",
    orbitClass: "Amor",
    closeApproach: "Closely approaches but does not cross Earth's orbit",
    hazardStatus: "Not an immediate hazard",
    composition: "Rocky",
    notable: "One of the largest known NEOs; of interest for physical studies."
  },
  "153814 (2001 WN5)": {
    designation: "153814 (2001 WN5)",
    discovery: "2001",
    size: "~0.5–1 km",
    orbitClass: "Apollo/Aten",
    closeApproach: "Had close approach predictions for 2028/2030 ranges; current orbit solutions show no imminent impact.",
    hazardStatus: "Tracked precisely to rule out impact",
    composition: "Rocky",
    notable: "Periodically shows up in public interest due to media coverage of close approach predictions."
  },
  "1620 Geographos": {
    designation: "1620 Geographos",
    discovery: "1933",
    size: "~5 km × 2.5 km × 2.5 km (very elongated)",
    orbitClass: "Apollo",
    closeApproach: "Regularly monitored",
    hazardStatus: "Well tracked",
    composition: "Rocky",
    notable: "Radar observations revealed an elongated, peanut‑like shape; among the early radar‑imaged NEOs."
  },
  "29075 (1950 DA)": {
    designation: "29075 (1950 DA)",
    discovery: "1950 (rediscovered/linked later)",
    size: "~1.1–1.3 km diameter",
    orbitClass: "Apollo",
    closeApproach: "Long-term monitoring",
    hazardStatus: "Small non‑zero probabilities in centuries‑long projections",
    composition: "Rocky",
    notable: "Mentioned in long‑term impact‑risk studies; its Yarkovsky effect and long‑term orbit evolution are topics of research."
  },
  "10115 (1992 SK)": {
    designation: "10115 (1992 SK)",
    discovery: "1992",
    size: "Hundreds of meters",
    orbitClass: "Apollo/Aten",
    closeApproach: "Regularly monitored",
    hazardStatus: "Tracked",
    composition: "Rocky",
    notable: "Representative Apollo/Aten population objects frequently tracked for orbit refinements."
  },
  "99907 (1989 VA)": {
    designation: "99907 (1989 VA)",
    discovery: "1989",
    size: "Several hundred meters",
    orbitClass: "Apollo/Aten",
    closeApproach: "Well-tracked",
    hazardStatus: "Monitored",
    composition: "Rocky",
    notable: "Example of earlier discovered NEOs that are now well‑tracked."
  },
  "2014 JO25": {
    designation: "2014 JO25",
    discovery: "2014",
    size: "~650 m diameter",
    orbitClass: "Apollo",
    closeApproach: "Passed Earth in April 2017 at ~4.6 lunar distances (visible to amateur telescopes)",
    hazardStatus: "Monitored",
    composition: "Rocky",
    notable: "Well‑observed by radar during its close 2017 passage which constrained size and shape."
  },
  "2012 TC4": {
    designation: "2012 TC4",
    discovery: "2012",
    size: "~10–40 m",
    orbitClass: "Apollo",
    closeApproach: "Passed close to Earth on 12 October 2017, used as a rehearsal target for planetary defense tracking.",
    hazardStatus: "Small object, monitored",
    composition: "Rocky",
    notable: "Used as a test case for planetary defense observation networks."
  }
};

const NasaData = () => {
  const navigate = useNavigate();
  const [selectedAsteroid, setSelectedAsteroid] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundStars />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Near-Earth Objects
          </h1>
          <p className="text-lg text-muted-foreground">
            Select an asteroid to view detailed information
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {Object.keys(asteroidData).map((asteroidName) => (
            <Button
              key={asteroidName}
              variant={selectedAsteroid === asteroidName ? "default" : "outline"}
              className="h-auto py-4 text-left justify-start"
              onClick={() => setSelectedAsteroid(asteroidName)}
            >
              {asteroidName}
            </Button>
          ))}
        </div>

        {selectedAsteroid && (
          <Card className="bg-card/50 backdrop-blur-md border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{selectedAsteroid}</CardTitle>
              <CardDescription>{asteroidData[selectedAsteroid].designation}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Discovery:</h3>
                <p className="text-muted-foreground">{asteroidData[selectedAsteroid].discovery}</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Estimated Size:</h3>
                <p className="text-muted-foreground">{asteroidData[selectedAsteroid].size}</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Orbit Class:</h3>
                <p className="text-muted-foreground">{asteroidData[selectedAsteroid].orbitClass}</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Notable Close Approaches:</h3>
                <p className="text-muted-foreground">{asteroidData[selectedAsteroid].closeApproach}</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Potential Hazard Status:</h3>
                <p className="text-muted-foreground">{asteroidData[selectedAsteroid].hazardStatus}</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Composition:</h3>
                <p className="text-muted-foreground">{asteroidData[selectedAsteroid].composition}</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Why Notable:</h3>
                <p className="text-muted-foreground">{asteroidData[selectedAsteroid].notable}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NasaData;