# Research: Microsoft Copilot vs Private PCAI Employee Agent Platform

Date: 2026-08-17

## Purpose

This document compares two ways to deliver an internal employee agent platform for approximately 1,000 employees:

1. Build a private employee agent platform with HPE Private Cloud AI as the target production foundation, using EVE, OpenSandbox, GitHub-backed employee workspaces, Okta/Entra identity, Microsoft Graph, Office tooling, and privacy-first analytics. The first phase is a VPS/private-server POC that proves usage, traffic, value, and technical feasibility before moving the platform onto PCAI.
2. Deliver as much of the vision as possible using Microsoft 365 Copilot and Copilot Studio.

The intended audience is executive management. The goal is to show the six-month destination, explain the strategic tradeoffs, and bring the discussion back to a realistic near-term delivery plan.

## Executive Summary

Microsoft Copilot is the fastest path to Microsoft 365 AI assistance. It gives immediate value inside Outlook, Teams, Word, Excel, PowerPoint, SharePoint, and Microsoft 365 Chat. It also comes with Microsoft governance, compliance, analytics, and integration with Microsoft Graph.

However, Microsoft Copilot does not give HPE an owned private agent platform. It also does not create the internal deployment knowledge, engineering muscle, reference architecture, and reusable PCAI delivery playbook that Sofia and Bangalore can later use with customers.

The private PCAI employee agent platform is strategically stronger in the long run because it creates:

- HPE-owned agent platform IP and operating knowledge
- a clear internal path to dogfooding HPE Private Cloud AI as the target production foundation
- a real internal customer case that begins with a controlled POC and moves toward PCAI
- reusable deployment documentation and runbooks
- employee-level privacy architecture controlled by HPE
- a path from cloud runtime in Version 1 to local runtime in Version 2
- extensibility beyond Microsoft 365
- full control over sandbox/browser/desktop execution capabilities

The recommended position is not "Microsoft Copilot is bad." It is:

> Use Microsoft Copilot now to prove immediate value with a small set of workflows. In parallel, build the HPE-owned self-hosted employee agent POC. Use the POC evidence to prepare the HPE Private Cloud AI deployment path and scale the validated platform when PCAI infrastructure is ready.

## Microsoft Copilot Licensing And Cost For 1,000 Employees

### Core Assumption

If all 1,000 employees need the full Microsoft 365 Copilot experience, assume one Microsoft 365 Copilot user subscription license per employee.

Required full Copilot licenses:

```text
1,000 employees = 1,000 Microsoft 365 Copilot user licenses
```

### Public List Price Estimate

Microsoft lists Microsoft 365 Copilot for enterprise at:

```text
$30/user/month, paid yearly
```

Annual cost for 1,000 employees:

```text
1,000 users * $30/month * 12 months = $360,000/year
```

This is the incremental Copilot add-on cost if the organization already has qualifying Microsoft 365 base licenses.

### Base License Dependency

Microsoft 365 Copilot requires a qualifying Microsoft 365 plan. If HPE already has qualifying licenses for these employees, the incremental public list estimate is `$360,000/year`.

If not, the all-in list cost depends on the base Microsoft 365 plan:

| Scenario | Public list price | 1,000-user annual estimate | Notes |
| --- | ---: | ---: | --- |
| Existing eligible M365 base license + M365 Copilot add-on | `$30/user/month` | `$360,000/year` | Incremental Copilot cost only |
| Microsoft 365 E3 + M365 Copilot | `$39 + $30 = $69/user/month` | `$828,000/year` | Uses public E3 list price |
| Microsoft 365 E5 + M365 Copilot | `$60 + $30 = $90/user/month` | `$1,080,000/year` | Uses public E5 list price |
| Microsoft 365 E7 | `$99/user/month` | `$1,188,000/year` | Public page says E7 includes Microsoft 365 Copilot and Agent 365 |
| Agent 365 standalone | `$15/user/month` | `$180,000/year` | Adjacent governance/management product, not the core Copilot license |

These are public US list-price calculations. HPE's actual enterprise agreement, regional pricing, discounts, existing license estate, and procurement terms may change the final number.

### Copilot Studio And Custom Agent Costs

Microsoft 365 Copilot includes agent-building capabilities for internal Microsoft 365 use. Standalone Copilot Studio is used for broader/custom channels and more flexible custom-agent scenarios.

Public Microsoft pricing currently shows:

```text
Copilot Studio capacity pack: $200/month for 25,000 Copilot Credits
Annual per pack: $2,400/year
```

Copilot Studio also supports pay-as-you-go through Azure. The final cost depends on actual agent usage, agent design, tools used, grounding, actions, and model type.

Important cost note:

- Many employee-facing Copilot Studio agent features are included at no extra charge when the user is licensed for Microsoft 365 Copilot and the agent operates under that user's identity, subject to Microsoft's terms and fair-use limits.
- Computer-Using Agent usage is not included in the Microsoft 365 Copilot user subscription license.
- Agentic usage outside the included paths can become metered Copilot Credit or Azure consumption.

## Option A: Private PCAI Employee Agent Platform

### What It Is

An HPE-built employee agent platform with HPE Private Cloud AI as the intended production foundation.

The first delivery phase is a controlled POC on a VPS or powerful private server. This POC proves the product value, usage patterns, traffic profile, security model, integration approach, and operational requirements with a small internal group.

After the POC validates demand and technical feasibility, the platform moves toward HPE Private Cloud AI for the scaled version: larger employee populations, self-hosted models, standardized infrastructure, network design, driver setup, storage, observability, and production operations.

Main components:

- Okta for workforce authentication
- Microsoft Entra ID for Microsoft 365 authorization
- Microsoft Graph for Outlook, Teams, SharePoint, OneDrive, and Microsoft 365 data
- EVE as the durable agent/orchestration framework
- OpenSandbox as the cloud execution layer in Version 1
- per-employee GitHub repositories as portable workspaces
- Infisical, OpenBao, or Vault for secret management
- Office CLI/OpenXML tooling for Office document edits
- Playwright/browser automation for apps without APIs
- privacy-first analytics
- future Version 2 local runtime on employee laptops

### Strategic Value

This option creates value beyond the internal assistant itself.

It lets Sofia and Bangalore build a real internal employee-agent solution while preparing the path to HPE Private Cloud AI. The POC gives evidence: real usage, traffic, workflows, value, bottlenecks, and operational requirements. The PCAI phase then turns that evidence into a documented deployment process:

- hardware sizing
- HPE Private Cloud AI deployment
- identity integration
- model/runtime configuration
- secret management
- data connector setup
- Microsoft 365 integration
- sandbox isolation
- observability
- analytics
- documentation
- runbooks
- support model
- security review
- upgrade process

That experience becomes reusable PCAI delivery knowledge.

### Why It Is Better Long Term For HPE

The private platform directly supports HPE's PCAI strategy:

- It makes HPE Private Cloud AI the target foundation for the scaled production version.
- It can prove value without waiting for a full PCAI deployment by starting with a 3 to 5 person internal POC on a VPS/private server.
- It can grow to 10 or 100 users on private self-hosted infrastructure while PCAI deployment work is prepared.
- It identifies exactly what PCAI must provide: scale, self-hosted models, infrastructure standardization, networking, drivers, and production operations.
- It creates the path to prove that PCAI can run agentic enterprise workloads.
- It produces field-ready deployment documentation.
- It builds Sofia/Bangalore execution capability.
- It creates an internal reference architecture.
- It produces reusable patterns for future customers.
- It keeps strategic control over privacy, runtime, data, and integrations.

This turns the internal assistant into both a product and a training/reference deployment for HPE PCAI services.

## Option B: Microsoft 365 Copilot / Copilot Studio

### What It Is

Microsoft's enterprise assistant and agent-building ecosystem integrated into Microsoft 365.

Main components:

- Microsoft 365 Copilot per-user licenses
- Copilot Chat
- Copilot inside Teams, Outlook, Word, Excel, PowerPoint, and other Microsoft 365 apps
- Copilot Studio for internal/custom agents
- Microsoft Graph grounding
- Power Platform connectors
- Purview, Viva Insights, and Power Platform admin capabilities for governance and analytics
- optional Agent 365 for managing and securing agents

### Strategic Value

Microsoft Copilot gives fast productivity benefits and strong Microsoft 365 integration. It is likely the fastest way to deliver AI assistance inside the Microsoft application suite.

It is strongest when the target workflows are:

- email summaries and drafts
- meeting summaries
- document drafting
- presentation assistance
- Excel analysis
- Microsoft 365 search and question answering
- lightweight internal agents inside the Microsoft 365 environment

### Limitations Against Our Vision

Microsoft Copilot is not designed around HPE-owned PCAI runtime.

Main gaps:

- It does not create HPE-owned internal agent platform IP.
- It does not dogfood HPE Private Cloud AI.
- It does not train the Sofia/Bangalore teams on full PCAI deployment.
- It does not provide the same path to local-first employee runtime.
- It gives less control over the underlying agent runtime and execution model.
- It is optimized for Microsoft 365, not full employee-device simulation.
- It may require metered costs for custom agents, external channels, advanced actions, or Computer-Using Agent workflows.
- Its privacy model is strong, but it is still a Microsoft cloud service boundary rather than HPE-controlled runtime and retention.

## Face-To-Face Comparison

| Dimension | Private PCAI Employee Agent Platform | Microsoft Copilot / Copilot Studio |
| --- | --- | --- |
| Strategic ownership | HPE owns architecture, runtime, roadmap, and IP | Microsoft owns core platform and roadmap |
| Alignment with HPE PCAI | Built with PCAI as the target production foundation; POC produces the evidence and deployment path | Does not exercise PCAI as the main runtime |
| Time to first value | Slower; needs MVP build | Faster; available as a product |
| Microsoft 365 integration | Requires Graph/Entra integration work | Native, strongest advantage |
| Employee-level isolation | Designed as a core principle | User-scoped through Microsoft permissions, less custom runtime control |
| Privacy model | HPE-defined transient processing; V2 local-first path | Microsoft enterprise data protection and retention controls |
| Local-first Version 2 | Core roadmap direction | Not equivalent to an HPE-controlled local agent runtime |
| Sandbox/browser/desktop automation | Fully controllable over time | Available only through Microsoft-supported surfaces; advanced CUA is metered/not included |
| GitHub-backed employee workspace | Core platform design | Not the native model |
| Non-Microsoft systems | Can be extended to any API, CLI, browser, or local app | Depends on connectors, Power Platform, Graph connectors, or CUA |
| Analytics | Custom privacy-safe analytics by design | Built-in Microsoft analytics, but within Microsoft model |
| Governance maturity | Must be built | Strong existing Microsoft/Purview/Power Platform ecosystem |
| Cost model | PCAI hardware/ops/engineering; reusable internal capability | Per-user subscription plus metered custom-agent usage |
| Vendor lock-in | Lower for runtime/model strategy if built well | Higher Microsoft ecosystem dependency |
| Internal team upskilling | Very high; Sofia/Bangalore learn PCAI by doing | Lower PCAI learning value |
| Customer-reference value | High; becomes an HPE PCAI internal reference | Low for PCAI, because runtime is Microsoft |

## Recommended Executive Position

The best recommendation is a phased plan:

1. Use Microsoft Copilot now for a small proof of concept.
2. Build three concrete Microsoft Copilot workflows for 2 to 10 people.
3. Measure value, adoption, friction, and workflow demand.
4. Start the HPE-owned self-hosted employee agent POC for 2 to 10 people on an existing private server/VPS.
5. Use the self-hosted POC to prove the architecture: identity, employee workspace, sandboxed execution, Microsoft integration, privacy guardrails, and analytics.
6. Begin the HPE Private Cloud AI deployment work in parallel.
7. When the PCAI hardware and infrastructure layer are ready, move the validated software platform onto PCAI and scale it.

Why:

- Copilot proves there is enterprise demand for employee assistants.
- Copilot gives immediate workflow examples and management-visible value.
- The Copilot POC teaches us which workflows matter before we build too much.
- The self-hosted POC proves that HPE can own the runtime, privacy model, orchestration, and analytics.
- The PCAI phase scales the validated platform instead of starting from theory.

The internal proposal should not be framed as "replace Microsoft Copilot immediately." It should be framed as:

> First, use Microsoft Copilot to prove immediate value through three small workflows. Then build the HPE-owned self-hosted employee agent POC for 2 to 10 people on a private server. As the PCAI hardware and infrastructure work becomes ready, move the validated platform onto HPE Private Cloud AI, scale it, and document the full deployment process.

## Six-Month Target State

After six months, the target demonstration should show:

- completed Microsoft Copilot POC with three workflows
- measured Copilot POC findings: usage, value, limitations, and user feedback
- Okta-authenticated employee agent app
- employee-scoped workspace and policy
- cloud runtime on a controlled VPS or private server suitable for POC usage
- OpenSandbox-based isolated execution
- GitHub-backed employee workspace clone/sync
- Microsoft Graph integration for selected Microsoft 365 workflows
- Office document inspection/editing through structured tooling
- browser automation for selected non-API workflows
- external secret manager integration
- privacy-safe analytics dashboard
- clear approval flow for sensitive actions
- documented path toward PCAI deployment for scale
- runbook for operating the platform
- roadmap to Version 2 local runtime

The six-month promise is a capable self-hosted POC plus Copilot comparison evidence. It proves the product and prepares the PCAI deployment path. It is not a promise of a full 1,000-user PCAI production deployment.

For the POC, the platform can use a cloud model provider while keeping orchestration, sandboxes, employee workspace, and privacy controls self-hosted. A self-hosted model becomes part of the PCAI scaling phase, not a prerequisite for the first working version.

PCAI is the intended production foundation for the scaled version:

- supporting 1,000 employees
- running self-hosted models
- standardizing GPU/runtime infrastructure
- building the driver, network, storage, and operations stack
- producing the full reusable deployment process

This is the management story:

> In six months, we can show both sides: what Microsoft Copilot can deliver quickly, and what an HPE-owned self-hosted employee agent platform can deliver with stronger control over runtime, privacy, extensibility, and the path to PCAI scale.

## Two-To-Three-Week Reality Plan

The first delivery should prove a narrow but real slice with Microsoft Copilot first:

1. Select 2 to 10 pilot users.
2. Define three Microsoft Copilot workflows.
3. Run the Copilot POC and collect usage, feedback, friction, and value signals.
4. Identify where Copilot is strong and where it does not meet the long-term platform vision.
5. In parallel, prepare the self-hosted POC plan: private server/VPS, Okta path, GitHub workspace, OpenSandbox runtime, and privacy-safe analytics.
6. Start documenting the future PCAI deployment questions and operational gaps.

Near-term success does not require full Microsoft 365 parity. It requires proving the platform shape:

```text
employee need -> Copilot workflow evidence -> self-hosted POC design -> PCAI scaling path
```

## Key Risks

### Private PCAI Platform Risks

- More engineering effort than buying Copilot licenses.
- Microsoft Graph permissions and tenant approval can delay integration.
- Browser automation can be fragile.
- Office document editing fidelity must be validated.
- Privacy-safe telemetry must be designed carefully.
- Sandbox security and secret injection require real security review.
- Hardware sizing and model/runtime costs need internal PCAI numbers.

### Microsoft Copilot Risks

- Public list cost for 1,000 full users is at least `$360,000/year` incremental before custom-agent usage.
- Advanced/custom-agent usage can add variable Copilot Studio/Azure costs.
- CUA usage is not included in the base Microsoft 365 Copilot user subscription.
- Less control over runtime, retention behavior, local-first roadmap, and non-Microsoft workflows.
- Does not create internal PCAI deployment experience.
- Does not produce the same HPE-owned reference architecture.

## Bottom Line

Microsoft Copilot is the fastest Microsoft-native productivity assistant.

The private PCAI employee agent platform is the stronger strategic bet for HPE because it turns the initiative into:

- an internal productivity product
- a PCAI dogfooding program
- a delivery capability builder
- a privacy-first agent architecture
- a reusable reference deployment
- a future customer-facing implementation pattern

For executive management, the strongest argument is:

> We are not only building an internal assistant. We are building the Sofia/Bangalore PCAI delivery muscle by making ourselves the first serious customer.

## Sources

- Microsoft 365 Copilot enterprise pricing: https://www.microsoft.com/en-us/microsoft-365-copilot/pricing/enterprise
- Microsoft 365 Copilot license prerequisites: https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-licensing
- Microsoft 365 enterprise plan pricing: https://www.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-plans-and-pricing
- Microsoft Copilot Studio pricing: https://www.microsoft.com/en-us/microsoft-365-copilot/pricing/copilot-studio
- Microsoft Copilot Studio billing rates: https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management
- Microsoft 365 Copilot privacy and security: https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy
- Microsoft 365 Copilot Chat privacy: https://learn.microsoft.com/en-us/copilot/privacy-and-protections
- HPE Private Cloud AI overview: https://www.hpe.com/us/en/private-cloud-ai.html
- HPE Private Cloud AI developer portal: https://developer.hpe.com/platform/hpe-private-cloud-ai/home/
- HPE/NVIDIA PCAI agent-related announcement: https://www.hpe.com/us/en/newsroom/press-release/2026/03/hpe-accelerates-secure-scalable-production-ready-ai-through-new-innovations-with-nvidia.html
- Vercel EVE overview: https://vercel.com/docs/eve
