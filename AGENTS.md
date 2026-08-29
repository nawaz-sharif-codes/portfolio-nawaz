# AGENT PROMPT — Award-Winning Portfolio Build

You are building my personal portfolio website. This is not a generic template job — it is meant to be Awwwards / SOTD-tier. Follow this prompt exactly. If any instruction conflicts with your defaults, this prompt wins.

## 0. Setup — install required skills FIRST, before writing any code

Run these exactly, in order, before touching the codebase:

```
npx skills add Leonxlnx/taste-skill
pnpm dlx skills add shadcn/ui
npx skills add https://github.com/remotion-dev/skills --skill remotion-best-practices
```

Confirm all three are installed and loaded before proceeding. Do not skip this step, do not substitute equivalents, do not proceed with default/generic component instincts if a skill above conflicts with them — the installed skill always wins.

## 1. Source of truth — read these 4 files before generating a single line of UI

- `DESIGN.md` — design philosophy, layout principles, interaction/motion language, do's and don'ts
- `theme.css` — color system, dark/light modes, semantic color mappings
- `variable.css` — spacing scale, typography scale, radii, shadows, breakpoints, timing/easing curves
- `token.json` — raw design tokens (source of truth if theme.css/variable.css and token.json ever disagree, token.json wins)

**Rules:**
- Read all four fully before writing any component, page, or config.
- Every color, spacing value, font size, radius, shadow, and animation timing used anywhere in the codebase MUST come from these files. No hardcoded hex codes, no arbitrary Tailwind values (`p-[13px]`, `text-[#111]`, etc.) unless a token genuinely doesn't exist for that need — in which case, stop and flag it to me instead of inventing one.
- If DESIGN.md specifies a layout/interaction pattern, implement it as specified — don't "improve" it with your own default aesthetic.
- If any of the 4 files is missing or incomplete when you start, stop and ask me for it. Do not fill gaps with generic assumptions.

## 2. What "award-winning" means here — non-negotiables

- No generic SaaS-template look: no default shadcn card grids with no personality, no stock "Hero + 3 feature cards + testimonials" structure unless DESIGN.md explicitly calls for it.
- Motion is a first-class citizen, not decoration: purposeful page-load sequencing, scroll-driven reveals, smooth page/section transitions, cursor or hover micro-interactions — all governed by the timing/easing values in `variable.css`/`token.json`, not arbitrary defaults.
- Typography must show a clear hierarchy and personality (per DESIGN.md), not default Tailwind prose sizing.
- Every interactive element needs a deliberate hover/focus/active state — not the shadcn default state left untouched.
- Performance and accessibility are not optional: Lighthouse performance/accessibility ≥ 90, semantic HTML, keyboard navigability, prefers-reduced-motion respected for all animation.
- Where the taste-skill and DESIGN.md give conflicting micro-guidance, DESIGN.md (my file) is the final authority — the taste-skill is there to catch generic/default instincts, not to override my design spec.

## 3. Where each skill applies

- **taste-skill** — apply continuously as a quality gate on every component/page you generate: before finalizing any UI output, self-check it against the skill's criteria for avoiding generic/AI-template aesthetics.
- **shadcn/ui** — use as the base component primitives (buttons, dialogs, nav, forms, etc.), but every shadcn component must be re-themed with the tokens from `theme.css`/`variable.css`/`token.json` — never ship an unstyled/default shadcn look.
- **remotion-best-practices** — use specifically for any generated video/motion-graphics assets (e.g., an animated hero reel, project showcase clips, or exported intro animation), following Remotion's best practices for composition structure, rendering, and performance. Don't use Remotion for standard in-browser DOM animation — that should be CSS/Framer Motion/GSAP per DESIGN.md.

## 4. Workflow — do not skip steps

1. Confirm all 3 skills installed.
2. Read and summarize back to me your understanding of DESIGN.md's core principles + the token system, in 5–8 bullet points, before generating any UI.
3. Propose the page/section structure (based on DESIGN.md) and wait for my approval before scaffolding.
4. Build incrementally, section by section — not the whole site in one shot. Show each section for review before moving to the next.
5. After each section, run a self-check against taste-skill criteria and report any flags.
6. Only after all sections are approved: wire up final polish (transitions between sections/pages, loading states, meta tags, SEO, OG images, favicon, accessibility pass, performance pass).

## 5. Hard constraints

- Do not invent content, project descriptions, or copy — ask me for real content per section, or use clearly-marked placeholder text I can swap in.
- Do not add sections/pages not implied by DESIGN.md or requested by me.
- Do not silently deviate from the token system "because it looks better" — flag it and ask instead.
- Do not mark the build "done" until Lighthouse scores and a manual reduced-motion check are reported to me.

Stop after step 2 of the workflow and wait for my go-ahead before scaffolding anything.