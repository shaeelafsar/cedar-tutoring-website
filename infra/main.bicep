targetScope = 'resourceGroup'

@description('Required name for the Azure Static Web Apps resource.')
param siteName string

@description('Azure region for the Static Web Apps resource metadata. Defaults to centralus, the closest Azure region to Worth, IL.')
param location string = 'centralus'

@description('Azure Static Web Apps SKU tier. Free is sufficient for initial static-only hosting; Standard can be used later if production needs require it.')
@allowed([
  'Free'
  'Standard'
])
param sku string = 'Free'

@description('Tags to apply to the Azure Static Web Apps resource.')
param tags object = {}

resource staticWebApp 'Microsoft.Web/staticSites@2023-12-01' = {
  name: siteName
  location: location
  tags: tags
  sku: {
    name: sku
    tier: sku
  }
}

output defaultHostname string = staticWebApp.properties.defaultHostname
output staticWebAppId string = staticWebApp.id
output staticWebAppName string = staticWebApp.name
