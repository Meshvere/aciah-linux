import json
import orca.speech

# Déclaration variable de dictionnaire des prononciations personnalisées
custom_pronunciations = {}

# Chargement du dictionnaire personnalisé Aciah
with open("<chemin vers le dictionnaire>/aciah.dic.json", 'r', encoding='utf-8') as fichier_conf:
    custom_pronunciations = json.load(fichier_conf)

# Fonction pour appliquer les remplacements de prononciation (remplacement de texte)
def replace_pronunciations(text):
    print(text)
    if(type(text) is str):
        text = text.lower()
        for word, pronunciation in custom_pronunciations.items():
            text = text.replace(word.lower(), pronunciation)
    else:
        text[0] = text[0].lower()
        for word, pronunciation in custom_pronunciations.items():
            text[0] = text[0].replace(word.lower(), pronunciation)

    return text

# Surcharger la fonction speak d'Orca pour inclure les prononciations personnalisées
original_speak = orca.speech.speak

def custom_speak(text, *args, **kwargs):
    text = replace_pronunciations(text)
    original_speak(text, *args, **kwargs)

orca.speech.speak = custom_speak
