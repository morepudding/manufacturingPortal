## Getting Started


### Installation de la BDD

Prérequis
🐋 Docker Desktop -> Téléchargez
🪟 WSL Fonctionnel -> Voir autre tuto quand créé

Installer la BDD
Dans ce guide, nous allons utiliser l’interface GUI de docker appelée Docker Desktop. Tout est faisable sur un terminal si vous préférez. Ouvrez maintenant Docker Desktop.

Cette étape ne concerne que les développeurs sur Windows :

Allez dans les Paramètres de Docker Desktop.
Dans Général, sélectionnez Use WSL 2 based engine si ce n’est pas déjà le cas.
Cliquez sur Appliquer
Vous devriez maintenant avoir accès à Docker sur votre environnement WSL !

Ouvrez un terminal depuis VS Code sur l’env WSL
Installez l’image suivante :
docker pull mcr.microsoft.com/azure-sql-edge:latest
Créez le container :
docker run --cap-add SYS_PTRACE -e 'ACCEPT_EULA=1' \
  -e 'MSSQL_SA_PASSWORD=yourStrong(!)Password' \ 
  -p 1433:1433 --name azuresqledge \
  -d mcr.microsoft.com/azure-sql-edge
Dans Docker Desktop, ouvrez vos container, vous devez voir votre container en cours d’exécution. Cliquez ici :
Image trois petit point et sur open in terminal

Ouvrez mssql
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa \
  -P <your_password>
Créez la DB de votre choix

Installez l’extension de votre choix sur VSCode pour visualiser votre DB

### Prettier

Sur VSCode, installez l'extension Prettier :

1. Ouvrez le menu des Extensions avec `Ctrl + Shift + X`
2. Recherchez `Prettier` dans la barre de recherche

    ![Prettier plugin example](/docs/prettierpluging.PNG)

3. Installez l'extension
4. Ouvrez les paramètres de l'extension :

    ![Where are prettier settings](/docs/prettiersettings.PNG)

5. Vérifiez les settings suivants :

    ![prettier config path](/docs/prettiersettings1.PNG)

### Commandes

-   `pnpm run dev` : Démarrer le serveur de développement
-   `pnpm run test` : Lancer les tests
-   `pnpm run coverage` : Lance un test coverage avec un rapport html.
-   `pnpm run storybook` : Démarrer le serveur storybook
