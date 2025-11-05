
REST API Documentation
Search...
EngPartRevisionSet
Service Operations - Actions
Service Operations - Functions
Reference_EngPartMasterMain
Reference_EngPartRevision
Reference_EngPartDevelopLevel
Reference_EcoOrder
Reference_ApprovalProfile
Reference_TechnicalDrawing
Reference_TechnicalDrawingRevision
Documentation Powered by Redocly
EngineeringPartRevisionsHandling (1)
API Class:N/A

[Terms of Service] (https://docs.ifs.com/policy/APIUsageCloud.pdf)

EngPartRevisionSet
Get entities from EngPartRevisionSet
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
Items Enum: "Objstate" "Objstate desc" "PartNo" "PartNo desc" "PartRev" "PartRev desc" "RevNo" "RevNo desc" "EcoNo" "EcoNo desc" "ObsoleteDt" "ObsoleteDt desc" "ReleasedDt" "ReleasedDt desc" "StrActiveDt" "StrActiveDt desc" "DevelopLev" "DevelopLev desc" "StopReport" "StopReport desc" "Info1" "Info1 desc" "AssumedLeadTime" "AssumedLeadTime desc" "AssumedCost" "AssumedCost desc" "LeadTime" "LeadTime desc" "StdCost" "StdCost desc" "WorkCost" "WorkCost desc" "CalcCost" "CalcCost desc" "CalcWork" "CalcWork desc" "DtStdCost" "DtStdCost desc" "DtWorkCost" "DtWorkCost desc" "DtCalcCost" "DtCalcCost desc" "DtCalcWork" "DtCalcWork desc" "PriceAvg" "PriceAvg desc" "PriceLastPur" "PriceLastPur desc" "DtCre" "DtCre desc" "UserCreated" "UserCreated desc" "DtChg" "DtChg desc" "UserSign" "UserSign desc" "Flex1" "Flex1 desc" "Flex2" "Flex2 desc" "Flex3" "Flex3 desc" "CalcValue" "CalcValue desc" "DtCalcValue" "DtCalcValue desc" "ProfileId" "ProfileId desc" "MaterialCost" "MaterialCost desc" "WorkHour" "WorkHour desc" "CalcHour" "CalcHour desc" "CoChanged" "CoChanged desc" "TransferredToManuf" "TransferredToManuf desc" "ChangeDocs" "ChangeDocs desc" "TechnicalDrawingNo" "TechnicalDrawingNo desc" "TechDrawingRevisionNo" "TechDrawingRevisionNo desc" "CDntUseNProd" "CDntUseNProd desc" "InterfaceUpdatable" "InterfaceUpdatable desc" "StdName" "StdName desc" "LanguageStandardName" "LanguageStandardName desc" "Description" "Description desc" "PartDescriptioninSelectedLanguage" "PartDescriptioninSelectedLanguage desc" "HasSpareParts" "HasSpareParts desc" "IsCoBelowPerform" "IsCoBelowPerform desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "PartNo" "PartRev" "RevNo" "EcoNo" "ObsoleteDt" "ReleasedDt" "StrActiveDt" "DevelopLev" "StopReport" "Info1" "AssumedLeadTime" "AssumedCost" "LeadTime" "StdCost" "WorkCost" "CalcCost" "CalcWork" "DtStdCost" "DtWorkCost" "DtCalcCost" "DtCalcWork" "PriceAvg" "PriceLastPur" "DtCre" "UserCreated" "DtChg" "UserSign" "Flex1" "Flex2" "Flex3" "CalcValue" "DtCalcValue" "ProfileId" "MaterialCost" "WorkHour" "CalcHour" "CoChanged" "TransferredToManuf" "ChangeDocs" "TechnicalDrawingNo" "TechDrawingRevisionNo" "CDntUseNProd" "InterfaceUpdatable" "StdName" "LanguageStandardName" "Description" "PartDescriptioninSelectedLanguage" "HasSpareParts" "IsCoBelowPerform"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "EngPartDevelopLevelRef" "PartNoRef" "EcoNoRef" "ProfileIdRef" "TechnicalDrawingNoRef" "TechDrawingRevisionNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array EngPartRevision
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/EngPartRevisionSet

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from EngPartRevisionSet by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
PartRev
required
string <= 6 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "PartNo" "PartRev" "RevNo" "EcoNo" "ObsoleteDt" "ReleasedDt" "StrActiveDt" "DevelopLev" "StopReport" "Info1" "AssumedLeadTime" "AssumedCost" "LeadTime" "StdCost" "WorkCost" "CalcCost" "CalcWork" "DtStdCost" "DtWorkCost" "DtCalcCost" "DtCalcWork" "PriceAvg" "PriceLastPur" "DtCre" "UserCreated" "DtChg" "UserSign" "Flex1" "Flex2" "Flex3" "CalcValue" "DtCalcValue" "ProfileId" "MaterialCost" "WorkHour" "CalcHour" "CoChanged" "TransferredToManuf" "ChangeDocs" "TechnicalDrawingNo" "TechDrawingRevisionNo" "CDntUseNProd" "InterfaceUpdatable" "StdName" "LanguageStandardName" "Description" "PartDescriptioninSelectedLanguage" "HasSpareParts" "IsCoBelowPerform"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "EngPartDevelopLevelRef" "PartNoRef" "EcoNoRef" "ProfileIdRef" "TechnicalDrawingNoRef" "TechDrawingRevisionNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type EngPartRevision
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/EngPartRevisionSet(PartNo='{PartNo}',PartRev='{PartRev}')

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
"PartRev": "It is a Text",
"RevNo": 1,
"EcoNo": "It is a Text",
"ObsoleteDt": "2019-10-10",
"ReleasedDt": "2019-10-10",
"StrActiveDt": "2019-10-10",
"DevelopLev": "It is a Text",
"StopReport": "It is a Text",
"Info1": "It is a Text",
"AssumedLeadTime": 1,
"AssumedCost": 1,
"LeadTime": 1,
"StdCost": 1,
"WorkCost": 1,
"CalcCost": 1,
"CalcWork": 1,
"DtStdCost": "2019-10-10",
"DtWorkCost": "2019-10-10",
"DtCalcCost": "2019-10-10",
"DtCalcWork": "2019-10-10",
"PriceAvg": 1,
"PriceLastPur": 1,
"DtCre": "2019-10-01T01:01:01Z",
"UserCreated": "It is a Text",
"DtChg": "2019-10-01T01:01:01Z",
"UserSign": "It is a Text",
"Flex1": 1,
"Flex2": "It is a Text",
"Flex3": "It is a Text",
"CalcValue": 1,
"DtCalcValue": "2019-10-10",
"ProfileId": "It is a Text",
"MaterialCost": 1,
"WorkHour": 1,
"CalcHour": 1,
"CoChanged": "It is a Text",
"TransferredToManuf": "2019-10-01T01:01:01Z",
"ChangeDocs": "It is a Text",
"TechnicalDrawingNo": "It is a Text",
"TechDrawingRevisionNo": "It is a Text",
"CDntUseNProd": true,
"InterfaceUpdatable": "It is a Text",
"StdName": "It is a Text",
"LanguageStandardName": "It is a Text",
"Description": "It is a Text",
"PartDescriptioninSelectedLanguage": "It is a Text",
"HasSpareParts": true,
"IsCoBelowPerform": "It is a Text",
"Objstate": "Preliminary"
}
Delete entity from EngPartRevisionSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
PartRev
required
string <= 6 characters
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
/EngPartRevisionSet(PartNo='{PartNo}',PartRev='{PartRev}')

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
Update entity in EngPartRevisionSet
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
PartRev
required
string <= 6 characters
Example: It is a Text
query Parameters
select-fields	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "PartNo" "PartRev" "RevNo" "EcoNo" "ObsoleteDt" "ReleasedDt" "StrActiveDt" "DevelopLev" "StopReport" "Info1" "AssumedLeadTime" "AssumedCost" "LeadTime" "StdCost" "WorkCost" "CalcCost" "CalcWork" "DtStdCost" "DtWorkCost" "DtCalcCost" "DtCalcWork" "PriceAvg" "PriceLastPur" "DtCre" "UserCreated" "DtChg" "UserSign" "Flex1" "Flex2" "Flex3" "CalcValue" "DtCalcValue" "ProfileId" "MaterialCost" "WorkHour" "CalcHour" "CoChanged" "TransferredToManuf" "ChangeDocs" "TechnicalDrawingNo" "TechDrawingRevisionNo" "CDntUseNProd" "InterfaceUpdatable" "StdName" "LanguageStandardName" "Description" "PartDescriptioninSelectedLanguage" "HasSpareParts" "IsCoBelowPerform"
Specify properties to return, using the query parameter select-fields

header Parameters
If-Match	
string
E-Tag

Request Body schema: application/json
request body for updating entity type EngPartRevision

EcoNo	
string <= 10 characters
ObsoleteDt	
string <date>
ReleasedDt	
string <date>
StrActiveDt	
string <date>
DevelopLev
required
string <= 10 characters
StopReport	
string <= 1 characters
Info1	
string <= 2000 characters
AssumedLeadTime	
number <= 4
AssumedCost	
number
LeadTime	
number <= 4
StdCost	
number
WorkCost	
number
CalcCost	
number
CalcWork	
number
DtCalcCost	
string <date>
DtCalcWork	
string <date>
PriceAvg	
number
PriceLastPur	
number
DtChg	
string <date-time>
UserSign	
string <= 30 characters
Flex1	
number
Flex2	
string <= 35 characters
Flex3	
string <= 35 characters
CalcValue	
number
DtCalcValue	
string <date>
ProfileId	
string <= 10 characters
MaterialCost	
number
WorkHour	
number
CalcHour	
number
CoChanged	
string <= 6 characters
TransferredToManuf	
string <date-time>
ChangeDocs	
string <= 6 characters
TechnicalDrawingNo	
string <= 25 characters
TechDrawingRevisionNo	
string <= 10 characters
CDntUseNProd
required
boolean
InterfaceUpdatable	
string <= 5 characters
StdName	
string <= 200 characters
LanguageStandardName	
string <= 4000 characters
Description	
string <= 2000 characters
PartDescriptioninSelectedLanguage	
string <= 4000 characters
HasSpareParts	
boolean
IsCoBelowPerform	
string <= 4000 characters
Responses
200 response body for entity type EngPartRevision
201 response body for entity type EngPartRevision
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
/EngPartRevisionSet(PartNo='{PartNo}',PartRev='{PartRev}')

Request samples
Payload
Content type
application/json

Copy
{
"EcoNo": "It is a Text",
"ObsoleteDt": "2019-10-10",
"ReleasedDt": "2019-10-10",
"StrActiveDt": "2019-10-10",
"DevelopLev": "It is a Text",
"StopReport": "It is a Text",
"Info1": "It is a Text",
"AssumedLeadTime": 1,
"AssumedCost": 1,
"LeadTime": 1,
"StdCost": 1,
"WorkCost": 1,
"CalcCost": 1,
"CalcWork": 1,
"DtCalcCost": "2019-10-10",
"DtCalcWork": "2019-10-10",
"PriceAvg": 1,
"PriceLastPur": 1,
"DtChg": "2019-10-01T01:01:01Z",
"UserSign": "It is a Text",
"Flex1": 1,
"Flex2": "It is a Text",
"Flex3": "It is a Text",
"CalcValue": 1,
"DtCalcValue": "2019-10-10",
"ProfileId": "It is a Text",
"MaterialCost": 1,
"WorkHour": 1,
"CalcHour": 1,
"CoChanged": "It is a Text",
"TransferredToManuf": "2019-10-01T01:01:01Z",
"ChangeDocs": "It is a Text",
"TechnicalDrawingNo": "It is a Text",
"TechDrawingRevisionNo": "It is a Text",
"CDntUseNProd": true,
"InterfaceUpdatable": "It is a Text",
"StdName": "It is a Text",
"LanguageStandardName": "It is a Text",
"Description": "It is a Text",
"PartDescriptioninSelectedLanguage": "It is a Text",
"HasSpareParts": true,
"IsCoBelowPerform": "It is a Text"
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
"PartNo": "It is a Text",
"PartRev": "It is a Text",
"RevNo": 1,
"EcoNo": "It is a Text",
"ObsoleteDt": "2019-10-10",
"ReleasedDt": "2019-10-10",
"StrActiveDt": "2019-10-10",
"DevelopLev": "It is a Text",
"StopReport": "It is a Text",
"Info1": "It is a Text",
"AssumedLeadTime": 1,
"AssumedCost": 1,
"LeadTime": 1,
"StdCost": 1,
"WorkCost": 1,
"CalcCost": 1,
"CalcWork": 1,
"DtStdCost": "2019-10-10",
"DtWorkCost": "2019-10-10",
"DtCalcCost": "2019-10-10",
"DtCalcWork": "2019-10-10",
"PriceAvg": 1,
"PriceLastPur": 1,
"DtCre": "2019-10-01T01:01:01Z",
"UserCreated": "It is a Text",
"DtChg": "2019-10-01T01:01:01Z",
"UserSign": "It is a Text",
"Flex1": 1,
"Flex2": "It is a Text",
"Flex3": "It is a Text",
"CalcValue": 1,
"DtCalcValue": "2019-10-10",
"ProfileId": "It is a Text",
"MaterialCost": 1,
"WorkHour": 1,
"CalcHour": 1,
"CoChanged": "It is a Text",
"TransferredToManuf": "2019-10-01T01:01:01Z",
"ChangeDocs": "It is a Text",
"TechnicalDrawingNo": "It is a Text",
"TechDrawingRevisionNo": "It is a Text",
"CDntUseNProd": true,
"InterfaceUpdatable": "It is a Text",
"StdName": "It is a Text",
"LanguageStandardName": "It is a Text",
"Description": "It is a Text",
"PartDescriptioninSelectedLanguage": "It is a Text",
"HasSpareParts": true,
"IsCoBelowPerform": "It is a Text",
"Objstate": "Preliminary"
}
Invoke action SetActive
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
PartRev
required
string <= 6 characters
Example: It is a Text
header Parameters
If-Match
required
string
E-Tag

Request Body schema: application/json
request body for action SetActiveAction

object (SetActiveAction)
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
/EngPartRevisionSet(PartNo='{PartNo}',PartRev='{PartRev}')/IfsApp.EngineeringPartRevisionsHandling.EngPartRevision_SetActive

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
Invoke action SetToObsolete
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
PartRev
required
string <= 6 characters
Example: It is a Text
header Parameters
If-Match
required
string
E-Tag

Request Body schema: application/json
request body for action SetToObsoleteAction

object (SetToObsoleteAction)
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
/EngPartRevisionSet(PartNo='{PartNo}',PartRev='{PartRev}')/IfsApp.EngineeringPartRevisionsHandling.EngPartRevision_SetToObsolete

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
Invoke action ReleaseFromActive
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
PartRev
required
string <= 6 characters
Example: It is a Text
header Parameters
If-Match
required
string
E-Tag

Request Body schema: application/json
request body for action ReleaseFromActiveAction

object (ReleaseFromActiveAction)
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
/EngPartRevisionSet(PartNo='{PartNo}',PartRev='{PartRev}')/IfsApp.EngineeringPartRevisionsHandling.EngPartRevision_ReleaseFromActive

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
PartNo
required
string <= 25 characters
Example: It is a Text
PartRev
required
string <= 6 characters
Example: It is a Text
query Parameters
@CopyValues
required
object (EngPartRevisionCopyValues)
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "PartNo" "PartRev" "RevNo" "EcoNo" "ObsoleteDt" "ReleasedDt" "StrActiveDt" "DevelopLev" "StopReport" "Info1" "AssumedLeadTime" "AssumedCost" "LeadTime" "StdCost" "WorkCost" "CalcCost" "CalcWork" "DtStdCost" "DtWorkCost" "DtCalcCost" "DtCalcWork" "PriceAvg" "PriceLastPur" "DtCre" "UserCreated" "DtChg" "UserSign" "Flex1" "Flex2" "Flex3" "CalcValue" "DtCalcValue" "ProfileId" "MaterialCost" "WorkHour" "CalcHour" "CoChanged" "TransferredToManuf" "ChangeDocs" "TechnicalDrawingNo" "TechDrawingRevisionNo" "CDntUseNProd" "InterfaceUpdatable" "StdName" "LanguageStandardName" "Description" "PartDescriptioninSelectedLanguage" "HasSpareParts" "IsCoBelowPerform"
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
/EngPartRevisionSet(PartNo='{PartNo}',PartRev='{PartRev}')/IfsApp.EngineeringPartRevisionsHandling.EngPartRevision_DefaultCopy(CopyValues=@CopyValues)

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
"PartRev": "It is a Text",
"RevNo": 1,
"EcoNo": "It is a Text",
"ObsoleteDt": "2019-10-10",
"ReleasedDt": "2019-10-10",
"StrActiveDt": "2019-10-10",
"DevelopLev": "It is a Text",
"StopReport": "It is a Text",
"Info1": "It is a Text",
"AssumedLeadTime": 1,
"AssumedCost": 1,
"LeadTime": 1,
"StdCost": 1,
"WorkCost": 1,
"CalcCost": 1,
"CalcWork": 1,
"DtStdCost": "2019-10-10",
"DtWorkCost": "2019-10-10",
"DtCalcCost": "2019-10-10",
"DtCalcWork": "2019-10-10",
"PriceAvg": 1,
"PriceLastPur": 1,
"DtCre": "2019-10-01T01:01:01Z",
"UserCreated": "It is a Text",
"DtChg": "2019-10-01T01:01:01Z",
"UserSign": "It is a Text",
"Flex1": 1,
"Flex2": "It is a Text",
"Flex3": "It is a Text",
"CalcValue": 1,
"DtCalcValue": "2019-10-10",
"ProfileId": "It is a Text",
"MaterialCost": 1,
"WorkHour": 1,
"CalcHour": 1,
"CoChanged": "It is a Text",
"TransferredToManuf": "2019-10-01T01:01:01Z",
"ChangeDocs": "It is a Text",
"TechnicalDrawingNo": "It is a Text",
"TechDrawingRevisionNo": "It is a Text",
"CDntUseNProd": true,
"InterfaceUpdatable": "It is a Text",
"StdName": "It is a Text",
"LanguageStandardName": "It is a Text",
"Description": "It is a Text",
"PartDescriptioninSelectedLanguage": "It is a Text",
"HasSpareParts": true,
"IsCoBelowPerform": "It is a Text",
"Objstate": "Preliminary"
}
Get entities from EngPartDevelopLevelRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
PartRev
required
string <= 6 characters
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
Items Enum: "DevelopLev" "DevelopLev desc" "Description" "Description desc" "Information" "Information desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "DevelopLev" "Description" "Information"
Specify properties to return, see OData Select

Responses
200 response body for entity array EngPartDevelopLevel
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/EngPartRevisionSet(PartNo='{PartNo}',PartRev='{PartRev}')/EngPartDevelopLevelRef

Response samples
200403405500501503504
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
PartRev
required
string <= 6 characters
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
Items Enum: "PartNo" "PartNo desc" "StdName" "StdName desc" "Description" "Description desc" "LanguagePartDescription" "LanguagePartDescription desc" "PartClass" "PartClass desc" "PartMainGroup" "PartMainGroup desc" "UnitCode" "UnitCode desc" "Provide" "Provide desc" "LotTrackingCode" "LotTrackingCode desc" "SerialType" "SerialType desc" "SerialTrackingCode" "SerialTrackingCode desc" "RevNoMax" "RevNoMax desc" "RevNoApp" "RevNoApp desc" "DtCre" "DtCre desc" "UserCreated" "UserCreated desc" "DtChg" "DtChg desc" "UserSign" "UserSign desc" "Flex1" "Flex1 desc" "Flex2" "Flex2 desc" "Flex3" "Flex3 desc" "PartResponsible" "PartResponsible desc" "FirstRevision" "FirstRevision desc" "AquisitionCode" "AquisitionCode desc" "StdNameId" "StdNameId desc" "ProjectDocReqProfile" "ProjectDocReqProfile desc" "PlanningMethod" "PlanningMethod desc" "Configurable" "Configurable desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PartNo" "StdName" "Description" "LanguagePartDescription" "PartClass" "PartMainGroup" "UnitCode" "Provide" "LotTrackingCode" "SerialType" "SerialTrackingCode" "RevNoMax" "RevNoApp" "DtCre" "UserCreated" "DtChg" "UserSign" "Flex1" "Flex2" "Flex3" "PartResponsible" "FirstRevision" "AquisitionCode" "StdNameId" "ProjectDocReqProfile" "PlanningMethod" "Configurable"
Specify properties to return, see OData Select

Responses
200 response body for entity array EngPartMasterMain
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/EngPartRevisionSet(PartNo='{PartNo}',PartRev='{PartRev}')/PartNoRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from EcoNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
PartRev
required
string <= 6 characters
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
Items Enum: "Objstate" "Objstate desc" "EcoNo" "EcoNo desc" "Description" "Description desc" "Cause" "Cause desc" "WorkDone" "WorkDone desc" "Information" "Information desc" "CoResponsible" "CoResponsible desc" "Priority" "Priority desc" "EcoAnalysed" "EcoAnalysed desc" "AnalysedDate" "AnalysedDate desc" "AnalysedSign" "AnalysedSign desc" "EcoApproved" "EcoApproved desc" "ApprovedDate" "ApprovedDate desc" "ApprovedSign" "ApprovedSign desc" "DtCre" "DtCre desc" "UserCreated" "UserCreated desc" "DtChg" "DtChg desc" "UserSign" "UserSign desc" "ProposedStartDate" "ProposedStartDate desc" "ProposedEndDate" "ProposedEndDate desc" "ProposedSerialBegin" "ProposedSerialBegin desc" "ProposedSerialEnd" "ProposedSerialEnd desc" "ChangeDates" "ChangeDates desc" "StructureEffectivity" "StructureEffectivity desc" "ActivitySeq" "ActivitySeq desc" "Period" "Period desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "EcoNo" "Description" "Cause" "WorkDone" "Information" "CoResponsible" "Priority" "EcoAnalysed" "AnalysedDate" "AnalysedSign" "EcoApproved" "ApprovedDate" "ApprovedSign" "DtCre" "UserCreated" "DtChg" "UserSign" "ProposedStartDate" "ProposedEndDate" "ProposedSerialBegin" "ProposedSerialEnd" "ChangeDates" "StructureEffectivity" "ActivitySeq" "Period"
Specify properties to return, see OData Select

Responses
200 response body for entity array EcoOrder
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/EngPartRevisionSet(PartNo='{PartNo}',PartRev='{PartRev}')/EcoNoRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from ProfileIdRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
PartRev
required
string <= 6 characters
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
Items Enum: "ProfileId" "ProfileId desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ProfileId" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array ApprovalProfile
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/EngPartRevisionSet(PartNo='{PartNo}',PartRev='{PartRev}')/ProfileIdRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from TechnicalDrawingNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
PartRev
required
string <= 6 characters
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
/EngPartRevisionSet(PartNo='{PartNo}',PartRev='{PartRev}')/TechnicalDrawingNoRef

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entities from TechDrawingRevisionNoRef
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
PartRev
required
string <= 6 characters
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
Items Enum: "DrawingNo" "DrawingNo desc" "DrawingRevisionNo" "DrawingRevisionNo desc" "RevisionText" "RevisionText desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "DrawingNo" "DrawingRevisionNo" "RevisionText"
Specify properties to return, see OData Select

Responses
200 response body for entity array TechnicalDrawingRevision
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/EngPartRevisionSet(PartNo='{PartNo}',PartRev='{PartRev}')/TechDrawingRevisionNoRef

Response samples
200403405500501503504
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

Invoke action CopyPartServices
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action CopyPartServicesActionImport

FromPartNo	
string
FromPartRev	
string
ToPartNo	
string
ToPartRev	
string
CopyStructure	
boolean
CopyDocumentSurvey	
boolean
CopyCharSpec	
boolean
Responses
200 response body for action CopyPartServices :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

post
/CopyPartServices

Request samples
Payload
Content type
application/json

Copy
{
"FromPartNo": "It is a Text",
"FromPartRev": "It is a Text",
"ToPartNo": "It is a Text",
"ToPartRev": "It is a Text",
"CopyStructure": true,
"CopyDocumentSurvey": true,
"CopyCharSpec": true
}
Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": true
}
Invoke action GetOlfiDataPlus
Authorizations:
(OpenIdbasicAuth)
Request Body schema: application/json
request body for action GetOlfiDataPlusActionImport

Selection	
string
RunBackground	
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
/GetOlfiDataPlus

Request samples
Payload
Content type
application/json

Copy
{
"Selection": "It is a Text",
"RunBackground": true
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

Invoke function SetInfoVariables
Authorizations:
(OpenIdbasicAuth)
Responses
200 response body for function SetInfoVariables :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/SetInfoVariables()

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"Site": "It is a Text",
"Company": "It is a Text",
"CurrencyCode": "It is a Text"
}
Invoke function GetDeafultData
Authorizations:
(OpenIdbasicAuth)
path Parameters
ParNo
required
string
Example: It is a Text
PartRev
required
string
Example: It is a Text
Responses
200 response body for function GetDeafultData :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetDeafultData(ParNo='{ParNo}',PartRev='{PartRev}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"CopyStructure": true,
"CopyDocumentSurvey": true,
"CopyCharSpec": true,
"PartExist": true
}
Invoke function CheckSpareListExist
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string
Example: It is a Text
PartRev
required
string
Example: It is a Text
Responses
200 response body for function CheckSpareListExist :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/CheckSpareListExist(PartNo='{PartNo}',PartRev='{PartRev}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": 1
}
Invoke function GetNumberOfParents
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string
Example: It is a Text
PartRev
required
string
Example: It is a Text
Responses
200 response body for function GetNumberOfParents :
400 Bad Request
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/GetNumberOfParents(PartNo='{PartNo}',PartRev='{PartRev}')

Response samples
200400403405500501503504
Content type
application/json

Copy
{
"value": 1
}
Reference_EngPartMasterMain
Reference Entity Set Reference_EngPartMasterMain

Get entities from Reference_EngPartMasterMain
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
Items Enum: "PartNo" "PartNo desc" "StdName" "StdName desc" "Description" "Description desc" "LanguagePartDescription" "LanguagePartDescription desc" "PartClass" "PartClass desc" "PartMainGroup" "PartMainGroup desc" "UnitCode" "UnitCode desc" "Provide" "Provide desc" "LotTrackingCode" "LotTrackingCode desc" "SerialType" "SerialType desc" "SerialTrackingCode" "SerialTrackingCode desc" "RevNoMax" "RevNoMax desc" "RevNoApp" "RevNoApp desc" "DtCre" "DtCre desc" "UserCreated" "UserCreated desc" "DtChg" "DtChg desc" "UserSign" "UserSign desc" "Flex1" "Flex1 desc" "Flex2" "Flex2 desc" "Flex3" "Flex3 desc" "PartResponsible" "PartResponsible desc" "FirstRevision" "FirstRevision desc" "AquisitionCode" "AquisitionCode desc" "StdNameId" "StdNameId desc" "ProjectDocReqProfile" "ProjectDocReqProfile desc" "PlanningMethod" "PlanningMethod desc" "Configurable" "Configurable desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "PartNo" "StdName" "Description" "LanguagePartDescription" "PartClass" "PartMainGroup" "UnitCode" "Provide" "LotTrackingCode" "SerialType" "SerialTrackingCode" "RevNoMax" "RevNoApp" "DtCre" "UserCreated" "DtChg" "UserSign" "Flex1" "Flex2" "Flex3" "PartResponsible" "FirstRevision" "AquisitionCode" "StdNameId" "ProjectDocReqProfile" "PlanningMethod" "Configurable"
Specify properties to return, see OData Select

Responses
200 response body for entity array EngPartMasterMain
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_EngPartMasterMain

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_EngPartMasterMain by key
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
Items Enum: "luname" "keyref" "PartNo" "StdName" "Description" "LanguagePartDescription" "PartClass" "PartMainGroup" "UnitCode" "Provide" "LotTrackingCode" "SerialType" "SerialTrackingCode" "RevNoMax" "RevNoApp" "DtCre" "UserCreated" "DtChg" "UserSign" "Flex1" "Flex2" "Flex3" "PartResponsible" "FirstRevision" "AquisitionCode" "StdNameId" "ProjectDocReqProfile" "PlanningMethod" "Configurable"
Specify properties to return, see OData Select

Responses
200 response body for entity type EngPartMasterMain
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_EngPartMasterMain(PartNo='{PartNo}')

Response samples
200400403404405500501503504
Content type
application/json

Copy
{
"luname": "It is a Text",
"keyref": "It is a Text",
"PartNo": "It is a Text",
"StdName": "It is a Text",
"Description": "It is a Text",
"LanguagePartDescription": "It is a Text",
"PartClass": "It is a Text",
"PartMainGroup": "It is a Text",
"UnitCode": "It is a Text",
"RevNoMax": 1,
"RevNoApp": 1,
"DtCre": "2019-10-01T01:01:01Z",
"UserCreated": "It is a Text",
"DtChg": "2019-10-01T01:01:01Z",
"UserSign": "It is a Text",
"Flex1": 1,
"Flex2": "It is a Text",
"Flex3": "It is a Text",
"PartResponsible": "It is a Text",
"FirstRevision": "It is a Text",
"StdNameId": 1,
"ProjectDocReqProfile": "It is a Text",
"Configurable": "It is a Text",
"Provide": "Make",
"LotTrackingCode": "LotTracking",
"SerialType": "SerialTracking",
"SerialTrackingCode": "SerialTracking",
"AquisitionCode": "Demand",
"PlanningMethod": "PMRPPlanned"
}
Reference_EngPartRevision
Reference Entity Set Reference_EngPartRevision

Get entities from Reference_EngPartRevision
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
Items Enum: "Objstate" "Objstate desc" "PartNo" "PartNo desc" "PartRev" "PartRev desc" "RevNo" "RevNo desc" "EcoNo" "EcoNo desc" "ObsoleteDt" "ObsoleteDt desc" "ReleasedDt" "ReleasedDt desc" "StrActiveDt" "StrActiveDt desc" "DevelopLev" "DevelopLev desc" "StopReport" "StopReport desc" "Info1" "Info1 desc" "AssumedLeadTime" "AssumedLeadTime desc" "AssumedCost" "AssumedCost desc" "LeadTime" "LeadTime desc" "StdCost" "StdCost desc" "WorkCost" "WorkCost desc" "CalcCost" "CalcCost desc" "CalcWork" "CalcWork desc" "DtStdCost" "DtStdCost desc" "DtWorkCost" "DtWorkCost desc" "DtCalcCost" "DtCalcCost desc" "DtCalcWork" "DtCalcWork desc" "PriceAvg" "PriceAvg desc" "PriceLastPur" "PriceLastPur desc" "DtCre" "DtCre desc" "UserCreated" "UserCreated desc" "DtChg" "DtChg desc" "UserSign" "UserSign desc" "Flex1" "Flex1 desc" "Flex2" "Flex2 desc" "Flex3" "Flex3 desc" "CalcValue" "CalcValue desc" "DtCalcValue" "DtCalcValue desc" "ProfileId" "ProfileId desc" "MaterialCost" "MaterialCost desc" "WorkHour" "WorkHour desc" "CalcHour" "CalcHour desc" "CoChanged" "CoChanged desc" "TransferredToManuf" "TransferredToManuf desc" "ChangeDocs" "ChangeDocs desc" "TechnicalDrawingNo" "TechnicalDrawingNo desc" "TechDrawingRevisionNo" "TechDrawingRevisionNo desc" "CDntUseNProd" "CDntUseNProd desc" "InterfaceUpdatable" "InterfaceUpdatable desc" "StdName" "StdName desc" "LanguageStandardName" "LanguageStandardName desc" "Description" "Description desc" "PartDescriptioninSelectedLanguage" "PartDescriptioninSelectedLanguage desc" "HasSpareParts" "HasSpareParts desc" "IsCoBelowPerform" "IsCoBelowPerform desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "PartNo" "PartRev" "RevNo" "EcoNo" "ObsoleteDt" "ReleasedDt" "StrActiveDt" "DevelopLev" "StopReport" "Info1" "AssumedLeadTime" "AssumedCost" "LeadTime" "StdCost" "WorkCost" "CalcCost" "CalcWork" "DtStdCost" "DtWorkCost" "DtCalcCost" "DtCalcWork" "PriceAvg" "PriceLastPur" "DtCre" "UserCreated" "DtChg" "UserSign" "Flex1" "Flex2" "Flex3" "CalcValue" "DtCalcValue" "ProfileId" "MaterialCost" "WorkHour" "CalcHour" "CoChanged" "TransferredToManuf" "ChangeDocs" "TechnicalDrawingNo" "TechDrawingRevisionNo" "CDntUseNProd" "InterfaceUpdatable" "StdName" "LanguageStandardName" "Description" "PartDescriptioninSelectedLanguage" "HasSpareParts" "IsCoBelowPerform"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "EngPartDevelopLevelRef" "PartNoRef" "EcoNoRef" "ProfileIdRef" "TechnicalDrawingNoRef" "TechDrawingRevisionNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity array EngPartRevision
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_EngPartRevision

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_EngPartRevision by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
PartNo
required
string <= 25 characters
Example: It is a Text
PartRev
required
string <= 6 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "PartNo" "PartRev" "RevNo" "EcoNo" "ObsoleteDt" "ReleasedDt" "StrActiveDt" "DevelopLev" "StopReport" "Info1" "AssumedLeadTime" "AssumedCost" "LeadTime" "StdCost" "WorkCost" "CalcCost" "CalcWork" "DtStdCost" "DtWorkCost" "DtCalcCost" "DtCalcWork" "PriceAvg" "PriceLastPur" "DtCre" "UserCreated" "DtChg" "UserSign" "Flex1" "Flex2" "Flex3" "CalcValue" "DtCalcValue" "ProfileId" "MaterialCost" "WorkHour" "CalcHour" "CoChanged" "TransferredToManuf" "ChangeDocs" "TechnicalDrawingNo" "TechDrawingRevisionNo" "CDntUseNProd" "InterfaceUpdatable" "StdName" "LanguageStandardName" "Description" "PartDescriptioninSelectedLanguage" "HasSpareParts" "IsCoBelowPerform"
Specify properties to return, see OData Select

$expand	
Array of strings unique
Items Enum: "EngPartDevelopLevelRef" "PartNoRef" "EcoNoRef" "ProfileIdRef" "TechnicalDrawingNoRef" "TechDrawingRevisionNoRef"
Expand related entities, see OData Expand

Responses
200 response body for entity type EngPartRevision
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_EngPartRevision(PartNo='{PartNo}',PartRev='{PartRev}')

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
"PartRev": "It is a Text",
"RevNo": 1,
"EcoNo": "It is a Text",
"ObsoleteDt": "2019-10-10",
"ReleasedDt": "2019-10-10",
"StrActiveDt": "2019-10-10",
"DevelopLev": "It is a Text",
"StopReport": "It is a Text",
"Info1": "It is a Text",
"AssumedLeadTime": 1,
"AssumedCost": 1,
"LeadTime": 1,
"StdCost": 1,
"WorkCost": 1,
"CalcCost": 1,
"CalcWork": 1,
"DtStdCost": "2019-10-10",
"DtWorkCost": "2019-10-10",
"DtCalcCost": "2019-10-10",
"DtCalcWork": "2019-10-10",
"PriceAvg": 1,
"PriceLastPur": 1,
"DtCre": "2019-10-01T01:01:01Z",
"UserCreated": "It is a Text",
"DtChg": "2019-10-01T01:01:01Z",
"UserSign": "It is a Text",
"Flex1": 1,
"Flex2": "It is a Text",
"Flex3": "It is a Text",
"CalcValue": 1,
"DtCalcValue": "2019-10-10",
"ProfileId": "It is a Text",
"MaterialCost": 1,
"WorkHour": 1,
"CalcHour": 1,
"CoChanged": "It is a Text",
"TransferredToManuf": "2019-10-01T01:01:01Z",
"ChangeDocs": "It is a Text",
"TechnicalDrawingNo": "It is a Text",
"TechDrawingRevisionNo": "It is a Text",
"CDntUseNProd": true,
"InterfaceUpdatable": "It is a Text",
"StdName": "It is a Text",
"LanguageStandardName": "It is a Text",
"Description": "It is a Text",
"PartDescriptioninSelectedLanguage": "It is a Text",
"HasSpareParts": true,
"IsCoBelowPerform": "It is a Text",
"Objstate": "Preliminary"
}
Reference_EngPartDevelopLevel
Reference Entity Set Reference_EngPartDevelopLevel

Get entities from Reference_EngPartDevelopLevel
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
Items Enum: "DevelopLev" "DevelopLev desc" "Description" "Description desc" "Information" "Information desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "DevelopLev" "Description" "Information"
Specify properties to return, see OData Select

Responses
200 response body for entity array EngPartDevelopLevel
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_EngPartDevelopLevel

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_EngPartDevelopLevel by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
DevelopLev
required
string <= 10 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "DevelopLev" "Description" "Information"
Specify properties to return, see OData Select

Responses
200 response body for entity type EngPartDevelopLevel
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_EngPartDevelopLevel(DevelopLev='{DevelopLev}')

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
"DevelopLev": "It is a Text",
"Description": "It is a Text",
"Information": "It is a Text"
}
Reference_EcoOrder
Reference Entity Set Reference_EcoOrder

Get entities from Reference_EcoOrder
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
Items Enum: "Objstate" "Objstate desc" "EcoNo" "EcoNo desc" "Description" "Description desc" "Cause" "Cause desc" "WorkDone" "WorkDone desc" "Information" "Information desc" "CoResponsible" "CoResponsible desc" "Priority" "Priority desc" "EcoAnalysed" "EcoAnalysed desc" "AnalysedDate" "AnalysedDate desc" "AnalysedSign" "AnalysedSign desc" "EcoApproved" "EcoApproved desc" "ApprovedDate" "ApprovedDate desc" "ApprovedSign" "ApprovedSign desc" "DtCre" "DtCre desc" "UserCreated" "UserCreated desc" "DtChg" "DtChg desc" "UserSign" "UserSign desc" "ProposedStartDate" "ProposedStartDate desc" "ProposedEndDate" "ProposedEndDate desc" "ProposedSerialBegin" "ProposedSerialBegin desc" "ProposedSerialEnd" "ProposedSerialEnd desc" "ChangeDates" "ChangeDates desc" "StructureEffectivity" "StructureEffectivity desc" "ActivitySeq" "ActivitySeq desc" "Period" "Period desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "EcoNo" "Description" "Cause" "WorkDone" "Information" "CoResponsible" "Priority" "EcoAnalysed" "AnalysedDate" "AnalysedSign" "EcoApproved" "ApprovedDate" "ApprovedSign" "DtCre" "UserCreated" "DtChg" "UserSign" "ProposedStartDate" "ProposedEndDate" "ProposedSerialBegin" "ProposedSerialEnd" "ChangeDates" "StructureEffectivity" "ActivitySeq" "Period"
Specify properties to return, see OData Select

Responses
200 response body for entity array EcoOrder
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_EcoOrder

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_EcoOrder by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
EcoNo
required
string <= 10 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "Objstate" "EcoNo" "Description" "Cause" "WorkDone" "Information" "CoResponsible" "Priority" "EcoAnalysed" "AnalysedDate" "AnalysedSign" "EcoApproved" "ApprovedDate" "ApprovedSign" "DtCre" "UserCreated" "DtChg" "UserSign" "ProposedStartDate" "ProposedEndDate" "ProposedSerialBegin" "ProposedSerialEnd" "ChangeDates" "StructureEffectivity" "ActivitySeq" "Period"
Specify properties to return, see OData Select

Responses
200 response body for entity type EcoOrder
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_EcoOrder(EcoNo='{EcoNo}')

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
"EcoNo": "It is a Text",
"Description": "It is a Text",
"Cause": "It is a Text",
"WorkDone": "It is a Text",
"Information": "It is a Text",
"CoResponsible": "It is a Text",
"Priority": "It is a Text",
"AnalysedDate": "2019-10-10",
"AnalysedSign": "It is a Text",
"ApprovedDate": "2019-10-10",
"ApprovedSign": "It is a Text",
"DtCre": "2019-10-01T01:01:01Z",
"UserCreated": "It is a Text",
"DtChg": "2019-10-01T01:01:01Z",
"UserSign": "It is a Text",
"ProposedStartDate": "2019-10-10",
"ProposedEndDate": "2019-10-10",
"ProposedSerialBegin": "It is a Text",
"ProposedSerialEnd": "It is a Text",
"ChangeDates": "It is a Text",
"ActivitySeq": 1,
"Period": "It is a Text",
"Objstate": "Preliminary",
"EcoAnalysed": "Yes",
"EcoApproved": "Yes",
"StructureEffectivity": "Date"
}
Reference_ApprovalProfile
Reference Entity Set Reference_ApprovalProfile

Get entities from Reference_ApprovalProfile
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
Items Enum: "ProfileId" "ProfileId desc" "Description" "Description desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "ProfileId" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity array ApprovalProfile
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ApprovalProfile

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_ApprovalProfile by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
ProfileId
required
string <= 10 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "ProfileId" "Description"
Specify properties to return, see OData Select

Responses
200 response body for entity type ApprovalProfile
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_ApprovalProfile(ProfileId='{ProfileId}')

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
"ProfileId": "It is a Text",
"Description": "It is a Text"
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
Reference_TechnicalDrawingRevision
Reference Entity Set Reference_TechnicalDrawingRevision

Get entities from Reference_TechnicalDrawingRevision
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
Items Enum: "DrawingNo" "DrawingNo desc" "DrawingRevisionNo" "DrawingRevisionNo desc" "RevisionText" "RevisionText desc"
Order items by property values, see OData Sorting

$select	
Array of strings unique
Items Enum: "luname" "keyref" "DrawingNo" "DrawingRevisionNo" "RevisionText"
Specify properties to return, see OData Select

Responses
200 response body for entity array TechnicalDrawingRevision
403 Forbidden
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_TechnicalDrawingRevision

Response samples
200403405500501503504
Content type
application/json

Copy
Expand allCollapse all
{
"value": [
{}
]
}
Get entity from Reference_TechnicalDrawingRevision by key
Authorizations:
(OpenIdbasicAuth)
path Parameters
DrawingNo
required
string <= 25 characters
Example: It is a Text
DrawingRevisionNo
required
string <= 10 characters
Example: It is a Text
query Parameters
$select	
Array of strings unique
Items Enum: "luname" "keyref" "DrawingNo" "DrawingRevisionNo" "RevisionText"
Specify properties to return, see OData Select

Responses
200 response body for entity type TechnicalDrawingRevision
400 Bad Request
403 Forbidden
404 Not found
405 Invalid input
500 Internal Server Error
501 Not Implemented
503 Service Unavailable
504 Gateway Timeout

get
/Reference_TechnicalDrawingRevision(DrawingNo='{DrawingNo}',DrawingRevisionNo='{DrawingRevisionNo}')

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
"DrawingRevisionNo": "It is a Text",
"RevisionText": "It is a Text"
}
