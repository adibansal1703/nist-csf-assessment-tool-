import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card';
import { fetchFramework, fetchCategories } from '../lib/api';
import { Function, Category } from '../types';
import { Loader2 } from 'lucide-react';

const TIER_DEFINITIONS = [
  { level: 1, name: "Partial", desc: "Risk management is not formalized; limited awareness." },
  { level: 2, name: "Risk Informed", desc: "Risk management is approved by management but not organizational-wide." },
  { level: 3, name: "Repeatable", desc: "Risk management is formally approved and expressed as policy." },
  { level: 4, name: "Adaptive", desc: "Risk management is part of the culture; organization adapts based on lessons learned." },
];

interface TierAssessmentProps {
  tiers: Record<string, number>;
  onTierChange: (catId: string, level: number) => void;
}

const TierAssessment: React.FC<TierAssessmentProps> = ({ tiers, onTierChange }) => {
  const [functions, setFunctions] = useState<Function[]>([]);
  const [categories, setCategories] = useState<Record<string, Category[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchFramework()
      .then(async funcs => {
        if (!isMounted) return;
        setFunctions(funcs);
        const allCats: Record<string, Category[]> = {};
        for (const f of funcs) {
          const cats = await fetchCategories(f.id);
          allCats[f.id] = cats;
        }
        if (isMounted) setCategories(allCats);
      })
      .catch(err => {
        console.error('Failed to load tiers framework:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 bg-white rounded-lg shadow-sm border border-slate-100">
        <Loader2 className="w-6 h-6 text-blue-600 animate-spin mr-3" />
        <span className="text-slate-700 font-medium">Loading Tiers Framework...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
        <h3 className="text-blue-800 font-bold">NIST Implementation Tiers</h3>
        <p className="text-blue-700 text-sm">Assess the systemic cybersecurity risk management processes at the Category level.</p>
      </div>

      {functions.map(f => (
        <div key={f.id} className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">{f.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories[f.id]?.map(cat => (
              <Card key={cat.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{cat.name}</CardTitle>
                  <CardDescription>{cat.id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center space-x-2">
                    {[1, 2, 3, 4].map(level => (
                      <button
                        key={level}
                        onClick={() => onTierChange(cat.id, level)}
                        className={`flex-1 p-2 text-xs rounded border transition-all ${
                          tiers[cat.id] === level
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                            : 'bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                        title={TIER_DEFINITIONS.find(d => d.level === level)?.desc}
                      >
                        Tier {level}
                      </button>
                    ))}
                  </div>
                  {tiers[cat.id] && (
                    <div className="mt-3 p-2 bg-slate-50 rounded text-xs text-slate-600 italic">
                      {TIER_DEFINITIONS.find(d => d.level === tiers[cat.id])?.name}: {TIER_DEFINITIONS.find(d => d.level === tiers[cat.id])?.desc}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TierAssessment;
