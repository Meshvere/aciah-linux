import json
import sys

# Usage python3 script.py /home/aciah/.local/share/orca/user-settings.conf aciah.dic.json

def main():
    # Vérifier si un fichier a été passé en argument
    if len(sys.argv) < 3:
        print("Usage: python script.py <fichier de configuration.conf> <dictionnaire.dic.json>")
        sys.exit(1)

    # Récupérer le chemin du fichier JSON
    fichier_config = sys.argv[1]
    dictionnaire = sys.argv[2]

    try:
        # Lire les fichiers JSON
        with open(fichier_config, 'r', encoding='utf-8') as fichier_conf:
            data_config = json.load(fichier_conf)

        with open(dictionnaire, 'r', encoding='utf-8') as fichier_dico:
            data_dico = json.load(fichier_dico)

        # Modifier les données (ajouter/modifier les clé/valeur)
        for code, mot in data_dico.items():
            data_config["profiles"]["default"]["pronunciations"][code.lower()] = [code, mot]

        # Écrire les données modifiées dans le même fichier (ou un nouveau)
        with open(fichier_config, 'w', encoding='utf-8') as fichier:
            json.dump(data_config, fichier, indent=4, ensure_ascii=False)

        print("Données modifiées avec succès.")

    except FileNotFoundError:
        print(f"Erreur : Le fichier '{fichier_config}' ou '{dictionnaire}' est introuvable.")
    except json.JSONDecodeError:
        print(f"Erreur : Le fichier '{fichier_config}' ou '{dictionnaire}' n'est pas un JSON valide.")
    except Exception as e:
        print(f"Une erreur inattendue est survenue : {e}")

if __name__ == "__main__":
    main()
