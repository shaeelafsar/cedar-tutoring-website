# Azure Static Web Apps Infrastructure

This folder contains Bicep IaC for provisioning a static-only Azure Static Web Apps resource for the Cedar Tutoring Academy marketing site.

## Prerequisites

- `az login` has already been completed.
- Azure CLI 2.55 or newer.
- Bicep CLI is available through Azure CLI; `az bicep` auto-installs or can install it with `az bicep install`.

## Parameters

`infra/main.bicep` is scoped to an existing resource group. The resource group is not created by Bicep; pass it to `az deployment group create -g <resource-group>`.

- `siteName` — required Azure Static Web Apps resource name.
- `location` — Azure region for the SWA resource metadata. Defaults to `centralus`, the closest Azure region to Worth, IL.
- `sku` — `Free` or `Standard`. Defaults to `Free` for minimal static-only hosting.
- `tags` — optional tags object. Defaults to `{}`.

Copy and edit `infra/main.parameters.json` as needed before applying.

## Apply

```bash
az group create -n cedar-tutoring-rg -l centralus   # if RG doesn't exist
az deployment group create \
  -g cedar-tutoring-rg \
  -f infra/main.bicep \
  -p infra/main.parameters.json
```

## Retrieve deployment token

The deployment token is needed later for the GitHub Actions deployment workflow.

```bash
az staticwebapp secrets list \
  -n cedar-tutoring-web \
  -g cedar-tutoring-rg \
  --query "properties.apiKey" -o tsv
```

Store the token as the repo secret `AZURE_STATIC_WEB_APPS_API_TOKEN` when the Azure Static Web Apps deploy workflow is built.

## What this Bicep does NOT do

- Does NOT deploy site code. That requires a GitHub Actions workflow, which is a separate future task.
- Does NOT create a Function App. The form-backend feature is deferred indefinitely; Calendly is the steady-state booking flow.
- Does NOT configure DNS or a custom domain. Shaeel will handle DNS cutover separately.
- Does NOT retire `.github/workflows/deploy-pages.yml`. GitHub Pages stays live until Azure cutover is verified.

## Future cutover sequence

1. Apply this Bicep so the Static Web Apps resource exists at `https://<random>.azurestaticapps.net`.
2. Retrieve the deployment token with the command above.
3. Add the token to GitHub repo secrets as `AZURE_STATIC_WEB_APPS_API_TOKEN`.
4. Author `.github/workflows/azure-static-web-apps.yml` in a separate task.
5. Verify Azure Static Web Apps deploy works on a test commit.
6. Complete DNS cutover from the custom domain to Static Web Apps.
7. Retire `.github/workflows/deploy-pages.yml`.
