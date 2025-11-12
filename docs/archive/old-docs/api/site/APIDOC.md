
REST API Documentation
Search...
Lookup_IsoCountry_EntitySet
Lookup_IsoCurrency_EntitySet
SiteSet
Service Operations - Actions
Service Operations - Functions
Reference_CustOrdCust1
Reference_CountryRegionAllLov
Reference_CountryOfRegionLov
Reference_WorkTimeCalendarLov
Reference_CompanyAddressLovPub
Reference_IsoTimeZone
Reference_CompanySite
Reference_SiteMscomInfo
Reference_SiteInventInfo
Reference_SiteDiscomInfo
Reference_SiteMfgstdInfo
Reference_CompanyFinance
Reference_Supplier
Documentation Powered by Redocly
SitesHandling (1)
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
SiteSet
Get entities from SiteSet
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
Items Enum: "Contract" "Contract desc" "Company" "Company desc" "DeliveryAddress" "DeliveryAddress desc" "Description" "Description desc" "DistCalendarId" "DistCalendarId desc" "ManufCalendarId" "ManufCalendarId desc" "Offset" "Offset desc" "DataCaptureMenuId" "DataCaptureMenuId desc" "TimeZoneCode" "TimeZoneCode desc" "CUnpegSupplies" "CUnpegSupplies desc" "DocumentAddress" "DocumentAddress desc" "LastPeriodicWADate" "LastPeriodicWADate desc" "CustomerOrderReportsConditionCodeDisplay" "CustomerOrderReportsConditionCodeDisplay desc" "PurchaseOrderReportsConditionCodeDisplay" "PurchaseOrderReportsConditionCodeDisplay desc" "DefaultSOReceiptinBackground" "DefaultSOReceiptinBackground desc" "InternalCustomer" "InternalCustomer desc" "InternalSupplier" "InternalSupplier desc" "CountryCode" "CountryCode desc" "RegionCode" "RegionCode desc" "Branch" "Branch desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "Company" "DeliveryAddress" "Description" "DistCalendarId" "ManufCalendarId" "Offset" "DataCaptureMenuId" "TimeZoneCode" "CUnpegSupplies" "DocumentAddress" "LastPeriodicWADate" "CustomerOrderReportsConditionCodeDisplay" "PurchaseOrderReportsConditionCodeDisplay" "DefaultSOReceiptinBackground" "InternalCustomer" "InternalSupplier" "CountryCode" "RegionCode" "Branch"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "TimeZoneCodeRef" "CompanySiteRef" "SiteMscomInfoRef" "SiteInventInfoRef" "SiteDiscomInfoRef" "SiteMfgstdInfoRef" "CompanyRef" "DeliveryAddressRef" "DocumentAddressRef" "DistCalendarIdRef" "ManufCalendarIdRef" "CountryCodeRef" "RegionCodeRef" "InternalCustomerRef" "InternalSupplierRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array Site
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SiteSet

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
Get entity from SiteSet by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string <= 5 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "Company" "DeliveryAddress" "Description" "DistCalendarId" "ManufCalendarId" "Offset" "DataCaptureMenuId" "TimeZoneCode" "CUnpegSupplies" "DocumentAddress" "LastPeriodicWADate" "CustomerOrderReportsConditionCodeDisplay" "PurchaseOrderReportsConditionCodeDisplay" "DefaultSOReceiptinBackground" "InternalCustomer" "InternalSupplier" "CountryCode" "RegionCode" "Branch"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "TimeZoneCodeRef" "CompanySiteRef" "SiteMscomInfoRef" "SiteInventInfoRef" "SiteDiscomInfoRef" "SiteMfgstdInfoRef" "CompanyRef" "DeliveryAddressRef" "DocumentAddressRef" "DistCalendarIdRef" "ManufCalendarIdRef" "CountryCodeRef" "RegionCodeRef" "InternalCustomerRef" "InternalSupplierRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type Site
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SiteSet(Contract='{Contract}')

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
"Company": "It is a Text",
"DeliveryAddress": "It is a Text",
"Description": "It is a Text",
"DistCalendarId": "It is a Text",
"ManufCalendarId": "It is a Text",
"Offset": 1,
"DataCaptureMenuId": "It is a Text",
"TimeZoneCode": "It is a Text",
"CUnpegSupplies": true,
"DocumentAddress": "It is a Text",
"LastPeriodicWADate": "2019-10-10",
"CustomerOrderReportsConditionCodeDisplay": true,
"PurchaseOrderReportsConditionCodeDisplay": true,
"DefaultSOReceiptinBackground": true,
"InternalCustomer": "It is a Text",
"InternalSupplier": "It is a Text",
"CountryCode": "It is a Text",
"RegionCode": "It is a Text",
"Branch": "It is a Text"
}
Update entity in SiteSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string <= 5 characters
Example: It is a Text
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "Company" "DeliveryAddress" "Description" "DistCalendarId" "ManufCalendarId" "Offset" "DataCaptureMenuId" "TimeZoneCode" "CUnpegSupplies" "DocumentAddress" "LastPeriodicWADate" "CustomerOrderReportsConditionCodeDisplay" "PurchaseOrderReportsConditionCodeDisplay" "DefaultSOReceiptinBackground" "InternalCustomer" "InternalSupplier" "CountryCode" "RegionCode" "Branch"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type Site

DeliveryAddress	
string <= 50 characters
DistCalendarId
required
string <= 10 characters
ManufCalendarId
required
string <= 10 characters
Offset	
number
DataCaptureMenuId	
string <= 50 characters
TimeZoneCode	
string <= 200 characters
CUnpegSupplies	
boolean
DocumentAddress	
string <= 2000 characters
LastPeriodicWADate	
string <date>
CustomerOrderReportsConditionCodeDisplay
required
boolean
PurchaseOrderReportsConditionCodeDisplay
required
boolean
DefaultSOReceiptinBackground
required
boolean
InternalCustomer	
string <= 2000 characters
InternalSupplier	
string <= 2000 characters
CountryCode	
string <= 4000 characters
RegionCode	
string <= 4000 characters
Branch	
string <= 4000 characters
Responses
200 response body for entity type Site
201 response body for entity type Site
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
/SiteSet(Contract='{Contract}')

Request samples
Payload
Content type
application/json

Copy
{
"DeliveryAddress": "It is a Text",
"DistCalendarId": "It is a Text",
"ManufCalendarId": "It is a Text",
"Offset": 1,
"DataCaptureMenuId": "It is a Text",
"TimeZoneCode": "It is a Text",
"CUnpegSupplies": true,
"DocumentAddress": "It is a Text",
"LastPeriodicWADate": "2019-10-10",
"CustomerOrderReportsConditionCodeDisplay": true,
"PurchaseOrderReportsConditionCodeDisplay": true,
"DefaultSOReceiptinBackground": true,
"InternalCustomer": "It is a Text",
"InternalSupplier": "It is a Text",
"CountryCode": "It is a Text",
"RegionCode": "It is a Text",
"Branch": "It is a Text"
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
"Company": "It is a Text",
"DeliveryAddress": "It is a Text",
"Description": "It is a Text",
"DistCalendarId": "It is a Text",
"ManufCalendarId": "It is a Text",
"Offset": 1,
"DataCaptureMenuId": "It is a Text",
"TimeZoneCode": "It is a Text",
"CUnpegSupplies": true,
"DocumentAddress": "It is a Text",
"LastPeriodicWADate": "2019-10-10",
"CustomerOrderReportsConditionCodeDisplay": true,
"PurchaseOrderReportsConditionCodeDisplay": true,
"DefaultSOReceiptinBackground": true,
"InternalCustomer": "It is a Text",
"InternalSupplier": "It is a Text",
"CountryCode": "It is a Text",
"RegionCode": "It is a Text",
"Branch": "It is a Text"
}
Invoke function DefaultCopy
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string <= 5 characters
Example: It is a Text
query Parameters
@CopyValues
required
object (SiteCopyValues)
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "Company" "DeliveryAddress" "Description" "DistCalendarId" "ManufCalendarId" "Offset" "DataCaptureMenuId" "TimeZoneCode" "CUnpegSupplies" "DocumentAddress" "LastPeriodicWADate" "CustomerOrderReportsConditionCodeDisplay" "PurchaseOrderReportsConditionCodeDisplay" "DefaultSOReceiptinBackground" "InternalCustomer" "InternalSupplier" "CountryCode" "RegionCode" "Branch"
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
/SiteSet(Contract='{Contract}')/IfsApp.SitesHandling.Site_DefaultCopy(CopyValues=@CopyValues)

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
"Company": "It is a Text",
"DeliveryAddress": "It is a Text",
"Description": "It is a Text",
"DistCalendarId": "It is a Text",
"ManufCalendarId": "It is a Text",
"Offset": 1,
"DataCaptureMenuId": "It is a Text",
"TimeZoneCode": "It is a Text",
"CUnpegSupplies": true,
"DocumentAddress": "It is a Text",
"LastPeriodicWADate": "2019-10-10",
"CustomerOrderReportsConditionCodeDisplay": true,
"PurchaseOrderReportsConditionCodeDisplay": true,
"DefaultSOReceiptinBackground": true,
"InternalCustomer": "It is a Text",
"InternalSupplier": "It is a Text",
"CountryCode": "It is a Text",
"RegionCode": "It is a Text",
"Branch": "It is a Text"
}
Get entities from TimeZoneCodeRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
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
Items Enum: "TimeZoneCode" "TimeZoneCode desc" "Description" "Description desc" "OffsetFactor" "OffsetFactor desc" "UsedInAppl" "UsedInAppl desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "TimeZoneCode" "Description" "OffsetFactor" "UsedInAppl"
Specify properties to return, see OData Select

Responses
200 response body for entity array IsoTimeZone
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SiteSet(Contract='{Contract}')/TimeZoneCodeRef

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
Get entities from CompanySiteRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
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
Items Enum: "Contract" "Contract desc" "Description" "Description desc" "Company" "Company desc" "Country" "Country desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "Description" "Company" "Country"
Specify properties to return, see OData Select

Responses
200 response body for entity array CompanySite
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SiteSet(Contract='{Contract}')/CompanySiteRef

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
Get entities from SiteMscomInfoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
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
Items Enum: "Contract" "Contract desc" "DispCondWorkOrder" "DispCondWorkOrder desc" "MessageReceiver" "MessageReceiver desc" "PmRevisionControl" "PmRevisionControl desc" "StRevisionControl" "StRevisionControl desc" "JobRevisionControl" "JobRevisionControl desc" "DemMatHorizon" "DemMatHorizon desc" "PersonnelRoundValue" "PersonnelRoundValue desc" "PersonnelRoundFunction" "PersonnelRoundFunction desc" "TfRoundValue" "TfRoundValue desc" "TfRoundFunction" "TfRoundFunction desc" "CopyScheduleDates" "CopyScheduleDates desc" "AllowMultipleVisits" "AllowMultipleVisits desc" "WoStateDefault" "WoStateDefault desc" "AllowAutoClockIn" "AllowAutoClockIn desc" "IgnoreDepExec" "IgnoreDepExec desc" "IgnoreObjLvlVld" "IgnoreObjLvlVld desc" "ApproveInvoiceOnline" "ApproveInvoiceOnline desc" "AvailabilityControlId" "AvailabilityControlId desc" "LocationGroup" "LocationGroup desc" "AllowToolSelfCheckOut" "AllowToolSelfCheckOut desc" "Company" "Company desc" "PickupWhouseAddressId" "PickupWhouseAddressId desc" "ShipmentType" "ShipmentType desc" "DeliveryTerms" "DeliveryTerms desc" "DelTermsLocation" "DelTermsLocation desc" "ShipViaCode" "ShipViaCode desc" "PickupDuration" "PickupDuration desc" "PurchDeliveryTerms" "PurchDeliveryTerms desc" "PurchDelTermsLocation" "PurchDelTermsLocation desc" "PurchShipViaCode" "PurchShipViaCode desc" "Tolerance" "Tolerance desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "DispCondWorkOrder" "MessageReceiver" "PmRevisionControl" "StRevisionControl" "JobRevisionControl" "DemMatHorizon" "PersonnelRoundValue" "PersonnelRoundFunction" "TfRoundValue" "TfRoundFunction" "CopyScheduleDates" "AllowMultipleVisits" "WoStateDefault" "AllowAutoClockIn" "IgnoreDepExec" "IgnoreObjLvlVld" "ApproveInvoiceOnline" "AvailabilityControlId" "LocationGroup" "AllowToolSelfCheckOut" "Company" "PickupWhouseAddressId" "ShipmentType" "DeliveryTerms" "DelTermsLocation" "ShipViaCode" "PickupDuration" "PurchDeliveryTerms" "PurchDelTermsLocation" "PurchShipViaCode" "Tolerance"
Specify properties to return, see OData Select

Responses
200 response body for entity array SiteMscomInfo
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SiteSet(Contract='{Contract}')/SiteMscomInfoRef

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
Get entities from SiteInventInfoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
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
Items Enum: "Contract" "Contract desc" "CountDiffAmount" "CountDiffAmount desc" "CountDiffPercentage" "CountDiffPercentage desc" "PickingLeadtime" "PickingLeadtime desc" "LastActualCostCalc" "LastActualCostCalc desc" "AvgWorkDaysPerWeek" "AvgWorkDaysPerWeek desc" "NegativeOnHand" "NegativeOnHand desc" "PurchInvValueMethod" "PurchInvValueMethod desc" "ManufInvValueMethod" "ManufInvValueMethod desc" "ExtServiceCostMethod" "ExtServiceCostMethod desc" "InvoiceConsideration" "InvoiceConsideration desc" "MrbAvailControlId" "MrbAvailControlId desc" "CountryCode" "CountryCode desc" "RegionCode" "RegionCode desc" "CostDefaultsManually" "CostDefaultsManually desc" "RounddiffInactivityDays" "RounddiffInactivityDays desc" "UsePartcaDescInvent" "UsePartcaDescInvent desc" "DefaultQtyCalcRound" "DefaultQtyCalcRound desc" "ServiceLevelRate" "ServiceLevelRate desc" "OrderingCost" "OrderingCost desc" "InventoryInterestRate" "InventoryInterestRate desc" "LatestPlanActivityTime" "LatestPlanActivityTime desc" "AbcClassPerAssetClass" "AbcClassPerAssetClass desc" "UpperLimitVeryslowMover" "UpperLimitVeryslowMover desc" "UpperLimitSlowMover" "UpperLimitSlowMover desc" "UpperLimitMediumMover" "UpperLimitMediumMover desc" "BinHeightCapacity" "BinHeightCapacity desc" "BinWidthCapacity" "BinWidthCapacity desc" "BinDeptCapacity" "BinDeptCapacity desc" "BinVolumeCapacity" "BinVolumeCapacity desc" "BinCarryingCapacity" "BinCarryingCapacity desc" "BinMinTemperature" "BinMinTemperature desc" "BinMaxTemperature" "BinMaxTemperature desc" "BinMinHumidity" "BinMinHumidity desc" "BinMaxHumidity" "BinMaxHumidity desc" "BayCarryingCapacity" "BayCarryingCapacity desc" "RowCarryingCapacity" "RowCarryingCapacity desc" "TierCarryingCapacity" "TierCarryingCapacity desc" "ReceiptsBlocked" "ReceiptsBlocked desc" "ReceiptToOccupiedBlocked" "ReceiptToOccupiedBlocked desc" "AllowPartlocOwnerMix" "AllowPartlocOwnerMix desc" "MixOfPartNumberBlocked" "MixOfPartNumberBlocked desc" "MixOfCondCodesBlocked" "MixOfCondCodesBlocked desc" "MixOfLotBatchNoBlocked" "MixOfLotBatchNoBlocked desc" "ExcludeStorageReqVal" "ExcludeStorageReqVal desc" "TransportFromWhseLevel" "TransportFromWhseLevel desc" "TransportToWhseLevel" "TransportToWhseLevel desc" "TransportPartConsLevel" "TransportPartConsLevel desc" "TransportRefConsLevel" "TransportRefConsLevel desc" "PutawayZoneRefillOption" "PutawayZoneRefillOption desc" "AutoDropofManTransTask" "AutoDropofManTransTask desc" "AllowDeviatingAvailCtrl" "AllowDeviatingAvailCtrl desc" "ExecTranspTaskBackground" "ExecTranspTaskBackground desc" "ResetConfigStdCost" "ResetConfigStdCost desc" "FreezeStockCountReport" "FreezeStockCountReport desc" "CountingPrintReportOpt" "CountingPrintReportOpt desc" "MoveReservationOption" "MoveReservationOption desc" "PickByChoiceOption" "PickByChoiceOption desc" "AutoReservePrio1" "AutoReservePrio1 desc" "AutoReservePrio2" "AutoReservePrio2 desc" "AutoReservePrio3" "AutoReservePrio3 desc" "AutoReservePrio4" "AutoReservePrio4 desc" "AutoReservePrio5" "AutoReservePrio5 desc" "AutoReserveHuOptimized" "AutoReserveHuOptimized desc" "AutoReserveReceiptTime" "AutoReserveReceiptTime desc" "ReservFromTranspTask" "ReservFromTranspTask desc" "MaxCountingLines" "MaxCountingLines desc" "CascadPostingDateOption" "CascadPostingDateOption desc" "TimeLagForDeliveries" "TimeLagForDeliveries desc" "DeliveryDocCommMethod" "DeliveryDocCommMethod desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "CountDiffAmount" "CountDiffPercentage" "PickingLeadtime" "LastActualCostCalc" "AvgWorkDaysPerWeek" "NegativeOnHand" "PurchInvValueMethod" "ManufInvValueMethod" "ExtServiceCostMethod" "InvoiceConsideration" "MrbAvailControlId" "CountryCode" "RegionCode" "CostDefaultsManually" "RounddiffInactivityDays" "UsePartcaDescInvent" "DefaultQtyCalcRound" "ServiceLevelRate" "OrderingCost" "InventoryInterestRate" "LatestPlanActivityTime" "AbcClassPerAssetClass" "UpperLimitVeryslowMover" "UpperLimitSlowMover" "UpperLimitMediumMover" "BinHeightCapacity" "BinWidthCapacity" "BinDeptCapacity" "BinVolumeCapacity" "BinCarryingCapacity" "BinMinTemperature" "BinMaxTemperature" "BinMinHumidity" "BinMaxHumidity" "BayCarryingCapacity" "RowCarryingCapacity" "TierCarryingCapacity" "ReceiptsBlocked" "ReceiptToOccupiedBlocked" "AllowPartlocOwnerMix" "MixOfPartNumberBlocked" "MixOfCondCodesBlocked" "MixOfLotBatchNoBlocked" "ExcludeStorageReqVal" "TransportFromWhseLevel" "TransportToWhseLevel" "TransportPartConsLevel" "TransportRefConsLevel" "PutawayZoneRefillOption" "AutoDropofManTransTask" "AllowDeviatingAvailCtrl" "ExecTranspTaskBackground" "ResetConfigStdCost" "FreezeStockCountReport" "CountingPrintReportOpt" "MoveReservationOption" "PickByChoiceOption" "AutoReservePrio1" "AutoReservePrio2" "AutoReservePrio3" "AutoReservePrio4" "AutoReservePrio5" "AutoReserveHuOptimized" "AutoReserveReceiptTime" "ReservFromTranspTask" "MaxCountingLines" "CascadPostingDateOption" "TimeLagForDeliveries" "DeliveryDocCommMethod"
Specify properties to return, see OData Select

Responses
200 response body for entity array SiteInventInfo
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SiteSet(Contract='{Contract}')/SiteInventInfoRef

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
Get entities from SiteDiscomInfoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
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
Items Enum: "Contract" "Contract desc" "DocumentAddressId" "DocumentAddressId desc" "Branch" "Branch desc" "PurchCompMethod" "PurchCompMethod desc" "CustOrderPricingMethod" "CustOrderPricingMethod desc" "CustOrderDiscountMethod" "CustOrderDiscountMethod desc" "DispCondCustomerOrder" "DispCondCustomerOrder desc" "DispCondPurchaseOrder" "DispCondPurchaseOrder desc" "UsePartcaDescOrder" "UsePartcaDescOrder desc" "UsePartcaDescPurch" "UsePartcaDescPurch desc" "CreateOrdInRelState" "CreateOrdInRelState desc" "UsePreShipDelNote" "UsePreShipDelNote desc" "FairShareReservation" "FairShareReservation desc" "ShipmentFreightCharge" "ShipmentFreightCharge desc" "SendAutoDisAdv" "SendAutoDisAdv desc" "PriceEffectiveDate" "PriceEffectiveDate desc" "ShipInventoryLocationNo" "ShipInventoryLocationNo desc" "EnforceUseOfPoco" "EnforceUseOfPoco desc" "CreateBasePricePlanned" "CreateBasePricePlanned desc" "ReceiveCase" "ReceiveCase desc" "ShipmentType" "ShipmentType desc" "EdiAutoOrderApproval" "EdiAutoOrderApproval desc" "UsePriceInclTaxOrder" "UsePriceInclTaxOrder desc" "UsePriceInclTaxPurch" "UsePriceInclTaxPurch desc" "EdiAutoChangeApproval" "EdiAutoChangeApproval desc" "EdiAuthorizeCode" "EdiAuthorizeCode desc" "EdiAutoApprovalUser" "EdiAutoApprovalUser desc" "ForwardAgentId" "ForwardAgentId desc" "OrderId" "OrderId desc" "Priority" "Priority desc" "ReplicateDocText" "ReplicateDocText desc" "FinalizeSuppShipment" "FinalizeSuppShipment desc" "DiscountType" "DiscountType desc" "ReleaseInternalOrder" "ReleaseInternalOrder desc" "ExecOrderChangeOnline" "ExecOrderChangeOnline desc" "DiscountFreeze" "DiscountFreeze desc" "OverDelivery" "OverDelivery desc" "OverDeliveryTolerance" "OverDeliveryTolerance desc" "ActionNonAuthorized" "ActionNonAuthorized desc" "ActionAuthorized" "ActionAuthorized desc" "DirDelApproval" "DirDelApproval desc" "OrderConfApproval" "OrderConfApproval desc" "OrderConfDiffApproval" "OrderConfDiffApproval desc" "AdhocPurRqstApproval" "AdhocPurRqstApproval desc" "CreateConfChangeOrder" "CreateConfChangeOrder desc" "SuppAutoApprovalUser" "SuppAutoApprovalUser desc" "PrintPickReport" "PrintPickReport desc" "AllowAutoSubOfParts" "AllowAutoSubOfParts desc" "AllowOverruleLimitSales" "AllowOverruleLimitSales desc" "UnattachHuAtDelivery" "UnattachHuAtDelivery desc" "ReservFromTranspTask" "ReservFromTranspTask desc" "CustOrderConfirmation" "CustOrderConfirmation desc" "Company" "Company desc" "InclReleasedPoLines" "InclReleasedPoLines desc" "InclConfirmedPoLines" "InclConfirmedPoLines desc" "InclArrivedPoLines" "InclArrivedPoLines desc" "InclReceivedPoLines" "InclReceivedPoLines desc" "InclPastDuePoLines" "InclPastDuePoLines desc" "PoPastDueDaysAllowed" "PoPastDueDaysAllowed desc" "InclPlannedDo" "InclPlannedDo desc" "ChgTypeFreight" "ChgTypeFreight desc" "ChgTypeInsurance" "ChgTypeInsurance desc" "ChgTypeOther" "ChgTypeOther desc" "RemoteWarehouseId" "RemoteWarehouseId desc" "TransAtpInfoDirDel" "TransAtpInfoDirDel desc" "DefHuTypeForPickPack" "DefHuTypeForPickPack desc" "DocumentType" "DocumentType desc" "SiteDateForDelDate" "SiteDateForDelDate desc" "PartAvailCtrlAtPbc" "PartAvailCtrlAtPbc desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "DocumentAddressId" "Branch" "PurchCompMethod" "CustOrderPricingMethod" "CustOrderDiscountMethod" "DispCondCustomerOrder" "DispCondPurchaseOrder" "UsePartcaDescOrder" "UsePartcaDescPurch" "CreateOrdInRelState" "UsePreShipDelNote" "FairShareReservation" "ShipmentFreightCharge" "SendAutoDisAdv" "PriceEffectiveDate" "ShipInventoryLocationNo" "EnforceUseOfPoco" "CreateBasePricePlanned" "ReceiveCase" "ShipmentType" "EdiAutoOrderApproval" "UsePriceInclTaxOrder" "UsePriceInclTaxPurch" "EdiAutoChangeApproval" "EdiAuthorizeCode" "EdiAutoApprovalUser" "ForwardAgentId" "OrderId" "Priority" "ReplicateDocText" "FinalizeSuppShipment" "DiscountType" "ReleaseInternalOrder" "ExecOrderChangeOnline" "DiscountFreeze" "OverDelivery" "OverDeliveryTolerance" "ActionNonAuthorized" "ActionAuthorized" "DirDelApproval" "OrderConfApproval" "OrderConfDiffApproval" "AdhocPurRqstApproval" "CreateConfChangeOrder" "SuppAutoApprovalUser" "PrintPickReport" "AllowAutoSubOfParts" "AllowOverruleLimitSales" "UnattachHuAtDelivery" "ReservFromTranspTask" "CustOrderConfirmation" "Company" "InclReleasedPoLines" "InclConfirmedPoLines" "InclArrivedPoLines" "InclReceivedPoLines" "InclPastDuePoLines" "PoPastDueDaysAllowed" "InclPlannedDo" "ChgTypeFreight" "ChgTypeInsurance" "ChgTypeOther" "RemoteWarehouseId" "TransAtpInfoDirDel" "DefHuTypeForPickPack" "DocumentType" "SiteDateForDelDate" "PartAvailCtrlAtPbc"
Specify properties to return, see OData Select

Responses
200 response body for entity array SiteDiscomInfo
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SiteSet(Contract='{Contract}')/SiteDiscomInfoRef

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
Get entities from SiteMfgstdInfoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
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
Items Enum: "Contract" "Contract desc" "DispositionOfQuotation" "DispositionOfQuotation desc" "StructureUpdate" "StructureUpdate desc" "StructureStateDefault" "StructureStateDefault desc" "RerunMsOnlineCons" "RerunMsOnlineCons desc" "DpImportForecastBy" "DpImportForecastBy desc" "DopAutoClose" "DopAutoClose desc" "DopClosedConfigEdit" "DopClosedConfigEdit desc" "ShpordReceiptBackground" "ShpordReceiptBackground desc" "VimMroEnabled" "VimMroEnabled desc" "UseRelPrInPlanning" "UseRelPrInPlanning desc" "CalendarSettings" "CalendarSettings desc" "ArchiveRecipeStruct" "ArchiveRecipeStruct desc" "CalcCostProgress" "CalcCostProgress desc" "CreateMltRepairSo" "CreateMltRepairSo desc" "OperationReportMode" "OperationReportMode desc" "DispLiAutoEnterAsDlg" "DispLiAutoEnterAsDlg desc" "DispLiIdleTime" "DispLiIdleTime desc" "AuthorizationRequired" "AuthorizationRequired desc" "DefaultQtyOnReport" "DefaultQtyOnReport desc" "DefaultTimeOnReport" "DefaultTimeOnReport desc" "AutoBuildTrackedStruct" "AutoBuildTrackedStruct desc" "MsrcptToMrpForDop" "MsrcptToMrpForDop desc" "DirectLabor" "DirectLabor desc" "LaborOverhead" "LaborOverhead desc" "PrototypeRevisionPrefix" "PrototypeRevisionPrefix desc" "PrototypeAsSupply" "PrototypeAsSupply desc" "ReceiveByproduct" "ReceiveByproduct desc" "CurrRevWhenPastDue" "CurrRevWhenPastDue desc" "CompetencyCheckOption" "CompetencyCheckOption desc" "ShopOrdAutoClose" "ShopOrdAutoClose desc" "ReleasedPrFromDop" "ReleasedPrFromDop desc" "RecipeStructDecimals" "RecipeStructDecimals desc" "CreateSoStatusPlanned" "CreateSoStatusPlanned desc" "AllowResOutsideBalance" "AllowResOutsideBalance desc" "SoConnectedHuAvailCtrlId" "SoConnectedHuAvailCtrlId desc" "DispoAutoReportMtrl" "DispoAutoReportMtrl desc" "DispoAutoReportOper" "DispoAutoReportOper desc" "MroDefRcptLocationNo" "MroDefRcptLocationNo desc" "MroDefDisassemCondCode" "MroDefDisassemCondCode desc" "MroDefAssemCondCode" "MroDefAssemCondCode desc" "UnreserveOnPartialPick" "UnreserveOnPartialPick desc" "BaseLabResOnAttendance" "BaseLabResOnAttendance desc" "RoutingOpNumberingStep" "RoutingOpNumberingStep desc" "CapCheckScheduleOper" "CapCheckScheduleOper desc" "RegUnit" "RegUnit desc" "InclPlannedSo" "InclPlannedSo desc" "InclReleasedSo" "InclReleasedSo desc" "InclPastDueSo" "InclPastDueSo desc" "SoPastDueDaysAllowed" "SoPastDueDaysAllowed desc" "InheritParentMaintLevel" "InheritParentMaintLevel desc" "SoLotBatchForByProd" "SoLotBatchForByProd desc" "DispoAutoUpdRepairOrd" "DispoAutoUpdRepairOrd desc" "DisassemblyScrapReason" "DisassemblyScrapReason desc" "ReceiveDisassCompRule" "ReceiveDisassCompRule desc" "ConfigChangeAllowed" "ConfigChangeAllowed desc" "CreateOrderBasedLots" "CreateOrderBasedLots desc" "CreatePrForExtServ" "CreatePrForExtServ desc" "UseDigiSignature" "UseDigiSignature desc" "UseManualShpOrdReq" "UseManualShpOrdReq desc" "CNcrAttachSize" "CNcrAttachSize desc" "CDaysBeforeRelease" "CDaysBeforeRelease desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "DispositionOfQuotation" "StructureUpdate" "StructureStateDefault" "RerunMsOnlineCons" "DpImportForecastBy" "DopAutoClose" "DopClosedConfigEdit" "ShpordReceiptBackground" "VimMroEnabled" "UseRelPrInPlanning" "CalendarSettings" "ArchiveRecipeStruct" "CalcCostProgress" "CreateMltRepairSo" "OperationReportMode" "DispLiAutoEnterAsDlg" "DispLiIdleTime" "AuthorizationRequired" "DefaultQtyOnReport" "DefaultTimeOnReport" "AutoBuildTrackedStruct" "MsrcptToMrpForDop" "DirectLabor" "LaborOverhead" "PrototypeRevisionPrefix" "PrototypeAsSupply" "ReceiveByproduct" "CurrRevWhenPastDue" "CompetencyCheckOption" "ShopOrdAutoClose" "ReleasedPrFromDop" "RecipeStructDecimals" "CreateSoStatusPlanned" "AllowResOutsideBalance" "SoConnectedHuAvailCtrlId" "DispoAutoReportMtrl" "DispoAutoReportOper" "MroDefRcptLocationNo" "MroDefDisassemCondCode" "MroDefAssemCondCode" "UnreserveOnPartialPick" "BaseLabResOnAttendance" "RoutingOpNumberingStep" "CapCheckScheduleOper" "CapCheckLoadTypes" "RegUnit" "InclPlannedSo" "InclReleasedSo" "InclPastDueSo" "SoPastDueDaysAllowed" "InheritParentMaintLevel" "SoLotBatchForByProd" "DispoAutoUpdRepairOrd" "DisassemblyScrapReason" "ReceiveDisassCompRule" "ConfigChangeAllowed" "CreateOrderBasedLots" "CreatePrForExtServ" "UseDigiSignature" "DigitalSigDemandSource" "UseManualShpOrdReq" "CNcrAttachSize" "CDaysBeforeRelease"
Specify properties to return, see OData Select

Responses
200 response body for entity array SiteMfgstdInfo
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SiteSet(Contract='{Contract}')/SiteMfgstdInfoRef

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
Get entities from CompanyRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
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
Items Enum: "Company" "Company desc" "Description" "Description desc" "CurrencyCode" "CurrencyCode desc" "ValidFrom" "ValidFrom desc" "CorrectionType" "CorrectionType desc" "ParallelAccCurrency" "ParallelAccCurrency desc" "TimeStamp" "TimeStamp desc" "RecalculationDate" "RecalculationDate desc" "DefAmountMethod" "DefAmountMethod desc" "CreationFinished" "CreationFinished desc" "UseVouNoPeriod" "UseVouNoPeriod desc" "ReverseVouCorrType" "ReverseVouCorrType desc" "PeriodClosingMethod" "PeriodClosingMethod desc" "UserDefCal" "UserDefCal desc" "ParallelBase" "ParallelBase desc" "ParallelRateType" "ParallelRateType desc" "MasterCompany" "MasterCompany desc" "MasterCompanyName" "MasterCompanyName desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "Description" "CurrencyCode" "ValidFrom" "CorrectionType" "ParallelAccCurrency" "TimeStamp" "RecalculationDate" "DefAmountMethod" "CreationFinished" "UseVouNoPeriod" "ReverseVouCorrType" "PeriodClosingMethod" "UserDefCal" "ParallelBase" "ParallelRateType" "MasterCompany" "MasterCompanyName"
Specify properties to return, see OData Select

Responses
200 response body for entity array CompanyFinance
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SiteSet(Contract='{Contract}')/CompanyRef

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
Get entities from DeliveryAddressRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
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
Items Enum: "Company" "Company desc" "DeliveryAddress" "DeliveryAddress desc" "AddressName" "AddressName desc" "Address" "Address desc" "Country" "Country desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "DeliveryAddress" "AddressName" "Address" "Country"
Specify properties to return, see OData Select

Responses
200 response body for entity array CompanyAddressLovPub
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SiteSet(Contract='{Contract}')/DeliveryAddressRef

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
Get entities from DocumentAddressRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
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
Items Enum: "Company" "Company desc" "DeliveryAddress" "DeliveryAddress desc" "AddressName" "AddressName desc" "Address" "Address desc" "Country" "Country desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "DeliveryAddress" "AddressName" "Address" "Country"
Specify properties to return, see OData Select

Responses
200 response body for entity array CompanyAddressLovPub
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SiteSet(Contract='{Contract}')/DocumentAddressRef

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
Get entities from DistCalendarIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
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
Items Enum: "CalendarId" "CalendarId desc" "Description" "Description desc" "ExceptionCode" "ExceptionCode desc" "Objstate" "Objstate desc" "State" "State desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CalendarId" "Description" "ExceptionCode" "Objstate" "State"
Specify properties to return, see OData Select

Responses
200 response body for entity array WorkTimeCalendarLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SiteSet(Contract='{Contract}')/DistCalendarIdRef

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
Get entities from ManufCalendarIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
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
Items Enum: "CalendarId" "CalendarId desc" "Description" "Description desc" "ExceptionCode" "ExceptionCode desc" "Objstate" "Objstate desc" "State" "State desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CalendarId" "Description" "ExceptionCode" "Objstate" "State"
Specify properties to return, see OData Select

Responses
200 response body for entity array WorkTimeCalendarLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SiteSet(Contract='{Contract}')/ManufCalendarIdRef

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
Get entities from CountryCodeRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
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
Items Enum: "CountryCode" "CountryCode desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CountryCode" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array CountryOfRegionLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SiteSet(Contract='{Contract}')/CountryCodeRef

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
Get entities from RegionCodeRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
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
Items Enum: "RegionCode" "RegionCode desc" "RegionName" "RegionName desc" "CountryCode" "CountryCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "RegionCode" "RegionName" "CountryCode"
Specify properties to return, see OData Select

Responses
200 response body for entity array CountryRegionAllLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SiteSet(Contract='{Contract}')/RegionCodeRef

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
Get entities from InternalCustomerRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
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
Items Enum: "CustomerNo" "CustomerNo desc" "Category" "Category desc" "Name" "Name desc" "ForwardAgentId" "ForwardAgentId desc" "MulTierDelNotification" "MulTierDelNotification desc" "RecAdvAutoMatchDiff" "RecAdvAutoMatchDiff desc" "RecAdvAutoMatching" "RecAdvAutoMatching desc" "RecAdvMatchingOption" "RecAdvMatchingOption desc" "ReceivingAdviceType" "ReceivingAdviceType desc" "SelfBillingMatchOption" "SelfBillingMatchOption desc" "AdvInvFullPay" "AdvInvFullPay desc" "BackorderOption" "BackorderOption desc" "ReceivePackSizeChg" "ReceivePackSizeChg desc" "CustPriceGroupId" "CustPriceGroupId desc" "CustGrp" "CustGrp desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CustomerNo" "Category" "Name" "ForwardAgentId" "MulTierDelNotification" "RecAdvAutoMatchDiff" "RecAdvAutoMatching" "RecAdvMatchingOption" "ReceivingAdviceType" "SelfBillingMatchOption" "AdvInvFullPay" "BackorderOption" "ReceivePackSizeChg" "CustPriceGroupId" "CustGrp"
Specify properties to return, see OData Select

Responses
200 response body for entity array CustOrdCust1
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SiteSet(Contract='{Contract}')/InternalCustomerRef

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
Get entities from InternalSupplierRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
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
/SiteSet(Contract='{Contract}')/InternalSupplierRef

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

Reference_CustOrdCust1
Reference Entity Set Reference_CustOrdCust1

Get entities from Reference_CustOrdCust1
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
Items Enum: "CustomerNo" "CustomerNo desc" "Category" "Category desc" "Name" "Name desc" "ForwardAgentId" "ForwardAgentId desc" "MulTierDelNotification" "MulTierDelNotification desc" "RecAdvAutoMatchDiff" "RecAdvAutoMatchDiff desc" "RecAdvAutoMatching" "RecAdvAutoMatching desc" "RecAdvMatchingOption" "RecAdvMatchingOption desc" "ReceivingAdviceType" "ReceivingAdviceType desc" "SelfBillingMatchOption" "SelfBillingMatchOption desc" "AdvInvFullPay" "AdvInvFullPay desc" "BackorderOption" "BackorderOption desc" "ReceivePackSizeChg" "ReceivePackSizeChg desc" "CustPriceGroupId" "CustPriceGroupId desc" "CustGrp" "CustGrp desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CustomerNo" "Category" "Name" "ForwardAgentId" "MulTierDelNotification" "RecAdvAutoMatchDiff" "RecAdvAutoMatching" "RecAdvMatchingOption" "ReceivingAdviceType" "SelfBillingMatchOption" "AdvInvFullPay" "BackorderOption" "ReceivePackSizeChg" "CustPriceGroupId" "CustGrp"
Specify properties to return, see OData Select

Responses
200 response body for entity array CustOrdCust1
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CustOrdCust1

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
Get entity from Reference_CustOrdCust1 by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
CustomerNo
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "CustomerNo" "Category" "Name" "ForwardAgentId" "MulTierDelNotification" "RecAdvAutoMatchDiff" "RecAdvAutoMatching" "RecAdvMatchingOption" "ReceivingAdviceType" "SelfBillingMatchOption" "AdvInvFullPay" "BackorderOption" "ReceivePackSizeChg" "CustPriceGroupId" "CustGrp"
Specify properties to return, see OData Select

Responses
200 response body for entity type CustOrdCust1
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CustOrdCust1(CustomerNo='{CustomerNo}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"CustomerNo": "It is a Text",
"Name": "It is a Text",
"ForwardAgentId": "It is a Text",
"CustPriceGroupId": "It is a Text",
"CustGrp": "It is a Text",
"Category": "Internal",
"MulTierDelNotification": "False",
"RecAdvAutoMatchDiff": "False",
"RecAdvAutoMatching": "False",
"RecAdvMatchingOption": "DeliveryNote",
"ReceivingAdviceType": "UseCustomerDefault",
"SelfBillingMatchOption": "DeliveryNote",
"AdvInvFullPay": "False",
"BackorderOption": "NoPartialDeliveriesAllow",
"ReceivePackSizeChg": "False"
}
Reference_CountryRegionAllLov
Reference Entity Set Reference_CountryRegionAllLov

Get entities from Reference_CountryRegionAllLov
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
Items Enum: "RegionCode" "RegionCode desc" "RegionName" "RegionName desc" "CountryCode" "CountryCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "RegionCode" "RegionName" "CountryCode"
Specify properties to return, see OData Select

Responses
200 response body for entity array CountryRegionAllLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CountryRegionAllLov

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
Get entity from Reference_CountryRegionAllLov by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
RegionCode
required
string <= 4000 characters
Example: It is a Text
CountryCode
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "RegionCode" "RegionName" "CountryCode"
Specify properties to return, see OData Select

Responses
200 response body for entity type CountryRegionAllLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CountryRegionAllLov(RegionCode='{RegionCode}',CountryCode='{CountryCode}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"RegionCode": "It is a Text",
"RegionName": "It is a Text",
"CountryCode": "It is a Text"
}
Reference_CountryOfRegionLov
Reference Entity Set Reference_CountryOfRegionLov

Get entities from Reference_CountryOfRegionLov
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
Items Enum: "CountryCode" "CountryCode desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CountryCode" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array CountryOfRegionLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CountryOfRegionLov

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
Get entity from Reference_CountryOfRegionLov by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
CountryCode
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "CountryCode" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type CountryOfRegionLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CountryOfRegionLov(CountryCode='{CountryCode}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"CountryCode": "It is a Text",
"Description": "It is a Text"
}
Reference_WorkTimeCalendarLov
Reference Entity Set Reference_WorkTimeCalendarLov

Get entities from Reference_WorkTimeCalendarLov
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
Items Enum: "CalendarId" "CalendarId desc" "Description" "Description desc" "ExceptionCode" "ExceptionCode desc" "Objstate" "Objstate desc" "State" "State desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CalendarId" "Description" "ExceptionCode" "Objstate" "State"
Specify properties to return, see OData Select

Responses
200 response body for entity array WorkTimeCalendarLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_WorkTimeCalendarLov

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
Get entity from Reference_WorkTimeCalendarLov by key
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
Items Enum: "luname" "keyref" "CalendarId" "Description" "ExceptionCode" "Objstate" "State"
Specify properties to return, see OData Select

Responses
200 response body for entity type WorkTimeCalendarLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_WorkTimeCalendarLov(CalendarId='{CalendarId}')

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
"ExceptionCode": "It is a Text",
"State": "It is a Text",
"Objstate": "ChangesPending"
}
Reference_CompanyAddressLovPub
Reference Entity Set Reference_CompanyAddressLovPub

Get entities from Reference_CompanyAddressLovPub
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
Items Enum: "Company" "Company desc" "DeliveryAddress" "DeliveryAddress desc" "AddressName" "AddressName desc" "Address" "Address desc" "Country" "Country desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "DeliveryAddress" "AddressName" "Address" "Country"
Specify properties to return, see OData Select

Responses
200 response body for entity array CompanyAddressLovPub
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CompanyAddressLovPub

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
Get entity from Reference_CompanyAddressLovPub by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string <= 4000 characters
Example: It is a Text
DeliveryAddress
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "DeliveryAddress" "AddressName" "Address" "Country"
Specify properties to return, see OData Select

Responses
200 response body for entity type CompanyAddressLovPub
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CompanyAddressLovPub(Company='{Company}',DeliveryAddress='{DeliveryAddress}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"Company": "It is a Text",
"DeliveryAddress": "It is a Text",
"AddressName": "It is a Text",
"Address": "It is a Text",
"Country": "AL"
}
Reference_IsoTimeZone
Reference Entity Set Reference_IsoTimeZone

Get entities from Reference_IsoTimeZone
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
Items Enum: "TimeZoneCode" "TimeZoneCode desc" "Description" "Description desc" "OffsetFactor" "OffsetFactor desc" "UsedInAppl" "UsedInAppl desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "TimeZoneCode" "Description" "OffsetFactor" "UsedInAppl"
Specify properties to return, see OData Select

Responses
200 response body for entity array IsoTimeZone
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_IsoTimeZone

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
Get entity from Reference_IsoTimeZone by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
TimeZoneCode
required
string <= 200 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "TimeZoneCode" "Description" "OffsetFactor" "UsedInAppl"
Specify properties to return, see OData Select

Responses
200 response body for entity type IsoTimeZone
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_IsoTimeZone(TimeZoneCode='{TimeZoneCode}')

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
"TimeZoneCode": "It is a Text",
"Description": "It is a Text",
"OffsetFactor": 1,
"UsedInAppl": "It is a Text"
}
Reference_CompanySite
Reference Entity Set Reference_CompanySite

Get entities from Reference_CompanySite
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
Items Enum: "Contract" "Contract desc" "Description" "Description desc" "Company" "Company desc" "Country" "Country desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "Description" "Company" "Country"
Specify properties to return, see OData Select

Responses
200 response body for entity array CompanySite
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CompanySite

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
Get entity from Reference_CompanySite by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string <= 5 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "Description" "Company" "Country"
Specify properties to return, see OData Select

Responses
200 response body for entity type CompanySite
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CompanySite(Contract='{Contract}')

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
"Description": "It is a Text",
"Company": "It is a Text",
"Country": "AL"
}
Reference_SiteMscomInfo
Reference Entity Set Reference_SiteMscomInfo

Get entities from Reference_SiteMscomInfo
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
Items Enum: "Contract" "Contract desc" "DispCondWorkOrder" "DispCondWorkOrder desc" "MessageReceiver" "MessageReceiver desc" "PmRevisionControl" "PmRevisionControl desc" "StRevisionControl" "StRevisionControl desc" "JobRevisionControl" "JobRevisionControl desc" "DemMatHorizon" "DemMatHorizon desc" "PersonnelRoundValue" "PersonnelRoundValue desc" "PersonnelRoundFunction" "PersonnelRoundFunction desc" "TfRoundValue" "TfRoundValue desc" "TfRoundFunction" "TfRoundFunction desc" "CopyScheduleDates" "CopyScheduleDates desc" "AllowMultipleVisits" "AllowMultipleVisits desc" "WoStateDefault" "WoStateDefault desc" "AllowAutoClockIn" "AllowAutoClockIn desc" "IgnoreDepExec" "IgnoreDepExec desc" "IgnoreObjLvlVld" "IgnoreObjLvlVld desc" "ApproveInvoiceOnline" "ApproveInvoiceOnline desc" "AvailabilityControlId" "AvailabilityControlId desc" "LocationGroup" "LocationGroup desc" "AllowToolSelfCheckOut" "AllowToolSelfCheckOut desc" "Company" "Company desc" "PickupWhouseAddressId" "PickupWhouseAddressId desc" "ShipmentType" "ShipmentType desc" "DeliveryTerms" "DeliveryTerms desc" "DelTermsLocation" "DelTermsLocation desc" "ShipViaCode" "ShipViaCode desc" "PickupDuration" "PickupDuration desc" "PurchDeliveryTerms" "PurchDeliveryTerms desc" "PurchDelTermsLocation" "PurchDelTermsLocation desc" "PurchShipViaCode" "PurchShipViaCode desc" "Tolerance" "Tolerance desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "DispCondWorkOrder" "MessageReceiver" "PmRevisionControl" "StRevisionControl" "JobRevisionControl" "DemMatHorizon" "PersonnelRoundValue" "PersonnelRoundFunction" "TfRoundValue" "TfRoundFunction" "CopyScheduleDates" "AllowMultipleVisits" "WoStateDefault" "AllowAutoClockIn" "IgnoreDepExec" "IgnoreObjLvlVld" "ApproveInvoiceOnline" "AvailabilityControlId" "LocationGroup" "AllowToolSelfCheckOut" "Company" "PickupWhouseAddressId" "ShipmentType" "DeliveryTerms" "DelTermsLocation" "ShipViaCode" "PickupDuration" "PurchDeliveryTerms" "PurchDelTermsLocation" "PurchShipViaCode" "Tolerance"
Specify properties to return, see OData Select

Responses
200 response body for entity array SiteMscomInfo
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SiteMscomInfo

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
Get entity from Reference_SiteMscomInfo by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string <= 5 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "DispCondWorkOrder" "MessageReceiver" "PmRevisionControl" "StRevisionControl" "JobRevisionControl" "DemMatHorizon" "PersonnelRoundValue" "PersonnelRoundFunction" "TfRoundValue" "TfRoundFunction" "CopyScheduleDates" "AllowMultipleVisits" "WoStateDefault" "AllowAutoClockIn" "IgnoreDepExec" "IgnoreObjLvlVld" "ApproveInvoiceOnline" "AvailabilityControlId" "LocationGroup" "AllowToolSelfCheckOut" "Company" "PickupWhouseAddressId" "ShipmentType" "DeliveryTerms" "DelTermsLocation" "ShipViaCode" "PickupDuration" "PurchDeliveryTerms" "PurchDelTermsLocation" "PurchShipViaCode" "Tolerance"
Specify properties to return, see OData Select

Responses
200 response body for entity type SiteMscomInfo
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SiteMscomInfo(Contract='{Contract}')

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
"DispCondWorkOrder": true,
"MessageReceiver": "It is a Text",
"PmRevisionControl": "It is a Text",
"StRevisionControl": "It is a Text",
"JobRevisionControl": "It is a Text",
"DemMatHorizon": 1,
"CopyScheduleDates": true,
"AllowMultipleVisits": true,
"WoStateDefault": "It is a Text",
"AllowAutoClockIn": true,
"IgnoreDepExec": true,
"IgnoreObjLvlVld": true,
"ApproveInvoiceOnline": true,
"AvailabilityControlId": "It is a Text",
"LocationGroup": "It is a Text",
"AllowToolSelfCheckOut": true,
"Company": "It is a Text",
"PickupWhouseAddressId": "It is a Text",
"ShipmentType": "It is a Text",
"DeliveryTerms": "It is a Text",
"DelTermsLocation": "It is a Text",
"ShipViaCode": "It is a Text",
"PickupDuration": 1,
"PurchDeliveryTerms": "It is a Text",
"PurchDelTermsLocation": "It is a Text",
"PurchShipViaCode": "It is a Text",
"Tolerance": 1,
"PersonnelRoundValue": "FirstDecimal",
"PersonnelRoundFunction": "None",
"TfRoundValue": "FirstDecimal",
"TfRoundFunction": "None"
}
Reference_SiteInventInfo
Reference Entity Set Reference_SiteInventInfo

Get entities from Reference_SiteInventInfo
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
Items Enum: "Contract" "Contract desc" "CountDiffAmount" "CountDiffAmount desc" "CountDiffPercentage" "CountDiffPercentage desc" "PickingLeadtime" "PickingLeadtime desc" "LastActualCostCalc" "LastActualCostCalc desc" "AvgWorkDaysPerWeek" "AvgWorkDaysPerWeek desc" "NegativeOnHand" "NegativeOnHand desc" "PurchInvValueMethod" "PurchInvValueMethod desc" "ManufInvValueMethod" "ManufInvValueMethod desc" "ExtServiceCostMethod" "ExtServiceCostMethod desc" "InvoiceConsideration" "InvoiceConsideration desc" "MrbAvailControlId" "MrbAvailControlId desc" "CountryCode" "CountryCode desc" "RegionCode" "RegionCode desc" "CostDefaultsManually" "CostDefaultsManually desc" "RounddiffInactivityDays" "RounddiffInactivityDays desc" "UsePartcaDescInvent" "UsePartcaDescInvent desc" "DefaultQtyCalcRound" "DefaultQtyCalcRound desc" "ServiceLevelRate" "ServiceLevelRate desc" "OrderingCost" "OrderingCost desc" "InventoryInterestRate" "InventoryInterestRate desc" "LatestPlanActivityTime" "LatestPlanActivityTime desc" "AbcClassPerAssetClass" "AbcClassPerAssetClass desc" "UpperLimitVeryslowMover" "UpperLimitVeryslowMover desc" "UpperLimitSlowMover" "UpperLimitSlowMover desc" "UpperLimitMediumMover" "UpperLimitMediumMover desc" "BinHeightCapacity" "BinHeightCapacity desc" "BinWidthCapacity" "BinWidthCapacity desc" "BinDeptCapacity" "BinDeptCapacity desc" "BinVolumeCapacity" "BinVolumeCapacity desc" "BinCarryingCapacity" "BinCarryingCapacity desc" "BinMinTemperature" "BinMinTemperature desc" "BinMaxTemperature" "BinMaxTemperature desc" "BinMinHumidity" "BinMinHumidity desc" "BinMaxHumidity" "BinMaxHumidity desc" "BayCarryingCapacity" "BayCarryingCapacity desc" "RowCarryingCapacity" "RowCarryingCapacity desc" "TierCarryingCapacity" "TierCarryingCapacity desc" "ReceiptsBlocked" "ReceiptsBlocked desc" "ReceiptToOccupiedBlocked" "ReceiptToOccupiedBlocked desc" "AllowPartlocOwnerMix" "AllowPartlocOwnerMix desc" "MixOfPartNumberBlocked" "MixOfPartNumberBlocked desc" "MixOfCondCodesBlocked" "MixOfCondCodesBlocked desc" "MixOfLotBatchNoBlocked" "MixOfLotBatchNoBlocked desc" "ExcludeStorageReqVal" "ExcludeStorageReqVal desc" "TransportFromWhseLevel" "TransportFromWhseLevel desc" "TransportToWhseLevel" "TransportToWhseLevel desc" "TransportPartConsLevel" "TransportPartConsLevel desc" "TransportRefConsLevel" "TransportRefConsLevel desc" "PutawayZoneRefillOption" "PutawayZoneRefillOption desc" "AutoDropofManTransTask" "AutoDropofManTransTask desc" "AllowDeviatingAvailCtrl" "AllowDeviatingAvailCtrl desc" "ExecTranspTaskBackground" "ExecTranspTaskBackground desc" "ResetConfigStdCost" "ResetConfigStdCost desc" "FreezeStockCountReport" "FreezeStockCountReport desc" "CountingPrintReportOpt" "CountingPrintReportOpt desc" "MoveReservationOption" "MoveReservationOption desc" "PickByChoiceOption" "PickByChoiceOption desc" "AutoReservePrio1" "AutoReservePrio1 desc" "AutoReservePrio2" "AutoReservePrio2 desc" "AutoReservePrio3" "AutoReservePrio3 desc" "AutoReservePrio4" "AutoReservePrio4 desc" "AutoReservePrio5" "AutoReservePrio5 desc" "AutoReserveHuOptimized" "AutoReserveHuOptimized desc" "AutoReserveReceiptTime" "AutoReserveReceiptTime desc" "ReservFromTranspTask" "ReservFromTranspTask desc" "MaxCountingLines" "MaxCountingLines desc" "CascadPostingDateOption" "CascadPostingDateOption desc" "TimeLagForDeliveries" "TimeLagForDeliveries desc" "DeliveryDocCommMethod" "DeliveryDocCommMethod desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "CountDiffAmount" "CountDiffPercentage" "PickingLeadtime" "LastActualCostCalc" "AvgWorkDaysPerWeek" "NegativeOnHand" "PurchInvValueMethod" "ManufInvValueMethod" "ExtServiceCostMethod" "InvoiceConsideration" "MrbAvailControlId" "CountryCode" "RegionCode" "CostDefaultsManually" "RounddiffInactivityDays" "UsePartcaDescInvent" "DefaultQtyCalcRound" "ServiceLevelRate" "OrderingCost" "InventoryInterestRate" "LatestPlanActivityTime" "AbcClassPerAssetClass" "UpperLimitVeryslowMover" "UpperLimitSlowMover" "UpperLimitMediumMover" "BinHeightCapacity" "BinWidthCapacity" "BinDeptCapacity" "BinVolumeCapacity" "BinCarryingCapacity" "BinMinTemperature" "BinMaxTemperature" "BinMinHumidity" "BinMaxHumidity" "BayCarryingCapacity" "RowCarryingCapacity" "TierCarryingCapacity" "ReceiptsBlocked" "ReceiptToOccupiedBlocked" "AllowPartlocOwnerMix" "MixOfPartNumberBlocked" "MixOfCondCodesBlocked" "MixOfLotBatchNoBlocked" "ExcludeStorageReqVal" "TransportFromWhseLevel" "TransportToWhseLevel" "TransportPartConsLevel" "TransportRefConsLevel" "PutawayZoneRefillOption" "AutoDropofManTransTask" "AllowDeviatingAvailCtrl" "ExecTranspTaskBackground" "ResetConfigStdCost" "FreezeStockCountReport" "CountingPrintReportOpt" "MoveReservationOption" "PickByChoiceOption" "AutoReservePrio1" "AutoReservePrio2" "AutoReservePrio3" "AutoReservePrio4" "AutoReservePrio5" "AutoReserveHuOptimized" "AutoReserveReceiptTime" "ReservFromTranspTask" "MaxCountingLines" "CascadPostingDateOption" "TimeLagForDeliveries" "DeliveryDocCommMethod"
Specify properties to return, see OData Select

Responses
200 response body for entity array SiteInventInfo
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SiteInventInfo

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
Get entity from Reference_SiteInventInfo by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string <= 5 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "CountDiffAmount" "CountDiffPercentage" "PickingLeadtime" "LastActualCostCalc" "AvgWorkDaysPerWeek" "NegativeOnHand" "PurchInvValueMethod" "ManufInvValueMethod" "ExtServiceCostMethod" "InvoiceConsideration" "MrbAvailControlId" "CountryCode" "RegionCode" "CostDefaultsManually" "RounddiffInactivityDays" "UsePartcaDescInvent" "DefaultQtyCalcRound" "ServiceLevelRate" "OrderingCost" "InventoryInterestRate" "LatestPlanActivityTime" "AbcClassPerAssetClass" "UpperLimitVeryslowMover" "UpperLimitSlowMover" "UpperLimitMediumMover" "BinHeightCapacity" "BinWidthCapacity" "BinDeptCapacity" "BinVolumeCapacity" "BinCarryingCapacity" "BinMinTemperature" "BinMaxTemperature" "BinMinHumidity" "BinMaxHumidity" "BayCarryingCapacity" "RowCarryingCapacity" "TierCarryingCapacity" "ReceiptsBlocked" "ReceiptToOccupiedBlocked" "AllowPartlocOwnerMix" "MixOfPartNumberBlocked" "MixOfCondCodesBlocked" "MixOfLotBatchNoBlocked" "ExcludeStorageReqVal" "TransportFromWhseLevel" "TransportToWhseLevel" "TransportPartConsLevel" "TransportRefConsLevel" "PutawayZoneRefillOption" "AutoDropofManTransTask" "AllowDeviatingAvailCtrl" "ExecTranspTaskBackground" "ResetConfigStdCost" "FreezeStockCountReport" "CountingPrintReportOpt" "MoveReservationOption" "PickByChoiceOption" "AutoReservePrio1" "AutoReservePrio2" "AutoReservePrio3" "AutoReservePrio4" "AutoReservePrio5" "AutoReserveHuOptimized" "AutoReserveReceiptTime" "ReservFromTranspTask" "MaxCountingLines" "CascadPostingDateOption" "TimeLagForDeliveries" "DeliveryDocCommMethod"
Specify properties to return, see OData Select

Responses
200 response body for entity type SiteInventInfo
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SiteInventInfo(Contract='{Contract}')

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
"CountDiffAmount": 1,
"CountDiffPercentage": 1,
"PickingLeadtime": 1,
"LastActualCostCalc": "2019-10-01T01:01:01Z",
"AvgWorkDaysPerWeek": 1,
"MrbAvailControlId": "It is a Text",
"CountryCode": "It is a Text",
"RegionCode": "It is a Text",
"CostDefaultsManually": true,
"RounddiffInactivityDays": 1,
"UsePartcaDescInvent": true,
"DefaultQtyCalcRound": 1,
"ServiceLevelRate": 1,
"OrderingCost": 1,
"InventoryInterestRate": 1,
"LatestPlanActivityTime": "2019-10-10",
"AbcClassPerAssetClass": true,
"UpperLimitVeryslowMover": 1,
"UpperLimitSlowMover": 1,
"UpperLimitMediumMover": 1,
"BinHeightCapacity": 1,
"BinWidthCapacity": 1,
"BinDeptCapacity": 1,
"BinVolumeCapacity": 1,
"BinCarryingCapacity": 1,
"BinMinTemperature": 1,
"BinMaxTemperature": 1,
"BinMinHumidity": 1,
"BinMaxHumidity": 1,
"BayCarryingCapacity": 1,
"RowCarryingCapacity": 1,
"TierCarryingCapacity": 1,
"ReceiptsBlocked": true,
"ReceiptToOccupiedBlocked": true,
"AllowPartlocOwnerMix": true,
"MixOfPartNumberBlocked": true,
"MixOfCondCodesBlocked": true,
"MixOfLotBatchNoBlocked": true,
"ExcludeStorageReqVal": true,
"AutoDropofManTransTask": true,
"AllowDeviatingAvailCtrl": true,
"ExecTranspTaskBackground": true,
"ResetConfigStdCost": true,
"FreezeStockCountReport": true,
"AutoReserveHuOptimized": true,
"AutoReserveReceiptTime": true,
"MaxCountingLines": 1,
"TimeLagForDeliveries": 1,
"NegativeOnHand": "NegativeOnHandAllowed",
"PurchInvValueMethod": "WeightedAverage",
"ManufInvValueMethod": "WeightedAverage",
"ExtServiceCostMethod": "IncludeServiceCost",
"InvoiceConsideration": "IgnoreInvoicePrice",
"TransportFromWhseLevel": "Site",
"TransportToWhseLevel": "Site",
"TransportPartConsLevel": "MultipleParts",
"TransportRefConsLevel": "MultipleReferences",
"PutawayZoneRefillOption": "NoRefill",
"CountingPrintReportOpt": "Detailed",
"MoveReservationOption": "NotAllowed",
"PickByChoiceOption": "NotAllowed",
"AutoReservePrio1": "ExpirationDate",
"AutoReservePrio2": "ExpirationDate",
"AutoReservePrio3": "ExpirationDate",
"AutoReservePrio4": "ExpirationDate",
"AutoReservePrio5": "ExpirationDate",
"ReservFromTranspTask": "Yes",
"CascadPostingDateOption": "TransAppliedDate",
"DeliveryDocCommMethod": "Automatic"
}
Reference_SiteDiscomInfo
Reference Entity Set Reference_SiteDiscomInfo

Get entities from Reference_SiteDiscomInfo
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
Items Enum: "Contract" "Contract desc" "DocumentAddressId" "DocumentAddressId desc" "Branch" "Branch desc" "PurchCompMethod" "PurchCompMethod desc" "CustOrderPricingMethod" "CustOrderPricingMethod desc" "CustOrderDiscountMethod" "CustOrderDiscountMethod desc" "DispCondCustomerOrder" "DispCondCustomerOrder desc" "DispCondPurchaseOrder" "DispCondPurchaseOrder desc" "UsePartcaDescOrder" "UsePartcaDescOrder desc" "UsePartcaDescPurch" "UsePartcaDescPurch desc" "CreateOrdInRelState" "CreateOrdInRelState desc" "UsePreShipDelNote" "UsePreShipDelNote desc" "FairShareReservation" "FairShareReservation desc" "ShipmentFreightCharge" "ShipmentFreightCharge desc" "SendAutoDisAdv" "SendAutoDisAdv desc" "PriceEffectiveDate" "PriceEffectiveDate desc" "ShipInventoryLocationNo" "ShipInventoryLocationNo desc" "EnforceUseOfPoco" "EnforceUseOfPoco desc" "CreateBasePricePlanned" "CreateBasePricePlanned desc" "ReceiveCase" "ReceiveCase desc" "ShipmentType" "ShipmentType desc" "EdiAutoOrderApproval" "EdiAutoOrderApproval desc" "UsePriceInclTaxOrder" "UsePriceInclTaxOrder desc" "UsePriceInclTaxPurch" "UsePriceInclTaxPurch desc" "EdiAutoChangeApproval" "EdiAutoChangeApproval desc" "EdiAuthorizeCode" "EdiAuthorizeCode desc" "EdiAutoApprovalUser" "EdiAutoApprovalUser desc" "ForwardAgentId" "ForwardAgentId desc" "OrderId" "OrderId desc" "Priority" "Priority desc" "ReplicateDocText" "ReplicateDocText desc" "FinalizeSuppShipment" "FinalizeSuppShipment desc" "DiscountType" "DiscountType desc" "ReleaseInternalOrder" "ReleaseInternalOrder desc" "ExecOrderChangeOnline" "ExecOrderChangeOnline desc" "DiscountFreeze" "DiscountFreeze desc" "OverDelivery" "OverDelivery desc" "OverDeliveryTolerance" "OverDeliveryTolerance desc" "ActionNonAuthorized" "ActionNonAuthorized desc" "ActionAuthorized" "ActionAuthorized desc" "DirDelApproval" "DirDelApproval desc" "OrderConfApproval" "OrderConfApproval desc" "OrderConfDiffApproval" "OrderConfDiffApproval desc" "AdhocPurRqstApproval" "AdhocPurRqstApproval desc" "CreateConfChangeOrder" "CreateConfChangeOrder desc" "SuppAutoApprovalUser" "SuppAutoApprovalUser desc" "PrintPickReport" "PrintPickReport desc" "AllowAutoSubOfParts" "AllowAutoSubOfParts desc" "AllowOverruleLimitSales" "AllowOverruleLimitSales desc" "UnattachHuAtDelivery" "UnattachHuAtDelivery desc" "ReservFromTranspTask" "ReservFromTranspTask desc" "CustOrderConfirmation" "CustOrderConfirmation desc" "Company" "Company desc" "InclReleasedPoLines" "InclReleasedPoLines desc" "InclConfirmedPoLines" "InclConfirmedPoLines desc" "InclArrivedPoLines" "InclArrivedPoLines desc" "InclReceivedPoLines" "InclReceivedPoLines desc" "InclPastDuePoLines" "InclPastDuePoLines desc" "PoPastDueDaysAllowed" "PoPastDueDaysAllowed desc" "InclPlannedDo" "InclPlannedDo desc" "ChgTypeFreight" "ChgTypeFreight desc" "ChgTypeInsurance" "ChgTypeInsurance desc" "ChgTypeOther" "ChgTypeOther desc" "RemoteWarehouseId" "RemoteWarehouseId desc" "TransAtpInfoDirDel" "TransAtpInfoDirDel desc" "DefHuTypeForPickPack" "DefHuTypeForPickPack desc" "DocumentType" "DocumentType desc" "SiteDateForDelDate" "SiteDateForDelDate desc" "PartAvailCtrlAtPbc" "PartAvailCtrlAtPbc desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "DocumentAddressId" "Branch" "PurchCompMethod" "CustOrderPricingMethod" "CustOrderDiscountMethod" "DispCondCustomerOrder" "DispCondPurchaseOrder" "UsePartcaDescOrder" "UsePartcaDescPurch" "CreateOrdInRelState" "UsePreShipDelNote" "FairShareReservation" "ShipmentFreightCharge" "SendAutoDisAdv" "PriceEffectiveDate" "ShipInventoryLocationNo" "EnforceUseOfPoco" "CreateBasePricePlanned" "ReceiveCase" "ShipmentType" "EdiAutoOrderApproval" "UsePriceInclTaxOrder" "UsePriceInclTaxPurch" "EdiAutoChangeApproval" "EdiAuthorizeCode" "EdiAutoApprovalUser" "ForwardAgentId" "OrderId" "Priority" "ReplicateDocText" "FinalizeSuppShipment" "DiscountType" "ReleaseInternalOrder" "ExecOrderChangeOnline" "DiscountFreeze" "OverDelivery" "OverDeliveryTolerance" "ActionNonAuthorized" "ActionAuthorized" "DirDelApproval" "OrderConfApproval" "OrderConfDiffApproval" "AdhocPurRqstApproval" "CreateConfChangeOrder" "SuppAutoApprovalUser" "PrintPickReport" "AllowAutoSubOfParts" "AllowOverruleLimitSales" "UnattachHuAtDelivery" "ReservFromTranspTask" "CustOrderConfirmation" "Company" "InclReleasedPoLines" "InclConfirmedPoLines" "InclArrivedPoLines" "InclReceivedPoLines" "InclPastDuePoLines" "PoPastDueDaysAllowed" "InclPlannedDo" "ChgTypeFreight" "ChgTypeInsurance" "ChgTypeOther" "RemoteWarehouseId" "TransAtpInfoDirDel" "DefHuTypeForPickPack" "DocumentType" "SiteDateForDelDate" "PartAvailCtrlAtPbc"
Specify properties to return, see OData Select

Responses
200 response body for entity array SiteDiscomInfo
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SiteDiscomInfo

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
Get entity from Reference_SiteDiscomInfo by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string <= 5 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "DocumentAddressId" "Branch" "PurchCompMethod" "CustOrderPricingMethod" "CustOrderDiscountMethod" "DispCondCustomerOrder" "DispCondPurchaseOrder" "UsePartcaDescOrder" "UsePartcaDescPurch" "CreateOrdInRelState" "UsePreShipDelNote" "FairShareReservation" "ShipmentFreightCharge" "SendAutoDisAdv" "PriceEffectiveDate" "ShipInventoryLocationNo" "EnforceUseOfPoco" "CreateBasePricePlanned" "ReceiveCase" "ShipmentType" "EdiAutoOrderApproval" "UsePriceInclTaxOrder" "UsePriceInclTaxPurch" "EdiAutoChangeApproval" "EdiAuthorizeCode" "EdiAutoApprovalUser" "ForwardAgentId" "OrderId" "Priority" "ReplicateDocText" "FinalizeSuppShipment" "DiscountType" "ReleaseInternalOrder" "ExecOrderChangeOnline" "DiscountFreeze" "OverDelivery" "OverDeliveryTolerance" "ActionNonAuthorized" "ActionAuthorized" "DirDelApproval" "OrderConfApproval" "OrderConfDiffApproval" "AdhocPurRqstApproval" "CreateConfChangeOrder" "SuppAutoApprovalUser" "PrintPickReport" "AllowAutoSubOfParts" "AllowOverruleLimitSales" "UnattachHuAtDelivery" "ReservFromTranspTask" "CustOrderConfirmation" "Company" "InclReleasedPoLines" "InclConfirmedPoLines" "InclArrivedPoLines" "InclReceivedPoLines" "InclPastDuePoLines" "PoPastDueDaysAllowed" "InclPlannedDo" "ChgTypeFreight" "ChgTypeInsurance" "ChgTypeOther" "RemoteWarehouseId" "TransAtpInfoDirDel" "DefHuTypeForPickPack" "DocumentType" "SiteDateForDelDate" "PartAvailCtrlAtPbc"
Specify properties to return, see OData Select

Responses
200 response body for entity type SiteDiscomInfo
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SiteDiscomInfo(Contract='{Contract}')

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
"DocumentAddressId": "It is a Text",
"Branch": "It is a Text",
"DispCondCustomerOrder": true,
"DispCondPurchaseOrder": true,
"UsePartcaDescOrder": true,
"UsePartcaDescPurch": true,
"CreateOrdInRelState": true,
"UsePreShipDelNote": true,
"FairShareReservation": true,
"ShipmentFreightCharge": true,
"SendAutoDisAdv": true,
"PriceEffectiveDate": true,
"ShipInventoryLocationNo": "It is a Text",
"EnforceUseOfPoco": true,
"CreateBasePricePlanned": true,
"ShipmentType": "It is a Text",
"UsePriceInclTaxOrder": true,
"UsePriceInclTaxPurch": true,
"EdiAuthorizeCode": "It is a Text",
"EdiAutoApprovalUser": "It is a Text",
"ForwardAgentId": "It is a Text",
"OrderId": "It is a Text",
"Priority": 1,
"FinalizeSuppShipment": true,
"DiscountType": "It is a Text",
"ExecOrderChangeOnline": true,
"DiscountFreeze": true,
"OverDelivery": true,
"OverDeliveryTolerance": 1,
"CreateConfChangeOrder": true,
"SuppAutoApprovalUser": "It is a Text",
"AllowAutoSubOfParts": true,
"AllowOverruleLimitSales": true,
"UnattachHuAtDelivery": true,
"Company": "It is a Text",
"InclReleasedPoLines": true,
"InclConfirmedPoLines": true,
"InclArrivedPoLines": true,
"InclReceivedPoLines": true,
"InclPastDuePoLines": true,
"PoPastDueDaysAllowed": 1,
"InclPlannedDo": true,
"ChgTypeFreight": "It is a Text",
"ChgTypeInsurance": "It is a Text",
"ChgTypeOther": "It is a Text",
"RemoteWarehouseId": "It is a Text",
"TransAtpInfoDirDel": true,
"DefHuTypeForPickPack": "It is a Text",
"DocumentType": "It is a Text",
"SiteDateForDelDate": true,
"PartAvailCtrlAtPbc": true,
"PurchCompMethod": "CustomerOrder",
"CustOrderPricingMethod": "OrderDate",
"CustOrderDiscountMethod": "SingleDiscount",
"ReceiveCase": "ReceiveIntoInventory",
"EdiAutoOrderApproval": "Automatically",
"EdiAutoChangeApproval": "Automatically",
"ReplicateDocText": "Replicate",
"ReleaseInternalOrder": "Automatically",
"ActionNonAuthorized": "None",
"ActionAuthorized": "Warning",
"DirDelApproval": "Automatically",
"OrderConfApproval": "Automatically",
"OrderConfDiffApproval": "Automatically",
"AdhocPurRqstApproval": "Automatically",
"PrintPickReport": "Detailed",
"ReservFromTranspTask": "Yes",
"CustOrderConfirmation": "OrderLevel"
}
Reference_SiteMfgstdInfo
Reference Entity Set Reference_SiteMfgstdInfo

Get entities from Reference_SiteMfgstdInfo
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
Items Enum: "Contract" "Contract desc" "DispositionOfQuotation" "DispositionOfQuotation desc" "StructureUpdate" "StructureUpdate desc" "StructureStateDefault" "StructureStateDefault desc" "RerunMsOnlineCons" "RerunMsOnlineCons desc" "DpImportForecastBy" "DpImportForecastBy desc" "DopAutoClose" "DopAutoClose desc" "DopClosedConfigEdit" "DopClosedConfigEdit desc" "ShpordReceiptBackground" "ShpordReceiptBackground desc" "VimMroEnabled" "VimMroEnabled desc" "UseRelPrInPlanning" "UseRelPrInPlanning desc" "CalendarSettings" "CalendarSettings desc" "ArchiveRecipeStruct" "ArchiveRecipeStruct desc" "CalcCostProgress" "CalcCostProgress desc" "CreateMltRepairSo" "CreateMltRepairSo desc" "OperationReportMode" "OperationReportMode desc" "DispLiAutoEnterAsDlg" "DispLiAutoEnterAsDlg desc" "DispLiIdleTime" "DispLiIdleTime desc" "AuthorizationRequired" "AuthorizationRequired desc" "DefaultQtyOnReport" "DefaultQtyOnReport desc" "DefaultTimeOnReport" "DefaultTimeOnReport desc" "AutoBuildTrackedStruct" "AutoBuildTrackedStruct desc" "MsrcptToMrpForDop" "MsrcptToMrpForDop desc" "DirectLabor" "DirectLabor desc" "LaborOverhead" "LaborOverhead desc" "PrototypeRevisionPrefix" "PrototypeRevisionPrefix desc" "PrototypeAsSupply" "PrototypeAsSupply desc" "ReceiveByproduct" "ReceiveByproduct desc" "CurrRevWhenPastDue" "CurrRevWhenPastDue desc" "CompetencyCheckOption" "CompetencyCheckOption desc" "ShopOrdAutoClose" "ShopOrdAutoClose desc" "ReleasedPrFromDop" "ReleasedPrFromDop desc" "RecipeStructDecimals" "RecipeStructDecimals desc" "CreateSoStatusPlanned" "CreateSoStatusPlanned desc" "AllowResOutsideBalance" "AllowResOutsideBalance desc" "SoConnectedHuAvailCtrlId" "SoConnectedHuAvailCtrlId desc" "DispoAutoReportMtrl" "DispoAutoReportMtrl desc" "DispoAutoReportOper" "DispoAutoReportOper desc" "MroDefRcptLocationNo" "MroDefRcptLocationNo desc" "MroDefDisassemCondCode" "MroDefDisassemCondCode desc" "MroDefAssemCondCode" "MroDefAssemCondCode desc" "UnreserveOnPartialPick" "UnreserveOnPartialPick desc" "BaseLabResOnAttendance" "BaseLabResOnAttendance desc" "RoutingOpNumberingStep" "RoutingOpNumberingStep desc" "CapCheckScheduleOper" "CapCheckScheduleOper desc" "RegUnit" "RegUnit desc" "InclPlannedSo" "InclPlannedSo desc" "InclReleasedSo" "InclReleasedSo desc" "InclPastDueSo" "InclPastDueSo desc" "SoPastDueDaysAllowed" "SoPastDueDaysAllowed desc" "InheritParentMaintLevel" "InheritParentMaintLevel desc" "SoLotBatchForByProd" "SoLotBatchForByProd desc" "DispoAutoUpdRepairOrd" "DispoAutoUpdRepairOrd desc" "DisassemblyScrapReason" "DisassemblyScrapReason desc" "ReceiveDisassCompRule" "ReceiveDisassCompRule desc" "ConfigChangeAllowed" "ConfigChangeAllowed desc" "CreateOrderBasedLots" "CreateOrderBasedLots desc" "CreatePrForExtServ" "CreatePrForExtServ desc" "UseDigiSignature" "UseDigiSignature desc" "UseManualShpOrdReq" "UseManualShpOrdReq desc" "CNcrAttachSize" "CNcrAttachSize desc" "CDaysBeforeRelease" "CDaysBeforeRelease desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "DispositionOfQuotation" "StructureUpdate" "StructureStateDefault" "RerunMsOnlineCons" "DpImportForecastBy" "DopAutoClose" "DopClosedConfigEdit" "ShpordReceiptBackground" "VimMroEnabled" "UseRelPrInPlanning" "CalendarSettings" "ArchiveRecipeStruct" "CalcCostProgress" "CreateMltRepairSo" "OperationReportMode" "DispLiAutoEnterAsDlg" "DispLiIdleTime" "AuthorizationRequired" "DefaultQtyOnReport" "DefaultTimeOnReport" "AutoBuildTrackedStruct" "MsrcptToMrpForDop" "DirectLabor" "LaborOverhead" "PrototypeRevisionPrefix" "PrototypeAsSupply" "ReceiveByproduct" "CurrRevWhenPastDue" "CompetencyCheckOption" "ShopOrdAutoClose" "ReleasedPrFromDop" "RecipeStructDecimals" "CreateSoStatusPlanned" "AllowResOutsideBalance" "SoConnectedHuAvailCtrlId" "DispoAutoReportMtrl" "DispoAutoReportOper" "MroDefRcptLocationNo" "MroDefDisassemCondCode" "MroDefAssemCondCode" "UnreserveOnPartialPick" "BaseLabResOnAttendance" "RoutingOpNumberingStep" "CapCheckScheduleOper" "CapCheckLoadTypes" "RegUnit" "InclPlannedSo" "InclReleasedSo" "InclPastDueSo" "SoPastDueDaysAllowed" "InheritParentMaintLevel" "SoLotBatchForByProd" "DispoAutoUpdRepairOrd" "DisassemblyScrapReason" "ReceiveDisassCompRule" "ConfigChangeAllowed" "CreateOrderBasedLots" "CreatePrForExtServ" "UseDigiSignature" "DigitalSigDemandSource" "UseManualShpOrdReq" "CNcrAttachSize" "CDaysBeforeRelease"
Specify properties to return, see OData Select

Responses
200 response body for entity array SiteMfgstdInfo
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SiteMfgstdInfo

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
Get entity from Reference_SiteMfgstdInfo by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string <= 5 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "DispositionOfQuotation" "StructureUpdate" "StructureStateDefault" "RerunMsOnlineCons" "DpImportForecastBy" "DopAutoClose" "DopClosedConfigEdit" "ShpordReceiptBackground" "VimMroEnabled" "UseRelPrInPlanning" "CalendarSettings" "ArchiveRecipeStruct" "CalcCostProgress" "CreateMltRepairSo" "OperationReportMode" "DispLiAutoEnterAsDlg" "DispLiIdleTime" "AuthorizationRequired" "DefaultQtyOnReport" "DefaultTimeOnReport" "AutoBuildTrackedStruct" "MsrcptToMrpForDop" "DirectLabor" "LaborOverhead" "PrototypeRevisionPrefix" "PrototypeAsSupply" "ReceiveByproduct" "CurrRevWhenPastDue" "CompetencyCheckOption" "ShopOrdAutoClose" "ReleasedPrFromDop" "RecipeStructDecimals" "CreateSoStatusPlanned" "AllowResOutsideBalance" "SoConnectedHuAvailCtrlId" "DispoAutoReportMtrl" "DispoAutoReportOper" "MroDefRcptLocationNo" "MroDefDisassemCondCode" "MroDefAssemCondCode" "UnreserveOnPartialPick" "BaseLabResOnAttendance" "RoutingOpNumberingStep" "CapCheckScheduleOper" "CapCheckLoadTypes" "RegUnit" "InclPlannedSo" "InclReleasedSo" "InclPastDueSo" "SoPastDueDaysAllowed" "InheritParentMaintLevel" "SoLotBatchForByProd" "DispoAutoUpdRepairOrd" "DisassemblyScrapReason" "ReceiveDisassCompRule" "ConfigChangeAllowed" "CreateOrderBasedLots" "CreatePrForExtServ" "UseDigiSignature" "DigitalSigDemandSource" "UseManualShpOrdReq" "CNcrAttachSize" "CDaysBeforeRelease"
Specify properties to return, see OData Select

Responses
200 response body for entity type SiteMfgstdInfo
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SiteMfgstdInfo(Contract='{Contract}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objgrants": "It is a Text",
"Contract": "It is a Text",
"RerunMsOnlineCons": true,
"DopAutoClose": true,
"DopClosedConfigEdit": true,
"ShpordReceiptBackground": true,
"VimMroEnabled": true,
"UseRelPrInPlanning": true,
"CalcCostProgress": true,
"CreateMltRepairSo": true,
"DispLiAutoEnterAsDlg": true,
"DispLiIdleTime": 1,
"AuthorizationRequired": true,
"DefaultQtyOnReport": true,
"DefaultTimeOnReport": true,
"AutoBuildTrackedStruct": true,
"MsrcptToMrpForDop": true,
"PrototypeRevisionPrefix": "It is a Text",
"PrototypeAsSupply": true,
"ReceiveByproduct": true,
"CurrRevWhenPastDue": true,
"ShopOrdAutoClose": true,
"ReleasedPrFromDop": true,
"RecipeStructDecimals": 1,
"CreateSoStatusPlanned": true,
"AllowResOutsideBalance": true,
"SoConnectedHuAvailCtrlId": "It is a Text",
"DispoAutoReportMtrl": true,
"DispoAutoReportOper": true,
"MroDefRcptLocationNo": "It is a Text",
"MroDefDisassemCondCode": "It is a Text",
"MroDefAssemCondCode": "It is a Text",
"UnreserveOnPartialPick": true,
"BaseLabResOnAttendance": true,
"RoutingOpNumberingStep": 1,
"CapCheckScheduleOper": true,
"InclPlannedSo": true,
"InclReleasedSo": true,
"InclPastDueSo": true,
"SoPastDueDaysAllowed": 1,
"InheritParentMaintLevel": true,
"SoLotBatchForByProd": true,
"DispoAutoUpdRepairOrd": true,
"DisassemblyScrapReason": "It is a Text",
"ConfigChangeAllowed": true,
"CreateOrderBasedLots": true,
"CreatePrForExtServ": true,
"UseDigiSignature": true,
"UseManualShpOrdReq": true,
"CNcrAttachSize": 1,
"CDaysBeforeRelease": 1,
"DispositionOfQuotation": "Ignore",
"StructureUpdate": "Restricted",
"StructureStateDefault": "Tentative",
"DpImportForecastBy": "Part",
"CalendarSettings": "IncludeCalendarTimeOnly",
"ArchiveRecipeStruct": "Never",
"OperationReportMode": "Employee",
"DirectLabor": "EmployeeCost",
"LaborOverhead": "EmployeeLaborClass",
"CompetencyCheckOption": "NotConsidered",
"CapCheckLoadTypes": [
"ShopOrder",
"Promised",
"Dop",
"Requisitioned",
"MasterSchedule",
"ProductionSchedule",
"Maintenance",
"ResourceBreak"
],
"RegUnit": "QtyInDisplay",
"ReceiveDisassCompRule": "Never",
"DigitalSigDemandSource": [
"NonCamroCro",
"Camro",
"Cro"
]
}
Reference_CompanyFinance
Reference Entity Set Reference_CompanyFinance

Get entities from Reference_CompanyFinance
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
Items Enum: "Company" "Company desc" "Description" "Description desc" "CurrencyCode" "CurrencyCode desc" "ValidFrom" "ValidFrom desc" "CorrectionType" "CorrectionType desc" "ParallelAccCurrency" "ParallelAccCurrency desc" "TimeStamp" "TimeStamp desc" "RecalculationDate" "RecalculationDate desc" "DefAmountMethod" "DefAmountMethod desc" "CreationFinished" "CreationFinished desc" "UseVouNoPeriod" "UseVouNoPeriod desc" "ReverseVouCorrType" "ReverseVouCorrType desc" "PeriodClosingMethod" "PeriodClosingMethod desc" "UserDefCal" "UserDefCal desc" "ParallelBase" "ParallelBase desc" "ParallelRateType" "ParallelRateType desc" "MasterCompany" "MasterCompany desc" "MasterCompanyName" "MasterCompanyName desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "Description" "CurrencyCode" "ValidFrom" "CorrectionType" "ParallelAccCurrency" "TimeStamp" "RecalculationDate" "DefAmountMethod" "CreationFinished" "UseVouNoPeriod" "ReverseVouCorrType" "PeriodClosingMethod" "UserDefCal" "ParallelBase" "ParallelRateType" "MasterCompany" "MasterCompanyName"
Specify properties to return, see OData Select

Responses
200 response body for entity array CompanyFinance
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CompanyFinance

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
Get entity from Reference_CompanyFinance by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string <= 20 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "Description" "CurrencyCode" "ValidFrom" "CorrectionType" "ParallelAccCurrency" "TimeStamp" "RecalculationDate" "DefAmountMethod" "CreationFinished" "UseVouNoPeriod" "ReverseVouCorrType" "PeriodClosingMethod" "UserDefCal" "ParallelBase" "ParallelRateType" "MasterCompany" "MasterCompanyName"
Specify properties to return, see OData Select

Responses
200 response body for entity type CompanyFinance
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CompanyFinance(Company='{Company}')

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
"Company": "It is a Text",
"Description": "It is a Text",
"CurrencyCode": "It is a Text",
"ValidFrom": "2019-10-10",
"ParallelAccCurrency": "It is a Text",
"TimeStamp": "2019-10-10",
"RecalculationDate": "2019-10-10",
"CreationFinished": "It is a Text",
"UseVouNoPeriod": "It is a Text",
"UserDefCal": "It is a Text",
"ParallelRateType": "It is a Text",
"MasterCompany": "It is a Text",
"MasterCompanyName": "It is a Text",
"CorrectionType": "Reverse",
"DefAmountMethod": "GrossAmountEntry",
"ReverseVouCorrType": "Reverse",
"PeriodClosingMethod": "Reversible",
"ParallelBase": "TransactionCurrency"
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
