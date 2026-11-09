"""Fallback timing when the forced-aligner models can't be downloaded.

Spreads each lyric line's aksharas evenly across the sung span of the clip,
leaving a small gap between lines. Every line is marked low-confidence: review
it in sync-test.mp4 and correct the numbers by ear.
"""
import json
import sys
import unicodedata

LYRICS = "lyrics.txt"
START, END, GAP = 0.05, 12.95, 0.12


def aksharas(word: str) -> int:
    # A rough syllable count: base consonants/vowels, ignoring ones joined by a virama.
    n, prev_virama = 0, False
    for ch in word:
        cat = unicodedata.category(ch)
        if ch == "्":
            prev_virama = True
            continue
        if cat == "Lo" and not prev_virama:
            n += 1
        prev_virama = False
    return max(n, 1)


def main() -> None:
    lines = [l.strip() for l in open(LYRICS, encoding="utf-8") if l.strip()]
    words_per_line = [l.split() for l in lines]
    total_syl = sum(aksharas(w) for ws in words_per_line for w in ws)
    sec_per_syl = (END - START - GAP * (len(lines) - 1)) / total_syl

    words, phrases, t = [], [], START
    for i, ws in enumerate(words_per_line, 1):
        line_words = []
        for w in ws:
            d = aksharas(w) * sec_per_syl
            line_words.append({"word": w, "start": round(t, 3), "end": round(t + d, 3)})
            t += d
        words += line_words
        phrases.append({
            "line": i, "text": " ".join(ws),
            "start": line_words[0]["start"], "end": line_words[-1]["end"],
            "words": line_words, "confidence": "low",
        })
        t += GAP

    json.dump(words, open("word-timestamps.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    json.dump(phrases, open("phrases.json", "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    for p in phrases:
        print(f'{p["line"]}  {p["start"]:6.2f} → {p["end"]:6.2f}  {p["text"]}')
    print(f"{len(words)} words, {sec_per_syl:.3f} s per syllable", file=sys.stderr)


if __name__ == "__main__":
    main()
