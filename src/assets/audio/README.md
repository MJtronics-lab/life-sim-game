# Audio-Dateien für Life Simulation Game

## Struktur (60 Nasheeds sortiert)

```
public/audio/
├── bedroom/     (12 Tracks - kurz, entspannend)
├── prayer/      (12 Tracks - kurz-mittel, spirituell)
├── work/        (12 Tracks - mittel, fokussiert)
├── driving/     (12 Tracks - mittel-lang, aufbauend)
└── gym/         (12 Tracks - lang, energetisch)
```

## Aktive Dateien pro Szene

| Szene | Datei | Lautstärke |
|-------|-------|------------|
| Schlafzimmer | `/audio/bedroom/nasheed-01.mp3` | 20% |
| Gebetsecke | `/audio/prayer/nasheed-02.mp3` | 25% |
| Lager | `/audio/work/nasheed-07.mp3` | 30% |
| Home Office | `/audio/work/nasheed-08.mp3` | 30% |
| Gym | `/audio/gym/nasheed-21.mp3` | 40% |
| Fahrschule | `/audio/driving/nasheed-12.mp3` | 30% |

## Quelle

**Internet Archive** - Background Nasheed Collection
- 60 Tracks, Al Ansar Studio (Copyright-frei)

## Track wechseln

In `src/data/audio.ts` die `file`-Eigenschaft ändern:

```typescript
bedroom: {
  file: '/audio/bedroom/nasheed-17.mp3',  // ← Anderer Track
  volumePreset: 20,
  name: 'Relaxing Nasheed',
},
```
