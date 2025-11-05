​ 

​
​ 

Document Revision History 

Version 

Date 

Author 

Description of Changes 

0.1 

12/08/2025 

Marc TOQUARD 

 

0.2 

25/09/2025 

Marc TOQUARD 

CO link with type = “BAT” 

 

1. Objective of the Project 

Provide users with a simple application that allows, from a Shop Order number, to: 

 
1. Identify the corresponding Serial Number and Dop Header in IFS ERP. 
2. Verify and confirm that the serial number is correct. 
3. Choose an available printer and language. 
4. Launch the printing of the business document MA_FO_CR_1419 associated with the corresponding Customer Order related with serial number. 
 

Link to business requirements : https://beneteaugroup.sharepoint.com/:p:/s/STARBOARD/Ef1_1PTiQeNNmhGRhJAh728BhODF3KDuwOs2VTFs6TdV4g?e=ROu0kn 

 

Link to business specifications: 

https://beneteaugroup.sharepoint.com/:p:/s/STARBOARD/EYmWDRzERztBoM5q1QjH5RsBgL0rxH18rgZ3gGQqMo3aTA?e=QhXkBG 

 

2. Scope 

The application will be interfaced with the IFS ERP exclusively via API calls. All IFS API will be exposed by Azure API management (APIM) 
Use is strictly reserved for BENETAU users : GAP Leaders, Supervisors, and Quality Controllers. 
The user enters the three keys of a Shop Order : Order No, Release No, Sequence No. 

3. Business Process with Interfaces 

 

Step 1 – Enter the three keys of the Shop Order : 
Order No, Release No, Sequence No (mandatory). 

Step 2 – Retrieve the Serial Number and Dop Header ID from ERP via API and display it. 

Step 3 – Ask the user to confirm the displayed Serial Number. 

Step 4 – Retrieve the list of available printers and languages from ERP via API. 

Step 5 – User selects a printer and language and confirms to print document MA_FO_CR_1419. 

4. Business Rules 

- The three keys must identify a unique Shop Order. 
- Serial Number confirmation is mandatory. 
- Printer and language selection is mandatory. 
- The printed document is always MA_FO_CR_1419. 
- User interface will be in English. 
- Access limited to GAP Leaders, Supervisors, and Quality Controllers (must be administrate from https://dataprivilege.domain.group/DP) 

- User group administrated only by BENETEAU (IT project manager + Key user).   
- All interactions with ERP are done via API exposed in Azure APIM. 

- Developer must use existing Azure API exposition if possible.  

- This application must be deployed on 3 environments (DEV, PPD and PRD) 

 

5. Acceptance Criteria 

- Authorized users can search and retrieve a Serial Number and Dop Header via API. 
- The complete workflow (entry → confirmation → printer selection → print) works as intended. 
- Unauthorized profiles and users are blocked. 
- Clear error and confirmation messages are displayed. 

6. Interface components 

 

Screen 1 – Shop Order Entry 

 
+---------------------------------------------------+ 
| Enter Shop Order Details                          | 
|                                                   | 
| Order No:   [__________]                          | 
| Release No: [__________]                          | 
| Sequence No:[__________]                          | 
|                                                   | 
| [ Search ]                                        | 
+---------------------------------------------------+ 

 

Form with three mandatory fields: 

 

orderNo (string, max 20 caractères) 

releaseNo (string, max 10 caractères) 

sequenceNo (string, max 10 caractères) 

 

Bouton Search → Call API 

Une image contenant texte, capture d’écran, Police, nombre

Le contenu généré par l’IA peut être incorrect. 
      

Screen 2 – Serial Number Confirmation 

 
+---------------------------------------------------+ 
| Serial Number found: LG5XA0003                    | 

| Dop Header ID found: 37                           | 
|                                                   | 
| Is this correct?                                  | 
| [ Yes ]   [ No ]                                  | 
+---------------------------------------------------+ 

Display API call back data : 

serialNumber 

dopHeaderId 

 

Message : "Is this correct?" 

 

Boutons : 

Yes → Switch to Screen 3. 

No → Return to previous screen (Screen 1). 

Une image contenant texte, capture d’écran, Police, nombre

Le contenu généré par l’IA peut être incorrect. 
      

Screen 3 – Printer Selection 

 
+---------------------------------------------------+ 
| Select Printer                                    | 
|                                                   | 
| [▼] Office Printer :                              | 
|     Printer PRTBX 060                             | 
| [▼] Office language :                             | 
|     French                                        |                                                   | 
| [ Print Document MA_FO_CR_1419 ]                  | 
+---------------------------------------------------+ 

 

Call API to : 

GET /printers → List of printers availables. 

GET /languages → List of languages. 

 

Dropdown to select (LOV) : 

Printer (mandatory & searchable) 

Language (mandatory) 

 

Button Print Document MA_FO_CR_1419 : 

Call API : POST /print 

 

Une image contenant texte, capture d’écran, Police, nombre

Le contenu généré par l’IA peut être incorrect. 
      

Screen 4 – Print Confirmation 

 
+---------------------------------------------------+ 
| Print job started successfully                    | 
|                                                   | 
| [ New Print ]                                     | 
+---------------------------------------------------+ 

Display : "Print job started successfully" 

Button New Print → Return to Screen 1. 

 

Une image contenant texte, capture d’écran, Police, logo

Le contenu généré par l’IA peut être incorrect. 

7. Functional architecture : BoatConfigEditor - Architecture.drawio 

Une image contenant texte, diagramme, capture d’écran, conception

Le contenu généré par l’IA peut être incorrect. 

DEV : IFS AST (https://beneteau-group-ast.ifs.cloud/landing-page/) 

PPD : IFS ACC (https://beneteau-group-acc.ifs.cloud/landing-page/) 

PRD environment : https://beneteau-group.ifs.cloud/landing-page/ 

8. Functional components in IFS 

 

Une image contenant texte, capture d’écran, Police, ligne

Le contenu généré par l’IA peut être incorrect. 

 

 

 

 

Shop order and link with DOP Header 

Une image contenant texte, logiciel, Icône d’ordinateur, Page web

Le contenu généré par l’IA peut être incorrect. 

 

 

Dop Header and link with Serial number 

Une image contenant texte, capture d’écran, logiciel, Icône d’ordinateur

Le contenu généré par l’IA peut être incorrect. 

 

 

 

Get Customer Order line with Hull Number = Serial No Reservation / Site = FR05A / Order Type = BAT  

Une image contenant texte, capture d’écran, Police, ligne

Le contenu généré par l’IA peut être incorrect. 

 

Get Customer order linked to customer order Line 

 

 

 

Print MA_FO_CR_1419 : BEN_Boat_configuration_for_production.rdl 

 

Une image contenant texte, capture d’écran, logiciel, Police

Le contenu généré par l’IA peut être incorrect. 

 

Details of reports settings : 

 

Une image contenant texte, Police, logiciel, nombre

Le contenu généré par l’IA peut être incorrect. 

 

 

Basic Data reference in IFS 

Une image contenant texte, capture d’écran, logiciel, nombre

Le contenu généré par l’IA peut être incorrect. 

 

Une image contenant texte, capture d’écran, nombre, logiciel

Le contenu généré par l’IA peut être incorrect. 

 

 

9. Technical specifications 

 

 
{ResultKey: "322132", LayoutName: " MA_FO_CR_1419.rdl", LanguageCode: "en",…} 

Copies: "1" 

Email: "" 

LanguageCode: "en" 

LayoutName: " MA_FO_CR_1419.rdl" 

LogicalPrinter: "PRTBX040C" 

NumberFormatting: "en-US" 

Pages: null 

ResultKey: "322132" 

 