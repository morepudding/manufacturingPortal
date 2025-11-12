
REST API Documentation
Search...
FndTempLobs
Lookup_IsoUnit_EntitySet
Lookup_IsoCountry_EntitySet
Lookup_IsoCurrency_EntitySet
SequenceGeneratorSet
SequencePreviewSet
TemporaryPartTrackingSet
IdentifySerialsInMultipleLocVirtualSet
NoteTexts
IdentifySerialsInLocationSet
PreAccountingVirtualSet
ManualReservationSet
MaterialRequisitionLineSet
MaterialRequisReservatSet
ManualIssueSet
Service Operations - Actions
Service Operations - Functions
Reference_UserAllowedSiteLov
Reference_MaterialRequis
Reference_InternalDestinationLov
Reference_InventoryPartLovMrp
Reference_TemporaryPartTrackingSerial
Reference_OutputTypeLov
Reference_MpccomPhraseTextLov
Reference_ProjectProgramLov
Reference_ProjectLov
Reference_ActivityProjConnect
Reference_PreAccountCodepartAMpccom
Reference_PreAccountingCodepartB
Reference_PreAccountingCodepartC
Reference_PreAccountingCodepartD
Reference_PreAccountingCodepartE
Reference_PreAccountingCodepartF
Reference_PreAccountingCodepartG
Reference_PreAccountingCodepartH
Reference_PreAccountingCodepartI
Reference_PreAccountingCodepartJ
Reference_SequenceGeneratorVirtual
Reference_SequencesVirtual
Reference_SequencePreviewVirtual
Reference_SequencePreviewListVirtual
Reference_IdentifySerialsInMultipleLocVirtual
Reference_TempPartTrackMultiLocSerialsVirtual
Reference_NoteTextVirtual
Reference_IdentifySerialsInLocationVirtual
Reference_TempPartTrackingForInLocSerialsVirtual
Reference_PreAccountingVirtual
Reference_ManualReservationVirtual
Reference_InvPartInStockToReserveVirtual
Reference_ManualIssueVirtual
Reference_InvPartInStockToIssueVirtual
Reference_SubProject
Reference_Project
Reference_Activity
Reference_ProjectProgramGlobal
Reference_DocumentText
Reference_PreAccountingDistribution
Reference_PreAccounting
Reference_ConditionCode
Reference_InternalCustomer
Reference_PartCatalog
Reference_IsoUnit
Reference_COriginShortage
Reference_InventoryPart
Reference_HandlingUnit
Reference_HandlingUnitType
Reference_PartAvailabilityControl
Documentation Powered by Redocly
MaterialRequisitionLinesHandling (1)
API Class: Standard

[Terms of Service] (https://docs.ifs.com/policy/APIUsageCloud.pdf)

FndTempLobs
Get entities from FndTempLobs
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
Items Enum: "LobId" "LobId desc" "ClobData" "ClobData desc" "BlobData" "BlobData desc" "CreatedByUser" "CreatedByUser desc" "CreatedByModule" "CreatedByModule desc" "CreatedAt" "CreatedAt desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "LobId" "ClobData" "BlobData" "CreatedByUser" "CreatedByModule" "CreatedAt"
Specify properties to return, see OData Select

Responses
200 response body for entity array FndTempLobStore
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/FndTempLobs

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Add new entity to FndTempLobs
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "LobId" "ClobData" "BlobData" "CreatedByUser" "CreatedByModule" "CreatedAt"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type FndTempLobStore

CreatedByModule	
string <= 100 characters
Responses
201 response body for entity type FndTempLobStore
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/FndTempLobs

Request samples
Payload
Content type
application/json

Copy
{
"CreatedByModule": "It is a Text"
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
"LobId": "It is a Text",
"ClobData": "",
"BlobData": "",
"CreatedByUser": "It is a Text",
"CreatedByModule": "It is a Text",
"CreatedAt": "2019-10-10"
}
Get entity from FndTempLobs by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
LobId
required
string <= 100 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "LobId" "ClobData" "BlobData" "CreatedByUser" "CreatedByModule" "CreatedAt"
Specify properties to return, see OData Select

Responses
200 response body for entity type FndTempLobStore
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/FndTempLobs(LobId='{LobId}')

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
"LobId": "It is a Text",
"ClobData": "",
"BlobData": "",
"CreatedByUser": "It is a Text",
"CreatedByModule": "It is a Text",
"CreatedAt": "2019-10-10"
}
Delete entity from FndTempLobs
Authorizations:
(OpenIdbasicAuth)
path Parameters
LobId
required
string <= 100 characters
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
/FndTempLobs(LobId='{LobId}')

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
Update entity in FndTempLobs
Authorizations:
(OpenIdbasicAuth)
path Parameters
LobId
required
string <= 100 characters
Example: It is a Text
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "LobId" "ClobData" "BlobData" "CreatedByUser" "CreatedByModule" "CreatedAt"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type FndTempLobStore

ClobData	
string <string>
BlobData	
string <string>
Responses
200 response body for entity type FndTempLobStore
201 response body for entity type FndTempLobStore
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
/FndTempLobs(LobId='{LobId}')

Request samples
Payload
Content type
application/json

Copy
{
"ClobData": "",
"BlobData": ""
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
"LobId": "It is a Text",
"ClobData": "",
"BlobData": "",
"CreatedByUser": "It is a Text",
"CreatedByModule": "It is a Text",
"CreatedAt": "2019-10-10"
}
Invoke function Default
Authorizations:
(OpenIdbasicAuth)
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "LobId" "ClobData" "BlobData" "CreatedByUser" "CreatedByModule" "CreatedAt"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type FndTempLobStore
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/FndTempLobs/IfsApp.MaterialRequisitionLinesHandling.FndTempLobStore_Default()

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
"LobId": "It is a Text",
"ClobData": "",
"BlobData": "",
"CreatedByUser": "It is a Text",
"CreatedByModule": "It is a Text",
"CreatedAt": "2019-10-10"
}
Get ClobData stream attribute from FndTempLobs by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
LobId
required
string <= 100 characters
Example: It is a Text
Responses
200 response body for ClobData stream attribute
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/FndTempLobs(LobId='{LobId}')/ClobData

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
Update ClobData stream attribute in FndTempLobs by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
LobId
required
string <= 100 characters
Example: It is a Text
header Parameters
If-Match
required
string
E-Tag

Request Body schema: application/octet-stream
request body for ClobData stream attribute

Schema not provided
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

put
/FndTempLobs(LobId='{LobId}')/ClobData

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
Get BlobData stream attribute from FndTempLobs by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
LobId
required
string <= 100 characters
Example: It is a Text
Responses
200 response body for BlobData stream attribute
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/FndTempLobs(LobId='{LobId}')/BlobData

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
Update BlobData stream attribute in FndTempLobs by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
LobId
required
string <= 100 characters
Example: It is a Text
header Parameters
If-Match
required
string
E-Tag

Request Body schema: application/octet-stream
request body for BlobData stream attribute

Schema not provided
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

put
/FndTempLobs(LobId='{LobId}')/BlobData

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
SequenceGeneratorSet
Get entities from SequenceGeneratorSet
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "Prefix" "Prefix desc" "Suffix" "Suffix desc" "Length" "Length desc" "Quantity" "Quantity desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Prefix" "Suffix" "Length" "SerialList" "Quantity"
Specify properties to return, see OData Select

Responses
200 response body for entity array SequenceGeneratorVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SequenceGeneratorSet

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Add new entity to SequenceGeneratorSet
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Prefix" "Suffix" "Length" "SerialList" "Quantity"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type SequenceGeneratorVirtual

ParentObjkey	
string <= 50 characters
ObjCreatedBy	
string <= 50 characters
Prefix	
string <= 50 characters
Suffix	
string <= 50 characters
Length	
number
SerialList	
string <= 64000 characters
Quantity	
number
Responses
201 response body for entity type SequenceGeneratorVirtual
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/SequenceGeneratorSet

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"ObjCreatedBy": "It is a Text",
"Prefix": "It is a Text",
"Suffix": "It is a Text",
"Length": 1,
"SerialList": "",
"Quantity": 1
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
"Prefix": "It is a Text",
"Suffix": "It is a Text",
"Length": 1,
"SerialList": "",
"Quantity": 1
}
Get entity from SequenceGeneratorSet by key
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Prefix" "Suffix" "Length" "SerialList" "Quantity"
Specify properties to return, see OData Select

Responses
200 response body for entity type SequenceGeneratorVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SequenceGeneratorSet(Objkey='{Objkey}')

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
"Prefix": "It is a Text",
"Suffix": "It is a Text",
"Length": 1,
"SerialList": "",
"Quantity": 1
}
Delete entity from SequenceGeneratorSet
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
/SequenceGeneratorSet(Objkey='{Objkey}')

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
Update entity in SequenceGeneratorSet
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Prefix" "Suffix" "Length" "SerialList" "Quantity"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type SequenceGeneratorVirtual

Prefix	
string <= 50 characters
Suffix	
string <= 50 characters
Length	
number
SerialList	
string <= 64000 characters
Quantity	
number
Responses
200 response body for entity type SequenceGeneratorVirtual
201 response body for entity type SequenceGeneratorVirtual
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
/SequenceGeneratorSet(Objkey='{Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"Prefix": "It is a Text",
"Suffix": "It is a Text",
"Length": 1,
"SerialList": "",
"Quantity": 1
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
"Prefix": "It is a Text",
"Suffix": "It is a Text",
"Length": 1,
"SerialList": "",
"Quantity": 1
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
/SequenceGeneratorSet(Objkey='{Objkey}')/IfsApp.MaterialRequisitionLinesHandling.SequenceGeneratorVirtual_CleanupVirtualEntity

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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Prefix" "Suffix" "Length" "SerialList" "Quantity"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type SequenceGeneratorVirtual
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SequenceGeneratorSet/IfsApp.MaterialRequisitionLinesHandling.SequenceGeneratorVirtual_Default()

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
"Prefix": "It is a Text",
"Suffix": "It is a Text",
"Length": 1,
"SerialList": "",
"Quantity": 1
}
Get entities from SequenceArray
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "FromSerialNo" "FromSerialNo desc" "ToSerialNo" "ToSerialNo desc" "SerialList" "SerialList desc" "Quantity" "Quantity desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "FromSerialNo" "ToSerialNo" "SerialList" "Quantity"
Specify properties to return, see OData Select

Responses
200 response body for entity array SequencesVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SequenceGeneratorSet(Objkey='{Objkey}')/SequenceArray

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Add new entity to SequenceArray
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Prefix" "Suffix" "Length" "SerialList" "Quantity"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type SequencesVirtual

ParentObjkey	
string <= 50 characters
ObjCreatedBy	
string <= 50 characters
FromSerialNo	
number
ToSerialNo	
number
SerialList	
string <= 4000 characters
Quantity	
number
Responses
201 response body for entity type SequencesVirtual
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/SequenceGeneratorSet(Objkey='{Objkey}')/SequenceArray

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"ObjCreatedBy": "It is a Text",
"FromSerialNo": 1,
"ToSerialNo": 1,
"SerialList": "It is a Text",
"Quantity": 1
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
"FromSerialNo": 1,
"ToSerialNo": 1,
"SerialList": "It is a Text",
"Quantity": 1
}
Get entity from SequenceArray by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
SequenceArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Prefix" "Suffix" "Length" "SerialList" "Quantity"
Specify properties to return, see OData Select

Responses
200 response body for entity type SequencesVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SequenceGeneratorSet(Objkey='{Objkey}')/SequenceArray(Objkey='{SequenceArray_Objkey}')

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
"FromSerialNo": 1,
"ToSerialNo": 1,
"SerialList": "It is a Text",
"Quantity": 1
}
Delete entity from SequenceArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
SequenceArray_Objkey
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
/SequenceGeneratorSet(Objkey='{Objkey}')/SequenceArray(Objkey='{SequenceArray_Objkey}')

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
Update entity in SequenceArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
SequenceArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Prefix" "Suffix" "Length" "SerialList" "Quantity"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type SequencesVirtual

FromSerialNo	
number
ToSerialNo	
number
SerialList	
string <= 4000 characters
Quantity	
number
Responses
200 response body for entity type SequencesVirtual
201 response body for entity type SequencesVirtual
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
/SequenceGeneratorSet(Objkey='{Objkey}')/SequenceArray(Objkey='{SequenceArray_Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"FromSerialNo": 1,
"ToSerialNo": 1,
"SerialList": "It is a Text",
"Quantity": 1
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
"FromSerialNo": 1,
"ToSerialNo": 1,
"SerialList": "It is a Text",
"Quantity": 1
}
SequencePreviewSet
Get entities from SequencePreviewSet
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "SerialObjkey" "SerialObjkey desc" "Prefix" "Prefix desc" "Suffix" "Suffix desc" "Length" "Length desc" "Sum" "Sum desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SerialObjkey" "Prefix" "Suffix" "Length" "Sum"
Specify properties to return, see OData Select

Responses
200 response body for entity array SequencePreviewVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SequencePreviewSet

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Add new entity to SequencePreviewSet
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SerialObjkey" "Prefix" "Suffix" "Length" "Sum"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type SequencePreviewVirtual

ParentObjkey	
string <= 50 characters
ObjCreatedBy	
string <= 50 characters
SerialObjkey	
string <= 4000 characters
Prefix	
string <= 4000 characters
Suffix	
string <= 4000 characters
Length	
number
Sum	
number
Responses
201 response body for entity type SequencePreviewVirtual
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/SequencePreviewSet

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"ObjCreatedBy": "It is a Text",
"SerialObjkey": "It is a Text",
"Prefix": "It is a Text",
"Suffix": "It is a Text",
"Length": 1,
"Sum": 1
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
"SerialObjkey": "It is a Text",
"Prefix": "It is a Text",
"Suffix": "It is a Text",
"Length": 1,
"Sum": 1
}
Get entity from SequencePreviewSet by key
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SerialObjkey" "Prefix" "Suffix" "Length" "Sum"
Specify properties to return, see OData Select

Responses
200 response body for entity type SequencePreviewVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SequencePreviewSet(Objkey='{Objkey}')

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
"SerialObjkey": "It is a Text",
"Prefix": "It is a Text",
"Suffix": "It is a Text",
"Length": 1,
"Sum": 1
}
Delete entity from SequencePreviewSet
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
/SequencePreviewSet(Objkey='{Objkey}')

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
Update entity in SequencePreviewSet
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SerialObjkey" "Prefix" "Suffix" "Length" "Sum"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type SequencePreviewVirtual

SerialObjkey	
string <= 4000 characters
Prefix	
string <= 4000 characters
Suffix	
string <= 4000 characters
Length	
number
Sum	
number
Responses
200 response body for entity type SequencePreviewVirtual
201 response body for entity type SequencePreviewVirtual
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
/SequencePreviewSet(Objkey='{Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"SerialObjkey": "It is a Text",
"Prefix": "It is a Text",
"Suffix": "It is a Text",
"Length": 1,
"Sum": 1
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
"SerialObjkey": "It is a Text",
"Prefix": "It is a Text",
"Suffix": "It is a Text",
"Length": 1,
"Sum": 1
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
/SequencePreviewSet(Objkey='{Objkey}')/IfsApp.MaterialRequisitionLinesHandling.SequencePreviewVirtual_CleanupVirtualEntity

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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SerialObjkey" "Prefix" "Suffix" "Length" "Sum"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type SequencePreviewVirtual
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SequencePreviewSet/IfsApp.MaterialRequisitionLinesHandling.SequencePreviewVirtual_Default()

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
"SerialObjkey": "It is a Text",
"Prefix": "It is a Text",
"Suffix": "It is a Text",
"Length": 1,
"Sum": 1
}
Get entities from SequencePreviewArray
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "SerialNo" "SerialNo desc" "LineNo" "LineNo desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SerialNo" "LineNo"
Specify properties to return, see OData Select

Responses
200 response body for entity array SequencePreviewListVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SequencePreviewSet(Objkey='{Objkey}')/SequencePreviewArray

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from SequencePreviewArray by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
SequencePreviewArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SerialObjkey" "Prefix" "Suffix" "Length" "Sum"
Specify properties to return, see OData Select

Responses
200 response body for entity type SequencePreviewListVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SequencePreviewSet(Objkey='{Objkey}')/SequencePreviewArray(Objkey='{SequencePreviewArray_Objkey}')

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
"SerialNo": "It is a Text",
"LineNo": 1
}
TemporaryPartTrackingSet
Get entities from TemporaryPartTrackingSet
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
Items Enum: "SessionId" "SessionId desc" "SerialNo" "SerialNo desc" "CatchQty" "CatchQty desc" "Contract" "Contract desc" "PartNo" "PartNo desc" "IdentificationContext" "IdentificationContext desc" "BarcodeId" "BarcodeId desc" "ConfigId" "ConfigId desc" "LocationNo" "LocationNo desc" "HandlingUnitId" "HandlingUnitId desc" "LotBatchNo" "LotBatchNo desc" "EngChgLevel" "EngChgLevel desc" "WaivDevRejNo" "WaivDevRejNo desc" "ActivitySeq" "ActivitySeq desc" "CatchUnitEnabled" "CatchUnitEnabled desc" "SessionIdStr" "SessionIdStr desc" "ParentSessionIdStr" "ParentSessionIdStr desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "SessionId" "SerialNo" "CatchQty" "Contract" "PartNo" "IdentificationContext" "BarcodeId" "ConfigId" "LocationNo" "HandlingUnitId" "LotBatchNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "CatchUnitEnabled" "SessionIdStr" "ParentSessionIdStr"
Specify properties to return, see OData Select

Responses
200 response body for entity array TemporaryPartTracking
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/TemporaryPartTrackingSet

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Add new entity to TemporaryPartTrackingSet
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "SessionId" "SerialNo" "CatchQty" "Contract" "PartNo" "IdentificationContext" "BarcodeId" "ConfigId" "LocationNo" "HandlingUnitId" "LotBatchNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "CatchUnitEnabled" "SessionIdStr" "ParentSessionIdStr"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type TemporaryPartTracking

SessionId
required
number
SerialNo
required
string <= 50 characters
CatchQty	
number
BarcodeId	
number
ConfigId	
string <= 100 characters
LocationNo	
string <= 100 characters
HandlingUnitId	
string <= 4000 characters
LotBatchNo	
string <= 100 characters
EngChgLevel	
string <= 100 characters
WaivDevRejNo	
string <= 100 characters
ActivitySeq	
string <= 4000 characters
CatchUnitEnabled	
string <= 4000 characters
SessionIdStr	
string <= 4000 characters
ParentSessionIdStr	
string <= 4000 characters
Responses
201 response body for entity type TemporaryPartTracking
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/TemporaryPartTrackingSet

Request samples
Payload
Content type
application/json

Copy
{
"SessionId": 1,
"SerialNo": "It is a Text",
"CatchQty": 1,
"BarcodeId": 1,
"ConfigId": "It is a Text",
"LocationNo": "It is a Text",
"HandlingUnitId": "It is a Text",
"LotBatchNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": "It is a Text",
"CatchUnitEnabled": "It is a Text",
"SessionIdStr": "It is a Text",
"ParentSessionIdStr": "It is a Text"
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
"SessionId": 1,
"SerialNo": "It is a Text",
"CatchQty": 1,
"Contract": "It is a Text",
"PartNo": "It is a Text",
"IdentificationContext": "It is a Text",
"BarcodeId": 1,
"ConfigId": "It is a Text",
"LocationNo": "It is a Text",
"HandlingUnitId": "It is a Text",
"LotBatchNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": "It is a Text",
"CatchUnitEnabled": "It is a Text",
"SessionIdStr": "It is a Text",
"ParentSessionIdStr": "It is a Text"
}
Get entity from TemporaryPartTrackingSet by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
SessionId
required
number
Example: 1
SerialNo
required
string <= 50 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "SessionId" "SerialNo" "CatchQty" "Contract" "PartNo" "IdentificationContext" "BarcodeId" "ConfigId" "LocationNo" "HandlingUnitId" "LotBatchNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "CatchUnitEnabled" "SessionIdStr" "ParentSessionIdStr"
Specify properties to return, see OData Select

Responses
200 response body for entity type TemporaryPartTracking
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/TemporaryPartTrackingSet(SessionId={SessionId},SerialNo='{SerialNo}')

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
"SessionId": 1,
"SerialNo": "It is a Text",
"CatchQty": 1,
"Contract": "It is a Text",
"PartNo": "It is a Text",
"IdentificationContext": "It is a Text",
"BarcodeId": 1,
"ConfigId": "It is a Text",
"LocationNo": "It is a Text",
"HandlingUnitId": "It is a Text",
"LotBatchNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": "It is a Text",
"CatchUnitEnabled": "It is a Text",
"SessionIdStr": "It is a Text",
"ParentSessionIdStr": "It is a Text"
}
Delete entity from TemporaryPartTrackingSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
SessionId
required
number
Example: 1
SerialNo
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
/TemporaryPartTrackingSet(SessionId={SessionId},SerialNo='{SerialNo}')

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
Update entity in TemporaryPartTrackingSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
SessionId
required
number
Example: 1
SerialNo
required
string <= 50 characters
Example: It is a Text
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "SessionId" "SerialNo" "CatchQty" "Contract" "PartNo" "IdentificationContext" "BarcodeId" "ConfigId" "LocationNo" "HandlingUnitId" "LotBatchNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "CatchUnitEnabled" "SessionIdStr" "ParentSessionIdStr"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type TemporaryPartTracking

CatchQty	
number
BarcodeId	
number
ConfigId	
string <= 100 characters
LocationNo	
string <= 100 characters
HandlingUnitId	
string <= 4000 characters
LotBatchNo	
string <= 100 characters
EngChgLevel	
string <= 100 characters
WaivDevRejNo	
string <= 100 characters
ActivitySeq	
string <= 4000 characters
CatchUnitEnabled	
string <= 4000 characters
SessionIdStr	
string <= 4000 characters
ParentSessionIdStr	
string <= 4000 characters
Responses
200 response body for entity type TemporaryPartTracking
201 response body for entity type TemporaryPartTracking
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
/TemporaryPartTrackingSet(SessionId={SessionId},SerialNo='{SerialNo}')

Request samples
Payload
Content type
application/json

Copy
{
"CatchQty": 1,
"BarcodeId": 1,
"ConfigId": "It is a Text",
"LocationNo": "It is a Text",
"HandlingUnitId": "It is a Text",
"LotBatchNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": "It is a Text",
"CatchUnitEnabled": "It is a Text",
"SessionIdStr": "It is a Text",
"ParentSessionIdStr": "It is a Text"
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
"SessionId": 1,
"SerialNo": "It is a Text",
"CatchQty": 1,
"Contract": "It is a Text",
"PartNo": "It is a Text",
"IdentificationContext": "It is a Text",
"BarcodeId": 1,
"ConfigId": "It is a Text",
"LocationNo": "It is a Text",
"HandlingUnitId": "It is a Text",
"LotBatchNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": "It is a Text",
"CatchUnitEnabled": "It is a Text",
"SessionIdStr": "It is a Text",
"ParentSessionIdStr": "It is a Text"
}
Invoke function DefaultCopy
Authorizations:
(OpenIdbasicAuth)
path Parameters
SessionId
required
number
Example: 1
SerialNo
required
string <= 50 characters
Example: It is a Text
query Parameters
@CopyValues
required
object (TemporaryPartTrackingCopyValues)
$select	
Array of strings unique
Items Enum: "luname" "keyref" "SessionId" "SerialNo" "CatchQty" "Contract" "PartNo" "IdentificationContext" "BarcodeId" "ConfigId" "LocationNo" "HandlingUnitId" "LotBatchNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "CatchUnitEnabled" "SessionIdStr" "ParentSessionIdStr"
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
/TemporaryPartTrackingSet(SessionId={SessionId},SerialNo='{SerialNo}')/IfsApp.MaterialRequisitionLinesHandling.TemporaryPartTracking_DefaultCopy(CopyValues=@CopyValues)

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
"SessionId": 1,
"SerialNo": "It is a Text",
"CatchQty": 1,
"Contract": "It is a Text",
"PartNo": "It is a Text",
"IdentificationContext": "It is a Text",
"BarcodeId": 1,
"ConfigId": "It is a Text",
"LocationNo": "It is a Text",
"HandlingUnitId": "It is a Text",
"LotBatchNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": "It is a Text",
"CatchUnitEnabled": "It is a Text",
"SessionIdStr": "It is a Text",
"ParentSessionIdStr": "It is a Text"
}
Invoke function DefaultCopy
Authorizations:
(OpenIdbasicAuth)
query Parameters
@CopyValues
required
object (TemporaryPartTrackingCopyValues)
$select	
Array of strings unique
Items Enum: "luname" "keyref" "SessionId" "SerialNo" "CatchQty" "Contract" "PartNo" "IdentificationContext" "BarcodeId" "ConfigId" "LocationNo" "HandlingUnitId" "LotBatchNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "CatchUnitEnabled" "SessionIdStr" "ParentSessionIdStr"
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
/TemporaryPartTrackingSet/IfsApp.MaterialRequisitionLinesHandling.TemporaryPartTracking_DefaultCopy(CopyValues=@CopyValues)

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
"SessionId": 1,
"SerialNo": "It is a Text",
"CatchQty": 1,
"Contract": "It is a Text",
"PartNo": "It is a Text",
"IdentificationContext": "It is a Text",
"BarcodeId": 1,
"ConfigId": "It is a Text",
"LocationNo": "It is a Text",
"HandlingUnitId": "It is a Text",
"LotBatchNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": "It is a Text",
"CatchUnitEnabled": "It is a Text",
"SessionIdStr": "It is a Text",
"ParentSessionIdStr": "It is a Text"
}
Invoke function Default
Authorizations:
(OpenIdbasicAuth)
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "SessionId" "SerialNo" "CatchQty" "Contract" "PartNo" "IdentificationContext" "BarcodeId" "ConfigId" "LocationNo" "HandlingUnitId" "LotBatchNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "CatchUnitEnabled" "SessionIdStr" "ParentSessionIdStr"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type TemporaryPartTracking
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/TemporaryPartTrackingSet/IfsApp.MaterialRequisitionLinesHandling.TemporaryPartTracking_Default()

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
"SessionId": 1,
"SerialNo": "It is a Text",
"CatchQty": 1,
"Contract": "It is a Text",
"PartNo": "It is a Text",
"IdentificationContext": "It is a Text",
"BarcodeId": 1,
"ConfigId": "It is a Text",
"LocationNo": "It is a Text",
"HandlingUnitId": "It is a Text",
"LotBatchNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": "It is a Text",
"CatchUnitEnabled": "It is a Text",
"SessionIdStr": "It is a Text",
"ParentSessionIdStr": "It is a Text"
}
IdentifySerialsInMultipleLocVirtualSet
Get entities from IdentifySerialsInMultipleLocVirtualSet
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "Ref1" "Ref1 desc" "Ref2" "Ref2 desc" "Ref3" "Ref3 desc" "Ref4" "Ref4 desc" "Ref5" "Ref5 desc" "RefType" "RefType desc" "PartNo" "PartNo desc" "PartDescription" "PartDescription desc" "CatchUoM" "CatchUoM desc" "QtyToIdentify" "QtyToIdentify desc" "SerialsIdentified" "SerialsIdentified desc" "Contract" "Contract desc" "CatchUnitEnabled" "CatchUnitEnabled desc" "SessionId" "SessionId desc" "LotBatchNo" "LotBatchNo desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Ref1" "Ref2" "Ref3" "Ref4" "Ref5" "RefType" "PartNo" "PartDescription" "CatchUoM" "QtyToIdentify" "SerialsIdentified" "Contract" "CatchUnitEnabled" "SessionId" "LotBatchNo"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartDescriptionRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array IdentifySerialsInMultipleLocVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/IdentifySerialsInMultipleLocVirtualSet

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Add new entity to IdentifySerialsInMultipleLocVirtualSet
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Ref1" "Ref2" "Ref3" "Ref4" "Ref5" "RefType" "PartNo" "PartDescription" "CatchUoM" "QtyToIdentify" "SerialsIdentified" "Contract" "CatchUnitEnabled" "SessionId" "LotBatchNo"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type IdentifySerialsInMultipleLocVirtual

ParentObjkey	
string <= 50 characters
ObjCreatedBy	
string <= 50 characters
Ref1	
string <= 4000 characters
Ref2	
string <= 100 characters
Ref3	
string <= 100 characters
Ref4	
string <= 100 characters
Ref5	
string <= 100 characters
RefType	
string <= 100 characters
PartNo	
string <= 100 characters
PartDescription	
string <= 200 characters
CatchUoM	
string <= 100 characters
QtyToIdentify	
number
SerialsIdentified	
number
Contract	
string <= 4000 characters
CatchUnitEnabled	
string <= 4000 characters
SessionId	
number
LotBatchNo	
string <= 4000 characters
Responses
201 response body for entity type IdentifySerialsInMultipleLocVirtual
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/IdentifySerialsInMultipleLocVirtualSet

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"ObjCreatedBy": "It is a Text",
"Ref1": "It is a Text",
"Ref2": "It is a Text",
"Ref3": "It is a Text",
"Ref4": "It is a Text",
"Ref5": "It is a Text",
"RefType": "It is a Text",
"PartNo": "It is a Text",
"PartDescription": "It is a Text",
"CatchUoM": "It is a Text",
"QtyToIdentify": 1,
"SerialsIdentified": 1,
"Contract": "It is a Text",
"CatchUnitEnabled": "It is a Text",
"SessionId": 1,
"LotBatchNo": "It is a Text"
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
"Ref1": "It is a Text",
"Ref2": "It is a Text",
"Ref3": "It is a Text",
"Ref4": "It is a Text",
"Ref5": "It is a Text",
"RefType": "It is a Text",
"PartNo": "It is a Text",
"PartDescription": "It is a Text",
"CatchUoM": "It is a Text",
"QtyToIdentify": 1,
"SerialsIdentified": 1,
"Contract": "It is a Text",
"CatchUnitEnabled": "It is a Text",
"SessionId": 1,
"LotBatchNo": "It is a Text"
}
Get entity from IdentifySerialsInMultipleLocVirtualSet by key
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Ref1" "Ref2" "Ref3" "Ref4" "Ref5" "RefType" "PartNo" "PartDescription" "CatchUoM" "QtyToIdentify" "SerialsIdentified" "Contract" "CatchUnitEnabled" "SessionId" "LotBatchNo"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartDescriptionRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type IdentifySerialsInMultipleLocVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/IdentifySerialsInMultipleLocVirtualSet(Objkey='{Objkey}')

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
"Ref1": "It is a Text",
"Ref2": "It is a Text",
"Ref3": "It is a Text",
"Ref4": "It is a Text",
"Ref5": "It is a Text",
"RefType": "It is a Text",
"PartNo": "It is a Text",
"PartDescription": "It is a Text",
"CatchUoM": "It is a Text",
"QtyToIdentify": 1,
"SerialsIdentified": 1,
"Contract": "It is a Text",
"CatchUnitEnabled": "It is a Text",
"SessionId": 1,
"LotBatchNo": "It is a Text"
}
Delete entity from IdentifySerialsInMultipleLocVirtualSet
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
/IdentifySerialsInMultipleLocVirtualSet(Objkey='{Objkey}')

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
Update entity in IdentifySerialsInMultipleLocVirtualSet
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Ref1" "Ref2" "Ref3" "Ref4" "Ref5" "RefType" "PartNo" "PartDescription" "CatchUoM" "QtyToIdentify" "SerialsIdentified" "Contract" "CatchUnitEnabled" "SessionId" "LotBatchNo"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type IdentifySerialsInMultipleLocVirtual

Ref1	
string <= 4000 characters
Ref2	
string <= 100 characters
Ref3	
string <= 100 characters
Ref4	
string <= 100 characters
Ref5	
string <= 100 characters
RefType	
string <= 100 characters
PartNo	
string <= 100 characters
PartDescription	
string <= 200 characters
CatchUoM	
string <= 100 characters
QtyToIdentify	
number
SerialsIdentified	
number
Contract	
string <= 4000 characters
CatchUnitEnabled	
string <= 4000 characters
SessionId	
number
LotBatchNo	
string <= 4000 characters
Responses
200 response body for entity type IdentifySerialsInMultipleLocVirtual
201 response body for entity type IdentifySerialsInMultipleLocVirtual
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
/IdentifySerialsInMultipleLocVirtualSet(Objkey='{Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"Ref1": "It is a Text",
"Ref2": "It is a Text",
"Ref3": "It is a Text",
"Ref4": "It is a Text",
"Ref5": "It is a Text",
"RefType": "It is a Text",
"PartNo": "It is a Text",
"PartDescription": "It is a Text",
"CatchUoM": "It is a Text",
"QtyToIdentify": 1,
"SerialsIdentified": 1,
"Contract": "It is a Text",
"CatchUnitEnabled": "It is a Text",
"SessionId": 1,
"LotBatchNo": "It is a Text"
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
"Ref1": "It is a Text",
"Ref2": "It is a Text",
"Ref3": "It is a Text",
"Ref4": "It is a Text",
"Ref5": "It is a Text",
"RefType": "It is a Text",
"PartNo": "It is a Text",
"PartDescription": "It is a Text",
"CatchUoM": "It is a Text",
"QtyToIdentify": 1,
"SerialsIdentified": 1,
"Contract": "It is a Text",
"CatchUnitEnabled": "It is a Text",
"SessionId": 1,
"LotBatchNo": "It is a Text"
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
/IdentifySerialsInMultipleLocVirtualSet(Objkey='{Objkey}')/IfsApp.MaterialRequisitionLinesHandling.IdentifySerialsInMultipleLocVirtual_CleanupVirtualEntity

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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Ref1" "Ref2" "Ref3" "Ref4" "Ref5" "RefType" "PartNo" "PartDescription" "CatchUoM" "QtyToIdentify" "SerialsIdentified" "Contract" "CatchUnitEnabled" "SessionId" "LotBatchNo"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type IdentifySerialsInMultipleLocVirtual
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/IdentifySerialsInMultipleLocVirtualSet/IfsApp.MaterialRequisitionLinesHandling.IdentifySerialsInMultipleLocVirtual_Default()

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
"Ref1": "It is a Text",
"Ref2": "It is a Text",
"Ref3": "It is a Text",
"Ref4": "It is a Text",
"Ref5": "It is a Text",
"RefType": "It is a Text",
"PartNo": "It is a Text",
"PartDescription": "It is a Text",
"CatchUoM": "It is a Text",
"QtyToIdentify": 1,
"SerialsIdentified": 1,
"Contract": "It is a Text",
"CatchUnitEnabled": "It is a Text",
"SessionId": 1,
"LotBatchNo": "It is a Text"
}
Get entities from MultiLocSerialsArray
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "Generated" "Generated desc" "SessionId" "SessionId desc" "SerialNo" "SerialNo desc" "CatchQty" "CatchQty desc" "Contract" "Contract desc" "PartNo" "PartNo desc" "LotBatchNo" "LotBatchNo desc" "SerialNoAttr" "SerialNoAttr desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Generated" "SessionId" "SerialNo" "CatchQty" "Contract" "PartNo" "LotBatchNo" "SerialNoAttr"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "SerialNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array TempPartTrackMultiLocSerialsVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/IdentifySerialsInMultipleLocVirtualSet(Objkey='{Objkey}')/MultiLocSerialsArray

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Add new entity to MultiLocSerialsArray
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Ref1" "Ref2" "Ref3" "Ref4" "Ref5" "RefType" "PartNo" "PartDescription" "CatchUoM" "QtyToIdentify" "SerialsIdentified" "Contract" "CatchUnitEnabled" "SessionId" "LotBatchNo"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type TempPartTrackMultiLocSerialsVirtual

ParentObjkey	
string <= 50 characters
ObjCreatedBy	
string <= 50 characters
Generated	
boolean
SessionId
required
number
SerialNo
required
string <= 50 characters
CatchQty	
number
Contract	
string <= 5 characters
PartNo	
string <= 25 characters
LotBatchNo	
string <= 4000 characters
SerialNoAttr	
string <= 4000 characters
Responses
201 response body for entity type TempPartTrackMultiLocSerialsVirtual
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/IdentifySerialsInMultipleLocVirtualSet(Objkey='{Objkey}')/MultiLocSerialsArray

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"ObjCreatedBy": "It is a Text",
"Generated": true,
"SessionId": 1,
"SerialNo": "It is a Text",
"CatchQty": 1,
"Contract": "It is a Text",
"PartNo": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNoAttr": "It is a Text"
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
"Generated": true,
"SessionId": 1,
"SerialNo": "It is a Text",
"CatchQty": 1,
"Contract": "It is a Text",
"PartNo": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNoAttr": "It is a Text"
}
Get entity from MultiLocSerialsArray by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
MultiLocSerialsArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Ref1" "Ref2" "Ref3" "Ref4" "Ref5" "RefType" "PartNo" "PartDescription" "CatchUoM" "QtyToIdentify" "SerialsIdentified" "Contract" "CatchUnitEnabled" "SessionId" "LotBatchNo"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartDescriptionRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type TempPartTrackMultiLocSerialsVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/IdentifySerialsInMultipleLocVirtualSet(Objkey='{Objkey}')/MultiLocSerialsArray(Objkey='{MultiLocSerialsArray_Objkey}')

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
"Generated": true,
"SessionId": 1,
"SerialNo": "It is a Text",
"CatchQty": 1,
"Contract": "It is a Text",
"PartNo": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNoAttr": "It is a Text"
}
Delete entity from MultiLocSerialsArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
MultiLocSerialsArray_Objkey
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
/IdentifySerialsInMultipleLocVirtualSet(Objkey='{Objkey}')/MultiLocSerialsArray(Objkey='{MultiLocSerialsArray_Objkey}')

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
Update entity in MultiLocSerialsArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
MultiLocSerialsArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Ref1" "Ref2" "Ref3" "Ref4" "Ref5" "RefType" "PartNo" "PartDescription" "CatchUoM" "QtyToIdentify" "SerialsIdentified" "Contract" "CatchUnitEnabled" "SessionId" "LotBatchNo"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type TempPartTrackMultiLocSerialsVirtual

Generated	
boolean
SessionId
required
number
SerialNo
required
string <= 50 characters
CatchQty	
number
Contract	
string <= 5 characters
PartNo	
string <= 25 characters
LotBatchNo	
string <= 4000 characters
SerialNoAttr	
string <= 4000 characters
Responses
200 response body for entity type TempPartTrackMultiLocSerialsVirtual
201 response body for entity type TempPartTrackMultiLocSerialsVirtual
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
/IdentifySerialsInMultipleLocVirtualSet(Objkey='{Objkey}')/MultiLocSerialsArray(Objkey='{MultiLocSerialsArray_Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"Generated": true,
"SessionId": 1,
"SerialNo": "It is a Text",
"CatchQty": 1,
"Contract": "It is a Text",
"PartNo": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNoAttr": "It is a Text"
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
"Generated": true,
"SessionId": 1,
"SerialNo": "It is a Text",
"CatchQty": 1,
"Contract": "It is a Text",
"PartNo": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNoAttr": "It is a Text"
}
Get entities from SerialNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
MultiLocSerialsArray_Objkey
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
Items Enum: "SerialNo" "SerialNo desc" "PartNo" "PartNo desc" "Contract" "Contract desc" "ManufacturerNo" "ManufacturerNo desc" "SupplierNo" "SupplierNo desc" "PartOwnership" "PartOwnership desc" "PartOwnershipDb" "PartOwnershipDb desc" "OwningVendorNo" "OwningVendorNo desc" "OwningCustomerNo" "OwningCustomerNo desc" "OperationalStatus" "OperationalStatus desc" "OperationalStatusDb" "OperationalStatusDb desc" "OperationalCondition" "OperationalCondition desc" "OperationalConditionDb" "OperationalConditionDb desc" "LatestTransaction" "LatestTransaction desc" "LotBatchNo" "LotBatchNo desc" "ConfigurationId" "ConfigurationId desc" "LockedForUpdate" "LockedForUpdate desc" "LockedForUpdateDb" "LockedForUpdateDb desc" "ConditionCode" "ConditionCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "SerialNo" "PartNo" "Contract" "ManufacturerNo" "SupplierNo" "PartOwnership" "PartOwnershipDb" "OwningVendorNo" "OwningCustomerNo" "OperationalStatus" "OperationalStatusDb" "OperationalCondition" "OperationalConditionDb" "LatestTransaction" "LotBatchNo" "ConfigurationId" "LockedForUpdate" "LockedForUpdateDb" "ConditionCode"
Specify properties to return, see OData Select

Responses
200 response body for entity array TemporaryPartTrackingSerial
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/IdentifySerialsInMultipleLocVirtualSet(Objkey='{Objkey}')/MultiLocSerialsArray(Objkey='{MultiLocSerialsArray_Objkey}')/SerialNoRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from PartDescriptionRef
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
/IdentifySerialsInMultipleLocVirtualSet(Objkey='{Objkey}')/PartDescriptionRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "ReadOnly" "ReadOnly desc" "NoteId" "NoteId desc" "Label" "Label desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "NoteId" "Label"
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "NoteId" "Label"
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
"Label": "It is a Text"
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
"Label": "It is a Text"
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "NoteId" "Label"
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
"Label": "It is a Text"
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "NoteId" "Label"
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
"Label": "It is a Text"
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
"Label": "It is a Text"
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
/NoteTexts(Objkey='{Objkey}')/IfsApp.MaterialRequisitionLinesHandling.NoteTextVirtual_CleanupVirtualEntity

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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "NoteId" "Label"
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
/NoteTexts/IfsApp.MaterialRequisitionLinesHandling.NoteTextVirtual_Default()

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
"Label": "It is a Text"
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
Items Enum: "OutputType" "OutputType desc" "NoteId" "NoteId desc" "NoteText" "NoteText desc" "PhraseId" "PhraseId desc" "LanguageCode" "LanguageCode desc" "RevisionNo" "RevisionNo desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "OutputType" "NoteId" "NoteText" "PhraseId" "LanguageCode" "RevisionNo"
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "NoteId" "Label"
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
"RevisionNo": "It is a Text"
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
"RevisionNo": "It is a Text"
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "NoteId" "Label"
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
"RevisionNo": "It is a Text"
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "NoteId" "Label"
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
"RevisionNo": "It is a Text"
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
"RevisionNo": "It is a Text"
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
IdentifySerialsInLocationSet
Get entities from IdentifySerialsInLocationSet
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "Contract" "Contract desc" "PartNo" "PartNo desc" "ConfigurationId" "ConfigurationId desc" "LocationNo" "LocationNo desc" "LotBatchNo" "LotBatchNo desc" "EngChgLevel" "EngChgLevel desc" "WaivDevRejNo" "WaivDevRejNo desc" "ActivitySeq" "ActivitySeq desc" "HandlingUnitId" "HandlingUnitId desc" "QtyIssue" "QtyIssue desc" "UoM" "UoM desc" "CatchQtyIssue" "CatchQtyIssue desc" "CatchUoM" "CatchUoM desc" "PartOwnershipDb" "PartOwnershipDb desc" "SerialsIdentified" "SerialsIdentified desc" "SessionId" "SessionId desc" "CatchUnitEnabled" "CatchUnitEnabled desc" "AssistantTitle" "AssistantTitle desc" "AssistantContext" "AssistantContext desc" "RemainingSelection" "RemainingSelection desc" "TotalCount" "TotalCount desc" "CurrentCount" "CurrentCount desc" "SelectionRec" "SelectionRec desc" "RunningSelection" "RunningSelection desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "ConfigurationId" "LocationNo" "LotBatchNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "HandlingUnitId" "QtyIssue" "UoM" "CatchQtyIssue" "CatchUoM" "PartOwnershipDb" "SerialsIdentified" "SessionId" "CatchUnitEnabled" "AssistantTitle" "AssistantContext" "RemainingSelection" "TotalCount" "CurrentCount" "SelectionRec" "RunningSelection"
Specify properties to return, see OData Select

Responses
200 response body for entity array IdentifySerialsInLocationVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/IdentifySerialsInLocationSet

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Add new entity to IdentifySerialsInLocationSet
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "ConfigurationId" "LocationNo" "LotBatchNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "HandlingUnitId" "QtyIssue" "UoM" "CatchQtyIssue" "CatchUoM" "PartOwnershipDb" "SerialsIdentified" "SessionId" "CatchUnitEnabled" "AssistantTitle" "AssistantContext" "RemainingSelection" "TotalCount" "CurrentCount" "SelectionRec" "RunningSelection"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type IdentifySerialsInLocationVirtual

ParentObjkey	
string <= 50 characters
ObjCreatedBy	
string <= 50 characters
Contract	
string <= 100 characters
PartNo	
string <= 100 characters
ConfigurationId	
string <= 100 characters
LocationNo	
string <= 100 characters
LotBatchNo	
string <= 100 characters
EngChgLevel	
string <= 100 characters
WaivDevRejNo	
string <= 100 characters
ActivitySeq	
number
HandlingUnitId	
number
QtyIssue	
number
UoM	
string <= 4000 characters
CatchQtyIssue	
number
CatchUoM	
string <= 100 characters
PartOwnershipDb	
string <= 4000 characters
SerialsIdentified	
number
SessionId	
number
CatchUnitEnabled	
string <= 4000 characters
AssistantTitle	
string <= 4000 characters
AssistantContext	
string <= 4000 characters
RemainingSelection	
string <= 4000 characters
TotalCount	
number
CurrentCount	
number
SelectionRec	
string <= 4000 characters
RunningSelection	
string <= 4000 characters
Responses
201 response body for entity type IdentifySerialsInLocationVirtual
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/IdentifySerialsInLocationSet

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
"ConfigurationId": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"QtyIssue": 1,
"UoM": "It is a Text",
"CatchQtyIssue": 1,
"CatchUoM": "It is a Text",
"PartOwnershipDb": "It is a Text",
"SerialsIdentified": 1,
"SessionId": 1,
"CatchUnitEnabled": "It is a Text",
"AssistantTitle": "It is a Text",
"AssistantContext": "It is a Text",
"RemainingSelection": "It is a Text",
"TotalCount": 1,
"CurrentCount": 1,
"SelectionRec": "It is a Text",
"RunningSelection": "It is a Text"
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
"ConfigurationId": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"QtyIssue": 1,
"UoM": "It is a Text",
"CatchQtyIssue": 1,
"CatchUoM": "It is a Text",
"PartOwnershipDb": "It is a Text",
"SerialsIdentified": 1,
"SessionId": 1,
"CatchUnitEnabled": "It is a Text",
"AssistantTitle": "It is a Text",
"AssistantContext": "It is a Text",
"RemainingSelection": "It is a Text",
"TotalCount": 1,
"CurrentCount": 1,
"SelectionRec": "It is a Text",
"RunningSelection": "It is a Text"
}
Get entity from IdentifySerialsInLocationSet by key
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "ConfigurationId" "LocationNo" "LotBatchNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "HandlingUnitId" "QtyIssue" "UoM" "CatchQtyIssue" "CatchUoM" "PartOwnershipDb" "SerialsIdentified" "SessionId" "CatchUnitEnabled" "AssistantTitle" "AssistantContext" "RemainingSelection" "TotalCount" "CurrentCount" "SelectionRec" "RunningSelection"
Specify properties to return, see OData Select

Responses
200 response body for entity type IdentifySerialsInLocationVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/IdentifySerialsInLocationSet(Objkey='{Objkey}')

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
"ConfigurationId": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"QtyIssue": 1,
"UoM": "It is a Text",
"CatchQtyIssue": 1,
"CatchUoM": "It is a Text",
"PartOwnershipDb": "It is a Text",
"SerialsIdentified": 1,
"SessionId": 1,
"CatchUnitEnabled": "It is a Text",
"AssistantTitle": "It is a Text",
"AssistantContext": "It is a Text",
"RemainingSelection": "It is a Text",
"TotalCount": 1,
"CurrentCount": 1,
"SelectionRec": "It is a Text",
"RunningSelection": "It is a Text"
}
Delete entity from IdentifySerialsInLocationSet
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
/IdentifySerialsInLocationSet(Objkey='{Objkey}')

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
Update entity in IdentifySerialsInLocationSet
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "ConfigurationId" "LocationNo" "LotBatchNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "HandlingUnitId" "QtyIssue" "UoM" "CatchQtyIssue" "CatchUoM" "PartOwnershipDb" "SerialsIdentified" "SessionId" "CatchUnitEnabled" "AssistantTitle" "AssistantContext" "RemainingSelection" "TotalCount" "CurrentCount" "SelectionRec" "RunningSelection"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type IdentifySerialsInLocationVirtual

Contract	
string <= 100 characters
PartNo	
string <= 100 characters
ConfigurationId	
string <= 100 characters
LocationNo	
string <= 100 characters
LotBatchNo	
string <= 100 characters
EngChgLevel	
string <= 100 characters
WaivDevRejNo	
string <= 100 characters
ActivitySeq	
number
HandlingUnitId	
number
QtyIssue	
number
UoM	
string <= 4000 characters
CatchQtyIssue	
number
CatchUoM	
string <= 100 characters
PartOwnershipDb	
string <= 4000 characters
SerialsIdentified	
number
SessionId	
number
CatchUnitEnabled	
string <= 4000 characters
AssistantTitle	
string <= 4000 characters
AssistantContext	
string <= 4000 characters
RemainingSelection	
string <= 4000 characters
TotalCount	
number
CurrentCount	
number
SelectionRec	
string <= 4000 characters
RunningSelection	
string <= 4000 characters
Responses
200 response body for entity type IdentifySerialsInLocationVirtual
201 response body for entity type IdentifySerialsInLocationVirtual
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
/IdentifySerialsInLocationSet(Objkey='{Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"Contract": "It is a Text",
"PartNo": "It is a Text",
"ConfigurationId": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"QtyIssue": 1,
"UoM": "It is a Text",
"CatchQtyIssue": 1,
"CatchUoM": "It is a Text",
"PartOwnershipDb": "It is a Text",
"SerialsIdentified": 1,
"SessionId": 1,
"CatchUnitEnabled": "It is a Text",
"AssistantTitle": "It is a Text",
"AssistantContext": "It is a Text",
"RemainingSelection": "It is a Text",
"TotalCount": 1,
"CurrentCount": 1,
"SelectionRec": "It is a Text",
"RunningSelection": "It is a Text"
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
"ConfigurationId": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"QtyIssue": 1,
"UoM": "It is a Text",
"CatchQtyIssue": 1,
"CatchUoM": "It is a Text",
"PartOwnershipDb": "It is a Text",
"SerialsIdentified": 1,
"SessionId": 1,
"CatchUnitEnabled": "It is a Text",
"AssistantTitle": "It is a Text",
"AssistantContext": "It is a Text",
"RemainingSelection": "It is a Text",
"TotalCount": 1,
"CurrentCount": 1,
"SelectionRec": "It is a Text",
"RunningSelection": "It is a Text"
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
/IdentifySerialsInLocationSet(Objkey='{Objkey}')/IfsApp.MaterialRequisitionLinesHandling.IdentifySerialsInLocationVirtual_CleanupVirtualEntity

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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "ConfigurationId" "LocationNo" "LotBatchNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "HandlingUnitId" "QtyIssue" "UoM" "CatchQtyIssue" "CatchUoM" "PartOwnershipDb" "SerialsIdentified" "SessionId" "CatchUnitEnabled" "AssistantTitle" "AssistantContext" "RemainingSelection" "TotalCount" "CurrentCount" "SelectionRec" "RunningSelection"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type IdentifySerialsInLocationVirtual
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/IdentifySerialsInLocationSet/IfsApp.MaterialRequisitionLinesHandling.IdentifySerialsInLocationVirtual_Default()

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
"ConfigurationId": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"QtyIssue": 1,
"UoM": "It is a Text",
"CatchQtyIssue": 1,
"CatchUoM": "It is a Text",
"PartOwnershipDb": "It is a Text",
"SerialsIdentified": 1,
"SessionId": 1,
"CatchUnitEnabled": "It is a Text",
"AssistantTitle": "It is a Text",
"AssistantContext": "It is a Text",
"RemainingSelection": "It is a Text",
"TotalCount": 1,
"CurrentCount": 1,
"SelectionRec": "It is a Text",
"RunningSelection": "It is a Text"
}
Get entities from InLocSerialsArray
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "Generated" "Generated desc" "SessionId" "SessionId desc" "SerialNo" "SerialNo desc" "CatchQty" "CatchQty desc" "PartNo" "PartNo desc" "Contract" "Contract desc" "AssistantContext" "AssistantContext desc" "SerialNoAttr" "SerialNoAttr desc" "LocationNo" "LocationNo desc" "LotBatchNo" "LotBatchNo desc" "ConfigurationId" "ConfigurationId desc" "EngChgLevel" "EngChgLevel desc" "WaivDevRejNo" "WaivDevRejNo desc" "ActivitySeq" "ActivitySeq desc" "HandlingUnitId" "HandlingUnitId desc" "PartOwnershipDb" "PartOwnershipDb desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Generated" "SessionId" "SerialNo" "CatchQty" "PartNo" "Contract" "AssistantContext" "SerialNoAttr" "LocationNo" "LotBatchNo" "ConfigurationId" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "HandlingUnitId" "PartOwnershipDb"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "SerialNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array TempPartTrackingForInLocSerialsVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/IdentifySerialsInLocationSet(Objkey='{Objkey}')/InLocSerialsArray

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Add new entity to InLocSerialsArray
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "ConfigurationId" "LocationNo" "LotBatchNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "HandlingUnitId" "QtyIssue" "UoM" "CatchQtyIssue" "CatchUoM" "PartOwnershipDb" "SerialsIdentified" "SessionId" "CatchUnitEnabled" "AssistantTitle" "AssistantContext" "RemainingSelection" "TotalCount" "CurrentCount" "SelectionRec" "RunningSelection"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type TempPartTrackingForInLocSerialsVirtual

ParentObjkey	
string <= 50 characters
ObjCreatedBy	
string <= 50 characters
Generated	
boolean
SessionId
required
number
SerialNo
required
string <= 50 characters
CatchQty	
number
PartNo	
string <= 25 characters
Contract	
string <= 5 characters
AssistantContext	
string <= 4000 characters
SerialNoAttr	
string <= 4000 characters
LocationNo	
string <= 4000 characters
LotBatchNo	
string <= 4000 characters
ConfigurationId	
string <= 4000 characters
EngChgLevel	
string <= 4000 characters
WaivDevRejNo	
string <= 4000 characters
ActivitySeq	
number
HandlingUnitId	
number
PartOwnershipDb	
string <= 4000 characters
Responses
201 response body for entity type TempPartTrackingForInLocSerialsVirtual
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/IdentifySerialsInLocationSet(Objkey='{Objkey}')/InLocSerialsArray

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"ObjCreatedBy": "It is a Text",
"Generated": true,
"SessionId": 1,
"SerialNo": "It is a Text",
"CatchQty": 1,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"AssistantContext": "It is a Text",
"SerialNoAttr": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"ConfigurationId": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"PartOwnershipDb": "It is a Text"
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
"Generated": true,
"SessionId": 1,
"SerialNo": "It is a Text",
"CatchQty": 1,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"AssistantContext": "It is a Text",
"SerialNoAttr": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"ConfigurationId": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"PartOwnershipDb": "It is a Text"
}
Get entity from InLocSerialsArray by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
InLocSerialsArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "ConfigurationId" "LocationNo" "LotBatchNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "HandlingUnitId" "QtyIssue" "UoM" "CatchQtyIssue" "CatchUoM" "PartOwnershipDb" "SerialsIdentified" "SessionId" "CatchUnitEnabled" "AssistantTitle" "AssistantContext" "RemainingSelection" "TotalCount" "CurrentCount" "SelectionRec" "RunningSelection"
Specify properties to return, see OData Select

Responses
200 response body for entity type TempPartTrackingForInLocSerialsVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/IdentifySerialsInLocationSet(Objkey='{Objkey}')/InLocSerialsArray(Objkey='{InLocSerialsArray_Objkey}')

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
"Generated": true,
"SessionId": 1,
"SerialNo": "It is a Text",
"CatchQty": 1,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"AssistantContext": "It is a Text",
"SerialNoAttr": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"ConfigurationId": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"PartOwnershipDb": "It is a Text"
}
Delete entity from InLocSerialsArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
InLocSerialsArray_Objkey
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
/IdentifySerialsInLocationSet(Objkey='{Objkey}')/InLocSerialsArray(Objkey='{InLocSerialsArray_Objkey}')

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
Update entity in InLocSerialsArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
InLocSerialsArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "ConfigurationId" "LocationNo" "LotBatchNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "HandlingUnitId" "QtyIssue" "UoM" "CatchQtyIssue" "CatchUoM" "PartOwnershipDb" "SerialsIdentified" "SessionId" "CatchUnitEnabled" "AssistantTitle" "AssistantContext" "RemainingSelection" "TotalCount" "CurrentCount" "SelectionRec" "RunningSelection"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type TempPartTrackingForInLocSerialsVirtual

Generated	
boolean
SessionId
required
number
SerialNo
required
string <= 50 characters
CatchQty	
number
PartNo	
string <= 25 characters
Contract	
string <= 5 characters
AssistantContext	
string <= 4000 characters
SerialNoAttr	
string <= 4000 characters
LocationNo	
string <= 4000 characters
LotBatchNo	
string <= 4000 characters
ConfigurationId	
string <= 4000 characters
EngChgLevel	
string <= 4000 characters
WaivDevRejNo	
string <= 4000 characters
ActivitySeq	
number
HandlingUnitId	
number
PartOwnershipDb	
string <= 4000 characters
Responses
200 response body for entity type TempPartTrackingForInLocSerialsVirtual
201 response body for entity type TempPartTrackingForInLocSerialsVirtual
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
/IdentifySerialsInLocationSet(Objkey='{Objkey}')/InLocSerialsArray(Objkey='{InLocSerialsArray_Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"Generated": true,
"SessionId": 1,
"SerialNo": "It is a Text",
"CatchQty": 1,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"AssistantContext": "It is a Text",
"SerialNoAttr": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"ConfigurationId": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"PartOwnershipDb": "It is a Text"
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
"Generated": true,
"SessionId": 1,
"SerialNo": "It is a Text",
"CatchQty": 1,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"AssistantContext": "It is a Text",
"SerialNoAttr": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"ConfigurationId": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"PartOwnershipDb": "It is a Text"
}
Get entities from SerialNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
InLocSerialsArray_Objkey
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
Items Enum: "SerialNo" "SerialNo desc" "PartNo" "PartNo desc" "Contract" "Contract desc" "ManufacturerNo" "ManufacturerNo desc" "SupplierNo" "SupplierNo desc" "PartOwnership" "PartOwnership desc" "PartOwnershipDb" "PartOwnershipDb desc" "OwningVendorNo" "OwningVendorNo desc" "OwningCustomerNo" "OwningCustomerNo desc" "OperationalStatus" "OperationalStatus desc" "OperationalStatusDb" "OperationalStatusDb desc" "OperationalCondition" "OperationalCondition desc" "OperationalConditionDb" "OperationalConditionDb desc" "LatestTransaction" "LatestTransaction desc" "LotBatchNo" "LotBatchNo desc" "ConfigurationId" "ConfigurationId desc" "LockedForUpdate" "LockedForUpdate desc" "LockedForUpdateDb" "LockedForUpdateDb desc" "ConditionCode" "ConditionCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "SerialNo" "PartNo" "Contract" "ManufacturerNo" "SupplierNo" "PartOwnership" "PartOwnershipDb" "OwningVendorNo" "OwningCustomerNo" "OperationalStatus" "OperationalStatusDb" "OperationalCondition" "OperationalConditionDb" "LatestTransaction" "LotBatchNo" "ConfigurationId" "LockedForUpdate" "LockedForUpdateDb" "ConditionCode"
Specify properties to return, see OData Select

Responses
200 response body for entity array TemporaryPartTrackingSerial
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/IdentifySerialsInLocationSet(Objkey='{Objkey}')/InLocSerialsArray(Objkey='{InLocSerialsArray_Objkey}')/SerialNoRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
PreAccountingVirtualSet
Get entities from PreAccountingVirtualSet
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "ReadOnly" "ReadOnly desc" "ProjectConnected" "ProjectConnected desc" "MultipleRecords" "MultipleRecords desc" "PostingType" "PostingType desc" "PreAccountingId" "PreAccountingId desc" "Contract" "Contract desc" "Company" "Company desc" "VoucherDate" "VoucherDate desc" "ValidationDate" "ValidationDate desc" "PostingTypeDist" "PostingTypeDist desc" "Allowed" "Allowed desc" "AllowedAccountNo" "AllowedAccountNo desc" "AllowedCodenoB" "AllowedCodenoB desc" "AllowedCodenoC" "AllowedCodenoC desc" "AllowedCodenoD" "AllowedCodenoD desc" "AllowedCodenoE" "AllowedCodenoE desc" "AllowedCodenoF" "AllowedCodenoF desc" "AllowedCodenoG" "AllowedCodenoG desc" "AllowedCodenoH" "AllowedCodenoH desc" "AllowedCodenoI" "AllowedCodenoI desc" "AllowedCodenoJ" "AllowedCodenoJ desc" "LabelAccountNo" "LabelAccountNo desc" "LabelCodenoB" "LabelCodenoB desc" "LabelCodenoC" "LabelCodenoC desc" "LabelCodenoD" "LabelCodenoD desc" "LabelCodenoE" "LabelCodenoE desc" "LabelCodenoF" "LabelCodenoF desc" "LabelCodenoG" "LabelCodenoG desc" "LabelCodenoH" "LabelCodenoH desc" "LabelCodenoI" "LabelCodenoI desc" "LabelCodenoJ" "LabelCodenoJ desc" "AllowedDist" "AllowedDist desc" "AllowedAccountNoDist" "AllowedAccountNoDist desc" "AllowedCodenoBDist" "AllowedCodenoBDist desc" "AllowedCodenoCDist" "AllowedCodenoCDist desc" "AllowedCodenoDDist" "AllowedCodenoDDist desc" "AllowedCodenoEDist" "AllowedCodenoEDist desc" "AllowedCodenoFDist" "AllowedCodenoFDist desc" "AllowedCodenoGDist" "AllowedCodenoGDist desc" "AllowedCodenoHDist" "AllowedCodenoHDist desc" "AllowedCodenoIDist" "AllowedCodenoIDist desc" "AllowedCodenoJDist" "AllowedCodenoJDist desc" "SameContract" "SameContract desc" "SameAccountNo" "SameAccountNo desc" "SameCodeB" "SameCodeB desc" "SameCodeC" "SameCodeC desc" "SameCodeD" "SameCodeD desc" "SameCodeE" "SameCodeE desc" "SameCodeF" "SameCodeF desc" "SameCodeG" "SameCodeG desc" "SameCodeH" "SameCodeH desc" "SameCodeI" "SameCodeI desc" "SameCodeJ" "SameCodeJ desc" "SameActivitySeq" "SameActivitySeq desc" "TotalAmountDist" "TotalAmountDist desc" "PrePostingSource" "PrePostingSource desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "ProjectConnected" "MultipleRecords" "PostingType" "PreAccountingId" "Contract" "Company" "VoucherDate" "ValidationDate" "PostingTypeDist" "Allowed" "AllowedAccountNo" "AllowedCodenoB" "AllowedCodenoC" "AllowedCodenoD" "AllowedCodenoE" "AllowedCodenoF" "AllowedCodenoG" "AllowedCodenoH" "AllowedCodenoI" "AllowedCodenoJ" "LabelAccountNo" "LabelCodenoB" "LabelCodenoC" "LabelCodenoD" "LabelCodenoE" "LabelCodenoF" "LabelCodenoG" "LabelCodenoH" "LabelCodenoI" "LabelCodenoJ" "AllowedDist" "AllowedAccountNoDist" "AllowedCodenoBDist" "AllowedCodenoCDist" "AllowedCodenoDDist" "AllowedCodenoEDist" "AllowedCodenoFDist" "AllowedCodenoGDist" "AllowedCodenoHDist" "AllowedCodenoIDist" "AllowedCodenoJDist" "SameContract" "SameAccountNo" "SameCodeB" "SameCodeC" "SameCodeD" "SameCodeE" "SameCodeF" "SameCodeG" "SameCodeH" "SameCodeI" "SameCodeJ" "SameActivitySeq" "TotalAmountDist" "Selection" "PrePostingSource"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Add new entity to PreAccountingVirtualSet
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "ProjectConnected" "MultipleRecords" "PostingType" "PreAccountingId" "Contract" "Company" "VoucherDate" "ValidationDate" "PostingTypeDist" "Allowed" "AllowedAccountNo" "AllowedCodenoB" "AllowedCodenoC" "AllowedCodenoD" "AllowedCodenoE" "AllowedCodenoF" "AllowedCodenoG" "AllowedCodenoH" "AllowedCodenoI" "AllowedCodenoJ" "LabelAccountNo" "LabelCodenoB" "LabelCodenoC" "LabelCodenoD" "LabelCodenoE" "LabelCodenoF" "LabelCodenoG" "LabelCodenoH" "LabelCodenoI" "LabelCodenoJ" "AllowedDist" "AllowedAccountNoDist" "AllowedCodenoBDist" "AllowedCodenoCDist" "AllowedCodenoDDist" "AllowedCodenoEDist" "AllowedCodenoFDist" "AllowedCodenoGDist" "AllowedCodenoHDist" "AllowedCodenoIDist" "AllowedCodenoJDist" "SameContract" "SameAccountNo" "SameCodeB" "SameCodeC" "SameCodeD" "SameCodeE" "SameCodeF" "SameCodeG" "SameCodeH" "SameCodeI" "SameCodeJ" "SameActivitySeq" "TotalAmountDist" "Selection" "PrePostingSource"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type PreAccountingVirtual

ParentObjkey	
string <= 50 characters
ObjCreatedBy	
string <= 50 characters
ReadOnly	
boolean
ProjectConnected	
boolean
MultipleRecords	
boolean
PostingType	
string <= 4000 characters
PreAccountingId	
number
Contract	
string <= 4000 characters
Company	
string <= 4000 characters
VoucherDate	
string <date>
ValidationDate	
string <date>
PostingTypeDist	
string <= 4000 characters
Allowed	
string <= 4000 characters
AllowedAccountNo	
string <= 4000 characters
AllowedCodenoB	
string <= 4000 characters
AllowedCodenoC	
string <= 4000 characters
AllowedCodenoD	
string <= 4000 characters
AllowedCodenoE	
string <= 4000 characters
AllowedCodenoF	
string <= 4000 characters
AllowedCodenoG	
string <= 4000 characters
AllowedCodenoH	
string <= 4000 characters
AllowedCodenoI	
string <= 4000 characters
AllowedCodenoJ	
string <= 4000 characters
LabelAccountNo	
string <= 4000 characters
LabelCodenoB	
string <= 4000 characters
LabelCodenoC	
string <= 4000 characters
LabelCodenoD	
string <= 4000 characters
LabelCodenoE	
string <= 4000 characters
LabelCodenoF	
string <= 4000 characters
LabelCodenoG	
string <= 4000 characters
LabelCodenoH	
string <= 4000 characters
LabelCodenoI	
string <= 4000 characters
LabelCodenoJ	
string <= 4000 characters
AllowedDist	
string <= 4000 characters
AllowedAccountNoDist	
string <= 4000 characters
AllowedCodenoBDist	
string <= 4000 characters
AllowedCodenoCDist	
string <= 4000 characters
AllowedCodenoDDist	
string <= 4000 characters
AllowedCodenoEDist	
string <= 4000 characters
AllowedCodenoFDist	
string <= 4000 characters
AllowedCodenoGDist	
string <= 4000 characters
AllowedCodenoHDist	
string <= 4000 characters
AllowedCodenoIDist	
string <= 4000 characters
AllowedCodenoJDist	
string <= 4000 characters
SameContract	
string <= 4000 characters
SameAccountNo	
string <= 4000 characters
SameCodeB	
string <= 4000 characters
SameCodeC	
string <= 4000 characters
SameCodeD	
string <= 4000 characters
SameCodeE	
string <= 4000 characters
SameCodeF	
string <= 4000 characters
SameCodeG	
string <= 4000 characters
SameCodeH	
string <= 4000 characters
SameCodeI	
string <= 4000 characters
SameCodeJ	
string <= 4000 characters
SameActivitySeq	
string <= 4000 characters
TotalAmountDist	
number
Selection	
string <= 64000 characters
PrePostingSource	
string <= 4000 characters
Responses
201 response body for entity type PreAccountingVirtual
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/PreAccountingVirtualSet

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"ObjCreatedBy": "It is a Text",
"ReadOnly": true,
"ProjectConnected": true,
"MultipleRecords": true,
"PostingType": "It is a Text",
"PreAccountingId": 1,
"Contract": "It is a Text",
"Company": "It is a Text",
"VoucherDate": "2019-10-10",
"ValidationDate": "2019-10-10",
"PostingTypeDist": "It is a Text",
"Allowed": "It is a Text",
"AllowedAccountNo": "It is a Text",
"AllowedCodenoB": "It is a Text",
"AllowedCodenoC": "It is a Text",
"AllowedCodenoD": "It is a Text",
"AllowedCodenoE": "It is a Text",
"AllowedCodenoF": "It is a Text",
"AllowedCodenoG": "It is a Text",
"AllowedCodenoH": "It is a Text",
"AllowedCodenoI": "It is a Text",
"AllowedCodenoJ": "It is a Text",
"LabelAccountNo": "It is a Text",
"LabelCodenoB": "It is a Text",
"LabelCodenoC": "It is a Text",
"LabelCodenoD": "It is a Text",
"LabelCodenoE": "It is a Text",
"LabelCodenoF": "It is a Text",
"LabelCodenoG": "It is a Text",
"LabelCodenoH": "It is a Text",
"LabelCodenoI": "It is a Text",
"LabelCodenoJ": "It is a Text",
"AllowedDist": "It is a Text",
"AllowedAccountNoDist": "It is a Text",
"AllowedCodenoBDist": "It is a Text",
"AllowedCodenoCDist": "It is a Text",
"AllowedCodenoDDist": "It is a Text",
"AllowedCodenoEDist": "It is a Text",
"AllowedCodenoFDist": "It is a Text",
"AllowedCodenoGDist": "It is a Text",
"AllowedCodenoHDist": "It is a Text",
"AllowedCodenoIDist": "It is a Text",
"AllowedCodenoJDist": "It is a Text",
"SameContract": "It is a Text",
"SameAccountNo": "It is a Text",
"SameCodeB": "It is a Text",
"SameCodeC": "It is a Text",
"SameCodeD": "It is a Text",
"SameCodeE": "It is a Text",
"SameCodeF": "It is a Text",
"SameCodeG": "It is a Text",
"SameCodeH": "It is a Text",
"SameCodeI": "It is a Text",
"SameCodeJ": "It is a Text",
"SameActivitySeq": "It is a Text",
"TotalAmountDist": 1,
"Selection": "",
"PrePostingSource": "It is a Text"
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
"ProjectConnected": true,
"MultipleRecords": true,
"PostingType": "It is a Text",
"PreAccountingId": 1,
"Contract": "It is a Text",
"Company": "It is a Text",
"VoucherDate": "2019-10-10",
"ValidationDate": "2019-10-10",
"PostingTypeDist": "It is a Text",
"Allowed": "It is a Text",
"AllowedAccountNo": "It is a Text",
"AllowedCodenoB": "It is a Text",
"AllowedCodenoC": "It is a Text",
"AllowedCodenoD": "It is a Text",
"AllowedCodenoE": "It is a Text",
"AllowedCodenoF": "It is a Text",
"AllowedCodenoG": "It is a Text",
"AllowedCodenoH": "It is a Text",
"AllowedCodenoI": "It is a Text",
"AllowedCodenoJ": "It is a Text",
"LabelAccountNo": "It is a Text",
"LabelCodenoB": "It is a Text",
"LabelCodenoC": "It is a Text",
"LabelCodenoD": "It is a Text",
"LabelCodenoE": "It is a Text",
"LabelCodenoF": "It is a Text",
"LabelCodenoG": "It is a Text",
"LabelCodenoH": "It is a Text",
"LabelCodenoI": "It is a Text",
"LabelCodenoJ": "It is a Text",
"AllowedDist": "It is a Text",
"AllowedAccountNoDist": "It is a Text",
"AllowedCodenoBDist": "It is a Text",
"AllowedCodenoCDist": "It is a Text",
"AllowedCodenoDDist": "It is a Text",
"AllowedCodenoEDist": "It is a Text",
"AllowedCodenoFDist": "It is a Text",
"AllowedCodenoGDist": "It is a Text",
"AllowedCodenoHDist": "It is a Text",
"AllowedCodenoIDist": "It is a Text",
"AllowedCodenoJDist": "It is a Text",
"SameContract": "It is a Text",
"SameAccountNo": "It is a Text",
"SameCodeB": "It is a Text",
"SameCodeC": "It is a Text",
"SameCodeD": "It is a Text",
"SameCodeE": "It is a Text",
"SameCodeF": "It is a Text",
"SameCodeG": "It is a Text",
"SameCodeH": "It is a Text",
"SameCodeI": "It is a Text",
"SameCodeJ": "It is a Text",
"SameActivitySeq": "It is a Text",
"TotalAmountDist": 1,
"Selection": "",
"PrePostingSource": "It is a Text"
}
Get entity from PreAccountingVirtualSet by key
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "ProjectConnected" "MultipleRecords" "PostingType" "PreAccountingId" "Contract" "Company" "VoucherDate" "ValidationDate" "PostingTypeDist" "Allowed" "AllowedAccountNo" "AllowedCodenoB" "AllowedCodenoC" "AllowedCodenoD" "AllowedCodenoE" "AllowedCodenoF" "AllowedCodenoG" "AllowedCodenoH" "AllowedCodenoI" "AllowedCodenoJ" "LabelAccountNo" "LabelCodenoB" "LabelCodenoC" "LabelCodenoD" "LabelCodenoE" "LabelCodenoF" "LabelCodenoG" "LabelCodenoH" "LabelCodenoI" "LabelCodenoJ" "AllowedDist" "AllowedAccountNoDist" "AllowedCodenoBDist" "AllowedCodenoCDist" "AllowedCodenoDDist" "AllowedCodenoEDist" "AllowedCodenoFDist" "AllowedCodenoGDist" "AllowedCodenoHDist" "AllowedCodenoIDist" "AllowedCodenoJDist" "SameContract" "SameAccountNo" "SameCodeB" "SameCodeC" "SameCodeD" "SameCodeE" "SameCodeF" "SameCodeG" "SameCodeH" "SameCodeI" "SameCodeJ" "SameActivitySeq" "TotalAmountDist" "Selection" "PrePostingSource"
Specify properties to return, see OData Select

Responses
200 response body for entity type PreAccountingVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')

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
"ProjectConnected": true,
"MultipleRecords": true,
"PostingType": "It is a Text",
"PreAccountingId": 1,
"Contract": "It is a Text",
"Company": "It is a Text",
"VoucherDate": "2019-10-10",
"ValidationDate": "2019-10-10",
"PostingTypeDist": "It is a Text",
"Allowed": "It is a Text",
"AllowedAccountNo": "It is a Text",
"AllowedCodenoB": "It is a Text",
"AllowedCodenoC": "It is a Text",
"AllowedCodenoD": "It is a Text",
"AllowedCodenoE": "It is a Text",
"AllowedCodenoF": "It is a Text",
"AllowedCodenoG": "It is a Text",
"AllowedCodenoH": "It is a Text",
"AllowedCodenoI": "It is a Text",
"AllowedCodenoJ": "It is a Text",
"LabelAccountNo": "It is a Text",
"LabelCodenoB": "It is a Text",
"LabelCodenoC": "It is a Text",
"LabelCodenoD": "It is a Text",
"LabelCodenoE": "It is a Text",
"LabelCodenoF": "It is a Text",
"LabelCodenoG": "It is a Text",
"LabelCodenoH": "It is a Text",
"LabelCodenoI": "It is a Text",
"LabelCodenoJ": "It is a Text",
"AllowedDist": "It is a Text",
"AllowedAccountNoDist": "It is a Text",
"AllowedCodenoBDist": "It is a Text",
"AllowedCodenoCDist": "It is a Text",
"AllowedCodenoDDist": "It is a Text",
"AllowedCodenoEDist": "It is a Text",
"AllowedCodenoFDist": "It is a Text",
"AllowedCodenoGDist": "It is a Text",
"AllowedCodenoHDist": "It is a Text",
"AllowedCodenoIDist": "It is a Text",
"AllowedCodenoJDist": "It is a Text",
"SameContract": "It is a Text",
"SameAccountNo": "It is a Text",
"SameCodeB": "It is a Text",
"SameCodeC": "It is a Text",
"SameCodeD": "It is a Text",
"SameCodeE": "It is a Text",
"SameCodeF": "It is a Text",
"SameCodeG": "It is a Text",
"SameCodeH": "It is a Text",
"SameCodeI": "It is a Text",
"SameCodeJ": "It is a Text",
"SameActivitySeq": "It is a Text",
"TotalAmountDist": 1,
"Selection": "",
"PrePostingSource": "It is a Text"
}
Delete entity from PreAccountingVirtualSet
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
/PreAccountingVirtualSet(Objkey='{Objkey}')

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
Update entity in PreAccountingVirtualSet
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "ProjectConnected" "MultipleRecords" "PostingType" "PreAccountingId" "Contract" "Company" "VoucherDate" "ValidationDate" "PostingTypeDist" "Allowed" "AllowedAccountNo" "AllowedCodenoB" "AllowedCodenoC" "AllowedCodenoD" "AllowedCodenoE" "AllowedCodenoF" "AllowedCodenoG" "AllowedCodenoH" "AllowedCodenoI" "AllowedCodenoJ" "LabelAccountNo" "LabelCodenoB" "LabelCodenoC" "LabelCodenoD" "LabelCodenoE" "LabelCodenoF" "LabelCodenoG" "LabelCodenoH" "LabelCodenoI" "LabelCodenoJ" "AllowedDist" "AllowedAccountNoDist" "AllowedCodenoBDist" "AllowedCodenoCDist" "AllowedCodenoDDist" "AllowedCodenoEDist" "AllowedCodenoFDist" "AllowedCodenoGDist" "AllowedCodenoHDist" "AllowedCodenoIDist" "AllowedCodenoJDist" "SameContract" "SameAccountNo" "SameCodeB" "SameCodeC" "SameCodeD" "SameCodeE" "SameCodeF" "SameCodeG" "SameCodeH" "SameCodeI" "SameCodeJ" "SameActivitySeq" "TotalAmountDist" "Selection" "PrePostingSource"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type PreAccountingVirtual

ReadOnly	
boolean
ProjectConnected	
boolean
MultipleRecords	
boolean
PostingType	
string <= 4000 characters
PreAccountingId	
number
Contract	
string <= 4000 characters
Company	
string <= 4000 characters
VoucherDate	
string <date>
ValidationDate	
string <date>
PostingTypeDist	
string <= 4000 characters
Allowed	
string <= 4000 characters
AllowedAccountNo	
string <= 4000 characters
AllowedCodenoB	
string <= 4000 characters
AllowedCodenoC	
string <= 4000 characters
AllowedCodenoD	
string <= 4000 characters
AllowedCodenoE	
string <= 4000 characters
AllowedCodenoF	
string <= 4000 characters
AllowedCodenoG	
string <= 4000 characters
AllowedCodenoH	
string <= 4000 characters
AllowedCodenoI	
string <= 4000 characters
AllowedCodenoJ	
string <= 4000 characters
LabelAccountNo	
string <= 4000 characters
LabelCodenoB	
string <= 4000 characters
LabelCodenoC	
string <= 4000 characters
LabelCodenoD	
string <= 4000 characters
LabelCodenoE	
string <= 4000 characters
LabelCodenoF	
string <= 4000 characters
LabelCodenoG	
string <= 4000 characters
LabelCodenoH	
string <= 4000 characters
LabelCodenoI	
string <= 4000 characters
LabelCodenoJ	
string <= 4000 characters
AllowedDist	
string <= 4000 characters
AllowedAccountNoDist	
string <= 4000 characters
AllowedCodenoBDist	
string <= 4000 characters
AllowedCodenoCDist	
string <= 4000 characters
AllowedCodenoDDist	
string <= 4000 characters
AllowedCodenoEDist	
string <= 4000 characters
AllowedCodenoFDist	
string <= 4000 characters
AllowedCodenoGDist	
string <= 4000 characters
AllowedCodenoHDist	
string <= 4000 characters
AllowedCodenoIDist	
string <= 4000 characters
AllowedCodenoJDist	
string <= 4000 characters
SameContract	
string <= 4000 characters
SameAccountNo	
string <= 4000 characters
SameCodeB	
string <= 4000 characters
SameCodeC	
string <= 4000 characters
SameCodeD	
string <= 4000 characters
SameCodeE	
string <= 4000 characters
SameCodeF	
string <= 4000 characters
SameCodeG	
string <= 4000 characters
SameCodeH	
string <= 4000 characters
SameCodeI	
string <= 4000 characters
SameCodeJ	
string <= 4000 characters
SameActivitySeq	
string <= 4000 characters
TotalAmountDist	
number
Selection	
string <= 64000 characters
PrePostingSource	
string <= 4000 characters
Responses
200 response body for entity type PreAccountingVirtual
201 response body for entity type PreAccountingVirtual
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
/PreAccountingVirtualSet(Objkey='{Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"ReadOnly": true,
"ProjectConnected": true,
"MultipleRecords": true,
"PostingType": "It is a Text",
"PreAccountingId": 1,
"Contract": "It is a Text",
"Company": "It is a Text",
"VoucherDate": "2019-10-10",
"ValidationDate": "2019-10-10",
"PostingTypeDist": "It is a Text",
"Allowed": "It is a Text",
"AllowedAccountNo": "It is a Text",
"AllowedCodenoB": "It is a Text",
"AllowedCodenoC": "It is a Text",
"AllowedCodenoD": "It is a Text",
"AllowedCodenoE": "It is a Text",
"AllowedCodenoF": "It is a Text",
"AllowedCodenoG": "It is a Text",
"AllowedCodenoH": "It is a Text",
"AllowedCodenoI": "It is a Text",
"AllowedCodenoJ": "It is a Text",
"LabelAccountNo": "It is a Text",
"LabelCodenoB": "It is a Text",
"LabelCodenoC": "It is a Text",
"LabelCodenoD": "It is a Text",
"LabelCodenoE": "It is a Text",
"LabelCodenoF": "It is a Text",
"LabelCodenoG": "It is a Text",
"LabelCodenoH": "It is a Text",
"LabelCodenoI": "It is a Text",
"LabelCodenoJ": "It is a Text",
"AllowedDist": "It is a Text",
"AllowedAccountNoDist": "It is a Text",
"AllowedCodenoBDist": "It is a Text",
"AllowedCodenoCDist": "It is a Text",
"AllowedCodenoDDist": "It is a Text",
"AllowedCodenoEDist": "It is a Text",
"AllowedCodenoFDist": "It is a Text",
"AllowedCodenoGDist": "It is a Text",
"AllowedCodenoHDist": "It is a Text",
"AllowedCodenoIDist": "It is a Text",
"AllowedCodenoJDist": "It is a Text",
"SameContract": "It is a Text",
"SameAccountNo": "It is a Text",
"SameCodeB": "It is a Text",
"SameCodeC": "It is a Text",
"SameCodeD": "It is a Text",
"SameCodeE": "It is a Text",
"SameCodeF": "It is a Text",
"SameCodeG": "It is a Text",
"SameCodeH": "It is a Text",
"SameCodeI": "It is a Text",
"SameCodeJ": "It is a Text",
"SameActivitySeq": "It is a Text",
"TotalAmountDist": 1,
"Selection": "",
"PrePostingSource": "It is a Text"
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
"ProjectConnected": true,
"MultipleRecords": true,
"PostingType": "It is a Text",
"PreAccountingId": 1,
"Contract": "It is a Text",
"Company": "It is a Text",
"VoucherDate": "2019-10-10",
"ValidationDate": "2019-10-10",
"PostingTypeDist": "It is a Text",
"Allowed": "It is a Text",
"AllowedAccountNo": "It is a Text",
"AllowedCodenoB": "It is a Text",
"AllowedCodenoC": "It is a Text",
"AllowedCodenoD": "It is a Text",
"AllowedCodenoE": "It is a Text",
"AllowedCodenoF": "It is a Text",
"AllowedCodenoG": "It is a Text",
"AllowedCodenoH": "It is a Text",
"AllowedCodenoI": "It is a Text",
"AllowedCodenoJ": "It is a Text",
"LabelAccountNo": "It is a Text",
"LabelCodenoB": "It is a Text",
"LabelCodenoC": "It is a Text",
"LabelCodenoD": "It is a Text",
"LabelCodenoE": "It is a Text",
"LabelCodenoF": "It is a Text",
"LabelCodenoG": "It is a Text",
"LabelCodenoH": "It is a Text",
"LabelCodenoI": "It is a Text",
"LabelCodenoJ": "It is a Text",
"AllowedDist": "It is a Text",
"AllowedAccountNoDist": "It is a Text",
"AllowedCodenoBDist": "It is a Text",
"AllowedCodenoCDist": "It is a Text",
"AllowedCodenoDDist": "It is a Text",
"AllowedCodenoEDist": "It is a Text",
"AllowedCodenoFDist": "It is a Text",
"AllowedCodenoGDist": "It is a Text",
"AllowedCodenoHDist": "It is a Text",
"AllowedCodenoIDist": "It is a Text",
"AllowedCodenoJDist": "It is a Text",
"SameContract": "It is a Text",
"SameAccountNo": "It is a Text",
"SameCodeB": "It is a Text",
"SameCodeC": "It is a Text",
"SameCodeD": "It is a Text",
"SameCodeE": "It is a Text",
"SameCodeF": "It is a Text",
"SameCodeG": "It is a Text",
"SameCodeH": "It is a Text",
"SameCodeI": "It is a Text",
"SameCodeJ": "It is a Text",
"SameActivitySeq": "It is a Text",
"TotalAmountDist": 1,
"Selection": "",
"PrePostingSource": "It is a Text"
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
/PreAccountingVirtualSet(Objkey='{Objkey}')/IfsApp.MaterialRequisitionLinesHandling.PreAccountingVirtual_CleanupVirtualEntity

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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "ProjectConnected" "MultipleRecords" "PostingType" "PreAccountingId" "Contract" "Company" "VoucherDate" "ValidationDate" "PostingTypeDist" "Allowed" "AllowedAccountNo" "AllowedCodenoB" "AllowedCodenoC" "AllowedCodenoD" "AllowedCodenoE" "AllowedCodenoF" "AllowedCodenoG" "AllowedCodenoH" "AllowedCodenoI" "AllowedCodenoJ" "LabelAccountNo" "LabelCodenoB" "LabelCodenoC" "LabelCodenoD" "LabelCodenoE" "LabelCodenoF" "LabelCodenoG" "LabelCodenoH" "LabelCodenoI" "LabelCodenoJ" "AllowedDist" "AllowedAccountNoDist" "AllowedCodenoBDist" "AllowedCodenoCDist" "AllowedCodenoDDist" "AllowedCodenoEDist" "AllowedCodenoFDist" "AllowedCodenoGDist" "AllowedCodenoHDist" "AllowedCodenoIDist" "AllowedCodenoJDist" "SameContract" "SameAccountNo" "SameCodeB" "SameCodeC" "SameCodeD" "SameCodeE" "SameCodeF" "SameCodeG" "SameCodeH" "SameCodeI" "SameCodeJ" "SameActivitySeq" "TotalAmountDist" "Selection" "PrePostingSource"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type PreAccountingVirtual
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet/IfsApp.MaterialRequisitionLinesHandling.PreAccountingVirtual_Default()

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
"ProjectConnected": true,
"MultipleRecords": true,
"PostingType": "It is a Text",
"PreAccountingId": 1,
"Contract": "It is a Text",
"Company": "It is a Text",
"VoucherDate": "2019-10-10",
"ValidationDate": "2019-10-10",
"PostingTypeDist": "It is a Text",
"Allowed": "It is a Text",
"AllowedAccountNo": "It is a Text",
"AllowedCodenoB": "It is a Text",
"AllowedCodenoC": "It is a Text",
"AllowedCodenoD": "It is a Text",
"AllowedCodenoE": "It is a Text",
"AllowedCodenoF": "It is a Text",
"AllowedCodenoG": "It is a Text",
"AllowedCodenoH": "It is a Text",
"AllowedCodenoI": "It is a Text",
"AllowedCodenoJ": "It is a Text",
"LabelAccountNo": "It is a Text",
"LabelCodenoB": "It is a Text",
"LabelCodenoC": "It is a Text",
"LabelCodenoD": "It is a Text",
"LabelCodenoE": "It is a Text",
"LabelCodenoF": "It is a Text",
"LabelCodenoG": "It is a Text",
"LabelCodenoH": "It is a Text",
"LabelCodenoI": "It is a Text",
"LabelCodenoJ": "It is a Text",
"AllowedDist": "It is a Text",
"AllowedAccountNoDist": "It is a Text",
"AllowedCodenoBDist": "It is a Text",
"AllowedCodenoCDist": "It is a Text",
"AllowedCodenoDDist": "It is a Text",
"AllowedCodenoEDist": "It is a Text",
"AllowedCodenoFDist": "It is a Text",
"AllowedCodenoGDist": "It is a Text",
"AllowedCodenoHDist": "It is a Text",
"AllowedCodenoIDist": "It is a Text",
"AllowedCodenoJDist": "It is a Text",
"SameContract": "It is a Text",
"SameAccountNo": "It is a Text",
"SameCodeB": "It is a Text",
"SameCodeC": "It is a Text",
"SameCodeD": "It is a Text",
"SameCodeE": "It is a Text",
"SameCodeF": "It is a Text",
"SameCodeG": "It is a Text",
"SameCodeH": "It is a Text",
"SameCodeI": "It is a Text",
"SameCodeJ": "It is a Text",
"SameActivitySeq": "It is a Text",
"TotalAmountDist": 1,
"Selection": "",
"PrePostingSource": "It is a Text"
}
Get entities from PreAccountingDistributionArray
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
Items Enum: "PreAccountingId" "PreAccountingId desc" "AccountNo" "AccountNo desc" "CodenoB" "CodenoB desc" "CodenoC" "CodenoC desc" "CodenoD" "CodenoD desc" "CodenoE" "CodenoE desc" "CodenoF" "CodenoF desc" "CodenoG" "CodenoG desc" "CodenoH" "CodenoH desc" "CodenoI" "CodenoI desc" "CodenoJ" "CodenoJ desc" "ActivitySeq" "ActivitySeq desc" "ParentPreAccountingId" "ParentPreAccountingId desc" "AmountDistribution" "AmountDistribution desc" "Percentage" "Percentage desc" "Amount" "Amount desc" "CompanyRef" "CompanyRef desc" "Company" "Company desc" "Contract" "Contract desc" "PrePostingSource" "PrePostingSource desc" "VoucherDate" "VoucherDate desc" "TotalAmount" "TotalAmount desc" "LineAmount" "LineAmount desc" "ValidationType" "ValidationType desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PreAccountingId" "AccountNo" "CodenoB" "CodenoC" "CodenoD" "CodenoE" "CodenoF" "CodenoG" "CodenoH" "CodenoI" "CodenoJ" "ActivitySeq" "ParentPreAccountingId" "AmountDistribution" "Percentage" "Amount" "CompanyRef" "Company" "Contract" "PrePostingSource" "VoucherDate" "TotalAmount" "LineAmount" "ValidationType"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "AccountNoRef" "CodenoBRef" "CodenoCRef" "CodenoDRef" "CodenoERef" "CodenoFRef" "CodenoGRef" "CodenoHRef" "CodenoIRef" "CodenoJRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array PreAccountingDistribution
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingDistributionArray

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Add new entity to PreAccountingDistributionArray
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "ProjectConnected" "MultipleRecords" "PostingType" "PreAccountingId" "Contract" "Company" "VoucherDate" "ValidationDate" "PostingTypeDist" "Allowed" "AllowedAccountNo" "AllowedCodenoB" "AllowedCodenoC" "AllowedCodenoD" "AllowedCodenoE" "AllowedCodenoF" "AllowedCodenoG" "AllowedCodenoH" "AllowedCodenoI" "AllowedCodenoJ" "LabelAccountNo" "LabelCodenoB" "LabelCodenoC" "LabelCodenoD" "LabelCodenoE" "LabelCodenoF" "LabelCodenoG" "LabelCodenoH" "LabelCodenoI" "LabelCodenoJ" "AllowedDist" "AllowedAccountNoDist" "AllowedCodenoBDist" "AllowedCodenoCDist" "AllowedCodenoDDist" "AllowedCodenoEDist" "AllowedCodenoFDist" "AllowedCodenoGDist" "AllowedCodenoHDist" "AllowedCodenoIDist" "AllowedCodenoJDist" "SameContract" "SameAccountNo" "SameCodeB" "SameCodeC" "SameCodeD" "SameCodeE" "SameCodeF" "SameCodeG" "SameCodeH" "SameCodeI" "SameCodeJ" "SameActivitySeq" "TotalAmountDist" "Selection" "PrePostingSource"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type PreAccountingDistribution

PreAccountingId
required
number
AccountNo	
string <= 10 characters
CodenoB	
string <= 10 characters
CodenoC	
string <= 10 characters
CodenoD	
string <= 10 characters
CodenoE	
string <= 10 characters
CodenoF	
string <= 10 characters
CodenoG	
string <= 10 characters
CodenoH	
string <= 10 characters
CodenoI	
string <= 10 characters
CodenoJ	
string <= 10 characters
ActivitySeq	
number
ParentPreAccountingId	
number
Percentage
required
number
Amount	
number
CompanyRef	
string <= 4000 characters
Company	
string <= 4000 characters
Contract	
string <= 4000 characters
PrePostingSource	
string <= 4000 characters
VoucherDate	
string <date>
TotalAmount	
number
LineAmount	
number
ValidationType	
string <= 4000 characters
Responses
201 response body for entity type PreAccountingDistribution
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingDistributionArray

Request samples
Payload
Content type
application/json

Copy
{
"PreAccountingId": 1,
"AccountNo": "It is a Text",
"CodenoB": "It is a Text",
"CodenoC": "It is a Text",
"CodenoD": "It is a Text",
"CodenoE": "It is a Text",
"CodenoF": "It is a Text",
"CodenoG": "It is a Text",
"CodenoH": "It is a Text",
"CodenoI": "It is a Text",
"CodenoJ": "It is a Text",
"ActivitySeq": 1,
"ParentPreAccountingId": 1,
"Percentage": 1,
"Amount": 1,
"CompanyRef": "It is a Text",
"Company": "It is a Text",
"Contract": "It is a Text",
"PrePostingSource": "It is a Text",
"VoucherDate": "2019-10-10",
"TotalAmount": 1,
"LineAmount": 1,
"ValidationType": "It is a Text"
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
"PreAccountingId": 1,
"AccountNo": "It is a Text",
"CodenoB": "It is a Text",
"CodenoC": "It is a Text",
"CodenoD": "It is a Text",
"CodenoE": "It is a Text",
"CodenoF": "It is a Text",
"CodenoG": "It is a Text",
"CodenoH": "It is a Text",
"CodenoI": "It is a Text",
"CodenoJ": "It is a Text",
"ActivitySeq": 1,
"ParentPreAccountingId": 1,
"AmountDistribution": 1,
"Percentage": 1,
"Amount": 1,
"CompanyRef": "It is a Text",
"Company": "It is a Text",
"Contract": "It is a Text",
"PrePostingSource": "It is a Text",
"VoucherDate": "2019-10-10",
"TotalAmount": 1,
"LineAmount": 1,
"ValidationType": "It is a Text"
}
Get entity from PreAccountingDistributionArray by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingDistributionArray_ParentPreAccountingId
required
number
Example: 1
key: ParentPreAccountingId

PreAccountingDistributionArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "ProjectConnected" "MultipleRecords" "PostingType" "PreAccountingId" "Contract" "Company" "VoucherDate" "ValidationDate" "PostingTypeDist" "Allowed" "AllowedAccountNo" "AllowedCodenoB" "AllowedCodenoC" "AllowedCodenoD" "AllowedCodenoE" "AllowedCodenoF" "AllowedCodenoG" "AllowedCodenoH" "AllowedCodenoI" "AllowedCodenoJ" "LabelAccountNo" "LabelCodenoB" "LabelCodenoC" "LabelCodenoD" "LabelCodenoE" "LabelCodenoF" "LabelCodenoG" "LabelCodenoH" "LabelCodenoI" "LabelCodenoJ" "AllowedDist" "AllowedAccountNoDist" "AllowedCodenoBDist" "AllowedCodenoCDist" "AllowedCodenoDDist" "AllowedCodenoEDist" "AllowedCodenoFDist" "AllowedCodenoGDist" "AllowedCodenoHDist" "AllowedCodenoIDist" "AllowedCodenoJDist" "SameContract" "SameAccountNo" "SameCodeB" "SameCodeC" "SameCodeD" "SameCodeE" "SameCodeF" "SameCodeG" "SameCodeH" "SameCodeI" "SameCodeJ" "SameActivitySeq" "TotalAmountDist" "Selection" "PrePostingSource"
Specify properties to return, see OData Select

Responses
200 response body for entity type PreAccountingDistribution
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingDistributionArray(ParentPreAccountingId={PreAccountingDistributionArray_ParentPreAccountingId},PreAccountingId={PreAccountingDistributionArray_PreAccountingId})

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
"PreAccountingId": 1,
"AccountNo": "It is a Text",
"CodenoB": "It is a Text",
"CodenoC": "It is a Text",
"CodenoD": "It is a Text",
"CodenoE": "It is a Text",
"CodenoF": "It is a Text",
"CodenoG": "It is a Text",
"CodenoH": "It is a Text",
"CodenoI": "It is a Text",
"CodenoJ": "It is a Text",
"ActivitySeq": 1,
"ParentPreAccountingId": 1,
"AmountDistribution": 1,
"Percentage": 1,
"Amount": 1,
"CompanyRef": "It is a Text",
"Company": "It is a Text",
"Contract": "It is a Text",
"PrePostingSource": "It is a Text",
"VoucherDate": "2019-10-10",
"TotalAmount": 1,
"LineAmount": 1,
"ValidationType": "It is a Text"
}
Delete entity from PreAccountingDistributionArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingDistributionArray_ParentPreAccountingId
required
number
Example: 1
key: ParentPreAccountingId

PreAccountingDistributionArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

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
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingDistributionArray(ParentPreAccountingId={PreAccountingDistributionArray_ParentPreAccountingId},PreAccountingId={PreAccountingDistributionArray_PreAccountingId})

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
Update entity in PreAccountingDistributionArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingDistributionArray_ParentPreAccountingId
required
number
Example: 1
key: ParentPreAccountingId

PreAccountingDistributionArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "ProjectConnected" "MultipleRecords" "PostingType" "PreAccountingId" "Contract" "Company" "VoucherDate" "ValidationDate" "PostingTypeDist" "Allowed" "AllowedAccountNo" "AllowedCodenoB" "AllowedCodenoC" "AllowedCodenoD" "AllowedCodenoE" "AllowedCodenoF" "AllowedCodenoG" "AllowedCodenoH" "AllowedCodenoI" "AllowedCodenoJ" "LabelAccountNo" "LabelCodenoB" "LabelCodenoC" "LabelCodenoD" "LabelCodenoE" "LabelCodenoF" "LabelCodenoG" "LabelCodenoH" "LabelCodenoI" "LabelCodenoJ" "AllowedDist" "AllowedAccountNoDist" "AllowedCodenoBDist" "AllowedCodenoCDist" "AllowedCodenoDDist" "AllowedCodenoEDist" "AllowedCodenoFDist" "AllowedCodenoGDist" "AllowedCodenoHDist" "AllowedCodenoIDist" "AllowedCodenoJDist" "SameContract" "SameAccountNo" "SameCodeB" "SameCodeC" "SameCodeD" "SameCodeE" "SameCodeF" "SameCodeG" "SameCodeH" "SameCodeI" "SameCodeJ" "SameActivitySeq" "TotalAmountDist" "Selection" "PrePostingSource"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type PreAccountingDistribution

AccountNo	
string <= 10 characters
CodenoB	
string <= 10 characters
CodenoC	
string <= 10 characters
CodenoD	
string <= 10 characters
CodenoE	
string <= 10 characters
CodenoF	
string <= 10 characters
CodenoG	
string <= 10 characters
CodenoH	
string <= 10 characters
CodenoI	
string <= 10 characters
CodenoJ	
string <= 10 characters
ActivitySeq	
number
Percentage
required
number
Amount	
number
CompanyRef	
string <= 4000 characters
Company	
string <= 4000 characters
Contract	
string <= 4000 characters
PrePostingSource	
string <= 4000 characters
VoucherDate	
string <date>
TotalAmount	
number
LineAmount	
number
ValidationType	
string <= 4000 characters
Responses
200 response body for entity type PreAccountingDistribution
201 response body for entity type PreAccountingDistribution
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
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingDistributionArray(ParentPreAccountingId={PreAccountingDistributionArray_ParentPreAccountingId},PreAccountingId={PreAccountingDistributionArray_PreAccountingId})

Request samples
Payload
Content type
application/json

Copy
{
"AccountNo": "It is a Text",
"CodenoB": "It is a Text",
"CodenoC": "It is a Text",
"CodenoD": "It is a Text",
"CodenoE": "It is a Text",
"CodenoF": "It is a Text",
"CodenoG": "It is a Text",
"CodenoH": "It is a Text",
"CodenoI": "It is a Text",
"CodenoJ": "It is a Text",
"ActivitySeq": 1,
"Percentage": 1,
"Amount": 1,
"CompanyRef": "It is a Text",
"Company": "It is a Text",
"Contract": "It is a Text",
"PrePostingSource": "It is a Text",
"VoucherDate": "2019-10-10",
"TotalAmount": 1,
"LineAmount": 1,
"ValidationType": "It is a Text"
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
"PreAccountingId": 1,
"AccountNo": "It is a Text",
"CodenoB": "It is a Text",
"CodenoC": "It is a Text",
"CodenoD": "It is a Text",
"CodenoE": "It is a Text",
"CodenoF": "It is a Text",
"CodenoG": "It is a Text",
"CodenoH": "It is a Text",
"CodenoI": "It is a Text",
"CodenoJ": "It is a Text",
"ActivitySeq": 1,
"ParentPreAccountingId": 1,
"AmountDistribution": 1,
"Percentage": 1,
"Amount": 1,
"CompanyRef": "It is a Text",
"Company": "It is a Text",
"Contract": "It is a Text",
"PrePostingSource": "It is a Text",
"VoucherDate": "2019-10-10",
"TotalAmount": 1,
"LineAmount": 1,
"ValidationType": "It is a Text"
}
Get entities from AccountNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingDistributionArray_ParentPreAccountingId
required
number
Example: 1
key: ParentPreAccountingId

PreAccountingDistributionArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Company" "Company desc" "Account" "Account desc" "Description" "Description desc" "Ledaccnt" "Ledaccnt desc" "SortValue" "SortValue desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "Account" "Description" "Ledaccnt" "SortValue" "ValidFrom" "ValidUntil"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountCodepartAMpccom
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingDistributionArray(ParentPreAccountingId={PreAccountingDistributionArray_ParentPreAccountingId},PreAccountingId={PreAccountingDistributionArray_PreAccountingId})/AccountNoRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CodenoBRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingDistributionArray_ParentPreAccountingId
required
number
Example: 1
key: ParentPreAccountingId

PreAccountingDistributionArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Company" "Company desc" "CodeB" "CodeB desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoB" "LabelCodenoB desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeB" "Description" "ValidFrom" "ValidUntil" "LabelCodenoB"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartB
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingDistributionArray(ParentPreAccountingId={PreAccountingDistributionArray_ParentPreAccountingId},PreAccountingId={PreAccountingDistributionArray_PreAccountingId})/CodenoBRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CodenoCRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingDistributionArray_ParentPreAccountingId
required
number
Example: 1
key: ParentPreAccountingId

PreAccountingDistributionArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Company" "Company desc" "CodeC" "CodeC desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoC" "LabelCodenoC desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeC" "Description" "ValidFrom" "ValidUntil" "LabelCodenoC"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartC
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingDistributionArray(ParentPreAccountingId={PreAccountingDistributionArray_ParentPreAccountingId},PreAccountingId={PreAccountingDistributionArray_PreAccountingId})/CodenoCRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CodenoDRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingDistributionArray_ParentPreAccountingId
required
number
Example: 1
key: ParentPreAccountingId

PreAccountingDistributionArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Company" "Company desc" "CodeD" "CodeD desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoD" "LabelCodenoD desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeD" "Description" "ValidFrom" "ValidUntil" "LabelCodenoD"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartD
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingDistributionArray(ParentPreAccountingId={PreAccountingDistributionArray_ParentPreAccountingId},PreAccountingId={PreAccountingDistributionArray_PreAccountingId})/CodenoDRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CodenoERef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingDistributionArray_ParentPreAccountingId
required
number
Example: 1
key: ParentPreAccountingId

PreAccountingDistributionArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Company" "Company desc" "CodeE" "CodeE desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoE" "LabelCodenoE desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeE" "Description" "ValidFrom" "ValidUntil" "LabelCodenoE"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartE
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingDistributionArray(ParentPreAccountingId={PreAccountingDistributionArray_ParentPreAccountingId},PreAccountingId={PreAccountingDistributionArray_PreAccountingId})/CodenoERef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CodenoFRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingDistributionArray_ParentPreAccountingId
required
number
Example: 1
key: ParentPreAccountingId

PreAccountingDistributionArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Company" "Company desc" "CodeF" "CodeF desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoF" "LabelCodenoF desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeF" "Description" "ValidFrom" "ValidUntil" "LabelCodenoF"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartF
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingDistributionArray(ParentPreAccountingId={PreAccountingDistributionArray_ParentPreAccountingId},PreAccountingId={PreAccountingDistributionArray_PreAccountingId})/CodenoFRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CodenoGRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingDistributionArray_ParentPreAccountingId
required
number
Example: 1
key: ParentPreAccountingId

PreAccountingDistributionArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Company" "Company desc" "CodeG" "CodeG desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoG" "LabelCodenoG desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeG" "Description" "ValidFrom" "ValidUntil" "LabelCodenoG"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartG
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingDistributionArray(ParentPreAccountingId={PreAccountingDistributionArray_ParentPreAccountingId},PreAccountingId={PreAccountingDistributionArray_PreAccountingId})/CodenoGRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CodenoHRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingDistributionArray_ParentPreAccountingId
required
number
Example: 1
key: ParentPreAccountingId

PreAccountingDistributionArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Company" "Company desc" "CodeH" "CodeH desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoH" "LabelCodenoH desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeH" "Description" "ValidFrom" "ValidUntil" "LabelCodenoH"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartH
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingDistributionArray(ParentPreAccountingId={PreAccountingDistributionArray_ParentPreAccountingId},PreAccountingId={PreAccountingDistributionArray_PreAccountingId})/CodenoHRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CodenoIRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingDistributionArray_ParentPreAccountingId
required
number
Example: 1
key: ParentPreAccountingId

PreAccountingDistributionArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Company" "Company desc" "CodeI" "CodeI desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoI" "LabelCodenoI desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeI" "Description" "ValidFrom" "ValidUntil" "LabelCodenoI"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartI
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingDistributionArray(ParentPreAccountingId={PreAccountingDistributionArray_ParentPreAccountingId},PreAccountingId={PreAccountingDistributionArray_PreAccountingId})/CodenoIRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CodenoJRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingDistributionArray_ParentPreAccountingId
required
number
Example: 1
key: ParentPreAccountingId

PreAccountingDistributionArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Company" "Company desc" "CodeJ" "CodeJ desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoJ" "LabelCodenoJ desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeJ" "Description" "ValidFrom" "ValidUntil" "LabelCodenoJ"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartJ
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingDistributionArray(ParentPreAccountingId={PreAccountingDistributionArray_ParentPreAccountingId},PreAccountingId={PreAccountingDistributionArray_PreAccountingId})/CodenoJRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from PreAccountingArray
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
Items Enum: "PreAccountingId" "PreAccountingId desc" "AccountNo" "AccountNo desc" "CodenoB" "CodenoB desc" "CodenoC" "CodenoC desc" "CodenoD" "CodenoD desc" "CodenoE" "CodenoE desc" "CodenoF" "CodenoF desc" "CodenoG" "CodenoG desc" "CodenoH" "CodenoH desc" "CodenoI" "CodenoI desc" "CodenoJ" "CodenoJ desc" "Company" "Company desc" "Contract" "Contract desc" "ActivitySeq" "ActivitySeq desc" "PrePostingSource" "PrePostingSource desc" "CompanyRef" "CompanyRef desc" "VoucherDate" "VoucherDate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PreAccountingId" "AccountNo" "CodenoB" "CodenoC" "CodenoD" "CodenoE" "CodenoF" "CodenoG" "CodenoH" "CodenoI" "CodenoJ" "Company" "Contract" "ActivitySeq" "PrePostingSource" "CompanyRef" "VoucherDate"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "AccountNoRef" "CodenoBRef" "CodenoCRef" "CodenoDRef" "CodenoERef" "CodenoFRef" "CodenoGRef" "CodenoHRef" "CodenoIRef" "CodenoJRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array PreAccounting
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingArray

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Add new entity to PreAccountingArray
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "ProjectConnected" "MultipleRecords" "PostingType" "PreAccountingId" "Contract" "Company" "VoucherDate" "ValidationDate" "PostingTypeDist" "Allowed" "AllowedAccountNo" "AllowedCodenoB" "AllowedCodenoC" "AllowedCodenoD" "AllowedCodenoE" "AllowedCodenoF" "AllowedCodenoG" "AllowedCodenoH" "AllowedCodenoI" "AllowedCodenoJ" "LabelAccountNo" "LabelCodenoB" "LabelCodenoC" "LabelCodenoD" "LabelCodenoE" "LabelCodenoF" "LabelCodenoG" "LabelCodenoH" "LabelCodenoI" "LabelCodenoJ" "AllowedDist" "AllowedAccountNoDist" "AllowedCodenoBDist" "AllowedCodenoCDist" "AllowedCodenoDDist" "AllowedCodenoEDist" "AllowedCodenoFDist" "AllowedCodenoGDist" "AllowedCodenoHDist" "AllowedCodenoIDist" "AllowedCodenoJDist" "SameContract" "SameAccountNo" "SameCodeB" "SameCodeC" "SameCodeD" "SameCodeE" "SameCodeF" "SameCodeG" "SameCodeH" "SameCodeI" "SameCodeJ" "SameActivitySeq" "TotalAmountDist" "Selection" "PrePostingSource"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type PreAccounting

PreAccountingId
required
number
AccountNo	
string <= 10 characters
CodenoB	
string <= 10 characters
CodenoC	
string <= 10 characters
CodenoD	
string <= 10 characters
CodenoE	
string <= 10 characters
CodenoF	
string <= 10 characters
CodenoG	
string <= 10 characters
CodenoH	
string <= 10 characters
CodenoI	
string <= 10 characters
CodenoJ	
string <= 10 characters
Company	
string <= 20 characters
Contract	
string <= 5 characters
ActivitySeq	
string <= 4000 characters
PrePostingSource	
string <= 50 characters
CompanyRef	
string <= 4000 characters
VoucherDate	
string <date>
Responses
201 response body for entity type PreAccounting
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingArray

Request samples
Payload
Content type
application/json

Copy
{
"PreAccountingId": 1,
"AccountNo": "It is a Text",
"CodenoB": "It is a Text",
"CodenoC": "It is a Text",
"CodenoD": "It is a Text",
"CodenoE": "It is a Text",
"CodenoF": "It is a Text",
"CodenoG": "It is a Text",
"CodenoH": "It is a Text",
"CodenoI": "It is a Text",
"CodenoJ": "It is a Text",
"Company": "It is a Text",
"Contract": "It is a Text",
"ActivitySeq": "It is a Text",
"PrePostingSource": "It is a Text",
"CompanyRef": "It is a Text",
"VoucherDate": "2019-10-10"
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
"PreAccountingId": 1,
"AccountNo": "It is a Text",
"CodenoB": "It is a Text",
"CodenoC": "It is a Text",
"CodenoD": "It is a Text",
"CodenoE": "It is a Text",
"CodenoF": "It is a Text",
"CodenoG": "It is a Text",
"CodenoH": "It is a Text",
"CodenoI": "It is a Text",
"CodenoJ": "It is a Text",
"Company": "It is a Text",
"Contract": "It is a Text",
"ActivitySeq": "It is a Text",
"PrePostingSource": "It is a Text",
"CompanyRef": "It is a Text",
"VoucherDate": "2019-10-10"
}
Get entity from PreAccountingArray by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "ProjectConnected" "MultipleRecords" "PostingType" "PreAccountingId" "Contract" "Company" "VoucherDate" "ValidationDate" "PostingTypeDist" "Allowed" "AllowedAccountNo" "AllowedCodenoB" "AllowedCodenoC" "AllowedCodenoD" "AllowedCodenoE" "AllowedCodenoF" "AllowedCodenoG" "AllowedCodenoH" "AllowedCodenoI" "AllowedCodenoJ" "LabelAccountNo" "LabelCodenoB" "LabelCodenoC" "LabelCodenoD" "LabelCodenoE" "LabelCodenoF" "LabelCodenoG" "LabelCodenoH" "LabelCodenoI" "LabelCodenoJ" "AllowedDist" "AllowedAccountNoDist" "AllowedCodenoBDist" "AllowedCodenoCDist" "AllowedCodenoDDist" "AllowedCodenoEDist" "AllowedCodenoFDist" "AllowedCodenoGDist" "AllowedCodenoHDist" "AllowedCodenoIDist" "AllowedCodenoJDist" "SameContract" "SameAccountNo" "SameCodeB" "SameCodeC" "SameCodeD" "SameCodeE" "SameCodeF" "SameCodeG" "SameCodeH" "SameCodeI" "SameCodeJ" "SameActivitySeq" "TotalAmountDist" "Selection" "PrePostingSource"
Specify properties to return, see OData Select

Responses
200 response body for entity type PreAccounting
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingArray(PreAccountingId={PreAccountingArray_PreAccountingId})

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
"PreAccountingId": 1,
"AccountNo": "It is a Text",
"CodenoB": "It is a Text",
"CodenoC": "It is a Text",
"CodenoD": "It is a Text",
"CodenoE": "It is a Text",
"CodenoF": "It is a Text",
"CodenoG": "It is a Text",
"CodenoH": "It is a Text",
"CodenoI": "It is a Text",
"CodenoJ": "It is a Text",
"Company": "It is a Text",
"Contract": "It is a Text",
"ActivitySeq": "It is a Text",
"PrePostingSource": "It is a Text",
"CompanyRef": "It is a Text",
"VoucherDate": "2019-10-10"
}
Delete entity from PreAccountingArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

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
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingArray(PreAccountingId={PreAccountingArray_PreAccountingId})

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
Update entity in PreAccountingArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "ProjectConnected" "MultipleRecords" "PostingType" "PreAccountingId" "Contract" "Company" "VoucherDate" "ValidationDate" "PostingTypeDist" "Allowed" "AllowedAccountNo" "AllowedCodenoB" "AllowedCodenoC" "AllowedCodenoD" "AllowedCodenoE" "AllowedCodenoF" "AllowedCodenoG" "AllowedCodenoH" "AllowedCodenoI" "AllowedCodenoJ" "LabelAccountNo" "LabelCodenoB" "LabelCodenoC" "LabelCodenoD" "LabelCodenoE" "LabelCodenoF" "LabelCodenoG" "LabelCodenoH" "LabelCodenoI" "LabelCodenoJ" "AllowedDist" "AllowedAccountNoDist" "AllowedCodenoBDist" "AllowedCodenoCDist" "AllowedCodenoDDist" "AllowedCodenoEDist" "AllowedCodenoFDist" "AllowedCodenoGDist" "AllowedCodenoHDist" "AllowedCodenoIDist" "AllowedCodenoJDist" "SameContract" "SameAccountNo" "SameCodeB" "SameCodeC" "SameCodeD" "SameCodeE" "SameCodeF" "SameCodeG" "SameCodeH" "SameCodeI" "SameCodeJ" "SameActivitySeq" "TotalAmountDist" "Selection" "PrePostingSource"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type PreAccounting

AccountNo	
string <= 10 characters
CodenoB	
string <= 10 characters
CodenoC	
string <= 10 characters
CodenoD	
string <= 10 characters
CodenoE	
string <= 10 characters
CodenoF	
string <= 10 characters
CodenoG	
string <= 10 characters
CodenoH	
string <= 10 characters
CodenoI	
string <= 10 characters
CodenoJ	
string <= 10 characters
Company	
string <= 20 characters
Contract	
string <= 5 characters
ActivitySeq	
string <= 4000 characters
PrePostingSource	
string <= 50 characters
CompanyRef	
string <= 4000 characters
VoucherDate	
string <date>
Responses
200 response body for entity type PreAccounting
201 response body for entity type PreAccounting
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
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingArray(PreAccountingId={PreAccountingArray_PreAccountingId})

Request samples
Payload
Content type
application/json

Copy
{
"AccountNo": "It is a Text",
"CodenoB": "It is a Text",
"CodenoC": "It is a Text",
"CodenoD": "It is a Text",
"CodenoE": "It is a Text",
"CodenoF": "It is a Text",
"CodenoG": "It is a Text",
"CodenoH": "It is a Text",
"CodenoI": "It is a Text",
"CodenoJ": "It is a Text",
"Company": "It is a Text",
"Contract": "It is a Text",
"ActivitySeq": "It is a Text",
"PrePostingSource": "It is a Text",
"CompanyRef": "It is a Text",
"VoucherDate": "2019-10-10"
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
"PreAccountingId": 1,
"AccountNo": "It is a Text",
"CodenoB": "It is a Text",
"CodenoC": "It is a Text",
"CodenoD": "It is a Text",
"CodenoE": "It is a Text",
"CodenoF": "It is a Text",
"CodenoG": "It is a Text",
"CodenoH": "It is a Text",
"CodenoI": "It is a Text",
"CodenoJ": "It is a Text",
"Company": "It is a Text",
"Contract": "It is a Text",
"ActivitySeq": "It is a Text",
"PrePostingSource": "It is a Text",
"CompanyRef": "It is a Text",
"VoucherDate": "2019-10-10"
}
Get entities from AccountNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Company" "Company desc" "Account" "Account desc" "Description" "Description desc" "Ledaccnt" "Ledaccnt desc" "SortValue" "SortValue desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "Account" "Description" "Ledaccnt" "SortValue" "ValidFrom" "ValidUntil"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountCodepartAMpccom
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingArray(PreAccountingId={PreAccountingArray_PreAccountingId})/AccountNoRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CodenoBRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Company" "Company desc" "CodeB" "CodeB desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoB" "LabelCodenoB desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeB" "Description" "ValidFrom" "ValidUntil" "LabelCodenoB"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartB
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingArray(PreAccountingId={PreAccountingArray_PreAccountingId})/CodenoBRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CodenoCRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Company" "Company desc" "CodeC" "CodeC desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoC" "LabelCodenoC desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeC" "Description" "ValidFrom" "ValidUntil" "LabelCodenoC"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartC
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingArray(PreAccountingId={PreAccountingArray_PreAccountingId})/CodenoCRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CodenoDRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Company" "Company desc" "CodeD" "CodeD desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoD" "LabelCodenoD desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeD" "Description" "ValidFrom" "ValidUntil" "LabelCodenoD"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartD
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingArray(PreAccountingId={PreAccountingArray_PreAccountingId})/CodenoDRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CodenoERef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Company" "Company desc" "CodeE" "CodeE desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoE" "LabelCodenoE desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeE" "Description" "ValidFrom" "ValidUntil" "LabelCodenoE"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartE
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingArray(PreAccountingId={PreAccountingArray_PreAccountingId})/CodenoERef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CodenoFRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Company" "Company desc" "CodeF" "CodeF desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoF" "LabelCodenoF desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeF" "Description" "ValidFrom" "ValidUntil" "LabelCodenoF"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartF
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingArray(PreAccountingId={PreAccountingArray_PreAccountingId})/CodenoFRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CodenoGRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Company" "Company desc" "CodeG" "CodeG desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoG" "LabelCodenoG desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeG" "Description" "ValidFrom" "ValidUntil" "LabelCodenoG"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartG
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingArray(PreAccountingId={PreAccountingArray_PreAccountingId})/CodenoGRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CodenoHRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Company" "Company desc" "CodeH" "CodeH desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoH" "LabelCodenoH desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeH" "Description" "ValidFrom" "ValidUntil" "LabelCodenoH"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartH
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingArray(PreAccountingId={PreAccountingArray_PreAccountingId})/CodenoHRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CodenoIRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Company" "Company desc" "CodeI" "CodeI desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoI" "LabelCodenoI desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeI" "Description" "ValidFrom" "ValidUntil" "LabelCodenoI"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartI
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingArray(PreAccountingId={PreAccountingArray_PreAccountingId})/CodenoIRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CodenoJRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PreAccountingArray_PreAccountingId
required
number
Example: 1
key: PreAccountingId

query Parameters
$top	
integer >= 0
Example: $top=50
Show only the first n items, see OData Paging - Top

$skip	
integer >= 0
Skip the first n items, see OData Paging - Skip

$count	
boolean
Include count of items, see OData Count

$filter	
string
Filter items by property values, see OData Filtering

$orderby	
Array of strings unique
Items Enum: "Company" "Company desc" "CodeJ" "CodeJ desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoJ" "LabelCodenoJ desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeJ" "Description" "ValidFrom" "ValidUntil" "LabelCodenoJ"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartJ
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/PreAccountingVirtualSet(Objkey='{Objkey}')/PreAccountingArray(PreAccountingId={PreAccountingArray_PreAccountingId})/CodenoJRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
ManualReservationSet
Get entities from ManualReservationSet
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "OrderNo" "OrderNo desc" "OrderClass" "OrderClass desc" "LineNo" "LineNo desc" "ReleaseNo" "ReleaseNo desc" "LineItemNo" "LineItemNo desc" "PartNo" "PartNo desc" "ConditionCode" "ConditionCode desc" "UnitMeas" "UnitMeas desc" "Contract" "Contract desc" "QtyLeft" "QtyLeft desc" "ActivitySeq" "ActivitySeq desc" "ProjectId" "ProjectId desc" "LinesReadyToReserve" "LinesReadyToReserve desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "OrderNo" "OrderClass" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "ConditionCode" "UnitMeas" "Contract" "QtyLeft" "ActivitySeq" "ProjectId" "LinesReadyToReserve"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "PartNoRef" "ConditionCodeRef" "ActivitySeqRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ManualReservationVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualReservationSet

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Add new entity to ManualReservationSet
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "OrderNo" "OrderClass" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "ConditionCode" "UnitMeas" "Contract" "QtyLeft" "ActivitySeq" "ProjectId" "LinesReadyToReserve"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type ManualReservationVirtual

ParentObjkey	
string <= 50 characters
ObjCreatedBy	
string <= 50 characters
OrderNo	
string <= 4000 characters
OrderClass	
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
LineNo	
string <= 4000 characters
ReleaseNo	
string <= 4000 characters
LineItemNo	
number
PartNo	
string <= 4000 characters
ConditionCode	
string <= 4000 characters
UnitMeas	
string <= 4000 characters
Contract	
string <= 4000 characters
QtyLeft	
number
ActivitySeq	
number
ProjectId	
string <= 4000 characters
LinesReadyToReserve	
string <= 4000 characters
Responses
201 response body for entity type ManualReservationVirtual
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/ManualReservationSet

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"ObjCreatedBy": "It is a Text",
"OrderNo": "It is a Text",
"OrderClass": "INT",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"ConditionCode": "It is a Text",
"UnitMeas": "It is a Text",
"Contract": "It is a Text",
"QtyLeft": 1,
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"LinesReadyToReserve": "It is a Text"
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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"ConditionCode": "It is a Text",
"UnitMeas": "It is a Text",
"Contract": "It is a Text",
"QtyLeft": 1,
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"LinesReadyToReserve": "It is a Text",
"OrderClass": "INT"
}
Get entity from ManualReservationSet by key
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "OrderNo" "OrderClass" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "ConditionCode" "UnitMeas" "Contract" "QtyLeft" "ActivitySeq" "ProjectId" "LinesReadyToReserve"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "PartNoRef" "ConditionCodeRef" "ActivitySeqRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type ManualReservationVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualReservationSet(Objkey='{Objkey}')

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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"ConditionCode": "It is a Text",
"UnitMeas": "It is a Text",
"Contract": "It is a Text",
"QtyLeft": 1,
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"LinesReadyToReserve": "It is a Text",
"OrderClass": "INT"
}
Delete entity from ManualReservationSet
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
/ManualReservationSet(Objkey='{Objkey}')

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
Update entity in ManualReservationSet
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "OrderNo" "OrderClass" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "ConditionCode" "UnitMeas" "Contract" "QtyLeft" "ActivitySeq" "ProjectId" "LinesReadyToReserve"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type ManualReservationVirtual

OrderNo	
string <= 4000 characters
OrderClass	
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
LineNo	
string <= 4000 characters
ReleaseNo	
string <= 4000 characters
LineItemNo	
number
PartNo	
string <= 4000 characters
ConditionCode	
string <= 4000 characters
UnitMeas	
string <= 4000 characters
Contract	
string <= 4000 characters
QtyLeft	
number
ActivitySeq	
number
ProjectId	
string <= 4000 characters
LinesReadyToReserve	
string <= 4000 characters
Responses
200 response body for entity type ManualReservationVirtual
201 response body for entity type ManualReservationVirtual
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
/ManualReservationSet(Objkey='{Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"OrderNo": "It is a Text",
"OrderClass": "INT",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"ConditionCode": "It is a Text",
"UnitMeas": "It is a Text",
"Contract": "It is a Text",
"QtyLeft": 1,
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"LinesReadyToReserve": "It is a Text"
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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"ConditionCode": "It is a Text",
"UnitMeas": "It is a Text",
"Contract": "It is a Text",
"QtyLeft": 1,
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"LinesReadyToReserve": "It is a Text",
"OrderClass": "INT"
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
/ManualReservationSet(Objkey='{Objkey}')/IfsApp.MaterialRequisitionLinesHandling.ManualReservationVirtual_CleanupVirtualEntity

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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "OrderNo" "OrderClass" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "ConditionCode" "UnitMeas" "Contract" "QtyLeft" "ActivitySeq" "ProjectId" "LinesReadyToReserve"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type ManualReservationVirtual
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualReservationSet/IfsApp.MaterialRequisitionLinesHandling.ManualReservationVirtual_Default()

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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"ConditionCode": "It is a Text",
"UnitMeas": "It is a Text",
"Contract": "It is a Text",
"QtyLeft": 1,
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"LinesReadyToReserve": "It is a Text",
"OrderClass": "INT"
}
Get entities from PartInStockToReserveArray
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "QtyToReserve" "QtyToReserve desc" "AvailableQty" "AvailableQty desc" "QtyReserved" "QtyReserved desc" "LocationNo" "LocationNo desc" "HandlingUnitId" "HandlingUnitId desc" "Warehouse" "Warehouse desc" "BayNo" "BayNo desc" "RowNo" "RowNo desc" "TierNo" "TierNo desc" "BinNo" "BinNo desc" "PartNo" "PartNo desc" "Contract" "Contract desc" "LotBatchNo" "LotBatchNo desc" "SerialNo" "SerialNo desc" "EngChgLevel" "EngChgLevel desc" "WaivDevRejNo" "WaivDevRejNo desc" "ProjectId" "ProjectId desc" "ActivitySeq" "ActivitySeq desc" "TopParentHandlingUnitId" "TopParentHandlingUnitId desc" "TopParentHuTypeId" "TopParentHuTypeId desc" "TopParentHuTypeDesc" "TopParentHuTypeDesc desc" "TopParentSSCC" "TopParentSSCC desc" "TopParentAltHuLabelId" "TopParentAltHuLabelId desc" "AvailabilityControlId" "AvailabilityControlId desc" "ExpirationDate" "ExpirationDate desc" "ProgramId" "ProgramId desc" "ProgramDescription" "ProgramDescription desc" "ProjectName" "ProjectName desc" "SubProjectId" "SubProjectId desc" "SubProjectDescription" "SubProjectDescription desc" "ActivityNo" "ActivityNo desc" "ActivityDescription" "ActivityDescription desc" "HandlingUnitTypeId" "HandlingUnitTypeId desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "QtyToReserve" "AvailableQty" "QtyReserved" "LocationNo" "HandlingUnitId" "Warehouse" "BayNo" "RowNo" "TierNo" "BinNo" "PartNo" "Contract" "LotBatchNo" "SerialNo" "EngChgLevel" "WaivDevRejNo" "ProjectId" "ActivitySeq" "TopParentHandlingUnitId" "TopParentHuTypeId" "TopParentHuTypeDesc" "TopParentSSCC" "TopParentAltHuLabelId" "AvailabilityControlId" "ExpirationDate" "ProgramId" "ProgramDescription" "ProjectName" "SubProjectId" "SubProjectDescription" "ActivityNo" "ActivityDescription" "HandlingUnitTypeId"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "HandlingUnitIdRef" "HandlingUnitTypeIdRef" "ActivitySeqRef" "ActivityNoRef" "ProgramIdRef" "SubProjectIdRef" "AvailabilityControlIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array InvPartInStockToReserveVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualReservationSet(Objkey='{Objkey}')/PartInStockToReserveArray

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from PartInStockToReserveArray by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInStockToReserveArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "OrderNo" "OrderClass" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "ConditionCode" "UnitMeas" "Contract" "QtyLeft" "ActivitySeq" "ProjectId" "LinesReadyToReserve"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "PartNoRef" "ConditionCodeRef" "ActivitySeqRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type InvPartInStockToReserveVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualReservationSet(Objkey='{Objkey}')/PartInStockToReserveArray(Objkey='{PartInStockToReserveArray_Objkey}')

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
"QtyToReserve": 1,
"AvailableQty": 1,
"QtyReserved": 1,
"LocationNo": "It is a Text",
"HandlingUnitId": 1,
"Warehouse": "It is a Text",
"BayNo": "It is a Text",
"RowNo": "It is a Text",
"TierNo": "It is a Text",
"BinNo": "It is a Text",
"PartNo": "It is a Text",
"Contract": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ProjectId": "It is a Text",
"ActivitySeq": 1,
"TopParentHandlingUnitId": 1,
"TopParentHuTypeId": "It is a Text",
"TopParentHuTypeDesc": "It is a Text",
"TopParentSSCC": "It is a Text",
"TopParentAltHuLabelId": "It is a Text",
"AvailabilityControlId": "It is a Text",
"ExpirationDate": "2019-10-10",
"ProgramId": "It is a Text",
"ProgramDescription": "It is a Text",
"ProjectName": "It is a Text",
"SubProjectId": "It is a Text",
"SubProjectDescription": "It is a Text",
"ActivityNo": "It is a Text",
"ActivityDescription": "It is a Text",
"HandlingUnitTypeId": "It is a Text"
}
Update entity in PartInStockToReserveArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInStockToReserveArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "OrderNo" "OrderClass" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "ConditionCode" "UnitMeas" "Contract" "QtyLeft" "ActivitySeq" "ProjectId" "LinesReadyToReserve"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type InvPartInStockToReserveVirtual

QtyToReserve	
number
AvailableQty	
number
QtyReserved	
number
LocationNo	
string <= 35 characters
HandlingUnitId
required
number
Warehouse	
string <= 15 characters
BayNo	
string <= 5 characters
RowNo	
string <= 5 characters
TierNo	
string <= 5 characters
BinNo	
string <= 5 characters
PartNo
required
string <= 25 characters
Contract
required
string <= 5 characters
LotBatchNo
required
string <= 20 characters
SerialNo
required
string <= 50 characters
EngChgLevel
required
string <= 6 characters
WaivDevRejNo
required
string <= 15 characters
ProjectId	
string <= 10 characters
ActivitySeq	
number <= 10
TopParentHandlingUnitId	
number <= 2000
TopParentHuTypeId	
string <= 2000 characters
TopParentHuTypeDesc	
string <= 2000 characters
TopParentSSCC	
string <= 2000 characters
TopParentAltHuLabelId	
string <= 2000 characters
AvailabilityControlId	
string <= 25 characters
ExpirationDate	
string <date>
ProgramId	
string <= 10 characters
ProgramDescription	
string <= 2000 characters
ProjectName	
string <= 2000 characters
SubProjectId	
string <= 10 characters
SubProjectDescription	
string <= 2000 characters
ActivityNo	
string <= 10 characters
ActivityDescription	
string <= 200 characters
HandlingUnitTypeId	
string <= 4000 characters
Responses
200 response body for entity type InvPartInStockToReserveVirtual
201 response body for entity type InvPartInStockToReserveVirtual
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
/ManualReservationSet(Objkey='{Objkey}')/PartInStockToReserveArray(Objkey='{PartInStockToReserveArray_Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"QtyToReserve": 1,
"AvailableQty": 1,
"QtyReserved": 1,
"LocationNo": "It is a Text",
"HandlingUnitId": 1,
"Warehouse": "It is a Text",
"BayNo": "It is a Text",
"RowNo": "It is a Text",
"TierNo": "It is a Text",
"BinNo": "It is a Text",
"PartNo": "It is a Text",
"Contract": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ProjectId": "It is a Text",
"ActivitySeq": 1,
"TopParentHandlingUnitId": 1,
"TopParentHuTypeId": "It is a Text",
"TopParentHuTypeDesc": "It is a Text",
"TopParentSSCC": "It is a Text",
"TopParentAltHuLabelId": "It is a Text",
"AvailabilityControlId": "It is a Text",
"ExpirationDate": "2019-10-10",
"ProgramId": "It is a Text",
"ProgramDescription": "It is a Text",
"ProjectName": "It is a Text",
"SubProjectId": "It is a Text",
"SubProjectDescription": "It is a Text",
"ActivityNo": "It is a Text",
"ActivityDescription": "It is a Text",
"HandlingUnitTypeId": "It is a Text"
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
"QtyToReserve": 1,
"AvailableQty": 1,
"QtyReserved": 1,
"LocationNo": "It is a Text",
"HandlingUnitId": 1,
"Warehouse": "It is a Text",
"BayNo": "It is a Text",
"RowNo": "It is a Text",
"TierNo": "It is a Text",
"BinNo": "It is a Text",
"PartNo": "It is a Text",
"Contract": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ProjectId": "It is a Text",
"ActivitySeq": 1,
"TopParentHandlingUnitId": 1,
"TopParentHuTypeId": "It is a Text",
"TopParentHuTypeDesc": "It is a Text",
"TopParentSSCC": "It is a Text",
"TopParentAltHuLabelId": "It is a Text",
"AvailabilityControlId": "It is a Text",
"ExpirationDate": "2019-10-10",
"ProgramId": "It is a Text",
"ProgramDescription": "It is a Text",
"ProjectName": "It is a Text",
"SubProjectId": "It is a Text",
"SubProjectDescription": "It is a Text",
"ActivityNo": "It is a Text",
"ActivityDescription": "It is a Text",
"HandlingUnitTypeId": "It is a Text"
}
Get entities from HandlingUnitIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInStockToReserveArray_Objkey
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
/ManualReservationSet(Objkey='{Objkey}')/PartInStockToReserveArray(Objkey='{PartInStockToReserveArray_Objkey}')/HandlingUnitIdRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from HandlingUnitTypeIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInStockToReserveArray_Objkey
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
Items Enum: "HandlingUnitTypeId" "HandlingUnitTypeId desc" "Description" "Description desc" "HandlingUnitCategoryId" "HandlingUnitCategoryId desc" "Width" "Width desc" "Height" "Height desc" "Depth" "Depth desc" "Volume" "Volume desc" "TareWeight" "TareWeight desc" "UomForLength" "UomForLength desc" "UomForVolume" "UomForVolume desc" "UomForWeight" "UomForWeight desc" "AdditiveVolume" "AdditiveVolume desc" "MaxVolumeCapacity" "MaxVolumeCapacity desc" "MaxWeightCapacity" "MaxWeightCapacity desc" "Stackable" "Stackable desc" "Cost" "Cost desc" "CurrencyCode" "CurrencyCode desc" "GenerateSsccNo" "GenerateSsccNo desc" "PrintLabel" "PrintLabel desc" "NoOfHandlingUnitLabels" "NoOfHandlingUnitLabels desc" "PrintContentLabel" "PrintContentLabel desc" "NoOfContentLabels" "NoOfContentLabels desc" "PrintShipmentLabel" "PrintShipmentLabel desc" "NoOfShipmentLabels" "NoOfShipmentLabels desc" "UseHuReservationRanking" "UseHuReservationRanking desc" "NoteId" "NoteId desc" "NoteText" "NoteText desc" "TransportTaskCapacity" "TransportTaskCapacity desc" "PartNo" "PartNo desc" "Reusable" "Reusable desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "HandlingUnitTypeId" "Description" "HandlingUnitCategoryId" "Width" "Height" "Depth" "Volume" "TareWeight" "UomForLength" "UomForVolume" "UomForWeight" "AdditiveVolume" "MaxVolumeCapacity" "MaxWeightCapacity" "Stackable" "Cost" "CurrencyCode" "GenerateSsccNo" "PrintLabel" "NoOfHandlingUnitLabels" "PrintContentLabel" "NoOfContentLabels" "PrintShipmentLabel" "NoOfShipmentLabels" "UseHuReservationRanking" "NoteId" "NoteText" "TransportTaskCapacity" "PartNo" "Reusable"
Specify properties to return, see OData Select

Responses
200 response body for entity array HandlingUnitType
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualReservationSet(Objkey='{Objkey}')/PartInStockToReserveArray(Objkey='{PartInStockToReserveArray_Objkey}')/HandlingUnitTypeIdRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from ActivitySeqRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInStockToReserveArray_Objkey
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
Items Enum: "Objstate" "Objstate desc" "ActivitySeq" "ActivitySeq desc" "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ActivityNo" "ActivityNo desc" "TotalKeyPath" "TotalKeyPath desc" "ActivityResponsible" "ActivityResponsible desc" "Description" "Description desc" "ManualProgressLevel" "ManualProgressLevel desc" "EstimatedProgress" "EstimatedProgress desc" "ManualProgressCost" "ManualProgressCost desc" "ManualProgressHours" "ManualProgressHours desc" "TotalDurationDays" "TotalDurationDays desc" "TotalWorkDays" "TotalWorkDays desc" "Note" "Note desc" "EarlyStart" "EarlyStart desc" "EarlyFinish" "EarlyFinish desc" "LateStart" "LateStart desc" "LateFinish" "LateFinish desc" "BaseLineEarlyStart" "BaseLineEarlyStart desc" "BaseLineEarlyFinish" "BaseLineEarlyFinish desc" "ActualStart" "ActualStart desc" "ActualFinish" "ActualFinish desc" "CancelDate" "CancelDate desc" "ShortName" "ShortName desc" "ReleasedDate" "ReleasedDate desc" "CompletedDate" "CompletedDate desc" "ClosedDate" "ClosedDate desc" "ProgressMethod" "ProgressMethod desc" "PlannedCostDriver" "PlannedCostDriver desc" "PreAccountingId" "PreAccountingId desc" "ProgressTemplate" "ProgressTemplate desc" "ProgressTemplateStep" "ProgressTemplateStep desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "SetInBaseline" "SetInBaseline desc" "SetActivityChanged" "SetActivityChanged desc" "CaseId" "CaseId desc" "TaskId" "TaskId desc" "ActMilestone" "ActMilestone desc" "BaselinePcd" "BaselinePcd desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "AmountPlanned" "AmountPlanned desc" "AmountUsed" "AmountUsed desc" "ExcludeFromWad" "ExcludeFromWad desc" "GenerateSafetyStock" "GenerateSafetyStock desc" "HoursPlanned" "HoursPlanned desc" "AddressId" "AddressId desc" "BaselineTotalWorkDays" "BaselineTotalWorkDays desc" "ExcludePeriodicalCap" "ExcludePeriodicalCap desc" "FinanciallyCompleted" "FinanciallyCompleted desc" "ExcludeResourceProgress" "ExcludeResourceProgress desc" "FreeFloat" "FreeFloat desc" "TotalFloat" "TotalFloat desc" "ConstraintType" "ConstraintType desc" "ConstraintDate" "ConstraintDate desc" "ExcludeFromIntegrations" "ExcludeFromIntegrations desc" "NodeType" "NodeType desc" "MandatoryInvoiceComment" "MandatoryInvoiceComment desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ActivitySeq" "ProjectId" "SubProjectId" "ActivityNo" "TotalKeyPath" "ActivityResponsible" "Description" "ManualProgressLevel" "EstimatedProgress" "ManualProgressCost" "ManualProgressHours" "TotalDurationDays" "TotalWorkDays" "Note" "EarlyStart" "EarlyFinish" "LateStart" "LateFinish" "BaseLineEarlyStart" "BaseLineEarlyFinish" "ActualStart" "ActualFinish" "CancelDate" "ShortName" "ReleasedDate" "CompletedDate" "ClosedDate" "ProgressMethod" "PlannedCostDriver" "PreAccountingId" "ProgressTemplate" "ProgressTemplateStep" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "SetInBaseline" "SetActivityChanged" "CaseId" "TaskId" "ActMilestone" "BaselinePcd" "FinanciallyResponsible" "AmountPlanned" "AmountUsed" "ExcludeFromWad" "GenerateSafetyStock" "HoursPlanned" "AddressId" "BaselineTotalWorkDays" "ExcludePeriodicalCap" "FinanciallyCompleted" "ExcludeResourceProgress" "FreeFloat" "TotalFloat" "ConstraintType" "ConstraintDate" "ExcludeFromIntegrations" "NodeType" "MandatoryInvoiceComment"
Specify properties to return, see OData Select

Responses
200 response body for entity array Activity
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualReservationSet(Objkey='{Objkey}')/PartInStockToReserveArray(Objkey='{PartInStockToReserveArray_Objkey}')/ActivitySeqRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from ActivityNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInStockToReserveArray_Objkey
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
Items Enum: "Objstate" "Objstate desc" "ActivitySeq" "ActivitySeq desc" "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ActivityNo" "ActivityNo desc" "TotalKeyPath" "TotalKeyPath desc" "ActivityResponsible" "ActivityResponsible desc" "Description" "Description desc" "ManualProgressLevel" "ManualProgressLevel desc" "EstimatedProgress" "EstimatedProgress desc" "ManualProgressCost" "ManualProgressCost desc" "ManualProgressHours" "ManualProgressHours desc" "TotalDurationDays" "TotalDurationDays desc" "TotalWorkDays" "TotalWorkDays desc" "Note" "Note desc" "EarlyStart" "EarlyStart desc" "EarlyFinish" "EarlyFinish desc" "LateStart" "LateStart desc" "LateFinish" "LateFinish desc" "BaseLineEarlyStart" "BaseLineEarlyStart desc" "BaseLineEarlyFinish" "BaseLineEarlyFinish desc" "ActualStart" "ActualStart desc" "ActualFinish" "ActualFinish desc" "CancelDate" "CancelDate desc" "ShortName" "ShortName desc" "ReleasedDate" "ReleasedDate desc" "CompletedDate" "CompletedDate desc" "ClosedDate" "ClosedDate desc" "ProgressMethod" "ProgressMethod desc" "PlannedCostDriver" "PlannedCostDriver desc" "PreAccountingId" "PreAccountingId desc" "ProgressTemplate" "ProgressTemplate desc" "ProgressTemplateStep" "ProgressTemplateStep desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "SetInBaseline" "SetInBaseline desc" "SetActivityChanged" "SetActivityChanged desc" "CaseId" "CaseId desc" "TaskId" "TaskId desc" "ActMilestone" "ActMilestone desc" "BaselinePcd" "BaselinePcd desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "AmountPlanned" "AmountPlanned desc" "AmountUsed" "AmountUsed desc" "ExcludeFromWad" "ExcludeFromWad desc" "GenerateSafetyStock" "GenerateSafetyStock desc" "HoursPlanned" "HoursPlanned desc" "AddressId" "AddressId desc" "BaselineTotalWorkDays" "BaselineTotalWorkDays desc" "ExcludePeriodicalCap" "ExcludePeriodicalCap desc" "FinanciallyCompleted" "FinanciallyCompleted desc" "ExcludeResourceProgress" "ExcludeResourceProgress desc" "FreeFloat" "FreeFloat desc" "TotalFloat" "TotalFloat desc" "ConstraintType" "ConstraintType desc" "ConstraintDate" "ConstraintDate desc" "ExcludeFromIntegrations" "ExcludeFromIntegrations desc" "NodeType" "NodeType desc" "MandatoryInvoiceComment" "MandatoryInvoiceComment desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ActivitySeq" "ProjectId" "SubProjectId" "ActivityNo" "TotalKeyPath" "ActivityResponsible" "Description" "ManualProgressLevel" "EstimatedProgress" "ManualProgressCost" "ManualProgressHours" "TotalDurationDays" "TotalWorkDays" "Note" "EarlyStart" "EarlyFinish" "LateStart" "LateFinish" "BaseLineEarlyStart" "BaseLineEarlyFinish" "ActualStart" "ActualFinish" "CancelDate" "ShortName" "ReleasedDate" "CompletedDate" "ClosedDate" "ProgressMethod" "PlannedCostDriver" "PreAccountingId" "ProgressTemplate" "ProgressTemplateStep" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "SetInBaseline" "SetActivityChanged" "CaseId" "TaskId" "ActMilestone" "BaselinePcd" "FinanciallyResponsible" "AmountPlanned" "AmountUsed" "ExcludeFromWad" "GenerateSafetyStock" "HoursPlanned" "AddressId" "BaselineTotalWorkDays" "ExcludePeriodicalCap" "FinanciallyCompleted" "ExcludeResourceProgress" "FreeFloat" "TotalFloat" "ConstraintType" "ConstraintDate" "ExcludeFromIntegrations" "NodeType" "MandatoryInvoiceComment"
Specify properties to return, see OData Select

Responses
200 response body for entity array Activity
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualReservationSet(Objkey='{Objkey}')/PartInStockToReserveArray(Objkey='{PartInStockToReserveArray_Objkey}')/ActivityNoRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from ProgramIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInStockToReserveArray_Objkey
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
Items Enum: "Objstate" "Objstate desc" "ProgramId" "ProgramId desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ProgramId" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array ProjectProgramGlobal
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualReservationSet(Objkey='{Objkey}')/PartInStockToReserveArray(Objkey='{PartInStockToReserveArray_Objkey}')/ProgramIdRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from SubProjectIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInStockToReserveArray_Objkey
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
Items Enum: "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ParentSubProjectId" "ParentSubProjectId desc" "Description" "Description desc" "Manager" "Manager desc" "Department" "Department desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "ExcludeFromWad" "ExcludeFromWad desc" "AddressId" "AddressId desc" "FinanciallyCompleted" "FinanciallyCompleted desc" "ExcludeFromIntegrations" "ExcludeFromIntegrations desc" "ActivitySeq" "ActivitySeq desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ProjectId" "SubProjectId" "ParentSubProjectId" "Description" "Manager" "Department" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "FinanciallyResponsible" "ExcludeFromWad" "AddressId" "FinanciallyCompleted" "ExcludeFromIntegrations" "ActivitySeq"
Specify properties to return, see OData Select

Responses
200 response body for entity array SubProject
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualReservationSet(Objkey='{Objkey}')/PartInStockToReserveArray(Objkey='{PartInStockToReserveArray_Objkey}')/SubProjectIdRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from AvailabilityControlIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInStockToReserveArray_Objkey
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
Items Enum: "Objstate" "Objstate desc" "AvailabilityControlId" "AvailabilityControlId desc" "Description" "Description desc" "PartSupplyControl" "PartSupplyControl desc" "PartOrderIssueControl" "PartOrderIssueControl desc" "PartReservationControl" "PartReservationControl desc" "PartManualReservCtrl" "PartManualReservCtrl desc" "PartScrapControl" "PartScrapControl desc" "PartCountingControl" "PartCountingControl desc" "PartMovementControl" "PartMovementControl desc" "PartNoorderIssueControl" "PartNoorderIssueControl desc" "PutawayZoneRefillSource" "PutawayZoneRefillSource desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "AvailabilityControlId" "Description" "PartSupplyControl" "PartOrderIssueControl" "PartReservationControl" "PartManualReservCtrl" "PartScrapControl" "PartCountingControl" "PartMovementControl" "PartNoorderIssueControl" "PutawayZoneRefillSource"
Specify properties to return, see OData Select

Responses
200 response body for entity array PartAvailabilityControl
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualReservationSet(Objkey='{Objkey}')/PartInStockToReserveArray(Objkey='{PartInStockToReserveArray_Objkey}')/AvailabilityControlIdRef

Response samples
200403405500501503504
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
/ManualReservationSet(Objkey='{Objkey}')/PartNoRef

Response samples
200403405500501503504
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
/ManualReservationSet(Objkey='{Objkey}')/ConditionCodeRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from ActivitySeqRef
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
Items Enum: "Objstate" "Objstate desc" "ActivitySeq" "ActivitySeq desc" "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ActivityNo" "ActivityNo desc" "TotalKeyPath" "TotalKeyPath desc" "ActivityResponsible" "ActivityResponsible desc" "Description" "Description desc" "ManualProgressLevel" "ManualProgressLevel desc" "EstimatedProgress" "EstimatedProgress desc" "ManualProgressCost" "ManualProgressCost desc" "ManualProgressHours" "ManualProgressHours desc" "TotalDurationDays" "TotalDurationDays desc" "TotalWorkDays" "TotalWorkDays desc" "Note" "Note desc" "EarlyStart" "EarlyStart desc" "EarlyFinish" "EarlyFinish desc" "LateStart" "LateStart desc" "LateFinish" "LateFinish desc" "BaseLineEarlyStart" "BaseLineEarlyStart desc" "BaseLineEarlyFinish" "BaseLineEarlyFinish desc" "ActualStart" "ActualStart desc" "ActualFinish" "ActualFinish desc" "CancelDate" "CancelDate desc" "ShortName" "ShortName desc" "ReleasedDate" "ReleasedDate desc" "CompletedDate" "CompletedDate desc" "ClosedDate" "ClosedDate desc" "ProgressMethod" "ProgressMethod desc" "PlannedCostDriver" "PlannedCostDriver desc" "PreAccountingId" "PreAccountingId desc" "ProgressTemplate" "ProgressTemplate desc" "ProgressTemplateStep" "ProgressTemplateStep desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "SetInBaseline" "SetInBaseline desc" "SetActivityChanged" "SetActivityChanged desc" "CaseId" "CaseId desc" "TaskId" "TaskId desc" "ActMilestone" "ActMilestone desc" "BaselinePcd" "BaselinePcd desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "AmountPlanned" "AmountPlanned desc" "AmountUsed" "AmountUsed desc" "ExcludeFromWad" "ExcludeFromWad desc" "GenerateSafetyStock" "GenerateSafetyStock desc" "HoursPlanned" "HoursPlanned desc" "AddressId" "AddressId desc" "BaselineTotalWorkDays" "BaselineTotalWorkDays desc" "ExcludePeriodicalCap" "ExcludePeriodicalCap desc" "FinanciallyCompleted" "FinanciallyCompleted desc" "ExcludeResourceProgress" "ExcludeResourceProgress desc" "FreeFloat" "FreeFloat desc" "TotalFloat" "TotalFloat desc" "ConstraintType" "ConstraintType desc" "ConstraintDate" "ConstraintDate desc" "ExcludeFromIntegrations" "ExcludeFromIntegrations desc" "NodeType" "NodeType desc" "MandatoryInvoiceComment" "MandatoryInvoiceComment desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ActivitySeq" "ProjectId" "SubProjectId" "ActivityNo" "TotalKeyPath" "ActivityResponsible" "Description" "ManualProgressLevel" "EstimatedProgress" "ManualProgressCost" "ManualProgressHours" "TotalDurationDays" "TotalWorkDays" "Note" "EarlyStart" "EarlyFinish" "LateStart" "LateFinish" "BaseLineEarlyStart" "BaseLineEarlyFinish" "ActualStart" "ActualFinish" "CancelDate" "ShortName" "ReleasedDate" "CompletedDate" "ClosedDate" "ProgressMethod" "PlannedCostDriver" "PreAccountingId" "ProgressTemplate" "ProgressTemplateStep" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "SetInBaseline" "SetActivityChanged" "CaseId" "TaskId" "ActMilestone" "BaselinePcd" "FinanciallyResponsible" "AmountPlanned" "AmountUsed" "ExcludeFromWad" "GenerateSafetyStock" "HoursPlanned" "AddressId" "BaselineTotalWorkDays" "ExcludePeriodicalCap" "FinanciallyCompleted" "ExcludeResourceProgress" "FreeFloat" "TotalFloat" "ConstraintType" "ConstraintDate" "ExcludeFromIntegrations" "NodeType" "MandatoryInvoiceComment"
Specify properties to return, see OData Select

Responses
200 response body for entity array Activity
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualReservationSet(Objkey='{Objkey}')/ActivitySeqRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
MaterialRequisitionLineSet
Get entities from MaterialRequisitionLineSet
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
Items Enum: "OrderClass" "OrderClass desc" "OrderNo" "OrderNo desc" "LineNo" "LineNo desc" "ReleaseNo" "ReleaseNo desc" "LineItemNo" "LineItemNo desc" "PartNo" "PartNo desc" "Contract" "Contract desc" "UnitMeas" "UnitMeas desc" "PreAccountingId" "PreAccountingId desc" "NoteId" "NoteId desc" "StatusCode" "StatusCode desc" "SupplyCode" "SupplyCode desc" "NoteText" "NoteText desc" "PlannedDeliveryDate" "PlannedDeliveryDate desc" "DueDate" "DueDate desc" "QtyDue" "QtyDue desc" "QtyAssigned" "QtyAssigned desc" "QtyOnOrder" "QtyOnOrder desc" "QtyReturned" "QtyReturned desc" "QtyShipped" "QtyShipped desc" "ConditionCode" "ConditionCode desc" "ActivitySeq" "ActivitySeq desc" "ProjectId" "ProjectId desc" "DateEntered" "DateEntered desc" "RemainingQty" "RemainingQty desc" "QtyShort" "QtyShort desc" "QtyToReserve" "QtyToReserve desc" "ProgramId" "ProgramId desc" "ProgramDescription" "ProgramDescription desc" "ProjectName" "ProjectName desc" "SubProjectId" "SubProjectId desc" "SubProjectDescription" "SubProjectDescription desc" "ActivityNo" "ActivityNo desc" "ActivityDescription" "ActivityDescription desc" "InventoryPart" "InventoryPart desc" "SerialTrackingAtReceiptAndIssue" "SerialTrackingAtReceiptAndIssue desc" "UnIdentifiedSerials" "UnIdentifiedSerials desc" "ConnectedPoLineCancelled" "ConnectedPoLineCancelled desc" "DocumentText" "DocumentText desc" "LineNoOrderBy" "LineNoOrderBy desc" "IntCustomerNo" "IntCustomerNo desc" "DestinationId" "DestinationId desc" "ReleaseNoOrderBy" "ReleaseNoOrderBy desc" "CreatedByUserId" "CreatedByUserId desc" "COriginShortage" "COriginShortage desc" "CProjectId" "CProjectId desc" "CActivitySeq" "CActivitySeq desc" "CActivityNo" "CActivityNo desc" "CShortageDate" "CShortageDate desc" "CCrimDeacPUMO781" "CCrimDeacPUMO781 desc" "CProjFieldEdit" "CProjFieldEdit desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "OrderClass" "OrderNo" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "Contract" "UnitMeas" "PreAccountingId" "NoteId" "StatusCode" "SupplyCode" "NoteText" "PlannedDeliveryDate" "DueDate" "QtyDue" "QtyAssigned" "QtyOnOrder" "QtyReturned" "QtyShipped" "ConditionCode" "ActivitySeq" "ProjectId" "DateEntered" "RemainingQty" "QtyShort" "QtyToReserve" "ProgramId" "ProgramDescription" "ProjectName" "SubProjectId" "SubProjectDescription" "ActivityNo" "ActivityDescription" "InventoryPart" "SerialTrackingAtReceiptAndIssue" "UnIdentifiedSerials" "ConnectedPoLineCancelled" "DocumentText" "LineNoOrderBy" "IntCustomerNo" "DestinationId" "ReleaseNoOrderBy" "CreatedByUserId" "COriginShortage" "CProjectId" "CActivitySeq" "CActivityNo" "CShortageDate" "CCrimDeacPUMO781" "CProjFieldEdit"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "OrderNoRef" "ConditionCodeRef" "PreAccountingRef" "InternalCustomerNoRef" "InternalDestinationIdRef" "ActivitySeqRef" "ProjectIdRef" "ProgramIdRef" "SubProjectIdRef" "ActivityNoRef" "PartCatalogRef" "PartNoRef" "UnitMeasRef" "COriginShortageRef" "CProjectIdRef" "CActivityNoRef" "CActivitySeqRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array MaterialRequisLine
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialRequisitionLineSet

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Add new entity to MaterialRequisitionLineSet
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "OrderClass" "OrderNo" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "Contract" "UnitMeas" "PreAccountingId" "NoteId" "StatusCode" "SupplyCode" "NoteText" "PlannedDeliveryDate" "DueDate" "QtyDue" "QtyAssigned" "QtyOnOrder" "QtyReturned" "QtyShipped" "ConditionCode" "ActivitySeq" "ProjectId" "DateEntered" "RemainingQty" "QtyShort" "QtyToReserve" "ProgramId" "ProgramDescription" "ProjectName" "SubProjectId" "SubProjectDescription" "ActivityNo" "ActivityDescription" "InventoryPart" "SerialTrackingAtReceiptAndIssue" "UnIdentifiedSerials" "ConnectedPoLineCancelled" "DocumentText" "LineNoOrderBy" "IntCustomerNo" "DestinationId" "ReleaseNoOrderBy" "CreatedByUserId" "COriginShortage" "CProjectId" "CActivitySeq" "CActivityNo" "CShortageDate" "CCrimDeacPUMO781" "CProjFieldEdit"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type MaterialRequisLine

OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
PartNo
required
string <= 25 characters
Contract
required
string <= 5 characters
UnitMeas
required
string <= 10 characters
SupplyCode
required
string (MaterialRequisSupply_Enumeration)
Enum: "InventoryOrder" "PurchaseOrder" "ProjectInventory"
NoteText	
string <= 2000 characters
PlannedDeliveryDate	
string <date>
DueDate
required
string <date>
QtyDue
required
number
ConditionCode	
string <= 10 characters
ActivitySeq	
number <= 10
ProgramId	
string <= 10 characters
ProgramDescription	
string <= 2000 characters
ProjectName	
string <= 2000 characters
SubProjectId	
string <= 10 characters
SubProjectDescription	
string <= 2000 characters
ActivityNo	
string <= 10 characters
ActivityDescription	
string <= 200 characters
UnIdentifiedSerials	
number
ConnectedPoLineCancelled	
boolean
DocumentText	
boolean
LineNoOrderBy	
string <= 4000 characters
IntCustomerNo	
string <= 100 characters
DestinationId	
string <= 4000 characters
ReleaseNoOrderBy	
string <= 4000 characters
CreatedByUserId	
string <= 4000 characters
COriginShortage	
number
CProjectId	
string <= 4000 characters
CActivitySeq	
number
CActivityNo	
string <= 4000 characters
CShortageDate	
string <date-time>
CCrimDeacPUMO781	
string <= 4000 characters
CProjFieldEdit	
string <= 4000 characters
Responses
201 response body for entity type MaterialRequisLine
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/MaterialRequisitionLineSet

Request samples
Payload
Content type
application/json

Copy
{
"OrderClass": "INT",
"OrderNo": "It is a Text",
"PartNo": "It is a Text",
"Contract": "It is a Text",
"UnitMeas": "It is a Text",
"SupplyCode": "InventoryOrder",
"NoteText": "It is a Text",
"PlannedDeliveryDate": "2019-10-10",
"DueDate": "2019-10-10",
"QtyDue": 1,
"ConditionCode": "It is a Text",
"ActivitySeq": 1,
"ProgramId": "It is a Text",
"ProgramDescription": "It is a Text",
"ProjectName": "It is a Text",
"SubProjectId": "It is a Text",
"SubProjectDescription": "It is a Text",
"ActivityNo": "It is a Text",
"ActivityDescription": "It is a Text",
"UnIdentifiedSerials": 1,
"ConnectedPoLineCancelled": true,
"DocumentText": true,
"LineNoOrderBy": "It is a Text",
"IntCustomerNo": "It is a Text",
"DestinationId": "It is a Text",
"ReleaseNoOrderBy": "It is a Text",
"CreatedByUserId": "It is a Text",
"COriginShortage": 1,
"CProjectId": "It is a Text",
"CActivitySeq": 1,
"CActivityNo": "It is a Text",
"CShortageDate": "2019-10-01T01:01:01Z",
"CCrimDeacPUMO781": "It is a Text",
"CProjFieldEdit": "It is a Text"
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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"UnitMeas": "It is a Text",
"PreAccountingId": 1,
"NoteId": 1,
"NoteText": "It is a Text",
"PlannedDeliveryDate": "2019-10-10",
"DueDate": "2019-10-10",
"QtyDue": 1,
"QtyAssigned": 1,
"QtyOnOrder": 1,
"QtyReturned": 1,
"QtyShipped": 1,
"ConditionCode": "It is a Text",
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"DateEntered": "2019-10-10",
"RemainingQty": 1,
"QtyShort": 1,
"QtyToReserve": 1,
"ProgramId": "It is a Text",
"ProgramDescription": "It is a Text",
"ProjectName": "It is a Text",
"SubProjectId": "It is a Text",
"SubProjectDescription": "It is a Text",
"ActivityNo": "It is a Text",
"ActivityDescription": "It is a Text",
"InventoryPart": true,
"SerialTrackingAtReceiptAndIssue": "It is a Text",
"UnIdentifiedSerials": 1,
"ConnectedPoLineCancelled": true,
"DocumentText": true,
"LineNoOrderBy": "It is a Text",
"IntCustomerNo": "It is a Text",
"DestinationId": "It is a Text",
"ReleaseNoOrderBy": "It is a Text",
"CreatedByUserId": "It is a Text",
"COriginShortage": 1,
"CProjectId": "It is a Text",
"CActivitySeq": 1,
"CActivityNo": "It is a Text",
"CShortageDate": "2019-10-01T01:01:01Z",
"CCrimDeacPUMO781": "It is a Text",
"CProjFieldEdit": "It is a Text",
"OrderClass": "INT",
"StatusCode": "Planned",
"SupplyCode": "InventoryOrder"
}
Get entity from MaterialRequisitionLineSet by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "OrderClass" "OrderNo" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "Contract" "UnitMeas" "PreAccountingId" "NoteId" "StatusCode" "SupplyCode" "NoteText" "PlannedDeliveryDate" "DueDate" "QtyDue" "QtyAssigned" "QtyOnOrder" "QtyReturned" "QtyShipped" "ConditionCode" "ActivitySeq" "ProjectId" "DateEntered" "RemainingQty" "QtyShort" "QtyToReserve" "ProgramId" "ProgramDescription" "ProjectName" "SubProjectId" "SubProjectDescription" "ActivityNo" "ActivityDescription" "InventoryPart" "SerialTrackingAtReceiptAndIssue" "UnIdentifiedSerials" "ConnectedPoLineCancelled" "DocumentText" "LineNoOrderBy" "IntCustomerNo" "DestinationId" "ReleaseNoOrderBy" "CreatedByUserId" "COriginShortage" "CProjectId" "CActivitySeq" "CActivityNo" "CShortageDate" "CCrimDeacPUMO781" "CProjFieldEdit"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "ContractRef" "OrderNoRef" "ConditionCodeRef" "PreAccountingRef" "InternalCustomerNoRef" "InternalDestinationIdRef" "ActivitySeqRef" "ProjectIdRef" "ProgramIdRef" "SubProjectIdRef" "ActivityNoRef" "PartCatalogRef" "PartNoRef" "UnitMeasRef" "COriginShortageRef" "CProjectIdRef" "CActivityNoRef" "CActivitySeqRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type MaterialRequisLine
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})

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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"UnitMeas": "It is a Text",
"PreAccountingId": 1,
"NoteId": 1,
"NoteText": "It is a Text",
"PlannedDeliveryDate": "2019-10-10",
"DueDate": "2019-10-10",
"QtyDue": 1,
"QtyAssigned": 1,
"QtyOnOrder": 1,
"QtyReturned": 1,
"QtyShipped": 1,
"ConditionCode": "It is a Text",
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"DateEntered": "2019-10-10",
"RemainingQty": 1,
"QtyShort": 1,
"QtyToReserve": 1,
"ProgramId": "It is a Text",
"ProgramDescription": "It is a Text",
"ProjectName": "It is a Text",
"SubProjectId": "It is a Text",
"SubProjectDescription": "It is a Text",
"ActivityNo": "It is a Text",
"ActivityDescription": "It is a Text",
"InventoryPart": true,
"SerialTrackingAtReceiptAndIssue": "It is a Text",
"UnIdentifiedSerials": 1,
"ConnectedPoLineCancelled": true,
"DocumentText": true,
"LineNoOrderBy": "It is a Text",
"IntCustomerNo": "It is a Text",
"DestinationId": "It is a Text",
"ReleaseNoOrderBy": "It is a Text",
"CreatedByUserId": "It is a Text",
"COriginShortage": 1,
"CProjectId": "It is a Text",
"CActivitySeq": 1,
"CActivityNo": "It is a Text",
"CShortageDate": "2019-10-01T01:01:01Z",
"CCrimDeacPUMO781": "It is a Text",
"CProjFieldEdit": "It is a Text",
"OrderClass": "INT",
"StatusCode": "Planned",
"SupplyCode": "InventoryOrder"
}
Delete entity from MaterialRequisitionLineSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
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
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})

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
Update entity in MaterialRequisitionLineSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
required
number
Example: 1
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "OrderClass" "OrderNo" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "Contract" "UnitMeas" "PreAccountingId" "NoteId" "StatusCode" "SupplyCode" "NoteText" "PlannedDeliveryDate" "DueDate" "QtyDue" "QtyAssigned" "QtyOnOrder" "QtyReturned" "QtyShipped" "ConditionCode" "ActivitySeq" "ProjectId" "DateEntered" "RemainingQty" "QtyShort" "QtyToReserve" "ProgramId" "ProgramDescription" "ProjectName" "SubProjectId" "SubProjectDescription" "ActivityNo" "ActivityDescription" "InventoryPart" "SerialTrackingAtReceiptAndIssue" "UnIdentifiedSerials" "ConnectedPoLineCancelled" "DocumentText" "LineNoOrderBy" "IntCustomerNo" "DestinationId" "ReleaseNoOrderBy" "CreatedByUserId" "COriginShortage" "CProjectId" "CActivitySeq" "CActivityNo" "CShortageDate" "CCrimDeacPUMO781" "CProjFieldEdit"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type MaterialRequisLine

PartNo
required
string <= 25 characters
UnitMeas
required
string <= 10 characters
StatusCode	
string (MaterialRequisStatus_Enumeration)
Enum: "Planned" "Stopped" "Released" "Reserved" "PartiallyDelivered" "Closed"
SupplyCode
required
string (MaterialRequisSupply_Enumeration)
Enum: "InventoryOrder" "PurchaseOrder" "ProjectInventory"
NoteText	
string <= 2000 characters
PlannedDeliveryDate	
string <date>
DueDate
required
string <date>
QtyDue
required
number
QtyAssigned	
number
QtyOnOrder	
number
QtyReturned	
number
QtyShipped	
number
ConditionCode	
string <= 10 characters
ActivitySeq	
number <= 10
DateEntered	
string <date>
RemainingQty	
number
QtyShort	
number
QtyToReserve	
number
ProgramId	
string <= 10 characters
ProgramDescription	
string <= 2000 characters
ProjectName	
string <= 2000 characters
SubProjectId	
string <= 10 characters
SubProjectDescription	
string <= 2000 characters
ActivityNo	
string <= 10 characters
ActivityDescription	
string <= 200 characters
InventoryPart	
boolean
SerialTrackingAtReceiptAndIssue	
string <= 2000 characters
UnIdentifiedSerials	
number
ConnectedPoLineCancelled	
boolean
DocumentText	
boolean
LineNoOrderBy	
string <= 4000 characters
IntCustomerNo	
string <= 100 characters
DestinationId	
string <= 4000 characters
ReleaseNoOrderBy	
string <= 4000 characters
COriginShortage	
number
CProjectId	
string <= 4000 characters
CActivitySeq	
number
CActivityNo	
string <= 4000 characters
CShortageDate	
string <date-time>
CCrimDeacPUMO781	
string <= 4000 characters
CProjFieldEdit	
string <= 4000 characters
Responses
200 response body for entity type MaterialRequisLine
201 response body for entity type MaterialRequisLine
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
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})

Request samples
Payload
Content type
application/json

Copy
{
"PartNo": "It is a Text",
"UnitMeas": "It is a Text",
"StatusCode": "Planned",
"SupplyCode": "InventoryOrder",
"NoteText": "It is a Text",
"PlannedDeliveryDate": "2019-10-10",
"DueDate": "2019-10-10",
"QtyDue": 1,
"QtyAssigned": 1,
"QtyOnOrder": 1,
"QtyReturned": 1,
"QtyShipped": 1,
"ConditionCode": "It is a Text",
"ActivitySeq": 1,
"DateEntered": "2019-10-10",
"RemainingQty": 1,
"QtyShort": 1,
"QtyToReserve": 1,
"ProgramId": "It is a Text",
"ProgramDescription": "It is a Text",
"ProjectName": "It is a Text",
"SubProjectId": "It is a Text",
"SubProjectDescription": "It is a Text",
"ActivityNo": "It is a Text",
"ActivityDescription": "It is a Text",
"InventoryPart": true,
"SerialTrackingAtReceiptAndIssue": "It is a Text",
"UnIdentifiedSerials": 1,
"ConnectedPoLineCancelled": true,
"DocumentText": true,
"LineNoOrderBy": "It is a Text",
"IntCustomerNo": "It is a Text",
"DestinationId": "It is a Text",
"ReleaseNoOrderBy": "It is a Text",
"COriginShortage": 1,
"CProjectId": "It is a Text",
"CActivitySeq": 1,
"CActivityNo": "It is a Text",
"CShortageDate": "2019-10-01T01:01:01Z",
"CCrimDeacPUMO781": "It is a Text",
"CProjFieldEdit": "It is a Text"
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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"UnitMeas": "It is a Text",
"PreAccountingId": 1,
"NoteId": 1,
"NoteText": "It is a Text",
"PlannedDeliveryDate": "2019-10-10",
"DueDate": "2019-10-10",
"QtyDue": 1,
"QtyAssigned": 1,
"QtyOnOrder": 1,
"QtyReturned": 1,
"QtyShipped": 1,
"ConditionCode": "It is a Text",
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"DateEntered": "2019-10-10",
"RemainingQty": 1,
"QtyShort": 1,
"QtyToReserve": 1,
"ProgramId": "It is a Text",
"ProgramDescription": "It is a Text",
"ProjectName": "It is a Text",
"SubProjectId": "It is a Text",
"SubProjectDescription": "It is a Text",
"ActivityNo": "It is a Text",
"ActivityDescription": "It is a Text",
"InventoryPart": true,
"SerialTrackingAtReceiptAndIssue": "It is a Text",
"UnIdentifiedSerials": 1,
"ConnectedPoLineCancelled": true,
"DocumentText": true,
"LineNoOrderBy": "It is a Text",
"IntCustomerNo": "It is a Text",
"DestinationId": "It is a Text",
"ReleaseNoOrderBy": "It is a Text",
"CreatedByUserId": "It is a Text",
"COriginShortage": 1,
"CProjectId": "It is a Text",
"CActivitySeq": 1,
"CActivityNo": "It is a Text",
"CShortageDate": "2019-10-01T01:01:01Z",
"CCrimDeacPUMO781": "It is a Text",
"CProjFieldEdit": "It is a Text",
"OrderClass": "INT",
"StatusCode": "Planned",
"SupplyCode": "InventoryOrder"
}
Invoke function DefaultCopy
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
required
number
Example: 1
query Parameters
@CopyValues
required
object (MaterialRequisLineCopyValues)
$select	
Array of strings unique
Items Enum: "luname" "keyref" "OrderClass" "OrderNo" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "Contract" "UnitMeas" "PreAccountingId" "NoteId" "StatusCode" "SupplyCode" "NoteText" "PlannedDeliveryDate" "DueDate" "QtyDue" "QtyAssigned" "QtyOnOrder" "QtyReturned" "QtyShipped" "ConditionCode" "ActivitySeq" "ProjectId" "DateEntered" "RemainingQty" "QtyShort" "QtyToReserve" "ProgramId" "ProgramDescription" "ProjectName" "SubProjectId" "SubProjectDescription" "ActivityNo" "ActivityDescription" "InventoryPart" "SerialTrackingAtReceiptAndIssue" "UnIdentifiedSerials" "ConnectedPoLineCancelled" "DocumentText" "LineNoOrderBy" "IntCustomerNo" "DestinationId" "ReleaseNoOrderBy" "CreatedByUserId" "COriginShortage" "CProjectId" "CActivitySeq" "CActivityNo" "CShortageDate" "CCrimDeacPUMO781" "CProjFieldEdit"
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
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})/IfsApp.MaterialRequisitionLinesHandling.MaterialRequisLine_DefaultCopy(CopyValues=@CopyValues)

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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"UnitMeas": "It is a Text",
"PreAccountingId": 1,
"NoteId": 1,
"NoteText": "It is a Text",
"PlannedDeliveryDate": "2019-10-10",
"DueDate": "2019-10-10",
"QtyDue": 1,
"QtyAssigned": 1,
"QtyOnOrder": 1,
"QtyReturned": 1,
"QtyShipped": 1,
"ConditionCode": "It is a Text",
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"DateEntered": "2019-10-10",
"RemainingQty": 1,
"QtyShort": 1,
"QtyToReserve": 1,
"ProgramId": "It is a Text",
"ProgramDescription": "It is a Text",
"ProjectName": "It is a Text",
"SubProjectId": "It is a Text",
"SubProjectDescription": "It is a Text",
"ActivityNo": "It is a Text",
"ActivityDescription": "It is a Text",
"InventoryPart": true,
"SerialTrackingAtReceiptAndIssue": "It is a Text",
"UnIdentifiedSerials": 1,
"ConnectedPoLineCancelled": true,
"DocumentText": true,
"LineNoOrderBy": "It is a Text",
"IntCustomerNo": "It is a Text",
"DestinationId": "It is a Text",
"ReleaseNoOrderBy": "It is a Text",
"CreatedByUserId": "It is a Text",
"COriginShortage": 1,
"CProjectId": "It is a Text",
"CActivitySeq": 1,
"CActivityNo": "It is a Text",
"CShortageDate": "2019-10-01T01:01:01Z",
"CCrimDeacPUMO781": "It is a Text",
"CProjFieldEdit": "It is a Text",
"OrderClass": "INT",
"StatusCode": "Planned",
"SupplyCode": "InventoryOrder"
}
Invoke function DefaultCopy
Authorizations:
(OpenIdbasicAuth)
query Parameters
@CopyValues
required
object (MaterialRequisLineCopyValues)
$select	
Array of strings unique
Items Enum: "luname" "keyref" "OrderClass" "OrderNo" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "Contract" "UnitMeas" "PreAccountingId" "NoteId" "StatusCode" "SupplyCode" "NoteText" "PlannedDeliveryDate" "DueDate" "QtyDue" "QtyAssigned" "QtyOnOrder" "QtyReturned" "QtyShipped" "ConditionCode" "ActivitySeq" "ProjectId" "DateEntered" "RemainingQty" "QtyShort" "QtyToReserve" "ProgramId" "ProgramDescription" "ProjectName" "SubProjectId" "SubProjectDescription" "ActivityNo" "ActivityDescription" "InventoryPart" "SerialTrackingAtReceiptAndIssue" "UnIdentifiedSerials" "ConnectedPoLineCancelled" "DocumentText" "LineNoOrderBy" "IntCustomerNo" "DestinationId" "ReleaseNoOrderBy" "CreatedByUserId" "COriginShortage" "CProjectId" "CActivitySeq" "CActivityNo" "CShortageDate" "CCrimDeacPUMO781" "CProjFieldEdit"
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
/MaterialRequisitionLineSet/IfsApp.MaterialRequisitionLinesHandling.MaterialRequisLine_DefaultCopy(CopyValues=@CopyValues)

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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"UnitMeas": "It is a Text",
"PreAccountingId": 1,
"NoteId": 1,
"NoteText": "It is a Text",
"PlannedDeliveryDate": "2019-10-10",
"DueDate": "2019-10-10",
"QtyDue": 1,
"QtyAssigned": 1,
"QtyOnOrder": 1,
"QtyReturned": 1,
"QtyShipped": 1,
"ConditionCode": "It is a Text",
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"DateEntered": "2019-10-10",
"RemainingQty": 1,
"QtyShort": 1,
"QtyToReserve": 1,
"ProgramId": "It is a Text",
"ProgramDescription": "It is a Text",
"ProjectName": "It is a Text",
"SubProjectId": "It is a Text",
"SubProjectDescription": "It is a Text",
"ActivityNo": "It is a Text",
"ActivityDescription": "It is a Text",
"InventoryPart": true,
"SerialTrackingAtReceiptAndIssue": "It is a Text",
"UnIdentifiedSerials": 1,
"ConnectedPoLineCancelled": true,
"DocumentText": true,
"LineNoOrderBy": "It is a Text",
"IntCustomerNo": "It is a Text",
"DestinationId": "It is a Text",
"ReleaseNoOrderBy": "It is a Text",
"CreatedByUserId": "It is a Text",
"COriginShortage": 1,
"CProjectId": "It is a Text",
"CActivitySeq": 1,
"CActivityNo": "It is a Text",
"CShortageDate": "2019-10-01T01:01:01Z",
"CCrimDeacPUMO781": "It is a Text",
"CProjFieldEdit": "It is a Text",
"OrderClass": "INT",
"StatusCode": "Planned",
"SupplyCode": "InventoryOrder"
}
Invoke function Default
Authorizations:
(OpenIdbasicAuth)
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "OrderClass" "OrderNo" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "Contract" "UnitMeas" "PreAccountingId" "NoteId" "StatusCode" "SupplyCode" "NoteText" "PlannedDeliveryDate" "DueDate" "QtyDue" "QtyAssigned" "QtyOnOrder" "QtyReturned" "QtyShipped" "ConditionCode" "ActivitySeq" "ProjectId" "DateEntered" "RemainingQty" "QtyShort" "QtyToReserve" "ProgramId" "ProgramDescription" "ProjectName" "SubProjectId" "SubProjectDescription" "ActivityNo" "ActivityDescription" "InventoryPart" "SerialTrackingAtReceiptAndIssue" "UnIdentifiedSerials" "ConnectedPoLineCancelled" "DocumentText" "LineNoOrderBy" "IntCustomerNo" "DestinationId" "ReleaseNoOrderBy" "CreatedByUserId" "COriginShortage" "CProjectId" "CActivitySeq" "CActivityNo" "CShortageDate" "CCrimDeacPUMO781" "CProjFieldEdit"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type MaterialRequisLine
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialRequisitionLineSet/IfsApp.MaterialRequisitionLinesHandling.MaterialRequisLine_Default()

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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"UnitMeas": "It is a Text",
"PreAccountingId": 1,
"NoteId": 1,
"NoteText": "It is a Text",
"PlannedDeliveryDate": "2019-10-10",
"DueDate": "2019-10-10",
"QtyDue": 1,
"QtyAssigned": 1,
"QtyOnOrder": 1,
"QtyReturned": 1,
"QtyShipped": 1,
"ConditionCode": "It is a Text",
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"DateEntered": "2019-10-10",
"RemainingQty": 1,
"QtyShort": 1,
"QtyToReserve": 1,
"ProgramId": "It is a Text",
"ProgramDescription": "It is a Text",
"ProjectName": "It is a Text",
"SubProjectId": "It is a Text",
"SubProjectDescription": "It is a Text",
"ActivityNo": "It is a Text",
"ActivityDescription": "It is a Text",
"InventoryPart": true,
"SerialTrackingAtReceiptAndIssue": "It is a Text",
"UnIdentifiedSerials": 1,
"ConnectedPoLineCancelled": true,
"DocumentText": true,
"LineNoOrderBy": "It is a Text",
"IntCustomerNo": "It is a Text",
"DestinationId": "It is a Text",
"ReleaseNoOrderBy": "It is a Text",
"CreatedByUserId": "It is a Text",
"COriginShortage": 1,
"CProjectId": "It is a Text",
"CActivitySeq": 1,
"CActivityNo": "It is a Text",
"CShortageDate": "2019-10-01T01:01:01Z",
"CCrimDeacPUMO781": "It is a Text",
"CProjFieldEdit": "It is a Text",
"OrderClass": "INT",
"StatusCode": "Planned",
"SupplyCode": "InventoryOrder"
}
Get entities from ContractRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
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
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})/ContractRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from OrderNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
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
Items Enum: "OrderNo" "OrderNo desc" "StatusCode" "StatusCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "OrderNo" "StatusCode"
Specify properties to return, see OData Select

Responses
200 response body for entity array MaterialRequis
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})/OrderNoRef

Response samples
200403405500501503504
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
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
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
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})/ConditionCodeRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from PreAccountingRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
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
Items Enum: "PreAccountingId" "PreAccountingId desc" "AccountNo" "AccountNo desc" "CodenoB" "CodenoB desc" "CodenoC" "CodenoC desc" "CodenoD" "CodenoD desc" "CodenoE" "CodenoE desc" "CodenoF" "CodenoF desc" "CodenoG" "CodenoG desc" "CodenoH" "CodenoH desc" "CodenoI" "CodenoI desc" "CodenoJ" "CodenoJ desc" "Company" "Company desc" "Contract" "Contract desc" "ActivitySeq" "ActivitySeq desc" "PrePostingSource" "PrePostingSource desc" "CompanyRef" "CompanyRef desc" "VoucherDate" "VoucherDate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PreAccountingId" "AccountNo" "CodenoB" "CodenoC" "CodenoD" "CodenoE" "CodenoF" "CodenoG" "CodenoH" "CodenoI" "CodenoJ" "Company" "Contract" "ActivitySeq" "PrePostingSource" "CompanyRef" "VoucherDate"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "AccountNoRef" "CodenoBRef" "CodenoCRef" "CodenoDRef" "CodenoERef" "CodenoFRef" "CodenoGRef" "CodenoHRef" "CodenoIRef" "CodenoJRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array PreAccounting
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})/PreAccountingRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from InternalCustomerNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
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
Items Enum: "Objstate" "Objstate desc" "IntCustomerNo" "IntCustomerNo desc" "Extension" "Extension desc" "Name" "Name desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "IntCustomerNo" "Extension" "Name"
Specify properties to return, see OData Select

Responses
200 response body for entity array InternalCustomer
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})/InternalCustomerNoRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from InternalDestinationIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
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
Items Enum: "Contract" "Contract desc" "DestinationId" "DestinationId desc" "Description" "Description desc" "Objstate" "Objstate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "DestinationId" "Description" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity array InternalDestinationLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})/InternalDestinationIdRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from ActivitySeqRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
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
Items Enum: "Objstate" "Objstate desc" "ActivitySeq" "ActivitySeq desc" "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ActivityNo" "ActivityNo desc" "TotalKeyPath" "TotalKeyPath desc" "ActivityResponsible" "ActivityResponsible desc" "Description" "Description desc" "ManualProgressLevel" "ManualProgressLevel desc" "EstimatedProgress" "EstimatedProgress desc" "ManualProgressCost" "ManualProgressCost desc" "ManualProgressHours" "ManualProgressHours desc" "TotalDurationDays" "TotalDurationDays desc" "TotalWorkDays" "TotalWorkDays desc" "Note" "Note desc" "EarlyStart" "EarlyStart desc" "EarlyFinish" "EarlyFinish desc" "LateStart" "LateStart desc" "LateFinish" "LateFinish desc" "BaseLineEarlyStart" "BaseLineEarlyStart desc" "BaseLineEarlyFinish" "BaseLineEarlyFinish desc" "ActualStart" "ActualStart desc" "ActualFinish" "ActualFinish desc" "CancelDate" "CancelDate desc" "ShortName" "ShortName desc" "ReleasedDate" "ReleasedDate desc" "CompletedDate" "CompletedDate desc" "ClosedDate" "ClosedDate desc" "ProgressMethod" "ProgressMethod desc" "PlannedCostDriver" "PlannedCostDriver desc" "PreAccountingId" "PreAccountingId desc" "ProgressTemplate" "ProgressTemplate desc" "ProgressTemplateStep" "ProgressTemplateStep desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "SetInBaseline" "SetInBaseline desc" "SetActivityChanged" "SetActivityChanged desc" "CaseId" "CaseId desc" "TaskId" "TaskId desc" "ActMilestone" "ActMilestone desc" "BaselinePcd" "BaselinePcd desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "AmountPlanned" "AmountPlanned desc" "AmountUsed" "AmountUsed desc" "ExcludeFromWad" "ExcludeFromWad desc" "GenerateSafetyStock" "GenerateSafetyStock desc" "HoursPlanned" "HoursPlanned desc" "AddressId" "AddressId desc" "BaselineTotalWorkDays" "BaselineTotalWorkDays desc" "ExcludePeriodicalCap" "ExcludePeriodicalCap desc" "FinanciallyCompleted" "FinanciallyCompleted desc" "ExcludeResourceProgress" "ExcludeResourceProgress desc" "FreeFloat" "FreeFloat desc" "TotalFloat" "TotalFloat desc" "ConstraintType" "ConstraintType desc" "ConstraintDate" "ConstraintDate desc" "ExcludeFromIntegrations" "ExcludeFromIntegrations desc" "NodeType" "NodeType desc" "MandatoryInvoiceComment" "MandatoryInvoiceComment desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ActivitySeq" "ProjectId" "SubProjectId" "ActivityNo" "TotalKeyPath" "ActivityResponsible" "Description" "ManualProgressLevel" "EstimatedProgress" "ManualProgressCost" "ManualProgressHours" "TotalDurationDays" "TotalWorkDays" "Note" "EarlyStart" "EarlyFinish" "LateStart" "LateFinish" "BaseLineEarlyStart" "BaseLineEarlyFinish" "ActualStart" "ActualFinish" "CancelDate" "ShortName" "ReleasedDate" "CompletedDate" "ClosedDate" "ProgressMethod" "PlannedCostDriver" "PreAccountingId" "ProgressTemplate" "ProgressTemplateStep" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "SetInBaseline" "SetActivityChanged" "CaseId" "TaskId" "ActMilestone" "BaselinePcd" "FinanciallyResponsible" "AmountPlanned" "AmountUsed" "ExcludeFromWad" "GenerateSafetyStock" "HoursPlanned" "AddressId" "BaselineTotalWorkDays" "ExcludePeriodicalCap" "FinanciallyCompleted" "ExcludeResourceProgress" "FreeFloat" "TotalFloat" "ConstraintType" "ConstraintDate" "ExcludeFromIntegrations" "NodeType" "MandatoryInvoiceComment"
Specify properties to return, see OData Select

Responses
200 response body for entity array Activity
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})/ActivitySeqRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from ProjectIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
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
Items Enum: "Objstate" "Objstate desc" "ProjectId" "ProjectId desc" "Name" "Name desc" "Description" "Description desc" "PlanStart" "PlanStart desc" "PlanFinish" "PlanFinish desc" "ActualStart" "ActualStart desc" "ActualFinish" "ActualFinish desc" "FrozenDate" "FrozenDate desc" "CloseDate" "CloseDate desc" "CancelDate" "CancelDate desc" "ApprovedDate" "ApprovedDate desc" "Manager" "Manager desc" "CustomerId" "CustomerId desc" "CustomerResponsible" "CustomerResponsible desc" "CustomerProjectId" "CustomerProjectId desc" "Company" "Company desc" "Branch" "Branch desc" "Site" "Site desc" "CalendarId" "CalendarId desc" "ProgramId" "ProgramId desc" "PlannedRevenue" "PlannedRevenue desc" "PlannedCost" "PlannedCost desc" "CurrencyType" "CurrencyType desc" "ProbabilityToWin" "ProbabilityToWin desc" "DefaultCharTemp" "DefaultCharTemp desc" "AccessOnOff" "AccessOnOff desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "BaselineRevisionNumber" "BaselineRevisionNumber desc" "EarnedValueMethod" "EarnedValueMethod desc" "MaterialAllocation" "MaterialAllocation desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "BudgetControlOn" "BudgetControlOn desc" "ControlAsBudgeted" "ControlAsBudgeted desc" "ControlOnTotalBudget" "ControlOnTotalBudget desc" "ProjUniquePurchase" "ProjUniquePurchase desc" "ProjUniqueSale" "ProjUniqueSale desc" "CopiedProject" "CopiedProject desc" "CostStructureId" "CostStructureId desc" "MultiCurrencyBudgeting" "MultiCurrencyBudgeting desc" "ProjectCurrencyType" "ProjectCurrencyType desc" "BudgetCurrencyType" "BudgetCurrencyType desc" "ProjectCurrencyCode" "ProjectCurrencyCode desc" "Category1Id" "Category1Id desc" "Category2Id" "Category2Id desc" "ValidateRemainingAgainst" "ValidateRemainingAgainst desc" "BudgetForecastId" "BudgetForecastId desc" "SelectedForecastId" "SelectedForecastId desc" "SelectedForecastType" "SelectedForecastType desc" "SelectedForecastVersion" "SelectedForecastVersion desc" "ProjectMiscCompMethod" "ProjectMiscCompMethod desc" "InternalRentalPriceList" "InternalRentalPriceList desc" "PlanProjectTransaction" "PlanProjectTransaction desc" "WorkDayToHoursConv" "WorkDayToHoursConv desc" "FinancialProjectExist" "FinancialProjectExist desc" "DefaultCostActivitySeq" "DefaultCostActivitySeq desc" "ExcludeFromBatchInvoice" "ExcludeFromBatchInvoice desc" "ActivitySeq" "ActivitySeq desc" "MandatoryInvoiceComment" "MandatoryInvoiceComment desc" "CashForecastMultiCurr" "CashForecastMultiCurr desc" "BusinessTransactionId" "BusinessTransactionId desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ProjectId" "Name" "Description" "PlanStart" "PlanFinish" "ActualStart" "ActualFinish" "FrozenDate" "CloseDate" "CancelDate" "ApprovedDate" "Manager" "CustomerId" "CustomerResponsible" "CustomerProjectId" "Company" "Branch" "Site" "CalendarId" "ProgramId" "PlannedRevenue" "PlannedCost" "CurrencyType" "ProbabilityToWin" "DefaultCharTemp" "AccessOnOff" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "BaselineRevisionNumber" "EarnedValueMethod" "MaterialAllocation" "FinanciallyResponsible" "BudgetControlOn" "ControlAsBudgeted" "ControlOnTotalBudget" "ProjUniquePurchase" "ProjUniqueSale" "CopiedProject" "CostStructureId" "MultiCurrencyBudgeting" "ProjectCurrencyType" "BudgetCurrencyType" "ProjectCurrencyCode" "Category1Id" "Category2Id" "ValidateRemainingAgainst" "BudgetForecastId" "SelectedForecastId" "SelectedForecastType" "SelectedForecastVersion" "ProjectMiscCompMethod" "InternalRentalPriceList" "PlanProjectTransaction" "WorkDayToHoursConv" "FinancialProjectExist" "DefaultCostActivitySeq" "ExcludeFromBatchInvoice" "ActivitySeq" "MandatoryInvoiceComment" "CashForecastMultiCurr" "BusinessTransactionId"
Specify properties to return, see OData Select

Responses
200 response body for entity array Project
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})/ProjectIdRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from ProgramIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
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
Items Enum: "Objstate" "Objstate desc" "ProgramId" "ProgramId desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ProgramId" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array ProjectProgramGlobal
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})/ProgramIdRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from SubProjectIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
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
Items Enum: "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ParentSubProjectId" "ParentSubProjectId desc" "Description" "Description desc" "Manager" "Manager desc" "Department" "Department desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "ExcludeFromWad" "ExcludeFromWad desc" "AddressId" "AddressId desc" "FinanciallyCompleted" "FinanciallyCompleted desc" "ExcludeFromIntegrations" "ExcludeFromIntegrations desc" "ActivitySeq" "ActivitySeq desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ProjectId" "SubProjectId" "ParentSubProjectId" "Description" "Manager" "Department" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "FinanciallyResponsible" "ExcludeFromWad" "AddressId" "FinanciallyCompleted" "ExcludeFromIntegrations" "ActivitySeq"
Specify properties to return, see OData Select

Responses
200 response body for entity array SubProject
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})/SubProjectIdRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from ActivityNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
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
Items Enum: "Objstate" "Objstate desc" "ActivitySeq" "ActivitySeq desc" "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ActivityNo" "ActivityNo desc" "TotalKeyPath" "TotalKeyPath desc" "ActivityResponsible" "ActivityResponsible desc" "Description" "Description desc" "ManualProgressLevel" "ManualProgressLevel desc" "EstimatedProgress" "EstimatedProgress desc" "ManualProgressCost" "ManualProgressCost desc" "ManualProgressHours" "ManualProgressHours desc" "TotalDurationDays" "TotalDurationDays desc" "TotalWorkDays" "TotalWorkDays desc" "Note" "Note desc" "EarlyStart" "EarlyStart desc" "EarlyFinish" "EarlyFinish desc" "LateStart" "LateStart desc" "LateFinish" "LateFinish desc" "BaseLineEarlyStart" "BaseLineEarlyStart desc" "BaseLineEarlyFinish" "BaseLineEarlyFinish desc" "ActualStart" "ActualStart desc" "ActualFinish" "ActualFinish desc" "CancelDate" "CancelDate desc" "ShortName" "ShortName desc" "ReleasedDate" "ReleasedDate desc" "CompletedDate" "CompletedDate desc" "ClosedDate" "ClosedDate desc" "ProgressMethod" "ProgressMethod desc" "PlannedCostDriver" "PlannedCostDriver desc" "PreAccountingId" "PreAccountingId desc" "ProgressTemplate" "ProgressTemplate desc" "ProgressTemplateStep" "ProgressTemplateStep desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "SetInBaseline" "SetInBaseline desc" "SetActivityChanged" "SetActivityChanged desc" "CaseId" "CaseId desc" "TaskId" "TaskId desc" "ActMilestone" "ActMilestone desc" "BaselinePcd" "BaselinePcd desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "AmountPlanned" "AmountPlanned desc" "AmountUsed" "AmountUsed desc" "ExcludeFromWad" "ExcludeFromWad desc" "GenerateSafetyStock" "GenerateSafetyStock desc" "HoursPlanned" "HoursPlanned desc" "AddressId" "AddressId desc" "BaselineTotalWorkDays" "BaselineTotalWorkDays desc" "ExcludePeriodicalCap" "ExcludePeriodicalCap desc" "FinanciallyCompleted" "FinanciallyCompleted desc" "ExcludeResourceProgress" "ExcludeResourceProgress desc" "FreeFloat" "FreeFloat desc" "TotalFloat" "TotalFloat desc" "ConstraintType" "ConstraintType desc" "ConstraintDate" "ConstraintDate desc" "ExcludeFromIntegrations" "ExcludeFromIntegrations desc" "NodeType" "NodeType desc" "MandatoryInvoiceComment" "MandatoryInvoiceComment desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ActivitySeq" "ProjectId" "SubProjectId" "ActivityNo" "TotalKeyPath" "ActivityResponsible" "Description" "ManualProgressLevel" "EstimatedProgress" "ManualProgressCost" "ManualProgressHours" "TotalDurationDays" "TotalWorkDays" "Note" "EarlyStart" "EarlyFinish" "LateStart" "LateFinish" "BaseLineEarlyStart" "BaseLineEarlyFinish" "ActualStart" "ActualFinish" "CancelDate" "ShortName" "ReleasedDate" "CompletedDate" "ClosedDate" "ProgressMethod" "PlannedCostDriver" "PreAccountingId" "ProgressTemplate" "ProgressTemplateStep" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "SetInBaseline" "SetActivityChanged" "CaseId" "TaskId" "ActMilestone" "BaselinePcd" "FinanciallyResponsible" "AmountPlanned" "AmountUsed" "ExcludeFromWad" "GenerateSafetyStock" "HoursPlanned" "AddressId" "BaselineTotalWorkDays" "ExcludePeriodicalCap" "FinanciallyCompleted" "ExcludeResourceProgress" "FreeFloat" "TotalFloat" "ConstraintType" "ConstraintDate" "ExcludeFromIntegrations" "NodeType" "MandatoryInvoiceComment"
Specify properties to return, see OData Select

Responses
200 response body for entity array Activity
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})/ActivityNoRef

Response samples
200403405500501503504
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
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
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
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})/PartCatalogRef

Response samples
200403405500501503504
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
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "Description" "Description desc" "DimQuality" "DimQuality desc" "SupplyCode" "SupplyCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description" "DimQuality" "SupplyCode"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryPartLovMrp
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})/PartNoRef

Response samples
200403405500501503504
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
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
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
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})/UnitMeasRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from COriginShortageRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
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
Items Enum: "Objstate" "Objstate desc" "Id" "Id desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Id" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array COriginShortage
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})/COriginShortageRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CProjectIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
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
Items Enum: "Objstate" "Objstate desc" "ProjectId" "ProjectId desc" "Name" "Name desc" "Description" "Description desc" "PlanStart" "PlanStart desc" "PlanFinish" "PlanFinish desc" "ActualStart" "ActualStart desc" "ActualFinish" "ActualFinish desc" "FrozenDate" "FrozenDate desc" "CloseDate" "CloseDate desc" "CancelDate" "CancelDate desc" "ApprovedDate" "ApprovedDate desc" "Manager" "Manager desc" "CustomerId" "CustomerId desc" "CustomerResponsible" "CustomerResponsible desc" "CustomerProjectId" "CustomerProjectId desc" "Company" "Company desc" "Branch" "Branch desc" "Site" "Site desc" "CalendarId" "CalendarId desc" "ProgramId" "ProgramId desc" "PlannedRevenue" "PlannedRevenue desc" "PlannedCost" "PlannedCost desc" "CurrencyType" "CurrencyType desc" "ProbabilityToWin" "ProbabilityToWin desc" "DefaultCharTemp" "DefaultCharTemp desc" "AccessOnOff" "AccessOnOff desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "BaselineRevisionNumber" "BaselineRevisionNumber desc" "EarnedValueMethod" "EarnedValueMethod desc" "MaterialAllocation" "MaterialAllocation desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "BudgetControlOn" "BudgetControlOn desc" "ControlAsBudgeted" "ControlAsBudgeted desc" "ControlOnTotalBudget" "ControlOnTotalBudget desc" "ProjUniquePurchase" "ProjUniquePurchase desc" "ProjUniqueSale" "ProjUniqueSale desc" "CopiedProject" "CopiedProject desc" "CostStructureId" "CostStructureId desc" "MultiCurrencyBudgeting" "MultiCurrencyBudgeting desc" "ProjectCurrencyType" "ProjectCurrencyType desc" "BudgetCurrencyType" "BudgetCurrencyType desc" "ProjectCurrencyCode" "ProjectCurrencyCode desc" "Category1Id" "Category1Id desc" "Category2Id" "Category2Id desc" "ValidateRemainingAgainst" "ValidateRemainingAgainst desc" "BudgetForecastId" "BudgetForecastId desc" "SelectedForecastId" "SelectedForecastId desc" "SelectedForecastType" "SelectedForecastType desc" "SelectedForecastVersion" "SelectedForecastVersion desc" "ProjectMiscCompMethod" "ProjectMiscCompMethod desc" "InternalRentalPriceList" "InternalRentalPriceList desc" "PlanProjectTransaction" "PlanProjectTransaction desc" "WorkDayToHoursConv" "WorkDayToHoursConv desc" "FinancialProjectExist" "FinancialProjectExist desc" "DefaultCostActivitySeq" "DefaultCostActivitySeq desc" "ExcludeFromBatchInvoice" "ExcludeFromBatchInvoice desc" "ActivitySeq" "ActivitySeq desc" "MandatoryInvoiceComment" "MandatoryInvoiceComment desc" "CashForecastMultiCurr" "CashForecastMultiCurr desc" "BusinessTransactionId" "BusinessTransactionId desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ProjectId" "Name" "Description" "PlanStart" "PlanFinish" "ActualStart" "ActualFinish" "FrozenDate" "CloseDate" "CancelDate" "ApprovedDate" "Manager" "CustomerId" "CustomerResponsible" "CustomerProjectId" "Company" "Branch" "Site" "CalendarId" "ProgramId" "PlannedRevenue" "PlannedCost" "CurrencyType" "ProbabilityToWin" "DefaultCharTemp" "AccessOnOff" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "BaselineRevisionNumber" "EarnedValueMethod" "MaterialAllocation" "FinanciallyResponsible" "BudgetControlOn" "ControlAsBudgeted" "ControlOnTotalBudget" "ProjUniquePurchase" "ProjUniqueSale" "CopiedProject" "CostStructureId" "MultiCurrencyBudgeting" "ProjectCurrencyType" "BudgetCurrencyType" "ProjectCurrencyCode" "Category1Id" "Category2Id" "ValidateRemainingAgainst" "BudgetForecastId" "SelectedForecastId" "SelectedForecastType" "SelectedForecastVersion" "ProjectMiscCompMethod" "InternalRentalPriceList" "PlanProjectTransaction" "WorkDayToHoursConv" "FinancialProjectExist" "DefaultCostActivitySeq" "ExcludeFromBatchInvoice" "ActivitySeq" "MandatoryInvoiceComment" "CashForecastMultiCurr" "BusinessTransactionId"
Specify properties to return, see OData Select

Responses
200 response body for entity array Project
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})/CProjectIdRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CActivityNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
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
Items Enum: "Objstate" "Objstate desc" "ActivitySeq" "ActivitySeq desc" "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ActivityNo" "ActivityNo desc" "TotalKeyPath" "TotalKeyPath desc" "ActivityResponsible" "ActivityResponsible desc" "Description" "Description desc" "ManualProgressLevel" "ManualProgressLevel desc" "EstimatedProgress" "EstimatedProgress desc" "ManualProgressCost" "ManualProgressCost desc" "ManualProgressHours" "ManualProgressHours desc" "TotalDurationDays" "TotalDurationDays desc" "TotalWorkDays" "TotalWorkDays desc" "Note" "Note desc" "EarlyStart" "EarlyStart desc" "EarlyFinish" "EarlyFinish desc" "LateStart" "LateStart desc" "LateFinish" "LateFinish desc" "BaseLineEarlyStart" "BaseLineEarlyStart desc" "BaseLineEarlyFinish" "BaseLineEarlyFinish desc" "ActualStart" "ActualStart desc" "ActualFinish" "ActualFinish desc" "CancelDate" "CancelDate desc" "ShortName" "ShortName desc" "ReleasedDate" "ReleasedDate desc" "CompletedDate" "CompletedDate desc" "ClosedDate" "ClosedDate desc" "ProgressMethod" "ProgressMethod desc" "PlannedCostDriver" "PlannedCostDriver desc" "PreAccountingId" "PreAccountingId desc" "ProgressTemplate" "ProgressTemplate desc" "ProgressTemplateStep" "ProgressTemplateStep desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "SetInBaseline" "SetInBaseline desc" "SetActivityChanged" "SetActivityChanged desc" "CaseId" "CaseId desc" "TaskId" "TaskId desc" "ActMilestone" "ActMilestone desc" "BaselinePcd" "BaselinePcd desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "AmountPlanned" "AmountPlanned desc" "AmountUsed" "AmountUsed desc" "ExcludeFromWad" "ExcludeFromWad desc" "GenerateSafetyStock" "GenerateSafetyStock desc" "HoursPlanned" "HoursPlanned desc" "AddressId" "AddressId desc" "BaselineTotalWorkDays" "BaselineTotalWorkDays desc" "ExcludePeriodicalCap" "ExcludePeriodicalCap desc" "FinanciallyCompleted" "FinanciallyCompleted desc" "ExcludeResourceProgress" "ExcludeResourceProgress desc" "FreeFloat" "FreeFloat desc" "TotalFloat" "TotalFloat desc" "ConstraintType" "ConstraintType desc" "ConstraintDate" "ConstraintDate desc" "ExcludeFromIntegrations" "ExcludeFromIntegrations desc" "NodeType" "NodeType desc" "MandatoryInvoiceComment" "MandatoryInvoiceComment desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ActivitySeq" "ProjectId" "SubProjectId" "ActivityNo" "TotalKeyPath" "ActivityResponsible" "Description" "ManualProgressLevel" "EstimatedProgress" "ManualProgressCost" "ManualProgressHours" "TotalDurationDays" "TotalWorkDays" "Note" "EarlyStart" "EarlyFinish" "LateStart" "LateFinish" "BaseLineEarlyStart" "BaseLineEarlyFinish" "ActualStart" "ActualFinish" "CancelDate" "ShortName" "ReleasedDate" "CompletedDate" "ClosedDate" "ProgressMethod" "PlannedCostDriver" "PreAccountingId" "ProgressTemplate" "ProgressTemplateStep" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "SetInBaseline" "SetActivityChanged" "CaseId" "TaskId" "ActMilestone" "BaselinePcd" "FinanciallyResponsible" "AmountPlanned" "AmountUsed" "ExcludeFromWad" "GenerateSafetyStock" "HoursPlanned" "AddressId" "BaselineTotalWorkDays" "ExcludePeriodicalCap" "FinanciallyCompleted" "ExcludeResourceProgress" "FreeFloat" "TotalFloat" "ConstraintType" "ConstraintDate" "ExcludeFromIntegrations" "NodeType" "MandatoryInvoiceComment"
Specify properties to return, see OData Select

Responses
200 response body for entity array Activity
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})/CActivityNoRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from CActivitySeqRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
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
Items Enum: "Objstate" "Objstate desc" "ActivitySeq" "ActivitySeq desc" "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ActivityNo" "ActivityNo desc" "TotalKeyPath" "TotalKeyPath desc" "ActivityResponsible" "ActivityResponsible desc" "Description" "Description desc" "ManualProgressLevel" "ManualProgressLevel desc" "EstimatedProgress" "EstimatedProgress desc" "ManualProgressCost" "ManualProgressCost desc" "ManualProgressHours" "ManualProgressHours desc" "TotalDurationDays" "TotalDurationDays desc" "TotalWorkDays" "TotalWorkDays desc" "Note" "Note desc" "EarlyStart" "EarlyStart desc" "EarlyFinish" "EarlyFinish desc" "LateStart" "LateStart desc" "LateFinish" "LateFinish desc" "BaseLineEarlyStart" "BaseLineEarlyStart desc" "BaseLineEarlyFinish" "BaseLineEarlyFinish desc" "ActualStart" "ActualStart desc" "ActualFinish" "ActualFinish desc" "CancelDate" "CancelDate desc" "ShortName" "ShortName desc" "ReleasedDate" "ReleasedDate desc" "CompletedDate" "CompletedDate desc" "ClosedDate" "ClosedDate desc" "ProgressMethod" "ProgressMethod desc" "PlannedCostDriver" "PlannedCostDriver desc" "PreAccountingId" "PreAccountingId desc" "ProgressTemplate" "ProgressTemplate desc" "ProgressTemplateStep" "ProgressTemplateStep desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "SetInBaseline" "SetInBaseline desc" "SetActivityChanged" "SetActivityChanged desc" "CaseId" "CaseId desc" "TaskId" "TaskId desc" "ActMilestone" "ActMilestone desc" "BaselinePcd" "BaselinePcd desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "AmountPlanned" "AmountPlanned desc" "AmountUsed" "AmountUsed desc" "ExcludeFromWad" "ExcludeFromWad desc" "GenerateSafetyStock" "GenerateSafetyStock desc" "HoursPlanned" "HoursPlanned desc" "AddressId" "AddressId desc" "BaselineTotalWorkDays" "BaselineTotalWorkDays desc" "ExcludePeriodicalCap" "ExcludePeriodicalCap desc" "FinanciallyCompleted" "FinanciallyCompleted desc" "ExcludeResourceProgress" "ExcludeResourceProgress desc" "FreeFloat" "FreeFloat desc" "TotalFloat" "TotalFloat desc" "ConstraintType" "ConstraintType desc" "ConstraintDate" "ConstraintDate desc" "ExcludeFromIntegrations" "ExcludeFromIntegrations desc" "NodeType" "NodeType desc" "MandatoryInvoiceComment" "MandatoryInvoiceComment desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ActivitySeq" "ProjectId" "SubProjectId" "ActivityNo" "TotalKeyPath" "ActivityResponsible" "Description" "ManualProgressLevel" "EstimatedProgress" "ManualProgressCost" "ManualProgressHours" "TotalDurationDays" "TotalWorkDays" "Note" "EarlyStart" "EarlyFinish" "LateStart" "LateFinish" "BaseLineEarlyStart" "BaseLineEarlyFinish" "ActualStart" "ActualFinish" "CancelDate" "ShortName" "ReleasedDate" "CompletedDate" "ClosedDate" "ProgressMethod" "PlannedCostDriver" "PreAccountingId" "ProgressTemplate" "ProgressTemplateStep" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "SetInBaseline" "SetActivityChanged" "CaseId" "TaskId" "ActMilestone" "BaselinePcd" "FinanciallyResponsible" "AmountPlanned" "AmountUsed" "ExcludeFromWad" "GenerateSafetyStock" "HoursPlanned" "AddressId" "BaselineTotalWorkDays" "ExcludePeriodicalCap" "FinanciallyCompleted" "ExcludeResourceProgress" "FreeFloat" "TotalFloat" "ConstraintType" "ConstraintDate" "ExcludeFromIntegrations" "NodeType" "MandatoryInvoiceComment"
Specify properties to return, see OData Select

Responses
200 response body for entity array Activity
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialRequisitionLineSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})/CActivitySeqRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
MaterialRequisReservatSet
Get entities from MaterialRequisReservatSet
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
Items Enum: "OrderClass" "OrderClass desc" "OrderNo" "OrderNo desc" "LineNo" "LineNo desc" "ReleaseNo" "ReleaseNo desc" "LineItemNo" "LineItemNo desc" "PartNo" "PartNo desc" "Contract" "Contract desc" "ConfigurationId" "ConfigurationId desc" "LocationNo" "LocationNo desc" "LotBatchNo" "LotBatchNo desc" "SerialNo" "SerialNo desc" "WaivDevRejNo" "WaivDevRejNo desc" "EngChgLevel" "EngChgLevel desc" "ActivitySeq" "ActivitySeq desc" "HandlingUnitId" "HandlingUnitId desc" "QtyAssigned" "QtyAssigned desc" "QtyIssued" "QtyIssued desc" "Source" "Source desc" "LastActivityDate" "LastActivityDate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "OrderClass" "OrderNo" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "Contract" "ConfigurationId" "LocationNo" "LotBatchNo" "SerialNo" "WaivDevRejNo" "EngChgLevel" "ActivitySeq" "HandlingUnitId" "QtyAssigned" "QtyIssued" "Source" "LastActivityDate"
Specify properties to return, see OData Select

Responses
200 response body for entity array MaterialRequisReservat
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialRequisReservatSet

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Add new entity to MaterialRequisReservatSet
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "OrderClass" "OrderNo" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "Contract" "ConfigurationId" "LocationNo" "LotBatchNo" "SerialNo" "WaivDevRejNo" "EngChgLevel" "ActivitySeq" "HandlingUnitId" "QtyAssigned" "QtyIssued" "Source" "LastActivityDate"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type MaterialRequisReservat

OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
LineNo
required
string <= 4 characters
ReleaseNo
required
string <= 4 characters
LineItemNo
required
number
PartNo
required
string <= 25 characters
Contract
required
string <= 5 characters
ConfigurationId
required
string <= 50 characters
LocationNo
required
string <= 35 characters
LotBatchNo
required
string <= 20 characters
SerialNo
required
string <= 50 characters
WaivDevRejNo
required
string <= 15 characters
EngChgLevel
required
string <= 6 characters
ActivitySeq
required
number
HandlingUnitId
required
number
QtyAssigned
required
number
QtyIssued
required
number
Source	
string <= 25 characters
LastActivityDate
required
string <date-time>
Responses
201 response body for entity type MaterialRequisReservat
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/MaterialRequisReservatSet

Request samples
Payload
Content type
application/json

Copy
{
"OrderClass": "INT",
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"ConfigurationId": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNo": "It is a Text",
"WaivDevRejNo": "It is a Text",
"EngChgLevel": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"QtyAssigned": 1,
"QtyIssued": 1,
"Source": "It is a Text",
"LastActivityDate": "2019-10-01T01:01:01Z"
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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"ConfigurationId": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNo": "It is a Text",
"WaivDevRejNo": "It is a Text",
"EngChgLevel": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"QtyAssigned": 1,
"QtyIssued": 1,
"Source": "It is a Text",
"LastActivityDate": "2019-10-01T01:01:01Z",
"OrderClass": "INT"
}
Get entity from MaterialRequisReservatSet by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
required
number
Example: 1
PartNo
required
string <= 25 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
ConfigurationId
required
string <= 50 characters
Example: It is a Text
LocationNo
required
string <= 35 characters
Example: It is a Text
LotBatchNo
required
string <= 20 characters
Example: It is a Text
SerialNo
required
string <= 50 characters
Example: It is a Text
WaivDevRejNo
required
string <= 15 characters
Example: It is a Text
EngChgLevel
required
string <= 6 characters
Example: It is a Text
ActivitySeq
required
number
Example: 1
HandlingUnitId
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "OrderClass" "OrderNo" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "Contract" "ConfigurationId" "LocationNo" "LotBatchNo" "SerialNo" "WaivDevRejNo" "EngChgLevel" "ActivitySeq" "HandlingUnitId" "QtyAssigned" "QtyIssued" "Source" "LastActivityDate"
Specify properties to return, see OData Select

Responses
200 response body for entity type MaterialRequisReservat
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialRequisReservatSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo},PartNo='{PartNo}',Contract='{Contract}',ConfigurationId='{ConfigurationId}',LocationNo='{LocationNo}',LotBatchNo='{LotBatchNo}',SerialNo='{SerialNo}',WaivDevRejNo='{WaivDevRejNo}',EngChgLevel='{EngChgLevel}',ActivitySeq={ActivitySeq},HandlingUnitId={HandlingUnitId})

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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"ConfigurationId": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNo": "It is a Text",
"WaivDevRejNo": "It is a Text",
"EngChgLevel": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"QtyAssigned": 1,
"QtyIssued": 1,
"Source": "It is a Text",
"LastActivityDate": "2019-10-01T01:01:01Z",
"OrderClass": "INT"
}
Delete entity from MaterialRequisReservatSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
required
number
Example: 1
PartNo
required
string <= 25 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
ConfigurationId
required
string <= 50 characters
Example: It is a Text
LocationNo
required
string <= 35 characters
Example: It is a Text
LotBatchNo
required
string <= 20 characters
Example: It is a Text
SerialNo
required
string <= 50 characters
Example: It is a Text
WaivDevRejNo
required
string <= 15 characters
Example: It is a Text
EngChgLevel
required
string <= 6 characters
Example: It is a Text
ActivitySeq
required
number
Example: 1
HandlingUnitId
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
/MaterialRequisReservatSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo},PartNo='{PartNo}',Contract='{Contract}',ConfigurationId='{ConfigurationId}',LocationNo='{LocationNo}',LotBatchNo='{LotBatchNo}',SerialNo='{SerialNo}',WaivDevRejNo='{WaivDevRejNo}',EngChgLevel='{EngChgLevel}',ActivitySeq={ActivitySeq},HandlingUnitId={HandlingUnitId})

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
Update entity in MaterialRequisReservatSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
required
number
Example: 1
PartNo
required
string <= 25 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
ConfigurationId
required
string <= 50 characters
Example: It is a Text
LocationNo
required
string <= 35 characters
Example: It is a Text
LotBatchNo
required
string <= 20 characters
Example: It is a Text
SerialNo
required
string <= 50 characters
Example: It is a Text
WaivDevRejNo
required
string <= 15 characters
Example: It is a Text
EngChgLevel
required
string <= 6 characters
Example: It is a Text
ActivitySeq
required
number
Example: 1
HandlingUnitId
required
number
Example: 1
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "OrderClass" "OrderNo" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "Contract" "ConfigurationId" "LocationNo" "LotBatchNo" "SerialNo" "WaivDevRejNo" "EngChgLevel" "ActivitySeq" "HandlingUnitId" "QtyAssigned" "QtyIssued" "Source" "LastActivityDate"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type MaterialRequisReservat

QtyAssigned
required
number
QtyIssued
required
number
Source	
string <= 25 characters
LastActivityDate
required
string <date-time>
Responses
200 response body for entity type MaterialRequisReservat
201 response body for entity type MaterialRequisReservat
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
/MaterialRequisReservatSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo},PartNo='{PartNo}',Contract='{Contract}',ConfigurationId='{ConfigurationId}',LocationNo='{LocationNo}',LotBatchNo='{LotBatchNo}',SerialNo='{SerialNo}',WaivDevRejNo='{WaivDevRejNo}',EngChgLevel='{EngChgLevel}',ActivitySeq={ActivitySeq},HandlingUnitId={HandlingUnitId})

Request samples
Payload
Content type
application/json

Copy
{
"QtyAssigned": 1,
"QtyIssued": 1,
"Source": "It is a Text",
"LastActivityDate": "2019-10-01T01:01:01Z"
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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"ConfigurationId": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNo": "It is a Text",
"WaivDevRejNo": "It is a Text",
"EngChgLevel": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"QtyAssigned": 1,
"QtyIssued": 1,
"Source": "It is a Text",
"LastActivityDate": "2019-10-01T01:01:01Z",
"OrderClass": "INT"
}
Invoke function DefaultCopy
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string <= 12 characters
Example: It is a Text
LineNo
required
string <= 4 characters
Example: It is a Text
ReleaseNo
required
string <= 4 characters
Example: It is a Text
LineItemNo
required
number
Example: 1
PartNo
required
string <= 25 characters
Example: It is a Text
Contract
required
string <= 5 characters
Example: It is a Text
ConfigurationId
required
string <= 50 characters
Example: It is a Text
LocationNo
required
string <= 35 characters
Example: It is a Text
LotBatchNo
required
string <= 20 characters
Example: It is a Text
SerialNo
required
string <= 50 characters
Example: It is a Text
WaivDevRejNo
required
string <= 15 characters
Example: It is a Text
EngChgLevel
required
string <= 6 characters
Example: It is a Text
ActivitySeq
required
number
Example: 1
HandlingUnitId
required
number
Example: 1
query Parameters
@CopyValues
required
object (MaterialRequisReservatCopyValues)
$select	
Array of strings unique
Items Enum: "luname" "keyref" "OrderClass" "OrderNo" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "Contract" "ConfigurationId" "LocationNo" "LotBatchNo" "SerialNo" "WaivDevRejNo" "EngChgLevel" "ActivitySeq" "HandlingUnitId" "QtyAssigned" "QtyIssued" "Source" "LastActivityDate"
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
/MaterialRequisReservatSet(OrderClass=IfsApp.MaterialRequisitionLinesHandling.MaterialRequisType'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo},PartNo='{PartNo}',Contract='{Contract}',ConfigurationId='{ConfigurationId}',LocationNo='{LocationNo}',LotBatchNo='{LotBatchNo}',SerialNo='{SerialNo}',WaivDevRejNo='{WaivDevRejNo}',EngChgLevel='{EngChgLevel}',ActivitySeq={ActivitySeq},HandlingUnitId={HandlingUnitId})/IfsApp.MaterialRequisitionLinesHandling.MaterialRequisReservat_DefaultCopy(CopyValues=@CopyValues)

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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"ConfigurationId": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNo": "It is a Text",
"WaivDevRejNo": "It is a Text",
"EngChgLevel": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"QtyAssigned": 1,
"QtyIssued": 1,
"Source": "It is a Text",
"LastActivityDate": "2019-10-01T01:01:01Z",
"OrderClass": "INT"
}
Invoke function DefaultCopy
Authorizations:
(OpenIdbasicAuth)
query Parameters
@CopyValues
required
object (MaterialRequisReservatCopyValues)
$select	
Array of strings unique
Items Enum: "luname" "keyref" "OrderClass" "OrderNo" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "Contract" "ConfigurationId" "LocationNo" "LotBatchNo" "SerialNo" "WaivDevRejNo" "EngChgLevel" "ActivitySeq" "HandlingUnitId" "QtyAssigned" "QtyIssued" "Source" "LastActivityDate"
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
/MaterialRequisReservatSet/IfsApp.MaterialRequisitionLinesHandling.MaterialRequisReservat_DefaultCopy(CopyValues=@CopyValues)

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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"ConfigurationId": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNo": "It is a Text",
"WaivDevRejNo": "It is a Text",
"EngChgLevel": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"QtyAssigned": 1,
"QtyIssued": 1,
"Source": "It is a Text",
"LastActivityDate": "2019-10-01T01:01:01Z",
"OrderClass": "INT"
}
Invoke function Default
Authorizations:
(OpenIdbasicAuth)
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "OrderClass" "OrderNo" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "Contract" "ConfigurationId" "LocationNo" "LotBatchNo" "SerialNo" "WaivDevRejNo" "EngChgLevel" "ActivitySeq" "HandlingUnitId" "QtyAssigned" "QtyIssued" "Source" "LastActivityDate"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type MaterialRequisReservat
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MaterialRequisReservatSet/IfsApp.MaterialRequisitionLinesHandling.MaterialRequisReservat_Default()

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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"ConfigurationId": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNo": "It is a Text",
"WaivDevRejNo": "It is a Text",
"EngChgLevel": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"QtyAssigned": 1,
"QtyIssued": 1,
"Source": "It is a Text",
"LastActivityDate": "2019-10-01T01:01:01Z",
"OrderClass": "INT"
}
ManualIssueSet
Get entities from ManualIssueSet
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "OrderNo" "OrderNo desc" "OrderClass" "OrderClass desc" "LineNo" "LineNo desc" "ReleaseNo" "ReleaseNo desc" "LineItemNo" "LineItemNo desc" "PartNo" "PartNo desc" "CatchUnitMeas" "CatchUnitMeas desc" "Contract" "Contract desc" "QtyLeft" "QtyLeft desc" "ActivitySeq" "ActivitySeq desc" "ProjectId" "ProjectId desc" "LinesReadyToIssue" "LinesReadyToIssue desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "OrderNo" "OrderClass" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "CatchUnitMeas" "Contract" "QtyLeft" "ActivitySeq" "ProjectId" "LinesReadyToIssue"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "PartNoRef" "ActivitySeqRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ManualIssueVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualIssueSet

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Add new entity to ManualIssueSet
Authorizations:
(OpenIdbasicAuth)
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "OrderNo" "OrderClass" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "CatchUnitMeas" "Contract" "QtyLeft" "ActivitySeq" "ProjectId" "LinesReadyToIssue"
Specify properties to return, using the query parameter select-fields

Request Body schema: application/json
request body for inserting entity type ManualIssueVirtual

ParentObjkey	
string <= 50 characters
ObjCreatedBy	
string <= 50 characters
OrderNo	
string <= 4000 characters
OrderClass	
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
LineNo	
string <= 4000 characters
ReleaseNo	
string <= 4000 characters
LineItemNo	
number
PartNo	
string <= 4000 characters
CatchUnitMeas	
string <= 4000 characters
Contract	
string <= 4000 characters
QtyLeft	
number
ActivitySeq	
number
ProjectId	
string <= 4000 characters
LinesReadyToIssue	
string <= 4000 characters
Responses
201 response body for entity type ManualIssueVirtual
204 No Content
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/ManualIssueSet

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"ObjCreatedBy": "It is a Text",
"OrderNo": "It is a Text",
"OrderClass": "INT",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"CatchUnitMeas": "It is a Text",
"Contract": "It is a Text",
"QtyLeft": 1,
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"LinesReadyToIssue": "It is a Text"
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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"CatchUnitMeas": "It is a Text",
"Contract": "It is a Text",
"QtyLeft": 1,
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"LinesReadyToIssue": "It is a Text",
"OrderClass": "INT"
}
Get entity from ManualIssueSet by key
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "OrderNo" "OrderClass" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "CatchUnitMeas" "Contract" "QtyLeft" "ActivitySeq" "ProjectId" "LinesReadyToIssue"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "PartNoRef" "ActivitySeqRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type ManualIssueVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualIssueSet(Objkey='{Objkey}')

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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"CatchUnitMeas": "It is a Text",
"Contract": "It is a Text",
"QtyLeft": 1,
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"LinesReadyToIssue": "It is a Text",
"OrderClass": "INT"
}
Delete entity from ManualIssueSet
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
/ManualIssueSet(Objkey='{Objkey}')

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
Update entity in ManualIssueSet
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "OrderNo" "OrderClass" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "CatchUnitMeas" "Contract" "QtyLeft" "ActivitySeq" "ProjectId" "LinesReadyToIssue"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type ManualIssueVirtual

OrderNo	
string <= 4000 characters
OrderClass	
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
LineNo	
string <= 4000 characters
ReleaseNo	
string <= 4000 characters
LineItemNo	
number
PartNo	
string <= 4000 characters
CatchUnitMeas	
string <= 4000 characters
Contract	
string <= 4000 characters
QtyLeft	
number
ActivitySeq	
number
ProjectId	
string <= 4000 characters
LinesReadyToIssue	
string <= 4000 characters
Responses
200 response body for entity type ManualIssueVirtual
201 response body for entity type ManualIssueVirtual
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
/ManualIssueSet(Objkey='{Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"OrderNo": "It is a Text",
"OrderClass": "INT",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"CatchUnitMeas": "It is a Text",
"Contract": "It is a Text",
"QtyLeft": 1,
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"LinesReadyToIssue": "It is a Text"
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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"CatchUnitMeas": "It is a Text",
"Contract": "It is a Text",
"QtyLeft": 1,
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"LinesReadyToIssue": "It is a Text",
"OrderClass": "INT"
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
/ManualIssueSet(Objkey='{Objkey}')/IfsApp.MaterialRequisitionLinesHandling.ManualIssueVirtual_CleanupVirtualEntity

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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "OrderNo" "OrderClass" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "CatchUnitMeas" "Contract" "QtyLeft" "ActivitySeq" "ProjectId" "LinesReadyToIssue"
Specify properties to return, see OData Select

header Parameters
If-Match
required
string
E-Tag

Responses
200 response body for entity type ManualIssueVirtual
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualIssueSet/IfsApp.MaterialRequisitionLinesHandling.ManualIssueVirtual_Default()

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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"CatchUnitMeas": "It is a Text",
"Contract": "It is a Text",
"QtyLeft": 1,
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"LinesReadyToIssue": "It is a Text",
"OrderClass": "INT"
}
Get entities from PartInStockToIssueArray
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "QtyToIssue" "QtyToIssue desc" "QtyAssigned" "QtyAssigned desc" "CatchQtyToIssue" "CatchQtyToIssue desc" "LocationNo" "LocationNo desc" "HandlingUnitId" "HandlingUnitId desc" "Warehouse" "Warehouse desc" "BayNo" "BayNo desc" "RowNo" "RowNo desc" "TierNo" "TierNo desc" "BinNo" "BinNo desc" "PartNo" "PartNo desc" "Contract" "Contract desc" "LotBatchNo" "LotBatchNo desc" "SerialNo" "SerialNo desc" "ConditionCode" "ConditionCode desc" "EngChgLevel" "EngChgLevel desc" "WaivDevRejNo" "WaivDevRejNo desc" "ProjectId" "ProjectId desc" "ActivitySeq" "ActivitySeq desc" "TopParentHandlingUnitId" "TopParentHandlingUnitId desc" "TopParentHuTypeId" "TopParentHuTypeId desc" "TopParentSscc" "TopParentSscc desc" "TopParentAltHuLabelId" "TopParentAltHuLabelId desc" "AvailabilityControlId" "AvailabilityControlId desc" "ConfigurationId" "ConfigurationId desc" "ReceiptIssueSerialTrack" "ReceiptIssueSerialTrack desc" "PartTrackingSessionId" "PartTrackingSessionId desc" "ProgramId" "ProgramId desc" "ProgramDescription" "ProgramDescription desc" "ProjectName" "ProjectName desc" "SubProjectId" "SubProjectId desc" "SubProjectDescription" "SubProjectDescription desc" "ActivityNo" "ActivityNo desc" "ActivityDescription" "ActivityDescription desc" "HandlingUnitTypeId" "HandlingUnitTypeId desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "QtyToIssue" "QtyAssigned" "CatchQtyToIssue" "LocationNo" "HandlingUnitId" "Warehouse" "BayNo" "RowNo" "TierNo" "BinNo" "PartNo" "Contract" "LotBatchNo" "SerialNo" "ConditionCode" "EngChgLevel" "WaivDevRejNo" "ProjectId" "ActivitySeq" "TopParentHandlingUnitId" "TopParentHuTypeId" "TopParentSscc" "TopParentAltHuLabelId" "AvailabilityControlId" "ConfigurationId" "ReceiptIssueSerialTrack" "PartTrackingSessionId" "ProgramId" "ProgramDescription" "ProjectName" "SubProjectId" "SubProjectDescription" "ActivityNo" "ActivityDescription" "HandlingUnitTypeId"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "HandlingUnitIdRef" "HandlingUnitTypeIdRef" "ConditionCodeRef" "ActivitySeqRef" "ProjectIdRef" "ProgramIdRef" "SubProjectIdRef" "ActivityNoRef" "AvailabilityControlIdRef" "TopParentHuTypeIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array InvPartInStockToIssueVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualIssueSet(Objkey='{Objkey}')/PartInStockToIssueArray

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from PartInStockToIssueArray by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInStockToIssueArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "OrderNo" "OrderClass" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "CatchUnitMeas" "Contract" "QtyLeft" "ActivitySeq" "ProjectId" "LinesReadyToIssue"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "PartNoRef" "ActivitySeqRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type InvPartInStockToIssueVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualIssueSet(Objkey='{Objkey}')/PartInStockToIssueArray(Objkey='{PartInStockToIssueArray_Objkey}')

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
"QtyToIssue": 1,
"QtyAssigned": 1,
"CatchQtyToIssue": 1,
"LocationNo": "It is a Text",
"HandlingUnitId": 1,
"Warehouse": "It is a Text",
"BayNo": "It is a Text",
"RowNo": "It is a Text",
"TierNo": "It is a Text",
"BinNo": "It is a Text",
"PartNo": "It is a Text",
"Contract": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNo": "It is a Text",
"ConditionCode": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ProjectId": "It is a Text",
"ActivitySeq": 1,
"TopParentHandlingUnitId": 1,
"TopParentHuTypeId": "It is a Text",
"TopParentSscc": "It is a Text",
"TopParentAltHuLabelId": "It is a Text",
"AvailabilityControlId": "It is a Text",
"ConfigurationId": "It is a Text",
"ReceiptIssueSerialTrack": "It is a Text",
"PartTrackingSessionId": 1,
"ProgramId": "It is a Text",
"ProgramDescription": "It is a Text",
"ProjectName": "It is a Text",
"SubProjectId": "It is a Text",
"SubProjectDescription": "It is a Text",
"ActivityNo": "It is a Text",
"ActivityDescription": "It is a Text",
"HandlingUnitTypeId": "It is a Text"
}
Update entity in PartInStockToIssueArray
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInStockToIssueArray_Objkey
required
string <= 50 characters
Example: It is a Text
key: Objkey

query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "OrderNo" "OrderClass" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "CatchUnitMeas" "Contract" "QtyLeft" "ActivitySeq" "ProjectId" "LinesReadyToIssue"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type InvPartInStockToIssueVirtual

QtyToIssue	
number
QtyAssigned	
number
CatchQtyToIssue	
number
LocationNo	
string <= 35 characters
HandlingUnitId
required
number
Warehouse	
string <= 15 characters
BayNo	
string <= 5 characters
RowNo	
string <= 5 characters
TierNo	
string <= 5 characters
BinNo	
string <= 5 characters
PartNo
required
string <= 25 characters
Contract
required
string <= 5 characters
LotBatchNo
required
string <= 20 characters
SerialNo
required
string <= 50 characters
ConditionCode	
string <= 10 characters
EngChgLevel
required
string <= 6 characters
WaivDevRejNo
required
string <= 15 characters
ProjectId	
string <= 10 characters
ActivitySeq	
number <= 10
TopParentHandlingUnitId	
number <= 2000
TopParentHuTypeId	
string <= 2000 characters
TopParentSscc	
string <= 2000 characters
TopParentAltHuLabelId	
string <= 2000 characters
AvailabilityControlId	
string <= 25 characters
ConfigurationId
required
string <= 50 characters
ReceiptIssueSerialTrack	
string <= 4000 characters
PartTrackingSessionId	
number
ProgramId	
string <= 10 characters
ProgramDescription	
string <= 2000 characters
ProjectName	
string <= 2000 characters
SubProjectId	
string <= 10 characters
SubProjectDescription	
string <= 2000 characters
ActivityNo	
string <= 10 characters
ActivityDescription	
string <= 200 characters
HandlingUnitTypeId	
string <= 4000 characters
Responses
200 response body for entity type InvPartInStockToIssueVirtual
201 response body for entity type InvPartInStockToIssueVirtual
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
/ManualIssueSet(Objkey='{Objkey}')/PartInStockToIssueArray(Objkey='{PartInStockToIssueArray_Objkey}')

Request samples
Payload
Content type
application/json

Copy
{
"QtyToIssue": 1,
"QtyAssigned": 1,
"CatchQtyToIssue": 1,
"LocationNo": "It is a Text",
"HandlingUnitId": 1,
"Warehouse": "It is a Text",
"BayNo": "It is a Text",
"RowNo": "It is a Text",
"TierNo": "It is a Text",
"BinNo": "It is a Text",
"PartNo": "It is a Text",
"Contract": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNo": "It is a Text",
"ConditionCode": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ProjectId": "It is a Text",
"ActivitySeq": 1,
"TopParentHandlingUnitId": 1,
"TopParentHuTypeId": "It is a Text",
"TopParentSscc": "It is a Text",
"TopParentAltHuLabelId": "It is a Text",
"AvailabilityControlId": "It is a Text",
"ConfigurationId": "It is a Text",
"ReceiptIssueSerialTrack": "It is a Text",
"PartTrackingSessionId": 1,
"ProgramId": "It is a Text",
"ProgramDescription": "It is a Text",
"ProjectName": "It is a Text",
"SubProjectId": "It is a Text",
"SubProjectDescription": "It is a Text",
"ActivityNo": "It is a Text",
"ActivityDescription": "It is a Text",
"HandlingUnitTypeId": "It is a Text"
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
"QtyToIssue": 1,
"QtyAssigned": 1,
"CatchQtyToIssue": 1,
"LocationNo": "It is a Text",
"HandlingUnitId": 1,
"Warehouse": "It is a Text",
"BayNo": "It is a Text",
"RowNo": "It is a Text",
"TierNo": "It is a Text",
"BinNo": "It is a Text",
"PartNo": "It is a Text",
"Contract": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNo": "It is a Text",
"ConditionCode": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ProjectId": "It is a Text",
"ActivitySeq": 1,
"TopParentHandlingUnitId": 1,
"TopParentHuTypeId": "It is a Text",
"TopParentSscc": "It is a Text",
"TopParentAltHuLabelId": "It is a Text",
"AvailabilityControlId": "It is a Text",
"ConfigurationId": "It is a Text",
"ReceiptIssueSerialTrack": "It is a Text",
"PartTrackingSessionId": 1,
"ProgramId": "It is a Text",
"ProgramDescription": "It is a Text",
"ProjectName": "It is a Text",
"SubProjectId": "It is a Text",
"SubProjectDescription": "It is a Text",
"ActivityNo": "It is a Text",
"ActivityDescription": "It is a Text",
"HandlingUnitTypeId": "It is a Text"
}
Get entities from HandlingUnitIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInStockToIssueArray_Objkey
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
/ManualIssueSet(Objkey='{Objkey}')/PartInStockToIssueArray(Objkey='{PartInStockToIssueArray_Objkey}')/HandlingUnitIdRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from HandlingUnitTypeIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInStockToIssueArray_Objkey
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
Items Enum: "HandlingUnitTypeId" "HandlingUnitTypeId desc" "Description" "Description desc" "HandlingUnitCategoryId" "HandlingUnitCategoryId desc" "Width" "Width desc" "Height" "Height desc" "Depth" "Depth desc" "Volume" "Volume desc" "TareWeight" "TareWeight desc" "UomForLength" "UomForLength desc" "UomForVolume" "UomForVolume desc" "UomForWeight" "UomForWeight desc" "AdditiveVolume" "AdditiveVolume desc" "MaxVolumeCapacity" "MaxVolumeCapacity desc" "MaxWeightCapacity" "MaxWeightCapacity desc" "Stackable" "Stackable desc" "Cost" "Cost desc" "CurrencyCode" "CurrencyCode desc" "GenerateSsccNo" "GenerateSsccNo desc" "PrintLabel" "PrintLabel desc" "NoOfHandlingUnitLabels" "NoOfHandlingUnitLabels desc" "PrintContentLabel" "PrintContentLabel desc" "NoOfContentLabels" "NoOfContentLabels desc" "PrintShipmentLabel" "PrintShipmentLabel desc" "NoOfShipmentLabels" "NoOfShipmentLabels desc" "UseHuReservationRanking" "UseHuReservationRanking desc" "NoteId" "NoteId desc" "NoteText" "NoteText desc" "TransportTaskCapacity" "TransportTaskCapacity desc" "PartNo" "PartNo desc" "Reusable" "Reusable desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "HandlingUnitTypeId" "Description" "HandlingUnitCategoryId" "Width" "Height" "Depth" "Volume" "TareWeight" "UomForLength" "UomForVolume" "UomForWeight" "AdditiveVolume" "MaxVolumeCapacity" "MaxWeightCapacity" "Stackable" "Cost" "CurrencyCode" "GenerateSsccNo" "PrintLabel" "NoOfHandlingUnitLabels" "PrintContentLabel" "NoOfContentLabels" "PrintShipmentLabel" "NoOfShipmentLabels" "UseHuReservationRanking" "NoteId" "NoteText" "TransportTaskCapacity" "PartNo" "Reusable"
Specify properties to return, see OData Select

Responses
200 response body for entity array HandlingUnitType
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualIssueSet(Objkey='{Objkey}')/PartInStockToIssueArray(Objkey='{PartInStockToIssueArray_Objkey}')/HandlingUnitTypeIdRef

Response samples
200403405500501503504
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
Objkey
required
string <= 50 characters
Example: It is a Text
PartInStockToIssueArray_Objkey
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
/ManualIssueSet(Objkey='{Objkey}')/PartInStockToIssueArray(Objkey='{PartInStockToIssueArray_Objkey}')/ConditionCodeRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from ActivitySeqRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInStockToIssueArray_Objkey
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
Items Enum: "Objstate" "Objstate desc" "ActivitySeq" "ActivitySeq desc" "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ActivityNo" "ActivityNo desc" "TotalKeyPath" "TotalKeyPath desc" "ActivityResponsible" "ActivityResponsible desc" "Description" "Description desc" "ManualProgressLevel" "ManualProgressLevel desc" "EstimatedProgress" "EstimatedProgress desc" "ManualProgressCost" "ManualProgressCost desc" "ManualProgressHours" "ManualProgressHours desc" "TotalDurationDays" "TotalDurationDays desc" "TotalWorkDays" "TotalWorkDays desc" "Note" "Note desc" "EarlyStart" "EarlyStart desc" "EarlyFinish" "EarlyFinish desc" "LateStart" "LateStart desc" "LateFinish" "LateFinish desc" "BaseLineEarlyStart" "BaseLineEarlyStart desc" "BaseLineEarlyFinish" "BaseLineEarlyFinish desc" "ActualStart" "ActualStart desc" "ActualFinish" "ActualFinish desc" "CancelDate" "CancelDate desc" "ShortName" "ShortName desc" "ReleasedDate" "ReleasedDate desc" "CompletedDate" "CompletedDate desc" "ClosedDate" "ClosedDate desc" "ProgressMethod" "ProgressMethod desc" "PlannedCostDriver" "PlannedCostDriver desc" "PreAccountingId" "PreAccountingId desc" "ProgressTemplate" "ProgressTemplate desc" "ProgressTemplateStep" "ProgressTemplateStep desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "SetInBaseline" "SetInBaseline desc" "SetActivityChanged" "SetActivityChanged desc" "CaseId" "CaseId desc" "TaskId" "TaskId desc" "ActMilestone" "ActMilestone desc" "BaselinePcd" "BaselinePcd desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "AmountPlanned" "AmountPlanned desc" "AmountUsed" "AmountUsed desc" "ExcludeFromWad" "ExcludeFromWad desc" "GenerateSafetyStock" "GenerateSafetyStock desc" "HoursPlanned" "HoursPlanned desc" "AddressId" "AddressId desc" "BaselineTotalWorkDays" "BaselineTotalWorkDays desc" "ExcludePeriodicalCap" "ExcludePeriodicalCap desc" "FinanciallyCompleted" "FinanciallyCompleted desc" "ExcludeResourceProgress" "ExcludeResourceProgress desc" "FreeFloat" "FreeFloat desc" "TotalFloat" "TotalFloat desc" "ConstraintType" "ConstraintType desc" "ConstraintDate" "ConstraintDate desc" "ExcludeFromIntegrations" "ExcludeFromIntegrations desc" "NodeType" "NodeType desc" "MandatoryInvoiceComment" "MandatoryInvoiceComment desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ActivitySeq" "ProjectId" "SubProjectId" "ActivityNo" "TotalKeyPath" "ActivityResponsible" "Description" "ManualProgressLevel" "EstimatedProgress" "ManualProgressCost" "ManualProgressHours" "TotalDurationDays" "TotalWorkDays" "Note" "EarlyStart" "EarlyFinish" "LateStart" "LateFinish" "BaseLineEarlyStart" "BaseLineEarlyFinish" "ActualStart" "ActualFinish" "CancelDate" "ShortName" "ReleasedDate" "CompletedDate" "ClosedDate" "ProgressMethod" "PlannedCostDriver" "PreAccountingId" "ProgressTemplate" "ProgressTemplateStep" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "SetInBaseline" "SetActivityChanged" "CaseId" "TaskId" "ActMilestone" "BaselinePcd" "FinanciallyResponsible" "AmountPlanned" "AmountUsed" "ExcludeFromWad" "GenerateSafetyStock" "HoursPlanned" "AddressId" "BaselineTotalWorkDays" "ExcludePeriodicalCap" "FinanciallyCompleted" "ExcludeResourceProgress" "FreeFloat" "TotalFloat" "ConstraintType" "ConstraintDate" "ExcludeFromIntegrations" "NodeType" "MandatoryInvoiceComment"
Specify properties to return, see OData Select

Responses
200 response body for entity array Activity
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualIssueSet(Objkey='{Objkey}')/PartInStockToIssueArray(Objkey='{PartInStockToIssueArray_Objkey}')/ActivitySeqRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from ProjectIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInStockToIssueArray_Objkey
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
Items Enum: "Objstate" "Objstate desc" "ProjectId" "ProjectId desc" "Name" "Name desc" "Description" "Description desc" "PlanStart" "PlanStart desc" "PlanFinish" "PlanFinish desc" "ActualStart" "ActualStart desc" "ActualFinish" "ActualFinish desc" "FrozenDate" "FrozenDate desc" "CloseDate" "CloseDate desc" "CancelDate" "CancelDate desc" "ApprovedDate" "ApprovedDate desc" "Manager" "Manager desc" "CustomerId" "CustomerId desc" "CustomerResponsible" "CustomerResponsible desc" "CustomerProjectId" "CustomerProjectId desc" "Company" "Company desc" "Branch" "Branch desc" "Site" "Site desc" "CalendarId" "CalendarId desc" "ProgramId" "ProgramId desc" "PlannedRevenue" "PlannedRevenue desc" "PlannedCost" "PlannedCost desc" "CurrencyType" "CurrencyType desc" "ProbabilityToWin" "ProbabilityToWin desc" "DefaultCharTemp" "DefaultCharTemp desc" "AccessOnOff" "AccessOnOff desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "BaselineRevisionNumber" "BaselineRevisionNumber desc" "EarnedValueMethod" "EarnedValueMethod desc" "MaterialAllocation" "MaterialAllocation desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "BudgetControlOn" "BudgetControlOn desc" "ControlAsBudgeted" "ControlAsBudgeted desc" "ControlOnTotalBudget" "ControlOnTotalBudget desc" "ProjUniquePurchase" "ProjUniquePurchase desc" "ProjUniqueSale" "ProjUniqueSale desc" "CopiedProject" "CopiedProject desc" "CostStructureId" "CostStructureId desc" "MultiCurrencyBudgeting" "MultiCurrencyBudgeting desc" "ProjectCurrencyType" "ProjectCurrencyType desc" "BudgetCurrencyType" "BudgetCurrencyType desc" "ProjectCurrencyCode" "ProjectCurrencyCode desc" "Category1Id" "Category1Id desc" "Category2Id" "Category2Id desc" "ValidateRemainingAgainst" "ValidateRemainingAgainst desc" "BudgetForecastId" "BudgetForecastId desc" "SelectedForecastId" "SelectedForecastId desc" "SelectedForecastType" "SelectedForecastType desc" "SelectedForecastVersion" "SelectedForecastVersion desc" "ProjectMiscCompMethod" "ProjectMiscCompMethod desc" "InternalRentalPriceList" "InternalRentalPriceList desc" "PlanProjectTransaction" "PlanProjectTransaction desc" "WorkDayToHoursConv" "WorkDayToHoursConv desc" "FinancialProjectExist" "FinancialProjectExist desc" "DefaultCostActivitySeq" "DefaultCostActivitySeq desc" "ExcludeFromBatchInvoice" "ExcludeFromBatchInvoice desc" "ActivitySeq" "ActivitySeq desc" "MandatoryInvoiceComment" "MandatoryInvoiceComment desc" "CashForecastMultiCurr" "CashForecastMultiCurr desc" "BusinessTransactionId" "BusinessTransactionId desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ProjectId" "Name" "Description" "PlanStart" "PlanFinish" "ActualStart" "ActualFinish" "FrozenDate" "CloseDate" "CancelDate" "ApprovedDate" "Manager" "CustomerId" "CustomerResponsible" "CustomerProjectId" "Company" "Branch" "Site" "CalendarId" "ProgramId" "PlannedRevenue" "PlannedCost" "CurrencyType" "ProbabilityToWin" "DefaultCharTemp" "AccessOnOff" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "BaselineRevisionNumber" "EarnedValueMethod" "MaterialAllocation" "FinanciallyResponsible" "BudgetControlOn" "ControlAsBudgeted" "ControlOnTotalBudget" "ProjUniquePurchase" "ProjUniqueSale" "CopiedProject" "CostStructureId" "MultiCurrencyBudgeting" "ProjectCurrencyType" "BudgetCurrencyType" "ProjectCurrencyCode" "Category1Id" "Category2Id" "ValidateRemainingAgainst" "BudgetForecastId" "SelectedForecastId" "SelectedForecastType" "SelectedForecastVersion" "ProjectMiscCompMethod" "InternalRentalPriceList" "PlanProjectTransaction" "WorkDayToHoursConv" "FinancialProjectExist" "DefaultCostActivitySeq" "ExcludeFromBatchInvoice" "ActivitySeq" "MandatoryInvoiceComment" "CashForecastMultiCurr" "BusinessTransactionId"
Specify properties to return, see OData Select

Responses
200 response body for entity array Project
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualIssueSet(Objkey='{Objkey}')/PartInStockToIssueArray(Objkey='{PartInStockToIssueArray_Objkey}')/ProjectIdRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from ProgramIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInStockToIssueArray_Objkey
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
Items Enum: "Objstate" "Objstate desc" "ProgramId" "ProgramId desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ProgramId" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array ProjectProgramGlobal
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualIssueSet(Objkey='{Objkey}')/PartInStockToIssueArray(Objkey='{PartInStockToIssueArray_Objkey}')/ProgramIdRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from SubProjectIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInStockToIssueArray_Objkey
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
Items Enum: "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ParentSubProjectId" "ParentSubProjectId desc" "Description" "Description desc" "Manager" "Manager desc" "Department" "Department desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "ExcludeFromWad" "ExcludeFromWad desc" "AddressId" "AddressId desc" "FinanciallyCompleted" "FinanciallyCompleted desc" "ExcludeFromIntegrations" "ExcludeFromIntegrations desc" "ActivitySeq" "ActivitySeq desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ProjectId" "SubProjectId" "ParentSubProjectId" "Description" "Manager" "Department" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "FinanciallyResponsible" "ExcludeFromWad" "AddressId" "FinanciallyCompleted" "ExcludeFromIntegrations" "ActivitySeq"
Specify properties to return, see OData Select

Responses
200 response body for entity array SubProject
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualIssueSet(Objkey='{Objkey}')/PartInStockToIssueArray(Objkey='{PartInStockToIssueArray_Objkey}')/SubProjectIdRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from ActivityNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInStockToIssueArray_Objkey
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
Items Enum: "Objstate" "Objstate desc" "ActivitySeq" "ActivitySeq desc" "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ActivityNo" "ActivityNo desc" "TotalKeyPath" "TotalKeyPath desc" "ActivityResponsible" "ActivityResponsible desc" "Description" "Description desc" "ManualProgressLevel" "ManualProgressLevel desc" "EstimatedProgress" "EstimatedProgress desc" "ManualProgressCost" "ManualProgressCost desc" "ManualProgressHours" "ManualProgressHours desc" "TotalDurationDays" "TotalDurationDays desc" "TotalWorkDays" "TotalWorkDays desc" "Note" "Note desc" "EarlyStart" "EarlyStart desc" "EarlyFinish" "EarlyFinish desc" "LateStart" "LateStart desc" "LateFinish" "LateFinish desc" "BaseLineEarlyStart" "BaseLineEarlyStart desc" "BaseLineEarlyFinish" "BaseLineEarlyFinish desc" "ActualStart" "ActualStart desc" "ActualFinish" "ActualFinish desc" "CancelDate" "CancelDate desc" "ShortName" "ShortName desc" "ReleasedDate" "ReleasedDate desc" "CompletedDate" "CompletedDate desc" "ClosedDate" "ClosedDate desc" "ProgressMethod" "ProgressMethod desc" "PlannedCostDriver" "PlannedCostDriver desc" "PreAccountingId" "PreAccountingId desc" "ProgressTemplate" "ProgressTemplate desc" "ProgressTemplateStep" "ProgressTemplateStep desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "SetInBaseline" "SetInBaseline desc" "SetActivityChanged" "SetActivityChanged desc" "CaseId" "CaseId desc" "TaskId" "TaskId desc" "ActMilestone" "ActMilestone desc" "BaselinePcd" "BaselinePcd desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "AmountPlanned" "AmountPlanned desc" "AmountUsed" "AmountUsed desc" "ExcludeFromWad" "ExcludeFromWad desc" "GenerateSafetyStock" "GenerateSafetyStock desc" "HoursPlanned" "HoursPlanned desc" "AddressId" "AddressId desc" "BaselineTotalWorkDays" "BaselineTotalWorkDays desc" "ExcludePeriodicalCap" "ExcludePeriodicalCap desc" "FinanciallyCompleted" "FinanciallyCompleted desc" "ExcludeResourceProgress" "ExcludeResourceProgress desc" "FreeFloat" "FreeFloat desc" "TotalFloat" "TotalFloat desc" "ConstraintType" "ConstraintType desc" "ConstraintDate" "ConstraintDate desc" "ExcludeFromIntegrations" "ExcludeFromIntegrations desc" "NodeType" "NodeType desc" "MandatoryInvoiceComment" "MandatoryInvoiceComment desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ActivitySeq" "ProjectId" "SubProjectId" "ActivityNo" "TotalKeyPath" "ActivityResponsible" "Description" "ManualProgressLevel" "EstimatedProgress" "ManualProgressCost" "ManualProgressHours" "TotalDurationDays" "TotalWorkDays" "Note" "EarlyStart" "EarlyFinish" "LateStart" "LateFinish" "BaseLineEarlyStart" "BaseLineEarlyFinish" "ActualStart" "ActualFinish" "CancelDate" "ShortName" "ReleasedDate" "CompletedDate" "ClosedDate" "ProgressMethod" "PlannedCostDriver" "PreAccountingId" "ProgressTemplate" "ProgressTemplateStep" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "SetInBaseline" "SetActivityChanged" "CaseId" "TaskId" "ActMilestone" "BaselinePcd" "FinanciallyResponsible" "AmountPlanned" "AmountUsed" "ExcludeFromWad" "GenerateSafetyStock" "HoursPlanned" "AddressId" "BaselineTotalWorkDays" "ExcludePeriodicalCap" "FinanciallyCompleted" "ExcludeResourceProgress" "FreeFloat" "TotalFloat" "ConstraintType" "ConstraintDate" "ExcludeFromIntegrations" "NodeType" "MandatoryInvoiceComment"
Specify properties to return, see OData Select

Responses
200 response body for entity array Activity
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualIssueSet(Objkey='{Objkey}')/PartInStockToIssueArray(Objkey='{PartInStockToIssueArray_Objkey}')/ActivityNoRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from AvailabilityControlIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInStockToIssueArray_Objkey
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
Items Enum: "Objstate" "Objstate desc" "AvailabilityControlId" "AvailabilityControlId desc" "Description" "Description desc" "PartSupplyControl" "PartSupplyControl desc" "PartOrderIssueControl" "PartOrderIssueControl desc" "PartReservationControl" "PartReservationControl desc" "PartManualReservCtrl" "PartManualReservCtrl desc" "PartScrapControl" "PartScrapControl desc" "PartCountingControl" "PartCountingControl desc" "PartMovementControl" "PartMovementControl desc" "PartNoorderIssueControl" "PartNoorderIssueControl desc" "PutawayZoneRefillSource" "PutawayZoneRefillSource desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "AvailabilityControlId" "Description" "PartSupplyControl" "PartOrderIssueControl" "PartReservationControl" "PartManualReservCtrl" "PartScrapControl" "PartCountingControl" "PartMovementControl" "PartNoorderIssueControl" "PutawayZoneRefillSource"
Specify properties to return, see OData Select

Responses
200 response body for entity array PartAvailabilityControl
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualIssueSet(Objkey='{Objkey}')/PartInStockToIssueArray(Objkey='{PartInStockToIssueArray_Objkey}')/AvailabilityControlIdRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from TopParentHuTypeIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
Objkey
required
string <= 50 characters
Example: It is a Text
PartInStockToIssueArray_Objkey
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
Items Enum: "HandlingUnitTypeId" "HandlingUnitTypeId desc" "Description" "Description desc" "HandlingUnitCategoryId" "HandlingUnitCategoryId desc" "Width" "Width desc" "Height" "Height desc" "Depth" "Depth desc" "Volume" "Volume desc" "TareWeight" "TareWeight desc" "UomForLength" "UomForLength desc" "UomForVolume" "UomForVolume desc" "UomForWeight" "UomForWeight desc" "AdditiveVolume" "AdditiveVolume desc" "MaxVolumeCapacity" "MaxVolumeCapacity desc" "MaxWeightCapacity" "MaxWeightCapacity desc" "Stackable" "Stackable desc" "Cost" "Cost desc" "CurrencyCode" "CurrencyCode desc" "GenerateSsccNo" "GenerateSsccNo desc" "PrintLabel" "PrintLabel desc" "NoOfHandlingUnitLabels" "NoOfHandlingUnitLabels desc" "PrintContentLabel" "PrintContentLabel desc" "NoOfContentLabels" "NoOfContentLabels desc" "PrintShipmentLabel" "PrintShipmentLabel desc" "NoOfShipmentLabels" "NoOfShipmentLabels desc" "UseHuReservationRanking" "UseHuReservationRanking desc" "NoteId" "NoteId desc" "NoteText" "NoteText desc" "TransportTaskCapacity" "TransportTaskCapacity desc" "PartNo" "PartNo desc" "Reusable" "Reusable desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "HandlingUnitTypeId" "Description" "HandlingUnitCategoryId" "Width" "Height" "Depth" "Volume" "TareWeight" "UomForLength" "UomForVolume" "UomForWeight" "AdditiveVolume" "MaxVolumeCapacity" "MaxWeightCapacity" "Stackable" "Cost" "CurrencyCode" "GenerateSsccNo" "PrintLabel" "NoOfHandlingUnitLabels" "PrintContentLabel" "NoOfContentLabels" "PrintShipmentLabel" "NoOfShipmentLabels" "UseHuReservationRanking" "NoteId" "NoteText" "TransportTaskCapacity" "PartNo" "Reusable"
Specify properties to return, see OData Select

Responses
200 response body for entity array HandlingUnitType
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualIssueSet(Objkey='{Objkey}')/PartInStockToIssueArray(Objkey='{PartInStockToIssueArray_Objkey}')/TopParentHuTypeIdRef

Response samples
200403405500501503504
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
/ManualIssueSet(Objkey='{Objkey}')/PartNoRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from ActivitySeqRef
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
Items Enum: "Objstate" "Objstate desc" "ActivitySeq" "ActivitySeq desc" "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ActivityNo" "ActivityNo desc" "TotalKeyPath" "TotalKeyPath desc" "ActivityResponsible" "ActivityResponsible desc" "Description" "Description desc" "ManualProgressLevel" "ManualProgressLevel desc" "EstimatedProgress" "EstimatedProgress desc" "ManualProgressCost" "ManualProgressCost desc" "ManualProgressHours" "ManualProgressHours desc" "TotalDurationDays" "TotalDurationDays desc" "TotalWorkDays" "TotalWorkDays desc" "Note" "Note desc" "EarlyStart" "EarlyStart desc" "EarlyFinish" "EarlyFinish desc" "LateStart" "LateStart desc" "LateFinish" "LateFinish desc" "BaseLineEarlyStart" "BaseLineEarlyStart desc" "BaseLineEarlyFinish" "BaseLineEarlyFinish desc" "ActualStart" "ActualStart desc" "ActualFinish" "ActualFinish desc" "CancelDate" "CancelDate desc" "ShortName" "ShortName desc" "ReleasedDate" "ReleasedDate desc" "CompletedDate" "CompletedDate desc" "ClosedDate" "ClosedDate desc" "ProgressMethod" "ProgressMethod desc" "PlannedCostDriver" "PlannedCostDriver desc" "PreAccountingId" "PreAccountingId desc" "ProgressTemplate" "ProgressTemplate desc" "ProgressTemplateStep" "ProgressTemplateStep desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "SetInBaseline" "SetInBaseline desc" "SetActivityChanged" "SetActivityChanged desc" "CaseId" "CaseId desc" "TaskId" "TaskId desc" "ActMilestone" "ActMilestone desc" "BaselinePcd" "BaselinePcd desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "AmountPlanned" "AmountPlanned desc" "AmountUsed" "AmountUsed desc" "ExcludeFromWad" "ExcludeFromWad desc" "GenerateSafetyStock" "GenerateSafetyStock desc" "HoursPlanned" "HoursPlanned desc" "AddressId" "AddressId desc" "BaselineTotalWorkDays" "BaselineTotalWorkDays desc" "ExcludePeriodicalCap" "ExcludePeriodicalCap desc" "FinanciallyCompleted" "FinanciallyCompleted desc" "ExcludeResourceProgress" "ExcludeResourceProgress desc" "FreeFloat" "FreeFloat desc" "TotalFloat" "TotalFloat desc" "ConstraintType" "ConstraintType desc" "ConstraintDate" "ConstraintDate desc" "ExcludeFromIntegrations" "ExcludeFromIntegrations desc" "NodeType" "NodeType desc" "MandatoryInvoiceComment" "MandatoryInvoiceComment desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ActivitySeq" "ProjectId" "SubProjectId" "ActivityNo" "TotalKeyPath" "ActivityResponsible" "Description" "ManualProgressLevel" "EstimatedProgress" "ManualProgressCost" "ManualProgressHours" "TotalDurationDays" "TotalWorkDays" "Note" "EarlyStart" "EarlyFinish" "LateStart" "LateFinish" "BaseLineEarlyStart" "BaseLineEarlyFinish" "ActualStart" "ActualFinish" "CancelDate" "ShortName" "ReleasedDate" "CompletedDate" "ClosedDate" "ProgressMethod" "PlannedCostDriver" "PreAccountingId" "ProgressTemplate" "ProgressTemplateStep" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "SetInBaseline" "SetActivityChanged" "CaseId" "TaskId" "ActMilestone" "BaselinePcd" "FinanciallyResponsible" "AmountPlanned" "AmountUsed" "ExcludeFromWad" "GenerateSafetyStock" "HoursPlanned" "AddressId" "BaselineTotalWorkDays" "ExcludePeriodicalCap" "FinanciallyCompleted" "ExcludeResourceProgress" "FreeFloat" "TotalFloat" "ConstraintType" "ConstraintDate" "ExcludeFromIntegrations" "NodeType" "MandatoryInvoiceComment"
Specify properties to return, see OData Select

Responses
200 response body for entity array Activity
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ManualIssueSet(Objkey='{Objkey}')/ActivitySeqRef

Response samples
200403405500501503504
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

Invoke action CreateSerialSequence
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action CreateSerialSequenceActionImport

ParentObjkey	
string
Prefix	
string
Suffix	
string
Length	
number
Responses
200 response body for action CreateSerialSequence :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/CreateSerialSequence

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"Prefix": "It is a Text",
"Suffix": "It is a Text",
"Length": 1
}
Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": ""
}
Invoke action ValidateBarcodeId
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action ValidateBarcodeIdActionImport

Contract	
string
BarcodeId	
number
PartNo	
string
ConfigId	
string
LotBatchNo	
string
EngChgLevel	
string
WaivDevRejNo	
string
ActivitySeq	
number
Responses
200 response body for action ValidateBarcodeId :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/ValidateBarcodeId

Request samples
Payload
Content type
application/json

Copy
{
"Contract": "It is a Text",
"BarcodeId": 1,
"PartNo": "It is a Text",
"ConfigId": "It is a Text",
"LotBatchNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": 1
}
Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": "It is a Text"
}
Invoke action PostAnswerWithResult
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action PostAnswerWithResultActionImport

Contract	
string
DataItemValue	
string
PartNo	
string
ConfigId	
string
LotBatchNo	
string
EngChgLevel	
string
WaivDevRejNo	
string
ActivitySeq	
string
SessionIdStr	
string
ParentSessionIdStr	
string
Responses
200 response body for action PostAnswerWithResult :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/PostAnswerWithResult

Request samples
Payload
Content type
application/json

Copy
{
"Contract": "It is a Text",
"DataItemValue": "It is a Text",
"PartNo": "It is a Text",
"ConfigId": "It is a Text",
"LotBatchNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": "It is a Text",
"SessionIdStr": "It is a Text",
"ParentSessionIdStr": "It is a Text"
}
Response samples
200400403405500501503504
Content type
application/json

Copy
{
"NextStep": 1,
"LoopOccurrence": 1,
"DefaultValue": "It is a Text",
"TerminateInfo": "It is a Text"
}
Invoke action CreateLinesForMultiLocSerials
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action CreateLinesForMultiLocSerialsActionImport

ParentObjkey	
string
SerialListTempLobId	
string
SessionId	
number
Contract	
string
PartNo	
string
LotBatchNo	
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
/CreateLinesForMultiLocSerials

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"SerialListTempLobId": "It is a Text",
"SessionId": 1,
"Contract": "It is a Text",
"PartNo": "It is a Text",
"LotBatchNo": "It is a Text"
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
Invoke action InsertLinesForMultiLocSerials
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action InsertLinesForMultiLocSerialsActionImport

ParentObjkey	
string
SessionIdVar	
number
SessionId	
number
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
/InsertLinesForMultiLocSerials

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"SessionIdVar": 1,
"SessionId": 1,
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
Invoke action GetInitialInfoForInLocSerials
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action GetInitialInfoForInLocSerialsActionImport

Contract	
string
PartNo	
string
SessionId	
number
Responses
200 response body for action GetInitialInfoForInLocSerials :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/GetInitialInfoForInLocSerials

Request samples
Payload
Content type
application/json

Copy
{
"Contract": "It is a Text",
"PartNo": "It is a Text",
"SessionId": 1
}
Response samples
200400403405500501503504
Content type
application/json

Copy
{
"CatchUom": "It is a Text",
"CatchUnitEnabled": "It is a Text",
"SessionId": 1
}
Invoke action CreateLinesForInLocSerials
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action CreateLinesForInLocSerialsActionImport

ParentObjkey	
string
SerialListTempLobId	
string
SessionId	
number
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
/CreateLinesForInLocSerials

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"SerialListTempLobId": "It is a Text",
"SessionId": 1,
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
Invoke action InsertLinesForInLocSerials
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action InsertLinesForInLocSerialsActionImport

ParentObjkey	
string
SessionIdVar	
number
SessionId	
number
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
/InsertLinesForInLocSerials

Request samples
Payload
Content type
application/json

Copy
{
"ParentObjkey": "It is a Text",
"SessionIdVar": 1,
"SessionId": 1,
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
Invoke action GetBarcodeInfoInLoc
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action GetBarcodeInfoInLocActionImport

ParentSessionId	
number
ActivitySeq	
number
Responses
200 response body for action GetBarcodeInfoInLoc :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/GetBarcodeInfoInLoc

Request samples
Payload
Content type
application/json

Copy
{
"ParentSessionId": 1,
"ActivitySeq": 1
}
Response samples
200400403405500501503504
Content type
application/json

Copy
{
"SessionId": 1,
"SessionIdStr": "It is a Text",
"ParentSessionIdStr": "It is a Text",
"ActivitySeqStr": "It is a Text"
}
Invoke action ValidateCodePart
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action ValidateCodePartActionImport

CodeValue	
string
CodePart	
string
VoucherDate	
string <date>
Company	
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
/ValidateCodePart

Request samples
Payload
Content type
application/json

Copy
{
"CodeValue": "It is a Text",
"CodePart": "It is a Text",
"VoucherDate": "2019-10-10",
"Company": "It is a Text"
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
Invoke action ResetPreAccountingTotalAmount
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action ResetPreAccountingTotalAmountActionImport

PreAccountingId	
number
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
/ResetPreAccountingTotalAmount

Request samples
Payload
Content type
application/json

Copy
{
"PreAccountingId": 1,
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
Invoke action ValidatePreAccountingDistribution
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action ValidatePreAccountingDistributionActionImport

Init	
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
/ValidatePreAccountingDistribution

Request samples
Payload
Content type
application/json

Copy
{
"Init": true
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
Invoke action MakeLineReservations
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action MakeLineReservationsActionImport

OrderNo	
string
LineNo	
string
ReleaseNo	
string
LineItemNo	
number
QtyDue	
number
PartNo	
string
OrderClass	
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
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
/MakeLineReservations

Request samples
Payload
Content type
application/json

Copy
{
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"QtyDue": 1,
"PartNo": "It is a Text",
"OrderClass": "INT"
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
Invoke action MakeLineDelivery
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action MakeLineDeliveryActionImport

OrderNo	
string
LineNo	
string
ReleaseNo	
string
LineItemNo	
number
PartTrackingSessionId	
number
OrderClass	
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
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
/MakeLineDelivery

Request samples
Payload
Content type
application/json

Copy
{
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartTrackingSessionId": 1,
"OrderClass": "INT"
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
Invoke action ConvertToString
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action ConvertToStringActionImport

NumberToConvert	
number
Responses
200 response body for action ConvertToString :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/ConvertToString

Request samples
Payload
Content type
application/json

Copy
{
"NumberToConvert": 1
}
Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": "It is a Text"
}
Invoke action CloseLine
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action CloseLineActionImport

OrderNo	
string
LineNo	
string
ReleaseNo	
string
LineItemNo	
number
OrderClass	
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
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
/CloseLine

Request samples
Payload
Content type
application/json

Copy
{
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"OrderClass": "INT"
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
Invoke action ModifyActivitySequence
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action ModifyActivitySequenceActionImport

OrderNo	
string
LineNo	
string
ReleaseNo	
string
LineItemNo	
number
ActivitySeq	
number
OrderClass	
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
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
/ModifyActivitySequence

Request samples
Payload
Content type
application/json

Copy
{
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"ActivitySeq": 1,
"OrderClass": "INT"
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
Invoke action ReserveMaterials
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action ReserveMaterialsActionImport

OrderNo	
string
LineNo	
string
ReleaseNo	
string
LineItemNo	
number
Contract	
string
PartNo	
string
ParentObjkey	
string
OrderClass	
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
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
/ReserveMaterials

Request samples
Payload
Content type
application/json

Copy
{
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"Contract": "It is a Text",
"PartNo": "It is a Text",
"ParentObjkey": "It is a Text",
"OrderClass": "INT"
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
Invoke action IssueMaterial
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action IssueMaterialActionImport

OrderNo	
string
LineNo	
string
ReleaseNo	
string
LineItemNo	
number
PartNo	
string
Contract	
string
ParentObjkey	
string
OrderClass	
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
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
/IssueMaterial

Request samples
Payload
Content type
application/json

Copy
{
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"ParentObjkey": "It is a Text",
"OrderClass": "INT"
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

Invoke function IsValidInteger
Authorizations:
(OpenIdbasicAuth)
path Parameters
NumberValue
required
number
Example: 1
Responses
200 response body for function IsValidInteger :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/IsValidInteger(NumberValue={NumberValue})

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": true
}
Invoke function GenerateProcessSetupSteps
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
ConfigId
required
string
Example: It is a Text
LotBatchNo
required
string
Example: It is a Text
EngChgLevel
required
string
Example: It is a Text
WaivDevRejNo
required
string
Example: It is a Text
ActivitySeq
required
string
Example: It is a Text
SessionIdStr
required
string
Example: It is a Text
ParentSessionIdStr
required
string
Example: It is a Text
Responses
200 response body for function GenerateProcessSetupSteps :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GenerateProcessSetupSteps(Contract='{Contract}',PartNo='{PartNo}',ConfigId='{ConfigId}',LotBatchNo='{LotBatchNo}',EngChgLevel='{EngChgLevel}',WaivDevRejNo='{WaivDevRejNo}',ActivitySeq='{ActivitySeq}',SessionIdStr='{SessionIdStr}',ParentSessionIdStr='{ParentSessionIdStr}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"Label": "It is a Text",
"Description": "It is a Text",
"Entity": "It is a Text",
"InitMetaFunction": "It is a Text",
"StepsMetaFunction": "It is a Text",
"FinishMetaFunction": "It is a Text",
"NextStepFunction": "It is a Text",
"NumberOfSteps": 1,
"StartStep": 1
}
Invoke function GenerateInitCommands
Authorizations:
(OpenIdbasicAuth)
path Parameters
SessionIdStr
required
string
Example: It is a Text
Responses
200 response body for function GenerateInitCommands :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GenerateInitCommands(SessionIdStr='{SessionIdStr}')

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
Invoke function GenerateProcessSteps
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
ConfigId
required
string
Example: It is a Text
LotBatchNo
required
string
Example: It is a Text
EngChgLevel
required
string
Example: It is a Text
WaivDevRejNo
required
string
Example: It is a Text
ActivitySeq
required
string
Example: It is a Text
SessionIdStr
required
string
Example: It is a Text
ParentSessionIdStr
required
string
Example: It is a Text
Responses
200 response body for function GenerateProcessSteps :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GenerateProcessSteps(Contract='{Contract}',PartNo='{PartNo}',ConfigId='{ConfigId}',LotBatchNo='{LotBatchNo}',EngChgLevel='{EngChgLevel}',WaivDevRejNo='{WaivDevRejNo}',ActivitySeq='{ActivitySeq}',SessionIdStr='{SessionIdStr}',ParentSessionIdStr='{ParentSessionIdStr}')

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
Invoke function GetInfoForMultiLocSerials
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
RefType
required
string
Example: It is a Text
Responses
200 response body for function GetInfoForMultiLocSerials :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetInfoForMultiLocSerials(Contract='{Contract}',PartNo='{PartNo}',RefType='{RefType}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"PartDescription": "It is a Text",
"CatchUom": "It is a Text",
"CatchUnitEnabled": "It is a Text",
"RefType": "It is a Text",
"SessionId": 1
}
Invoke function GetPartDescription
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
200 response body for function GetPartDescription :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetPartDescription(Contract='{Contract}',PartNo='{PartNo}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": "It is a Text"
}
Invoke function GetCatchUomForMultiLocSerials
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
200 response body for function GetCatchUomForMultiLocSerials :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetCatchUomForMultiLocSerials(Contract='{Contract}',PartNo='{PartNo}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"CatchUom": "It is a Text",
"CatchUnitEnabled": "It is a Text"
}
Invoke function GetBarcodeInfoForMultiLoc
Authorizations:
(OpenIdbasicAuth)
path Parameters
ParentSessionId
required
number
Example: 1
Responses
200 response body for function GetBarcodeInfoForMultiLoc :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetBarcodeInfoForMultiLoc(ParentSessionId={ParentSessionId})

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"SessionId": 1,
"SessionIdStr": "It is a Text",
"ParentSessionIdStr": "It is a Text"
}
Invoke function GetSerialNumbers
Authorizations:
(OpenIdbasicAuth)
path Parameters
SerialNo
required
string
Example: It is a Text
Contract
required
string
Example: It is a Text
PartNo
required
string
Example: It is a Text
SessionId
required
number
Example: 1
LotBatchNo
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
Items Enum: "SerialNo" "SerialNo desc" "PartNo" "PartNo desc" "Contract" "Contract desc" "ManufacturerNo" "ManufacturerNo desc" "SupplierNo" "SupplierNo desc" "PartOwnership" "PartOwnership desc" "PartOwnershipDb" "PartOwnershipDb desc" "OwningVendorNo" "OwningVendorNo desc" "OwningCustomerNo" "OwningCustomerNo desc" "OperationalStatus" "OperationalStatus desc" "OperationalStatusDb" "OperationalStatusDb desc" "OperationalCondition" "OperationalCondition desc" "OperationalConditionDb" "OperationalConditionDb desc" "LatestTransaction" "LatestTransaction desc" "LotBatchNo" "LotBatchNo desc" "ConfigurationId" "ConfigurationId desc" "LockedForUpdate" "LockedForUpdate desc" "LockedForUpdateDb" "LockedForUpdateDb desc" "ConditionCode" "ConditionCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "SerialNo" "PartNo" "Contract" "ManufacturerNo" "SupplierNo" "PartOwnership" "PartOwnershipDb" "OwningVendorNo" "OwningCustomerNo" "OperationalStatus" "OperationalStatusDb" "OperationalCondition" "OperationalConditionDb" "LatestTransaction" "LotBatchNo" "ConfigurationId" "LockedForUpdate" "LockedForUpdateDb" "ConditionCode"
Specify properties to return, see OData Select

Responses
200 response body for function GetSerialNumbers :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetSerialNumbers(SerialNo='{SerialNo}',Contract='{Contract}',PartNo='{PartNo}',SessionId={SessionId},LotBatchNo='{LotBatchNo}')

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
Invoke function GetSerialNumbers
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string
Example: It is a Text
LocationNo
required
string
Example: It is a Text
PartNo
required
string
Example: It is a Text
SessionId
required
number
Example: 1
LotBatchNo
required
string
Example: It is a Text
ConfigurationId
required
string
Example: It is a Text
EngChgLevel
required
string
Example: It is a Text
WaivDevRejNo
required
string
Example: It is a Text
ActivitySeq
required
number
Example: 1
HandlingUnitId
required
number
Example: 1
PartOwnershipDb
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
Items Enum: "SerialNo" "SerialNo desc" "PartNo" "PartNo desc" "Contract" "Contract desc" "ManufacturerNo" "ManufacturerNo desc" "SupplierNo" "SupplierNo desc" "PartOwnership" "PartOwnership desc" "PartOwnershipDb" "PartOwnershipDb desc" "OwningVendorNo" "OwningVendorNo desc" "OwningCustomerNo" "OwningCustomerNo desc" "OperationalStatus" "OperationalStatus desc" "OperationalStatusDb" "OperationalStatusDb desc" "OperationalCondition" "OperationalCondition desc" "OperationalConditionDb" "OperationalConditionDb desc" "LatestTransaction" "LatestTransaction desc" "LotBatchNo" "LotBatchNo desc" "ConfigurationId" "ConfigurationId desc" "LockedForUpdate" "LockedForUpdate desc" "LockedForUpdateDb" "LockedForUpdateDb desc" "ConditionCode" "ConditionCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "SerialNo" "PartNo" "Contract" "ManufacturerNo" "SupplierNo" "PartOwnership" "PartOwnershipDb" "OwningVendorNo" "OwningCustomerNo" "OperationalStatus" "OperationalStatusDb" "OperationalCondition" "OperationalConditionDb" "LatestTransaction" "LotBatchNo" "ConfigurationId" "LockedForUpdate" "LockedForUpdateDb" "ConditionCode"
Specify properties to return, see OData Select

Responses
200 response body for function GetSerialNumbers :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetSerialNumbers(Contract='{Contract}',LocationNo='{LocationNo}',PartNo='{PartNo}',SessionId={SessionId},LotBatchNo='{LotBatchNo}',ConfigurationId='{ConfigurationId}',EngChgLevel='{EngChgLevel}',WaivDevRejNo='{WaivDevRejNo}',ActivitySeq={ActivitySeq},HandlingUnitId={HandlingUnitId},PartOwnershipDb='{PartOwnershipDb}')

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
Invoke function ProjectLovListFirst
Authorizations:
(OpenIdbasicAuth)
path Parameters
Site
required
string
Example: It is a Text
Company
required
string
Example: It is a Text
LuName
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
Items Enum: "ProjectId" "ProjectId desc" "Name" "Name desc" "Description" "Description desc" "PlanStart" "PlanStart desc" "PlanFinish" "PlanFinish desc" "Company" "Company desc" "ProgramId" "ProgramId desc" "Category1Id" "Category1Id desc" "Category2Id" "Category2Id desc" "PlannedRevenue" "PlannedRevenue desc" "PlannedCost" "PlannedCost desc" "ProbabilityToWin" "ProbabilityToWin desc" "State" "State desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ProjectId" "Name" "Description" "PlanStart" "PlanFinish" "Company" "ProgramId" "Category1Id" "Category2Id" "PlannedRevenue" "PlannedCost" "ProbabilityToWin" "State"
Specify properties to return, see OData Select

Responses
200 response body for function ProjectLovListFirst :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProjectLovListFirst(Site='{Site}',Company='{Company}',LuName='{LuName}')

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
Invoke function ProjectLovListSecond
Authorizations:
(OpenIdbasicAuth)
path Parameters
Site
required
string
Example: It is a Text
Company
required
string
Example: It is a Text
LuName
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
Items Enum: "ProjectId" "ProjectId desc" "Name" "Name desc" "Description" "Description desc" "PlanStart" "PlanStart desc" "PlanFinish" "PlanFinish desc" "Company" "Company desc" "ProgramId" "ProgramId desc" "Category1Id" "Category1Id desc" "Category2Id" "Category2Id desc" "PlannedRevenue" "PlannedRevenue desc" "PlannedCost" "PlannedCost desc" "ProbabilityToWin" "ProbabilityToWin desc" "State" "State desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ProjectId" "Name" "Description" "PlanStart" "PlanFinish" "Company" "ProgramId" "Category1Id" "Category2Id" "PlannedRevenue" "PlannedCost" "ProbabilityToWin" "State"
Specify properties to return, see OData Select

Responses
200 response body for function ProjectLovListSecond :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProjectLovListSecond(Site='{Site}',Company='{Company}',LuName='{LuName}')

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
Invoke function ProjectLovListThird
Authorizations:
(OpenIdbasicAuth)
path Parameters
Site
required
string
Example: It is a Text
Company
required
string
Example: It is a Text
ProgramId
required
string
Example: It is a Text
LuName
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
Items Enum: "ProjectId" "ProjectId desc" "Name" "Name desc" "Description" "Description desc" "PlanStart" "PlanStart desc" "PlanFinish" "PlanFinish desc" "Company" "Company desc" "ProgramId" "ProgramId desc" "Category1Id" "Category1Id desc" "Category2Id" "Category2Id desc" "PlannedRevenue" "PlannedRevenue desc" "PlannedCost" "PlannedCost desc" "ProbabilityToWin" "ProbabilityToWin desc" "State" "State desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ProjectId" "Name" "Description" "PlanStart" "PlanFinish" "Company" "ProgramId" "Category1Id" "Category2Id" "PlannedRevenue" "PlannedCost" "ProbabilityToWin" "State"
Specify properties to return, see OData Select

Responses
200 response body for function ProjectLovListThird :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProjectLovListThird(Site='{Site}',Company='{Company}',ProgramId='{ProgramId}',LuName='{LuName}')

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
Invoke function ProjectLovListFourth
Authorizations:
(OpenIdbasicAuth)
path Parameters
Site
required
string
Example: It is a Text
Company
required
string
Example: It is a Text
ProgramId
required
string
Example: It is a Text
LuName
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
Items Enum: "ProjectId" "ProjectId desc" "Name" "Name desc" "Description" "Description desc" "PlanStart" "PlanStart desc" "PlanFinish" "PlanFinish desc" "Company" "Company desc" "ProgramId" "ProgramId desc" "Category1Id" "Category1Id desc" "Category2Id" "Category2Id desc" "PlannedRevenue" "PlannedRevenue desc" "PlannedCost" "PlannedCost desc" "ProbabilityToWin" "ProbabilityToWin desc" "State" "State desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ProjectId" "Name" "Description" "PlanStart" "PlanFinish" "Company" "ProgramId" "Category1Id" "Category2Id" "PlannedRevenue" "PlannedCost" "ProbabilityToWin" "State"
Specify properties to return, see OData Select

Responses
200 response body for function ProjectLovListFourth :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/ProjectLovListFourth(Site='{Site}',Company='{Company}',ProgramId='{ProgramId}',LuName='{LuName}')

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
Invoke function SubProjectLuSpecificLovList
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string
Example: It is a Text
Site
required
string
Example: It is a Text
ProgramId
required
string
Example: It is a Text
LuName
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
Items Enum: "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ParentSubProjectId" "ParentSubProjectId desc" "Description" "Description desc" "Manager" "Manager desc" "Department" "Department desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "ExcludeFromWad" "ExcludeFromWad desc" "AddressId" "AddressId desc" "FinanciallyCompleted" "FinanciallyCompleted desc" "ExcludeFromIntegrations" "ExcludeFromIntegrations desc" "ActivitySeq" "ActivitySeq desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ProjectId" "SubProjectId" "ParentSubProjectId" "Description" "Manager" "Department" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "FinanciallyResponsible" "ExcludeFromWad" "AddressId" "FinanciallyCompleted" "ExcludeFromIntegrations" "ActivitySeq"
Specify properties to return, see OData Select

Responses
200 response body for function SubProjectLuSpecificLovList :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SubProjectLuSpecificLovList(Company='{Company}',Site='{Site}',ProgramId='{ProgramId}',LuName='{LuName}')

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
Invoke function SubProjectLovList
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string
Example: It is a Text
Site
required
string
Example: It is a Text
ProgramId
required
string
Example: It is a Text
LuName
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
Items Enum: "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ParentSubProjectId" "ParentSubProjectId desc" "Description" "Description desc" "Manager" "Manager desc" "Department" "Department desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "ExcludeFromWad" "ExcludeFromWad desc" "AddressId" "AddressId desc" "FinanciallyCompleted" "FinanciallyCompleted desc" "ExcludeFromIntegrations" "ExcludeFromIntegrations desc" "ActivitySeq" "ActivitySeq desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ProjectId" "SubProjectId" "ParentSubProjectId" "Description" "Manager" "Department" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "FinanciallyResponsible" "ExcludeFromWad" "AddressId" "FinanciallyCompleted" "ExcludeFromIntegrations" "ActivitySeq"
Specify properties to return, see OData Select

Responses
200 response body for function SubProjectLovList :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SubProjectLovList(Company='{Company}',Site='{Site}',ProgramId='{ProgramId}',LuName='{LuName}')

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
Invoke function GetActivityLuSpecific
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string
Example: It is a Text
Site
required
string
Example: It is a Text
ProgramId
required
string
Example: It is a Text
LuName
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
Items Enum: "ActivitySeq" "ActivitySeq desc" "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ActivityNo" "ActivityNo desc" "ActivityResponsible" "ActivityResponsible desc" "Description" "Description desc" "EarlyStart" "EarlyStart desc" "EarlyFinish" "EarlyFinish desc" "ShortName" "ShortName desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "ProgramId" "ProgramId desc" "Objstate" "Objstate desc" "ObjstateProj" "ObjstateProj desc" "Objid" "Objid desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ActivitySeq" "ProjectId" "SubProjectId" "ActivityNo" "ActivityResponsible" "Description" "EarlyStart" "EarlyFinish" "ShortName" "FinanciallyResponsible" "ProgramId" "Objstate" "ObjstateProj" "Objid"
Specify properties to return, see OData Select

Responses
200 response body for function GetActivityLuSpecific :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetActivityLuSpecific(Company='{Company}',Site='{Site}',ProgramId='{ProgramId}',LuName='{LuName}')

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
Invoke function GetActivity
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string
Example: It is a Text
Site
required
string
Example: It is a Text
ProgramId
required
string
Example: It is a Text
LuName
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
Items Enum: "ActivitySeq" "ActivitySeq desc" "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ActivityNo" "ActivityNo desc" "ActivityResponsible" "ActivityResponsible desc" "Description" "Description desc" "EarlyStart" "EarlyStart desc" "EarlyFinish" "EarlyFinish desc" "ShortName" "ShortName desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "ProgramId" "ProgramId desc" "Objstate" "Objstate desc" "ObjstateProj" "ObjstateProj desc" "Objid" "Objid desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ActivitySeq" "ProjectId" "SubProjectId" "ActivityNo" "ActivityResponsible" "Description" "EarlyStart" "EarlyFinish" "ShortName" "FinanciallyResponsible" "ProgramId" "Objstate" "ObjstateProj" "Objid"
Specify properties to return, see OData Select

Responses
200 response body for function GetActivity :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetActivity(Company='{Company}',Site='{Site}',ProgramId='{ProgramId}',LuName='{LuName}')

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
Invoke function GetAllActivities
Authorizations:
(OpenIdbasicAuth)
path Parameters
LuName
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
Items Enum: "ActivitySeq" "ActivitySeq desc" "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ActivityNo" "ActivityNo desc" "ActivityResponsible" "ActivityResponsible desc" "Description" "Description desc" "EarlyStart" "EarlyStart desc" "EarlyFinish" "EarlyFinish desc" "ShortName" "ShortName desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "ProgramId" "ProgramId desc" "Objstate" "Objstate desc" "ObjstateProj" "ObjstateProj desc" "Objid" "Objid desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ActivitySeq" "ProjectId" "SubProjectId" "ActivityNo" "ActivityResponsible" "Description" "EarlyStart" "EarlyFinish" "ShortName" "FinanciallyResponsible" "ProgramId" "Objstate" "ObjstateProj" "Objid"
Specify properties to return, see OData Select

Responses
200 response body for function GetAllActivities :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetAllActivities(LuName='{LuName}')

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
Invoke function CheckActivitySeq
Authorizations:
(OpenIdbasicAuth)
path Parameters
ActivitySeq
required
number
Example: 1
Responses
200 response body for function CheckActivitySeq :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CheckActivitySeq(ActivitySeq={ActivitySeq})

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": true
}
Invoke function GetRecordsWithSessionId
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
ConfigurationId
required
string
Example: It is a Text
LocationNo
required
string
Example: It is a Text
LotBatchNo
required
string
Example: It is a Text
EngChgLevel
required
string
Example: It is a Text
WaivDevRejNo
required
string
Example: It is a Text
ActivitySeq
required
number
Example: 1
HandlingUnitId
required
number
Example: 1
QtyToIssue
required
number
Example: 1
CatchQtyToIssue
required
number
Example: 1
AssistantTitle
required
string
Example: It is a Text
AssistantContext
required
string
Example: It is a Text
SessionId
required
number
Example: 1
Responses
200 response body for function GetRecordsWithSessionId :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetRecordsWithSessionId(Contract='{Contract}',PartNo='{PartNo}',ConfigurationId='{ConfigurationId}',LocationNo='{LocationNo}',LotBatchNo='{LotBatchNo}',EngChgLevel='{EngChgLevel}',WaivDevRejNo='{WaivDevRejNo}',ActivitySeq={ActivitySeq},HandlingUnitId={HandlingUnitId},QtyToIssue={QtyToIssue},CatchQtyToIssue={CatchQtyToIssue},AssistantTitle='{AssistantTitle}',AssistantContext='{AssistantContext}',SessionId={SessionId})

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"SessionId": 1,
"RemainingSelection": "It is a Text",
"Total": 1
}
Invoke function GetSerialNumbersForPr
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string
Example: It is a Text
LocationNo
required
string
Example: It is a Text
PartNo
required
string
Example: It is a Text
SessionId
required
number
Example: 1
LotBatchNo
required
string
Example: It is a Text
ConfigurationId
required
string
Example: It is a Text
EngChgLevel
required
string
Example: It is a Text
WaivDevRejNo
required
string
Example: It is a Text
ActivitySeq
required
number
Example: 1
HandlingUnitId
required
number
Example: 1
PartOwnershipDb
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
Items Enum: "SerialNo" "SerialNo desc" "PartNo" "PartNo desc" "Contract" "Contract desc" "ManufacturerNo" "ManufacturerNo desc" "SupplierNo" "SupplierNo desc" "PartOwnership" "PartOwnership desc" "PartOwnershipDb" "PartOwnershipDb desc" "OwningVendorNo" "OwningVendorNo desc" "OwningCustomerNo" "OwningCustomerNo desc" "OperationalStatus" "OperationalStatus desc" "OperationalStatusDb" "OperationalStatusDb desc" "OperationalCondition" "OperationalCondition desc" "OperationalConditionDb" "OperationalConditionDb desc" "LatestTransaction" "LatestTransaction desc" "LotBatchNo" "LotBatchNo desc" "ConfigurationId" "ConfigurationId desc" "LockedForUpdate" "LockedForUpdate desc" "LockedForUpdateDb" "LockedForUpdateDb desc" "ConditionCode" "ConditionCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "SerialNo" "PartNo" "Contract" "ManufacturerNo" "SupplierNo" "PartOwnership" "PartOwnershipDb" "OwningVendorNo" "OwningCustomerNo" "OperationalStatus" "OperationalStatusDb" "OperationalCondition" "OperationalConditionDb" "LatestTransaction" "LotBatchNo" "ConfigurationId" "LockedForUpdate" "LockedForUpdateDb" "ConditionCode"
Specify properties to return, see OData Select

Responses
200 response body for function GetSerialNumbersForPr :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetSerialNumbersForPr(Contract='{Contract}',LocationNo='{LocationNo}',PartNo='{PartNo}',SessionId={SessionId},LotBatchNo='{LotBatchNo}',ConfigurationId='{ConfigurationId}',EngChgLevel='{EngChgLevel}',WaivDevRejNo='{WaivDevRejNo}',ActivitySeq={ActivitySeq},HandlingUnitId={HandlingUnitId},PartOwnershipDb='{PartOwnershipDb}')

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
Invoke function CheckSerialRecords
Authorizations:
(OpenIdbasicAuth)
path Parameters
RemainingSelection
required
string
Example: It is a Text
Responses
200 response body for function CheckSerialRecords :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CheckSerialRecords(RemainingSelection='{RemainingSelection}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"Contract": "It is a Text",
"PartNo": "It is a Text",
"ConfigurationId": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"QtyIssue": 1,
"AssistantContext": "It is a Text",
"AssistantTitle": "It is a Text",
"SessionId": "It is a Text",
"CatchQtyIssue": 1,
"RemainingSelection": "It is a Text",
"SelectionRec": "It is a Text"
}
Invoke function CreateSessionId
Authorizations:
(OpenIdbasicAuth)
path Parameters
OldSelection
required
string
Example: It is a Text
Selection
required
string
Example: It is a Text
SessionId
required
number
Example: 1
Responses
200 response body for function CreateSessionId :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CreateSessionId(OldSelection='{OldSelection}',Selection='{Selection}',SessionId={SessionId})

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": "It is a Text"
}
Invoke function GetAccountNo
Authorizations:
(OpenIdbasicAuth)
path Parameters
VoucherDate
required
string <date>
Example: 2019-10-10
Company
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
Items Enum: "Company" "Company desc" "Account" "Account desc" "Description" "Description desc" "Ledaccnt" "Ledaccnt desc" "SortValue" "SortValue desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "Account" "Description" "Ledaccnt" "SortValue" "ValidFrom" "ValidUntil"
Specify properties to return, see OData Select

Responses
200 response body for function GetAccountNo :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetAccountNo(VoucherDate={VoucherDate},Company='{Company}')

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
Invoke function GetCodePartB
Authorizations:
(OpenIdbasicAuth)
path Parameters
VoucherDate
required
string <date>
Example: 2019-10-10
LabelCodenoB
required
string
Example: It is a Text
Company
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
Items Enum: "Company" "Company desc" "CodeB" "CodeB desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoB" "LabelCodenoB desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeB" "Description" "ValidFrom" "ValidUntil" "LabelCodenoB"
Specify properties to return, see OData Select

Responses
200 response body for function GetCodePartB :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetCodePartB(VoucherDate={VoucherDate},LabelCodenoB='{LabelCodenoB}',Company='{Company}')

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
Invoke function GetCodePartC
Authorizations:
(OpenIdbasicAuth)
path Parameters
VoucherDate
required
string <date>
Example: 2019-10-10
LabelCodenoC
required
string
Example: It is a Text
Company
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
Items Enum: "Company" "Company desc" "CodeC" "CodeC desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoC" "LabelCodenoC desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeC" "Description" "ValidFrom" "ValidUntil" "LabelCodenoC"
Specify properties to return, see OData Select

Responses
200 response body for function GetCodePartC :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetCodePartC(VoucherDate={VoucherDate},LabelCodenoC='{LabelCodenoC}',Company='{Company}')

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
Invoke function GetCodePartD
Authorizations:
(OpenIdbasicAuth)
path Parameters
VoucherDate
required
string <date>
Example: 2019-10-10
LabelCodenoD
required
string
Example: It is a Text
Company
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
Items Enum: "Company" "Company desc" "CodeD" "CodeD desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoD" "LabelCodenoD desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeD" "Description" "ValidFrom" "ValidUntil" "LabelCodenoD"
Specify properties to return, see OData Select

Responses
200 response body for function GetCodePartD :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetCodePartD(VoucherDate={VoucherDate},LabelCodenoD='{LabelCodenoD}',Company='{Company}')

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
Invoke function GetCodePartE
Authorizations:
(OpenIdbasicAuth)
path Parameters
VoucherDate
required
string <date>
Example: 2019-10-10
LabelCodenoE
required
string
Example: It is a Text
Company
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
Items Enum: "Company" "Company desc" "CodeE" "CodeE desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoE" "LabelCodenoE desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeE" "Description" "ValidFrom" "ValidUntil" "LabelCodenoE"
Specify properties to return, see OData Select

Responses
200 response body for function GetCodePartE :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetCodePartE(VoucherDate={VoucherDate},LabelCodenoE='{LabelCodenoE}',Company='{Company}')

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
Invoke function GetCodePartF
Authorizations:
(OpenIdbasicAuth)
path Parameters
VoucherDate
required
string <date>
Example: 2019-10-10
LabelCodenoF
required
string
Example: It is a Text
Company
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
Items Enum: "Company" "Company desc" "CodeF" "CodeF desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoF" "LabelCodenoF desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeF" "Description" "ValidFrom" "ValidUntil" "LabelCodenoF"
Specify properties to return, see OData Select

Responses
200 response body for function GetCodePartF :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetCodePartF(VoucherDate={VoucherDate},LabelCodenoF='{LabelCodenoF}',Company='{Company}')

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
Invoke function GetCodePartG
Authorizations:
(OpenIdbasicAuth)
path Parameters
VoucherDate
required
string <date>
Example: 2019-10-10
LabelCodenoG
required
string
Example: It is a Text
Company
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
Items Enum: "Company" "Company desc" "CodeG" "CodeG desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoG" "LabelCodenoG desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeG" "Description" "ValidFrom" "ValidUntil" "LabelCodenoG"
Specify properties to return, see OData Select

Responses
200 response body for function GetCodePartG :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetCodePartG(VoucherDate={VoucherDate},LabelCodenoG='{LabelCodenoG}',Company='{Company}')

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
Invoke function GetCodePartH
Authorizations:
(OpenIdbasicAuth)
path Parameters
VoucherDate
required
string <date>
Example: 2019-10-10
LabelCodenoH
required
string
Example: It is a Text
Company
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
Items Enum: "Company" "Company desc" "CodeH" "CodeH desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoH" "LabelCodenoH desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeH" "Description" "ValidFrom" "ValidUntil" "LabelCodenoH"
Specify properties to return, see OData Select

Responses
200 response body for function GetCodePartH :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetCodePartH(VoucherDate={VoucherDate},LabelCodenoH='{LabelCodenoH}',Company='{Company}')

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
Invoke function GetCodePartI
Authorizations:
(OpenIdbasicAuth)
path Parameters
VoucherDate
required
string <date>
Example: 2019-10-10
LabelCodenoI
required
string
Example: It is a Text
Company
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
Items Enum: "Company" "Company desc" "CodeI" "CodeI desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoI" "LabelCodenoI desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeI" "Description" "ValidFrom" "ValidUntil" "LabelCodenoI"
Specify properties to return, see OData Select

Responses
200 response body for function GetCodePartI :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetCodePartI(VoucherDate={VoucherDate},LabelCodenoI='{LabelCodenoI}',Company='{Company}')

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
Invoke function GetCodePartJ
Authorizations:
(OpenIdbasicAuth)
path Parameters
VoucherDate
required
string <date>
Example: 2019-10-10
LabelCodenoJ
required
string
Example: It is a Text
Company
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
Items Enum: "Company" "Company desc" "CodeJ" "CodeJ desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoJ" "LabelCodenoJ desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeJ" "Description" "ValidFrom" "ValidUntil" "LabelCodenoJ"
Specify properties to return, see OData Select

Responses
200 response body for function GetCodePartJ :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetCodePartJ(VoucherDate={VoucherDate},LabelCodenoJ='{LabelCodenoJ}',Company='{Company}')

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
Invoke function MandatoryPrePostingComplete
Authorizations:
(OpenIdbasicAuth)
path Parameters
PreAccountingId
required
number
Example: 1
PostingType
required
string
Example: It is a Text
Contract
required
string
Example: It is a Text
Responses
200 response body for function MandatoryPrePostingComplete :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/MandatoryPrePostingComplete(PreAccountingId={PreAccountingId},PostingType='{PostingType}',Contract='{Contract}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": true
}
Invoke function CheckMandatoryCodeParts
Authorizations:
(OpenIdbasicAuth)
path Parameters
PreAccountingId
required
number
Example: 1
PostingType
required
string
Example: It is a Text
Contract
required
string
Example: It is a Text
SourceIdentifier
required
string
Example: It is a Text
CheckOnlyProjectCodePart
required
boolean
Example: true
Responses
200 response body for function CheckMandatoryCodeParts :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CheckMandatoryCodeParts(PreAccountingId={PreAccountingId},PostingType='{PostingType}',Contract='{Contract}',SourceIdentifier='{SourceIdentifier}',CheckOnlyProjectCodePart={CheckOnlyProjectCodePart})

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": true
}
Invoke function CheckPrepostingEnabled
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string
Example: It is a Text
PostingType
required
string
Example: It is a Text
Responses
200 response body for function CheckPrepostingEnabled :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CheckPrepostingEnabled(Company='{Company}',PostingType='{PostingType}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": true
}
Invoke function GetCodepartsSettings
Authorizations:
(OpenIdbasicAuth)
path Parameters
PostingType
required
string
Example: It is a Text
Contract
required
string
Example: It is a Text
Responses
200 response body for function GetCodepartsSettings :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetCodepartsSettings(PostingType='{PostingType}',Contract='{Contract}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"AllCodepartsCompiled": "It is a Text",
"AccountNo": "It is a Text",
"CodenoB": "It is a Text",
"CodenoC": "It is a Text",
"CodenoD": "It is a Text",
"CodenoE": "It is a Text",
"CodenoF": "It is a Text",
"CodenoG": "It is a Text",
"CodenoH": "It is a Text",
"CodenoI": "It is a Text",
"CodenoJ": "It is a Text"
}
Invoke function CreatePurchaseInformationNavigation
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderClass
required
string (MaterialRequisType_Enumeration)
Enum: "INT" "PDM"
OrderNo
required
string
Example: It is a Text
LineNo
required
string
Example: It is a Text
ReleaseNo
required
string
Example: It is a Text
LineItemNo
required
number
Example: 1
Responses
200 response body for function CreatePurchaseInformationNavigation :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CreatePurchaseInformationNavigation(OrderClass=IfsApp.MaterialRequisitionLinesHandling.OrderClass'{OrderClass}',OrderNo='{OrderNo}',LineNo='{LineNo}',ReleaseNo='{ReleaseNo}',LineItemNo={LineItemNo})

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": "It is a Text"
}
Invoke function GetPartInformation
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
200 response body for function GetPartInformation :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetPartInformation(PartNo='{PartNo}',Contract='{Contract}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"PartDescription": "It is a Text",
"SupplyCode": "InventoryOrder",
"UnitMeas": "It is a Text"
}
Invoke function IsReserveQuantityExpired
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string
Example: It is a Text
ParentObjkey
required
string
Example: It is a Text
Responses
200 response body for function IsReserveQuantityExpired :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/IsReserveQuantityExpired(Contract='{Contract}',ParentObjkey='{ParentObjkey}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": true
}
Invoke function IsIssueQuantityExpired
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
ParentObjkey
required
string
Example: It is a Text
Responses
200 response body for function IsIssueQuantityExpired :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/IsIssueQuantityExpired(Contract='{Contract}',PartNo='{PartNo}',ParentObjkey='{ParentObjkey}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": true
}
Invoke function GetProjectsForCompany
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
Items Enum: "Objstate" "Objstate desc" "ProjectId" "ProjectId desc" "Name" "Name desc" "Description" "Description desc" "PlanStart" "PlanStart desc" "PlanFinish" "PlanFinish desc" "ActualStart" "ActualStart desc" "ActualFinish" "ActualFinish desc" "FrozenDate" "FrozenDate desc" "CloseDate" "CloseDate desc" "CancelDate" "CancelDate desc" "ApprovedDate" "ApprovedDate desc" "Manager" "Manager desc" "CustomerId" "CustomerId desc" "CustomerResponsible" "CustomerResponsible desc" "CustomerProjectId" "CustomerProjectId desc" "Company" "Company desc" "Branch" "Branch desc" "Site" "Site desc" "CalendarId" "CalendarId desc" "ProgramId" "ProgramId desc" "PlannedRevenue" "PlannedRevenue desc" "PlannedCost" "PlannedCost desc" "CurrencyType" "CurrencyType desc" "ProbabilityToWin" "ProbabilityToWin desc" "DefaultCharTemp" "DefaultCharTemp desc" "AccessOnOff" "AccessOnOff desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "BaselineRevisionNumber" "BaselineRevisionNumber desc" "EarnedValueMethod" "EarnedValueMethod desc" "MaterialAllocation" "MaterialAllocation desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "BudgetControlOn" "BudgetControlOn desc" "ControlAsBudgeted" "ControlAsBudgeted desc" "ControlOnTotalBudget" "ControlOnTotalBudget desc" "ProjUniquePurchase" "ProjUniquePurchase desc" "ProjUniqueSale" "ProjUniqueSale desc" "CopiedProject" "CopiedProject desc" "CostStructureId" "CostStructureId desc" "MultiCurrencyBudgeting" "MultiCurrencyBudgeting desc" "ProjectCurrencyType" "ProjectCurrencyType desc" "BudgetCurrencyType" "BudgetCurrencyType desc" "ProjectCurrencyCode" "ProjectCurrencyCode desc" "Category1Id" "Category1Id desc" "Category2Id" "Category2Id desc" "ValidateRemainingAgainst" "ValidateRemainingAgainst desc" "BudgetForecastId" "BudgetForecastId desc" "SelectedForecastId" "SelectedForecastId desc" "SelectedForecastType" "SelectedForecastType desc" "SelectedForecastVersion" "SelectedForecastVersion desc" "ProjectMiscCompMethod" "ProjectMiscCompMethod desc" "InternalRentalPriceList" "InternalRentalPriceList desc" "PlanProjectTransaction" "PlanProjectTransaction desc" "WorkDayToHoursConv" "WorkDayToHoursConv desc" "FinancialProjectExist" "FinancialProjectExist desc" "DefaultCostActivitySeq" "DefaultCostActivitySeq desc" "ExcludeFromBatchInvoice" "ExcludeFromBatchInvoice desc" "ActivitySeq" "ActivitySeq desc" "MandatoryInvoiceComment" "MandatoryInvoiceComment desc" "CashForecastMultiCurr" "CashForecastMultiCurr desc" "BusinessTransactionId" "BusinessTransactionId desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ProjectId" "Name" "Description" "PlanStart" "PlanFinish" "ActualStart" "ActualFinish" "FrozenDate" "CloseDate" "CancelDate" "ApprovedDate" "Manager" "CustomerId" "CustomerResponsible" "CustomerProjectId" "Company" "Branch" "Site" "CalendarId" "ProgramId" "PlannedRevenue" "PlannedCost" "CurrencyType" "ProbabilityToWin" "DefaultCharTemp" "AccessOnOff" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "BaselineRevisionNumber" "EarnedValueMethod" "MaterialAllocation" "FinanciallyResponsible" "BudgetControlOn" "ControlAsBudgeted" "ControlOnTotalBudget" "ProjUniquePurchase" "ProjUniqueSale" "CopiedProject" "CostStructureId" "MultiCurrencyBudgeting" "ProjectCurrencyType" "BudgetCurrencyType" "ProjectCurrencyCode" "Category1Id" "Category2Id" "ValidateRemainingAgainst" "BudgetForecastId" "SelectedForecastId" "SelectedForecastType" "SelectedForecastVersion" "ProjectMiscCompMethod" "InternalRentalPriceList" "PlanProjectTransaction" "WorkDayToHoursConv" "FinancialProjectExist" "DefaultCostActivitySeq" "ExcludeFromBatchInvoice" "ActivitySeq" "MandatoryInvoiceComment" "CashForecastMultiCurr" "BusinessTransactionId"
Specify properties to return, see OData Select

Responses
200 response body for function GetProjectsForCompany :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetProjectsForCompany(Contract='{Contract}')

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
Invoke function GetFilteredActivities
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
Items Enum: "Objstate" "Objstate desc" "ActivitySeq" "ActivitySeq desc" "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ActivityNo" "ActivityNo desc" "TotalKeyPath" "TotalKeyPath desc" "ActivityResponsible" "ActivityResponsible desc" "Description" "Description desc" "ManualProgressLevel" "ManualProgressLevel desc" "EstimatedProgress" "EstimatedProgress desc" "ManualProgressCost" "ManualProgressCost desc" "ManualProgressHours" "ManualProgressHours desc" "TotalDurationDays" "TotalDurationDays desc" "TotalWorkDays" "TotalWorkDays desc" "Note" "Note desc" "EarlyStart" "EarlyStart desc" "EarlyFinish" "EarlyFinish desc" "LateStart" "LateStart desc" "LateFinish" "LateFinish desc" "BaseLineEarlyStart" "BaseLineEarlyStart desc" "BaseLineEarlyFinish" "BaseLineEarlyFinish desc" "ActualStart" "ActualStart desc" "ActualFinish" "ActualFinish desc" "CancelDate" "CancelDate desc" "ShortName" "ShortName desc" "ReleasedDate" "ReleasedDate desc" "CompletedDate" "CompletedDate desc" "ClosedDate" "ClosedDate desc" "ProgressMethod" "ProgressMethod desc" "PlannedCostDriver" "PlannedCostDriver desc" "PreAccountingId" "PreAccountingId desc" "ProgressTemplate" "ProgressTemplate desc" "ProgressTemplateStep" "ProgressTemplateStep desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "SetInBaseline" "SetInBaseline desc" "SetActivityChanged" "SetActivityChanged desc" "CaseId" "CaseId desc" "TaskId" "TaskId desc" "ActMilestone" "ActMilestone desc" "BaselinePcd" "BaselinePcd desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "AmountPlanned" "AmountPlanned desc" "AmountUsed" "AmountUsed desc" "ExcludeFromWad" "ExcludeFromWad desc" "GenerateSafetyStock" "GenerateSafetyStock desc" "HoursPlanned" "HoursPlanned desc" "AddressId" "AddressId desc" "BaselineTotalWorkDays" "BaselineTotalWorkDays desc" "ExcludePeriodicalCap" "ExcludePeriodicalCap desc" "FinanciallyCompleted" "FinanciallyCompleted desc" "ExcludeResourceProgress" "ExcludeResourceProgress desc" "FreeFloat" "FreeFloat desc" "TotalFloat" "TotalFloat desc" "ConstraintType" "ConstraintType desc" "ConstraintDate" "ConstraintDate desc" "ExcludeFromIntegrations" "ExcludeFromIntegrations desc" "NodeType" "NodeType desc" "MandatoryInvoiceComment" "MandatoryInvoiceComment desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ActivitySeq" "ProjectId" "SubProjectId" "ActivityNo" "TotalKeyPath" "ActivityResponsible" "Description" "ManualProgressLevel" "EstimatedProgress" "ManualProgressCost" "ManualProgressHours" "TotalDurationDays" "TotalWorkDays" "Note" "EarlyStart" "EarlyFinish" "LateStart" "LateFinish" "BaseLineEarlyStart" "BaseLineEarlyFinish" "ActualStart" "ActualFinish" "CancelDate" "ShortName" "ReleasedDate" "CompletedDate" "ClosedDate" "ProgressMethod" "PlannedCostDriver" "PreAccountingId" "ProgressTemplate" "ProgressTemplateStep" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "SetInBaseline" "SetActivityChanged" "CaseId" "TaskId" "ActMilestone" "BaselinePcd" "FinanciallyResponsible" "AmountPlanned" "AmountUsed" "ExcludeFromWad" "GenerateSafetyStock" "HoursPlanned" "AddressId" "BaselineTotalWorkDays" "ExcludePeriodicalCap" "FinanciallyCompleted" "ExcludeResourceProgress" "FreeFloat" "TotalFloat" "ConstraintType" "ConstraintDate" "ExcludeFromIntegrations" "NodeType" "MandatoryInvoiceComment"
Specify properties to return, see OData Select

Responses
200 response body for function GetFilteredActivities :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetFilteredActivities(Contract='{Contract}')

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
Reference_MaterialRequis
Reference Entity Set Reference_MaterialRequis

Get entities from Reference_MaterialRequis
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
Items Enum: "OrderNo" "OrderNo desc" "StatusCode" "StatusCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "OrderNo" "StatusCode"
Specify properties to return, see OData Select

Responses
200 response body for entity array MaterialRequis
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_MaterialRequis

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_MaterialRequis by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
OrderNo
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "OrderNo" "StatusCode"
Specify properties to return, see OData Select

Responses
200 response body for entity type MaterialRequis
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_MaterialRequis(OrderNo='{OrderNo}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"OrderNo": "It is a Text",
"StatusCode": "Planned"
}
Reference_InternalDestinationLov
Reference Entity Set Reference_InternalDestinationLov

Get entities from Reference_InternalDestinationLov
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
Items Enum: "Contract" "Contract desc" "DestinationId" "DestinationId desc" "Description" "Description desc" "Objstate" "Objstate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "DestinationId" "Description" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity array InternalDestinationLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InternalDestinationLov

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_InternalDestinationLov by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Contract
required
string <= 4000 characters
Example: It is a Text
DestinationId
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "DestinationId" "Description" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity type InternalDestinationLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InternalDestinationLov(Contract='{Contract}',DestinationId='{DestinationId}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"Contract": "It is a Text",
"DestinationId": "It is a Text",
"Description": "It is a Text",
"Objstate": "Active"
}
Reference_InventoryPartLovMrp
Reference Entity Set Reference_InventoryPartLovMrp

Get entities from Reference_InventoryPartLovMrp
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
Items Enum: "Contract" "Contract desc" "PartNo" "PartNo desc" "Description" "Description desc" "DimQuality" "DimQuality desc" "SupplyCode" "SupplyCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description" "DimQuality" "SupplyCode"
Specify properties to return, see OData Select

Responses
200 response body for entity array InventoryPartLovMrp
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryPartLovMrp

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_InventoryPartLovMrp by key
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
Items Enum: "luname" "keyref" "Contract" "PartNo" "Description" "DimQuality" "SupplyCode"
Specify properties to return, see OData Select

Responses
200 response body for entity type InventoryPartLovMrp
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InventoryPartLovMrp(Contract='{Contract}',PartNo='{PartNo}')

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
"DimQuality": "It is a Text",
"SupplyCode": "InventoryOrder"
}
Reference_TemporaryPartTrackingSerial
Reference Entity Set Reference_TemporaryPartTrackingSerial

Get entities from Reference_TemporaryPartTrackingSerial
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
Items Enum: "SerialNo" "SerialNo desc" "PartNo" "PartNo desc" "Contract" "Contract desc" "ManufacturerNo" "ManufacturerNo desc" "SupplierNo" "SupplierNo desc" "PartOwnership" "PartOwnership desc" "PartOwnershipDb" "PartOwnershipDb desc" "OwningVendorNo" "OwningVendorNo desc" "OwningCustomerNo" "OwningCustomerNo desc" "OperationalStatus" "OperationalStatus desc" "OperationalStatusDb" "OperationalStatusDb desc" "OperationalCondition" "OperationalCondition desc" "OperationalConditionDb" "OperationalConditionDb desc" "LatestTransaction" "LatestTransaction desc" "LotBatchNo" "LotBatchNo desc" "ConfigurationId" "ConfigurationId desc" "LockedForUpdate" "LockedForUpdate desc" "LockedForUpdateDb" "LockedForUpdateDb desc" "ConditionCode" "ConditionCode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "SerialNo" "PartNo" "Contract" "ManufacturerNo" "SupplierNo" "PartOwnership" "PartOwnershipDb" "OwningVendorNo" "OwningCustomerNo" "OperationalStatus" "OperationalStatusDb" "OperationalCondition" "OperationalConditionDb" "LatestTransaction" "LotBatchNo" "ConfigurationId" "LockedForUpdate" "LockedForUpdateDb" "ConditionCode"
Specify properties to return, see OData Select

Responses
200 response body for entity array TemporaryPartTrackingSerial
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_TemporaryPartTrackingSerial

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_TemporaryPartTrackingSerial by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
SerialNo
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
Items Enum: "luname" "keyref" "SerialNo" "PartNo" "Contract" "ManufacturerNo" "SupplierNo" "PartOwnership" "PartOwnershipDb" "OwningVendorNo" "OwningCustomerNo" "OperationalStatus" "OperationalStatusDb" "OperationalCondition" "OperationalConditionDb" "LatestTransaction" "LotBatchNo" "ConfigurationId" "LockedForUpdate" "LockedForUpdateDb" "ConditionCode"
Specify properties to return, see OData Select

Responses
200 response body for entity type TemporaryPartTrackingSerial
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_TemporaryPartTrackingSerial(SerialNo='{SerialNo}',PartNo='{PartNo}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"SerialNo": "It is a Text",
"PartNo": "It is a Text",
"Contract": "It is a Text",
"ManufacturerNo": "It is a Text",
"SupplierNo": "It is a Text",
"PartOwnership": "It is a Text",
"PartOwnershipDb": "It is a Text",
"OwningVendorNo": "It is a Text",
"OwningCustomerNo": "It is a Text",
"OperationalStatus": "It is a Text",
"OperationalStatusDb": "It is a Text",
"OperationalCondition": "It is a Text",
"OperationalConditionDb": "It is a Text",
"LatestTransaction": "It is a Text",
"LotBatchNo": "It is a Text",
"ConfigurationId": "It is a Text",
"LockedForUpdate": "It is a Text",
"LockedForUpdateDb": "It is a Text",
"ConditionCode": "It is a Text"
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
Reference_ProjectProgramLov
Reference Entity Set Reference_ProjectProgramLov

Get entities from Reference_ProjectProgramLov
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
Items Enum: "Company" "Company desc" "ProgramId" "ProgramId desc" "Description" "Description desc" "Objstate" "Objstate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "ProgramId" "Description" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity array ProjectProgramLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ProjectProgramLov

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_ProjectProgramLov by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string <= 4000 characters
Example: It is a Text
ProgramId
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "ProgramId" "Description" "Objstate"
Specify properties to return, see OData Select

Responses
200 response body for entity type ProjectProgramLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ProjectProgramLov(Company='{Company}',ProgramId='{ProgramId}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"Company": "It is a Text",
"ProgramId": "It is a Text",
"Description": "It is a Text",
"Objstate": "Active"
}
Reference_ProjectLov
Reference Entity Set Reference_ProjectLov

Get entities from Reference_ProjectLov
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
Items Enum: "ProjectId" "ProjectId desc" "Name" "Name desc" "Description" "Description desc" "PlanStart" "PlanStart desc" "PlanFinish" "PlanFinish desc" "Company" "Company desc" "ProgramId" "ProgramId desc" "Category1Id" "Category1Id desc" "Category2Id" "Category2Id desc" "PlannedRevenue" "PlannedRevenue desc" "PlannedCost" "PlannedCost desc" "ProbabilityToWin" "ProbabilityToWin desc" "State" "State desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ProjectId" "Name" "Description" "PlanStart" "PlanFinish" "Company" "ProgramId" "Category1Id" "Category2Id" "PlannedRevenue" "PlannedCost" "ProbabilityToWin" "State"
Specify properties to return, see OData Select

Responses
200 response body for entity array ProjectLov
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ProjectLov

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_ProjectLov by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProjectId
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "ProjectId" "Name" "Description" "PlanStart" "PlanFinish" "Company" "ProgramId" "Category1Id" "Category2Id" "PlannedRevenue" "PlannedCost" "ProbabilityToWin" "State"
Specify properties to return, see OData Select

Responses
200 response body for entity type ProjectLov
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ProjectLov(ProjectId='{ProjectId}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"ProjectId": "It is a Text",
"Name": "It is a Text",
"Description": "It is a Text",
"PlanStart": "2019-10-10",
"PlanFinish": "2019-10-10",
"Company": "It is a Text",
"ProgramId": "It is a Text",
"Category1Id": "It is a Text",
"Category2Id": "It is a Text",
"PlannedRevenue": 1,
"PlannedCost": 1,
"ProbabilityToWin": 1,
"State": "It is a Text"
}
Reference_ActivityProjConnect
Reference Entity Set Reference_ActivityProjConnect

Get entities from Reference_ActivityProjConnect
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
Items Enum: "ActivitySeq" "ActivitySeq desc" "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ActivityNo" "ActivityNo desc" "ActivityResponsible" "ActivityResponsible desc" "Description" "Description desc" "EarlyStart" "EarlyStart desc" "EarlyFinish" "EarlyFinish desc" "ShortName" "ShortName desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "ProgramId" "ProgramId desc" "Objstate" "Objstate desc" "ObjstateProj" "ObjstateProj desc" "Objid" "Objid desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ActivitySeq" "ProjectId" "SubProjectId" "ActivityNo" "ActivityResponsible" "Description" "EarlyStart" "EarlyFinish" "ShortName" "FinanciallyResponsible" "ProgramId" "Objstate" "ObjstateProj" "Objid"
Specify properties to return, see OData Select

Responses
200 response body for entity array ActivityProjConnect
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ActivityProjConnect

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_ActivityProjConnect by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
ActivitySeq
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "ActivitySeq" "ProjectId" "SubProjectId" "ActivityNo" "ActivityResponsible" "Description" "EarlyStart" "EarlyFinish" "ShortName" "FinanciallyResponsible" "ProgramId" "Objstate" "ObjstateProj" "Objid"
Specify properties to return, see OData Select

Responses
200 response body for entity type ActivityProjConnect
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ActivityProjConnect(ActivitySeq={ActivitySeq})

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"SubProjectId": "It is a Text",
"ActivityNo": "It is a Text",
"ActivityResponsible": "It is a Text",
"Description": "It is a Text",
"EarlyStart": "2019-10-01T01:01:01Z",
"EarlyFinish": "2019-10-01T01:01:01Z",
"ShortName": "It is a Text",
"FinanciallyResponsible": "It is a Text",
"ProgramId": "It is a Text",
"ObjstateProj": "It is a Text",
"Objid": "It is a Text",
"Objstate": "Planned"
}
Reference_PreAccountCodepartAMpccom
Reference Entity Set Reference_PreAccountCodepartAMpccom

Get entities from Reference_PreAccountCodepartAMpccom
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
Items Enum: "Company" "Company desc" "Account" "Account desc" "Description" "Description desc" "Ledaccnt" "Ledaccnt desc" "SortValue" "SortValue desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "Account" "Description" "Ledaccnt" "SortValue" "ValidFrom" "ValidUntil"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountCodepartAMpccom
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountCodepartAMpccom

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_PreAccountCodepartAMpccom by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string <= 4000 characters
Example: It is a Text
Account
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "Account" "Description" "Ledaccnt" "SortValue" "ValidFrom" "ValidUntil"
Specify properties to return, see OData Select

Responses
200 response body for entity type PreAccountCodepartAMpccom
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountCodepartAMpccom(Company='{Company}',Account='{Account}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"Company": "It is a Text",
"Account": "It is a Text",
"Description": "It is a Text",
"Ledaccnt": "It is a Text",
"SortValue": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidUntil": "2019-10-10"
}
Reference_PreAccountingCodepartB
Reference Entity Set Reference_PreAccountingCodepartB

Get entities from Reference_PreAccountingCodepartB
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
Items Enum: "Company" "Company desc" "CodeB" "CodeB desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoB" "LabelCodenoB desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeB" "Description" "ValidFrom" "ValidUntil" "LabelCodenoB"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartB
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingCodepartB

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_PreAccountingCodepartB by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string <= 4000 characters
Example: It is a Text
CodeB
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeB" "Description" "ValidFrom" "ValidUntil" "LabelCodenoB"
Specify properties to return, see OData Select

Responses
200 response body for entity type PreAccountingCodepartB
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingCodepartB(Company='{Company}',CodeB='{CodeB}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"Company": "It is a Text",
"CodeB": "It is a Text",
"Description": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidUntil": "2019-10-10",
"LabelCodenoB": "It is a Text"
}
Reference_PreAccountingCodepartC
Reference Entity Set Reference_PreAccountingCodepartC

Get entities from Reference_PreAccountingCodepartC
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
Items Enum: "Company" "Company desc" "CodeC" "CodeC desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoC" "LabelCodenoC desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeC" "Description" "ValidFrom" "ValidUntil" "LabelCodenoC"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartC
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingCodepartC

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_PreAccountingCodepartC by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string <= 4000 characters
Example: It is a Text
CodeC
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeC" "Description" "ValidFrom" "ValidUntil" "LabelCodenoC"
Specify properties to return, see OData Select

Responses
200 response body for entity type PreAccountingCodepartC
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingCodepartC(Company='{Company}',CodeC='{CodeC}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"Company": "It is a Text",
"CodeC": "It is a Text",
"Description": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidUntil": "2019-10-10",
"LabelCodenoC": "It is a Text"
}
Reference_PreAccountingCodepartD
Reference Entity Set Reference_PreAccountingCodepartD

Get entities from Reference_PreAccountingCodepartD
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
Items Enum: "Company" "Company desc" "CodeD" "CodeD desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoD" "LabelCodenoD desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeD" "Description" "ValidFrom" "ValidUntil" "LabelCodenoD"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartD
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingCodepartD

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_PreAccountingCodepartD by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string <= 4000 characters
Example: It is a Text
CodeD
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeD" "Description" "ValidFrom" "ValidUntil" "LabelCodenoD"
Specify properties to return, see OData Select

Responses
200 response body for entity type PreAccountingCodepartD
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingCodepartD(Company='{Company}',CodeD='{CodeD}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"Company": "It is a Text",
"CodeD": "It is a Text",
"Description": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidUntil": "2019-10-10",
"LabelCodenoD": "It is a Text"
}
Reference_PreAccountingCodepartE
Reference Entity Set Reference_PreAccountingCodepartE

Get entities from Reference_PreAccountingCodepartE
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
Items Enum: "Company" "Company desc" "CodeE" "CodeE desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoE" "LabelCodenoE desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeE" "Description" "ValidFrom" "ValidUntil" "LabelCodenoE"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartE
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingCodepartE

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_PreAccountingCodepartE by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string <= 4000 characters
Example: It is a Text
CodeE
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeE" "Description" "ValidFrom" "ValidUntil" "LabelCodenoE"
Specify properties to return, see OData Select

Responses
200 response body for entity type PreAccountingCodepartE
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingCodepartE(Company='{Company}',CodeE='{CodeE}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"Company": "It is a Text",
"CodeE": "It is a Text",
"Description": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidUntil": "2019-10-10",
"LabelCodenoE": "It is a Text"
}
Reference_PreAccountingCodepartF
Reference Entity Set Reference_PreAccountingCodepartF

Get entities from Reference_PreAccountingCodepartF
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
Items Enum: "Company" "Company desc" "CodeF" "CodeF desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoF" "LabelCodenoF desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeF" "Description" "ValidFrom" "ValidUntil" "LabelCodenoF"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartF
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingCodepartF

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_PreAccountingCodepartF by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string <= 4000 characters
Example: It is a Text
CodeF
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeF" "Description" "ValidFrom" "ValidUntil" "LabelCodenoF"
Specify properties to return, see OData Select

Responses
200 response body for entity type PreAccountingCodepartF
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingCodepartF(Company='{Company}',CodeF='{CodeF}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"Company": "It is a Text",
"CodeF": "It is a Text",
"Description": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidUntil": "2019-10-10",
"LabelCodenoF": "It is a Text"
}
Reference_PreAccountingCodepartG
Reference Entity Set Reference_PreAccountingCodepartG

Get entities from Reference_PreAccountingCodepartG
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
Items Enum: "Company" "Company desc" "CodeG" "CodeG desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoG" "LabelCodenoG desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeG" "Description" "ValidFrom" "ValidUntil" "LabelCodenoG"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartG
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingCodepartG

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_PreAccountingCodepartG by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string <= 4000 characters
Example: It is a Text
CodeG
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeG" "Description" "ValidFrom" "ValidUntil" "LabelCodenoG"
Specify properties to return, see OData Select

Responses
200 response body for entity type PreAccountingCodepartG
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingCodepartG(Company='{Company}',CodeG='{CodeG}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"Company": "It is a Text",
"CodeG": "It is a Text",
"Description": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidUntil": "2019-10-10",
"LabelCodenoG": "It is a Text"
}
Reference_PreAccountingCodepartH
Reference Entity Set Reference_PreAccountingCodepartH

Get entities from Reference_PreAccountingCodepartH
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
Items Enum: "Company" "Company desc" "CodeH" "CodeH desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoH" "LabelCodenoH desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeH" "Description" "ValidFrom" "ValidUntil" "LabelCodenoH"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartH
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingCodepartH

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_PreAccountingCodepartH by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string <= 4000 characters
Example: It is a Text
CodeH
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeH" "Description" "ValidFrom" "ValidUntil" "LabelCodenoH"
Specify properties to return, see OData Select

Responses
200 response body for entity type PreAccountingCodepartH
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingCodepartH(Company='{Company}',CodeH='{CodeH}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"Company": "It is a Text",
"CodeH": "It is a Text",
"Description": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidUntil": "2019-10-10",
"LabelCodenoH": "It is a Text"
}
Reference_PreAccountingCodepartI
Reference Entity Set Reference_PreAccountingCodepartI

Get entities from Reference_PreAccountingCodepartI
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
Items Enum: "Company" "Company desc" "CodeI" "CodeI desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoI" "LabelCodenoI desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeI" "Description" "ValidFrom" "ValidUntil" "LabelCodenoI"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartI
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingCodepartI

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_PreAccountingCodepartI by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string <= 4000 characters
Example: It is a Text
CodeI
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeI" "Description" "ValidFrom" "ValidUntil" "LabelCodenoI"
Specify properties to return, see OData Select

Responses
200 response body for entity type PreAccountingCodepartI
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingCodepartI(Company='{Company}',CodeI='{CodeI}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"Company": "It is a Text",
"CodeI": "It is a Text",
"Description": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidUntil": "2019-10-10",
"LabelCodenoI": "It is a Text"
}
Reference_PreAccountingCodepartJ
Reference Entity Set Reference_PreAccountingCodepartJ

Get entities from Reference_PreAccountingCodepartJ
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
Items Enum: "Company" "Company desc" "CodeJ" "CodeJ desc" "Description" "Description desc" "ValidFrom" "ValidFrom desc" "ValidUntil" "ValidUntil desc" "LabelCodenoJ" "LabelCodenoJ desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeJ" "Description" "ValidFrom" "ValidUntil" "LabelCodenoJ"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingCodepartJ
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingCodepartJ

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_PreAccountingCodepartJ by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Company
required
string <= 4000 characters
Example: It is a Text
CodeJ
required
string <= 4000 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Company" "CodeJ" "Description" "ValidFrom" "ValidUntil" "LabelCodenoJ"
Specify properties to return, see OData Select

Responses
200 response body for entity type PreAccountingCodepartJ
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingCodepartJ(Company='{Company}',CodeJ='{CodeJ}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"Company": "It is a Text",
"CodeJ": "It is a Text",
"Description": "It is a Text",
"ValidFrom": "2019-10-10",
"ValidUntil": "2019-10-10",
"LabelCodenoJ": "It is a Text"
}
Reference_SequenceGeneratorVirtual
Reference Entity Set Reference_SequenceGeneratorVirtual

Get entities from Reference_SequenceGeneratorVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "Prefix" "Prefix desc" "Suffix" "Suffix desc" "Length" "Length desc" "Quantity" "Quantity desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Prefix" "Suffix" "Length" "SerialList" "Quantity"
Specify properties to return, see OData Select

Responses
200 response body for entity array SequenceGeneratorVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SequenceGeneratorVirtual

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_SequenceGeneratorVirtual by key
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Prefix" "Suffix" "Length" "SerialList" "Quantity"
Specify properties to return, see OData Select

Responses
200 response body for entity type SequenceGeneratorVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SequenceGeneratorVirtual(Objkey='{Objkey}')

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
"Prefix": "It is a Text",
"Suffix": "It is a Text",
"Length": 1,
"SerialList": "",
"Quantity": 1
}
Reference_SequencesVirtual
Reference Entity Set Reference_SequencesVirtual

Get entities from Reference_SequencesVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "FromSerialNo" "FromSerialNo desc" "ToSerialNo" "ToSerialNo desc" "SerialList" "SerialList desc" "Quantity" "Quantity desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "FromSerialNo" "ToSerialNo" "SerialList" "Quantity"
Specify properties to return, see OData Select

Responses
200 response body for entity array SequencesVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SequencesVirtual

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_SequencesVirtual by key
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "FromSerialNo" "ToSerialNo" "SerialList" "Quantity"
Specify properties to return, see OData Select

Responses
200 response body for entity type SequencesVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SequencesVirtual(Objkey='{Objkey}')

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
"FromSerialNo": 1,
"ToSerialNo": 1,
"SerialList": "It is a Text",
"Quantity": 1
}
Reference_SequencePreviewVirtual
Reference Entity Set Reference_SequencePreviewVirtual

Get entities from Reference_SequencePreviewVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "SerialObjkey" "SerialObjkey desc" "Prefix" "Prefix desc" "Suffix" "Suffix desc" "Length" "Length desc" "Sum" "Sum desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SerialObjkey" "Prefix" "Suffix" "Length" "Sum"
Specify properties to return, see OData Select

Responses
200 response body for entity array SequencePreviewVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SequencePreviewVirtual

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_SequencePreviewVirtual by key
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SerialObjkey" "Prefix" "Suffix" "Length" "Sum"
Specify properties to return, see OData Select

Responses
200 response body for entity type SequencePreviewVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SequencePreviewVirtual(Objkey='{Objkey}')

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
"SerialObjkey": "It is a Text",
"Prefix": "It is a Text",
"Suffix": "It is a Text",
"Length": 1,
"Sum": 1
}
Reference_SequencePreviewListVirtual
Reference Entity Set Reference_SequencePreviewListVirtual

Get entities from Reference_SequencePreviewListVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "SerialNo" "SerialNo desc" "LineNo" "LineNo desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SerialNo" "LineNo"
Specify properties to return, see OData Select

Responses
200 response body for entity array SequencePreviewListVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SequencePreviewListVirtual

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_SequencePreviewListVirtual by key
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "SerialNo" "LineNo"
Specify properties to return, see OData Select

Responses
200 response body for entity type SequencePreviewListVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SequencePreviewListVirtual(Objkey='{Objkey}')

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
"SerialNo": "It is a Text",
"LineNo": 1
}
Reference_IdentifySerialsInMultipleLocVirtual
Reference Entity Set Reference_IdentifySerialsInMultipleLocVirtual

Get entities from Reference_IdentifySerialsInMultipleLocVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "Ref1" "Ref1 desc" "Ref2" "Ref2 desc" "Ref3" "Ref3 desc" "Ref4" "Ref4 desc" "Ref5" "Ref5 desc" "RefType" "RefType desc" "PartNo" "PartNo desc" "PartDescription" "PartDescription desc" "CatchUoM" "CatchUoM desc" "QtyToIdentify" "QtyToIdentify desc" "SerialsIdentified" "SerialsIdentified desc" "Contract" "Contract desc" "CatchUnitEnabled" "CatchUnitEnabled desc" "SessionId" "SessionId desc" "LotBatchNo" "LotBatchNo desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Ref1" "Ref2" "Ref3" "Ref4" "Ref5" "RefType" "PartNo" "PartDescription" "CatchUoM" "QtyToIdentify" "SerialsIdentified" "Contract" "CatchUnitEnabled" "SessionId" "LotBatchNo"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartDescriptionRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array IdentifySerialsInMultipleLocVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_IdentifySerialsInMultipleLocVirtual

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_IdentifySerialsInMultipleLocVirtual by key
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Ref1" "Ref2" "Ref3" "Ref4" "Ref5" "RefType" "PartNo" "PartDescription" "CatchUoM" "QtyToIdentify" "SerialsIdentified" "Contract" "CatchUnitEnabled" "SessionId" "LotBatchNo"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "PartDescriptionRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type IdentifySerialsInMultipleLocVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_IdentifySerialsInMultipleLocVirtual(Objkey='{Objkey}')

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
"Ref1": "It is a Text",
"Ref2": "It is a Text",
"Ref3": "It is a Text",
"Ref4": "It is a Text",
"Ref5": "It is a Text",
"RefType": "It is a Text",
"PartNo": "It is a Text",
"PartDescription": "It is a Text",
"CatchUoM": "It is a Text",
"QtyToIdentify": 1,
"SerialsIdentified": 1,
"Contract": "It is a Text",
"CatchUnitEnabled": "It is a Text",
"SessionId": 1,
"LotBatchNo": "It is a Text"
}
Reference_TempPartTrackMultiLocSerialsVirtual
Reference Entity Set Reference_TempPartTrackMultiLocSerialsVirtual

Get entities from Reference_TempPartTrackMultiLocSerialsVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "Generated" "Generated desc" "SessionId" "SessionId desc" "SerialNo" "SerialNo desc" "CatchQty" "CatchQty desc" "Contract" "Contract desc" "PartNo" "PartNo desc" "LotBatchNo" "LotBatchNo desc" "SerialNoAttr" "SerialNoAttr desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Generated" "SessionId" "SerialNo" "CatchQty" "Contract" "PartNo" "LotBatchNo" "SerialNoAttr"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "SerialNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array TempPartTrackMultiLocSerialsVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_TempPartTrackMultiLocSerialsVirtual

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_TempPartTrackMultiLocSerialsVirtual by key
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Generated" "SessionId" "SerialNo" "CatchQty" "Contract" "PartNo" "LotBatchNo" "SerialNoAttr"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "SerialNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type TempPartTrackMultiLocSerialsVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_TempPartTrackMultiLocSerialsVirtual(Objkey='{Objkey}')

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
"Generated": true,
"SessionId": 1,
"SerialNo": "It is a Text",
"CatchQty": 1,
"Contract": "It is a Text",
"PartNo": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNoAttr": "It is a Text"
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "ReadOnly" "ReadOnly desc" "NoteId" "NoteId desc" "Label" "Label desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "NoteId" "Label"
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "NoteId" "Label"
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
"Label": "It is a Text"
}
Reference_IdentifySerialsInLocationVirtual
Reference Entity Set Reference_IdentifySerialsInLocationVirtual

Get entities from Reference_IdentifySerialsInLocationVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "Contract" "Contract desc" "PartNo" "PartNo desc" "ConfigurationId" "ConfigurationId desc" "LocationNo" "LocationNo desc" "LotBatchNo" "LotBatchNo desc" "EngChgLevel" "EngChgLevel desc" "WaivDevRejNo" "WaivDevRejNo desc" "ActivitySeq" "ActivitySeq desc" "HandlingUnitId" "HandlingUnitId desc" "QtyIssue" "QtyIssue desc" "UoM" "UoM desc" "CatchQtyIssue" "CatchQtyIssue desc" "CatchUoM" "CatchUoM desc" "PartOwnershipDb" "PartOwnershipDb desc" "SerialsIdentified" "SerialsIdentified desc" "SessionId" "SessionId desc" "CatchUnitEnabled" "CatchUnitEnabled desc" "AssistantTitle" "AssistantTitle desc" "AssistantContext" "AssistantContext desc" "RemainingSelection" "RemainingSelection desc" "TotalCount" "TotalCount desc" "CurrentCount" "CurrentCount desc" "SelectionRec" "SelectionRec desc" "RunningSelection" "RunningSelection desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "ConfigurationId" "LocationNo" "LotBatchNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "HandlingUnitId" "QtyIssue" "UoM" "CatchQtyIssue" "CatchUoM" "PartOwnershipDb" "SerialsIdentified" "SessionId" "CatchUnitEnabled" "AssistantTitle" "AssistantContext" "RemainingSelection" "TotalCount" "CurrentCount" "SelectionRec" "RunningSelection"
Specify properties to return, see OData Select

Responses
200 response body for entity array IdentifySerialsInLocationVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_IdentifySerialsInLocationVirtual

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_IdentifySerialsInLocationVirtual by key
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Contract" "PartNo" "ConfigurationId" "LocationNo" "LotBatchNo" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "HandlingUnitId" "QtyIssue" "UoM" "CatchQtyIssue" "CatchUoM" "PartOwnershipDb" "SerialsIdentified" "SessionId" "CatchUnitEnabled" "AssistantTitle" "AssistantContext" "RemainingSelection" "TotalCount" "CurrentCount" "SelectionRec" "RunningSelection"
Specify properties to return, see OData Select

Responses
200 response body for entity type IdentifySerialsInLocationVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_IdentifySerialsInLocationVirtual(Objkey='{Objkey}')

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
"ConfigurationId": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"QtyIssue": 1,
"UoM": "It is a Text",
"CatchQtyIssue": 1,
"CatchUoM": "It is a Text",
"PartOwnershipDb": "It is a Text",
"SerialsIdentified": 1,
"SessionId": 1,
"CatchUnitEnabled": "It is a Text",
"AssistantTitle": "It is a Text",
"AssistantContext": "It is a Text",
"RemainingSelection": "It is a Text",
"TotalCount": 1,
"CurrentCount": 1,
"SelectionRec": "It is a Text",
"RunningSelection": "It is a Text"
}
Reference_TempPartTrackingForInLocSerialsVirtual
Reference Entity Set Reference_TempPartTrackingForInLocSerialsVirtual

Get entities from Reference_TempPartTrackingForInLocSerialsVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "Generated" "Generated desc" "SessionId" "SessionId desc" "SerialNo" "SerialNo desc" "CatchQty" "CatchQty desc" "PartNo" "PartNo desc" "Contract" "Contract desc" "AssistantContext" "AssistantContext desc" "SerialNoAttr" "SerialNoAttr desc" "LocationNo" "LocationNo desc" "LotBatchNo" "LotBatchNo desc" "ConfigurationId" "ConfigurationId desc" "EngChgLevel" "EngChgLevel desc" "WaivDevRejNo" "WaivDevRejNo desc" "ActivitySeq" "ActivitySeq desc" "HandlingUnitId" "HandlingUnitId desc" "PartOwnershipDb" "PartOwnershipDb desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Generated" "SessionId" "SerialNo" "CatchQty" "PartNo" "Contract" "AssistantContext" "SerialNoAttr" "LocationNo" "LotBatchNo" "ConfigurationId" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "HandlingUnitId" "PartOwnershipDb"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "SerialNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array TempPartTrackingForInLocSerialsVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_TempPartTrackingForInLocSerialsVirtual

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_TempPartTrackingForInLocSerialsVirtual by key
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "Generated" "SessionId" "SerialNo" "CatchQty" "PartNo" "Contract" "AssistantContext" "SerialNoAttr" "LocationNo" "LotBatchNo" "ConfigurationId" "EngChgLevel" "WaivDevRejNo" "ActivitySeq" "HandlingUnitId" "PartOwnershipDb"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Value: "SerialNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type TempPartTrackingForInLocSerialsVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_TempPartTrackingForInLocSerialsVirtual(Objkey='{Objkey}')

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
"Generated": true,
"SessionId": 1,
"SerialNo": "It is a Text",
"CatchQty": 1,
"PartNo": "It is a Text",
"Contract": "It is a Text",
"AssistantContext": "It is a Text",
"SerialNoAttr": "It is a Text",
"LocationNo": "It is a Text",
"LotBatchNo": "It is a Text",
"ConfigurationId": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ActivitySeq": 1,
"HandlingUnitId": 1,
"PartOwnershipDb": "It is a Text"
}
Reference_PreAccountingVirtual
Reference Entity Set Reference_PreAccountingVirtual

Get entities from Reference_PreAccountingVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "ReadOnly" "ReadOnly desc" "ProjectConnected" "ProjectConnected desc" "MultipleRecords" "MultipleRecords desc" "PostingType" "PostingType desc" "PreAccountingId" "PreAccountingId desc" "Contract" "Contract desc" "Company" "Company desc" "VoucherDate" "VoucherDate desc" "ValidationDate" "ValidationDate desc" "PostingTypeDist" "PostingTypeDist desc" "Allowed" "Allowed desc" "AllowedAccountNo" "AllowedAccountNo desc" "AllowedCodenoB" "AllowedCodenoB desc" "AllowedCodenoC" "AllowedCodenoC desc" "AllowedCodenoD" "AllowedCodenoD desc" "AllowedCodenoE" "AllowedCodenoE desc" "AllowedCodenoF" "AllowedCodenoF desc" "AllowedCodenoG" "AllowedCodenoG desc" "AllowedCodenoH" "AllowedCodenoH desc" "AllowedCodenoI" "AllowedCodenoI desc" "AllowedCodenoJ" "AllowedCodenoJ desc" "LabelAccountNo" "LabelAccountNo desc" "LabelCodenoB" "LabelCodenoB desc" "LabelCodenoC" "LabelCodenoC desc" "LabelCodenoD" "LabelCodenoD desc" "LabelCodenoE" "LabelCodenoE desc" "LabelCodenoF" "LabelCodenoF desc" "LabelCodenoG" "LabelCodenoG desc" "LabelCodenoH" "LabelCodenoH desc" "LabelCodenoI" "LabelCodenoI desc" "LabelCodenoJ" "LabelCodenoJ desc" "AllowedDist" "AllowedDist desc" "AllowedAccountNoDist" "AllowedAccountNoDist desc" "AllowedCodenoBDist" "AllowedCodenoBDist desc" "AllowedCodenoCDist" "AllowedCodenoCDist desc" "AllowedCodenoDDist" "AllowedCodenoDDist desc" "AllowedCodenoEDist" "AllowedCodenoEDist desc" "AllowedCodenoFDist" "AllowedCodenoFDist desc" "AllowedCodenoGDist" "AllowedCodenoGDist desc" "AllowedCodenoHDist" "AllowedCodenoHDist desc" "AllowedCodenoIDist" "AllowedCodenoIDist desc" "AllowedCodenoJDist" "AllowedCodenoJDist desc" "SameContract" "SameContract desc" "SameAccountNo" "SameAccountNo desc" "SameCodeB" "SameCodeB desc" "SameCodeC" "SameCodeC desc" "SameCodeD" "SameCodeD desc" "SameCodeE" "SameCodeE desc" "SameCodeF" "SameCodeF desc" "SameCodeG" "SameCodeG desc" "SameCodeH" "SameCodeH desc" "SameCodeI" "SameCodeI desc" "SameCodeJ" "SameCodeJ desc" "SameActivitySeq" "SameActivitySeq desc" "TotalAmountDist" "TotalAmountDist desc" "PrePostingSource" "PrePostingSource desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "ProjectConnected" "MultipleRecords" "PostingType" "PreAccountingId" "Contract" "Company" "VoucherDate" "ValidationDate" "PostingTypeDist" "Allowed" "AllowedAccountNo" "AllowedCodenoB" "AllowedCodenoC" "AllowedCodenoD" "AllowedCodenoE" "AllowedCodenoF" "AllowedCodenoG" "AllowedCodenoH" "AllowedCodenoI" "AllowedCodenoJ" "LabelAccountNo" "LabelCodenoB" "LabelCodenoC" "LabelCodenoD" "LabelCodenoE" "LabelCodenoF" "LabelCodenoG" "LabelCodenoH" "LabelCodenoI" "LabelCodenoJ" "AllowedDist" "AllowedAccountNoDist" "AllowedCodenoBDist" "AllowedCodenoCDist" "AllowedCodenoDDist" "AllowedCodenoEDist" "AllowedCodenoFDist" "AllowedCodenoGDist" "AllowedCodenoHDist" "AllowedCodenoIDist" "AllowedCodenoJDist" "SameContract" "SameAccountNo" "SameCodeB" "SameCodeC" "SameCodeD" "SameCodeE" "SameCodeF" "SameCodeG" "SameCodeH" "SameCodeI" "SameCodeJ" "SameActivitySeq" "TotalAmountDist" "Selection" "PrePostingSource"
Specify properties to return, see OData Select

Responses
200 response body for entity array PreAccountingVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingVirtual

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_PreAccountingVirtual by key
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "ReadOnly" "ProjectConnected" "MultipleRecords" "PostingType" "PreAccountingId" "Contract" "Company" "VoucherDate" "ValidationDate" "PostingTypeDist" "Allowed" "AllowedAccountNo" "AllowedCodenoB" "AllowedCodenoC" "AllowedCodenoD" "AllowedCodenoE" "AllowedCodenoF" "AllowedCodenoG" "AllowedCodenoH" "AllowedCodenoI" "AllowedCodenoJ" "LabelAccountNo" "LabelCodenoB" "LabelCodenoC" "LabelCodenoD" "LabelCodenoE" "LabelCodenoF" "LabelCodenoG" "LabelCodenoH" "LabelCodenoI" "LabelCodenoJ" "AllowedDist" "AllowedAccountNoDist" "AllowedCodenoBDist" "AllowedCodenoCDist" "AllowedCodenoDDist" "AllowedCodenoEDist" "AllowedCodenoFDist" "AllowedCodenoGDist" "AllowedCodenoHDist" "AllowedCodenoIDist" "AllowedCodenoJDist" "SameContract" "SameAccountNo" "SameCodeB" "SameCodeC" "SameCodeD" "SameCodeE" "SameCodeF" "SameCodeG" "SameCodeH" "SameCodeI" "SameCodeJ" "SameActivitySeq" "TotalAmountDist" "Selection" "PrePostingSource"
Specify properties to return, see OData Select

Responses
200 response body for entity type PreAccountingVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingVirtual(Objkey='{Objkey}')

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
"ProjectConnected": true,
"MultipleRecords": true,
"PostingType": "It is a Text",
"PreAccountingId": 1,
"Contract": "It is a Text",
"Company": "It is a Text",
"VoucherDate": "2019-10-10",
"ValidationDate": "2019-10-10",
"PostingTypeDist": "It is a Text",
"Allowed": "It is a Text",
"AllowedAccountNo": "It is a Text",
"AllowedCodenoB": "It is a Text",
"AllowedCodenoC": "It is a Text",
"AllowedCodenoD": "It is a Text",
"AllowedCodenoE": "It is a Text",
"AllowedCodenoF": "It is a Text",
"AllowedCodenoG": "It is a Text",
"AllowedCodenoH": "It is a Text",
"AllowedCodenoI": "It is a Text",
"AllowedCodenoJ": "It is a Text",
"LabelAccountNo": "It is a Text",
"LabelCodenoB": "It is a Text",
"LabelCodenoC": "It is a Text",
"LabelCodenoD": "It is a Text",
"LabelCodenoE": "It is a Text",
"LabelCodenoF": "It is a Text",
"LabelCodenoG": "It is a Text",
"LabelCodenoH": "It is a Text",
"LabelCodenoI": "It is a Text",
"LabelCodenoJ": "It is a Text",
"AllowedDist": "It is a Text",
"AllowedAccountNoDist": "It is a Text",
"AllowedCodenoBDist": "It is a Text",
"AllowedCodenoCDist": "It is a Text",
"AllowedCodenoDDist": "It is a Text",
"AllowedCodenoEDist": "It is a Text",
"AllowedCodenoFDist": "It is a Text",
"AllowedCodenoGDist": "It is a Text",
"AllowedCodenoHDist": "It is a Text",
"AllowedCodenoIDist": "It is a Text",
"AllowedCodenoJDist": "It is a Text",
"SameContract": "It is a Text",
"SameAccountNo": "It is a Text",
"SameCodeB": "It is a Text",
"SameCodeC": "It is a Text",
"SameCodeD": "It is a Text",
"SameCodeE": "It is a Text",
"SameCodeF": "It is a Text",
"SameCodeG": "It is a Text",
"SameCodeH": "It is a Text",
"SameCodeI": "It is a Text",
"SameCodeJ": "It is a Text",
"SameActivitySeq": "It is a Text",
"TotalAmountDist": 1,
"Selection": "",
"PrePostingSource": "It is a Text"
}
Reference_ManualReservationVirtual
Reference Entity Set Reference_ManualReservationVirtual

Get entities from Reference_ManualReservationVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "OrderNo" "OrderNo desc" "OrderClass" "OrderClass desc" "LineNo" "LineNo desc" "ReleaseNo" "ReleaseNo desc" "LineItemNo" "LineItemNo desc" "PartNo" "PartNo desc" "ConditionCode" "ConditionCode desc" "UnitMeas" "UnitMeas desc" "Contract" "Contract desc" "QtyLeft" "QtyLeft desc" "ActivitySeq" "ActivitySeq desc" "ProjectId" "ProjectId desc" "LinesReadyToReserve" "LinesReadyToReserve desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "OrderNo" "OrderClass" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "ConditionCode" "UnitMeas" "Contract" "QtyLeft" "ActivitySeq" "ProjectId" "LinesReadyToReserve"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "PartNoRef" "ConditionCodeRef" "ActivitySeqRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ManualReservationVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ManualReservationVirtual

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_ManualReservationVirtual by key
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "OrderNo" "OrderClass" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "ConditionCode" "UnitMeas" "Contract" "QtyLeft" "ActivitySeq" "ProjectId" "LinesReadyToReserve"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "PartNoRef" "ConditionCodeRef" "ActivitySeqRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type ManualReservationVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ManualReservationVirtual(Objkey='{Objkey}')

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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"ConditionCode": "It is a Text",
"UnitMeas": "It is a Text",
"Contract": "It is a Text",
"QtyLeft": 1,
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"LinesReadyToReserve": "It is a Text",
"OrderClass": "INT"
}
Reference_InvPartInStockToReserveVirtual
Reference Entity Set Reference_InvPartInStockToReserveVirtual

Get entities from Reference_InvPartInStockToReserveVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "QtyToReserve" "QtyToReserve desc" "AvailableQty" "AvailableQty desc" "QtyReserved" "QtyReserved desc" "LocationNo" "LocationNo desc" "HandlingUnitId" "HandlingUnitId desc" "Warehouse" "Warehouse desc" "BayNo" "BayNo desc" "RowNo" "RowNo desc" "TierNo" "TierNo desc" "BinNo" "BinNo desc" "PartNo" "PartNo desc" "Contract" "Contract desc" "LotBatchNo" "LotBatchNo desc" "SerialNo" "SerialNo desc" "EngChgLevel" "EngChgLevel desc" "WaivDevRejNo" "WaivDevRejNo desc" "ProjectId" "ProjectId desc" "ActivitySeq" "ActivitySeq desc" "TopParentHandlingUnitId" "TopParentHandlingUnitId desc" "TopParentHuTypeId" "TopParentHuTypeId desc" "TopParentHuTypeDesc" "TopParentHuTypeDesc desc" "TopParentSSCC" "TopParentSSCC desc" "TopParentAltHuLabelId" "TopParentAltHuLabelId desc" "AvailabilityControlId" "AvailabilityControlId desc" "ExpirationDate" "ExpirationDate desc" "ProgramId" "ProgramId desc" "ProgramDescription" "ProgramDescription desc" "ProjectName" "ProjectName desc" "SubProjectId" "SubProjectId desc" "SubProjectDescription" "SubProjectDescription desc" "ActivityNo" "ActivityNo desc" "ActivityDescription" "ActivityDescription desc" "HandlingUnitTypeId" "HandlingUnitTypeId desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "QtyToReserve" "AvailableQty" "QtyReserved" "LocationNo" "HandlingUnitId" "Warehouse" "BayNo" "RowNo" "TierNo" "BinNo" "PartNo" "Contract" "LotBatchNo" "SerialNo" "EngChgLevel" "WaivDevRejNo" "ProjectId" "ActivitySeq" "TopParentHandlingUnitId" "TopParentHuTypeId" "TopParentHuTypeDesc" "TopParentSSCC" "TopParentAltHuLabelId" "AvailabilityControlId" "ExpirationDate" "ProgramId" "ProgramDescription" "ProjectName" "SubProjectId" "SubProjectDescription" "ActivityNo" "ActivityDescription" "HandlingUnitTypeId"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "HandlingUnitIdRef" "HandlingUnitTypeIdRef" "ActivitySeqRef" "ActivityNoRef" "ProgramIdRef" "SubProjectIdRef" "AvailabilityControlIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array InvPartInStockToReserveVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InvPartInStockToReserveVirtual

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_InvPartInStockToReserveVirtual by key
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "QtyToReserve" "AvailableQty" "QtyReserved" "LocationNo" "HandlingUnitId" "Warehouse" "BayNo" "RowNo" "TierNo" "BinNo" "PartNo" "Contract" "LotBatchNo" "SerialNo" "EngChgLevel" "WaivDevRejNo" "ProjectId" "ActivitySeq" "TopParentHandlingUnitId" "TopParentHuTypeId" "TopParentHuTypeDesc" "TopParentSSCC" "TopParentAltHuLabelId" "AvailabilityControlId" "ExpirationDate" "ProgramId" "ProgramDescription" "ProjectName" "SubProjectId" "SubProjectDescription" "ActivityNo" "ActivityDescription" "HandlingUnitTypeId"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "HandlingUnitIdRef" "HandlingUnitTypeIdRef" "ActivitySeqRef" "ActivityNoRef" "ProgramIdRef" "SubProjectIdRef" "AvailabilityControlIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type InvPartInStockToReserveVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InvPartInStockToReserveVirtual(Objkey='{Objkey}')

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
"QtyToReserve": 1,
"AvailableQty": 1,
"QtyReserved": 1,
"LocationNo": "It is a Text",
"HandlingUnitId": 1,
"Warehouse": "It is a Text",
"BayNo": "It is a Text",
"RowNo": "It is a Text",
"TierNo": "It is a Text",
"BinNo": "It is a Text",
"PartNo": "It is a Text",
"Contract": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNo": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ProjectId": "It is a Text",
"ActivitySeq": 1,
"TopParentHandlingUnitId": 1,
"TopParentHuTypeId": "It is a Text",
"TopParentHuTypeDesc": "It is a Text",
"TopParentSSCC": "It is a Text",
"TopParentAltHuLabelId": "It is a Text",
"AvailabilityControlId": "It is a Text",
"ExpirationDate": "2019-10-10",
"ProgramId": "It is a Text",
"ProgramDescription": "It is a Text",
"ProjectName": "It is a Text",
"SubProjectId": "It is a Text",
"SubProjectDescription": "It is a Text",
"ActivityNo": "It is a Text",
"ActivityDescription": "It is a Text",
"HandlingUnitTypeId": "It is a Text"
}
Reference_ManualIssueVirtual
Reference Entity Set Reference_ManualIssueVirtual

Get entities from Reference_ManualIssueVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "OrderNo" "OrderNo desc" "OrderClass" "OrderClass desc" "LineNo" "LineNo desc" "ReleaseNo" "ReleaseNo desc" "LineItemNo" "LineItemNo desc" "PartNo" "PartNo desc" "CatchUnitMeas" "CatchUnitMeas desc" "Contract" "Contract desc" "QtyLeft" "QtyLeft desc" "ActivitySeq" "ActivitySeq desc" "ProjectId" "ProjectId desc" "LinesReadyToIssue" "LinesReadyToIssue desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "OrderNo" "OrderClass" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "CatchUnitMeas" "Contract" "QtyLeft" "ActivitySeq" "ProjectId" "LinesReadyToIssue"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "PartNoRef" "ActivitySeqRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array ManualIssueVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ManualIssueVirtual

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_ManualIssueVirtual by key
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "OrderNo" "OrderClass" "LineNo" "ReleaseNo" "LineItemNo" "PartNo" "CatchUnitMeas" "Contract" "QtyLeft" "ActivitySeq" "ProjectId" "LinesReadyToIssue"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "PartNoRef" "ActivitySeqRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type ManualIssueVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ManualIssueVirtual(Objkey='{Objkey}')

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
"OrderNo": "It is a Text",
"LineNo": "It is a Text",
"ReleaseNo": "It is a Text",
"LineItemNo": 1,
"PartNo": "It is a Text",
"CatchUnitMeas": "It is a Text",
"Contract": "It is a Text",
"QtyLeft": 1,
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"LinesReadyToIssue": "It is a Text",
"OrderClass": "INT"
}
Reference_InvPartInStockToIssueVirtual
Reference Entity Set Reference_InvPartInStockToIssueVirtual

Get entities from Reference_InvPartInStockToIssueVirtual
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
Items Enum: "Objkey" "Objkey desc" "ParentObjkey" "ParentObjkey desc" "Objmodified" "Objmodified desc" "ObjCreatedBy" "ObjCreatedBy desc" "QtyToIssue" "QtyToIssue desc" "QtyAssigned" "QtyAssigned desc" "CatchQtyToIssue" "CatchQtyToIssue desc" "LocationNo" "LocationNo desc" "HandlingUnitId" "HandlingUnitId desc" "Warehouse" "Warehouse desc" "BayNo" "BayNo desc" "RowNo" "RowNo desc" "TierNo" "TierNo desc" "BinNo" "BinNo desc" "PartNo" "PartNo desc" "Contract" "Contract desc" "LotBatchNo" "LotBatchNo desc" "SerialNo" "SerialNo desc" "ConditionCode" "ConditionCode desc" "EngChgLevel" "EngChgLevel desc" "WaivDevRejNo" "WaivDevRejNo desc" "ProjectId" "ProjectId desc" "ActivitySeq" "ActivitySeq desc" "TopParentHandlingUnitId" "TopParentHandlingUnitId desc" "TopParentHuTypeId" "TopParentHuTypeId desc" "TopParentSscc" "TopParentSscc desc" "TopParentAltHuLabelId" "TopParentAltHuLabelId desc" "AvailabilityControlId" "AvailabilityControlId desc" "ConfigurationId" "ConfigurationId desc" "ReceiptIssueSerialTrack" "ReceiptIssueSerialTrack desc" "PartTrackingSessionId" "PartTrackingSessionId desc" "ProgramId" "ProgramId desc" "ProgramDescription" "ProgramDescription desc" "ProjectName" "ProjectName desc" "SubProjectId" "SubProjectId desc" "SubProjectDescription" "SubProjectDescription desc" "ActivityNo" "ActivityNo desc" "ActivityDescription" "ActivityDescription desc" "HandlingUnitTypeId" "HandlingUnitTypeId desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "QtyToIssue" "QtyAssigned" "CatchQtyToIssue" "LocationNo" "HandlingUnitId" "Warehouse" "BayNo" "RowNo" "TierNo" "BinNo" "PartNo" "Contract" "LotBatchNo" "SerialNo" "ConditionCode" "EngChgLevel" "WaivDevRejNo" "ProjectId" "ActivitySeq" "TopParentHandlingUnitId" "TopParentHuTypeId" "TopParentSscc" "TopParentAltHuLabelId" "AvailabilityControlId" "ConfigurationId" "ReceiptIssueSerialTrack" "PartTrackingSessionId" "ProgramId" "ProgramDescription" "ProjectName" "SubProjectId" "SubProjectDescription" "ActivityNo" "ActivityDescription" "HandlingUnitTypeId"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "HandlingUnitIdRef" "HandlingUnitTypeIdRef" "ConditionCodeRef" "ActivitySeqRef" "ProjectIdRef" "ProgramIdRef" "SubProjectIdRef" "ActivityNoRef" "AvailabilityControlIdRef" "TopParentHuTypeIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array InvPartInStockToIssueVirtual
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InvPartInStockToIssueVirtual

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_InvPartInStockToIssueVirtual by key
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
Items Enum: "luname" "keyref" "Objkey" "ParentObjkey" "Objmodified" "ObjCreatedBy" "QtyToIssue" "QtyAssigned" "CatchQtyToIssue" "LocationNo" "HandlingUnitId" "Warehouse" "BayNo" "RowNo" "TierNo" "BinNo" "PartNo" "Contract" "LotBatchNo" "SerialNo" "ConditionCode" "EngChgLevel" "WaivDevRejNo" "ProjectId" "ActivitySeq" "TopParentHandlingUnitId" "TopParentHuTypeId" "TopParentSscc" "TopParentAltHuLabelId" "AvailabilityControlId" "ConfigurationId" "ReceiptIssueSerialTrack" "PartTrackingSessionId" "ProgramId" "ProgramDescription" "ProjectName" "SubProjectId" "SubProjectDescription" "ActivityNo" "ActivityDescription" "HandlingUnitTypeId"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "HandlingUnitIdRef" "HandlingUnitTypeIdRef" "ConditionCodeRef" "ActivitySeqRef" "ProjectIdRef" "ProgramIdRef" "SubProjectIdRef" "ActivityNoRef" "AvailabilityControlIdRef" "TopParentHuTypeIdRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type InvPartInStockToIssueVirtual
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InvPartInStockToIssueVirtual(Objkey='{Objkey}')

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
"QtyToIssue": 1,
"QtyAssigned": 1,
"CatchQtyToIssue": 1,
"LocationNo": "It is a Text",
"HandlingUnitId": 1,
"Warehouse": "It is a Text",
"BayNo": "It is a Text",
"RowNo": "It is a Text",
"TierNo": "It is a Text",
"BinNo": "It is a Text",
"PartNo": "It is a Text",
"Contract": "It is a Text",
"LotBatchNo": "It is a Text",
"SerialNo": "It is a Text",
"ConditionCode": "It is a Text",
"EngChgLevel": "It is a Text",
"WaivDevRejNo": "It is a Text",
"ProjectId": "It is a Text",
"ActivitySeq": 1,
"TopParentHandlingUnitId": 1,
"TopParentHuTypeId": "It is a Text",
"TopParentSscc": "It is a Text",
"TopParentAltHuLabelId": "It is a Text",
"AvailabilityControlId": "It is a Text",
"ConfigurationId": "It is a Text",
"ReceiptIssueSerialTrack": "It is a Text",
"PartTrackingSessionId": 1,
"ProgramId": "It is a Text",
"ProgramDescription": "It is a Text",
"ProjectName": "It is a Text",
"SubProjectId": "It is a Text",
"SubProjectDescription": "It is a Text",
"ActivityNo": "It is a Text",
"ActivityDescription": "It is a Text",
"HandlingUnitTypeId": "It is a Text"
}
Reference_SubProject
Reference Entity Set Reference_SubProject

Get entities from Reference_SubProject
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
Items Enum: "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ParentSubProjectId" "ParentSubProjectId desc" "Description" "Description desc" "Manager" "Manager desc" "Department" "Department desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "ExcludeFromWad" "ExcludeFromWad desc" "AddressId" "AddressId desc" "FinanciallyCompleted" "FinanciallyCompleted desc" "ExcludeFromIntegrations" "ExcludeFromIntegrations desc" "ActivitySeq" "ActivitySeq desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ProjectId" "SubProjectId" "ParentSubProjectId" "Description" "Manager" "Department" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "FinanciallyResponsible" "ExcludeFromWad" "AddressId" "FinanciallyCompleted" "ExcludeFromIntegrations" "ActivitySeq"
Specify properties to return, see OData Select

Responses
200 response body for entity array SubProject
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SubProject

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_SubProject by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProjectId
required
string <= 10 characters
Example: It is a Text
SubProjectId
required
string <= 10 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "ProjectId" "SubProjectId" "ParentSubProjectId" "Description" "Manager" "Department" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "FinanciallyResponsible" "ExcludeFromWad" "AddressId" "FinanciallyCompleted" "ExcludeFromIntegrations" "ActivitySeq"
Specify properties to return, see OData Select

Responses
200 response body for entity type SubProject
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_SubProject(ProjectId='{ProjectId}',SubProjectId='{SubProjectId}')

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
"ProjectId": "It is a Text",
"SubProjectId": "It is a Text",
"ParentSubProjectId": "It is a Text",
"Description": "It is a Text",
"Manager": "It is a Text",
"Department": "It is a Text",
"DateCreated": "2019-10-10",
"CreatedBy": "It is a Text",
"DateModified": "2019-10-10",
"ModifiedBy": "It is a Text",
"FinanciallyResponsible": "It is a Text",
"ExcludeFromWad": true,
"AddressId": "It is a Text",
"FinanciallyCompleted": true,
"ExcludeFromIntegrations": true,
"ActivitySeq": 1
}
Reference_Project
Reference Entity Set Reference_Project

Get entities from Reference_Project
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
Items Enum: "Objstate" "Objstate desc" "ProjectId" "ProjectId desc" "Name" "Name desc" "Description" "Description desc" "PlanStart" "PlanStart desc" "PlanFinish" "PlanFinish desc" "ActualStart" "ActualStart desc" "ActualFinish" "ActualFinish desc" "FrozenDate" "FrozenDate desc" "CloseDate" "CloseDate desc" "CancelDate" "CancelDate desc" "ApprovedDate" "ApprovedDate desc" "Manager" "Manager desc" "CustomerId" "CustomerId desc" "CustomerResponsible" "CustomerResponsible desc" "CustomerProjectId" "CustomerProjectId desc" "Company" "Company desc" "Branch" "Branch desc" "Site" "Site desc" "CalendarId" "CalendarId desc" "ProgramId" "ProgramId desc" "PlannedRevenue" "PlannedRevenue desc" "PlannedCost" "PlannedCost desc" "CurrencyType" "CurrencyType desc" "ProbabilityToWin" "ProbabilityToWin desc" "DefaultCharTemp" "DefaultCharTemp desc" "AccessOnOff" "AccessOnOff desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "BaselineRevisionNumber" "BaselineRevisionNumber desc" "EarnedValueMethod" "EarnedValueMethod desc" "MaterialAllocation" "MaterialAllocation desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "BudgetControlOn" "BudgetControlOn desc" "ControlAsBudgeted" "ControlAsBudgeted desc" "ControlOnTotalBudget" "ControlOnTotalBudget desc" "ProjUniquePurchase" "ProjUniquePurchase desc" "ProjUniqueSale" "ProjUniqueSale desc" "CopiedProject" "CopiedProject desc" "CostStructureId" "CostStructureId desc" "MultiCurrencyBudgeting" "MultiCurrencyBudgeting desc" "ProjectCurrencyType" "ProjectCurrencyType desc" "BudgetCurrencyType" "BudgetCurrencyType desc" "ProjectCurrencyCode" "ProjectCurrencyCode desc" "Category1Id" "Category1Id desc" "Category2Id" "Category2Id desc" "ValidateRemainingAgainst" "ValidateRemainingAgainst desc" "BudgetForecastId" "BudgetForecastId desc" "SelectedForecastId" "SelectedForecastId desc" "SelectedForecastType" "SelectedForecastType desc" "SelectedForecastVersion" "SelectedForecastVersion desc" "ProjectMiscCompMethod" "ProjectMiscCompMethod desc" "InternalRentalPriceList" "InternalRentalPriceList desc" "PlanProjectTransaction" "PlanProjectTransaction desc" "WorkDayToHoursConv" "WorkDayToHoursConv desc" "FinancialProjectExist" "FinancialProjectExist desc" "DefaultCostActivitySeq" "DefaultCostActivitySeq desc" "ExcludeFromBatchInvoice" "ExcludeFromBatchInvoice desc" "ActivitySeq" "ActivitySeq desc" "MandatoryInvoiceComment" "MandatoryInvoiceComment desc" "CashForecastMultiCurr" "CashForecastMultiCurr desc" "BusinessTransactionId" "BusinessTransactionId desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ProjectId" "Name" "Description" "PlanStart" "PlanFinish" "ActualStart" "ActualFinish" "FrozenDate" "CloseDate" "CancelDate" "ApprovedDate" "Manager" "CustomerId" "CustomerResponsible" "CustomerProjectId" "Company" "Branch" "Site" "CalendarId" "ProgramId" "PlannedRevenue" "PlannedCost" "CurrencyType" "ProbabilityToWin" "DefaultCharTemp" "AccessOnOff" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "BaselineRevisionNumber" "EarnedValueMethod" "MaterialAllocation" "FinanciallyResponsible" "BudgetControlOn" "ControlAsBudgeted" "ControlOnTotalBudget" "ProjUniquePurchase" "ProjUniqueSale" "CopiedProject" "CostStructureId" "MultiCurrencyBudgeting" "ProjectCurrencyType" "BudgetCurrencyType" "ProjectCurrencyCode" "Category1Id" "Category2Id" "ValidateRemainingAgainst" "BudgetForecastId" "SelectedForecastId" "SelectedForecastType" "SelectedForecastVersion" "ProjectMiscCompMethod" "InternalRentalPriceList" "PlanProjectTransaction" "WorkDayToHoursConv" "FinancialProjectExist" "DefaultCostActivitySeq" "ExcludeFromBatchInvoice" "ActivitySeq" "MandatoryInvoiceComment" "CashForecastMultiCurr" "BusinessTransactionId"
Specify properties to return, see OData Select

Responses
200 response body for entity array Project
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_Project

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_Project by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProjectId
required
string <= 10 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ProjectId" "Name" "Description" "PlanStart" "PlanFinish" "ActualStart" "ActualFinish" "FrozenDate" "CloseDate" "CancelDate" "ApprovedDate" "Manager" "CustomerId" "CustomerResponsible" "CustomerProjectId" "Company" "Branch" "Site" "CalendarId" "ProgramId" "PlannedRevenue" "PlannedCost" "CurrencyType" "ProbabilityToWin" "DefaultCharTemp" "AccessOnOff" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "BaselineRevisionNumber" "EarnedValueMethod" "MaterialAllocation" "FinanciallyResponsible" "BudgetControlOn" "ControlAsBudgeted" "ControlOnTotalBudget" "ProjUniquePurchase" "ProjUniqueSale" "CopiedProject" "CostStructureId" "MultiCurrencyBudgeting" "ProjectCurrencyType" "BudgetCurrencyType" "ProjectCurrencyCode" "Category1Id" "Category2Id" "ValidateRemainingAgainst" "BudgetForecastId" "SelectedForecastId" "SelectedForecastType" "SelectedForecastVersion" "ProjectMiscCompMethod" "InternalRentalPriceList" "PlanProjectTransaction" "WorkDayToHoursConv" "FinancialProjectExist" "DefaultCostActivitySeq" "ExcludeFromBatchInvoice" "ActivitySeq" "MandatoryInvoiceComment" "CashForecastMultiCurr" "BusinessTransactionId"
Specify properties to return, see OData Select

Responses
200 response body for entity type Project
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_Project(ProjectId='{ProjectId}')

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
"ProjectId": "It is a Text",
"Name": "It is a Text",
"Description": "It is a Text",
"PlanStart": "2019-10-01T01:01:01Z",
"PlanFinish": "2019-10-01T01:01:01Z",
"ActualStart": "2019-10-10",
"ActualFinish": "2019-10-10",
"FrozenDate": "2019-10-10",
"CloseDate": "2019-10-10",
"CancelDate": "2019-10-10",
"ApprovedDate": "2019-10-10",
"Manager": "It is a Text",
"CustomerId": "It is a Text",
"CustomerResponsible": "It is a Text",
"CustomerProjectId": "It is a Text",
"Company": "It is a Text",
"Branch": "It is a Text",
"Site": "It is a Text",
"CalendarId": "It is a Text",
"ProgramId": "It is a Text",
"PlannedRevenue": 1,
"PlannedCost": 1,
"CurrencyType": "It is a Text",
"ProbabilityToWin": 1,
"DefaultCharTemp": "It is a Text",
"AccessOnOff": 1,
"DateCreated": "2019-10-10",
"CreatedBy": "It is a Text",
"DateModified": "2019-10-10",
"ModifiedBy": "It is a Text",
"BaselineRevisionNumber": 1,
"FinanciallyResponsible": "It is a Text",
"BudgetControlOn": true,
"ControlAsBudgeted": true,
"ControlOnTotalBudget": true,
"ProjUniquePurchase": true,
"ProjUniqueSale": true,
"CopiedProject": "It is a Text",
"CostStructureId": "It is a Text",
"MultiCurrencyBudgeting": true,
"ProjectCurrencyType": "It is a Text",
"BudgetCurrencyType": "It is a Text",
"ProjectCurrencyCode": "It is a Text",
"Category1Id": "It is a Text",
"Category2Id": "It is a Text",
"BudgetForecastId": 1,
"SelectedForecastId": 1,
"SelectedForecastType": "It is a Text",
"SelectedForecastVersion": "It is a Text",
"InternalRentalPriceList": "It is a Text",
"PlanProjectTransaction": true,
"WorkDayToHoursConv": 1,
"FinancialProjectExist": "It is a Text",
"DefaultCostActivitySeq": 1,
"ExcludeFromBatchInvoice": true,
"ActivitySeq": 1,
"MandatoryInvoiceComment": true,
"CashForecastMultiCurr": true,
"BusinessTransactionId": "It is a Text",
"Objstate": "Initialized",
"EarnedValueMethod": "Baseline",
"MaterialAllocation": "WithinProject",
"ValidateRemainingAgainst": "Base",
"ProjectMiscCompMethod": "PmrpPlanned"
}
Reference_Activity
Reference Entity Set Reference_Activity

Get entities from Reference_Activity
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
Items Enum: "Objstate" "Objstate desc" "ActivitySeq" "ActivitySeq desc" "ProjectId" "ProjectId desc" "SubProjectId" "SubProjectId desc" "ActivityNo" "ActivityNo desc" "TotalKeyPath" "TotalKeyPath desc" "ActivityResponsible" "ActivityResponsible desc" "Description" "Description desc" "ManualProgressLevel" "ManualProgressLevel desc" "EstimatedProgress" "EstimatedProgress desc" "ManualProgressCost" "ManualProgressCost desc" "ManualProgressHours" "ManualProgressHours desc" "TotalDurationDays" "TotalDurationDays desc" "TotalWorkDays" "TotalWorkDays desc" "Note" "Note desc" "EarlyStart" "EarlyStart desc" "EarlyFinish" "EarlyFinish desc" "LateStart" "LateStart desc" "LateFinish" "LateFinish desc" "BaseLineEarlyStart" "BaseLineEarlyStart desc" "BaseLineEarlyFinish" "BaseLineEarlyFinish desc" "ActualStart" "ActualStart desc" "ActualFinish" "ActualFinish desc" "CancelDate" "CancelDate desc" "ShortName" "ShortName desc" "ReleasedDate" "ReleasedDate desc" "CompletedDate" "CompletedDate desc" "ClosedDate" "ClosedDate desc" "ProgressMethod" "ProgressMethod desc" "PlannedCostDriver" "PlannedCostDriver desc" "PreAccountingId" "PreAccountingId desc" "ProgressTemplate" "ProgressTemplate desc" "ProgressTemplateStep" "ProgressTemplateStep desc" "DateCreated" "DateCreated desc" "CreatedBy" "CreatedBy desc" "DateModified" "DateModified desc" "ModifiedBy" "ModifiedBy desc" "SetInBaseline" "SetInBaseline desc" "SetActivityChanged" "SetActivityChanged desc" "CaseId" "CaseId desc" "TaskId" "TaskId desc" "ActMilestone" "ActMilestone desc" "BaselinePcd" "BaselinePcd desc" "FinanciallyResponsible" "FinanciallyResponsible desc" "AmountPlanned" "AmountPlanned desc" "AmountUsed" "AmountUsed desc" "ExcludeFromWad" "ExcludeFromWad desc" "GenerateSafetyStock" "GenerateSafetyStock desc" "HoursPlanned" "HoursPlanned desc" "AddressId" "AddressId desc" "BaselineTotalWorkDays" "BaselineTotalWorkDays desc" "ExcludePeriodicalCap" "ExcludePeriodicalCap desc" "FinanciallyCompleted" "FinanciallyCompleted desc" "ExcludeResourceProgress" "ExcludeResourceProgress desc" "FreeFloat" "FreeFloat desc" "TotalFloat" "TotalFloat desc" "ConstraintType" "ConstraintType desc" "ConstraintDate" "ConstraintDate desc" "ExcludeFromIntegrations" "ExcludeFromIntegrations desc" "NodeType" "NodeType desc" "MandatoryInvoiceComment" "MandatoryInvoiceComment desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ActivitySeq" "ProjectId" "SubProjectId" "ActivityNo" "TotalKeyPath" "ActivityResponsible" "Description" "ManualProgressLevel" "EstimatedProgress" "ManualProgressCost" "ManualProgressHours" "TotalDurationDays" "TotalWorkDays" "Note" "EarlyStart" "EarlyFinish" "LateStart" "LateFinish" "BaseLineEarlyStart" "BaseLineEarlyFinish" "ActualStart" "ActualFinish" "CancelDate" "ShortName" "ReleasedDate" "CompletedDate" "ClosedDate" "ProgressMethod" "PlannedCostDriver" "PreAccountingId" "ProgressTemplate" "ProgressTemplateStep" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "SetInBaseline" "SetActivityChanged" "CaseId" "TaskId" "ActMilestone" "BaselinePcd" "FinanciallyResponsible" "AmountPlanned" "AmountUsed" "ExcludeFromWad" "GenerateSafetyStock" "HoursPlanned" "AddressId" "BaselineTotalWorkDays" "ExcludePeriodicalCap" "FinanciallyCompleted" "ExcludeResourceProgress" "FreeFloat" "TotalFloat" "ConstraintType" "ConstraintDate" "ExcludeFromIntegrations" "NodeType" "MandatoryInvoiceComment"
Specify properties to return, see OData Select

Responses
200 response body for entity array Activity
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_Activity

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_Activity by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
ActivitySeq
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ActivitySeq" "ProjectId" "SubProjectId" "ActivityNo" "TotalKeyPath" "ActivityResponsible" "Description" "ManualProgressLevel" "EstimatedProgress" "ManualProgressCost" "ManualProgressHours" "TotalDurationDays" "TotalWorkDays" "Note" "EarlyStart" "EarlyFinish" "LateStart" "LateFinish" "BaseLineEarlyStart" "BaseLineEarlyFinish" "ActualStart" "ActualFinish" "CancelDate" "ShortName" "ReleasedDate" "CompletedDate" "ClosedDate" "ProgressMethod" "PlannedCostDriver" "PreAccountingId" "ProgressTemplate" "ProgressTemplateStep" "DateCreated" "CreatedBy" "DateModified" "ModifiedBy" "SetInBaseline" "SetActivityChanged" "CaseId" "TaskId" "ActMilestone" "BaselinePcd" "FinanciallyResponsible" "AmountPlanned" "AmountUsed" "ExcludeFromWad" "GenerateSafetyStock" "HoursPlanned" "AddressId" "BaselineTotalWorkDays" "ExcludePeriodicalCap" "FinanciallyCompleted" "ExcludeResourceProgress" "FreeFloat" "TotalFloat" "ConstraintType" "ConstraintDate" "ExcludeFromIntegrations" "NodeType" "MandatoryInvoiceComment"
Specify properties to return, see OData Select

Responses
200 response body for entity type Activity
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_Activity(ActivitySeq={ActivitySeq})

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
"ActivitySeq": 1,
"ProjectId": "It is a Text",
"SubProjectId": "It is a Text",
"ActivityNo": "It is a Text",
"TotalKeyPath": "It is a Text",
"ActivityResponsible": "It is a Text",
"Description": "It is a Text",
"EstimatedProgress": 1,
"ManualProgressCost": 1,
"ManualProgressHours": 1,
"TotalDurationDays": 1,
"TotalWorkDays": 1,
"Note": "It is a Text",
"EarlyStart": "2019-10-01T01:01:01Z",
"EarlyFinish": "2019-10-01T01:01:01Z",
"LateStart": "2019-10-01T01:01:01Z",
"LateFinish": "2019-10-01T01:01:01Z",
"BaseLineEarlyStart": "2019-10-01T01:01:01Z",
"BaseLineEarlyFinish": "2019-10-01T01:01:01Z",
"ActualStart": "2019-10-01T01:01:01Z",
"ActualFinish": "2019-10-01T01:01:01Z",
"CancelDate": "2019-10-01T01:01:01Z",
"ShortName": "It is a Text",
"ReleasedDate": "2019-10-01T01:01:01Z",
"CompletedDate": "2019-10-01T01:01:01Z",
"ClosedDate": "2019-10-01T01:01:01Z",
"PreAccountingId": 1,
"ProgressTemplate": "It is a Text",
"ProgressTemplateStep": "It is a Text",
"DateCreated": "2019-10-01T01:01:01Z",
"CreatedBy": "It is a Text",
"DateModified": "2019-10-01T01:01:01Z",
"ModifiedBy": "It is a Text",
"SetInBaseline": 1,
"SetActivityChanged": true,
"CaseId": 1,
"TaskId": 1,
"ActMilestone": "It is a Text",
"FinanciallyResponsible": "It is a Text",
"AmountPlanned": 1,
"AmountUsed": 1,
"ExcludeFromWad": true,
"GenerateSafetyStock": "It is a Text",
"HoursPlanned": 1,
"AddressId": "It is a Text",
"BaselineTotalWorkDays": 1,
"FinanciallyCompleted": true,
"ExcludeResourceProgress": true,
"FreeFloat": 1,
"TotalFloat": 1,
"ConstraintDate": "2019-10-01T01:01:01Z",
"ExcludeFromIntegrations": true,
"Objstate": "Planned",
"ManualProgressLevel": "Activity",
"ProgressMethod": "DurationProgress",
"PlannedCostDriver": "ActivityResources",
"BaselinePcd": "ActivityResources",
"ExcludePeriodicalCap": "IncludeInAllLedgers",
"ConstraintType": "StartNotEarlierThan",
"NodeType": "Project",
"MandatoryInvoiceComment": "Inherit"
}
Reference_ProjectProgramGlobal
Reference Entity Set Reference_ProjectProgramGlobal

Get entities from Reference_ProjectProgramGlobal
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
Items Enum: "Objstate" "Objstate desc" "ProgramId" "ProgramId desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ProgramId" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array ProjectProgramGlobal
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ProjectProgramGlobal

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_ProjectProgramGlobal by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProgramId
required
string <= 10 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "ProgramId" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type ProjectProgramGlobal
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ProjectProgramGlobal(ProgramId='{ProgramId}')

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
"ProgramId": "It is a Text",
"Description": "It is a Text",
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
Items Enum: "OutputType" "OutputType desc" "NoteId" "NoteId desc" "NoteText" "NoteText desc" "PhraseId" "PhraseId desc" "LanguageCode" "LanguageCode desc" "RevisionNo" "RevisionNo desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "OutputType" "NoteId" "NoteText" "PhraseId" "LanguageCode" "RevisionNo"
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
Items Enum: "luname" "keyref" "OutputType" "NoteId" "NoteText" "PhraseId" "LanguageCode" "RevisionNo"
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
"RevisionNo": "It is a Text"
}
Reference_PreAccountingDistribution
Reference Entity Set Reference_PreAccountingDistribution

Get entities from Reference_PreAccountingDistribution
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
Items Enum: "PreAccountingId" "PreAccountingId desc" "AccountNo" "AccountNo desc" "CodenoB" "CodenoB desc" "CodenoC" "CodenoC desc" "CodenoD" "CodenoD desc" "CodenoE" "CodenoE desc" "CodenoF" "CodenoF desc" "CodenoG" "CodenoG desc" "CodenoH" "CodenoH desc" "CodenoI" "CodenoI desc" "CodenoJ" "CodenoJ desc" "ActivitySeq" "ActivitySeq desc" "ParentPreAccountingId" "ParentPreAccountingId desc" "AmountDistribution" "AmountDistribution desc" "Percentage" "Percentage desc" "Amount" "Amount desc" "CompanyRef" "CompanyRef desc" "Company" "Company desc" "Contract" "Contract desc" "PrePostingSource" "PrePostingSource desc" "VoucherDate" "VoucherDate desc" "TotalAmount" "TotalAmount desc" "LineAmount" "LineAmount desc" "ValidationType" "ValidationType desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PreAccountingId" "AccountNo" "CodenoB" "CodenoC" "CodenoD" "CodenoE" "CodenoF" "CodenoG" "CodenoH" "CodenoI" "CodenoJ" "ActivitySeq" "ParentPreAccountingId" "AmountDistribution" "Percentage" "Amount" "CompanyRef" "Company" "Contract" "PrePostingSource" "VoucherDate" "TotalAmount" "LineAmount" "ValidationType"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "AccountNoRef" "CodenoBRef" "CodenoCRef" "CodenoDRef" "CodenoERef" "CodenoFRef" "CodenoGRef" "CodenoHRef" "CodenoIRef" "CodenoJRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array PreAccountingDistribution
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingDistribution

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_PreAccountingDistribution by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
ParentPreAccountingId
required
number
Example: 1
PreAccountingId
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "PreAccountingId" "AccountNo" "CodenoB" "CodenoC" "CodenoD" "CodenoE" "CodenoF" "CodenoG" "CodenoH" "CodenoI" "CodenoJ" "ActivitySeq" "ParentPreAccountingId" "AmountDistribution" "Percentage" "Amount" "CompanyRef" "Company" "Contract" "PrePostingSource" "VoucherDate" "TotalAmount" "LineAmount" "ValidationType"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "AccountNoRef" "CodenoBRef" "CodenoCRef" "CodenoDRef" "CodenoERef" "CodenoFRef" "CodenoGRef" "CodenoHRef" "CodenoIRef" "CodenoJRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type PreAccountingDistribution
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccountingDistribution(ParentPreAccountingId={ParentPreAccountingId},PreAccountingId={PreAccountingId})

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
"PreAccountingId": 1,
"AccountNo": "It is a Text",
"CodenoB": "It is a Text",
"CodenoC": "It is a Text",
"CodenoD": "It is a Text",
"CodenoE": "It is a Text",
"CodenoF": "It is a Text",
"CodenoG": "It is a Text",
"CodenoH": "It is a Text",
"CodenoI": "It is a Text",
"CodenoJ": "It is a Text",
"ActivitySeq": 1,
"ParentPreAccountingId": 1,
"AmountDistribution": 1,
"Percentage": 1,
"Amount": 1,
"CompanyRef": "It is a Text",
"Company": "It is a Text",
"Contract": "It is a Text",
"PrePostingSource": "It is a Text",
"VoucherDate": "2019-10-10",
"TotalAmount": 1,
"LineAmount": 1,
"ValidationType": "It is a Text"
}
Reference_PreAccounting
Reference Entity Set Reference_PreAccounting

Get entities from Reference_PreAccounting
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
Items Enum: "PreAccountingId" "PreAccountingId desc" "AccountNo" "AccountNo desc" "CodenoB" "CodenoB desc" "CodenoC" "CodenoC desc" "CodenoD" "CodenoD desc" "CodenoE" "CodenoE desc" "CodenoF" "CodenoF desc" "CodenoG" "CodenoG desc" "CodenoH" "CodenoH desc" "CodenoI" "CodenoI desc" "CodenoJ" "CodenoJ desc" "Company" "Company desc" "Contract" "Contract desc" "ActivitySeq" "ActivitySeq desc" "PrePostingSource" "PrePostingSource desc" "CompanyRef" "CompanyRef desc" "VoucherDate" "VoucherDate desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PreAccountingId" "AccountNo" "CodenoB" "CodenoC" "CodenoD" "CodenoE" "CodenoF" "CodenoG" "CodenoH" "CodenoI" "CodenoJ" "Company" "Contract" "ActivitySeq" "PrePostingSource" "CompanyRef" "VoucherDate"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "AccountNoRef" "CodenoBRef" "CodenoCRef" "CodenoDRef" "CodenoERef" "CodenoFRef" "CodenoGRef" "CodenoHRef" "CodenoIRef" "CodenoJRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array PreAccounting
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccounting

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_PreAccounting by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
PreAccountingId
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "PreAccountingId" "AccountNo" "CodenoB" "CodenoC" "CodenoD" "CodenoE" "CodenoF" "CodenoG" "CodenoH" "CodenoI" "CodenoJ" "Company" "Contract" "ActivitySeq" "PrePostingSource" "CompanyRef" "VoucherDate"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "AccountNoRef" "CodenoBRef" "CodenoCRef" "CodenoDRef" "CodenoERef" "CodenoFRef" "CodenoGRef" "CodenoHRef" "CodenoIRef" "CodenoJRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type PreAccounting
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PreAccounting(PreAccountingId={PreAccountingId})

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
"PreAccountingId": 1,
"AccountNo": "It is a Text",
"CodenoB": "It is a Text",
"CodenoC": "It is a Text",
"CodenoD": "It is a Text",
"CodenoE": "It is a Text",
"CodenoF": "It is a Text",
"CodenoG": "It is a Text",
"CodenoH": "It is a Text",
"CodenoI": "It is a Text",
"CodenoJ": "It is a Text",
"Company": "It is a Text",
"Contract": "It is a Text",
"ActivitySeq": "It is a Text",
"PrePostingSource": "It is a Text",
"CompanyRef": "It is a Text",
"VoucherDate": "2019-10-10"
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
Reference_InternalCustomer
Reference Entity Set Reference_InternalCustomer

Get entities from Reference_InternalCustomer
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
Items Enum: "Objstate" "Objstate desc" "IntCustomerNo" "IntCustomerNo desc" "Extension" "Extension desc" "Name" "Name desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "IntCustomerNo" "Extension" "Name"
Specify properties to return, see OData Select

Responses
200 response body for entity array InternalCustomer
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InternalCustomer

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_InternalCustomer by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
IntCustomerNo
required
string <= 10 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "IntCustomerNo" "Extension" "Name"
Specify properties to return, see OData Select

Responses
200 response body for entity type InternalCustomer
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_InternalCustomer(IntCustomerNo='{IntCustomerNo}')

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
"IntCustomerNo": "It is a Text",
"Extension": 1,
"Name": "It is a Text",
"Objstate": "Active"
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
Reference_COriginShortage
Reference Entity Set Reference_COriginShortage

Get entities from Reference_COriginShortage
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
Items Enum: "Objstate" "Objstate desc" "Id" "Id desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Id" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array COriginShortage
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_COriginShortage

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_COriginShortage by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
Id
required
number
Example: 1
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "Id" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type COriginShortage
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_COriginShortage(Id={Id})

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
"Id": 1,
"Description": "It is a Text",
"Objstate": "Active"
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
Reference_HandlingUnitType
Reference Entity Set Reference_HandlingUnitType

Get entities from Reference_HandlingUnitType
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
Items Enum: "HandlingUnitTypeId" "HandlingUnitTypeId desc" "Description" "Description desc" "HandlingUnitCategoryId" "HandlingUnitCategoryId desc" "Width" "Width desc" "Height" "Height desc" "Depth" "Depth desc" "Volume" "Volume desc" "TareWeight" "TareWeight desc" "UomForLength" "UomForLength desc" "UomForVolume" "UomForVolume desc" "UomForWeight" "UomForWeight desc" "AdditiveVolume" "AdditiveVolume desc" "MaxVolumeCapacity" "MaxVolumeCapacity desc" "MaxWeightCapacity" "MaxWeightCapacity desc" "Stackable" "Stackable desc" "Cost" "Cost desc" "CurrencyCode" "CurrencyCode desc" "GenerateSsccNo" "GenerateSsccNo desc" "PrintLabel" "PrintLabel desc" "NoOfHandlingUnitLabels" "NoOfHandlingUnitLabels desc" "PrintContentLabel" "PrintContentLabel desc" "NoOfContentLabels" "NoOfContentLabels desc" "PrintShipmentLabel" "PrintShipmentLabel desc" "NoOfShipmentLabels" "NoOfShipmentLabels desc" "UseHuReservationRanking" "UseHuReservationRanking desc" "NoteId" "NoteId desc" "NoteText" "NoteText desc" "TransportTaskCapacity" "TransportTaskCapacity desc" "PartNo" "PartNo desc" "Reusable" "Reusable desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "HandlingUnitTypeId" "Description" "HandlingUnitCategoryId" "Width" "Height" "Depth" "Volume" "TareWeight" "UomForLength" "UomForVolume" "UomForWeight" "AdditiveVolume" "MaxVolumeCapacity" "MaxWeightCapacity" "Stackable" "Cost" "CurrencyCode" "GenerateSsccNo" "PrintLabel" "NoOfHandlingUnitLabels" "PrintContentLabel" "NoOfContentLabels" "PrintShipmentLabel" "NoOfShipmentLabels" "UseHuReservationRanking" "NoteId" "NoteText" "TransportTaskCapacity" "PartNo" "Reusable"
Specify properties to return, see OData Select

Responses
200 response body for entity array HandlingUnitType
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_HandlingUnitType

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_HandlingUnitType by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
HandlingUnitTypeId
required
string <= 25 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "HandlingUnitTypeId" "Description" "HandlingUnitCategoryId" "Width" "Height" "Depth" "Volume" "TareWeight" "UomForLength" "UomForVolume" "UomForWeight" "AdditiveVolume" "MaxVolumeCapacity" "MaxWeightCapacity" "Stackable" "Cost" "CurrencyCode" "GenerateSsccNo" "PrintLabel" "NoOfHandlingUnitLabels" "PrintContentLabel" "NoOfContentLabels" "PrintShipmentLabel" "NoOfShipmentLabels" "UseHuReservationRanking" "NoteId" "NoteText" "TransportTaskCapacity" "PartNo" "Reusable"
Specify properties to return, see OData Select

Responses
200 response body for entity type HandlingUnitType
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_HandlingUnitType(HandlingUnitTypeId='{HandlingUnitTypeId}')

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
"HandlingUnitTypeId": "It is a Text",
"Description": "It is a Text",
"HandlingUnitCategoryId": "It is a Text",
"Width": 1,
"Height": 1,
"Depth": 1,
"Volume": 1,
"TareWeight": 1,
"UomForLength": "It is a Text",
"UomForVolume": "It is a Text",
"UomForWeight": "It is a Text",
"AdditiveVolume": true,
"MaxVolumeCapacity": 1,
"MaxWeightCapacity": 1,
"Stackable": true,
"Cost": 1,
"CurrencyCode": "It is a Text",
"GenerateSsccNo": true,
"PrintLabel": true,
"NoOfHandlingUnitLabels": 1,
"PrintContentLabel": true,
"NoOfContentLabels": 1,
"PrintShipmentLabel": true,
"NoOfShipmentLabels": 1,
"UseHuReservationRanking": true,
"NoteId": 1,
"NoteText": "It is a Text",
"TransportTaskCapacity": 1,
"PartNo": "It is a Text",
"Reusable": true
}
Reference_PartAvailabilityControl
Reference Entity Set Reference_PartAvailabilityControl

Get entities from Reference_PartAvailabilityControl
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
Items Enum: "Objstate" "Objstate desc" "AvailabilityControlId" "AvailabilityControlId desc" "Description" "Description desc" "PartSupplyControl" "PartSupplyControl desc" "PartOrderIssueControl" "PartOrderIssueControl desc" "PartReservationControl" "PartReservationControl desc" "PartManualReservCtrl" "PartManualReservCtrl desc" "PartScrapControl" "PartScrapControl desc" "PartCountingControl" "PartCountingControl desc" "PartMovementControl" "PartMovementControl desc" "PartNoorderIssueControl" "PartNoorderIssueControl desc" "PutawayZoneRefillSource" "PutawayZoneRefillSource desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "AvailabilityControlId" "Description" "PartSupplyControl" "PartOrderIssueControl" "PartReservationControl" "PartManualReservCtrl" "PartScrapControl" "PartCountingControl" "PartMovementControl" "PartNoorderIssueControl" "PutawayZoneRefillSource"
Specify properties to return, see OData Select

Responses
200 response body for entity array PartAvailabilityControl
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PartAvailabilityControl

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_PartAvailabilityControl by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
AvailabilityControlId
required
string <= 25 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "AvailabilityControlId" "Description" "PartSupplyControl" "PartOrderIssueControl" "PartReservationControl" "PartManualReservCtrl" "PartScrapControl" "PartCountingControl" "PartMovementControl" "PartNoorderIssueControl" "PutawayZoneRefillSource"
Specify properties to return, see OData Select

Responses
200 response body for entity type PartAvailabilityControl
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_PartAvailabilityControl(AvailabilityControlId='{AvailabilityControlId}')

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
"AvailabilityControlId": "It is a Text",
"Description": "It is a Text",
"PutawayZoneRefillSource": true,
"Objstate": "Active",
"PartSupplyControl": "Nettable",
"PartOrderIssueControl": "OrderIssue",
"PartReservationControl": "AutoReservation",
"PartManualReservCtrl": "ManualReservation",
"PartScrapControl": "Scrappable",
"PartCountingControl": "AllowReducing",
"PartMovementControl": "AllAllowed",
"PartNoorderIssueControl": "NonOrderIssue"
}
