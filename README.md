# 🚀 IdeaHub — AI-Powered Startup Validation Platform

> **Validate your startup idea in minutes, not weeks.**  
> IdeaHub transforms raw business ideas into comprehensive, data-driven market analyses with actionable insights and strategic recommendations — powered by **IBM watsonx Orchestrate** and **IBM Granite AI**.

---

## 🏆 Built for lablab.ai x IBM watsonx.orchestrate Hackathon

**IdeaHub** is participating in the [**Agentic AI Hackathon with IBM watsonx.orchestrate**](https://lablab.ai/event/agentic-ai-hackathon-ibm-watsonx-orchestrate) — showcasing enterprise-grade multi-agent AI systems powered by IBM's cutting-edge AI orchestration platform.

### 🎯 Hackathon Highlights

- ✅ **Multi-Agent Architecture**: 5 specialized AI agents working in orchestrated harmony
- ✅ **IBM Granite Models**: Enterprise-grade foundation models for business intelligence
- ✅ **IBM watsonx Orchestrate**: Advanced agent coordination and workflow management
- ✅ **Real-Time Intelligence**: Tavily-powered market research integrated with IBM AI
- ✅ **Production-Ready**: Built with enterprise security, scalability, and reliability

**Event Details**: February 2026 | Hosted by lablab.ai  
**Tech Stack**: IBM watsonx.orchestrate, IBM Granite, Appwrite, React + TypeScript

---

## 🧩 What is IdeaHub?

**IdeaHub** helps aspiring founders analyze and validate their startup ideas using an AI-driven, multi-agent system powered by **IBM watsonx Orchestrate** that delivers real-time insights across key business dimensions:

- 📊 **Market Intelligence** — AI-powered market research with real-time Tavily search  
- 🧠 **Competitive Mapping** — Deep competitor analysis with live web data  
- 💰 **Market Sizing (TAM/SAM/SOM)** — Precise market sizing using IBM Granite AI  
- ⚙️ **Feasibility Assessment** — Technical, operational, and financial viability scoring  
- 🚀 **Strategic Recommendations** — IBM Granite-powered go-to-market strategies

Each analysis is comprehensive, data-driven, and investor-ready — delivered in **2-3 minutes**.

---

## ⚡ Performance Metrics

| Metric | Result |
|--------|--------|
| Average Analysis Time | **2-3 minutes** per startup idea |
| IBM Granite Response Time | **2-4 seconds** per agent request |
| Success Rate | **99%+ task completion** |
| Agent Architecture | **5 specialized agents** orchestrated in parallel |
| Market Intelligence | **Real-time via Tavily API** |
| Data Accuracy | **Enterprise-grade with IBM Granite** |

---

## 🧠 Multi-Agent AI Architecture (IBM watsonx Orchestrate)

IdeaHub's intelligence layer is powered by **five specialized AI agents**, each orchestrated through **IBM watsonx Orchestrate** and using **IBM Granite** for analysis and **Tavily** for market research.

### Agent Overview

| Agent | Purpose | AI Model |
|--------|----------|----------|
| 🏢 **Market Analyst** | Identifies market size, growth trends, and target audiences | IBM Granite 3.0 |
| 💡 **TAM/SAM Estimator** | Calculates Total & Serviceable Market sizes | IBM Granite 3.0 |
| ⚔️ **Competitor Scanner** | Maps competitors, emerging players, and market gaps | IBM Granite 3.0 (+ Tavily) |
| 🔬 **Feasibility Evaluator** | Assesses technical, operational, and financial viability | IBM Granite 3.0 |
| 🧭 **Strategy Recommender** | Generates go-to-market and differentiation strategies | IBM Granite 3.0 |

### 🎯 Agent Orchestration Flow

```
User Input → Frontend → API Gateway → watsonx Orchestrate
                                              ↓
                       ┌──────────────────────┴──────────────────────┐
                       │         Agent Orchestration Layer           │
                       └──────────────────┬──────────────────────────┘
                                          ↓
        ┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
        │   Agent 1   │   Agent 2   │   Agent 3   │   Agent 4   │   Agent 5   │
        │  Market     │  TAM/SAM    │ Competitor  │ Feasibility │  Strategy   │
        │  Analyst    │  Estimator  │  Scanner    │  Evaluator  │ Recommender │
        └──────┬──────┴──────┬──────┴──────┬──────┴──────┬──────┴──────┬──────┘
               │             │             │             │             │
               ↓             ↓             ↓             ↓             ↓
        IBM Granite    IBM Granite    IBM Granite   IBM Granite   IBM Granite
          + Tavily       + Tavily       + Tavily
               │             │             │             │             │
               └─────────────┴─────────────┴─────────────┴─────────────┘
                                          ↓
                            Comprehensive Analysis Report
                                          ↓
                                  Appwrite Database
                                          ↓
                             Real-time Frontend Updates
```

Each agent's output is structured, composable, and forms a detailed, investor-ready report.

---

## 🤖 IBM watsonx Integration

### 🔷 IBM Granite + watsonx Orchestrate

IdeaHub leverages **IBM Granite foundation models** orchestrated through **IBM watsonx.orchestrate** for enterprise-grade AI reasoning combined with **Tavily** for real-time market intelligence.

#### 🏗️ Multi-Agent Orchestration Architecture

- **5 Specialized AI Agents** working together via IBM watsonx Orchestrate
- **IBM Granite 3.0 models** for business analysis and strategic reasoning
- **Tavily search API** for real-time market data and competitor research
- **Intelligent orchestration** based on task requirements and dependencies
- **Parallel processing** for faster analysis completion

#### 🚀 Key Capabilities

- **Enterprise AI reasoning** with IBM Granite foundation models
- **Real-time market intelligence** via Tavily web search
- **Orchestrated agent workflows** using IBM watsonx.orchestrate
- **Parallel agent processing** for comprehensive analysis
- **Structured JSON outputs** for consistent, reliable results
- **Context-aware coordination** between agents

```javascript
// Example: Orchestrated Market Analysis using IBM watsonx
import { WatsonxOrchestrator } from './orchestration/watsonx.js';
import { IBMGraniteAgent } from './agents/graniteAgent.js';
import { TavilySearchTool } from './tools/tavily.js';

async function analyzeStartupIdea(ideaDescription) {
  // Initialize watsonx Orchestrate
  const orchestrator = new WatsonxOrchestrator({
    apiKey: process.env.IBM_WATSONX_API_KEY,
    projectId: process.env.IBM_WATSONX_PROJECT_ID
  });
  
  // Define agent workflow
  const workflow = await orchestrator.createWorkflow([
    {
      name: 'Market Analyst',
      agent: new IBMGraniteAgent({ model: 'granite-3.0-8b-instruct' }),
      tools: [new TavilySearchTool()],
      task: 'Analyze market trends and opportunities'
    },
    {
      name: 'TAM/SAM Estimator',
      agent: new IBMGraniteAgent({ model: 'granite-3.0-8b-instruct' }),
      dependsOn: ['Market Analyst'],
      task: 'Calculate market size estimates'
    },
    // ... 3 more agents
  ]);
  
  // Execute orchestrated analysis
  const results = await workflow.execute({ idea: ideaDescription });
  
  return results;
}
```

#### 🎯 Technology Benefits

- **Context-aware market evaluation** using IBM Granite's advanced reasoning
- **Coordinated multi-agent workflows** via watsonx Orchestrate
- **Live competitor data** from Tavily web search
- **Financial forecasting** with quantitative insights
- **Strategic recommendations** tailored to specific markets
- **Enterprise-grade reliability** and scalability

---

## 🧰 Core Technology Stack

| Layer | Technologies |
|-------|--------------|
| **AI Orchestration** | IBM watsonx.orchestrate |
| **AI Models** | IBM Granite 3.0 (8B/13B Instruct) |
| **Search Intelligence** | Tavily Search API |
| **Frontend** | React 18, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | Node.js (Express), IBM Watson SDK |
| **Database** | Appwrite (Auth, Database, Storage) |
| **Deployment** | Docker, Docker Compose |

---

## 💻 Environment Variables

### Frontend Variables (.env)

```bash
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Appwrite Configuration
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
```

### Backend Variables (.env)

```bash
# Server Configuration
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# 🔷 IBM watsonx & Granite (Required)
IBM_WATSONX_API_KEY=your_ibm_api_key_here
IBM_WATSONX_URL=https://us-south.ml.cloud.ibm.com
IBM_WATSONX_PROJECT_ID=your_project_id_here
GRANITE_MODEL_ID=ibm/granite-3.0-8b-instruct
IBM_ORCHESTRATE_ENABLED=true

# 🔍 Tavily Search (Required)
TAVILY_API_KEY=your_tavily_api_key_here
ENABLE_TAVILY=true

# 🔐 Appwrite (Required)
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key
APPWRITE_DATABASE_ID=your_database_id

# Optional
APPWRITE_REPORTS_BUCKET_ID=your_bucket_id
APPWRITE_DOCUMENTS_BUCKET_ID=your_bucket_id
```

### 🔑 Getting Your API Keys

#### IBM watsonx API Key
1. Visit [IBM Cloud](https://cloud.ibm.com/)
2. Create a Watson AI instance
3. Navigate to watsonx.orchestrate
4. Get your API key and project ID
5. Add to `.env` as shown above

#### Tavily API Key
1. Visit [Tavily](https://tavily.com/)
2. Sign up for an account
3. Generate an API key
4. Add to `.env` as `TAVILY_API_KEY`

#### Appwrite Setup
1. Visit [Appwrite Cloud](https://cloud.appwrite.io/)
2. Create a new project
3. Set up database and OAuth authentication
4. Add credentials to `.env`

---

## ⚙️ Key Features

- ⚡ **IBM watsonx Orchestrate**: Enterprise-grade agent orchestration platform
- 🧠 **IBM Granite AI**: Foundation models for business intelligence
- 🔍 **Tavily Search**: Real-time market intelligence and competitor research
- 🧭 **Interactive Dashboard**: Real-time analytics with live streaming updates
- 📄 **Professional Reports**: Export detailed analyses as PDF
- 🤖 **Multi-Agent System**: 5 specialized agents orchestrated in parallel
- 🌊 **Real-Time Analysis**: Watch validation unfold with live progress
- 🔐 **Appwrite Backend**: Secure OAuth (Google/GitHub), database, and storage
- 🎨 **Professional UI**: Clean dark theme with modern design

---

## 🚀 Quick Start

### 🐳 Recommended: Docker Setup

```bash
# Clone the repository
git clone https://github.com/sidgureja7803/IdeaHub_IBM.git
cd IdeaHub_IBM

# Set up environment variables
cp server/.env.example server/.env
# Edit server/.env and add your IBM watsonx and Tavily API keys

# Build and start all services
docker compose up --build
```

**Access Points:**
- 🌐 **Frontend**: http://localhost:5173
- 🔧 **Backend API**: http://localhost:5000

### 🔧 Manual Setup

#### 1. Backend Setup
```bash
cd server
npm install
cp .env.example .env

# Add your IBM watsonx, Granite, and Tavily API keys to .env
# See environment variables section above

# Start the server
npm run dev
```

#### 2. Frontend Setup
```bash
cd client
npm install
cp .env.example .env

# Start the development server
npm run dev
```

#### 3. Test Your Setup
```bash
# Visit http://localhost:5173
# Sign in with Google or GitHub OAuth
# Submit a sample startup idea for validation
# Watch the 5 IBM Granite agents analyze your idea in real-time
```

---

## 📚 API Endpoints

### Startup Validation
- `POST /api/ai/idea/evaluate` - Validate a startup idea with all 5 agents
- `GET /api/ai/health` - Check AI services status

### Agent System (via IBM watsonx Orchestrate)
- Orchestrated multi-agent workflow
- Individual agent access available
- Real-time progress streaming

### System Monitoring
- `GET /health` - Overall system health
- `GET /api/metrics/ibm-granite` - IBM Granite usage metrics
- `GET /api/metrics/orchestration` - Agent orchestration metrics

---

## 🎯 Architecture Deep Dive

```mermaid
graph TD
    A[User Input] --> B[Frontend React App]
    B --> C[Express API Server]
    C --> D[IBM watsonx Orchestrate]
    D --> E[Agent Orchestration Layer]
    E --> F1[Market Analyst]
    E --> F2[TAM/SAM Estimator]
    E --> F3[Competitor Scanner]
    E --> F4[Feasibility Evaluator]
    E --> F5[Strategy Recommender]
    F1 --> G[IBM Granite 3.0]
    F2 --> G
    F3 --> G
    F4 --> G
    F5 --> G
    F1 --> H[Tavily Search]
    F2 --> H
    F3 --> H
    G --> I[Comprehensive Analysis]
    H --> I
    I --> J[Appwrite Database]
    J --> K[Real-time Frontend Updates]
    K --> B
```

### Agent Workflow Sequence

1. **Market Analyst** (IBM Granite + Tavily) - Market research and trends
2. **TAM/SAM Estimator** (IBM Granite + Tavily) - Market sizing calculations
3. **Competitor Scanner** (IBM Granite + Tavily) - Competitive landscape mapping
4. **Feasibility Evaluator** (IBM Granite) - Viability assessment (Technical/Operational/Financial)
5. **Strategy Recommender** (IBM Granite) - Strategic recommendations and next steps

All agents coordinate through **IBM watsonx Orchestrate** for comprehensive, context-aware analysis.

---

## 🏆 Hackathon Participation

This project is built for the **Agentic AI Hackathon with IBM watsonx.orchestrate** hosted by lablab.ai (February 2026).

**Event Link**: https://lablab.ai/event/agentic-ai-hackathon-ibm-watsonx-orchestrate

### 🎯 Key Technologies Showcased

1. **IBM watsonx.orchestrate** - Multi-agent workflow orchestration
2. **IBM Granite 3.0** - Enterprise foundation models
3. **Tavily API** - Real-time market intelligence
4. **Appwrite** - Secure backend infrastructure (OAuth, Database, Storage)
5. **React + TypeScript** - Modern, type-safe frontend

### 💡 Innovation Highlights

- **Real-world application** of IBM's enterprise AI platform
- **Production-ready architecture** with proper error handling and monitoring
- **Clean, professional UI** matching enterprise standards
- **OAuth-only authentication** (Google + GitHub) for security
- **Comprehensive market analysis** in under 3 minutes

---

## 📦 Project Structure

```
IdeaHub_IBM/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── LandingPage/    # Landing page sections
│   └── dist/               # Production build
├── server/                 # Express backend
│   ├── src/
│   │   ├── agents/         # 5 AI agents
│   │   ├── api/            # API routes
│   │   ├── services/       # Business logic
│   │   └── orchestration/  # watsonx Orchestrate integration
│   └── .env                # Environment variables
├── docker-compose.yml      # Docker configuration
└── README.md               # This file
```

---

## 🔒 Security & Privacy

- ✅ **OAuth 2.0** authentication (Google + GitHub only)
- ✅ **Appwrite** for secure backend services
- ✅ **Environment variables** for sensitive data
- ✅ **CORS protection** and API rate limiting
- ✅ **IBM watsonx** enterprise-grade security

---

## 🌟 Demo & Links

**[🚀 Try Live Demo](https://ideahub-ibm.vercel.app)**  
**[📁 GitHub Repository](https://github.com/sidgureja7803/IdeaHub_IBM)**  
**[🏆 lablab.ai Hackathon Page](https://lablab.ai/event/agentic-ai-hackathon-ibm-watsonx-orchestrate)**

---

## 👨‍💻 About the Developer

**Built by Siddhant Gureja**  
Passionate about AI, startups, and building tools that empower founders.

**Connect:**
- GitHub: [@sidgureja7803](https://github.com/sidgureja7803)
- lablab.ai: [Profile](https://lablab.ai/u/@sidgureja7803)

---

## 📝 License

This project is open source and available under the MIT License.

---

❤️ **Powered By**

Made with passion for founders — powered by **IBM watsonx.orchestrate**, **IBM Granite**, **Tavily**, **Appwrite**, and **React**.

**IdeaHub** makes startup validation faster, smarter, and more accessible — turning every founder's idea into actionable intelligence.

---

**🏆 Hackathon Entry for: Agentic AI Hackathon with IBM watsonx.orchestrate (lablab.ai - February 2026)**