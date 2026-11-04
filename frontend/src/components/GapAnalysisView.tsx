import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { SubcategoryAssessment } from '../types';
import { AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

interface GapAnalysisViewProps {
  assessments: Record<string, SubcategoryAssessment>;
  aiSuggestions: Record<string, any>;
}

const GapAnalysisView: React.FC<GapAnalysisViewProps> = ({ assessments, aiSuggestions }) => {
  const gaps = Object.values(assessments).filter(asmt => {
    const current = parseInt(asmt.maturity_score || '0');
    const target = parseInt(asmt.target_score || '0');
    return target > current;
  });

  const compliant = Object.values(assessments).filter(asmt => {
    const current = parseInt(asmt.maturity_score || '0');
    const target = parseInt(asmt.target_score || '0');
    return target <= current && target > 0;
  });

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-red-50 border-red-100 text-red-900">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-2 bg-red-100 rounded-full"><AlertTriangle className="w-6 h-6" /></div>
            <div>
              <div className="text-2xl font-bold">{gaps.length}</div>
              <div className="text-xs uppercase font-bold opacity-70">Identified Gaps</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-100 text-green-900">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-2 bg-green-100 rounded-full"><CheckCircle2 className="w-6 h-6" /></div>
            <div>
              <div className="text-2xl font-bold">{compliant.length}</div>
              <div className="text-xs uppercase font-bold opacity-70">Outcomes Met</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-100 text-blue-900">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-2 bg-blue-100 rounded-full"><TrendingUp className="w-6 h-6" /></div>
            <div>
              <div className="text-2xl font-bold">
                {Math.round((compliant.length / (gaps.length + compliant.length || 1)) * 100)}%
              </div>
              <div className="text-xs uppercase font-bold opacity-70">Target Progress</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Gap Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="p-3 font-bold text-slate-600">ID</th>
                  <th className="p-3 font-bold text-slate-600">Current</th>
                  <th className="p-3 font-bold text-slate-600">Target</th>
                  <th className="p-3 font-bold text-slate-600">Gap Severity</th>
                  <th className="p-3 font-bold text-slate-600">Action Plan / AI Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {gaps.map(gap => {
                  const current = parseInt(gap.maturity_score);
                  const target = parseInt(gap.target_score!);
                  const diff = target - current;
                  const severity = diff >= 50 ? 'High' : diff >= 25 ? 'Medium' : 'Low';

                  return (
                    <tr key={gap.subcategory_id} className="border-b hover:bg-slate-50">
                      <td className="p-3 font-semibold text-blue-700">{gap.subcategory_id}</td>
                      <td className="p-3">{current}%</td>
                      <td className="p-3 text-blue-600 font-medium">{target}%</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          severity === 'High' ? 'bg-red-100 text-red-700' :
                          severity === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {severity}
                        </span>
                      </td>
                      <td className="p-3">
                        {aiSuggestions[gap.subcategory_id] ? (
                          <div className="text-slate-700 italic">
                            {aiSuggestions[gap.subcategory_id].recommendation}
                          </div>
                        ) : (
                          <span className="text-slate-400">Run AI analysis in Maturity tab for suggestions.</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GapAnalysisView;
