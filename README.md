
# 🔍 TruthScope

**TruthScope** est une solution intelligente de **détection automatique des fake news**, développée dans le cadre d’un projet de fin d’études. Elle repose sur des techniques avancées de **traitement du langage naturel (NLP)** et de **Deep Learning**, en s'appuyant sur un modèle **BERT** affiné à l’aide de **LoRA / QLoRA** et optimisé par **quantization** pour des performances accrues.

---

## 🧠 Dataset et prétraitement

Le modèle a été entraîné sur un **ensemble de données composite**, fusionnant trois sources fiables et complémentaires :

1. ✅ **TruthSeeker 2023** — un dataset récent orienté réseaux sociaux.  
2. ✅ **FakeNewsNet** — regroupant des articles de PolitiFact et GossipCop.  
3. ✅ **Fake News Dataset GitHub** — [disponible ici](https://github.com/HNDeshanSamarathunga/FakeNewsDetection).

Les données ont été rigoureusement **nettoyées, filtrées et harmonisées** afin d’obtenir un corpus pertinent pour la détection de fausses informations.

📁 Le dataset final ainsi que les scripts de traitement sont disponibles ici :  
👉 [Accès Google Drive](https://drive.google.com/...) *(a remplace une fois les dossiers son uploadé sur drive)*

---

## ⚙️ Installation des dépendances

Avant de lancer le projet, installez les bibliothèques nécessaires :

```bash
pip install -r model/requirements.txt
```

> 💡 **Astuce** : il est fortement recommandé d’utiliser un environnement virtuel (`venv` ou `conda`) pour isoler vos dépendances.

---

## 🛠️ Modifications nécessaires

Avant l’exécution, adaptez les **chemins locaux** dans les fichiers suivants :

- `model/backend/app.py`  
- `model/main.ipynb` "si vous voulez refaire l'entrainement" 

👉 Exemple : dans `app.py`, modifiez la ligne suivante avec votre chemin vers le modèle :

```python
model_path = r"model/results-qlora/checkpoint-37164"
```

---

## 🚀 Lancement rapide

1. **Lancer le backend avec Uvicorn** :
```bash
cd model/backend
uvicorn app:app --reload
```

2. **Ouvrir l’interface utilisateur** :
- Aller dans le dossier `UI/`
- Clic droit sur le fichier HTML principal (ex. : `index.html`)
- Cliquer sur **"Open with Live Server"**

---

## 🧱 Structure du projet

```
TruthScope/
├── UI/                        # Interface HTML/CSS/JS
├── model/
│   ├── backend/               # Scripts Python (API backend)
│   ├── my_model/             
│   ├── results-qlora/         # Résultat d'entraînement (Checkpoint LoRA/QLoRA)
│   ├── main.ipynb             # Notebook d'entraînement principal
│   ├── last_result_test.ipynb # Dernier test de performance (visualisation des resultats)
│   ├── metrics_log.json       # Logs de performance du modèle
│   └── requirements.txt       # Dépendances Python
└── README.md
```

---

## 💡 Perspectives d’amélioration

- 🌍 Détection multilingue (français / anglais / arabe)
- 📱 Application mobile ou extension navigateur
- 🌐 Mise en ligne d’une API publique RESTful

---

## 👨‍💻 Auteur

Projet réalisé par **Anis Benini**  
🎓 Étudiant en Intelligence Artificielle & Data Science  
📅 Mémoire de fin d’études 2024–2025  

---
