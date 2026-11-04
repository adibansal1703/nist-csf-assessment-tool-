import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { fetchFramework, fetchCategories, fetchSubcategories, assessEvidence } from '../lib/api';
import { Function, Category, Subcategory, SubcategoryAssessment } from '../types';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';

const MATURITY_OPTIONS = [
  { label: "Not Started", value: "0" },
  { label: "Initial", value: "25" },
  { label: "Partially Implemented", value: "50" },
  { label: "Largely Implemented", value: "75" },
  { label: "Fully Optimized", value: "100" },
];

interface AssessmentWizardProps {
  assessments: Record<string, SubcategoryAssessment>;
  onScoreChange: (subId: string, score: string) => void;
  onTargetChange: (subId: string, target: string) => void;
  onNoteChange: (subId: string, notes: string) => void;
  aiSuggestions: Record<string, any>;
  setAiSuggestions: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  aiErrors: Record<string, string>;
  setAiErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const AssessmentWizard: React.FC<AssessmentWizardProps> = ({
  assessments,
  onScoreChange,
  onTargetChange,
  onNoteChange,
  aiSuggestions,
  setAiSuggestions,
  aiErrors,
  setAiErrors
}) => {
  const [functions, setFunctions] = useState<Function[]>([]);
  const [activeFunction, setActiveFunction] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Record<string, Subcategory[]>>({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setErrorMsg(null);

    fetchFramework()
      .then(data => {
        if (!isMounted) return;
        setFunctions(data);
        if (data.length > 0) setActiveFunction(data[0].id);
      })
      .catch(err => {
        if (!isMounted) return;
        console.error('Failed to load framework:', err);
        setErrorMsg('Could not load framework data from backend. Loaded default NIST CSF framework.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (activeFunction) {
      let isMounted = true;
      fetchCategories(activeFunction)
        .then(async cats => {
          if (!isMounted) return;
          setCategories(cats);

          const subMap: Record<string, Subcategory[]> = {};
          for (const cat of cats) {
            const subs = await fetchSubcategories(cat.id);
            subMap[cat.id] = subs;
          }

          if (isMounted) {
            setSubcategories(prev => ({ ...prev, ...subMap }));
          }
        })
        .catch(err => {
          console.error(`Failed to load categories for function ${activeFunction}:`, err);
        });

      return () => { isMounted = false; };
    }
  }, [activeFunction]);

  const handleAiAnalyze = async (subId: string) => {
    const notes = assessments[subId]?.evidence_notes;
    if (!notes || notes.length < 10) {
      alert("Please provide more evidence notes for AI analysis.");
      return;
    }

    setAnalyzing(subId);
    setAiErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[subId];
      return newErrors;
    });

    try {
      const data = await assessEvidence(subId, notes);
      if (data.result) {
        setAiSuggestions(prev => ({ ...prev, [subId]: data.result }));
      }
    } catch (error: any) {
      console.error("AI Analysis failed:", error);
      setAiErrors(prev => ({ ...prev, [subId]: error.message || "AI Analysis failed" }));
    } finally {
      setAnalyzing(null);
    }
  };

  const applyAiSuggestion = (subId: string) => {
    const suggestion = aiSuggestions[subId];
    if (suggestion) {
      onScoreChange(subId, suggestion.suggested_score);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 bg-white rounded-lg shadow-sm border border-slate-100">
        <Loader2 className="w-6 h-6 text-blue-600 animate-spin mr-3" />
        <span className="text-slate-700 font-medium">Loading Maturity Framework...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {errorMsg && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm flex items-center">
          <AlertCircle className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {functions.map(f => (
          <button
            key={f.id}
            onClick={() => setActiveFunction(f.id)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeFunction === f.id ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600 border hover:bg-slate-50'
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {categories.map(cat => (
          <div key={cat.id} className="space-y-4">
            <h2 className="text-xl font-bold text-slate-800">{cat.id}: {cat.name}</h2>
            <div className="grid gap-4">
              {subcategories[cat.id]?.map(sub => (
                <Card key={sub.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="font-semibold text-blue-700">{sub.id}</div>
                          <button
                            onClick={() => handleAiAnalyze(sub.id)}
                            disabled={analyzing === sub.id}
                            className="flex items-center text-xs bg-purple-50 text-purple-700 px-2.5 py-1.5 rounded-md border border-purple-200 hover:bg-purple-100 disabled:opacity-50 transition-colors"
                          >
                            {analyzing === sub.id ? (
                              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                            ) : (
                              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                            )}
                            Analyze with Gemini
                          </button>
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed">{sub.text}</p>
                        <textarea
                          placeholder="Evidence / Notes (e.g., 'We have a policy but it's not fully enforced...')"
                          className="w-full mt-2 p-2.5 text-sm border rounded-md bg-slate-50 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          rows={2}
                          value={assessments[sub.id]?.evidence_notes || ''}
                          onChange={(e) => onNoteChange(sub.id, e.target.value)}
                        />

                        {aiSuggestions[sub.id] && (
                          <div className="mt-4 p-3.5 bg-purple-50 border border-purple-100 rounded-md text-sm">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-purple-900">AI Suggested Score: {aiSuggestions[sub.id].suggested_score}%</span>
                              <button
                                onClick={() => applyAiSuggestion(sub.id)}
                                className="text-xs bg-purple-600 text-white px-2.5 py-1 rounded hover:bg-purple-700 transition-colors"
                              >
                                Apply
                              </button>
                            </div>
                            <p className="text-purple-800 text-xs italic mb-1">"{aiSuggestions[sub.id].justification}"</p>
                            <p className="text-purple-900 text-xs font-semibold">Rec: {aiSuggestions[sub.id].recommendation}</p>
                          </div>
                        )}

                        {aiErrors[sub.id] && (
                          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-800">
                            <div className="font-bold mb-1">AI Analysis Error</div>
                            <p>{aiErrors[sub.id]}</p>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 md:mt-0 w-full md:w-64 space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase text-slate-500">Maturity Score</label>
                          <select
                            className="w-full p-2 border rounded-md bg-white text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            value={assessments[sub.id]?.maturity_score || ''}
                            onChange={(e) => onScoreChange(sub.id, e.target.value)}
                          >
                            <option value="">Select maturity...</option>
                            {MATURITY_OPTIONS.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label} ({opt.value}%)</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase text-blue-600">Target Score</label>
                          <select
                            className="w-full p-2 border border-blue-200 rounded-md bg-blue-50 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            value={assessments[sub.id]?.target_score || ''}
                            onChange={(e) => onTargetChange(sub.id, e.target.value)}
                          >
                            <option value="">Select target...</option>
                            {MATURITY_OPTIONS.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label} ({opt.value}%)</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentWizard;
