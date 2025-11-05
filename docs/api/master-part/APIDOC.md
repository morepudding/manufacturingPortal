
REST API Documentation
Search...
Service Operations - Actions
Service Operations - Functions
Reference_AttributeStructure
get
Get entities from Reference_AttributeStructure
get
Get entity from Reference_AttributeStructure by key
Reference_AssortmentPartStructure
Documentation Powered by Redocly
PartService (1)
API Class: Premium

Designed for IFS Integration functionality to retrieve master part data.
This message service consists of only one inbound operation and the required actions/functions to handle the operation is exposed through REST APIs.[Terms of Service] (https://docs.ifs.com/policy/APIUsageCloud.pdf)

Service Operations - Actions
Actions

Invoke action GetPartCatalog
This operation is used to retrieve part information based on selection criteria. Originally developed to support a web shop integration to IFS Cloud.

Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action GetPartCatalogActionImport

PartCatalogParams	
object
This is a structure of type PartCatalogParamsStructure.

Responses
200 response body for action GetPartCatalog : return is a list of PartCatalogStructures.
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/GetPartCatalog

Request samples
Payload
Content type
application/json

Copy
Expand allCollapse all
{
"PartCatalogParams": {
"AssortmentId": "It is a Text",
"PartNo": "It is a Text",
"PartMainGroup": "It is a Text",
"PartMainGrpInCond": "It is a Text",
"ChangedSinceNumberOfDays": 1,
"IncludeAttributes": true
}
}
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
Service Operations - Functions
Functions

Reference_AttributeStructure
Reference Entity Set Reference_AttributeStructure

Get entities from Reference_AttributeStructure
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
Items Enum: "PartNo" "PartNo desc" "AttributeName" "AttributeName desc" "AttributeValue" "AttributeValue desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PartNo" "AttributeName" "AttributeValue"
Specify properties to return, see OData Select

Responses
200 Query type for Additional attributes of Part Catalog in PartCatalogStructure.
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_AttributeStructure

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_AttributeStructure by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 200 characters
Example: It is a Text
An attribute used for internal use

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "PartNo" "AttributeName" "AttributeValue"
Specify properties to return, see OData Select

Responses
200 Query type for Additional attributes of Part Catalog in PartCatalogStructure.
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_AttributeStructure(PartNo='{PartNo}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"PartNo": "It is a Text",
"AttributeName": "It is a Text",
"AttributeValue": "It is a Text"
}
Reference_AssortmentPartStructure
Reference Entity Set Reference_AssortmentPartStructure

Get entities from Reference_AssortmentPartStructure
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
Items Enum: "PartNo" "PartNo desc" "AssortmentId" "AssortmentId desc" "AssortmentNodeId" "AssortmentNodeId desc" "ClosestNode" "ClosestNode desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PartNo" "AssortmentId" "AssortmentNodeId" "ClosestNode"
Specify properties to return, see OData Select

Responses
200 Query type for AssortmentPartStructure type elements.
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_AssortmentPartStructure

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_AssortmentPartStructure by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 200 characters
Example: It is a Text
The identity of the part that is connected to the specified assortment node. A part, or rather a part node, is the lowest level of an assortment. A part node cannot be a parent to other nodes.

query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "PartNo" "AssortmentId" "AssortmentNodeId" "ClosestNode"
Specify properties to return, see OData Select

Responses
200 Query type for AssortmentPartStructure type elements.
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_AssortmentPartStructure(PartNo='{PartNo}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"PartNo": "It is a Text",
"AssortmentId": "It is a Text",
"AssortmentNodeId": "It is a Text",
"ClosestNode": "It is a Text"
}
