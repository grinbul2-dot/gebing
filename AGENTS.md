# AGENTS.md --- GEBING

## Project Identity

**GEBING** = **Game Edukasi Bahasa Inggris**\
Current learning theme: **Things Around Me**\
Target learners: **SMP / Junior High School --- Phase D**\
Project owner: **Suryo Agung Nugroho, S.Pd. --- SMP Negeri 1 Nglipar**\
Purpose: **Festival Biru Putih 2026 --- Educational Game category**

GEBING is an existing HTML5 educational adventure game. It combines
English learning, arcade-style gameplay, contextual assessment, and a
meaningful Javanese/local identity.

**This is an existing project. Do not rebuild it from scratch.**

------------------------------------------------------------------------

## 1. Mandatory Reading

Before doing any project work, read the complete:

`GEBING-PROJECT-HANDOVER.md`

That document is the authoritative project specification.

This `AGENTS.md` contains the most important operational rules. If more
detail is required, consult the handover document.

If the current source conflicts with the handover, **report the conflict
before changing anything**.

------------------------------------------------------------------------

## 2. Core Development Rule

Follow this sequence:

> **PRESERVE → UNDERSTAND → PLAN → MODIFY → TEST → VERIFY**

Preserve all working functionality unless a change has been explicitly
approved.

Do not perform a large refactor or architectural rewrite merely because
another implementation appears cleaner.

Prefer targeted, reversible modifications.

------------------------------------------------------------------------

## 3. DEPLOY Gate --- Critical

### Before the user explicitly says `DEPLOY`

You may:

-   inspect files;
-   read source code;
-   run the game;
-   test behavior;
-   inspect the browser console;
-   audit architecture;
-   identify bugs;
-   analyze question data;
-   inspect assets;
-   assess offline readiness;
-   propose designs;
-   create an implementation plan;
-   explain which files would need modification.

You must **NOT**:

-   modify source code;
-   rewrite files;
-   rename files;
-   delete files;
-   replace assets;
-   install dependencies;
-   change branding;
-   refactor architecture;
-   implement proposed features.

After completing an audit or plan, **STOP and wait for `DEPLOY`.**

### After the user says `DEPLOY`

Implement only the approved scope.

`DEPLOY` is authorization to implement the agreed task, **not permission
to redesign the entire project**.

------------------------------------------------------------------------

## 4. Existing Project First

Never assume a feature is absent or broken based only on documentation.

Inspect the actual current source and, where practical, run the game.

Classify features as:

-   **IMPLEMENTED**
-   **PARTIALLY IMPLEMENTED**
-   **PLANNED**
-   **NEEDS TESTING**

Do not confuse planned features in the handover with features already
present in the build.

------------------------------------------------------------------------

## 5. Branding

Primary product identity:

# GEBING

## Game Edukasi Bahasa Inggris

### Things Around Me

*A Javanese English Adventure*

Older branding such as **Word Crystal Quest** may still exist in the
source.

Do not automatically replace it before approval.

When branding changes are approved, GEBING becomes the main product
identity. "Word Crystal Quest" may remain only as a secondary
story/world/mission concept if useful.

------------------------------------------------------------------------

## 6. Educational Priority

The project must feel like:

> **a real game that teaches English**

not:

> a worksheet or ordinary quiz with a game skin.

Learning quality has higher priority than decorative complexity.

Questions should go beyond simple vocabulary recognition where
appropriate and include:

-   applying language;
-   contextual interpretation;
-   combining clues;
-   maps;
-   schedules;
-   directions;
-   object functions;
-   sequencing;
-   categorization;
-   visual interpretation;
-   small problem-solving tasks.

English should generally remain accessible to SMP learners at
approximately **CEFR A1--A2**, while cognitive challenge may
progressively increase.

------------------------------------------------------------------------

## 7. Learning Theme

Main theme:

**Things Around Me**

Relevant competency areas may include:

-   Objects
-   Places
-   Position Words
-   Following Steps
-   Times
-   Jobs

Learning results should be distinguishable from arcade performance.

Do not let speed, combo, cosmetics, or rapid tapping artificially
increase academic mastery scores.

------------------------------------------------------------------------

## 8. Four-World Structure

Preserve the current four-world concept unless explicitly approved
otherwise:

1.  **School Sprint**
2.  **Household Launch**
3.  **Neighborhood Rush**
4.  **Crystal Finale**

Each world should integrate its learning interaction into gameplay.

Do not reduce all four worlds to visually different versions of the same
multiple-choice quiz.

------------------------------------------------------------------------

## 9. Question Bank

Target design:

-   **200 questions total**
-   **50 questions per world**
-   approximately **12 selected per playthrough**
-   no duplicate question within one run
-   randomized questions where appropriate
-   randomized options where appropriate
-   correct-answer mapping must remain valid after shuffling
-   clear correct answers
-   plausible distractors
-   concise educational feedback
-   competency metadata
-   difficulty metadata

Do not assume the current build already contains all 200 valid
questions. Verify actual data first.

------------------------------------------------------------------------

## 10. Interaction Types

The planned system supports a mixture of:

-   single choice;
-   True / False;
-   matching;
-   dropdown / fill-the-gap;
-   sequence puzzle;
-   sentence-order puzzle;
-   grouping / categorization;
-   image hotspot / visual selection.

Multiple choice must not always use exactly three options.

Do not force every activity into ordinary multiple choice.

New interaction types must include clear instructions.

------------------------------------------------------------------------

## 11. Local / Javanese Identity

Intended protagonist:

**one original young Javanese adventurer with subtle wayang influence.**

Possible visual direction:

-   blangkon;
-   lurik-inspired clothing;
-   batik accents;
-   adventure bag;
-   expressive cartoon face;
-   subtle wayang-inspired poses or silhouettes.

The same protagonist should remain recognizable across all worlds.

Local identity should also appear meaningfully in environments and
context, such as:

-   school;
-   library;
-   canteen;
-   home;
-   market;
-   neighborhood;
-   village road;
-   Nglipar/Gunungkidul-inspired setting.

Do not treat Javanese culture as a superficial costume layer.

Do not copy copyrighted characters or commercial game assets.

------------------------------------------------------------------------

## 12. Offline-First Requirement

The final competition build must work without internet access.

Core gameplay must not depend on:

-   CDN assets;
-   Google Fonts or other remote fonts;
-   remote JavaScript;
-   remote CSS;
-   remote images;
-   remote audio;
-   external APIs;
-   cloud databases;
-   analytics;
-   trackers;
-   online authentication;
-   server-side services.

Required assets must be local in the final package.

Before finalization, test the game with network access disabled.

------------------------------------------------------------------------

## 13. Final ZIP Structure

`index.html` must be located at the root of the final competition ZIP.

Correct example:

    GEBING.zip
    ├── index.html
    ├── AGENTS.md
    ├── GEBING-PROJECT-HANDOVER.md
    ├── assets/
    ├── css/
    └── js/

Avoid:

    GEBING.zip
    └── GEBING/
        └── index.html

Keep gameplay effectively a **Single Page Application**.

Do not redirect core gameplay to external pages.

------------------------------------------------------------------------

## 14. Technical Targets

Maintain:

-   HTML5/browser-native compatibility;
-   offline operation;
-   16:9-oriented presentation;
-   responsive layout;
-   laptop support;
-   tablet support;
-   smartphone support;
-   touch-friendly controls;
-   keyboard controls where applicable;
-   readable UI;
-   no unnecessary scrolling during core gameplay;
-   reasonable performance.

Target level loading should remain approximately **5 seconds or less**
on reasonable competition hardware.

Keep package size efficient. Prefer approximately **25 MB or below**
where practical and never exceed applicable competition package limits.

Do not introduce a framework solely for developer preference.

------------------------------------------------------------------------

## 15. Visual and UI Rules

Prioritize:

-   strong readability;
-   high contrast;
-   clear game-style fonts;
-   no essential italic text;
-   consistent icons;
-   consistent buttons;
-   readable HUD;
-   large enough touch targets;
-   responsive question dialogs;
-   animations that do not cover important learning information;
-   clear navigation;
-   sound toggle;
-   usable full-screen mode where appropriate.

The game must remain usable without audio.

------------------------------------------------------------------------

## 16. Feedback and Assessment

Avoid feedback that only says:

`Wrong!`

Prefer short diagnostic feedback explaining the relevant language point.

For multi-step tasks:

-   manipulating an item is not automatically a wrong answer;
-   use a Check/Submit action where appropriate;
-   one submitted mistake should not cause multiple accidental
    penalties;
-   identify incorrect components when practical;
-   allow correction where pedagogically appropriate;
-   preserve first-attempt data if used for mastery analytics.

------------------------------------------------------------------------

## 17. Teacher Editor

A **Teacher Editor** is planned.

Possible editable fields include:

-   interface text;
-   questions;
-   answer options;
-   correct answers;
-   explanations;
-   competency;
-   difficulty;
-   interaction type;
-   image references;
-   matching pairs;
-   sequence data;
-   grouping data;
-   True/False data.

Possible functions:

-   preview;
-   validation;
-   export;
-   import;
-   restore defaults.

Verify whether any of this already exists before implementation.

Do not create a server dependency for the Teacher Editor.

------------------------------------------------------------------------

## 18. Asset and Copyright Rules

All final assets need traceable origins.

Flag unclear assets rather than silently deleting them.

Do not use:

-   copyrighted commercial game characters;
-   ripped game sprites;
-   unlicensed music;
-   watermarked images;
-   unauthorized logos;
-   copied assets from reference games.

Gameplay inspirations are not asset sources.

Maintain source information for original, licensed, open, and
AI-generated assets.

------------------------------------------------------------------------

## 19. AI-Generated Assets

AI-generated visual assets require competition-compliant documentation.

Maintain:

-   AI-generation disclosure;
-   source/inventory record;
-   relevant design/prompting documentation.

Do not silently replace documented assets with undocumented AI-generated
assets.

------------------------------------------------------------------------

## 20. Publication Caution

The competition documentation contains an originality /
previous-publication requirement.

A development build may previously have existed online.

Treat publication status as an unresolved compliance issue until
confirmed with the competition organizer.

Do not unnecessarily publish, promote, or redistribute the competition
build.

Do not independently conclude that the existing development URL either
definitely violates or definitely satisfies the rule.

------------------------------------------------------------------------

## 21. Priority Order

When choosing what to improve, prioritize:

1.  **Learning depth**
2.  **Interaction variety**
3.  **Meaningful local identity**
4.  **Diagnostic feedback and competency reporting**
5.  **Reliability / QA / offline operation**
6.  **Submission readiness**

Avoid feature creep.

Do not sacrifice stability for cosmetic additions.

------------------------------------------------------------------------

## 22. Prohibited Agent Behavior

Do NOT:

-   rebuild the entire game from scratch;
-   remove working modes without approval;
-   change framework merely for preference;
-   install unnecessary dependencies;
-   require internet for core gameplay;
-   add login requirements;
-   add advertising;
-   add tracking/analytics;
-   use copyrighted character assets;
-   make most correct answers option A;
-   reduce interaction variety;
-   merge arcade score with academic mastery;
-   remove the local identity;
-   rename the project without approval;
-   modify files before `DEPLOY`.

If uncertain about a potentially destructive decision, ask first.

------------------------------------------------------------------------

## 23. Initial Audit Procedure

On first opening the repository:

1.  Read this file.
2.  Read `GEBING-PROJECT-HANDOVER.md` completely.
3.  Inspect the repository structure.
4.  Identify the entry point.
5.  Run the current game.
6.  Inspect all four worlds if accessible.
7.  Inspect question/data structures.
8.  Inspect scoring, lives, timers, and progress.
9.  Inspect local storage/state persistence.
10. Inspect controls.
11. Inspect responsive behavior.
12. Inspect assets.
13. Search for external network dependencies.
14. Inspect browser console errors.
15. Assess offline readiness.
16. Compare implemented features against planned features.
17. Report bugs and risks.
18. Propose a prioritized roadmap.
19. **STOP.**
20. Wait for `DEPLOY`.

Do not edit files during this initial audit.

------------------------------------------------------------------------

## 24. Post-Implementation Verification

After authorized implementation, test the affected feature and the
surrounding game flow.

For significant changes, verify:

-   game starts;
-   four worlds remain reachable;
-   questions load;
-   correct answers remain correct;
-   shuffled answers preserve keys;
-   duplicate prevention works;
-   interaction types work;
-   scoring works;
-   lives work;
-   timers work;
-   feedback works;
-   competency data works;
-   progress saving works;
-   reset works;
-   Game Over works;
-   end-of-game result/report works;
-   keyboard works;
-   touch controls work;
-   smartphone layout works;
-   tablet layout works;
-   desktop layout works;
-   assets load;
-   no critical console errors;
-   no required network request exists;
-   offline gameplay works.

A feature is not complete simply because code was written.

It is complete when it has been **verified in the playable game**.

------------------------------------------------------------------------

## 25. Conflict Rule

Order of authority:

1.  **Explicit latest instruction from the project owner**
2.  **Approved DEPLOY scope**
3.  **`GEBING-PROJECT-HANDOVER.md`**
4.  **This `AGENTS.md`**
5.  Existing implementation assumptions

If requirements conflict or are ambiguous, report the conflict and
request clarification before making a destructive change.

------------------------------------------------------------------------

## Final Reminder

**GEBING is an existing competition project, not a blank coding
exercise.**

Protect working functionality.

Protect educational quality.

Protect offline compatibility.

Protect local identity.

Protect competition compliance.

And always follow:

> **PRESERVE → UNDERSTAND → PLAN → MODIFY → TEST → VERIFY**

**No source-code modification before the explicit command: `DEPLOY`.**
