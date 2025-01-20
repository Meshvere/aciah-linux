# Aciah-linux
Contributions à Aciah Linux

## Personnalisation du lecteur d'écran Orca
Répertoire *orca*

### Utilité
Permettre d'ajouter des prononciations personnalisées au lecteur d'écran Orca pour corriger des erreurs de prononciations ou pour indiquer des usages très particuliers.

### Usages
#### A la volée
Le dictionnaire Aciah est parsé à chaque lancement d'orca et stocké en mémoire pour être utilisé à chaque synthèse vocale.

Le fichier `orca-customizations.py` doit être déposé dans le répertoire `~/.local/share/orca/` de l'utilisateur.

> [!IMPORTANT]
> Il faut remplacer le `<chemin vers le dictionnaire>` par le vrai chemin de stockage du dictionnaire Aciah 

#### Au déploiement
Lors de l'installation ou la mise à jour des scripts globaux, on exécute le script `orca-add-custom-pronounciation.py` afin d'ajouter ou mettre à jour les prononciations personnalisées inscrites directement dans le profil de l'utilisateur.

La commande est
```
python3 script.py /home/aciah/.local/share/orca/user-settings.conf <chemin vers le dictionnaire>/aciah.dic.json
```
Le chemin vers le fichier de paramétrage utilisateur peut être à modifier au cas par cas.
