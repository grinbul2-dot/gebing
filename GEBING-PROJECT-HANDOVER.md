# GEBING --- PROJECT HANDOVER DOCUMENT

## Game Edukasi Bahasa Inggris --- *Things Around Me*

**Project owner:** Suryo Agung Nugroho, S.Pd.\
**Institution:** SMP Negeri 1 Nglipar\
**Target:** Junior High School / SMP, Phase D\
**Primary purpose:** Educational Game Competition --- Festival Biru
Putih 2026\
**Project type:** Offline-capable HTML5 educational web game\
**Working title:** **GEBING --- Game Edukasi Bahasa Inggris: Things
Around Me**\
**Document purpose:** This file is the authoritative handover brief for
any AI coding agent or developer continuing this project.

------------------------------------------------------------------------

## 1. READ THIS FIRST --- NON-NEGOTIABLE INSTRUCTIONS

Before modifying anything:

1.  Read the entire project and this document.
2.  Inspect the existing file structure, code, question bank, assets,
    game states, local storage, controls, scoring, and navigation.
3.  Run the current build and identify which features already work.
4.  **Preserve working features.**
5.  Do not perform a full rewrite merely to make the architecture
    cleaner.
6.  Do not delete, replace, or simplify existing functionality without a
    clear reason.
7.  Do not introduce external dependencies that break offline operation.
8.  Do not modify code until the user explicitly gives the command
    **DEPLOY**.
9.  Before DEPLOY, discussion, analysis, specifications, mockups, and
    implementation plans are allowed, but source-code changes are not.
10. After every implementation, test the complete game rather than only
    the changed component.

**Development principle:**

> PRESERVE → UNDERSTAND → PLAN → MODIFY → TEST → VERIFY

------------------------------------------------------------------------

## 2. PROJECT IDENTITY

The product name is:

# GEBING

### Game Edukasi Bahasa Inggris

### *Things Around Me*

GEBING is an English educational adventure game for SMP students. It
combines English learning with arcade-style gameplay, contextual
missions, assessment, and a distinctive local Javanese identity.

The game must not become merely a quiz with decorative animation.
Learning activities should be meaningfully integrated into gameplay.

### Core identity

-   English learning
-   SMP / Phase D
-   Theme: **Things Around Me**
-   Adventure / arcade educational game
-   Local Javanese atmosphere
-   Contextual learning
-   Multiple interaction types
-   Offline-capable
-   Smartphone, tablet, laptop, and interactive-display friendly
-   Original visual identity

------------------------------------------------------------------------

## 3. BRANDING DIRECTION

Replace older primary branding such as **Word Crystal Quest** with
**GEBING** where appropriate.

Recommended hierarchy:

**GEBING**\
*Game Edukasi Bahasa Inggris*\
**THINGS AROUND ME**\
*A Javanese English Adventure*

"Word Crystal Quest" may be retained only as an internal story element,
mission, world, collectible concept, or other secondary element if
useful. It should no longer compete with GEBING as the main product
identity.

The local identity must be expressed through the game world, characters,
environment, story, motifs, objects, and atmosphere---not merely by
placing a blangkon on an otherwise generic game.

------------------------------------------------------------------------

## 4. LEARNING TARGET

The game teaches English related to **Things Around Me** for SMP
learners.

Language should generally be accessible at approximately **CEFR
A1--A2**, while cognitive challenge may progress beyond simple
vocabulary recall.

Learning should include, where appropriate:

-   objects and their functions;
-   places;
-   position / location words;
-   directions;
-   time and schedules;
-   jobs / people around us;
-   instructions and sequences;
-   interpreting visual information;
-   combining clues;
-   selecting solutions based on context.

Avoid making the entire question bank simple vocabulary recognition.

------------------------------------------------------------------------

## 5. COMPETITION DESIGN PRIORITIES

The project is intended for the **Festival Biru Putih 2026 ---
Educational Game category**.

The design should prioritize:

### Substance --- 60%

-   curriculum relevance;
-   content accuracy;
-   depth of material;
-   independent learning;
-   integrated assessment.

### Media --- 25%

-   functionality;
-   visual/audio quality;
-   game mechanics;
-   feedback and rewards;
-   navigation and instructions.

### Innovation & Creativity --- 15%

-   originality;
-   contextualization;
-   attractiveness.

The strongest version of the project should therefore prioritize
**learning depth and reliability**, not an endless accumulation of
cosmetic features.

------------------------------------------------------------------------

## 6. CURRENT GAME CONCEPT

The game is structured around four major worlds/maps.

### WORLD 1 --- School Sprint

Primary context: school.

Possible mechanics: - running/jumping to answers; - identifying school
objects; - matching objects with their uses; - schedules; - sentence or
sequence puzzles.

### WORLD 2 --- Household Launch

Primary context: home.

Possible mechanics: - shooting/selecting targets; - identifying
household objects; - grouping objects by room; - arranging household
activities or instructions.

### WORLD 3 --- Neighborhood Rush

Primary context: neighborhood / Nglipar / Gunungkidul-inspired
environment.

Possible mechanics: - running to a correct gate/location; - reading a
simple map; - directions; - route selection; - interpreting
environmental clues.

### WORLD 4 --- Crystal Finale

Primary role: final/challenge world.

Possible mechanics: - slash/cut answer targets; - visual-statement
verification; - multi-clue challenges; - mixed interaction puzzles; -
final mastery challenge.

The exact names may be localized further later. Do not rename them
without user approval.

------------------------------------------------------------------------

## 7. CHARACTER DIRECTION

Use **one consistent original protagonist** across the four worlds.

Current creative direction:

**A young Javanese adventurer with subtle wayang influence.**

Possible visual characteristics: - blangkon; - lurik-inspired
clothing; - batik accents; - small adventure bag; - expressive cartoon
face; - subtle wayang-inspired hand poses or silhouette language; -
readable animation suitable for a game.

Do not copy a copyrighted modern character.

The character should remain recognizably the same person across all
maps.

Possible world-specific equipment: - running/jumping: normal adventure
form; - shooting mechanic: simple wooden slingshot; - final cut
mechanic: simple fantasy/adventure sword.

Avoid graphic violence. Targets should be appropriate for an educational
game.

------------------------------------------------------------------------

## 8. LOCAL CONTEXT

Local Javanese/Gunungkidul/Nglipar flavor should be integrated
naturally.

Potential settings include: - school; - library; - canteen; -
traditional or semi-rural house; - market; - neighborhood; - village
road; - park; - community environment.

Use culturally appropriate motifs and environmental details.

Local culture should support contextualization rather than distract from
English learning.

------------------------------------------------------------------------

## 9. QUESTION BANK

Target bank:

**200 questions total** - 50 questions per world/map; - approximately 12
missions/questions selected per playthrough; - questions randomized from
the relevant bank; - no duplicate question within one run; -
answer/options randomized where appropriate.

Question packages should remain stable at checkpoints so that accidental
refreshes or state changes do not unfairly alter an active mission.

Each item should ideally contain: - prompt; - interaction type; - answer
data; - explanation/feedback; - competency/category; - difficulty; -
optional image/asset reference; - optional contextual information.

All questions must have a defensible correct answer.

Distractors should be plausible.

------------------------------------------------------------------------

## 10. REQUIRED INTERACTION VARIETY

Do not make the game almost entirely ordinary multiple choice.

Supported/planned interaction types:

1.  Single choice --- variable number of options, usually 3--5 or as
    pedagogically appropriate.
2.  True / False.
3.  Matching --- approximately 3--5 pairs.
4.  Dropdown / fill-the-gap.
5.  Sequence puzzle.
6.  Sentence-order puzzle.
7.  Grouping / categorization.
8.  Image hotspot / visual selection.

A playthrough should contain a sensible mixture rather than every
mission using the same interaction.

Do not force exactly three options for every multiple-choice question.

------------------------------------------------------------------------

## 11. VISUAL QUESTIONS

Some questions should use images as **necessary information**, not
merely decoration.

Examples: - desk/classroom scene; - town/neighborhood map; - schedule; -
object arrangement; - visual sequence; - room scene.

A learner should sometimes need to inspect the image in order to answer.

Keep visual information clear and readable on smaller screens.

------------------------------------------------------------------------

## 12. DIFFICULTY PROGRESSION

Questions should progress approximately through:

**Easy → Medium → Challenge**

Avoid equating "harder" only with longer text.

Higher challenge may require: - applying vocabulary; - interpreting
context; - combining two or more clues; - reading a map/schedule; -
choosing an appropriate route/action; - arranging steps; - detecting
relationships; - solving a small language problem.

------------------------------------------------------------------------

## 13. SCORING AND LEARNING ASSESSMENT

Learning score must remain distinct from arcade performance.

Do not allow: - combo; - movement speed; - cosmetic rewards; - rapid
tapping

to artificially inflate academic mastery.

For multi-step interactions: - moving a card or changing a dropdown is
not automatically an incorrect answer; - use a **Check** action when
appropriate; - one incorrect submitted attempt should cause at most one
relevant penalty/life loss; - show which parts were correct/incorrect; -
provide a short explanation; - allow correction where appropriate; -
retain first-attempt data for learning analytics.

A mastery/star reward should preferably represent successful learning,
not merely speed.

------------------------------------------------------------------------

## 14. COMPETENCY REPORT

The end-of-game or progress report should communicate more than a single
score.

Suggested competencies:

-   Objects
-   Places
-   Position Words
-   Following Steps
-   Times
-   Jobs

The report may show: - score; - accuracy; - competency mastery; -
first-attempt performance; - strengths; - areas needing practice.

Keep academic results separated from arcade metrics such as combo or
speed.

------------------------------------------------------------------------

## 15. FEEDBACK

Avoid feedback that only says:

> Wrong!

Use concise diagnostic feedback.

Example:

> Not quite. A toothbrush is used to clean your teeth.

For matching/order activities, indicate the incorrect component where
practical.

Feedback must be immediate, readable, age-appropriate, and useful for
independent learning.

------------------------------------------------------------------------

## 16. INSTRUCTIONS AND TUTORIALS

Every mechanic must have clear instructions.

For unfamiliar interaction types, provide a very short
demonstration/instruction before use.

A full practice tutorial is optional unless later approved, but learners
must never be expected to guess how an interaction works.

Instructions should be: - short; - visual where useful; - replayable
where practical; - suitable for SMP learners.

------------------------------------------------------------------------

## 17. TEACHER EDITOR --- PLANNED FEATURE

A Teacher Editor is planned.

Potential editable data: - interface text; - question prompt; -
options; - correct answer; - explanation; - competency; - difficulty; -
interaction type; - local image reference; - matching pairs; -
sequence/order data; - groups; - True/False data.

Desired functions: - preview; - validation; - export; - import; -
restore defaults.

The editor must not introduce a server requirement.

Do not implement a complicated content-management system if it risks
game reliability.

------------------------------------------------------------------------

## 18. TECHNICAL CONSTRAINTS

These constraints are important.

### Core technology

-   HTML5 web game;
-   HTML/CSS/JavaScript or similarly browser-native structure;
-   no mandatory build process for the final competition package if
    avoidable;
-   modern browser compatible.

### Offline

The final competition build must work offline after extraction.

Therefore: - all required assets must be local; - do not depend on a
CDN; - do not require remote fonts; - do not require an external API; -
do not require a server; - do not require an internet connection for
core gameplay.

### Entry point

`index.html` must exist at the **root of the final ZIP**.

Expected:

    GEBING.zip
    ├── index.html
    ├── ...
    └── assets/

Not:

    GEBING.zip
    └── GEBING/
        └── index.html

### SPA

Keep the game effectively a **Single Page Application**.

Do not redirect gameplay to separate external HTML pages.

### Display

-   target aspect ratio: 16:9;
-   responsive;
-   laptop;
-   tablet;
-   smartphone;
-   touch-friendly controls.

### Performance

Target load time per level should remain within approximately **5
seconds** on reasonable competition hardware.

### Package size

Aim for a compact package, preferably around or below **25 MB** where
practical.

The competition package hard ceiling is **150 MB including required
supporting materials**.

Do not inflate the project with unnecessarily large assets.

------------------------------------------------------------------------

## 19. EXTERNAL DEPENDENCIES --- IMPORTANT

Before final submission, audit the project for:

-   Google Fonts;
-   CDN scripts;
-   remote images;
-   analytics;
-   external audio;
-   remote APIs;
-   third-party trackers;
-   external embedded media.

Remove or localize anything required by the game.

The game must still function when the computer is disconnected from the
internet.

------------------------------------------------------------------------

## 20. ASSET AND COPYRIGHT COMPLIANCE

All assets must have traceable origins.

For each asset, know whether it is: - original; - created by the project
owner; - appropriately licensed; - open/royalty-free with attribution
where required; - AI-generated.

Do not use: - copyrighted game characters; - unlicensed music; -
watermarked images; - commercial logos unless explicitly permitted; -
copied assets from Final Fight, Punisher, Three Kingdoms, or other
reference games.

Those games are **gameplay inspirations only**, not asset sources.

------------------------------------------------------------------------

## 21. AI-GENERATED ASSETS

Festival compliance is critical.

If an image/asset is AI-generated, maintain: - an AI-generation
disclosure; - the design/prompting documentation; - an asset source
record.

Required disclosure should follow the competition guide, including the
appropriate statement that the image was created by AI.

Maintain a separate asset-source document for final submission.

Do not silently replace documented assets with undocumented generated
ones.

------------------------------------------------------------------------

## 22. PUBLICATION RISK

The competition guide includes an originality/non-previous-publication
requirement.

A development build has previously existed online.

Do **not** promote, publicly distribute, or unnecessarily republish the
competition build until the exact interpretation of "previously
published" has been confirmed with the competition organizer.

Do not assume that a development URL is automatically safe or
automatically disqualifying. Treat this as an unresolved compliance item
requiring confirmation.

------------------------------------------------------------------------

## 23. REQUIRED SUBMISSION SUPPORT

Prepare the final project so it can be accompanied by:

-   final game ZIP;
-   PDF user guide;
-   demonstration video, maximum approximately 3 minutes according to
    the competition requirements;
-   asset/source documentation;
-   AI prompting/design documentation where applicable.

These supporting files should not be unnecessarily embedded inside
runtime assets.

------------------------------------------------------------------------

## 24. GAMEPLAY QUALITY RULES

Enemies/challenges should feel active enough for the game to be
entertaining, but gameplay must never overwhelm learning.

Preserve or improve: - responsive controls; - clear hit/interaction
feedback; - readable HUD; - sensible life system; - fair timers; -
combo/special-action excitement where already implemented; - clear Game
Over and restart flow; - fresh-start/reset behavior.

Do not turn educational failure into excessive punishment.

------------------------------------------------------------------------

## 25. ACCESSIBILITY / USABILITY

Prioritize: - large readable text; - strong contrast; - clear non-italic
game fonts; - touch targets large enough for mobile/IFP use; - no
essential information hidden by animation; - no unnecessary scrolling
during core gameplay; - clear buttons/icons; - consistent navigation; -
sound toggle; - full-screen support where appropriate.

The game should remain usable even if audio is unavailable.

------------------------------------------------------------------------

## 26. CONTENT LANGUAGE

Interface language may use Indonesian where it helps students understand
gameplay.

English learning content should use simple, appropriate English.

Do not unnecessarily make instructions linguistically difficult.

The game should teach English, not test the student's ability to decode
complicated game instructions.

------------------------------------------------------------------------

## 27. CURRENT DEVELOPMENT PRIORITIES

Before adding large new systems, prioritize:

**Priority 1 --- Learning depth** Improve question quality, context,
progressive difficulty, and application of language.

**Priority 2 --- Interaction variety** Implement and stabilize matching,
True/False, dropdown, puzzles, grouping, and image-based tasks.

**Priority 3 --- Local identity** Integrate the original Javanese
protagonist and authentic contextual environment.

**Priority 4 --- Learning feedback** Diagnostic explanations and
competency reporting.

**Priority 5 --- Reliability** Cross-device QA, offline QA, performance,
state management, question validation, and complete-playthrough testing.

**Priority 6 --- Submission readiness** Asset audit, AI disclosure,
documentation, guide, demo, package size, and final ZIP structure.

Do not prioritize decorative features over these six items.

------------------------------------------------------------------------

## 28. DO NOT DO THESE THINGS

An AI coding agent continuing this project must NOT:

-   rewrite the whole game without approval;
-   delete existing working modes;
-   replace working code simply because another framework is preferred;
-   introduce React/Vue/Phaser/etc. merely for architectural preference;
-   add online APIs for core functions;
-   add a login requirement;
-   add advertisements;
-   add analytics/tracking;
-   use copyrighted character assets;
-   use remote fonts in the final offline build;
-   hard-code most correct answers into option A;
-   reduce all questions to three-option multiple choice;
-   merge learning score with arcade score;
-   remove local identity;
-   rename the project without approval;
-   change competition requirements based on assumptions;
-   modify source code before the explicit command **DEPLOY**.

------------------------------------------------------------------------

## 29. FIRST TASK FOR A NEW AI CODING AGENT

When this project is first opened in Jules, Google Antigravity, or
another coding agent, perform ONLY an audit.

Return a report containing:

1.  project file structure;
2.  entry point;
3.  architecture;
4.  game states/screens;
5.  existing four-world implementation;
6.  controls;
7.  question-data structure;
8.  current number and types of questions;
9.  scoring/lives/timer implementation;
10. local-storage/progress system;
11. audio implementation;
12. asset inventory;
13. external network dependencies;
14. mobile/responsive behavior;
15. existing local/Javanese elements;
16. Teacher Editor status;
17. offline readiness;
18. bugs or broken references;
19. competition-compliance risks;
20. features already implemented versus features only planned.

**Do not modify files during this audit.**

Finish the audit by proposing a prioritized implementation plan.

Wait for the user to say:

# DEPLOY

before changing source code.

------------------------------------------------------------------------

## 30. POST-DEPLOY TEST CHECKLIST

After any significant implementation, verify at minimum:

-   `index.html` opens successfully;
-   game can start;
-   all four worlds are reachable;
-   questions load;
-   answers can be submitted;
-   correct answers are recognized;
-   wrong answers behave correctly;
-   option randomization does not break answer keys;
-   no duplicate questions occur unexpectedly within a run;
-   matching works;
-   True/False works;
-   dropdown works;
-   puzzle/order works;
-   grouping/hotspot works where implemented;
-   lives work;
-   timers work;
-   scoring works;
-   competency data works;
-   progress saving works;
-   reset/fresh start works;
-   Game Over works;
-   end-of-game report works;
-   sound toggle works;
-   keyboard works;
-   touch controls work;
-   smartphone layout works;
-   tablet layout works;
-   laptop layout works;
-   no essential screen requires unwanted scrolling;
-   no console-breaking errors;
-   no missing local assets;
-   no required network requests;
-   offline mode works;
-   final ZIP opens with `index.html` at root.

A feature is not considered complete merely because its code exists. It
must be playable and tested.

------------------------------------------------------------------------

## 31. DEFINITION OF SUCCESS

GEBING should feel like a **real game that teaches English**, not a
digital worksheet with a game skin.

A successful final version should make a competition judge quickly
understand:

1.  what students are learning;
2.  why the gameplay supports that learning;
3.  what makes the game original;
4.  how the local Javanese context is meaningful;
5.  how student performance is assessed;
6.  how students can learn independently from feedback;
7.  that the product is technically stable and genuinely
    offline-capable.

The goal is not to maximize the number of features.

The goal is to deliver a **coherent, original, educational, enjoyable,
reliable, and competition-ready game.**

------------------------------------------------------------------------

## 32. AUTHORITATIVE PROJECT RULE

If an AI agent's assumption conflicts with this document, **stop and ask
the project owner before implementing the conflicting change**.

If the existing source code conflicts with this document, report the
conflict first. Do not silently rewrite the project.

**Project command protocol:**

-   **Before "DEPLOY"** → analyze, discuss, design, audit, plan.
-   **After "DEPLOY"** → implementation is authorized within the
    approved scope.

------------------------------------------------------------------------

**END OF HANDOVER DOCUMENT**
