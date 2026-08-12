# First Proof of Concept

## Objective

Prove the architectural boundary between a **Copilot Studio Project Agent** and an **MCP specialist capability** without attempting to build the complete enterprise platform.

## Proposed Scope

```text
1 Copilot Studio Project Agent
│
├── SharePoint project knowledge
├── Outlook / Teams context as required
├── 3–5 native actions or deterministic flows
└── MCP Document Capability
      │
      ├── inspect_office_document
      ├── edit_office_document
      └── validate_office_document
             │
        Document Agent
             │
      Word / Excel / PowerPoint Skills
             │
          OfficeCLI
```

## End-to-End Scenario

1. A Project Manager asks the project agent to update an existing Office file.
2. Copilot Studio resolves the project, user permissions, requested change, and supporting project context.
3. Power Automate retrieves the existing file and sends a structured request and file to the MCP capability.
4. The Document Agent selects the correct Office skill and uses OfficeCLI to inspect, edit, render, and validate the artifact.
5. The workflow updates the existing SharePoint file rather than creating an unrelated replacement.
6. The Project Manager reviews or accepts the result.

## Questions the PoC Must Answer

- Can the project agent retrieve project-specific context reliably?
- Can Copilot Studio route tasks correctly between native capabilities and MCP specialist capabilities?
- Can the specialist service update existing Office files while preserving design and structure?
- Can the workflow safely update the same SharePoint file and preserve the user experience?
- Do skills provide enough specialization without introducing further agent layers?
- Which guardrails and approvals are required for write actions?
- What percentage of results are accepted without manual correction?
- What are end-to-end latency and cost per successful task?
- Which components genuinely require Azure Foundry or custom infrastructure later?

## Minimum Metrics

| Category | Minimum measure |
|---|---|
| Outcome | Result accepted without manual repair |
| Quality | Requested change completed and constraints preserved |
| Safety | Permission violations and blocked unsafe actions |
| Reliability | Success rate, retries, and failure reasons |
| Performance | End-to-end latency and tool/model latency |
| Cost | Tokens, model calls, connector calls, and cost per successful task |
| Human control | Draft, approval, rejection, and correction rates |

## Initial Non-Goals

- A company-wide multi-agent hierarchy.
- A custom enterprise control plane.
- Final cloud vs. on-premises infrastructure selection.
- Full automation of high-risk external communication.
- Complete organizational knowledge extraction.
- Building a general workflow engine inside the MCP service.
