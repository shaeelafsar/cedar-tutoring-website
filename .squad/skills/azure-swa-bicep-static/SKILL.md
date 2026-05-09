---
name: "azure-swa-bicep-static"
description: "Minimal Azure Static Web Apps Bicep pattern for static-only Next.js exports"
domain: "azure, infrastructure, deployment"
confidence: "low"
source: "observed (first Cedar static-only SWA IaC task)"
---

## Context

Use this skill when a static-export Next.js marketing site needs Azure Static Web Apps infrastructure before deployment workflow or DNS cutover work begins.

## Patterns

- Keep the Bicep template scoped to an existing resource group with `targetScope = 'resourceGroup'`.
- Provision a single `Microsoft.Web/staticSites` resource for static-only hosting.
- Parameterize `siteName`, `location`, `sku`, and `tags`.
- Default `sku` to `Free` for prep or low-risk static-only hosting; allow `Standard` for later production needs.
- Default the location to the closest suitable region to the business/service area when no stronger latency or compliance driver exists.
- Output `defaultHostname`, resource id, and resource name so follow-up deployment tasks can reference the provisioned SWA.
- Document deployment-token retrieval separately with `az staticwebapp secrets list`; never hardcode or commit the token.

## Examples

```bicep
targetScope = 'resourceGroup'

@description('Required name for the Azure Static Web Apps resource.')
param siteName string

@description('Azure Static Web Apps SKU tier.')
@allowed([
  'Free'
  'Standard'
])
param sku string = 'Free'

resource staticWebApp 'Microsoft.Web/staticSites@2023-12-01' = {
  name: siteName
  location: 'centralus'
  sku: {
    name: sku
    tier: sku
  }
}
```

## Anti-Patterns

- Do not add Function App resources when the site is static-only or form backend is deferred.
- Do not add Resend or other email app settings without an active backend feature.
- Do not add custom domains, DNS, CDN, Front Door, Key Vault, Log Analytics, or Application Insights unless they are explicitly in scope.
- Do not create or replace GitHub Actions deployment workflows until the SWA exists and its deployment token can be stored as a repo secret.
