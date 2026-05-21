#!/usr/bin/env python3
"""Vylepšenie vy-* rámov: upscale + ostrenie pre ostrejší vzhľad na Retina."""

from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parents[1] / "images"

# (súbor, scale_factor) — navbar už je veľký, len ostrenie
JOBS = [
    ("vy-frame-top.webp", 3.0),
    ("vy-frame-bottom.webp", 3.0),
    ("vy-panel-bg.webp", 2.0),
    ("vy-dialog-bg.webp", 2.0),
    ("vy-frame.webp", 2.0),
    ("vy-nav-frame.webp", 1.5),
    ("vy-navbar-bg.webp", 1.0),
]


def enhance(path: Path, scale: float) -> None:
    im = Image.open(path).convert("RGBA")
    w, h = im.size
    if scale != 1.0:
        nw, nh = max(1, int(w * scale)), max(1, int(h * scale))
        im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.4, percent=135, threshold=2))
    im = ImageEnhance.Contrast(im).enhance(1.06)
    im = ImageEnhance.Sharpness(im).enhance(1.12)
    im.save(path, "WEBP", quality=93, method=6, lossless=False)
    print(f"  {path.name}: {w}x{h} -> {im.size[0]}x{im.size[1]} (x{scale})")


def main() -> None:
    print("Enhancing vy frame assets…")
    for name, scale in JOBS:
        p = ROOT / name
        if not p.exists():
            raise SystemExit(f"Missing: {p}")
        enhance(p, scale)
    print("Done.")


if __name__ == "__main__":
    main()
