
REST API Documentation
Search...
Lookup_IsoUnit_EntitySet
Lookup_IsoCountry_EntitySet
Lookup_IsoCurrency_EntitySet
KanbanCircuitSet
CircuitHoldReasonSet
ProductionLines
Service Operations - Actions
Service Operations - Functions
Reference_UserAllowedSiteLov
Reference_InventoryPartProdLineLov
Reference_InventoryLocation8
Reference_InventoryPartPlannerLov
Reference_ManufStructHeadInvPartLov
Reference_InvPartWithRmDaHeadLov
Reference_CircuitHoldReasonQuery
Reference_IntorderPartLov
Reference_WorkTimeCalendar
Reference_ManufStructHeadPartLov
Reference_KanbanCircuit
Reference_ProductionLine
Reference_CircuitHoldReason
Reference_ScheduleHorizon
Reference_Supplier
Reference_InventoryLocation
Reference_InventoryLocationGroup
Reference_InventoryPart
Reference_ProductionLinePart
Reference_ProductionLineRepPoint
Reference_ProductionLineLocation
Reference_IsoUnit
Reference_InventoryProductCode
Reference_InventoryProductFamily
Reference_AccountingGroup
Documentation Powered by Redocly
ProductionLineHandling (1)
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
Lookup_IsoCurrency_EntitySet
Get entities from Lookup_IsoCurrency_EntitySet
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
200 response body for entity array Lookup_IsoCurrency_EntityType
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Lookup_IsoCurrency_EntitySet

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
Get entity from Lookup_IsoCurrency_EntitySet by key
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
200 response body for entity type Lookup_IsoCurrency_EntityType
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Lookup_IsoCurrency_EntitySet(Id='{Id}')

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
KanbanCircuitSet
Get entities from KanbanCircuitSet
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
Items Enum: "Objstate" "Objstate desc" "Contract" "Contract desc" "PartNo" "PartNo desc" "SupplyToLocationNo" "SupplyToLocationNo desc" "NumberOfKanbans" "NumberOfKanbans desc" "QtyPerKanban" "QtyPerKanban desc" "ReplenishLotSize" "ReplenishLotSize desc" "QtyReorderPoint" "QtyReorderPoint desc" "NumberOfKanbansNew" "NumberOfKanbansNew desc" "QtyPerKanbanNew" "QtyPerKanbanNew desc" "QtyReorderPointNew" "QtyReorderPointNew desc" "QtyDemand" "QtyDemand desc" "SafetyStockFactor" "SafetyStockFactor desc" "ReplenishLeadtime" "ReplenishLeadtime desc" "ChangeDate" "ChangeDate desc" "RecalcDate" "RecalcDate desc" "CardText" "CardText desc" "NoteText" "NoteText desc" "PictureId" "PictureId desc" "ReplenishSignalType" "ReplenishSignalType desc" "ReplenishSource" "ReplenishSource desc" "SafetyStockCode" "SafetyStockCode desc" "KanbanCalcType" "KanbanCalcType desc" "ReplenishFromLine" "ReplenishFromLine desc" "SupplyToLine" "SupplyToLine desc" "ReplenishFromLocationNo" "ReplenishFromLocationNo desc" "ReplenishFromContract" "ReplenishFromContract desc" "ReplenishFromVendorNo" "ReplenishFromVendorNo desc" "ReplenishFromGroup" "ReplenishFromGroup desc" "KanbanCalcFormula" "KanbanCalcFormula desc" "KanbanDemandSource" "KanbanDemandSource desc" "DemandLastChangeDate" "DemandLastChangeDate desc" "ReplenishLotSizeNew" "ReplenishLotSizeNew desc" "HoldReasonCode" "HoldReasonCode desc" "DockCode" "DockCode desc" "SubDockCode" "SubDockCode desc" "CreatePurchaseOrder" "CreatePurchaseOrder desc" "ReplenishOrder" "ReplenishOrder desc" "PlannerId" "PlannerId desc" "CardsToAddSubtract" "CardsToAddSubtract desc" "NoOfObsoleteCards" "NoOfObsoleteCards desc" "PeakDemand" "PeakDemand desc" "VariationCoefficient" "VariationCoefficient desc" "MaxPosCumDeviation" "MaxPosCumDeviation desc" "HighestQtyOnHand" "HighestQtyOnHand desc" "LowestQtyOnHand" "LowestQtyOnHand desc" "AvgQtyOnHand" "AvgQtyOnHand desc" "SafetyStockUnits" "SafetyStockUnits desc" "QtyPerKanbanChange2" "QtyPerKanbanChange2 desc" "NumberOfKanbansChange2" "NumberOfKanbansChange2 desc" "ReorderPointChange2" "ReorderPointChange2 desc" "LotTransferQuantityChange" "LotTransferQuantityChange desc" "QtyPerKanbanChange3" "QtyPerKanbanChange3 desc" "NumberOfKanbansChange3" "NumberOfKanbansChange3 desc" "ReorderPointChange3" "ReorderPointChange3 desc" "LotTransferQty" "LotTransferQty desc" "DemandSourceDateRangeFrom" "DemandSourceDateRangeFrom desc" "DemandSourceDateRangeTo" "DemandSourceDateRangeTo desc" "Warehouse" "Warehouse desc" "Bay" "Bay desc" "RowNo" "RowNo desc" "Tier" "Tier desc" "Bin" "Bin desc" "UnitMeas" "UnitMeas desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Contract" "PartNo" "SupplyToLocationNo" "NumberOfKanbans" "QtyPerKanban" "ReplenishLotSize" "QtyReorderPoint" "NumberOfKanbansNew" "QtyPerKanbanNew" "QtyReorderPointNew" "QtyDemand" "SafetyStockFactor" "ReplenishLeadtime" "ChangeDate" "RecalcDate" "CardText" "NoteText" "PictureId" "ReplenishSignalType" "ReplenishSource" "SafetyStockCode" "KanbanCalcType" "ReplenishFromLine" "SupplyToLine" "ReplenishFromLocationNo" "ReplenishFromContract" "ReplenishFromVendorNo" "ReplenishFromGroup" "KanbanCalcFormula" "KanbanDemandSource" "DemandLastChangeDate" "ReplenishLotSizeNew" "HoldReasonCode" "DockCode" "SubDockCode" "CreatePurchaseOrder" "ReplenishOrder" "PlannerId" "CardsToAddSubtract" "NoOfObsoleteCards" "PeakDemand" "VariationCoefficient" "MaxPosCumDeviation" "HighestQtyOnHand" "LowestQtyOnHand" "AvgQtyOnHand" "SafetyStockUnits" "QtyPerKanbanChange2" "NumberOfKanbansChange2" "ReorderPointChange2" "LotTransferQuantityChange" "QtyPerKanbanChange3" "NumberOfKanbansChange3" "ReorderPointChange3" "LotTransferQty" "DemandSourceDateRangeFrom" "DemandSourceDateRangeTo" "Warehouse" "Bay" "RowNo" "Tier" "Bin" "UnitMeas"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "InventoryPartRef" "ContractRef" "PlannerIDRef" "SupplyToLocationNoRef" "HoldReasonCodeRef" "ReplenishFromLocationNoRef" "ReplenishFromGroupRef" "ReplenishFromLineRef" "ReplenishFromContractRef" "ReplenishFromVendorNoRef" "SupplyToLineRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array KanbanCircuit
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/KanbanCircuitSet

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
Get entity from KanbanCircuitSet by key
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
SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Contract" "PartNo" "SupplyToLocationNo" "NumberOfKanbans" "QtyPerKanban" "ReplenishLotSize" "QtyReorderPoint" "NumberOfKanbansNew" "QtyPerKanbanNew" "QtyReorderPointNew" "QtyDemand" "SafetyStockFactor" "ReplenishLeadtime" "ChangeDate" "RecalcDate" "CardText" "NoteText" "PictureId" "ReplenishSignalType" "ReplenishSource" "SafetyStockCode" "KanbanCalcType" "ReplenishFromLine" "SupplyToLine" "ReplenishFromLocationNo" "ReplenishFromContract" "ReplenishFromVendorNo" "ReplenishFromGroup" "KanbanCalcFormula" "KanbanDemandSource" "DemandLastChangeDate" "ReplenishLotSizeNew" "HoldReasonCode" "DockCode" "SubDockCode" "CreatePurchaseOrder" "ReplenishOrder" "PlannerId" "CardsToAddSubtract" "NoOfObsoleteCards" "PeakDemand" "VariationCoefficient" "MaxPosCumDeviation" "HighestQtyOnHand" "LowestQtyOnHand" "AvgQtyOnHand" "SafetyStockUnits" "QtyPerKanbanChange2" "NumberOfKanbansChange2" "ReorderPointChange2" "LotTransferQuantityChange" "QtyPerKanbanChange3" "NumberOfKanbansChange3" "ReorderPointChange3" "LotTransferQty" "DemandSourceDateRangeFrom" "DemandSourceDateRangeTo" "Warehouse" "Bay" "RowNo" "Tier" "Bin" "UnitMeas"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "InventoryPartRef" "ContractRef" "PlannerIDRef" "SupplyToLocationNoRef" "HoldReasonCodeRef" "ReplenishFromLocationNoRef" "ReplenishFromGroupRef" "ReplenishFromLineRef" "ReplenishFromContractRef" "ReplenishFromVendorNoRef" "SupplyToLineRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type KanbanCircuit
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/KanbanCircuitSet(Contract='{Contract}',PartNo='{PartNo}',SupplyToLocationNo='{SupplyToLocationNo}')

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
"SupplyToLocationNo": "It is a Text",
"NumberOfKanbans": 1,
"QtyPerKanban": 1,
"ReplenishLotSize": 1,
"QtyReorderPoint": 1,
"NumberOfKanbansNew": 1,
"QtyPerKanbanNew": 1,
"QtyReorderPointNew": 1,
"QtyDemand": 1,
"SafetyStockFactor": 1,
"ReplenishLeadtime": 1,
"ChangeDate": "2019-10-10",
"RecalcDate": "2019-10-10",
"CardText": "It is a Text",
"NoteText": "It is a Text",
"PictureId": 1,
"ReplenishFromLine": "It is a Text",
"SupplyToLine": "It is a Text",
"ReplenishFromLocationNo": "It is a Text",
"ReplenishFromContract": "It is a Text",
"ReplenishFromVendorNo": "It is a Text",
"ReplenishFromGroup": "It is a Text",
"DemandLastChangeDate": "2019-10-10",
"ReplenishLotSizeNew": 1,
"HoldReasonCode": "It is a Text",
"DockCode": "It is a Text",
"SubDockCode": "It is a Text",
"CreatePurchaseOrder": "It is a Text",
"PlannerId": "It is a Text",
"CardsToAddSubtract": 1,
"NoOfObsoleteCards": 1,
"PeakDemand": 1,
"VariationCoefficient": 1,
"MaxPosCumDeviation": 1,
"HighestQtyOnHand": 1,
"LowestQtyOnHand": 1,
"AvgQtyOnHand": 1,
"SafetyStockUnits": 1,
"QtyPerKanbanChange2": 1,
"NumberOfKanbansChange2": 1,
"ReorderPointChange2": 1,
"LotTransferQuantityChange": 1,
"QtyPerKanbanChange3": 1,
"NumberOfKanbansChange3": 1,
"ReorderPointChange3": 1,
"LotTransferQty": 1,
"DemandSourceDateRangeFrom": "2019-10-10",
"DemandSourceDateRangeTo": "2019-10-10",
"Warehouse": "It is a Text",
"Bay": "It is a Text",
"RowNo": "It is a Text",
"Tier": "It is a Text",
"Bin": "It is a Text",
"UnitMeas": "It is a Text",
"Objstate": "Inactive",
"ReplenishSignalType": "VisualNotElectronic",
"ReplenishSource": "Location",
"SafetyStockCode": "Percentage",
"KanbanCalcType": "NumberOfKanbans",
"KanbanCalcFormula": "BasicADDLTSSLot",
"KanbanDemandSource": "Msmrp",
"ReplenishOrder": "TransportTask"
}
Invoke function DefaultCopy
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
SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
query Parameters
@CopyValues
required
object (KanbanCircuitCopyValues)
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Contract" "PartNo" "SupplyToLocationNo" "NumberOfKanbans" "QtyPerKanban" "ReplenishLotSize" "QtyReorderPoint" "NumberOfKanbansNew" "QtyPerKanbanNew" "QtyReorderPointNew" "QtyDemand" "SafetyStockFactor" "ReplenishLeadtime" "ChangeDate" "RecalcDate" "CardText" "NoteText" "PictureId" "ReplenishSignalType" "ReplenishSource" "SafetyStockCode" "KanbanCalcType" "ReplenishFromLine" "SupplyToLine" "ReplenishFromLocationNo" "ReplenishFromContract" "ReplenishFromVendorNo" "ReplenishFromGroup" "KanbanCalcFormula" "KanbanDemandSource" "DemandLastChangeDate" "ReplenishLotSizeNew" "HoldReasonCode" "DockCode" "SubDockCode" "CreatePurchaseOrder" "ReplenishOrder" "PlannerId" "CardsToAddSubtract" "NoOfObsoleteCards" "PeakDemand" "VariationCoefficient" "MaxPosCumDeviation" "HighestQtyOnHand" "LowestQtyOnHand" "AvgQtyOnHand" "SafetyStockUnits" "QtyPerKanbanChange2" "NumberOfKanbansChange2" "ReorderPointChange2" "LotTransferQuantityChange" "QtyPerKanbanChange3" "NumberOfKanbansChange3" "ReorderPointChange3" "LotTransferQty" "DemandSourceDateRangeFrom" "DemandSourceDateRangeTo" "Warehouse" "Bay" "RowNo" "Tier" "Bin" "UnitMeas"
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
/KanbanCircuitSet(Contract='{Contract}',PartNo='{PartNo}',SupplyToLocationNo='{SupplyToLocationNo}')/IfsApp.ProductionLineHandling.KanbanCircuit_DefaultCopy(CopyValues=@CopyValues)

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
"SupplyToLocationNo": "It is a Text",
"NumberOfKanbans": 1,
"QtyPerKanban": 1,
"ReplenishLotSize": 1,
"QtyReorderPoint": 1,
"NumberOfKanbansNew": 1,
"QtyPerKanbanNew": 1,
"QtyReorderPointNew": 1,
"QtyDemand": 1,
"SafetyStockFactor": 1,
"ReplenishLeadtime": 1,
"ChangeDate": "2019-10-10",
"RecalcDate": "2019-10-10",
"CardText": "It is a Text",
"NoteText": "It is a Text",
"PictureId": 1,
"ReplenishFromLine": "It is a Text",
"SupplyToLine": "It is a Text",
"ReplenishFromLocationNo": "It is a Text",
"ReplenishFromContract": "It is a Text",
"ReplenishFromVendorNo": "It is a Text",
"ReplenishFromGroup": "It is a Text",
"DemandLastChangeDate": "2019-10-10",
"ReplenishLotSizeNew": 1,
"HoldReasonCode": "It is a Text",
"DockCode": "It is a Text",
"SubDockCode": "It is a Text",
"CreatePurchaseOrder": "It is a Text",
"PlannerId": "It is a Text",
"CardsToAddSubtract": 1,
"NoOfObsoleteCards": 1,
"PeakDemand": 1,
"VariationCoefficient": 1,
"MaxPosCumDeviation": 1,
"HighestQtyOnHand": 1,
"LowestQtyOnHand": 1,
"AvgQtyOnHand": 1,
"SafetyStockUnits": 1,
"QtyPerKanbanChange2": 1,
"NumberOfKanbansChange2": 1,
"ReorderPointChange2": 1,
"LotTransferQuantityChange": 1,
"QtyPerKanbanChange3": 1,
"NumberOfKanbansChange3": 1,
"ReorderPointChange3": 1,
"LotTransferQty": 1,
"DemandSourceDateRangeFrom": "2019-10-10",
"DemandSourceDateRangeTo": "2019-10-10",
"Warehouse": "It is a Text",
"Bay": "It is a Text",
"RowNo": "It is a Text",
"Tier": "It is a Text",
"Bin": "It is a Text",
"UnitMeas": "It is a Text",
"Objstate": "Inactive",
"ReplenishSignalType": "VisualNotElectronic",
"ReplenishSource": "Location",
"SafetyStockCode": "Percentage",
"KanbanCalcType": "NumberOfKanbans",
"KanbanCalcFormula": "BasicADDLTSSLot",
"KanbanDemandSource": "Msmrp",
"ReplenishOrder": "TransportTask"
}
Get entities from InventoryPartRef
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
SupplyToLocationNo
required
string <= 35 characters
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
/KanbanCircuitSet(Contract='{Contract}',PartNo='{PartNo}',SupplyToLocationNo='{SupplyToLocationNo}')/InventoryPartRef

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
Contract
required
string <= 5 characters
Example: It is a Text
PartNo
required
string <= 25 characters
Example: It is a Text
SupplyToLocationNo
required
string <= 35 characters
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
/KanbanCircuitSet(Contract='{Contract}',PartNo='{PartNo}',SupplyToLocationNo='{SupplyToLocationNo}')/ContractRef

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
Get entities from PlannerIDRef
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
SupplyToLocationNo
required
string <= 35 characters
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
Items Enum: "BuyerCode" "BuyerCode desc" "BuyerName" "BuyerName desc" "Objstate" "Objstate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "BuyerCode" "BuyerName" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryPartPlannerLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/KanbanCircuitSet(Contract='{Contract}',PartNo='{PartNo}',SupplyToLocationNo='{SupplyToLocationNo}')/PlannerIDRef

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
Get entities from SupplyToLocationNoRef
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
SupplyToLocationNo
required
string <= 35 characters
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
Items Enum: "Contract" "Contract desc" "LocationNo" "LocationNo desc" "LocationGroup" "LocationGroup desc" "WarehouseId" "WarehouseId desc" "BayId" "BayId desc" "RowId" "RowId desc" "TierId" "TierId desc" "BinId" "BinId desc" "Description" "Description desc" "LocationSequence" "LocationSequence desc" "WidthCapacity" "WidthCapacity desc" "HeightCapacity" "HeightCapacity desc" "DeptCapacity" "DeptCapacity desc" "CarryingCapacity" "CarryingCapacity desc" "MinTemperature" "MinTemperature desc" "MaxTemperature" "MaxTemperature desc" "MinHumidity" "MinHumidity desc" "MaxHumidity" "MaxHumidity desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "LocationNo" "LocationGroup" "WarehouseId" "BayId" "RowId" "TierId" "BinId" "Description" "LocationSequence" "WidthCapacity" "HeightCapacity" "DeptCapacity" "CarryingCapacity" "MinTemperature" "MaxTemperature" "MinHumidity" "MaxHumidity"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryLocation
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/KanbanCircuitSet(Contract='{Contract}',PartNo='{PartNo}',SupplyToLocationNo='{SupplyToLocationNo}')/SupplyToLocationNoRef

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
Get entities from HoldReasonCodeRef
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
SupplyToLocationNo
required
string <= 35 characters
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
Items Enum: "HoldReasonCode" "HoldReasonCode desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "HoldReasonCode" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array CircuitHoldReason
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/KanbanCircuitSet(Contract='{Contract}',PartNo='{PartNo}',SupplyToLocationNo='{SupplyToLocationNo}')/HoldReasonCodeRef

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
Get entities from ReplenishFromLocationNoRef
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
SupplyToLocationNo
required
string <= 35 characters
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
Items Enum: "Contract" "Contract desc" "LocationNo" "LocationNo desc" "LocationGroup" "LocationGroup desc" "WarehouseId" "WarehouseId desc" "BayId" "BayId desc" "RowId" "RowId desc" "TierId" "TierId desc" "BinId" "BinId desc" "Description" "Description desc" "LocationSequence" "LocationSequence desc" "WidthCapacity" "WidthCapacity desc" "HeightCapacity" "HeightCapacity desc" "DeptCapacity" "DeptCapacity desc" "CarryingCapacity" "CarryingCapacity desc" "MinTemperature" "MinTemperature desc" "MaxTemperature" "MaxTemperature desc" "MinHumidity" "MinHumidity desc" "MaxHumidity" "MaxHumidity desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "LocationNo" "LocationGroup" "WarehouseId" "BayId" "RowId" "TierId" "BinId" "Description" "LocationSequence" "WidthCapacity" "HeightCapacity" "DeptCapacity" "CarryingCapacity" "MinTemperature" "MaxTemperature" "MinHumidity" "MaxHumidity"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryLocation
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/KanbanCircuitSet(Contract='{Contract}',PartNo='{PartNo}',SupplyToLocationNo='{SupplyToLocationNo}')/ReplenishFromLocationNoRef

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
Get entities from ReplenishFromGroupRef
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
SupplyToLocationNo
required
string <= 35 characters
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
Items Enum: "LocationGroup" "LocationGroup desc" "Description" "Description desc" "InventoryLocationType" "InventoryLocationType desc" "TrolleyType" "TrolleyType desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "LocationGroup" "Description" "InventoryLocationType" "TrolleyType"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryLocationGroup
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/KanbanCircuitSet(Contract='{Contract}',PartNo='{PartNo}',SupplyToLocationNo='{SupplyToLocationNo}')/ReplenishFromGroupRef

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
Get entities from ReplenishFromLineRef
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
SupplyToLocationNo
required
string <= 35 characters
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
Items Enum: "Contract" "Contract desc" "ProductionLine" "ProductionLine desc" "Description" "Description desc" "CreateDate" "CreateDate desc" "LastActivityDate" "LastActivityDate desc" "ReserveFlag" "ReserveFlag desc" "CalendarId" "CalendarId desc" "DailyOperatingMinutes" "DailyOperatingMinutes desc" "LineSchedLoadMethod" "LineSchedLoadMethod desc" "DefaultSchedulingHorizon" "DefaultSchedulingHorizon desc" "TaktTime" "TaktTime desc" "TaktTimeCalcDate" "TaktTimeCalcDate desc" "TaktTimeDemandStart" "TaktTimeDemandStart desc" "TaktTimeDemandEnd" "TaktTimeDemandEnd desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "CalendarIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ProductionLine
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/KanbanCircuitSet(Contract='{Contract}',PartNo='{PartNo}',SupplyToLocationNo='{SupplyToLocationNo}')/ReplenishFromLineRef

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
Get entities from ReplenishFromContractRef
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
SupplyToLocationNo
required
string <= 35 characters
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
/KanbanCircuitSet(Contract='{Contract}',PartNo='{PartNo}',SupplyToLocationNo='{SupplyToLocationNo}')/ReplenishFromContractRef

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
Get entities from ReplenishFromVendorNoRef
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
SupplyToLocationNo
required
string <= 35 characters
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
Items Enum: "VendorNo" "VendorNo desc" "VendorName" "VendorName desc" "BuyerCode" "BuyerCode desc" "CurrencyCode" "CurrencyCode desc" "SuppGrp" "SuppGrp desc" "AdditionalCostAmount" "AdditionalCostAmount desc" "Contact" "Contact desc" "CrCheck" "CrCheck desc" "CrDate" "CrDate desc" "CrNoteText" "CrNoteText desc" "DateDel" "DateDel desc" "Discount" "Discount desc" "NoteText" "NoteText desc" "OurCustomerNo" "OurCustomerNo desc" "PackListFlag" "PackListFlag desc" "PurchOrderFlag" "PurchOrderFlag desc" "QcApproval" "QcApproval desc" "QcDate" "QcDate desc" "QcAudit" "QcAudit desc" "QcNoteText" "QcNoteText desc" "OrdConfRemInterval" "OrdConfRemInterval desc" "DeliveryRemInterval" "DeliveryRemInterval desc" "DaysBeforeDelivery" "DaysBeforeDelivery desc" "DaysBeforeArrival" "DaysBeforeArrival desc" "OrdConfReminder" "OrdConfReminder desc" "DeliveryReminder" "DeliveryReminder desc" "Category" "Category desc" "AcquisitionSite" "AcquisitionSite desc" "Company" "Company desc" "PayTermId" "PayTermId desc" "EdiAutoApprovalUser" "EdiAutoApprovalUser desc" "QcType" "QcType desc" "EnvironmentDate" "EnvironmentDate desc" "EnvironmentType" "EnvironmentType desc" "EnvironmentalApproval" "EnvironmentalApproval desc" "EnvironmentAudit" "EnvironmentAudit desc" "EnvironmentNoteText" "EnvironmentNoteText desc" "CocApproval" "CocApproval desc" "CocDate" "CocDate desc" "CocType" "CocType desc" "CocAudit" "CocAudit desc" "CocNoteText" "CocNoteText desc" "CustomerNo" "CustomerNo desc" "NoteId" "NoteId desc" "SupplierTemplateDesc" "SupplierTemplateDesc desc" "TemplateSupplier" "TemplateSupplier desc" "QuickRegisteredSupplier" "QuickRegisteredSupplier desc" "BlanketDate" "BlanketDate desc" "ExpressOrderAllowed" "ExpressOrderAllowed desc" "EdiPriCatAppUser" "EdiPriCatAppUser desc" "PricatAutomaticApproval" "PricatAutomaticApproval desc" "AutomaticReplChange" "AutomaticReplChange desc" "SendChangeMessage" "SendChangeMessage desc" "ReceiptRefReminder" "ReceiptRefReminder desc" "PrintAmountsInclTax" "PrintAmountsInclTax desc" "ClosingDay" "ClosingDay desc" "EndOfMonth" "EndOfMonth desc" "ReceivingAdviceType" "ReceivingAdviceType desc" "RecAdvSelfBilling" "RecAdvSelfBilling desc" "ClassificationStandard" "ClassificationStandard desc" "PurchaseCode" "PurchaseCode desc" "PoChangeManagement" "PoChangeManagement desc" "CreateConfirmationChgOrd" "CreateConfirmationChgOrd desc" "EmailPurchaseOrder" "EmailPurchaseOrder desc" "VendorCategoryDb" "VendorCategoryDb desc" "DirDelApproval" "DirDelApproval desc" "OrderConfApproval" "OrderConfApproval desc" "OrderConfDiffApproval" "OrderConfDiffApproval desc" "AdhocPurRqstApproval" "AdhocPurRqstApproval desc" "TaxLiability" "TaxLiability desc" "B2bConfOrderWithDiff" "B2bConfOrderWithDiff desc" "QualitySystemLevelId" "QualitySystemLevelId desc" "QualityAuditId" "QualityAuditId desc" "EnvironmentAuditId" "EnvironmentAuditId desc" "CocAuditId" "CocAuditId desc" "RecAdvSbConsignment" "RecAdvSbConsignment desc" "RecAdvSbMixOwnership" "RecAdvSbMixOwnership desc" "CCommId" "CCommId desc" "COutputMedia" "COutputMedia desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "VendorNo" "VendorName" "BuyerCode" "CurrencyCode" "SuppGrp" "AdditionalCostAmount" "Contact" "CrCheck" "CrDate" "CrNoteText" "DateDel" "Discount" "NoteText" "OurCustomerNo" "PackListFlag" "PurchOrderFlag" "QcApproval" "QcDate" "QcAudit" "QcNoteText" "OrdConfRemInterval" "DeliveryRemInterval" "DaysBeforeDelivery" "DaysBeforeArrival" "OrdConfReminder" "DeliveryReminder" "Category" "AcquisitionSite" "Company" "PayTermId" "EdiAutoApprovalUser" "QcType" "EnvironmentDate" "EnvironmentType" "EnvironmentalApproval" "EnvironmentAudit" "EnvironmentNoteText" "CocApproval" "CocDate" "CocType" "CocAudit" "CocNoteText" "CustomerNo" "NoteId" "SupplierTemplateDesc" "TemplateSupplier" "QuickRegisteredSupplier" "BlanketDate" "ExpressOrderAllowed" "EdiPriCatAppUser" "PricatAutomaticApproval" "AutomaticReplChange" "SendChangeMessage" "ReceiptRefReminder" "PrintAmountsInclTax" "ClosingDay" "EndOfMonth" "ReceivingAdviceType" "RecAdvSelfBilling" "ClassificationStandard" "PurchaseCode" "PoChangeManagement" "CreateConfirmationChgOrd" "EmailPurchaseOrder" "VendorCategoryDb" "DirDelApproval" "OrderConfApproval" "OrderConfDiffApproval" "AdhocPurRqstApproval" "TaxLiability" "B2bConfOrderWithDiff" "QualitySystemLevelId" "QualityAuditId" "EnvironmentAuditId" "CocAuditId" "RecAdvSbConsignment" "RecAdvSbMixOwnership" "CCommId" "COutputMedia"
Specify properties to return, see OData Select

Responses
200 response body for entity array Supplier
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/KanbanCircuitSet(Contract='{Contract}',PartNo='{PartNo}',SupplyToLocationNo='{SupplyToLocationNo}')/ReplenishFromVendorNoRef

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
Get entities from SupplyToLineRef
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
SupplyToLocationNo
required
string <= 35 characters
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
Items Enum: "Contract" "Contract desc" "ProductionLine" "ProductionLine desc" "Description" "Description desc" "CreateDate" "CreateDate desc" "LastActivityDate" "LastActivityDate desc" "ReserveFlag" "ReserveFlag desc" "CalendarId" "CalendarId desc" "DailyOperatingMinutes" "DailyOperatingMinutes desc" "LineSchedLoadMethod" "LineSchedLoadMethod desc" "DefaultSchedulingHorizon" "DefaultSchedulingHorizon desc" "TaktTime" "TaktTime desc" "TaktTimeCalcDate" "TaktTimeCalcDate desc" "TaktTimeDemandStart" "TaktTimeDemandStart desc" "TaktTimeDemandEnd" "TaktTimeDemandEnd desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "CalendarIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ProductionLine
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/KanbanCircuitSet(Contract='{Contract}',PartNo='{PartNo}',SupplyToLocationNo='{SupplyToLocationNo}')/SupplyToLineRef

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
CircuitHoldReasonSet
Get entities from CircuitHoldReasonSet
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
Items Enum: "HoldReasonCode" "HoldReasonCode desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "HoldReasonCode" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array CircuitHoldReasonQuery
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CircuitHoldReasonSet

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
Get entity from CircuitHoldReasonSet by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
HoldReasonCode
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "HoldReasonCode" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type CircuitHoldReasonQuery
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CircuitHoldReasonSet(HoldReasonCode='{HoldReasonCode}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"HoldReasonCode": "It is a Text",
"Description": "It is a Text"
}
ProductionLines
Get entities from ProductionLines
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
Items Enum: "Contract" "Contract desc" "ProductionLine" "ProductionLine desc" "Description" "Description desc" "CreateDate" "CreateDate desc" "LastActivityDate" "LastActivityDate desc" "ReserveFlag" "ReserveFlag desc" "CalendarId" "CalendarId desc" "DailyOperatingMinutes" "DailyOperatingMinutes desc" "LineSchedLoadMethod" "LineSchedLoadMethod desc" "DefaultSchedulingHorizon" "DefaultSchedulingHorizon desc" "TaktTime" "TaktTime desc" "TaktTimeCalcDate" "TaktTimeCalcDate desc" "TaktTimeDemandStart" "TaktTimeDemandStart desc" "TaktTimeDemandEnd" "TaktTimeDemandEnd desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "CalendarIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ProductionLine
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines

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
Add new entity to ProductionLines
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type ProductionLine

Contract
required
string <= 5 characters
ProductionLine
required
string <= 12 characters
Description
required
string <= 25 characters
CreateDate
required
string <date>
LastActivityDate
required
string <date>
ReserveFlag	
string (ReserveBackflushType_Enumeration)
Enum: "ReserveAllowed" "BackflushAllowed" "ReserveBackflushAllowed" "NotAllowed"
CalendarId
required
string <= 10 characters
DailyOperatingMinutes	
number
LineSchedLoadMethod	
string (LineSchedLoadMethod_Enumeration)
Enum: "LoadInfinite" "ForwardUpToLineRate" "BackwardUpToLineRate"
DefaultSchedulingHorizon	
string <= 36 characters
TaktTime	
number
TaktTimeCalcDate	
string <date>
TaktTimeDemandStart	
string <date>
TaktTimeDemandEnd	
string <date>
Responses
201 response body for entity type ProductionLine
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/ProductionLines

Request samples
Payload
Content type
application/json

Copy
{
"Contract": "It is a Text",
"ProductionLine": "It is a Text",
"Description": "It is a Text",
"CreateDate": "2019-10-10",
"LastActivityDate": "2019-10-10",
"ReserveFlag": "ReserveAllowed",
"CalendarId": "It is a Text",
"DailyOperatingMinutes": 1,
"LineSchedLoadMethod": "LoadInfinite",
"DefaultSchedulingHorizon": "It is a Text",
"TaktTime": 1,
"TaktTimeCalcDate": "2019-10-10",
"TaktTimeDemandStart": "2019-10-10",
"TaktTimeDemandEnd": "2019-10-10"
}
Response samples
201400403405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objgrants": "It is a Text",
"Contract": "It is a Text",
"ProductionLine": "It is a Text",
"Description": "It is a Text",
"CreateDate": "2019-10-10",
"LastActivityDate": "2019-10-10",
"CalendarId": "It is a Text",
"DailyOperatingMinutes": 1,
"DefaultSchedulingHorizon": "It is a Text",
"TaktTime": 1,
"TaktTimeCalcDate": "2019-10-10",
"TaktTimeDemandStart": "2019-10-10",
"TaktTimeDemandEnd": "2019-10-10",
"ReserveFlag": "ReserveAllowed",
"LineSchedLoadMethod": "LoadInfinite"
}
Get entity from ProductionLines by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "CalendarIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type ProductionLine
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')

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
"ProductionLine": "It is a Text",
"Description": "It is a Text",
"CreateDate": "2019-10-10",
"LastActivityDate": "2019-10-10",
"CalendarId": "It is a Text",
"DailyOperatingMinutes": 1,
"DefaultSchedulingHorizon": "It is a Text",
"TaktTime": 1,
"TaktTimeCalcDate": "2019-10-10",
"TaktTimeDemandStart": "2019-10-10",
"TaktTimeDemandEnd": "2019-10-10",
"ReserveFlag": "ReserveAllowed",
"LineSchedLoadMethod": "LoadInfinite"
}
Delete entity from ProductionLines
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
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
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')

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
Update entity in ProductionLines
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type ProductionLine

Description
required
string <= 25 characters
ReserveFlag	
string (ReserveBackflushType_Enumeration)
Enum: "ReserveAllowed" "BackflushAllowed" "ReserveBackflushAllowed" "NotAllowed"
CalendarId
required
string <= 10 characters
DailyOperatingMinutes	
number
LineSchedLoadMethod	
string (LineSchedLoadMethod_Enumeration)
Enum: "LoadInfinite" "ForwardUpToLineRate" "BackwardUpToLineRate"
DefaultSchedulingHorizon	
string <= 36 characters
TaktTime	
number
TaktTimeCalcDate	
string <date>
TaktTimeDemandStart	
string <date>
TaktTimeDemandEnd	
string <date>
Responses
200 response body for entity type ProductionLine
201 response body for entity type ProductionLine
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
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')

Request samples
Payload
Content type
application/json

Copy
{
"Description": "It is a Text",
"ReserveFlag": "ReserveAllowed",
"CalendarId": "It is a Text",
"DailyOperatingMinutes": 1,
"LineSchedLoadMethod": "LoadInfinite",
"DefaultSchedulingHorizon": "It is a Text",
"TaktTime": 1,
"TaktTimeCalcDate": "2019-10-10",
"TaktTimeDemandStart": "2019-10-10",
"TaktTimeDemandEnd": "2019-10-10"
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
"ProductionLine": "It is a Text",
"Description": "It is a Text",
"CreateDate": "2019-10-10",
"LastActivityDate": "2019-10-10",
"CalendarId": "It is a Text",
"DailyOperatingMinutes": 1,
"DefaultSchedulingHorizon": "It is a Text",
"TaktTime": 1,
"TaktTimeCalcDate": "2019-10-10",
"TaktTimeDemandStart": "2019-10-10",
"TaktTimeDemandEnd": "2019-10-10",
"ReserveFlag": "ReserveAllowed",
"LineSchedLoadMethod": "LoadInfinite"
}
Invoke function DefaultCopy
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
query Parameters
@CopyValues
required
object (ProductionLineCopyValues)
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
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
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/IfsApp.ProductionLineHandling.ProductionLine_DefaultCopy(CopyValues=@CopyValues)

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
"ProductionLine": "It is a Text",
"Description": "It is a Text",
"CreateDate": "2019-10-10",
"LastActivityDate": "2019-10-10",
"CalendarId": "It is a Text",
"DailyOperatingMinutes": 1,
"DefaultSchedulingHorizon": "It is a Text",
"TaktTime": 1,
"TaktTimeCalcDate": "2019-10-10",
"TaktTimeDemandStart": "2019-10-10",
"TaktTimeDemandEnd": "2019-10-10",
"ReserveFlag": "ReserveAllowed",
"LineSchedLoadMethod": "LoadInfinite"
}
Invoke function DefaultCopy
Authorizations:
(OpenIdbasicAuth)
query Parameters
@CopyValues
required
object (ProductionLineCopyValues)
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
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
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines/IfsApp.ProductionLineHandling.ProductionLine_DefaultCopy(CopyValues=@CopyValues)

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objgrants": "It is a Text",
"Contract": "It is a Text",
"ProductionLine": "It is a Text",
"Description": "It is a Text",
"CreateDate": "2019-10-10",
"LastActivityDate": "2019-10-10",
"CalendarId": "It is a Text",
"DailyOperatingMinutes": 1,
"DefaultSchedulingHorizon": "It is a Text",
"TaktTime": 1,
"TaktTimeCalcDate": "2019-10-10",
"TaktTimeDemandStart": "2019-10-10",
"TaktTimeDemandEnd": "2019-10-10",
"ReserveFlag": "ReserveAllowed",
"LineSchedLoadMethod": "LoadInfinite"
}
Invoke function Default
Authorizations:
(OpenIdbasicAuth)
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type ProductionLine
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines/IfsApp.ProductionLineHandling.ProductionLine_Default()

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objgrants": "It is a Text",
"Contract": "It is a Text",
"ProductionLine": "It is a Text",
"Description": "It is a Text",
"CreateDate": "2019-10-10",
"LastActivityDate": "2019-10-10",
"CalendarId": "It is a Text",
"DailyOperatingMinutes": 1,
"DefaultSchedulingHorizon": "It is a Text",
"TaktTime": 1,
"TaktTimeCalcDate": "2019-10-10",
"TaktTimeDemandStart": "2019-10-10",
"TaktTimeDemandEnd": "2019-10-10",
"ReserveFlag": "ReserveAllowed",
"LineSchedLoadMethod": "LoadInfinite"
}
Get entities from ProductionLinePartArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "ProductionLine" "ProductionLine desc" "LastActivityDate" "LastActivityDate desc" "SchedulePercentage" "SchedulePercentage desc" "HorizonId" "HorizonId desc" "ScheduleFraction" "ScheduleFraction desc" "AverageDailyDemand" "AverageDailyDemand desc" "PartTaktTime" "PartTaktTime desc" "ReceiveInBackground" "ReceiveInBackground desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "ProductionLine" "LastActivityDate" "SchedulePercentage" "HorizonId" "ScheduleFraction" "AverageDailyDemand" "PartTaktTime" "ReceiveInBackground"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ProductionLineRef" "PartNoRef" "HorizonIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ProductionLinePart
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/ProductionLinePartArray

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
Add new entity to ProductionLinePartArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type ProductionLinePart

Contract
required
string <= 5 characters
PartNo
required
string <= 25 characters
ProductionLine
required
string <= 12 characters
LastActivityDate
required
string <date>
SchedulePercentage
required
number
HorizonId	
string <= 100 characters
ScheduleFraction
required
string (ScheduleFraction_Enumeration)
Enum: "FractionNotAllowed" "FractionQtyAllowed"
AverageDailyDemand	
number
PartTaktTime	
number
ReceiveInBackground
required
boolean
Responses
201 response body for entity type ProductionLinePart
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/ProductionLinePartArray

Request samples
Payload
Content type
application/json

Copy
{
"Contract": "It is a Text",
"PartNo": "It is a Text",
"ProductionLine": "It is a Text",
"LastActivityDate": "2019-10-10",
"SchedulePercentage": 1,
"HorizonId": "It is a Text",
"ScheduleFraction": "FractionNotAllowed",
"AverageDailyDemand": 1,
"PartTaktTime": 1,
"ReceiveInBackground": true
}
Response samples
201400403405500501503504
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
"ProductionLine": "It is a Text",
"LastActivityDate": "2019-10-10",
"SchedulePercentage": 1,
"HorizonId": "It is a Text",
"AverageDailyDemand": 1,
"PartTaktTime": 1,
"ReceiveInBackground": true,
"ScheduleFraction": "FractionNotAllowed"
}
Get entity from ProductionLinePartArray by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
ProductionLinePartArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

ProductionLinePartArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

ProductionLinePartArray_ProductionLine
required
string <= 12 characters
Example: It is a Text
key: ProductionLine

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "CalendarIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type ProductionLinePart
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/ProductionLinePartArray(Contract='{ProductionLinePartArray_Contract}',PartNo='{ProductionLinePartArray_PartNo}',ProductionLine='{ProductionLinePartArray_ProductionLine}')

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
"ProductionLine": "It is a Text",
"LastActivityDate": "2019-10-10",
"SchedulePercentage": 1,
"HorizonId": "It is a Text",
"AverageDailyDemand": 1,
"PartTaktTime": 1,
"ReceiveInBackground": true,
"ScheduleFraction": "FractionNotAllowed"
}
Delete entity from ProductionLinePartArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
ProductionLinePartArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

ProductionLinePartArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

ProductionLinePartArray_ProductionLine
required
string <= 12 characters
Example: It is a Text
key: ProductionLine

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
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/ProductionLinePartArray(Contract='{ProductionLinePartArray_Contract}',PartNo='{ProductionLinePartArray_PartNo}',ProductionLine='{ProductionLinePartArray_ProductionLine}')

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
Update entity in ProductionLinePartArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
ProductionLinePartArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

ProductionLinePartArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

ProductionLinePartArray_ProductionLine
required
string <= 12 characters
Example: It is a Text
key: ProductionLine

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type ProductionLinePart

SchedulePercentage
required
number
HorizonId	
string <= 100 characters
ScheduleFraction
required
string (ScheduleFraction_Enumeration)
Enum: "FractionNotAllowed" "FractionQtyAllowed"
AverageDailyDemand	
number
PartTaktTime	
number
ReceiveInBackground
required
boolean
Responses
200 response body for entity type ProductionLinePart
201 response body for entity type ProductionLinePart
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
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/ProductionLinePartArray(Contract='{ProductionLinePartArray_Contract}',PartNo='{ProductionLinePartArray_PartNo}',ProductionLine='{ProductionLinePartArray_ProductionLine}')

Request samples
Payload
Content type
application/json

Copy
{
"SchedulePercentage": 1,
"HorizonId": "It is a Text",
"ScheduleFraction": "FractionNotAllowed",
"AverageDailyDemand": 1,
"PartTaktTime": 1,
"ReceiveInBackground": true
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
"ProductionLine": "It is a Text",
"LastActivityDate": "2019-10-10",
"SchedulePercentage": 1,
"HorizonId": "It is a Text",
"AverageDailyDemand": 1,
"PartTaktTime": 1,
"ReceiveInBackground": true,
"ScheduleFraction": "FractionNotAllowed"
}
Get entities from ProductionLineRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
ProductionLinePartArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

ProductionLinePartArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

ProductionLinePartArray_ProductionLine
required
string <= 12 characters
Example: It is a Text
key: ProductionLine

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
Items Enum: "Contract" "Contract desc" "ProductionLine" "ProductionLine desc" "Description" "Description desc" "CreateDate" "CreateDate desc" "LastActivityDate" "LastActivityDate desc" "ReserveFlag" "ReserveFlag desc" "CalendarId" "CalendarId desc" "DailyOperatingMinutes" "DailyOperatingMinutes desc" "LineSchedLoadMethod" "LineSchedLoadMethod desc" "DefaultSchedulingHorizon" "DefaultSchedulingHorizon desc" "TaktTime" "TaktTime desc" "TaktTimeCalcDate" "TaktTimeCalcDate desc" "TaktTimeDemandStart" "TaktTimeDemandStart desc" "TaktTimeDemandEnd" "TaktTimeDemandEnd desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "CalendarIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ProductionLine
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/ProductionLinePartArray(Contract='{ProductionLinePartArray_Contract}',PartNo='{ProductionLinePartArray_PartNo}',ProductionLine='{ProductionLinePartArray_ProductionLine}')/ProductionLineRef

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
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
ProductionLinePartArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

ProductionLinePartArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

ProductionLinePartArray_ProductionLine
required
string <= 12 characters
Example: It is a Text
key: ProductionLine

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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "Description" "Description desc" "Planner" "Planner desc" "PartType" "PartType desc" "TypeCodeDb" "TypeCodeDb desc" "UnitMeas" "UnitMeas desc" "UnitMeasDescription" "UnitMeasDescription desc" "PartProductCode" "PartProductCode desc" "PartProductFamily" "PartProductFamily desc" "AccountingGroup" "AccountingGroup desc" "ManufacturingLeadtime" "ManufacturingLeadtime desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description" "Planner" "PartType" "TypeCodeDb" "UnitMeas" "UnitMeasDescription" "PartProductCode" "PartProductFamily" "AccountingGroup" "ManufacturingLeadtime"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "UnitMeasRef" "PartProductCodeRef" "PartProductFamilyRef" "AccountingGroupRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ManufStructHeadPartLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/ProductionLinePartArray(Contract='{ProductionLinePartArray_Contract}',PartNo='{ProductionLinePartArray_PartNo}',ProductionLine='{ProductionLinePartArray_ProductionLine}')/PartNoRef

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
Get entities from HorizonIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
ProductionLinePartArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

ProductionLinePartArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

ProductionLinePartArray_ProductionLine
required
string <= 12 characters
Example: It is a Text
key: ProductionLine

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
Items Enum: "HorizonId" "HorizonId desc" "HorizonDescription" "HorizonDescription desc" "PastDueFence" "PastDueFence desc" "FirmHorizon" "FirmHorizon desc" "SchedHorizon" "SchedHorizon desc" "RollFirmSched" "RollFirmSched desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "HorizonId" "HorizonDescription" "PastDueFence" "FirmHorizon" "SchedHorizon" "RollFirmSched"
Specify properties to return, see OData Select

Responses
200 response body for entity array ScheduleHorizon
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/ProductionLinePartArray(Contract='{ProductionLinePartArray_Contract}',PartNo='{ProductionLinePartArray_PartNo}',ProductionLine='{ProductionLinePartArray_ProductionLine}')/HorizonIdRef

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
Get entities from LocationsArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
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
Items Enum: "Contract" "Contract desc" "ProductionLine" "ProductionLine desc" "LocationNo" "LocationNo desc" "LastActivityDate" "LastActivityDate desc" "LocationUsage" "LocationUsage desc" "PerformPutaway" "PerformPutaway desc" "Warehouse" "Warehouse desc" "Bay" "Bay desc" "LocRow" "LocRow desc" "Tier" "Tier desc" "Bin" "Bin desc" "LocationGroup" "LocationGroup desc" "LocationType2" "LocationType2 desc" "LocationType3" "LocationType3 desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "LocationNo" "LastActivityDate" "LocationUsage" "PerformPutaway" "Warehouse" "Bay" "LocRow" "Tier" "Bin" "LocationGroup" "LocationType2" "LocationType3"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ProductionLineRef" "LocationNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ProductionLineLocation
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/LocationsArray

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
Add new entity to LocationsArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type ProductionLineLocation

Contract
required
string <= 5 characters
ProductionLine
required
string <= 12 characters
LocationNo
required
string <= 35 characters
LastActivityDate
required
string <date>
LocationUsage
required
string (LocationUsage_Enumeration)
Enum: "Inbound" "Outbound"
PerformPutaway
required
boolean
Warehouse	
string <= 2000 characters
Bay	
string <= 2000 characters
LocRow	
string <= 2000 characters
Tier	
string <= 2000 characters
Bin	
string <= 2000 characters
LocationGroup	
string <= 2000 characters
LocationType2	
string <= 2000 characters
LocationType3	
string <= 2000 characters
Responses
201 response body for entity type ProductionLineLocation
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/LocationsArray

Request samples
Payload
Content type
application/json

Copy
{
"Contract": "It is a Text",
"ProductionLine": "It is a Text",
"LocationNo": "It is a Text",
"LastActivityDate": "2019-10-10",
"LocationUsage": "Inbound",
"PerformPutaway": true,
"Warehouse": "It is a Text",
"Bay": "It is a Text",
"LocRow": "It is a Text",
"Tier": "It is a Text",
"Bin": "It is a Text",
"LocationGroup": "It is a Text",
"LocationType2": "It is a Text",
"LocationType3": "It is a Text"
}
Response samples
201400403405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objgrants": "It is a Text",
"Contract": "It is a Text",
"ProductionLine": "It is a Text",
"LocationNo": "It is a Text",
"LastActivityDate": "2019-10-10",
"PerformPutaway": true,
"Warehouse": "It is a Text",
"Bay": "It is a Text",
"LocRow": "It is a Text",
"Tier": "It is a Text",
"Bin": "It is a Text",
"LocationGroup": "It is a Text",
"LocationType2": "It is a Text",
"LocationType3": "It is a Text",
"LocationUsage": "Inbound"
}
Get entity from LocationsArray by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
LocationsArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

LocationsArray_ProductionLine
required
string <= 12 characters
Example: It is a Text
key: ProductionLine

LocationsArray_LocationNo
required
string <= 35 characters
Example: It is a Text
key: LocationNo

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "CalendarIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type ProductionLineLocation
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/LocationsArray(Contract='{LocationsArray_Contract}',ProductionLine='{LocationsArray_ProductionLine}',LocationNo='{LocationsArray_LocationNo}')

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
"ProductionLine": "It is a Text",
"LocationNo": "It is a Text",
"LastActivityDate": "2019-10-10",
"PerformPutaway": true,
"Warehouse": "It is a Text",
"Bay": "It is a Text",
"LocRow": "It is a Text",
"Tier": "It is a Text",
"Bin": "It is a Text",
"LocationGroup": "It is a Text",
"LocationType2": "It is a Text",
"LocationType3": "It is a Text",
"LocationUsage": "Inbound"
}
Delete entity from LocationsArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
LocationsArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

LocationsArray_ProductionLine
required
string <= 12 characters
Example: It is a Text
key: ProductionLine

LocationsArray_LocationNo
required
string <= 35 characters
Example: It is a Text
key: LocationNo

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
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/LocationsArray(Contract='{LocationsArray_Contract}',ProductionLine='{LocationsArray_ProductionLine}',LocationNo='{LocationsArray_LocationNo}')

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
Update entity in LocationsArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
LocationsArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

LocationsArray_ProductionLine
required
string <= 12 characters
Example: It is a Text
key: ProductionLine

LocationsArray_LocationNo
required
string <= 35 characters
Example: It is a Text
key: LocationNo

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type ProductionLineLocation

LocationUsage
required
string (LocationUsage_Enumeration)
Enum: "Inbound" "Outbound"
PerformPutaway
required
boolean
Warehouse	
string <= 2000 characters
Bay	
string <= 2000 characters
LocRow	
string <= 2000 characters
Tier	
string <= 2000 characters
Bin	
string <= 2000 characters
LocationGroup	
string <= 2000 characters
LocationType2	
string <= 2000 characters
LocationType3	
string <= 2000 characters
Responses
200 response body for entity type ProductionLineLocation
201 response body for entity type ProductionLineLocation
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
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/LocationsArray(Contract='{LocationsArray_Contract}',ProductionLine='{LocationsArray_ProductionLine}',LocationNo='{LocationsArray_LocationNo}')

Request samples
Payload
Content type
application/json

Copy
{
"LocationUsage": "Inbound",
"PerformPutaway": true,
"Warehouse": "It is a Text",
"Bay": "It is a Text",
"LocRow": "It is a Text",
"Tier": "It is a Text",
"Bin": "It is a Text",
"LocationGroup": "It is a Text",
"LocationType2": "It is a Text",
"LocationType3": "It is a Text"
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
"ProductionLine": "It is a Text",
"LocationNo": "It is a Text",
"LastActivityDate": "2019-10-10",
"PerformPutaway": true,
"Warehouse": "It is a Text",
"Bay": "It is a Text",
"LocRow": "It is a Text",
"Tier": "It is a Text",
"Bin": "It is a Text",
"LocationGroup": "It is a Text",
"LocationType2": "It is a Text",
"LocationType3": "It is a Text",
"LocationUsage": "Inbound"
}
Get entities from ProductionLineRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
LocationsArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

LocationsArray_ProductionLine
required
string <= 12 characters
Example: It is a Text
key: ProductionLine

LocationsArray_LocationNo
required
string <= 35 characters
Example: It is a Text
key: LocationNo

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
Items Enum: "Contract" "Contract desc" "ProductionLine" "ProductionLine desc" "Description" "Description desc" "CreateDate" "CreateDate desc" "LastActivityDate" "LastActivityDate desc" "ReserveFlag" "ReserveFlag desc" "CalendarId" "CalendarId desc" "DailyOperatingMinutes" "DailyOperatingMinutes desc" "LineSchedLoadMethod" "LineSchedLoadMethod desc" "DefaultSchedulingHorizon" "DefaultSchedulingHorizon desc" "TaktTime" "TaktTime desc" "TaktTimeCalcDate" "TaktTimeCalcDate desc" "TaktTimeDemandStart" "TaktTimeDemandStart desc" "TaktTimeDemandEnd" "TaktTimeDemandEnd desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "CalendarIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ProductionLine
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/LocationsArray(Contract='{LocationsArray_Contract}',ProductionLine='{LocationsArray_ProductionLine}',LocationNo='{LocationsArray_LocationNo}')/ProductionLineRef

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
Get entities from LocationNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
LocationsArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

LocationsArray_ProductionLine
required
string <= 12 characters
Example: It is a Text
key: ProductionLine

LocationsArray_LocationNo
required
string <= 35 characters
Example: It is a Text
key: LocationNo

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
Items Enum: "Contract" "Contract desc" "LocationNo" "LocationNo desc" "Warehouse" "Warehouse desc" "BayNo" "BayNo desc" "RowNo" "RowNo desc" "TierNo" "TierNo desc" "BinNo" "BinNo desc" "LocationName" "LocationName desc" "LocationGroup" "LocationGroup desc" "LocationType" "LocationType desc" "BinWidth" "BinWidth desc" "BinHeight" "BinHeight desc" "BinDepth" "BinDepth desc" "UomForLength" "UomForLength desc" "BinCarryingCapacity" "BinCarryingCapacity desc" "UomForWeight" "UomForWeight desc" "MinTemperature" "MinTemperature desc" "MaxTemperature" "MaxTemperature desc" "UomForTemperature" "UomForTemperature desc" "MinHumidity" "MinHumidity desc" "MaxHumidity" "MaxHumidity desc" "ReceiptsBlocked" "ReceiptsBlocked desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "LocationNo" "Warehouse" "BayNo" "RowNo" "TierNo" "BinNo" "LocationName" "LocationGroup" "LocationType" "BinWidth" "BinHeight" "BinDepth" "UomForLength" "BinCarryingCapacity" "UomForWeight" "MinTemperature" "MaxTemperature" "UomForTemperature" "MinHumidity" "MaxHumidity" "ReceiptsBlocked"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryLocation8
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/LocationsArray(Contract='{LocationsArray_Contract}',ProductionLine='{LocationsArray_ProductionLine}',LocationNo='{LocationsArray_LocationNo}')/LocationNoRef

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
Get entities from KanbanReplenishArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
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
Items Enum: "Objstate" "Objstate desc" "Contract" "Contract desc" "PartNo" "PartNo desc" "SupplyToLocationNo" "SupplyToLocationNo desc" "NumberOfKanbans" "NumberOfKanbans desc" "QtyPerKanban" "QtyPerKanban desc" "ReplenishLotSize" "ReplenishLotSize desc" "QtyReorderPoint" "QtyReorderPoint desc" "NumberOfKanbansNew" "NumberOfKanbansNew desc" "QtyPerKanbanNew" "QtyPerKanbanNew desc" "QtyReorderPointNew" "QtyReorderPointNew desc" "QtyDemand" "QtyDemand desc" "SafetyStockFactor" "SafetyStockFactor desc" "ReplenishLeadtime" "ReplenishLeadtime desc" "ChangeDate" "ChangeDate desc" "RecalcDate" "RecalcDate desc" "CardText" "CardText desc" "NoteText" "NoteText desc" "PictureId" "PictureId desc" "ReplenishSignalType" "ReplenishSignalType desc" "ReplenishSource" "ReplenishSource desc" "SafetyStockCode" "SafetyStockCode desc" "KanbanCalcType" "KanbanCalcType desc" "ReplenishFromLine" "ReplenishFromLine desc" "SupplyToLine" "SupplyToLine desc" "ReplenishFromLocationNo" "ReplenishFromLocationNo desc" "ReplenishFromContract" "ReplenishFromContract desc" "ReplenishFromVendorNo" "ReplenishFromVendorNo desc" "ReplenishFromGroup" "ReplenishFromGroup desc" "KanbanCalcFormula" "KanbanCalcFormula desc" "KanbanDemandSource" "KanbanDemandSource desc" "DemandLastChangeDate" "DemandLastChangeDate desc" "ReplenishLotSizeNew" "ReplenishLotSizeNew desc" "HoldReasonCode" "HoldReasonCode desc" "DockCode" "DockCode desc" "SubDockCode" "SubDockCode desc" "CreatePurchaseOrder" "CreatePurchaseOrder desc" "ReplenishOrder" "ReplenishOrder desc" "PlannerId" "PlannerId desc" "CardsToAddSubtract" "CardsToAddSubtract desc" "NoOfObsoleteCards" "NoOfObsoleteCards desc" "PeakDemand" "PeakDemand desc" "VariationCoefficient" "VariationCoefficient desc" "MaxPosCumDeviation" "MaxPosCumDeviation desc" "HighestQtyOnHand" "HighestQtyOnHand desc" "LowestQtyOnHand" "LowestQtyOnHand desc" "AvgQtyOnHand" "AvgQtyOnHand desc" "SafetyStockUnits" "SafetyStockUnits desc" "QtyPerKanbanChange2" "QtyPerKanbanChange2 desc" "NumberOfKanbansChange2" "NumberOfKanbansChange2 desc" "ReorderPointChange2" "ReorderPointChange2 desc" "LotTransferQuantityChange" "LotTransferQuantityChange desc" "QtyPerKanbanChange3" "QtyPerKanbanChange3 desc" "NumberOfKanbansChange3" "NumberOfKanbansChange3 desc" "ReorderPointChange3" "ReorderPointChange3 desc" "LotTransferQty" "LotTransferQty desc" "DemandSourceDateRangeFrom" "DemandSourceDateRangeFrom desc" "DemandSourceDateRangeTo" "DemandSourceDateRangeTo desc" "Warehouse" "Warehouse desc" "Bay" "Bay desc" "RowNo" "RowNo desc" "Tier" "Tier desc" "Bin" "Bin desc" "UnitMeas" "UnitMeas desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Contract" "PartNo" "SupplyToLocationNo" "NumberOfKanbans" "QtyPerKanban" "ReplenishLotSize" "QtyReorderPoint" "NumberOfKanbansNew" "QtyPerKanbanNew" "QtyReorderPointNew" "QtyDemand" "SafetyStockFactor" "ReplenishLeadtime" "ChangeDate" "RecalcDate" "CardText" "NoteText" "PictureId" "ReplenishSignalType" "ReplenishSource" "SafetyStockCode" "KanbanCalcType" "ReplenishFromLine" "SupplyToLine" "ReplenishFromLocationNo" "ReplenishFromContract" "ReplenishFromVendorNo" "ReplenishFromGroup" "KanbanCalcFormula" "KanbanDemandSource" "DemandLastChangeDate" "ReplenishLotSizeNew" "HoldReasonCode" "DockCode" "SubDockCode" "CreatePurchaseOrder" "ReplenishOrder" "PlannerId" "CardsToAddSubtract" "NoOfObsoleteCards" "PeakDemand" "VariationCoefficient" "MaxPosCumDeviation" "HighestQtyOnHand" "LowestQtyOnHand" "AvgQtyOnHand" "SafetyStockUnits" "QtyPerKanbanChange2" "NumberOfKanbansChange2" "ReorderPointChange2" "LotTransferQuantityChange" "QtyPerKanbanChange3" "NumberOfKanbansChange3" "ReorderPointChange3" "LotTransferQty" "DemandSourceDateRangeFrom" "DemandSourceDateRangeTo" "Warehouse" "Bay" "RowNo" "Tier" "Bin" "UnitMeas"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "InventoryPartRef" "ContractRef" "PlannerIDRef" "SupplyToLocationNoRef" "HoldReasonCodeRef" "ReplenishFromLocationNoRef" "ReplenishFromGroupRef" "ReplenishFromLineRef" "ReplenishFromContractRef" "ReplenishFromVendorNoRef" "SupplyToLineRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array KanbanCircuit
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanReplenishArray

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
Get entity from KanbanReplenishArray by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanReplenishArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanReplenishArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanReplenishArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "CalendarIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type KanbanCircuit
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanReplenishArray(Contract='{KanbanReplenishArray_Contract}',PartNo='{KanbanReplenishArray_PartNo}',SupplyToLocationNo='{KanbanReplenishArray_SupplyToLocationNo}')

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
"SupplyToLocationNo": "It is a Text",
"NumberOfKanbans": 1,
"QtyPerKanban": 1,
"ReplenishLotSize": 1,
"QtyReorderPoint": 1,
"NumberOfKanbansNew": 1,
"QtyPerKanbanNew": 1,
"QtyReorderPointNew": 1,
"QtyDemand": 1,
"SafetyStockFactor": 1,
"ReplenishLeadtime": 1,
"ChangeDate": "2019-10-10",
"RecalcDate": "2019-10-10",
"CardText": "It is a Text",
"NoteText": "It is a Text",
"PictureId": 1,
"ReplenishFromLine": "It is a Text",
"SupplyToLine": "It is a Text",
"ReplenishFromLocationNo": "It is a Text",
"ReplenishFromContract": "It is a Text",
"ReplenishFromVendorNo": "It is a Text",
"ReplenishFromGroup": "It is a Text",
"DemandLastChangeDate": "2019-10-10",
"ReplenishLotSizeNew": 1,
"HoldReasonCode": "It is a Text",
"DockCode": "It is a Text",
"SubDockCode": "It is a Text",
"CreatePurchaseOrder": "It is a Text",
"PlannerId": "It is a Text",
"CardsToAddSubtract": 1,
"NoOfObsoleteCards": 1,
"PeakDemand": 1,
"VariationCoefficient": 1,
"MaxPosCumDeviation": 1,
"HighestQtyOnHand": 1,
"LowestQtyOnHand": 1,
"AvgQtyOnHand": 1,
"SafetyStockUnits": 1,
"QtyPerKanbanChange2": 1,
"NumberOfKanbansChange2": 1,
"ReorderPointChange2": 1,
"LotTransferQuantityChange": 1,
"QtyPerKanbanChange3": 1,
"NumberOfKanbansChange3": 1,
"ReorderPointChange3": 1,
"LotTransferQty": 1,
"DemandSourceDateRangeFrom": "2019-10-10",
"DemandSourceDateRangeTo": "2019-10-10",
"Warehouse": "It is a Text",
"Bay": "It is a Text",
"RowNo": "It is a Text",
"Tier": "It is a Text",
"Bin": "It is a Text",
"UnitMeas": "It is a Text",
"Objstate": "Inactive",
"ReplenishSignalType": "VisualNotElectronic",
"ReplenishSource": "Location",
"SafetyStockCode": "Percentage",
"KanbanCalcType": "NumberOfKanbans",
"KanbanCalcFormula": "BasicADDLTSSLot",
"KanbanDemandSource": "Msmrp",
"ReplenishOrder": "TransportTask"
}
Get entities from InventoryPartRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanReplenishArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanReplenishArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanReplenishArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanReplenishArray(Contract='{KanbanReplenishArray_Contract}',PartNo='{KanbanReplenishArray_PartNo}',SupplyToLocationNo='{KanbanReplenishArray_SupplyToLocationNo}')/InventoryPartRef

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
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanReplenishArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanReplenishArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanReplenishArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanReplenishArray(Contract='{KanbanReplenishArray_Contract}',PartNo='{KanbanReplenishArray_PartNo}',SupplyToLocationNo='{KanbanReplenishArray_SupplyToLocationNo}')/ContractRef

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
Get entities from PlannerIDRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanReplenishArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanReplenishArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanReplenishArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
Items Enum: "BuyerCode" "BuyerCode desc" "BuyerName" "BuyerName desc" "Objstate" "Objstate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "BuyerCode" "BuyerName" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryPartPlannerLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanReplenishArray(Contract='{KanbanReplenishArray_Contract}',PartNo='{KanbanReplenishArray_PartNo}',SupplyToLocationNo='{KanbanReplenishArray_SupplyToLocationNo}')/PlannerIDRef

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
Get entities from SupplyToLocationNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanReplenishArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanReplenishArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanReplenishArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
Items Enum: "Contract" "Contract desc" "LocationNo" "LocationNo desc" "LocationGroup" "LocationGroup desc" "WarehouseId" "WarehouseId desc" "BayId" "BayId desc" "RowId" "RowId desc" "TierId" "TierId desc" "BinId" "BinId desc" "Description" "Description desc" "LocationSequence" "LocationSequence desc" "WidthCapacity" "WidthCapacity desc" "HeightCapacity" "HeightCapacity desc" "DeptCapacity" "DeptCapacity desc" "CarryingCapacity" "CarryingCapacity desc" "MinTemperature" "MinTemperature desc" "MaxTemperature" "MaxTemperature desc" "MinHumidity" "MinHumidity desc" "MaxHumidity" "MaxHumidity desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "LocationNo" "LocationGroup" "WarehouseId" "BayId" "RowId" "TierId" "BinId" "Description" "LocationSequence" "WidthCapacity" "HeightCapacity" "DeptCapacity" "CarryingCapacity" "MinTemperature" "MaxTemperature" "MinHumidity" "MaxHumidity"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryLocation
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanReplenishArray(Contract='{KanbanReplenishArray_Contract}',PartNo='{KanbanReplenishArray_PartNo}',SupplyToLocationNo='{KanbanReplenishArray_SupplyToLocationNo}')/SupplyToLocationNoRef

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
Get entities from HoldReasonCodeRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanReplenishArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanReplenishArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanReplenishArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
Items Enum: "HoldReasonCode" "HoldReasonCode desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "HoldReasonCode" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array CircuitHoldReason
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanReplenishArray(Contract='{KanbanReplenishArray_Contract}',PartNo='{KanbanReplenishArray_PartNo}',SupplyToLocationNo='{KanbanReplenishArray_SupplyToLocationNo}')/HoldReasonCodeRef

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
Get entities from ReplenishFromLocationNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanReplenishArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanReplenishArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanReplenishArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
Items Enum: "Contract" "Contract desc" "LocationNo" "LocationNo desc" "LocationGroup" "LocationGroup desc" "WarehouseId" "WarehouseId desc" "BayId" "BayId desc" "RowId" "RowId desc" "TierId" "TierId desc" "BinId" "BinId desc" "Description" "Description desc" "LocationSequence" "LocationSequence desc" "WidthCapacity" "WidthCapacity desc" "HeightCapacity" "HeightCapacity desc" "DeptCapacity" "DeptCapacity desc" "CarryingCapacity" "CarryingCapacity desc" "MinTemperature" "MinTemperature desc" "MaxTemperature" "MaxTemperature desc" "MinHumidity" "MinHumidity desc" "MaxHumidity" "MaxHumidity desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "LocationNo" "LocationGroup" "WarehouseId" "BayId" "RowId" "TierId" "BinId" "Description" "LocationSequence" "WidthCapacity" "HeightCapacity" "DeptCapacity" "CarryingCapacity" "MinTemperature" "MaxTemperature" "MinHumidity" "MaxHumidity"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryLocation
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanReplenishArray(Contract='{KanbanReplenishArray_Contract}',PartNo='{KanbanReplenishArray_PartNo}',SupplyToLocationNo='{KanbanReplenishArray_SupplyToLocationNo}')/ReplenishFromLocationNoRef

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
Get entities from ReplenishFromGroupRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanReplenishArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanReplenishArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanReplenishArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
Items Enum: "LocationGroup" "LocationGroup desc" "Description" "Description desc" "InventoryLocationType" "InventoryLocationType desc" "TrolleyType" "TrolleyType desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "LocationGroup" "Description" "InventoryLocationType" "TrolleyType"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryLocationGroup
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanReplenishArray(Contract='{KanbanReplenishArray_Contract}',PartNo='{KanbanReplenishArray_PartNo}',SupplyToLocationNo='{KanbanReplenishArray_SupplyToLocationNo}')/ReplenishFromGroupRef

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
Get entities from ReplenishFromLineRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanReplenishArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanReplenishArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanReplenishArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
Items Enum: "Contract" "Contract desc" "ProductionLine" "ProductionLine desc" "Description" "Description desc" "CreateDate" "CreateDate desc" "LastActivityDate" "LastActivityDate desc" "ReserveFlag" "ReserveFlag desc" "CalendarId" "CalendarId desc" "DailyOperatingMinutes" "DailyOperatingMinutes desc" "LineSchedLoadMethod" "LineSchedLoadMethod desc" "DefaultSchedulingHorizon" "DefaultSchedulingHorizon desc" "TaktTime" "TaktTime desc" "TaktTimeCalcDate" "TaktTimeCalcDate desc" "TaktTimeDemandStart" "TaktTimeDemandStart desc" "TaktTimeDemandEnd" "TaktTimeDemandEnd desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "CalendarIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ProductionLine
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanReplenishArray(Contract='{KanbanReplenishArray_Contract}',PartNo='{KanbanReplenishArray_PartNo}',SupplyToLocationNo='{KanbanReplenishArray_SupplyToLocationNo}')/ReplenishFromLineRef

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
Get entities from ReplenishFromContractRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanReplenishArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanReplenishArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanReplenishArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanReplenishArray(Contract='{KanbanReplenishArray_Contract}',PartNo='{KanbanReplenishArray_PartNo}',SupplyToLocationNo='{KanbanReplenishArray_SupplyToLocationNo}')/ReplenishFromContractRef

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
Get entities from ReplenishFromVendorNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanReplenishArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanReplenishArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanReplenishArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
Items Enum: "VendorNo" "VendorNo desc" "VendorName" "VendorName desc" "BuyerCode" "BuyerCode desc" "CurrencyCode" "CurrencyCode desc" "SuppGrp" "SuppGrp desc" "AdditionalCostAmount" "AdditionalCostAmount desc" "Contact" "Contact desc" "CrCheck" "CrCheck desc" "CrDate" "CrDate desc" "CrNoteText" "CrNoteText desc" "DateDel" "DateDel desc" "Discount" "Discount desc" "NoteText" "NoteText desc" "OurCustomerNo" "OurCustomerNo desc" "PackListFlag" "PackListFlag desc" "PurchOrderFlag" "PurchOrderFlag desc" "QcApproval" "QcApproval desc" "QcDate" "QcDate desc" "QcAudit" "QcAudit desc" "QcNoteText" "QcNoteText desc" "OrdConfRemInterval" "OrdConfRemInterval desc" "DeliveryRemInterval" "DeliveryRemInterval desc" "DaysBeforeDelivery" "DaysBeforeDelivery desc" "DaysBeforeArrival" "DaysBeforeArrival desc" "OrdConfReminder" "OrdConfReminder desc" "DeliveryReminder" "DeliveryReminder desc" "Category" "Category desc" "AcquisitionSite" "AcquisitionSite desc" "Company" "Company desc" "PayTermId" "PayTermId desc" "EdiAutoApprovalUser" "EdiAutoApprovalUser desc" "QcType" "QcType desc" "EnvironmentDate" "EnvironmentDate desc" "EnvironmentType" "EnvironmentType desc" "EnvironmentalApproval" "EnvironmentalApproval desc" "EnvironmentAudit" "EnvironmentAudit desc" "EnvironmentNoteText" "EnvironmentNoteText desc" "CocApproval" "CocApproval desc" "CocDate" "CocDate desc" "CocType" "CocType desc" "CocAudit" "CocAudit desc" "CocNoteText" "CocNoteText desc" "CustomerNo" "CustomerNo desc" "NoteId" "NoteId desc" "SupplierTemplateDesc" "SupplierTemplateDesc desc" "TemplateSupplier" "TemplateSupplier desc" "QuickRegisteredSupplier" "QuickRegisteredSupplier desc" "BlanketDate" "BlanketDate desc" "ExpressOrderAllowed" "ExpressOrderAllowed desc" "EdiPriCatAppUser" "EdiPriCatAppUser desc" "PricatAutomaticApproval" "PricatAutomaticApproval desc" "AutomaticReplChange" "AutomaticReplChange desc" "SendChangeMessage" "SendChangeMessage desc" "ReceiptRefReminder" "ReceiptRefReminder desc" "PrintAmountsInclTax" "PrintAmountsInclTax desc" "ClosingDay" "ClosingDay desc" "EndOfMonth" "EndOfMonth desc" "ReceivingAdviceType" "ReceivingAdviceType desc" "RecAdvSelfBilling" "RecAdvSelfBilling desc" "ClassificationStandard" "ClassificationStandard desc" "PurchaseCode" "PurchaseCode desc" "PoChangeManagement" "PoChangeManagement desc" "CreateConfirmationChgOrd" "CreateConfirmationChgOrd desc" "EmailPurchaseOrder" "EmailPurchaseOrder desc" "VendorCategoryDb" "VendorCategoryDb desc" "DirDelApproval" "DirDelApproval desc" "OrderConfApproval" "OrderConfApproval desc" "OrderConfDiffApproval" "OrderConfDiffApproval desc" "AdhocPurRqstApproval" "AdhocPurRqstApproval desc" "TaxLiability" "TaxLiability desc" "B2bConfOrderWithDiff" "B2bConfOrderWithDiff desc" "QualitySystemLevelId" "QualitySystemLevelId desc" "QualityAuditId" "QualityAuditId desc" "EnvironmentAuditId" "EnvironmentAuditId desc" "CocAuditId" "CocAuditId desc" "RecAdvSbConsignment" "RecAdvSbConsignment desc" "RecAdvSbMixOwnership" "RecAdvSbMixOwnership desc" "CCommId" "CCommId desc" "COutputMedia" "COutputMedia desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "VendorNo" "VendorName" "BuyerCode" "CurrencyCode" "SuppGrp" "AdditionalCostAmount" "Contact" "CrCheck" "CrDate" "CrNoteText" "DateDel" "Discount" "NoteText" "OurCustomerNo" "PackListFlag" "PurchOrderFlag" "QcApproval" "QcDate" "QcAudit" "QcNoteText" "OrdConfRemInterval" "DeliveryRemInterval" "DaysBeforeDelivery" "DaysBeforeArrival" "OrdConfReminder" "DeliveryReminder" "Category" "AcquisitionSite" "Company" "PayTermId" "EdiAutoApprovalUser" "QcType" "EnvironmentDate" "EnvironmentType" "EnvironmentalApproval" "EnvironmentAudit" "EnvironmentNoteText" "CocApproval" "CocDate" "CocType" "CocAudit" "CocNoteText" "CustomerNo" "NoteId" "SupplierTemplateDesc" "TemplateSupplier" "QuickRegisteredSupplier" "BlanketDate" "ExpressOrderAllowed" "EdiPriCatAppUser" "PricatAutomaticApproval" "AutomaticReplChange" "SendChangeMessage" "ReceiptRefReminder" "PrintAmountsInclTax" "ClosingDay" "EndOfMonth" "ReceivingAdviceType" "RecAdvSelfBilling" "ClassificationStandard" "PurchaseCode" "PoChangeManagement" "CreateConfirmationChgOrd" "EmailPurchaseOrder" "VendorCategoryDb" "DirDelApproval" "OrderConfApproval" "OrderConfDiffApproval" "AdhocPurRqstApproval" "TaxLiability" "B2bConfOrderWithDiff" "QualitySystemLevelId" "QualityAuditId" "EnvironmentAuditId" "CocAuditId" "RecAdvSbConsignment" "RecAdvSbMixOwnership" "CCommId" "COutputMedia"
Specify properties to return, see OData Select

Responses
200 response body for entity array Supplier
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanReplenishArray(Contract='{KanbanReplenishArray_Contract}',PartNo='{KanbanReplenishArray_PartNo}',SupplyToLocationNo='{KanbanReplenishArray_SupplyToLocationNo}')/ReplenishFromVendorNoRef

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
Get entities from SupplyToLineRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanReplenishArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanReplenishArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanReplenishArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
Items Enum: "Contract" "Contract desc" "ProductionLine" "ProductionLine desc" "Description" "Description desc" "CreateDate" "CreateDate desc" "LastActivityDate" "LastActivityDate desc" "ReserveFlag" "ReserveFlag desc" "CalendarId" "CalendarId desc" "DailyOperatingMinutes" "DailyOperatingMinutes desc" "LineSchedLoadMethod" "LineSchedLoadMethod desc" "DefaultSchedulingHorizon" "DefaultSchedulingHorizon desc" "TaktTime" "TaktTime desc" "TaktTimeCalcDate" "TaktTimeCalcDate desc" "TaktTimeDemandStart" "TaktTimeDemandStart desc" "TaktTimeDemandEnd" "TaktTimeDemandEnd desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "CalendarIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ProductionLine
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanReplenishArray(Contract='{KanbanReplenishArray_Contract}',PartNo='{KanbanReplenishArray_PartNo}',SupplyToLocationNo='{KanbanReplenishArray_SupplyToLocationNo}')/SupplyToLineRef

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
Get entities from KanbanSupplyArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
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
Items Enum: "Objstate" "Objstate desc" "Contract" "Contract desc" "PartNo" "PartNo desc" "SupplyToLocationNo" "SupplyToLocationNo desc" "NumberOfKanbans" "NumberOfKanbans desc" "QtyPerKanban" "QtyPerKanban desc" "ReplenishLotSize" "ReplenishLotSize desc" "QtyReorderPoint" "QtyReorderPoint desc" "NumberOfKanbansNew" "NumberOfKanbansNew desc" "QtyPerKanbanNew" "QtyPerKanbanNew desc" "QtyReorderPointNew" "QtyReorderPointNew desc" "QtyDemand" "QtyDemand desc" "SafetyStockFactor" "SafetyStockFactor desc" "ReplenishLeadtime" "ReplenishLeadtime desc" "ChangeDate" "ChangeDate desc" "RecalcDate" "RecalcDate desc" "CardText" "CardText desc" "NoteText" "NoteText desc" "PictureId" "PictureId desc" "ReplenishSignalType" "ReplenishSignalType desc" "ReplenishSource" "ReplenishSource desc" "SafetyStockCode" "SafetyStockCode desc" "KanbanCalcType" "KanbanCalcType desc" "ReplenishFromLine" "ReplenishFromLine desc" "SupplyToLine" "SupplyToLine desc" "ReplenishFromLocationNo" "ReplenishFromLocationNo desc" "ReplenishFromContract" "ReplenishFromContract desc" "ReplenishFromVendorNo" "ReplenishFromVendorNo desc" "ReplenishFromGroup" "ReplenishFromGroup desc" "KanbanCalcFormula" "KanbanCalcFormula desc" "KanbanDemandSource" "KanbanDemandSource desc" "DemandLastChangeDate" "DemandLastChangeDate desc" "ReplenishLotSizeNew" "ReplenishLotSizeNew desc" "HoldReasonCode" "HoldReasonCode desc" "DockCode" "DockCode desc" "SubDockCode" "SubDockCode desc" "CreatePurchaseOrder" "CreatePurchaseOrder desc" "ReplenishOrder" "ReplenishOrder desc" "PlannerId" "PlannerId desc" "CardsToAddSubtract" "CardsToAddSubtract desc" "NoOfObsoleteCards" "NoOfObsoleteCards desc" "PeakDemand" "PeakDemand desc" "VariationCoefficient" "VariationCoefficient desc" "MaxPosCumDeviation" "MaxPosCumDeviation desc" "HighestQtyOnHand" "HighestQtyOnHand desc" "LowestQtyOnHand" "LowestQtyOnHand desc" "AvgQtyOnHand" "AvgQtyOnHand desc" "SafetyStockUnits" "SafetyStockUnits desc" "QtyPerKanbanChange2" "QtyPerKanbanChange2 desc" "NumberOfKanbansChange2" "NumberOfKanbansChange2 desc" "ReorderPointChange2" "ReorderPointChange2 desc" "LotTransferQuantityChange" "LotTransferQuantityChange desc" "QtyPerKanbanChange3" "QtyPerKanbanChange3 desc" "NumberOfKanbansChange3" "NumberOfKanbansChange3 desc" "ReorderPointChange3" "ReorderPointChange3 desc" "LotTransferQty" "LotTransferQty desc" "DemandSourceDateRangeFrom" "DemandSourceDateRangeFrom desc" "DemandSourceDateRangeTo" "DemandSourceDateRangeTo desc" "Warehouse" "Warehouse desc" "Bay" "Bay desc" "RowNo" "RowNo desc" "Tier" "Tier desc" "Bin" "Bin desc" "UnitMeas" "UnitMeas desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Contract" "PartNo" "SupplyToLocationNo" "NumberOfKanbans" "QtyPerKanban" "ReplenishLotSize" "QtyReorderPoint" "NumberOfKanbansNew" "QtyPerKanbanNew" "QtyReorderPointNew" "QtyDemand" "SafetyStockFactor" "ReplenishLeadtime" "ChangeDate" "RecalcDate" "CardText" "NoteText" "PictureId" "ReplenishSignalType" "ReplenishSource" "SafetyStockCode" "KanbanCalcType" "ReplenishFromLine" "SupplyToLine" "ReplenishFromLocationNo" "ReplenishFromContract" "ReplenishFromVendorNo" "ReplenishFromGroup" "KanbanCalcFormula" "KanbanDemandSource" "DemandLastChangeDate" "ReplenishLotSizeNew" "HoldReasonCode" "DockCode" "SubDockCode" "CreatePurchaseOrder" "ReplenishOrder" "PlannerId" "CardsToAddSubtract" "NoOfObsoleteCards" "PeakDemand" "VariationCoefficient" "MaxPosCumDeviation" "HighestQtyOnHand" "LowestQtyOnHand" "AvgQtyOnHand" "SafetyStockUnits" "QtyPerKanbanChange2" "NumberOfKanbansChange2" "ReorderPointChange2" "LotTransferQuantityChange" "QtyPerKanbanChange3" "NumberOfKanbansChange3" "ReorderPointChange3" "LotTransferQty" "DemandSourceDateRangeFrom" "DemandSourceDateRangeTo" "Warehouse" "Bay" "RowNo" "Tier" "Bin" "UnitMeas"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "InventoryPartRef" "ContractRef" "PlannerIDRef" "SupplyToLocationNoRef" "HoldReasonCodeRef" "ReplenishFromLocationNoRef" "ReplenishFromGroupRef" "ReplenishFromLineRef" "ReplenishFromContractRef" "ReplenishFromVendorNoRef" "SupplyToLineRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array KanbanCircuit
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanSupplyArray

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
Get entity from KanbanSupplyArray by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanSupplyArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanSupplyArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanSupplyArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "CalendarIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type KanbanCircuit
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanSupplyArray(Contract='{KanbanSupplyArray_Contract}',PartNo='{KanbanSupplyArray_PartNo}',SupplyToLocationNo='{KanbanSupplyArray_SupplyToLocationNo}')

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
"SupplyToLocationNo": "It is a Text",
"NumberOfKanbans": 1,
"QtyPerKanban": 1,
"ReplenishLotSize": 1,
"QtyReorderPoint": 1,
"NumberOfKanbansNew": 1,
"QtyPerKanbanNew": 1,
"QtyReorderPointNew": 1,
"QtyDemand": 1,
"SafetyStockFactor": 1,
"ReplenishLeadtime": 1,
"ChangeDate": "2019-10-10",
"RecalcDate": "2019-10-10",
"CardText": "It is a Text",
"NoteText": "It is a Text",
"PictureId": 1,
"ReplenishFromLine": "It is a Text",
"SupplyToLine": "It is a Text",
"ReplenishFromLocationNo": "It is a Text",
"ReplenishFromContract": "It is a Text",
"ReplenishFromVendorNo": "It is a Text",
"ReplenishFromGroup": "It is a Text",
"DemandLastChangeDate": "2019-10-10",
"ReplenishLotSizeNew": 1,
"HoldReasonCode": "It is a Text",
"DockCode": "It is a Text",
"SubDockCode": "It is a Text",
"CreatePurchaseOrder": "It is a Text",
"PlannerId": "It is a Text",
"CardsToAddSubtract": 1,
"NoOfObsoleteCards": 1,
"PeakDemand": 1,
"VariationCoefficient": 1,
"MaxPosCumDeviation": 1,
"HighestQtyOnHand": 1,
"LowestQtyOnHand": 1,
"AvgQtyOnHand": 1,
"SafetyStockUnits": 1,
"QtyPerKanbanChange2": 1,
"NumberOfKanbansChange2": 1,
"ReorderPointChange2": 1,
"LotTransferQuantityChange": 1,
"QtyPerKanbanChange3": 1,
"NumberOfKanbansChange3": 1,
"ReorderPointChange3": 1,
"LotTransferQty": 1,
"DemandSourceDateRangeFrom": "2019-10-10",
"DemandSourceDateRangeTo": "2019-10-10",
"Warehouse": "It is a Text",
"Bay": "It is a Text",
"RowNo": "It is a Text",
"Tier": "It is a Text",
"Bin": "It is a Text",
"UnitMeas": "It is a Text",
"Objstate": "Inactive",
"ReplenishSignalType": "VisualNotElectronic",
"ReplenishSource": "Location",
"SafetyStockCode": "Percentage",
"KanbanCalcType": "NumberOfKanbans",
"KanbanCalcFormula": "BasicADDLTSSLot",
"KanbanDemandSource": "Msmrp",
"ReplenishOrder": "TransportTask"
}
Get entities from InventoryPartRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanSupplyArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanSupplyArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanSupplyArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanSupplyArray(Contract='{KanbanSupplyArray_Contract}',PartNo='{KanbanSupplyArray_PartNo}',SupplyToLocationNo='{KanbanSupplyArray_SupplyToLocationNo}')/InventoryPartRef

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
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanSupplyArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanSupplyArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanSupplyArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanSupplyArray(Contract='{KanbanSupplyArray_Contract}',PartNo='{KanbanSupplyArray_PartNo}',SupplyToLocationNo='{KanbanSupplyArray_SupplyToLocationNo}')/ContractRef

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
Get entities from PlannerIDRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanSupplyArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanSupplyArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanSupplyArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
Items Enum: "BuyerCode" "BuyerCode desc" "BuyerName" "BuyerName desc" "Objstate" "Objstate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "BuyerCode" "BuyerName" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryPartPlannerLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanSupplyArray(Contract='{KanbanSupplyArray_Contract}',PartNo='{KanbanSupplyArray_PartNo}',SupplyToLocationNo='{KanbanSupplyArray_SupplyToLocationNo}')/PlannerIDRef

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
Get entities from SupplyToLocationNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanSupplyArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanSupplyArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanSupplyArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
Items Enum: "Contract" "Contract desc" "LocationNo" "LocationNo desc" "LocationGroup" "LocationGroup desc" "WarehouseId" "WarehouseId desc" "BayId" "BayId desc" "RowId" "RowId desc" "TierId" "TierId desc" "BinId" "BinId desc" "Description" "Description desc" "LocationSequence" "LocationSequence desc" "WidthCapacity" "WidthCapacity desc" "HeightCapacity" "HeightCapacity desc" "DeptCapacity" "DeptCapacity desc" "CarryingCapacity" "CarryingCapacity desc" "MinTemperature" "MinTemperature desc" "MaxTemperature" "MaxTemperature desc" "MinHumidity" "MinHumidity desc" "MaxHumidity" "MaxHumidity desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "LocationNo" "LocationGroup" "WarehouseId" "BayId" "RowId" "TierId" "BinId" "Description" "LocationSequence" "WidthCapacity" "HeightCapacity" "DeptCapacity" "CarryingCapacity" "MinTemperature" "MaxTemperature" "MinHumidity" "MaxHumidity"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryLocation
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanSupplyArray(Contract='{KanbanSupplyArray_Contract}',PartNo='{KanbanSupplyArray_PartNo}',SupplyToLocationNo='{KanbanSupplyArray_SupplyToLocationNo}')/SupplyToLocationNoRef

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
Get entities from HoldReasonCodeRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanSupplyArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanSupplyArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanSupplyArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
Items Enum: "HoldReasonCode" "HoldReasonCode desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "HoldReasonCode" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array CircuitHoldReason
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanSupplyArray(Contract='{KanbanSupplyArray_Contract}',PartNo='{KanbanSupplyArray_PartNo}',SupplyToLocationNo='{KanbanSupplyArray_SupplyToLocationNo}')/HoldReasonCodeRef

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
Get entities from ReplenishFromLocationNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanSupplyArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanSupplyArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanSupplyArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
Items Enum: "Contract" "Contract desc" "LocationNo" "LocationNo desc" "LocationGroup" "LocationGroup desc" "WarehouseId" "WarehouseId desc" "BayId" "BayId desc" "RowId" "RowId desc" "TierId" "TierId desc" "BinId" "BinId desc" "Description" "Description desc" "LocationSequence" "LocationSequence desc" "WidthCapacity" "WidthCapacity desc" "HeightCapacity" "HeightCapacity desc" "DeptCapacity" "DeptCapacity desc" "CarryingCapacity" "CarryingCapacity desc" "MinTemperature" "MinTemperature desc" "MaxTemperature" "MaxTemperature desc" "MinHumidity" "MinHumidity desc" "MaxHumidity" "MaxHumidity desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "LocationNo" "LocationGroup" "WarehouseId" "BayId" "RowId" "TierId" "BinId" "Description" "LocationSequence" "WidthCapacity" "HeightCapacity" "DeptCapacity" "CarryingCapacity" "MinTemperature" "MaxTemperature" "MinHumidity" "MaxHumidity"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryLocation
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanSupplyArray(Contract='{KanbanSupplyArray_Contract}',PartNo='{KanbanSupplyArray_PartNo}',SupplyToLocationNo='{KanbanSupplyArray_SupplyToLocationNo}')/ReplenishFromLocationNoRef

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
Get entities from ReplenishFromGroupRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanSupplyArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanSupplyArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanSupplyArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
Items Enum: "LocationGroup" "LocationGroup desc" "Description" "Description desc" "InventoryLocationType" "InventoryLocationType desc" "TrolleyType" "TrolleyType desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "LocationGroup" "Description" "InventoryLocationType" "TrolleyType"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryLocationGroup
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanSupplyArray(Contract='{KanbanSupplyArray_Contract}',PartNo='{KanbanSupplyArray_PartNo}',SupplyToLocationNo='{KanbanSupplyArray_SupplyToLocationNo}')/ReplenishFromGroupRef

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
Get entities from ReplenishFromLineRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanSupplyArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanSupplyArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanSupplyArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
Items Enum: "Contract" "Contract desc" "ProductionLine" "ProductionLine desc" "Description" "Description desc" "CreateDate" "CreateDate desc" "LastActivityDate" "LastActivityDate desc" "ReserveFlag" "ReserveFlag desc" "CalendarId" "CalendarId desc" "DailyOperatingMinutes" "DailyOperatingMinutes desc" "LineSchedLoadMethod" "LineSchedLoadMethod desc" "DefaultSchedulingHorizon" "DefaultSchedulingHorizon desc" "TaktTime" "TaktTime desc" "TaktTimeCalcDate" "TaktTimeCalcDate desc" "TaktTimeDemandStart" "TaktTimeDemandStart desc" "TaktTimeDemandEnd" "TaktTimeDemandEnd desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "CalendarIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ProductionLine
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanSupplyArray(Contract='{KanbanSupplyArray_Contract}',PartNo='{KanbanSupplyArray_PartNo}',SupplyToLocationNo='{KanbanSupplyArray_SupplyToLocationNo}')/ReplenishFromLineRef

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
Get entities from ReplenishFromContractRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanSupplyArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanSupplyArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanSupplyArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanSupplyArray(Contract='{KanbanSupplyArray_Contract}',PartNo='{KanbanSupplyArray_PartNo}',SupplyToLocationNo='{KanbanSupplyArray_SupplyToLocationNo}')/ReplenishFromContractRef

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
Get entities from ReplenishFromVendorNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanSupplyArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanSupplyArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanSupplyArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
Items Enum: "VendorNo" "VendorNo desc" "VendorName" "VendorName desc" "BuyerCode" "BuyerCode desc" "CurrencyCode" "CurrencyCode desc" "SuppGrp" "SuppGrp desc" "AdditionalCostAmount" "AdditionalCostAmount desc" "Contact" "Contact desc" "CrCheck" "CrCheck desc" "CrDate" "CrDate desc" "CrNoteText" "CrNoteText desc" "DateDel" "DateDel desc" "Discount" "Discount desc" "NoteText" "NoteText desc" "OurCustomerNo" "OurCustomerNo desc" "PackListFlag" "PackListFlag desc" "PurchOrderFlag" "PurchOrderFlag desc" "QcApproval" "QcApproval desc" "QcDate" "QcDate desc" "QcAudit" "QcAudit desc" "QcNoteText" "QcNoteText desc" "OrdConfRemInterval" "OrdConfRemInterval desc" "DeliveryRemInterval" "DeliveryRemInterval desc" "DaysBeforeDelivery" "DaysBeforeDelivery desc" "DaysBeforeArrival" "DaysBeforeArrival desc" "OrdConfReminder" "OrdConfReminder desc" "DeliveryReminder" "DeliveryReminder desc" "Category" "Category desc" "AcquisitionSite" "AcquisitionSite desc" "Company" "Company desc" "PayTermId" "PayTermId desc" "EdiAutoApprovalUser" "EdiAutoApprovalUser desc" "QcType" "QcType desc" "EnvironmentDate" "EnvironmentDate desc" "EnvironmentType" "EnvironmentType desc" "EnvironmentalApproval" "EnvironmentalApproval desc" "EnvironmentAudit" "EnvironmentAudit desc" "EnvironmentNoteText" "EnvironmentNoteText desc" "CocApproval" "CocApproval desc" "CocDate" "CocDate desc" "CocType" "CocType desc" "CocAudit" "CocAudit desc" "CocNoteText" "CocNoteText desc" "CustomerNo" "CustomerNo desc" "NoteId" "NoteId desc" "SupplierTemplateDesc" "SupplierTemplateDesc desc" "TemplateSupplier" "TemplateSupplier desc" "QuickRegisteredSupplier" "QuickRegisteredSupplier desc" "BlanketDate" "BlanketDate desc" "ExpressOrderAllowed" "ExpressOrderAllowed desc" "EdiPriCatAppUser" "EdiPriCatAppUser desc" "PricatAutomaticApproval" "PricatAutomaticApproval desc" "AutomaticReplChange" "AutomaticReplChange desc" "SendChangeMessage" "SendChangeMessage desc" "ReceiptRefReminder" "ReceiptRefReminder desc" "PrintAmountsInclTax" "PrintAmountsInclTax desc" "ClosingDay" "ClosingDay desc" "EndOfMonth" "EndOfMonth desc" "ReceivingAdviceType" "ReceivingAdviceType desc" "RecAdvSelfBilling" "RecAdvSelfBilling desc" "ClassificationStandard" "ClassificationStandard desc" "PurchaseCode" "PurchaseCode desc" "PoChangeManagement" "PoChangeManagement desc" "CreateConfirmationChgOrd" "CreateConfirmationChgOrd desc" "EmailPurchaseOrder" "EmailPurchaseOrder desc" "VendorCategoryDb" "VendorCategoryDb desc" "DirDelApproval" "DirDelApproval desc" "OrderConfApproval" "OrderConfApproval desc" "OrderConfDiffApproval" "OrderConfDiffApproval desc" "AdhocPurRqstApproval" "AdhocPurRqstApproval desc" "TaxLiability" "TaxLiability desc" "B2bConfOrderWithDiff" "B2bConfOrderWithDiff desc" "QualitySystemLevelId" "QualitySystemLevelId desc" "QualityAuditId" "QualityAuditId desc" "EnvironmentAuditId" "EnvironmentAuditId desc" "CocAuditId" "CocAuditId desc" "RecAdvSbConsignment" "RecAdvSbConsignment desc" "RecAdvSbMixOwnership" "RecAdvSbMixOwnership desc" "CCommId" "CCommId desc" "COutputMedia" "COutputMedia desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "VendorNo" "VendorName" "BuyerCode" "CurrencyCode" "SuppGrp" "AdditionalCostAmount" "Contact" "CrCheck" "CrDate" "CrNoteText" "DateDel" "Discount" "NoteText" "OurCustomerNo" "PackListFlag" "PurchOrderFlag" "QcApproval" "QcDate" "QcAudit" "QcNoteText" "OrdConfRemInterval" "DeliveryRemInterval" "DaysBeforeDelivery" "DaysBeforeArrival" "OrdConfReminder" "DeliveryReminder" "Category" "AcquisitionSite" "Company" "PayTermId" "EdiAutoApprovalUser" "QcType" "EnvironmentDate" "EnvironmentType" "EnvironmentalApproval" "EnvironmentAudit" "EnvironmentNoteText" "CocApproval" "CocDate" "CocType" "CocAudit" "CocNoteText" "CustomerNo" "NoteId" "SupplierTemplateDesc" "TemplateSupplier" "QuickRegisteredSupplier" "BlanketDate" "ExpressOrderAllowed" "EdiPriCatAppUser" "PricatAutomaticApproval" "AutomaticReplChange" "SendChangeMessage" "ReceiptRefReminder" "PrintAmountsInclTax" "ClosingDay" "EndOfMonth" "ReceivingAdviceType" "RecAdvSelfBilling" "ClassificationStandard" "PurchaseCode" "PoChangeManagement" "CreateConfirmationChgOrd" "EmailPurchaseOrder" "VendorCategoryDb" "DirDelApproval" "OrderConfApproval" "OrderConfDiffApproval" "AdhocPurRqstApproval" "TaxLiability" "B2bConfOrderWithDiff" "QualitySystemLevelId" "QualityAuditId" "EnvironmentAuditId" "CocAuditId" "RecAdvSbConsignment" "RecAdvSbMixOwnership" "CCommId" "COutputMedia"
Specify properties to return, see OData Select

Responses
200 response body for entity array Supplier
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanSupplyArray(Contract='{KanbanSupplyArray_Contract}',PartNo='{KanbanSupplyArray_PartNo}',SupplyToLocationNo='{KanbanSupplyArray_SupplyToLocationNo}')/ReplenishFromVendorNoRef

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
Get entities from SupplyToLineRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
KanbanSupplyArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

KanbanSupplyArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

KanbanSupplyArray_SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
key: SupplyToLocationNo

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
Items Enum: "Contract" "Contract desc" "ProductionLine" "ProductionLine desc" "Description" "Description desc" "CreateDate" "CreateDate desc" "LastActivityDate" "LastActivityDate desc" "ReserveFlag" "ReserveFlag desc" "CalendarId" "CalendarId desc" "DailyOperatingMinutes" "DailyOperatingMinutes desc" "LineSchedLoadMethod" "LineSchedLoadMethod desc" "DefaultSchedulingHorizon" "DefaultSchedulingHorizon desc" "TaktTime" "TaktTime desc" "TaktTimeCalcDate" "TaktTimeCalcDate desc" "TaktTimeDemandStart" "TaktTimeDemandStart desc" "TaktTimeDemandEnd" "TaktTimeDemandEnd desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "CalendarIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ProductionLine
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/KanbanSupplyArray(Contract='{KanbanSupplyArray_Contract}',PartNo='{KanbanSupplyArray_PartNo}',SupplyToLocationNo='{KanbanSupplyArray_SupplyToLocationNo}')/SupplyToLineRef

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
Get entities from ProductionLineRepPointArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
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
Items Enum: "Contract" "Contract desc" "ProductionLine" "ProductionLine desc" "ReportPointId" "ReportPointId desc" "Description" "Description desc" "LastOperationNo" "LastOperationNo desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "ReportPointId" "Description" "LastOperationNo"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "ProductionLineRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ProductionLineRepPoint
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/ProductionLineRepPointArray

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
Add new entity to ProductionLineRepPointArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type ProductionLineRepPoint

Contract
required
string <= 5 characters
ProductionLine
required
string <= 12 characters
ReportPointId
required
string <= 10 characters
Description
required
string <= 35 characters
LastOperationNo
required
number
Responses
201 response body for entity type ProductionLineRepPoint
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/ProductionLineRepPointArray

Request samples
Payload
Content type
application/json

Copy
{
"Contract": "It is a Text",
"ProductionLine": "It is a Text",
"ReportPointId": "It is a Text",
"Description": "It is a Text",
"LastOperationNo": 1
}
Response samples
201400403405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objgrants": "It is a Text",
"Contract": "It is a Text",
"ProductionLine": "It is a Text",
"ReportPointId": "It is a Text",
"Description": "It is a Text",
"LastOperationNo": 1
}
Get entity from ProductionLineRepPointArray by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
ProductionLineRepPointArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

ProductionLineRepPointArray_ProductionLine
required
string <= 12 characters
Example: It is a Text
key: ProductionLine

ProductionLineRepPointArray_ReportPointId
required
string <= 10 characters
Example: It is a Text
key: ReportPointId

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "CalendarIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type ProductionLineRepPoint
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/ProductionLineRepPointArray(Contract='{ProductionLineRepPointArray_Contract}',ProductionLine='{ProductionLineRepPointArray_ProductionLine}',ReportPointId='{ProductionLineRepPointArray_ReportPointId}')

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
"ProductionLine": "It is a Text",
"ReportPointId": "It is a Text",
"Description": "It is a Text",
"LastOperationNo": 1
}
Delete entity from ProductionLineRepPointArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
ProductionLineRepPointArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

ProductionLineRepPointArray_ProductionLine
required
string <= 12 characters
Example: It is a Text
key: ProductionLine

ProductionLineRepPointArray_ReportPointId
required
string <= 10 characters
Example: It is a Text
key: ReportPointId

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
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/ProductionLineRepPointArray(Contract='{ProductionLineRepPointArray_Contract}',ProductionLine='{ProductionLineRepPointArray_ProductionLine}',ReportPointId='{ProductionLineRepPointArray_ReportPointId}')

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
Update entity in ProductionLineRepPointArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
ProductionLineRepPointArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

ProductionLineRepPointArray_ProductionLine
required
string <= 12 characters
Example: It is a Text
key: ProductionLine

ProductionLineRepPointArray_ReportPointId
required
string <= 10 characters
Example: It is a Text
key: ReportPointId

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type ProductionLineRepPoint

Description
required
string <= 35 characters
Responses
200 response body for entity type ProductionLineRepPoint
201 response body for entity type ProductionLineRepPoint
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
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/ProductionLineRepPointArray(Contract='{ProductionLineRepPointArray_Contract}',ProductionLine='{ProductionLineRepPointArray_ProductionLine}',ReportPointId='{ProductionLineRepPointArray_ReportPointId}')

Request samples
Payload
Content type
application/json

Copy
{
"Description": "It is a Text"
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
"ProductionLine": "It is a Text",
"ReportPointId": "It is a Text",
"Description": "It is a Text",
"LastOperationNo": 1
}
Get entities from ProductionLineRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
ProductionLineRepPointArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

ProductionLineRepPointArray_ProductionLine
required
string <= 12 characters
Example: It is a Text
key: ProductionLine

ProductionLineRepPointArray_ReportPointId
required
string <= 10 characters
Example: It is a Text
key: ReportPointId

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
Items Enum: "Contract" "Contract desc" "ProductionLine" "ProductionLine desc" "Description" "Description desc" "CreateDate" "CreateDate desc" "LastActivityDate" "LastActivityDate desc" "ReserveFlag" "ReserveFlag desc" "CalendarId" "CalendarId desc" "DailyOperatingMinutes" "DailyOperatingMinutes desc" "LineSchedLoadMethod" "LineSchedLoadMethod desc" "DefaultSchedulingHorizon" "DefaultSchedulingHorizon desc" "TaktTime" "TaktTime desc" "TaktTimeCalcDate" "TaktTimeCalcDate desc" "TaktTimeDemandStart" "TaktTimeDemandStart desc" "TaktTimeDemandEnd" "TaktTimeDemandEnd desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "CalendarIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ProductionLine
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/ProductionLineRepPointArray(Contract='{ProductionLineRepPointArray_Contract}',ProductionLine='{ProductionLineRepPointArray_ProductionLine}',ReportPointId='{ProductionLineRepPointArray_ReportPointId}')/ProductionLineRef

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
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
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
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/ContractRef

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
Get entities from CalendarIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
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
Items Enum: "CalendarId" "CalendarId desc" "Description" "Description desc" "State" "State desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CalendarId" "Description" "State"
Specify properties to return, see OData Select

Responses
200 response body for entity array WorkTimeCalendar
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProductionLines(ProductionLine='{ProductionLine}',Contract='{Contract}')/CalendarIdRef

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

Invoke function GetDefaultCalendar
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string
Example: It is a Text
Responses
200 response body for function GetDefaultCalendar :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetDefaultCalendar(Contract='{Contract}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": "It is a Text"
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
Reference_InventoryPartProdLineLov
Reference Entity Set Reference_InventoryPartProdLineLov

Get entities from Reference_InventoryPartProdLineLov
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryPartProdLineLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryPartProdLineLov

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
Get entity from Reference_InventoryPartProdLineLov by key
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
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type InventoryPartProdLineLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryPartProdLineLov(Contract='{Contract}',PartNo='{PartNo}')

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
"Description": "It is a Text"
}
Reference_InventoryLocation8
Reference Entity Set Reference_InventoryLocation8

Get entities from Reference_InventoryLocation8
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
Items Enum: "Contract" "Contract desc" "LocationNo" "LocationNo desc" "Warehouse" "Warehouse desc" "BayNo" "BayNo desc" "RowNo" "RowNo desc" "TierNo" "TierNo desc" "BinNo" "BinNo desc" "LocationName" "LocationName desc" "LocationGroup" "LocationGroup desc" "LocationType" "LocationType desc" "BinWidth" "BinWidth desc" "BinHeight" "BinHeight desc" "BinDepth" "BinDepth desc" "UomForLength" "UomForLength desc" "BinCarryingCapacity" "BinCarryingCapacity desc" "UomForWeight" "UomForWeight desc" "MinTemperature" "MinTemperature desc" "MaxTemperature" "MaxTemperature desc" "UomForTemperature" "UomForTemperature desc" "MinHumidity" "MinHumidity desc" "MaxHumidity" "MaxHumidity desc" "ReceiptsBlocked" "ReceiptsBlocked desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "LocationNo" "Warehouse" "BayNo" "RowNo" "TierNo" "BinNo" "LocationName" "LocationGroup" "LocationType" "BinWidth" "BinHeight" "BinDepth" "UomForLength" "BinCarryingCapacity" "UomForWeight" "MinTemperature" "MaxTemperature" "UomForTemperature" "MinHumidity" "MaxHumidity" "ReceiptsBlocked"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryLocation8
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryLocation8

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
Get entity from Reference_InventoryLocation8 by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string <= 4000 characters
Example: It is a Text
LocationNo
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "LocationNo" "Warehouse" "BayNo" "RowNo" "TierNo" "BinNo" "LocationName" "LocationGroup" "LocationType" "BinWidth" "BinHeight" "BinDepth" "UomForLength" "BinCarryingCapacity" "UomForWeight" "MinTemperature" "MaxTemperature" "UomForTemperature" "MinHumidity" "MaxHumidity" "ReceiptsBlocked"
Specify properties to return, see OData Select

Responses
200 response body for entity type InventoryLocation8
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryLocation8(Contract='{Contract}',LocationNo='{LocationNo}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"Contract": "It is a Text",
"LocationNo": "It is a Text",
"Warehouse": "It is a Text",
"BayNo": "It is a Text",
"RowNo": "It is a Text",
"TierNo": "It is a Text",
"BinNo": "It is a Text",
"LocationName": "It is a Text",
"LocationGroup": "It is a Text",
"LocationType": "It is a Text",
"BinWidth": 1,
"BinHeight": 1,
"BinDepth": 1,
"UomForLength": "It is a Text",
"BinCarryingCapacity": 1,
"UomForWeight": "It is a Text",
"MinTemperature": 1,
"MaxTemperature": 1,
"UomForTemperature": "It is a Text",
"MinHumidity": 1,
"MaxHumidity": 1,
"ReceiptsBlocked": "It is a Text"
}
Reference_InventoryPartPlannerLov
Reference Entity Set Reference_InventoryPartPlannerLov

Get entities from Reference_InventoryPartPlannerLov
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
Items Enum: "BuyerCode" "BuyerCode desc" "BuyerName" "BuyerName desc" "Objstate" "Objstate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "BuyerCode" "BuyerName" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryPartPlannerLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryPartPlannerLov

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
Get entity from Reference_InventoryPartPlannerLov by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
BuyerCode
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "BuyerCode" "BuyerName" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity type InventoryPartPlannerLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryPartPlannerLov(BuyerCode='{BuyerCode}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"BuyerCode": "It is a Text",
"BuyerName": "It is a Text",
"Objstate": "Active"
}
Reference_ManufStructHeadInvPartLov
Reference Entity Set Reference_ManufStructHeadInvPartLov

Get entities from Reference_ManufStructHeadInvPartLov
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "Description" "Description desc" "Planner" "Planner desc" "PartType" "PartType desc" "TypeCodeDb" "TypeCodeDb desc" "UnitMeas" "UnitMeas desc" "PartProductCode" "PartProductCode desc" "PartProductFamily" "PartProductFamily desc" "ManufLeadtime" "ManufLeadtime desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description" "Planner" "PartType" "TypeCodeDb" "UnitMeas" "PartProductCode" "PartProductFamily" "ManufLeadtime"
Specify properties to return, see OData Select

Responses
200 response body for entity array ManufStructHeadInvPartLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ManufStructHeadInvPartLov

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
Get entity from Reference_ManufStructHeadInvPartLov by key
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
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description" "Planner" "PartType" "TypeCodeDb" "UnitMeas" "PartProductCode" "PartProductFamily" "ManufLeadtime"
Specify properties to return, see OData Select

Responses
200 response body for entity type ManufStructHeadInvPartLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ManufStructHeadInvPartLov(Contract='{Contract}',PartNo='{PartNo}')

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
"Description": "It is a Text",
"Planner": "It is a Text",
"TypeCodeDb": "It is a Text",
"UnitMeas": "It is a Text",
"PartProductCode": "It is a Text",
"PartProductFamily": "It is a Text",
"ManufLeadtime": 1,
"PartType": "Manufactured"
}
Reference_InvPartWithRmDaHeadLov
Reference Entity Set Reference_InvPartWithRmDaHeadLov

Get entities from Reference_InvPartWithRmDaHeadLov
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "Description" "Description desc" "PartType" "PartType desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description" "PartType"
Specify properties to return, see OData Select

Responses
200 response body for entity array InvPartWithRmDaHeadLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InvPartWithRmDaHeadLov

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
Get entity from Reference_InvPartWithRmDaHeadLov by key
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
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description" "PartType"
Specify properties to return, see OData Select

Responses
200 response body for entity type InvPartWithRmDaHeadLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InvPartWithRmDaHeadLov(Contract='{Contract}',PartNo='{PartNo}')

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
"Description": "It is a Text",
"PartType": "Manufactured"
}
Reference_CircuitHoldReasonQuery
Reference Entity Set Reference_CircuitHoldReasonQuery

Get entities from Reference_CircuitHoldReasonQuery
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
Items Enum: "HoldReasonCode" "HoldReasonCode desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "HoldReasonCode" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array CircuitHoldReasonQuery
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CircuitHoldReasonQuery

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
Get entity from Reference_CircuitHoldReasonQuery by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
HoldReasonCode
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "HoldReasonCode" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type CircuitHoldReasonQuery
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CircuitHoldReasonQuery(HoldReasonCode='{HoldReasonCode}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"HoldReasonCode": "It is a Text",
"Description": "It is a Text"
}
Reference_IntorderPartLov
Reference Entity Set Reference_IntorderPartLov

Get entities from Reference_IntorderPartLov
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "Description" "Description desc" "PartCatalogDescription" "PartCatalogDescription desc" "SupplyCode" "SupplyCode desc" "TechnicalDrawingNo" "TechnicalDrawingNo desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description" "PartCatalogDescription" "SupplyCode" "TechnicalDrawingNo"
Specify properties to return, see OData Select

Responses
200 response body for entity array IntorderPartLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_IntorderPartLov

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
Get entity from Reference_IntorderPartLov by key
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
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description" "PartCatalogDescription" "SupplyCode" "TechnicalDrawingNo"
Specify properties to return, see OData Select

Responses
200 response body for entity type IntorderPartLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_IntorderPartLov(Contract='{Contract}',PartNo='{PartNo}')

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
"Description": "It is a Text",
"PartCatalogDescription": "It is a Text",
"TechnicalDrawingNo": "It is a Text",
"SupplyCode": "InventoryOrder"
}
Reference_WorkTimeCalendar
Reference Entity Set Reference_WorkTimeCalendar

Get entities from Reference_WorkTimeCalendar
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
Items Enum: "CalendarId" "CalendarId desc" "Description" "Description desc" "State" "State desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CalendarId" "Description" "State"
Specify properties to return, see OData Select

Responses
200 response body for entity array WorkTimeCalendar
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_WorkTimeCalendar

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
Get entity from Reference_WorkTimeCalendar by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
CalendarId
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "CalendarId" "Description" "State"
Specify properties to return, see OData Select

Responses
200 response body for entity type WorkTimeCalendar
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_WorkTimeCalendar(CalendarId='{CalendarId}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"CalendarId": "It is a Text",
"Description": "It is a Text",
"State": "It is a Text"
}
Reference_ManufStructHeadPartLov
Reference Entity Set Reference_ManufStructHeadPartLov

Get entities from Reference_ManufStructHeadPartLov
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "Description" "Description desc" "Planner" "Planner desc" "PartType" "PartType desc" "TypeCodeDb" "TypeCodeDb desc" "UnitMeas" "UnitMeas desc" "UnitMeasDescription" "UnitMeasDescription desc" "PartProductCode" "PartProductCode desc" "PartProductFamily" "PartProductFamily desc" "AccountingGroup" "AccountingGroup desc" "ManufacturingLeadtime" "ManufacturingLeadtime desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description" "Planner" "PartType" "TypeCodeDb" "UnitMeas" "UnitMeasDescription" "PartProductCode" "PartProductFamily" "AccountingGroup" "ManufacturingLeadtime"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "UnitMeasRef" "PartProductCodeRef" "PartProductFamilyRef" "AccountingGroupRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ManufStructHeadPartLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ManufStructHeadPartLov

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
Get entity from Reference_ManufStructHeadPartLov by key
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
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description" "Planner" "PartType" "TypeCodeDb" "UnitMeas" "UnitMeasDescription" "PartProductCode" "PartProductFamily" "AccountingGroup" "ManufacturingLeadtime"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "UnitMeasRef" "PartProductCodeRef" "PartProductFamilyRef" "AccountingGroupRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type ManufStructHeadPartLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ManufStructHeadPartLov(Contract='{Contract}',PartNo='{PartNo}')

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
"Description": "It is a Text",
"Planner": "It is a Text",
"PartType": "It is a Text",
"TypeCodeDb": "It is a Text",
"UnitMeas": "It is a Text",
"UnitMeasDescription": "It is a Text",
"PartProductCode": "It is a Text",
"PartProductFamily": "It is a Text",
"AccountingGroup": "It is a Text",
"ManufacturingLeadtime": 1
}
Reference_KanbanCircuit
Reference Entity Set Reference_KanbanCircuit

Get entities from Reference_KanbanCircuit
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
Items Enum: "Objstate" "Objstate desc" "Contract" "Contract desc" "PartNo" "PartNo desc" "SupplyToLocationNo" "SupplyToLocationNo desc" "NumberOfKanbans" "NumberOfKanbans desc" "QtyPerKanban" "QtyPerKanban desc" "ReplenishLotSize" "ReplenishLotSize desc" "QtyReorderPoint" "QtyReorderPoint desc" "NumberOfKanbansNew" "NumberOfKanbansNew desc" "QtyPerKanbanNew" "QtyPerKanbanNew desc" "QtyReorderPointNew" "QtyReorderPointNew desc" "QtyDemand" "QtyDemand desc" "SafetyStockFactor" "SafetyStockFactor desc" "ReplenishLeadtime" "ReplenishLeadtime desc" "ChangeDate" "ChangeDate desc" "RecalcDate" "RecalcDate desc" "CardText" "CardText desc" "NoteText" "NoteText desc" "PictureId" "PictureId desc" "ReplenishSignalType" "ReplenishSignalType desc" "ReplenishSource" "ReplenishSource desc" "SafetyStockCode" "SafetyStockCode desc" "KanbanCalcType" "KanbanCalcType desc" "ReplenishFromLine" "ReplenishFromLine desc" "SupplyToLine" "SupplyToLine desc" "ReplenishFromLocationNo" "ReplenishFromLocationNo desc" "ReplenishFromContract" "ReplenishFromContract desc" "ReplenishFromVendorNo" "ReplenishFromVendorNo desc" "ReplenishFromGroup" "ReplenishFromGroup desc" "KanbanCalcFormula" "KanbanCalcFormula desc" "KanbanDemandSource" "KanbanDemandSource desc" "DemandLastChangeDate" "DemandLastChangeDate desc" "ReplenishLotSizeNew" "ReplenishLotSizeNew desc" "HoldReasonCode" "HoldReasonCode desc" "DockCode" "DockCode desc" "SubDockCode" "SubDockCode desc" "CreatePurchaseOrder" "CreatePurchaseOrder desc" "ReplenishOrder" "ReplenishOrder desc" "PlannerId" "PlannerId desc" "CardsToAddSubtract" "CardsToAddSubtract desc" "NoOfObsoleteCards" "NoOfObsoleteCards desc" "PeakDemand" "PeakDemand desc" "VariationCoefficient" "VariationCoefficient desc" "MaxPosCumDeviation" "MaxPosCumDeviation desc" "HighestQtyOnHand" "HighestQtyOnHand desc" "LowestQtyOnHand" "LowestQtyOnHand desc" "AvgQtyOnHand" "AvgQtyOnHand desc" "SafetyStockUnits" "SafetyStockUnits desc" "QtyPerKanbanChange2" "QtyPerKanbanChange2 desc" "NumberOfKanbansChange2" "NumberOfKanbansChange2 desc" "ReorderPointChange2" "ReorderPointChange2 desc" "LotTransferQuantityChange" "LotTransferQuantityChange desc" "QtyPerKanbanChange3" "QtyPerKanbanChange3 desc" "NumberOfKanbansChange3" "NumberOfKanbansChange3 desc" "ReorderPointChange3" "ReorderPointChange3 desc" "LotTransferQty" "LotTransferQty desc" "DemandSourceDateRangeFrom" "DemandSourceDateRangeFrom desc" "DemandSourceDateRangeTo" "DemandSourceDateRangeTo desc" "Warehouse" "Warehouse desc" "Bay" "Bay desc" "RowNo" "RowNo desc" "Tier" "Tier desc" "Bin" "Bin desc" "UnitMeas" "UnitMeas desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Contract" "PartNo" "SupplyToLocationNo" "NumberOfKanbans" "QtyPerKanban" "ReplenishLotSize" "QtyReorderPoint" "NumberOfKanbansNew" "QtyPerKanbanNew" "QtyReorderPointNew" "QtyDemand" "SafetyStockFactor" "ReplenishLeadtime" "ChangeDate" "RecalcDate" "CardText" "NoteText" "PictureId" "ReplenishSignalType" "ReplenishSource" "SafetyStockCode" "KanbanCalcType" "ReplenishFromLine" "SupplyToLine" "ReplenishFromLocationNo" "ReplenishFromContract" "ReplenishFromVendorNo" "ReplenishFromGroup" "KanbanCalcFormula" "KanbanDemandSource" "DemandLastChangeDate" "ReplenishLotSizeNew" "HoldReasonCode" "DockCode" "SubDockCode" "CreatePurchaseOrder" "ReplenishOrder" "PlannerId" "CardsToAddSubtract" "NoOfObsoleteCards" "PeakDemand" "VariationCoefficient" "MaxPosCumDeviation" "HighestQtyOnHand" "LowestQtyOnHand" "AvgQtyOnHand" "SafetyStockUnits" "QtyPerKanbanChange2" "NumberOfKanbansChange2" "ReorderPointChange2" "LotTransferQuantityChange" "QtyPerKanbanChange3" "NumberOfKanbansChange3" "ReorderPointChange3" "LotTransferQty" "DemandSourceDateRangeFrom" "DemandSourceDateRangeTo" "Warehouse" "Bay" "RowNo" "Tier" "Bin" "UnitMeas"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "InventoryPartRef" "ContractRef" "PlannerIDRef" "SupplyToLocationNoRef" "HoldReasonCodeRef" "ReplenishFromLocationNoRef" "ReplenishFromGroupRef" "ReplenishFromLineRef" "ReplenishFromContractRef" "ReplenishFromVendorNoRef" "SupplyToLineRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array KanbanCircuit
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_KanbanCircuit

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
Get entity from Reference_KanbanCircuit by key
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
SupplyToLocationNo
required
string <= 35 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Contract" "PartNo" "SupplyToLocationNo" "NumberOfKanbans" "QtyPerKanban" "ReplenishLotSize" "QtyReorderPoint" "NumberOfKanbansNew" "QtyPerKanbanNew" "QtyReorderPointNew" "QtyDemand" "SafetyStockFactor" "ReplenishLeadtime" "ChangeDate" "RecalcDate" "CardText" "NoteText" "PictureId" "ReplenishSignalType" "ReplenishSource" "SafetyStockCode" "KanbanCalcType" "ReplenishFromLine" "SupplyToLine" "ReplenishFromLocationNo" "ReplenishFromContract" "ReplenishFromVendorNo" "ReplenishFromGroup" "KanbanCalcFormula" "KanbanDemandSource" "DemandLastChangeDate" "ReplenishLotSizeNew" "HoldReasonCode" "DockCode" "SubDockCode" "CreatePurchaseOrder" "ReplenishOrder" "PlannerId" "CardsToAddSubtract" "NoOfObsoleteCards" "PeakDemand" "VariationCoefficient" "MaxPosCumDeviation" "HighestQtyOnHand" "LowestQtyOnHand" "AvgQtyOnHand" "SafetyStockUnits" "QtyPerKanbanChange2" "NumberOfKanbansChange2" "ReorderPointChange2" "LotTransferQuantityChange" "QtyPerKanbanChange3" "NumberOfKanbansChange3" "ReorderPointChange3" "LotTransferQty" "DemandSourceDateRangeFrom" "DemandSourceDateRangeTo" "Warehouse" "Bay" "RowNo" "Tier" "Bin" "UnitMeas"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "InventoryPartRef" "ContractRef" "PlannerIDRef" "SupplyToLocationNoRef" "HoldReasonCodeRef" "ReplenishFromLocationNoRef" "ReplenishFromGroupRef" "ReplenishFromLineRef" "ReplenishFromContractRef" "ReplenishFromVendorNoRef" "SupplyToLineRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type KanbanCircuit
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_KanbanCircuit(Contract='{Contract}',PartNo='{PartNo}',SupplyToLocationNo='{SupplyToLocationNo}')

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
"SupplyToLocationNo": "It is a Text",
"NumberOfKanbans": 1,
"QtyPerKanban": 1,
"ReplenishLotSize": 1,
"QtyReorderPoint": 1,
"NumberOfKanbansNew": 1,
"QtyPerKanbanNew": 1,
"QtyReorderPointNew": 1,
"QtyDemand": 1,
"SafetyStockFactor": 1,
"ReplenishLeadtime": 1,
"ChangeDate": "2019-10-10",
"RecalcDate": "2019-10-10",
"CardText": "It is a Text",
"NoteText": "It is a Text",
"PictureId": 1,
"ReplenishFromLine": "It is a Text",
"SupplyToLine": "It is a Text",
"ReplenishFromLocationNo": "It is a Text",
"ReplenishFromContract": "It is a Text",
"ReplenishFromVendorNo": "It is a Text",
"ReplenishFromGroup": "It is a Text",
"DemandLastChangeDate": "2019-10-10",
"ReplenishLotSizeNew": 1,
"HoldReasonCode": "It is a Text",
"DockCode": "It is a Text",
"SubDockCode": "It is a Text",
"CreatePurchaseOrder": "It is a Text",
"PlannerId": "It is a Text",
"CardsToAddSubtract": 1,
"NoOfObsoleteCards": 1,
"PeakDemand": 1,
"VariationCoefficient": 1,
"MaxPosCumDeviation": 1,
"HighestQtyOnHand": 1,
"LowestQtyOnHand": 1,
"AvgQtyOnHand": 1,
"SafetyStockUnits": 1,
"QtyPerKanbanChange2": 1,
"NumberOfKanbansChange2": 1,
"ReorderPointChange2": 1,
"LotTransferQuantityChange": 1,
"QtyPerKanbanChange3": 1,
"NumberOfKanbansChange3": 1,
"ReorderPointChange3": 1,
"LotTransferQty": 1,
"DemandSourceDateRangeFrom": "2019-10-10",
"DemandSourceDateRangeTo": "2019-10-10",
"Warehouse": "It is a Text",
"Bay": "It is a Text",
"RowNo": "It is a Text",
"Tier": "It is a Text",
"Bin": "It is a Text",
"UnitMeas": "It is a Text",
"Objstate": "Inactive",
"ReplenishSignalType": "VisualNotElectronic",
"ReplenishSource": "Location",
"SafetyStockCode": "Percentage",
"KanbanCalcType": "NumberOfKanbans",
"KanbanCalcFormula": "BasicADDLTSSLot",
"KanbanDemandSource": "Msmrp",
"ReplenishOrder": "TransportTask"
}
Reference_ProductionLine
Reference Entity Set Reference_ProductionLine

Get entities from Reference_ProductionLine
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
Items Enum: "Contract" "Contract desc" "ProductionLine" "ProductionLine desc" "Description" "Description desc" "CreateDate" "CreateDate desc" "LastActivityDate" "LastActivityDate desc" "ReserveFlag" "ReserveFlag desc" "CalendarId" "CalendarId desc" "DailyOperatingMinutes" "DailyOperatingMinutes desc" "LineSchedLoadMethod" "LineSchedLoadMethod desc" "DefaultSchedulingHorizon" "DefaultSchedulingHorizon desc" "TaktTime" "TaktTime desc" "TaktTimeCalcDate" "TaktTimeCalcDate desc" "TaktTimeDemandStart" "TaktTimeDemandStart desc" "TaktTimeDemandEnd" "TaktTimeDemandEnd desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "CalendarIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ProductionLine
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ProductionLine

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
Get entity from Reference_ProductionLine by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProductionLine
required
string <= 12 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "Description" "CreateDate" "LastActivityDate" "ReserveFlag" "CalendarId" "DailyOperatingMinutes" "LineSchedLoadMethod" "DefaultSchedulingHorizon" "TaktTime" "TaktTimeCalcDate" "TaktTimeDemandStart" "TaktTimeDemandEnd"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "CalendarIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type ProductionLine
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ProductionLine(ProductionLine='{ProductionLine}',Contract='{Contract}')

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
"ProductionLine": "It is a Text",
"Description": "It is a Text",
"CreateDate": "2019-10-10",
"LastActivityDate": "2019-10-10",
"CalendarId": "It is a Text",
"DailyOperatingMinutes": 1,
"DefaultSchedulingHorizon": "It is a Text",
"TaktTime": 1,
"TaktTimeCalcDate": "2019-10-10",
"TaktTimeDemandStart": "2019-10-10",
"TaktTimeDemandEnd": "2019-10-10",
"ReserveFlag": "ReserveAllowed",
"LineSchedLoadMethod": "LoadInfinite"
}
Reference_CircuitHoldReason
Reference Entity Set Reference_CircuitHoldReason

Get entities from Reference_CircuitHoldReason
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
Items Enum: "HoldReasonCode" "HoldReasonCode desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "HoldReasonCode" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array CircuitHoldReason
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CircuitHoldReason

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
Get entity from Reference_CircuitHoldReason by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
HoldReasonCode
required
string <= 10 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "HoldReasonCode" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type CircuitHoldReason
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CircuitHoldReason(HoldReasonCode='{HoldReasonCode}')

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
"HoldReasonCode": "It is a Text",
"Description": "It is a Text"
}
Reference_ScheduleHorizon
Reference Entity Set Reference_ScheduleHorizon

Get entities from Reference_ScheduleHorizon
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
Items Enum: "HorizonId" "HorizonId desc" "HorizonDescription" "HorizonDescription desc" "PastDueFence" "PastDueFence desc" "FirmHorizon" "FirmHorizon desc" "SchedHorizon" "SchedHorizon desc" "RollFirmSched" "RollFirmSched desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "HorizonId" "HorizonDescription" "PastDueFence" "FirmHorizon" "SchedHorizon" "RollFirmSched"
Specify properties to return, see OData Select

Responses
200 response body for entity array ScheduleHorizon
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ScheduleHorizon

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
Get entity from Reference_ScheduleHorizon by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
HorizonId
required
string <= 12 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "HorizonId" "HorizonDescription" "PastDueFence" "FirmHorizon" "SchedHorizon" "RollFirmSched"
Specify properties to return, see OData Select

Responses
200 response body for entity type ScheduleHorizon
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ScheduleHorizon(HorizonId='{HorizonId}')

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
"HorizonId": "It is a Text",
"HorizonDescription": "It is a Text",
"PastDueFence": 1,
"FirmHorizon": 1,
"SchedHorizon": 1,
"RollFirmSched": "Roll"
}
Reference_Supplier
Reference Entity Set Reference_Supplier

Get entities from Reference_Supplier
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
Items Enum: "VendorNo" "VendorNo desc" "VendorName" "VendorName desc" "BuyerCode" "BuyerCode desc" "CurrencyCode" "CurrencyCode desc" "SuppGrp" "SuppGrp desc" "AdditionalCostAmount" "AdditionalCostAmount desc" "Contact" "Contact desc" "CrCheck" "CrCheck desc" "CrDate" "CrDate desc" "CrNoteText" "CrNoteText desc" "DateDel" "DateDel desc" "Discount" "Discount desc" "NoteText" "NoteText desc" "OurCustomerNo" "OurCustomerNo desc" "PackListFlag" "PackListFlag desc" "PurchOrderFlag" "PurchOrderFlag desc" "QcApproval" "QcApproval desc" "QcDate" "QcDate desc" "QcAudit" "QcAudit desc" "QcNoteText" "QcNoteText desc" "OrdConfRemInterval" "OrdConfRemInterval desc" "DeliveryRemInterval" "DeliveryRemInterval desc" "DaysBeforeDelivery" "DaysBeforeDelivery desc" "DaysBeforeArrival" "DaysBeforeArrival desc" "OrdConfReminder" "OrdConfReminder desc" "DeliveryReminder" "DeliveryReminder desc" "Category" "Category desc" "AcquisitionSite" "AcquisitionSite desc" "Company" "Company desc" "PayTermId" "PayTermId desc" "EdiAutoApprovalUser" "EdiAutoApprovalUser desc" "QcType" "QcType desc" "EnvironmentDate" "EnvironmentDate desc" "EnvironmentType" "EnvironmentType desc" "EnvironmentalApproval" "EnvironmentalApproval desc" "EnvironmentAudit" "EnvironmentAudit desc" "EnvironmentNoteText" "EnvironmentNoteText desc" "CocApproval" "CocApproval desc" "CocDate" "CocDate desc" "CocType" "CocType desc" "CocAudit" "CocAudit desc" "CocNoteText" "CocNoteText desc" "CustomerNo" "CustomerNo desc" "NoteId" "NoteId desc" "SupplierTemplateDesc" "SupplierTemplateDesc desc" "TemplateSupplier" "TemplateSupplier desc" "QuickRegisteredSupplier" "QuickRegisteredSupplier desc" "BlanketDate" "BlanketDate desc" "ExpressOrderAllowed" "ExpressOrderAllowed desc" "EdiPriCatAppUser" "EdiPriCatAppUser desc" "PricatAutomaticApproval" "PricatAutomaticApproval desc" "AutomaticReplChange" "AutomaticReplChange desc" "SendChangeMessage" "SendChangeMessage desc" "ReceiptRefReminder" "ReceiptRefReminder desc" "PrintAmountsInclTax" "PrintAmountsInclTax desc" "ClosingDay" "ClosingDay desc" "EndOfMonth" "EndOfMonth desc" "ReceivingAdviceType" "ReceivingAdviceType desc" "RecAdvSelfBilling" "RecAdvSelfBilling desc" "ClassificationStandard" "ClassificationStandard desc" "PurchaseCode" "PurchaseCode desc" "PoChangeManagement" "PoChangeManagement desc" "CreateConfirmationChgOrd" "CreateConfirmationChgOrd desc" "EmailPurchaseOrder" "EmailPurchaseOrder desc" "VendorCategoryDb" "VendorCategoryDb desc" "DirDelApproval" "DirDelApproval desc" "OrderConfApproval" "OrderConfApproval desc" "OrderConfDiffApproval" "OrderConfDiffApproval desc" "AdhocPurRqstApproval" "AdhocPurRqstApproval desc" "TaxLiability" "TaxLiability desc" "B2bConfOrderWithDiff" "B2bConfOrderWithDiff desc" "QualitySystemLevelId" "QualitySystemLevelId desc" "QualityAuditId" "QualityAuditId desc" "EnvironmentAuditId" "EnvironmentAuditId desc" "CocAuditId" "CocAuditId desc" "RecAdvSbConsignment" "RecAdvSbConsignment desc" "RecAdvSbMixOwnership" "RecAdvSbMixOwnership desc" "CCommId" "CCommId desc" "COutputMedia" "COutputMedia desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "VendorNo" "VendorName" "BuyerCode" "CurrencyCode" "SuppGrp" "AdditionalCostAmount" "Contact" "CrCheck" "CrDate" "CrNoteText" "DateDel" "Discount" "NoteText" "OurCustomerNo" "PackListFlag" "PurchOrderFlag" "QcApproval" "QcDate" "QcAudit" "QcNoteText" "OrdConfRemInterval" "DeliveryRemInterval" "DaysBeforeDelivery" "DaysBeforeArrival" "OrdConfReminder" "DeliveryReminder" "Category" "AcquisitionSite" "Company" "PayTermId" "EdiAutoApprovalUser" "QcType" "EnvironmentDate" "EnvironmentType" "EnvironmentalApproval" "EnvironmentAudit" "EnvironmentNoteText" "CocApproval" "CocDate" "CocType" "CocAudit" "CocNoteText" "CustomerNo" "NoteId" "SupplierTemplateDesc" "TemplateSupplier" "QuickRegisteredSupplier" "BlanketDate" "ExpressOrderAllowed" "EdiPriCatAppUser" "PricatAutomaticApproval" "AutomaticReplChange" "SendChangeMessage" "ReceiptRefReminder" "PrintAmountsInclTax" "ClosingDay" "EndOfMonth" "ReceivingAdviceType" "RecAdvSelfBilling" "ClassificationStandard" "PurchaseCode" "PoChangeManagement" "CreateConfirmationChgOrd" "EmailPurchaseOrder" "VendorCategoryDb" "DirDelApproval" "OrderConfApproval" "OrderConfDiffApproval" "AdhocPurRqstApproval" "TaxLiability" "B2bConfOrderWithDiff" "QualitySystemLevelId" "QualityAuditId" "EnvironmentAuditId" "CocAuditId" "RecAdvSbConsignment" "RecAdvSbMixOwnership" "CCommId" "COutputMedia"
Specify properties to return, see OData Select

Responses
200 response body for entity array Supplier
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_Supplier

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
Get entity from Reference_Supplier by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
VendorNo
required
string <= 20 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "VendorNo" "VendorName" "BuyerCode" "CurrencyCode" "SuppGrp" "AdditionalCostAmount" "Contact" "CrCheck" "CrDate" "CrNoteText" "DateDel" "Discount" "NoteText" "OurCustomerNo" "PackListFlag" "PurchOrderFlag" "QcApproval" "QcDate" "QcAudit" "QcNoteText" "OrdConfRemInterval" "DeliveryRemInterval" "DaysBeforeDelivery" "DaysBeforeArrival" "OrdConfReminder" "DeliveryReminder" "Category" "AcquisitionSite" "Company" "PayTermId" "EdiAutoApprovalUser" "QcType" "EnvironmentDate" "EnvironmentType" "EnvironmentalApproval" "EnvironmentAudit" "EnvironmentNoteText" "CocApproval" "CocDate" "CocType" "CocAudit" "CocNoteText" "CustomerNo" "NoteId" "SupplierTemplateDesc" "TemplateSupplier" "QuickRegisteredSupplier" "BlanketDate" "ExpressOrderAllowed" "EdiPriCatAppUser" "PricatAutomaticApproval" "AutomaticReplChange" "SendChangeMessage" "ReceiptRefReminder" "PrintAmountsInclTax" "ClosingDay" "EndOfMonth" "ReceivingAdviceType" "RecAdvSelfBilling" "ClassificationStandard" "PurchaseCode" "PoChangeManagement" "CreateConfirmationChgOrd" "EmailPurchaseOrder" "VendorCategoryDb" "DirDelApproval" "OrderConfApproval" "OrderConfDiffApproval" "AdhocPurRqstApproval" "TaxLiability" "B2bConfOrderWithDiff" "QualitySystemLevelId" "QualityAuditId" "EnvironmentAuditId" "CocAuditId" "RecAdvSbConsignment" "RecAdvSbMixOwnership" "CCommId" "COutputMedia"
Specify properties to return, see OData Select

Responses
200 response body for entity type Supplier
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_Supplier(VendorNo='{VendorNo}')

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
"VendorNo": "It is a Text",
"VendorName": "It is a Text",
"BuyerCode": "It is a Text",
"CurrencyCode": "It is a Text",
"SuppGrp": "It is a Text",
"AdditionalCostAmount": 1,
"Contact": "It is a Text",
"CrDate": "2019-10-10",
"CrNoteText": "It is a Text",
"DateDel": "2019-10-10",
"Discount": 1,
"NoteText": "It is a Text",
"OurCustomerNo": "It is a Text",
"QcDate": "2019-10-10",
"QcAudit": "2019-10-10",
"QcNoteText": "It is a Text",
"OrdConfRemInterval": 1,
"DeliveryRemInterval": 1,
"DaysBeforeDelivery": 1,
"DaysBeforeArrival": 1,
"AcquisitionSite": "It is a Text",
"Company": "It is a Text",
"PayTermId": "It is a Text",
"EdiAutoApprovalUser": "It is a Text",
"QcType": "It is a Text",
"EnvironmentDate": "2019-10-10",
"EnvironmentType": "It is a Text",
"EnvironmentAudit": "2019-10-10",
"EnvironmentNoteText": "It is a Text",
"CocDate": "2019-10-10",
"CocType": "It is a Text",
"CocAudit": "2019-10-10",
"CocNoteText": "It is a Text",
"CustomerNo": "It is a Text",
"NoteId": 1,
"SupplierTemplateDesc": "It is a Text",
"EdiPriCatAppUser": "It is a Text",
"PrintAmountsInclTax": true,
"ClosingDay": 1,
"EndOfMonth": true,
"RecAdvSelfBilling": true,
"ClassificationStandard": "It is a Text",
"PurchaseCode": "It is a Text",
"CreateConfirmationChgOrd": true,
"EmailPurchaseOrder": true,
"VendorCategoryDb": "It is a Text",
"TaxLiability": "It is a Text",
"B2bConfOrderWithDiff": true,
"QualitySystemLevelId": "It is a Text",
"QualityAuditId": "It is a Text",
"EnvironmentAuditId": "It is a Text",
"CocAuditId": "It is a Text",
"RecAdvSbConsignment": true,
"RecAdvSbMixOwnership": true,
"CCommId": 1,
"CrCheck": "CreditApproved",
"PackListFlag": "PrintDeliveryNote",
"PurchOrderFlag": "PrintOrder",
"QcApproval": "Approved",
"OrdConfReminder": "PrintOrderReminder",
"DeliveryReminder": "PrintDelivReminder",
"Category": "Internal",
"EnvironmentalApproval": "Approved",
"CocApproval": "Approved",
"TemplateSupplier": "Template",
"QuickRegisteredSupplier": "QuickRegistered",
"BlanketDate": "OrderDate",
"ExpressOrderAllowed": "Normal",
"PricatAutomaticApproval": "Automatically",
"AutomaticReplChange": "Yes",
"SendChangeMessage": "Yes",
"ReceiptRefReminder": "ReceiptRefReminder",
"ReceivingAdviceType": "UseCustomerDefault",
"PoChangeManagement": "UseSiteDefault",
"DirDelApproval": "Automatically",
"OrderConfApproval": "Automatically",
"OrderConfDiffApproval": "Automatically",
"AdhocPurRqstApproval": "Automatically",
"COutputMedia": "Printout"
}
Reference_InventoryLocation
Reference Entity Set Reference_InventoryLocation

Get entities from Reference_InventoryLocation
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
Items Enum: "Contract" "Contract desc" "LocationNo" "LocationNo desc" "LocationGroup" "LocationGroup desc" "WarehouseId" "WarehouseId desc" "BayId" "BayId desc" "RowId" "RowId desc" "TierId" "TierId desc" "BinId" "BinId desc" "Description" "Description desc" "LocationSequence" "LocationSequence desc" "WidthCapacity" "WidthCapacity desc" "HeightCapacity" "HeightCapacity desc" "DeptCapacity" "DeptCapacity desc" "CarryingCapacity" "CarryingCapacity desc" "MinTemperature" "MinTemperature desc" "MaxTemperature" "MaxTemperature desc" "MinHumidity" "MinHumidity desc" "MaxHumidity" "MaxHumidity desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "LocationNo" "LocationGroup" "WarehouseId" "BayId" "RowId" "TierId" "BinId" "Description" "LocationSequence" "WidthCapacity" "HeightCapacity" "DeptCapacity" "CarryingCapacity" "MinTemperature" "MaxTemperature" "MinHumidity" "MaxHumidity"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryLocation
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryLocation

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
Get entity from Reference_InventoryLocation by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string <= 5 characters
Example: It is a Text
LocationNo
required
string <= 35 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "LocationNo" "LocationGroup" "WarehouseId" "BayId" "RowId" "TierId" "BinId" "Description" "LocationSequence" "WidthCapacity" "HeightCapacity" "DeptCapacity" "CarryingCapacity" "MinTemperature" "MaxTemperature" "MinHumidity" "MaxHumidity"
Specify properties to return, see OData Select

Responses
200 response body for entity type InventoryLocation
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryLocation(Contract='{Contract}',LocationNo='{LocationNo}')

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
"LocationNo": "It is a Text",
"LocationGroup": "It is a Text",
"WarehouseId": "It is a Text",
"BayId": "It is a Text",
"RowId": "It is a Text",
"TierId": "It is a Text",
"BinId": "It is a Text",
"Description": "It is a Text",
"LocationSequence": 1,
"WidthCapacity": 1,
"HeightCapacity": 1,
"DeptCapacity": 1,
"CarryingCapacity": 1,
"MinTemperature": 1,
"MaxTemperature": 1,
"MinHumidity": 1,
"MaxHumidity": 1
}
Reference_InventoryLocationGroup
Reference Entity Set Reference_InventoryLocationGroup

Get entities from Reference_InventoryLocationGroup
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
Items Enum: "LocationGroup" "LocationGroup desc" "Description" "Description desc" "InventoryLocationType" "InventoryLocationType desc" "TrolleyType" "TrolleyType desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "LocationGroup" "Description" "InventoryLocationType" "TrolleyType"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryLocationGroup
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryLocationGroup

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
Get entity from Reference_InventoryLocationGroup by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
LocationGroup
required
string <= 5 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "LocationGroup" "Description" "InventoryLocationType" "TrolleyType"
Specify properties to return, see OData Select

Responses
200 response body for entity type InventoryLocationGroup
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryLocationGroup(LocationGroup='{LocationGroup}')

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
"LocationGroup": "It is a Text",
"Description": "It is a Text",
"TrolleyType": true,
"InventoryLocationType": "Picking"
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
Reference_ProductionLinePart
Reference Entity Set Reference_ProductionLinePart

Get entities from Reference_ProductionLinePart
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "ProductionLine" "ProductionLine desc" "LastActivityDate" "LastActivityDate desc" "SchedulePercentage" "SchedulePercentage desc" "HorizonId" "HorizonId desc" "ScheduleFraction" "ScheduleFraction desc" "AverageDailyDemand" "AverageDailyDemand desc" "PartTaktTime" "PartTaktTime desc" "ReceiveInBackground" "ReceiveInBackground desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "ProductionLine" "LastActivityDate" "SchedulePercentage" "HorizonId" "ScheduleFraction" "AverageDailyDemand" "PartTaktTime" "ReceiveInBackground"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ProductionLineRef" "PartNoRef" "HorizonIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ProductionLinePart
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ProductionLinePart

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
Get entity from Reference_ProductionLinePart by key
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
ProductionLine
required
string <= 12 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "ProductionLine" "LastActivityDate" "SchedulePercentage" "HorizonId" "ScheduleFraction" "AverageDailyDemand" "PartTaktTime" "ReceiveInBackground"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ProductionLineRef" "PartNoRef" "HorizonIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type ProductionLinePart
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ProductionLinePart(Contract='{Contract}',PartNo='{PartNo}',ProductionLine='{ProductionLine}')

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
"ProductionLine": "It is a Text",
"LastActivityDate": "2019-10-10",
"SchedulePercentage": 1,
"HorizonId": "It is a Text",
"AverageDailyDemand": 1,
"PartTaktTime": 1,
"ReceiveInBackground": true,
"ScheduleFraction": "FractionNotAllowed"
}
Reference_ProductionLineRepPoint
Reference Entity Set Reference_ProductionLineRepPoint

Get entities from Reference_ProductionLineRepPoint
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
Items Enum: "Contract" "Contract desc" "ProductionLine" "ProductionLine desc" "ReportPointId" "ReportPointId desc" "Description" "Description desc" "LastOperationNo" "LastOperationNo desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "ReportPointId" "Description" "LastOperationNo"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "ProductionLineRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ProductionLineRepPoint
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ProductionLineRepPoint

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
Get entity from Reference_ProductionLineRepPoint by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string <= 5 characters
Example: It is a Text
ProductionLine
required
string <= 12 characters
Example: It is a Text
ReportPointId
required
string <= 10 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "ReportPointId" "Description" "LastOperationNo"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "ProductionLineRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type ProductionLineRepPoint
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ProductionLineRepPoint(Contract='{Contract}',ProductionLine='{ProductionLine}',ReportPointId='{ReportPointId}')

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
"ProductionLine": "It is a Text",
"ReportPointId": "It is a Text",
"Description": "It is a Text",
"LastOperationNo": 1
}
Reference_ProductionLineLocation
Reference Entity Set Reference_ProductionLineLocation

Get entities from Reference_ProductionLineLocation
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
Items Enum: "Contract" "Contract desc" "ProductionLine" "ProductionLine desc" "LocationNo" "LocationNo desc" "LastActivityDate" "LastActivityDate desc" "LocationUsage" "LocationUsage desc" "PerformPutaway" "PerformPutaway desc" "Warehouse" "Warehouse desc" "Bay" "Bay desc" "LocRow" "LocRow desc" "Tier" "Tier desc" "Bin" "Bin desc" "LocationGroup" "LocationGroup desc" "LocationType2" "LocationType2 desc" "LocationType3" "LocationType3 desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "LocationNo" "LastActivityDate" "LocationUsage" "PerformPutaway" "Warehouse" "Bay" "LocRow" "Tier" "Bin" "LocationGroup" "LocationType2" "LocationType3"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ProductionLineRef" "LocationNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ProductionLineLocation
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ProductionLineLocation

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
Get entity from Reference_ProductionLineLocation by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string <= 5 characters
Example: It is a Text
ProductionLine
required
string <= 12 characters
Example: It is a Text
LocationNo
required
string <= 35 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "ProductionLine" "LocationNo" "LastActivityDate" "LocationUsage" "PerformPutaway" "Warehouse" "Bay" "LocRow" "Tier" "Bin" "LocationGroup" "LocationType2" "LocationType3"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ProductionLineRef" "LocationNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type ProductionLineLocation
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ProductionLineLocation(Contract='{Contract}',ProductionLine='{ProductionLine}',LocationNo='{LocationNo}')

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
"ProductionLine": "It is a Text",
"LocationNo": "It is a Text",
"LastActivityDate": "2019-10-10",
"PerformPutaway": true,
"Warehouse": "It is a Text",
"Bay": "It is a Text",
"LocRow": "It is a Text",
"Tier": "It is a Text",
"Bin": "It is a Text",
"LocationGroup": "It is a Text",
"LocationType2": "It is a Text",
"LocationType3": "It is a Text",
"LocationUsage": "Inbound"
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
Reference_InventoryProductCode
Reference Entity Set Reference_InventoryProductCode

Get entities from Reference_InventoryProductCode
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
Items Enum: "Objstate" "Objstate desc" "PartProductCode" "PartProductCode desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "PartProductCode" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryProductCode
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryProductCode

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
Get entity from Reference_InventoryProductCode by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartProductCode
required
string <= 5 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "PartProductCode" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type InventoryProductCode
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryProductCode(PartProductCode='{PartProductCode}')

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
"PartProductCode": "It is a Text",
"Description": "It is a Text",
"Objstate": "Active"
}
Reference_InventoryProductFamily
Reference Entity Set Reference_InventoryProductFamily

Get entities from Reference_InventoryProductFamily
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
Items Enum: "Objstate" "Objstate desc" "PartProductFamily" "PartProductFamily desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "PartProductFamily" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryProductFamily
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryProductFamily

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
Get entity from Reference_InventoryProductFamily by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartProductFamily
required
string <= 5 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "PartProductFamily" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type InventoryProductFamily
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryProductFamily(PartProductFamily='{PartProductFamily}')

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
"PartProductFamily": "It is a Text",
"Description": "It is a Text",
"Objstate": "Active"
}
Reference_AccountingGroup
Reference Entity Set Reference_AccountingGroup

Get entities from Reference_AccountingGroup
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
Items Enum: "Objstate" "Objstate desc" "AccountingGroup" "AccountingGroup desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "AccountingGroup" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array AccountingGroup
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_AccountingGroup

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
Get entity from Reference_AccountingGroup by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
AccountingGroup
required
string <= 5 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "AccountingGroup" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type AccountingGroup
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_AccountingGroup(AccountingGroup='{AccountingGroup}')

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
"AccountingGroup": "It is a Text",
"Description": "It is a Text",
"Objstate": "Active"
}
