# Employee Agent Platform Idea

## Working Summary

We are building an internal employee agent platform: a private work assistant for every employee, authenticated through Okta, connected to enterprise systems, and designed around privacy-first execution.

The product starts as a cloud-based assistant and evolves toward a local-first assistant that runs on the employee's own laptop. The long-term goal is similar in category to Microsoft Copilot, but with stronger user privacy controls, employee-scoped runtime isolation, portable GitHub-backed workspaces, and analytics that measure value without becoming surveillance.

## Core Idea

Every employee gets an agent. The agent helps them work across tools such as Outlook, Teams, SharePoint, GitHub, calendars, documents, files, and internal systems.

The platform should be useful to the employee first. It should feel like a private work assistant, not a monitoring tool.

The employer should still understand adoption, reliability, business value, blocked workflows, and aggregate productivity signals. But employer reporting should avoid raw employee content by default.

## Product Versions

### Version 1: Cloud Runtime

Version 1 runs in the cloud or on our VPS infrastructure.

The employee authenticates with Okta. The platform maps their Okta identity to an employee workspace, policy profile, secrets namespace, and sandbox runtime.

The EVE orchestrator runs on the VPS/cloud. It controls OpenSandbox, creates employee-scoped sandboxes, injects runtime credentials from a secret manager, calls tools, and performs work in isolated cloud sandboxes.

The cloud runtime gives us faster iteration, central deployment, easier debugging, and a working product before the local runtime exists.

Privacy posture for V1:

- User content is processed only while needed to fulfill the request.
- Raw prompts, documents, emails, tool outputs, and sandbox state are not retained by default.
- After the session or task, raw runtime state is deleted unless the user explicitly saves an artifact.
- Admins and managers receive aggregate telemetry, not raw content.
- Raw-content access requires a special audited exception path, if it exists at all.

### Version 2: Local Runtime

Version 2 moves the employee agent runtime to the employee's laptop.

The employee authenticates with Okta, downloads their resources, clones their employee repository, and starts a local agent interface. The next step after setup is a chat input where the employee can work with the agent.

The local agent can operate on the employee's computer directly, subject to local permissions, organization policy, and explicit user approval for sensitive actions.

The local runtime stores user memory and state in a local SQLite database. This database should be encrypted. Secrets should use the operating system keychain or an encrypted local vault.

Privacy posture for V2:

- The company cloud does not receive raw prompts or local files by default.
- Documents can stay on the employee's device.
- Runtime execution happens locally.
- Analytics are reduced, aggregated, and privacy-preserving.
- If cloud model calls are used, the employee and organization should understand that raw content may be sent to the configured model provider.

## Employee Repository Model

Each employee may have a private GitHub repository with a standardized structure. The structure is shared across employees, but the contents are unique to the employee.

The repository acts as a portability layer:

- V1 can clone it into a cloud sandbox.
- V2 can clone it onto the employee's laptop.
- The same agent instructions, policies, resource definitions, and configuration schema can work across both runtimes.

The repository should not store raw secrets. It may store configuration, resource manifests, local preferences, non-sensitive memory, approved saved artifacts, and references to secrets.

The employee repository is not the only possible durable store, but it is a strong default because it gives versioning, portability, auditability, and easy sync between cloud and local runtimes.

## Identity Model

Okta is the identity anchor.

The Okta employee ID maps to:

- employee repository
- employee policy profile
- employee secret namespace
- employee sandbox or sandbox pool
- employee local runtime profile
- employee memory database
- employee analytics profile

For Microsoft 365 access, Microsoft Entra ID is also part of the identity and authorization story.

The likely model is:

- Okta handles employee login and workforce SSO.
- Entra ID governs access to Microsoft 365 resources such as Outlook, Teams, SharePoint, OneDrive, and Microsoft Graph.
- The platform maps the authenticated employee to delegated Microsoft permissions.
- The agent should act with employee-scoped permissions wherever possible, not broad global admin permissions.

In some companies Okta and Entra ID are federated. The exact configuration can be decided later, but the product model should assume both:

- Okta for application authentication.
- Entra ID and Microsoft Graph for Microsoft data access and provenance.

This identity model should stay consistent between V1 and V2.

## Runtime Model

The agent orchestrator should not treat sandboxes as permanent homes. Sandboxes are execution environments.

For V1, the default runtime model should be:

- employee-scoped sandbox
- fresh sandbox per task or session when practical
- optional warm pool for faster startup
- optional employee-scoped named volume for cache or explicitly durable data
- sandbox deleted or expired after use

For V2, the runtime model shifts to:

- local agent process
- local filesystem access
- local SQLite memory
- local tool execution
- optional cloud calls for models or shared enterprise APIs

## Microsoft 365 Capability Direction

The employee agent must eventually operate across the Microsoft work environment in a way that resembles what a human employee can do.

This includes:

- Outlook email and calendar
- Teams messages and meetings
- SharePoint sites and documents
- OneDrive files
- Office documents such as Word, Excel, and PowerPoint
- Microsoft Project or other Microsoft business applications where relevant
- browser-only enterprise systems where no reliable API exists

The preferred access order should be:

1. Official API or connector, especially Microsoft Graph.
2. MCP server or structured tool, if available and mature.
3. File-native editing tools such as Office CLI or OpenXML-based tooling.
4. Browser automation using Playwright or similar tools.
5. Desktop automation and screenshots, especially in Version 2 local runtime.

The principle is simple:

> Use structured APIs when available. Use browser or desktop automation when the human workflow has no usable API.

## Agent Capability Ladder

The long-term agent should be able to simulate the employee's work environment with increasing levels of capability.

### Level 1: API Actions

The agent uses official APIs and connectors.

Examples:

- Microsoft Graph for mail, files, calendar, Teams, and SharePoint where supported.
- GitHub API for repository operations.
- Internal APIs for approved systems.

This is the safest and most auditable layer.

### Level 2: Structured File Editing

The agent edits files using structured tools rather than screenshots or brittle UI automation.

Examples:

- Office CLI for `.docx`, `.xlsx`, and `.pptx`.
- OpenXML-based editing.
- Markdown/JSON/YAML edits.
- Spreadsheet and presentation manipulation through reliable libraries.

This is important because employee outcomes often need to be saved as real documents, not just chat summaries.

### Level 3: Browser Automation

The agent uses a browser when an application has no usable API or MCP surface.

Examples:

- open browser tabs
- log in through normal employee authentication
- navigate web apps
- fill forms
- download/upload files
- capture screenshots
- inspect visual state

This is closer to human behavior, but it is more fragile than APIs and needs stronger guardrails.

### Level 4: Desktop Automation

In Version 2, the local agent can operate on the employee laptop.

Examples:

- local files
- local applications
- screenshots
- browser sessions
- desktop workflows
- system-level actions allowed by policy

This is the highest capability level and should require strong user trust, approvals, and visibility.

## Agent As Executor

The platform goal is that the agent becomes the executioner of employee work.

That means the agent should eventually be able to do what the employee can do in their authorized environment:

- read permitted data
- edit permitted files
- create documents
- update systems
- use browser applications
- run local or sandboxed tools
- submit outputs
- ask for approval when an action is sensitive

The platform should not expose everything at once. These capabilities should be released in a priority order, from safer structured APIs toward broader browser and desktop automation.

## Senior Management Story

The senior management story should show the complete destination first, then bring the discussion back to near-term execution.

The six-month vision:

- every employee has a private AI work assistant
- the assistant can work across Microsoft 365, GitHub, files, browsers, and internal systems
- the employee gets real work done, not just chat answers
- the employer gets aggregate insight without raw-content surveillance
- Version 1 proves the cloud runtime
- Version 2 moves execution and memory to the employee device

The next two to three weeks:

- prove identity
- prove one employee workspace
- prove one cloud sandbox
- prove one GitHub flow
- prove one Microsoft/file workflow
- prove one privacy-safe analytics report
- prove one approval flow

This framing builds trust because it is ambitious but realistic.

## Template Model

Templates should not be project-specific or employee-specific by default.

A template should be a Docker image or runtime bundle containing common tools:

- Node.js
- Python
- Git
- GitHub CLI
- package managers
- Playwright/browser automation tools
- document processing libraries
- common build tools
- provider CLIs where appropriate

Project information belongs in GitHub repositories and resource manifests. Employee information belongs in employee repositories, policy profiles, and secret namespaces. Credentials belong in a secret manager, not in images, templates, GitHub, or normal environment variables.

## Secrets Model

Client and employee credentials should be stored in an external secret manager such as Infisical, OpenBao, or Vault.

The likely first choice is Infisical because it is self-hostable, has a UI, API, CLI, project/environment structure, and a simpler developer workflow than Vault-style systems.

For OpenSandbox, secrets can be injected at runtime through Credential Vault. Credential Vault is not permanent storage. It is an in-memory outbound credential broker inside the sandbox egress sidecar.

The orchestrator should:

1. Read required secrets from the external secret manager.
2. Create an employee-scoped sandbox.
3. Configure outbound network policy.
4. Inject Credential Vault bindings for allowed domains and paths.
5. Run the task.
6. Destroy the sandbox or let it expire.

The sandbox should receive fake or empty credentials where possible. Real credentials should be injected only into matching outbound requests.

## Analytics Model

Analytics exist to understand product value and system health, not to expose employee content.

Good analytics:

- active users
- workflow categories
- success/failure rates
- time saved estimates
- tool reliability
- connector errors
- average run duration
- departments with high adoption
- aggregate blocked tasks
- privacy-safe policy violation categories

Bad analytics by default:

- raw prompts
- raw emails
- raw Teams messages
- raw document content
- raw tool output
- per-employee content inspection
- manager dashboards that show what someone asked or read

## Current Direction

The immediate direction is to document the idea, principles, V1/V2 vision, and technical architecture before writing app code.

The likely implementation path:

1. Document the product and privacy model.
2. Build V1 orchestrator around Okta, EVE, OpenSandbox, GitHub, and a secret manager.
3. Validate employee-scoped cloud sandboxes.
4. Add aggregate analytics.
5. Define the standard employee repository structure.
6. Later, build V2 local runtime using the same identity and repository model.

## Microsoft Copilot Comparison

Microsoft Copilot should be treated as the benchmark and tactical comparison point.

Copilot is strong for immediate Microsoft 365 productivity because it is native to Outlook, Teams, Word, Excel, PowerPoint, SharePoint, and Microsoft Graph. It is likely the fastest way to get Microsoft-native AI assistance into employees' hands.

The private PCAI platform is stronger as a strategic HPE initiative because it creates an HPE-owned runtime, privacy model, deployment playbook, and internal PCAI delivery experience.

The management framing should be:

> Copilot is the benchmark. The private PCAI employee agent platform is the strategic build.

Research document:

- [Copilot vs Private PCAI Employee Agent Platform](research/copilot-vs-private-pcai-agent-platform.md)
