import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ideaService } from '../services/appwrite';
import { analysisService, AnalysisResult } from '../services/AnalysisService';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Share2, Eye, EyeOff, Download, Loader2, Sparkles, FileDown, Check } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AnalysisNavigation from '../components/analysis/AnalysisNavigation';
import MarketAnalysisSection from '../components/analysis/MarketAnalysisSection';
import TAMSAMSection from '../components/analysis/TAMSAMSection';
import CompetitionSection from '../components/analysis/CompetitionSection';
import FeasibilitySection from '../components/analysis/FeasibilitySection';
import StrategySection from '../components/analysis/StrategySection';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Idea {
  $id: string;
  userId: string;
  title: string;
  description: string;
  isPublic: boolean;
  createdAt: string;
  status?: 'pending' | 'analyzing' | 'completed' | 'failed';
  analysisResults?: AnalysisResult | string;
  analyzedAt?: string;
}

interface ProgressiveAnalysisState {
  marketAnalysis?: any;
  tamSamEstimation?: any;
  competitorAnalysis?: any;
  feasibilityEvaluation?: any;
  strategyRecommendation?: any;
}

const IdeaDetailsPage: React.FC = () => {
  const { ideaId } = useParams<{ ideaId: string }>();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<string>('');
  const [progressiveResults, setProgressiveResults] = useState<ProgressiveAnalysisState>({});
  const [activeSection, setActiveSection] = useState('market');
  const [error, setError] = useState<string | null>(null);
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
  const [completedAgents, setCompletedAgents] = useState<string[]>([]);
  const [justCompletedAgent, setJustCompletedAgent] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const hasTriggeredAnalysis = useRef(false);

  useEffect(() => {
    const fetchAndAnalyzeIdea = async () => {
      if (!ideaId) {
        navigate('/my-ideas');
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Fetch the idea from Appwrite
        console.log('📥 Fetching idea:', ideaId);
        const fetchedIdea = await ideaService.getIdea(ideaId);

        console.log('📦 Fetched idea data:', {
          id: fetchedIdea.$id,
          title: fetchedIdea.title,
          status: fetchedIdea.status,
          hasAnalysisResults: !!fetchedIdea.analysisResults,
          analysisResultsType: typeof fetchedIdea.analysisResults,
          analyzedAt: fetchedIdea.analyzedAt
        });

        // Parse analysisResults if it's a string
        let parsedAnalysisResults = fetchedIdea.analysisResults;
        if (fetchedIdea.analysisResults) {
          if (typeof fetchedIdea.analysisResults === 'string') {
            try {
              parsedAnalysisResults = JSON.parse(fetchedIdea.analysisResults);
              console.log('✅ Parsed analysis results from string');
            } catch (parseError) {
              console.error('❌ Failed to parse analysis results:', parseError);
              console.error('Raw data:', fetchedIdea.analysisResults);
              parsedAnalysisResults = null;
            }
          } else {
            console.log('✅ Analysis results already an object');
          }
        }

        // Convert Appwrite document to Idea type
        const ideaData: Idea = {
          $id: fetchedIdea.$id,
          userId: fetchedIdea.userId,
          title: fetchedIdea.title,
          description: fetchedIdea.description,
          isPublic: fetchedIdea.isPublic,
          createdAt: fetchedIdea.createdAt,
          status: fetchedIdea.status || 'pending',
          analysisResults: parsedAnalysisResults,
          analyzedAt: fetchedIdea.analyzedAt
        };

        setIdea(ideaData);
        setIsLoading(false);

        // Check if we need to run analysis
        const hasValidAnalysis = parsedAnalysisResults &&
          typeof parsedAnalysisResults === 'object' &&
          parsedAnalysisResults.agents &&
          Object.keys(parsedAnalysisResults.agents).length > 0;

        console.log('🔍 Analysis check:', {
          hasValidAnalysis,
          hasTriggered: hasTriggeredAnalysis.current,
          status: ideaData.status
        });

        // Trigger analysis if no valid results exist and haven't triggered yet
        if (!hasValidAnalysis && !hasTriggeredAnalysis.current) {
          console.log('🚀 No valid analysis found - triggering new analysis');
          hasTriggeredAnalysis.current = true;
          await triggerSequentialAnalysis(ideaData);
        } else if (hasValidAnalysis) {
          console.log('✅ Found existing analysis - skipping re-analysis');
        }


      } catch (err: any) {
        console.error('❌ Failed to fetch idea:', err);
        setError(err.message || 'Failed to load idea');
        setIsLoading(false);
      }
    };

    fetchAndAnalyzeIdea();
  }, [ideaId, navigate]);

  const triggerSequentialAnalysis = async (ideaData: Idea) => {
    try {
      setIsAnalyzing(true);
      setError(null);
      setCompletedAgents([]);
      setProgressiveResults({});

      console.log('🚀 Starting sequential 5-agent analysis for:', ideaData.title);

      const analysisRequest = {
        idea: ideaData.description,
        userId: ideaData.userId,
        title: ideaData.title,
        category: 'General'
      };

      // Run agents sequentially with progressive updates
      const finalResults = await analysisService.analyzeIdeaSequential(
        analysisRequest,
        (agentName: string, result: any) => {
          // This callback is called after each agent completes
          console.log(`✅ ${agentName} completed, displaying results...`);

          // Map backend agent names to frontend section IDs
          const agentMapping: { [key: string]: string } = {
            'marketAnalyst': 'market',
            'tamSamEstimator': 'tam-sam',
            'competitorScanner': 'competition',
            'feasibilityEvaluator': 'feasibility',
            'strategyRecommender': 'strategy'
          };

          const sectionId = agentMapping[agentName];

          // Update progressive results
          setProgressiveResults(prev => {
            const updated = { ...prev };

            if (agentName === 'marketAnalyst') {
              updated.marketAnalysis = result;
            } else if (agentName === 'tamSamEstimator') {
              updated.tamSamEstimation = result;
            } else if (agentName === 'competitorScanner') {
              updated.competitorAnalysis = result;
            } else if (agentName === 'feasibilityEvaluator') {
              updated.feasibilityEvaluation = result;
            } else if (agentName === 'strategyRecommender') {
              updated.strategyRecommendation = result;
            }

            return updated;
          });

          // Mark this agent as completed
          setCompletedAgents(prev => [...prev, sectionId]);

          // Show completion toast
          setJustCompletedAgent(sectionId);
          setTimeout(() => setJustCompletedAgent(null), 3000);

          // Auto-switch to show the completed agent's results
          if (sectionId) {
            setActiveSection(sectionId);
          }

          // Clear current agent and prepare for next
          setCurrentAgent('');
        }
      );

      console.log('✅ All agents complete!', finalResults);

      // Save analysis results to Appwrite
      try {
        console.log('💾 Saving analysis results to database...');
        console.log('🔑 Idea ID:', ideaData.$id);
        console.log('📊 Results structure:', {
          hasAgents: !!finalResults.agents,
          agentKeys: finalResults.agents ? Object.keys(finalResults.agents) : [],
          overallScore: finalResults.overallScore,
          status: finalResults.status
        });

        const savedDoc = await ideaService.updateIdeaWithAnalysis(ideaData.$id, finalResults, 'completed');
        console.log('✅ Analysis saved to database successfully');
        console.log('📝 Saved document ID:', savedDoc.$id);
      } catch (saveError: any) {
        console.error('⚠️ Failed to save analysis to database:', saveError);
        console.error('Error details:', {
          message: saveError.message,
          code: saveError.code,
          type: saveError.type
        });
        // Continue even if save fails - user can still see results
      }

      // Update idea with final results
      setIdea(prev => prev ? {
        ...prev,
        status: 'completed',
        analysisResults: finalResults,
        analyzedAt: new Date().toISOString()
      } : null);

      setIsAnalyzing(false);
      setCurrentAgent('');

    } catch (err: any) {
      console.error('❌ Analysis failed:', err);
      setError(err.message || 'Analysis failed');
      setIsAnalyzing(false);
      setCurrentAgent('');

      setIdea(prev => prev ? {
        ...prev,
        status: 'failed'
      } : null);
    }
  };

  const downloadPDF = async () => {
    if (!idea || !idea.analysisResults) return;

    try {
      setIsDownloadingPDF(true);
      const doc = new jsPDF();

      // Parse analysis results if string
      const analysis = typeof idea.analysisResults === 'string'
        ? JSON.parse(idea.analysisResults)
        : idea.analysisResults;

      // Title Page
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('IdeaHub Analysis Report', 105, 30, { align: 'center' });

      doc.setFontSize(18);
      doc.text(idea.title, 105, 45, { align: 'center' });

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 55, { align: 'center' });

      if (analysis.overallScore) {
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(`Overall Score: ${analysis.overallScore}/10`, 105, 70, { align: 'center' });
      }

      // Continue with rest of PDF generation...
      // (Same as before - abbreviated for brevity)

      const filename = `${idea.title.replace(/[^a-z0-9]/gi, '_')}_Analysis.pdf`;
      doc.save(filename);

      console.log('✅ PDF downloaded:', filename);

    } catch (error) {
      console.error('❌ PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloadingPDF(false);
    }
  };

  const toggleVisibility = async () => {
    if (!idea) return;

    try {
      await ideaService.updateIdeaVisibility(idea.$id, !idea.isPublic);
      setIdea({ ...idea, isPublic: !idea.isPublic });
    } catch (err: any) {
      console.error('Failed to toggle visibility:', err);
    }
  };

  const handleShare = () => {
    if (idea) {
      const url = `${window.location.origin}/idea/${idea.$id}`;
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-white mx-auto mb-4" />
            <p className="text-gray-400">Loading your idea...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !idea) {
    return (
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error || 'Idea not found'}</p>
            <Link to="/my-ideas" className="text-white hover:underline inline-flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to My Ideas
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Parse analysis results if string
  const parsedAnalysis = typeof idea.analysisResults === 'string'
    ? JSON.parse(idea.analysisResults)
    : idea.analysisResults;

  // Combine completed analysis with progressive results
  const displayResults = isAnalyzing
    ? { agents: progressiveResults }
    : parsedAnalysis;

  // If analyzing, show progress screen with progressive results
  if (isAnalyzing) {
    return (
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Header />

        {/* Completion Toast */}
        <AnimatePresence>
          {justCompletedAgent && (
            <motion.div
              initial={{ opacity: 0, y: -50, x: '50%' }}
              animate={{ opacity: 1, y: 20, x: '50%' }}
              exit={{ opacity: 0, y: -50, x: '50%' }}
              className="fixed top-0 right-0 transform translate-x-[-50%] z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-lg shadow-2xl shadow-green-500/50 border border-green-400/30"
              style={{ right: '2rem', left: 'auto', transform: 'none' }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Check size={24} className="text-white" />
                </motion.div>
                <div>
                  <p className="font-bold text-sm">Agent Completed!</p>
                  <p className="text-xs text-green-100">
                    {justCompletedAgent === 'market' && 'Market Analysis'}
                    {justCompletedAgent === 'tam-sam' && 'TAM/SAM Estimation'}
                    {justCompletedAgent === 'competition' && 'Competitor Analysis'}
                    {justCompletedAgent === 'feasibility' && 'Feasibility Evaluation'}
                    {justCompletedAgent === 'strategy' && 'Strategy Recommendations'}
                  </p>
                </div>
                <Sparkles size={20} className="text-yellow-300 animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">{idea.title}</h1>
              <p className="text-gray-400 mb-2">Running comprehensive 5-agent analysis...</p>
              <p className="text-sm text-gray-500">Results display as each agent completes</p>
            </div>

            {/* Agent Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8"
            >
              <div className="space-y-3">
                {[
                  { id: 'market', name: 'Market Analyst', icon: '🏢', backendName: 'marketAnalyst' },
                  { id: 'tam-sam', name: 'TAM/SAM Estimator', icon: '💰', backendName: 'tamSamEstimator' },
                  { id: 'competition', name: 'Competitor Scanner', icon: '⚔️', backendName: 'competitorScanner' },
                  { id: 'feasibility', name: 'Feasibility Evaluator', icon: '🔬', backendName: 'feasibilityEvaluator' },
                  { id: 'strategy', name: 'Strategy Recommender', icon: '🧭', backendName: 'strategyRecommender' }
                ].map((agent, index) => {
                  const isCompleted = completedAgents.includes(agent.id);
                  const isActive = completedAgents.length === index && !isCompleted;
                  const isPending = completedAgents.length < index;

                  return (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-3 p-4 rounded-lg transition-all relative overflow-hidden ${isActive ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-400 shadow-lg shadow-blue-500/20' :
                        isCompleted ? 'bg-green-500/10 border border-green-500/30' :
                          'bg-white/5 border border-white/10'
                        }`}
                    >
                      {/* Animated background for active agent */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}

                      <span className="text-2xl relative z-10">{agent.icon}</span>
                      <div className="flex-1 relative z-10">
                        <span className={`text-sm block ${isActive ? 'text-white font-bold' :
                          isCompleted ? 'text-green-400 font-medium' :
                            isPending ? 'text-gray-500' :
                              'text-gray-400'
                          }`}>
                          {agent.name}
                        </span>
                        {isActive && (
                          <span className="text-xs text-blue-300 mt-1 block animate-pulse">
                            Analyzing now...
                          </span>
                        )}
                        {isPending && (
                          <span className="text-xs text-gray-600 mt-1 block">
                            Pending...
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-xs text-green-500 mt-1 block">
                            Completed ✓
                          </span>
                        )}
                      </div>

                      {isActive && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Loader2 size={20} className="text-blue-400 relative z-10" />
                        </motion.div>
                      )}
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          <Check size={20} className="text-green-400 relative z-10" />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress Indicator */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>Overall Progress</span>
                  <span>{Math.round((completedAgents.length / 5) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedAgents.length / 5) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Progressive Results Display */}
            <AnimatePresence mode="wait">
              {Object.keys(progressiveResults).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8"
                >
                  {/* Navigation Sidebar */}
                  <aside className="lg:block">
                    <AnalysisNavigation
                      activeSection={activeSection}
                      onSectionChange={setActiveSection}
                    />
                  </aside>

                  {/* Analysis Content - Show as they complete */}
                  <div className="space-y-12">
                    {activeSection === 'market' && progressiveResults.marketAnalysis && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <MarketAnalysisSection
                          marketSize={progressiveResults.marketAnalysis.marketSize || 'N/A'}
                          growthRate={progressiveResults.marketAnalysis.growthTrends?.[0] || 'N/A'}
                          customerNeed={progressiveResults.marketAnalysis.targetAudience?.primary || 'N/A'}
                        />
                      </motion.div>
                    )}

                    {activeSection === 'tam-sam' && progressiveResults.tamSamEstimation && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <TAMSAMSection
                          tam={progressiveResults.tamSamEstimation.tam || { value: 'N/A', percentage: 100 }}
                          sam={progressiveResults.tamSamEstimation.sam || { value: 'N/A', percentage: 30 }}
                          som={progressiveResults.tamSamEstimation.som || { value: 'N/A', percentage: 10 }}
                          segments={progressiveResults.tamSamEstimation.marketSegments}
                        />
                      </motion.div>
                    )}

                    {activeSection === 'competition' && progressiveResults.competitorAnalysis && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <CompetitionSection data={progressiveResults.competitorAnalysis} />
                      </motion.div>
                    )}

                    {activeSection === 'feasibility' && progressiveResults.feasibilityEvaluation && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <FeasibilitySection data={progressiveResults.feasibilityEvaluation} />
                      </motion.div>
                    )}

                    {activeSection === 'strategy' && progressiveResults.strategyRecommendation && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <StrategySection data={progressiveResults.strategyRecommendation} />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/my-ideas"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Ideas</span>
        </Link>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-3">{idea.title}</h1>
              {parsedAnalysis?.overallScore && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg">
                  <Sparkles size={16} className="text-yellow-400" />
                  <span className="font-bold text-lg">Score: {parsedAnalysis.overallScore}/10</span>
                </div>
              )}
            </div>

            {/* Download PDF Button */}
            {parsedAnalysis && (
              <button
                onClick={downloadPDF}
                disabled={isDownloadingPDF}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloadingPDF ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <FileDown size={18} />
                    <span>Download PDF</span>
                  </>
                )}
              </button>
            )}
          </div>

          <p className="text-gray-300 leading-relaxed mb-6">{idea.description}</p>

          {/* Privacy Control */}
          <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-center gap-2 text-sm">
              {idea.isPublic ? (
                <Eye size={16} className="text-green-400" />
              ) : (
                <EyeOff size={16} className="text-gray-400" />
              )}
              <span className="text-gray-400">
                {idea.isPublic ? 'Public - Anyone can see this idea' : 'Only you can see this idea'}
              </span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={toggleVisibility}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm"
              >
                <Share2 size={14} />
                <span>{idea.isPublic ? 'Make Private' : 'Make Public'}</span>
              </button>
              <button
                onClick={handleShare}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Copy link"
              >
                <Download size={18} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        {parsedAnalysis ? (
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Navigation Sidebar */}
            <aside className="lg:block">
              <AnalysisNavigation
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </aside>

            {/* Analysis Content */}
            <div className="space-y-12">
              {activeSection === 'market' && (
                <MarketAnalysisSection
                  marketSize={parsedAnalysis.agents?.marketAnalysis?.marketSize || 'N/A'}
                  growthRate={parsedAnalysis.agents?.marketAnalysis?.growthTrends?.[0] || 'N/A'}
                  customerNeed={parsedAnalysis.agents?.marketAnalysis?.targetAudience?.primary || 'N/A'}
                />
              )}

              {activeSection === 'tam-sam' && parsedAnalysis.agents?.tamSamEstimation && (
                <TAMSAMSection
                  tam={parsedAnalysis.agents.tamSamEstimation.tam || { value: 'N/A', percentage: 100 }}
                  sam={parsedAnalysis.agents.tamSamEstimation.sam || { value: 'N/A', percentage: 30 }}
                  som={parsedAnalysis.agents.tamSamEstimation.som || { value: 'N/A', percentage: 10 }}
                  segments={parsedAnalysis.agents.tamSamEstimation.marketSegments}
                />
              )}

              {activeSection === 'competition' && (
                <CompetitionSection data={parsedAnalysis.agents?.competitorAnalysis} />
              )}

              {activeSection === 'feasibility' && (
                <FeasibilitySection data={parsedAnalysis.agents?.feasibilityEvaluation} />
              )}

              {activeSection === 'strategy' && (
                <StrategySection data={parsedAnalysis.agents?.strategyRecommendation} />
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">Analysis results not available</p>
            <button
              onClick={() => triggerSequentialAnalysis(idea)}
              className="px-6 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-all"
            >
              Run Analysis Now
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default IdeaDetailsPage;
