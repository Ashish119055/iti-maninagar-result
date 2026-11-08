I have provided two files in this project:
- song.mp3 — the original rap song
- lyrics.txt — the exact/canonical lyrics
Before creating any video, I need you to create highly accurate word-level timestamps for the lyrics.
Inspect the environment and install/use whatever local tools are required. Prefer WhisperX or another forced-alignment approach suitable for fast rap vocals.
The lyrics.txt file is the source of truth for the WORDS.
The audio is the source of truth for the TIMING.
Do not simply transcribe the song and replace my lyrics. Align my supplied lyrics against the actual vocal performance.
I need output in this format:
[
  {
    "word": "example",
    "start": 1.240,
    "end": 1.510
  }
]
Save the final result as:
word-timestamps.json
Also create:
phrases.json
where individual words are grouped into the actual lyrical lines/phrases while retaining their timing.
Because this is rap, pay special attention to:
- very fast delivery
- words spoken close together
- repeated words
- pauses
- ad-libs
- contractions
- elongated words
- differences between transcription and lyrics
First inspect the files and determine the best alignment approach available in this environment.
Then actually execute the transcription/alignment.
Do not start building the video yet.
At the end, verify that the timestamps cover the song correctly and report any portions where alignment confidence appears poor.
