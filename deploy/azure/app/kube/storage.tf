resource "azurerm_storage_account" "default" {
  name                      = substr(replace(module.default_label.id, "-", ""), 0, 24)
  resource_group_name       = module.app.resource_group
  account_replication_type  = var.account_replication_type
  location                  = var.resource_group_location
  account_kind              = var.account_kind
  account_tier              = var.account_tier
  enable_https_traffic_only = true
  tags                      = module.default_label.tags

  lifecycle {
    ignore_changes = [
      tags,
    ]
  }
}

resource "azurerm_storage_container" "default" {
  name                  = var.storage_container_name
  storage_account_name  = azurerm_storage_account.default.name
  container_access_type = "private"
}
