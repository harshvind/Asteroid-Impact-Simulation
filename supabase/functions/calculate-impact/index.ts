import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
  neoData?: any;
}

// Collins et al. (2005) scaling laws for impact crater formation
function calculateCraterDiameter(params: AsteroidParams): number {
  const { size, speed, angle } = params;
  
  // Calculate kinetic energy (joules)
  const density = 3000; // kg/m³ (typical asteroid density)
  const volume = (4/3) * Math.PI * Math.pow(size / 2, 3);
  const mass = volume * density;
  const velocity = speed * 1000; // convert km/s to m/s
  const kineticEnergy = 0.5 * mass * Math.pow(velocity, 2);
  
  // Impact angle efficiency factor
  const angleRadians = angle * (Math.PI / 180);
  const angleEfficiency = Math.pow(Math.sin(angleRadians), 1/3);
  
  // Crater scaling (simplified from Collins et al. 2005)
  const gravity = 9.81; // m/s²
  const targetDensity = 2500; // kg/m³ (rock)
  
  // Transient crater diameter
  const craterDiameter = 1.161 * Math.pow(
    (kineticEnergy * angleEfficiency) / (density * Math.pow(gravity, 0.5) * Math.pow(targetDensity, 0.5)),
    0.25
  );
  
  return craterDiameter;
}

// Calculate blast radius using overpressure models
function calculateBlastEffects(craterDiameter: number, kineticEnergy: number): {
  blastRadius: number;
  firestormArea: number;
} {
  // Blast radius for 5 psi overpressure (severe structural damage)
  const blastRadius = Math.pow(kineticEnergy / 4.184e12, 1/3) * 2.2 * 1000; // in meters
  
  // Thermal radiation firestorm radius
  const firestormRadius = blastRadius * 1.5;
  const firestormArea = Math.PI * Math.pow(firestormRadius / 1000, 2); // in km²
  
  return { blastRadius, firestormArea };
}


// Estimate casualties based on population density data
function estimateCasualties(params: AsteroidParams, blastRadius: number): number {
  const { latitude, longitude } = params;
  
  // Simplified population density estimates by region
  let populationDensity = 50; // rural default
  
  // Major population centers (simplified)
  if (Math.abs(latitude - 40.7) < 5 && Math.abs(longitude + 74) < 5) {
    populationDensity = 10000; // NYC area
  } else if (Math.abs(latitude - 35.7) < 5 && Math.abs(longitude - 139.7) < 5) {
    populationDensity = 6000; // Tokyo area
  } else if (Math.abs(latitude) < 30 && Math.abs(longitude) < 50) {
    populationDensity = 500; // moderate density
  }
  
  const affectedArea = Math.PI * Math.pow(blastRadius / 1000, 2); // km²
  const estimatedPopulation = affectedArea * populationDensity;
  const casualties = Math.floor(estimatedPopulation * 0.75); // 75% casualty rate
  
  return casualties;
}


async function fetchNASANeoData() {
  const NASA_API_KEY = Deno.env.get('NASA_API_KEY');
  
  if (!NASA_API_KEY) {
    console.log('NASA_API_KEY not configured, skipping NEO data fetch');
    return null;
  }
  
  try {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 7);
    
    const startDateStr = today.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];
    
    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDateStr}&end_date=${endDateStr}&api_key=${NASA_API_KEY}`
    );
    
    if (!response.ok) {
      console.error('NASA API error:', response.status);
      return null;
    }
    
    const data = await response.json();
    return {
      elementCount: data.element_count,
      nearEarthObjects: Object.values(data.near_earth_objects).flat().slice(0, 5),
    };
  } catch (error) {
    console.error('Error fetching NASA data:', error);
    return null;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const params: AsteroidParams = await req.json();
    
    console.log('Calculating impact for:', params);
    
    // Fetch real NASA NEO data
    const neoData = await fetchNASANeoData();
    
    // Calculate crater diameter using Collins scaling
    const craterDiameter = calculateCraterDiameter(params);
    
    // Calculate kinetic energy
    const density = 3000;
    const volume = (4/3) * Math.PI * Math.pow(params.size / 2, 3);
    const mass = volume * density;
    const velocity = params.speed * 1000;
    const kineticEnergy = 0.5 * mass * Math.pow(velocity, 2);
    
    // Calculate blast effects
    const { blastRadius, firestormArea } = calculateBlastEffects(craterDiameter, kineticEnergy);
    
    // Estimate casualties
    const casualties = estimateCasualties(params, blastRadius);
    
    // Determine risk level
    let riskLevel: 'Low' | 'Medium' | 'Severe' | 'Catastrophic' = 'Low';
    if (craterDiameter > 50000 || casualties > 10000000) {
      riskLevel = 'Catastrophic';
    } else if (craterDiameter > 10000 || casualties > 1000000) {
      riskLevel = 'Severe';
    } else if (craterDiameter > 1000 || casualties > 10000) {
      riskLevel = 'Medium';
    }
    
    const results: ImpactResults = {
      craterDiameter,
      blastRadius,
      firestormArea,
      casualties,
      riskLevel,
      neoData,
    };
    
    console.log('Impact calculation complete:', results);
    
    return new Response(JSON.stringify(results), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in calculate-impact function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
