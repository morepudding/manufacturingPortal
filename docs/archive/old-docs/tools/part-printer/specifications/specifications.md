​ 

Zone de texte 2, Zone de texte​
​ 

Document Revision History 

Version 

Date 

Author 

Description of Changes 

1 

 

Marc TOQUARD 

 

2 

 

Marc TOQUARD 

 

3 

14/10/2025 

Marc TOQUARD 

V2 Next JS 

4 

IN PROGRESS 

Marc TOQUARD 

CR 26037 P1 

5 

TO BE STARTED 

Marc TOQUARD 

CR 26037 P2/3 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

1. Objective of the Project 

Provide users with an application for several functionalities access from a main page like a portal. This page will contains the access for : 

 

PartPrinter > Application to print listing & labels for manufactured parts (semi-finished) 
 

This document is related to PartPrinter functionalities.  

For functional specifications of manufacturing Portal, see directly document associated to this project.  

 

2. Scope 

The application will be interfaced with the IFS ERP exclusively via API calls. All IFS API will be exposed by Azure API management (APIM) 
Use is strictly reserved for BENETAU users : GAP Leaders, Supervisors.  

Permissions set are managed from Dataprivilège on Manufacturing portal.  
 

3. Business Process with Interfaces 

 

Step 1 - Select the site (contract) from a LOV called from IFS (mandatory) 

Step 2 – Select the start date related to the production day in a calendar (mandatory if no Block ID filled) 

Step 3 – Select a production line from a LOV called from IFS (mandatory if no Block ID filled) 

Step 4 – Fill a block ID in a text box to print only list / labels related to this value (not mandatory). If a value is filled, the field start date and production line switch to not  mandatory. 

Step 5 – Enabled or disabled (by default) the “Block date” filter. If enabled select the value TRUE or FALSE with a Boolean button (FALSE by default) 

Step 6 – Enabled or disabled (by default) the “Sent to cutting system” filter. If enabled select the value TRUE or FALSE with a Boolean button (FALSE by default) 

Step 7 – Select the mode of printing (Listing only / Labels only / Listing + labels) 

If listing only è Generated the listing only ready to print from local devices 

If labels only è User must select a printer in a LOV called from IFS before. If OK, trigger the label printing. 

Related CRIM :	Interface MA_IN_EN_1543 + MA_FO_CR_184 

 

If listing + labels è User must select a printer in a LOV called from IFS before. If OK, generated the listing + trigger the label printing  

Related CRIM :	 

Interface MA_IN_EN_1543 è Logic App Azure 

FORMS MA_FO_CR_184 

 

Step 8 – Launch API calls to get all data required based on filters selected 

Step 9 – Display total shop orders counted and generate document listing only or labels only  or  labels + listing).  

4. Business Rules 

 
- User interface will be in English. 
- Access limited to GAP Leaders, Supervisors (must be administrate from Manufacturing Portal permissions management) 

- User group administrated only by BENETEAU owners (IT project manager / Key user…).   
- All interactions with ERP are done via API exposed in Azure APIM. 

- Developer must use existing Azure API exposition if possible.  

- This application must be deployed on 3 environments (DEV, PPD and PRD) 

 

5. Acceptance Criteria 

- Authorized users can launch listing and / or labels printing  
- The complete workflow… 
- Unauthorized profiles and users are blocked. 
- Clear error and confirmation messages are displayed. 

 

6. Interface components 

 

Screen 1 – New function “Part Printer” insert in Manufacturing Portal 

 

Une image contenant texte, capture d’écran, logiciel, Logiciel multimédia

Le contenu généré par l’IA peut être incorrect. 

 

Screen 2 – New function “Part Printer” insert in Manufacturing Portal 

 

Une image contenant texte, capture d’écran, Police, nombre

Le contenu généré par l’IA peut être incorrect. 

Details : 

 

Site : list of value called from API exposed by Azure for “Contracts” in IFS.  

Error handling for no sites (contract) retrieved è Stop processing 

pop-up alert for a report generation application indicating that no 'Site' data could be retrieved 

Range ID : List of range ID in Range table on site selected (not displayed) 

Error handling for no Range retrieved è Continue processing 

Une image contenant texte, capture d’écran, Police, logo

Le contenu généré par l’IA peut être incorrect. 

Start Date : Date selection in a calendar to define the “Start date” of shop orders 

Production Line : list of value called from API exposed by Azure for “Production lines” filtered by “Site” (contract) selected. Available only if site is selected.  

Error handling for no production lines retrieved è Continue processing 

pop-up alert for a report generation application indicating that no 'Production Line' data could be retrieved 

Block ID : Text box to fill the block ID (alphanum) to apply a filter on shop orders with the Operation No = 10 linked to the block filled. If no value entered, disabled this filter.  

If a value is filled, “start date” AND “production line” switch to not mandatory.  

 

Block date : Filter wich can be enabled (disabled by default). If enabled, activate a Boolean field related to shop order header to filter on value (TRUE / FALSE) 

Sent to cutting system : Filter wich can be enabled (disabled by default). If enabled, activate a Boolean field related to shop order header to filter on value (TRUE / FALSE) 

List only OR labels only OR  list + label : 3 different options of printing 

Printer selection : Available and mandatory only if option “Labels only” or “List + labels” selected.  

 

Error handling for no logical printers retrieved è Continue processing 

Une image contenant texte, capture d’écran, Police, logo

Le contenu généré par l’IA peut être incorrect. 

 

 

 

Generate / Print button :  

 

This button trigger the API call to get the Shop orders list and data related.  

IFS Object requested : Shop order with State = Released 

Filters : Site / Production line / Start Date / Block date / Sent to cutting system  

Filter on shop order operation : Block ID value (only if value filled) 

 

Error handling for no Shop orders retrieved è Stop processingUne image contenant texte, capture d’écran, Police, logo

Le contenu généré par l’IA peut être incorrect. 

Error handling if no Raw Material retrieved related to Shop order è Stop processing 

Une image contenant texte, capture d’écran, Police, conception

Le contenu généré par l’IA peut être incorrect. 

Error handling if no Generic code value retrieved for part related to Shop order è Stop processing 

Une image contenant texte, capture d’écran, Police, conception

Le contenu généré par l’IA peut être incorrect. 

Error handling if no Length setup value retrieved for part related to Shop order è Stop processing 

Une image contenant texte, capture d’écran, Police, conception

Le contenu généré par l’IA peut être incorrect. 

 

 

 

 

 

 

 

 

 

Screen 3 – Printing confirmation 

 

pop-up alert triggered by clicking the 'Generate / Print' button, displaying the number of retrieved 'Shop Orders' to be printed 

 

Screen 4 –Generate PDF (for listing only) 

 

Screen 5 – Listing document 

 

Zone de texte 8, Zone de texteZone de texte 8, Zone de texteUne image contenant texte, capture d’écran, affichage, Rectangle

Le contenu généré par l’IA peut être incorrect. 

 

Range: day number of the year based on shop order Start date + range ID related to shop order Start time 

Range barcode : Code39 of Range value 

Varnish Code: attribute value of the part instantiated from the Shop Order (SO)  

Raw Material: shop order material line linked to Operation with operation No = 10)  

Shop Order: Order No + Release No + Sequence No separated by “_” 

Generic Part No: attribute value of the part instantiated from the Shop Order Revision: latest active revision of the engineering part  

Length: attribute value of the part instantiated from the Shop Order (Length Setup)  

Bar Code: barcode (code39) of the column “Generic Part No + Revision”  

OP 10 Block ID: value of the Block ID field from Operation No = 10 of the Shop Order 

 

Layout: A4 landscape format 

Group by Raw Material/Varnish Code/Range pair 

Insert a page break if the maximum number of lines is reached without repeating the header 

Sort the lines in descending order of length 

 

7. Functional sequence & architecture :  

 

DEV : IFS AST (https://beneteau-group-ast.ifs.cloud/landing-page/) 

PPD : IFS ACC (https://beneteau-group-acc.ifs.cloud/landing-page/) 

PRD environment : https://beneteau-group.ifs.cloud/landing-page/ 

 

Une image contenant texte, diagramme, capture d’écran, conception

Le contenu généré par l’IA peut être incorrect. 

 

 

 

 

 

8. Functional components in IFS 

 

Functionnal components : 

IFS Component 

Description 

 

 

Sites 

List of sites in IFS (contracts) 

BDR 

Data retrieve at application starting 

Production line 

List of production lines for site selected 

BDR 

Data retrieve after site selection 

Logical printers 

List of all logical printers in IFS 

BDR 

Data retrieve after site selection 

Range ID 

List of range ID for site selected 

BDR 

Data retrieve after site selection 

 

 

 

 

OrderNo 

Shop order OrderNo value 

 

Dynamic data 

 

ReleaseNo 

Shop order ReleaseNo value 

 

Dynamic data 

 

SequenceNo 

Shop order SequenceNo value 

 

Dynamic data 

 

PartNo 

Shop Order part No Value 

 

Dynamic data 

 

Start Date/Time 

Shop Order Start Date 

 

Dynamic data 

 

Raw Material 

Component part code related to shop order operation No = 10 

 

Dynamic data 

 

Block ID 

Block ID  linked to operation No = 10 

 

Dynamic data 

 

Generic Code 

Attribute "GENERIC CODE" value related to Master part for Shop order part code 

 

Referential data 

 

Lenght setup 

Attribute "LENGTH SETUP" value related to Master part for Shop order part code 

 

Referential data 

 

Varnish Code 

Attribute "VARNISH CODE" value related to Master part for Shop order part code 

 

Referential data 

 

Engeneering part rev 

Last active Engeneering part revision for Shop order part code 

 

Referential data 

 

Range ID Value 

Rande ID value related to Shop order start date linked to Range table store on Site selected on filter 

 

Calculated 

 

Sent to cutting system 

Boolean field on Shop order header 

Dynamic data 

 

Bloc date 

Boolean field on Shop order header 

Dynamic data 

 

 

 

Une image contenant texte, capture d’écran, nombre, Police

Le contenu généré par l’IA peut être incorrect. 

 

 

Une image contenant texte, capture d’écran, ligne, diagramme

Le contenu généré par l’IA peut être incorrect. 

 

Une image contenant texte, capture d’écran, nombre, diagramme

Le contenu généré par l’IA peut être incorrect. 

 

 

Une image contenant texte, capture d’écran, diagramme, ligne

Le contenu généré par l’IA peut être incorrect. 

 

Une image contenant texte, capture d’écran, Police, diagramme

Le contenu généré par l’IA peut être incorrect. 

 

Une image contenant texte, capture d’écran, nombre, diagramme

Le contenu généré par l’IA peut être incorrect.
 

9. Technical specifications 

 

 
{Re 

 