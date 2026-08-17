# Vision

## Product Vision

Build a private AI work assistant for every employee.

The assistant helps employees operate across their daily work systems: email, chat, calendars, documents, files, repositories, internal tools, and business workflows.

The platform should feel like an employee-owned workspace, not a surveillance layer. It should give the company useful aggregate insight into adoption and value while protecting raw employee content by default.

## Fundamental Privacy Promise

We process user content only while needed to fulfill the request. We do not persist raw prompts, documents, emails, or tool outputs by default. After the session, raw runtime state is deleted. Admins get aggregate telemetry, not content.

This is the core product promise for Version 1.

Version 2 moves closer to stronger privacy by putting the runtime, memory, and execution on the employee's own device.

## Version 1 Vision: Cloud Runtime

Version 1 proves the workflows.

Employees authenticate with Okta and use a web app/chat interface. The orchestrator runs in the cloud or on the VPS. OpenSandbox provides employee-scoped execution environments. Enterprise connectors use employee-scoped permissions.

V1 should focus on:

- useful employee workflows
- employee-level runtime isolation
- privacy-preserving telemetry
- Okta identity
- GitHub-backed portability
- secret manager integration
- disposable cloud sandboxes
- clear approval flows for sensitive actions

The cloud runtime makes it easier to iterate, operate, observe failures, and improve the system before moving execution to laptops.

## Version 2 Vision: Local Runtime

Version 2 moves the assistant to the employee's laptop.

The employee authenticates with Okta, downloads their resources, clones their employee repository, and runs the local agent. The local app provides a chat input and lets the agent operate on the employee's machine with local permissions.

V2 should focus on:

- local execution
- local encrypted SQLite memory
- local files staying local by default
- reduced cloud telemetry
- OS keychain or local vault for secrets
- same employee repository structure as V1
- same policy model as V1
- optional cloud model/provider calls when configured

The product arc is:

V1 proves the workflows in the cloud.
V2 moves runtime and memory closer to the employee.

## Long-Term Direction

The long-term system is an enterprise agent platform with:

- employee-owned agent workspaces
- strong privacy defaults
- configurable enterprise policies
- local-first execution option
- GitHub-backed workspace portability
- Okta-backed identity
- aggregate analytics without surveillance
- audited exception access
- reusable runtime templates
- external secret manager integration

## Six-Month Vision

In six months, the product should be understandable to senior management as:

> A privacy-first internal employee agent platform that gives every employee a private AI assistant capable of working across Microsoft 365, GitHub, browsers, files, and internal systems, while giving leadership aggregate insight without exposing raw employee content.

The six-month picture should show the full ambition:

- employee agents authenticated through enterprise identity
- cloud runtime for Version 1
- local runtime direction for Version 2
- Microsoft 365 integration through Entra ID and Microsoft Graph
- GitHub-backed employee workspaces
- sandboxed execution with OpenSandbox
- runtime credential injection through a secret manager
- Office document editing through structured tools where possible
- browser automation for systems without APIs
- screenshot and visual workflows for human-like application use
- aggregate analytics for leadership
- privacy guardrails that prevent surveillance by default

The narrative for leadership is:

1. Here is the six-month destination.
2. Here is why the architecture can grow toward it.
3. Here is what we can realistically deliver in the next two to three weeks.

## Near-Term Delivery Framing

The first delivery should not attempt the full six-month vision.

The next two to three weeks should prove:

- Okta or enterprise identity login path
- one employee-scoped workspace
- one cloud sandbox runtime
- one GitHub-backed workspace/repository flow
- one Microsoft 365 capability path, likely through Graph or file handling
- one safe document or file editing workflow
- one privacy-safe analytics summary
- one clear approval flow for sensitive actions

The goal is to build trust by showing the bigger picture, then demonstrating a small slice that is real, working, and aligned with the long-term platform.
