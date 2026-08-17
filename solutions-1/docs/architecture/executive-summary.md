# Executive Summary

Copilot Fleet is a company-wide architecture for project-level AI agents that progressively perform knowledge work on behalf of project teams. The system does **not** attempt to create a personality-based “Mini-Me” for every employee. It models the actual reasons people are needed: project context, role responsibilities, domain expertise, organizational knowledge, permissions, and access to tools.

The initial implementation uses **Microsoft Copilot Studio** for project-specific agents and the Microsoft 365 user experience. Native connectors and Power Automate handle standard enterprise actions. Specialist capabilities that require deeper execution—such as modifying an existing Word, Excel, or PowerPoint file—are exposed through **MCP** and executed by a specialist Document Agent using reusable skills and **OfficeCLI**.

## Three Pillars

### 1. Knowledge & Data Gathering

- Capture and structure authoritative project, role, and domain knowledge.
- Separate reusable organizational expertise from project-specific implementation context.
- Convert important implicit employee knowledge into governed organizational knowledge.

### 2. Agent System & Creation

- Create one Copilot Studio Project Agent for each project or project-management context.
- Give the agent project knowledge, permissions, native tools, workflows, and specialist MCP capabilities.
- Prefer reusable skills over additional agent layers unless independent reasoning, state, ownership, or permissions justify a sub-agent.

### 3. Knowledge & Data Maintenance

- Detect changes across SharePoint, Teams, Outlook, meetings, Jira, Confluence, and documents.
- Generate proposed knowledge updates automatically.
- Ask humans to validate changes rather than manually reconstruct and document everything.

## Primary Runtime Principle

> **Copilot Studio owns WHAT. Specialist MCP services own HOW.**

```text
Employee / Project Manager
          ↓
Microsoft 365 Copilot
          ↓
Copilot Studio Project Agent
          ↓
Native capability OR Power Automate + MCP
          ↓
Specialist Agent + Skills + OfficeCLI
          ↓
Updated existing SharePoint file
```

## Executive Decision Requested

Authorize a small Proof of Concept that validates one project agent, one project knowledge source, a small set of native actions, and one MCP Document Agent flow. The PoC should measure result acceptance, permission safety, latency, cost, and whether reusable skills are sufficient without adding more agent levels.
