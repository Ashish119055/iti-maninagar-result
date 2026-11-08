#!/usr/bin/env bash
# Installs everything the lyric-video workflow needs. Safe to re-run.
set -euo pipefail
cd "$(dirname "$0")"

# Text shaper for Devanagari in Pillow (sync test) + Noto fonts
if command -v apt-get >/dev/null; then
  sudo_cmd=""; [ "$(id -u)" -ne 0 ] && sudo_cmd="sudo"
  $sudo_cmd apt-get install -y ffmpeg libraqm0 fonts-noto-core || { $sudo_cmd apt-get update && $sudo_cmd apt-get install -y ffmpeg libraqm0 fonts-noto-core; }
elif command -v brew >/dev/null; then
  brew install ffmpeg libraqm
fi

# Python: Demucs, torchaudio MMS_FA + uroman, Whisper, librosa
[ -d .venv ] || python3 -m venv .venv
.venv/bin/pip install --upgrade pip
.venv/bin/pip install -r requirements.txt

# Remotion engine
(cd video && npm install)

echo "Setup done. Put song.mp3 and lyrics.txt in $(pwd) and start with prompts/A-start.md"
