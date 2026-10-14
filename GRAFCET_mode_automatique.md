# GRAFCET – Mode automatique (plateau tournant)

GRAFCET au **point de vue partie commande** (niveau automatisme), structuré en plusieurs grafcets :

| Grafcet | Rôle |
|---|---|
| **GC** – Grafcet de conduite | Mise en service (variateur + voyant "sous tension") |
| **GPN** – Grafcet de production normale | Cycle automatique, prise d'origine, séquence "Fin" |
| **GS** – Grafcet de surveillance | Prise en compte du BP "Fin" S2 à tout moment (forçage du GPN) |
| **GH1** – Grafcets de signalisation | Clignotements du voyant "Signal" H1 |

---

## 1. Variables

### Entrées

| Repère | Désignation |
|---|---|
| `Ses` | BP "Mise en service" |
| `Auto` | Commutateur Auto/Manu en position **Auto** |
| `S1` | BP "Cycle" |
| `S2` | BP "Fin" |
| `Pc` | Capteur plateau au **poste de chargement** (position initiale) |
| `Pd` | Capteur plateau au **poste de dépôt** |
| `Pdc` | Capteur plateau au **poste de déchargement** (dernier poste) |

### Sorties

| Repère | Désignation |
|---|---|
| `KM` | Mise sous tension du variateur |
| `H0` | Voyant "Sous tension" |
| `H1` | Voyant "Signal" |
| `AH` | Rotation sens **antihoraire** (variateur) |
| `HOR` | Rotation sens **horaire** (variateur) |
| `PV` | Petite vitesse (variateur) |
| `GV` | Grande vitesse (variateur) |

### Temporisations

Notation normalisée `t/Xi/d` : vraie quand l'étape `i` est active depuis la durée `d`.

---

## 2. GC – Grafcet de conduite (mise en service)

```
        ╔════╗
        ║ 10 ║   (machine hors service)
        ╚════╝
          │
        ──┼── Ses
          │
        ┌────┐   ┌──────────────┐
        │ 11 ├───┤ KM   H0      │
        └────┘   └──────────────┘
                 (variateur sous tension, voyant "sous tension" allumé)
```

> L'étape 11 reste active : `X11` = « équipement en service ».

---

## 3. GPN – Grafcet de production normale

```
                     ╔════╗
                     ║ 20 ║   Attente
                     ╚════╝
                       │
         ┌─────────────┴──────────────┐
       ──┼── X11 · Auto · /Pc       ──┼── X11 · Auto · Pc
         │                            │
       ┌────┐  ┌──────────┐           │
       │ 21 ├──┤ HOR  GV  │  Retour   │
       └────┘  └──────────┘  au poste │
         │                   chargt   │
       ──┼── Pc                       │
         │                            │
         └─────────────┬──────────────┘
                       │◄──────────────────────────────────┐
                     ┌────┐                                │
                     │ 22 │   Machine prête (H1 éteint)    │
                     └────┘                                │
                       │                                   │
                     ──┼── S1 · Auto · Pc                  │
                       │                                   │
                     ┌────┐  ┌──────────┐                  │
                     │ 23 ├──┤ AH   PV  │  Vers dépôt      │
                     └────┘  └──────────┘                  │
                       │                                   │
                     ──┼── Pd                              │
                       │                                   │
                     ┌────┐                                │
                     │ 24 │   Arrêt au poste de dépôt      │
                     └────┘                                │
                       │                                   │
                     ──┼── t/X24/3s                        │
                       │                                   │
                     ┌────┐  ┌──────────┐                  │
                     │ 25 ├──┤ AH   PV  │  Vers déchargt   │
                     └────┘  └──────────┘                  │
                       │                                   │
                     ──┼── Pdc                             │
                       │                                   │
                     ┌────┐                                │
                     │ 26 │   Arrêt au poste de déchargt   │
                     └────┘                                │
                       │                                   │
                     ──┼── t/X26/5s                        │
                       │                                   │
                     ┌────┐  ┌──────────┐                  │
                     │ 27 ├──┤ HOR  GV  │  Retour initial  │
                     └────┘  └──────────┘                  │
                       │                                   │
                     ──┼── Pc                              │
                       └───────────────────────────────────┘


       Séquence "Fin" (étape 30 atteinte par forçage depuis GS)

                     ┌────┐  ┌──────────┐
                     │ 30 ├──┤ AH   GV  │  Envoi immédiat au poste de déchargement
                     └────┘  └──────────┘
                       │
                     ──┼── Pdc
                       │
                     ┌────┐
                     │ 31 │   Arrêt au déchargement (H1 fixe 3 s)
                     └────┘
                       │
                     ──┼── t/X31/3s
                       │
                       └──────►  vers étape 20
```

**Remarques**
- Les deux transitions issues de l'étape 20 sont exclusives (`Pc` / `/Pc`) : si le plateau
  n'est pas au poste de chargement, il y est ramené automatiquement en **GV** (étape 21)
  avant de pouvoir lancer un cycle.
- Après la séquence "Fin", le retour à l'étape 20 provoque le repositionnement automatique
  au poste de chargement (étape 21).
- Si le plateau est déjà au poste de déchargement lors de l'appui sur S2, la transition
  `Pdc` est immédiatement franchie (pas de mouvement).

---

## 4. GS – Grafcet de surveillance du BP "Fin"

```
                     ╔════╗
                     ║ 40 ║
                     ╚════╝
                       │
                     ──┼── S2 · X11 · Auto · /X30 · /X31
                       │
                     ┌────┐  ┌──────────────────┐
                     │ 41 ├──┤ F/GPN : {30}     │   Forçage du GPN à l'étape 30
                     └────┘  └──────────────────┘
                       │
                     ──┼── X30
                       │
                     ┌────┐
                     │ 42 │   GPN libéré, séquence Fin en cours
                     └────┘
                       │
                     ──┼── X20
                       │
                       └──────►  vers étape 40
```

> Le forçage n'est maintenu que le temps que l'étape 30 soit active (étape 41),
> puis le GPN évolue librement (étape 42) jusqu'au retour à l'étape 20.

---

## 5. Signalisation du voyant H1

Trois générateurs de clignotement synchronisés (ils démarrent toujours par une phase **allumée**) :

| Situation | Étapes concernées | Clignotement | Signal |
|---|---|---|---|
| Cycle en cours | `X23 + X24 + X25 + X27` | 1 Hz (0,5 s ON / 0,5 s OFF) | `C1` |
| Arrêt au poste de déchargement | `X26` | 0,5 s ON / 1 s OFF | `C2` |
| Séquence Fin (déplacement) | `X30` | 0,5 Hz (1 s ON / 1 s OFF) | `C3` |
| Fin – arrêt au déchargement | `X31` | Fixe 3 s | – |

Conditions de validation :
- `c1 = X23 + X24 + X25 + X27`
- `c2 = X26`
- `c3 = X30`

### Générateur C1 (1 Hz)

```
            ╔════╗
            ║ 50 ║◄───────────────────────────────┐
            ╚════╝                                │
              │                                   │
            ──┼── c1                              │
              │                                   │
            ┌────┐  ┌──────┐                      │
   ┌───────►│ 51 ├──┤  C1  │  (H1 allumé)         │
   │        └────┘  └──────┘                      │
   │     ┌────┴───────────────┐  divergence en OU │
   │   ──┼── t/X51/0,5s · c1 ──┼── /c1            │
   │     │                    └───────────────────┤
   │   ┌────┐                                     │
   │   │ 52 │   (H1 éteint)                       │
   │   └────┘                                     │
   │     ├────────────────────┐                   │
   │   ──┼── t/X52/0,5s · c1 ──┼── /c1            │
   └─────┘                    └───────────────────┘
```

### Générateur C2 (0,5 s ON / 1 s OFF)

Même structure, étapes **53 (init) / 54 (C2) / 55**, validation `c2`,
temporisations `t/X54/0,5s` (allumé) et `t/X55/1s` (éteint).

### Générateur C3 (0,5 Hz)

Même structure, étapes **56 (init) / 57 (C3) / 58**, validation `c3`,
temporisations `t/X57/1s` (allumé) et `t/X58/1s` (éteint).

### Équation de sortie du voyant H1

```
H1 = X51 + X54 + X57 + X31
```

(équivalent à `H1 = c1·C1 + c2·C2 + c3·C3 + X31`)

Le voyant H1 est éteint aux étapes 20, 21 et 22 : la machine est prête, H1 éteint.

---

## 6. Équations des sorties (récapitulatif)

```
KM  = X11
H0  = X11
AH  = X23 + X25 + X30
HOR = X21 + X27
PV  = X23 + X25
GV  = X21 + X27 + X30
H1  = X51 + X54 + X57 + X31
```

## 7. Hypothèses retenues

1. Le sens antihoraire mène successivement : chargement → dépôt → déchargement ;
   le retour au poste de chargement se fait en sens horaire.
2. Lors d'un appui sur "Fin", le sujet ne précise pas la vitesse : on a choisi la **GV**
   (« immédiatement envoyé ») dans le sens **antihoraire** (sens menant au déchargement).
   Remplacer `GV` par `PV` à l'étape 30 si le cahier des charges l'impose.
3. Après la séquence "Fin", le système revient à l'étape initiale 20 puis se
   repositionne automatiquement en GV au poste de chargement.
4. Le passage en mode Manu (`/Auto`) n'est pas traité ici (hors description du mode automatique).
