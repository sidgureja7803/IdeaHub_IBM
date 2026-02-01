# 🤖 IdeaHub - IBM watsonx Orchestrate Agent Setup Guide

**Complete Step-by-Step Configuration for 5 Specialized AI Agents**

---

## 📋 Overview

This guide provides detailed instructions for configuring 5 specialized AI agents on **IBM watsonx Orchestrate** for the IdeaHub startup validation platform. Each agent analyzes a specific aspect of startup ideas and works together to deliver comprehensive, investor-ready insights.

---

## 🎯 The 5 Specialized Agents

1. **Market Analyst** - Market trends, size, and opportunities
2. **TAM/SAM Estimator** - Total and serviceable market calculations
3. **Competitor Scanner** - Competitive landscape analysis
4. **Feasibility Evaluator** - Technical, operational, and financial viability
5. **Strategy Recommender** - Go-to-market strategy and recommendations

---

## 🚀 Quick Start: Creating an Agent

### Access IBM watsonx Orchestrate
1. Navigate to: `https://eu-de.watson-orchestrate.cloud.ibm.com/`
2. Sign in with your IBM Cloud credentials
3. Click **"Manage agents"** in the navigation
4. Click **"+ Create agent"** or **"Build with AI"**

---

## 📝 Agent 1: Market Analyst

### Step 1: Basic Information
- **Agent Name:** `IdeaHub-Market-Analyst`
- **Model:** Select **GPT-OSS 120B** or **IBM Granite 3.0 8B-Instruct**
- **Icon:** Choose a relevant icon (brain/chart)

### Step 2: Profile Configuration

Click on **"Profile"** tab and enter:

**Description (Required):**
```
You are a Market Analyst expert specializing in startup validation. Your role is to analyze market trends, identify target audiences, assess market size, and provide insights on market opportunities for new business ideas. You provide data-driven market intelligence to help entrepreneurs understand their market landscape.
```

**Welcome Message:**
```
Hello, I'm your Market Analyst agent. I analyze market trends, identify target audiences, and assess market opportunities for startup ideas. Share your business idea and I'll provide comprehensive market intelligence.
```

**Quick Start Prompts (Add 3-5):**
1. "Analyze the market for [startup idea]"
2. "What are the current market trends in [industry]?"
3. "Who is the target audience for [product/service]?"
4. "Assess market size and growth potential for [idea]"
5. "Identify market opportunities and threats"

### Step 3: Knowledge Configuration

Click on **"Knowledge"** tab:

**Option 1: No External Knowledge Needed**
- Click **"Skip for now"** - The agent will use its pre-trained knowledge

**Option 2: Add Knowledge Sources (Recommended for hackathon demo)**
- Click **"Add source"** → **"Upload files"**
- Upload market research PDFs or CSV files with:
  - Industry reports
  - Market size data
  - Demographic studies
  - Trend analysis reports

### Step 4: Toolset Configuration

Click on **"Toolset"** tab:

**Tools to Add:**
- **Search Tool** (if available): Enable web search for real-time market data
- **Calculator** (optional): For basic market size calculations

**Agents to Connect:**
- Leave empty for now (this agent works independently)

### Step 5: Behavior Configuration

Click on **"Behavior"** tab:

**System Instructions:**
```
When analyzing a startup idea, follow these steps:

1. MARKET SEGMENTATION
   - Identify primary and secondary target markets
   - Define customer personas and demographics
   - Assess market maturity and lifecycle stage

2. MARKET TRENDS ANALYSIS
   - Analyze current industry trends (technology, consumer behavior, regulations)
   - Identify growth patterns and future projections
   - Assess market drivers and inhibitors

3. MARKET SIZE ASSESSMENT
   - Provide initial market size estimates
   - Identify geographic markets and regions
   - Note data sources and assumptions

4. OPPORTUNITY & THREAT ANALYSIS
   - List key market opportunities
   - Identify market barriers and threats
   - Provide competitive intensity assessment

5. OUTPUT FORMAT
   Always structure your response as JSON with these fields:
   {
     "targetAudience": {
       "primary": "string",
       "secondary": "string",
       "demographics": ["array of strings"]
     },
     "marketTrends": ["array of trend descriptions"],
     "marketSize": "string estimate with units",
     "growthRate": "string percentage",
     "opportunities": ["array of opportunities"],
     "threats": ["array of threats"],
     "keyInsights": ["array of 3-5 key insights"]
   }

IMPORTANT: Be data-driven, cite sources when possible, and provide realistic assessments.
```

**Response Style:**
- Tone: Professional, analytical
- Length: Comprehensive (500-1000 tokens)
- Format: Structured JSON

### Step 6: Deploy
Click **"Deploy"** to activate the agent.

---

## 💰 Agent 2: TAM/SAM Estimator

### Step 1: Basic Information
- **Agent Name:** `IdeaHub-TAM-SAM-Estimator`
- **Model:** **GPT-OSS 120B** or **IBM Granite 3.0 8B-Instruct**

### Step 2: Profile Configuration

**Description:**
```
You are a TAM/SAM/SOM Estimation expert. Your role is to calculate and estimate the Total Addressable Market (TAM), Serviceable Available Market (SAM), and Serviceable Obtainable Market (SOM) for startup ideas. You provide realistic market size calculations based on industry data and reasonable assumptions.
```

**Welcome Message:**
```
Hello, I'm your Market Sizing expert. I calculate TAM, SAM, and SOM estimates for startup ideas using data-driven methodologies. Share your business idea and I'll provide comprehensive market size calculations.
```

**Quick Start Prompts:**
1. "Calculate TAM/SAM/SOM for [startup idea]"
2. "Estimate market size for [product/service]"
3. "What is the addressable market in [geography]?"
4. "Provide revenue projections for [idea]"

### Step 3: Knowledge
- **Skip for now** or upload market sizing frameworks (Excel templates, industry reports)

### Step 4: Toolset
**Tools:**
- **Calculator**: For mathematical calculations
- **Search**: For market data lookups

### Step 5: Behavior Configuration

**System Instructions:**
```
When estimating market size for a startup idea, follow this methodology:

1. TAM CALCULATION (Total Addressable Market)
   - Calculate the total global/national market demand
   - Use top-down (industry reports) or bottom-up (unit economics) approach
   - Provide calculation methodology and assumptions
   - Express in USD with year reference

2. SAM CALCULATION (Serviceable Available Market)
   - Define the realistic segment the startup can serve
   - Consider geographic, demographic, or category constraints
   - Calculate as percentage of TAM (typically 10-30%)
   - Justify the segment definition

3. SOM CALCULATION (Serviceable Obtainable Market)
   - Estimate realistic market share achievable in 3-5 years
   - Consider competitive landscape and barriers to entry
   - Calculate as percentage of SAM (typically 5-20% for startups)
   - Provide timeline assumptions

4. MARKET SEGMENTS
   - Break down addressable market into key segments
   - Prioritize segments by attractiveness
   - Provide size estimates for each segment

5. REVENUE PROJECTIONS
   - Year 1, Year 3, Year 5 estimates
   - Growth rate assumptions
   - Key revenue drivers

6. OUTPUT FORMAT
   Always return structured JSON:
   {
     "tam": {
       "value": "number in USD",
       "percentage": 100,
       "explanation": "string"
     },
     "sam": {
       "value": "number in USD",
       "percentage": "number (% of TAM)",
       "explanation": "string"
     },
     "som": {
       "value": "number in USD",
       "percentage": "number (% of SAM)",
       "explanation": "string"
     },
     "segments": [
       {"name": "string", "description": "string", "value": "string"}
     ],
     "assumptions": ["array of assumption strings"],
     "methodology": "string description",
     "projections": {
       "year1": "number",
       "year3": "number",
       "year5": "number"
     }
   }

CRITICAL: Provide realistic, well-justified estimates. Avoid overly optimistic projections.
```

### Step 6: Deploy
Deploy the agent.

---

## ⚔️ Agent 3: Competitor Scanner

### Step 1: Basic Information
- **Agent Name:** `IdeaHub-Competitor-Scanner`
- **Model:** **GPT-OSS 120B** or **IBM Granite 3.0 8B-Instruct**

### Step 2: Profile Configuration

**Description:**
```
You are a Competitive Intelligence expert. Your role is to identify, analyze, and assess competitors for startup ideas. You scan the market for direct and indirect competitors, analyze their strengths and weaknesses, identify competitive advantages, and assess the overall competitive threat level.
```

**Welcome Message:**
```
Hello, I'm your Competitive Intelligence agent. I identify and analyze competitors, assess market positioning, and find competitive advantages. Share your startup idea for a comprehensive competitive analysis.
```

**Quick Start Prompts:**
1. "Who are the competitors for [startup idea]?"
2. "Analyze competitive landscape in [industry]"
3. "What are the strengths and weaknesses of [competitor]?"
4. "Identify competitive advantages for [idea]"
5. "Assess competitive threat level"

### Step 3: Knowledge
- Upload competitive analysis frameworks or competitor databases (optional)

### Step 4: Toolset
**Tools:**
- **Search**: REQUIRED for finding competitor information
- **Web Scraper** (if available): For gathering competitor data

### Step 5: Behavior Configuration

**System Instructions:**
```
When analyzing competitors for a startup idea:

1. COMPETITOR IDENTIFICATION
   - Direct Competitors: Same product/service, same target market
   - Indirect Competitors: Alternative solutions to the same problem
   - Substitute Competitors: Different solutions to related problems
   - Identify 5-10 key competitors total

2. COMPETITOR ANALYSIS (for each major competitor)
   - Name and brief description
   - Product/service offerings
   - Target market and positioning
   - Market share estimate (if available)
   - Pricing strategy
   - Key strengths (3-5 points)
   - Key weaknesses (3-5 points)
   - Website/online presence

3. COMPETITIVE POSITIONING
   - Market gaps and unmet needs
   - Differentiation opportunities
   - Potential competitive advantages
   - Barriers to entry

4. THREAT ASSESSMENT
   - Overall competitive intensity: Low/Medium/High
   - Key competitive risks
   - Defensive strategies needed

5. STRATEGIC RECOMMENDATIONS
   - How to differentiate from competitors
   - Which competitor weaknesses to exploit
   - Positioning strategy

6. OUTPUT FORMAT
   Return structured JSON:
   {
     "directCompetitors": [
       {
         "name": "string",
         "description": "string",
         "marketShare": "string",
         "strengths": ["array"],
         "weaknesses": ["array"],
         "pricing": "string",
         "url": "string"
       }
     ],
     "indirectCompetitors": [...],
     "marketGaps": ["array of unmet needs"],
     "competitiveAdvantages": ["array of potential advantages"],
     "threatLevel": "low|medium|high",
     "differentiation": "string - how to stand out",
     "recommendations": ["array of strategic recommendations"]
   }

Use web search to find real, current competitors. Provide accurate, up-to-date information.
```

### Step 6: Deploy

---

## 🔬 Agent 4: Feasibility Evaluator

### Step 1: Basic Information
- **Agent Name:** `IdeaHub-Feasibility-Evaluator`
- **Model:** **GPT-OSS 120B** or **IBM Granite 3.0 8B-Instruct**

### Step 2: Profile Configuration

**Description:**
```
You are a Feasibility Analysis expert. Your role is to evaluate the technical, financial, and operational feasibility of startup ideas. You assess resource requirements, identify potential risks and challenges, evaluate timeline feasibility, and provide an overall feasibility score to help entrepreneurs understand if their idea is viable.
```

**Welcome Message:**
```
Hello, I'm your Feasibility Evaluator. I assess the technical, financial, and operational viability of startup ideas. Share your concept and I'll provide a comprehensive feasibility analysis with scoring.
```

**Quick Start Prompts:**
1. "Evaluate feasibility of [startup idea]"
2. "Assess technical feasibility for [product]"
3. "What are the financial requirements for [idea]?"
4. "Identify risks and challenges for [business]"
5. "Rate overall feasibility"

### Step 3: Knowledge
- Upload feasibility frameworks, risk assessment templates (optional)

### Step 4: Toolset
**Tools:**
- **Calculator**: For financial calculations
- **Search**: For technology and market research

### Step 5: Behavior Configuration

**System Instructions:**
```
When evaluating startup idea feasibility:

1. TECHNICAL FEASIBILITY (Score: 0-10)
   - Technology maturity and availability
   - Development complexity and timeline
   - Technical skills required
   - Infrastructure needs
   - Scalability considerations
   - Technical risks and challenges
   - Provide score with justification

2. OPERATIONAL FEASIBILITY (Score: 0-10)
   - Team size and skills needed
   - Operational complexity
   - Supply chain requirements
   - Regulatory and legal considerations
   - Scalability of operations
   - Operational risks
   - Provide score with justification

3. FINANCIAL FEASIBILITY (Score: 0-10)
   - Initial capital requirements
   - Operating cost structure
   - Revenue model viability
   - Break-even timeline
   - Funding accessibility
   - Financial risks
   - Provide score with justification

4. OVERALL ASSESSMENT
   - Calculate weighted average score
   - Identify critical success factors
   - List key opportunities
   - List key challenges
   - Provide go/no-go recommendation

5. RISK ANALYSIS
   - High-priority risks with mitigation strategies
   - Medium-priority risks
   - Timeline and execution risks

6. OUTPUT FORMAT
   Return structured JSON:
   {
     "technicalFeasibility": {
       "score": number (0-10),
       "assessment": "string summary",
       "details": "string detailed analysis",
       "challenges": ["array"]
     },
     "operationalFeasibility": {
       "score": number (0-10),
       "assessment": "string",
       "details": "string",
       "requirements": ["array"]
     },
     "financialFeasibility": {
       "score": number (0-10),
       "assessment": "string",
       "fundingNeeded": "string estimate",
       "details": "string"
     },
     "overallScore": number (0-10),
     "opportunities": ["array of opportunities"],
     "challenges": ["array of challenges"],
     "risks": [
       {"type": "string", "severity": "high|medium|low", "mitigation": "string"}
     ],
     "recommendations": ["array of recommendations"],
     "verdict": "Highly Feasible|Feasible with Challenges|Needs Refinement|Not Feasible"
   }

BE REALISTIC: Don't sugarcoat. Identify real challenges and risks.
Scoring Guide: 8-10 = Excellent, 6-7 = Good, 4-5 = Moderate Concerns, 0-3 = Significant Challenges
```

### Step 6: Deploy

---

## 🧭 Agent 5: Strategy Recommender

### Step 1: Basic Information
- **Agent Name:** `IdeaHub-Strategy-Recommender`
- **Model:** **GPT-OSS 120B** or **IBM Granite 3.0 8B-Instruct**

### Step 2: Profile Configuration

**Description:**
```
You are a Strategic Business Advisor and Go-to-Market expert. Your role is to synthesize insights from market analysis, market sizing, competitive intelligence, and feasibility evaluations to provide actionable strategic recommendations for startups. You create comprehensive go-to-market strategies, identify key success factors, define positioning, and provide prioritized next steps.
```

**Welcome Message:**
```
Hello, I'm your Strategy Recommender. I synthesize market, competition, and feasibility insights to create actionable go-to-market strategies. Share your startup idea and analysis context for strategic recommendations.
```

**Quick Start Prompts:**
1. "Create go-to-market strategy for [startup idea]"
2. "What should be my competitive positioning?"
3. "Recommend next steps for [business]"
4. "What are key success factors for [idea]?"
5. "Develop strategic action plan"

### Step 3: Knowledge
- Upload strategic planning frameworks, GTM templates (optional)

### Step 4: Toolset
**Tools:**
- **Search**: For benchmarking and strategy research
- **Other Agents** (Advanced): If watsonx Orchestrate supports agent-to-agent communication, connect this agent to receive outputs from the previous 4 agents

### Step 5: Behavior Configuration

**System Instructions:**
```
You are the final synthesis agent in a 5-agent startup validation system. Your role is to take insights from:
1. Market Analyst (market trends, opportunities, target audience)
2. TAM/SAM Estimator (market size, segments, projections)
3. Competitor Scanner (competitive landscape, gaps, advantages)
4. Feasibility Evaluator (technical, operational, financial feasibility)

And create a COMPREHENSIVE STRATEGIC RECOMMENDATION.

WORKFLOW:

1. EXECUTIVE SUMMARY
   - 2-3 sentence overview of the opportunity
   - Overall recommendation (Strong Opportunity / Moderate Potential / Needs Refinement)

2. GO-TO-MARKET STRATEGY
   - Market entry approach (direct sales, partnerships, platform, etc.)
   - Target customer acquisition channels (digital, offline, hybrid)
   - Phased rollout plan (MVP → Early Adopters → Scale)
   - Timeline estimate (6 months, 12 months, 18 months)

3. POSITIONING & DIFFERENTIATION
   - Unique value proposition (1 sentence)
   - Market positioning (how to position vs. competitors)
   - Key differentiators (3-5 points)
   - Brand messaging pillars

4. PRICING STRATEGY
   - Recommended pricing model (subscription, freemium, one-time, etc.)
   - Price point range
   - Justification based on value and competition

5. MARKETING CHANNELS
   - Prioritized list of 5-7 marketing channels
   - Rationale for each channel
   - Budget allocation suggestions

6. KEY SUCCESS FACTORS
   - 5-7 critical factors that will determine success
   - How to achieve each factor

7. ACTION PLAN (Prioritized)
   - Immediate Next Steps (0-3 months)
   - Short-term Actions (3-6 months)
   - Medium-term Actions (6-12 months)
   - Each action with priority, resources needed, expected outcome

8. SUCCESS METRICS (KPIs)
   - 5-10 key metrics to track
   - Target benchmarks for each

9. RISKS & MITIGATION
   - Top 3-5 strategic risks
   - Mitigation strategy for each

10. OUTPUT FORMAT
    Return structured JSON:
    {
      "executiveSummary": "string",
      "recommendation": "Strong Opportunity|Moderate Potential|Needs Refinement|Not Recommended",
      "goToMarketStrategy": {
        "approach": "string",
        "channels": ["array"],
        "timeline": "string",
        "phasedPlan": ["Phase 1", "Phase 2", "Phase 3"]
      },
      "positioning": {
        "uniqueValueProp": "string",
        "positioning": "string",
        "differentiators": ["array"]
      },
      "pricingStrategy": {
        "model": "string",
        "priceRange": "string",
        "justification": "string"
      },
      "marketingChannels": [
        {"channel": "string", "priority": number, "rationale": "string"}
      ],
      "keySuccessFactors": ["array of strings"],
      "actionPlan": [
        {
          "priority": "High|Medium|Low",
          "action": "string",
          "timeline": "string",
          "resources": "string",
          "outcome": "string"
        }
      ],
      "successMetrics": [
        {"metric": "string", "target": "string", "timeframe": "string"}
      ],
      "risks": [
        {"risk": "string", "severity": "high|medium|low", "mitigation": "string"}
      ]
    }

BE ACTIONABLE: Provide specific, executable recommendations, not generic advice.
BE REALISTIC: Base strategy on insights from other agents (market size, competition, feasibility).
BE COMPREHENSIVE: Cover all aspects of go-to-market strategy.
```

### Step 6: Deploy

---

## 🔗 Creating the Multi-Agent Workflow (Optional Advanced)

If IBM watsonx Orchestrate supports workflow creation:

### Workflow Name: `IdeaHub-Complete-Validation`

**Steps:**
1. **Input**: User provides startup idea description
2. **Agent 1**: Market Analyst analyzes the idea → Output: `marketAnalysis`
3. **Agent 2**: TAM/SAM Estimator (uses idea + optional market context) → Output: `tamSamData`
4. **Agent 3**: Competitor Scanner (uses idea) → Output: `competitorData`
5. **Agent 4**: Feasibility Evaluator (uses idea) → Output: `feasibilityData`
6. **Agent 5**: Strategy Recommender (receives all previous outputs) → Output: `strategy`
7. **Output**: Combined JSON with all 5 agent results

---

## ✅ Setup Checklist

Use this checklist to track your progress:

### Agent Creation
- [ ] **Agent 1: Market Analyst** created and deployed
- [ ] **Agent 2: TAM/SAM Estimator** created and deployed
- [ ] **Agent 3: Competitor Scanner** created and deployed
- [ ] **Agent 4: Feasibility Evaluator** created and deployed
- [ ] **Agent 5: Strategy Recommender** created and deployed

### Configuration Verification
- [ ] All agents use **IBM Granite 3.0** or **GPT-OSS 120B** model
- [ ] All agent profiles have detailed descriptions
- [ ] All agents have welcome messages configured
- [ ] All agents have quick start prompts defined
- [ ] Behavior instructions are detailed and include JSON output format
- [ ] Search tools enabled for Agents 1, 2, and 3
- [ ] All agents are **deployed and active**

### Testing
- [ ] Tested each agent individually with sample startup idea
- [ ] Verified JSON output format from each agent
- [ ] Checked that outputs are comprehensive and realistic
- [ ] Tested with 2-3 different startup ideas for consistency
- [ ] Documented any issues or limitations

### Integration (Optional)
- [ ] Created multi-agent workflow (if supported)
- [ ] Tested complete workflow end-to-end
- [ ] Verified data passes between agents correctly
- [ ] Noted API endpoints for programmatic access
- [ ] Documented authentication requirements

---

## 🎯 Testing Your Agents

### Test Startup Idea

Use this sample idea to test all 5 agents:

**Idea Title:** "EcoTrack - Personal Carbon Footprint Tracker"

**Idea Description:**
```
EcoTrack is a mobile app that helps individuals track and reduce their carbon footprint through daily activity logging. Users can log transportation methods, energy usage, food choices, and purchases. The app provides personalized recommendations to reduce environmental impact, gamification elements to encourage sustainable behavior, and community challenges. We target environmentally-conscious millennials and Gen Z users in urban areas. Revenue model: Freemium with premium sustainability insights and carbon offset marketplace.
```

### Expected Outputs (Check These)

**Agent 1 - Market Analyst:**
- Target audience should include millennials, Gen Z, eco-conscious consumers
- Market trends should mention sustainability, climate change awareness
- Market size estimate for environmental apps
- Opportunities and threats identified

**Agent 2 - TAM/SAM Estimator:**
- TAM in billions (global environmental app market)
- SAM narrowed to specific geography (e.g., US/EU)
- SOM realistic for a startup (percentage of SAM)
- Market segments defined (by geography, demographics, etc.)

**Agent 3 - Competitor Scanner:**
- Direct competitors: Other carbon tracking apps (e.g., Joro, Capture, etc.)
- Indirect competitors: General wellness/habit tracking apps
- Competitive advantages identified
- Threat level assessed

**Agent 4 - Feasibility Evaluator:**
- Technical feasibility: Mobile app development (score 7-9)
- Operational feasibility: Data partnerships needed (score 6-8)
- Financial feasibility: Moderate investment needed (score 6-8)
- Overall score: 7-8 out of 10

**Agent 5 - Strategy Recommender:**
- Go-to-market: App store launch, social media, influencer partnerships
- Positioning: Gamified sustainability for conscious consumers
- Pricing: Freemium with $4.99-9.99/month premium
- Action plan with immediate next steps

---

## 🎤 Demo Presentation Script

When presenting your agents during the hackathon:

### 1. Introduction (30 seconds)
> "IdeaHub uses 5 specialized AI agents built on IBM watsonx Orchestrate to validate startup ideas. Let me show you each agent in action."

### 2. Show watsonx Orchestrate Dashboard (1 minute)
- Navigate to **Manage agents**
- Show all 5 agents created
- Highlight IBM Granite model being used
- "These are our 5 specialized agents, each an expert in their domain"

### 3. Demonstrate One Agent (2 minutes)
- Click on **Market Analyst** agent
- Show the **Profile** tab (description)
- Show the **Behavior** tab (instructions)
- Click **"Talk to agent"**
- Enter the test startup idea
- Show the JSON output
- "Notice the structured, detailed market analysis it provides"

### 4. Explain the Workflow (1 minute)
- "These 5 agents work together in sequence"
- Show diagram: User → Agent 1 → Agent 2 → Agent 3 → Agent 4 → Agent 5 → Complete Report
- "The Strategy agent receives insights from all previous agents for holistic recommendations"

### 5. Show Live Website (2 minutes)
- Navigate to your IdeaHub website
- Submit the same test idea
- Show real-time agent progress (if you have live updates)
- Display the final 5-section analysis
- "This live demo shows the agents working together to validate a startup idea in under 3 minutes"

### 6. Highlight IBM Technology (30 seconds)
> "All powered by IBM Granite 3.0 foundation models and orchestrated through IBM watsonx Orchestrate - showcasing enterprise-grade AI for real business value."

---

## 🔧 Troubleshooting

### Common Issues

**Issue:** Agent doesn't return JSON format
- **Fix:** Check Behavior instructions include explicit JSON schema
- Verify the model supports structured outputs
- Add "Always return valid JSON" to system prompt

**Issue:** Agent responses are too generic
- **Fix:** Add more specific examples to behavior instructions
- Upload knowledge sources with detailed frameworks
- Test with more specific/detailed startup ideas

**Issue:** Can't find "Build with AI" option
- **Fix:** Try "Create agent" or "Add agent" button
- Check your IBM watsonx Orchestrate permissions
- Ensure you're in the correct workspace

**Issue:** Can't enable search tool
- **Fix:** Search tool availability depends on your IBM plan
- Check agent toolset documentation
- Use alternative: Include "use your knowledge and reasoning" in behavior

**Issue:** Agents not connecting in workflow
- **Fix:** Workflow features may be in beta/preview
- For hackathon: Demo agents individually, explain conceptual workflow
- Use your backend code to show actual orchestration

---

## 📚 Additional Resources

### IBM Documentation
- **watsonx Orchestrate**: https://www.ibm.com/docs/en/watsonx/watsonx-orchestrate
- **Agent Builder Guide**: https://www.ibm.com/docs/en/watsonx/watsonx-orchestrate/current?topic=agents-building
- **IBM Granite Models**: https://www.ibm.com/granite

### Your Project Files
- `/server/src/agents/` - Backend agent implementations
- `/server/src/agents/agentOrchestrator.js` - Orchestration logic
- `/client/src/components/analysis/` - Frontend result displays
- `/README.md` - Project documentation

### Hackathon Resources
- Event page: https://lablab.ai/event/agentic-ai-hackathon-ibm-watsonx-orchestrate
- IBM Dev Day registration

---

## 🏆 Success Criteria for Hackathon

Your agent setup should achieve:

- ✅ **All 5 agents created** on IBM watsonx Orchestrate
- ✅ **Consistent JSON output** from all agents
- ✅ **IBM Granite model** selected for all agents
- ✅ **Detailed behavior instructions** that ensure quality outputs
- ✅ **Live demo** showing agents in action
- ✅ **Clear mapping** between website sections and agents
- ✅ **Professional presentation** explaining multi-agent architecture
- ✅ **Working example** with 2-3 test startup ideas

---

## 💡 Pro Tips

1. **Save Your Prompts**: Copy all agent descriptions and behaviors to a local file for backup
2. **Test Iteratively**: Don't configure all 5 at once - do one, test, refine, then move to next
3. **Use Real Examples**: Test with real startup ideas (not just theoretical ones) for realistic outputs
4. **Document Everything**: Take screenshots of your agent configs for your presentation
5. **Prepare Fallback**: If live demo fails, have screenshots/videos ready
6. **Know Your Data**: Understand what each agent returns so you can explain it
7. **Practice Demo**: Run through your demo 2-3 times before presenting

---

**📝 Created for IBM watsonx Orchestrate Hackathon 2026**  
**Project:** IdeaHub - AI-Powered Startup Validation Platform  
**Tech Stack:** IBM watsonx Orchestrate + IBM Granite 3.0 + Appwrite + React  

---

**Good luck with your hackathon! 🚀**

If you encounter any issues during setup, refer to the troubleshooting section or IBM's official documentation.
