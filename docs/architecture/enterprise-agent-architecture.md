# Enterprise Agent Architecture

> Working architecture for Microsoft Copilot Studio, MCP specialist capabilities, and project-level enterprise agents.

> Source formats: [Word document](Enterprise_Agent_Architecture.docx) · [Interactive Archify diagram](../../artifacts/archify/enterprise-project-agent.architecture.html)

From Organizational Knowledge to Project-Level AI Agents

Working architecture for Microsoft Copilot Studio + MCP specialist capabilities

```text
Core thesis: model projects, roles, domains, knowledge and capabilities — not personalities. Use Copilot Studio as the business-facing agent layer and MCP specialist services when deeper execution capabilities are required.
```

Prepared for architecture discussion / Proof of Concept planning

## Executive Summary

The goal is to create a company-wide architecture for AI agents that progressively perform knowledge work on behalf of project teams. The system should not attempt to build a “Mini-Me” for every employee. Instead, it should represent why employees are needed: project context, role responsibilities, domain expertise, organizational knowledge and access to tools.

The initial implementation uses Microsoft Copilot Studio to create project-specific agents, supported by native connectors and workflows. Where Copilot Studio cannot perform specialist work deeply enough — such as editing existing Word, Excel or PowerPoint files — the project agent invokes an MCP capability backed by a specialist agent, reusable skills and OfficeCLI.

```text
Microsoft 365 Copilot
        ↓
Copilot Studio Project Agent
        ↓
Native connectors / flows + MCP specialist capabilities
        ↓
Specialist Agents + Skills + CLI / APIs
        ↓
Enterprise systems and files
```

## 1. The Three Pillars

### Pillar 1 — Knowledge & Data Gathering

Capture and structure the knowledge agents need to understand the company, its projects, roles, domains, platforms, decisions and commitments.

- Define what knowledge must exist and identify its authoritative source.
- Separate reusable role/domain knowledge from project-specific knowledge.
- Convert important implicit employee expertise into explicit organizational knowledge.

### Pillar 2 — Agent System & Creation

Turn organizational knowledge into project-level agents capable of answering questions, preparing work, performing actions and invoking specialist capabilities.

- Use Microsoft Copilot Studio as the primary agent creation and employee interaction layer.
- Create/configure agents primarily around projects rather than individual employees.
- Extend agents through reusable tools, skills, connectors, workflows and MCP specialist capabilities.

### Pillar 3 — Knowledge & Data Maintenance

Continuously keep the information used by agents synchronized with what is actually happening inside the organization.

- Capture changes from meetings, Teams, Outlook, SharePoint, Jira, Confluence and other systems.
- Detect missing, conflicting or outdated knowledge.
- Ask humans to validate proposed updates instead of expecting them to manually document everything.

## 2. Core Architecture Principle

```text
Do not model people. Model why the organization needs those people.
```

A manager normally requests something from an employee because that employee participates in a project, owns responsibilities, understands a domain, knows project history, has access to information, understands commitments, or possesses expertise required for a decision.

```text
Person
  ↓ abstract
Role
  ↓ decompose
Domain Expertise
  ↓ combine with
Project Context
  ↓ expose through
Agent Capabilities
```

The target becomes:

```text
Project + Role Knowledge + Domain Knowledge + Project Knowledge + Skills + Tools + Permissions = Project Agent Capability
```

## 3. Knowledge Architecture

### 3.1 Organizational / Role Knowledge

Reusable knowledge associated with responsibilities rather than individual projects. Examples include Project Management, Architecture, Backend Engineering, Security, Account Management and Operations.

- Responsibilities and procedures
- Templates and standards
- Decision frameworks
- Escalation rules
- Organizational practices

### 3.2 Domain / Platform Knowledge

Reusable specialist expertise, such as GitLab, Red Hat, Jira, Confluence, databases, Next.js, Microsoft 365, security and infrastructure.

- Platform capabilities and constraints
- Architecture patterns
- Approved usage
- Internal experience and known issues
- Best practices

### 3.3 Project Knowledge

Project-specific knowledge includes overview, architecture, requirements, client commitments, decisions, current status, meeting notes and the platforms used by the project.

```text
Domain knowledge describes the technology or discipline. Project knowledge describes how and why we use it here.
```

## 4. SharePoint as the Initial Knowledge Foundation

For the first implementation, SharePoint can act as the primary authoritative knowledge layer, while agents may also retrieve information from Outlook, Teams, meeting transcripts, Jira, Confluence, repositories, databases and internal systems.

```text
/company-knowledge
  /roles
    /project-management
    /architecture
    /backend
    /security
  /domains
    /gitlab
    /redhat
    /jira
    /microsoft-365
    /databases

/projects
  /project-alpha
    overview
    architecture
    requirements
    decisions
    status
    meeting-notes
```

## 5. Project Agent Factory

The primary operational unit should initially be the Project Agent. A controlled frontend lets a Project Manager provide project configuration without needing to understand prompts, retrieval pipelines, models or agent infrastructure.

| Configuration | Examples |
| --- | --- |
| Project identity | Project name, description, client/context |
| People | Project manager, team members, role assignments |
| Knowledge | SharePoint URL, relevant role and domain knowledge |
| Channels | Teams, Outlook and other project systems |
| Capabilities | Tools, MCP services and approved skills |
| Triggers | User chat, email/event, schedule |
| Permissions | Who can access the agent and what it can do |

### 5.1 Project Provisioning

```text
Create Project
   ↓
Create Teams workspace
   ↓
Create SharePoint structure
   ↓
Create documentation templates
   ↓
Assign team + permissions
   ↓
Attach domain knowledge
   ↓
Configure Copilot Studio agent
   ↓
Publish to authorized users
```

## 6. Microsoft Copilot Studio as the Primary Agent Layer

Copilot Studio is the employee-facing business layer. It should own high-level intent, project context, knowledge access, routing, permission-aware decisions and selection of the appropriate execution mechanism.

```text
EMPLOYEE
   ↓
Microsoft 365 Copilot
   ↓
Copilot Studio Project Agent
   ├── Knowledge
   ├── Native tools / connectors
   ├── Agent Flows / Power Automate
   └── MCP specialist capabilities
```

## 7. Agent Hierarchy: Conceptual, Not Mandatory Runtime Hops

The original L0 → L1 → L2 structure remains a useful taxonomy, but should not automatically become a physical chain of agents.

| Conceptual Level | Purpose |
| --- | --- |
| L0 — Orchestration | Understand the request and select the required capability. |
| L1 — Role | Represent organizational responsibility such as Project Manager or Architect. |
| L2 — Domain | Represent specialized expertise such as GitLab, databases, security or Red Hat. |

```text
Three conceptual levels remain the working hypothesis, but they are not mandatory runtime hops. Evaluations should determine where independent agents are actually required.
```

## 8. Agent vs. Skill Principle

Before introducing another agent level, determine whether the capability can be expressed as a reusable skill. Prefer a skill unless the capability genuinely requires independent reasoning, persistent context/state, distinct ownership, separate permissions or orchestration of multiple skills.

| Question | Implication |
| --- | --- |
| Needs independent reasoning or planning? | A specialist agent may be justified. |
| Needs persistent or long-running state? | A specialist agent may be justified. |
| Has separate permissions or ownership? | A specialist agent may be justified. |
| Owns a distinct knowledge domain? | A specialist agent may be justified. |
| Is primarily one reusable operation/capability? | Prefer a skill/tool. |
| Is primarily an API/connector operation? | Prefer a deterministic tool or flow. |

## 9. Skills Architecture

| Skill family | Examples |
| --- | --- |
| Platform skills | GitLab, Jira, SharePoint, Word, Excel, PowerPoint, Red Hat |
| Business skills | Prepare project status, create client briefing, analyze project risk, prepare meeting |
| Knowledge skills | Find previous decision, compare documents, find client commitment, detect conflicts |
| Maintenance skills | Detect stale information, propose update, validate references, identify gaps |
| Engineering skills | Inspect architecture, analyze logs, review implementation, compare alternatives |

## 10. Specialist Capabilities Through MCP

Copilot Studio should not be expected to perform every specialized operation itself. Model Context Protocol (MCP) provides a clean capability boundary for specialist services. An MCP tool may be backed by an AI agent, deterministic software, CLI tools, APIs, workflows or a combination of these.

```text
Copilot Studio
     │ MCP
     ▼
MCP Server
     ├── Specialist capability A
     ├── Specialist capability B
     └── Specialist capability C
```

## 11. First Specialist Capability — Office Document Agent

The first proposed MCP capability addresses deep manipulation of existing Microsoft Office documents. The specialist service uses OfficeCLI plus reusable Word, Excel, PowerPoint and validation skills.

```text
Copilot Studio
     │ requirement + file/context
     ▼
MCP Server
     ▼
Document Agent
     ├── Word Skill
     ├── Excel Skill
     ├── PowerPoint Skill
     └── Validation Skill
             ↓
          OfficeCLI
             ↓
      Modified Document
```

### 11.1 Responsibility Boundary

| Copilot Studio owns WHAT | Document Agent owns HOW |
| --- | --- |
| What the user wants | How the document is structurally manipulated |
| Which project and file are involved | Which OfficeCLI operations are required |
| Relevant project/business context | How formatting and design are preserved |
| Expected result and constraints | How the result is rendered and validated |
| Authorization and workflow | Whether another editing pass is needed |

```text
Copilot Studio understands the business task. The specialist agent understands how to execute the specialist task.
```

## 12. Document Editing Flow

Example: “Update slide 7 of the Project Alpha architecture presentation with the deployment architecture agreed during yesterday’s meeting.”

```text
User
 ↓
Project Agent
 ↓
Resolve project + retrieve decision
 ↓
Identify document
 ↓
Construct structured edit request
 ↓
Retrieve file
 ↓
Call MCP Document Capability
 ↓
Document Agent → PowerPoint Skill → OfficeCLI
 ↓
Inspect → Modify → Render → Validate
 ↓
Return modified file
 ↓
Update existing SharePoint file
 ↓
Return result to user
```

| Request field | Purpose |
| --- | --- |
| Operation | edit_presentation / edit_document / compare_document etc. |
| File | The actual source file or resolvable file reference. |
| Instruction | The requested content change. |
| Relevant context | Project decisions, meeting notes or client requirements. |
| Constraints | Preserve design, limit changes to specific slides/sheets/sections. |
| Expected output | Updated file plus validation/result metadata. |

## 13. File Update Strategy

For existing SharePoint documents, the preferred workflow should preserve the existing file identity where technically possible. This helps preserve URLs, permissions, references and version history.

```text
SharePoint existing file
        ↓
Retrieve file content
        ↓
MCP specialist processing
        ↓
Modified file
        ↓
Update/replace existing file content
```

## 14. MCP Tools Should Be Business-Level

Do not expose every low-level OfficeCLI command to Copilot Studio. Expose meaningful document capabilities and allow the specialist agent to determine the low-level execution plan.

| Recommended MCP capability | Purpose |
| --- | --- |
| inspect_office_document | Understand structure, content, metadata and editable regions. |
| edit_office_document | Modify an existing document according to structured requirements. |
| create_office_document | Create a new Word, Excel or PowerPoint artifact. |
| clone_office_document | Reuse an existing artifact as a structural/design reference. |
| compare_office_documents | Identify material differences between two versions. |
| validate_office_document | Render/check structure and confirm output quality. |

```text
Copilot Studio decides WHAT. The specialist service decides HOW.
```

## 15. Native Capabilities vs. MCP Capabilities

Not everything should go through MCP. The project agent should select the least complex capability that reliably completes the task.

| Execution mechanism | Best fit |
| --- | --- |
| Copilot Studio native capability | Straightforward agent actions and business logic. |
| Connector | Read/write access to a supported enterprise system. |
| Agent Flow / Power Automate | Deterministic multi-step workflow and integration. |
| MCP specialist capability | Deep specialist execution not conveniently available natively. |
| Future Foundry/custom agent | Complex custom orchestration, specialized models or engineering control. |

## 16. Connectors and Enterprise Systems

Agents require controlled access to the systems where work and knowledge already live. Read and write capabilities should be governed separately.

| System | Typical role |
| --- | --- |
| SharePoint | Authoritative project/domain knowledge, document storage and versioned files. |
| Outlook | Email context, incoming requests, drafts and approved outbound communication. |
| Teams | Project communication, channels, meetings and collaboration context. |
| Jira | Project work items, status, issues and delivery tracking. |
| Confluence | Documentation and project/domain knowledge where used. |
| Git repositories | Technical implementation context, code and change history. |
| Internal APIs / databases | Business-specific data and operational actions. |
| MCP services | Specialist capabilities exposed to Copilot Studio. |

## 17. Guardrails and Control

Guardrails should protect inputs, retrieval, actions and outputs. Microsoft platform controls should be reused where possible, while project/business rules remain explicitly defined by us.

### 17.1 Input Guardrails

- Identity and authorization checks
- Project scope validation
- Input safety and prompt-injection resistance
- Sensitive-data handling
- Supported operation validation

### 17.2 Retrieval Guardrails

- Permission-aware retrieval
- Project boundary enforcement
- Authoritative-source preference
- No privilege expansion through agent connectors

### 17.3 Action Guardrails

- Separate read from write permissions
- Risk classification for actions
- Human approval for high-impact actions
- Audit every external change

### 17.4 Output Guardrails

- Grounding/source checks
- Sensitive-data checks
- Fact vs assumption separation
- Human review when confidence/risk thresholds require it

## 18. Knowledge & Data Maintenance

Knowledge maintenance is the hardest long-term problem. Project truth changes through meetings, Teams, email, documents, Jira, client discussions, technical decisions, human assumptions and offline conversations. Some of this can be captured automatically; some requires human validation.

```text
Meetings / Teams / Outlook / Jira / Document changes
                 ↓
      Knowledge Maintenance Capability
                 ↓
Detect likely changes / stale knowledge / gaps
                 ↓
          Proposed update
                 ↓
           Human review
            ↙       ↘
        Approve     Edit
            ↘       ↙
        Authoritative knowledge
```

```text
The employee’s responsibility should move from “remember and document everything” toward “validate what the system believes changed.”
```

## 19. Trust Model

Agent trust is ultimately a knowledge-quality and control problem. A better model cannot compensate for stale, unauthorized or contradictory organizational data.

```text
Can we trust the agent?
        ↓
Can we trust the answer/action?
        ↓
Can we trust the underlying knowledge?
        ↓
Is the knowledge current and authoritative?
        ↓
Can changes be captured and validated reliably?
```

## 20. Evaluation, Metrics and Observability

The PoC does not need a large custom observability platform, but it should collect enough telemetry to determine whether the architecture works and what it costs.

| Evaluation area | Example measures |
| --- | --- |
| Retrieval | Relevant source found, stale source rate, permission violations. |
| Answer quality | Groundedness, correctness, completeness, hallucination rate. |
| Routing | Correct tool/skill/domain selected, unnecessary hops. |
| Actions | Correct action and parameters, failure/rollback rate, approval rate. |
| Document agent | Successful edit, validation retries, preservation of format/design. |
| Knowledge maintenance | Accepted update rate, stale knowledge rate, time-to-update. |
| Business outcome | Time saved, faster response, reduced manual search/documentation. |
| Cost/performance | Latency, model/tool calls, tokens, cost per successful task. |

### 20.1 Minimum PoC Trace

```text
request_id
project_id
operation
status
model_calls / token usage
connector + MCP calls
validation passes / retries
end-to-end latency
result accepted without manual correction
```

```text
Primary PoC success signal: the user accepts the result without manually repairing it.
```

## 21. Tools & Technologies

The table below maps the proposed technologies to their purpose in the architecture. The PoC should use the smallest subset needed to prove the end-to-end flow.

| Tool / Technology | Role | Purpose |
| --- | --- | --- |
| Microsoft 365 Copilot | Employee-facing entry point | Allows users to access project agents in the Microsoft 365 environment. |
| Microsoft Copilot Studio | Primary agent platform | Creates/configures project agents, business instructions, knowledge access, tools and triggers. |
| SharePoint | Knowledge + file system of record | Stores project/domain knowledge and Office documents with permissions and versioning. |
| Microsoft Teams | Collaboration source and channel | Provides team conversations, channels, meeting context and potential interaction surface. |
| Outlook | Email source/action channel | Provides project email context; supports drafting/sending approved communication. |
| Power Automate / Agent Flows | Deterministic workflow layer | Orchestrates file retrieval/update, notifications, project provisioning and multi-step business actions. |
| Model Context Protocol (MCP) | Specialist capability interface | Exposes reusable specialist tools/services to Copilot Studio behind a clean capability boundary. |
| Document Specialist Agent | Deep Office document executor | Receives structured editing requirements, plans document changes and coordinates skills/tools. |
| OfficeCLI | Office document manipulation engine | Reads, creates, edits, renders and validates Word, Excel and PowerPoint files for the specialist agent. |
| Word Skill | Document-domain expertise | Encodes best practices and procedures for inspecting/editing DOCX files. |
| Excel Skill | Spreadsheet-domain expertise | Encodes workbook, formula, table, chart and validation procedures for XLSX files. |
| PowerPoint Skill | Presentation-domain expertise | Encodes slide/layout/design/editing and validation procedures for PPTX files. |
| Validation Skill | Quality-control capability | Renders/inspects modified artifacts and checks that requested constraints were respected. |
| Jira Connector/API | Project delivery integration | Reads and updates project issues, work items, status and delivery data. |
| Confluence Connector/API | Knowledge integration | Reads/writes documentation where Confluence is used as an authoritative or supporting source. |
| Git repository connectors | Engineering context | Provides code, architecture and change history to technical workflows. |
| Azure / Microsoft Foundry (later) | Optional custom-agent platform | Potential future host/runtime for advanced custom orchestration, specialized models, scaling or evaluation. |
| Application Insights / platform telemetry (later) | Observability | Potential production tracing, latency, errors, usage and operational monitoring. |

## 22. Infrastructure and Deployment Questions

The PoC should not force a final cloud-vs-company-hardware decision. It should produce enough evidence to make that decision later.

| Question | What the PoC should measure |
| --- | --- |
| Cloud, hybrid or company hardware? | Security requirements, latency, operational complexity and workload characteristics. |
| Where does the specialist MCP service run? | Network access, data handling, deployment constraints and scalability. |
| Which model(s) are required? | Quality, latency and cost by task type. |
| How much will usage cost? | Requests/user, token usage, tool calls, average cost per successful task. |
| What data may leave company infrastructure? | Classification, client requirements, compliance and data residency rules. |

## 23. Recommended First Proof of Concept

The first PoC should be intentionally small. It should prove the architectural boundary rather than build the whole enterprise platform.

```text
1 Copilot Studio Project Agent
│
├── SharePoint project knowledge
├── Outlook / Teams as required
├── 3–5 native actions/flows
└── MCP Document Capability
      │
      ├── inspect_office_document
      ├── edit_office_document
      └── validate_office_document
             │
        Document Agent
             │
      Word / Excel / PPT Skills
             │
          OfficeCLI
```

### 23.1 PoC Questions to Answer

- Can a project agent reliably retrieve project-specific context?
- Can Copilot Studio route tasks correctly between native capabilities and MCP specialist capabilities?
- Can the document specialist update existing Office files while preserving design and structure?
- Can we update the same SharePoint file safely and preserve the user workflow?
- Do skills provide enough specialization without adding further agent levels?
- What guardrails and approvals are required for write actions?
- What percentage of results are accepted without manual correction?
- What are the end-to-end latency and cost per successful task?
- Which parts truly require Azure Foundry or custom infrastructure later?

## 24. Open Architecture Questions

| Area | Open questions |
| --- | --- |
| Agent hierarchy | Are L0/L1/L2 useful only as taxonomy, or do any need to become independent runtime agents? |
| Skills | How granular should skills be? Who owns and versions them? |
| MCP | Which specialist capabilities justify MCP rather than native connectors/flows? |
| Guardrails | Which rules are deterministic vs model-evaluated? Which actions require human approval? |
| Knowledge | Who owns each source? When is knowledge stale? How are contradictions resolved? |
| Permissions | How are user/project permissions propagated to tools and specialist services? |
| Maintenance | How frequently should proposed updates be generated and who validates them? |
| Metrics | What quality threshold allows draft-only vs autonomous action? |
| Infrastructure | Where should the MCP service and models run after the PoC? |
| Cost | At what usage level does a different hosting/model strategy become justified? |

## 25. Overall Mental Model

```text
1. KNOWLEDGE
   Gather → Structure → Maintain → Validate

2. BUSINESS AGENT LAYER
   Copilot Studio Project Agents

3. CAPABILITIES
   Native tools → Connectors → Flows → MCP specialist services

4. SPECIALIST EXECUTION
   Specialist Agent → Skills → CLI / APIs

5. CONTROL
   Identity → Permissions → Guardrails → Human approval → Audit

6. LEARNING
   Evaluation → Metrics → Feedback → Architecture decisions
```

```text
The PoC should prove a simple principle: Copilot Studio owns enterprise context and business intent; specialist capabilities behind MCP perform deep execution when native tools are insufficient.
```
