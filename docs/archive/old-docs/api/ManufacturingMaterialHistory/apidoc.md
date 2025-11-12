
REST API Documentation
Search...
Lookup_IsoCountry_EntitySet
Lookup_IsoUnit_EntitySet
MaterialHistorys
Service Operations - Actions
Service Operations - Functions
Reference_UserAllowedSiteLov
Reference_InventoryPartLov2
Reference_InventoryTransactionHistQuery
Reference_MaterialHistory
Reference_HandlingUnit
Reference_ConditionCode
Reference_PersonInfo
Reference_ScrappingCause
Documentation Powered by Redocly
ManufacturingMaterialHistoryHandling (1)
API Class: Standard

[Terms of Service] (https://docs.ifs.com/policy/APIUsageCloud.pdf)

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
MaterialHistorys
Get entities from MaterialHistorys
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
Items Enum: "MaterialHistoryId" "MaterialHistoryId desc" "TransactionId" "TransactionId desc" "TimeStamp" "TimeStamp desc" "UserId" "UserId desc" "OrderRef1" "OrderRef1 desc" "OrderRef2" "OrderRef2 desc" "OrderRef3" "OrderRef3 desc" "OrderRef4" "OrderRef4 desc" "PartNo" "PartNo desc" "Contract" "Contract desc" "ConfigurationId" "ConfigurationId desc" "LocationNo" "LocationNo desc" "LotBatchNo" "LotBatchNo desc" "SerialNo" "SerialNo desc" "EngChgLevel" "EngChgLevel desc" "WaivDevRejNo" "WaivDevRejNo desc" "ActivitySeq" "ActivitySeq desc" "HandlingUnitId" "HandlingUnitId desc" "ExpectedPartNo" "ExpectedPartNo desc" "ConditionCode" "ConditionCode desc" "Ownership" "Ownership desc" "Owner" "Owner desc" "InventoryQty" "InventoryQty desc" "InventoryUom" "InventoryUom desc" "CatchQty" "CatchQty desc" "CatchUom" "CatchUom desc" "InputUomGroupId" "InputUomGroupId desc" "InputUom" "InputUom desc" "InputQty" "InputQty desc" "InputValue" "InputValue desc" "MaterialHistoryAction" "MaterialHistoryAction desc" "OrderType" "OrderType desc" "ReversedScrapQty" "ReversedScrapQty desc" "OperationNo" "OperationNo desc" "AssocMaterialHistId" "AssocMaterialHistId desc" "RejectReason" "RejectReason desc" "ReportPointId" "ReportPointId desc" "NoteText" "NoteText desc" "LineItemNo" "LineItemNo desc" "PartDescription" "PartDescription desc" "ExpectedPartDescription" "ExpectedPartDescription desc" "TypeDescription" "TypeDescription desc" "OwnerName" "OwnerName desc" "InventoryCost" "InventoryCost desc" "OrderTypeDb" "OrderTypeDb desc" "MaterialHistoryActionDb" "MaterialHistoryActionDb desc" "ExpirationDate" "ExpirationDate desc" "PerformedBy" "PerformedBy desc" "ReportPointDescription" "ReportPointDescription desc" "TopParentHandlingUnitID" "TopParentHandlingUnitID desc" "TopParentHUTypeID" "TopParentHUTypeID desc" "TopParentHUTypeDesc" "TopParentHUTypeDesc desc" "TopParentSSCC" "TopParentSSCC desc" "TopParentAltHandlingUnitLabelID" "TopParentAltHandlingUnitLabelID desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "MaterialHistoryId" "TransactionId" "TimeStamp" "UserId" "OrderRef1" "OrderRef2" "OrderRef3" "OrderRef4" "PartNo" "Contract" "ConfigurationId" "LocationNo" "LotBatchNo" "SerialNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "HandlingUnitId" "ExpectedPartNo" "ConditionCode" "Ownership" "Owner" "InventoryQty" "InventoryUom" "CatchQty" "CatchUom" "InputUomGroupId" "InputUom" "InputQty" "InputValue" "MaterialHistoryAction" "OrderType" "ReversedScrapQty" "OperationNo" "AssocMaterialHistId" "RejectReason" "ReportPointId" "NoteText" "LineItemNo" "PartDescription" "ExpectedPartDescription" "TypeDescription" "OwnerName" "InventoryCost" "OrderTypeDb" "MaterialHistoryActionDb" "ExpirationDate" "PerformedBy" "ReportPointDescription" "TopParentHandlingUnitID" "TopParentHUTypeID" "TopParentHUTypeDesc" "TopParentSSCC" "TopParentAltHandlingUnitLabelID"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "HandlingUnitRef" "ConditionCodeRef" "AssocMaterialHistIdRef" "PartNoRef" "ExpectedPartNoRef" "UserIdRef" "ContractRef" "RejectReasonRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array MaterialHistory
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialHistorys

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
Get entity from MaterialHistorys by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
MaterialHistoryId
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "MaterialHistoryId" "TransactionId" "TimeStamp" "UserId" "OrderRef1" "OrderRef2" "OrderRef3" "OrderRef4" "PartNo" "Contract" "ConfigurationId" "LocationNo" "LotBatchNo" "SerialNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "HandlingUnitId" "ExpectedPartNo" "ConditionCode" "Ownership" "Owner" "InventoryQty" "InventoryUom" "CatchQty" "CatchUom" "InputUomGroupId" "InputUom" "InputQty" "InputValue" "MaterialHistoryAction" "OrderType" "ReversedScrapQty" "OperationNo" "AssocMaterialHistId" "RejectReason" "ReportPointId" "NoteText" "LineItemNo" "PartDescription" "ExpectedPartDescription" "TypeDescription" "OwnerName" "InventoryCost" "OrderTypeDb" "MaterialHistoryActionDb" "ExpirationDate" "PerformedBy" "ReportPointDescription" "TopParentHandlingUnitID" "TopParentHUTypeID" "TopParentHUTypeDesc" "TopParentSSCC" "TopParentAltHandlingUnitLabelID"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "HandlingUnitRef" "ConditionCodeRef" "AssocMaterialHistIdRef" "PartNoRef" "ExpectedPartNoRef" "UserIdRef" "ContractRef" "RejectReasonRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type MaterialHistory
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialHistorys(MaterialHistoryId={MaterialHistoryId})

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
"MaterialHistoryId": 1,
"TransactionId": 1,
"TimeStamp": "2019-10-01T01:01:01Z",
"UserId": "It is a Text",
"OrderRef1": "It is a Text",
"OrderRef2": "It is a Text",
"OrderRef3": "It is a Text",
"OrderRef4": "It is a Text",
"PartNo": "It is a Text",
"Contract": "It is a Text",
"ConfigurationId": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"ExpectedPartNo": "It is a Text",
"ConditionCode": "It is a Text",
"Ownership": "It is a Text",
"Owner": "It is a Text",
"InventoryQty": 1,
"InventoryUom": "It is a Text",
"CatchQty": 1,
"CatchUom": "It is a Text",
"InputUomGroupId": "It is a Text",
"InputUom": "It is a Text",
"InputQty": 1,
"InputValue": "It is a Text",
"ReversedScrapQty": 1,
"OperationNo": 1,
"AssocMaterialHistId": 1,
"RejectReason": "It is a Text",
"ReportPointId": "It is a Text",
"NoteText": "It is a Text",
"LineItemNo": "It is a Text",
"PartDescription": "It is a Text",
"ExpectedPartDescription": "It is a Text",
"TypeDescription": "It is a Text",
"OwnerName": "It is a Text",
"InventoryCost": 1,
"OrderTypeDb": "It is a Text",
"MaterialHistoryActionDb": "It is a Text",
"ExpirationDate": "2019-10-10",
"PerformedBy": "It is a Text",
"ReportPointDescription": "It is a Text",
"TopParentHandlingUnitID": "It is a Text",
"TopParentHUTypeID": "It is a Text",
"TopParentHUTypeDesc": "It is a Text",
"TopParentSSCC": "It is a Text",
"TopParentAltHandlingUnitLabelID": "It is a Text",
"MaterialHistoryAction": "IssueMaterial",
"OrderType": "CustomerOrder"
}
Invoke function DefaultCopy
Authorizations:
(OpenIdbasicAuth)
path Parameters
MaterialHistoryId
required
number
Example: 1
query Parameters
@CopyValues
required
object (MaterialHistoryCopyValues)
$select	
Array of strings unique
Items Enum: "luname" "keyref" "MaterialHistoryId" "TransactionId" "TimeStamp" "UserId" "OrderRef1" "OrderRef2" "OrderRef3" "OrderRef4" "PartNo" "Contract" "ConfigurationId" "LocationNo" "LotBatchNo" "SerialNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "HandlingUnitId" "ExpectedPartNo" "ConditionCode" "Ownership" "Owner" "InventoryQty" "InventoryUom" "CatchQty" "CatchUom" "InputUomGroupId" "InputUom" "InputQty" "InputValue" "MaterialHistoryAction" "OrderType" "ReversedScrapQty" "OperationNo" "AssocMaterialHistId" "RejectReason" "ReportPointId" "NoteText" "LineItemNo" "PartDescription" "ExpectedPartDescription" "TypeDescription" "OwnerName" "InventoryCost" "OrderTypeDb" "MaterialHistoryActionDb" "ExpirationDate" "PerformedBy" "ReportPointDescription" "TopParentHandlingUnitID" "TopParentHUTypeID" "TopParentHUTypeDesc" "TopParentSSCC" "TopParentAltHandlingUnitLabelID"
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
/MaterialHistorys(MaterialHistoryId={MaterialHistoryId})/IfsApp.ManufacturingMaterialHistoryHandling.MaterialHistory_DefaultCopy(CopyValues=@CopyValues)

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
"MaterialHistoryId": 1,
"TransactionId": 1,
"TimeStamp": "2019-10-01T01:01:01Z",
"UserId": "It is a Text",
"OrderRef1": "It is a Text",
"OrderRef2": "It is a Text",
"OrderRef3": "It is a Text",
"OrderRef4": "It is a Text",
"PartNo": "It is a Text",
"Contract": "It is a Text",
"ConfigurationId": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"ExpectedPartNo": "It is a Text",
"ConditionCode": "It is a Text",
"Ownership": "It is a Text",
"Owner": "It is a Text",
"InventoryQty": 1,
"InventoryUom": "It is a Text",
"CatchQty": 1,
"CatchUom": "It is a Text",
"InputUomGroupId": "It is a Text",
"InputUom": "It is a Text",
"InputQty": 1,
"InputValue": "It is a Text",
"ReversedScrapQty": 1,
"OperationNo": 1,
"AssocMaterialHistId": 1,
"RejectReason": "It is a Text",
"ReportPointId": "It is a Text",
"NoteText": "It is a Text",
"LineItemNo": "It is a Text",
"PartDescription": "It is a Text",
"ExpectedPartDescription": "It is a Text",
"TypeDescription": "It is a Text",
"OwnerName": "It is a Text",
"InventoryCost": 1,
"OrderTypeDb": "It is a Text",
"MaterialHistoryActionDb": "It is a Text",
"ExpirationDate": "2019-10-10",
"PerformedBy": "It is a Text",
"ReportPointDescription": "It is a Text",
"TopParentHandlingUnitID": "It is a Text",
"TopParentHUTypeID": "It is a Text",
"TopParentHUTypeDesc": "It is a Text",
"TopParentSSCC": "It is a Text",
"TopParentAltHandlingUnitLabelID": "It is a Text",
"MaterialHistoryAction": "IssueMaterial",
"OrderType": "CustomerOrder"
}
Get entities from HandlingUnitRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
MaterialHistoryId
required
number
Example: 1
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
Items Enum: "HandlingUnitId" "HandlingUnitId desc" "HandlingUnitTypeId" "HandlingUnitTypeId desc" "ParentHandlingUnitId" "ParentHandlingUnitId desc" "ShipmentId" "ShipmentId desc" "Width" "Width desc" "Height" "Height desc" "UomForLength" "UomForLength desc" "ManualTareWeight" "ManualTareWeight desc" "ManualGrossWeight" "ManualGrossWeight desc" "GenerateSsccNo" "GenerateSsccNo desc" "PrintLabel" "PrintLabel desc" "PrintContentLabel" "PrintContentLabel desc" "PrintShipmentLabel" "PrintShipmentLabel desc" "MixOfPartNoBlocked" "MixOfPartNoBlocked desc" "MixOfLotBatchBlocked" "MixOfLotBatchBlocked desc" "MixOfCondCodeBlocked" "MixOfCondCodeBlocked desc" "ManualVolume" "ManualVolume desc" "Sscc" "Sscc desc" "AltHandlingUnitLabelId" "AltHandlingUnitLabelId desc" "Depth" "Depth desc" "NoOfHandlingUnitLabels" "NoOfHandlingUnitLabels desc" "NoOfContentLabels" "NoOfContentLabels desc" "NoOfShipmentLabels" "NoOfShipmentLabels desc" "Contract" "Contract desc" "LocationNo" "LocationNo desc" "LocationType" "LocationType desc" "SourceRefType" "SourceRefType desc" "SourceRef1" "SourceRef1 desc" "SourceRef2" "SourceRef2 desc" "SourceRef3" "SourceRef3 desc" "SourceRefPartQty" "SourceRefPartQty desc" "HasStockReservation" "HasStockReservation desc" "NoteId" "NoteId desc" "NoteText" "NoteText desc" "IsInStock" "IsInStock desc" "PackagingMtrlIssTranId" "PackagingMtrlIssTranId desc" "HasBeenInStock" "HasBeenInStock desc" "PkgMtrlUsageConfirmed" "PkgMtrlUsageConfirmed desc" "PackagingMtrlStatus" "PackagingMtrlStatus desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "HandlingUnitId" "HandlingUnitTypeId" "ParentHandlingUnitId" "ShipmentId" "Width" "Height" "UomForLength" "ManualTareWeight" "ManualGrossWeight" "GenerateSsccNo" "PrintLabel" "PrintContentLabel" "PrintShipmentLabel" "MixOfPartNoBlocked" "MixOfLotBatchBlocked" "MixOfCondCodeBlocked" "ManualVolume" "Sscc" "AltHandlingUnitLabelId" "Depth" "NoOfHandlingUnitLabels" "NoOfContentLabels" "NoOfShipmentLabels" "Contract" "LocationNo" "LocationType" "SourceRefType" "SourceRef1" "SourceRef2" "SourceRef3" "SourceRefPartQty" "HasStockReservation" "NoteId" "NoteText" "IsInStock" "PackagingMtrlIssTranId" "HasBeenInStock" "PkgMtrlUsageConfirmed" "PackagingMtrlStatus"
Specify properties to return, see OData Select

Responses
200 response body for entity array HandlingUnit
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialHistorys(MaterialHistoryId={MaterialHistoryId})/HandlingUnitRef

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
Get entities from ConditionCodeRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
MaterialHistoryId
required
number
Example: 1
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
Items Enum: "ConditionCode" "ConditionCode desc" "Description" "Description desc" "NoteText" "NoteText desc" "ConditionCodeType" "ConditionCodeType desc" "DefaultAvailControlId" "DefaultAvailControlId desc" "ResetRepairValue" "ResetRepairValue desc" "ResetOverhaulValue" "ResetOverhaulValue desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ConditionCode" "Description" "NoteText" "ConditionCodeType" "DefaultAvailControlId" "ResetRepairValue" "ResetOverhaulValue"
Specify properties to return, see OData Select

Responses
200 response body for entity array ConditionCode
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialHistorys(MaterialHistoryId={MaterialHistoryId})/ConditionCodeRef

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
Get entities from AssocMaterialHistIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
MaterialHistoryId
required
number
Example: 1
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
Items Enum: "MaterialHistoryId" "MaterialHistoryId desc" "TransactionId" "TransactionId desc" "TimeStamp" "TimeStamp desc" "UserId" "UserId desc" "OrderRef1" "OrderRef1 desc" "OrderRef2" "OrderRef2 desc" "OrderRef3" "OrderRef3 desc" "OrderRef4" "OrderRef4 desc" "PartNo" "PartNo desc" "Contract" "Contract desc" "ConfigurationId" "ConfigurationId desc" "LocationNo" "LocationNo desc" "LotBatchNo" "LotBatchNo desc" "SerialNo" "SerialNo desc" "EngChgLevel" "EngChgLevel desc" "WaivDevRejNo" "WaivDevRejNo desc" "ActivitySeq" "ActivitySeq desc" "HandlingUnitId" "HandlingUnitId desc" "ExpectedPartNo" "ExpectedPartNo desc" "ConditionCode" "ConditionCode desc" "Ownership" "Ownership desc" "Owner" "Owner desc" "InventoryQty" "InventoryQty desc" "InventoryUom" "InventoryUom desc" "CatchQty" "CatchQty desc" "CatchUom" "CatchUom desc" "InputUomGroupId" "InputUomGroupId desc" "InputUom" "InputUom desc" "InputQty" "InputQty desc" "InputValue" "InputValue desc" "MaterialHistoryAction" "MaterialHistoryAction desc" "OrderType" "OrderType desc" "ReversedScrapQty" "ReversedScrapQty desc" "OperationNo" "OperationNo desc" "AssocMaterialHistId" "AssocMaterialHistId desc" "RejectReason" "RejectReason desc" "ReportPointId" "ReportPointId desc" "NoteText" "NoteText desc" "LineItemNo" "LineItemNo desc" "PartDescription" "PartDescription desc" "ExpectedPartDescription" "ExpectedPartDescription desc" "TypeDescription" "TypeDescription desc" "OwnerName" "OwnerName desc" "InventoryCost" "InventoryCost desc" "OrderTypeDb" "OrderTypeDb desc" "MaterialHistoryActionDb" "MaterialHistoryActionDb desc" "ExpirationDate" "ExpirationDate desc" "PerformedBy" "PerformedBy desc" "ReportPointDescription" "ReportPointDescription desc" "TopParentHandlingUnitID" "TopParentHandlingUnitID desc" "TopParentHUTypeID" "TopParentHUTypeID desc" "TopParentHUTypeDesc" "TopParentHUTypeDesc desc" "TopParentSSCC" "TopParentSSCC desc" "TopParentAltHandlingUnitLabelID" "TopParentAltHandlingUnitLabelID desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "MaterialHistoryId" "TransactionId" "TimeStamp" "UserId" "OrderRef1" "OrderRef2" "OrderRef3" "OrderRef4" "PartNo" "Contract" "ConfigurationId" "LocationNo" "LotBatchNo" "SerialNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "HandlingUnitId" "ExpectedPartNo" "ConditionCode" "Ownership" "Owner" "InventoryQty" "InventoryUom" "CatchQty" "CatchUom" "InputUomGroupId" "InputUom" "InputQty" "InputValue" "MaterialHistoryAction" "OrderType" "ReversedScrapQty" "OperationNo" "AssocMaterialHistId" "RejectReason" "ReportPointId" "NoteText" "LineItemNo" "PartDescription" "ExpectedPartDescription" "TypeDescription" "OwnerName" "InventoryCost" "OrderTypeDb" "MaterialHistoryActionDb" "ExpirationDate" "PerformedBy" "ReportPointDescription" "TopParentHandlingUnitID" "TopParentHUTypeID" "TopParentHUTypeDesc" "TopParentSSCC" "TopParentAltHandlingUnitLabelID"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "HandlingUnitRef" "ConditionCodeRef" "AssocMaterialHistIdRef" "PartNoRef" "ExpectedPartNoRef" "UserIdRef" "ContractRef" "RejectReasonRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array MaterialHistory
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialHistorys(MaterialHistoryId={MaterialHistoryId})/AssocMaterialHistIdRef

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
MaterialHistoryId
required
number
Example: 1
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "Description" "Description desc" "TypeCode" "TypeCode desc" "UnitMeas" "UnitMeas desc" "PlannerBuyer" "PlannerBuyer desc" "PartStatus" "PartStatus desc" "PartProductFamily" "PartProductFamily desc" "PartProductCode" "PartProductCode desc" "LeadTimeCode" "LeadTimeCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description" "TypeCode" "UnitMeas" "PlannerBuyer" "PartStatus" "PartProductFamily" "PartProductCode" "LeadTimeCode"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryPartLov2
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialHistorys(MaterialHistoryId={MaterialHistoryId})/PartNoRef

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
Get entities from ExpectedPartNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
MaterialHistoryId
required
number
Example: 1
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
Items Enum: "MaterialHistoryId" "MaterialHistoryId desc" "TransactionId" "TransactionId desc" "TimeStamp" "TimeStamp desc" "UserId" "UserId desc" "OrderRef1" "OrderRef1 desc" "OrderRef2" "OrderRef2 desc" "OrderRef3" "OrderRef3 desc" "OrderRef4" "OrderRef4 desc" "PartNo" "PartNo desc" "Contract" "Contract desc" "ConfigurationId" "ConfigurationId desc" "LocationNo" "LocationNo desc" "LotBatchNo" "LotBatchNo desc" "SerialNo" "SerialNo desc" "EngChgLevel" "EngChgLevel desc" "WaivDevRejNo" "WaivDevRejNo desc" "ActivitySeq" "ActivitySeq desc" "HandlingUnitId" "HandlingUnitId desc" "ExpectedPartNo" "ExpectedPartNo desc" "ConditionCode" "ConditionCode desc" "Ownership" "Ownership desc" "Owner" "Owner desc" "InventoryQty" "InventoryQty desc" "InventoryUom" "InventoryUom desc" "CatchQty" "CatchQty desc" "CatchUom" "CatchUom desc" "InputUomGroupId" "InputUomGroupId desc" "InputUom" "InputUom desc" "InputQty" "InputQty desc" "InputValue" "InputValue desc" "MaterialHistoryAction" "MaterialHistoryAction desc" "OrderType" "OrderType desc" "ReversedScrapQty" "ReversedScrapQty desc" "OperationNo" "OperationNo desc" "AssocMaterialHistId" "AssocMaterialHistId desc" "RejectReason" "RejectReason desc" "ReportPointId" "ReportPointId desc" "NoteText" "NoteText desc" "LineItemNo" "LineItemNo desc" "PartDescription" "PartDescription desc" "ExpectedPartDescription" "ExpectedPartDescription desc" "TypeDescription" "TypeDescription desc" "OwnerName" "OwnerName desc" "InventoryCost" "InventoryCost desc" "OrderTypeDb" "OrderTypeDb desc" "MaterialHistoryActionDb" "MaterialHistoryActionDb desc" "ExpirationDate" "ExpirationDate desc" "PerformedBy" "PerformedBy desc" "ReportPointDescription" "ReportPointDescription desc" "TopParentHandlingUnitID" "TopParentHandlingUnitID desc" "TopParentHUTypeID" "TopParentHUTypeID desc" "TopParentHUTypeDesc" "TopParentHUTypeDesc desc" "TopParentSSCC" "TopParentSSCC desc" "TopParentAltHandlingUnitLabelID" "TopParentAltHandlingUnitLabelID desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "MaterialHistoryId" "TransactionId" "TimeStamp" "UserId" "OrderRef1" "OrderRef2" "OrderRef3" "OrderRef4" "PartNo" "Contract" "ConfigurationId" "LocationNo" "LotBatchNo" "SerialNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "HandlingUnitId" "ExpectedPartNo" "ConditionCode" "Ownership" "Owner" "InventoryQty" "InventoryUom" "CatchQty" "CatchUom" "InputUomGroupId" "InputUom" "InputQty" "InputValue" "MaterialHistoryAction" "OrderType" "ReversedScrapQty" "OperationNo" "AssocMaterialHistId" "RejectReason" "ReportPointId" "NoteText" "LineItemNo" "PartDescription" "ExpectedPartDescription" "TypeDescription" "OwnerName" "InventoryCost" "OrderTypeDb" "MaterialHistoryActionDb" "ExpirationDate" "PerformedBy" "ReportPointDescription" "TopParentHandlingUnitID" "TopParentHUTypeID" "TopParentHUTypeDesc" "TopParentSSCC" "TopParentAltHandlingUnitLabelID"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "HandlingUnitRef" "ConditionCodeRef" "AssocMaterialHistIdRef" "PartNoRef" "ExpectedPartNoRef" "UserIdRef" "ContractRef" "RejectReasonRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array MaterialHistory
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialHistorys(MaterialHistoryId={MaterialHistoryId})/ExpectedPartNoRef

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
Get entities from UserIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
MaterialHistoryId
required
number
Example: 1
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
Items Enum: "Objstate" "Objstate desc" "PersonId" "PersonId desc" "Name" "Name desc" "FirstName" "FirstName desc" "MiddleName" "MiddleName desc" "Prefix" "Prefix desc" "LastName" "LastName desc" "AlternativeName" "AlternativeName desc" "BirthName" "BirthName desc" "Alias" "Alias desc" "Initials" "Initials desc" "Title" "Title desc" "JobTitle" "JobTitle desc" "CreationDate" "CreationDate desc" "Party" "Party desc" "PictureId" "PictureId desc" "Protected" "Protected desc" "DefaultDomain" "DefaultDomain desc" "Country" "Country desc" "DefaultLanguage" "DefaultLanguage desc" "PartyType" "PartyType desc" "UserId" "UserId desc" "PictureThumbnailId" "PictureThumbnailId desc" "Inactive" "Inactive desc" "ContactCustomers" "ContactCustomers desc" "ContactSuppliers" "ContactSuppliers desc" "CustomerContact" "CustomerContact desc" "BlockedForUse" "BlockedForUse desc" "UpdateConBlockForCrmObjs" "UpdateConBlockForCrmObjs desc" "SupplierContact" "SupplierContact desc" "BlockedForUseSupplier" "BlockedForUseSupplier desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "PersonId" "Name" "FirstName" "MiddleName" "Prefix" "LastName" "AlternativeName" "BirthName" "Alias" "Initials" "Title" "JobTitle" "CreationDate" "Party" "PictureId" "Protected" "DefaultDomain" "Country" "DefaultLanguage" "PartyType" "UserId" "PictureThumbnailId" "Inactive" "ContactCustomers" "ContactSuppliers" "CustomerContact" "BlockedForUse" "UpdateConBlockForCrmObjs" "SupplierContact" "BlockedForUseSupplier"
Specify properties to return, see OData Select

Responses
200 response body for entity array PersonInfo
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialHistorys(MaterialHistoryId={MaterialHistoryId})/UserIdRef

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
MaterialHistoryId
required
number
Example: 1
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
/MaterialHistorys(MaterialHistoryId={MaterialHistoryId})/ContractRef

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
Get entities from RejectReasonRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
MaterialHistoryId
required
number
Example: 1
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
Items Enum: "Objstate" "Objstate desc" "RejectReason" "RejectReason desc" "RejectMessage" "RejectMessage desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "RejectReason" "RejectMessage"
Specify properties to return, see OData Select

Responses
200 response body for entity array ScrappingCause
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialHistorys(MaterialHistoryId={MaterialHistoryId})/RejectReasonRef

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
Reference_InventoryPartLov2
Reference Entity Set Reference_InventoryPartLov2

Get entities from Reference_InventoryPartLov2
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "Description" "Description desc" "TypeCode" "TypeCode desc" "UnitMeas" "UnitMeas desc" "PlannerBuyer" "PlannerBuyer desc" "PartStatus" "PartStatus desc" "PartProductFamily" "PartProductFamily desc" "PartProductCode" "PartProductCode desc" "LeadTimeCode" "LeadTimeCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description" "TypeCode" "UnitMeas" "PlannerBuyer" "PartStatus" "PartProductFamily" "PartProductCode" "LeadTimeCode"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryPartLov2
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryPartLov2

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
Get entity from Reference_InventoryPartLov2 by key
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
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description" "TypeCode" "UnitMeas" "PlannerBuyer" "PartStatus" "PartProductFamily" "PartProductCode" "LeadTimeCode"
Specify properties to return, see OData Select

Responses
200 response body for entity type InventoryPartLov2
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryPartLov2(Contract='{Contract}',PartNo='{PartNo}')

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
"UnitMeas": "It is a Text",
"PlannerBuyer": "It is a Text",
"PartStatus": "It is a Text",
"PartProductFamily": "It is a Text",
"PartProductCode": "It is a Text",
"TypeCode": "Manufactured",
"LeadTimeCode": "Manufactured"
}
Reference_InventoryTransactionHistQuery
Reference Entity Set Reference_InventoryTransactionHistQuery

Get entities from Reference_InventoryTransactionHistQuery
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
Items Enum: "TransactionId" "TransactionId desc" "ExpirationDate" "ExpirationDate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "TransactionId" "ExpirationDate"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryTransactionHistQuery
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryTransactionHistQuery

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
Get entity from Reference_InventoryTransactionHistQuery by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
TransactionId
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "TransactionId" "ExpirationDate"
Specify properties to return, see OData Select

Responses
200 response body for entity type InventoryTransactionHistQuery
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryTransactionHistQuery(TransactionId={TransactionId})

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"TransactionId": 1,
"ExpirationDate": "2019-10-10"
}
Reference_MaterialHistory
Reference Entity Set Reference_MaterialHistory

Get entities from Reference_MaterialHistory
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
Items Enum: "MaterialHistoryId" "MaterialHistoryId desc" "TransactionId" "TransactionId desc" "TimeStamp" "TimeStamp desc" "UserId" "UserId desc" "OrderRef1" "OrderRef1 desc" "OrderRef2" "OrderRef2 desc" "OrderRef3" "OrderRef3 desc" "OrderRef4" "OrderRef4 desc" "PartNo" "PartNo desc" "Contract" "Contract desc" "ConfigurationId" "ConfigurationId desc" "LocationNo" "LocationNo desc" "LotBatchNo" "LotBatchNo desc" "SerialNo" "SerialNo desc" "EngChgLevel" "EngChgLevel desc" "WaivDevRejNo" "WaivDevRejNo desc" "ActivitySeq" "ActivitySeq desc" "HandlingUnitId" "HandlingUnitId desc" "ExpectedPartNo" "ExpectedPartNo desc" "ConditionCode" "ConditionCode desc" "Ownership" "Ownership desc" "Owner" "Owner desc" "InventoryQty" "InventoryQty desc" "InventoryUom" "InventoryUom desc" "CatchQty" "CatchQty desc" "CatchUom" "CatchUom desc" "InputUomGroupId" "InputUomGroupId desc" "InputUom" "InputUom desc" "InputQty" "InputQty desc" "InputValue" "InputValue desc" "MaterialHistoryAction" "MaterialHistoryAction desc" "OrderType" "OrderType desc" "ReversedScrapQty" "ReversedScrapQty desc" "OperationNo" "OperationNo desc" "AssocMaterialHistId" "AssocMaterialHistId desc" "RejectReason" "RejectReason desc" "ReportPointId" "ReportPointId desc" "NoteText" "NoteText desc" "LineItemNo" "LineItemNo desc" "PartDescription" "PartDescription desc" "ExpectedPartDescription" "ExpectedPartDescription desc" "TypeDescription" "TypeDescription desc" "OwnerName" "OwnerName desc" "InventoryCost" "InventoryCost desc" "OrderTypeDb" "OrderTypeDb desc" "MaterialHistoryActionDb" "MaterialHistoryActionDb desc" "ExpirationDate" "ExpirationDate desc" "PerformedBy" "PerformedBy desc" "ReportPointDescription" "ReportPointDescription desc" "TopParentHandlingUnitID" "TopParentHandlingUnitID desc" "TopParentHUTypeID" "TopParentHUTypeID desc" "TopParentHUTypeDesc" "TopParentHUTypeDesc desc" "TopParentSSCC" "TopParentSSCC desc" "TopParentAltHandlingUnitLabelID" "TopParentAltHandlingUnitLabelID desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "MaterialHistoryId" "TransactionId" "TimeStamp" "UserId" "OrderRef1" "OrderRef2" "OrderRef3" "OrderRef4" "PartNo" "Contract" "ConfigurationId" "LocationNo" "LotBatchNo" "SerialNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "HandlingUnitId" "ExpectedPartNo" "ConditionCode" "Ownership" "Owner" "InventoryQty" "InventoryUom" "CatchQty" "CatchUom" "InputUomGroupId" "InputUom" "InputQty" "InputValue" "MaterialHistoryAction" "OrderType" "ReversedScrapQty" "OperationNo" "AssocMaterialHistId" "RejectReason" "ReportPointId" "NoteText" "LineItemNo" "PartDescription" "ExpectedPartDescription" "TypeDescription" "OwnerName" "InventoryCost" "OrderTypeDb" "MaterialHistoryActionDb" "ExpirationDate" "PerformedBy" "ReportPointDescription" "TopParentHandlingUnitID" "TopParentHUTypeID" "TopParentHUTypeDesc" "TopParentSSCC" "TopParentAltHandlingUnitLabelID"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "HandlingUnitRef" "ConditionCodeRef" "AssocMaterialHistIdRef" "PartNoRef" "ExpectedPartNoRef" "UserIdRef" "ContractRef" "RejectReasonRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array MaterialHistory
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_MaterialHistory

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
Get entity from Reference_MaterialHistory by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
MaterialHistoryId
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "MaterialHistoryId" "TransactionId" "TimeStamp" "UserId" "OrderRef1" "OrderRef2" "OrderRef3" "OrderRef4" "PartNo" "Contract" "ConfigurationId" "LocationNo" "LotBatchNo" "SerialNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "HandlingUnitId" "ExpectedPartNo" "ConditionCode" "Ownership" "Owner" "InventoryQty" "InventoryUom" "CatchQty" "CatchUom" "InputUomGroupId" "InputUom" "InputQty" "InputValue" "MaterialHistoryAction" "OrderType" "ReversedScrapQty" "OperationNo" "AssocMaterialHistId" "RejectReason" "ReportPointId" "NoteText" "LineItemNo" "PartDescription" "ExpectedPartDescription" "TypeDescription" "OwnerName" "InventoryCost" "OrderTypeDb" "MaterialHistoryActionDb" "ExpirationDate" "PerformedBy" "ReportPointDescription" "TopParentHandlingUnitID" "TopParentHUTypeID" "TopParentHUTypeDesc" "TopParentSSCC" "TopParentAltHandlingUnitLabelID"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "HandlingUnitRef" "ConditionCodeRef" "AssocMaterialHistIdRef" "PartNoRef" "ExpectedPartNoRef" "UserIdRef" "ContractRef" "RejectReasonRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type MaterialHistory
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_MaterialHistory(MaterialHistoryId={MaterialHistoryId})

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
"MaterialHistoryId": 1,
"TransactionId": 1,
"TimeStamp": "2019-10-01T01:01:01Z",
"UserId": "It is a Text",
"OrderRef1": "It is a Text",
"OrderRef2": "It is a Text",
"OrderRef3": "It is a Text",
"OrderRef4": "It is a Text",
"PartNo": "It is a Text",
"Contract": "It is a Text",
"ConfigurationId": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"ExpectedPartNo": "It is a Text",
"ConditionCode": "It is a Text",
"Ownership": "It is a Text",
"Owner": "It is a Text",
"InventoryQty": 1,
"InventoryUom": "It is a Text",
"CatchQty": 1,
"CatchUom": "It is a Text",
"InputUomGroupId": "It is a Text",
"InputUom": "It is a Text",
"InputQty": 1,
"InputValue": "It is a Text",
"ReversedScrapQty": 1,
"OperationNo": 1,
"AssocMaterialHistId": 1,
"RejectReason": "It is a Text",
"ReportPointId": "It is a Text",
"NoteText": "It is a Text",
"LineItemNo": "It is a Text",
"PartDescription": "It is a Text",
"ExpectedPartDescription": "It is a Text",
"TypeDescription": "It is a Text",
"OwnerName": "It is a Text",
"InventoryCost": 1,
"OrderTypeDb": "It is a Text",
"MaterialHistoryActionDb": "It is a Text",
"ExpirationDate": "2019-10-10",
"PerformedBy": "It is a Text",
"ReportPointDescription": "It is a Text",
"TopParentHandlingUnitID": "It is a Text",
"TopParentHUTypeID": "It is a Text",
"TopParentHUTypeDesc": "It is a Text",
"TopParentSSCC": "It is a Text",
"TopParentAltHandlingUnitLabelID": "It is a Text",
"MaterialHistoryAction": "IssueMaterial",
"OrderType": "CustomerOrder"
}
Reference_HandlingUnit
Reference Entity Set Reference_HandlingUnit

Get entities from Reference_HandlingUnit
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
Items Enum: "HandlingUnitId" "HandlingUnitId desc" "HandlingUnitTypeId" "HandlingUnitTypeId desc" "ParentHandlingUnitId" "ParentHandlingUnitId desc" "ShipmentId" "ShipmentId desc" "Width" "Width desc" "Height" "Height desc" "UomForLength" "UomForLength desc" "ManualTareWeight" "ManualTareWeight desc" "ManualGrossWeight" "ManualGrossWeight desc" "GenerateSsccNo" "GenerateSsccNo desc" "PrintLabel" "PrintLabel desc" "PrintContentLabel" "PrintContentLabel desc" "PrintShipmentLabel" "PrintShipmentLabel desc" "MixOfPartNoBlocked" "MixOfPartNoBlocked desc" "MixOfLotBatchBlocked" "MixOfLotBatchBlocked desc" "MixOfCondCodeBlocked" "MixOfCondCodeBlocked desc" "ManualVolume" "ManualVolume desc" "Sscc" "Sscc desc" "AltHandlingUnitLabelId" "AltHandlingUnitLabelId desc" "Depth" "Depth desc" "NoOfHandlingUnitLabels" "NoOfHandlingUnitLabels desc" "NoOfContentLabels" "NoOfContentLabels desc" "NoOfShipmentLabels" "NoOfShipmentLabels desc" "Contract" "Contract desc" "LocationNo" "LocationNo desc" "LocationType" "LocationType desc" "SourceRefType" "SourceRefType desc" "SourceRef1" "SourceRef1 desc" "SourceRef2" "SourceRef2 desc" "SourceRef3" "SourceRef3 desc" "SourceRefPartQty" "SourceRefPartQty desc" "HasStockReservation" "HasStockReservation desc" "NoteId" "NoteId desc" "NoteText" "NoteText desc" "IsInStock" "IsInStock desc" "PackagingMtrlIssTranId" "PackagingMtrlIssTranId desc" "HasBeenInStock" "HasBeenInStock desc" "PkgMtrlUsageConfirmed" "PkgMtrlUsageConfirmed desc" "PackagingMtrlStatus" "PackagingMtrlStatus desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "HandlingUnitId" "HandlingUnitTypeId" "ParentHandlingUnitId" "ShipmentId" "Width" "Height" "UomForLength" "ManualTareWeight" "ManualGrossWeight" "GenerateSsccNo" "PrintLabel" "PrintContentLabel" "PrintShipmentLabel" "MixOfPartNoBlocked" "MixOfLotBatchBlocked" "MixOfCondCodeBlocked" "ManualVolume" "Sscc" "AltHandlingUnitLabelId" "Depth" "NoOfHandlingUnitLabels" "NoOfContentLabels" "NoOfShipmentLabels" "Contract" "LocationNo" "LocationType" "SourceRefType" "SourceRef1" "SourceRef2" "SourceRef3" "SourceRefPartQty" "HasStockReservation" "NoteId" "NoteText" "IsInStock" "PackagingMtrlIssTranId" "HasBeenInStock" "PkgMtrlUsageConfirmed" "PackagingMtrlStatus"
Specify properties to return, see OData Select

Responses
200 response body for entity array HandlingUnit
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_HandlingUnit

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
Get entity from Reference_HandlingUnit by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
HandlingUnitId
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "HandlingUnitId" "HandlingUnitTypeId" "ParentHandlingUnitId" "ShipmentId" "Width" "Height" "UomForLength" "ManualTareWeight" "ManualGrossWeight" "GenerateSsccNo" "PrintLabel" "PrintContentLabel" "PrintShipmentLabel" "MixOfPartNoBlocked" "MixOfLotBatchBlocked" "MixOfCondCodeBlocked" "ManualVolume" "Sscc" "AltHandlingUnitLabelId" "Depth" "NoOfHandlingUnitLabels" "NoOfContentLabels" "NoOfShipmentLabels" "Contract" "LocationNo" "LocationType" "SourceRefType" "SourceRef1" "SourceRef2" "SourceRef3" "SourceRefPartQty" "HasStockReservation" "NoteId" "NoteText" "IsInStock" "PackagingMtrlIssTranId" "HasBeenInStock" "PkgMtrlUsageConfirmed" "PackagingMtrlStatus"
Specify properties to return, see OData Select

Responses
200 response body for entity type HandlingUnit
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_HandlingUnit(HandlingUnitId={HandlingUnitId})

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
"HandlingUnitId": 1,
"HandlingUnitTypeId": "It is a Text",
"ParentHandlingUnitId": 1,
"ShipmentId": 1,
"Width": 1,
"Height": 1,
"UomForLength": "It is a Text",
"ManualTareWeight": 1,
"ManualGrossWeight": 1,
"GenerateSsccNo": true,
"PrintLabel": true,
"PrintContentLabel": true,
"PrintShipmentLabel": true,
"MixOfPartNoBlocked": true,
"MixOfLotBatchBlocked": true,
"MixOfCondCodeBlocked": true,
"ManualVolume": 1,
"Sscc": "It is a Text",
"AltHandlingUnitLabelId": "It is a Text",
"Depth": 1,
"NoOfHandlingUnitLabels": 1,
"NoOfContentLabels": 1,
"NoOfShipmentLabels": 1,
"Contract": "It is a Text",
"LocationNo": "It is a Text",
"SourceRef1": "It is a Text",
"SourceRef2": "It is a Text",
"SourceRef3": "It is a Text",
"SourceRefPartQty": 1,
"HasStockReservation": true,
"NoteId": 1,
"NoteText": "It is a Text",
"IsInStock": true,
"PackagingMtrlIssTranId": 1,
"HasBeenInStock": true,
"PkgMtrlUsageConfirmed": true,
"PackagingMtrlStatus": "It is a Text",
"LocationType": "Picking",
"SourceRefType": "ShopOrder"
}
Reference_ConditionCode
Reference Entity Set Reference_ConditionCode

Get entities from Reference_ConditionCode
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
Items Enum: "ConditionCode" "ConditionCode desc" "Description" "Description desc" "NoteText" "NoteText desc" "ConditionCodeType" "ConditionCodeType desc" "DefaultAvailControlId" "DefaultAvailControlId desc" "ResetRepairValue" "ResetRepairValue desc" "ResetOverhaulValue" "ResetOverhaulValue desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ConditionCode" "Description" "NoteText" "ConditionCodeType" "DefaultAvailControlId" "ResetRepairValue" "ResetOverhaulValue"
Specify properties to return, see OData Select

Responses
200 response body for entity array ConditionCode
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ConditionCode

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
Get entity from Reference_ConditionCode by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
ConditionCode
required
string <= 10 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "ConditionCode" "Description" "NoteText" "ConditionCodeType" "DefaultAvailControlId" "ResetRepairValue" "ResetOverhaulValue"
Specify properties to return, see OData Select

Responses
200 response body for entity type ConditionCode
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ConditionCode(ConditionCode='{ConditionCode}')

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
"ConditionCode": "It is a Text",
"Description": "It is a Text",
"NoteText": "It is a Text",
"DefaultAvailControlId": "It is a Text",
"ResetRepairValue": true,
"ResetOverhaulValue": true,
"ConditionCodeType": "DefaultConditionCode"
}
Reference_PersonInfo
Reference Entity Set Reference_PersonInfo

Get entities from Reference_PersonInfo
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
Items Enum: "Objstate" "Objstate desc" "PersonId" "PersonId desc" "Name" "Name desc" "FirstName" "FirstName desc" "MiddleName" "MiddleName desc" "Prefix" "Prefix desc" "LastName" "LastName desc" "AlternativeName" "AlternativeName desc" "BirthName" "BirthName desc" "Alias" "Alias desc" "Initials" "Initials desc" "Title" "Title desc" "JobTitle" "JobTitle desc" "CreationDate" "CreationDate desc" "Party" "Party desc" "PictureId" "PictureId desc" "Protected" "Protected desc" "DefaultDomain" "DefaultDomain desc" "Country" "Country desc" "DefaultLanguage" "DefaultLanguage desc" "PartyType" "PartyType desc" "UserId" "UserId desc" "PictureThumbnailId" "PictureThumbnailId desc" "Inactive" "Inactive desc" "ContactCustomers" "ContactCustomers desc" "ContactSuppliers" "ContactSuppliers desc" "CustomerContact" "CustomerContact desc" "BlockedForUse" "BlockedForUse desc" "UpdateConBlockForCrmObjs" "UpdateConBlockForCrmObjs desc" "SupplierContact" "SupplierContact desc" "BlockedForUseSupplier" "BlockedForUseSupplier desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "PersonId" "Name" "FirstName" "MiddleName" "Prefix" "LastName" "AlternativeName" "BirthName" "Alias" "Initials" "Title" "JobTitle" "CreationDate" "Party" "PictureId" "Protected" "DefaultDomain" "Country" "DefaultLanguage" "PartyType" "UserId" "PictureThumbnailId" "Inactive" "ContactCustomers" "ContactSuppliers" "CustomerContact" "BlockedForUse" "UpdateConBlockForCrmObjs" "SupplierContact" "BlockedForUseSupplier"
Specify properties to return, see OData Select

Responses
200 response body for entity array PersonInfo
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PersonInfo

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
Get entity from Reference_PersonInfo by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
PersonId
required
string <= 20 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "PersonId" "Name" "FirstName" "MiddleName" "Prefix" "LastName" "AlternativeName" "BirthName" "Alias" "Initials" "Title" "JobTitle" "CreationDate" "Party" "PictureId" "Protected" "DefaultDomain" "Country" "DefaultLanguage" "PartyType" "UserId" "PictureThumbnailId" "Inactive" "ContactCustomers" "ContactSuppliers" "CustomerContact" "BlockedForUse" "UpdateConBlockForCrmObjs" "SupplierContact" "BlockedForUseSupplier"
Specify properties to return, see OData Select

Responses
200 response body for entity type PersonInfo
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PersonInfo(PersonId='{PersonId}')

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
"PersonId": "It is a Text",
"Name": "It is a Text",
"FirstName": "It is a Text",
"MiddleName": "It is a Text",
"Prefix": "It is a Text",
"LastName": "It is a Text",
"AlternativeName": "It is a Text",
"BirthName": "It is a Text",
"Alias": "It is a Text",
"Initials": "It is a Text",
"Title": "It is a Text",
"JobTitle": "It is a Text",
"CreationDate": "2019-10-10",
"Party": "It is a Text",
"PictureId": 1,
"Protected": true,
"DefaultDomain": true,
"UserId": "It is a Text",
"PictureThumbnailId": 1,
"Inactive": "It is a Text",
"ContactCustomers": "It is a Text",
"ContactSuppliers": "It is a Text",
"CustomerContact": true,
"BlockedForUse": true,
"UpdateConBlockForCrmObjs": true,
"SupplierContact": true,
"BlockedForUseSupplier": true,
"Objstate": "Active",
"Country": "AL",
"DefaultLanguage": "da",
"PartyType": "Company"
}
Reference_ScrappingCause
Reference Entity Set Reference_ScrappingCause

Get entities from Reference_ScrappingCause
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
Items Enum: "Objstate" "Objstate desc" "RejectReason" "RejectReason desc" "RejectMessage" "RejectMessage desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "RejectReason" "RejectMessage"
Specify properties to return, see OData Select

Responses
200 response body for entity array ScrappingCause
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ScrappingCause

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
Get entity from Reference_ScrappingCause by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
RejectReason
required
string <= 8 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "RejectReason" "RejectMessage"
Specify properties to return, see OData Select

Responses
200 response body for entity type ScrappingCause
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ScrappingCause(RejectReason='{RejectReason}')

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
"RejectReason": "It is a Text",
"RejectMessage": "It is a Text",
"Objstate": "Active"
}
