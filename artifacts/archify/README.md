# Enterprise Project Agent Architecture — Archify Artifact

This directory contains the canonical typed Archify source and the generated interactive system map, exports, checks, and receipts.

## Canonical Source

[`enterprise-project-agent.architecture.json`](enterprise-project-agent.architecture.json) is the source of truth. The GitHub workflow validates it against Archify's showcase profile and rebuilds the remaining artifacts.

## Open the Interactive Diagram

Download and open [`enterprise-project-agent.architecture.html`](enterprise-project-agent.architecture.html) in a modern browser.

The artifact includes dark/light themes, multiple visual presets, three guided executive views, component search, upstream/downstream reach tracing, directed-route exploration, semantic-role comparison, presentation mode, and static exports.

## Executive Controls

| Key | Action |
|---|---|
| `P` | Play the guided story |
| `[` / `]` | Move between executive views |
| `F` | Enter presentation mode |
| `T` | Toggle light/dark theme |
| `S` | Cycle visual preset |
| `E` | Open export options |
| `/` | Search and focus a component |
| `R` | Trace a directed route |
| `L` | Compare semantic roles |
| `M` | Open the system map |

## Generated Files

| File | Purpose |
|---|---|
| `enterprise-project-agent.architecture.html` | Interactive self-contained Archify map |
| `enterprise-project-agent.diagram.png` | High-resolution diagram export |
| `enterprise-project-agent.diagram.svg` | Editable vector export |
| `enterprise-project-agent.executive-1920x1080.png` | Executive 16:9 capture |
| `enterprise-project-agent.share-card.png` | Compact share-card export |
| `enterprise-project-agent.visual-check.json` | Multi-viewport containment checks |
| `enterprise-project-agent.interaction-check.json` | Guided-view, theme, and presentation checks |
| `validation-receipt.json` | Archify schema and composition validation |
| `delivery-receipt.json` | Archify delivery receipt |
| `artifact-receipt.json` | File hashes and artifact inventory |
| `enterprise-project-agent-archify-package.zip` | Portable artifact package |

## Guided Views

1. **Create the project agent** — frontend configuration, Copilot Studio, and authoritative knowledge.
2. **Edit an existing Microsoft file** — request through Power Automate, MCP, the Document Agent, OfficeCLI, and SharePoint update.
3. **Keep project knowledge trustworthy** — change detection, human validation, governance, and the knowledge feedback loop.

## Rebuild

The workflow at [`.github/workflows/build-architecture.yml`](../../.github/workflows/build-architecture.yml) rebuilds the artifact whenever the source JSON or architecture documents change.

## Provenance

Generated with [Archify](https://github.com/tt-a1i/archify), version 2.14.x. Archify is distributed under the MIT License. This repository contains generated outputs, not a vendored copy of Archify's source code.
