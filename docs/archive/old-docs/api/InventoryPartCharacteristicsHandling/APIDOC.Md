
REST API Documentation
Search...
Lookup_IsoUnit_EntitySet
Lookup_IsoCountry_EntitySet
InventoryPartChars
Service Operations - Actions
Service Operations - Functions
Reference_IntorderPartAlternateLov
Reference_UserAllowedSiteLov
Reference_DiscreteCharacNumericValue
Reference_InventoryPart
Reference_Characteristic
Reference_CharacteristicTemplate
Reference_DiscreteCharacValue
Reference_IsoUnit
Documentation Powered by Redocly
InventoryPartCharacteristicsHandling (1)
API Class: Standard

[Terms of Service] (https://docs.ifs.com/policy/APIUsageCloud.pdf)

Lookup_IsoUnit_EntitySet
Get entities from Lookup_IsoUnit_EntitySet
Authorizations:
(OpenIdbasicAuth)
query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Id" "Id desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Id" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array Lookup_IsoUnit_EntityType
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Lookup_IsoUnit_EntitySet

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Lookup_IsoUnit_EntitySet by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Id
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Id" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type Lookup_IsoUnit_EntityType
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Lookup_IsoUnit_EntitySet(Id='{Id}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"Objgrants": "It is a Text",
"Id": "It is a Text",
"Description": "It is a Text"
}
Lookup_IsoCountry_EntitySet
Get entities from Lookup_IsoCountry_EntitySet
Authorizations:
(OpenIdbasicAuth)
query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Id" "Id desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Id" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array Lookup_IsoCountry_EntityType
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Lookup_IsoCountry_EntitySet

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Lookup_IsoCountry_EntitySet by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Id
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Id" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type Lookup_IsoCountry_EntityType
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Lookup_IsoCountry_EntitySet(Id='{Id}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"Objgrants": "It is a Text",
"Id": "It is a Text",
"Description": "It is a Text"
}
InventoryPartChars
Get entities from InventoryPartChars
Authorizations:
(OpenIdbasicAuth)
query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "CharacteristicCode" "CharacteristicCode desc" "UnitMeas" "UnitMeas desc" "AttrValue" "AttrValue desc" "AttrValueNumeric" "AttrValueNumeric desc" "AttrValueAlpha" "AttrValueAlpha desc" "EngAttribute" "EngAttribute desc" "CharacteristicTemplateDescription" "CharacteristicTemplateDescription desc" "CharType" "CharType desc" "CharacteristicSearchTypeDb" "CharacteristicSearchTypeDb desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "CharacteristicCode" "UnitMeas" "AttrValue" "AttrValueNumeric" "AttrValueAlpha" "EngAttribute" "CharacteristicTemplateDescription" "CharType" "CharacteristicSearchTypeDb"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "InventoryPartRef" "CharacteristicRef" "PartNoRef" "ContractRef" "CharacteristicTemplateRef" "CharacteristicCodeRef" "AttrValueNumericRef" "AttrValueAlphaRef" "UnitMeasRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array InventoryPartChar
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartChars

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from InventoryPartChars by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
CharacteristicCode
required
string <= 5 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "CharacteristicCode" "UnitMeas" "AttrValue" "AttrValueNumeric" "AttrValueAlpha" "EngAttribute" "CharacteristicTemplateDescription" "CharType" "CharacteristicSearchTypeDb"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "InventoryPartRef" "CharacteristicRef" "PartNoRef" "ContractRef" "CharacteristicTemplateRef" "CharacteristicCodeRef" "AttrValueNumericRef" "AttrValueAlphaRef" "UnitMeasRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type InventoryPartChar
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartChars(PartNo='{PartNo}',Contract='{Contract}',CharacteristicCode='{CharacteristicCode}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objgrants": "It is a Text",
"Contract": "It is a Text",
"PartNo": "It is a Text",
"CharacteristicCode": "It is a Text",
"UnitMeas": "It is a Text",
"AttrValue": "It is a Text",
"AttrValueNumeric": 1,
"AttrValueAlpha": "It is a Text",
"EngAttribute": "It is a Text",
"CharacteristicTemplateDescription": "It is a Text",
"CharType": "It is a Text",
"CharacteristicSearchTypeDb": "It is a Text"
}
Delete entity from InventoryPartChars
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
CharacteristicCode
required
string <= 5 characters
Example: It is a Text
header Parameters
If-Match
required
string
E-Tag

Responses
204 No Content
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

delete
/InventoryPartChars(PartNo='{PartNo}',Contract='{Contract}',CharacteristicCode='{CharacteristicCode}')

Response samples
400403404405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"error": {
"code": "string",
"message": "string",
"details": []
}
}
Update entity in InventoryPartChars
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
CharacteristicCode
required
string <= 5 characters
Example: It is a Text
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "CharacteristicCode" "UnitMeas" "AttrValue" "AttrValueNumeric" "AttrValueAlpha" "EngAttribute" "CharacteristicTemplateDescription" "CharType" "CharacteristicSearchTypeDb"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type InventoryPartChar

UnitMeas	
string <= 10 characters
AttrValue	
string <= 60 characters
AttrValueNumeric	
number
AttrValueAlpha	
string <= 60 characters
EngAttribute	
string <= 5 characters
CharacteristicTemplateDescription	
string <= 2000 characters
CharType	
string <= 50 characters
CharacteristicSearchTypeDb	
string <= 4000 characters
Responses
200 response body for entity type InventoryPartChar
201 response body for entity type InventoryPartChar
204 No Content
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

patch
/InventoryPartChars(PartNo='{PartNo}',Contract='{Contract}',CharacteristicCode='{CharacteristicCode}')

Request samples
Payload
Content type
application/json

Copy
{
"UnitMeas": "It is a Text",
"AttrValue": "It is a Text",
"AttrValueNumeric": 1,
"AttrValueAlpha": "It is a Text",
"EngAttribute": "It is a Text",
"CharacteristicTemplateDescription": "It is a Text",
"CharType": "It is a Text",
"CharacteristicSearchTypeDb": "It is a Text"
}
Response samples
200201400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objgrants": "It is a Text",
"Contract": "It is a Text",
"PartNo": "It is a Text",
"CharacteristicCode": "It is a Text",
"UnitMeas": "It is a Text",
"AttrValue": "It is a Text",
"AttrValueNumeric": 1,
"AttrValueAlpha": "It is a Text",
"EngAttribute": "It is a Text",
"CharacteristicTemplateDescription": "It is a Text",
"CharType": "It is a Text",
"CharacteristicSearchTypeDb": "It is a Text"
}
Invoke function DefaultCopy
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
CharacteristicCode
required
string <= 5 characters
Example: It is a Text
query Parameters
@CopyValues
required
object (InventoryPartCharCopyValues)
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "CharacteristicCode" "UnitMeas" "AttrValue" "AttrValueNumeric" "AttrValueAlpha" "EngAttribute" "CharacteristicTemplateDescription" "CharType" "CharacteristicSearchTypeDb"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for function DefaultCopy :
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartChars(PartNo='{PartNo}',Contract='{Contract}',CharacteristicCode='{CharacteristicCode}')/IfsApp.InventoryPartCharacteristicsHandling.InventoryPartChar_DefaultCopy(CopyValues=@CopyValues)

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objgrants": "It is a Text",
"Contract": "It is a Text",
"PartNo": "It is a Text",
"CharacteristicCode": "It is a Text",
"UnitMeas": "It is a Text",
"AttrValue": "It is a Text",
"AttrValueNumeric": 1,
"AttrValueAlpha": "It is a Text",
"EngAttribute": "It is a Text",
"CharacteristicTemplateDescription": "It is a Text",
"CharType": "It is a Text",
"CharacteristicSearchTypeDb": "It is a Text"
}
Get entities from InventoryPartRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
CharacteristicCode
required
string <= 5 characters
Example: It is a Text
query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "AccountingGroup" "AccountingGroup desc" "AssetClass" "AssetClass desc" "CountryOfOrigin" "CountryOfOrigin desc" "HazardCode" "HazardCode desc" "NoteId" "NoteId desc" "EstimatedMaterialCost" "EstimatedMaterialCost desc" "PartProductCode" "PartProductCode desc" "PartProductFamily" "PartProductFamily desc" "PartStatus" "PartStatus desc" "PlannerBuyer" "PlannerBuyer desc" "PrimeCommodity" "PrimeCommodity desc" "SecondCommodity" "SecondCommodity desc" "UnitMeas" "UnitMeas desc" "CatchUnitMeas" "CatchUnitMeas desc" "Description" "Description desc" "DescriptionCopy" "DescriptionCopy desc" "DescriptionInUse" "DescriptionInUse desc" "AbcClass" "AbcClass desc" "AbcClassLockedUntil" "AbcClassLockedUntil desc" "CountVariance" "CountVariance desc" "CreateDate" "CreateDate desc" "CycleCode" "CycleCode desc" "CyclePeriod" "CyclePeriod desc" "DimQuality" "DimQuality desc" "DurabilityDay" "DurabilityDay desc" "ExpectedLeadtime" "ExpectedLeadtime desc" "LastActivityDate" "LastActivityDate desc" "LeadTimeCode" "LeadTimeCode desc" "ManufLeadtime" "ManufLeadtime desc" "NoteText" "NoteText desc" "OeAllocAssignFlag" "OeAllocAssignFlag desc" "OnhandAnalysisFlag" "OnhandAnalysisFlag desc" "PurchLeadtime" "PurchLeadtime desc" "EarliestUltdSupplyDate" "EarliestUltdSupplyDate desc" "Supersedes" "Supersedes desc" "SupplyCode" "SupplyCode desc" "TypeCode" "TypeCode desc" "CustomsStatNo" "CustomsStatNo desc" "TypeDesignation" "TypeDesignation desc" "ZeroCostFlag" "ZeroCostFlag desc" "AvailActivityStatus" "AvailActivityStatus desc" "EngAttribute" "EngAttribute desc" "ShortageFlag" "ShortageFlag desc" "ForecastConsumptionFlag" "ForecastConsumptionFlag desc" "StockManagement" "StockManagement desc" "IntrastatConvFactor" "IntrastatConvFactor desc" "PartCostGroupId" "PartCostGroupId desc" "DopConnection" "DopConnection desc" "StdNameId" "StdNameId desc" "InventoryValuationMethod" "InventoryValuationMethod desc" "NegativeOnHand" "NegativeOnHand desc" "TechnicalCoordinatorId" "TechnicalCoordinatorId desc" "InvoiceConsideration" "InvoiceConsideration desc" "ActualCostActivated" "ActualCostActivated desc" "MaxActualCostUpdate" "MaxActualCostUpdate desc" "CustWarrantyId" "CustWarrantyId desc" "SupWarrantyId" "SupWarrantyId desc" "RegionOfOrigin" "RegionOfOrigin desc" "InventoryPartCostLevel" "InventoryPartCostLevel desc" "ExtServiceCostMethod" "ExtServiceCostMethod desc" "SupplyChainPartGroup" "SupplyChainPartGroup desc" "AutomaticCapabilityCheck" "AutomaticCapabilityCheck desc" "InputUnitMeasGroupId" "InputUnitMeasGroupId desc" "DopNetting" "DopNetting desc" "CoReserveOnhAnalysFlag" "CoReserveOnhAnalysFlag desc" "QtyCalcRounding" "QtyCalcRounding desc" "LifecycleStage" "LifecycleStage desc" "LifeStageLockedUntil" "LifeStageLockedUntil desc" "FrequencyClass" "FrequencyClass desc" "FreqClassLockedUntil" "FreqClassLockedUntil desc" "FirstStatIssueDate" "FirstStatIssueDate desc" "LatestStatIssueDate" "LatestStatIssueDate desc" "LatestStatAffectingDate" "LatestStatAffectingDate desc" "DeclineDate" "DeclineDate desc" "ExpiredDate" "ExpiredDate desc" "DeclineIssueCounter" "DeclineIssueCounter desc" "ExpiredIssueCounter" "ExpiredIssueCounter desc" "MinDurabDaysCoDeliv" "MinDurabDaysCoDeliv desc" "MinDurabDaysPlanning" "MinDurabDaysPlanning desc" "AutoCreatedGtin" "AutoCreatedGtin desc" "StorageWidthRequirement" "StorageWidthRequirement desc" "StorageHeightRequirement" "StorageHeightRequirement desc" "StorageDepthRequirement" "StorageDepthRequirement desc" "StorageVolumeRequirement" "StorageVolumeRequirement desc" "StorageWeightRequirement" "StorageWeightRequirement desc" "MinStorageTemperature" "MinStorageTemperature desc" "MaxStorageTemperature" "MaxStorageTemperature desc" "MinStorageHumidity" "MinStorageHumidity desc" "MaxStorageHumidity" "MaxStorageHumidity desc" "StandardPutawayQty" "StandardPutawayQty desc" "PutawayZoneRefillOption" "PutawayZoneRefillOption desc" "ResetConfigStdCost" "ResetConfigStdCost desc" "MandatoryExpirationDate" "MandatoryExpirationDate desc" "ExclShipPackProposal" "ExclShipPackProposal desc" "Company" "Company desc" "StatisticalCode" "StatisticalCode desc" "AcquisitionOrigin" "AcquisitionOrigin desc" "AcquisitionReasonId" "AcquisitionReasonId desc" "HsnSacCode" "HsnSacCode desc" "ProductCategoryId" "ProductCategoryId desc" "PartCatalogDescription" "PartCatalogDescription desc" "PartCatalogStdNameId" "PartCatalogStdNameId desc" "PartCatalogConfigurable" "PartCatalogConfigurable desc" "PartCatLangDescription" "PartCatLangDescription desc" "SupersedesStartDate" "SupersedesStartDate desc" "SupersedesEndDate" "SupersedesEndDate desc" "CMrpToDop" "CMrpToDop desc" "CPpvStatus" "CPpvStatus desc" "CSfShipmentBoat" "CSfShipmentBoat desc" "CSfAssemblyBoat" "CSfAssemblyBoat desc" "StructureUpdate" "StructureUpdate desc" "RoutingUpdate" "RoutingUpdate desc" "NoDopUpdate" "NoDopUpdate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AccountingGroup" "AssetClass" "CountryOfOrigin" "HazardCode" "NoteId" "EstimatedMaterialCost" "PartProductCode" "PartProductFamily" "PartStatus" "PlannerBuyer" "PrimeCommodity" "SecondCommodity" "UnitMeas" "CatchUnitMeas" "Description" "DescriptionCopy" "DescriptionInUse" "AbcClass" "AbcClassLockedUntil" "CountVariance" "CreateDate" "CycleCode" "CyclePeriod" "DimQuality" "DurabilityDay" "ExpectedLeadtime" "LastActivityDate" "LeadTimeCode" "ManufLeadtime" "NoteText" "OeAllocAssignFlag" "OnhandAnalysisFlag" "PurchLeadtime" "EarliestUltdSupplyDate" "Supersedes" "SupplyCode" "TypeCode" "CustomsStatNo" "TypeDesignation" "ZeroCostFlag" "AvailActivityStatus" "EngAttribute" "ShortageFlag" "ForecastConsumptionFlag" "StockManagement" "IntrastatConvFactor" "PartCostGroupId" "DopConnection" "StdNameId" "InventoryValuationMethod" "NegativeOnHand" "TechnicalCoordinatorId" "InvoiceConsideration" "ActualCostActivated" "MaxActualCostUpdate" "CustWarrantyId" "SupWarrantyId" "RegionOfOrigin" "InventoryPartCostLevel" "ExtServiceCostMethod" "SupplyChainPartGroup" "AutomaticCapabilityCheck" "InputUnitMeasGroupId" "DopNetting" "CoReserveOnhAnalysFlag" "QtyCalcRounding" "LifecycleStage" "LifeStageLockedUntil" "FrequencyClass" "FreqClassLockedUntil" "FirstStatIssueDate" "LatestStatIssueDate" "LatestStatAffectingDate" "DeclineDate" "ExpiredDate" "DeclineIssueCounter" "ExpiredIssueCounter" "MinDurabDaysCoDeliv" "MinDurabDaysPlanning" "AutoCreatedGtin" "StorageWidthRequirement" "StorageHeightRequirement" "StorageDepthRequirement" "StorageVolumeRequirement" "StorageWeightRequirement" "MinStorageTemperature" "MaxStorageTemperature" "MinStorageHumidity" "MaxStorageHumidity" "StandardPutawayQty" "PutawayZoneRefillOption" "ResetConfigStdCost" "MandatoryExpirationDate" "ExclShipPackProposal" "Company" "StatisticalCode" "AcquisitionOrigin" "AcquisitionReasonId" "HsnSacCode" "ProductCategoryId" "PartCatalogDescription" "PartCatalogStdNameId" "PartCatalogConfigurable" "PartCatLangDescription" "SupersedesStartDate" "SupersedesEndDate" "CMrpToDop" "CPpvStatus" "CSfShipmentBoat" "CSfAssemblyBoat" "StructureUpdate" "RoutingUpdate" "NoDopUpdate"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryPart
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartChars(PartNo='{PartNo}',Contract='{Contract}',CharacteristicCode='{CharacteristicCode}')/InventoryPartRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CharacteristicRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
CharacteristicCode
required
string <= 5 characters
Example: It is a Text
query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "CharacteristicCode" "CharacteristicCode desc" "Description" "Description desc" "SearchType" "SearchType desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CharacteristicCode" "Description" "SearchType"
Specify properties to return, see OData Select

Responses
200 response body for entity array Characteristic
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartChars(PartNo='{PartNo}',Contract='{Contract}',CharacteristicCode='{CharacteristicCode}')/CharacteristicRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from PartNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
CharacteristicCode
required
string <= 5 characters
Example: It is a Text
query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "AlternativePartNo" "AlternativePartNo desc" "Description" "Description desc" "SupplyCode" "SupplyCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AlternativePartNo" "Description" "SupplyCode"
Specify properties to return, see OData Select

Responses
200 response body for entity array IntorderPartAlternateLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartChars(PartNo='{PartNo}',Contract='{Contract}',CharacteristicCode='{CharacteristicCode}')/PartNoRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from ContractRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
CharacteristicCode
required
string <= 5 characters
Example: It is a Text
query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Contract" "Contract desc" "ContractDesc" "ContractDesc desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ContractDesc"
Specify properties to return, see OData Select

Responses
200 response body for entity array UserAllowedSiteLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartChars(PartNo='{PartNo}',Contract='{Contract}',CharacteristicCode='{CharacteristicCode}')/ContractRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CharacteristicTemplateRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
CharacteristicCode
required
string <= 5 characters
Example: It is a Text
query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "EngAttribute" "EngAttribute desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "EngAttribute" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array CharacteristicTemplate
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartChars(PartNo='{PartNo}',Contract='{Contract}',CharacteristicCode='{CharacteristicCode}')/CharacteristicTemplateRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CharacteristicCodeRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
CharacteristicCode
required
string <= 5 characters
Example: It is a Text
query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "CharacteristicCode" "CharacteristicCode desc" "Description" "Description desc" "SearchType" "SearchType desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CharacteristicCode" "Description" "SearchType"
Specify properties to return, see OData Select

Responses
200 response body for entity array Characteristic
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartChars(PartNo='{PartNo}',Contract='{Contract}',CharacteristicCode='{CharacteristicCode}')/CharacteristicCodeRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from AttrValueNumericRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
CharacteristicCode
required
string <= 5 characters
Example: It is a Text
query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "CharacteristicCode" "CharacteristicCode desc" "CharacteristicValue" "CharacteristicValue desc" "CharacteristicValueDesc" "CharacteristicValueDesc desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CharacteristicCode" "CharacteristicValue" "CharacteristicValueDesc"
Specify properties to return, see OData Select

Responses
200 response body for entity array DiscreteCharacNumericValue
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartChars(PartNo='{PartNo}',Contract='{Contract}',CharacteristicCode='{CharacteristicCode}')/AttrValueNumericRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from AttrValueAlphaRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
CharacteristicCode
required
string <= 5 characters
Example: It is a Text
query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "CharacteristicCode" "CharacteristicCode desc" "CharacteristicValue" "CharacteristicValue desc" "CharacteristicValueAlpha" "CharacteristicValueAlpha desc" "CharacteristicValueNumeric" "CharacteristicValueNumeric desc" "CharacteristicValueDesc" "CharacteristicValueDesc desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CharacteristicCode" "CharacteristicValue" "CharacteristicValueAlpha" "CharacteristicValueNumeric" "CharacteristicValueDesc"
Specify properties to return, see OData Select

Responses
200 response body for entity array DiscreteCharacValue
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartChars(PartNo='{PartNo}',Contract='{Contract}',CharacteristicCode='{CharacteristicCode}')/AttrValueAlphaRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from UnitMeasRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
CharacteristicCode
required
string <= 5 characters
Example: It is a Text
query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "UnitCode" "UnitCode desc" "Description" "Description desc" "PresentFactor" "PresentFactor desc" "BaseUnit" "BaseUnit desc" "MultiFactor" "MultiFactor desc" "DivFactor" "DivFactor desc" "TenPower" "TenPower desc" "UserDefined" "UserDefined desc" "UnitType" "UnitType desc" "UomConstant" "UomConstant desc" "UsedInAppl" "UsedInAppl desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "UnitCode" "Description" "PresentFactor" "BaseUnit" "MultiFactor" "DivFactor" "TenPower" "UserDefined" "UnitType" "UomConstant" "UsedInAppl"
Specify properties to return, see OData Select

Responses
200 response body for entity array IsoUnit
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartChars(PartNo='{PartNo}',Contract='{Contract}',CharacteristicCode='{CharacteristicCode}')/UnitMeasRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Service Operations - Actions
Actions

Service Operations - Functions
Functions

Reference_IntorderPartAlternateLov
Reference Entity Set Reference_IntorderPartAlternateLov

Get entities from Reference_IntorderPartAlternateLov
Authorizations:
(OpenIdbasicAuth)
query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "AlternativePartNo" "AlternativePartNo desc" "Description" "Description desc" "SupplyCode" "SupplyCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AlternativePartNo" "Description" "SupplyCode"
Specify properties to return, see OData Select

Responses
200 response body for entity array IntorderPartAlternateLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_IntorderPartAlternateLov

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_IntorderPartAlternateLov by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string <= 4000 characters
Example: It is a Text
PartNo
required
string <= 4000 characters
Example: It is a Text
AlternativePartNo
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AlternativePartNo" "Description" "SupplyCode"
Specify properties to return, see OData Select

Responses
200 response body for entity type IntorderPartAlternateLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_IntorderPartAlternateLov(Contract='{Contract}',PartNo='{PartNo}',AlternativePartNo='{AlternativePartNo}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"Contract": "It is a Text",
"PartNo": "It is a Text",
"AlternativePartNo": "It is a Text",
"Description": "It is a Text",
"SupplyCode": "InventoryOrder"
}
Reference_UserAllowedSiteLov
Reference Entity Set Reference_UserAllowedSiteLov

Get entities from Reference_UserAllowedSiteLov
Authorizations:
(OpenIdbasicAuth)
query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Contract" "Contract desc" "ContractDesc" "ContractDesc desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ContractDesc"
Specify properties to return, see OData Select

Responses
200 response body for entity array UserAllowedSiteLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_UserAllowedSiteLov

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_UserAllowedSiteLov by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ContractDesc"
Specify properties to return, see OData Select

Responses
200 response body for entity type UserAllowedSiteLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_UserAllowedSiteLov(Contract='{Contract}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"Contract": "It is a Text",
"ContractDesc": "It is a Text"
}
Reference_DiscreteCharacNumericValue
Reference Entity Set Reference_DiscreteCharacNumericValue

Get entities from Reference_DiscreteCharacNumericValue
Authorizations:
(OpenIdbasicAuth)
query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "CharacteristicCode" "CharacteristicCode desc" "CharacteristicValue" "CharacteristicValue desc" "CharacteristicValueDesc" "CharacteristicValueDesc desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CharacteristicCode" "CharacteristicValue" "CharacteristicValueDesc"
Specify properties to return, see OData Select

Responses
200 response body for entity array DiscreteCharacNumericValue
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_DiscreteCharacNumericValue

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_DiscreteCharacNumericValue by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
CharacteristicCode
required
string <= 4000 characters
Example: It is a Text
CharacteristicValue
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "CharacteristicCode" "CharacteristicValue" "CharacteristicValueDesc"
Specify properties to return, see OData Select

Responses
200 response body for entity type DiscreteCharacNumericValue
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_DiscreteCharacNumericValue(CharacteristicCode='{CharacteristicCode}',CharacteristicValue={CharacteristicValue})

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"CharacteristicCode": "It is a Text",
"CharacteristicValue": 1,
"CharacteristicValueDesc": "It is a Text"
}
Reference_InventoryPart
Reference Entity Set Reference_InventoryPart

Get entities from Reference_InventoryPart
Authorizations:
(OpenIdbasicAuth)
query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "AccountingGroup" "AccountingGroup desc" "AssetClass" "AssetClass desc" "CountryOfOrigin" "CountryOfOrigin desc" "HazardCode" "HazardCode desc" "NoteId" "NoteId desc" "EstimatedMaterialCost" "EstimatedMaterialCost desc" "PartProductCode" "PartProductCode desc" "PartProductFamily" "PartProductFamily desc" "PartStatus" "PartStatus desc" "PlannerBuyer" "PlannerBuyer desc" "PrimeCommodity" "PrimeCommodity desc" "SecondCommodity" "SecondCommodity desc" "UnitMeas" "UnitMeas desc" "CatchUnitMeas" "CatchUnitMeas desc" "Description" "Description desc" "DescriptionCopy" "DescriptionCopy desc" "DescriptionInUse" "DescriptionInUse desc" "AbcClass" "AbcClass desc" "AbcClassLockedUntil" "AbcClassLockedUntil desc" "CountVariance" "CountVariance desc" "CreateDate" "CreateDate desc" "CycleCode" "CycleCode desc" "CyclePeriod" "CyclePeriod desc" "DimQuality" "DimQuality desc" "DurabilityDay" "DurabilityDay desc" "ExpectedLeadtime" "ExpectedLeadtime desc" "LastActivityDate" "LastActivityDate desc" "LeadTimeCode" "LeadTimeCode desc" "ManufLeadtime" "ManufLeadtime desc" "NoteText" "NoteText desc" "OeAllocAssignFlag" "OeAllocAssignFlag desc" "OnhandAnalysisFlag" "OnhandAnalysisFlag desc" "PurchLeadtime" "PurchLeadtime desc" "EarliestUltdSupplyDate" "EarliestUltdSupplyDate desc" "Supersedes" "Supersedes desc" "SupplyCode" "SupplyCode desc" "TypeCode" "TypeCode desc" "CustomsStatNo" "CustomsStatNo desc" "TypeDesignation" "TypeDesignation desc" "ZeroCostFlag" "ZeroCostFlag desc" "AvailActivityStatus" "AvailActivityStatus desc" "EngAttribute" "EngAttribute desc" "ShortageFlag" "ShortageFlag desc" "ForecastConsumptionFlag" "ForecastConsumptionFlag desc" "StockManagement" "StockManagement desc" "IntrastatConvFactor" "IntrastatConvFactor desc" "PartCostGroupId" "PartCostGroupId desc" "DopConnection" "DopConnection desc" "StdNameId" "StdNameId desc" "InventoryValuationMethod" "InventoryValuationMethod desc" "NegativeOnHand" "NegativeOnHand desc" "TechnicalCoordinatorId" "TechnicalCoordinatorId desc" "InvoiceConsideration" "InvoiceConsideration desc" "ActualCostActivated" "ActualCostActivated desc" "MaxActualCostUpdate" "MaxActualCostUpdate desc" "CustWarrantyId" "CustWarrantyId desc" "SupWarrantyId" "SupWarrantyId desc" "RegionOfOrigin" "RegionOfOrigin desc" "InventoryPartCostLevel" "InventoryPartCostLevel desc" "ExtServiceCostMethod" "ExtServiceCostMethod desc" "SupplyChainPartGroup" "SupplyChainPartGroup desc" "AutomaticCapabilityCheck" "AutomaticCapabilityCheck desc" "InputUnitMeasGroupId" "InputUnitMeasGroupId desc" "DopNetting" "DopNetting desc" "CoReserveOnhAnalysFlag" "CoReserveOnhAnalysFlag desc" "QtyCalcRounding" "QtyCalcRounding desc" "LifecycleStage" "LifecycleStage desc" "LifeStageLockedUntil" "LifeStageLockedUntil desc" "FrequencyClass" "FrequencyClass desc" "FreqClassLockedUntil" "FreqClassLockedUntil desc" "FirstStatIssueDate" "FirstStatIssueDate desc" "LatestStatIssueDate" "LatestStatIssueDate desc" "LatestStatAffectingDate" "LatestStatAffectingDate desc" "DeclineDate" "DeclineDate desc" "ExpiredDate" "ExpiredDate desc" "DeclineIssueCounter" "DeclineIssueCounter desc" "ExpiredIssueCounter" "ExpiredIssueCounter desc" "MinDurabDaysCoDeliv" "MinDurabDaysCoDeliv desc" "MinDurabDaysPlanning" "MinDurabDaysPlanning desc" "AutoCreatedGtin" "AutoCreatedGtin desc" "StorageWidthRequirement" "StorageWidthRequirement desc" "StorageHeightRequirement" "StorageHeightRequirement desc" "StorageDepthRequirement" "StorageDepthRequirement desc" "StorageVolumeRequirement" "StorageVolumeRequirement desc" "StorageWeightRequirement" "StorageWeightRequirement desc" "MinStorageTemperature" "MinStorageTemperature desc" "MaxStorageTemperature" "MaxStorageTemperature desc" "MinStorageHumidity" "MinStorageHumidity desc" "MaxStorageHumidity" "MaxStorageHumidity desc" "StandardPutawayQty" "StandardPutawayQty desc" "PutawayZoneRefillOption" "PutawayZoneRefillOption desc" "ResetConfigStdCost" "ResetConfigStdCost desc" "MandatoryExpirationDate" "MandatoryExpirationDate desc" "ExclShipPackProposal" "ExclShipPackProposal desc" "Company" "Company desc" "StatisticalCode" "StatisticalCode desc" "AcquisitionOrigin" "AcquisitionOrigin desc" "AcquisitionReasonId" "AcquisitionReasonId desc" "HsnSacCode" "HsnSacCode desc" "ProductCategoryId" "ProductCategoryId desc" "PartCatalogDescription" "PartCatalogDescription desc" "PartCatalogStdNameId" "PartCatalogStdNameId desc" "PartCatalogConfigurable" "PartCatalogConfigurable desc" "PartCatLangDescription" "PartCatLangDescription desc" "SupersedesStartDate" "SupersedesStartDate desc" "SupersedesEndDate" "SupersedesEndDate desc" "CMrpToDop" "CMrpToDop desc" "CPpvStatus" "CPpvStatus desc" "CSfShipmentBoat" "CSfShipmentBoat desc" "CSfAssemblyBoat" "CSfAssemblyBoat desc" "StructureUpdate" "StructureUpdate desc" "RoutingUpdate" "RoutingUpdate desc" "NoDopUpdate" "NoDopUpdate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AccountingGroup" "AssetClass" "CountryOfOrigin" "HazardCode" "NoteId" "EstimatedMaterialCost" "PartProductCode" "PartProductFamily" "PartStatus" "PlannerBuyer" "PrimeCommodity" "SecondCommodity" "UnitMeas" "CatchUnitMeas" "Description" "DescriptionCopy" "DescriptionInUse" "AbcClass" "AbcClassLockedUntil" "CountVariance" "CreateDate" "CycleCode" "CyclePeriod" "DimQuality" "DurabilityDay" "ExpectedLeadtime" "LastActivityDate" "LeadTimeCode" "ManufLeadtime" "NoteText" "OeAllocAssignFlag" "OnhandAnalysisFlag" "PurchLeadtime" "EarliestUltdSupplyDate" "Supersedes" "SupplyCode" "TypeCode" "CustomsStatNo" "TypeDesignation" "ZeroCostFlag" "AvailActivityStatus" "EngAttribute" "ShortageFlag" "ForecastConsumptionFlag" "StockManagement" "IntrastatConvFactor" "PartCostGroupId" "DopConnection" "StdNameId" "InventoryValuationMethod" "NegativeOnHand" "TechnicalCoordinatorId" "InvoiceConsideration" "ActualCostActivated" "MaxActualCostUpdate" "CustWarrantyId" "SupWarrantyId" "RegionOfOrigin" "InventoryPartCostLevel" "ExtServiceCostMethod" "SupplyChainPartGroup" "AutomaticCapabilityCheck" "InputUnitMeasGroupId" "DopNetting" "CoReserveOnhAnalysFlag" "QtyCalcRounding" "LifecycleStage" "LifeStageLockedUntil" "FrequencyClass" "FreqClassLockedUntil" "FirstStatIssueDate" "LatestStatIssueDate" "LatestStatAffectingDate" "DeclineDate" "ExpiredDate" "DeclineIssueCounter" "ExpiredIssueCounter" "MinDurabDaysCoDeliv" "MinDurabDaysPlanning" "AutoCreatedGtin" "StorageWidthRequirement" "StorageHeightRequirement" "StorageDepthRequirement" "StorageVolumeRequirement" "StorageWeightRequirement" "MinStorageTemperature" "MaxStorageTemperature" "MinStorageHumidity" "MaxStorageHumidity" "StandardPutawayQty" "PutawayZoneRefillOption" "ResetConfigStdCost" "MandatoryExpirationDate" "ExclShipPackProposal" "Company" "StatisticalCode" "AcquisitionOrigin" "AcquisitionReasonId" "HsnSacCode" "ProductCategoryId" "PartCatalogDescription" "PartCatalogStdNameId" "PartCatalogConfigurable" "PartCatLangDescription" "SupersedesStartDate" "SupersedesEndDate" "CMrpToDop" "CPpvStatus" "CSfShipmentBoat" "CSfAssemblyBoat" "StructureUpdate" "RoutingUpdate" "NoDopUpdate"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryPart
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryPart

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_InventoryPart by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string <= 5 characters
Example: It is a Text
PartNo
required
string <= 25 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AccountingGroup" "AssetClass" "CountryOfOrigin" "HazardCode" "NoteId" "EstimatedMaterialCost" "PartProductCode" "PartProductFamily" "PartStatus" "PlannerBuyer" "PrimeCommodity" "SecondCommodity" "UnitMeas" "CatchUnitMeas" "Description" "DescriptionCopy" "DescriptionInUse" "AbcClass" "AbcClassLockedUntil" "CountVariance" "CreateDate" "CycleCode" "CyclePeriod" "DimQuality" "DurabilityDay" "ExpectedLeadtime" "LastActivityDate" "LeadTimeCode" "ManufLeadtime" "NoteText" "OeAllocAssignFlag" "OnhandAnalysisFlag" "PurchLeadtime" "EarliestUltdSupplyDate" "Supersedes" "SupplyCode" "TypeCode" "CustomsStatNo" "TypeDesignation" "ZeroCostFlag" "AvailActivityStatus" "EngAttribute" "ShortageFlag" "ForecastConsumptionFlag" "StockManagement" "IntrastatConvFactor" "PartCostGroupId" "DopConnection" "StdNameId" "InventoryValuationMethod" "NegativeOnHand" "TechnicalCoordinatorId" "InvoiceConsideration" "ActualCostActivated" "MaxActualCostUpdate" "CustWarrantyId" "SupWarrantyId" "RegionOfOrigin" "InventoryPartCostLevel" "ExtServiceCostMethod" "SupplyChainPartGroup" "AutomaticCapabilityCheck" "InputUnitMeasGroupId" "DopNetting" "CoReserveOnhAnalysFlag" "QtyCalcRounding" "LifecycleStage" "LifeStageLockedUntil" "FrequencyClass" "FreqClassLockedUntil" "FirstStatIssueDate" "LatestStatIssueDate" "LatestStatAffectingDate" "DeclineDate" "ExpiredDate" "DeclineIssueCounter" "ExpiredIssueCounter" "MinDurabDaysCoDeliv" "MinDurabDaysPlanning" "AutoCreatedGtin" "StorageWidthRequirement" "StorageHeightRequirement" "StorageDepthRequirement" "StorageVolumeRequirement" "StorageWeightRequirement" "MinStorageTemperature" "MaxStorageTemperature" "MinStorageHumidity" "MaxStorageHumidity" "StandardPutawayQty" "PutawayZoneRefillOption" "ResetConfigStdCost" "MandatoryExpirationDate" "ExclShipPackProposal" "Company" "StatisticalCode" "AcquisitionOrigin" "AcquisitionReasonId" "HsnSacCode" "ProductCategoryId" "PartCatalogDescription" "PartCatalogStdNameId" "PartCatalogConfigurable" "PartCatLangDescription" "SupersedesStartDate" "SupersedesEndDate" "CMrpToDop" "CPpvStatus" "CSfShipmentBoat" "CSfAssemblyBoat" "StructureUpdate" "RoutingUpdate" "NoDopUpdate"
Specify properties to return, see OData Select

Responses
200 response body for entity type InventoryPart
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryPart(Contract='{Contract}',PartNo='{PartNo}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objgrants": "It is a Text",
"Contract": "It is a Text",
"PartNo": "It is a Text",
"AccountingGroup": "It is a Text",
"AssetClass": "It is a Text",
"CountryOfOrigin": "It is a Text",
"HazardCode": "It is a Text",
"NoteId": 1,
"EstimatedMaterialCost": 1,
"PartProductCode": "It is a Text",
"PartProductFamily": "It is a Text",
"PartStatus": "It is a Text",
"PlannerBuyer": "It is a Text",
"PrimeCommodity": "It is a Text",
"SecondCommodity": "It is a Text",
"UnitMeas": "It is a Text",
"CatchUnitMeas": "It is a Text",
"Description": "It is a Text",
"DescriptionCopy": "It is a Text",
"DescriptionInUse": "It is a Text",
"AbcClass": "It is a Text",
"AbcClassLockedUntil": "2019-10-10",
"CountVariance": 1,
"CreateDate": "2019-10-10",
"CyclePeriod": 1,
"DimQuality": "It is a Text",
"DurabilityDay": 1,
"ExpectedLeadtime": 1,
"LastActivityDate": "2019-10-10",
"ManufLeadtime": 1,
"NoteText": "It is a Text",
"PurchLeadtime": 1,
"EarliestUltdSupplyDate": "2019-10-10",
"Supersedes": "It is a Text",
"CustomsStatNo": "It is a Text",
"TypeDesignation": "It is a Text",
"EngAttribute": "It is a Text",
"IntrastatConvFactor": 1,
"PartCostGroupId": "It is a Text",
"StdNameId": 1,
"TechnicalCoordinatorId": "It is a Text",
"ActualCostActivated": "2019-10-10",
"MaxActualCostUpdate": 1,
"CustWarrantyId": 1,
"SupWarrantyId": 1,
"RegionOfOrigin": "It is a Text",
"SupplyChainPartGroup": "It is a Text",
"InputUnitMeasGroupId": "It is a Text",
"QtyCalcRounding": 1,
"LifeStageLockedUntil": "2019-10-10",
"FreqClassLockedUntil": "2019-10-10",
"FirstStatIssueDate": "2019-10-10",
"LatestStatIssueDate": "2019-10-10",
"LatestStatAffectingDate": "2019-10-10",
"DeclineDate": "2019-10-10",
"ExpiredDate": "2019-10-10",
"DeclineIssueCounter": 1,
"ExpiredIssueCounter": 1,
"MinDurabDaysCoDeliv": 1,
"MinDurabDaysPlanning": 1,
"AutoCreatedGtin": "It is a Text",
"StorageWidthRequirement": 1,
"StorageHeightRequirement": 1,
"StorageDepthRequirement": 1,
"StorageVolumeRequirement": 1,
"StorageWeightRequirement": 1,
"MinStorageTemperature": 1,
"MaxStorageTemperature": 1,
"MinStorageHumidity": 1,
"MaxStorageHumidity": 1,
"StandardPutawayQty": 1,
"ResetConfigStdCost": true,
"MandatoryExpirationDate": true,
"ExclShipPackProposal": true,
"Company": "It is a Text",
"StatisticalCode": "It is a Text",
"AcquisitionOrigin": 1,
"AcquisitionReasonId": "It is a Text",
"HsnSacCode": "It is a Text",
"ProductCategoryId": "It is a Text",
"PartCatalogDescription": "It is a Text",
"PartCatalogStdNameId": 1,
"PartCatLangDescription": "It is a Text",
"SupersedesStartDate": "2019-10-10",
"SupersedesEndDate": "2019-10-10",
"CMrpToDop": "It is a Text",
"CPpvStatus": "It is a Text",
"CSfShipmentBoat": "It is a Text",
"CSfAssemblyBoat": "It is a Text",
"StructureUpdate": "It is a Text",
"RoutingUpdate": "It is a Text",
"NoDopUpdate": "It is a Text",
"CycleCode": "CyclicCounting",
"LeadTimeCode": "Manufactured",
"OeAllocAssignFlag": "PriorityReservation",
"OnhandAnalysisFlag": "MakeAvailabilityCheck",
"SupplyCode": "InventoryOrder",
"TypeCode": "Manufactured",
"ZeroCostFlag": "ZeroCostAllowed",
"AvailActivityStatus": "Changed",
"ShortageFlag": "ShortageNotation",
"ForecastConsumptionFlag": "OnlineConsumption",
"StockManagement": "VendorManagedInventory",
"DopConnection": "AutomaticDOP",
"InventoryValuationMethod": "WeightedAverage",
"NegativeOnHand": "NegativeOnHandAllowed",
"InvoiceConsideration": "IgnoreInvoicePrice",
"InventoryPartCostLevel": "CostPerPart",
"ExtServiceCostMethod": "IncludeServiceCost",
"AutomaticCapabilityCheck": "ReserveAndAllocate",
"DopNetting": "Netting",
"CoReserveOnhAnalysFlag": "MakeAvailabilityCheck",
"LifecycleStage": "Development",
"FrequencyClass": "VerySlowMover",
"PutawayZoneRefillOption": "NoRefill",
"PartCatalogConfigurable": "Configured"
}
Reference_Characteristic
Reference Entity Set Reference_Characteristic

Get entities from Reference_Characteristic
Authorizations:
(OpenIdbasicAuth)
query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "CharacteristicCode" "CharacteristicCode desc" "Description" "Description desc" "SearchType" "SearchType desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CharacteristicCode" "Description" "SearchType"
Specify properties to return, see OData Select

Responses
200 response body for entity array Characteristic
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_Characteristic

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_Characteristic by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
CharacteristicCode
required
string <= 5 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "CharacteristicCode" "Description" "SearchType"
Specify properties to return, see OData Select

Responses
200 response body for entity type Characteristic
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_Characteristic(CharacteristicCode='{CharacteristicCode}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objgrants": "It is a Text",
"CharacteristicCode": "It is a Text",
"Description": "It is a Text",
"SearchType": "Alpha"
}
Reference_CharacteristicTemplate
Reference Entity Set Reference_CharacteristicTemplate

Get entities from Reference_CharacteristicTemplate
Authorizations:
(OpenIdbasicAuth)
query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "EngAttribute" "EngAttribute desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "EngAttribute" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array CharacteristicTemplate
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CharacteristicTemplate

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_CharacteristicTemplate by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
EngAttribute
required
string <= 5 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "EngAttribute" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type CharacteristicTemplate
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CharacteristicTemplate(EngAttribute='{EngAttribute}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objgrants": "It is a Text",
"EngAttribute": "It is a Text",
"Description": "It is a Text"
}
Reference_DiscreteCharacValue
Reference Entity Set Reference_DiscreteCharacValue

Get entities from Reference_DiscreteCharacValue
Authorizations:
(OpenIdbasicAuth)
query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "CharacteristicCode" "CharacteristicCode desc" "CharacteristicValue" "CharacteristicValue desc" "CharacteristicValueAlpha" "CharacteristicValueAlpha desc" "CharacteristicValueNumeric" "CharacteristicValueNumeric desc" "CharacteristicValueDesc" "CharacteristicValueDesc desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CharacteristicCode" "CharacteristicValue" "CharacteristicValueAlpha" "CharacteristicValueNumeric" "CharacteristicValueDesc"
Specify properties to return, see OData Select

Responses
200 response body for entity array DiscreteCharacValue
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_DiscreteCharacValue

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_DiscreteCharacValue by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
CharacteristicCode
required
string <= 5 characters
Example: It is a Text
CharacteristicValue
required
string <= 60 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "CharacteristicCode" "CharacteristicValue" "CharacteristicValueAlpha" "CharacteristicValueNumeric" "CharacteristicValueDesc"
Specify properties to return, see OData Select

Responses
200 response body for entity type DiscreteCharacValue
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_DiscreteCharacValue(CharacteristicCode='{CharacteristicCode}',CharacteristicValue='{CharacteristicValue}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objgrants": "It is a Text",
"CharacteristicCode": "It is a Text",
"CharacteristicValue": "It is a Text",
"CharacteristicValueAlpha": "It is a Text",
"CharacteristicValueNumeric": 1,
"CharacteristicValueDesc": "It is a Text"
}
Reference_IsoUnit
Reference Entity Set Reference_IsoUnit

Get entities from Reference_IsoUnit
Authorizations:
(OpenIdbasicAuth)
query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "UnitCode" "UnitCode desc" "Description" "Description desc" "PresentFactor" "PresentFactor desc" "BaseUnit" "BaseUnit desc" "MultiFactor" "MultiFactor desc" "DivFactor" "DivFactor desc" "TenPower" "TenPower desc" "UserDefined" "UserDefined desc" "UnitType" "UnitType desc" "UomConstant" "UomConstant desc" "UsedInAppl" "UsedInAppl desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "UnitCode" "Description" "PresentFactor" "BaseUnit" "MultiFactor" "DivFactor" "TenPower" "UserDefined" "UnitType" "UomConstant" "UsedInAppl"
Specify properties to return, see OData Select

Responses
200 response body for entity array IsoUnit
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_IsoUnit

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_IsoUnit by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
UnitCode
required
string <= 30 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "UnitCode" "Description" "PresentFactor" "BaseUnit" "MultiFactor" "DivFactor" "TenPower" "UserDefined" "UnitType" "UomConstant" "UsedInAppl"
Specify properties to return, see OData Select

Responses
200 response body for entity type IsoUnit
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_IsoUnit(UnitCode='{UnitCode}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objgrants": "It is a Text",
"UnitCode": "It is a Text",
"Description": "It is a Text",
"PresentFactor": "It is a Text",
"BaseUnit": "It is a Text",
"MultiFactor": 1,
"DivFactor": 1,
"TenPower": 1,
"UserDefined": "It is a Text",
"UomConstant": 1,
"UsedInAppl": "It is a Text",
"UnitType": "NotUsed"
}
