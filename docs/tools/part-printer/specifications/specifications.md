1. Objective of the Project 

Provide users with an application for several functionalities access from a main page like a portal. This page will contains the access for : 

 

PartPrinter > Application to print listing & labels for manufactured parts (semi-finished) 
 

This document is related to PartPrinter functionalities.  

For functional specifications of manufacturing Portal, see directly document associated to this project.  

 

2. Scope 

The application will be interfaced with the IFS ERP exclusively via API calls. All IFS API will be exposed by Azure API management (APIM) 
Use is strictly reserved for BENETAU users : GAP Leaders, Supervisors.  

Permissions set are managed from Manufacturing portal. 
 

3. Business Process with Interfaces 

 

Step 1 - Select the site (contract) from a LOV called from IFS (mandatory) 

Step 2 – Select the date related to the production day in a calendar (mandatory) 

Step 3 – Select a production line from a LOV called from IFS (not mandatory) 

Step 4 – Fill a block ID in a text box to print only list / labels related to this value (not mandatory) 

Step 5 – Enable or disable the "Block date" filter (disabled by default). If enabled, select TRUE or FALSE with a Boolean toggle button (FALSE by default)

**Block Date Filter Behavior:**
- **Disabled**: No filter applied on CBlockDates field (all shop orders regardless of block date status)
- **Enabled + FALSE**: Filter shop orders with CBlockDates = false (redébit / rework mode)
- **Enabled + TRUE**: Filter shop orders with CBlockDates = true (débit classique / standard production)

Step 6 – Enable or disable the "Sent to cutting system" filter (disabled by default). If enabled, select TRUE or FALSE with a Boolean toggle button (FALSE by default)

**Sent to Cutting System Filter Behavior:**
- **Disabled**: No filter applied on SentToCuttingSystem field (all shop orders)
- **Enabled + FALSE**: Filter shop orders NOT sent to cutting system
- **Enabled + TRUE**: Filter shop orders sent to cutting system

**UI Implementation:**
Both filters use a toggle switch (Enabled/Disabled) and when enabled, display two buttons (FALSE/TRUE) for value selection.

Step 7 – Select the both possibilities of printing (Listing only / Listing + labels)

If listing only è Generated the listing only ready to print from local devices 

If listing + labels è User must select a printer in a LOV called from IFS before. If OK, generated the listing + trigger the label printing  

Related CRIM :	Interface MA_IN_EN_1543 + MA_FO_CR_184 

 

End 

4. Business Rules 

 
- User interface will be in English. 
- Access limited to GAP Leaders, Supervisors (must be administrate from Manufacturing Portal permissions management) 

- User group administrated only by BENETEAU (IT project manager + Key user).   
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

 

+-------------------------------------------------------------+ 

|               Part Printer                                  | 

+-------------------------------------------------------------+ 

|                                                             | 

| 1. SÉLECTIONS OBLIGATOIRES                                  | 

| ----------------------------------                          | 

| Site (Contract) : [ LOV des Contrats...          ] * | 

| Date de Prod.   : [ Calendrier / YYYY-MM-DD...   ] * | 

|                                                             | 

| 2. FILTRES OPTIONNELS                                       | 

| ----------------------------------                          | 

| Ligne de Prod.  : [ LOV des Lignes...            ]          | 

| ID du Bloc      : [ Zone de Texte ]                         | 

|                                                             | 

| 3. OPTIONS AVANCÉES                                         | 

| ----------------------------------                          | 

| Bloquer la Date          [ Bascule (OFF/Grise) ]            |

|   Si activé: [ FALSE ] [ TRUE ]                             |

|                                                             | 

| Envoyé au Système Coupe  [ Bascule (OFF/Grise) ]            |

|   Si activé: [ FALSE ] [ TRUE ]                             |

|                                                             || 4. TYPE D'IMPRESSION                                        | 

| ----------------------------------                          | 

| (•) Liste seulement        ( ) Liste + Étiquettes           | 

|                                                             | 

| [Si 'Liste + Étiquettes' est coché]                         | 

| Sélection Imprimante : [ LOV Imprimantes IFS...  ] * | 

|                                                             | 

|                                                             | 

| [ ANNULER ]           [ GÉNÉRER / IMPRIMER ]                | 

+-------------------------------------------------------------+ 

 

Details : 

 

Site : list of value called from API exposed by Azure for “Contracts” in IFS 

Date : Date selection in a calendar to define the “Start date” of shop orders 

 

Production Line : list of value called from API exposed by Azure for "Production lines" filtered by "Site" (contract) selected. Available only if site is selected.  

Block ID : Text box to fill the block ID (alphanum) to apply a filter on shop orders with the Operation No = 10 linked to the block filled. If no value entered, disabled this filter.

Block date : Toggle switch (Enabled/Disabled, disabled by default). When enabled, displays two buttons (FALSE/TRUE) to filter shop orders by CBlockDates field. FALSE by default when enabled.

Sent to cutting system : Toggle switch (Enabled/Disabled, disabled by default). When enabled, displays two buttons (FALSE/TRUE) to filter shop orders by SentToCuttingSystem field. FALSE by default when enabled.

English interface for a report generation tool with title "Part Printer", replacing "Lock date" with "Block date", "Sent to cut system" with "Sent to cutting system", and using enabled/disabled buttons for those two fields