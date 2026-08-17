# Principles

## Platform Principles

### 1. Transient Content Processing

User content is processed only while needed to complete the request. Raw prompts, documents, emails, tool outputs, and sandbox state are not retained by default.

### 2. Employee-Level Isolation

Each employee has their own isolated runtime boundary: sandbox, credentials, memory, logs, volumes, and connector permissions. No employee workspace should be readable by another employee's agent.

### 3. Runtime Is Disposable

The sandbox is not the permanent source of truth. Durable work lives in GitHub, approved storage, local databases, or explicit user-saved artifacts. Sandboxes are disposable execution environments.

### 4. Secrets Never Live In Code Or Templates

Docker images and templates contain tools and libraries only. Client or employee credentials live in a secret manager and are injected at runtime through controlled bindings.

### 5. Policy Before Execution

Every action goes through a policy layer: who is acting, what data they can access, which tools are allowed, which domains are allowed, what can be saved, and what must be redacted.

## Employee Principles

### 1. Private By Default

The employee should experience the agent as their private work assistant, not a surveillance tool. Their raw conversations and work content are not visible to managers by default.

### 2. User-Controlled Persistence

The employee decides what gets saved: memory, notes, drafts, files, summaries, preferences, or project artifacts. If they do not save it, the system treats it as temporary.

### 3. Same Permissions As The Employee

The agent should access only what the employee can access: Outlook, Teams, SharePoint, GitHub, calendar, docs, files, and internal tools. No hidden admin-wide access for normal employee agents.

### 4. Explainable Actions

The employee should be able to understand what the agent did: which systems it touched, what files it changed, what messages it drafted, what commands it ran, and what it saved.

### 5. Consent For Sensitive Actions

Sending emails, posting messages, deleting files, sharing documents, creating pull requests, spending money, or using sensitive credentials should require clear user approval or preconfigured rules.

## Employer Analytics Principles

### 1. Aggregate Insights, Not Raw Content

Leadership sees usage patterns, productivity signals, adoption, failure rates, categories of work, and risk indicators, not private employee conversations or document contents.

### 2. Privacy-Preserving Metrics

Analytics should use counts, trends, categories, and thresholds. Avoid exposing individual-level details unless there is a legitimate compliance or security reason.

### 3. Role-Based Visibility

Managers, admins, security, compliance, and platform operators should each see different data. No single dashboard should expose everything to everyone.

### 4. Audited Exception Access

If raw content ever needs to be inspected, it should require break-glass access: reason, approval, time limit, scope limit, immutable audit trail, and preferably employee notification where appropriate.

### 5. Measure System Value Without Surveillance

The employer should understand ROI: time saved, workflows automated, adoption, tool reliability, blocked tasks, and department-level trends, without turning the agent into an employee monitoring system.

## Voice Principle

The platform should speak honestly about privacy.

Correct:

> We process content transiently to fulfill the request and do not retain raw content by default.

Incorrect:

> Nobody can ever see anything under any circumstance.

The product should be privacy-first without overpromising.

