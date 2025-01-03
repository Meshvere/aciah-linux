// Author : https://github.com/Meshvere
// Licence : GNU GPL 3

// Liste des liens (récupérée dynamiquement)
var linkList = [];

// Touches du clavier qui peuvent réagir pour un lien
var letters = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];

// Lance la récupération de la liste des liens, affecte le CSS spécifique à la page puis affecte un caractère par lien
function getListLinks() {
    // Ajoute le CSS standard pour indiquer quel lien a quel lettre
    addCss();

    // Cherche l'ensemble des liens de la page
    linkList = document.querySelectorAll('a');

    // On retire tous les liens sans href
    linkList = [...linkList].filter(link => link.href != null && link.href != undefined && link.href != '');

    // Parcours chaque lien trouvé pour lui affecter sa lettre dans un atytribut personnalisé
    linkList.forEach((link, index) => {
        // Si le lien rentre dans la liste des caractères disponibles on ajoute l'attribut personnalisé
        if(index < letters.length) {
            link.setAttribute('keyboard-nav-letter', letters[index].toUpperCase());
            link.classList.add('keyboard-nav-letter');
        }
    });

    // Réagir à la pression d'une touche sur le clavier (n'importe laquelle)
    document.onkeydown = (event) => keyboardUp(event);
}

// Ajoute le CSS standard pour afficher la lettre à la suite du lien
function addCss(link) {
    // Création d'un noeud HTML <style>
    var styleTag = document.createElement('style');
    styleTag.type = 'text/css';

    // Styles à appliquer
    styleTag.innerHTML =
        'a.keyboard-nav-letter {' +
            'display: inline-block;' +
        '}' +
        'a.keyboard-nav-letter::after {' +
            'display: inline-block;' +
            'border-radius: 25%;' +
            'padding: 5px;' +
            'font-weight: bold;' +
            'margin-left: 0.3rem;' +
            'border: 1px solid #000;' +
            'background-color: #fff;' +
            'content: attr(keyboard-nav-letter);' +
        '}';

    // Ajout de notre CSS personnalisé au <body>
    document.head.appendChild(styleTag);
}

// Lance (ou pas) l'intéraction clavier => lien
function keyboardUp(event) {
    // Récupère le caractère tapé
    var letter = event.key.toLowerCase();

    // Cherche le caractère dans la liste des caractères disponibles
    var linkNumber = letters.indexOf(letter);

    // Si la touche n'est pas autorisé dans le tableau, on arrête tout
    if(linkNumber === -1) {
        return;
    }

    // On récupère le lien correspondant dans notre tableau des liens
    var theLink = linkList[linkNumber];
    // On stocke l'URL cible
    var targetUrl = theLink.href;

    // Si le lien est un lien interne, on y va directement et on arrête la fonction
    if(targetUrl.replace(window.location.href, "").match("^#.*$") !== null) {
        window.location.href = targetUrl;

        return;
    }

    // On va sur le lien en popup (peut être bloqué par un bloqueur de pop-up)
    var opened = window.open(targetUrl, '_blank');

    // Si le retrour de l'ouverture de popup est NULL, on navigue classiquement en solution de contournement
    if(opened === null) {
        window.location.href = targetUrl;
    }
}

// On lance, au chargement complet de la page, la gestion de correspondance lettre => lien
window.onload = (event) => getListLinks();

/**
 * HOW TO USE
 *
 * Ajouter la balise suivante à la fin du body de votre page
 * <script src="[chemin relatif vers le script]keyboard-links.js"></script>
 */
