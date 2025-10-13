📘 Specification – Part Printer
1. Interface Utilisateur
Écran principal : IFS Label Printer

Composants affichés :

PRTBX101

PRTBX109

PRTBX239

…

Filtres disponibles
Élément	Description	Source
Site Selection	Liste déroulante (LOV) des sites IFS	API : IFS Sites
Production Line Selection	Liste déroulante des lignes de production (BDR) filtrées selon le site sélectionné	API : IFS Production Lines
Printer Selection	Liste déroulante des imprimantes IFS	API : IFS Printers
Start Date Selection	Sélecteur de date (calendrier) pour appeler les Shop Orders via API	API : Shop Orders filtered by Start Date
2. Informations affichées / imprimées
Champ	Description / Source
Varnish Code	Valeur d’attribut de la part instanciée du Shop Order
Shop Order	Concaténation Order No + Release No + Sequence No
Raw Material	Matériau de la ligne liée à l’opération ayant le plus petit Operation No (ou Operation No = 10)
Index	Non précisé dans le PDF
Generic Part No + Revision	Valeur d’attribut de la part instanciée du Shop Order
Length	Valeur d’attribut "Length Setup"
Range	Exemple : 285 A
Barcode	Code-barres basé sur le champ “Generic Part No + Revision”
Trigger d’impression	Quantième + Range
Range	Défini selon Start Date + Range correspondant
OP10 Block ID	Valeur du champ Block ID pour Operation No = 10 (exemple : B25)
3. Règles de mise en page

Format : A4 paysage

Pagination : 1 page par couple (Raw Material / Varnish Code)

Tri : par ordre décroissant de Length

But : Affecter toutes les pièces en redébit à un range “R” pour un jour donné dans IFS

4. Mode de Sélection
Objectif

Pouvoir filtrer et sélectionner à l’extraction du QR code selon plusieurs critères :

Critère	Type	Description
Site	Obligatoire	LOV IFS “Contracts”
Production Line	Optionnel	LOV IFS “Production Lines” filtrée selon le site
Revised Start Date	Sélecteur de date	
Block Date	Booléen : True ou False (False = redébit)	
OP10 Block ID	Filtre possible sur “EMPTY” ou “No condition”	
Business Rules des Filtres
Condition	Débit classique (default)	Redébit
Block Date	YES	NO
OP10 Block ID	Strictement vide	No condition
5. Détails des Données en Sortie

Champs attendus lors de l’extraction :

Champ	Description
OrderNo	Numéro d’ordre
ReleaseNo	Numéro de release
SequenceNo	Numéro de séquence
PartNo	Code de la pièce
Start Date/Time	Date et heure de début du Shop Order
Raw Material	Matériau lié à l’opération n°10
Block ID	Valeur du champ Block ID pour OP 10
Generic Code	Valeur de l’attribut "GENERIC CODE" du Master Part
Length Setup	Valeur de l’attribut "LENGTH SETUP" du Master Part
Varnish Code	Valeur de l’attribut "VARNISH CODE" du Master Part
Engineering Part Rev	Dernière révision active de la pièce engineering
Range ID	Identifiant de la plage (Range) lié à la date de début et au site
6. Spécifications Techniques – WoodPartPrinter

Objet IFS interrogé : Shop Order

État requis : Released

Filtres disponibles : Site, Production Line, Start Date, Block Date, OP10 Block ID

Modes de sélection
Mode	Condition
Recutting	Start Date <= Today
Standard	Start Date = Date sélectionnée
7. Spécification – PartPrinter

Champs à extraire et logique associée :

a. Raw Material

Part code lié à la ligne de composant associée à l’opération n°10.

b. Block ID

Champ Block ID lié à l’opération n°10.

c. Generic Code

Attribut GENERIC CODE du Master Part lié au Shop Order Part Code.

d. Length Setup

Attribut LENGTH SETUP du Master Part lié au Shop Order Part Code.

e. Varnish Code

Attribut VARNISH CODE du Master Part lié au Shop Order Part Code.

f. Engineering Part Revision

Dernière révision active de l’Engineering Part du Shop Order Part Code.

g. Range ID

Valeur du Range ID liée à la date de démarrage (Start Date) et au site sélectionné (table Range).

8. Résumé des relations de données (texte du PDF)
OrderNo → ReleaseNo → SequenceNo → PartNo → StartDate
↓
Raw Material → Block ID
↓
Generic Code → Length Setup → Varnish Code → Eng. Part Rev → Range ID

9. Récapitulatif global
Élément	Source principale	Utilisation
Shop Orders (Released)	IFS	Base de données principale
Attributs de Part	Master Part (IFS)	Pour Varnish, Generic Code, Length Setup
Range Table	Table spécifique IFS par site	Détermination du Range ID
OP10 Block ID	Operation No = 10	Identification du bloc
Barre code	Generic Part No + Revision	Impression étiquette