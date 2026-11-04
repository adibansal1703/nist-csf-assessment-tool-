import { useState, useMemo, useEffect } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card'
import AssessmentWizard from './components/AssessmentWizard'
import TierAssessment from './components/TierAssessment'
import GapAnalysisView from './components/GapAnalysisView'
import PDFReport from './components/PDFReport'
import RadarChart from './components/RadarChart'
import { SubcategoryAssessment, SignatureDetails } from './types'
import { DUMMY_ASSESSMENTS, DUMMY_TIERS, DUMMY_SIGNATURE, DUMMY_AI_SUGGESTIONS } from './lib/dummyData'
import { FileDown, LayoutDashboard, CheckSquare, Layers, Search, FileSignature, X, Database, Check } from 'lucide-react'

const FUNCTIONS = ['GOVERN', 'IDENTIFY', 'PROTECT', 'DETECT', 'RESPOND', 'RECOVER'];
const FUNCTION_MAP: Record<string, string> = {
  'GV': 'GOVERN',
  'ID': 'IDENTIFY',
  'PR': 'PROTECT',
  'DE': 'DETECT',
  'RS': 'RESPOND',
  'RC': 'RECOVER'
};

function App() {
  const [view, setView] = useState<'dashboard' | 'assessment' | 'tiers' | 'gaps'>('dashboard')
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [demoLoaded, setDemoLoaded] = useState(false);

  // Signature state with LocalStorage persistence
  const [signatureDetails, setSignatureDetails] = useState<SignatureDetails>(() => {
    try {
      const saved = localStorage.getItem('nist_csf_signature');
      return saved ? JSON.parse(saved) : {
        assessorName: '',
        assessorTitle: '',
        organizationName: '',
        assessmentDate: new Date().toISOString().split('T')[0],
        signatureText: '',
      };
    } catch {
      return {
        assessorName: '',
        assessorTitle: '',
        organizationName: '',
        assessmentDate: new Date().toISOString().split('T')[0],
        signatureText: '',
      };
    }
  });

  // Assessments state with LocalStorage persistence
  const [assessments, setAssessments] = useState<Record<string, SubcategoryAssessment>>(() => {
    try {
      const saved = localStorage.getItem('nist_csf_assessments');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Tier Assessments with LocalStorage persistence
  const [tierAssessments, setTierAssessments] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('nist_csf_tiers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // AI Suggestions with LocalStorage persistence
  const [aiSuggestions, setAiSuggestions] = useState<Record<string, any>>(() => {
    try {
      const saved = localStorage.getItem('nist_csf_ai');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [aiErrors, setAiErrors] = useState<Record<string, string>>({});

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('nist_csf_signature', JSON.stringify(signatureDetails));
  }, [signatureDetails]);

  useEffect(() => {
    localStorage.setItem('nist_csf_assessments', JSON.stringify(assessments));
  }, [assessments]);

  useEffect(() => {
    localStorage.setItem('nist_csf_tiers', JSON.stringify(tierAssessments));
  }, [tierAssessments]);

  useEffect(() => {
    localStorage.setItem('nist_csf_ai', JSON.stringify(aiSuggestions));
  }, [aiSuggestions]);

  const handleScoreChange = (subId: string, score: string) => {
    setAssessments(prev => ({
      ...prev,
      [subId]: { ...prev[subId], subcategory_id: subId, maturity_score: score as any }
    }));
  };

  const handleTargetChange = (subId: string, target: string) => {
    setAssessments(prev => ({
      ...prev,
      [subId]: { ...prev[subId], subcategory_id: subId, target_score: target as any }
    }));
  };

  const handleNoteChange = (subId: string, notes: string) => {
    setAssessments(prev => ({
      ...prev,
      [subId]: { ...prev[subId], subcategory_id: subId, evidence_notes: notes }
    }));
  };

  const handleTierChange = (catId: string, level: number) => {
    setTierAssessments(prev => ({ ...prev, [catId]: level }));
  };

  const handleLoadDemoData = () => {
    setAssessments(DUMMY_ASSESSMENTS);
    setTierAssessments(DUMMY_TIERS);
    setSignatureDetails(DUMMY_SIGNATURE);
    setAiSuggestions(DUMMY_AI_SUGGESTIONS);
    setDemoLoaded(true);
    setTimeout(() => setDemoLoaded(false), 3000);
  };

  // Calculate dynamic dashboard data
  const dashboardData = useMemo(() => {
    const scores: Record<string, { total: number, count: number }> = {
      'GOVERN': { total: 0, count: 0 },
      'IDENTIFY': { total: 0, count: 0 },
      'PROTECT': { total: 0, count: 0 },
      'DETECT': { total: 0, count: 0 },
      'RESPOND': { total: 0, count: 0 },
      'RECOVER': { total: 0, count: 0 },
    };

    Object.values(assessments).forEach(asmt => {
      const prefix = asmt.subcategory_id.split('.')[0];
      const funcName = FUNCTION_MAP[prefix];
      if (funcName && asmt.maturity_score) {
        scores[funcName].total += parseInt(asmt.maturity_score);
        scores[funcName].count += 1;
      }
    });

    return FUNCTIONS.map(func => ({
      subject: func,
      A: scores[func].count > 0 ? Math.round(scores[func].total / scores[func].count) : 0,
      fullMark: 100
    }));
  }, [assessments]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="mb-8 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">NIST CSF 2.0 Assessment Tool</h1>
          <p className="text-slate-600 text-sm">Track and manage your organization's cybersecurity profile.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={handleLoadDemoData}
            className={`px-3.5 py-2 rounded text-sm font-medium transition-colors flex items-center shadow-sm ${
              demoLoaded ? 'bg-emerald-600 text-white' : 'bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            {demoLoaded ? (
              <><Check className="w-4 h-4 mr-1.5" /> Demo Loaded!</>
            ) : (
              <><Database className="w-4 h-4 mr-1.5" /> Load Demo Data</>
            )}
          </button>

          <button
            onClick={() => setShowSignatureModal(true)}
            className="px-3.5 py-2 rounded bg-white border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors flex items-center shadow-sm"
          >
            <FileSignature className="w-4 h-4 mr-2 text-blue-600" /> Signature & Sign-Off
          </button>

          <PDFDownloadLink
            document={
              <PDFReport
                assessments={assessments}
                aiSuggestions={aiSuggestions}
                dashboardData={dashboardData}
                signatureDetails={signatureDetails}
              />
            }
            fileName="NIST_CSF_Gap_Analysis.pdf"
            className="px-4 py-2 rounded bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-colors flex items-center shadow-sm"
          >
            {({ loading }) => loading ? 'Preparing...' : <><FileDown className="w-4 h-4 mr-2" /> Export PDF</>}
          </PDFDownloadLink>

          <button
            onClick={() => setView('dashboard')}
            className={`px-4 py-2 rounded text-sm font-medium flex items-center ${view === 'dashboard' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border text-slate-600 hover:bg-slate-50'}`}
          >
            <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
          </button>
          <button
            onClick={() => setView('assessment')}
            className={`px-4 py-2 rounded text-sm font-medium flex items-center ${view === 'assessment' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border text-slate-600 hover:bg-slate-50'}`}
          >
            <CheckSquare className="w-4 h-4 mr-2" /> Maturity
          </button>
          <button
            onClick={() => setView('tiers')}
            className={`px-4 py-2 rounded text-sm font-medium flex items-center ${view === 'tiers' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border text-slate-600 hover:bg-slate-50'}`}
          >
            <Layers className="w-4 h-4 mr-2" /> Tiers
          </button>
          <button
            onClick={() => setView('gaps')}
            className={`px-4 py-2 rounded text-sm font-medium flex items-center ${view === 'gaps' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border text-slate-600 hover:bg-slate-50'}`}
          >
            <Search className="w-4 h-4 mr-2" /> Gaps
          </button>
        </div>
      </header>

      {/* Signature & Sign-Off Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 border border-slate-100 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center space-x-2">
                <FileSignature className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">Assessor Signature & Sign-Off</h3>
              </div>
              <button
                onClick={() => setShowSignatureModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Organization Name</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Global Technologies"
                  className="w-full p-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  value={signatureDetails.organizationName}
                  onChange={(e) => setSignatureDetails(prev => ({ ...prev, organizationName: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Lead Assessor Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Alex Mercer"
                    className="w-full p-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    value={signatureDetails.assessorName}
                    onChange={(e) => setSignatureDetails(prev => ({ ...prev, assessorName: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Assessor Title / Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Chief Information Security Officer"
                    className="w-full p-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    value={signatureDetails.assessorTitle}
                    onChange={(e) => setSignatureDetails(prev => ({ ...prev, assessorTitle: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Assessment Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    value={signatureDetails.assessmentDate}
                    onChange={(e) => setSignatureDetails(prev => ({ ...prev, assessmentDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">Digital Signature Text</label>
                  <input
                    type="text"
                    placeholder="e.g. Electronically Verified by Dr. Alex Mercer"
                    className="w-full p-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    value={signatureDetails.signatureText}
                    onChange={(e) => setSignatureDetails(prev => ({ ...prev, signatureText: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t">
              <button
                onClick={() => setShowSignatureModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Save & Apply to PDF
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto">
        {view === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Current Assessment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <RadarChart data={dashboardData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.map((data) => (
                    <div key={data.subject} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{data.subject}</span>
                        <span className="text-slate-500">{data.A}%</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-500"
                          style={{ width: `${data.A}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        {view === 'assessment' && (
          <AssessmentWizard
            assessments={assessments}
            onScoreChange={handleScoreChange}
            onTargetChange={handleTargetChange}
            onNoteChange={handleNoteChange}
            aiSuggestions={aiSuggestions}
            setAiSuggestions={setAiSuggestions}
            aiErrors={aiErrors}
            setAiErrors={setAiErrors}
          />
        )}
        {view === 'tiers' && (
          <TierAssessment
            tiers={tierAssessments}
            onTierChange={handleTierChange}
          />
        )}
        {view === 'gaps' && (
          <GapAnalysisView
            assessments={assessments}
            aiSuggestions={aiSuggestions}
          />
        )}
      </main>
    </div>
  )
}

export default App
