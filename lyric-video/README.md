# Lyric Video Studio (Claude Code × Remotion)

A copy of the *Lyric Video Process Guide* ("How we made a motion-designed lyric video with AI").
It turns a song and its lyrics into an art-directed 9:16 motion-graphics music video for Reels or Shorts.

## Install

```bash
cd lyric-video
./setup.sh
```

This installs:

| Part | What gets installed | Used in |
|---|---|---|
| System | ffmpeg, libraqm (HarfBuzz text shaping), Noto fonts | Sync test, renders |
| Python (`.venv/`) | torch + torchaudio (MMS_FA aligner), uroman, demucs, openai-whisper, librosa, Pillow | Stages 1–3 |
| Node (`video/`) | Remotion 4, React 18, TypeScript | Stages 4–5 |

You need about 5 GB of free disk space for the Python models and the Chrome renderer.

## Start

1. Put `song.mp3` and `lyrics.txt` in this folder. Write one lyric line per text line, in the original script (Devanagari, Gujarati, Latin or mixed).
2. Open Claude Code here and paste the prompts from `prompts/` in order. **Approve each stage before you move on.**

| Stage | Prompt | Output |
|---|---|---|
| 0 Inspect | `A-start.md` | file report |
| 1 Word timing | `B-word-timing.md` | `word-timestamps.json`, `phrases.json` |
| 2 Sync test | `C-sync-test.md` | `sync-test.mp4` |
| 3 Creative direction | `D-creative-direction.md` | `creative-direction.md`, `visual-screenplay.json`, `beat-map.json` |
| 4 Engine + hero proof | `E-engine-hero-proof.md` (scope it down with `E2-scope-down.md` if you need to) | `hero-proof.mp4` |
| 5 Sections | `F-render-section.md` (change the time range) | `section-*.mp4` |

Prompts D and E were written for the *PYAAR?* song (82 lines, "Case File" concept, a 53s→95s hero section).
Change the line count, concept names and time ranges to match your own song.

## The three rules

1. **Freeze what's been approved.** Once the timing passes review, nothing after it changes the timestamps or the audio.
2. **Review a picture, not code.** Every stage ends with something you watch or look at.
3. **Prove quality on a small piece first.** Approve a 5-second hero proof before you render longer sections.

## Engine layout (`video/src/`)

`timing/` · `typography/` · `graphics/` · `effects/` · `camera/` · `backgrounds/` · `transitions/` · `sequences/` · `utils/`

Check that it works: `cd video && npx remotion still src/index.ts SyncTest out/test.png --frame=200`

## Credit and rights

Songs belong to their artists. Credit the artist and get permission before any commercial use. Use only open-licence (SIL OFL) fonts and original SVG art.
