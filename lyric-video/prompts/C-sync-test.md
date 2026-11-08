Great. Do NOT modify or re-run the alignment yet.
Before we build the actual motion-graphics video, I want to visually verify the synchronization.
Create a very simple 9:16 verification video using:
- song.mp3
- word-timestamps.json
- phrases.json
VIDEO:
1080 × 1920
30 FPS
Black background
Original song.mp3 as audio
Display the CURRENT PHRASE around the center of the screen.
Within that phrase:
- inactive words = white/gray
- currently spoken word = visually highlighted
- change the highlight using the exact word-level start/end timestamps
- keep the entire phrase visible so I can understand context
Also display small debug information at the bottom:
current song time
line number
current word
word start → end
Example:
LINE 24
02:13.420
"तलब"
133.21 → 135.18
Do not add motion graphics, transitions, camera movements, effects, beat detection, or artistic styling yet.
This video's ONLY purpose is synchronization QA.
Render:
sync-test.mp4
Use the existing timestamps exactly as they currently exist. Do not silently alter them.
After rendering, tell me the exact output path.
Do not begin building the final lyric video after this. Stop after sync-test.mp4 is rendered.
