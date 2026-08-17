# Share Brief

## Project Name

Employee Agent Platform

Working names can change later. For now, this name is clear and direct: the product is a private AI agent platform for employees.

## Project Context

We are building an internal AI assistant platform where every employee gets a private work agent connected to their authorized enterprise tools. Version 1 runs in the cloud using Okta/Entra identity, OpenSandbox execution, GitHub-backed workspaces, and Microsoft 365 integrations. Version 2 moves the runtime to the employee laptop with local memory, local execution, and stronger privacy. The core promise is that user content is processed only while needed to fulfill the request and raw content is not retained by default. The employer gets aggregate analytics and platform insight without turning the product into employee surveillance.

## Services And Solutions

- Employee AI assistant for enterprise work.
- Okta-based employee authentication.
- Microsoft 365 access through Entra ID and Microsoft Graph.
- Outlook, Teams, SharePoint, OneDrive, and Office document workflows.
- GitHub-backed employee workspaces and versioned configuration.
- Cloud execution through employee-scoped OpenSandbox sandboxes.
- Future local execution on employee laptops.
- Secret management through Infisical, OpenBao, Vault, or equivalent.
- Runtime credential injection through OpenSandbox Credential Vault.
- Office file editing through structured tools such as Office CLI or OpenXML.
- Browser automation for systems without usable APIs.
- Privacy-preserving employer analytics.
- Policy, approval, and audit layers for sensitive actions.

## Link To Share

Share this folder:

`/home/vps-apps/employee-agent-platform/docs`

If only one document is needed first, share:

`/home/vps-apps/employee-agent-platform/docs/share-brief.md`

## Challenging Questions For The Agent

These are intentionally not basic "what is the project" questions. They test whether the agent understands the product direction, tradeoffs, privacy model, and execution strategy.

1. How should the platform decide whether to use Microsoft Graph, Office CLI, browser automation, or desktop automation for a given employee request?

2. In Version 1, what raw user data is allowed to exist only transiently, and what should be persisted after the sandbox is deleted?

3. Why should credentials not be stored in GitHub repositories, Docker images, sandbox metadata, or normal environment variables?

4. What is the difference between employee-level isolation and project-level isolation in this platform?

5. How can employer analytics prove product value without exposing raw employee conversations, emails, documents, or tool outputs?

6. What should happen when an employee asks the agent to send an email, edit a SharePoint document, or post in Teams?

7. Why is GitHub useful as a portability layer between Version 1 cloud runtime and Version 2 local runtime?

8. What should be included in a reusable sandbox template, and what must stay outside the template?

9. How should the system preserve data provenance when the agent reads or edits Microsoft 365 files?

10. What is the smallest realistic two-to-three-week delivery slice that still supports the six-month vision?

## How We Should Ask Questions

When asking the agent to reason about the project, the question should include enough context for the agent to make tradeoffs, not just produce generic answers.

A good question should include:

- Which version we are discussing: Version 1 cloud runtime or Version 2 local runtime.
- Who is affected: employee, employer, admin, security, compliance, or developer.
- Which system is involved: Okta, Entra ID, Microsoft Graph, GitHub, OpenSandbox, secret manager, browser, local device, or analytics.
- What kind of action is involved: read, write, edit, approve, execute, summarize, save, or report.
- What privacy level applies: transient processing, user-saved artifact, aggregate analytics, or audited exception.
- What decision we need: architecture, priority, implementation, risk, or product wording.

Example:

> In Version 1 cloud runtime, an employee asks the agent to summarize a SharePoint document and draft an email reply in Outlook. The agent has employee-scoped Microsoft Graph permissions and runs inside OpenSandbox. What should be processed transiently, what can be saved, which actions require approval, and what analytics can the employer see?

Better questions are specific enough to force the agent to use the platform principles.

