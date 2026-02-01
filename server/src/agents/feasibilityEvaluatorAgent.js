/**
 * Feasibility Evaluator Agent
 * Assesses technical, operational, and financial viability using Perplexity AI
 */

import aiClient from '../services/aiClient.js';

class FeasibilityEvaluatorAgent {
    constructor() {
        this.aiClient = aiClient;
    }

    /**
     * Evaluate feasibility of a startup idea
     * @param {Object} ideaData - The startup idea information
     * @returns {Promise<Object>} Feasibility evaluation results
     */
    async evaluate(ideaData) {
        console.log('[FeasibilityEvaluator] Starting feasibility evaluation...');

        try {
            // Gather feasibility data using Tavily
            const feasibilityData = await this._gatherFeasibilityData(ideaData);

            // Evaluate using Perplexity AI
            const evaluation = await this._evaluateWithGranite(ideaData, feasibilityData);

            return {
                technicalFeasibility: evaluation.technicalFeasibility || {},
                operationalFeasibility: evaluation.operationalFeasibility || {},
                financialFeasibility: evaluation.financialFeasibility || {},
                overallScore: evaluation.overallScore || 0,
                risks: evaluation.risks || [],
                recommendations: evaluation.recommendations || [],
                evaluationComplete: true
            };
        } catch (error) {
            console.error('[FeasibilityEvaluator] Error:', error);
            return {
                technicalFeasibility: { score: 0 },
                operationalFeasibility: { score: 0 },
                financialFeasibility: { score: 0 },
                overallScore: 0,
                error: error.message
            };
        }
    }

    /**
     * Gather feasibility data using Perplexity AI
     * @private
     */
    async _gatherFeasibilityData(ideaData) {
        if (!this.aiClient.isEnabled()) {
            return { enabled: false, results: [] };
        }

        try {
            // Use Perplexity AI with web search to gather real-time feasibility insights
            const searchQuery = `${ideaData.description} technical requirements costs implementation challenges feasibility risks`;

            const systemPrompt = `You are a technical and business feasibility researcher. Search the web for information about technical requirements, implementation costs, challenges, and feasibility factors for this startup idea.`;

            const userPrompt = `Research feasibility for this startup: "${ideaData.description}"
            
Provide 3-5 key insights about:
1. Technical requirements and complexity
2. Implementation costs and timelines
3. Common challenges and risks
4. Required skills and resources

Format as brief bullet points with specific details.`;

            const response = await this.aiClient.chat(systemPrompt, userPrompt, {
                maxTokens: 1000,
                temperature: 0.3
            });

            return {
                enabled: true,
                results: [{ title: 'Feasibility Research', snippet: response }],
                query: searchQuery
            };
        } catch (error) {
            console.error('[FeasibilityEvaluator] Perplexity search error:', error);
            return { enabled: true, error: error.message, results: [] };
        }
    }

    /**
     * Evaluate feasibility using Perplexity AI
     * @private
     */
    async _evaluateWithGranite(ideaData, feasibilityData) {
        const systemPrompt = `You are an expert feasibility analyst. Evaluate the technical, operational, and financial viability of startup ideas.

Provide evaluation in JSON format:
{
  "technicalFeasibility": {
    "score": 0-10,
    "complexity": "low|medium|high",
    "requiredSkills": ["skill 1", "skill 2"],
    "technicalChallenges": ["challenge 1", "challenge 2"]
  },
  "operationalFeasibility": {
    "score": 0-10,
    "timeToMarket": "Estimated timeline",
    "resourceRequirements": "Resource description",
    "operationalChallenges": ["challenge 1", "challenge 2"]
  },
  "financialFeasibility": {
    "score": 0-10,
    "estimatedInitialCost": "Dollar amount",
    "monthlyBurnRate": "Dollar amount",
    "breakEvenTimeline": "Estimated timeline"
  },
  "overallScore": 0-10,
  "risks": ["risk 1", "risk 2", "risk 3"],
  "recommendations": ["recommendation 1", "recommendation 2"]
}`;

        let userPrompt = `Startup Idea: ${ideaData.description}\n`;
        userPrompt += `Category: ${ideaData.category || 'Not specified'}\n`;
        userPrompt += `Problem Solved: ${ideaData.problemSolved || 'Not specified'}\n`;

        if (feasibilityData.enabled && feasibilityData.results?.length > 0) {
            userPrompt += `\nFeasibility Research Data:\n`;
            feasibilityData.results.slice(0, 3).forEach((result, idx) => {
                userPrompt += `${idx + 1}. ${result.title}: ${result.snippet}\n`;
            });
        }

        const response = await this.aiClient.generateText(
            { systemPrompt, userPrompt },
            { temperature: 0.2, maxTokens: 2000 }
        );

        try {
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (parseError) {
            console.warn('[FeasibilityEvaluator] Failed to parse JSON');
        }

        return { raw: response };
    }
}

export default new FeasibilityEvaluatorAgent();
