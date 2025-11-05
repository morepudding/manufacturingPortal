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

 

 

 

 

 

 

1. Objective of the Project 

Provide users with an application for several functionalities access from a main page like a portal. This page will contains the access for : 

 

PartPrinter > Application to print listing & labels for manufacturings parts (semi-finished) 

BoatConfigurationEditor > Application to print customer order configuration from a Shop Order 

… 

 
 

For functional specification, see directly document associated to each sub-project.  

 

2. Scope 

The application will be interfaced with the IFS ERP exclusively via API calls. All IFS API will be exposed by Azure API management (APIM) 
Use is strictly reserved for BENETAU users : GAP Leaders, Supervisors, and Quality Controllers. 
 

3. Business Process with Interfaces 

 

Step 1 – Enter  

4. Business Rules 

 
- User interface will be in English. 
- Access limited to GAP Leaders, Supervisors, and Quality Controllers (must be administrate from https://dataprivilege.domain.group/DP) 

- User group administrated only by BENETEAU (IT project manager + Key user).   
- All interactions with ERP are done via API exposed in Azure APIM. 

- Developer must use existing Azure API exposition if possible.  

- This application must be deployed on 3 environments (DEV, PPD and PRD) 

 

5. Acceptance Criteria 

- Authorized users can… 
- The complete workflow… 
- Unauthorized profiles and users are blocked. 
- Clear error and confirmation messages are displayed. 

6. Interface components 

 

Screen 1 – Manufacturing Portal 

 
 

7. Functional architecture :  

 

DEV : IFS AST (https://beneteau-group-ast.ifs.cloud/landing-page/) 

PPD : IFS ACC (https://beneteau-group-acc.ifs.cloud/landing-page/) 

PRD environment : https://beneteau-group.ifs.cloud/landing-page/ 

8. Functional components in IFS 

9. Technical specifications 

 

 
{Re 

 