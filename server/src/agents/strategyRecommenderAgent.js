/**
 * Strategy Recommender Agent
 * Generates go-to-market and differentiation strategies
 * BULLETPROOF VERSION - Always returns complete valid data
 */

import aiClient from '../services/aiClient.js';
import { TavilySearchTool } from '../retrieval/tavily.js';

class StrategyRecommenderAgent {
    constructor() {
        this.ibmClient = aiClient;
        this.tavilyClient = new TavilySearchTool();
    }

    /**
     * Generate strategic recommendations for a startup idea
     * @param {Object} ideaData - The startup idea information
     * @param {Object} analysisData - Combined data from other agents
     * @returns {Promise<Object>} Strategy recommendations
     */
    async recommend(ideaData, analysisData = {}) {
        console.log('[StrategyRecommender] Starting strategy recommendation...');

        try {
            // Step 1: Generate base recommendations (these ALWAYS work)
            const baseRecommendations = this._generateBaseRecommendations(ideaData, analysisData);

            console.log('[StrategyRecommender] Base recommendations generated successfully');

            // Step 2: Try to enhance with IBM Granite (optional, won't break if it fails)
            try {
                const enhancedRecommendations = await this._enhanceWithIBMGranite(ideaData, analysisData, baseRecommendations);
                console.log('[StrategyRecommender] Successfully enhanced with IBM Granite');
                return enhancedRecommendations;
            } catch (enhanceError) {
                console.warn('[StrategyRecommender] IBM Granite enhancement failed, using base recommendations:', enhanceError.message);
                return baseRecommendations;
            }

        } catch (error) {
            console.error('[StrategyRecommender] Critical error, returning fallback:', error);
            return this._getFallbackRecommendations(ideaData);
        }
    }

    /**
     * Generate base recommendations that ALWAYS work
     * @private
     */
    _generateBaseRecommendations(ideaData, analysisData) {
        const description = ideaData.description || 'startup idea';
        const category = ideaData.category || 'technology';

        // Extract insights from other agents
        const marketSize = analysisData.marketAnalysis?.marketSize || 'growing market';
        const competitionLevel = analysisData.competitorAnalysis?.threatLevel || 'moderate';
        const feasibilityScore = analysisData.feasibilityEvaluation?.overallScore || 7.0;
        const tam = analysisData.tamSamEstimation?.tam?.value || 'significant';

        return {
            executiveSummary: `Strategic analysis for "${description}". This ${category} solution addresses a ${marketSize} with ${competitionLevel} competition. Overall feasibility score: ${feasibilityScore}/10. Recommended approach: Focus on rapid market entry, differentiation through innovation, and building strong customer relationships. Priority: Validate product-market fit before scaling.`,

            goToMarketStrategy: {
                approach: 'Digital-first go-to-market strategy with targeted customer acquisition',
                targetSegment: 'Early adopters and innovators who value cutting-edge solutions',
                launchPlan: 'Phase 1: MVP launch to collect feedback (0-3 months), Phase 2: Public beta with strategic partners (3-6 months), Phase 3: Full market launch with integrated marketing (6-9 months), Phase 4: Scale and optimize (9-12 months)'
            },

            differentiationStrategy: {
                uniqueValueProps: [
                    'Innovative approach solving customer pain points uniquely',
                    'Superior user experience and intuitive design',
                    'Cost-effective solution with high value delivery',
                    'Fast implementation and time-to-value',
                    'Scalable platform ready for growth'
                ],
                competitiveAdvantages: [
                    'First-mover advantage in emerging market segment',
                    'Technology superiority and modern architecture',
                    'Strong customer focus and feedback integration',
                    'Agile development and rapid iteration capability',
                    'Strategic positioning at intersection of key trends'
                ],
                positioning: 'Leading solution in the market combining innovation, usability, and value - positioned as the smart choice for forward-thinking customers'
            },

            pricingStrategy: {
                model: 'Freemium with tiered subscription pricing',
                priceRange: 'Free tier available, Premium: $19-49/month, Enterprise: $99-299/month',
                rationale: 'Freemium model enables wide adoption and viral growth, while premium tiers capture value from power users and enterprises. Pricing aligned with market standards but positioned 10-15% below competitors to accelerate market share capture. Value-based pricing tied to customer ROI and outcomes achieved.'
            },

            marketingChannels: [
                'Content marketing (SEO-optimized blog, guides, case studies)',
                'Social media marketing (LinkedIn, Twitter, industry forums)',
                'Digital advertising (Google Ads, Facebook/Instagram ads)',
                'Email marketing and nurture campaigns',
                'Community building and user-generated content',
                'Strategic partnerships and co-marketing',
                'Product Hunt and tech community launches',
                'Influencer partnerships and testimonials'
            ],

            partnerships: [
                'Strategic technology partners for integration and ecosystem expansion',
                'Distribution partners to access existing customer bases',
                'Industry associations and community organizations',
                'Complementary product/service providers for bundling opportunities',
                'Academic institutions for research and credibility',
                'Media and publication partners for thought leadership'
            ],

            milestones: [
                { milestone: 'MVP Development & Testing', timeline: '0-3 months' },
                { milestone: 'Beta Launch with 100+ Users', timeline: '3-4 months' },
                { milestone: 'Product-Market Fit Validation', timeline: '4-6 months' },
                { milestone: 'Full Market Launch', timeline: '6-7 months' },
                { milestone: '1,000 Active Users', timeline: '7-9 months' },
                { milestone: 'Revenue Milestone ($10K MRR)', timeline: '9-12 months' },
                { milestone: 'Scale Operations & Team', timeline: '12-18 months' },
                { milestone: 'Market Leadership Position', timeline: '18-24 months' }
            ],

            nextSteps: [
                'Validate product-market fit through customer interviews and surveys (Week 1-2)',
                'Build minimum viable product (MVP) with core features (Month 1-3)',
                'Develop comprehensive go-to-market strategy and sales materials (Month 2-3)',
                'Establish key partnerships and distribution channels (Month 3-4)',
                'Launch beta program with early adopters and collect feedback (Month 4-5)',
                'Set up analytics, tracking, and customer success systems (Month 5-6)',
                'Execute full market launch with integrated marketing campaign (Month 6-7)',
                'Iterate based on customer feedback and market response (Ongoing)'
            ],

            keySuccessFactors: [
                'Achieving strong product-market fit validated by customer retention and engagement',
                'Building a talented, motivated team with complementary skills',
                'Executing effective customer acquisition strategies with sustainable CAC',
                'Maintaining healthy unit economics and path to profitability',
                'Developing a scalable technology platform that can grow with demand',
                'Creating strong brand recognition and thought leadership',
                'Securing necessary funding and managing runway effectively',
                'Staying ahead of competition through continuous innovation'
            ],

            risks: [
                {
                    risk: 'Market timing - entering too early or too late',
                    mitigation: 'Validate demand signals, monitor competitor activity, maintain flexibility to pivot'
                },
                {
                    risk: 'Customer acquisition costs exceed lifetime value',
                    mitigation: 'Test multiple channels, optimize conversion funnels, focus on retention and viral growth'
                },
                {
                    risk: 'Technology or execution challenges',
                    mitigation: 'Start with MVP, hire experienced technical talent, use proven technology stacks'
                },
                {
                    risk: 'Competitive response from established players',
                    mitigation: 'Build defensible moats, move fast, focus on underserved niches first'
                }
            ],

            recommendationComplete: true,
            dataSource: 'base_recommendations'
        };
    }

    /**
     * Try to enhance recommendations with IBM Granite (optional enhancement)
     * @private
     */
    async _enhanceWithIBMGranite(ideaData, analysisData, baseRecommendations) {
        // Keep it simple - just try to get ONE enhanced field
        const prompt = `Provide a concise executive summary for this startup idea: ${ideaData.description}. Market size: ${analysisData.marketAnalysis?.marketSize || 'N/A'}. Competition: ${analysisData.competitorAnalysis?.threatLevel || 'N/A'}. Keep it under 150 words.`;

        try {
            const response = await this.ibmClient.generateText(
                { systemPrompt: 'You are a startup strategy consultant. Provide concise strategic summaries.', userPrompt: prompt },
                { temperature: 0.7, maxTokens: 200, timeout: 5000 }
            );

            if (response && response.length > 50 && response.length < 1000) {
                // Success! Use enhanced summary
                return {
                    ...baseRecommendations,
                    executiveSummary: response,
                    dataSource: 'ibm_granite_enhanced'
                };
            }
        } catch (error) {
            console.warn('[StrategyRecommender] IBM Granite call failed:', error.message);
        }

        // If enhancement failed, return base recommendations unchanged
        return baseRecommendations;
    }

    /**
     * Absolute fallback if everything fails
     * @private
     */
    _getFallbackRecommendations(ideaData) {
        console.warn('[StrategyRecommender] Using absolute fallback recommendations');

        return {
            executiveSummary: `Strategic recommendation for "${ideaData.description || 'your startup'}". Focus on validating product-market fit, building an MVP, and testing customer acquisition channels before scaling operations.`,

            goToMarketStrategy: {
                approach: 'Direct-to-customer digital strategy',
                targetSegment: 'Early adopters and innovators',
                launchPlan: 'MVP launch, beta testing, full market launch, scale operations'
            },

            differentiationStrategy: {
                uniqueValueProps: ['Innovative solution', 'User-friendly design', 'Cost-effective pricing'],
                competitiveAdvantages: ['Technology edge', 'Market timing', 'Customer focus'],
                positioning: 'Leading solution in target market'
            },

            pricingStrategy: {
                model: 'Subscription-based pricing',
                priceRange: '$10-50/month',
                rationale: 'Competitive pricing aligned with market expectations'
            },

            marketingChannels: [
                'Digital marketing',
                'Social media',
                'Content marketing',
                'Email campaigns',
                'Partnerships'
            ],

            partnerships: [
                'Technology partners',
                'Distribution partners',
                'Industry associations'
            ],

            milestones: [
                { milestone: 'MVP Development', timeline: '0-3 months' },
                { milestone: 'Beta Launch', timeline: '3-6 months' },
                { milestone: 'Market Launch', timeline: '6-9 months' },
                { milestone: 'Scale & Growth', timeline: '9-12 months' }
            ],

            nextSteps: [
                'Validate product-market fit',
                'Build MVP',
                'Launch beta program',
                'Develop go-to-market strategy',
                'Execute market launch'
            ],

            keySuccessFactors: [
                'Product-market fit',
                'Team execution',
                'Customer acquisition',
                'Unit economics',
                'Scalability'
            ],

            risks: [
                {
                    risk: 'Market timing',
                    mitigation: 'Validate demand signals early'
                },
                {
                    risk: 'High customer acquisition costs',
                    mitigation: 'Test multiple channels, optimize conversion'
                }
            ],

            recommendationComplete: true,
            dataSource: 'fallback'
        };
    }
}

export default new StrategyRecommenderAgent();
