provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "taskapp_resourcegroup" {
  name     = "rg-tasks-app"
  location = "uksouth"
}

resource "azurerm_app_service_plan" "taskapp_serviceplan" {
  name                = "asp-tasks-app"
  location            = azurerm_resource_group.taskapp_resourcegroup.location
  resource_group_name = azurerm_resource_group.taskapp_resourcegroup.name
  sku {
    tier = "Basic"
    size = "B1"
  }
  kind     = "linux"
  reserved = true
}

resource "azurerm_app_service" "taskapp_appservice" {
  name                = "app-tasks-app"
  location            = azurerm_resource_group.taskapp_resourcegroup.location
  resource_group_name = azurerm_resource_group.taskapp_resourcegroup.name
  app_service_plan_id = azurerm_app_service_plan.taskapp_serviceplan.id

  site_config {
    linux_fx_version = "NODE|16-lts"
  }
}