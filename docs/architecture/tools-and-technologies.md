# Tools & Technologies

This table maps the proposed technologies to their role and purpose in the enterprise agent architecture. The Proof of Concept should use the smallest subset required to prove the end-to-end flow.

| Tool / Technology | Role | Purpose |
| --- | --- | --- |
| Microsoft 365 Copilot | Employee-facing entry point | Allows users to access project agents in the Microsoft 365 environment. |
| Microsoft Copilot Studio | Primary agent platform | Creates/configures project agents, business instructions, knowledge access, tools, and triggers. |
| SharePoint | Knowledge and file system of record | Stores project/domain knowledge and Office documents with permissions and versioning. |
| Microsoft Teams | Collaboration source and channel | Provides team conversations, channels, meeting context, and a potential interaction surface. |
| Outlook | Email source/action channel | Provides project email context and supports drafting/sending approved communication. |
| Power Automate / Agent Flows | Deterministic workflow layer | Orchestrates file retrieval/update, notifications, project provisioning, and multi-step business actions. |
| Model Context Protocol (MCP) | Specialist capability interface | Exposes reusable specialist tools/services to Copilot Studio behind a clean capability boundary. |
| Document Specialist Agent | Deep Office document executor | Receives structured editing requirements, plans document changes, and coordinates skills/tools. |
| OfficeCLI | Office document manipulation engine | Reads, creates, edits, renders, and validates Word, Excel, and PowerPoint files. |
| Word Skill | Document-domain expertise | Encodes procedures for inspecting and editing DOCX files. |
| Excel Skill | Spreadsheet-domain expertise | Encodes workbook, formula, table, chart, and validation procedures for XLSX files. |
| PowerPoint Skill | Presentation-domain expertise | Encodes slide, layout, design, editing, and validation procedures for PPTX files. |
| Validation Skill | Quality-control capability | Renders and inspects modified artifacts and verifies requested constraints. |
| Jira Connector/API | Project delivery integration | Reads and updates project issues, work items, status, and delivery data. |
| Confluence Connector/API | Knowledge integration | Reads/writes documentation where Confluence is authoritative or supporting. |
| Git repository connectors | Engineering context | Provides code, architecture, and change history to technical workflows. |
| Azure / Microsoft Foundry (later) | Optional custom-agent platform | Potential future runtime for advanced orchestration, specialized models, scaling, or evaluation. |
| Application Insights / platform telemetry (later) | Observability | Potential production tracing, latency, errors, usage, and operational monitoring. |
