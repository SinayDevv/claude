# GRAFCET – Mode manuel

```
                     ╔════╗
                     ║ 20 ║◄───────────────────────────────┐
                     ╚════╝                                │
                       │                                   │
          ┌────────────┴─────────────┐                     │
        ──┼── KM·/Auto·BP1·/BP2    ──┼── KM·/Auto·BP2·/BP1 │
          │                          │                     │
        ┌────┐  ┌────────┐         ┌────┐  ┌─────────┐     │
        │ 21 ├──┤ AH  PV │         │ 22 ├──┤ HOR  PV │     │
        └────┘  └────────┘         └────┘  └─────────┘     │
          │                          │                     │
        ──┼── /BP1 + Auto          ──┼── /BP2 + Auto       │
          │                          │                     │
          └────────────┬─────────────┘                     │
                       └───────────────────────────────────┘
```

- **20** : attente (aucune action).
- **21** : rotation avant (antihoraire) tant que BP1 est appuyé.
- **22** : rotation arrière (horaire) tant que BP2 est appuyé.

**Légende**
- Entrées : `BP1` avant, `BP2` arrière, `Auto` commutateur (`/Auto` = Manu),
  `KM` variateur sous tension (mise en service faite).
- Sorties : `AH` antihoraire, `HOR` horaire, `PV` petite vitesse.
