import React, { useState, useEffect } from 'react';
import { Sun, Battery, Power } from 'lucide-react';

function App() {
  const [lux, setLux] = useState<number>(1000); // Default value
  const [solarPower, setSolarPower] = useState<number>(0);
  const [panelOutput, setPanelOutput] = useState<number>(100); // Default 100W panel
  const [efficiency, setEfficiency] = useState<number>(0);

  useEffect(() => {
    // Calculate solar power and efficiency whenever lux or panel output changes
    const solarIrradiance = lux / 120; // W/m²
    setSolarPower(solarIrradiance);
    
    // Calculate efficiency
    const theoreticalOutput = solarIrradiance * (1.6 * 1); // Assuming 1.6m x 1m panel
    const actualEfficiency = (panelOutput / theoreticalOutput) * 100;
    setEfficiency(Math.min(actualEfficiency, 100)); // Cap at 100%
  }, [lux, panelOutput]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 flex items-center justify-center gap-3">
            <Sun className="text-yellow-500" />
            Solar Efficiency Calculator
          </h1>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Power className="text-blue-500" />
              Input Values
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 mb-2">Light Intensity (lux)</label>
                <input
                  type="number"
                  value={lux}
                  onChange={(e) => setLux(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              <div>
                <label className="text-gray-600">Solar Irradiance</label>
                <p className="text-3xl font-bold">{solarPower.toFixed(2)} W/m²</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Battery className="text-green-500" />
              Panel Analysis
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 mb-2">Panel Output (W)</label>
                <input
                  type="number"
                  value={panelOutput}
                  onChange={(e) => setPanelOutput(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="1000"
                />
              </div>
              <div>
                <label className="text-gray-600">Calculated Efficiency</label>
                <p className="text-3xl font-bold">{efficiency.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">How it works</h3>
          <p className="text-gray-700">
            Enter the measured light intensity (lux) and your solar panel's output power. 
            The calculator will determine the solar irradiance using the formula P = Lux/120, 
            and calculate the efficiency (η) using η = (Pout/Pin) × 100. The calculation assumes 
            a standard panel size of 1.6m × 1m.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;