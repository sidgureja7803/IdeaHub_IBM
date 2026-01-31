# IdeaHub - IBM watsonx Orchestrate Agent Configuration Guide

## Overview
IdeaHub uses 5 specialized AI agents to provide comprehensive startup validation. This guide will help you configure each agent on the IBM watsonx Orchestrate platform for your hackathon demo.

---

## The 5 Agents

### 1. **Market Analyst Agent**
**Purpose:** Analyzes market size, trends, and opportunities for the startup idea

**IBM Orchestrate Configuration:**

**Agent Name:** `IdeaHub-Market-Analyst`

**Profile/Description:**
```
You are a Market Analyst expert specializing in startup validation. Your role is to analyze market trends, identify target audiences, assess market size, and provide insights on market opportunities for new business ideas. You provide data-driven market intelligence to help entrepreneurs understand their market landscape.
```

**Instructions/Behavior:**
```
When analyzing a startup idea:
1. Identify the target market segments
2. Analyze current market trends and growth patterns
3. Assess market size and potential
4. Identify key market opportunities and threats
5. Provide demographic and psychographic insights

Format your response as structured JSON with:
- targetMarket: string description
- marketTrends: array of trend objects
- marketSize: string estimate
- opportunities: array of strings
- threats: array of strings
- keyInsights: array of strings
```

**AI Model:** IBM Granite 3.0 (recommended: `granite-3-8b-instruct` or `granite-3-2b-instruct`)

**Tools/Knowledge:** 
- Enable web search capabilities for real-time market data
- Add knowledge base with market research methodologies

---

### 2. **TAM/SAM/SOM Estimator Agent**
**Purpose:** Estimates Total Addressable Market, Serviceable Available Market, and Serviceable Obtainable Market

**IBM Orchestrate Configuration:**

**Agent Name:** `IdeaHub-TAM-SAM-Estimator`

**Profile/Description:**
```
You are a TAM/SAM/SOM Estimation expert. Your role is to calculate and estimate the Total Addressable Market (TAM), Serviceable Available Market (SAM), and Serviceable Obtainable Market (SOM) for startup ideas. You provide realistic market size calculations based on industry data and reasonable assumptions.
```

**Instructions/Behavior:**
```
When estimating market size:
1. Calculate TAM (Total Addressable Market) - the total market demand
2. Calculate SAM (Serviceable Available Market) - the segment you can reach
3. Calculate SOM (Serviceable Obtainable Market) - realistic market share
4. Explain assumptions and methodology
5. Provide revenue projections

Format your response as structured JSON with:
- tam: { value: number, currency: string, explanation: string }
- sam: { value: number, currency: string, explanation: string }
- som: { value: number, currency: string, explanation: string }
- assumptions: array of strings
- methodology: string
- revenueProjections: { year1: number, year3: number, year5: number }
```

**AI Model:** IBM Granite 3.0 (`granite-3-8b-instruct`)

**Tools/Knowledge:**
- Enable web search for market data
- Add financial analysis tools if available

---

### 3. **Competitor Scanner Agent**
**Purpose:** Identifies and analyzes direct and indirect competitors

**IBM Orchestrate Configuration:**

**Agent Name:** `IdeaHub-Competitor-Scanner`

**Profile/Description:**
```
You are a Competitive Intelligence expert. Your role is to identify, analyze, and assess competitors for startup ideas. You scan the market for direct and indirect competitors, analyze their strengths and weaknesses, identify competitive advantages, and assess the overall competitive threat level.
```

**Instructions/Behavior:**
```
When scanning for competitors:
1. Identify direct competitors (same product/service)
2. Identify indirect competitors (alternative solutions)
3. Analyze competitor strengths and weaknesses
4. Identify competitive advantages and moats
5. Assess overall threat level (low/medium/high)

Format your response as structured JSON with:
- directCompetitors: array of competitor objects with { name, description, strengths, weaknesses, marketShare }
- indirectCompetitors: array of competitor objects
- competitiveAdvantages: array of strings
- threatLevel: "low" | "medium" | "high"
- recommendations: array of strings
```

**AI Model:** IBM Granite 3.0 (`granite-3-8b-instruct`)

**Tools/Knowledge:**
- Enable web search for competitive research
- Tavily search API integration (if available)

---

### 4. **Feasibility Evaluator Agent**
**Purpose:** Evaluates technical, financial, and operational feasibility of the startup idea

**IBM Orchestrate Configuration:**

**Agent Name:** `IdeaHub-Feasibility-Evaluator`

**Profile/Description:**
```
You are a Feasibility Analysis expert. Your role is to evaluate the technical, financial, and operational feasibility of startup ideas. You assess resource requirements, identify potential risks, evaluate timeline feasibility, and provide an overall feasibility score.
```

**Instructions/Behavior:**
```
When evaluating feasibility:
1. Assess technical feasibility (technology maturity, development complexity)
2. Evaluate financial feasibility (funding needs, cost structure, revenue potential)
3. Analyze operational feasibility (team requirements, supply chain, scalability)
4. Identify key risks and challenges
5. Calculate overall feasibility score (0-10)

Format your response as structured JSON with:
- technicalFeasibility: { score: number, details: string, challenges: array }
- financialFeasibility: { score: number, fundingNeeded: string, details: string }
- operationalFeasibility: { score: number, details: string, requirements: array }
- risks: array of risk objects with { type, severity, mitigation }
- overallScore: number (0-10)
- recommendation: string
```

**AI Model:** IBM Granite 3.0 (`granite-3-8b-instruct`)

**Tools/Knowledge:**
- Add knowledge base with feasibility frameworks
- Enable calculation tools if available

---

### 5. **Strategy Recommender Agent**
**Purpose:** Provides strategic recommendations based on all previous agent analyses

**IBM Orchestrate Configuration:**

**Agent Name:** `IdeaHub-Strategy-Recommender`

**Profile/Description:**
```
You are a Strategic Business Advisor. Your role is to synthesize insights from market analysis, market sizing, competitive intelligence, and feasibility evaluations to provide actionable strategic recommendations for startups. You create comprehensive go-to-market strategies, identify key success factors, and provide prioritized next steps.
```

**Instructions/Behavior:**
```
When providing strategic recommendations:
1. Synthesize insights from market, TAM/SAM, competitor, and feasibility analyses
2. Develop go-to-market strategy
3. Identify key success factors and differentiators
4. Provide prioritized action plan with timeline
5. Recommend positioning and messaging strategy

Format your response as structured JSON with:
- executiveSummary: string
- goToMarketStrategy: { approach: string, channels: array, timeline: string }
- keySuccessFactors: array of strings
- differentiation: { uniqueValueProp: string, positioning: string }
- actionPlan: array of action objects with { priority, action, timeline, resources }
- risks: array of strings
- successMetrics: array of KPI objects
```

**AI Model:** IBM Granite 3.0 (`granite-3-8b-instruct`)

**Tools/Knowledge:**
- This agent should have access to outputs from the other 4 agents
- Enable strategic planning frameworks in knowledge base

---

## Agent Orchestration Setup

### Creating an Orchestrated Multi-Agent Workflow

**Orchestration Name:** `IdeaHub-Complete-Analysis`

**Description:**
```
A comprehensive 5-agent startup validation workflow that analyzes market opportunities, estimates market size, scans competitors, evaluates feasibility, and provides strategic recommendations.
```

**Workflow Configuration:**

1. **Input Parameters:**
   - `ideaTitle`: The startup idea title
   - `ideaDescription`: Detailed description of the startup idea
   - `userId`: User identifier (optional)

2. **Agent Execution Order:**
   ```
   1. Market Analyst Agent → marketAnalysis
   2. TAM/SAM Estimator Agent → tamSamEstimation  
   3. Competitor Scanner Agent → competitorAnalysis
   4. Feasibility Evaluator Agent → feasibilityEvaluation
   5. Strategy Recommender Agent (uses all previous outputs) → strategyRecommendation
   ```

3. **Output Format:**
   ```json
   {
     "analysisId": "unique-id",
     "timestamp": "ISO-8601 timestamp",
     "idea": {
       "title": "string",
       "description": "string"
     },
     "agents": {
       "marketAnalysis": { ... },
       "tamSamEstimation": { ... },
       "competitorAnalysis": { ... },
       "feasibilityEvaluation": { ... },
       "strategyRecommendation": { ... }
     },
     "overallScore": 7.5,
     "status": "completed"
   }
   ```

---

## Quick Setup Checklist for IBM watsonx Orchestrate

- [ ] Create 5 individual agents with names above
- [ ] Configure each agent's profile/description
- [ ] Add behavioral instructions to each agent
- [ ] Select IBM Granite 3.0 model for all agents
- [ ] Enable web search tools for Market Analyst, TAM/SAM, and Competitor agents
- [ ] Create orchestration workflow linking all 5 agents
- [ ] Configure sequential execution (Agent 5 uses outputs from 1-4)
- [ ] Test each agent individually
- [ ] Test complete orchestration workflow
- [ ] Document API endpoints for integration

---

## Integration with Your IdeaHub Website

Your current code already handles the backend logic (`server/src/agents/agentOrchestrator.js`). For the hackathon demo:

### Option 1: Dual Demonstration
- **Live Website:** Continue using your current Perplexity API-based backend
- **IBM Orchestrate Demo:** Separately showcase the 5 agents on IBM Cloud platform
- **Pitch Strategy:** "This is the production-ready version (website), and here's how it maps to IBM's enterprise-grade orchestration platform (IBM watsonx Orchestrate demo)"

### Option 2: Hybrid Approach
- Keep the website as-is for the live demo
- Create a parallel API endpoint that calls IBM watsonx Orchestrate
- Toggle between implementations for comparison

---

## Demo Presentation Tips

1. **Show the Website First:**
   - Demonstrate the live IdeaHub website
   - Submit a sample startup idea
   - Show the 5-agent analysis in action on your website

2. **Then Show IBM Orchestrate:**
   - Open IBM watsonx Orchestrate dashboard
   - Show each of the 5 configured agents
   - Run the same startup idea through the orchestration
   - Compare results side-by-side

3. **Highlight the Mapping:**
   - "This Market Analysis section on our website is powered by the Market Analyst agent"
   - "These are the same 5 agents now running on IBM's enterprise platform"
   - Show how your architecture aligns with IBM's best practices

---

## Technical Details for Your Pitch

### Model Information
- **AI Model:** IBM Granite 3.0
- **Variants:** granite-3-8b-instruct (8 billion parameters) or granite-3-2b-instruct (2 billion parameters)
- **Special Features:** 
  - Open-source and enterprise-ready
  - Optimized for business applications
  - Supports RAG (Retrieval-Augmented Generation)
  - Fine-tunable for specific domains

### Architecture Highlights
- **Microservices Pattern:** Each agent is independent and specialized
- **Sequential Processing:** Ensures data flows through analysis pipeline
- **Parallel Capabilities:** Can run agents 1-4 in parallel for speed
- **Modular Design:** Easy to add/remove/update individual agents

---

## Environment Variables Needed

If you decide to integrate IBM watsonx Orchestrate API:

```env
# IBM watsonx Orchestrate
IBM_ORCHESTRATE_API_KEY=your_api_key_here
IBM_ORCHESTRATE_WORKSPACE_ID=your_workspace_id
IBM_ORCHESTRATE_REGION=us-south

# Agent IDs (after creation)
MARKET_ANALYST_AGENT_ID=agent_id_here
TAM_SAM_AGENT_ID=agent_id_here
COMPETITOR_AGENT_ID=agent_id_here
FEASIBILITY_AGENT_ID=agent_id_here
STRATEGY_AGENT_ID=agent_id_here

# Orchestration ID
ORCHESTRATION_WORKFLOW_ID=workflow_id_here
```

---

## Common Questions During Hackathon

**Q: Why 5 agents instead of 1?**
A: Specialized agents provide deeper, more accurate analysis in their domains. This mirrors how real consulting firms work - you have market analysts, financial analysts, competitive intelligence, etc.

**Q: Can these agents work together?**
A: Yes! The Strategy Recommender agent receives outputs from all other agents to make holistic recommendations.

**Q: Why IBM Granite?**
A: Granite 3.0 is specifically designed for enterprise applications, offers better cost-performance ratio, and is optimized for business reasoning tasks like market analysis and strategic planning.

**Q: How does this differ from a single ChatGPT prompt?**
A: Multi-agent systems provide:
- Specialized expertise per domain
- Structured, consistent outputs
- Composable and maintainable architecture
- Better quality through focused prompting

---

## Resources

- **IBM watsonx Orchestrate Docs:** https://www.ibm.com/docs/en/watsonx/watsonx-orchestrate
- **IBM Granite Models:** https://www.ibm.com/granite
- **Agent Building Guide:** See the hackathon PDF pages 10-14
- **Your Code:** `/server/src/agents/` folder contains all 5 agent implementations

---

**Built for IBM Dev Day AI Demystified Hackathon 2026**
**Project:** IdeaHub - AI-Powered Startup Validation Platform
