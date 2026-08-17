# Technical Architecture

## Overview

The platform has two runtime modes:

- Version 1: cloud runtime using EVE, OpenSandbox, Okta, GitHub, and a secret manager.
- Version 2: local runtime using the employee laptop, Okta, a cloned employee repository, local SQLite, and local execution.

The shared architecture centers on employee identity, standardized employee repositories, policy-controlled execution, and privacy-preserving analytics.

## Core Components

### Okta

Okta is the identity provider and the anchor for employee identity.

The Okta employee ID maps to:

- employee repository
- policy profile
- secret namespace
- runtime profile
- analytics profile
- memory store

### Microsoft Entra ID

Microsoft Entra ID is the authorization and identity layer for Microsoft 365 resources.

Okta may remain the primary application login provider, but Microsoft data access requires the Microsoft tenant identity model.

The platform should support a model where:

- Okta authenticates the employee into the app.
- Entra ID authorizes access to Microsoft 365 resources.
- Microsoft Graph is the preferred API for Outlook, calendar, Teams, SharePoint, OneDrive, and related data.
- Delegated employee permissions are preferred over broad application/admin permissions.
- Admin-level Microsoft permissions are reserved for setup, governance, or explicitly approved workflows.

The exact federation between Okta and Entra ID should be decided during implementation.

### EVE Orchestrator

The EVE orchestrator is the controller for Version 1.

It should:

- authenticate users through Okta
- resolve employee identity
- load employee/project configuration
- create and manage OpenSandbox sandboxes
- fetch secrets from the secret manager
- inject runtime credential bindings
- run commands and tools in sandboxes
- enforce policies before actions
- collect privacy-safe telemetry
- delete or expire sandboxes after work is complete

### OpenSandbox

OpenSandbox is the Version 1 execution runtime layer.

It should be used for:

- creating employee-scoped sandboxes
- running commands
- managing files inside sandbox runtime
- exposing temporary service ports
- isolating work between employees
- injecting credentials through Credential Vault
- deleting runtime state after sessions

Sandboxes should be treated as disposable execution environments, not permanent storage.

Sandbox images may include Microsoft-related tooling as the product matures:

- Azure CLI (`az`) for Azure operations where appropriate
- Azure Developer CLI (`azd`) for app/deployment workflows where appropriate
- Microsoft Graph SDKs or CLIs if selected
- Office CLI for `.docx`, `.xlsx`, and `.pptx` editing
- Playwright/browser automation tools

These tools should be capabilities inside the runtime, not places where secrets are stored.

### GitHub

GitHub provides workspace portability and durable versioned configuration.

Each employee may have a private repository with a standard structure. The same repo can be cloned into a V1 cloud sandbox or onto the employee laptop for V2.

GitHub should not store raw secrets.

### Secret Manager

Secrets should live in a dedicated external secret manager.

Likely options:

- Infisical for the first implementation
- OpenBao for a stronger Vault-style open-source option
- HashiCorp Vault if enterprise Vault features are needed

The secret manager stores real credentials. The sandbox receives only runtime access, preferably through OpenSandbox Credential Vault.

### Employee Repository

The employee repository is a standardized workspace.

Potential structure:

```text
employee-workspace/
  agent/
    instructions.md
    skills/
    policies/
  resources/
    repositories.json
    connectors.json
    allowed-domains.json
  memory/
    README.md
  artifacts/
    README.md
  config/
    employee.json
    runtime.json
```

This structure is not final. The goal is to keep a common shape across all employees while allowing unique user configuration.

### Microsoft Graph And Data Provenance

Microsoft Graph should be the first serious integration path for Microsoft 365.

It can provide structured access to Microsoft resources, while preserving better auditability and provenance than pure browser automation.

The platform should track:

- which employee identity authorized the action
- which Microsoft resource was read or changed
- which tool/API performed the action
- whether the action was user-approved
- what artifact was produced
- whether raw content was persisted or discarded

The goal is not only to edit files, but to know where outputs came from and which authorized employee action produced them.

### Office File Editing

Office documents are a major outcome format.

The platform should evaluate Office CLI and related OpenXML tooling for agent-safe editing of:

- Word documents
- Excel workbooks
- PowerPoint presentations

Structured file editing should be preferred over visual automation when the file format is supported. Browser or desktop automation should be used when structured editing is not enough.

### Browser And Visual Automation

Some enterprise applications do not have good APIs, SDKs, or MCP servers.

For these systems, the agent needs a browser-capable runtime:

- open tabs
- authenticate through employee flows
- navigate UI
- fill forms
- upload/download files
- take screenshots
- reason over visible state
- recover from UI errors

Version 1 can provide browser automation inside OpenSandbox. Version 2 can move this capability to the employee laptop.

### Capability Priority Order

Capabilities should be released in a safe order:

1. Read-only APIs and connectors.
2. Safe file inspection and summarization.
3. Structured file editing with explicit approval.
4. GitHub commit/PR workflows.
5. Microsoft Graph write actions.
6. Browser automation for low-risk workflows.
7. Browser automation for higher-risk workflows with approvals.
8. Local desktop automation in Version 2.

The platform goal is full employee-agent capability over time, but the release path should move from structured and auditable workflows toward broader human-like automation.

### Analytics Layer

The analytics layer collects privacy-safe data.

It may store:

- run count
- workflow category
- tool category
- success/failure
- duration
- token/cost estimates
- connector health
- policy category
- saved artifact count

It should not store raw prompts, raw emails, raw documents, raw Teams messages, or raw tool outputs by default.

## Version 1 Runtime Flow

```text
Employee opens web app
        |
        v
Okta authentication
        |
        v
EVE resolves employee identity and policy
        |
        v
EVE creates employee-scoped OpenSandbox runtime
        |
        v
EVE fetches required secrets from secret manager
        |
        v
EVE injects Credential Vault bindings
        |
        v
Sandbox clones employee/project repository
        |
        v
Agent runs tools and commands
        |
        v
Approved artifacts are saved
        |
        v
Privacy-safe telemetry is recorded
        |
        v
Sandbox is deleted or expires
```

## Version 1 Microsoft Workflow Flow

```text
Employee asks for Microsoft-related work
        |
        v
Okta authenticates employee into platform
        |
        v
Platform resolves Microsoft/Entra authorization
        |
        v
Policy layer checks allowed resources and actions
        |
        v
Agent uses Microsoft Graph, Office tooling, or browser automation
        |
        v
Agent creates or updates the outcome
        |
        v
Employee approves sensitive writes
        |
        v
Outcome is saved to the correct Microsoft/GitHub/file destination
        |
        v
Privacy-safe provenance and analytics are recorded
```

## Version 2 Runtime Flow

```text
Employee opens local app
        |
        v
Okta authentication
        |
        v
Employee downloads resources
        |
        v
Employee repo is cloned locally
        |
        v
Local agent starts
        |
        v
Local SQLite memory is created/opened
        |
        v
Agent performs work on local machine
        |
        v
Approved artifacts are saved locally or pushed
        |
        v
Reduced privacy-safe telemetry is sent, if enabled
```

## Privacy Boundary

Version 1 can process plaintext transiently during active execution. The system should not retain raw content by default.

Version 2 moves plaintext processing to the employee device where possible. The company cloud receives less data, mostly telemetry and sync metadata.

Neither version should overpromise cryptographic invisibility unless the runtime and model execution are designed to make that true.

## Open Questions

- Exact employee repository structure.
- Which secret manager to use first.
- Whether V1 starts with one sandbox per task, one sandbox per session, or a warm pool.
- Which analytics fields are acceptable for default collection.
- How break-glass access should work.
- Whether V2 uses a local model, cloud model, or configurable model provider.
- How local SQLite is encrypted and backed up.
- How employee-controlled persistence is represented in the UI.
- How Okta and Entra ID should be federated or connected.
- Which Microsoft Graph permissions are required for the first workflows.
- Whether to use Microsoft Graph, an MCP server, Office CLI, browser automation, or a mix for each Microsoft workflow.
- How to record data provenance without storing raw content.
- Which browser automation workflows are safe enough for early release.
