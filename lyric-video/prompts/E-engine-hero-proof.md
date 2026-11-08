Creative direction APPROVED.
The concept "The Case File of a Question," the three visual worlds, red-line motif, 37 sequences, beat map, typography system and semantic concepts should now be treated as the creative source of truth.
Do not redesign the screenplay unless implementation reveals a genuine technical problem.
Use:
creative-direction.md
visual-screenplay.json
beat-map.json
word-timestamps.json
phrases.json
original MP3
assets/fonts/
The word timestamps, phrase timestamps and original audio remain FROZEN.
Now begin implementation in Remotion + React/TypeScript.
However:
DO NOT build/render the entire 228.9-second video immediately.
We need to establish the QUALITY BAR first.
# PHASE 1 — BUILD THE MOTION DESIGN ENGINE
Set up a production-quality Remotion project.
Create a clean architecture separating:
timing/
typography/
backgrounds/
graphics/
transitions/
effects/
sequences/
assets/
utils/
Build reusable LOW-LEVEL primitives for:
typography animation
SVG drawing
masks
clipping
camera movement
depth/parallax
grain
texture
paper
ink
red-line drawing
character/word reveals
shape morphing
motion trails
impact
controlled distortion
background transitions
But remember:
These primitives are implementation tools.
The visual-screenplay remains responsible for creative decisions.
Do NOT randomly assign effects to words.
# CRITICAL: MOTION MUST FEEL DESIGNED
Avoid the common "AI-coded motion graphics" look:
linear translateX
basic scale(0→1)
generic spring on every word
constant opacity fades
everything centered
every word entering separately
random rotation
random glitch
hard scene resets
same easing everywhere
Motion needs:
anticipation
overshoot where appropriate
follow-through
stagger
weight
inertia
acceleration/deceleration
hierarchy
continuity
Different objects should FEEL physically different.
Paper ≠ ink ≠ metal ≠ thread ≠ skin ≠ typography.
For example:
A rubber stamp should have weight:
fast downward acceleration → impact → tiny compression → rebound → ink residue.
A thread should have elasticity.
Paper should have subtle dimensionality.
A heavy word should resist movement.
Ink should spread/draw rather than simply fade in.
# BUILD A CAMERA SYSTEM
Do not make this feel like 37 PowerPoint slides.
Create a virtual 2D/2.5D camera abstraction.
Scenes can exist on a larger visual canvas.
The camera should sometimes:
push into typography
pull back
track a moving object
travel across a page
rotate with a physical object
pass through letterforms
reveal that one composition existed inside another
Transitions should often happen because the CAMERA or an existing object leads us into the next composition.
# RED LINE
Treat the red line as a CHARACTER, not decoration.
Build it as a reusable animated SVG/path system capable of becoming:
underline
pen stroke
thread
suture
clock hand
crack
road
wound
question mark
Whenever possible, morph/continue the existing line rather than destroying it and spawning another.
Its continuity is one of the most important devices in the entire film.
# TYPOGRAPHY
Use the fonts already tested in assets/fonts/.
Preserve proper Devanagari shaping.
Never animate individual Unicode codepoints in a way that breaks conjuncts/matras.
If character-level manipulation is required, use grapheme-safe segmentation or pre-render the correctly shaped unit.
Typography should have physical presence.
Use:
extreme scale differences
variable weight where supported
perspective
depth
clipping
negative space
edge compositions
foreground/background relationships
text on paths
text integrated into graphics
Do not default to center alignment.
# BACKGROUNDS
Implement the three visual worlds from creative-direction.md:
PAPER
NIGHT
BLOOD-RED
But each is a SYSTEM, not a flat background color.
PAPER should have:
subtle grain
print imperfections
ink behavior
editorial structures
physical depth
NIGHT should have:
deep blacks
controlled amber light
falloff
depth
atmosphere
selective visibility
BLOOD-RED should feel deliberately different and should be reserved for the ending as specified.
Do not overuse digital neon/glow aesthetics.
# AUDIO REACTIVITY
Use:
word-timestamps.json → primary lyric timing
beat-map.json → secondary rhythmic motion
Do not animate everything on every beat.
Use downbeats/kicks selectively for:
impact
camera impulse
background response
scene transformation
object collision
major typography emphasis
Subtle secondary elements can respond to rhythm at lower amplitude.
# ORIGINAL SVG ASSETS
Create the required line-art assets ourselves:
hands
eye
crow
coin
arch
fingers
glass
etc.
Keep them stylistically consistent with the Case File visual language.
Avoid generic emoji/icon appearance.
They should feel hand-drawn/editorial and capable of interacting with typography.
# PHASE 2 — BUILD A HERO PROOF
Before implementing the full song, build ONLY a representative section.
Use approximately:
53s → 95s
This gives us:
the moustache sequence
melodic transition
Hook I
head/hand interaction
circle transformation
"दीवाना" payoff
record transformation
rubber-stamp transition
This section should establish whether the final film is actually going to look professional.
Implement these sequences FULLY.
No placeholders.
No "we'll polish later" versions.
Include:
final typography
final backgrounds
final SVG graphics
final transitions
final camera behavior
final textures
final timing
final easing
final audio synchronization
Render:
hero-proof.mp4
1080 × 1920
30 FPS
original audio
# MOUSTACHE SEQUENCE — IMPORTANT
This is one of the signature moments.
Do not simply put a moustache SVG under the word.
For:
"जो चुभती है तुझ को, हाँ जैसे मेरा काम और ये मूँछ"
Build semantic progression.
"चुभती" should introduce sharpness/piercing.
Explore pointed geometry/spikes interacting physically with the typography.
The visual tension should travel through the phrase.
When "मूँछ" arrives:
use the actual Devanagari headline/shirorekha as the starting geometry.
Extend/morph it into the moustache.
The moustache should feel like it is born FROM the typography.
It should curl outward with confident physical motion.
Then use that SAME geometry to sweep across the camera and motivate the transition.
No moustache sticker/icon appearing beside the word.
# HOOK SEAL SEQUENCE
This needs to feel like ONE continuous transformation:
melodic line
↓
circle
↓
head
↓
hand rests on head
↓
red fill
↓
दीवाना payoff
↓
record
↓
spin/flip
↓
rubber stamp
↓
impact starts Verse 2
Do not implement these as separate shots joined with cuts.
The viewer should be able to visually follow the object's identity throughout the transformation.
The transformation itself is the spectacle.
# COMPOSITION SAFETY
This will primarily be viewed on Instagram Reels.
Keep critical text away from areas likely to be obscured by:
username/caption at bottom
right-side interaction buttons
top UI
But intentionally allow decorative graphics and oversized typography to bleed beyond safe areas.
# PERFORMANCE
Prefer SVG/CSS/Remotion-native techniques when sufficient.
Use Canvas only when it materially improves an effect.
Avoid unnecessarily expensive per-frame calculations.
Precompute paths/data where practical.
Make deterministic renders.
No Math.random() without deterministic seeding.
# QA
After implementation, inspect the hero proof for:
1. lyric synchronization
2. broken Devanagari shaping
3. clipping
4. accidental overlaps
5. unreadable frames
6. animation discontinuities
7. weak transitions
8. repetitive movement
9. objects teleporting between states
10. motion that feels mechanically linear
11. visual elements obscured by Reel UI
12. frames where too much happens for the available lyric duration
Also inspect representative frames/screenshots rather than trusting code alone.
If a concept looks weak in the actual render, improve the IMPLEMENTATION while preserving the screenplay's intent.
# IMPORTANT
Do not optimize for "technically completed."
Optimize for:
"Would a professional music artist actually want this visual style for their release?"
If a scene technically works but looks like a coding demo, it is not finished.
# DELIVERABLES FOR THIS PHASE
Create:
hero-proof.mp4
and
implementation-notes.md
The notes should briefly explain:
- architecture created
- components/effects built
- SVG assets created
- any deviations from screenplay and why
- known visual weaknesses
- performance/render considerations
Also export 8 representative PNG frames from the hero section so individual compositions can be reviewed without pausing the video.
STOP after the hero proof.
Do NOT proceed with the remaining song until I approve the visual quality.
