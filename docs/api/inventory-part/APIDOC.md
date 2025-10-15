
REST API Documentation
Search...
Lookup_IsoUnit_EntitySet
Lookup_IsoCountry_EntitySet
NoteTexts
InventoryPartVirtualSet
CopyPartSet
PartInformationSet
CustomerWarrantyConditionSet
SupplierPartInformationSet
SupplierWarrantyTypeSet
SupplierWarrantyConditionSet
CPpvPurReqSet
InventoryPartSet
InventoryPartAlternativePartQuerySet
Service Operations - Actions
Service Operations - Functions
Reference_StandardNamesLov
Reference_TechnicalCoordinatorLov
Reference_InventoryPartLov
Reference_LovCommodityGroup2
Reference_LovCommodityGroup1
Reference_InputUomGroupLov
Reference_InventoryPartPlannerLov
Reference_UserAllowedSiteLov
Reference_InventoryPartLov18
Reference_OutputTypeLov
Reference_MpccomPhraseTextLov
Reference_IntorderPartLov
Reference_DiscreteCharacNumericValue
Reference_CharacteristicLov
Reference_PartCatalogNotPositionLov
Reference_PartCatalogLov
Reference_MaterialPriceElementLov
Reference_GetValidPurReq
Reference_CPurchaseBuyerLov
Reference_InventoryPartAlternativePartQuery
Reference_NoteTextVirtual
Reference_InventoryPartVirtual
Reference_CopyCharacteristicsTemplateVirtual
Reference_CopyPartVirtual
Reference_PartInformationVirtual
Reference_CustomerWarrantyTypeVirtual
Reference_SupplierPartInformationVirtual
Reference_SupplierWarrantyTypeVirtual
Reference_CPpvPurReqVirtual
Reference_IsoUnit
Reference_PurchaseRequisition
Reference_PartCostGroup
Reference_ManufEngineer
Reference_ShopOrderProcessType
Reference_CReasonPartCreation
Reference_Requisitioner
Reference_DocumentText
Reference_ManufPartAttribute
Reference_RepairCodePart
Reference_PartCopyEventParameter
Reference_CustomerWarrantyCondition
Reference_WarrantyCondition
Reference_WarrantyLanguageDescription
Reference_IsoLanguage
Reference_CustWarrantyType
Reference_SupplierWarrantyCondition
Reference_InventoryMaterialPriceElement
Reference_AbcClass
Reference_SiteInventInfo
Reference_PartCatalog
Reference_AssetClass
Reference_InventoryPartStatusPar
Reference_SafetyInstruction
Reference_AccountingGroup
Reference_InventoryProductCode
Reference_InventoryProductFamily
Reference_IsoCountry
Reference_CountryRegion
Reference_CustomsStatisticsNumber
Reference_SupplyChainPartGroup
Reference_CustWarranty
Reference_CharacteristicTemplate
Reference_StatisticalCode
Reference_AcquisitionReason
Reference_AcquisitionOrigin
Reference_HsnSacCode
Reference_InvPartProductCategory
Reference_CPpvStatus
Reference_InventoryPartChar
Reference_DiscreteCharacValue
Reference_CustWarrantyTypeTemp
Reference_SupWarrantyTypeTemp
Reference_TechnicalDrawing
Documentation Powered by Redocly
InventoryPartHandling (1)
API Class:N/A

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
NoteTexts
Get entities from NoteTexts
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "ReadOnly" "ReadOnly desc" "NoteId" "NoteId desc" "Label" "Label desc" "WarrantyTypeObjkey" "WarrantyTypeObjkey desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "NoteId" "Label" "WarrantyTypeObjkey"
Specify properties to return, see OData Select

Responses
200 response body for entity array NoteTextVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/NoteTexts

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
Add new entity to NoteTexts
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "NoteId" "Label" "WarrantyTypeObjkey"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type NoteTextVirtual

ParentObjkey	
string <= 50 characters
ObjCreatedBy	
string <= 50 characters
ReadOnly	
boolean
NoteId	
number
Label	
string <= 4000 characters
WarrantyTypeObjkey	
string <= 4000 characters
Responses
201 response body for entity type NoteTextVirtual
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/NoteTexts

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"ObjCreatedBy": "It is a Text",
"ReadOnly": true,
"NoteId": 1,
"Label": "It is a Text",
"WarrantyTypeObjkey": "It is a Text"
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
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"ReadOnly": true,
"NoteId": 1,
"Label": "It is a Text",
"WarrantyTypeObjkey": "It is a Text"
}
Get entity from NoteTexts by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "NoteId" "Label" "WarrantyTypeObjkey"
Specify properties to return, see OData Select

Responses
200 response body for entity type NoteTextVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/NoteTexts(Objkey='{Objkey}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"ReadOnly": true,
"NoteId": 1,
"Label": "It is a Text",
"WarrantyTypeObjkey": "It is a Text"
}
Delete entity from NoteTexts
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
/NoteTexts(Objkey='{Objkey}')

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
Update entity in NoteTexts
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "NoteId" "Label" "WarrantyTypeObjkey"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type NoteTextVirtual

ReadOnly	
boolean
NoteId	
number
Label	
string <= 4000 characters
WarrantyTypeObjkey	
string <= 4000 characters
Responses
200 response body for entity type NoteTextVirtual
201 response body for entity type NoteTextVirtual
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
/NoteTexts(Objkey='{Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"ReadOnly": true,
"NoteId": 1,
"Label": "It is a Text",
"WarrantyTypeObjkey": "It is a Text"
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
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"ReadOnly": true,
"NoteId": 1,
"Label": "It is a Text",
"WarrantyTypeObjkey": "It is a Text"
}
Invoke action CleanupVirtualEntity
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
header Parameters
If-Match
required
string
E-Tag

Request Body schema: application/json
request body for action CleanupVirtualEntityAction

object (CleanupVirtualEntityAction)
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

post
/NoteTexts(Objkey='{Objkey}')/IfsApp.InventoryPartHandling.NoteTextVirtual_CleanupVirtualEntity

Request samples
Payload
Content type
application/json

Copy
{ }
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
Invoke function Default
Authorizations:
(OpenIdbasicAuth)
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "NoteId" "Label" "WarrantyTypeObjkey"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type NoteTextVirtual
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/NoteTexts/IfsApp.InventoryPartHandling.NoteTextVirtual_Default()

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"ReadOnly": true,
"NoteId": 1,
"Label": "It is a Text",
"WarrantyTypeObjkey": "It is a Text"
}
Get entities from DetailNotes
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
Items Enum: "OutputType" "OutputType desc" "NoteId" "NoteId desc" "NoteText" "NoteText desc" "PhraseId" "PhraseId desc" "LanguageCode" "LanguageCode desc" "RevisionNo" "RevisionNo desc" "ParentObjkey" "ParentObjkey desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "OutputType" "NoteId" "NoteText" "PhraseId" "LanguageCode" "RevisionNo" "ParentObjkey"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "PhraseIdRef" "OutputTypeRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array DocumentText
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/NoteTexts(Objkey='{Objkey}')/DetailNotes

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
Add new entity to DetailNotes
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "NoteId" "Label" "WarrantyTypeObjkey"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type DocumentText

OutputType
required
string <= 10 characters
NoteId
required
number
NoteText
required
string <= 2000 characters
PhraseId	
string <= 4000 characters
LanguageCode	
string <= 4000 characters
RevisionNo	
string <= 4000 characters
ParentObjkey	
string <= 4000 characters
Responses
201 response body for entity type DocumentText
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/NoteTexts(Objkey='{Objkey}')/DetailNotes

Request samples
Payload
Content type
application/json

Copy
{
"OutputType": "It is a Text",
"NoteId": 1,
"NoteText": "It is a Text",
"PhraseId": "It is a Text",
"LanguageCode": "It is a Text",
"RevisionNo": "It is a Text",
"ParentObjkey": "It is a Text"
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
"OutputType": "It is a Text",
"NoteId": 1,
"NoteText": "It is a Text",
"PhraseId": "It is a Text",
"LanguageCode": "It is a Text",
"RevisionNo": "It is a Text",
"ParentObjkey": "It is a Text"
}
Get entity from DetailNotes by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
DetailNotes_OutputType
required
string <= 10 characters
Example: It is a Text
key: OutputType

DetailNotes_NoteId
required
number
Example: 1
key: NoteId

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "NoteId" "Label" "WarrantyTypeObjkey"
Specify properties to return, see OData Select

Responses
200 response body for entity type DocumentText
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/NoteTexts(Objkey='{Objkey}')/DetailNotes(OutputType='{DetailNotes_OutputType}',NoteId={DetailNotes_NoteId})

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
"OutputType": "It is a Text",
"NoteId": 1,
"NoteText": "It is a Text",
"PhraseId": "It is a Text",
"LanguageCode": "It is a Text",
"RevisionNo": "It is a Text",
"ParentObjkey": "It is a Text"
}
Delete entity from DetailNotes
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
DetailNotes_OutputType
required
string <= 10 characters
Example: It is a Text
key: OutputType

DetailNotes_NoteId
required
number
Example: 1
key: NoteId

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
/NoteTexts(Objkey='{Objkey}')/DetailNotes(OutputType='{DetailNotes_OutputType}',NoteId={DetailNotes_NoteId})

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
Update entity in DetailNotes
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
DetailNotes_OutputType
required
string <= 10 characters
Example: It is a Text
key: OutputType

DetailNotes_NoteId
required
number
Example: 1
key: NoteId

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "NoteId" "Label" "WarrantyTypeObjkey"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type DocumentText

NoteText
required
string <= 2000 characters
PhraseId	
string <= 4000 characters
LanguageCode	
string <= 4000 characters
RevisionNo	
string <= 4000 characters
ParentObjkey	
string <= 4000 characters
Responses
200 response body for entity type DocumentText
201 response body for entity type DocumentText
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
/NoteTexts(Objkey='{Objkey}')/DetailNotes(OutputType='{DetailNotes_OutputType}',NoteId={DetailNotes_NoteId})

Request samples
Payload
Content type
application/json

Copy
{
"NoteText": "It is a Text",
"PhraseId": "It is a Text",
"LanguageCode": "It is a Text",
"RevisionNo": "It is a Text",
"ParentObjkey": "It is a Text"
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
"OutputType": "It is a Text",
"NoteId": 1,
"NoteText": "It is a Text",
"PhraseId": "It is a Text",
"LanguageCode": "It is a Text",
"RevisionNo": "It is a Text",
"ParentObjkey": "It is a Text"
}
Get entities from PhraseIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
DetailNotes_OutputType
required
string <= 10 characters
Example: It is a Text
key: OutputType

DetailNotes_NoteId
required
number
Example: 1
key: NoteId

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
Items Enum: "PhraseText" "PhraseText desc" "PhraseId" "PhraseId desc" "Description" "Description desc" "LanguageCode" "LanguageCode desc" "RevisionNo" "RevisionNo desc" "PhaseInDate" "PhaseInDate desc" "PhaseOutDate" "PhaseOutDate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PhraseText" "PhraseId" "Description" "LanguageCode" "RevisionNo" "PhaseInDate" "PhaseOutDate"
Specify properties to return, see OData Select

Responses
200 response body for entity array MpccomPhraseTextLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/NoteTexts(Objkey='{Objkey}')/DetailNotes(OutputType='{DetailNotes_OutputType}',NoteId={DetailNotes_NoteId})/PhraseIdRef

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
Get entities from OutputTypeRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
DetailNotes_OutputType
required
string <= 10 characters
Example: It is a Text
key: OutputType

DetailNotes_NoteId
required
number
Example: 1
key: NoteId

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
Items Enum: "OutputType" "OutputType desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "OutputType" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array OutputTypeLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/NoteTexts(Objkey='{Objkey}')/DetailNotes(OutputType='{DetailNotes_OutputType}',NoteId={DetailNotes_NoteId})/OutputTypeRef

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
InventoryPartVirtualSet
Get entities from InventoryPartVirtualSet
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "Contract" "Contract desc" "PartNo" "PartNo desc" "EngAttribute" "EngAttribute desc" "UnitMeas" "UnitMeas desc" "Source" "Source desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "EngAttribute" "UnitMeas" "Source"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "EngAttributeRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array InventoryPartVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartVirtualSet

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
Add new entity to InventoryPartVirtualSet
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "EngAttribute" "UnitMeas" "Source"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type InventoryPartVirtual

ParentObjkey	
string <= 50 characters
ObjCreatedBy	
string <= 50 characters
Contract
required
string <= 5 characters
PartNo
required
string <= 25 characters
EngAttribute	
string <= 5 characters
UnitMeas	
string <= 10 characters
Source	
string <= 4000 characters
Responses
201 response body for entity type InventoryPartVirtual
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/InventoryPartVirtualSet

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"ObjCreatedBy": "It is a Text",
"Contract": "It is a Text",
"PartNo": "It is a Text",
"EngAttribute": "It is a Text",
"UnitMeas": "It is a Text",
"Source": "It is a Text"
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
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"Contract": "It is a Text",
"PartNo": "It is a Text",
"EngAttribute": "It is a Text",
"UnitMeas": "It is a Text",
"Source": "It is a Text"
}
Get entity from InventoryPartVirtualSet by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "EngAttribute" "UnitMeas" "Source"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "EngAttributeRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type InventoryPartVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartVirtualSet(Objkey='{Objkey}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"Contract": "It is a Text",
"PartNo": "It is a Text",
"EngAttribute": "It is a Text",
"UnitMeas": "It is a Text",
"Source": "It is a Text"
}
Delete entity from InventoryPartVirtualSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
/InventoryPartVirtualSet(Objkey='{Objkey}')

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
Update entity in InventoryPartVirtualSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "EngAttribute" "UnitMeas" "Source"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type InventoryPartVirtual

Contract
required
string <= 5 characters
PartNo
required
string <= 25 characters
EngAttribute	
string <= 5 characters
UnitMeas	
string <= 10 characters
Source	
string <= 4000 characters
Responses
200 response body for entity type InventoryPartVirtual
201 response body for entity type InventoryPartVirtual
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
/InventoryPartVirtualSet(Objkey='{Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"Contract": "It is a Text",
"PartNo": "It is a Text",
"EngAttribute": "It is a Text",
"UnitMeas": "It is a Text",
"Source": "It is a Text"
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
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"Contract": "It is a Text",
"PartNo": "It is a Text",
"EngAttribute": "It is a Text",
"UnitMeas": "It is a Text",
"Source": "It is a Text"
}
Invoke action CleanupVirtualEntity
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
header Parameters
If-Match
required
string
E-Tag

Request Body schema: application/json
request body for action CleanupVirtualEntityAction

object (CleanupVirtualEntityAction)
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

post
/InventoryPartVirtualSet(Objkey='{Objkey}')/IfsApp.InventoryPartHandling.InventoryPartVirtual_CleanupVirtualEntity

Request samples
Payload
Content type
application/json

Copy
{ }
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
Invoke function Default
Authorizations:
(OpenIdbasicAuth)
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "EngAttribute" "UnitMeas" "Source"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type InventoryPartVirtual
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartVirtualSet/IfsApp.InventoryPartHandling.InventoryPartVirtual_Default()

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"Contract": "It is a Text",
"PartNo": "It is a Text",
"EngAttribute": "It is a Text",
"UnitMeas": "It is a Text",
"Source": "It is a Text"
}
Get entities from CharacteristicsTemplateSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "Contract" "Contract desc" "PartNo" "PartNo desc" "EngAttribute" "EngAttribute desc" "CharacteristicCode" "CharacteristicCode desc" "AttrValueNumeric" "AttrValueNumeric desc" "AttrValueAlpha" "AttrValueAlpha desc" "UnitMeas" "UnitMeas desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "EngAttribute" "CharacteristicCode" "AttrValueNumeric" "AttrValueAlpha" "UnitMeas"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "EngAttributeRef" "AttrValueNumericRef" "AttrValueAlphaRef" "CharacteristicRef" "UnitMeasRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array CopyCharacteristicsTemplateVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartVirtualSet(Objkey='{Objkey}')/CharacteristicsTemplateSet

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
Get entity from CharacteristicsTemplateSet by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
CharacteristicsTemplateSet_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "EngAttribute" "UnitMeas" "Source"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "EngAttributeRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type CopyCharacteristicsTemplateVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartVirtualSet(Objkey='{Objkey}')/CharacteristicsTemplateSet(Objkey='{CharacteristicsTemplateSet_Objkey}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"Contract": "It is a Text",
"PartNo": "It is a Text",
"EngAttribute": "It is a Text",
"CharacteristicCode": "It is a Text",
"AttrValueNumeric": 1,
"AttrValueAlpha": "It is a Text",
"UnitMeas": "It is a Text"
}
Delete entity from CharacteristicsTemplateSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
CharacteristicsTemplateSet_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

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
/InventoryPartVirtualSet(Objkey='{Objkey}')/CharacteristicsTemplateSet(Objkey='{CharacteristicsTemplateSet_Objkey}')

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
Update entity in CharacteristicsTemplateSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
CharacteristicsTemplateSet_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "EngAttribute" "UnitMeas" "Source"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type CopyCharacteristicsTemplateVirtual

Contract
required
string <= 5 characters
PartNo
required
string <= 25 characters
EngAttribute	
string <= 5 characters
CharacteristicCode
required
string <= 5 characters
AttrValueNumeric	
number
AttrValueAlpha	
string <= 60 characters
UnitMeas	
string <= 10 characters
Responses
200 response body for entity type CopyCharacteristicsTemplateVirtual
201 response body for entity type CopyCharacteristicsTemplateVirtual
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
/InventoryPartVirtualSet(Objkey='{Objkey}')/CharacteristicsTemplateSet(Objkey='{CharacteristicsTemplateSet_Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"Contract": "It is a Text",
"PartNo": "It is a Text",
"EngAttribute": "It is a Text",
"CharacteristicCode": "It is a Text",
"AttrValueNumeric": 1,
"AttrValueAlpha": "It is a Text",
"UnitMeas": "It is a Text"
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
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"Contract": "It is a Text",
"PartNo": "It is a Text",
"EngAttribute": "It is a Text",
"CharacteristicCode": "It is a Text",
"AttrValueNumeric": 1,
"AttrValueAlpha": "It is a Text",
"UnitMeas": "It is a Text"
}
Get entities from EngAttributeRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
CharacteristicsTemplateSet_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

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
/InventoryPartVirtualSet(Objkey='{Objkey}')/CharacteristicsTemplateSet(Objkey='{CharacteristicsTemplateSet_Objkey}')/EngAttributeRef

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
Objkey
required
string <= 50 characters
Example: It is a Text
CharacteristicsTemplateSet_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

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
/InventoryPartVirtualSet(Objkey='{Objkey}')/CharacteristicsTemplateSet(Objkey='{CharacteristicsTemplateSet_Objkey}')/AttrValueNumericRef

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
Objkey
required
string <= 50 characters
Example: It is a Text
CharacteristicsTemplateSet_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

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
/InventoryPartVirtualSet(Objkey='{Objkey}')/CharacteristicsTemplateSet(Objkey='{CharacteristicsTemplateSet_Objkey}')/AttrValueAlphaRef

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
Objkey
required
string <= 50 characters
Example: It is a Text
CharacteristicsTemplateSet_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

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
Items Enum: "CharacteristicCode" "CharacteristicCode desc" "Description" "Description desc" "SearchType" "SearchType desc" "SearchTypeDb" "SearchTypeDb desc" "CharType" "CharType desc" "CharTypeDb" "CharTypeDb desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CharacteristicCode" "Description" "SearchType" "SearchTypeDb" "CharType" "CharTypeDb"
Specify properties to return, see OData Select

Responses
200 response body for entity array CharacteristicLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartVirtualSet(Objkey='{Objkey}')/CharacteristicsTemplateSet(Objkey='{CharacteristicsTemplateSet_Objkey}')/CharacteristicRef

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
Objkey
required
string <= 50 characters
Example: It is a Text
CharacteristicsTemplateSet_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

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
/InventoryPartVirtualSet(Objkey='{Objkey}')/CharacteristicsTemplateSet(Objkey='{CharacteristicsTemplateSet_Objkey}')/UnitMeasRef

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
Get entities from EngAttributeRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
/InventoryPartVirtualSet(Objkey='{Objkey}')/EngAttributeRef

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
CopyPartSet
Get entities from CopyPartSet
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "BackgroundJob" "BackgroundJob desc" "FromPartNo" "FromPartNo desc" "FromPartDescription" "FromPartDescription desc" "FromSite" "FromSite desc" "ToPartNo" "ToPartNo desc" "ToPartDescription" "ToPartDescription desc" "ToSite" "ToSite desc" "EventNo" "EventNo desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "BackgroundJob" "FromPartNo" "FromPartDescription" "FromSite" "ToPartNo" "ToPartDescription" "ToSite" "EventNo"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "FromPartNoRef" "FromSiteRef" "ToPartNoRef" "ToSiteRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array CopyPartVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CopyPartSet

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
Add new entity to CopyPartSet
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "BackgroundJob" "FromPartNo" "FromPartDescription" "FromSite" "ToPartNo" "ToPartDescription" "ToSite" "EventNo"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type CopyPartVirtual

ParentObjkey	
string <= 50 characters
ObjCreatedBy	
string <= 50 characters
BackgroundJob
required
boolean
FromPartNo	
string <= 25 characters
FromPartDescription	
string <= 200 characters
FromSite	
string <= 5 characters
ToPartNo	
string <= 25 characters
ToPartDescription	
string <= 200 characters
ToSite	
string <= 5 characters
EventNo	
number
Responses
201 response body for entity type CopyPartVirtual
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/CopyPartSet

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"ObjCreatedBy": "It is a Text",
"BackgroundJob": true,
"FromPartNo": "It is a Text",
"FromPartDescription": "It is a Text",
"FromSite": "It is a Text",
"ToPartNo": "It is a Text",
"ToPartDescription": "It is a Text",
"ToSite": "It is a Text",
"EventNo": 1
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
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"BackgroundJob": true,
"FromPartNo": "It is a Text",
"FromPartDescription": "It is a Text",
"FromSite": "It is a Text",
"ToPartNo": "It is a Text",
"ToPartDescription": "It is a Text",
"ToSite": "It is a Text",
"EventNo": 1
}
Get entity from CopyPartSet by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "BackgroundJob" "FromPartNo" "FromPartDescription" "FromSite" "ToPartNo" "ToPartDescription" "ToSite" "EventNo"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "FromPartNoRef" "FromSiteRef" "ToPartNoRef" "ToSiteRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type CopyPartVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CopyPartSet(Objkey='{Objkey}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"BackgroundJob": true,
"FromPartNo": "It is a Text",
"FromPartDescription": "It is a Text",
"FromSite": "It is a Text",
"ToPartNo": "It is a Text",
"ToPartDescription": "It is a Text",
"ToSite": "It is a Text",
"EventNo": 1
}
Delete entity from CopyPartSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
/CopyPartSet(Objkey='{Objkey}')

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
Update entity in CopyPartSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "BackgroundJob" "FromPartNo" "FromPartDescription" "FromSite" "ToPartNo" "ToPartDescription" "ToSite" "EventNo"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type CopyPartVirtual

BackgroundJob
required
boolean
FromPartNo	
string <= 25 characters
FromPartDescription	
string <= 200 characters
FromSite	
string <= 5 characters
ToPartNo	
string <= 25 characters
ToPartDescription	
string <= 200 characters
ToSite	
string <= 5 characters
EventNo	
number
Responses
200 response body for entity type CopyPartVirtual
201 response body for entity type CopyPartVirtual
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
/CopyPartSet(Objkey='{Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"BackgroundJob": true,
"FromPartNo": "It is a Text",
"FromPartDescription": "It is a Text",
"FromSite": "It is a Text",
"ToPartNo": "It is a Text",
"ToPartDescription": "It is a Text",
"ToSite": "It is a Text",
"EventNo": 1
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
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"BackgroundJob": true,
"FromPartNo": "It is a Text",
"FromPartDescription": "It is a Text",
"FromSite": "It is a Text",
"ToPartNo": "It is a Text",
"ToPartDescription": "It is a Text",
"ToSite": "It is a Text",
"EventNo": 1
}
Invoke action CleanupVirtualEntity
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
header Parameters
If-Match
required
string
E-Tag

Request Body schema: application/json
request body for action CleanupVirtualEntityAction

object (CleanupVirtualEntityAction)
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

post
/CopyPartSet(Objkey='{Objkey}')/IfsApp.InventoryPartHandling.CopyPartVirtual_CleanupVirtualEntity

Request samples
Payload
Content type
application/json

Copy
{ }
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
Invoke function Default
Authorizations:
(OpenIdbasicAuth)
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "BackgroundJob" "FromPartNo" "FromPartDescription" "FromSite" "ToPartNo" "ToPartDescription" "ToSite" "EventNo"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type CopyPartVirtual
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CopyPartSet/IfsApp.InventoryPartHandling.CopyPartVirtual_Default()

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"BackgroundJob": true,
"FromPartNo": "It is a Text",
"FromPartDescription": "It is a Text",
"FromSite": "It is a Text",
"ToPartNo": "It is a Text",
"ToPartDescription": "It is a Text",
"ToSite": "It is a Text",
"EventNo": 1
}
Get entities from PartInformationArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
Items Enum: "EventNo" "EventNo desc" "Module" "Module desc" "DatasetId" "DatasetId desc" "Enabled" "Enabled desc" "CancelWhenNoSource" "CancelWhenNoSource desc" "CancelWhenExistingCopy" "CancelWhenExistingCopy desc" "ExecutionOrder" "ExecutionOrder desc" "PresentationOrder" "PresentationOrder desc" "EnabledDb" "EnabledDb desc" "PartInformationToCopy" "PartInformationToCopy desc" "CancelWhenNoSourceDb" "CancelWhenNoSourceDb desc" "CancelWhenExistingCopyDb" "CancelWhenExistingCopyDb desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "EventNo" "Module" "DatasetId" "Enabled" "CancelWhenNoSource" "CancelWhenExistingCopy" "ExecutionOrder" "PresentationOrder" "EnabledDb" "PartInformationToCopy" "CancelWhenNoSourceDb" "CancelWhenExistingCopyDb"
Specify properties to return, see OData Select

Responses
200 response body for entity array PartCopyEventParameter
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CopyPartSet(Objkey='{Objkey}')/PartInformationArray

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
Get entity from PartInformationArray by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInformationArray_EventNo
required
number
Example: 1
key: EventNo

PartInformationArray_Module
required
string <= 100 characters
Example: It is a Text
key: Module

PartInformationArray_DatasetId
required
string <= 100 characters
Example: It is a Text
key: DatasetId

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "BackgroundJob" "FromPartNo" "FromPartDescription" "FromSite" "ToPartNo" "ToPartDescription" "ToSite" "EventNo"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "FromPartNoRef" "FromSiteRef" "ToPartNoRef" "ToSiteRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type PartCopyEventParameter
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CopyPartSet(Objkey='{Objkey}')/PartInformationArray(EventNo={PartInformationArray_EventNo},Module='{PartInformationArray_Module}',DatasetId='{PartInformationArray_DatasetId}')

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
"EventNo": 1,
"Module": "It is a Text",
"DatasetId": "It is a Text",
"Enabled": true,
"CancelWhenNoSource": true,
"CancelWhenExistingCopy": true,
"ExecutionOrder": 1,
"PresentationOrder": 1,
"EnabledDb": true,
"PartInformationToCopy": "It is a Text",
"CancelWhenNoSourceDb": true,
"CancelWhenExistingCopyDb": true
}
Update entity in PartInformationArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInformationArray_EventNo
required
number
Example: 1
key: EventNo

PartInformationArray_Module
required
string <= 100 characters
Example: It is a Text
key: Module

PartInformationArray_DatasetId
required
string <= 100 characters
Example: It is a Text
key: DatasetId

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "BackgroundJob" "FromPartNo" "FromPartDescription" "FromSite" "ToPartNo" "ToPartDescription" "ToSite" "EventNo"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type PartCopyEventParameter

Enabled
required
boolean
CancelWhenNoSource
required
boolean
CancelWhenExistingCopy
required
boolean
ExecutionOrder	
number
PresentationOrder	
number
EnabledDb
required
boolean
PartInformationToCopy	
string <= 200 characters
CancelWhenNoSourceDb
required
boolean
CancelWhenExistingCopyDb
required
boolean
Responses
200 response body for entity type PartCopyEventParameter
201 response body for entity type PartCopyEventParameter
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
/CopyPartSet(Objkey='{Objkey}')/PartInformationArray(EventNo={PartInformationArray_EventNo},Module='{PartInformationArray_Module}',DatasetId='{PartInformationArray_DatasetId}')

Request samples
Payload
Content type
application/json

Copy
{
"Enabled": true,
"CancelWhenNoSource": true,
"CancelWhenExistingCopy": true,
"ExecutionOrder": 1,
"PresentationOrder": 1,
"EnabledDb": true,
"PartInformationToCopy": "It is a Text",
"CancelWhenNoSourceDb": true,
"CancelWhenExistingCopyDb": true
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
"EventNo": 1,
"Module": "It is a Text",
"DatasetId": "It is a Text",
"Enabled": true,
"CancelWhenNoSource": true,
"CancelWhenExistingCopy": true,
"ExecutionOrder": 1,
"PresentationOrder": 1,
"EnabledDb": true,
"PartInformationToCopy": "It is a Text",
"CancelWhenNoSourceDb": true,
"CancelWhenExistingCopyDb": true
}
Get entities from FromPartNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
Items Enum: "PartNo" "PartNo desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PartNo" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array PartCatalogNotPositionLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CopyPartSet(Objkey='{Objkey}')/FromPartNoRef

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
Get entities from FromSiteRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
/CopyPartSet(Objkey='{Objkey}')/FromSiteRef

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
Get entities from ToPartNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
Items Enum: "PartNo" "PartNo desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PartNo" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array PartCatalogNotPositionLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CopyPartSet(Objkey='{Objkey}')/ToPartNoRef

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
Get entities from ToSiteRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
/CopyPartSet(Objkey='{Objkey}')/ToSiteRef

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
PartInformationSet
Get entities from PartInformationSet
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "PartNo" "PartNo desc" "SerialNo" "SerialNo desc" "CustomerWarrantyId" "CustomerWarrantyId desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "PartNo" "SerialNo" "CustomerWarrantyId"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array PartInformationVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PartInformationSet

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
Add new entity to PartInformationSet
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "PartNo" "SerialNo" "CustomerWarrantyId"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type PartInformationVirtual

ParentObjkey	
string <= 50 characters
ObjCreatedBy	
string <= 50 characters
PartNo	
string <= 4000 characters
SerialNo	
string <= 4000 characters
CustomerWarrantyId	
number
Responses
201 response body for entity type PartInformationVirtual
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/PartInformationSet

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"ObjCreatedBy": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"CustomerWarrantyId": 1
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
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"CustomerWarrantyId": 1
}
Get entity from PartInformationSet by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "PartNo" "SerialNo" "CustomerWarrantyId"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type PartInformationVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PartInformationSet(Objkey='{Objkey}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"CustomerWarrantyId": 1
}
Delete entity from PartInformationSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
/PartInformationSet(Objkey='{Objkey}')

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
Update entity in PartInformationSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "PartNo" "SerialNo" "CustomerWarrantyId"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type PartInformationVirtual

PartNo	
string <= 4000 characters
SerialNo	
string <= 4000 characters
CustomerWarrantyId	
number
Responses
200 response body for entity type PartInformationVirtual
201 response body for entity type PartInformationVirtual
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
/PartInformationSet(Objkey='{Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"CustomerWarrantyId": 1
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
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"CustomerWarrantyId": 1
}
Invoke action CleanupVirtualEntity
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
header Parameters
If-Match
required
string
E-Tag

Request Body schema: application/json
request body for action CleanupVirtualEntityAction

object (CleanupVirtualEntityAction)
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

post
/PartInformationSet(Objkey='{Objkey}')/IfsApp.InventoryPartHandling.PartInformationVirtual_CleanupVirtualEntity

Request samples
Payload
Content type
application/json

Copy
{ }
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
Invoke function Default
Authorizations:
(OpenIdbasicAuth)
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "PartNo" "SerialNo" "CustomerWarrantyId"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type PartInformationVirtual
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PartInformationSet/IfsApp.InventoryPartHandling.PartInformationVirtual_Default()

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"CustomerWarrantyId": 1
}
Get entities from CustomerWarrantyTypeArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "MaterialCostTypeDb" "MaterialCostTypeDb desc" "ExpensesCostTypeDb" "ExpensesCostTypeDb desc" "FixedPriceCostTypeDb" "FixedPriceCostTypeDb desc" "PersonnelCostTypeDb" "PersonnelCostTypeDb desc" "ExternalCostTypeDb" "ExternalCostTypeDb desc" "SelectMethod" "SelectMethod desc" "WarrantyId" "WarrantyId desc" "WarrantyTypeId" "WarrantyTypeId desc" "WarrantyDescription" "WarrantyDescription desc" "MaterialCostType" "MaterialCostType desc" "ExpensesCostType" "ExpensesCostType desc" "FixedPriceCostType" "FixedPriceCostType desc" "PersonnelCostType" "PersonnelCostType desc" "ExternalCostType" "ExternalCostType desc" "NoteText" "NoteText desc" "PartNo" "PartNo desc" "SerialNo" "SerialNo desc" "ObjId" "ObjId desc" "ObjVersion" "ObjVersion desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "MaterialCostTypeDb" "ExpensesCostTypeDb" "FixedPriceCostTypeDb" "PersonnelCostTypeDb" "ExternalCostTypeDb" "SelectMethod" "WarrantyId" "WarrantyTypeId" "WarrantyDescription" "MaterialCostType" "ExpensesCostType" "FixedPriceCostType" "PersonnelCostType" "ExternalCostType" "NoteText" "PartNo" "SerialNo" "ObjId" "ObjVersion"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "WarrantyTypeIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array CustomerWarrantyTypeVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PartInformationSet(Objkey='{Objkey}')/CustomerWarrantyTypeArray

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
Add new entity to CustomerWarrantyTypeArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "PartNo" "SerialNo" "CustomerWarrantyId"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type CustomerWarrantyTypeVirtual

ParentObjkey	
string <= 50 characters
ObjCreatedBy	
string <= 50 characters
MaterialCostTypeDb
required
boolean
ExpensesCostTypeDb
required
boolean
FixedPriceCostTypeDb
required
boolean
PersonnelCostTypeDb
required
boolean
ExternalCostTypeDb
required
boolean
SelectMethod
required
boolean
WarrantyId	
number
WarrantyTypeId
required
string <= 100 characters
WarrantyDescription	
string <= 35 characters
MaterialCostType	
string <= 4000 characters
ExpensesCostType	
string <= 4000 characters
FixedPriceCostType	
string <= 4000 characters
PersonnelCostType	
string <= 4000 characters
ExternalCostType	
string <= 4000 characters
NoteText	
string <= 2000 characters
PartNo	
string <= 4000 characters
SerialNo	
string <= 4000 characters
ObjId	
string <= 4000 characters
ObjVersion	
string <= 4000 characters
Responses
201 response body for entity type CustomerWarrantyTypeVirtual
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/PartInformationSet(Objkey='{Objkey}')/CustomerWarrantyTypeArray

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"ObjCreatedBy": "It is a Text",
"MaterialCostTypeDb": true,
"ExpensesCostTypeDb": true,
"FixedPriceCostTypeDb": true,
"PersonnelCostTypeDb": true,
"ExternalCostTypeDb": true,
"SelectMethod": true,
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"WarrantyDescription": "It is a Text",
"MaterialCostType": "It is a Text",
"ExpensesCostType": "It is a Text",
"FixedPriceCostType": "It is a Text",
"PersonnelCostType": "It is a Text",
"ExternalCostType": "It is a Text",
"NoteText": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ObjId": "It is a Text",
"ObjVersion": "It is a Text"
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
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"MaterialCostTypeDb": true,
"ExpensesCostTypeDb": true,
"FixedPriceCostTypeDb": true,
"PersonnelCostTypeDb": true,
"ExternalCostTypeDb": true,
"SelectMethod": true,
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"WarrantyDescription": "It is a Text",
"MaterialCostType": "It is a Text",
"ExpensesCostType": "It is a Text",
"FixedPriceCostType": "It is a Text",
"PersonnelCostType": "It is a Text",
"ExternalCostType": "It is a Text",
"NoteText": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ObjId": "It is a Text",
"ObjVersion": "It is a Text",
"Objgrants": "It is a Text"
}
Get entity from CustomerWarrantyTypeArray by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
CustomerWarrantyTypeArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "PartNo" "SerialNo" "CustomerWarrantyId"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type CustomerWarrantyTypeVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PartInformationSet(Objkey='{Objkey}')/CustomerWarrantyTypeArray(Objkey='{CustomerWarrantyTypeArray_Objkey}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"MaterialCostTypeDb": true,
"ExpensesCostTypeDb": true,
"FixedPriceCostTypeDb": true,
"PersonnelCostTypeDb": true,
"ExternalCostTypeDb": true,
"SelectMethod": true,
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"WarrantyDescription": "It is a Text",
"MaterialCostType": "It is a Text",
"ExpensesCostType": "It is a Text",
"FixedPriceCostType": "It is a Text",
"PersonnelCostType": "It is a Text",
"ExternalCostType": "It is a Text",
"NoteText": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ObjId": "It is a Text",
"ObjVersion": "It is a Text",
"Objgrants": "It is a Text"
}
Delete entity from CustomerWarrantyTypeArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
CustomerWarrantyTypeArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

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
/PartInformationSet(Objkey='{Objkey}')/CustomerWarrantyTypeArray(Objkey='{CustomerWarrantyTypeArray_Objkey}')

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
Update entity in CustomerWarrantyTypeArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
CustomerWarrantyTypeArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "PartNo" "SerialNo" "CustomerWarrantyId"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type CustomerWarrantyTypeVirtual

MaterialCostTypeDb
required
boolean
ExpensesCostTypeDb
required
boolean
FixedPriceCostTypeDb
required
boolean
PersonnelCostTypeDb
required
boolean
ExternalCostTypeDb
required
boolean
SelectMethod
required
boolean
WarrantyId	
number
WarrantyTypeId
required
string <= 100 characters
WarrantyDescription	
string <= 35 characters
MaterialCostType	
string <= 4000 characters
ExpensesCostType	
string <= 4000 characters
FixedPriceCostType	
string <= 4000 characters
PersonnelCostType	
string <= 4000 characters
ExternalCostType	
string <= 4000 characters
NoteText	
string <= 2000 characters
PartNo	
string <= 4000 characters
SerialNo	
string <= 4000 characters
ObjId	
string <= 4000 characters
ObjVersion	
string <= 4000 characters
Responses
200 response body for entity type CustomerWarrantyTypeVirtual
201 response body for entity type CustomerWarrantyTypeVirtual
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
/PartInformationSet(Objkey='{Objkey}')/CustomerWarrantyTypeArray(Objkey='{CustomerWarrantyTypeArray_Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"MaterialCostTypeDb": true,
"ExpensesCostTypeDb": true,
"FixedPriceCostTypeDb": true,
"PersonnelCostTypeDb": true,
"ExternalCostTypeDb": true,
"SelectMethod": true,
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"WarrantyDescription": "It is a Text",
"MaterialCostType": "It is a Text",
"ExpensesCostType": "It is a Text",
"FixedPriceCostType": "It is a Text",
"PersonnelCostType": "It is a Text",
"ExternalCostType": "It is a Text",
"NoteText": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ObjId": "It is a Text",
"ObjVersion": "It is a Text"
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
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"MaterialCostTypeDb": true,
"ExpensesCostTypeDb": true,
"FixedPriceCostTypeDb": true,
"PersonnelCostTypeDb": true,
"ExternalCostTypeDb": true,
"SelectMethod": true,
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"WarrantyDescription": "It is a Text",
"MaterialCostType": "It is a Text",
"ExpensesCostType": "It is a Text",
"FixedPriceCostType": "It is a Text",
"PersonnelCostType": "It is a Text",
"ExternalCostType": "It is a Text",
"NoteText": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ObjId": "It is a Text",
"ObjVersion": "It is a Text",
"Objgrants": "It is a Text"
}
Get entities from CustomerWarrantyConditionArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
CustomerWarrantyTypeArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

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
Items Enum: "WarrantyId" "WarrantyId desc" "WarrantyTypeId" "WarrantyTypeId desc" "ConditionId" "ConditionId desc" "MinValue" "MinValue desc" "MaxValue" "MaxValue desc" "VirtualObjkey" "VirtualObjkey desc" "PartNo" "PartNo desc" "SerialNo" "SerialNo desc" "ValidFrom" "ValidFrom desc" "ValidTo" "ValidTo desc" "OtherUom" "OtherUom desc" "ParentObjkey" "ParentObjkey desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "ConditionId" "MinValue" "MaxValue" "VirtualObjkey" "PartNo" "SerialNo" "ValidFrom" "ValidTo" "OtherUom" "ParentObjkey"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ConditionIdRef" "OtherUomRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array CustomerWarrantyCondition
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PartInformationSet(Objkey='{Objkey}')/CustomerWarrantyTypeArray(Objkey='{CustomerWarrantyTypeArray_Objkey}')/CustomerWarrantyConditionArray

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
Add new entity to CustomerWarrantyConditionArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
CustomerWarrantyTypeArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "PartNo" "SerialNo" "CustomerWarrantyId"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type CustomerWarrantyCondition

WarrantyId
required
number
WarrantyTypeId
required
string <= 20 characters
ConditionId
required
number
MinValue	
number
MaxValue	
number
VirtualObjkey	
string <= 4000 characters
PartNo	
string <= 4000 characters
SerialNo	
string <= 4000 characters
ValidFrom	
string <date>
ValidTo	
string <date>
OtherUom	
string <= 4000 characters
ParentObjkey	
string <= 4000 characters
Responses
201 response body for entity type CustomerWarrantyCondition
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/PartInformationSet(Objkey='{Objkey}')/CustomerWarrantyTypeArray(Objkey='{CustomerWarrantyTypeArray_Objkey}')/CustomerWarrantyConditionArray

Request samples
Payload
Content type
application/json

Copy
{
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"VirtualObjkey": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidTo": "2019-10-10",
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"VirtualObjkey": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidTo": "2019-10-10",
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Get entity from CustomerWarrantyConditionArray by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
CustomerWarrantyConditionArray_WarrantyId
required
number
Example: 1
key: WarrantyId

CustomerWarrantyConditionArray_WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
key: WarrantyTypeId

CustomerWarrantyConditionArray_ConditionId
required
number
Example: 1
key: ConditionId

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "PartNo" "SerialNo" "CustomerWarrantyId"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type CustomerWarrantyCondition
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PartInformationSet(Objkey='{Objkey}')/CustomerWarrantyTypeArray(Objkey='{CustomerWarrantyTypeArray_Objkey}')/CustomerWarrantyConditionArray(WarrantyId={CustomerWarrantyConditionArray_WarrantyId},WarrantyTypeId='{CustomerWarrantyConditionArray_WarrantyTypeId}',ConditionId={CustomerWarrantyConditionArray_ConditionId})

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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"VirtualObjkey": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidTo": "2019-10-10",
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Delete entity from CustomerWarrantyConditionArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
CustomerWarrantyConditionArray_WarrantyId
required
number
Example: 1
key: WarrantyId

CustomerWarrantyConditionArray_WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
key: WarrantyTypeId

CustomerWarrantyConditionArray_ConditionId
required
number
Example: 1
key: ConditionId

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
/PartInformationSet(Objkey='{Objkey}')/CustomerWarrantyTypeArray(Objkey='{CustomerWarrantyTypeArray_Objkey}')/CustomerWarrantyConditionArray(WarrantyId={CustomerWarrantyConditionArray_WarrantyId},WarrantyTypeId='{CustomerWarrantyConditionArray_WarrantyTypeId}',ConditionId={CustomerWarrantyConditionArray_ConditionId})

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
Update entity in CustomerWarrantyConditionArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
CustomerWarrantyConditionArray_WarrantyId
required
number
Example: 1
key: WarrantyId

CustomerWarrantyConditionArray_WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
key: WarrantyTypeId

CustomerWarrantyConditionArray_ConditionId
required
number
Example: 1
key: ConditionId

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "PartNo" "SerialNo" "CustomerWarrantyId"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type CustomerWarrantyCondition

MinValue	
number
MaxValue	
number
VirtualObjkey	
string <= 4000 characters
PartNo	
string <= 4000 characters
SerialNo	
string <= 4000 characters
ValidFrom	
string <date>
ValidTo	
string <date>
OtherUom	
string <= 4000 characters
ParentObjkey	
string <= 4000 characters
Responses
200 response body for entity type CustomerWarrantyCondition
201 response body for entity type CustomerWarrantyCondition
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
/PartInformationSet(Objkey='{Objkey}')/CustomerWarrantyTypeArray(Objkey='{CustomerWarrantyTypeArray_Objkey}')/CustomerWarrantyConditionArray(WarrantyId={CustomerWarrantyConditionArray_WarrantyId},WarrantyTypeId='{CustomerWarrantyConditionArray_WarrantyTypeId}',ConditionId={CustomerWarrantyConditionArray_ConditionId})

Request samples
Payload
Content type
application/json

Copy
{
"MinValue": 1,
"MaxValue": 1,
"VirtualObjkey": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidTo": "2019-10-10",
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"VirtualObjkey": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidTo": "2019-10-10",
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Get entities from WarrantyLanguageDescriptionArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
CustomerWarrantyTypeArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

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
Items Enum: "WarrantyId" "WarrantyId desc" "WarrantyTypeId" "WarrantyTypeId desc" "LanguageCode" "LanguageCode desc" "WarrantyTypeDesc" "WarrantyTypeDesc desc" "NoteId" "NoteId desc" "DocumentText" "DocumentText desc" "ParentObjkey" "ParentObjkey desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "LanguageCode" "WarrantyTypeDesc" "NoteId" "DocumentText" "ParentObjkey"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "LanguageCodeRef" "WarrantyTypeIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array WarrantyLanguageDescription
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PartInformationSet(Objkey='{Objkey}')/CustomerWarrantyTypeArray(Objkey='{CustomerWarrantyTypeArray_Objkey}')/WarrantyLanguageDescriptionArray

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
Add new entity to WarrantyLanguageDescriptionArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
CustomerWarrantyTypeArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "PartNo" "SerialNo" "CustomerWarrantyId"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type WarrantyLanguageDescription

WarrantyId
required
number
WarrantyTypeId
required
string <= 20 characters
LanguageCode
required
string <= 2 characters
WarrantyTypeDesc
required
string <= 35 characters
DocumentText	
boolean
ParentObjkey	
string <= 4000 characters
Responses
201 response body for entity type WarrantyLanguageDescription
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/PartInformationSet(Objkey='{Objkey}')/CustomerWarrantyTypeArray(Objkey='{CustomerWarrantyTypeArray_Objkey}')/WarrantyLanguageDescriptionArray

Request samples
Payload
Content type
application/json

Copy
{
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"LanguageCode": "It is a Text",
"WarrantyTypeDesc": "It is a Text",
"DocumentText": true,
"ParentObjkey": "It is a Text"
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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"LanguageCode": "It is a Text",
"WarrantyTypeDesc": "It is a Text",
"NoteId": 1,
"DocumentText": true,
"ParentObjkey": "It is a Text"
}
Get entity from WarrantyLanguageDescriptionArray by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
WarrantyLanguageDescriptionArray_LanguageCode
required
string <= 2 characters
Example: It is a Text
key: LanguageCode

WarrantyLanguageDescriptionArray_WarrantyId
required
number
Example: 1
key: WarrantyId

WarrantyLanguageDescriptionArray_WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
key: WarrantyTypeId

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "PartNo" "SerialNo" "CustomerWarrantyId"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type WarrantyLanguageDescription
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PartInformationSet(Objkey='{Objkey}')/CustomerWarrantyTypeArray(Objkey='{CustomerWarrantyTypeArray_Objkey}')/WarrantyLanguageDescriptionArray(LanguageCode='{WarrantyLanguageDescriptionArray_LanguageCode}',WarrantyId={WarrantyLanguageDescriptionArray_WarrantyId},WarrantyTypeId='{WarrantyLanguageDescriptionArray_WarrantyTypeId}')

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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"LanguageCode": "It is a Text",
"WarrantyTypeDesc": "It is a Text",
"NoteId": 1,
"DocumentText": true,
"ParentObjkey": "It is a Text"
}
Delete entity from WarrantyLanguageDescriptionArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
WarrantyLanguageDescriptionArray_LanguageCode
required
string <= 2 characters
Example: It is a Text
key: LanguageCode

WarrantyLanguageDescriptionArray_WarrantyId
required
number
Example: 1
key: WarrantyId

WarrantyLanguageDescriptionArray_WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
key: WarrantyTypeId

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
/PartInformationSet(Objkey='{Objkey}')/CustomerWarrantyTypeArray(Objkey='{CustomerWarrantyTypeArray_Objkey}')/WarrantyLanguageDescriptionArray(LanguageCode='{WarrantyLanguageDescriptionArray_LanguageCode}',WarrantyId={WarrantyLanguageDescriptionArray_WarrantyId},WarrantyTypeId='{WarrantyLanguageDescriptionArray_WarrantyTypeId}')

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
Update entity in WarrantyLanguageDescriptionArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
WarrantyLanguageDescriptionArray_LanguageCode
required
string <= 2 characters
Example: It is a Text
key: LanguageCode

WarrantyLanguageDescriptionArray_WarrantyId
required
number
Example: 1
key: WarrantyId

WarrantyLanguageDescriptionArray_WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
key: WarrantyTypeId

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "PartNo" "SerialNo" "CustomerWarrantyId"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type WarrantyLanguageDescription

WarrantyTypeDesc
required
string <= 35 characters
DocumentText	
boolean
ParentObjkey	
string <= 4000 characters
Responses
200 response body for entity type WarrantyLanguageDescription
201 response body for entity type WarrantyLanguageDescription
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
/PartInformationSet(Objkey='{Objkey}')/CustomerWarrantyTypeArray(Objkey='{CustomerWarrantyTypeArray_Objkey}')/WarrantyLanguageDescriptionArray(LanguageCode='{WarrantyLanguageDescriptionArray_LanguageCode}',WarrantyId={WarrantyLanguageDescriptionArray_WarrantyId},WarrantyTypeId='{WarrantyLanguageDescriptionArray_WarrantyTypeId}')

Request samples
Payload
Content type
application/json

Copy
{
"WarrantyTypeDesc": "It is a Text",
"DocumentText": true,
"ParentObjkey": "It is a Text"
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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"LanguageCode": "It is a Text",
"WarrantyTypeDesc": "It is a Text",
"NoteId": 1,
"DocumentText": true,
"ParentObjkey": "It is a Text"
}
Get entities from WarrantyTypeIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
CustomerWarrantyTypeArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

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
Items Enum: "WarrantyId" "WarrantyId desc" "WarrantyTypeId" "WarrantyTypeId desc" "WarrantyDescription" "WarrantyDescription desc" "NoteText" "NoteText desc" "ExpensesCostType" "ExpensesCostType desc" "ExternalCostType" "ExternalCostType desc" "FixedPriceCostType" "FixedPriceCostType desc" "MaterialCostType" "MaterialCostType desc" "PersonnelCostType" "PersonnelCostType desc" "WarrantyConditionRule" "WarrantyConditionRule desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "WarrantyDescription" "NoteText" "ExpensesCostType" "ExternalCostType" "FixedPriceCostType" "MaterialCostType" "PersonnelCostType" "WarrantyConditionRule"
Specify properties to return, see OData Select

Responses
200 response body for entity array CustWarrantyType
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PartInformationSet(Objkey='{Objkey}')/CustomerWarrantyTypeArray(Objkey='{CustomerWarrantyTypeArray_Objkey}')/WarrantyTypeIdRef

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
Objkey
required
string <= 50 characters
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
Items Enum: "PartNo" "PartNo desc" "Description" "Description desc" "LanguageDescription" "LanguageDescription desc" "InfoText" "InfoText desc" "StdNameId" "StdNameId desc" "UnitCode" "UnitCode desc" "LotTrackingCode" "LotTrackingCode desc" "SerialRule" "SerialRule desc" "SerialTrackingCode" "SerialTrackingCode desc" "EngSerialTrackingCode" "EngSerialTrackingCode desc" "PartMainGroup" "PartMainGroup desc" "Configurable" "Configurable desc" "CustWarrantyId" "CustWarrantyId desc" "SupWarrantyId" "SupWarrantyId desc" "ConditionCodeUsage" "ConditionCodeUsage desc" "SubLotRule" "SubLotRule desc" "LotQuantityRule" "LotQuantityRule desc" "PositionPart" "PositionPart desc" "InputUnitMeasGroupId" "InputUnitMeasGroupId desc" "CatchUnitEnabled" "CatchUnitEnabled desc" "MultilevelTracking" "MultilevelTracking desc" "ComponentLotRule" "ComponentLotRule desc" "StopArrivalIssuedSerial" "StopArrivalIssuedSerial desc" "WeightNet" "WeightNet desc" "UomForWeightNet" "UomForWeightNet desc" "VolumeNet" "VolumeNet desc" "UomForVolumeNet" "UomForVolumeNet desc" "FreightFactor" "FreightFactor desc" "AllowAsNotConsumed" "AllowAsNotConsumed desc" "ReceiptIssueSerialTrack" "ReceiptIssueSerialTrack desc" "StopNewSerialInRma" "StopNewSerialInRma desc" "TechnicalDrawingNo" "TechnicalDrawingNo desc" "ProductTypeClassif" "ProductTypeClassif desc" "CestCode" "CestCode desc" "FciCode" "FciCode desc" "FirstInventorySite" "FirstInventorySite desc" "Ppv" "Ppv desc" "IsNewPart" "IsNewPart desc" "CPpvStatus" "CPpvStatus desc" "CPartConfigCompletion" "CPartConfigCompletion desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PartNo" "Description" "LanguageDescription" "InfoText" "StdNameId" "UnitCode" "LotTrackingCode" "SerialRule" "SerialTrackingCode" "EngSerialTrackingCode" "PartMainGroup" "Configurable" "CustWarrantyId" "SupWarrantyId" "ConditionCodeUsage" "SubLotRule" "LotQuantityRule" "PositionPart" "InputUnitMeasGroupId" "CatchUnitEnabled" "MultilevelTracking" "ComponentLotRule" "StopArrivalIssuedSerial" "WeightNet" "UomForWeightNet" "VolumeNet" "UomForVolumeNet" "FreightFactor" "AllowAsNotConsumed" "ReceiptIssueSerialTrack" "StopNewSerialInRma" "TechnicalDrawingNo" "ProductTypeClassif" "CestCode" "FciCode" "FirstInventorySite" "Ppv" "IsNewPart" "CPpvStatus" "CPartConfigCompletion"
Specify properties to return, see OData Select

Responses
200 response body for entity array PartCatalog
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PartInformationSet(Objkey='{Objkey}')/PartNoRef

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
CustomerWarrantyConditionSet
Get entities from CustomerWarrantyConditionSet
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
Items Enum: "WarrantyId" "WarrantyId desc" "WarrantyTypeId" "WarrantyTypeId desc" "ConditionId" "ConditionId desc" "MinValue" "MinValue desc" "MaxValue" "MaxValue desc" "VirtualObjkey" "VirtualObjkey desc" "PartNo" "PartNo desc" "SerialNo" "SerialNo desc" "ValidFrom" "ValidFrom desc" "ValidTo" "ValidTo desc" "OtherUom" "OtherUom desc" "ParentObjkey" "ParentObjkey desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "ConditionId" "MinValue" "MaxValue" "VirtualObjkey" "PartNo" "SerialNo" "ValidFrom" "ValidTo" "OtherUom" "ParentObjkey"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ConditionIdRef" "OtherUomRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array CustomerWarrantyCondition
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CustomerWarrantyConditionSet

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
Add new entity to CustomerWarrantyConditionSet
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "ConditionId" "MinValue" "MaxValue" "VirtualObjkey" "PartNo" "SerialNo" "ValidFrom" "ValidTo" "OtherUom" "ParentObjkey"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type CustomerWarrantyCondition

WarrantyId
required
number
WarrantyTypeId
required
string <= 20 characters
ConditionId
required
number
MinValue	
number
MaxValue	
number
VirtualObjkey	
string <= 4000 characters
PartNo	
string <= 4000 characters
SerialNo	
string <= 4000 characters
ValidFrom	
string <date>
ValidTo	
string <date>
OtherUom	
string <= 4000 characters
ParentObjkey	
string <= 4000 characters
Responses
201 response body for entity type CustomerWarrantyCondition
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/CustomerWarrantyConditionSet

Request samples
Payload
Content type
application/json

Copy
{
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"VirtualObjkey": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidTo": "2019-10-10",
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"VirtualObjkey": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidTo": "2019-10-10",
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Get entity from CustomerWarrantyConditionSet by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
WarrantyId
required
number
Example: 1
WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
ConditionId
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "ConditionId" "MinValue" "MaxValue" "VirtualObjkey" "PartNo" "SerialNo" "ValidFrom" "ValidTo" "OtherUom" "ParentObjkey"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ConditionIdRef" "OtherUomRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type CustomerWarrantyCondition
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CustomerWarrantyConditionSet(WarrantyId={WarrantyId},WarrantyTypeId='{WarrantyTypeId}',ConditionId={ConditionId})

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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"VirtualObjkey": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidTo": "2019-10-10",
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Delete entity from CustomerWarrantyConditionSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
WarrantyId
required
number
Example: 1
WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
ConditionId
required
number
Example: 1
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
/CustomerWarrantyConditionSet(WarrantyId={WarrantyId},WarrantyTypeId='{WarrantyTypeId}',ConditionId={ConditionId})

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
Update entity in CustomerWarrantyConditionSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
WarrantyId
required
number
Example: 1
WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
ConditionId
required
number
Example: 1
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "ConditionId" "MinValue" "MaxValue" "VirtualObjkey" "PartNo" "SerialNo" "ValidFrom" "ValidTo" "OtherUom" "ParentObjkey"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type CustomerWarrantyCondition

MinValue	
number
MaxValue	
number
VirtualObjkey	
string <= 4000 characters
PartNo	
string <= 4000 characters
SerialNo	
string <= 4000 characters
ValidFrom	
string <date>
ValidTo	
string <date>
OtherUom	
string <= 4000 characters
ParentObjkey	
string <= 4000 characters
Responses
200 response body for entity type CustomerWarrantyCondition
201 response body for entity type CustomerWarrantyCondition
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
/CustomerWarrantyConditionSet(WarrantyId={WarrantyId},WarrantyTypeId='{WarrantyTypeId}',ConditionId={ConditionId})

Request samples
Payload
Content type
application/json

Copy
{
"MinValue": 1,
"MaxValue": 1,
"VirtualObjkey": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidTo": "2019-10-10",
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"VirtualObjkey": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidTo": "2019-10-10",
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Invoke action UpdateWarrantyConditions
Authorizations:
(OpenIdbasicAuth)
path Parameters
WarrantyId
required
number
Example: 1
WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
ConditionId
required
number
Example: 1
header Parameters
If-Match
required
string
E-Tag

Request Body schema: application/json
request body for action UpdateWarrantyConditionsAction

MinValue	
number
MaxValue	
number
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

post
/CustomerWarrantyConditionSet(WarrantyId={WarrantyId},WarrantyTypeId='{WarrantyTypeId}',ConditionId={ConditionId})/IfsApp.InventoryPartHandling.CustomerWarrantyCondition_UpdateWarrantyConditions

Request samples
Payload
Content type
application/json

Copy
{
"MinValue": 1,
"MaxValue": 1
}
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
Invoke action DeleteWarrantyCondition
Authorizations:
(OpenIdbasicAuth)
path Parameters
WarrantyId
required
number
Example: 1
WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
ConditionId
required
number
Example: 1
header Parameters
If-Match
required
string
E-Tag

Request Body schema: application/json
request body for action DeleteWarrantyConditionAction

object (DeleteWarrantyConditionAction)
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

post
/CustomerWarrantyConditionSet(WarrantyId={WarrantyId},WarrantyTypeId='{WarrantyTypeId}',ConditionId={ConditionId})/IfsApp.InventoryPartHandling.CustomerWarrantyCondition_DeleteWarrantyCondition

Request samples
Payload
Content type
application/json

Copy
{ }
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
Invoke function DefaultCopy
Authorizations:
(OpenIdbasicAuth)
path Parameters
WarrantyId
required
number
Example: 1
WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
ConditionId
required
number
Example: 1
query Parameters
@CopyValues
required
object (CustomerWarrantyConditionCopyValues)
$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "ConditionId" "MinValue" "MaxValue" "VirtualObjkey" "PartNo" "SerialNo" "ValidFrom" "ValidTo" "OtherUom" "ParentObjkey"
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
/CustomerWarrantyConditionSet(WarrantyId={WarrantyId},WarrantyTypeId='{WarrantyTypeId}',ConditionId={ConditionId})/IfsApp.InventoryPartHandling.CustomerWarrantyCondition_DefaultCopy(CopyValues=@CopyValues)

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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"VirtualObjkey": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidTo": "2019-10-10",
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Invoke function DefaultCopy
Authorizations:
(OpenIdbasicAuth)
query Parameters
@CopyValues
required
object (CustomerWarrantyConditionCopyValues)
$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "ConditionId" "MinValue" "MaxValue" "VirtualObjkey" "PartNo" "SerialNo" "ValidFrom" "ValidTo" "OtherUom" "ParentObjkey"
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
/CustomerWarrantyConditionSet/IfsApp.InventoryPartHandling.CustomerWarrantyCondition_DefaultCopy(CopyValues=@CopyValues)

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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"VirtualObjkey": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidTo": "2019-10-10",
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Invoke function Default
Authorizations:
(OpenIdbasicAuth)
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "ConditionId" "MinValue" "MaxValue" "VirtualObjkey" "PartNo" "SerialNo" "ValidFrom" "ValidTo" "OtherUom" "ParentObjkey"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type CustomerWarrantyCondition
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CustomerWarrantyConditionSet/IfsApp.InventoryPartHandling.CustomerWarrantyCondition_Default()

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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"VirtualObjkey": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidTo": "2019-10-10",
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Get entities from ConditionIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
WarrantyId
required
number
Example: 1
WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
ConditionId
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
Items Enum: "ConditionId" "ConditionId desc" "ConditionDescription" "ConditionDescription desc" "MinValue" "MinValue desc" "MaxValue" "MaxValue desc" "TimeUnit" "TimeUnit desc" "UnitCode" "UnitCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ConditionId" "ConditionDescription" "MinValue" "MaxValue" "TimeUnit" "UnitCode"
Specify properties to return, see OData Select

Responses
200 response body for entity array WarrantyCondition
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CustomerWarrantyConditionSet(WarrantyId={WarrantyId},WarrantyTypeId='{WarrantyTypeId}',ConditionId={ConditionId})/ConditionIdRef

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
Get entities from OtherUomRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
WarrantyId
required
number
Example: 1
WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
ConditionId
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
/CustomerWarrantyConditionSet(WarrantyId={WarrantyId},WarrantyTypeId='{WarrantyTypeId}',ConditionId={ConditionId})/OtherUomRef

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
SupplierPartInformationSet
Get entities from SupplierPartInformationSet
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "SelectMethod" "SelectMethod desc" "PartNo" "PartNo desc" "SerialNo" "SerialNo desc" "WarrantyId" "WarrantyId desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SelectMethod" "PartNo" "SerialNo" "WarrantyId"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array SupplierPartInformationVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SupplierPartInformationSet

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
Add new entity to SupplierPartInformationSet
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SelectMethod" "PartNo" "SerialNo" "WarrantyId"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type SupplierPartInformationVirtual

ParentObjkey	
string <= 50 characters
ObjCreatedBy	
string <= 50 characters
SelectMethod
required
boolean
PartNo	
string <= 4000 characters
SerialNo	
string <= 4000 characters
WarrantyId	
number
Responses
201 response body for entity type SupplierPartInformationVirtual
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/SupplierPartInformationSet

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"ObjCreatedBy": "It is a Text",
"SelectMethod": true,
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"WarrantyId": 1
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
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"SelectMethod": true,
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"WarrantyId": 1
}
Get entity from SupplierPartInformationSet by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SelectMethod" "PartNo" "SerialNo" "WarrantyId"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type SupplierPartInformationVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SupplierPartInformationSet(Objkey='{Objkey}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"SelectMethod": true,
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"WarrantyId": 1
}
Delete entity from SupplierPartInformationSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
/SupplierPartInformationSet(Objkey='{Objkey}')

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
Update entity in SupplierPartInformationSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SelectMethod" "PartNo" "SerialNo" "WarrantyId"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type SupplierPartInformationVirtual

SelectMethod
required
boolean
PartNo	
string <= 4000 characters
SerialNo	
string <= 4000 characters
WarrantyId	
number
Responses
200 response body for entity type SupplierPartInformationVirtual
201 response body for entity type SupplierPartInformationVirtual
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
/SupplierPartInformationSet(Objkey='{Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"SelectMethod": true,
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"WarrantyId": 1
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
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"SelectMethod": true,
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"WarrantyId": 1
}
Invoke action CleanupVirtualEntity
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
header Parameters
If-Match
required
string
E-Tag

Request Body schema: application/json
request body for action CleanupVirtualEntityAction

object (CleanupVirtualEntityAction)
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

post
/SupplierPartInformationSet(Objkey='{Objkey}')/IfsApp.InventoryPartHandling.SupplierPartInformationVirtual_CleanupVirtualEntity

Request samples
Payload
Content type
application/json

Copy
{ }
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
Invoke function Default
Authorizations:
(OpenIdbasicAuth)
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SelectMethod" "PartNo" "SerialNo" "WarrantyId"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type SupplierPartInformationVirtual
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SupplierPartInformationSet/IfsApp.InventoryPartHandling.SupplierPartInformationVirtual_Default()

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"SelectMethod": true,
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"WarrantyId": 1
}
Get entities from SupplierWarrantyTypeArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "CustomerOrderConnectionDb" "CustomerOrderConnectionDb desc" "ConvertToCustOrdDb" "ConvertToCustOrdDb desc" "MaterialCostTypeDb" "MaterialCostTypeDb desc" "ExpensesCostTypeDb" "ExpensesCostTypeDb desc" "FixedPriceCostTypeDb" "FixedPriceCostTypeDb desc" "PersonnelCostTypeDb" "PersonnelCostTypeDb desc" "ExternalCostTypeDb" "ExternalCostTypeDb desc" "WarrantyTypeId" "WarrantyTypeId desc" "WarrantyDescription" "WarrantyDescription desc" "WarrantyId" "WarrantyId desc" "NoteText" "NoteText desc" "PartNo" "PartNo desc" "SerialNo" "SerialNo desc" "ObjId" "ObjId desc" "ObjVersion" "ObjVersion desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "CustomerOrderConnectionDb" "ConvertToCustOrdDb" "MaterialCostTypeDb" "ExpensesCostTypeDb" "FixedPriceCostTypeDb" "PersonnelCostTypeDb" "ExternalCostTypeDb" "WarrantyTypeId" "WarrantyDescription" "WarrantyId" "NoteText" "PartNo" "SerialNo" "ObjId" "ObjVersion"
Specify properties to return, see OData Select

Responses
200 response body for entity array SupplierWarrantyTypeVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SupplierPartInformationSet(Objkey='{Objkey}')/SupplierWarrantyTypeArray

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
Add new entity to SupplierWarrantyTypeArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SelectMethod" "PartNo" "SerialNo" "WarrantyId"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type SupplierWarrantyTypeVirtual

ParentObjkey	
string <= 50 characters
ObjCreatedBy	
string <= 50 characters
CustomerOrderConnectionDb
required
boolean
ConvertToCustOrdDb
required
boolean
MaterialCostTypeDb
required
boolean
ExpensesCostTypeDb
required
boolean
FixedPriceCostTypeDb
required
boolean
PersonnelCostTypeDb
required
boolean
ExternalCostTypeDb
required
boolean
WarrantyTypeId
required
string <= 100 characters
WarrantyDescription	
string <= 35 characters
WarrantyId	
number
NoteText	
string <= 2000 characters
PartNo	
string <= 4000 characters
SerialNo	
string <= 4000 characters
ObjId	
string <= 4000 characters
ObjVersion	
string <= 4000 characters
Responses
201 response body for entity type SupplierWarrantyTypeVirtual
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/SupplierPartInformationSet(Objkey='{Objkey}')/SupplierWarrantyTypeArray

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"ObjCreatedBy": "It is a Text",
"CustomerOrderConnectionDb": true,
"ConvertToCustOrdDb": true,
"MaterialCostTypeDb": true,
"ExpensesCostTypeDb": true,
"FixedPriceCostTypeDb": true,
"PersonnelCostTypeDb": true,
"ExternalCostTypeDb": true,
"WarrantyTypeId": "It is a Text",
"WarrantyDescription": "It is a Text",
"WarrantyId": 1,
"NoteText": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ObjId": "It is a Text",
"ObjVersion": "It is a Text"
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
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"CustomerOrderConnectionDb": true,
"ConvertToCustOrdDb": true,
"MaterialCostTypeDb": true,
"ExpensesCostTypeDb": true,
"FixedPriceCostTypeDb": true,
"PersonnelCostTypeDb": true,
"ExternalCostTypeDb": true,
"WarrantyTypeId": "It is a Text",
"WarrantyDescription": "It is a Text",
"WarrantyId": 1,
"NoteText": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ObjId": "It is a Text",
"ObjVersion": "It is a Text"
}
Get entity from SupplierWarrantyTypeArray by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
SupplierWarrantyTypeArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SelectMethod" "PartNo" "SerialNo" "WarrantyId"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type SupplierWarrantyTypeVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SupplierPartInformationSet(Objkey='{Objkey}')/SupplierWarrantyTypeArray(Objkey='{SupplierWarrantyTypeArray_Objkey}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"CustomerOrderConnectionDb": true,
"ConvertToCustOrdDb": true,
"MaterialCostTypeDb": true,
"ExpensesCostTypeDb": true,
"FixedPriceCostTypeDb": true,
"PersonnelCostTypeDb": true,
"ExternalCostTypeDb": true,
"WarrantyTypeId": "It is a Text",
"WarrantyDescription": "It is a Text",
"WarrantyId": 1,
"NoteText": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ObjId": "It is a Text",
"ObjVersion": "It is a Text"
}
Delete entity from SupplierWarrantyTypeArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
SupplierWarrantyTypeArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

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
/SupplierPartInformationSet(Objkey='{Objkey}')/SupplierWarrantyTypeArray(Objkey='{SupplierWarrantyTypeArray_Objkey}')

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
Update entity in SupplierWarrantyTypeArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
SupplierWarrantyTypeArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SelectMethod" "PartNo" "SerialNo" "WarrantyId"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type SupplierWarrantyTypeVirtual

CustomerOrderConnectionDb
required
boolean
ConvertToCustOrdDb
required
boolean
MaterialCostTypeDb
required
boolean
ExpensesCostTypeDb
required
boolean
FixedPriceCostTypeDb
required
boolean
PersonnelCostTypeDb
required
boolean
ExternalCostTypeDb
required
boolean
WarrantyTypeId
required
string <= 100 characters
WarrantyDescription	
string <= 35 characters
WarrantyId	
number
NoteText	
string <= 2000 characters
PartNo	
string <= 4000 characters
SerialNo	
string <= 4000 characters
ObjId	
string <= 4000 characters
ObjVersion	
string <= 4000 characters
Responses
200 response body for entity type SupplierWarrantyTypeVirtual
201 response body for entity type SupplierWarrantyTypeVirtual
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
/SupplierPartInformationSet(Objkey='{Objkey}')/SupplierWarrantyTypeArray(Objkey='{SupplierWarrantyTypeArray_Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"CustomerOrderConnectionDb": true,
"ConvertToCustOrdDb": true,
"MaterialCostTypeDb": true,
"ExpensesCostTypeDb": true,
"FixedPriceCostTypeDb": true,
"PersonnelCostTypeDb": true,
"ExternalCostTypeDb": true,
"WarrantyTypeId": "It is a Text",
"WarrantyDescription": "It is a Text",
"WarrantyId": 1,
"NoteText": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ObjId": "It is a Text",
"ObjVersion": "It is a Text"
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
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"CustomerOrderConnectionDb": true,
"ConvertToCustOrdDb": true,
"MaterialCostTypeDb": true,
"ExpensesCostTypeDb": true,
"FixedPriceCostTypeDb": true,
"PersonnelCostTypeDb": true,
"ExternalCostTypeDb": true,
"WarrantyTypeId": "It is a Text",
"WarrantyDescription": "It is a Text",
"WarrantyId": 1,
"NoteText": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ObjId": "It is a Text",
"ObjVersion": "It is a Text"
}
Get entities from SupplierWarrantyConditionArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
SupplierWarrantyTypeArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

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
Items Enum: "WarrantyId" "WarrantyId desc" "WarrantyTypeId" "WarrantyTypeId desc" "ConditionId" "ConditionId desc" "MinValue" "MinValue desc" "MaxValue" "MaxValue desc" "OtherUom" "OtherUom desc" "ParentObjkey" "ParentObjkey desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "ConditionId" "MinValue" "MaxValue" "OtherUom" "ParentObjkey"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "ConditionIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array SupplierWarrantyCondition
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SupplierPartInformationSet(Objkey='{Objkey}')/SupplierWarrantyTypeArray(Objkey='{SupplierWarrantyTypeArray_Objkey}')/SupplierWarrantyConditionArray

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
Add new entity to SupplierWarrantyConditionArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
SupplierWarrantyTypeArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SelectMethod" "PartNo" "SerialNo" "WarrantyId"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type SupplierWarrantyCondition

WarrantyId
required
number
WarrantyTypeId
required
string <= 20 characters
ConditionId
required
number
MinValue	
number
MaxValue	
number
OtherUom	
string <= 4000 characters
ParentObjkey	
string <= 4000 characters
Responses
201 response body for entity type SupplierWarrantyCondition
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/SupplierPartInformationSet(Objkey='{Objkey}')/SupplierWarrantyTypeArray(Objkey='{SupplierWarrantyTypeArray_Objkey}')/SupplierWarrantyConditionArray

Request samples
Payload
Content type
application/json

Copy
{
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Get entity from SupplierWarrantyConditionArray by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
SupplierWarrantyConditionArray_WarrantyId
required
number
Example: 1
key: WarrantyId

SupplierWarrantyConditionArray_WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
key: WarrantyTypeId

SupplierWarrantyConditionArray_ConditionId
required
number
Example: 1
key: ConditionId

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SelectMethod" "PartNo" "SerialNo" "WarrantyId"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type SupplierWarrantyCondition
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SupplierPartInformationSet(Objkey='{Objkey}')/SupplierWarrantyTypeArray(Objkey='{SupplierWarrantyTypeArray_Objkey}')/SupplierWarrantyConditionArray(WarrantyId={SupplierWarrantyConditionArray_WarrantyId},WarrantyTypeId='{SupplierWarrantyConditionArray_WarrantyTypeId}',ConditionId={SupplierWarrantyConditionArray_ConditionId})

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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Delete entity from SupplierWarrantyConditionArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
SupplierWarrantyConditionArray_WarrantyId
required
number
Example: 1
key: WarrantyId

SupplierWarrantyConditionArray_WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
key: WarrantyTypeId

SupplierWarrantyConditionArray_ConditionId
required
number
Example: 1
key: ConditionId

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
/SupplierPartInformationSet(Objkey='{Objkey}')/SupplierWarrantyTypeArray(Objkey='{SupplierWarrantyTypeArray_Objkey}')/SupplierWarrantyConditionArray(WarrantyId={SupplierWarrantyConditionArray_WarrantyId},WarrantyTypeId='{SupplierWarrantyConditionArray_WarrantyTypeId}',ConditionId={SupplierWarrantyConditionArray_ConditionId})

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
Update entity in SupplierWarrantyConditionArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
SupplierWarrantyConditionArray_WarrantyId
required
number
Example: 1
key: WarrantyId

SupplierWarrantyConditionArray_WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
key: WarrantyTypeId

SupplierWarrantyConditionArray_ConditionId
required
number
Example: 1
key: ConditionId

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SelectMethod" "PartNo" "SerialNo" "WarrantyId"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type SupplierWarrantyCondition

MinValue	
number
MaxValue	
number
OtherUom	
string <= 4000 characters
ParentObjkey	
string <= 4000 characters
Responses
200 response body for entity type SupplierWarrantyCondition
201 response body for entity type SupplierWarrantyCondition
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
/SupplierPartInformationSet(Objkey='{Objkey}')/SupplierWarrantyTypeArray(Objkey='{SupplierWarrantyTypeArray_Objkey}')/SupplierWarrantyConditionArray(WarrantyId={SupplierWarrantyConditionArray_WarrantyId},WarrantyTypeId='{SupplierWarrantyConditionArray_WarrantyTypeId}',ConditionId={SupplierWarrantyConditionArray_ConditionId})

Request samples
Payload
Content type
application/json

Copy
{
"MinValue": 1,
"MaxValue": 1,
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Get entities from PartNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
Items Enum: "PartNo" "PartNo desc" "Description" "Description desc" "LanguageDescription" "LanguageDescription desc" "InfoText" "InfoText desc" "StdNameId" "StdNameId desc" "UnitCode" "UnitCode desc" "LotTrackingCode" "LotTrackingCode desc" "SerialRule" "SerialRule desc" "SerialTrackingCode" "SerialTrackingCode desc" "EngSerialTrackingCode" "EngSerialTrackingCode desc" "PartMainGroup" "PartMainGroup desc" "Configurable" "Configurable desc" "CustWarrantyId" "CustWarrantyId desc" "SupWarrantyId" "SupWarrantyId desc" "ConditionCodeUsage" "ConditionCodeUsage desc" "SubLotRule" "SubLotRule desc" "LotQuantityRule" "LotQuantityRule desc" "PositionPart" "PositionPart desc" "InputUnitMeasGroupId" "InputUnitMeasGroupId desc" "CatchUnitEnabled" "CatchUnitEnabled desc" "MultilevelTracking" "MultilevelTracking desc" "ComponentLotRule" "ComponentLotRule desc" "StopArrivalIssuedSerial" "StopArrivalIssuedSerial desc" "WeightNet" "WeightNet desc" "UomForWeightNet" "UomForWeightNet desc" "VolumeNet" "VolumeNet desc" "UomForVolumeNet" "UomForVolumeNet desc" "FreightFactor" "FreightFactor desc" "AllowAsNotConsumed" "AllowAsNotConsumed desc" "ReceiptIssueSerialTrack" "ReceiptIssueSerialTrack desc" "StopNewSerialInRma" "StopNewSerialInRma desc" "TechnicalDrawingNo" "TechnicalDrawingNo desc" "ProductTypeClassif" "ProductTypeClassif desc" "CestCode" "CestCode desc" "FciCode" "FciCode desc" "FirstInventorySite" "FirstInventorySite desc" "Ppv" "Ppv desc" "IsNewPart" "IsNewPart desc" "CPpvStatus" "CPpvStatus desc" "CPartConfigCompletion" "CPartConfigCompletion desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PartNo" "Description" "LanguageDescription" "InfoText" "StdNameId" "UnitCode" "LotTrackingCode" "SerialRule" "SerialTrackingCode" "EngSerialTrackingCode" "PartMainGroup" "Configurable" "CustWarrantyId" "SupWarrantyId" "ConditionCodeUsage" "SubLotRule" "LotQuantityRule" "PositionPart" "InputUnitMeasGroupId" "CatchUnitEnabled" "MultilevelTracking" "ComponentLotRule" "StopArrivalIssuedSerial" "WeightNet" "UomForWeightNet" "VolumeNet" "UomForVolumeNet" "FreightFactor" "AllowAsNotConsumed" "ReceiptIssueSerialTrack" "StopNewSerialInRma" "TechnicalDrawingNo" "ProductTypeClassif" "CestCode" "FciCode" "FirstInventorySite" "Ppv" "IsNewPart" "CPpvStatus" "CPartConfigCompletion"
Specify properties to return, see OData Select

Responses
200 response body for entity array PartCatalog
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SupplierPartInformationSet(Objkey='{Objkey}')/PartNoRef

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
SupplierWarrantyTypeSet
Get entities from SupplierWarrantyTypeSet
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "CustomerOrderConnectionDb" "CustomerOrderConnectionDb desc" "ConvertToCustOrdDb" "ConvertToCustOrdDb desc" "MaterialCostTypeDb" "MaterialCostTypeDb desc" "ExpensesCostTypeDb" "ExpensesCostTypeDb desc" "FixedPriceCostTypeDb" "FixedPriceCostTypeDb desc" "PersonnelCostTypeDb" "PersonnelCostTypeDb desc" "ExternalCostTypeDb" "ExternalCostTypeDb desc" "WarrantyTypeId" "WarrantyTypeId desc" "WarrantyDescription" "WarrantyDescription desc" "WarrantyId" "WarrantyId desc" "NoteText" "NoteText desc" "PartNo" "PartNo desc" "SerialNo" "SerialNo desc" "ObjId" "ObjId desc" "ObjVersion" "ObjVersion desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "CustomerOrderConnectionDb" "ConvertToCustOrdDb" "MaterialCostTypeDb" "ExpensesCostTypeDb" "FixedPriceCostTypeDb" "PersonnelCostTypeDb" "ExternalCostTypeDb" "WarrantyTypeId" "WarrantyDescription" "WarrantyId" "NoteText" "PartNo" "SerialNo" "ObjId" "ObjVersion"
Specify properties to return, see OData Select

Responses
200 response body for entity array SupplierWarrantyTypeVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SupplierWarrantyTypeSet

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
Add new entity to SupplierWarrantyTypeSet
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "CustomerOrderConnectionDb" "ConvertToCustOrdDb" "MaterialCostTypeDb" "ExpensesCostTypeDb" "FixedPriceCostTypeDb" "PersonnelCostTypeDb" "ExternalCostTypeDb" "WarrantyTypeId" "WarrantyDescription" "WarrantyId" "NoteText" "PartNo" "SerialNo" "ObjId" "ObjVersion"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type SupplierWarrantyTypeVirtual

ParentObjkey	
string <= 50 characters
ObjCreatedBy	
string <= 50 characters
CustomerOrderConnectionDb
required
boolean
ConvertToCustOrdDb
required
boolean
MaterialCostTypeDb
required
boolean
ExpensesCostTypeDb
required
boolean
FixedPriceCostTypeDb
required
boolean
PersonnelCostTypeDb
required
boolean
ExternalCostTypeDb
required
boolean
WarrantyTypeId
required
string <= 100 characters
WarrantyDescription	
string <= 35 characters
WarrantyId	
number
NoteText	
string <= 2000 characters
PartNo	
string <= 4000 characters
SerialNo	
string <= 4000 characters
ObjId	
string <= 4000 characters
ObjVersion	
string <= 4000 characters
Responses
201 response body for entity type SupplierWarrantyTypeVirtual
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/SupplierWarrantyTypeSet

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"ObjCreatedBy": "It is a Text",
"CustomerOrderConnectionDb": true,
"ConvertToCustOrdDb": true,
"MaterialCostTypeDb": true,
"ExpensesCostTypeDb": true,
"FixedPriceCostTypeDb": true,
"PersonnelCostTypeDb": true,
"ExternalCostTypeDb": true,
"WarrantyTypeId": "It is a Text",
"WarrantyDescription": "It is a Text",
"WarrantyId": 1,
"NoteText": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ObjId": "It is a Text",
"ObjVersion": "It is a Text"
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
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"CustomerOrderConnectionDb": true,
"ConvertToCustOrdDb": true,
"MaterialCostTypeDb": true,
"ExpensesCostTypeDb": true,
"FixedPriceCostTypeDb": true,
"PersonnelCostTypeDb": true,
"ExternalCostTypeDb": true,
"WarrantyTypeId": "It is a Text",
"WarrantyDescription": "It is a Text",
"WarrantyId": 1,
"NoteText": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ObjId": "It is a Text",
"ObjVersion": "It is a Text"
}
Get entity from SupplierWarrantyTypeSet by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "CustomerOrderConnectionDb" "ConvertToCustOrdDb" "MaterialCostTypeDb" "ExpensesCostTypeDb" "FixedPriceCostTypeDb" "PersonnelCostTypeDb" "ExternalCostTypeDb" "WarrantyTypeId" "WarrantyDescription" "WarrantyId" "NoteText" "PartNo" "SerialNo" "ObjId" "ObjVersion"
Specify properties to return, see OData Select

Responses
200 response body for entity type SupplierWarrantyTypeVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SupplierWarrantyTypeSet(Objkey='{Objkey}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"CustomerOrderConnectionDb": true,
"ConvertToCustOrdDb": true,
"MaterialCostTypeDb": true,
"ExpensesCostTypeDb": true,
"FixedPriceCostTypeDb": true,
"PersonnelCostTypeDb": true,
"ExternalCostTypeDb": true,
"WarrantyTypeId": "It is a Text",
"WarrantyDescription": "It is a Text",
"WarrantyId": 1,
"NoteText": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ObjId": "It is a Text",
"ObjVersion": "It is a Text"
}
Delete entity from SupplierWarrantyTypeSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
/SupplierWarrantyTypeSet(Objkey='{Objkey}')

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
Update entity in SupplierWarrantyTypeSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "CustomerOrderConnectionDb" "ConvertToCustOrdDb" "MaterialCostTypeDb" "ExpensesCostTypeDb" "FixedPriceCostTypeDb" "PersonnelCostTypeDb" "ExternalCostTypeDb" "WarrantyTypeId" "WarrantyDescription" "WarrantyId" "NoteText" "PartNo" "SerialNo" "ObjId" "ObjVersion"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type SupplierWarrantyTypeVirtual

CustomerOrderConnectionDb
required
boolean
ConvertToCustOrdDb
required
boolean
MaterialCostTypeDb
required
boolean
ExpensesCostTypeDb
required
boolean
FixedPriceCostTypeDb
required
boolean
PersonnelCostTypeDb
required
boolean
ExternalCostTypeDb
required
boolean
WarrantyTypeId
required
string <= 100 characters
WarrantyDescription	
string <= 35 characters
WarrantyId	
number
NoteText	
string <= 2000 characters
PartNo	
string <= 4000 characters
SerialNo	
string <= 4000 characters
ObjId	
string <= 4000 characters
ObjVersion	
string <= 4000 characters
Responses
200 response body for entity type SupplierWarrantyTypeVirtual
201 response body for entity type SupplierWarrantyTypeVirtual
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
/SupplierWarrantyTypeSet(Objkey='{Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"CustomerOrderConnectionDb": true,
"ConvertToCustOrdDb": true,
"MaterialCostTypeDb": true,
"ExpensesCostTypeDb": true,
"FixedPriceCostTypeDb": true,
"PersonnelCostTypeDb": true,
"ExternalCostTypeDb": true,
"WarrantyTypeId": "It is a Text",
"WarrantyDescription": "It is a Text",
"WarrantyId": 1,
"NoteText": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ObjId": "It is a Text",
"ObjVersion": "It is a Text"
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
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"CustomerOrderConnectionDb": true,
"ConvertToCustOrdDb": true,
"MaterialCostTypeDb": true,
"ExpensesCostTypeDb": true,
"FixedPriceCostTypeDb": true,
"PersonnelCostTypeDb": true,
"ExternalCostTypeDb": true,
"WarrantyTypeId": "It is a Text",
"WarrantyDescription": "It is a Text",
"WarrantyId": 1,
"NoteText": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ObjId": "It is a Text",
"ObjVersion": "It is a Text"
}
Invoke action CleanupVirtualEntity
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
header Parameters
If-Match
required
string
E-Tag

Request Body schema: application/json
request body for action CleanupVirtualEntityAction

object (CleanupVirtualEntityAction)
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

post
/SupplierWarrantyTypeSet(Objkey='{Objkey}')/IfsApp.InventoryPartHandling.SupplierWarrantyTypeVirtual_CleanupVirtualEntity

Request samples
Payload
Content type
application/json

Copy
{ }
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
Invoke function Default
Authorizations:
(OpenIdbasicAuth)
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "CustomerOrderConnectionDb" "ConvertToCustOrdDb" "MaterialCostTypeDb" "ExpensesCostTypeDb" "FixedPriceCostTypeDb" "PersonnelCostTypeDb" "ExternalCostTypeDb" "WarrantyTypeId" "WarrantyDescription" "WarrantyId" "NoteText" "PartNo" "SerialNo" "ObjId" "ObjVersion"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type SupplierWarrantyTypeVirtual
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SupplierWarrantyTypeSet/IfsApp.InventoryPartHandling.SupplierWarrantyTypeVirtual_Default()

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"CustomerOrderConnectionDb": true,
"ConvertToCustOrdDb": true,
"MaterialCostTypeDb": true,
"ExpensesCostTypeDb": true,
"FixedPriceCostTypeDb": true,
"PersonnelCostTypeDb": true,
"ExternalCostTypeDb": true,
"WarrantyTypeId": "It is a Text",
"WarrantyDescription": "It is a Text",
"WarrantyId": 1,
"NoteText": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ObjId": "It is a Text",
"ObjVersion": "It is a Text"
}
Get entities from SupplierWarrantyConditionArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
Items Enum: "WarrantyId" "WarrantyId desc" "WarrantyTypeId" "WarrantyTypeId desc" "ConditionId" "ConditionId desc" "MinValue" "MinValue desc" "MaxValue" "MaxValue desc" "OtherUom" "OtherUom desc" "ParentObjkey" "ParentObjkey desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "ConditionId" "MinValue" "MaxValue" "OtherUom" "ParentObjkey"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "ConditionIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array SupplierWarrantyCondition
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SupplierWarrantyTypeSet(Objkey='{Objkey}')/SupplierWarrantyConditionArray

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
Add new entity to SupplierWarrantyConditionArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "CustomerOrderConnectionDb" "ConvertToCustOrdDb" "MaterialCostTypeDb" "ExpensesCostTypeDb" "FixedPriceCostTypeDb" "PersonnelCostTypeDb" "ExternalCostTypeDb" "WarrantyTypeId" "WarrantyDescription" "WarrantyId" "NoteText" "PartNo" "SerialNo" "ObjId" "ObjVersion"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type SupplierWarrantyCondition

WarrantyId
required
number
WarrantyTypeId
required
string <= 20 characters
ConditionId
required
number
MinValue	
number
MaxValue	
number
OtherUom	
string <= 4000 characters
ParentObjkey	
string <= 4000 characters
Responses
201 response body for entity type SupplierWarrantyCondition
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/SupplierWarrantyTypeSet(Objkey='{Objkey}')/SupplierWarrantyConditionArray

Request samples
Payload
Content type
application/json

Copy
{
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Get entity from SupplierWarrantyConditionArray by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
SupplierWarrantyConditionArray_WarrantyId
required
number
Example: 1
key: WarrantyId

SupplierWarrantyConditionArray_WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
key: WarrantyTypeId

SupplierWarrantyConditionArray_ConditionId
required
number
Example: 1
key: ConditionId

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "CustomerOrderConnectionDb" "ConvertToCustOrdDb" "MaterialCostTypeDb" "ExpensesCostTypeDb" "FixedPriceCostTypeDb" "PersonnelCostTypeDb" "ExternalCostTypeDb" "WarrantyTypeId" "WarrantyDescription" "WarrantyId" "NoteText" "PartNo" "SerialNo" "ObjId" "ObjVersion"
Specify properties to return, see OData Select

Responses
200 response body for entity type SupplierWarrantyCondition
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SupplierWarrantyTypeSet(Objkey='{Objkey}')/SupplierWarrantyConditionArray(WarrantyId={SupplierWarrantyConditionArray_WarrantyId},WarrantyTypeId='{SupplierWarrantyConditionArray_WarrantyTypeId}',ConditionId={SupplierWarrantyConditionArray_ConditionId})

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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Delete entity from SupplierWarrantyConditionArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
SupplierWarrantyConditionArray_WarrantyId
required
number
Example: 1
key: WarrantyId

SupplierWarrantyConditionArray_WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
key: WarrantyTypeId

SupplierWarrantyConditionArray_ConditionId
required
number
Example: 1
key: ConditionId

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
/SupplierWarrantyTypeSet(Objkey='{Objkey}')/SupplierWarrantyConditionArray(WarrantyId={SupplierWarrantyConditionArray_WarrantyId},WarrantyTypeId='{SupplierWarrantyConditionArray_WarrantyTypeId}',ConditionId={SupplierWarrantyConditionArray_ConditionId})

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
Update entity in SupplierWarrantyConditionArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
SupplierWarrantyConditionArray_WarrantyId
required
number
Example: 1
key: WarrantyId

SupplierWarrantyConditionArray_WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
key: WarrantyTypeId

SupplierWarrantyConditionArray_ConditionId
required
number
Example: 1
key: ConditionId

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "CustomerOrderConnectionDb" "ConvertToCustOrdDb" "MaterialCostTypeDb" "ExpensesCostTypeDb" "FixedPriceCostTypeDb" "PersonnelCostTypeDb" "ExternalCostTypeDb" "WarrantyTypeId" "WarrantyDescription" "WarrantyId" "NoteText" "PartNo" "SerialNo" "ObjId" "ObjVersion"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type SupplierWarrantyCondition

MinValue	
number
MaxValue	
number
OtherUom	
string <= 4000 characters
ParentObjkey	
string <= 4000 characters
Responses
200 response body for entity type SupplierWarrantyCondition
201 response body for entity type SupplierWarrantyCondition
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
/SupplierWarrantyTypeSet(Objkey='{Objkey}')/SupplierWarrantyConditionArray(WarrantyId={SupplierWarrantyConditionArray_WarrantyId},WarrantyTypeId='{SupplierWarrantyConditionArray_WarrantyTypeId}',ConditionId={SupplierWarrantyConditionArray_ConditionId})

Request samples
Payload
Content type
application/json

Copy
{
"MinValue": 1,
"MaxValue": 1,
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Get entities from ConditionIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
SupplierWarrantyConditionArray_WarrantyId
required
number
Example: 1
key: WarrantyId

SupplierWarrantyConditionArray_WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
key: WarrantyTypeId

SupplierWarrantyConditionArray_ConditionId
required
number
Example: 1
key: ConditionId

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
Items Enum: "ConditionId" "ConditionId desc" "ConditionDescription" "ConditionDescription desc" "MinValue" "MinValue desc" "MaxValue" "MaxValue desc" "TimeUnit" "TimeUnit desc" "UnitCode" "UnitCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ConditionId" "ConditionDescription" "MinValue" "MaxValue" "TimeUnit" "UnitCode"
Specify properties to return, see OData Select

Responses
200 response body for entity array WarrantyCondition
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SupplierWarrantyTypeSet(Objkey='{Objkey}')/SupplierWarrantyConditionArray(WarrantyId={SupplierWarrantyConditionArray_WarrantyId},WarrantyTypeId='{SupplierWarrantyConditionArray_WarrantyTypeId}',ConditionId={SupplierWarrantyConditionArray_ConditionId})/ConditionIdRef

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
SupplierWarrantyConditionSet
Get entities from SupplierWarrantyConditionSet
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
Items Enum: "WarrantyId" "WarrantyId desc" "WarrantyTypeId" "WarrantyTypeId desc" "ConditionId" "ConditionId desc" "MinValue" "MinValue desc" "MaxValue" "MaxValue desc" "OtherUom" "OtherUom desc" "ParentObjkey" "ParentObjkey desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "ConditionId" "MinValue" "MaxValue" "OtherUom" "ParentObjkey"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "ConditionIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array SupplierWarrantyCondition
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SupplierWarrantyConditionSet

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
Add new entity to SupplierWarrantyConditionSet
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "ConditionId" "MinValue" "MaxValue" "OtherUom" "ParentObjkey"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type SupplierWarrantyCondition

WarrantyId
required
number
WarrantyTypeId
required
string <= 20 characters
ConditionId
required
number
MinValue	
number
MaxValue	
number
OtherUom	
string <= 4000 characters
ParentObjkey	
string <= 4000 characters
Responses
201 response body for entity type SupplierWarrantyCondition
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/SupplierWarrantyConditionSet

Request samples
Payload
Content type
application/json

Copy
{
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Get entity from SupplierWarrantyConditionSet by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
WarrantyId
required
number
Example: 1
WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
ConditionId
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "ConditionId" "MinValue" "MaxValue" "OtherUom" "ParentObjkey"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "ConditionIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type SupplierWarrantyCondition
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SupplierWarrantyConditionSet(WarrantyId={WarrantyId},WarrantyTypeId='{WarrantyTypeId}',ConditionId={ConditionId})

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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Delete entity from SupplierWarrantyConditionSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
WarrantyId
required
number
Example: 1
WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
ConditionId
required
number
Example: 1
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
/SupplierWarrantyConditionSet(WarrantyId={WarrantyId},WarrantyTypeId='{WarrantyTypeId}',ConditionId={ConditionId})

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
Update entity in SupplierWarrantyConditionSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
WarrantyId
required
number
Example: 1
WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
ConditionId
required
number
Example: 1
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "ConditionId" "MinValue" "MaxValue" "OtherUom" "ParentObjkey"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type SupplierWarrantyCondition

MinValue	
number
MaxValue	
number
OtherUom	
string <= 4000 characters
ParentObjkey	
string <= 4000 characters
Responses
200 response body for entity type SupplierWarrantyCondition
201 response body for entity type SupplierWarrantyCondition
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
/SupplierWarrantyConditionSet(WarrantyId={WarrantyId},WarrantyTypeId='{WarrantyTypeId}',ConditionId={ConditionId})

Request samples
Payload
Content type
application/json

Copy
{
"MinValue": 1,
"MaxValue": 1,
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Invoke action UpdateWarranty
Authorizations:
(OpenIdbasicAuth)
path Parameters
WarrantyId
required
number
Example: 1
WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
ConditionId
required
number
Example: 1
header Parameters
If-Match
required
string
E-Tag

Request Body schema: application/json
request body for action UpdateWarrantyAction

MinValue	
number
MaxValue	
number
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

post
/SupplierWarrantyConditionSet(WarrantyId={WarrantyId},WarrantyTypeId='{WarrantyTypeId}',ConditionId={ConditionId})/IfsApp.InventoryPartHandling.SupplierWarrantyCondition_UpdateWarranty

Request samples
Payload
Content type
application/json

Copy
{
"MinValue": 1,
"MaxValue": 1
}
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
Invoke action DeleteSupplierWarrantyCondition
Authorizations:
(OpenIdbasicAuth)
path Parameters
WarrantyId
required
number
Example: 1
WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
ConditionId
required
number
Example: 1
header Parameters
If-Match
required
string
E-Tag

Request Body schema: application/json
request body for action DeleteSupplierWarrantyConditionAction

object (DeleteSupplierWarrantyConditionAction)
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

post
/SupplierWarrantyConditionSet(WarrantyId={WarrantyId},WarrantyTypeId='{WarrantyTypeId}',ConditionId={ConditionId})/IfsApp.InventoryPartHandling.SupplierWarrantyCondition_DeleteSupplierWarrantyCondition

Request samples
Payload
Content type
application/json

Copy
{ }
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
Invoke function DefaultCopy
Authorizations:
(OpenIdbasicAuth)
path Parameters
WarrantyId
required
number
Example: 1
WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
ConditionId
required
number
Example: 1
query Parameters
@CopyValues
required
object (SupplierWarrantyConditionCopyValues)
$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "ConditionId" "MinValue" "MaxValue" "OtherUom" "ParentObjkey"
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
/SupplierWarrantyConditionSet(WarrantyId={WarrantyId},WarrantyTypeId='{WarrantyTypeId}',ConditionId={ConditionId})/IfsApp.InventoryPartHandling.SupplierWarrantyCondition_DefaultCopy(CopyValues=@CopyValues)

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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Invoke function DefaultCopy
Authorizations:
(OpenIdbasicAuth)
query Parameters
@CopyValues
required
object (SupplierWarrantyConditionCopyValues)
$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "ConditionId" "MinValue" "MaxValue" "OtherUom" "ParentObjkey"
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
/SupplierWarrantyConditionSet/IfsApp.InventoryPartHandling.SupplierWarrantyCondition_DefaultCopy(CopyValues=@CopyValues)

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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Invoke function Default
Authorizations:
(OpenIdbasicAuth)
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "ConditionId" "MinValue" "MaxValue" "OtherUom" "ParentObjkey"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type SupplierWarrantyCondition
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SupplierWarrantyConditionSet/IfsApp.InventoryPartHandling.SupplierWarrantyCondition_Default()

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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Get entities from ConditionIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
WarrantyId
required
number
Example: 1
WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
ConditionId
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
Items Enum: "ConditionId" "ConditionId desc" "ConditionDescription" "ConditionDescription desc" "MinValue" "MinValue desc" "MaxValue" "MaxValue desc" "TimeUnit" "TimeUnit desc" "UnitCode" "UnitCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ConditionId" "ConditionDescription" "MinValue" "MaxValue" "TimeUnit" "UnitCode"
Specify properties to return, see OData Select

Responses
200 response body for entity array WarrantyCondition
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SupplierWarrantyConditionSet(WarrantyId={WarrantyId},WarrantyTypeId='{WarrantyTypeId}',ConditionId={ConditionId})/ConditionIdRef

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
CPpvPurReqSet
Get entities from CPpvPurReqSet
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "AttachPurReq" "AttachPurReq desc" "Prototype" "Prototype desc" "InspNeeded" "InspNeeded desc" "PartNo" "PartNo desc" "Contract" "Contract desc" "Description" "Description desc" "RequisitionerCode" "RequisitionerCode desc" "RequisitionNo" "RequisitionNo desc" "BuyerCode" "BuyerCode desc" "AttachPrRequisitioner" "AttachPrRequisitioner desc" "OrderedQty" "OrderedQty desc" "WantedReceiptDate" "WantedReceiptDate desc" "AnnualQtyPlanned" "AnnualQtyPlanned desc" "QtyPerBoat" "QtyPerBoat desc" "PartCreationReasonId" "PartCreationReasonId desc" "ConnectedModel" "ConnectedModel desc" "TargetPrice" "TargetPrice desc" "ProposalSupplier" "ProposalSupplier desc" "UnitMeas" "UnitMeas desc" "UnitMeas2" "UnitMeas2 desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "AttachPurReq" "Prototype" "InspNeeded" "PartNo" "Contract" "Description" "RequisitionerCode" "RequisitionNo" "BuyerCode" "AttachPrRequisitioner" "OrderedQty" "WantedReceiptDate" "AnnualQtyPlanned" "QtyPerBoat" "PartCreationReasonId" "ConnectedModel" "TargetPrice" "ProposalSupplier" "UnitMeas" "UnitMeas2"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "PurReqAssociateRef" "RequisitionerRef" "BuyerCodeRef" "ReasonPartCreationRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array CPpvPurReqVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CPpvPurReqSet

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
Add new entity to CPpvPurReqSet
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "AttachPurReq" "Prototype" "InspNeeded" "PartNo" "Contract" "Description" "RequisitionerCode" "RequisitionNo" "BuyerCode" "AttachPrRequisitioner" "OrderedQty" "WantedReceiptDate" "AnnualQtyPlanned" "QtyPerBoat" "PartCreationReasonId" "ConnectedModel" "TargetPrice" "ProposalSupplier" "UnitMeas" "UnitMeas2"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type CPpvPurReqVirtual

ParentObjkey	
string <= 50 characters
ObjCreatedBy	
string <= 50 characters
AttachPurReq
required
boolean
Prototype
required
boolean
InspNeeded
required
boolean
PartNo	
string <= 4000 characters
Contract	
string <= 4000 characters
Description	
string <= 4000 characters
RequisitionerCode	
string <= 4000 characters
RequisitionNo	
string <= 4000 characters
BuyerCode	
string <= 4000 characters
AttachPrRequisitioner	
string <= 4000 characters
OrderedQty	
number
WantedReceiptDate	
string <date>
AnnualQtyPlanned
required
number <= 10
QtyPerBoat
required
number <= 10
PartCreationReasonId	
string <= 4000 characters
ConnectedModel	
string <= 1000 characters
TargetPrice
required
number <= 10
ProposalSupplier	
string <= 1000 characters
UnitMeas	
string <= 4000 characters
UnitMeas2	
string <= 4000 characters
Responses
201 response body for entity type CPpvPurReqVirtual
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/CPpvPurReqSet

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"ObjCreatedBy": "It is a Text",
"AttachPurReq": true,
"Prototype": true,
"InspNeeded": true,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"Description": "It is a Text",
"RequisitionerCode": "It is a Text",
"RequisitionNo": "It is a Text",
"BuyerCode": "It is a Text",
"AttachPrRequisitioner": "It is a Text",
"OrderedQty": 1,
"WantedReceiptDate": "2019-10-10",
"AnnualQtyPlanned": 1,
"QtyPerBoat": 1,
"PartCreationReasonId": "It is a Text",
"ConnectedModel": "It is a Text",
"TargetPrice": 1,
"ProposalSupplier": "It is a Text",
"UnitMeas": "It is a Text",
"UnitMeas2": "It is a Text"
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
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"AttachPurReq": true,
"Prototype": true,
"InspNeeded": true,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"Description": "It is a Text",
"RequisitionerCode": "It is a Text",
"RequisitionNo": "It is a Text",
"BuyerCode": "It is a Text",
"AttachPrRequisitioner": "It is a Text",
"OrderedQty": 1,
"WantedReceiptDate": "2019-10-10",
"AnnualQtyPlanned": 1,
"QtyPerBoat": 1,
"PartCreationReasonId": "It is a Text",
"ConnectedModel": "It is a Text",
"TargetPrice": 1,
"ProposalSupplier": "It is a Text",
"UnitMeas": "It is a Text",
"UnitMeas2": "It is a Text"
}
Get entity from CPpvPurReqSet by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "AttachPurReq" "Prototype" "InspNeeded" "PartNo" "Contract" "Description" "RequisitionerCode" "RequisitionNo" "BuyerCode" "AttachPrRequisitioner" "OrderedQty" "WantedReceiptDate" "AnnualQtyPlanned" "QtyPerBoat" "PartCreationReasonId" "ConnectedModel" "TargetPrice" "ProposalSupplier" "UnitMeas" "UnitMeas2"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "PurReqAssociateRef" "RequisitionerRef" "BuyerCodeRef" "ReasonPartCreationRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type CPpvPurReqVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CPpvPurReqSet(Objkey='{Objkey}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"AttachPurReq": true,
"Prototype": true,
"InspNeeded": true,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"Description": "It is a Text",
"RequisitionerCode": "It is a Text",
"RequisitionNo": "It is a Text",
"BuyerCode": "It is a Text",
"AttachPrRequisitioner": "It is a Text",
"OrderedQty": 1,
"WantedReceiptDate": "2019-10-10",
"AnnualQtyPlanned": 1,
"QtyPerBoat": 1,
"PartCreationReasonId": "It is a Text",
"ConnectedModel": "It is a Text",
"TargetPrice": 1,
"ProposalSupplier": "It is a Text",
"UnitMeas": "It is a Text",
"UnitMeas2": "It is a Text"
}
Delete entity from CPpvPurReqSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
/CPpvPurReqSet(Objkey='{Objkey}')

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
Update entity in CPpvPurReqSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "AttachPurReq" "Prototype" "InspNeeded" "PartNo" "Contract" "Description" "RequisitionerCode" "RequisitionNo" "BuyerCode" "AttachPrRequisitioner" "OrderedQty" "WantedReceiptDate" "AnnualQtyPlanned" "QtyPerBoat" "PartCreationReasonId" "ConnectedModel" "TargetPrice" "ProposalSupplier" "UnitMeas" "UnitMeas2"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type CPpvPurReqVirtual

AttachPurReq
required
boolean
Prototype
required
boolean
InspNeeded
required
boolean
PartNo	
string <= 4000 characters
Contract	
string <= 4000 characters
Description	
string <= 4000 characters
RequisitionerCode	
string <= 4000 characters
RequisitionNo	
string <= 4000 characters
BuyerCode	
string <= 4000 characters
AttachPrRequisitioner	
string <= 4000 characters
OrderedQty	
number
WantedReceiptDate	
string <date>
AnnualQtyPlanned
required
number <= 10
QtyPerBoat
required
number <= 10
PartCreationReasonId	
string <= 4000 characters
ConnectedModel	
string <= 1000 characters
TargetPrice
required
number <= 10
ProposalSupplier	
string <= 1000 characters
UnitMeas	
string <= 4000 characters
UnitMeas2	
string <= 4000 characters
Responses
200 response body for entity type CPpvPurReqVirtual
201 response body for entity type CPpvPurReqVirtual
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
/CPpvPurReqSet(Objkey='{Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"AttachPurReq": true,
"Prototype": true,
"InspNeeded": true,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"Description": "It is a Text",
"RequisitionerCode": "It is a Text",
"RequisitionNo": "It is a Text",
"BuyerCode": "It is a Text",
"AttachPrRequisitioner": "It is a Text",
"OrderedQty": 1,
"WantedReceiptDate": "2019-10-10",
"AnnualQtyPlanned": 1,
"QtyPerBoat": 1,
"PartCreationReasonId": "It is a Text",
"ConnectedModel": "It is a Text",
"TargetPrice": 1,
"ProposalSupplier": "It is a Text",
"UnitMeas": "It is a Text",
"UnitMeas2": "It is a Text"
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
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"AttachPurReq": true,
"Prototype": true,
"InspNeeded": true,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"Description": "It is a Text",
"RequisitionerCode": "It is a Text",
"RequisitionNo": "It is a Text",
"BuyerCode": "It is a Text",
"AttachPrRequisitioner": "It is a Text",
"OrderedQty": 1,
"WantedReceiptDate": "2019-10-10",
"AnnualQtyPlanned": 1,
"QtyPerBoat": 1,
"PartCreationReasonId": "It is a Text",
"ConnectedModel": "It is a Text",
"TargetPrice": 1,
"ProposalSupplier": "It is a Text",
"UnitMeas": "It is a Text",
"UnitMeas2": "It is a Text"
}
Invoke action CleanupVirtualEntity
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
header Parameters
If-Match
required
string
E-Tag

Request Body schema: application/json
request body for action CleanupVirtualEntityAction

object (CleanupVirtualEntityAction)
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

post
/CPpvPurReqSet(Objkey='{Objkey}')/IfsApp.InventoryPartHandling.CPpvPurReqVirtual_CleanupVirtualEntity

Request samples
Payload
Content type
application/json

Copy
{ }
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
Invoke action ProcessPurchaseReq
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
header Parameters
If-Match
required
string
E-Tag

Request Body schema: application/json
request body for action ProcessPurchaseReqAction

ReleasePr	
string
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

post
/CPpvPurReqSet(Objkey='{Objkey}')/IfsApp.InventoryPartHandling.CPpvPurReqVirtual_ProcessPurchaseReq

Request samples
Payload
Content type
application/json

Copy
{
"ReleasePr": "It is a Text"
}
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
Invoke function Default
Authorizations:
(OpenIdbasicAuth)
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "AttachPurReq" "Prototype" "InspNeeded" "PartNo" "Contract" "Description" "RequisitionerCode" "RequisitionNo" "BuyerCode" "AttachPrRequisitioner" "OrderedQty" "WantedReceiptDate" "AnnualQtyPlanned" "QtyPerBoat" "PartCreationReasonId" "ConnectedModel" "TargetPrice" "ProposalSupplier" "UnitMeas" "UnitMeas2"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type CPpvPurReqVirtual
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CPpvPurReqSet/IfsApp.InventoryPartHandling.CPpvPurReqVirtual_Default()

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"AttachPurReq": true,
"Prototype": true,
"InspNeeded": true,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"Description": "It is a Text",
"RequisitionerCode": "It is a Text",
"RequisitionNo": "It is a Text",
"BuyerCode": "It is a Text",
"AttachPrRequisitioner": "It is a Text",
"OrderedQty": 1,
"WantedReceiptDate": "2019-10-10",
"AnnualQtyPlanned": 1,
"QtyPerBoat": 1,
"PartCreationReasonId": "It is a Text",
"ConnectedModel": "It is a Text",
"TargetPrice": 1,
"ProposalSupplier": "It is a Text",
"UnitMeas": "It is a Text",
"UnitMeas2": "It is a Text"
}
Get entities from PurReqAssociateRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
Items Enum: "RequisitionNo" "RequisitionNo desc" "Contract" "Contract desc" "AttachPrRequisitioner" "AttachPrRequisitioner desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "RequisitionNo" "Contract" "AttachPrRequisitioner"
Specify properties to return, see OData Select

Responses
200 response body for entity array GetValidPurReq
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CPpvPurReqSet(Objkey='{Objkey}')/PurReqAssociateRef

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
Get entities from RequisitionerRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
Items Enum: "Objstate" "Objstate desc" "RequisitionerCode" "RequisitionerCode desc" "ReqDept" "ReqDept desc" "SystemDefined" "SystemDefined desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "RequisitionerCode" "ReqDept" "SystemDefined"
Specify properties to return, see OData Select

Responses
200 response body for entity array Requisitioner
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CPpvPurReqSet(Objkey='{Objkey}')/RequisitionerRef

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
Get entities from BuyerCodeRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
Items Enum: "BuyerCode" "BuyerCode desc" "Name" "Name desc" "Objstate" "Objstate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "BuyerCode" "Name" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity array CPurchaseBuyerLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CPpvPurReqSet(Objkey='{Objkey}')/BuyerCodeRef

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
Get entities from ReasonPartCreationRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
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
Items Enum: "CPartCreationReasonId" "CPartCreationReasonId desc" "CPartCreationReason" "CPartCreationReason desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CPartCreationReasonId" "CPartCreationReason"
Specify properties to return, see OData Select

Responses
200 response body for entity array CReasonPartCreation
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CPpvPurReqSet(Objkey='{Objkey}')/ReasonPartCreationRef

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
InventoryPartSet
Get entities from InventoryPartSet
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "AccountingGroup" "AccountingGroup desc" "AssetClass" "AssetClass desc" "CountryOfOrigin" "CountryOfOrigin desc" "HazardCode" "HazardCode desc" "NoteId" "NoteId desc" "PartProductCode" "PartProductCode desc" "PartProductFamily" "PartProductFamily desc" "PartStatus" "PartStatus desc" "PlannerBuyer" "PlannerBuyer desc" "PrimeCommodity" "PrimeCommodity desc" "SecondCommodity" "SecondCommodity desc" "UnitMeas" "UnitMeas desc" "CatchUnitMeas" "CatchUnitMeas desc" "Description" "Description desc" "DescriptionCopy" "DescriptionCopy desc" "AbcClass" "AbcClass desc" "AbcClassLockedUntil" "AbcClassLockedUntil desc" "CountVariance" "CountVariance desc" "CreateDate" "CreateDate desc" "CycleCode" "CycleCode desc" "CyclePeriod" "CyclePeriod desc" "DimQuality" "DimQuality desc" "DurabilityDay" "DurabilityDay desc" "ExpectedLeadtime" "ExpectedLeadtime desc" "LastActivityDate" "LastActivityDate desc" "LeadTimeCode" "LeadTimeCode desc" "ManufLeadtime" "ManufLeadtime desc" "NoteText" "NoteText desc" "OeAllocAssignFlag" "OeAllocAssignFlag desc" "OnhandAnalysisFlag" "OnhandAnalysisFlag desc" "PurchLeadtime" "PurchLeadtime desc" "EarliestUltdSupplyDate" "EarliestUltdSupplyDate desc" "Supersedes" "Supersedes desc" "SupplyCode" "SupplyCode desc" "TypeCode" "TypeCode desc" "CustomsStatNo" "CustomsStatNo desc" "TypeDesignation" "TypeDesignation desc" "ZeroCostFlag" "ZeroCostFlag desc" "AvailActivityStatus" "AvailActivityStatus desc" "EngAttribute" "EngAttribute desc" "ShortageFlag" "ShortageFlag desc" "ForecastConsumptionFlag" "ForecastConsumptionFlag desc" "StockManagement" "StockManagement desc" "IntrastatConvFactor" "IntrastatConvFactor desc" "PartCostGroupId" "PartCostGroupId desc" "DopConnection" "DopConnection desc" "StdNameId" "StdNameId desc" "InventoryValuationMethod" "InventoryValuationMethod desc" "NegativeOnHand" "NegativeOnHand desc" "TechnicalCoordinatorId" "TechnicalCoordinatorId desc" "InvoiceConsideration" "InvoiceConsideration desc" "MaxActualCostUpdate" "MaxActualCostUpdate desc" "CustWarrantyId" "CustWarrantyId desc" "SupWarrantyId" "SupWarrantyId desc" "RegionOfOrigin" "RegionOfOrigin desc" "InventoryPartCostLevel" "InventoryPartCostLevel desc" "ExtServiceCostMethod" "ExtServiceCostMethod desc" "SupplyChainPartGroup" "SupplyChainPartGroup desc" "AutomaticCapabilityCheck" "AutomaticCapabilityCheck desc" "InputUnitMeasGroupId" "InputUnitMeasGroupId desc" "DopNetting" "DopNetting desc" "CoReserveOnhAnalysFlag" "CoReserveOnhAnalysFlag desc" "QtyCalcRounding" "QtyCalcRounding desc" "LifecycleStage" "LifecycleStage desc" "LifeStageLockedUntil" "LifeStageLockedUntil desc" "FrequencyClass" "FrequencyClass desc" "FreqClassLockedUntil" "FreqClassLockedUntil desc" "MinDurabDaysCoDeliv" "MinDurabDaysCoDeliv desc" "MinDurabDaysPlanning" "MinDurabDaysPlanning desc" "StandardPutawayQty" "StandardPutawayQty desc" "PutawayZoneRefillOption" "PutawayZoneRefillOption desc" "ResetConfigStdCost" "ResetConfigStdCost desc" "MandatoryExpirationDate" "MandatoryExpirationDate desc" "ExclShipPackProposal" "ExclShipPackProposal desc" "Company" "Company desc" "StatisticalCode" "StatisticalCode desc" "AcquisitionOrigin" "AcquisitionOrigin desc" "AcquisitionReasonId" "AcquisitionReasonId desc" "HsnSacCode" "HsnSacCode desc" "ProductCategoryId" "ProductCategoryId desc" "PartDescriptionInUse" "PartDescriptionInUse desc" "UnitOfMeasureDescription" "UnitOfMeasureDescription desc" "CatchUnitMeasDescription" "CatchUnitMeasDescription desc" "InputUnitDescription" "InputUnitDescription desc" "PrimeCommodityGrpDescription" "PrimeCommodityGrpDescription desc" "SecondCommodityGrpDescription" "SecondCommodityGrpDescription desc" "SafetyInstructionDescription" "SafetyInstructionDescription desc" "AccountingGroupDescription" "AccountingGroupDescription desc" "ProductCodeDescription" "ProductCodeDescription desc" "ProductFamilyDescription" "ProductFamilyDescription desc" "NetWeight" "NetWeight desc" "WeightUom" "WeightUom desc" "NetVolume" "NetVolume desc" "VolumeUom" "VolumeUom desc" "OnHandQty" "OnHandQty desc" "OnHandCatchQty" "OnHandCatchQty desc" "UnlimitedPurchSupplyDate" "UnlimitedPurchSupplyDate desc" "UnlimitedManufSupplyDate" "UnlimitedManufSupplyDate desc" "UnlimitedExpectedSupplyDate" "UnlimitedExpectedSupplyDate desc" "SupersededByPart" "SupersededByPart desc" "DurabilityWeeks" "DurabilityWeeks desc" "SupplyTypeDb" "SupplyTypeDb desc" "EnabledLccParams" "EnabledLccParams desc" "MultiSitePlannedPart" "MultiSitePlannedPart desc" "CustWarranty" "CustWarranty desc" "SupWarranty" "SupWarranty desc" "PartCatalogPartDescription" "PartCatalogPartDescription desc" "PartCatalogBasePartDescription" "PartCatalogBasePartDescription desc" "GTIN" "GTIN desc" "GTINSeries" "GTINSeries desc" "OperativeValue" "OperativeValue desc" "OperativeValueSource" "OperativeValueSource desc" "CountryCode" "CountryCode desc" "DocumentTextExist" "DocumentTextExist desc" "NoteTextExist" "NoteTextExist desc" "UsePartcaDescInventDb" "UsePartcaDescInventDb desc" "DefaultQtyCalcRound" "DefaultQtyCalcRound desc" "PartCatalogStandardName" "PartCatalogStandardName desc" "AnyForecastPartExists" "AnyForecastPartExists desc" "AllForecastPartsExist" "AllForecastPartsExist desc" "HsnSacCodeDescription" "HsnSacCodeDescription desc" "ProductCategoryDesc" "ProductCategoryDesc desc" "SupersedesStartDate" "SupersedesStartDate desc" "SupersedesEndDate" "SupersedesEndDate desc" "CPpvStatus" "CPpvStatus desc" "CMrpToDop" "CMrpToDop desc" "CNextLineItemNo" "CNextLineItemNo desc" "CNextOperationNo" "CNextOperationNo desc" "CSfShipmentBoat" "CSfShipmentBoat desc" "CSfAssemblyBoat" "CSfAssemblyBoat desc" "StructureUpdate" "StructureUpdate desc" "RoutingUpdate" "RoutingUpdate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AccountingGroup" "AssetClass" "CountryOfOrigin" "HazardCode" "NoteId" "PartProductCode" "PartProductFamily" "PartStatus" "PlannerBuyer" "PrimeCommodity" "SecondCommodity" "UnitMeas" "CatchUnitMeas" "Description" "DescriptionCopy" "AbcClass" "AbcClassLockedUntil" "CountVariance" "CreateDate" "CycleCode" "CyclePeriod" "DimQuality" "DurabilityDay" "ExpectedLeadtime" "LastActivityDate" "LeadTimeCode" "ManufLeadtime" "NoteText" "OeAllocAssignFlag" "OnhandAnalysisFlag" "PurchLeadtime" "EarliestUltdSupplyDate" "Supersedes" "SupplyCode" "TypeCode" "CustomsStatNo" "TypeDesignation" "ZeroCostFlag" "AvailActivityStatus" "EngAttribute" "ShortageFlag" "ForecastConsumptionFlag" "StockManagement" "IntrastatConvFactor" "PartCostGroupId" "DopConnection" "StdNameId" "InventoryValuationMethod" "NegativeOnHand" "TechnicalCoordinatorId" "InvoiceConsideration" "MaxActualCostUpdate" "CustWarrantyId" "SupWarrantyId" "RegionOfOrigin" "InventoryPartCostLevel" "ExtServiceCostMethod" "SupplyChainPartGroup" "AutomaticCapabilityCheck" "InputUnitMeasGroupId" "DopNetting" "CoReserveOnhAnalysFlag" "QtyCalcRounding" "LifecycleStage" "LifeStageLockedUntil" "FrequencyClass" "FreqClassLockedUntil" "MinDurabDaysCoDeliv" "MinDurabDaysPlanning" "StandardPutawayQty" "PutawayZoneRefillOption" "ResetConfigStdCost" "MandatoryExpirationDate" "ExclShipPackProposal" "Company" "StatisticalCode" "AcquisitionOrigin" "AcquisitionReasonId" "HsnSacCode" "ProductCategoryId" "PartDescriptionInUse" "UnitOfMeasureDescription" "CatchUnitMeasDescription" "InputUnitDescription" "PrimeCommodityGrpDescription" "SecondCommodityGrpDescription" "SafetyInstructionDescription" "AccountingGroupDescription" "ProductCodeDescription" "ProductFamilyDescription" "NetWeight" "WeightUom" "NetVolume" "VolumeUom" "OnHandQty" "OnHandCatchQty" "UnlimitedPurchSupplyDate" "UnlimitedManufSupplyDate" "UnlimitedExpectedSupplyDate" "SupersededByPart" "DurabilityWeeks" "SupplyTypeDb" "EnabledLccParams" "MultiSitePlannedPart" "CustWarranty" "SupWarranty" "PartCatalogPartDescription" "PartCatalogBasePartDescription" "GTIN" "GTINSeries" "OperativeValue" "OperativeValueSource" "CountryCode" "DocumentTextExist" "NoteTextExist" "UsePartcaDescInventDb" "DefaultQtyCalcRound" "PartCatalogStandardName" "AnyForecastPartExists" "AllForecastPartsExist" "HsnSacCodeDescription" "ProductCategoryDesc" "SupersedesStartDate" "SupersedesEndDate" "CPpvStatus" "CMrpToDop" "CNextLineItemNo" "CNextOperationNo" "CSfShipmentBoat" "CSfAssemblyBoat" "StructureUpdate" "RoutingUpdate"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "AbcClassRef" "PartCostGroupRef" "SiteInventInfoRef" "PartCatalogRef" "ContractRef" "PlannerBuyerRef" "InventoryUomRef" "CatchUnitMeasRef" "InputUnitMeasGroupIdRef" "PrimeCommodityRef" "SecondCommodityRef" "AssetClassRef" "PartStatusRef" "HazardCodeRef" "AccountingGroupRef" "PartProductCodeRef" "PartProductFamilyRef" "SupersedesRef" "SupersededByPartRef" "CountryOfOriginRef" "RegionOfOriginRef" "CustomsStatNoRef" "SupplyChainPartGroupRef" "TechnicalCoordinatorIdRef" "CustWarrantyIdRef" "StdNameIdRef" "EngAttributeRef" "StatisticalCodeRef" "AcquisitionReasonIdRef" "AcquisitionOriginRef" "HsnSacCodeRef" "ProductCategoryIdRef" "CPpvStatusRef" "CSfShipmentBoatRef" "CSfAssemblyBoatRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array InventoryPart
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet

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
Add new entity to InventoryPartSet
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AccountingGroup" "AssetClass" "CountryOfOrigin" "HazardCode" "NoteId" "PartProductCode" "PartProductFamily" "PartStatus" "PlannerBuyer" "PrimeCommodity" "SecondCommodity" "UnitMeas" "CatchUnitMeas" "Description" "DescriptionCopy" "AbcClass" "AbcClassLockedUntil" "CountVariance" "CreateDate" "CycleCode" "CyclePeriod" "DimQuality" "DurabilityDay" "ExpectedLeadtime" "LastActivityDate" "LeadTimeCode" "ManufLeadtime" "NoteText" "OeAllocAssignFlag" "OnhandAnalysisFlag" "PurchLeadtime" "EarliestUltdSupplyDate" "Supersedes" "SupplyCode" "TypeCode" "CustomsStatNo" "TypeDesignation" "ZeroCostFlag" "AvailActivityStatus" "EngAttribute" "ShortageFlag" "ForecastConsumptionFlag" "StockManagement" "IntrastatConvFactor" "PartCostGroupId" "DopConnection" "StdNameId" "InventoryValuationMethod" "NegativeOnHand" "TechnicalCoordinatorId" "InvoiceConsideration" "MaxActualCostUpdate" "CustWarrantyId" "SupWarrantyId" "RegionOfOrigin" "InventoryPartCostLevel" "ExtServiceCostMethod" "SupplyChainPartGroup" "AutomaticCapabilityCheck" "InputUnitMeasGroupId" "DopNetting" "CoReserveOnhAnalysFlag" "QtyCalcRounding" "LifecycleStage" "LifeStageLockedUntil" "FrequencyClass" "FreqClassLockedUntil" "MinDurabDaysCoDeliv" "MinDurabDaysPlanning" "StandardPutawayQty" "PutawayZoneRefillOption" "ResetConfigStdCost" "MandatoryExpirationDate" "ExclShipPackProposal" "Company" "StatisticalCode" "AcquisitionOrigin" "AcquisitionReasonId" "HsnSacCode" "ProductCategoryId" "PartDescriptionInUse" "UnitOfMeasureDescription" "CatchUnitMeasDescription" "InputUnitDescription" "PrimeCommodityGrpDescription" "SecondCommodityGrpDescription" "SafetyInstructionDescription" "AccountingGroupDescription" "ProductCodeDescription" "ProductFamilyDescription" "NetWeight" "WeightUom" "NetVolume" "VolumeUom" "OnHandQty" "OnHandCatchQty" "UnlimitedPurchSupplyDate" "UnlimitedManufSupplyDate" "UnlimitedExpectedSupplyDate" "SupersededByPart" "DurabilityWeeks" "SupplyTypeDb" "EnabledLccParams" "MultiSitePlannedPart" "CustWarranty" "SupWarranty" "PartCatalogPartDescription" "PartCatalogBasePartDescription" "GTIN" "GTINSeries" "OperativeValue" "OperativeValueSource" "CountryCode" "DocumentTextExist" "NoteTextExist" "UsePartcaDescInventDb" "DefaultQtyCalcRound" "PartCatalogStandardName" "AnyForecastPartExists" "AllForecastPartsExist" "HsnSacCodeDescription" "ProductCategoryDesc" "SupersedesStartDate" "SupersedesEndDate" "CPpvStatus" "CMrpToDop" "CNextLineItemNo" "CNextOperationNo" "CSfShipmentBoat" "CSfAssemblyBoat" "StructureUpdate" "RoutingUpdate"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type InventoryPart

Contract
required
string <= 5 characters
PartNo	
string <= 25 characters
AccountingGroup	
string <= 5 characters
AssetClass
required
string <= 2 characters
CountryOfOrigin	
string <= 3 characters
HazardCode	
string <= 6 characters
PartProductCode	
string <= 5 characters
PartProductFamily	
string <= 5 characters
PartStatus
required
string <= 1 characters
PlannerBuyer
required
string <= 20 characters
PrimeCommodity	
string <= 5 characters
SecondCommodity	
string <= 5 characters
UnitMeas
required
string <= 10 characters
CatchUnitMeas	
string <= 30 characters
Description	
string <= 200 characters
AbcClass	
string <= 1 characters
AbcClassLockedUntil	
string <date>
CycleCode
required
string (InventoryPartCountType_Enumeration)
Enum: "CyclicCounting" "NotCyclicCounting"
CyclePeriod
required
number <= 3
DimQuality	
string <= 25 characters
DurabilityDay	
number <= 4
ExpectedLeadtime
required
number
LeadTimeCode
required
string (InvPartLeadTimeCode_Enumeration)
Enum: "Manufactured" "Purchased"
ManufLeadtime
required
number
NoteText	
string <= 2000 characters
OeAllocAssignFlag
required
string (CustOrdReservationType_Enumeration)
Enum: "PriorityReservation" "NormalReservation"
OnhandAnalysisFlag
required
string (InventoryPartOnhAnalys_Enumeration)
Enum: "MakeAvailabilityCheck" "NoAvailabilityCheck"
PurchLeadtime
required
number <= 32767
Supersedes	
string <= 25 characters
SupplyCode
required
string (MaterialRequisSupplySubset1_Enumeration)
Enum: "InventoryOrder" "PurchaseOrder"
TypeCode
required
string (InventoryPartType_Enumeration)
Enum: "Manufactured" "ManufacturedRecipe" "Remanufactured" "PurchasedRaw" "Purchased" "Expense" "DisassemblyComponent" "ByProduct"
CustomsStatNo	
string <= 15 characters
TypeDesignation	
string <= 25 characters
ZeroCostFlag
required
string (InventoryPartZeroCost_Enumeration)
Enum: "ZeroCostAllowed" "ZeroCostForbidden" "ZeroCostOnly"
AvailActivityStatus
required
string (InventoryPartAvailStat_Enumeration)
Enum: "Changed" "Unchanged"
EngAttribute	
string <= 5 characters
ShortageFlag
required
string (InventoryPartShortage_Enumeration)
Enum: "ShortageNotation" "NoShortageNotation"
ForecastConsumptionFlag
required
string (InvPartForecastConsum_Enumeration)
Enum: "OnlineConsumption" "NoOnlineConsumption"
StockManagement
required
string (InventoryPartManagement_Enumeration)
Enum: "VendorManagedInventory" "SystemManagedInventory"
IntrastatConvFactor	
number
PartCostGroupId	
string <= 5 characters
DopConnection
required
string (DopConnection_Enumeration)
Enum: "AutomaticDOP" "ManualDOP" "ReleaseDOP"
StdNameId	
number <= 10
InventoryValuationMethod	
string (InventoryValueMethod_Enumeration)
Enum: "WeightedAverage" "StandardCost" "FirstInFirstOut" "LastInFirstOut"
NegativeOnHand
required
string (NegativeOnHand_Enumeration)
Enum: "NegativeOnHandAllowed" "NegativOnHandNotAllowed"
TechnicalCoordinatorId	
string <= 20 characters
InvoiceConsideration	
string (InvoiceConsideration_Enumeration)
Enum: "IgnoreInvoicePrice" "PeriodicWeightedAverage" "TransactionBased"
MaxActualCostUpdate	
number
CustWarrantyId	
number
SupWarrantyId	
number
RegionOfOrigin	
string <= 10 characters
InventoryPartCostLevel	
string (InventoryPartCostLevel_Enumeration)
Enum: "CostPerPart" "CostPerConfiguration" "CostPerCondition" "CostPerLotBatch" "CostPerSerial"
ExtServiceCostMethod
required
string (ExtServiceCostMethod_Enumeration)
Enum: "IncludeServiceCost" "ExcludeServiceCost"
SupplyChainPartGroup	
string <= 20 characters
AutomaticCapabilityCheck
required
string (CapabilityCheckAllocate_Enumeration)
Enum: "ReserveAndAllocate" "AllocateOnly" "NeitherReserveNorAlloc" "NoAutomatCapabilityCheck"
InputUnitMeasGroupId	
string <= 30 characters
DopNetting
required
string (DopNetting_Enumeration)
Enum: "Netting" "NoNetting" "AutoNetting"
CoReserveOnhAnalysFlag
required
string (InventoryPartOnhAnalys_Enumeration)
Enum: "MakeAvailabilityCheck" "NoAvailabilityCheck"
QtyCalcRounding
required
number <= 2
LifecycleStage
required
string (InvPartLifecycleStage_Enumeration)
Enum: "Development" "Introduction" "Mature" "Decline" "Expired"
LifeStageLockedUntil	
string <date>
FrequencyClass
required
string (InvPartFrequencyClass_Enumeration)
Enum: "VerySlowMover" "SlowMover" "MediumMover" "FastMover"
FreqClassLockedUntil	
string <date>
MinDurabDaysCoDeliv
required
number <= 4
MinDurabDaysPlanning
required
number <= 4
StandardPutawayQty	
number
PutawayZoneRefillOption	
string (PutawayZoneRefillOption_Enumeration)
Enum: "NoRefill" "FromPutawayZones" "FromAllLocations"
MandatoryExpirationDate
required
boolean
ExclShipPackProposal
required
boolean
StatisticalCode	
string <= 15 characters
AcquisitionOrigin	
number
AcquisitionReasonId	
string <= 20 characters
HsnSacCode	
string <= 20 characters
ProductCategoryId	
string <= 50 characters
HsnSacCodeDescription	
string <= 100 characters
ProductCategoryDesc	
string <= 4000 characters
SupersedesStartDate	
string <date>
SupersedesEndDate	
string <date>
CPpvStatus	
string <= 4000 characters
CMrpToDop
required
boolean
CNextLineItemNo	
number
CNextOperationNo	
number
CSfShipmentBoat	
string <= 4000 characters
CSfAssemblyBoat	
string <= 4000 characters
StructureUpdate
required
boolean
RoutingUpdate
required
boolean
Responses
201 response body for entity type InventoryPart
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/InventoryPartSet

Request samples
Payload
Content type
application/json

Copy
{
"Contract": "It is a Text",
"PartNo": "It is a Text",
"AccountingGroup": "It is a Text",
"AssetClass": "It is a Text",
"CountryOfOrigin": "It is a Text",
"HazardCode": "It is a Text",
"PartProductCode": "It is a Text",
"PartProductFamily": "It is a Text",
"PartStatus": "It is a Text",
"PlannerBuyer": "It is a Text",
"PrimeCommodity": "It is a Text",
"SecondCommodity": "It is a Text",
"UnitMeas": "It is a Text",
"CatchUnitMeas": "It is a Text",
"Description": "It is a Text",
"AbcClass": "It is a Text",
"AbcClassLockedUntil": "2019-10-10",
"CycleCode": "CyclicCounting",
"CyclePeriod": 1,
"DimQuality": "It is a Text",
"DurabilityDay": 1,
"ExpectedLeadtime": 1,
"LeadTimeCode": "Manufactured",
"ManufLeadtime": 1,
"NoteText": "It is a Text",
"OeAllocAssignFlag": "PriorityReservation",
"OnhandAnalysisFlag": "MakeAvailabilityCheck",
"PurchLeadtime": 1,
"Supersedes": "It is a Text",
"SupplyCode": "InventoryOrder",
"TypeCode": "Manufactured",
"CustomsStatNo": "It is a Text",
"TypeDesignation": "It is a Text",
"ZeroCostFlag": "ZeroCostAllowed",
"AvailActivityStatus": "Changed",
"EngAttribute": "It is a Text",
"ShortageFlag": "ShortageNotation",
"ForecastConsumptionFlag": "OnlineConsumption",
"StockManagement": "VendorManagedInventory",
"IntrastatConvFactor": 1,
"PartCostGroupId": "It is a Text",
"DopConnection": "AutomaticDOP",
"StdNameId": 1,
"InventoryValuationMethod": "WeightedAverage",
"NegativeOnHand": "NegativeOnHandAllowed",
"TechnicalCoordinatorId": "It is a Text",
"InvoiceConsideration": "IgnoreInvoicePrice",
"MaxActualCostUpdate": 1,
"CustWarrantyId": 1,
"SupWarrantyId": 1,
"RegionOfOrigin": "It is a Text",
"InventoryPartCostLevel": "CostPerPart",
"ExtServiceCostMethod": "IncludeServiceCost",
"SupplyChainPartGroup": "It is a Text",
"AutomaticCapabilityCheck": "ReserveAndAllocate",
"InputUnitMeasGroupId": "It is a Text",
"DopNetting": "Netting",
"CoReserveOnhAnalysFlag": "MakeAvailabilityCheck",
"QtyCalcRounding": 1,
"LifecycleStage": "Development",
"LifeStageLockedUntil": "2019-10-10",
"FrequencyClass": "VerySlowMover",
"FreqClassLockedUntil": "2019-10-10",
"MinDurabDaysCoDeliv": 1,
"MinDurabDaysPlanning": 1,
"StandardPutawayQty": 1,
"PutawayZoneRefillOption": "NoRefill",
"MandatoryExpirationDate": true,
"ExclShipPackProposal": true,
"StatisticalCode": "It is a Text",
"AcquisitionOrigin": 1,
"AcquisitionReasonId": "It is a Text",
"HsnSacCode": "It is a Text",
"ProductCategoryId": "It is a Text",
"HsnSacCodeDescription": "It is a Text",
"ProductCategoryDesc": "It is a Text",
"SupersedesStartDate": "2019-10-10",
"SupersedesEndDate": "2019-10-10",
"CPpvStatus": "It is a Text",
"CMrpToDop": true,
"CNextLineItemNo": 1,
"CNextOperationNo": 1,
"CSfShipmentBoat": "It is a Text",
"CSfAssemblyBoat": "It is a Text",
"StructureUpdate": true,
"RoutingUpdate": true
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
"AccountingGroup": "It is a Text",
"AssetClass": "It is a Text",
"CountryOfOrigin": "It is a Text",
"HazardCode": "It is a Text",
"NoteId": 1,
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
"MaxActualCostUpdate": 1,
"CustWarrantyId": 1,
"SupWarrantyId": 1,
"RegionOfOrigin": "It is a Text",
"SupplyChainPartGroup": "It is a Text",
"InputUnitMeasGroupId": "It is a Text",
"QtyCalcRounding": 1,
"LifeStageLockedUntil": "2019-10-10",
"FreqClassLockedUntil": "2019-10-10",
"MinDurabDaysCoDeliv": 1,
"MinDurabDaysPlanning": 1,
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
"PartDescriptionInUse": "It is a Text",
"UnitOfMeasureDescription": "It is a Text",
"CatchUnitMeasDescription": "It is a Text",
"InputUnitDescription": "It is a Text",
"PrimeCommodityGrpDescription": "It is a Text",
"SecondCommodityGrpDescription": "It is a Text",
"SafetyInstructionDescription": "It is a Text",
"AccountingGroupDescription": "It is a Text",
"ProductCodeDescription": "It is a Text",
"ProductFamilyDescription": "It is a Text",
"NetWeight": 1,
"WeightUom": "It is a Text",
"NetVolume": 1,
"VolumeUom": "It is a Text",
"OnHandQty": 1,
"OnHandCatchQty": 1,
"UnlimitedPurchSupplyDate": "2019-10-10",
"UnlimitedManufSupplyDate": "2019-10-10",
"UnlimitedExpectedSupplyDate": "2019-10-10",
"SupersededByPart": "It is a Text",
"DurabilityWeeks": 1,
"SupplyTypeDb": "It is a Text",
"EnabledLccParams": "It is a Text",
"MultiSitePlannedPart": true,
"CustWarranty": true,
"SupWarranty": true,
"PartCatalogPartDescription": "It is a Text",
"PartCatalogBasePartDescription": "It is a Text",
"GTIN": "It is a Text",
"GTINSeries": "It is a Text",
"OperativeValue": "It is a Text",
"OperativeValueSource": "It is a Text",
"CountryCode": "It is a Text",
"DocumentTextExist": true,
"NoteTextExist": true,
"UsePartcaDescInventDb": true,
"DefaultQtyCalcRound": 1,
"PartCatalogStandardName": "It is a Text",
"AnyForecastPartExists": true,
"AllForecastPartsExist": true,
"HsnSacCodeDescription": "It is a Text",
"ProductCategoryDesc": "It is a Text",
"SupersedesStartDate": "2019-10-10",
"SupersedesEndDate": "2019-10-10",
"CPpvStatus": "It is a Text",
"CMrpToDop": true,
"CNextLineItemNo": 1,
"CNextOperationNo": 1,
"CSfShipmentBoat": "It is a Text",
"CSfAssemblyBoat": "It is a Text",
"StructureUpdate": true,
"RoutingUpdate": true,
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
"PutawayZoneRefillOption": "NoRefill"
}
Get entity from InventoryPartSet by key
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
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AccountingGroup" "AssetClass" "CountryOfOrigin" "HazardCode" "NoteId" "PartProductCode" "PartProductFamily" "PartStatus" "PlannerBuyer" "PrimeCommodity" "SecondCommodity" "UnitMeas" "CatchUnitMeas" "Description" "DescriptionCopy" "AbcClass" "AbcClassLockedUntil" "CountVariance" "CreateDate" "CycleCode" "CyclePeriod" "DimQuality" "DurabilityDay" "ExpectedLeadtime" "LastActivityDate" "LeadTimeCode" "ManufLeadtime" "NoteText" "OeAllocAssignFlag" "OnhandAnalysisFlag" "PurchLeadtime" "EarliestUltdSupplyDate" "Supersedes" "SupplyCode" "TypeCode" "CustomsStatNo" "TypeDesignation" "ZeroCostFlag" "AvailActivityStatus" "EngAttribute" "ShortageFlag" "ForecastConsumptionFlag" "StockManagement" "IntrastatConvFactor" "PartCostGroupId" "DopConnection" "StdNameId" "InventoryValuationMethod" "NegativeOnHand" "TechnicalCoordinatorId" "InvoiceConsideration" "MaxActualCostUpdate" "CustWarrantyId" "SupWarrantyId" "RegionOfOrigin" "InventoryPartCostLevel" "ExtServiceCostMethod" "SupplyChainPartGroup" "AutomaticCapabilityCheck" "InputUnitMeasGroupId" "DopNetting" "CoReserveOnhAnalysFlag" "QtyCalcRounding" "LifecycleStage" "LifeStageLockedUntil" "FrequencyClass" "FreqClassLockedUntil" "MinDurabDaysCoDeliv" "MinDurabDaysPlanning" "StandardPutawayQty" "PutawayZoneRefillOption" "ResetConfigStdCost" "MandatoryExpirationDate" "ExclShipPackProposal" "Company" "StatisticalCode" "AcquisitionOrigin" "AcquisitionReasonId" "HsnSacCode" "ProductCategoryId" "PartDescriptionInUse" "UnitOfMeasureDescription" "CatchUnitMeasDescription" "InputUnitDescription" "PrimeCommodityGrpDescription" "SecondCommodityGrpDescription" "SafetyInstructionDescription" "AccountingGroupDescription" "ProductCodeDescription" "ProductFamilyDescription" "NetWeight" "WeightUom" "NetVolume" "VolumeUom" "OnHandQty" "OnHandCatchQty" "UnlimitedPurchSupplyDate" "UnlimitedManufSupplyDate" "UnlimitedExpectedSupplyDate" "SupersededByPart" "DurabilityWeeks" "SupplyTypeDb" "EnabledLccParams" "MultiSitePlannedPart" "CustWarranty" "SupWarranty" "PartCatalogPartDescription" "PartCatalogBasePartDescription" "GTIN" "GTINSeries" "OperativeValue" "OperativeValueSource" "CountryCode" "DocumentTextExist" "NoteTextExist" "UsePartcaDescInventDb" "DefaultQtyCalcRound" "PartCatalogStandardName" "AnyForecastPartExists" "AllForecastPartsExist" "HsnSacCodeDescription" "ProductCategoryDesc" "SupersedesStartDate" "SupersedesEndDate" "CPpvStatus" "CMrpToDop" "CNextLineItemNo" "CNextOperationNo" "CSfShipmentBoat" "CSfAssemblyBoat" "StructureUpdate" "RoutingUpdate"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "AbcClassRef" "PartCostGroupRef" "SiteInventInfoRef" "PartCatalogRef" "ContractRef" "PlannerBuyerRef" "InventoryUomRef" "CatchUnitMeasRef" "InputUnitMeasGroupIdRef" "PrimeCommodityRef" "SecondCommodityRef" "AssetClassRef" "PartStatusRef" "HazardCodeRef" "AccountingGroupRef" "PartProductCodeRef" "PartProductFamilyRef" "SupersedesRef" "SupersededByPartRef" "CountryOfOriginRef" "RegionOfOriginRef" "CustomsStatNoRef" "SupplyChainPartGroupRef" "TechnicalCoordinatorIdRef" "CustWarrantyIdRef" "StdNameIdRef" "EngAttributeRef" "StatisticalCodeRef" "AcquisitionReasonIdRef" "AcquisitionOriginRef" "HsnSacCodeRef" "ProductCategoryIdRef" "CPpvStatusRef" "CSfShipmentBoatRef" "CSfAssemblyBoatRef"
Expand related entities, see OData Expand

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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')

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
"MaxActualCostUpdate": 1,
"CustWarrantyId": 1,
"SupWarrantyId": 1,
"RegionOfOrigin": "It is a Text",
"SupplyChainPartGroup": "It is a Text",
"InputUnitMeasGroupId": "It is a Text",
"QtyCalcRounding": 1,
"LifeStageLockedUntil": "2019-10-10",
"FreqClassLockedUntil": "2019-10-10",
"MinDurabDaysCoDeliv": 1,
"MinDurabDaysPlanning": 1,
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
"PartDescriptionInUse": "It is a Text",
"UnitOfMeasureDescription": "It is a Text",
"CatchUnitMeasDescription": "It is a Text",
"InputUnitDescription": "It is a Text",
"PrimeCommodityGrpDescription": "It is a Text",
"SecondCommodityGrpDescription": "It is a Text",
"SafetyInstructionDescription": "It is a Text",
"AccountingGroupDescription": "It is a Text",
"ProductCodeDescription": "It is a Text",
"ProductFamilyDescription": "It is a Text",
"NetWeight": 1,
"WeightUom": "It is a Text",
"NetVolume": 1,
"VolumeUom": "It is a Text",
"OnHandQty": 1,
"OnHandCatchQty": 1,
"UnlimitedPurchSupplyDate": "2019-10-10",
"UnlimitedManufSupplyDate": "2019-10-10",
"UnlimitedExpectedSupplyDate": "2019-10-10",
"SupersededByPart": "It is a Text",
"DurabilityWeeks": 1,
"SupplyTypeDb": "It is a Text",
"EnabledLccParams": "It is a Text",
"MultiSitePlannedPart": true,
"CustWarranty": true,
"SupWarranty": true,
"PartCatalogPartDescription": "It is a Text",
"PartCatalogBasePartDescription": "It is a Text",
"GTIN": "It is a Text",
"GTINSeries": "It is a Text",
"OperativeValue": "It is a Text",
"OperativeValueSource": "It is a Text",
"CountryCode": "It is a Text",
"DocumentTextExist": true,
"NoteTextExist": true,
"UsePartcaDescInventDb": true,
"DefaultQtyCalcRound": 1,
"PartCatalogStandardName": "It is a Text",
"AnyForecastPartExists": true,
"AllForecastPartsExist": true,
"HsnSacCodeDescription": "It is a Text",
"ProductCategoryDesc": "It is a Text",
"SupersedesStartDate": "2019-10-10",
"SupersedesEndDate": "2019-10-10",
"CPpvStatus": "It is a Text",
"CMrpToDop": true,
"CNextLineItemNo": 1,
"CNextOperationNo": 1,
"CSfShipmentBoat": "It is a Text",
"CSfAssemblyBoat": "It is a Text",
"StructureUpdate": true,
"RoutingUpdate": true,
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
"PutawayZoneRefillOption": "NoRefill"
}
Delete entity from InventoryPartSet
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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')

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
Update entity in InventoryPartSet
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
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AccountingGroup" "AssetClass" "CountryOfOrigin" "HazardCode" "NoteId" "PartProductCode" "PartProductFamily" "PartStatus" "PlannerBuyer" "PrimeCommodity" "SecondCommodity" "UnitMeas" "CatchUnitMeas" "Description" "DescriptionCopy" "AbcClass" "AbcClassLockedUntil" "CountVariance" "CreateDate" "CycleCode" "CyclePeriod" "DimQuality" "DurabilityDay" "ExpectedLeadtime" "LastActivityDate" "LeadTimeCode" "ManufLeadtime" "NoteText" "OeAllocAssignFlag" "OnhandAnalysisFlag" "PurchLeadtime" "EarliestUltdSupplyDate" "Supersedes" "SupplyCode" "TypeCode" "CustomsStatNo" "TypeDesignation" "ZeroCostFlag" "AvailActivityStatus" "EngAttribute" "ShortageFlag" "ForecastConsumptionFlag" "StockManagement" "IntrastatConvFactor" "PartCostGroupId" "DopConnection" "StdNameId" "InventoryValuationMethod" "NegativeOnHand" "TechnicalCoordinatorId" "InvoiceConsideration" "MaxActualCostUpdate" "CustWarrantyId" "SupWarrantyId" "RegionOfOrigin" "InventoryPartCostLevel" "ExtServiceCostMethod" "SupplyChainPartGroup" "AutomaticCapabilityCheck" "InputUnitMeasGroupId" "DopNetting" "CoReserveOnhAnalysFlag" "QtyCalcRounding" "LifecycleStage" "LifeStageLockedUntil" "FrequencyClass" "FreqClassLockedUntil" "MinDurabDaysCoDeliv" "MinDurabDaysPlanning" "StandardPutawayQty" "PutawayZoneRefillOption" "ResetConfigStdCost" "MandatoryExpirationDate" "ExclShipPackProposal" "Company" "StatisticalCode" "AcquisitionOrigin" "AcquisitionReasonId" "HsnSacCode" "ProductCategoryId" "PartDescriptionInUse" "UnitOfMeasureDescription" "CatchUnitMeasDescription" "InputUnitDescription" "PrimeCommodityGrpDescription" "SecondCommodityGrpDescription" "SafetyInstructionDescription" "AccountingGroupDescription" "ProductCodeDescription" "ProductFamilyDescription" "NetWeight" "WeightUom" "NetVolume" "VolumeUom" "OnHandQty" "OnHandCatchQty" "UnlimitedPurchSupplyDate" "UnlimitedManufSupplyDate" "UnlimitedExpectedSupplyDate" "SupersededByPart" "DurabilityWeeks" "SupplyTypeDb" "EnabledLccParams" "MultiSitePlannedPart" "CustWarranty" "SupWarranty" "PartCatalogPartDescription" "PartCatalogBasePartDescription" "GTIN" "GTINSeries" "OperativeValue" "OperativeValueSource" "CountryCode" "DocumentTextExist" "NoteTextExist" "UsePartcaDescInventDb" "DefaultQtyCalcRound" "PartCatalogStandardName" "AnyForecastPartExists" "AllForecastPartsExist" "HsnSacCodeDescription" "ProductCategoryDesc" "SupersedesStartDate" "SupersedesEndDate" "CPpvStatus" "CMrpToDop" "CNextLineItemNo" "CNextOperationNo" "CSfShipmentBoat" "CSfAssemblyBoat" "StructureUpdate" "RoutingUpdate"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type InventoryPart

AccountingGroup	
string <= 5 characters
AssetClass
required
string <= 2 characters
CountryOfOrigin	
string <= 3 characters
HazardCode	
string <= 6 characters
PartProductCode	
string <= 5 characters
PartProductFamily	
string <= 5 characters
PartStatus
required
string <= 1 characters
PlannerBuyer
required
string <= 20 characters
PrimeCommodity	
string <= 5 characters
SecondCommodity	
string <= 5 characters
CatchUnitMeas	
string <= 30 characters
Description	
string <= 200 characters
DescriptionCopy	
string <= 200 characters
AbcClass	
string <= 1 characters
AbcClassLockedUntil	
string <date>
CycleCode
required
string (InventoryPartCountType_Enumeration)
Enum: "CyclicCounting" "NotCyclicCounting"
CyclePeriod
required
number <= 3
DimQuality	
string <= 25 characters
DurabilityDay	
number <= 4
ExpectedLeadtime
required
number
LeadTimeCode
required
string (InvPartLeadTimeCode_Enumeration)
Enum: "Manufactured" "Purchased"
ManufLeadtime
required
number
NoteText	
string <= 2000 characters
OeAllocAssignFlag
required
string (CustOrdReservationType_Enumeration)
Enum: "PriorityReservation" "NormalReservation"
OnhandAnalysisFlag
required
string (InventoryPartOnhAnalys_Enumeration)
Enum: "MakeAvailabilityCheck" "NoAvailabilityCheck"
PurchLeadtime
required
number <= 32767
EarliestUltdSupplyDate	
string <date>
Supersedes	
string <= 25 characters
SupplyCode
required
string (MaterialRequisSupplySubset1_Enumeration)
Enum: "InventoryOrder" "PurchaseOrder"
TypeCode
required
string (InventoryPartType_Enumeration)
Enum: "Manufactured" "ManufacturedRecipe" "Remanufactured" "PurchasedRaw" "Purchased" "Expense" "DisassemblyComponent" "ByProduct"
CustomsStatNo	
string <= 15 characters
TypeDesignation	
string <= 25 characters
ZeroCostFlag
required
string (InventoryPartZeroCost_Enumeration)
Enum: "ZeroCostAllowed" "ZeroCostForbidden" "ZeroCostOnly"
AvailActivityStatus
required
string (InventoryPartAvailStat_Enumeration)
Enum: "Changed" "Unchanged"
EngAttribute	
string <= 5 characters
ShortageFlag
required
string (InventoryPartShortage_Enumeration)
Enum: "ShortageNotation" "NoShortageNotation"
ForecastConsumptionFlag
required
string (InvPartForecastConsum_Enumeration)
Enum: "OnlineConsumption" "NoOnlineConsumption"
StockManagement
required
string (InventoryPartManagement_Enumeration)
Enum: "VendorManagedInventory" "SystemManagedInventory"
IntrastatConvFactor	
number
PartCostGroupId	
string <= 5 characters
DopConnection
required
string (DopConnection_Enumeration)
Enum: "AutomaticDOP" "ManualDOP" "ReleaseDOP"
StdNameId	
number <= 10
InventoryValuationMethod	
string (InventoryValueMethod_Enumeration)
Enum: "WeightedAverage" "StandardCost" "FirstInFirstOut" "LastInFirstOut"
NegativeOnHand
required
string (NegativeOnHand_Enumeration)
Enum: "NegativeOnHandAllowed" "NegativOnHandNotAllowed"
TechnicalCoordinatorId	
string <= 20 characters
InvoiceConsideration	
string (InvoiceConsideration_Enumeration)
Enum: "IgnoreInvoicePrice" "PeriodicWeightedAverage" "TransactionBased"
MaxActualCostUpdate	
number
CustWarrantyId	
number
SupWarrantyId	
number
RegionOfOrigin	
string <= 10 characters
InventoryPartCostLevel	
string (InventoryPartCostLevel_Enumeration)
Enum: "CostPerPart" "CostPerConfiguration" "CostPerCondition" "CostPerLotBatch" "CostPerSerial"
ExtServiceCostMethod
required
string (ExtServiceCostMethod_Enumeration)
Enum: "IncludeServiceCost" "ExcludeServiceCost"
SupplyChainPartGroup	
string <= 20 characters
AutomaticCapabilityCheck
required
string (CapabilityCheckAllocate_Enumeration)
Enum: "ReserveAndAllocate" "AllocateOnly" "NeitherReserveNorAlloc" "NoAutomatCapabilityCheck"
InputUnitMeasGroupId	
string <= 30 characters
DopNetting
required
string (DopNetting_Enumeration)
Enum: "Netting" "NoNetting" "AutoNetting"
CoReserveOnhAnalysFlag
required
string (InventoryPartOnhAnalys_Enumeration)
Enum: "MakeAvailabilityCheck" "NoAvailabilityCheck"
QtyCalcRounding
required
number <= 2
LifecycleStage
required
string (InvPartLifecycleStage_Enumeration)
Enum: "Development" "Introduction" "Mature" "Decline" "Expired"
LifeStageLockedUntil	
string <date>
FrequencyClass
required
string (InvPartFrequencyClass_Enumeration)
Enum: "VerySlowMover" "SlowMover" "MediumMover" "FastMover"
FreqClassLockedUntil	
string <date>
MinDurabDaysCoDeliv
required
number <= 4
MinDurabDaysPlanning
required
number <= 4
StandardPutawayQty	
number
PutawayZoneRefillOption	
string (PutawayZoneRefillOption_Enumeration)
Enum: "NoRefill" "FromPutawayZones" "FromAllLocations"
MandatoryExpirationDate
required
boolean
ExclShipPackProposal
required
boolean
StatisticalCode	
string <= 15 characters
AcquisitionOrigin	
number
AcquisitionReasonId	
string <= 20 characters
HsnSacCode	
string <= 20 characters
ProductCategoryId	
string <= 50 characters
HsnSacCodeDescription	
string <= 100 characters
ProductCategoryDesc	
string <= 4000 characters
SupersedesStartDate	
string <date>
SupersedesEndDate	
string <date>
CPpvStatus	
string <= 4000 characters
CMrpToDop
required
boolean
CNextLineItemNo	
number
CNextOperationNo	
number
CSfShipmentBoat	
string <= 4000 characters
CSfAssemblyBoat	
string <= 4000 characters
StructureUpdate
required
boolean
RoutingUpdate
required
boolean
Responses
200 response body for entity type InventoryPart
201 response body for entity type InventoryPart
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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')

Request samples
Payload
Content type
application/json

Copy
{
"AccountingGroup": "It is a Text",
"AssetClass": "It is a Text",
"CountryOfOrigin": "It is a Text",
"HazardCode": "It is a Text",
"PartProductCode": "It is a Text",
"PartProductFamily": "It is a Text",
"PartStatus": "It is a Text",
"PlannerBuyer": "It is a Text",
"PrimeCommodity": "It is a Text",
"SecondCommodity": "It is a Text",
"CatchUnitMeas": "It is a Text",
"Description": "It is a Text",
"DescriptionCopy": "It is a Text",
"AbcClass": "It is a Text",
"AbcClassLockedUntil": "2019-10-10",
"CycleCode": "CyclicCounting",
"CyclePeriod": 1,
"DimQuality": "It is a Text",
"DurabilityDay": 1,
"ExpectedLeadtime": 1,
"LeadTimeCode": "Manufactured",
"ManufLeadtime": 1,
"NoteText": "It is a Text",
"OeAllocAssignFlag": "PriorityReservation",
"OnhandAnalysisFlag": "MakeAvailabilityCheck",
"PurchLeadtime": 1,
"EarliestUltdSupplyDate": "2019-10-10",
"Supersedes": "It is a Text",
"SupplyCode": "InventoryOrder",
"TypeCode": "Manufactured",
"CustomsStatNo": "It is a Text",
"TypeDesignation": "It is a Text",
"ZeroCostFlag": "ZeroCostAllowed",
"AvailActivityStatus": "Changed",
"EngAttribute": "It is a Text",
"ShortageFlag": "ShortageNotation",
"ForecastConsumptionFlag": "OnlineConsumption",
"StockManagement": "VendorManagedInventory",
"IntrastatConvFactor": 1,
"PartCostGroupId": "It is a Text",
"DopConnection": "AutomaticDOP",
"StdNameId": 1,
"InventoryValuationMethod": "WeightedAverage",
"NegativeOnHand": "NegativeOnHandAllowed",
"TechnicalCoordinatorId": "It is a Text",
"InvoiceConsideration": "IgnoreInvoicePrice",
"MaxActualCostUpdate": 1,
"CustWarrantyId": 1,
"SupWarrantyId": 1,
"RegionOfOrigin": "It is a Text",
"InventoryPartCostLevel": "CostPerPart",
"ExtServiceCostMethod": "IncludeServiceCost",
"SupplyChainPartGroup": "It is a Text",
"AutomaticCapabilityCheck": "ReserveAndAllocate",
"InputUnitMeasGroupId": "It is a Text",
"DopNetting": "Netting",
"CoReserveOnhAnalysFlag": "MakeAvailabilityCheck",
"QtyCalcRounding": 1,
"LifecycleStage": "Development",
"LifeStageLockedUntil": "2019-10-10",
"FrequencyClass": "VerySlowMover",
"FreqClassLockedUntil": "2019-10-10",
"MinDurabDaysCoDeliv": 1,
"MinDurabDaysPlanning": 1,
"StandardPutawayQty": 1,
"PutawayZoneRefillOption": "NoRefill",
"MandatoryExpirationDate": true,
"ExclShipPackProposal": true,
"StatisticalCode": "It is a Text",
"AcquisitionOrigin": 1,
"AcquisitionReasonId": "It is a Text",
"HsnSacCode": "It is a Text",
"ProductCategoryId": "It is a Text",
"HsnSacCodeDescription": "It is a Text",
"ProductCategoryDesc": "It is a Text",
"SupersedesStartDate": "2019-10-10",
"SupersedesEndDate": "2019-10-10",
"CPpvStatus": "It is a Text",
"CMrpToDop": true,
"CNextLineItemNo": 1,
"CNextOperationNo": 1,
"CSfShipmentBoat": "It is a Text",
"CSfAssemblyBoat": "It is a Text",
"StructureUpdate": true,
"RoutingUpdate": true
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
"AccountingGroup": "It is a Text",
"AssetClass": "It is a Text",
"CountryOfOrigin": "It is a Text",
"HazardCode": "It is a Text",
"NoteId": 1,
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
"MaxActualCostUpdate": 1,
"CustWarrantyId": 1,
"SupWarrantyId": 1,
"RegionOfOrigin": "It is a Text",
"SupplyChainPartGroup": "It is a Text",
"InputUnitMeasGroupId": "It is a Text",
"QtyCalcRounding": 1,
"LifeStageLockedUntil": "2019-10-10",
"FreqClassLockedUntil": "2019-10-10",
"MinDurabDaysCoDeliv": 1,
"MinDurabDaysPlanning": 1,
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
"PartDescriptionInUse": "It is a Text",
"UnitOfMeasureDescription": "It is a Text",
"CatchUnitMeasDescription": "It is a Text",
"InputUnitDescription": "It is a Text",
"PrimeCommodityGrpDescription": "It is a Text",
"SecondCommodityGrpDescription": "It is a Text",
"SafetyInstructionDescription": "It is a Text",
"AccountingGroupDescription": "It is a Text",
"ProductCodeDescription": "It is a Text",
"ProductFamilyDescription": "It is a Text",
"NetWeight": 1,
"WeightUom": "It is a Text",
"NetVolume": 1,
"VolumeUom": "It is a Text",
"OnHandQty": 1,
"OnHandCatchQty": 1,
"UnlimitedPurchSupplyDate": "2019-10-10",
"UnlimitedManufSupplyDate": "2019-10-10",
"UnlimitedExpectedSupplyDate": "2019-10-10",
"SupersededByPart": "It is a Text",
"DurabilityWeeks": 1,
"SupplyTypeDb": "It is a Text",
"EnabledLccParams": "It is a Text",
"MultiSitePlannedPart": true,
"CustWarranty": true,
"SupWarranty": true,
"PartCatalogPartDescription": "It is a Text",
"PartCatalogBasePartDescription": "It is a Text",
"GTIN": "It is a Text",
"GTINSeries": "It is a Text",
"OperativeValue": "It is a Text",
"OperativeValueSource": "It is a Text",
"CountryCode": "It is a Text",
"DocumentTextExist": true,
"NoteTextExist": true,
"UsePartcaDescInventDb": true,
"DefaultQtyCalcRound": 1,
"PartCatalogStandardName": "It is a Text",
"AnyForecastPartExists": true,
"AllForecastPartsExist": true,
"HsnSacCodeDescription": "It is a Text",
"ProductCategoryDesc": "It is a Text",
"SupersedesStartDate": "2019-10-10",
"SupersedesEndDate": "2019-10-10",
"CPpvStatus": "It is a Text",
"CMrpToDop": true,
"CNextLineItemNo": 1,
"CNextOperationNo": 1,
"CSfShipmentBoat": "It is a Text",
"CSfAssemblyBoat": "It is a Text",
"StructureUpdate": true,
"RoutingUpdate": true,
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
"PutawayZoneRefillOption": "NoRefill"
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
query Parameters
@CopyValues
required
object (InventoryPartCopyValues)
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AccountingGroup" "AssetClass" "CountryOfOrigin" "HazardCode" "NoteId" "PartProductCode" "PartProductFamily" "PartStatus" "PlannerBuyer" "PrimeCommodity" "SecondCommodity" "UnitMeas" "CatchUnitMeas" "Description" "DescriptionCopy" "AbcClass" "AbcClassLockedUntil" "CountVariance" "CreateDate" "CycleCode" "CyclePeriod" "DimQuality" "DurabilityDay" "ExpectedLeadtime" "LastActivityDate" "LeadTimeCode" "ManufLeadtime" "NoteText" "OeAllocAssignFlag" "OnhandAnalysisFlag" "PurchLeadtime" "EarliestUltdSupplyDate" "Supersedes" "SupplyCode" "TypeCode" "CustomsStatNo" "TypeDesignation" "ZeroCostFlag" "AvailActivityStatus" "EngAttribute" "ShortageFlag" "ForecastConsumptionFlag" "StockManagement" "IntrastatConvFactor" "PartCostGroupId" "DopConnection" "StdNameId" "InventoryValuationMethod" "NegativeOnHand" "TechnicalCoordinatorId" "InvoiceConsideration" "MaxActualCostUpdate" "CustWarrantyId" "SupWarrantyId" "RegionOfOrigin" "InventoryPartCostLevel" "ExtServiceCostMethod" "SupplyChainPartGroup" "AutomaticCapabilityCheck" "InputUnitMeasGroupId" "DopNetting" "CoReserveOnhAnalysFlag" "QtyCalcRounding" "LifecycleStage" "LifeStageLockedUntil" "FrequencyClass" "FreqClassLockedUntil" "MinDurabDaysCoDeliv" "MinDurabDaysPlanning" "StandardPutawayQty" "PutawayZoneRefillOption" "ResetConfigStdCost" "MandatoryExpirationDate" "ExclShipPackProposal" "Company" "StatisticalCode" "AcquisitionOrigin" "AcquisitionReasonId" "HsnSacCode" "ProductCategoryId" "PartDescriptionInUse" "UnitOfMeasureDescription" "CatchUnitMeasDescription" "InputUnitDescription" "PrimeCommodityGrpDescription" "SecondCommodityGrpDescription" "SafetyInstructionDescription" "AccountingGroupDescription" "ProductCodeDescription" "ProductFamilyDescription" "NetWeight" "WeightUom" "NetVolume" "VolumeUom" "OnHandQty" "OnHandCatchQty" "UnlimitedPurchSupplyDate" "UnlimitedManufSupplyDate" "UnlimitedExpectedSupplyDate" "SupersededByPart" "DurabilityWeeks" "SupplyTypeDb" "EnabledLccParams" "MultiSitePlannedPart" "CustWarranty" "SupWarranty" "PartCatalogPartDescription" "PartCatalogBasePartDescription" "GTIN" "GTINSeries" "OperativeValue" "OperativeValueSource" "CountryCode" "DocumentTextExist" "NoteTextExist" "UsePartcaDescInventDb" "DefaultQtyCalcRound" "PartCatalogStandardName" "AnyForecastPartExists" "AllForecastPartsExist" "HsnSacCodeDescription" "ProductCategoryDesc" "SupersedesStartDate" "SupersedesEndDate" "CPpvStatus" "CMrpToDop" "CNextLineItemNo" "CNextOperationNo" "CSfShipmentBoat" "CSfAssemblyBoat" "StructureUpdate" "RoutingUpdate"
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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/IfsApp.InventoryPartHandling.InventoryPart_DefaultCopy(CopyValues=@CopyValues)

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
"MaxActualCostUpdate": 1,
"CustWarrantyId": 1,
"SupWarrantyId": 1,
"RegionOfOrigin": "It is a Text",
"SupplyChainPartGroup": "It is a Text",
"InputUnitMeasGroupId": "It is a Text",
"QtyCalcRounding": 1,
"LifeStageLockedUntil": "2019-10-10",
"FreqClassLockedUntil": "2019-10-10",
"MinDurabDaysCoDeliv": 1,
"MinDurabDaysPlanning": 1,
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
"PartDescriptionInUse": "It is a Text",
"UnitOfMeasureDescription": "It is a Text",
"CatchUnitMeasDescription": "It is a Text",
"InputUnitDescription": "It is a Text",
"PrimeCommodityGrpDescription": "It is a Text",
"SecondCommodityGrpDescription": "It is a Text",
"SafetyInstructionDescription": "It is a Text",
"AccountingGroupDescription": "It is a Text",
"ProductCodeDescription": "It is a Text",
"ProductFamilyDescription": "It is a Text",
"NetWeight": 1,
"WeightUom": "It is a Text",
"NetVolume": 1,
"VolumeUom": "It is a Text",
"OnHandQty": 1,
"OnHandCatchQty": 1,
"UnlimitedPurchSupplyDate": "2019-10-10",
"UnlimitedManufSupplyDate": "2019-10-10",
"UnlimitedExpectedSupplyDate": "2019-10-10",
"SupersededByPart": "It is a Text",
"DurabilityWeeks": 1,
"SupplyTypeDb": "It is a Text",
"EnabledLccParams": "It is a Text",
"MultiSitePlannedPart": true,
"CustWarranty": true,
"SupWarranty": true,
"PartCatalogPartDescription": "It is a Text",
"PartCatalogBasePartDescription": "It is a Text",
"GTIN": "It is a Text",
"GTINSeries": "It is a Text",
"OperativeValue": "It is a Text",
"OperativeValueSource": "It is a Text",
"CountryCode": "It is a Text",
"DocumentTextExist": true,
"NoteTextExist": true,
"UsePartcaDescInventDb": true,
"DefaultQtyCalcRound": 1,
"PartCatalogStandardName": "It is a Text",
"AnyForecastPartExists": true,
"AllForecastPartsExist": true,
"HsnSacCodeDescription": "It is a Text",
"ProductCategoryDesc": "It is a Text",
"SupersedesStartDate": "2019-10-10",
"SupersedesEndDate": "2019-10-10",
"CPpvStatus": "It is a Text",
"CMrpToDop": true,
"CNextLineItemNo": 1,
"CNextOperationNo": 1,
"CSfShipmentBoat": "It is a Text",
"CSfAssemblyBoat": "It is a Text",
"StructureUpdate": true,
"RoutingUpdate": true,
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
"PutawayZoneRefillOption": "NoRefill"
}
Invoke function DefaultCopy
Authorizations:
(OpenIdbasicAuth)
query Parameters
@CopyValues
required
object (InventoryPartCopyValues)
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AccountingGroup" "AssetClass" "CountryOfOrigin" "HazardCode" "NoteId" "PartProductCode" "PartProductFamily" "PartStatus" "PlannerBuyer" "PrimeCommodity" "SecondCommodity" "UnitMeas" "CatchUnitMeas" "Description" "DescriptionCopy" "AbcClass" "AbcClassLockedUntil" "CountVariance" "CreateDate" "CycleCode" "CyclePeriod" "DimQuality" "DurabilityDay" "ExpectedLeadtime" "LastActivityDate" "LeadTimeCode" "ManufLeadtime" "NoteText" "OeAllocAssignFlag" "OnhandAnalysisFlag" "PurchLeadtime" "EarliestUltdSupplyDate" "Supersedes" "SupplyCode" "TypeCode" "CustomsStatNo" "TypeDesignation" "ZeroCostFlag" "AvailActivityStatus" "EngAttribute" "ShortageFlag" "ForecastConsumptionFlag" "StockManagement" "IntrastatConvFactor" "PartCostGroupId" "DopConnection" "StdNameId" "InventoryValuationMethod" "NegativeOnHand" "TechnicalCoordinatorId" "InvoiceConsideration" "MaxActualCostUpdate" "CustWarrantyId" "SupWarrantyId" "RegionOfOrigin" "InventoryPartCostLevel" "ExtServiceCostMethod" "SupplyChainPartGroup" "AutomaticCapabilityCheck" "InputUnitMeasGroupId" "DopNetting" "CoReserveOnhAnalysFlag" "QtyCalcRounding" "LifecycleStage" "LifeStageLockedUntil" "FrequencyClass" "FreqClassLockedUntil" "MinDurabDaysCoDeliv" "MinDurabDaysPlanning" "StandardPutawayQty" "PutawayZoneRefillOption" "ResetConfigStdCost" "MandatoryExpirationDate" "ExclShipPackProposal" "Company" "StatisticalCode" "AcquisitionOrigin" "AcquisitionReasonId" "HsnSacCode" "ProductCategoryId" "PartDescriptionInUse" "UnitOfMeasureDescription" "CatchUnitMeasDescription" "InputUnitDescription" "PrimeCommodityGrpDescription" "SecondCommodityGrpDescription" "SafetyInstructionDescription" "AccountingGroupDescription" "ProductCodeDescription" "ProductFamilyDescription" "NetWeight" "WeightUom" "NetVolume" "VolumeUom" "OnHandQty" "OnHandCatchQty" "UnlimitedPurchSupplyDate" "UnlimitedManufSupplyDate" "UnlimitedExpectedSupplyDate" "SupersededByPart" "DurabilityWeeks" "SupplyTypeDb" "EnabledLccParams" "MultiSitePlannedPart" "CustWarranty" "SupWarranty" "PartCatalogPartDescription" "PartCatalogBasePartDescription" "GTIN" "GTINSeries" "OperativeValue" "OperativeValueSource" "CountryCode" "DocumentTextExist" "NoteTextExist" "UsePartcaDescInventDb" "DefaultQtyCalcRound" "PartCatalogStandardName" "AnyForecastPartExists" "AllForecastPartsExist" "HsnSacCodeDescription" "ProductCategoryDesc" "SupersedesStartDate" "SupersedesEndDate" "CPpvStatus" "CMrpToDop" "CNextLineItemNo" "CNextOperationNo" "CSfShipmentBoat" "CSfAssemblyBoat" "StructureUpdate" "RoutingUpdate"
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
/InventoryPartSet/IfsApp.InventoryPartHandling.InventoryPart_DefaultCopy(CopyValues=@CopyValues)

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
"PartNo": "It is a Text",
"AccountingGroup": "It is a Text",
"AssetClass": "It is a Text",
"CountryOfOrigin": "It is a Text",
"HazardCode": "It is a Text",
"NoteId": 1,
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
"MaxActualCostUpdate": 1,
"CustWarrantyId": 1,
"SupWarrantyId": 1,
"RegionOfOrigin": "It is a Text",
"SupplyChainPartGroup": "It is a Text",
"InputUnitMeasGroupId": "It is a Text",
"QtyCalcRounding": 1,
"LifeStageLockedUntil": "2019-10-10",
"FreqClassLockedUntil": "2019-10-10",
"MinDurabDaysCoDeliv": 1,
"MinDurabDaysPlanning": 1,
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
"PartDescriptionInUse": "It is a Text",
"UnitOfMeasureDescription": "It is a Text",
"CatchUnitMeasDescription": "It is a Text",
"InputUnitDescription": "It is a Text",
"PrimeCommodityGrpDescription": "It is a Text",
"SecondCommodityGrpDescription": "It is a Text",
"SafetyInstructionDescription": "It is a Text",
"AccountingGroupDescription": "It is a Text",
"ProductCodeDescription": "It is a Text",
"ProductFamilyDescription": "It is a Text",
"NetWeight": 1,
"WeightUom": "It is a Text",
"NetVolume": 1,
"VolumeUom": "It is a Text",
"OnHandQty": 1,
"OnHandCatchQty": 1,
"UnlimitedPurchSupplyDate": "2019-10-10",
"UnlimitedManufSupplyDate": "2019-10-10",
"UnlimitedExpectedSupplyDate": "2019-10-10",
"SupersededByPart": "It is a Text",
"DurabilityWeeks": 1,
"SupplyTypeDb": "It is a Text",
"EnabledLccParams": "It is a Text",
"MultiSitePlannedPart": true,
"CustWarranty": true,
"SupWarranty": true,
"PartCatalogPartDescription": "It is a Text",
"PartCatalogBasePartDescription": "It is a Text",
"GTIN": "It is a Text",
"GTINSeries": "It is a Text",
"OperativeValue": "It is a Text",
"OperativeValueSource": "It is a Text",
"CountryCode": "It is a Text",
"DocumentTextExist": true,
"NoteTextExist": true,
"UsePartcaDescInventDb": true,
"DefaultQtyCalcRound": 1,
"PartCatalogStandardName": "It is a Text",
"AnyForecastPartExists": true,
"AllForecastPartsExist": true,
"HsnSacCodeDescription": "It is a Text",
"ProductCategoryDesc": "It is a Text",
"SupersedesStartDate": "2019-10-10",
"SupersedesEndDate": "2019-10-10",
"CPpvStatus": "It is a Text",
"CMrpToDop": true,
"CNextLineItemNo": 1,
"CNextOperationNo": 1,
"CSfShipmentBoat": "It is a Text",
"CSfAssemblyBoat": "It is a Text",
"StructureUpdate": true,
"RoutingUpdate": true,
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
"PutawayZoneRefillOption": "NoRefill"
}
Invoke function Default
Authorizations:
(OpenIdbasicAuth)
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AccountingGroup" "AssetClass" "CountryOfOrigin" "HazardCode" "NoteId" "PartProductCode" "PartProductFamily" "PartStatus" "PlannerBuyer" "PrimeCommodity" "SecondCommodity" "UnitMeas" "CatchUnitMeas" "Description" "DescriptionCopy" "AbcClass" "AbcClassLockedUntil" "CountVariance" "CreateDate" "CycleCode" "CyclePeriod" "DimQuality" "DurabilityDay" "ExpectedLeadtime" "LastActivityDate" "LeadTimeCode" "ManufLeadtime" "NoteText" "OeAllocAssignFlag" "OnhandAnalysisFlag" "PurchLeadtime" "EarliestUltdSupplyDate" "Supersedes" "SupplyCode" "TypeCode" "CustomsStatNo" "TypeDesignation" "ZeroCostFlag" "AvailActivityStatus" "EngAttribute" "ShortageFlag" "ForecastConsumptionFlag" "StockManagement" "IntrastatConvFactor" "PartCostGroupId" "DopConnection" "StdNameId" "InventoryValuationMethod" "NegativeOnHand" "TechnicalCoordinatorId" "InvoiceConsideration" "MaxActualCostUpdate" "CustWarrantyId" "SupWarrantyId" "RegionOfOrigin" "InventoryPartCostLevel" "ExtServiceCostMethod" "SupplyChainPartGroup" "AutomaticCapabilityCheck" "InputUnitMeasGroupId" "DopNetting" "CoReserveOnhAnalysFlag" "QtyCalcRounding" "LifecycleStage" "LifeStageLockedUntil" "FrequencyClass" "FreqClassLockedUntil" "MinDurabDaysCoDeliv" "MinDurabDaysPlanning" "StandardPutawayQty" "PutawayZoneRefillOption" "ResetConfigStdCost" "MandatoryExpirationDate" "ExclShipPackProposal" "Company" "StatisticalCode" "AcquisitionOrigin" "AcquisitionReasonId" "HsnSacCode" "ProductCategoryId" "PartDescriptionInUse" "UnitOfMeasureDescription" "CatchUnitMeasDescription" "InputUnitDescription" "PrimeCommodityGrpDescription" "SecondCommodityGrpDescription" "SafetyInstructionDescription" "AccountingGroupDescription" "ProductCodeDescription" "ProductFamilyDescription" "NetWeight" "WeightUom" "NetVolume" "VolumeUom" "OnHandQty" "OnHandCatchQty" "UnlimitedPurchSupplyDate" "UnlimitedManufSupplyDate" "UnlimitedExpectedSupplyDate" "SupersededByPart" "DurabilityWeeks" "SupplyTypeDb" "EnabledLccParams" "MultiSitePlannedPart" "CustWarranty" "SupWarranty" "PartCatalogPartDescription" "PartCatalogBasePartDescription" "GTIN" "GTINSeries" "OperativeValue" "OperativeValueSource" "CountryCode" "DocumentTextExist" "NoteTextExist" "UsePartcaDescInventDb" "DefaultQtyCalcRound" "PartCatalogStandardName" "AnyForecastPartExists" "AllForecastPartsExist" "HsnSacCodeDescription" "ProductCategoryDesc" "SupersedesStartDate" "SupersedesEndDate" "CPpvStatus" "CMrpToDop" "CNextLineItemNo" "CNextOperationNo" "CSfShipmentBoat" "CSfAssemblyBoat" "StructureUpdate" "RoutingUpdate"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type InventoryPart
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet/IfsApp.InventoryPartHandling.InventoryPart_Default()

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
"PartNo": "It is a Text",
"AccountingGroup": "It is a Text",
"AssetClass": "It is a Text",
"CountryOfOrigin": "It is a Text",
"HazardCode": "It is a Text",
"NoteId": 1,
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
"MaxActualCostUpdate": 1,
"CustWarrantyId": 1,
"SupWarrantyId": 1,
"RegionOfOrigin": "It is a Text",
"SupplyChainPartGroup": "It is a Text",
"InputUnitMeasGroupId": "It is a Text",
"QtyCalcRounding": 1,
"LifeStageLockedUntil": "2019-10-10",
"FreqClassLockedUntil": "2019-10-10",
"MinDurabDaysCoDeliv": 1,
"MinDurabDaysPlanning": 1,
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
"PartDescriptionInUse": "It is a Text",
"UnitOfMeasureDescription": "It is a Text",
"CatchUnitMeasDescription": "It is a Text",
"InputUnitDescription": "It is a Text",
"PrimeCommodityGrpDescription": "It is a Text",
"SecondCommodityGrpDescription": "It is a Text",
"SafetyInstructionDescription": "It is a Text",
"AccountingGroupDescription": "It is a Text",
"ProductCodeDescription": "It is a Text",
"ProductFamilyDescription": "It is a Text",
"NetWeight": 1,
"WeightUom": "It is a Text",
"NetVolume": 1,
"VolumeUom": "It is a Text",
"OnHandQty": 1,
"OnHandCatchQty": 1,
"UnlimitedPurchSupplyDate": "2019-10-10",
"UnlimitedManufSupplyDate": "2019-10-10",
"UnlimitedExpectedSupplyDate": "2019-10-10",
"SupersededByPart": "It is a Text",
"DurabilityWeeks": 1,
"SupplyTypeDb": "It is a Text",
"EnabledLccParams": "It is a Text",
"MultiSitePlannedPart": true,
"CustWarranty": true,
"SupWarranty": true,
"PartCatalogPartDescription": "It is a Text",
"PartCatalogBasePartDescription": "It is a Text",
"GTIN": "It is a Text",
"GTINSeries": "It is a Text",
"OperativeValue": "It is a Text",
"OperativeValueSource": "It is a Text",
"CountryCode": "It is a Text",
"DocumentTextExist": true,
"NoteTextExist": true,
"UsePartcaDescInventDb": true,
"DefaultQtyCalcRound": 1,
"PartCatalogStandardName": "It is a Text",
"AnyForecastPartExists": true,
"AllForecastPartsExist": true,
"HsnSacCodeDescription": "It is a Text",
"ProductCategoryDesc": "It is a Text",
"SupersedesStartDate": "2019-10-10",
"SupersedesEndDate": "2019-10-10",
"CPpvStatus": "It is a Text",
"CMrpToDop": true,
"CNextLineItemNo": 1,
"CNextOperationNo": 1,
"CSfShipmentBoat": "It is a Text",
"CSfAssemblyBoat": "It is a Text",
"StructureUpdate": true,
"RoutingUpdate": true,
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
"PutawayZoneRefillOption": "NoRefill"
}
Get entities from InventoryPartAlternativePartArray
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "AlternativePartNo" "AlternativePartNo desc" "Description" "Description desc" "QtyOnHand" "QtyOnHand desc" "NoteText" "NoteText desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AlternativePartNo" "Description" "QtyOnHand" "NoteText"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartCatalogRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array InventoryPartAlternativePartQuery
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/InventoryPartAlternativePartArray

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
Get entity from InventoryPartAlternativePartArray by key
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
InventoryPartAlternativePartArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

InventoryPartAlternativePartArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

InventoryPartAlternativePartArray_AlternativePartNo
required
string <= 25 characters
Example: It is a Text
key: AlternativePartNo

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AccountingGroup" "AssetClass" "CountryOfOrigin" "HazardCode" "NoteId" "PartProductCode" "PartProductFamily" "PartStatus" "PlannerBuyer" "PrimeCommodity" "SecondCommodity" "UnitMeas" "CatchUnitMeas" "Description" "DescriptionCopy" "AbcClass" "AbcClassLockedUntil" "CountVariance" "CreateDate" "CycleCode" "CyclePeriod" "DimQuality" "DurabilityDay" "ExpectedLeadtime" "LastActivityDate" "LeadTimeCode" "ManufLeadtime" "NoteText" "OeAllocAssignFlag" "OnhandAnalysisFlag" "PurchLeadtime" "EarliestUltdSupplyDate" "Supersedes" "SupplyCode" "TypeCode" "CustomsStatNo" "TypeDesignation" "ZeroCostFlag" "AvailActivityStatus" "EngAttribute" "ShortageFlag" "ForecastConsumptionFlag" "StockManagement" "IntrastatConvFactor" "PartCostGroupId" "DopConnection" "StdNameId" "InventoryValuationMethod" "NegativeOnHand" "TechnicalCoordinatorId" "InvoiceConsideration" "MaxActualCostUpdate" "CustWarrantyId" "SupWarrantyId" "RegionOfOrigin" "InventoryPartCostLevel" "ExtServiceCostMethod" "SupplyChainPartGroup" "AutomaticCapabilityCheck" "InputUnitMeasGroupId" "DopNetting" "CoReserveOnhAnalysFlag" "QtyCalcRounding" "LifecycleStage" "LifeStageLockedUntil" "FrequencyClass" "FreqClassLockedUntil" "MinDurabDaysCoDeliv" "MinDurabDaysPlanning" "StandardPutawayQty" "PutawayZoneRefillOption" "ResetConfigStdCost" "MandatoryExpirationDate" "ExclShipPackProposal" "Company" "StatisticalCode" "AcquisitionOrigin" "AcquisitionReasonId" "HsnSacCode" "ProductCategoryId" "PartDescriptionInUse" "UnitOfMeasureDescription" "CatchUnitMeasDescription" "InputUnitDescription" "PrimeCommodityGrpDescription" "SecondCommodityGrpDescription" "SafetyInstructionDescription" "AccountingGroupDescription" "ProductCodeDescription" "ProductFamilyDescription" "NetWeight" "WeightUom" "NetVolume" "VolumeUom" "OnHandQty" "OnHandCatchQty" "UnlimitedPurchSupplyDate" "UnlimitedManufSupplyDate" "UnlimitedExpectedSupplyDate" "SupersededByPart" "DurabilityWeeks" "SupplyTypeDb" "EnabledLccParams" "MultiSitePlannedPart" "CustWarranty" "SupWarranty" "PartCatalogPartDescription" "PartCatalogBasePartDescription" "GTIN" "GTINSeries" "OperativeValue" "OperativeValueSource" "CountryCode" "DocumentTextExist" "NoteTextExist" "UsePartcaDescInventDb" "DefaultQtyCalcRound" "PartCatalogStandardName" "AnyForecastPartExists" "AllForecastPartsExist" "HsnSacCodeDescription" "ProductCategoryDesc" "SupersedesStartDate" "SupersedesEndDate" "CPpvStatus" "CMrpToDop" "CNextLineItemNo" "CNextOperationNo" "CSfShipmentBoat" "CSfAssemblyBoat" "StructureUpdate" "RoutingUpdate"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "AbcClassRef" "PartCostGroupRef" "SiteInventInfoRef" "PartCatalogRef" "ContractRef" "PlannerBuyerRef" "InventoryUomRef" "CatchUnitMeasRef" "InputUnitMeasGroupIdRef" "PrimeCommodityRef" "SecondCommodityRef" "AssetClassRef" "PartStatusRef" "HazardCodeRef" "AccountingGroupRef" "PartProductCodeRef" "PartProductFamilyRef" "SupersedesRef" "SupersededByPartRef" "CountryOfOriginRef" "RegionOfOriginRef" "CustomsStatNoRef" "SupplyChainPartGroupRef" "TechnicalCoordinatorIdRef" "CustWarrantyIdRef" "StdNameIdRef" "EngAttributeRef" "StatisticalCodeRef" "AcquisitionReasonIdRef" "AcquisitionOriginRef" "HsnSacCodeRef" "ProductCategoryIdRef" "CPpvStatusRef" "CSfShipmentBoatRef" "CSfAssemblyBoatRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type InventoryPartAlternativePartQuery
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/InventoryPartAlternativePartArray(Contract='{InventoryPartAlternativePartArray_Contract}',PartNo='{InventoryPartAlternativePartArray_PartNo}',AlternativePartNo='{InventoryPartAlternativePartArray_AlternativePartNo}')

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
"QtyOnHand": 1,
"NoteText": "It is a Text"
}
Get entities from PartCatalogRef
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
InventoryPartAlternativePartArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

InventoryPartAlternativePartArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

InventoryPartAlternativePartArray_AlternativePartNo
required
string <= 25 characters
Example: It is a Text
key: AlternativePartNo

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
Items Enum: "PartNo" "PartNo desc" "Description" "Description desc" "LanguageDescription" "LanguageDescription desc" "InfoText" "InfoText desc" "StdNameId" "StdNameId desc" "UnitCode" "UnitCode desc" "LotTrackingCode" "LotTrackingCode desc" "SerialRule" "SerialRule desc" "SerialTrackingCode" "SerialTrackingCode desc" "EngSerialTrackingCode" "EngSerialTrackingCode desc" "PartMainGroup" "PartMainGroup desc" "Configurable" "Configurable desc" "CustWarrantyId" "CustWarrantyId desc" "SupWarrantyId" "SupWarrantyId desc" "ConditionCodeUsage" "ConditionCodeUsage desc" "SubLotRule" "SubLotRule desc" "LotQuantityRule" "LotQuantityRule desc" "PositionPart" "PositionPart desc" "InputUnitMeasGroupId" "InputUnitMeasGroupId desc" "CatchUnitEnabled" "CatchUnitEnabled desc" "MultilevelTracking" "MultilevelTracking desc" "ComponentLotRule" "ComponentLotRule desc" "StopArrivalIssuedSerial" "StopArrivalIssuedSerial desc" "WeightNet" "WeightNet desc" "UomForWeightNet" "UomForWeightNet desc" "VolumeNet" "VolumeNet desc" "UomForVolumeNet" "UomForVolumeNet desc" "FreightFactor" "FreightFactor desc" "AllowAsNotConsumed" "AllowAsNotConsumed desc" "ReceiptIssueSerialTrack" "ReceiptIssueSerialTrack desc" "StopNewSerialInRma" "StopNewSerialInRma desc" "TechnicalDrawingNo" "TechnicalDrawingNo desc" "ProductTypeClassif" "ProductTypeClassif desc" "CestCode" "CestCode desc" "FciCode" "FciCode desc" "FirstInventorySite" "FirstInventorySite desc" "Ppv" "Ppv desc" "IsNewPart" "IsNewPart desc" "CPpvStatus" "CPpvStatus desc" "CPartConfigCompletion" "CPartConfigCompletion desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PartNo" "Description" "LanguageDescription" "InfoText" "StdNameId" "UnitCode" "LotTrackingCode" "SerialRule" "SerialTrackingCode" "EngSerialTrackingCode" "PartMainGroup" "Configurable" "CustWarrantyId" "SupWarrantyId" "ConditionCodeUsage" "SubLotRule" "LotQuantityRule" "PositionPart" "InputUnitMeasGroupId" "CatchUnitEnabled" "MultilevelTracking" "ComponentLotRule" "StopArrivalIssuedSerial" "WeightNet" "UomForWeightNet" "VolumeNet" "UomForVolumeNet" "FreightFactor" "AllowAsNotConsumed" "ReceiptIssueSerialTrack" "StopNewSerialInRma" "TechnicalDrawingNo" "ProductTypeClassif" "CestCode" "FciCode" "FirstInventorySite" "Ppv" "IsNewPart" "CPpvStatus" "CPartConfigCompletion"
Specify properties to return, see OData Select

Responses
200 response body for entity array PartCatalog
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/InventoryPartAlternativePartArray(Contract='{InventoryPartAlternativePartArray_Contract}',PartNo='{InventoryPartAlternativePartArray_PartNo}',AlternativePartNo='{InventoryPartAlternativePartArray_AlternativePartNo}')/PartCatalogRef

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
Get entities from ManufPartAttributeArray
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "CumLeadtime" "CumLeadtime desc" "OrderGapTime" "OrderGapTime desc" "Density" "Density desc" "LowLevel" "LowLevel desc" "BackflushPart" "BackflushPart desc" "EngineeringInfo" "EngineeringInfo desc" "StructureEffectivity" "StructureEffectivity desc" "RoutingEffectivity" "RoutingEffectivity desc" "PromisePlanned" "PromisePlanned desc" "DefaultPrintUnit" "DefaultPrintUnit desc" "ProcessType" "ProcessType desc" "ConfigurationUsage" "ConfigurationUsage desc" "ManufEngineer" "ManufEngineer desc" "FixedLeadtimeDay" "FixedLeadtimeDay desc" "VariableLeadtimeDay" "VariableLeadtimeDay desc" "FixedLeadtimeHour" "FixedLeadtimeHour desc" "VariableLeadtimeHour" "VariableLeadtimeHour desc" "LeadtimeSource" "LeadtimeSource desc" "LotBatchString" "LotBatchString desc" "OverhaulScrapRule" "OverhaulScrapRule desc" "DopPeggedSoUpdateFlag" "DopPeggedSoUpdateFlag desc" "MrpControlFlag" "MrpControlFlag desc" "ProdPartAsSupplyInMrp" "ProdPartAsSupplyInMrp desc" "CloseTolerance" "CloseTolerance desc" "UseTheoriticalDensity" "UseTheoriticalDensity desc" "IssueType" "IssueType desc" "OverReporting" "OverReporting desc" "OverReportTolerance" "OverReportTolerance desc" "IssuePlannedScrap" "IssuePlannedScrap desc" "ComponentScrap" "ComponentScrap desc" "ShrinkageFactor" "ShrinkageFactor desc" "UnprotectedLeadTime" "UnprotectedLeadTime desc" "AdjustOnOpQtyDeviation" "AdjustOnOpQtyDeviation desc" "IssueOverreportedQty" "IssueOverreportedQty desc" "CreatedFromContract" "CreatedFromContract desc" "CreatedFromPartNo" "CreatedFromPartNo desc" "CreatedFromConfigId" "CreatedFromConfigId desc" "PlanManufSupOnDueDate" "PlanManufSupOnDueDate desc" "RunMrp" "RunMrp desc" "RunCrp" "RunCrp desc" "IncludeFirmDemands" "IncludeFirmDemands desc" "IncludeFirmSupplies" "IncludeFirmSupplies desc" "OptimizeNewDeliveryDate" "OptimizeNewDeliveryDate desc" "RunInBackground" "RunInBackground desc" "ShipDirty" "ShipDirty desc" "ShipDirtyRepairCode" "ShipDirtyRepairCode desc" "AutoReplaceAltComp" "AutoReplaceAltComp desc" "ConsiderLeadTime" "ConsiderLeadTime desc" "NbTrolleysForKit" "NbTrolleysForKit desc" "OperativeValue" "OperativeValue desc" "Uom" "Uom desc" "OperativeValueSource" "OperativeValueSource desc" "OldDensityValue" "OldDensityValue desc" "AutomaticCapabilityCheck" "AutomaticCapabilityCheck desc" "PartType" "PartType desc" "SerialTrackingCodeDb" "SerialTrackingCodeDb desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "CumLeadtime" "OrderGapTime" "Density" "LowLevel" "BackflushPart" "EngineeringInfo" "StructureEffectivity" "RoutingEffectivity" "PromisePlanned" "DefaultPrintUnit" "ProcessType" "ConfigurationUsage" "ManufEngineer" "FixedLeadtimeDay" "VariableLeadtimeDay" "FixedLeadtimeHour" "VariableLeadtimeHour" "LeadtimeSource" "LotBatchString" "OverhaulScrapRule" "DopPeggedSoUpdateFlag" "MrpControlFlag" "ProdPartAsSupplyInMrp" "CloseTolerance" "UseTheoriticalDensity" "IssueType" "OverReporting" "OverReportTolerance" "IssuePlannedScrap" "ComponentScrap" "ShrinkageFactor" "UnprotectedLeadTime" "AdjustOnOpQtyDeviation" "IssueOverreportedQty" "CreatedFromContract" "CreatedFromPartNo" "CreatedFromConfigId" "PlanManufSupOnDueDate" "RunMrp" "RunCrp" "IncludeFirmDemands" "IncludeFirmSupplies" "OptimizeNewDeliveryDate" "RunInBackground" "ShipDirty" "ShipDirtyRepairCode" "AutoReplaceAltComp" "ConsiderLeadTime" "NbTrolleysForKit" "OperativeValue" "Uom" "OperativeValueSource" "OldDensityValue" "AutomaticCapabilityCheck" "PartType" "SerialTrackingCodeDb"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ProcessTypeRef" "DefaultPrintUnitRef" "ManufEngineerRef" "ShipDirtyRepairCodeRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ManufPartAttribute
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/ManufPartAttributeArray

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
Get entity from ManufPartAttributeArray by key
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
ManufPartAttributeArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

ManufPartAttributeArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AccountingGroup" "AssetClass" "CountryOfOrigin" "HazardCode" "NoteId" "PartProductCode" "PartProductFamily" "PartStatus" "PlannerBuyer" "PrimeCommodity" "SecondCommodity" "UnitMeas" "CatchUnitMeas" "Description" "DescriptionCopy" "AbcClass" "AbcClassLockedUntil" "CountVariance" "CreateDate" "CycleCode" "CyclePeriod" "DimQuality" "DurabilityDay" "ExpectedLeadtime" "LastActivityDate" "LeadTimeCode" "ManufLeadtime" "NoteText" "OeAllocAssignFlag" "OnhandAnalysisFlag" "PurchLeadtime" "EarliestUltdSupplyDate" "Supersedes" "SupplyCode" "TypeCode" "CustomsStatNo" "TypeDesignation" "ZeroCostFlag" "AvailActivityStatus" "EngAttribute" "ShortageFlag" "ForecastConsumptionFlag" "StockManagement" "IntrastatConvFactor" "PartCostGroupId" "DopConnection" "StdNameId" "InventoryValuationMethod" "NegativeOnHand" "TechnicalCoordinatorId" "InvoiceConsideration" "MaxActualCostUpdate" "CustWarrantyId" "SupWarrantyId" "RegionOfOrigin" "InventoryPartCostLevel" "ExtServiceCostMethod" "SupplyChainPartGroup" "AutomaticCapabilityCheck" "InputUnitMeasGroupId" "DopNetting" "CoReserveOnhAnalysFlag" "QtyCalcRounding" "LifecycleStage" "LifeStageLockedUntil" "FrequencyClass" "FreqClassLockedUntil" "MinDurabDaysCoDeliv" "MinDurabDaysPlanning" "StandardPutawayQty" "PutawayZoneRefillOption" "ResetConfigStdCost" "MandatoryExpirationDate" "ExclShipPackProposal" "Company" "StatisticalCode" "AcquisitionOrigin" "AcquisitionReasonId" "HsnSacCode" "ProductCategoryId" "PartDescriptionInUse" "UnitOfMeasureDescription" "CatchUnitMeasDescription" "InputUnitDescription" "PrimeCommodityGrpDescription" "SecondCommodityGrpDescription" "SafetyInstructionDescription" "AccountingGroupDescription" "ProductCodeDescription" "ProductFamilyDescription" "NetWeight" "WeightUom" "NetVolume" "VolumeUom" "OnHandQty" "OnHandCatchQty" "UnlimitedPurchSupplyDate" "UnlimitedManufSupplyDate" "UnlimitedExpectedSupplyDate" "SupersededByPart" "DurabilityWeeks" "SupplyTypeDb" "EnabledLccParams" "MultiSitePlannedPart" "CustWarranty" "SupWarranty" "PartCatalogPartDescription" "PartCatalogBasePartDescription" "GTIN" "GTINSeries" "OperativeValue" "OperativeValueSource" "CountryCode" "DocumentTextExist" "NoteTextExist" "UsePartcaDescInventDb" "DefaultQtyCalcRound" "PartCatalogStandardName" "AnyForecastPartExists" "AllForecastPartsExist" "HsnSacCodeDescription" "ProductCategoryDesc" "SupersedesStartDate" "SupersedesEndDate" "CPpvStatus" "CMrpToDop" "CNextLineItemNo" "CNextOperationNo" "CSfShipmentBoat" "CSfAssemblyBoat" "StructureUpdate" "RoutingUpdate"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "AbcClassRef" "PartCostGroupRef" "SiteInventInfoRef" "PartCatalogRef" "ContractRef" "PlannerBuyerRef" "InventoryUomRef" "CatchUnitMeasRef" "InputUnitMeasGroupIdRef" "PrimeCommodityRef" "SecondCommodityRef" "AssetClassRef" "PartStatusRef" "HazardCodeRef" "AccountingGroupRef" "PartProductCodeRef" "PartProductFamilyRef" "SupersedesRef" "SupersededByPartRef" "CountryOfOriginRef" "RegionOfOriginRef" "CustomsStatNoRef" "SupplyChainPartGroupRef" "TechnicalCoordinatorIdRef" "CustWarrantyIdRef" "StdNameIdRef" "EngAttributeRef" "StatisticalCodeRef" "AcquisitionReasonIdRef" "AcquisitionOriginRef" "HsnSacCodeRef" "ProductCategoryIdRef" "CPpvStatusRef" "CSfShipmentBoatRef" "CSfAssemblyBoatRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type ManufPartAttribute
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/ManufPartAttributeArray(Contract='{ManufPartAttributeArray_Contract}',PartNo='{ManufPartAttributeArray_PartNo}')

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
"CumLeadtime": 1,
"OrderGapTime": 1,
"Density": 1,
"LowLevel": 1,
"DefaultPrintUnit": "It is a Text",
"ProcessType": "It is a Text",
"ManufEngineer": "It is a Text",
"FixedLeadtimeDay": 1,
"VariableLeadtimeDay": 1,
"FixedLeadtimeHour": 1,
"VariableLeadtimeHour": 1,
"LotBatchString": "It is a Text",
"MrpControlFlag": true,
"ProdPartAsSupplyInMrp": true,
"CloseTolerance": 1,
"UseTheoriticalDensity": true,
"OverReportTolerance": 1,
"IssuePlannedScrap": true,
"ComponentScrap": 1,
"ShrinkageFactor": 1,
"UnprotectedLeadTime": 1,
"AdjustOnOpQtyDeviation": true,
"IssueOverreportedQty": true,
"CreatedFromContract": "It is a Text",
"CreatedFromPartNo": "It is a Text",
"CreatedFromConfigId": "It is a Text",
"PlanManufSupOnDueDate": true,
"RunMrp": true,
"RunCrp": true,
"IncludeFirmDemands": true,
"IncludeFirmSupplies": true,
"OptimizeNewDeliveryDate": true,
"RunInBackground": true,
"ShipDirty": true,
"ShipDirtyRepairCode": "It is a Text",
"AutoReplaceAltComp": true,
"ConsiderLeadTime": true,
"NbTrolleysForKit": 1,
"OperativeValue": "It is a Text",
"Uom": "It is a Text",
"OperativeValueSource": "It is a Text",
"OldDensityValue": 1,
"SerialTrackingCodeDb": "It is a Text",
"BackflushPart": "AllLocations",
"EngineeringInfo": "NotMandatory",
"StructureEffectivity": "Date",
"RoutingEffectivity": "Date",
"PromisePlanned": "Promised",
"ConfigurationUsage": "Common",
"LeadtimeSource": "Manufacturing",
"OverhaulScrapRule": "DirectScrap",
"DopPeggedSoUpdateFlag": "Planned",
"IssueType": "Reserve",
"OverReporting": "Allowed",
"AutomaticCapabilityCheck": "ReserveAndAllocate",
"PartType": "Manufactured"
}
Update entity in ManufPartAttributeArray
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
ManufPartAttributeArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

ManufPartAttributeArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AccountingGroup" "AssetClass" "CountryOfOrigin" "HazardCode" "NoteId" "PartProductCode" "PartProductFamily" "PartStatus" "PlannerBuyer" "PrimeCommodity" "SecondCommodity" "UnitMeas" "CatchUnitMeas" "Description" "DescriptionCopy" "AbcClass" "AbcClassLockedUntil" "CountVariance" "CreateDate" "CycleCode" "CyclePeriod" "DimQuality" "DurabilityDay" "ExpectedLeadtime" "LastActivityDate" "LeadTimeCode" "ManufLeadtime" "NoteText" "OeAllocAssignFlag" "OnhandAnalysisFlag" "PurchLeadtime" "EarliestUltdSupplyDate" "Supersedes" "SupplyCode" "TypeCode" "CustomsStatNo" "TypeDesignation" "ZeroCostFlag" "AvailActivityStatus" "EngAttribute" "ShortageFlag" "ForecastConsumptionFlag" "StockManagement" "IntrastatConvFactor" "PartCostGroupId" "DopConnection" "StdNameId" "InventoryValuationMethod" "NegativeOnHand" "TechnicalCoordinatorId" "InvoiceConsideration" "MaxActualCostUpdate" "CustWarrantyId" "SupWarrantyId" "RegionOfOrigin" "InventoryPartCostLevel" "ExtServiceCostMethod" "SupplyChainPartGroup" "AutomaticCapabilityCheck" "InputUnitMeasGroupId" "DopNetting" "CoReserveOnhAnalysFlag" "QtyCalcRounding" "LifecycleStage" "LifeStageLockedUntil" "FrequencyClass" "FreqClassLockedUntil" "MinDurabDaysCoDeliv" "MinDurabDaysPlanning" "StandardPutawayQty" "PutawayZoneRefillOption" "ResetConfigStdCost" "MandatoryExpirationDate" "ExclShipPackProposal" "Company" "StatisticalCode" "AcquisitionOrigin" "AcquisitionReasonId" "HsnSacCode" "ProductCategoryId" "PartDescriptionInUse" "UnitOfMeasureDescription" "CatchUnitMeasDescription" "InputUnitDescription" "PrimeCommodityGrpDescription" "SecondCommodityGrpDescription" "SafetyInstructionDescription" "AccountingGroupDescription" "ProductCodeDescription" "ProductFamilyDescription" "NetWeight" "WeightUom" "NetVolume" "VolumeUom" "OnHandQty" "OnHandCatchQty" "UnlimitedPurchSupplyDate" "UnlimitedManufSupplyDate" "UnlimitedExpectedSupplyDate" "SupersededByPart" "DurabilityWeeks" "SupplyTypeDb" "EnabledLccParams" "MultiSitePlannedPart" "CustWarranty" "SupWarranty" "PartCatalogPartDescription" "PartCatalogBasePartDescription" "GTIN" "GTINSeries" "OperativeValue" "OperativeValueSource" "CountryCode" "DocumentTextExist" "NoteTextExist" "UsePartcaDescInventDb" "DefaultQtyCalcRound" "PartCatalogStandardName" "AnyForecastPartExists" "AllForecastPartsExist" "HsnSacCodeDescription" "ProductCategoryDesc" "SupersedesStartDate" "SupersedesEndDate" "CPpvStatus" "CMrpToDop" "CNextLineItemNo" "CNextOperationNo" "CSfShipmentBoat" "CSfAssemblyBoat" "StructureUpdate" "RoutingUpdate"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type ManufPartAttribute

CumLeadtime
required
number
OrderGapTime
required
number
Density	
number
BackflushPart
required
string (BackflushPart_Enumeration)
Enum: "AllLocations" "OnlyFloorStock" "OnlySpecifiedLocation"
EngineeringInfo
required
string (EngineeringInfo_Enumeration)
Enum: "NotMandatory" "Mandatory"
StructureEffectivity
required
string (EffectivityControl_Enumeration)
Enum: "Date" "Serial"
RoutingEffectivity
required
string (EffectivityControl_Enumeration)
Enum: "Date" "Serial"
PromisePlanned
required
string (PromisePlanned_Enumeration)
Enum: "Promised" "NotPromised"
DefaultPrintUnit
required
string <= 10 characters
ProcessType	
string <= 6 characters
ConfigurationUsage
required
string (ConfigurationUsage_Enumeration)
Enum: "Common" "Variant" "Option"
ManufEngineer	
string <= 20 characters
FixedLeadtimeDay
required
number
VariableLeadtimeDay
required
number
FixedLeadtimeHour
required
number
VariableLeadtimeHour
required
number
LeadtimeSource	
string (LeadtimeSource_Enumeration)
Enum: "Manufacturing" "Repair" "Prototype" "Disassembly" "Remanufacturing" "MroDisassembly" "MroAssembly" "Disposition" "Manual"
LotBatchString	
string <= 10 characters
OverhaulScrapRule
required
string (OverhaulScrapRule_Enumeration)
Enum: "DirectScrap" "MRBScrap"
DopPeggedSoUpdateFlag
required
string (DopPeggedSoUpdateFlag_Enumeration)
Enum: "Planned" "Parked" "Released" "Reserved" "Started"
MrpControlFlag
required
boolean
ProdPartAsSupplyInMrp
required
boolean
CloseTolerance
required
number
UseTheoriticalDensity
required
boolean
IssueType
required
string (BackflushRestrictionType_Enumeration)
Enum: "Reserve" "Backflush" "ReserveAndBackflush" "Manual"
OverReporting
required
string (OperOverReportType_Enumeration)
Enum: "Allowed" "AllowedWarning" "NotAllowed"
OverReportTolerance	
number
IssuePlannedScrap
required
boolean
ComponentScrap
required
number
ShrinkageFactor
required
number
UnprotectedLeadTime
required
number
AdjustOnOpQtyDeviation
required
boolean
IssueOverreportedQty
required
boolean
PlanManufSupOnDueDate
required
boolean
RunMrp
required
boolean
RunCrp
required
boolean
IncludeFirmDemands
required
boolean
IncludeFirmSupplies
required
boolean
OptimizeNewDeliveryDate
required
boolean
RunInBackground
required
boolean
ShipDirty
required
boolean
ShipDirtyRepairCode	
string <= 10 characters
AutoReplaceAltComp
required
boolean
ConsiderLeadTime
required
boolean
NbTrolleysForKit	
number
OperativeValue	
string <= 4000 characters
Uom	
string <= 4000 characters
OperativeValueSource	
string <= 4000 characters
OldDensityValue	
number
AutomaticCapabilityCheck	
string (CapabilityCheckAllocate_Enumeration)
Enum: "ReserveAndAllocate" "AllocateOnly" "NeitherReserveNorAlloc" "NoAutomatCapabilityCheck"
PartType	
string (InventoryPartType_Enumeration)
Enum: "Manufactured" "ManufacturedRecipe" "Remanufactured" "PurchasedRaw" "Purchased" "Expense" "DisassemblyComponent" "ByProduct"
SerialTrackingCodeDb	
string <= 4000 characters
Responses
200 response body for entity type ManufPartAttribute
201 response body for entity type ManufPartAttribute
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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/ManufPartAttributeArray(Contract='{ManufPartAttributeArray_Contract}',PartNo='{ManufPartAttributeArray_PartNo}')

Request samples
Payload
Content type
application/json

Copy
{
"CumLeadtime": 1,
"OrderGapTime": 1,
"Density": 1,
"BackflushPart": "AllLocations",
"EngineeringInfo": "NotMandatory",
"StructureEffectivity": "Date",
"RoutingEffectivity": "Date",
"PromisePlanned": "Promised",
"DefaultPrintUnit": "It is a Text",
"ProcessType": "It is a Text",
"ConfigurationUsage": "Common",
"ManufEngineer": "It is a Text",
"FixedLeadtimeDay": 1,
"VariableLeadtimeDay": 1,
"FixedLeadtimeHour": 1,
"VariableLeadtimeHour": 1,
"LeadtimeSource": "Manufacturing",
"LotBatchString": "It is a Text",
"OverhaulScrapRule": "DirectScrap",
"DopPeggedSoUpdateFlag": "Planned",
"MrpControlFlag": true,
"ProdPartAsSupplyInMrp": true,
"CloseTolerance": 1,
"UseTheoriticalDensity": true,
"IssueType": "Reserve",
"OverReporting": "Allowed",
"OverReportTolerance": 1,
"IssuePlannedScrap": true,
"ComponentScrap": 1,
"ShrinkageFactor": 1,
"UnprotectedLeadTime": 1,
"AdjustOnOpQtyDeviation": true,
"IssueOverreportedQty": true,
"PlanManufSupOnDueDate": true,
"RunMrp": true,
"RunCrp": true,
"IncludeFirmDemands": true,
"IncludeFirmSupplies": true,
"OptimizeNewDeliveryDate": true,
"RunInBackground": true,
"ShipDirty": true,
"ShipDirtyRepairCode": "It is a Text",
"AutoReplaceAltComp": true,
"ConsiderLeadTime": true,
"NbTrolleysForKit": 1,
"OperativeValue": "It is a Text",
"Uom": "It is a Text",
"OperativeValueSource": "It is a Text",
"OldDensityValue": 1,
"AutomaticCapabilityCheck": "ReserveAndAllocate",
"PartType": "Manufactured",
"SerialTrackingCodeDb": "It is a Text"
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
"CumLeadtime": 1,
"OrderGapTime": 1,
"Density": 1,
"LowLevel": 1,
"DefaultPrintUnit": "It is a Text",
"ProcessType": "It is a Text",
"ManufEngineer": "It is a Text",
"FixedLeadtimeDay": 1,
"VariableLeadtimeDay": 1,
"FixedLeadtimeHour": 1,
"VariableLeadtimeHour": 1,
"LotBatchString": "It is a Text",
"MrpControlFlag": true,
"ProdPartAsSupplyInMrp": true,
"CloseTolerance": 1,
"UseTheoriticalDensity": true,
"OverReportTolerance": 1,
"IssuePlannedScrap": true,
"ComponentScrap": 1,
"ShrinkageFactor": 1,
"UnprotectedLeadTime": 1,
"AdjustOnOpQtyDeviation": true,
"IssueOverreportedQty": true,
"CreatedFromContract": "It is a Text",
"CreatedFromPartNo": "It is a Text",
"CreatedFromConfigId": "It is a Text",
"PlanManufSupOnDueDate": true,
"RunMrp": true,
"RunCrp": true,
"IncludeFirmDemands": true,
"IncludeFirmSupplies": true,
"OptimizeNewDeliveryDate": true,
"RunInBackground": true,
"ShipDirty": true,
"ShipDirtyRepairCode": "It is a Text",
"AutoReplaceAltComp": true,
"ConsiderLeadTime": true,
"NbTrolleysForKit": 1,
"OperativeValue": "It is a Text",
"Uom": "It is a Text",
"OperativeValueSource": "It is a Text",
"OldDensityValue": 1,
"SerialTrackingCodeDb": "It is a Text",
"BackflushPart": "AllLocations",
"EngineeringInfo": "NotMandatory",
"StructureEffectivity": "Date",
"RoutingEffectivity": "Date",
"PromisePlanned": "Promised",
"ConfigurationUsage": "Common",
"LeadtimeSource": "Manufacturing",
"OverhaulScrapRule": "DirectScrap",
"DopPeggedSoUpdateFlag": "Planned",
"IssueType": "Reserve",
"OverReporting": "Allowed",
"AutomaticCapabilityCheck": "ReserveAndAllocate",
"PartType": "Manufactured"
}
Get entities from ProcessTypeRef
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
ManufPartAttributeArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

ManufPartAttributeArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

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
Items Enum: "Objstate" "Objstate desc" "ProcessType" "ProcessType desc" "Description" "Description desc" "UseManufCalendar" "UseManufCalendar desc" "UseReqDateReserve" "UseReqDateReserve desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ProcessType" "Description" "UseManufCalendar" "UseReqDateReserve"
Specify properties to return, see OData Select

Responses
200 response body for entity array ShopOrderProcessType
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/ManufPartAttributeArray(Contract='{ManufPartAttributeArray_Contract}',PartNo='{ManufPartAttributeArray_PartNo}')/ProcessTypeRef

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
Get entities from DefaultPrintUnitRef
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
ManufPartAttributeArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

ManufPartAttributeArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/ManufPartAttributeArray(Contract='{ManufPartAttributeArray_Contract}',PartNo='{ManufPartAttributeArray_PartNo}')/DefaultPrintUnitRef

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
Get entities from ManufEngineerRef
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
ManufPartAttributeArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

ManufPartAttributeArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

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
Items Enum: "Objstate" "Objstate desc" "ManufEngineerCode" "ManufEngineerCode desc" "ManufEngineerName" "ManufEngineerName desc" "ManufEngineerExtension" "ManufEngineerExtension desc" "ManufEngineerTitle" "ManufEngineerTitle desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ManufEngineerCode" "ManufEngineerName" "ManufEngineerExtension" "ManufEngineerTitle"
Specify properties to return, see OData Select

Responses
200 response body for entity array ManufEngineer
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/ManufPartAttributeArray(Contract='{ManufPartAttributeArray_Contract}',PartNo='{ManufPartAttributeArray_PartNo}')/ManufEngineerRef

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
Get entities from ShipDirtyRepairCodeRef
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
ManufPartAttributeArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

ManufPartAttributeArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "RepairCode" "RepairCode desc" "RepairDescription" "RepairDescription desc" "NoteId" "NoteId desc" "NoteText" "NoteText desc" "MroPreferredSupplier" "MroPreferredSupplier desc" "MroServiceSource" "MroServiceSource desc" "ServiceType" "ServiceType desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "RepairCode" "RepairDescription" "NoteId" "NoteText" "MroPreferredSupplier" "MroServiceSource" "ServiceType"
Specify properties to return, see OData Select

Responses
200 response body for entity array RepairCodePart
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/ManufPartAttributeArray(Contract='{ManufPartAttributeArray_Contract}',PartNo='{ManufPartAttributeArray_PartNo}')/ShipDirtyRepairCodeRef

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
Get entities from InventoryPartCharacteristicArray
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "CharacteristicCode" "CharacteristicCode desc" "UnitMeas" "UnitMeas desc" "AttrValueNumeric" "AttrValueNumeric desc" "AttrValueAlpha" "AttrValueAlpha desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "CharacteristicCode" "UnitMeas" "AttrValueNumeric" "AttrValueAlpha"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "CharacteristicRef" "AttrValueNumericRef" "AttrValueAlphaRef" "UnitMeasRef"
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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/InventoryPartCharacteristicArray

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
Add new entity to InventoryPartCharacteristicArray
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
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AccountingGroup" "AssetClass" "CountryOfOrigin" "HazardCode" "NoteId" "PartProductCode" "PartProductFamily" "PartStatus" "PlannerBuyer" "PrimeCommodity" "SecondCommodity" "UnitMeas" "CatchUnitMeas" "Description" "DescriptionCopy" "AbcClass" "AbcClassLockedUntil" "CountVariance" "CreateDate" "CycleCode" "CyclePeriod" "DimQuality" "DurabilityDay" "ExpectedLeadtime" "LastActivityDate" "LeadTimeCode" "ManufLeadtime" "NoteText" "OeAllocAssignFlag" "OnhandAnalysisFlag" "PurchLeadtime" "EarliestUltdSupplyDate" "Supersedes" "SupplyCode" "TypeCode" "CustomsStatNo" "TypeDesignation" "ZeroCostFlag" "AvailActivityStatus" "EngAttribute" "ShortageFlag" "ForecastConsumptionFlag" "StockManagement" "IntrastatConvFactor" "PartCostGroupId" "DopConnection" "StdNameId" "InventoryValuationMethod" "NegativeOnHand" "TechnicalCoordinatorId" "InvoiceConsideration" "MaxActualCostUpdate" "CustWarrantyId" "SupWarrantyId" "RegionOfOrigin" "InventoryPartCostLevel" "ExtServiceCostMethod" "SupplyChainPartGroup" "AutomaticCapabilityCheck" "InputUnitMeasGroupId" "DopNetting" "CoReserveOnhAnalysFlag" "QtyCalcRounding" "LifecycleStage" "LifeStageLockedUntil" "FrequencyClass" "FreqClassLockedUntil" "MinDurabDaysCoDeliv" "MinDurabDaysPlanning" "StandardPutawayQty" "PutawayZoneRefillOption" "ResetConfigStdCost" "MandatoryExpirationDate" "ExclShipPackProposal" "Company" "StatisticalCode" "AcquisitionOrigin" "AcquisitionReasonId" "HsnSacCode" "ProductCategoryId" "PartDescriptionInUse" "UnitOfMeasureDescription" "CatchUnitMeasDescription" "InputUnitDescription" "PrimeCommodityGrpDescription" "SecondCommodityGrpDescription" "SafetyInstructionDescription" "AccountingGroupDescription" "ProductCodeDescription" "ProductFamilyDescription" "NetWeight" "WeightUom" "NetVolume" "VolumeUom" "OnHandQty" "OnHandCatchQty" "UnlimitedPurchSupplyDate" "UnlimitedManufSupplyDate" "UnlimitedExpectedSupplyDate" "SupersededByPart" "DurabilityWeeks" "SupplyTypeDb" "EnabledLccParams" "MultiSitePlannedPart" "CustWarranty" "SupWarranty" "PartCatalogPartDescription" "PartCatalogBasePartDescription" "GTIN" "GTINSeries" "OperativeValue" "OperativeValueSource" "CountryCode" "DocumentTextExist" "NoteTextExist" "UsePartcaDescInventDb" "DefaultQtyCalcRound" "PartCatalogStandardName" "AnyForecastPartExists" "AllForecastPartsExist" "HsnSacCodeDescription" "ProductCategoryDesc" "SupersedesStartDate" "SupersedesEndDate" "CPpvStatus" "CMrpToDop" "CNextLineItemNo" "CNextOperationNo" "CSfShipmentBoat" "CSfAssemblyBoat" "StructureUpdate" "RoutingUpdate"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type InventoryPartChar

Contract
required
string <= 5 characters
PartNo
required
string <= 25 characters
CharacteristicCode
required
string <= 5 characters
UnitMeas	
string <= 10 characters
AttrValueNumeric	
number
AttrValueAlpha	
string <= 60 characters
Responses
201 response body for entity type InventoryPartChar
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/InventoryPartCharacteristicArray

Request samples
Payload
Content type
application/json

Copy
{
"Contract": "It is a Text",
"PartNo": "It is a Text",
"CharacteristicCode": "It is a Text",
"UnitMeas": "It is a Text",
"AttrValueNumeric": 1,
"AttrValueAlpha": "It is a Text"
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
"CharacteristicCode": "It is a Text",
"UnitMeas": "It is a Text",
"AttrValueNumeric": 1,
"AttrValueAlpha": "It is a Text"
}
Get entity from InventoryPartCharacteristicArray by key
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
InventoryPartCharacteristicArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

InventoryPartCharacteristicArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

InventoryPartCharacteristicArray_CharacteristicCode
required
string <= 5 characters
Example: It is a Text
key: CharacteristicCode

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AccountingGroup" "AssetClass" "CountryOfOrigin" "HazardCode" "NoteId" "PartProductCode" "PartProductFamily" "PartStatus" "PlannerBuyer" "PrimeCommodity" "SecondCommodity" "UnitMeas" "CatchUnitMeas" "Description" "DescriptionCopy" "AbcClass" "AbcClassLockedUntil" "CountVariance" "CreateDate" "CycleCode" "CyclePeriod" "DimQuality" "DurabilityDay" "ExpectedLeadtime" "LastActivityDate" "LeadTimeCode" "ManufLeadtime" "NoteText" "OeAllocAssignFlag" "OnhandAnalysisFlag" "PurchLeadtime" "EarliestUltdSupplyDate" "Supersedes" "SupplyCode" "TypeCode" "CustomsStatNo" "TypeDesignation" "ZeroCostFlag" "AvailActivityStatus" "EngAttribute" "ShortageFlag" "ForecastConsumptionFlag" "StockManagement" "IntrastatConvFactor" "PartCostGroupId" "DopConnection" "StdNameId" "InventoryValuationMethod" "NegativeOnHand" "TechnicalCoordinatorId" "InvoiceConsideration" "MaxActualCostUpdate" "CustWarrantyId" "SupWarrantyId" "RegionOfOrigin" "InventoryPartCostLevel" "ExtServiceCostMethod" "SupplyChainPartGroup" "AutomaticCapabilityCheck" "InputUnitMeasGroupId" "DopNetting" "CoReserveOnhAnalysFlag" "QtyCalcRounding" "LifecycleStage" "LifeStageLockedUntil" "FrequencyClass" "FreqClassLockedUntil" "MinDurabDaysCoDeliv" "MinDurabDaysPlanning" "StandardPutawayQty" "PutawayZoneRefillOption" "ResetConfigStdCost" "MandatoryExpirationDate" "ExclShipPackProposal" "Company" "StatisticalCode" "AcquisitionOrigin" "AcquisitionReasonId" "HsnSacCode" "ProductCategoryId" "PartDescriptionInUse" "UnitOfMeasureDescription" "CatchUnitMeasDescription" "InputUnitDescription" "PrimeCommodityGrpDescription" "SecondCommodityGrpDescription" "SafetyInstructionDescription" "AccountingGroupDescription" "ProductCodeDescription" "ProductFamilyDescription" "NetWeight" "WeightUom" "NetVolume" "VolumeUom" "OnHandQty" "OnHandCatchQty" "UnlimitedPurchSupplyDate" "UnlimitedManufSupplyDate" "UnlimitedExpectedSupplyDate" "SupersededByPart" "DurabilityWeeks" "SupplyTypeDb" "EnabledLccParams" "MultiSitePlannedPart" "CustWarranty" "SupWarranty" "PartCatalogPartDescription" "PartCatalogBasePartDescription" "GTIN" "GTINSeries" "OperativeValue" "OperativeValueSource" "CountryCode" "DocumentTextExist" "NoteTextExist" "UsePartcaDescInventDb" "DefaultQtyCalcRound" "PartCatalogStandardName" "AnyForecastPartExists" "AllForecastPartsExist" "HsnSacCodeDescription" "ProductCategoryDesc" "SupersedesStartDate" "SupersedesEndDate" "CPpvStatus" "CMrpToDop" "CNextLineItemNo" "CNextOperationNo" "CSfShipmentBoat" "CSfAssemblyBoat" "StructureUpdate" "RoutingUpdate"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "AbcClassRef" "PartCostGroupRef" "SiteInventInfoRef" "PartCatalogRef" "ContractRef" "PlannerBuyerRef" "InventoryUomRef" "CatchUnitMeasRef" "InputUnitMeasGroupIdRef" "PrimeCommodityRef" "SecondCommodityRef" "AssetClassRef" "PartStatusRef" "HazardCodeRef" "AccountingGroupRef" "PartProductCodeRef" "PartProductFamilyRef" "SupersedesRef" "SupersededByPartRef" "CountryOfOriginRef" "RegionOfOriginRef" "CustomsStatNoRef" "SupplyChainPartGroupRef" "TechnicalCoordinatorIdRef" "CustWarrantyIdRef" "StdNameIdRef" "EngAttributeRef" "StatisticalCodeRef" "AcquisitionReasonIdRef" "AcquisitionOriginRef" "HsnSacCodeRef" "ProductCategoryIdRef" "CPpvStatusRef" "CSfShipmentBoatRef" "CSfAssemblyBoatRef"
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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/InventoryPartCharacteristicArray(Contract='{InventoryPartCharacteristicArray_Contract}',PartNo='{InventoryPartCharacteristicArray_PartNo}',CharacteristicCode='{InventoryPartCharacteristicArray_CharacteristicCode}')

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
"AttrValueNumeric": 1,
"AttrValueAlpha": "It is a Text"
}
Delete entity from InventoryPartCharacteristicArray
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
InventoryPartCharacteristicArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

InventoryPartCharacteristicArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

InventoryPartCharacteristicArray_CharacteristicCode
required
string <= 5 characters
Example: It is a Text
key: CharacteristicCode

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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/InventoryPartCharacteristicArray(Contract='{InventoryPartCharacteristicArray_Contract}',PartNo='{InventoryPartCharacteristicArray_PartNo}',CharacteristicCode='{InventoryPartCharacteristicArray_CharacteristicCode}')

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
Update entity in InventoryPartCharacteristicArray
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
InventoryPartCharacteristicArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

InventoryPartCharacteristicArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

InventoryPartCharacteristicArray_CharacteristicCode
required
string <= 5 characters
Example: It is a Text
key: CharacteristicCode

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AccountingGroup" "AssetClass" "CountryOfOrigin" "HazardCode" "NoteId" "PartProductCode" "PartProductFamily" "PartStatus" "PlannerBuyer" "PrimeCommodity" "SecondCommodity" "UnitMeas" "CatchUnitMeas" "Description" "DescriptionCopy" "AbcClass" "AbcClassLockedUntil" "CountVariance" "CreateDate" "CycleCode" "CyclePeriod" "DimQuality" "DurabilityDay" "ExpectedLeadtime" "LastActivityDate" "LeadTimeCode" "ManufLeadtime" "NoteText" "OeAllocAssignFlag" "OnhandAnalysisFlag" "PurchLeadtime" "EarliestUltdSupplyDate" "Supersedes" "SupplyCode" "TypeCode" "CustomsStatNo" "TypeDesignation" "ZeroCostFlag" "AvailActivityStatus" "EngAttribute" "ShortageFlag" "ForecastConsumptionFlag" "StockManagement" "IntrastatConvFactor" "PartCostGroupId" "DopConnection" "StdNameId" "InventoryValuationMethod" "NegativeOnHand" "TechnicalCoordinatorId" "InvoiceConsideration" "MaxActualCostUpdate" "CustWarrantyId" "SupWarrantyId" "RegionOfOrigin" "InventoryPartCostLevel" "ExtServiceCostMethod" "SupplyChainPartGroup" "AutomaticCapabilityCheck" "InputUnitMeasGroupId" "DopNetting" "CoReserveOnhAnalysFlag" "QtyCalcRounding" "LifecycleStage" "LifeStageLockedUntil" "FrequencyClass" "FreqClassLockedUntil" "MinDurabDaysCoDeliv" "MinDurabDaysPlanning" "StandardPutawayQty" "PutawayZoneRefillOption" "ResetConfigStdCost" "MandatoryExpirationDate" "ExclShipPackProposal" "Company" "StatisticalCode" "AcquisitionOrigin" "AcquisitionReasonId" "HsnSacCode" "ProductCategoryId" "PartDescriptionInUse" "UnitOfMeasureDescription" "CatchUnitMeasDescription" "InputUnitDescription" "PrimeCommodityGrpDescription" "SecondCommodityGrpDescription" "SafetyInstructionDescription" "AccountingGroupDescription" "ProductCodeDescription" "ProductFamilyDescription" "NetWeight" "WeightUom" "NetVolume" "VolumeUom" "OnHandQty" "OnHandCatchQty" "UnlimitedPurchSupplyDate" "UnlimitedManufSupplyDate" "UnlimitedExpectedSupplyDate" "SupersededByPart" "DurabilityWeeks" "SupplyTypeDb" "EnabledLccParams" "MultiSitePlannedPart" "CustWarranty" "SupWarranty" "PartCatalogPartDescription" "PartCatalogBasePartDescription" "GTIN" "GTINSeries" "OperativeValue" "OperativeValueSource" "CountryCode" "DocumentTextExist" "NoteTextExist" "UsePartcaDescInventDb" "DefaultQtyCalcRound" "PartCatalogStandardName" "AnyForecastPartExists" "AllForecastPartsExist" "HsnSacCodeDescription" "ProductCategoryDesc" "SupersedesStartDate" "SupersedesEndDate" "CPpvStatus" "CMrpToDop" "CNextLineItemNo" "CNextOperationNo" "CSfShipmentBoat" "CSfAssemblyBoat" "StructureUpdate" "RoutingUpdate"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type InventoryPartChar

UnitMeas	
string <= 10 characters
AttrValueNumeric	
number
AttrValueAlpha	
string <= 60 characters
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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/InventoryPartCharacteristicArray(Contract='{InventoryPartCharacteristicArray_Contract}',PartNo='{InventoryPartCharacteristicArray_PartNo}',CharacteristicCode='{InventoryPartCharacteristicArray_CharacteristicCode}')

Request samples
Payload
Content type
application/json

Copy
{
"UnitMeas": "It is a Text",
"AttrValueNumeric": 1,
"AttrValueAlpha": "It is a Text"
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
"AttrValueNumeric": 1,
"AttrValueAlpha": "It is a Text"
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
InventoryPartCharacteristicArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

InventoryPartCharacteristicArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

InventoryPartCharacteristicArray_CharacteristicCode
required
string <= 5 characters
Example: It is a Text
key: CharacteristicCode

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
Items Enum: "CharacteristicCode" "CharacteristicCode desc" "Description" "Description desc" "SearchType" "SearchType desc" "SearchTypeDb" "SearchTypeDb desc" "CharType" "CharType desc" "CharTypeDb" "CharTypeDb desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CharacteristicCode" "Description" "SearchType" "SearchTypeDb" "CharType" "CharTypeDb"
Specify properties to return, see OData Select

Responses
200 response body for entity array CharacteristicLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/InventoryPartCharacteristicArray(Contract='{InventoryPartCharacteristicArray_Contract}',PartNo='{InventoryPartCharacteristicArray_PartNo}',CharacteristicCode='{InventoryPartCharacteristicArray_CharacteristicCode}')/CharacteristicRef

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
InventoryPartCharacteristicArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

InventoryPartCharacteristicArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

InventoryPartCharacteristicArray_CharacteristicCode
required
string <= 5 characters
Example: It is a Text
key: CharacteristicCode

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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/InventoryPartCharacteristicArray(Contract='{InventoryPartCharacteristicArray_Contract}',PartNo='{InventoryPartCharacteristicArray_PartNo}',CharacteristicCode='{InventoryPartCharacteristicArray_CharacteristicCode}')/AttrValueNumericRef

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
InventoryPartCharacteristicArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

InventoryPartCharacteristicArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

InventoryPartCharacteristicArray_CharacteristicCode
required
string <= 5 characters
Example: It is a Text
key: CharacteristicCode

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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/InventoryPartCharacteristicArray(Contract='{InventoryPartCharacteristicArray_Contract}',PartNo='{InventoryPartCharacteristicArray_PartNo}',CharacteristicCode='{InventoryPartCharacteristicArray_CharacteristicCode}')/AttrValueAlphaRef

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
InventoryPartCharacteristicArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

InventoryPartCharacteristicArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

InventoryPartCharacteristicArray_CharacteristicCode
required
string <= 5 characters
Example: It is a Text
key: CharacteristicCode

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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/InventoryPartCharacteristicArray(Contract='{InventoryPartCharacteristicArray_Contract}',PartNo='{InventoryPartCharacteristicArray_PartNo}',CharacteristicCode='{InventoryPartCharacteristicArray_CharacteristicCode}')/UnitMeasRef

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
Get entities from MaterialPriceElementArray
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "PriceElementLineNo" "PriceElementLineNo desc" "PriceElementId" "PriceElementId desc" "ShareAmount" "ShareAmount desc" "UnitMeasure" "UnitMeasure desc" "Surcharge" "Surcharge desc" "ValidFrom" "ValidFrom desc" "ValidTo" "ValidTo desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "PriceElementLineNo" "PriceElementId" "ShareAmount" "UnitMeasure" "Surcharge" "ValidFrom" "ValidTo"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "PriceElementIdRef" "UnitMeasureRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array InventoryMaterialPriceElement
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/MaterialPriceElementArray

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
Add new entity to MaterialPriceElementArray
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
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AccountingGroup" "AssetClass" "CountryOfOrigin" "HazardCode" "NoteId" "PartProductCode" "PartProductFamily" "PartStatus" "PlannerBuyer" "PrimeCommodity" "SecondCommodity" "UnitMeas" "CatchUnitMeas" "Description" "DescriptionCopy" "AbcClass" "AbcClassLockedUntil" "CountVariance" "CreateDate" "CycleCode" "CyclePeriod" "DimQuality" "DurabilityDay" "ExpectedLeadtime" "LastActivityDate" "LeadTimeCode" "ManufLeadtime" "NoteText" "OeAllocAssignFlag" "OnhandAnalysisFlag" "PurchLeadtime" "EarliestUltdSupplyDate" "Supersedes" "SupplyCode" "TypeCode" "CustomsStatNo" "TypeDesignation" "ZeroCostFlag" "AvailActivityStatus" "EngAttribute" "ShortageFlag" "ForecastConsumptionFlag" "StockManagement" "IntrastatConvFactor" "PartCostGroupId" "DopConnection" "StdNameId" "InventoryValuationMethod" "NegativeOnHand" "TechnicalCoordinatorId" "InvoiceConsideration" "MaxActualCostUpdate" "CustWarrantyId" "SupWarrantyId" "RegionOfOrigin" "InventoryPartCostLevel" "ExtServiceCostMethod" "SupplyChainPartGroup" "AutomaticCapabilityCheck" "InputUnitMeasGroupId" "DopNetting" "CoReserveOnhAnalysFlag" "QtyCalcRounding" "LifecycleStage" "LifeStageLockedUntil" "FrequencyClass" "FreqClassLockedUntil" "MinDurabDaysCoDeliv" "MinDurabDaysPlanning" "StandardPutawayQty" "PutawayZoneRefillOption" "ResetConfigStdCost" "MandatoryExpirationDate" "ExclShipPackProposal" "Company" "StatisticalCode" "AcquisitionOrigin" "AcquisitionReasonId" "HsnSacCode" "ProductCategoryId" "PartDescriptionInUse" "UnitOfMeasureDescription" "CatchUnitMeasDescription" "InputUnitDescription" "PrimeCommodityGrpDescription" "SecondCommodityGrpDescription" "SafetyInstructionDescription" "AccountingGroupDescription" "ProductCodeDescription" "ProductFamilyDescription" "NetWeight" "WeightUom" "NetVolume" "VolumeUom" "OnHandQty" "OnHandCatchQty" "UnlimitedPurchSupplyDate" "UnlimitedManufSupplyDate" "UnlimitedExpectedSupplyDate" "SupersededByPart" "DurabilityWeeks" "SupplyTypeDb" "EnabledLccParams" "MultiSitePlannedPart" "CustWarranty" "SupWarranty" "PartCatalogPartDescription" "PartCatalogBasePartDescription" "GTIN" "GTINSeries" "OperativeValue" "OperativeValueSource" "CountryCode" "DocumentTextExist" "NoteTextExist" "UsePartcaDescInventDb" "DefaultQtyCalcRound" "PartCatalogStandardName" "AnyForecastPartExists" "AllForecastPartsExist" "HsnSacCodeDescription" "ProductCategoryDesc" "SupersedesStartDate" "SupersedesEndDate" "CPpvStatus" "CMrpToDop" "CNextLineItemNo" "CNextOperationNo" "CSfShipmentBoat" "CSfAssemblyBoat" "StructureUpdate" "RoutingUpdate"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type InventoryMaterialPriceElement

Contract
required
string <= 5 characters
PartNo
required
string <= 25 characters
PriceElementLineNo	
number
PriceElementId
required
string <= 50 characters
ShareAmount
required
number
UnitMeasure
required
string <= 30 characters
Surcharge
required
number
ValidFrom
required
string <date>
ValidTo	
string <date>
Responses
201 response body for entity type InventoryMaterialPriceElement
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/MaterialPriceElementArray

Request samples
Payload
Content type
application/json

Copy
{
"Contract": "It is a Text",
"PartNo": "It is a Text",
"PriceElementLineNo": 1,
"PriceElementId": "It is a Text",
"ShareAmount": 1,
"UnitMeasure": "It is a Text",
"Surcharge": 1,
"ValidFrom": "2019-10-10",
"ValidTo": "2019-10-10"
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
"PriceElementLineNo": 1,
"PriceElementId": "It is a Text",
"ShareAmount": 1,
"UnitMeasure": "It is a Text",
"Surcharge": 1,
"ValidFrom": "2019-10-10",
"ValidTo": "2019-10-10"
}
Get entity from MaterialPriceElementArray by key
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
MaterialPriceElementArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

MaterialPriceElementArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

MaterialPriceElementArray_PriceElementLineNo
required
number
Example: 1
key: PriceElementLineNo

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AccountingGroup" "AssetClass" "CountryOfOrigin" "HazardCode" "NoteId" "PartProductCode" "PartProductFamily" "PartStatus" "PlannerBuyer" "PrimeCommodity" "SecondCommodity" "UnitMeas" "CatchUnitMeas" "Description" "DescriptionCopy" "AbcClass" "AbcClassLockedUntil" "CountVariance" "CreateDate" "CycleCode" "CyclePeriod" "DimQuality" "DurabilityDay" "ExpectedLeadtime" "LastActivityDate" "LeadTimeCode" "ManufLeadtime" "NoteText" "OeAllocAssignFlag" "OnhandAnalysisFlag" "PurchLeadtime" "EarliestUltdSupplyDate" "Supersedes" "SupplyCode" "TypeCode" "CustomsStatNo" "TypeDesignation" "ZeroCostFlag" "AvailActivityStatus" "EngAttribute" "ShortageFlag" "ForecastConsumptionFlag" "StockManagement" "IntrastatConvFactor" "PartCostGroupId" "DopConnection" "StdNameId" "InventoryValuationMethod" "NegativeOnHand" "TechnicalCoordinatorId" "InvoiceConsideration" "MaxActualCostUpdate" "CustWarrantyId" "SupWarrantyId" "RegionOfOrigin" "InventoryPartCostLevel" "ExtServiceCostMethod" "SupplyChainPartGroup" "AutomaticCapabilityCheck" "InputUnitMeasGroupId" "DopNetting" "CoReserveOnhAnalysFlag" "QtyCalcRounding" "LifecycleStage" "LifeStageLockedUntil" "FrequencyClass" "FreqClassLockedUntil" "MinDurabDaysCoDeliv" "MinDurabDaysPlanning" "StandardPutawayQty" "PutawayZoneRefillOption" "ResetConfigStdCost" "MandatoryExpirationDate" "ExclShipPackProposal" "Company" "StatisticalCode" "AcquisitionOrigin" "AcquisitionReasonId" "HsnSacCode" "ProductCategoryId" "PartDescriptionInUse" "UnitOfMeasureDescription" "CatchUnitMeasDescription" "InputUnitDescription" "PrimeCommodityGrpDescription" "SecondCommodityGrpDescription" "SafetyInstructionDescription" "AccountingGroupDescription" "ProductCodeDescription" "ProductFamilyDescription" "NetWeight" "WeightUom" "NetVolume" "VolumeUom" "OnHandQty" "OnHandCatchQty" "UnlimitedPurchSupplyDate" "UnlimitedManufSupplyDate" "UnlimitedExpectedSupplyDate" "SupersededByPart" "DurabilityWeeks" "SupplyTypeDb" "EnabledLccParams" "MultiSitePlannedPart" "CustWarranty" "SupWarranty" "PartCatalogPartDescription" "PartCatalogBasePartDescription" "GTIN" "GTINSeries" "OperativeValue" "OperativeValueSource" "CountryCode" "DocumentTextExist" "NoteTextExist" "UsePartcaDescInventDb" "DefaultQtyCalcRound" "PartCatalogStandardName" "AnyForecastPartExists" "AllForecastPartsExist" "HsnSacCodeDescription" "ProductCategoryDesc" "SupersedesStartDate" "SupersedesEndDate" "CPpvStatus" "CMrpToDop" "CNextLineItemNo" "CNextOperationNo" "CSfShipmentBoat" "CSfAssemblyBoat" "StructureUpdate" "RoutingUpdate"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "AbcClassRef" "PartCostGroupRef" "SiteInventInfoRef" "PartCatalogRef" "ContractRef" "PlannerBuyerRef" "InventoryUomRef" "CatchUnitMeasRef" "InputUnitMeasGroupIdRef" "PrimeCommodityRef" "SecondCommodityRef" "AssetClassRef" "PartStatusRef" "HazardCodeRef" "AccountingGroupRef" "PartProductCodeRef" "PartProductFamilyRef" "SupersedesRef" "SupersededByPartRef" "CountryOfOriginRef" "RegionOfOriginRef" "CustomsStatNoRef" "SupplyChainPartGroupRef" "TechnicalCoordinatorIdRef" "CustWarrantyIdRef" "StdNameIdRef" "EngAttributeRef" "StatisticalCodeRef" "AcquisitionReasonIdRef" "AcquisitionOriginRef" "HsnSacCodeRef" "ProductCategoryIdRef" "CPpvStatusRef" "CSfShipmentBoatRef" "CSfAssemblyBoatRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type InventoryMaterialPriceElement
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/MaterialPriceElementArray(Contract='{MaterialPriceElementArray_Contract}',PartNo='{MaterialPriceElementArray_PartNo}',PriceElementLineNo={MaterialPriceElementArray_PriceElementLineNo})

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
"PriceElementLineNo": 1,
"PriceElementId": "It is a Text",
"ShareAmount": 1,
"UnitMeasure": "It is a Text",
"Surcharge": 1,
"ValidFrom": "2019-10-10",
"ValidTo": "2019-10-10"
}
Delete entity from MaterialPriceElementArray
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
MaterialPriceElementArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

MaterialPriceElementArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

MaterialPriceElementArray_PriceElementLineNo
required
number
Example: 1
key: PriceElementLineNo

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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/MaterialPriceElementArray(Contract='{MaterialPriceElementArray_Contract}',PartNo='{MaterialPriceElementArray_PartNo}',PriceElementLineNo={MaterialPriceElementArray_PriceElementLineNo})

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
Update entity in MaterialPriceElementArray
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
MaterialPriceElementArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

MaterialPriceElementArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

MaterialPriceElementArray_PriceElementLineNo
required
number
Example: 1
key: PriceElementLineNo

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AccountingGroup" "AssetClass" "CountryOfOrigin" "HazardCode" "NoteId" "PartProductCode" "PartProductFamily" "PartStatus" "PlannerBuyer" "PrimeCommodity" "SecondCommodity" "UnitMeas" "CatchUnitMeas" "Description" "DescriptionCopy" "AbcClass" "AbcClassLockedUntil" "CountVariance" "CreateDate" "CycleCode" "CyclePeriod" "DimQuality" "DurabilityDay" "ExpectedLeadtime" "LastActivityDate" "LeadTimeCode" "ManufLeadtime" "NoteText" "OeAllocAssignFlag" "OnhandAnalysisFlag" "PurchLeadtime" "EarliestUltdSupplyDate" "Supersedes" "SupplyCode" "TypeCode" "CustomsStatNo" "TypeDesignation" "ZeroCostFlag" "AvailActivityStatus" "EngAttribute" "ShortageFlag" "ForecastConsumptionFlag" "StockManagement" "IntrastatConvFactor" "PartCostGroupId" "DopConnection" "StdNameId" "InventoryValuationMethod" "NegativeOnHand" "TechnicalCoordinatorId" "InvoiceConsideration" "MaxActualCostUpdate" "CustWarrantyId" "SupWarrantyId" "RegionOfOrigin" "InventoryPartCostLevel" "ExtServiceCostMethod" "SupplyChainPartGroup" "AutomaticCapabilityCheck" "InputUnitMeasGroupId" "DopNetting" "CoReserveOnhAnalysFlag" "QtyCalcRounding" "LifecycleStage" "LifeStageLockedUntil" "FrequencyClass" "FreqClassLockedUntil" "MinDurabDaysCoDeliv" "MinDurabDaysPlanning" "StandardPutawayQty" "PutawayZoneRefillOption" "ResetConfigStdCost" "MandatoryExpirationDate" "ExclShipPackProposal" "Company" "StatisticalCode" "AcquisitionOrigin" "AcquisitionReasonId" "HsnSacCode" "ProductCategoryId" "PartDescriptionInUse" "UnitOfMeasureDescription" "CatchUnitMeasDescription" "InputUnitDescription" "PrimeCommodityGrpDescription" "SecondCommodityGrpDescription" "SafetyInstructionDescription" "AccountingGroupDescription" "ProductCodeDescription" "ProductFamilyDescription" "NetWeight" "WeightUom" "NetVolume" "VolumeUom" "OnHandQty" "OnHandCatchQty" "UnlimitedPurchSupplyDate" "UnlimitedManufSupplyDate" "UnlimitedExpectedSupplyDate" "SupersededByPart" "DurabilityWeeks" "SupplyTypeDb" "EnabledLccParams" "MultiSitePlannedPart" "CustWarranty" "SupWarranty" "PartCatalogPartDescription" "PartCatalogBasePartDescription" "GTIN" "GTINSeries" "OperativeValue" "OperativeValueSource" "CountryCode" "DocumentTextExist" "NoteTextExist" "UsePartcaDescInventDb" "DefaultQtyCalcRound" "PartCatalogStandardName" "AnyForecastPartExists" "AllForecastPartsExist" "HsnSacCodeDescription" "ProductCategoryDesc" "SupersedesStartDate" "SupersedesEndDate" "CPpvStatus" "CMrpToDop" "CNextLineItemNo" "CNextOperationNo" "CSfShipmentBoat" "CSfAssemblyBoat" "StructureUpdate" "RoutingUpdate"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type InventoryMaterialPriceElement

ShareAmount
required
number
UnitMeasure
required
string <= 30 characters
Surcharge
required
number
ValidFrom
required
string <date>
ValidTo	
string <date>
Responses
200 response body for entity type InventoryMaterialPriceElement
201 response body for entity type InventoryMaterialPriceElement
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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/MaterialPriceElementArray(Contract='{MaterialPriceElementArray_Contract}',PartNo='{MaterialPriceElementArray_PartNo}',PriceElementLineNo={MaterialPriceElementArray_PriceElementLineNo})

Request samples
Payload
Content type
application/json

Copy
{
"ShareAmount": 1,
"UnitMeasure": "It is a Text",
"Surcharge": 1,
"ValidFrom": "2019-10-10",
"ValidTo": "2019-10-10"
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
"PriceElementLineNo": 1,
"PriceElementId": "It is a Text",
"ShareAmount": 1,
"UnitMeasure": "It is a Text",
"Surcharge": 1,
"ValidFrom": "2019-10-10",
"ValidTo": "2019-10-10"
}
Get entities from PriceElementIdRef
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
MaterialPriceElementArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

MaterialPriceElementArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

MaterialPriceElementArray_PriceElementLineNo
required
number
Example: 1
key: PriceElementLineNo

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
Items Enum: "PriceElementId" "PriceElementId desc" "Description" "Description desc" "Objstate" "Objstate desc" "ElementType" "ElementType desc" "ElementTypeDb" "ElementTypeDb desc" "BaseUnitMeas" "BaseUnitMeas desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PriceElementId" "Description" "Objstate" "ElementType" "ElementTypeDb" "BaseUnitMeas"
Specify properties to return, see OData Select

Responses
200 response body for entity array MaterialPriceElementLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/MaterialPriceElementArray(Contract='{MaterialPriceElementArray_Contract}',PartNo='{MaterialPriceElementArray_PartNo}',PriceElementLineNo={MaterialPriceElementArray_PriceElementLineNo})/PriceElementIdRef

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
Get entities from UnitMeasureRef
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
MaterialPriceElementArray_Contract
required
string <= 5 characters
Example: It is a Text
key: Contract

MaterialPriceElementArray_PartNo
required
string <= 25 characters
Example: It is a Text
key: PartNo

MaterialPriceElementArray_PriceElementLineNo
required
number
Example: 1
key: PriceElementLineNo

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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/MaterialPriceElementArray(Contract='{MaterialPriceElementArray_Contract}',PartNo='{MaterialPriceElementArray_PartNo}',PriceElementLineNo={MaterialPriceElementArray_PriceElementLineNo})/UnitMeasureRef

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
Get entities from AbcClassRef
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
Items Enum: "AbcClass" "AbcClass desc" "AbcPercent" "AbcPercent desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "AbcClass" "AbcPercent"
Specify properties to return, see OData Select

Responses
200 response body for entity array AbcClass
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/AbcClassRef

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
Get entities from PartCostGroupRef
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
Items Enum: "Objstate" "Objstate desc" "Contract" "Contract desc" "PartCostGroupId" "PartCostGroupId desc" "Description" "Description desc" "NoteText" "NoteText desc" "CostTemplateId" "CostTemplateId desc" "PurchCostTemplateId" "PurchCostTemplateId desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Contract" "PartCostGroupId" "Description" "NoteText" "CostTemplateId" "PurchCostTemplateId"
Specify properties to return, see OData Select

Responses
200 response body for entity array PartCostGroup
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/PartCostGroupRef

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
PartNo
required
string <= 25 characters
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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/SiteInventInfoRef

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
Get entities from PartCatalogRef
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
Items Enum: "PartNo" "PartNo desc" "Description" "Description desc" "LanguageDescription" "LanguageDescription desc" "InfoText" "InfoText desc" "StdNameId" "StdNameId desc" "UnitCode" "UnitCode desc" "LotTrackingCode" "LotTrackingCode desc" "SerialRule" "SerialRule desc" "SerialTrackingCode" "SerialTrackingCode desc" "EngSerialTrackingCode" "EngSerialTrackingCode desc" "PartMainGroup" "PartMainGroup desc" "Configurable" "Configurable desc" "CustWarrantyId" "CustWarrantyId desc" "SupWarrantyId" "SupWarrantyId desc" "ConditionCodeUsage" "ConditionCodeUsage desc" "SubLotRule" "SubLotRule desc" "LotQuantityRule" "LotQuantityRule desc" "PositionPart" "PositionPart desc" "InputUnitMeasGroupId" "InputUnitMeasGroupId desc" "CatchUnitEnabled" "CatchUnitEnabled desc" "MultilevelTracking" "MultilevelTracking desc" "ComponentLotRule" "ComponentLotRule desc" "StopArrivalIssuedSerial" "StopArrivalIssuedSerial desc" "WeightNet" "WeightNet desc" "UomForWeightNet" "UomForWeightNet desc" "VolumeNet" "VolumeNet desc" "UomForVolumeNet" "UomForVolumeNet desc" "FreightFactor" "FreightFactor desc" "AllowAsNotConsumed" "AllowAsNotConsumed desc" "ReceiptIssueSerialTrack" "ReceiptIssueSerialTrack desc" "StopNewSerialInRma" "StopNewSerialInRma desc" "TechnicalDrawingNo" "TechnicalDrawingNo desc" "ProductTypeClassif" "ProductTypeClassif desc" "CestCode" "CestCode desc" "FciCode" "FciCode desc" "FirstInventorySite" "FirstInventorySite desc" "Ppv" "Ppv desc" "IsNewPart" "IsNewPart desc" "CPpvStatus" "CPpvStatus desc" "CPartConfigCompletion" "CPartConfigCompletion desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PartNo" "Description" "LanguageDescription" "InfoText" "StdNameId" "UnitCode" "LotTrackingCode" "SerialRule" "SerialTrackingCode" "EngSerialTrackingCode" "PartMainGroup" "Configurable" "CustWarrantyId" "SupWarrantyId" "ConditionCodeUsage" "SubLotRule" "LotQuantityRule" "PositionPart" "InputUnitMeasGroupId" "CatchUnitEnabled" "MultilevelTracking" "ComponentLotRule" "StopArrivalIssuedSerial" "WeightNet" "UomForWeightNet" "VolumeNet" "UomForVolumeNet" "FreightFactor" "AllowAsNotConsumed" "ReceiptIssueSerialTrack" "StopNewSerialInRma" "TechnicalDrawingNo" "ProductTypeClassif" "CestCode" "FciCode" "FirstInventorySite" "Ppv" "IsNewPart" "CPpvStatus" "CPartConfigCompletion"
Specify properties to return, see OData Select

Responses
200 response body for entity array PartCatalog
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/PartCatalogRef

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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/ContractRef

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
Get entities from PlannerBuyerRef
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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/PlannerBuyerRef

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
Get entities from InventoryUomRef
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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/InventoryUomRef

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
Get entities from CatchUnitMeasRef
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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/CatchUnitMeasRef

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
Get entities from InputUnitMeasGroupIdRef
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
Items Enum: "UnitCode" "UnitCode desc" "InputUnitMeasGroupId" "InputUnitMeasGroupId desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "UnitCode" "InputUnitMeasGroupId" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array InputUomGroupLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/InputUnitMeasGroupIdRef

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
Get entities from PrimeCommodityRef
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
Items Enum: "CommodityCode" "CommodityCode desc" "Description" "Description desc" "Objstate" "Objstate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CommodityCode" "Description" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity array LovCommodityGroup1
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/PrimeCommodityRef

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
Get entities from SecondCommodityRef
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
Items Enum: "CommodityCode" "CommodityCode desc" "Description" "Description desc" "MinPeriods" "MinPeriods desc" "Objstate" "Objstate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CommodityCode" "Description" "MinPeriods" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity array LovCommodityGroup2
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/SecondCommodityRef

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
Get entities from AssetClassRef
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
Items Enum: "Objstate" "Objstate desc" "AssetClass" "AssetClass desc" "Description" "Description desc" "OeAllocAssignFlag" "OeAllocAssignFlag desc" "OnhandAnalysisFlag" "OnhandAnalysisFlag desc" "ShortageFlag" "ShortageFlag desc" "ForecastConsumptionFlag" "ForecastConsumptionFlag desc" "AutomaticCapabilityCheck" "AutomaticCapabilityCheck desc" "CoReserveOnhAnalysFlag" "CoReserveOnhAnalysFlag desc" "UpperLimitVeryslowMover" "UpperLimitVeryslowMover desc" "UpperLimitSlowMover" "UpperLimitSlowMover desc" "UpperLimitMediumMover" "UpperLimitMediumMover desc" "IntroductionDurationDays" "IntroductionDurationDays desc" "DeclineInactivityDays" "DeclineInactivityDays desc" "ExpiredInactivityDays" "ExpiredInactivityDays desc" "DeclineToMatureIssues" "DeclineToMatureIssues desc" "ExpiredToIntroIssues" "ExpiredToIntroIssues desc" "SeasonalDemandPattern" "SeasonalDemandPattern desc" "SafetyLeadTime" "SafetyLeadTime desc" "ClassificationPeriods" "ClassificationPeriods desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "AssetClass" "Description" "OeAllocAssignFlag" "OnhandAnalysisFlag" "ShortageFlag" "ForecastConsumptionFlag" "AutomaticCapabilityCheck" "CoReserveOnhAnalysFlag" "UpperLimitVeryslowMover" "UpperLimitSlowMover" "UpperLimitMediumMover" "IntroductionDurationDays" "DeclineInactivityDays" "ExpiredInactivityDays" "DeclineToMatureIssues" "ExpiredToIntroIssues" "SeasonalDemandPattern" "SafetyLeadTime" "ClassificationPeriods"
Specify properties to return, see OData Select

Responses
200 response body for entity array AssetClass
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/AssetClassRef

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
Get entities from PartStatusRef
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
Items Enum: "Objstate" "Objstate desc" "PartStatus" "PartStatus desc" "Description" "Description desc" "DemandFlag" "DemandFlag desc" "OnhandFlag" "OnhandFlag desc" "SupplyFlag" "SupplyFlag desc" "DefaultStatus" "DefaultStatus desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "PartStatus" "Description" "DemandFlag" "OnhandFlag" "SupplyFlag" "DefaultStatus"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryPartStatusPar
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/PartStatusRef

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
Get entities from HazardCodeRef
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
Items Enum: "Objstate" "Objstate desc" "HazardCode" "HazardCode desc" "Description" "Description desc" "NoteText" "NoteText desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "HazardCode" "Description" "NoteText"
Specify properties to return, see OData Select

Responses
200 response body for entity array SafetyInstruction
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/HazardCodeRef

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
Get entities from AccountingGroupRef
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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/AccountingGroupRef

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
Get entities from PartProductCodeRef
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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/PartProductCodeRef

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
Get entities from PartProductFamilyRef
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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/PartProductFamilyRef

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
Get entities from SupersedesRef
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "Description" "Description desc" "PartCatalogDescription" "PartCatalogDescription desc" "TypeCode" "TypeCode desc" "LotTrackingCode" "LotTrackingCode desc" "LotQuantityRule" "LotQuantityRule desc" "SerialTrackingCode" "SerialTrackingCode desc" "ReceiptIssueSerialTrackDb" "ReceiptIssueSerialTrackDb desc" "ConditionCodeUsage" "ConditionCodeUsage desc" "UnitMeas" "UnitMeas desc" "CatchUnitMeas" "CatchUnitMeas desc" "PlannerBuyer" "PlannerBuyer desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description" "PartCatalogDescription" "TypeCode" "LotTrackingCode" "LotQuantityRule" "SerialTrackingCode" "ReceiptIssueSerialTrackDb" "ConditionCodeUsage" "UnitMeas" "CatchUnitMeas" "PlannerBuyer"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryPartLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/SupersedesRef

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
Get entities from SupersededByPartRef
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "Description" "Description desc" "PartCatalogDescription" "PartCatalogDescription desc" "TypeCode" "TypeCode desc" "LotTrackingCode" "LotTrackingCode desc" "LotQuantityRule" "LotQuantityRule desc" "SerialTrackingCode" "SerialTrackingCode desc" "ReceiptIssueSerialTrackDb" "ReceiptIssueSerialTrackDb desc" "ConditionCodeUsage" "ConditionCodeUsage desc" "UnitMeas" "UnitMeas desc" "CatchUnitMeas" "CatchUnitMeas desc" "PlannerBuyer" "PlannerBuyer desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description" "PartCatalogDescription" "TypeCode" "LotTrackingCode" "LotQuantityRule" "SerialTrackingCode" "ReceiptIssueSerialTrackDb" "ConditionCodeUsage" "UnitMeas" "CatchUnitMeas" "PlannerBuyer"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryPartLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/SupersededByPartRef

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
Get entities from CountryOfOriginRef
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
Items Enum: "CountryCode" "CountryCode desc" "CountryCode3" "CountryCode3 desc" "CountryId" "CountryId desc" "Description" "Description desc" "UsedInAppl" "UsedInAppl desc" "FullName" "FullName desc" "EuMember" "EuMember desc" "DefaultLocale" "DefaultLocale desc" "BlockedForUse" "BlockedForUse desc" "SystemAdded" "SystemAdded desc" "FetchJurisdictionCode" "FetchJurisdictionCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CountryCode" "CountryCode3" "CountryId" "Description" "UsedInAppl" "FullName" "EuMember" "DefaultLocale" "BlockedForUse" "SystemAdded" "FetchJurisdictionCode"
Specify properties to return, see OData Select

Responses
200 response body for entity array IsoCountry
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/CountryOfOriginRef

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
Get entities from RegionOfOriginRef
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
Items Enum: "CountryCode" "CountryCode desc" "RegionCode" "RegionCode desc" "RegionName" "RegionName desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CountryCode" "RegionCode" "RegionName"
Specify properties to return, see OData Select

Responses
200 response body for entity array CountryRegion
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/RegionOfOriginRef

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
Get entities from CustomsStatNoRef
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
Items Enum: "Objstate" "Objstate desc" "CustomsStatNo" "CustomsStatNo desc" "CustomsUnitMeas" "CustomsUnitMeas desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "CustomsStatNo" "CustomsUnitMeas" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array CustomsStatisticsNumber
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/CustomsStatNoRef

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
Get entities from SupplyChainPartGroupRef
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
Items Enum: "Objstate" "Objstate desc" "SupplyChainPartGroup" "SupplyChainPartGroup desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "SupplyChainPartGroup" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array SupplyChainPartGroup
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/SupplyChainPartGroupRef

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
Get entities from TechnicalCoordinatorIdRef
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
Items Enum: "TechnicalCoordinatorId" "TechnicalCoordinatorId desc" "Name" "Name desc" "State" "State desc" "Objstate" "Objstate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "TechnicalCoordinatorId" "Name" "State" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity array TechnicalCoordinatorLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/TechnicalCoordinatorIdRef

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
Get entities from CustWarrantyIdRef
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
Items Enum: "Objstate" "Objstate desc" "WarrantyId" "WarrantyId desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "WarrantyId"
Specify properties to return, see OData Select

Responses
200 response body for entity array CustWarranty
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/CustWarrantyIdRef

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
Get entities from StdNameIdRef
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
Items Enum: "StdNameId" "StdNameId desc" "StdName" "StdName desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "StdNameId" "StdName"
Specify properties to return, see OData Select

Responses
200 response body for entity array StandardNamesLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/StdNameIdRef

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
Get entities from EngAttributeRef
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
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/EngAttributeRef

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
Get entities from StatisticalCodeRef
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
Items Enum: "Objstate" "Objstate desc" "Company" "Company desc" "StatisticalCode" "StatisticalCode desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Company" "StatisticalCode" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array StatisticalCode
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/StatisticalCodeRef

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
Get entities from AcquisitionReasonIdRef
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
Items Enum: "Company" "Company desc" "AcquisitionReasonId" "AcquisitionReasonId desc" "Description" "Description desc" "ExternalUseType" "ExternalUseType desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "AcquisitionReasonId" "Description" "ExternalUseType"
Specify properties to return, see OData Select

Responses
200 response body for entity array AcquisitionReason
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/AcquisitionReasonIdRef

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
Get entities from AcquisitionOriginRef
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
Items Enum: "Objstate" "Objstate desc" "Company" "Company desc" "AcquisitionOrigin" "AcquisitionOrigin desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Company" "AcquisitionOrigin" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array AcquisitionOrigin
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/AcquisitionOriginRef

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
Get entities from HsnSacCodeRef
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
Items Enum: "Company" "Company desc" "HsnSacCode" "HsnSacCode desc" "Description" "Description desc" "HsnSacType" "HsnSacType desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "HsnSacCode" "Description" "HsnSacType"
Specify properties to return, see OData Select

Responses
200 response body for entity array HsnSacCode
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/HsnSacCodeRef

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
Get entities from ProductCategoryIdRef
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
Items Enum: "Objstate" "Objstate desc" "Company" "Company desc" "ProductCategoryId" "ProductCategoryId desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Company" "ProductCategoryId" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array InvPartProductCategory
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/ProductCategoryIdRef

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
Get entities from CPpvStatusRef
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
Items Enum: "Objstate" "Objstate desc" "PpvId" "PpvId desc" "Description" "Description desc" "DefaultStatus" "DefaultStatus desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "PpvId" "Description" "DefaultStatus"
Specify properties to return, see OData Select

Responses
200 response body for entity array CPpvStatus
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/CPpvStatusRef

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
Get entities from CSfShipmentBoatRef
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "Description" "Description desc" "PartCatalogDescription" "PartCatalogDescription desc" "TypeCode" "TypeCode desc" "LotTrackingCode" "LotTrackingCode desc" "LotQuantityRule" "LotQuantityRule desc" "SerialTrackingCode" "SerialTrackingCode desc" "ReceiptIssueSerialTrackDb" "ReceiptIssueSerialTrackDb desc" "ConditionCodeUsage" "ConditionCodeUsage desc" "UnitMeas" "UnitMeas desc" "CatchUnitMeas" "CatchUnitMeas desc" "PlannerBuyer" "PlannerBuyer desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description" "PartCatalogDescription" "TypeCode" "LotTrackingCode" "LotQuantityRule" "SerialTrackingCode" "ReceiptIssueSerialTrackDb" "ConditionCodeUsage" "UnitMeas" "CatchUnitMeas" "PlannerBuyer"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryPartLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/CSfShipmentBoatRef

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
Get entities from CSfAssemblyBoatRef
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "Description" "Description desc" "PartCatalogDescription" "PartCatalogDescription desc" "TypeCode" "TypeCode desc" "LotTrackingCode" "LotTrackingCode desc" "LotQuantityRule" "LotQuantityRule desc" "SerialTrackingCode" "SerialTrackingCode desc" "ReceiptIssueSerialTrackDb" "ReceiptIssueSerialTrackDb desc" "ConditionCodeUsage" "ConditionCodeUsage desc" "UnitMeas" "UnitMeas desc" "CatchUnitMeas" "CatchUnitMeas desc" "PlannerBuyer" "PlannerBuyer desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description" "PartCatalogDescription" "TypeCode" "LotTrackingCode" "LotQuantityRule" "SerialTrackingCode" "ReceiptIssueSerialTrackDb" "ConditionCodeUsage" "UnitMeas" "CatchUnitMeas" "PlannerBuyer"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryPartLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartSet(PartNo='{PartNo}',Contract='{Contract}')/CSfAssemblyBoatRef

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
InventoryPartAlternativePartQuerySet
Get entities from InventoryPartAlternativePartQuerySet
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "AlternativePartNo" "AlternativePartNo desc" "Description" "Description desc" "QtyOnHand" "QtyOnHand desc" "NoteText" "NoteText desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AlternativePartNo" "Description" "QtyOnHand" "NoteText"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartCatalogRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array InventoryPartAlternativePartQuery
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartAlternativePartQuerySet

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
Get entity from InventoryPartAlternativePartQuerySet by key
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
AlternativePartNo
required
string <= 25 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AlternativePartNo" "Description" "QtyOnHand" "NoteText"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartCatalogRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type InventoryPartAlternativePartQuery
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartAlternativePartQuerySet(Contract='{Contract}',PartNo='{PartNo}',AlternativePartNo='{AlternativePartNo}')

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
"QtyOnHand": 1,
"NoteText": "It is a Text"
}
Get entities from PartCatalogRef
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
AlternativePartNo
required
string <= 25 characters
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
Items Enum: "PartNo" "PartNo desc" "Description" "Description desc" "LanguageDescription" "LanguageDescription desc" "InfoText" "InfoText desc" "StdNameId" "StdNameId desc" "UnitCode" "UnitCode desc" "LotTrackingCode" "LotTrackingCode desc" "SerialRule" "SerialRule desc" "SerialTrackingCode" "SerialTrackingCode desc" "EngSerialTrackingCode" "EngSerialTrackingCode desc" "PartMainGroup" "PartMainGroup desc" "Configurable" "Configurable desc" "CustWarrantyId" "CustWarrantyId desc" "SupWarrantyId" "SupWarrantyId desc" "ConditionCodeUsage" "ConditionCodeUsage desc" "SubLotRule" "SubLotRule desc" "LotQuantityRule" "LotQuantityRule desc" "PositionPart" "PositionPart desc" "InputUnitMeasGroupId" "InputUnitMeasGroupId desc" "CatchUnitEnabled" "CatchUnitEnabled desc" "MultilevelTracking" "MultilevelTracking desc" "ComponentLotRule" "ComponentLotRule desc" "StopArrivalIssuedSerial" "StopArrivalIssuedSerial desc" "WeightNet" "WeightNet desc" "UomForWeightNet" "UomForWeightNet desc" "VolumeNet" "VolumeNet desc" "UomForVolumeNet" "UomForVolumeNet desc" "FreightFactor" "FreightFactor desc" "AllowAsNotConsumed" "AllowAsNotConsumed desc" "ReceiptIssueSerialTrack" "ReceiptIssueSerialTrack desc" "StopNewSerialInRma" "StopNewSerialInRma desc" "TechnicalDrawingNo" "TechnicalDrawingNo desc" "ProductTypeClassif" "ProductTypeClassif desc" "CestCode" "CestCode desc" "FciCode" "FciCode desc" "FirstInventorySite" "FirstInventorySite desc" "Ppv" "Ppv desc" "IsNewPart" "IsNewPart desc" "CPpvStatus" "CPpvStatus desc" "CPartConfigCompletion" "CPartConfigCompletion desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PartNo" "Description" "LanguageDescription" "InfoText" "StdNameId" "UnitCode" "LotTrackingCode" "SerialRule" "SerialTrackingCode" "EngSerialTrackingCode" "PartMainGroup" "Configurable" "CustWarrantyId" "SupWarrantyId" "ConditionCodeUsage" "SubLotRule" "LotQuantityRule" "PositionPart" "InputUnitMeasGroupId" "CatchUnitEnabled" "MultilevelTracking" "ComponentLotRule" "StopArrivalIssuedSerial" "WeightNet" "UomForWeightNet" "VolumeNet" "UomForVolumeNet" "FreightFactor" "AllowAsNotConsumed" "ReceiptIssueSerialTrack" "StopNewSerialInRma" "TechnicalDrawingNo" "ProductTypeClassif" "CestCode" "FciCode" "FirstInventorySite" "Ppv" "IsNewPart" "CPpvStatus" "CPartConfigCompletion"
Specify properties to return, see OData Select

Responses
200 response body for entity array PartCatalog
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/InventoryPartAlternativePartQuerySet(Contract='{Contract}',PartNo='{PartNo}',AlternativePartNo='{AlternativePartNo}')/PartCatalogRef

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

Invoke action NotifyForecastPartChange
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action NotifyForecastPartChangeActionImport

Contract	
string
PartNo	
string
ChangeType	
string
Responses
200 response body for action NotifyForecastPartChange :
202 Accepted
400 Bad Request
403 Forbidden
405 Invalid input
423 Locked
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/NotifyForecastPartChange

Request samples
Payload
Content type
application/json

Copy
{
"Contract": "It is a Text",
"PartNo": "It is a Text",
"ChangeType": "It is a Text"
}
Response samples
200400403405423500501503504
Content type
application/json

Copy
{
"value": "It is a Text"
}
Invoke action CreateForecastParts
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action CreateForecastPartsActionImport

PartNo	
string
Contract	
string
TransactionStartDate	
string <date>
PhaseInDate	
string <date>
PhaseOutDate	
string <date>
UpdateExisting	
boolean
Responses
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/CreateForecastParts

Request samples
Payload
Content type
application/json

Copy
{
"PartNo": "It is a Text",
"Contract": "It is a Text",
"TransactionStartDate": "2019-10-10",
"PhaseInDate": "2019-10-10",
"PhaseOutDate": "2019-10-10",
"UpdateExisting": true
}
Response samples
400403405500501503504
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
Invoke action GenerateCopyEventParameters
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action GenerateCopyEventParametersActionImport

Default	
string
Responses
200 response body for action GenerateCopyEventParameters :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/GenerateCopyEventParameters

Request samples
Payload
Content type
application/json

Copy
{
"Default": "It is a Text"
}
Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": 1
}
Invoke action CopyPartInformation
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action CopyPartInformationActionImport

FromSite	
string
FromPartNo	
string
ToSite	
string
ToPartNo	
string
ToPartDescription	
string
BackgroundJob	
boolean
EventNo	
number
Responses
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/CopyPartInformation

Request samples
Payload
Content type
application/json

Copy
{
"FromSite": "It is a Text",
"FromPartNo": "It is a Text",
"ToSite": "It is a Text",
"ToPartNo": "It is a Text",
"ToPartDescription": "It is a Text",
"BackgroundJob": true,
"EventNo": 1
}
Response samples
400403405500501503504
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
Invoke action CopyCustomerWarrantyFromTemplate
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action CopyCustomerWarrantyFromTemplateActionImport

WarrantyId	
number
TemplateId	
string
PartNo	
string
SerialNo	
string
GrandParentObjkey	
string
Responses
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/CopyCustomerWarrantyFromTemplate

Request samples
Payload
Content type
application/json

Copy
{
"WarrantyId": 1,
"TemplateId": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"GrandParentObjkey": "It is a Text"
}
Response samples
400403405500501503504
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
Invoke action CopySupplierWarrantyFromTemplate
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action CopySupplierWarrantyFromTemplateActionImport

WarrantyId	
number
TemplateId	
string
PartNo	
string
SerialNo	
string
ParentObjkey	
string
Responses
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/CopySupplierWarrantyFromTemplate

Request samples
Payload
Content type
application/json

Copy
{
"WarrantyId": 1,
"TemplateId": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ParentObjkey": "It is a Text"
}
Response samples
400403405500501503504
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
Invoke action SaveCharacteristics
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action SaveCharacteristicsActionImport

Objkey
required
string
Responses
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/SaveCharacteristics

Request samples
Payload
Content type
application/json

Copy
{
"Objkey": "It is a Text"
}
Response samples
400403405500501503504
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
Invoke action CreateMaintInfo
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action CreateMaintInfoActionImport

Contract	
string
PartNo	
string
Responses
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/CreateMaintInfo

Request samples
Payload
Content type
application/json

Copy
{
"Contract": "It is a Text",
"PartNo": "It is a Text"
}
Response samples
400403405500501503504
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
Invoke action CreatePartCatalog
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action CreatePartCatalogActionImport

PartNo	
string
Description	
string
UnitCode	
string
LotTrackingCode	
string
EngSerialTrackingCode	
boolean
SerialTrackingCode	
boolean
NetWeight	
number
NetVolume	
number
NetDensity	
number
UomForWeightNet	
string
UomForVolumeNet	
string
UomForDensityNet	
string
GtinNo	
string
ReceiptIssueSerialTrack	
boolean
ConditionCodeUsage	
boolean
Configurable	
boolean
CatchUnitEnabled	
boolean
MultilevelTracking	
boolean
TypeCode	
string
TechnicalDrawingNo	
string
GtinSeries	
string (GtinSeries_Enumeration)
Enum: "Gtin14" "Gtin13" "Gtin12" "Gtin8" "FreeFormat"
Responses
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/CreatePartCatalog

Request samples
Payload
Content type
application/json

Copy
{
"PartNo": "It is a Text",
"Description": "It is a Text",
"UnitCode": "It is a Text",
"LotTrackingCode": "It is a Text",
"EngSerialTrackingCode": true,
"SerialTrackingCode": true,
"NetWeight": 1,
"NetVolume": 1,
"NetDensity": 1,
"UomForWeightNet": "It is a Text",
"UomForVolumeNet": "It is a Text",
"UomForDensityNet": "It is a Text",
"GtinNo": "It is a Text",
"ReceiptIssueSerialTrack": true,
"ConditionCodeUsage": true,
"Configurable": true,
"CatchUnitEnabled": true,
"MultilevelTracking": true,
"TypeCode": "It is a Text",
"TechnicalDrawingNo": "It is a Text",
"GtinSeries": "Gtin14"
}
Response samples
400403405500501503504
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
Invoke action DeleteForecastParts
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action DeleteForecastPartsActionImport

PartNo	
string
Contract	
string
Responses
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/DeleteForecastParts

Request samples
Payload
Content type
application/json

Copy
{
"PartNo": "It is a Text",
"Contract": "It is a Text"
}
Response samples
400403405500501503504
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
Invoke action RemoveActualCostDifference
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action RemoveActualCostDifferenceActionImport

Contract	
string
PartNo	
string
Responses
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/RemoveActualCostDifference

Request samples
Payload
Content type
application/json

Copy
{
"Contract": "It is a Text",
"PartNo": "It is a Text"
}
Response samples
400403405500501503504
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
Invoke action UpdatePartNoNextValue
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action UpdatePartNoNextValueActionImport

PartNo	
string
Responses
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/UpdatePartNoNextValue

Request samples
Payload
Content type
application/json

Copy
{
"PartNo": "It is a Text"
}
Response samples
400403405500501503504
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
Service Operations - Functions
Functions

Invoke function GetAbsUnprotectedLeadTime
Authorizations:
(OpenIdbasicAuth)
path Parameters
UnprotectedLeadTime
required
number
Example: 1
Responses
200 response body for function GetAbsUnprotectedLeadTime :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetAbsUnprotectedLeadTime(UnprotectedLeadTime={UnprotectedLeadTime})

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": 1
}
Invoke function GetPartDescription
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string
Example: It is a Text
Responses
200 response body for function GetPartDescription :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetPartDescription(PartNo='{PartNo}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": "It is a Text"
}
Invoke function GetDefaultSite
Authorizations:
(OpenIdbasicAuth)
Responses
200 response body for function GetDefaultSite :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetDefaultSite()

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": "It is a Text"
}
Invoke function GetUoM
Authorizations:
(OpenIdbasicAuth)
path Parameters
PriceElementId
required
string
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
200 response body for function GetUoM :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetUoM(PriceElementId='{PriceElementId}')

Response samples
200400403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Invoke function GetDefaultBuyer
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string
Example: It is a Text
PartNo
required
string
Example: It is a Text
Responses
200 response body for function GetDefaultBuyer :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetDefaultBuyer(Contract='{Contract}',PartNo='{PartNo}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": "It is a Text"
}
Invoke function GetUnitMeas2
Authorizations:
(OpenIdbasicAuth)
path Parameters
UnitMeas
required
string
Example: It is a Text
Responses
200 response body for function GetUnitMeas2 :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetUnitMeas2(UnitMeas='{UnitMeas}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": "It is a Text"
}
Invoke function GetSysdate
Authorizations:
(OpenIdbasicAuth)
Responses
200 response body for function GetSysdate :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetSysdate()

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": "2019-10-10"
}
Invoke function FilterGetValidPurReq
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string
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
Items Enum: "Objstate" "Objstate desc" "RequisitionNo" "RequisitionNo desc" "Contract" "Contract desc" "OrderCode" "OrderCode desc" "RequisitionerCode" "RequisitionerCode desc" "MarkFor" "MarkFor desc" "RequisitionDate" "RequisitionDate desc" "PreAccountingId" "PreAccountingId desc" "NoteId" "NoteId desc" "DestinationId" "DestinationId desc" "InternalDestination" "InternalDestination desc" "WoTender" "WoTender desc" "CPpvFlag" "CPpvFlag desc" "AttachPrRequisitioner" "AttachPrRequisitioner desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "RequisitionNo" "Contract" "OrderCode" "RequisitionerCode" "MarkFor" "RequisitionDate" "PreAccountingId" "NoteId" "DestinationId" "InternalDestination" "WoTender" "CPpvFlag" "AttachPrRequisitioner"
Specify properties to return, see OData Select

Responses
200 response body for function FilterGetValidPurReq :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/FilterGetValidPurReq(Contract='{Contract}')

Response samples
200400403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Invoke function GetHsnSacCodeDescription
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string
Example: It is a Text
HsnSacCode
required
string
Example: It is a Text
Responses
200 response body for function GetHsnSacCodeDescription :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetHsnSacCodeDescription(Company='{Company}',HsnSacCode='{HsnSacCode}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": "It is a Text"
}
Invoke function GetUsePartcaDescInventDb
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string
Example: It is a Text
Responses
200 response body for function GetUsePartcaDescInventDb :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetUsePartcaDescInventDb(Contract='{Contract}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": "It is a Text"
}
Invoke function GetPartCostGroup
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string
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
Items Enum: "Objstate" "Objstate desc" "Contract" "Contract desc" "PartCostGroupId" "PartCostGroupId desc" "Description" "Description desc" "NoteText" "NoteText desc" "CostTemplateId" "CostTemplateId desc" "PurchCostTemplateId" "PurchCostTemplateId desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Contract" "PartCostGroupId" "Description" "NoteText" "CostTemplateId" "PurchCostTemplateId"
Specify properties to return, see OData Select

Responses
200 response body for function GetPartCostGroup :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetPartCostGroup(Contract='{Contract}')

Response samples
200400403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Invoke function GetStdName
Authorizations:
(OpenIdbasicAuth)
path Parameters
StdNameId
required
number
Example: 1
Responses
200 response body for function GetStdName :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetStdName(StdNameId={StdNameId})

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": "It is a Text"
}
Invoke function GetPartDefaults
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string
Example: It is a Text
Contract
required
string
Example: It is a Text
Responses
200 response body for function GetPartDefaults :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetPartDefaults(PartNo='{PartNo}',Contract='{Contract}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"PartDescription": "It is a Text",
"CatalogType": "It is a Text",
"ExpensePartClient": "It is a Text",
"UnitOfMeasure": "It is a Text",
"InputUnitMeasGroupId": "It is a Text",
"CatchUnitEnabled": "It is a Text",
"QtyCalcRounding": 1,
"CustWarrantyId": 1,
"SupWarrantyId": 1
}
Invoke function PartCatalogExists
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string
Example: It is a Text
Responses
200 response body for function PartCatalogExists :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PartCatalogExists(PartNo='{PartNo}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": true
}
Invoke function MaintInfoExists
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string
Example: It is a Text
PartNo
required
string
Example: It is a Text
Responses
200 response body for function MaintInfoExists :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaintInfoExists(Contract='{Contract}',PartNo='{PartNo}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": true
}
Invoke function SetLovUserWhereForUomForWeightNet
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
200 response body for function SetLovUserWhereForUomForWeightNet :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SetLovUserWhereForUomForWeightNet()

Response samples
200400403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Invoke function SetLovUserWhereForUomForVolumeNet
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
200 response body for function SetLovUserWhereForUomForVolumeNet :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SetLovUserWhereForUomForVolumeNet()

Response samples
200400403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Invoke function SetLovUserWhereForUomForDensityNet
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
200 response body for function SetLovUserWhereForUomForDensityNet :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SetLovUserWhereForUomForDensityNet()

Response samples
200400403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Invoke function GetProjectId
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contact
required
string
Example: It is a Text
Responses
200 response body for function GetProjectId :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetProjectId(Contact='{Contact}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": "It is a Text"
}
Invoke function ValidateContract
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string
Example: It is a Text
Responses
200 response body for function ValidateContract :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ValidateContract(Contract='{Contract}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"UsePartcaDescription": "It is a Text",
"EnabledLccParams": "It is a Text",
"Company": "It is a Text"
}
Invoke function GetPartNoNextValue
Authorizations:
(OpenIdbasicAuth)
Responses
200 response body for function GetPartNoNextValue :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetPartNoNextValue()

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": "It is a Text"
}
Invoke function GetNonExistingPartNo
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string
Example: It is a Text
Responses
200 response body for function GetNonExistingPartNo :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetNonExistingPartNo(PartNo='{PartNo}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": 1
}
Invoke function GetCPurchasePart
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string
Example: It is a Text
Contract
required
string
Example: It is a Text
Responses
200 response body for function GetCPurchasePart :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetCPurchasePart(PartNo='{PartNo}',Contract='{Contract}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": 1
}
Reference_StandardNamesLov
Reference Entity Set Reference_StandardNamesLov

Get entities from Reference_StandardNamesLov
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
Items Enum: "StdNameId" "StdNameId desc" "StdName" "StdName desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "StdNameId" "StdName"
Specify properties to return, see OData Select

Responses
200 response body for entity array StandardNamesLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_StandardNamesLov

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
Get entity from Reference_StandardNamesLov by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
StdNameId
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "StdNameId" "StdName"
Specify properties to return, see OData Select

Responses
200 response body for entity type StandardNamesLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_StandardNamesLov(StdNameId={StdNameId})

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"StdNameId": 1,
"StdName": "It is a Text"
}
Reference_TechnicalCoordinatorLov
Reference Entity Set Reference_TechnicalCoordinatorLov

Get entities from Reference_TechnicalCoordinatorLov
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
Items Enum: "TechnicalCoordinatorId" "TechnicalCoordinatorId desc" "Name" "Name desc" "State" "State desc" "Objstate" "Objstate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "TechnicalCoordinatorId" "Name" "State" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity array TechnicalCoordinatorLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_TechnicalCoordinatorLov

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
Get entity from Reference_TechnicalCoordinatorLov by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
TechnicalCoordinatorId
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "TechnicalCoordinatorId" "Name" "State" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity type TechnicalCoordinatorLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_TechnicalCoordinatorLov(TechnicalCoordinatorId='{TechnicalCoordinatorId}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"TechnicalCoordinatorId": "It is a Text",
"Name": "It is a Text",
"State": "It is a Text",
"Objstate": "Active"
}
Reference_InventoryPartLov
Reference Entity Set Reference_InventoryPartLov

Get entities from Reference_InventoryPartLov
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "Description" "Description desc" "PartCatalogDescription" "PartCatalogDescription desc" "TypeCode" "TypeCode desc" "LotTrackingCode" "LotTrackingCode desc" "LotQuantityRule" "LotQuantityRule desc" "SerialTrackingCode" "SerialTrackingCode desc" "ReceiptIssueSerialTrackDb" "ReceiptIssueSerialTrackDb desc" "ConditionCodeUsage" "ConditionCodeUsage desc" "UnitMeas" "UnitMeas desc" "CatchUnitMeas" "CatchUnitMeas desc" "PlannerBuyer" "PlannerBuyer desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description" "PartCatalogDescription" "TypeCode" "LotTrackingCode" "LotQuantityRule" "SerialTrackingCode" "ReceiptIssueSerialTrackDb" "ConditionCodeUsage" "UnitMeas" "CatchUnitMeas" "PlannerBuyer"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryPartLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryPartLov

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
Get entity from Reference_InventoryPartLov by key
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
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description" "PartCatalogDescription" "TypeCode" "LotTrackingCode" "LotQuantityRule" "SerialTrackingCode" "ReceiptIssueSerialTrackDb" "ConditionCodeUsage" "UnitMeas" "CatchUnitMeas" "PlannerBuyer"
Specify properties to return, see OData Select

Responses
200 response body for entity type InventoryPartLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryPartLov(Contract='{Contract}',PartNo='{PartNo}')

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
"LotTrackingCode": "It is a Text",
"LotQuantityRule": "It is a Text",
"SerialTrackingCode": "It is a Text",
"ReceiptIssueSerialTrackDb": "It is a Text",
"ConditionCodeUsage": "It is a Text",
"UnitMeas": "It is a Text",
"CatchUnitMeas": "It is a Text",
"PlannerBuyer": "It is a Text",
"TypeCode": "Manufactured"
}
Reference_LovCommodityGroup2
Reference Entity Set Reference_LovCommodityGroup2

Get entities from Reference_LovCommodityGroup2
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
Items Enum: "CommodityCode" "CommodityCode desc" "Description" "Description desc" "MinPeriods" "MinPeriods desc" "Objstate" "Objstate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CommodityCode" "Description" "MinPeriods" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity array LovCommodityGroup2
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_LovCommodityGroup2

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
Get entity from Reference_LovCommodityGroup2 by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
CommodityCode
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "CommodityCode" "Description" "MinPeriods" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity type LovCommodityGroup2
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_LovCommodityGroup2(CommodityCode='{CommodityCode}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"CommodityCode": "It is a Text",
"Description": "It is a Text",
"MinPeriods": 1,
"Objstate": "Active"
}
Reference_LovCommodityGroup1
Reference Entity Set Reference_LovCommodityGroup1

Get entities from Reference_LovCommodityGroup1
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
Items Enum: "CommodityCode" "CommodityCode desc" "Description" "Description desc" "Objstate" "Objstate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CommodityCode" "Description" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity array LovCommodityGroup1
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_LovCommodityGroup1

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
Get entity from Reference_LovCommodityGroup1 by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
CommodityCode
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "CommodityCode" "Description" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity type LovCommodityGroup1
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_LovCommodityGroup1(CommodityCode='{CommodityCode}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"CommodityCode": "It is a Text",
"Description": "It is a Text",
"Objstate": "Active"
}
Reference_InputUomGroupLov
Reference Entity Set Reference_InputUomGroupLov

Get entities from Reference_InputUomGroupLov
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
Items Enum: "UnitCode" "UnitCode desc" "InputUnitMeasGroupId" "InputUnitMeasGroupId desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "UnitCode" "InputUnitMeasGroupId" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array InputUomGroupLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InputUomGroupLov

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
Get entity from Reference_InputUomGroupLov by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
UnitCode
required
string <= 4000 characters
Example: It is a Text
InputUnitMeasGroupId
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "UnitCode" "InputUnitMeasGroupId" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type InputUomGroupLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InputUomGroupLov(UnitCode='{UnitCode}',InputUnitMeasGroupId='{InputUnitMeasGroupId}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"UnitCode": "It is a Text",
"InputUnitMeasGroupId": "It is a Text",
"Description": "It is a Text"
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
Reference_InventoryPartLov18
Reference Entity Set Reference_InventoryPartLov18

Get entities from Reference_InventoryPartLov18
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
Items Enum: "PartNo" "PartNo desc" "Description" "Description desc" "Contract" "Contract desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PartNo" "Description" "Contract"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryPartLov18
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryPartLov18

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
Get entity from Reference_InventoryPartLov18 by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 4000 characters
Example: It is a Text
Contract
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "PartNo" "Description" "Contract"
Specify properties to return, see OData Select

Responses
200 response body for entity type InventoryPartLov18
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryPartLov18(PartNo='{PartNo}',Contract='{Contract}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"PartNo": "It is a Text",
"Description": "It is a Text",
"Contract": "It is a Text"
}
Reference_OutputTypeLov
Reference Entity Set Reference_OutputTypeLov

Get entities from Reference_OutputTypeLov
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
Items Enum: "OutputType" "OutputType desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "OutputType" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array OutputTypeLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_OutputTypeLov

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
Get entity from Reference_OutputTypeLov by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
OutputType
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "OutputType" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type OutputTypeLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_OutputTypeLov(OutputType='{OutputType}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"OutputType": "It is a Text",
"Description": "It is a Text"
}
Reference_MpccomPhraseTextLov
Reference Entity Set Reference_MpccomPhraseTextLov

Get entities from Reference_MpccomPhraseTextLov
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
Items Enum: "PhraseText" "PhraseText desc" "PhraseId" "PhraseId desc" "Description" "Description desc" "LanguageCode" "LanguageCode desc" "RevisionNo" "RevisionNo desc" "PhaseInDate" "PhaseInDate desc" "PhaseOutDate" "PhaseOutDate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PhraseText" "PhraseId" "Description" "LanguageCode" "RevisionNo" "PhaseInDate" "PhaseOutDate"
Specify properties to return, see OData Select

Responses
200 response body for entity array MpccomPhraseTextLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_MpccomPhraseTextLov

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
Get entity from Reference_MpccomPhraseTextLov by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
PhraseText
required
string <= 4000 characters
Example: It is a Text
PhraseId
required
string <= 4000 characters
Example: It is a Text
LanguageCode
required
string <= 4000 characters
Example: It is a Text
RevisionNo
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "PhraseText" "PhraseId" "Description" "LanguageCode" "RevisionNo" "PhaseInDate" "PhaseOutDate"
Specify properties to return, see OData Select

Responses
200 response body for entity type MpccomPhraseTextLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_MpccomPhraseTextLov(PhraseText='{PhraseText}',PhraseId='{PhraseId}',LanguageCode='{LanguageCode}',RevisionNo={RevisionNo})

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"PhraseText": "It is a Text",
"PhraseId": "It is a Text",
"Description": "It is a Text",
"LanguageCode": "It is a Text",
"RevisionNo": 1,
"PhaseInDate": "2019-10-10",
"PhaseOutDate": "2019-10-10"
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
Reference_CharacteristicLov
Reference Entity Set Reference_CharacteristicLov

Get entities from Reference_CharacteristicLov
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
Items Enum: "CharacteristicCode" "CharacteristicCode desc" "Description" "Description desc" "SearchType" "SearchType desc" "SearchTypeDb" "SearchTypeDb desc" "CharType" "CharType desc" "CharTypeDb" "CharTypeDb desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CharacteristicCode" "Description" "SearchType" "SearchTypeDb" "CharType" "CharTypeDb"
Specify properties to return, see OData Select

Responses
200 response body for entity array CharacteristicLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CharacteristicLov

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
Get entity from Reference_CharacteristicLov by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
CharacteristicCode
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "CharacteristicCode" "Description" "SearchType" "SearchTypeDb" "CharType" "CharTypeDb"
Specify properties to return, see OData Select

Responses
200 response body for entity type CharacteristicLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CharacteristicLov(CharacteristicCode='{CharacteristicCode}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"CharacteristicCode": "It is a Text",
"Description": "It is a Text",
"SearchType": "It is a Text",
"SearchTypeDb": "It is a Text",
"CharType": "It is a Text",
"CharTypeDb": "It is a Text"
}
Reference_PartCatalogNotPositionLov
Reference Entity Set Reference_PartCatalogNotPositionLov

Get entities from Reference_PartCatalogNotPositionLov
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
Items Enum: "PartNo" "PartNo desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PartNo" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array PartCatalogNotPositionLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PartCatalogNotPositionLov

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
Get entity from Reference_PartCatalogNotPositionLov by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "PartNo" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type PartCatalogNotPositionLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PartCatalogNotPositionLov(PartNo='{PartNo}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"PartNo": "It is a Text",
"Description": "It is a Text"
}
Reference_PartCatalogLov
Reference Entity Set Reference_PartCatalogLov

Get entities from Reference_PartCatalogLov
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
Items Enum: "PartNo" "PartNo desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PartNo" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array PartCatalogLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PartCatalogLov

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
Get entity from Reference_PartCatalogLov by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "PartNo" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type PartCatalogLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PartCatalogLov(PartNo='{PartNo}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"PartNo": "It is a Text",
"Description": "It is a Text"
}
Reference_MaterialPriceElementLov
Reference Entity Set Reference_MaterialPriceElementLov

Get entities from Reference_MaterialPriceElementLov
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
Items Enum: "PriceElementId" "PriceElementId desc" "Description" "Description desc" "Objstate" "Objstate desc" "ElementType" "ElementType desc" "ElementTypeDb" "ElementTypeDb desc" "BaseUnitMeas" "BaseUnitMeas desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PriceElementId" "Description" "Objstate" "ElementType" "ElementTypeDb" "BaseUnitMeas"
Specify properties to return, see OData Select

Responses
200 response body for entity array MaterialPriceElementLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_MaterialPriceElementLov

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
Get entity from Reference_MaterialPriceElementLov by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
PriceElementId
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "PriceElementId" "Description" "Objstate" "ElementType" "ElementTypeDb" "BaseUnitMeas"
Specify properties to return, see OData Select

Responses
200 response body for entity type MaterialPriceElementLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_MaterialPriceElementLov(PriceElementId='{PriceElementId}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"PriceElementId": "It is a Text",
"Description": "It is a Text",
"ElementTypeDb": "It is a Text",
"BaseUnitMeas": "It is a Text",
"Objstate": "Active",
"ElementType": "Amount"
}
Reference_GetValidPurReq
Reference Entity Set Reference_GetValidPurReq

Get entities from Reference_GetValidPurReq
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
Items Enum: "RequisitionNo" "RequisitionNo desc" "Contract" "Contract desc" "AttachPrRequisitioner" "AttachPrRequisitioner desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "RequisitionNo" "Contract" "AttachPrRequisitioner"
Specify properties to return, see OData Select

Responses
200 response body for entity array GetValidPurReq
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_GetValidPurReq

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
Get entity from Reference_GetValidPurReq by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
RequisitionNo
required
string <= 4000 characters
Example: It is a Text
Contract
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "RequisitionNo" "Contract" "AttachPrRequisitioner"
Specify properties to return, see OData Select

Responses
200 response body for entity type GetValidPurReq
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_GetValidPurReq(RequisitionNo='{RequisitionNo}',Contract='{Contract}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"RequisitionNo": "It is a Text",
"Contract": "It is a Text",
"AttachPrRequisitioner": "It is a Text"
}
Reference_CPurchaseBuyerLov
Reference Entity Set Reference_CPurchaseBuyerLov

Get entities from Reference_CPurchaseBuyerLov
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
Items Enum: "BuyerCode" "BuyerCode desc" "Name" "Name desc" "Objstate" "Objstate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "BuyerCode" "Name" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity array CPurchaseBuyerLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CPurchaseBuyerLov

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
Get entity from Reference_CPurchaseBuyerLov by key
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
Items Enum: "luname" "keyref" "BuyerCode" "Name" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity type CPurchaseBuyerLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CPurchaseBuyerLov(BuyerCode='{BuyerCode}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"BuyerCode": "It is a Text",
"Name": "It is a Text",
"Objstate": "Active"
}
Reference_InventoryPartAlternativePartQuery
Reference Entity Set Reference_InventoryPartAlternativePartQuery

Get entities from Reference_InventoryPartAlternativePartQuery
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "AlternativePartNo" "AlternativePartNo desc" "Description" "Description desc" "QtyOnHand" "QtyOnHand desc" "NoteText" "NoteText desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AlternativePartNo" "Description" "QtyOnHand" "NoteText"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartCatalogRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array InventoryPartAlternativePartQuery
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryPartAlternativePartQuery

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
Get entity from Reference_InventoryPartAlternativePartQuery by key
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
AlternativePartNo
required
string <= 25 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "AlternativePartNo" "Description" "QtyOnHand" "NoteText"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartCatalogRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type InventoryPartAlternativePartQuery
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryPartAlternativePartQuery(Contract='{Contract}',PartNo='{PartNo}',AlternativePartNo='{AlternativePartNo}')

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
"QtyOnHand": 1,
"NoteText": "It is a Text"
}
Reference_NoteTextVirtual
Reference Entity Set Reference_NoteTextVirtual

Get entities from Reference_NoteTextVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "ReadOnly" "ReadOnly desc" "NoteId" "NoteId desc" "Label" "Label desc" "WarrantyTypeObjkey" "WarrantyTypeObjkey desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "NoteId" "Label" "WarrantyTypeObjkey"
Specify properties to return, see OData Select

Responses
200 response body for entity array NoteTextVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_NoteTextVirtual

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
Get entity from Reference_NoteTextVirtual by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "NoteId" "Label" "WarrantyTypeObjkey"
Specify properties to return, see OData Select

Responses
200 response body for entity type NoteTextVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_NoteTextVirtual(Objkey='{Objkey}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"ReadOnly": true,
"NoteId": 1,
"Label": "It is a Text",
"WarrantyTypeObjkey": "It is a Text"
}
Reference_InventoryPartVirtual
Reference Entity Set Reference_InventoryPartVirtual

Get entities from Reference_InventoryPartVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "Contract" "Contract desc" "PartNo" "PartNo desc" "EngAttribute" "EngAttribute desc" "UnitMeas" "UnitMeas desc" "Source" "Source desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "EngAttribute" "UnitMeas" "Source"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "EngAttributeRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array InventoryPartVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryPartVirtual

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
Get entity from Reference_InventoryPartVirtual by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "EngAttribute" "UnitMeas" "Source"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "EngAttributeRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type InventoryPartVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryPartVirtual(Objkey='{Objkey}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"Contract": "It is a Text",
"PartNo": "It is a Text",
"EngAttribute": "It is a Text",
"UnitMeas": "It is a Text",
"Source": "It is a Text"
}
Reference_CopyCharacteristicsTemplateVirtual
Reference Entity Set Reference_CopyCharacteristicsTemplateVirtual

Get entities from Reference_CopyCharacteristicsTemplateVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "Contract" "Contract desc" "PartNo" "PartNo desc" "EngAttribute" "EngAttribute desc" "CharacteristicCode" "CharacteristicCode desc" "AttrValueNumeric" "AttrValueNumeric desc" "AttrValueAlpha" "AttrValueAlpha desc" "UnitMeas" "UnitMeas desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "EngAttribute" "CharacteristicCode" "AttrValueNumeric" "AttrValueAlpha" "UnitMeas"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "EngAttributeRef" "AttrValueNumericRef" "AttrValueAlphaRef" "CharacteristicRef" "UnitMeasRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array CopyCharacteristicsTemplateVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CopyCharacteristicsTemplateVirtual

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
Get entity from Reference_CopyCharacteristicsTemplateVirtual by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "EngAttribute" "CharacteristicCode" "AttrValueNumeric" "AttrValueAlpha" "UnitMeas"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "EngAttributeRef" "AttrValueNumericRef" "AttrValueAlphaRef" "CharacteristicRef" "UnitMeasRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type CopyCharacteristicsTemplateVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CopyCharacteristicsTemplateVirtual(Objkey='{Objkey}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"Contract": "It is a Text",
"PartNo": "It is a Text",
"EngAttribute": "It is a Text",
"CharacteristicCode": "It is a Text",
"AttrValueNumeric": 1,
"AttrValueAlpha": "It is a Text",
"UnitMeas": "It is a Text"
}
Reference_CopyPartVirtual
Reference Entity Set Reference_CopyPartVirtual

Get entities from Reference_CopyPartVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "BackgroundJob" "BackgroundJob desc" "FromPartNo" "FromPartNo desc" "FromPartDescription" "FromPartDescription desc" "FromSite" "FromSite desc" "ToPartNo" "ToPartNo desc" "ToPartDescription" "ToPartDescription desc" "ToSite" "ToSite desc" "EventNo" "EventNo desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "BackgroundJob" "FromPartNo" "FromPartDescription" "FromSite" "ToPartNo" "ToPartDescription" "ToSite" "EventNo"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "FromPartNoRef" "FromSiteRef" "ToPartNoRef" "ToSiteRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array CopyPartVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CopyPartVirtual

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
Get entity from Reference_CopyPartVirtual by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "BackgroundJob" "FromPartNo" "FromPartDescription" "FromSite" "ToPartNo" "ToPartDescription" "ToSite" "EventNo"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "FromPartNoRef" "FromSiteRef" "ToPartNoRef" "ToSiteRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type CopyPartVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CopyPartVirtual(Objkey='{Objkey}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"BackgroundJob": true,
"FromPartNo": "It is a Text",
"FromPartDescription": "It is a Text",
"FromSite": "It is a Text",
"ToPartNo": "It is a Text",
"ToPartDescription": "It is a Text",
"ToSite": "It is a Text",
"EventNo": 1
}
Reference_PartInformationVirtual
Reference Entity Set Reference_PartInformationVirtual

Get entities from Reference_PartInformationVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "PartNo" "PartNo desc" "SerialNo" "SerialNo desc" "CustomerWarrantyId" "CustomerWarrantyId desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "PartNo" "SerialNo" "CustomerWarrantyId"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array PartInformationVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PartInformationVirtual

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
Get entity from Reference_PartInformationVirtual by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "PartNo" "SerialNo" "CustomerWarrantyId"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type PartInformationVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PartInformationVirtual(Objkey='{Objkey}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"CustomerWarrantyId": 1
}
Reference_CustomerWarrantyTypeVirtual
Reference Entity Set Reference_CustomerWarrantyTypeVirtual

Get entities from Reference_CustomerWarrantyTypeVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "MaterialCostTypeDb" "MaterialCostTypeDb desc" "ExpensesCostTypeDb" "ExpensesCostTypeDb desc" "FixedPriceCostTypeDb" "FixedPriceCostTypeDb desc" "PersonnelCostTypeDb" "PersonnelCostTypeDb desc" "ExternalCostTypeDb" "ExternalCostTypeDb desc" "SelectMethod" "SelectMethod desc" "WarrantyId" "WarrantyId desc" "WarrantyTypeId" "WarrantyTypeId desc" "WarrantyDescription" "WarrantyDescription desc" "MaterialCostType" "MaterialCostType desc" "ExpensesCostType" "ExpensesCostType desc" "FixedPriceCostType" "FixedPriceCostType desc" "PersonnelCostType" "PersonnelCostType desc" "ExternalCostType" "ExternalCostType desc" "NoteText" "NoteText desc" "PartNo" "PartNo desc" "SerialNo" "SerialNo desc" "ObjId" "ObjId desc" "ObjVersion" "ObjVersion desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "MaterialCostTypeDb" "ExpensesCostTypeDb" "FixedPriceCostTypeDb" "PersonnelCostTypeDb" "ExternalCostTypeDb" "SelectMethod" "WarrantyId" "WarrantyTypeId" "WarrantyDescription" "MaterialCostType" "ExpensesCostType" "FixedPriceCostType" "PersonnelCostType" "ExternalCostType" "NoteText" "PartNo" "SerialNo" "ObjId" "ObjVersion"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "WarrantyTypeIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array CustomerWarrantyTypeVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CustomerWarrantyTypeVirtual

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
Get entity from Reference_CustomerWarrantyTypeVirtual by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "MaterialCostTypeDb" "ExpensesCostTypeDb" "FixedPriceCostTypeDb" "PersonnelCostTypeDb" "ExternalCostTypeDb" "SelectMethod" "WarrantyId" "WarrantyTypeId" "WarrantyDescription" "MaterialCostType" "ExpensesCostType" "FixedPriceCostType" "PersonnelCostType" "ExternalCostType" "NoteText" "PartNo" "SerialNo" "ObjId" "ObjVersion"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "WarrantyTypeIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type CustomerWarrantyTypeVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CustomerWarrantyTypeVirtual(Objkey='{Objkey}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"MaterialCostTypeDb": true,
"ExpensesCostTypeDb": true,
"FixedPriceCostTypeDb": true,
"PersonnelCostTypeDb": true,
"ExternalCostTypeDb": true,
"SelectMethod": true,
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"WarrantyDescription": "It is a Text",
"MaterialCostType": "It is a Text",
"ExpensesCostType": "It is a Text",
"FixedPriceCostType": "It is a Text",
"PersonnelCostType": "It is a Text",
"ExternalCostType": "It is a Text",
"NoteText": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ObjId": "It is a Text",
"ObjVersion": "It is a Text",
"Objgrants": "It is a Text"
}
Reference_SupplierPartInformationVirtual
Reference Entity Set Reference_SupplierPartInformationVirtual

Get entities from Reference_SupplierPartInformationVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "SelectMethod" "SelectMethod desc" "PartNo" "PartNo desc" "SerialNo" "SerialNo desc" "WarrantyId" "WarrantyId desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SelectMethod" "PartNo" "SerialNo" "WarrantyId"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array SupplierPartInformationVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SupplierPartInformationVirtual

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
Get entity from Reference_SupplierPartInformationVirtual by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SelectMethod" "PartNo" "SerialNo" "WarrantyId"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type SupplierPartInformationVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SupplierPartInformationVirtual(Objkey='{Objkey}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"SelectMethod": true,
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"WarrantyId": 1
}
Reference_SupplierWarrantyTypeVirtual
Reference Entity Set Reference_SupplierWarrantyTypeVirtual

Get entities from Reference_SupplierWarrantyTypeVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "CustomerOrderConnectionDb" "CustomerOrderConnectionDb desc" "ConvertToCustOrdDb" "ConvertToCustOrdDb desc" "MaterialCostTypeDb" "MaterialCostTypeDb desc" "ExpensesCostTypeDb" "ExpensesCostTypeDb desc" "FixedPriceCostTypeDb" "FixedPriceCostTypeDb desc" "PersonnelCostTypeDb" "PersonnelCostTypeDb desc" "ExternalCostTypeDb" "ExternalCostTypeDb desc" "WarrantyTypeId" "WarrantyTypeId desc" "WarrantyDescription" "WarrantyDescription desc" "WarrantyId" "WarrantyId desc" "NoteText" "NoteText desc" "PartNo" "PartNo desc" "SerialNo" "SerialNo desc" "ObjId" "ObjId desc" "ObjVersion" "ObjVersion desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "CustomerOrderConnectionDb" "ConvertToCustOrdDb" "MaterialCostTypeDb" "ExpensesCostTypeDb" "FixedPriceCostTypeDb" "PersonnelCostTypeDb" "ExternalCostTypeDb" "WarrantyTypeId" "WarrantyDescription" "WarrantyId" "NoteText" "PartNo" "SerialNo" "ObjId" "ObjVersion"
Specify properties to return, see OData Select

Responses
200 response body for entity array SupplierWarrantyTypeVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SupplierWarrantyTypeVirtual

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
Get entity from Reference_SupplierWarrantyTypeVirtual by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "CustomerOrderConnectionDb" "ConvertToCustOrdDb" "MaterialCostTypeDb" "ExpensesCostTypeDb" "FixedPriceCostTypeDb" "PersonnelCostTypeDb" "ExternalCostTypeDb" "WarrantyTypeId" "WarrantyDescription" "WarrantyId" "NoteText" "PartNo" "SerialNo" "ObjId" "ObjVersion"
Specify properties to return, see OData Select

Responses
200 response body for entity type SupplierWarrantyTypeVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SupplierWarrantyTypeVirtual(Objkey='{Objkey}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"CustomerOrderConnectionDb": true,
"ConvertToCustOrdDb": true,
"MaterialCostTypeDb": true,
"ExpensesCostTypeDb": true,
"FixedPriceCostTypeDb": true,
"PersonnelCostTypeDb": true,
"ExternalCostTypeDb": true,
"WarrantyTypeId": "It is a Text",
"WarrantyDescription": "It is a Text",
"WarrantyId": 1,
"NoteText": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ObjId": "It is a Text",
"ObjVersion": "It is a Text"
}
Reference_CPpvPurReqVirtual
Reference Entity Set Reference_CPpvPurReqVirtual

Get entities from Reference_CPpvPurReqVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "AttachPurReq" "AttachPurReq desc" "Prototype" "Prototype desc" "InspNeeded" "InspNeeded desc" "PartNo" "PartNo desc" "Contract" "Contract desc" "Description" "Description desc" "RequisitionerCode" "RequisitionerCode desc" "RequisitionNo" "RequisitionNo desc" "BuyerCode" "BuyerCode desc" "AttachPrRequisitioner" "AttachPrRequisitioner desc" "OrderedQty" "OrderedQty desc" "WantedReceiptDate" "WantedReceiptDate desc" "AnnualQtyPlanned" "AnnualQtyPlanned desc" "QtyPerBoat" "QtyPerBoat desc" "PartCreationReasonId" "PartCreationReasonId desc" "ConnectedModel" "ConnectedModel desc" "TargetPrice" "TargetPrice desc" "ProposalSupplier" "ProposalSupplier desc" "UnitMeas" "UnitMeas desc" "UnitMeas2" "UnitMeas2 desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "AttachPurReq" "Prototype" "InspNeeded" "PartNo" "Contract" "Description" "RequisitionerCode" "RequisitionNo" "BuyerCode" "AttachPrRequisitioner" "OrderedQty" "WantedReceiptDate" "AnnualQtyPlanned" "QtyPerBoat" "PartCreationReasonId" "ConnectedModel" "TargetPrice" "ProposalSupplier" "UnitMeas" "UnitMeas2"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "PurReqAssociateRef" "RequisitionerRef" "BuyerCodeRef" "ReasonPartCreationRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array CPpvPurReqVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CPpvPurReqVirtual

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
Get entity from Reference_CPpvPurReqVirtual by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "AttachPurReq" "Prototype" "InspNeeded" "PartNo" "Contract" "Description" "RequisitionerCode" "RequisitionNo" "BuyerCode" "AttachPrRequisitioner" "OrderedQty" "WantedReceiptDate" "AnnualQtyPlanned" "QtyPerBoat" "PartCreationReasonId" "ConnectedModel" "TargetPrice" "ProposalSupplier" "UnitMeas" "UnitMeas2"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "PurReqAssociateRef" "RequisitionerRef" "BuyerCodeRef" "ReasonPartCreationRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type CPpvPurReqVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CPpvPurReqVirtual(Objkey='{Objkey}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"@odata.etag": "It is a Text",
"luname": "It is a Text",
"keyref": "It is a Text",
"Objkey": "It is a Text",
"ParentObjkey": "It is a Text",
"Objmodified": "2019-10-10",
"ObjCreatedBy": "It is a Text",
"AttachPurReq": true,
"Prototype": true,
"InspNeeded": true,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"Description": "It is a Text",
"RequisitionerCode": "It is a Text",
"RequisitionNo": "It is a Text",
"BuyerCode": "It is a Text",
"AttachPrRequisitioner": "It is a Text",
"OrderedQty": 1,
"WantedReceiptDate": "2019-10-10",
"AnnualQtyPlanned": 1,
"QtyPerBoat": 1,
"PartCreationReasonId": "It is a Text",
"ConnectedModel": "It is a Text",
"TargetPrice": 1,
"ProposalSupplier": "It is a Text",
"UnitMeas": "It is a Text",
"UnitMeas2": "It is a Text"
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
Reference_PurchaseRequisition
Reference Entity Set Reference_PurchaseRequisition

Get entities from Reference_PurchaseRequisition
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
Items Enum: "Objstate" "Objstate desc" "RequisitionNo" "RequisitionNo desc" "Contract" "Contract desc" "OrderCode" "OrderCode desc" "RequisitionerCode" "RequisitionerCode desc" "MarkFor" "MarkFor desc" "RequisitionDate" "RequisitionDate desc" "PreAccountingId" "PreAccountingId desc" "NoteId" "NoteId desc" "DestinationId" "DestinationId desc" "InternalDestination" "InternalDestination desc" "WoTender" "WoTender desc" "CPpvFlag" "CPpvFlag desc" "AttachPrRequisitioner" "AttachPrRequisitioner desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "RequisitionNo" "Contract" "OrderCode" "RequisitionerCode" "MarkFor" "RequisitionDate" "PreAccountingId" "NoteId" "DestinationId" "InternalDestination" "WoTender" "CPpvFlag" "AttachPrRequisitioner"
Specify properties to return, see OData Select

Responses
200 response body for entity array PurchaseRequisition
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PurchaseRequisition

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
Get entity from Reference_PurchaseRequisition by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
RequisitionNo
required
string <= 12 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "RequisitionNo" "Contract" "OrderCode" "RequisitionerCode" "MarkFor" "RequisitionDate" "PreAccountingId" "NoteId" "DestinationId" "InternalDestination" "WoTender" "CPpvFlag" "AttachPrRequisitioner"
Specify properties to return, see OData Select

Responses
200 response body for entity type PurchaseRequisition
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PurchaseRequisition(RequisitionNo='{RequisitionNo}')

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
"RequisitionNo": "It is a Text",
"Contract": "It is a Text",
"OrderCode": "It is a Text",
"RequisitionerCode": "It is a Text",
"MarkFor": "It is a Text",
"RequisitionDate": "2019-10-10",
"PreAccountingId": 1,
"NoteId": 1,
"DestinationId": "It is a Text",
"InternalDestination": "It is a Text",
"WoTender": true,
"CPpvFlag": "It is a Text",
"AttachPrRequisitioner": "It is a Text",
"Objstate": "Planned"
}
Reference_PartCostGroup
Reference Entity Set Reference_PartCostGroup

Get entities from Reference_PartCostGroup
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
Items Enum: "Objstate" "Objstate desc" "Contract" "Contract desc" "PartCostGroupId" "PartCostGroupId desc" "Description" "Description desc" "NoteText" "NoteText desc" "CostTemplateId" "CostTemplateId desc" "PurchCostTemplateId" "PurchCostTemplateId desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Contract" "PartCostGroupId" "Description" "NoteText" "CostTemplateId" "PurchCostTemplateId"
Specify properties to return, see OData Select

Responses
200 response body for entity array PartCostGroup
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PartCostGroup

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
Get entity from Reference_PartCostGroup by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string <= 5 characters
Example: It is a Text
PartCostGroupId
required
string <= 5 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Contract" "PartCostGroupId" "Description" "NoteText" "CostTemplateId" "PurchCostTemplateId"
Specify properties to return, see OData Select

Responses
200 response body for entity type PartCostGroup
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PartCostGroup(Contract='{Contract}',PartCostGroupId='{PartCostGroupId}')

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
"PartCostGroupId": "It is a Text",
"Description": "It is a Text",
"NoteText": "It is a Text",
"CostTemplateId": "It is a Text",
"PurchCostTemplateId": "It is a Text",
"Objstate": "Active"
}
Reference_ManufEngineer
Reference Entity Set Reference_ManufEngineer

Get entities from Reference_ManufEngineer
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
Items Enum: "Objstate" "Objstate desc" "ManufEngineerCode" "ManufEngineerCode desc" "ManufEngineerName" "ManufEngineerName desc" "ManufEngineerExtension" "ManufEngineerExtension desc" "ManufEngineerTitle" "ManufEngineerTitle desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ManufEngineerCode" "ManufEngineerName" "ManufEngineerExtension" "ManufEngineerTitle"
Specify properties to return, see OData Select

Responses
200 response body for entity array ManufEngineer
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ManufEngineer

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
Get entity from Reference_ManufEngineer by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
ManufEngineerCode
required
string <= 20 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ManufEngineerCode" "ManufEngineerName" "ManufEngineerExtension" "ManufEngineerTitle"
Specify properties to return, see OData Select

Responses
200 response body for entity type ManufEngineer
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ManufEngineer(ManufEngineerCode='{ManufEngineerCode}')

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
"ManufEngineerCode": "It is a Text",
"ManufEngineerName": "It is a Text",
"ManufEngineerExtension": "It is a Text",
"ManufEngineerTitle": "It is a Text",
"Objstate": "Active"
}
Reference_ShopOrderProcessType
Reference Entity Set Reference_ShopOrderProcessType

Get entities from Reference_ShopOrderProcessType
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
Items Enum: "Objstate" "Objstate desc" "ProcessType" "ProcessType desc" "Description" "Description desc" "UseManufCalendar" "UseManufCalendar desc" "UseReqDateReserve" "UseReqDateReserve desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ProcessType" "Description" "UseManufCalendar" "UseReqDateReserve"
Specify properties to return, see OData Select

Responses
200 response body for entity array ShopOrderProcessType
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ShopOrderProcessType

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
Get entity from Reference_ShopOrderProcessType by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProcessType
required
string <= 6 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ProcessType" "Description" "UseManufCalendar" "UseReqDateReserve"
Specify properties to return, see OData Select

Responses
200 response body for entity type ShopOrderProcessType
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ShopOrderProcessType(ProcessType='{ProcessType}')

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
"ProcessType": "It is a Text",
"Description": "It is a Text",
"UseManufCalendar": true,
"UseReqDateReserve": true,
"Objstate": "Active"
}
Reference_CReasonPartCreation
Reference Entity Set Reference_CReasonPartCreation

Get entities from Reference_CReasonPartCreation
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
Items Enum: "CPartCreationReasonId" "CPartCreationReasonId desc" "CPartCreationReason" "CPartCreationReason desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CPartCreationReasonId" "CPartCreationReason"
Specify properties to return, see OData Select

Responses
200 response body for entity array CReasonPartCreation
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CReasonPartCreation

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
Get entity from Reference_CReasonPartCreation by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
CPartCreationReasonId
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "CPartCreationReasonId" "CPartCreationReason"
Specify properties to return, see OData Select

Responses
200 response body for entity type CReasonPartCreation
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CReasonPartCreation(CPartCreationReasonId={CPartCreationReasonId})

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
"CPartCreationReasonId": 1,
"CPartCreationReason": "It is a Text"
}
Reference_Requisitioner
Reference Entity Set Reference_Requisitioner

Get entities from Reference_Requisitioner
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
Items Enum: "Objstate" "Objstate desc" "RequisitionerCode" "RequisitionerCode desc" "ReqDept" "ReqDept desc" "SystemDefined" "SystemDefined desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "RequisitionerCode" "ReqDept" "SystemDefined"
Specify properties to return, see OData Select

Responses
200 response body for entity array Requisitioner
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_Requisitioner

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
Get entity from Reference_Requisitioner by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
RequisitionerCode
required
string <= 20 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "RequisitionerCode" "ReqDept" "SystemDefined"
Specify properties to return, see OData Select

Responses
200 response body for entity type Requisitioner
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_Requisitioner(RequisitionerCode='{RequisitionerCode}')

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
"RequisitionerCode": "It is a Text",
"ReqDept": "It is a Text",
"SystemDefined": true,
"Objstate": "Active"
}
Reference_DocumentText
Reference Entity Set Reference_DocumentText

Get entities from Reference_DocumentText
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
Items Enum: "OutputType" "OutputType desc" "NoteId" "NoteId desc" "NoteText" "NoteText desc" "PhraseId" "PhraseId desc" "LanguageCode" "LanguageCode desc" "RevisionNo" "RevisionNo desc" "ParentObjkey" "ParentObjkey desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "OutputType" "NoteId" "NoteText" "PhraseId" "LanguageCode" "RevisionNo" "ParentObjkey"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "PhraseIdRef" "OutputTypeRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array DocumentText
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_DocumentText

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
Get entity from Reference_DocumentText by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
OutputType
required
string <= 10 characters
Example: It is a Text
NoteId
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "OutputType" "NoteId" "NoteText" "PhraseId" "LanguageCode" "RevisionNo" "ParentObjkey"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "PhraseIdRef" "OutputTypeRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type DocumentText
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_DocumentText(OutputType='{OutputType}',NoteId={NoteId})

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
"OutputType": "It is a Text",
"NoteId": 1,
"NoteText": "It is a Text",
"PhraseId": "It is a Text",
"LanguageCode": "It is a Text",
"RevisionNo": "It is a Text",
"ParentObjkey": "It is a Text"
}
Reference_ManufPartAttribute
Reference Entity Set Reference_ManufPartAttribute

Get entities from Reference_ManufPartAttribute
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "CumLeadtime" "CumLeadtime desc" "OrderGapTime" "OrderGapTime desc" "Density" "Density desc" "LowLevel" "LowLevel desc" "BackflushPart" "BackflushPart desc" "EngineeringInfo" "EngineeringInfo desc" "StructureEffectivity" "StructureEffectivity desc" "RoutingEffectivity" "RoutingEffectivity desc" "PromisePlanned" "PromisePlanned desc" "DefaultPrintUnit" "DefaultPrintUnit desc" "ProcessType" "ProcessType desc" "ConfigurationUsage" "ConfigurationUsage desc" "ManufEngineer" "ManufEngineer desc" "FixedLeadtimeDay" "FixedLeadtimeDay desc" "VariableLeadtimeDay" "VariableLeadtimeDay desc" "FixedLeadtimeHour" "FixedLeadtimeHour desc" "VariableLeadtimeHour" "VariableLeadtimeHour desc" "LeadtimeSource" "LeadtimeSource desc" "LotBatchString" "LotBatchString desc" "OverhaulScrapRule" "OverhaulScrapRule desc" "DopPeggedSoUpdateFlag" "DopPeggedSoUpdateFlag desc" "MrpControlFlag" "MrpControlFlag desc" "ProdPartAsSupplyInMrp" "ProdPartAsSupplyInMrp desc" "CloseTolerance" "CloseTolerance desc" "UseTheoriticalDensity" "UseTheoriticalDensity desc" "IssueType" "IssueType desc" "OverReporting" "OverReporting desc" "OverReportTolerance" "OverReportTolerance desc" "IssuePlannedScrap" "IssuePlannedScrap desc" "ComponentScrap" "ComponentScrap desc" "ShrinkageFactor" "ShrinkageFactor desc" "UnprotectedLeadTime" "UnprotectedLeadTime desc" "AdjustOnOpQtyDeviation" "AdjustOnOpQtyDeviation desc" "IssueOverreportedQty" "IssueOverreportedQty desc" "CreatedFromContract" "CreatedFromContract desc" "CreatedFromPartNo" "CreatedFromPartNo desc" "CreatedFromConfigId" "CreatedFromConfigId desc" "PlanManufSupOnDueDate" "PlanManufSupOnDueDate desc" "RunMrp" "RunMrp desc" "RunCrp" "RunCrp desc" "IncludeFirmDemands" "IncludeFirmDemands desc" "IncludeFirmSupplies" "IncludeFirmSupplies desc" "OptimizeNewDeliveryDate" "OptimizeNewDeliveryDate desc" "RunInBackground" "RunInBackground desc" "ShipDirty" "ShipDirty desc" "ShipDirtyRepairCode" "ShipDirtyRepairCode desc" "AutoReplaceAltComp" "AutoReplaceAltComp desc" "ConsiderLeadTime" "ConsiderLeadTime desc" "NbTrolleysForKit" "NbTrolleysForKit desc" "OperativeValue" "OperativeValue desc" "Uom" "Uom desc" "OperativeValueSource" "OperativeValueSource desc" "OldDensityValue" "OldDensityValue desc" "AutomaticCapabilityCheck" "AutomaticCapabilityCheck desc" "PartType" "PartType desc" "SerialTrackingCodeDb" "SerialTrackingCodeDb desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "CumLeadtime" "OrderGapTime" "Density" "LowLevel" "BackflushPart" "EngineeringInfo" "StructureEffectivity" "RoutingEffectivity" "PromisePlanned" "DefaultPrintUnit" "ProcessType" "ConfigurationUsage" "ManufEngineer" "FixedLeadtimeDay" "VariableLeadtimeDay" "FixedLeadtimeHour" "VariableLeadtimeHour" "LeadtimeSource" "LotBatchString" "OverhaulScrapRule" "DopPeggedSoUpdateFlag" "MrpControlFlag" "ProdPartAsSupplyInMrp" "CloseTolerance" "UseTheoriticalDensity" "IssueType" "OverReporting" "OverReportTolerance" "IssuePlannedScrap" "ComponentScrap" "ShrinkageFactor" "UnprotectedLeadTime" "AdjustOnOpQtyDeviation" "IssueOverreportedQty" "CreatedFromContract" "CreatedFromPartNo" "CreatedFromConfigId" "PlanManufSupOnDueDate" "RunMrp" "RunCrp" "IncludeFirmDemands" "IncludeFirmSupplies" "OptimizeNewDeliveryDate" "RunInBackground" "ShipDirty" "ShipDirtyRepairCode" "AutoReplaceAltComp" "ConsiderLeadTime" "NbTrolleysForKit" "OperativeValue" "Uom" "OperativeValueSource" "OldDensityValue" "AutomaticCapabilityCheck" "PartType" "SerialTrackingCodeDb"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ProcessTypeRef" "DefaultPrintUnitRef" "ManufEngineerRef" "ShipDirtyRepairCodeRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ManufPartAttribute
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ManufPartAttribute

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
Get entity from Reference_ManufPartAttribute by key
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
Items Enum: "luname" "keyref" "Contract" "PartNo" "CumLeadtime" "OrderGapTime" "Density" "LowLevel" "BackflushPart" "EngineeringInfo" "StructureEffectivity" "RoutingEffectivity" "PromisePlanned" "DefaultPrintUnit" "ProcessType" "ConfigurationUsage" "ManufEngineer" "FixedLeadtimeDay" "VariableLeadtimeDay" "FixedLeadtimeHour" "VariableLeadtimeHour" "LeadtimeSource" "LotBatchString" "OverhaulScrapRule" "DopPeggedSoUpdateFlag" "MrpControlFlag" "ProdPartAsSupplyInMrp" "CloseTolerance" "UseTheoriticalDensity" "IssueType" "OverReporting" "OverReportTolerance" "IssuePlannedScrap" "ComponentScrap" "ShrinkageFactor" "UnprotectedLeadTime" "AdjustOnOpQtyDeviation" "IssueOverreportedQty" "CreatedFromContract" "CreatedFromPartNo" "CreatedFromConfigId" "PlanManufSupOnDueDate" "RunMrp" "RunCrp" "IncludeFirmDemands" "IncludeFirmSupplies" "OptimizeNewDeliveryDate" "RunInBackground" "ShipDirty" "ShipDirtyRepairCode" "AutoReplaceAltComp" "ConsiderLeadTime" "NbTrolleysForKit" "OperativeValue" "Uom" "OperativeValueSource" "OldDensityValue" "AutomaticCapabilityCheck" "PartType" "SerialTrackingCodeDb"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ProcessTypeRef" "DefaultPrintUnitRef" "ManufEngineerRef" "ShipDirtyRepairCodeRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type ManufPartAttribute
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ManufPartAttribute(Contract='{Contract}',PartNo='{PartNo}')

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
"CumLeadtime": 1,
"OrderGapTime": 1,
"Density": 1,
"LowLevel": 1,
"DefaultPrintUnit": "It is a Text",
"ProcessType": "It is a Text",
"ManufEngineer": "It is a Text",
"FixedLeadtimeDay": 1,
"VariableLeadtimeDay": 1,
"FixedLeadtimeHour": 1,
"VariableLeadtimeHour": 1,
"LotBatchString": "It is a Text",
"MrpControlFlag": true,
"ProdPartAsSupplyInMrp": true,
"CloseTolerance": 1,
"UseTheoriticalDensity": true,
"OverReportTolerance": 1,
"IssuePlannedScrap": true,
"ComponentScrap": 1,
"ShrinkageFactor": 1,
"UnprotectedLeadTime": 1,
"AdjustOnOpQtyDeviation": true,
"IssueOverreportedQty": true,
"CreatedFromContract": "It is a Text",
"CreatedFromPartNo": "It is a Text",
"CreatedFromConfigId": "It is a Text",
"PlanManufSupOnDueDate": true,
"RunMrp": true,
"RunCrp": true,
"IncludeFirmDemands": true,
"IncludeFirmSupplies": true,
"OptimizeNewDeliveryDate": true,
"RunInBackground": true,
"ShipDirty": true,
"ShipDirtyRepairCode": "It is a Text",
"AutoReplaceAltComp": true,
"ConsiderLeadTime": true,
"NbTrolleysForKit": 1,
"OperativeValue": "It is a Text",
"Uom": "It is a Text",
"OperativeValueSource": "It is a Text",
"OldDensityValue": 1,
"SerialTrackingCodeDb": "It is a Text",
"BackflushPart": "AllLocations",
"EngineeringInfo": "NotMandatory",
"StructureEffectivity": "Date",
"RoutingEffectivity": "Date",
"PromisePlanned": "Promised",
"ConfigurationUsage": "Common",
"LeadtimeSource": "Manufacturing",
"OverhaulScrapRule": "DirectScrap",
"DopPeggedSoUpdateFlag": "Planned",
"IssueType": "Reserve",
"OverReporting": "Allowed",
"AutomaticCapabilityCheck": "ReserveAndAllocate",
"PartType": "Manufactured"
}
Reference_RepairCodePart
Reference Entity Set Reference_RepairCodePart

Get entities from Reference_RepairCodePart
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "RepairCode" "RepairCode desc" "RepairDescription" "RepairDescription desc" "NoteId" "NoteId desc" "NoteText" "NoteText desc" "MroPreferredSupplier" "MroPreferredSupplier desc" "MroServiceSource" "MroServiceSource desc" "ServiceType" "ServiceType desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "RepairCode" "RepairDescription" "NoteId" "NoteText" "MroPreferredSupplier" "MroServiceSource" "ServiceType"
Specify properties to return, see OData Select

Responses
200 response body for entity array RepairCodePart
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_RepairCodePart

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
Get entity from Reference_RepairCodePart by key
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
RepairCode
required
string <= 10 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "RepairCode" "RepairDescription" "NoteId" "NoteText" "MroPreferredSupplier" "MroServiceSource" "ServiceType"
Specify properties to return, see OData Select

Responses
200 response body for entity type RepairCodePart
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_RepairCodePart(Contract='{Contract}',PartNo='{PartNo}',RepairCode='{RepairCode}')

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
"RepairCode": "It is a Text",
"RepairDescription": "It is a Text",
"NoteId": 1,
"NoteText": "It is a Text",
"MroPreferredSupplier": "It is a Text",
"ServiceType": "It is a Text",
"MroServiceSource": "InternalRepairOnly"
}
Reference_PartCopyEventParameter
Reference Entity Set Reference_PartCopyEventParameter

Get entities from Reference_PartCopyEventParameter
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
Items Enum: "EventNo" "EventNo desc" "Module" "Module desc" "DatasetId" "DatasetId desc" "Enabled" "Enabled desc" "CancelWhenNoSource" "CancelWhenNoSource desc" "CancelWhenExistingCopy" "CancelWhenExistingCopy desc" "ExecutionOrder" "ExecutionOrder desc" "PresentationOrder" "PresentationOrder desc" "EnabledDb" "EnabledDb desc" "PartInformationToCopy" "PartInformationToCopy desc" "CancelWhenNoSourceDb" "CancelWhenNoSourceDb desc" "CancelWhenExistingCopyDb" "CancelWhenExistingCopyDb desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "EventNo" "Module" "DatasetId" "Enabled" "CancelWhenNoSource" "CancelWhenExistingCopy" "ExecutionOrder" "PresentationOrder" "EnabledDb" "PartInformationToCopy" "CancelWhenNoSourceDb" "CancelWhenExistingCopyDb"
Specify properties to return, see OData Select

Responses
200 response body for entity array PartCopyEventParameter
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PartCopyEventParameter

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
Get entity from Reference_PartCopyEventParameter by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
EventNo
required
number
Example: 1
Module
required
string <= 100 characters
Example: It is a Text
DatasetId
required
string <= 100 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "EventNo" "Module" "DatasetId" "Enabled" "CancelWhenNoSource" "CancelWhenExistingCopy" "ExecutionOrder" "PresentationOrder" "EnabledDb" "PartInformationToCopy" "CancelWhenNoSourceDb" "CancelWhenExistingCopyDb"
Specify properties to return, see OData Select

Responses
200 response body for entity type PartCopyEventParameter
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PartCopyEventParameter(EventNo={EventNo},Module='{Module}',DatasetId='{DatasetId}')

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
"EventNo": 1,
"Module": "It is a Text",
"DatasetId": "It is a Text",
"Enabled": true,
"CancelWhenNoSource": true,
"CancelWhenExistingCopy": true,
"ExecutionOrder": 1,
"PresentationOrder": 1,
"EnabledDb": true,
"PartInformationToCopy": "It is a Text",
"CancelWhenNoSourceDb": true,
"CancelWhenExistingCopyDb": true
}
Reference_CustomerWarrantyCondition
Reference Entity Set Reference_CustomerWarrantyCondition

Get entities from Reference_CustomerWarrantyCondition
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
Items Enum: "WarrantyId" "WarrantyId desc" "WarrantyTypeId" "WarrantyTypeId desc" "ConditionId" "ConditionId desc" "MinValue" "MinValue desc" "MaxValue" "MaxValue desc" "VirtualObjkey" "VirtualObjkey desc" "PartNo" "PartNo desc" "SerialNo" "SerialNo desc" "ValidFrom" "ValidFrom desc" "ValidTo" "ValidTo desc" "OtherUom" "OtherUom desc" "ParentObjkey" "ParentObjkey desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "ConditionId" "MinValue" "MaxValue" "VirtualObjkey" "PartNo" "SerialNo" "ValidFrom" "ValidTo" "OtherUom" "ParentObjkey"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ConditionIdRef" "OtherUomRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array CustomerWarrantyCondition
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CustomerWarrantyCondition

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
Get entity from Reference_CustomerWarrantyCondition by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
WarrantyId
required
number
Example: 1
WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
ConditionId
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "ConditionId" "MinValue" "MaxValue" "VirtualObjkey" "PartNo" "SerialNo" "ValidFrom" "ValidTo" "OtherUom" "ParentObjkey"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ConditionIdRef" "OtherUomRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type CustomerWarrantyCondition
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CustomerWarrantyCondition(WarrantyId={WarrantyId},WarrantyTypeId='{WarrantyTypeId}',ConditionId={ConditionId})

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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"VirtualObjkey": "It is a Text",
"PartNo": "It is a Text",
"SerialNo": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidTo": "2019-10-10",
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Reference_WarrantyCondition
Reference Entity Set Reference_WarrantyCondition

Get entities from Reference_WarrantyCondition
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
Items Enum: "ConditionId" "ConditionId desc" "ConditionDescription" "ConditionDescription desc" "MinValue" "MinValue desc" "MaxValue" "MaxValue desc" "TimeUnit" "TimeUnit desc" "UnitCode" "UnitCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ConditionId" "ConditionDescription" "MinValue" "MaxValue" "TimeUnit" "UnitCode"
Specify properties to return, see OData Select

Responses
200 response body for entity array WarrantyCondition
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_WarrantyCondition

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
Get entity from Reference_WarrantyCondition by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
ConditionId
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "ConditionId" "ConditionDescription" "MinValue" "MaxValue" "TimeUnit" "UnitCode"
Specify properties to return, see OData Select

Responses
200 response body for entity type WarrantyCondition
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_WarrantyCondition(ConditionId={ConditionId})

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
"ConditionId": 1,
"ConditionDescription": "It is a Text",
"MinValue": 1,
"MaxValue": 1,
"UnitCode": "It is a Text",
"TimeUnit": "Year"
}
Reference_WarrantyLanguageDescription
Reference Entity Set Reference_WarrantyLanguageDescription

Get entities from Reference_WarrantyLanguageDescription
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
Items Enum: "WarrantyId" "WarrantyId desc" "WarrantyTypeId" "WarrantyTypeId desc" "LanguageCode" "LanguageCode desc" "WarrantyTypeDesc" "WarrantyTypeDesc desc" "NoteId" "NoteId desc" "DocumentText" "DocumentText desc" "ParentObjkey" "ParentObjkey desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "LanguageCode" "WarrantyTypeDesc" "NoteId" "DocumentText" "ParentObjkey"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "LanguageCodeRef" "WarrantyTypeIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array WarrantyLanguageDescription
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_WarrantyLanguageDescription

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
Get entity from Reference_WarrantyLanguageDescription by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
LanguageCode
required
string <= 2 characters
Example: It is a Text
WarrantyId
required
number
Example: 1
WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "LanguageCode" "WarrantyTypeDesc" "NoteId" "DocumentText" "ParentObjkey"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "LanguageCodeRef" "WarrantyTypeIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type WarrantyLanguageDescription
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_WarrantyLanguageDescription(LanguageCode='{LanguageCode}',WarrantyId={WarrantyId},WarrantyTypeId='{WarrantyTypeId}')

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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"LanguageCode": "It is a Text",
"WarrantyTypeDesc": "It is a Text",
"NoteId": 1,
"DocumentText": true,
"ParentObjkey": "It is a Text"
}
Reference_IsoLanguage
Reference Entity Set Reference_IsoLanguage

Get entities from Reference_IsoLanguage
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
Items Enum: "LanguageCode" "LanguageCode desc" "Description" "Description desc" "UsedInAppl" "UsedInAppl desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "LanguageCode" "Description" "UsedInAppl"
Specify properties to return, see OData Select

Responses
200 response body for entity array IsoLanguage
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_IsoLanguage

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
Get entity from Reference_IsoLanguage by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
LanguageCode
required
string <= 2 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "LanguageCode" "Description" "UsedInAppl"
Specify properties to return, see OData Select

Responses
200 response body for entity type IsoLanguage
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_IsoLanguage(LanguageCode='{LanguageCode}')

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
"LanguageCode": "It is a Text",
"Description": "It is a Text",
"UsedInAppl": "It is a Text"
}
Reference_CustWarrantyType
Reference Entity Set Reference_CustWarrantyType

Get entities from Reference_CustWarrantyType
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
Items Enum: "WarrantyId" "WarrantyId desc" "WarrantyTypeId" "WarrantyTypeId desc" "WarrantyDescription" "WarrantyDescription desc" "NoteText" "NoteText desc" "ExpensesCostType" "ExpensesCostType desc" "ExternalCostType" "ExternalCostType desc" "FixedPriceCostType" "FixedPriceCostType desc" "MaterialCostType" "MaterialCostType desc" "PersonnelCostType" "PersonnelCostType desc" "WarrantyConditionRule" "WarrantyConditionRule desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "WarrantyDescription" "NoteText" "ExpensesCostType" "ExternalCostType" "FixedPriceCostType" "MaterialCostType" "PersonnelCostType" "WarrantyConditionRule"
Specify properties to return, see OData Select

Responses
200 response body for entity array CustWarrantyType
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CustWarrantyType

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
Get entity from Reference_CustWarrantyType by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
WarrantyId
required
number
Example: 1
WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "WarrantyDescription" "NoteText" "ExpensesCostType" "ExternalCostType" "FixedPriceCostType" "MaterialCostType" "PersonnelCostType" "WarrantyConditionRule"
Specify properties to return, see OData Select

Responses
200 response body for entity type CustWarrantyType
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CustWarrantyType(WarrantyId={WarrantyId},WarrantyTypeId='{WarrantyTypeId}')

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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"WarrantyDescription": "It is a Text",
"NoteText": "It is a Text",
"ExpensesCostType": "Expenses",
"ExternalCostType": "External",
"FixedPriceCostType": "FixedPrice",
"MaterialCostType": "Material",
"PersonnelCostType": "Personnel",
"WarrantyConditionRule": "Inclusive"
}
Reference_SupplierWarrantyCondition
Reference Entity Set Reference_SupplierWarrantyCondition

Get entities from Reference_SupplierWarrantyCondition
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
Items Enum: "WarrantyId" "WarrantyId desc" "WarrantyTypeId" "WarrantyTypeId desc" "ConditionId" "ConditionId desc" "MinValue" "MinValue desc" "MaxValue" "MaxValue desc" "OtherUom" "OtherUom desc" "ParentObjkey" "ParentObjkey desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "ConditionId" "MinValue" "MaxValue" "OtherUom" "ParentObjkey"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "ConditionIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array SupplierWarrantyCondition
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SupplierWarrantyCondition

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
Get entity from Reference_SupplierWarrantyCondition by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
WarrantyId
required
number
Example: 1
WarrantyTypeId
required
string <= 20 characters
Example: It is a Text
ConditionId
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "WarrantyId" "WarrantyTypeId" "ConditionId" "MinValue" "MaxValue" "OtherUom" "ParentObjkey"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "ConditionIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type SupplierWarrantyCondition
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SupplierWarrantyCondition(WarrantyId={WarrantyId},WarrantyTypeId='{WarrantyTypeId}',ConditionId={ConditionId})

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
"WarrantyId": 1,
"WarrantyTypeId": "It is a Text",
"ConditionId": 1,
"MinValue": 1,
"MaxValue": 1,
"OtherUom": "It is a Text",
"ParentObjkey": "It is a Text"
}
Reference_InventoryMaterialPriceElement
Reference Entity Set Reference_InventoryMaterialPriceElement

Get entities from Reference_InventoryMaterialPriceElement
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "PriceElementLineNo" "PriceElementLineNo desc" "PriceElementId" "PriceElementId desc" "ShareAmount" "ShareAmount desc" "UnitMeasure" "UnitMeasure desc" "Surcharge" "Surcharge desc" "ValidFrom" "ValidFrom desc" "ValidTo" "ValidTo desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "PriceElementLineNo" "PriceElementId" "ShareAmount" "UnitMeasure" "Surcharge" "ValidFrom" "ValidTo"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "PriceElementIdRef" "UnitMeasureRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array InventoryMaterialPriceElement
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryMaterialPriceElement

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
Get entity from Reference_InventoryMaterialPriceElement by key
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
PriceElementLineNo
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "PriceElementLineNo" "PriceElementId" "ShareAmount" "UnitMeasure" "Surcharge" "ValidFrom" "ValidTo"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "PriceElementIdRef" "UnitMeasureRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type InventoryMaterialPriceElement
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryMaterialPriceElement(Contract='{Contract}',PartNo='{PartNo}',PriceElementLineNo={PriceElementLineNo})

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
"PriceElementLineNo": 1,
"PriceElementId": "It is a Text",
"ShareAmount": 1,
"UnitMeasure": "It is a Text",
"Surcharge": 1,
"ValidFrom": "2019-10-10",
"ValidTo": "2019-10-10"
}
Reference_AbcClass
Reference Entity Set Reference_AbcClass

Get entities from Reference_AbcClass
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
Items Enum: "AbcClass" "AbcClass desc" "AbcPercent" "AbcPercent desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "AbcClass" "AbcPercent"
Specify properties to return, see OData Select

Responses
200 response body for entity array AbcClass
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_AbcClass

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
Get entity from Reference_AbcClass by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
AbcClass
required
string <= 1 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "AbcClass" "AbcPercent"
Specify properties to return, see OData Select

Responses
200 response body for entity type AbcClass
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_AbcClass(AbcClass='{AbcClass}')

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
"AbcClass": "It is a Text",
"AbcPercent": 1
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
Reference_PartCatalog
Reference Entity Set Reference_PartCatalog

Get entities from Reference_PartCatalog
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
Items Enum: "PartNo" "PartNo desc" "Description" "Description desc" "LanguageDescription" "LanguageDescription desc" "InfoText" "InfoText desc" "StdNameId" "StdNameId desc" "UnitCode" "UnitCode desc" "LotTrackingCode" "LotTrackingCode desc" "SerialRule" "SerialRule desc" "SerialTrackingCode" "SerialTrackingCode desc" "EngSerialTrackingCode" "EngSerialTrackingCode desc" "PartMainGroup" "PartMainGroup desc" "Configurable" "Configurable desc" "CustWarrantyId" "CustWarrantyId desc" "SupWarrantyId" "SupWarrantyId desc" "ConditionCodeUsage" "ConditionCodeUsage desc" "SubLotRule" "SubLotRule desc" "LotQuantityRule" "LotQuantityRule desc" "PositionPart" "PositionPart desc" "InputUnitMeasGroupId" "InputUnitMeasGroupId desc" "CatchUnitEnabled" "CatchUnitEnabled desc" "MultilevelTracking" "MultilevelTracking desc" "ComponentLotRule" "ComponentLotRule desc" "StopArrivalIssuedSerial" "StopArrivalIssuedSerial desc" "WeightNet" "WeightNet desc" "UomForWeightNet" "UomForWeightNet desc" "VolumeNet" "VolumeNet desc" "UomForVolumeNet" "UomForVolumeNet desc" "FreightFactor" "FreightFactor desc" "AllowAsNotConsumed" "AllowAsNotConsumed desc" "ReceiptIssueSerialTrack" "ReceiptIssueSerialTrack desc" "StopNewSerialInRma" "StopNewSerialInRma desc" "TechnicalDrawingNo" "TechnicalDrawingNo desc" "ProductTypeClassif" "ProductTypeClassif desc" "CestCode" "CestCode desc" "FciCode" "FciCode desc" "FirstInventorySite" "FirstInventorySite desc" "Ppv" "Ppv desc" "IsNewPart" "IsNewPart desc" "CPpvStatus" "CPpvStatus desc" "CPartConfigCompletion" "CPartConfigCompletion desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PartNo" "Description" "LanguageDescription" "InfoText" "StdNameId" "UnitCode" "LotTrackingCode" "SerialRule" "SerialTrackingCode" "EngSerialTrackingCode" "PartMainGroup" "Configurable" "CustWarrantyId" "SupWarrantyId" "ConditionCodeUsage" "SubLotRule" "LotQuantityRule" "PositionPart" "InputUnitMeasGroupId" "CatchUnitEnabled" "MultilevelTracking" "ComponentLotRule" "StopArrivalIssuedSerial" "WeightNet" "UomForWeightNet" "VolumeNet" "UomForVolumeNet" "FreightFactor" "AllowAsNotConsumed" "ReceiptIssueSerialTrack" "StopNewSerialInRma" "TechnicalDrawingNo" "ProductTypeClassif" "CestCode" "FciCode" "FirstInventorySite" "Ppv" "IsNewPart" "CPpvStatus" "CPartConfigCompletion"
Specify properties to return, see OData Select

Responses
200 response body for entity array PartCatalog
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PartCatalog

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
Get entity from Reference_PartCatalog by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "PartNo" "Description" "LanguageDescription" "InfoText" "StdNameId" "UnitCode" "LotTrackingCode" "SerialRule" "SerialTrackingCode" "EngSerialTrackingCode" "PartMainGroup" "Configurable" "CustWarrantyId" "SupWarrantyId" "ConditionCodeUsage" "SubLotRule" "LotQuantityRule" "PositionPart" "InputUnitMeasGroupId" "CatchUnitEnabled" "MultilevelTracking" "ComponentLotRule" "StopArrivalIssuedSerial" "WeightNet" "UomForWeightNet" "VolumeNet" "UomForVolumeNet" "FreightFactor" "AllowAsNotConsumed" "ReceiptIssueSerialTrack" "StopNewSerialInRma" "TechnicalDrawingNo" "ProductTypeClassif" "CestCode" "FciCode" "FirstInventorySite" "Ppv" "IsNewPart" "CPpvStatus" "CPartConfigCompletion"
Specify properties to return, see OData Select

Responses
200 response body for entity type PartCatalog
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PartCatalog(PartNo='{PartNo}')

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
"PartNo": "It is a Text",
"Description": "It is a Text",
"LanguageDescription": "It is a Text",
"InfoText": "It is a Text",
"StdNameId": 1,
"UnitCode": "It is a Text",
"PartMainGroup": "It is a Text",
"CustWarrantyId": 1,
"SupWarrantyId": 1,
"InputUnitMeasGroupId": "It is a Text",
"CatchUnitEnabled": true,
"StopArrivalIssuedSerial": true,
"WeightNet": 1,
"UomForWeightNet": "It is a Text",
"VolumeNet": 1,
"UomForVolumeNet": "It is a Text",
"FreightFactor": 1,
"AllowAsNotConsumed": true,
"ReceiptIssueSerialTrack": true,
"StopNewSerialInRma": true,
"TechnicalDrawingNo": "It is a Text",
"CestCode": "It is a Text",
"FciCode": "It is a Text",
"FirstInventorySite": "It is a Text",
"Ppv": "It is a Text",
"IsNewPart": "It is a Text",
"CPpvStatus": "It is a Text",
"CPartConfigCompletion": "It is a Text",
"LotTrackingCode": "LotTracking",
"SerialRule": "Manual",
"SerialTrackingCode": "SerialTracking",
"EngSerialTrackingCode": "SerialTracking",
"Configurable": "Configured",
"ConditionCodeUsage": "AllowConditionCode",
"SubLotRule": "SubLotsAllowed",
"LotQuantityRule": "OneLotPerShopOrder",
"PositionPart": "PositionPart",
"MultilevelTracking": "TrackingOn",
"ComponentLotRule": "ManyLotsAllowed",
"ProductTypeClassif": "FinishedProduct"
}
Reference_AssetClass
Reference Entity Set Reference_AssetClass

Get entities from Reference_AssetClass
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
Items Enum: "Objstate" "Objstate desc" "AssetClass" "AssetClass desc" "Description" "Description desc" "OeAllocAssignFlag" "OeAllocAssignFlag desc" "OnhandAnalysisFlag" "OnhandAnalysisFlag desc" "ShortageFlag" "ShortageFlag desc" "ForecastConsumptionFlag" "ForecastConsumptionFlag desc" "AutomaticCapabilityCheck" "AutomaticCapabilityCheck desc" "CoReserveOnhAnalysFlag" "CoReserveOnhAnalysFlag desc" "UpperLimitVeryslowMover" "UpperLimitVeryslowMover desc" "UpperLimitSlowMover" "UpperLimitSlowMover desc" "UpperLimitMediumMover" "UpperLimitMediumMover desc" "IntroductionDurationDays" "IntroductionDurationDays desc" "DeclineInactivityDays" "DeclineInactivityDays desc" "ExpiredInactivityDays" "ExpiredInactivityDays desc" "DeclineToMatureIssues" "DeclineToMatureIssues desc" "ExpiredToIntroIssues" "ExpiredToIntroIssues desc" "SeasonalDemandPattern" "SeasonalDemandPattern desc" "SafetyLeadTime" "SafetyLeadTime desc" "ClassificationPeriods" "ClassificationPeriods desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "AssetClass" "Description" "OeAllocAssignFlag" "OnhandAnalysisFlag" "ShortageFlag" "ForecastConsumptionFlag" "AutomaticCapabilityCheck" "CoReserveOnhAnalysFlag" "UpperLimitVeryslowMover" "UpperLimitSlowMover" "UpperLimitMediumMover" "IntroductionDurationDays" "DeclineInactivityDays" "ExpiredInactivityDays" "DeclineToMatureIssues" "ExpiredToIntroIssues" "SeasonalDemandPattern" "SafetyLeadTime" "ClassificationPeriods"
Specify properties to return, see OData Select

Responses
200 response body for entity array AssetClass
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_AssetClass

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
Get entity from Reference_AssetClass by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
AssetClass
required
string <= 2 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "AssetClass" "Description" "OeAllocAssignFlag" "OnhandAnalysisFlag" "ShortageFlag" "ForecastConsumptionFlag" "AutomaticCapabilityCheck" "CoReserveOnhAnalysFlag" "UpperLimitVeryslowMover" "UpperLimitSlowMover" "UpperLimitMediumMover" "IntroductionDurationDays" "DeclineInactivityDays" "ExpiredInactivityDays" "DeclineToMatureIssues" "ExpiredToIntroIssues" "SeasonalDemandPattern" "SafetyLeadTime" "ClassificationPeriods"
Specify properties to return, see OData Select

Responses
200 response body for entity type AssetClass
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_AssetClass(AssetClass='{AssetClass}')

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
"AssetClass": "It is a Text",
"Description": "It is a Text",
"UpperLimitVeryslowMover": 1,
"UpperLimitSlowMover": 1,
"UpperLimitMediumMover": 1,
"IntroductionDurationDays": 1,
"DeclineInactivityDays": 1,
"ExpiredInactivityDays": 1,
"DeclineToMatureIssues": 1,
"ExpiredToIntroIssues": 1,
"SeasonalDemandPattern": true,
"SafetyLeadTime": 1,
"ClassificationPeriods": 1,
"Objstate": "Active",
"OeAllocAssignFlag": "PriorityReservation",
"OnhandAnalysisFlag": "MakeAvailabilityCheck",
"ShortageFlag": "ShortageNotation",
"ForecastConsumptionFlag": "OnlineConsumption",
"AutomaticCapabilityCheck": "ReserveAndAllocate",
"CoReserveOnhAnalysFlag": "MakeAvailabilityCheck"
}
Reference_InventoryPartStatusPar
Reference Entity Set Reference_InventoryPartStatusPar

Get entities from Reference_InventoryPartStatusPar
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
Items Enum: "Objstate" "Objstate desc" "PartStatus" "PartStatus desc" "Description" "Description desc" "DemandFlag" "DemandFlag desc" "OnhandFlag" "OnhandFlag desc" "SupplyFlag" "SupplyFlag desc" "DefaultStatus" "DefaultStatus desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "PartStatus" "Description" "DemandFlag" "OnhandFlag" "SupplyFlag" "DefaultStatus"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryPartStatusPar
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryPartStatusPar

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
Get entity from Reference_InventoryPartStatusPar by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartStatus
required
string <= 1 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "PartStatus" "Description" "DemandFlag" "OnhandFlag" "SupplyFlag" "DefaultStatus"
Specify properties to return, see OData Select

Responses
200 response body for entity type InventoryPartStatusPar
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryPartStatusPar(PartStatus='{PartStatus}')

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
"PartStatus": "It is a Text",
"Description": "It is a Text",
"DefaultStatus": true,
"Objstate": "Active",
"DemandFlag": "DemandsAllowed",
"OnhandFlag": "OnhandAllowed",
"SupplyFlag": "SuppliesAllowed"
}
Reference_SafetyInstruction
Reference Entity Set Reference_SafetyInstruction

Get entities from Reference_SafetyInstruction
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
Items Enum: "Objstate" "Objstate desc" "HazardCode" "HazardCode desc" "Description" "Description desc" "NoteText" "NoteText desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "HazardCode" "Description" "NoteText"
Specify properties to return, see OData Select

Responses
200 response body for entity array SafetyInstruction
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SafetyInstruction

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
Get entity from Reference_SafetyInstruction by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
HazardCode
required
string <= 6 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "HazardCode" "Description" "NoteText"
Specify properties to return, see OData Select

Responses
200 response body for entity type SafetyInstruction
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SafetyInstruction(HazardCode='{HazardCode}')

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
"HazardCode": "It is a Text",
"Description": "It is a Text",
"NoteText": "It is a Text",
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
Reference_IsoCountry
Reference Entity Set Reference_IsoCountry

Get entities from Reference_IsoCountry
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
Items Enum: "CountryCode" "CountryCode desc" "CountryCode3" "CountryCode3 desc" "CountryId" "CountryId desc" "Description" "Description desc" "UsedInAppl" "UsedInAppl desc" "FullName" "FullName desc" "EuMember" "EuMember desc" "DefaultLocale" "DefaultLocale desc" "BlockedForUse" "BlockedForUse desc" "SystemAdded" "SystemAdded desc" "FetchJurisdictionCode" "FetchJurisdictionCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CountryCode" "CountryCode3" "CountryId" "Description" "UsedInAppl" "FullName" "EuMember" "DefaultLocale" "BlockedForUse" "SystemAdded" "FetchJurisdictionCode"
Specify properties to return, see OData Select

Responses
200 response body for entity array IsoCountry
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_IsoCountry

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
Get entity from Reference_IsoCountry by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
CountryCode
required
string <= 2 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "CountryCode" "CountryCode3" "CountryId" "Description" "UsedInAppl" "FullName" "EuMember" "DefaultLocale" "BlockedForUse" "SystemAdded" "FetchJurisdictionCode"
Specify properties to return, see OData Select

Responses
200 response body for entity type IsoCountry
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_IsoCountry(CountryCode='{CountryCode}')

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
"CountryCode": "It is a Text",
"CountryCode3": "It is a Text",
"CountryId": 1,
"Description": "It is a Text",
"UsedInAppl": "It is a Text",
"FullName": "It is a Text",
"DefaultLocale": "It is a Text",
"BlockedForUse": true,
"SystemAdded": "It is a Text",
"FetchJurisdictionCode": true,
"EuMember": "EUMember"
}
Reference_CountryRegion
Reference Entity Set Reference_CountryRegion

Get entities from Reference_CountryRegion
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
Items Enum: "CountryCode" "CountryCode desc" "RegionCode" "RegionCode desc" "RegionName" "RegionName desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "CountryCode" "RegionCode" "RegionName"
Specify properties to return, see OData Select

Responses
200 response body for entity array CountryRegion
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CountryRegion

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
Get entity from Reference_CountryRegion by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
CountryCode
required
string <= 2 characters
Example: It is a Text
RegionCode
required
string <= 10 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "CountryCode" "RegionCode" "RegionName"
Specify properties to return, see OData Select

Responses
200 response body for entity type CountryRegion
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CountryRegion(CountryCode='{CountryCode}',RegionCode='{RegionCode}')

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
"CountryCode": "It is a Text",
"RegionCode": "It is a Text",
"RegionName": "It is a Text"
}
Reference_CustomsStatisticsNumber
Reference Entity Set Reference_CustomsStatisticsNumber

Get entities from Reference_CustomsStatisticsNumber
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
Items Enum: "Objstate" "Objstate desc" "CustomsStatNo" "CustomsStatNo desc" "CustomsUnitMeas" "CustomsUnitMeas desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "CustomsStatNo" "CustomsUnitMeas" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array CustomsStatisticsNumber
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CustomsStatisticsNumber

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
Get entity from Reference_CustomsStatisticsNumber by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
CustomsStatNo
required
string <= 15 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "CustomsStatNo" "CustomsUnitMeas" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type CustomsStatisticsNumber
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CustomsStatisticsNumber(CustomsStatNo='{CustomsStatNo}')

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
"CustomsStatNo": "It is a Text",
"CustomsUnitMeas": "It is a Text",
"Description": "It is a Text",
"Objstate": "Active"
}
Reference_SupplyChainPartGroup
Reference Entity Set Reference_SupplyChainPartGroup

Get entities from Reference_SupplyChainPartGroup
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
Items Enum: "Objstate" "Objstate desc" "SupplyChainPartGroup" "SupplyChainPartGroup desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "SupplyChainPartGroup" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array SupplyChainPartGroup
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SupplyChainPartGroup

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
Get entity from Reference_SupplyChainPartGroup by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
SupplyChainPartGroup
required
string <= 20 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "SupplyChainPartGroup" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type SupplyChainPartGroup
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SupplyChainPartGroup(SupplyChainPartGroup='{SupplyChainPartGroup}')

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
"SupplyChainPartGroup": "It is a Text",
"Description": "It is a Text",
"Objstate": "Active"
}
Reference_CustWarranty
Reference Entity Set Reference_CustWarranty

Get entities from Reference_CustWarranty
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
Items Enum: "Objstate" "Objstate desc" "WarrantyId" "WarrantyId desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "WarrantyId"
Specify properties to return, see OData Select

Responses
200 response body for entity array CustWarranty
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CustWarranty

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
Get entity from Reference_CustWarranty by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
WarrantyId
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "WarrantyId"
Specify properties to return, see OData Select

Responses
200 response body for entity type CustWarranty
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CustWarranty(WarrantyId={WarrantyId})

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
"WarrantyId": 1,
"Objstate": "Unique"
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
Reference_StatisticalCode
Reference Entity Set Reference_StatisticalCode

Get entities from Reference_StatisticalCode
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
Items Enum: "Objstate" "Objstate desc" "Company" "Company desc" "StatisticalCode" "StatisticalCode desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Company" "StatisticalCode" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array StatisticalCode
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_StatisticalCode

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
Get entity from Reference_StatisticalCode by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string <= 20 characters
Example: It is a Text
StatisticalCode
required
string <= 15 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Company" "StatisticalCode" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type StatisticalCode
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_StatisticalCode(Company='{Company}',StatisticalCode='{StatisticalCode}')

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
"StatisticalCode": "It is a Text",
"Description": "It is a Text",
"Objstate": "Active"
}
Reference_AcquisitionReason
Reference Entity Set Reference_AcquisitionReason

Get entities from Reference_AcquisitionReason
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
Items Enum: "Company" "Company desc" "AcquisitionReasonId" "AcquisitionReasonId desc" "Description" "Description desc" "ExternalUseType" "ExternalUseType desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "AcquisitionReasonId" "Description" "ExternalUseType"
Specify properties to return, see OData Select

Responses
200 response body for entity array AcquisitionReason
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_AcquisitionReason

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
Get entity from Reference_AcquisitionReason by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string <= 20 characters
Example: It is a Text
AcquisitionReasonId
required
string <= 20 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "AcquisitionReasonId" "Description" "ExternalUseType"
Specify properties to return, see OData Select

Responses
200 response body for entity type AcquisitionReason
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_AcquisitionReason(Company='{Company}',AcquisitionReasonId='{AcquisitionReasonId}')

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
"AcquisitionReasonId": "It is a Text",
"Description": "It is a Text",
"ExternalUseType": "UseOrConsumption"
}
Reference_AcquisitionOrigin
Reference Entity Set Reference_AcquisitionOrigin

Get entities from Reference_AcquisitionOrigin
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
Items Enum: "Objstate" "Objstate desc" "Company" "Company desc" "AcquisitionOrigin" "AcquisitionOrigin desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Company" "AcquisitionOrigin" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array AcquisitionOrigin
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_AcquisitionOrigin

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
Get entity from Reference_AcquisitionOrigin by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string <= 20 characters
Example: It is a Text
AcquisitionOrigin
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Company" "AcquisitionOrigin" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type AcquisitionOrigin
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_AcquisitionOrigin(Company='{Company}',AcquisitionOrigin={AcquisitionOrigin})

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
"AcquisitionOrigin": 1,
"Description": "It is a Text",
"Objstate": "Active"
}
Reference_HsnSacCode
Reference Entity Set Reference_HsnSacCode

Get entities from Reference_HsnSacCode
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
Items Enum: "Company" "Company desc" "HsnSacCode" "HsnSacCode desc" "Description" "Description desc" "HsnSacType" "HsnSacType desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "HsnSacCode" "Description" "HsnSacType"
Specify properties to return, see OData Select

Responses
200 response body for entity array HsnSacCode
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_HsnSacCode

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
Get entity from Reference_HsnSacCode by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string <= 20 characters
Example: It is a Text
HsnSacCode
required
string <= 20 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "HsnSacCode" "Description" "HsnSacType"
Specify properties to return, see OData Select

Responses
200 response body for entity type HsnSacCode
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_HsnSacCode(Company='{Company}',HsnSacCode='{HsnSacCode}')

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
"HsnSacCode": "It is a Text",
"Description": "It is a Text",
"HsnSacType": "G"
}
Reference_InvPartProductCategory
Reference Entity Set Reference_InvPartProductCategory

Get entities from Reference_InvPartProductCategory
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
Items Enum: "Objstate" "Objstate desc" "Company" "Company desc" "ProductCategoryId" "ProductCategoryId desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Company" "ProductCategoryId" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array InvPartProductCategory
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InvPartProductCategory

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
Get entity from Reference_InvPartProductCategory by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string <= 20 characters
Example: It is a Text
ProductCategoryId
required
string <= 50 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Company" "ProductCategoryId" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type InvPartProductCategory
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InvPartProductCategory(Company='{Company}',ProductCategoryId='{ProductCategoryId}')

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
"ProductCategoryId": "It is a Text",
"Description": "It is a Text",
"Objstate": "Active"
}
Reference_CPpvStatus
Reference Entity Set Reference_CPpvStatus

Get entities from Reference_CPpvStatus
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
Items Enum: "Objstate" "Objstate desc" "PpvId" "PpvId desc" "Description" "Description desc" "DefaultStatus" "DefaultStatus desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "PpvId" "Description" "DefaultStatus"
Specify properties to return, see OData Select

Responses
200 response body for entity array CPpvStatus
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CPpvStatus

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
Get entity from Reference_CPpvStatus by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
PpvId
required
string <= 100 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "PpvId" "Description" "DefaultStatus"
Specify properties to return, see OData Select

Responses
200 response body for entity type CPpvStatus
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CPpvStatus(PpvId='{PpvId}')

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
"PpvId": "It is a Text",
"Description": "It is a Text",
"DefaultStatus": true,
"Objstate": "Active"
}
Reference_InventoryPartChar
Reference Entity Set Reference_InventoryPartChar

Get entities from Reference_InventoryPartChar
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "CharacteristicCode" "CharacteristicCode desc" "UnitMeas" "UnitMeas desc" "AttrValueNumeric" "AttrValueNumeric desc" "AttrValueAlpha" "AttrValueAlpha desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "CharacteristicCode" "UnitMeas" "AttrValueNumeric" "AttrValueAlpha"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "CharacteristicRef" "AttrValueNumericRef" "AttrValueAlphaRef" "UnitMeasRef"
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
/Reference_InventoryPartChar

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
Get entity from Reference_InventoryPartChar by key
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
CharacteristicCode
required
string <= 5 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "CharacteristicCode" "UnitMeas" "AttrValueNumeric" "AttrValueAlpha"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "CharacteristicRef" "AttrValueNumericRef" "AttrValueAlphaRef" "UnitMeasRef"
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
/Reference_InventoryPartChar(Contract='{Contract}',PartNo='{PartNo}',CharacteristicCode='{CharacteristicCode}')

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
"AttrValueNumeric": 1,
"AttrValueAlpha": "It is a Text"
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
Reference_CustWarrantyTypeTemp
Reference Entity Set Reference_CustWarrantyTypeTemp

Get entities from Reference_CustWarrantyTypeTemp
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
Items Enum: "TemplateId" "TemplateId desc" "WarrantyDescription" "WarrantyDescription desc" "NoteText" "NoteText desc" "MaterialCostType" "MaterialCostType desc" "ExpensesCostType" "ExpensesCostType desc" "FixedPriceCostType" "FixedPriceCostType desc" "PersonnelCostType" "PersonnelCostType desc" "ExternalCostType" "ExternalCostType desc" "WarrantyConditionRule" "WarrantyConditionRule desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "TemplateId" "WarrantyDescription" "NoteText" "MaterialCostType" "ExpensesCostType" "FixedPriceCostType" "PersonnelCostType" "ExternalCostType" "WarrantyConditionRule"
Specify properties to return, see OData Select

Responses
200 response body for entity array CustWarrantyTypeTemp
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CustWarrantyTypeTemp

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
Get entity from Reference_CustWarrantyTypeTemp by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
TemplateId
required
string <= 20 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "TemplateId" "WarrantyDescription" "NoteText" "MaterialCostType" "ExpensesCostType" "FixedPriceCostType" "PersonnelCostType" "ExternalCostType" "WarrantyConditionRule"
Specify properties to return, see OData Select

Responses
200 response body for entity type CustWarrantyTypeTemp
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_CustWarrantyTypeTemp(TemplateId='{TemplateId}')

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
"TemplateId": "It is a Text",
"WarrantyDescription": "It is a Text",
"NoteText": "It is a Text",
"MaterialCostType": "Material",
"ExpensesCostType": "Expenses",
"FixedPriceCostType": "FixedPrice",
"PersonnelCostType": "Personnel",
"ExternalCostType": "External",
"WarrantyConditionRule": "Inclusive"
}
Reference_SupWarrantyTypeTemp
Reference Entity Set Reference_SupWarrantyTypeTemp

Get entities from Reference_SupWarrantyTypeTemp
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
Items Enum: "TemplateId" "TemplateId desc" "WarrantyDescription" "WarrantyDescription desc" "NoteText" "NoteText desc" "MaterialCostType" "MaterialCostType desc" "ExpensesCostType" "ExpensesCostType desc" "FixedPriceCostType" "FixedPriceCostType desc" "PersonnelCostType" "PersonnelCostType desc" "ExternalCostType" "ExternalCostType desc" "WarrantyConditionRule" "WarrantyConditionRule desc" "CustomerOrderConnection" "CustomerOrderConnection desc" "ConvertToCustOrd" "ConvertToCustOrd desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "TemplateId" "WarrantyDescription" "NoteText" "MaterialCostType" "ExpensesCostType" "FixedPriceCostType" "PersonnelCostType" "ExternalCostType" "WarrantyConditionRule" "CustomerOrderConnection" "ConvertToCustOrd"
Specify properties to return, see OData Select

Responses
200 response body for entity array SupWarrantyTypeTemp
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SupWarrantyTypeTemp

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
Get entity from Reference_SupWarrantyTypeTemp by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
TemplateId
required
string <= 20 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "TemplateId" "WarrantyDescription" "NoteText" "MaterialCostType" "ExpensesCostType" "FixedPriceCostType" "PersonnelCostType" "ExternalCostType" "WarrantyConditionRule" "CustomerOrderConnection" "ConvertToCustOrd"
Specify properties to return, see OData Select

Responses
200 response body for entity type SupWarrantyTypeTemp
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SupWarrantyTypeTemp(TemplateId='{TemplateId}')

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
"TemplateId": "It is a Text",
"WarrantyDescription": "It is a Text",
"NoteText": "It is a Text",
"MaterialCostType": "Material",
"ExpensesCostType": "Expenses",
"FixedPriceCostType": "FixedPrice",
"PersonnelCostType": "Personnel",
"ExternalCostType": "External",
"WarrantyConditionRule": "Inclusive",
"CustomerOrderConnection": "Calculate",
"ConvertToCustOrd": "Convert"
}
Reference_TechnicalDrawing
Reference Entity Set Reference_TechnicalDrawing

Get entities from Reference_TechnicalDrawing
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
Items Enum: "DrawingNo" "DrawingNo desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "DrawingNo" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array TechnicalDrawing
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_TechnicalDrawing

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
Get entity from Reference_TechnicalDrawing by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
DrawingNo
required
string <= 25 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "DrawingNo" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type TechnicalDrawing
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_TechnicalDrawing(DrawingNo='{DrawingNo}')

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
"DrawingNo": "It is a Text",
"Description": "It is a Text"
}
