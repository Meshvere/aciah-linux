# Aciah-linux
Contributions à Aciah Linux

## Navigation au clavier
Répertoire *keyboard-navigation*

### Utilité
Ajouter une navigation clavier simplifiée : chaque lien se voit affecter une touche du clavier (issue d'une liste prédéfinie de A à Z et de 0 à 9)

### Usage
Ajouter la balise suivante à la fin du body de votre page HTML

```<script src="[chemin relatif vers le script]keyboard-links.js"></script>```

Le script se charge de modifier les liens pour qu'ils indiquent quel lettre leur est affecté, modifier les attributs aria afin que les outils d'accessibilité puissent indiquer ce qui est à effectuer et ajoute un encart en haut à droite de la page indiquant si la navigation au clavier Aciah est activée ou non.

La navigation au clavier pouvant entrer en conflit avec les fonctionnalités du lecteur d'écran, un script a été créé afin de déterminer si l'on doit activer ou non le script de navigation au clavier.

```
bash detect_screen_reader.sh
```

Le paramètre d'URL screenReader est alors ajouté.
Il peut prendre deux valeurs :
- true : indique qu'un lecteur d'écran est actif et qu'il ne faut pas utiliser le script Aciah,
- false : aucun lecteur d'écran connu detecté, le script Aciah est exécuté.

En l'absence de ce paramètre ou pour toute valeur inadéquate, le cas sans lecteur d'écran est appliqué.
