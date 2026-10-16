# Neutral-Atom Field Guide

An independent, beginner-friendly learning guide to [Pasqal](https://www.pasqal.com/)'s neutral-atom quantum computing platform: the quantum basics, how the hardware works, Pulser, the emulators, Pasqal Cloud, the higher-level libraries and the company's roadmap.

- **Read online:** https://yassir-249.github.io/neutral-atom-field-guide/
- **PDF:** [neutral-atom-field-guide.pdf](neutral-atom-field-guide.pdf)

Facts were checked in October 2026 against docs.pasqal.com, pulser.readthedocs.io and pasqal.com, and the code samples were run on Pulser 1.9.1 / pasqal-cloud 0.24.0.

## Updating

The whole guide is one file, `index.html` (no build step). After editing it, rebuild the PDF:

```bash
npm install --no-save puppeteer-core@23.11.1
node scripts/build-pdf.js
```

Not an official Pasqal publication, and not affiliated with or endorsed by Pasqal. Product names belong to their owners.
