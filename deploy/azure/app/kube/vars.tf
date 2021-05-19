############################################
# AUTHENTICATION
############################################
# RELYING PURELY ON ENVIRONMENT VARIABLES as the user can control these from their own environment
############################################
# NAMING
############################################

variable "name_company" {
  type = string
}

variable "name_project" {
  type = string
}

variable "name_component" {
  type = string
}

variable "stage" {
  type = string
}

variable "attributes" {
  default = []
}

variable "tags" {
  type    = map(string)
  default = {}
}

# Each region must have corresponding a shortend name for resource naming purposes
variable "location_name_map" {
  type = map(string)

  default = {
    northeurope   = "eun"
    westeurope    = "euw"
    uksouth       = "uks"
    ukwest        = "ukw"
    eastus        = "use"
    eastus2       = "use2"
    westus        = "usw"
    eastasia      = "ase"
    southeastasia = "asse"
  }
}

############################################
# AZURE INFORMATION
############################################

variable "resource_group_location" {
  type = string
}

variable "app_gateway_frontend_ip_name" {
  type        = string
  description = ""
}

variable "dns_record" {
  description = ""
  type        = string
}

variable "dns_zone_name" {
  type = string
}

variable "dns_zone_resource_group" {
  type = string
}

variable "core_resource_group" {
  type = string
}

variable "internal_dns_zone_name" {
  type = string
}


###########################
# CONDITIONAL SETTINGS
##########################
variable "create_cosmosdb" {
  type        = bool
  description = "Whether to create a cosmosdb or not for this application"
}

variable "create_cache" {
  type        = bool
  description = "Whether to create a RedisCache"
}

variable "create_dns_record" {
  type = bool
}

variable "create_cdn_endpoint" {
  type = bool
}

####################
# Storage Account
####################
variable "account_replication_type" {
  type = string
}

variable "account_kind" {
  type = string
}

variable "account_tier" {
  type = string
}

variable "storage_container_name" {
  type = string
}

####################
# RedisCache Options
####################

variable "cache_capacity" {
  type        = number
  description = "Specify desired capacity"
}

variable "cache_family" {
  type        = string
  description = "Specify desired compute family"
}

variable "cache_sku_name" {
  type        = string
  description = "Specify desired sku_name"
}

variable "cache_enable_non_ssl_port" {
  type        = bool
  description = "Enable non SSL port"
}

variable "cache_minimum_tls_version" {
  type        = string
  description = "Specify minimum TLS version"
}

variable "cache_redis_enable_authentication" {
  type        = bool
  description = "Enabale authentication. This highly recommended for any public facing clusters"
}

variable "cache_redis_maxmemory_reserved" {
  type        = number
  description = "Specify max reserved memory"
}

variable "cache_redis_maxmemory_delta" {
  type        = number
  description = "Specify max memory delta"
}

variable "cache_redis_maxmemory_policy" {
  type        = string
  description = "Specify max memory policy"
}

####################
# CDN Options
####################
variable "response_header_cdn" {
  type        = list(map(string))
  description = "Custom Response Headers for Microsoft CDN. Can be used with security and auditing requirements"
}
