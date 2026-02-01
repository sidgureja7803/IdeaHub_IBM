/**
 * Competitor Scanner Agent
 * Maps competitors, emerging players, and market gaps using Perplexity AI
 */

import aiClient from '../services/aiClient.js';

class CompetitorScannerAgent {
    constructor() {
        this.aiClient = aiClient;
    }

    /**
     * Scan for competitors in the market
     * @param {Object} ideaData - The startup idea information
     * @returns {Promise<Object>} Competitor analysis results
     */
    async scan(ideaData) {
        console.log('[CompetitorScanner] Starting competitor scan...');

        try {
            // Gather competitor data using Tavily
            const competitorData = await this._gatherCompetitorData(ideaData);

            // Analyze competitors using Perplexity AI
            const analysis = await this._analyzeWithGranite(ideaData, competitorData);

            return {
                competitors: analysis.competitors || [],
                emergingPlayers: analysis.emergingPlayers || [],
                marketGaps: analysis.marketGaps || [],
                competitiveLandscape: analysis.competitiveLandscape || 'Analysis unavailable',
                threatLevel: analysis.threatLevel || 'medium',
                sources: competitorData.results || [],
                scanComplete: true
            };
        } catch (error) {
            console.error('[CompetitorScanner] Error:', error);
            return {
                competitors: [],
                emergingPlayers: [],
                marketGaps: [],
                error: error.message
            };
        }
    }

    /**
     * Gather competitor data using Perplexity AI
     * @private
     */
    async _gatherCompetitorData(ideaData) {
        if (!this.aiClient.isEnabled()) {
            return { enabled: false, results: [] };
        }

        try {
            const searchQuery = `${ideaData.description} competitors startups companies market players alternatives`;
            console.log('[CompetitorScanner] Researching competitors with Perplexity:', searchQuery);

            const systemPrompt = `You are a competitive intelligence analyst. Search the web for competitors, similar companies, and market players in this space.`;

            const userPrompt = `Research competitors for: "${ideaData.description}"

Provide detailed information about:
- Direct competitors (companies doing exactly the same thing)
- Indirect competitors (alternative solutions)
- Emerging players and startups
- Market leaders and their strengths/weaknesses
- Market gaps and opportunities

Include specific company names and details.`;

            const response = await this.aiClient.chat(systemPrompt, userPrompt, {
                maxTokens: 1500,
                temperature: 0.3
            });

            return {
                enabled: true,
                results: [{ title: 'Competitor Research', snippet: response }],
                query: searchQuery
            };
        } catch (error) {
            console.error('[CompetitorScanner] Perplexity search error:', error);
            return { enabled: true, error: error.message, results: [] };
        }
    }

    /**
     * Analyze competitors using Perplexity AI
     * @private
     */
    async _analyzeWithGranite(ideaData, competitorData) {
        const systemPrompt = `You are an expert competitive intelligence analyst. Analyze the competitive landscape for startup ideas.

Provide analysis in JSON format:
{
  "competitors": [
    {
      "name": "Competitor name",
      "description": "What they do",
      "strengths": ["strength 1", "strength 2"],
      "weaknesses": ["weakness 1", "weakness 2"],
      "marketPosition": "Leader/Challenger/Niche"
    }
  ],
  "emergingPlayers": ["Player 1", "Player 2"],
  "marketGaps": ["Gap 1", "Gap 2", "Gap 3"],
  "competitiveLandscape": "Overall competitive landscape description",
  "threatLevel": "low|medium|high"
}`;

        let userPrompt = `Startup Idea: ${ideaData.description}\n`;
        userPrompt += `Category: ${ideaData.category || 'Not specified'}\n`;

        if (competitorData.enabled && competitorData.results?.length > 0) {
            userPrompt += `\nCompetitor Research Data:\n`;
            competitorData.results.slice(0, 5).forEach((result, idx) => {
                userPrompt += `${idx + 1}. ${result.title}: ${result.snippet}\n`;
            });
        }

        const response = await this.aiClient.generateText(
            { systemPrompt, userPrompt },
            { temperature: 0.3, maxTokens: 2000 }
        );

        try {
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (parseError) {
            console.warn('[CompetitorScanner] Failed to parse JSON');
        }

        return { raw: response };
    }
}

export default new CompetitorScannerAgent();
