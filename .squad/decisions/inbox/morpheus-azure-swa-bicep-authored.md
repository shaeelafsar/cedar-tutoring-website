# Bicep IaC Authored for Static-Only Azure SWA

**Date:** 2026-05-09T10:20:22-05:00  
**By:** Morpheus (Lead/Architect)

## What

Bicep IaC authored for a static-only Azure Static Web Apps deployment of the Cedar Tutoring Academy marketing site. The template provisions a single `Microsoft.Web/staticSites` resource only. Function App and Resend/email infrastructure are explicitly excluded. This is an infra-only commit and does not deploy site code yet.

## Files

- `infra/main.bicep`
- `infra/main.parameters.json`
- `infra/README.md`

## Impact

Shaeel can now run `az deployment group create` to provision the Azure Static Web Apps resource. The future cutover sequence, deployment-token retrieval, and explicit non-goals are documented in `infra/README.md`.
