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
    var queryString = window.location.search;

    // Ajoute le CSS standard pour indiquer quel lien a quel lettre + style de la bulle indiquant si la navigation clavier Aciah est active ou non
    addCss();

    var hasScreenReader = false;

    if(queryString !== '') {
        var urlParams = new URLSearchParams(queryString);

        hasScreenReader = urlParams.get('screenReader') === 'true';
    }

    addToast(hasScreenReader);

    // On rend les liens réactifs au clavier uniquement s'il n'y pas de lecteur d'écran
    if(hasScreenReader === false) {
        // Cherche l'ensemble des liens de la page
        linkList = document.querySelectorAll('a');

        // On retire tous les liens sans href
        linkList = [...linkList].filter(link => link.href !== null && link.href !== undefined && link.href !== '');

        // Parcours chaque lien trouvé pour lui affecter sa lettre dans un atytribut personnalisé
        linkList.forEach((link, index) => {
            // Si le lien rentre dans la liste des caractères disponibles on ajoute l'attribut personnalisé
            if (index < letters.length) {
                link.role = 'link';
                link.ariaLabel = link.textContent;
                link.ariaDescription = 'Appuyer sur la touche ' + letters[index].toUpperCase() + ' de votre clavier pour accéder au lien ' + link.textContent;
                link.setAttribute('aria-braillelabel', link.textContent + ' (version braille)');

                link.setAttribute('keyboard-nav-letter', letters[index].toUpperCase());
                link.innerHTML += '<span class="keyboard-nav-letter-indicator">' + letters[index].toUpperCase() + '</span>';
                link.classList.add('keyboard-nav-letter');
            }

            // Ajout d'un ordre de parcours pour les liens (on le fait même pour les liens sans raccourcis)
            link.tabIndex = index + 1;
        });

        // Réagir à la pression d'une touche sur le clavier (n'importe laquelle)
        document.onkeydown = (event) => keyboardUp(event);
    }
}

// Ajoute le CSS standard pour afficher la lettre à la suite du lien
function addCss() {
    // Création d'un noeud HTML <style>
    var styleTag = document.createElement('style');
    styleTag.type = 'text/css';

    // Styles à appliquer
    styleTag.innerHTML =
        '.keyboard-nav-letter-indicator {' +
        'display: inline-block;' +
        'border-radius: 25%;' +
        'padding: 5px;' +
        'font-weight: bold;' +
        'margin-left: 0.3rem;' +
        'border: 1px solid #000;' +
        'background-color: #fff;' +
        'content: attr(keyboard-nav-letter);' +
        '}' +
        'div.acia-keyboard-nav-how-to {' +
            'display: block;' +
            'position: fixed;' +
            'top: 5px;' +
            'right: 10px;' +
            'padding: 7px 10px;' +
            'border: 1px solid red;' +
            'background-color: #fff;' +
            'z-index: 500;' +
        'border-radius: 5px;' +
        '}' +
        'div.acia-keyboard-nav-how-to.active {' +
            'border: 1px solid #75cb72;' +
            'background-color: #dcf2dc;' +
        '}' +
        'div.acia-keyboard-nav-how-to.inactive {' +
            'border: 1px solid #5b6bc4;' +
            'background-color: #d6daf0;' +
        '}';

    // Ajout de notre CSS personnalisé au <body>
    document.head.appendChild(styleTag);
}

// Ajoute un "toast" indiquant en haut à droite de la fenêtre si la navigation au clavier "Aciah" est activée ou non
function addToast(hasScreenReader) {
    // Création d'un noeud <div>
    var aciaKeyboardHowTo = document.createElement('div');
    // Ajout class acia-keyboard-nav-how-to pour l'habiller et le positionner
    aciaKeyboardHowTo.classList.add('acia-keyboard-nav-how-to');
    // Indication d'une zone de contenu à lire mais pas assez importante pour interrompre le flux de lecture d'un lecteur d'écran en cas de changement
    aciaKeyboardHowTo.role = 'note';
    // Indique qu'en cas de changement de contenu et de lecteur d'écran, le lecteur d'écran peut finir sa lecture avant de lire le changement de contenu (es not indicate that changes should not be announced. When an element has aria-live="off" (or has a role w)
    aciaKeyboardHowTo.ariaLive = 'polite';

    // Si dans l'URL on a screenReader=true, on indique que la navigation clavier Aciah n'est pas activée
    if(hasScreenReader) {
        aciaKeyboardHowTo.classList.add('inactive');
        aciaKeyboardHowTo.innerHTML = "Présence du lecteur d'écran.<br /> Navigation au clavier Aciah désactivée.";
    } else {
        // Si dans l'URL on n'a pas screenReader=true, on indique que la navigation clavier Aciah est activée
        aciaKeyboardHowTo.classList.add('active');
        aciaKeyboardHowTo.innerHTML = "Absence du lecteur d'écran.<br /> Navigation au clavier Aciah activée.";
    }

    // On ajoute la <div> à la page HTML
    document.body.insertBefore(aciaKeyboardHowTo, document.body.firstChild);
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
    var newWindow = window.open(targetUrl, 'aciah');

    // Si le retour de l'ouverture de popup est NULL, on navigue classiquement en solution de contournement
    if(newWindow === null) {
        window.location.href = targetUrl;

        return;
    }

    // Si le retour est bien une Window, on force le focus dessus /!\ En fonction du paramétrage de l'utilisateur, cela peut ne pas fonctionner
    if(newWindow.constructor.name === 'Window') {
        newWindow.focus();
    }
}

// On lance, au chargement complet de la page, la gestion de correspondance lettre => lien
window.onload = (event) => getListLinks();

/**
 * HOW TO USE
 *
 * Ajouter la balise suivante à la fin du body de votre page
 * <script src="[chemin relatif vers le script]keyboard-links.js"></script>
 *
 * Au chargement de la page il faut passer le paramètre GET screenReader=true/false
 * Si l'on passe true : un lecteur d'écran a été détecté en amont de l'ouverture de la page et ce script entrera en conflit avec les fonctionnalités de celui-ci, donc on n'active pas la fonctionnalité
 * Si l'on passe false : aucun lecteur d'écran n'a été détecté en amont de l'ouverture de la page, aucun conflit fonctionnel, on active la fonctionnalité
 * Si l'on ne passe rien OU si l'on passe une valeur incorrecte, on considére que l'on est dans le cas sans lecteur d'écran
 */
