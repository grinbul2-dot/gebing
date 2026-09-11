# GEBING - Things Around Me

Game creator: Suryo Agung Nugroho, S.Pd. / SMP Negeri 1 Nglipar.
Updated: 10 September 2026.

## Learning design

The game uses simple English for Grade 7 learners working at A1-A2. It has four areas: School Sprint, Household Launch, Neighborhood Rush and Crystal Finale. Each has a bank of 50 mission questions, a run of 12 missions, a three-step contextual Final Challenge and 10 test questions. The focus is reading clues, using words and making choices. Speaking and free writing need extra class tasks.

| Goal | Practice | Evidence |
|---|---|---|
| Name useful things and places | Choose from daily-life clues | First answers and test results |
| Use simple sentences | This/that/these/those and where | Sentence and position questions |
| Read more than one clue | Times, steps and daily needs | Connect and Solve missions |
| Choose a useful action | Help people in each area | Final missions and tests |
| Get at least 70% | Ten questions per test | Results, badges and certificate |

Some tasks ask learners to use two or more clues. The game does not claim that all questions are higher-order questions. It does not measure every curriculum goal.

## Rules and saved results

- Each run starts with 3 lives. Wrong answers, collisions with obstacles, missed shots, wrong lanes and mission time-outs cost one life. There is a short grace period after a school hazard.
- At zero lives, Game Over stops the run. Try area again starts at mission 1. Leaving and returning does not refill a saved run's lives.
- Normal mode: 60 seconds per mission and 45 seconds per test question. Easy mode: 90 and 60 seconds. A test time-out is a wrong answer. Tests have no life counter.
- A pause, a message or a hidden game window stops the clock. Cut and impact effects finish before a mission can time out.
- Practice records the first answer without a hint. Fixing an answer does not change that first result. Game points and movement mistakes do not change test scores.
- Each test has 10 questions. A correct answer gives 10 points. A score of 70 opens the next area. Questions and choices are shuffled.
- The best score keeps a badge. The latest score and all test attempts stay in the teacher results. The certificate uses the average of four best scores: Bronze 70-79.99, Silver 80-89.99, Gold 90-100.
- Repeated tests use the same bank, not new questions. Earlier practice may help later scores.
- Reset Progress asks for confirmation. It resets only the active player's progress, keeps their name and picture, and turns off test mode. Other profiles stay unchanged.
- SECRET CODE accepts SURYO AGUNG. It opens maps without adding grades, badges or a certificate. It is a local test feature, not a password system.

## Technical notes

The game uses local HTML, CSS and JavaScript with no build step or online service. The screen scales from a 1280 by 720 stage. All assets are in the package. Browser localStorage keeps profiles. These are local players, not online accounts. The CSV export is a copy of results, not a class sync service.

The animation layer uses separate leg movement for the robot, a moving human runner, stretched sling bands, a curved ball path, falling blocks and two moving cut pieces. The runner uses three source poses, then mirrored poses for the other half of the stride. All animation follows the game clock.

## Asset records

| Asset | Source and use |
|---|---|
| assets/world.webp | Original generated world illustration; prompt below |
| assets/sprites.webp | Original generated 4 by 4 atlas; prompt below; 1254 by 1254 pixels |
| assets/runner-six-frame.png | Original generated human runner sheet; three poses used with mirrored poses |
| Four home-screen logos | Supplied by the user; copied without changes; original names and artwork preserved |
| assets/quest-bold.woff | DejaVu Sans Bold; licence in FONT-LICENSE.txt |
| Small icons and avatars | Unicode characters shown by the device font |
| Music and effects | Web Audio synthesis in game.js; no third-party music recordings |
| Questions and code | Developed from the user's brief with ChatGPT assistance; reviewed for the current game rules |

The public Credits & Sources screen uses a short creator and learning-source layout. These technical records keep the asset history and original prompts for project documentation.

## Source documents

1. BSKAP Decision 046/H/KR/2025, English, Phase D: https://bpmpbabel.kemendikdasmen.go.id/PPID/wp-content/uploads/2025/07/KepKaBSKAP-046_2025-ttg-CP.pdf.
2. The ministry teaching guide for disaster-affected learning, PDF pages 33-34, was used in the original reading-goal review: https://gurupaudpnf.kemendikdasmen.go.id/cms/uploads/Petunjuk_Teknis_Penyelenggaran_Pembelajaran_Terdampak_Bencana_68992a2c1e.pdf. The source is labelled as a draft. Game wording is a short summary, not a direct quote from the decision.
3. Festival Biru Putih 2026 guide, uploaded by the user, Chapters II-III and Appendix 1.

The game does not fetch these links. Before submission, the entrant still needs to provide their own entry forms, school details, signatures and other required records.

## Checks and demo

Checks use the JavaScript engine and canvas renderer: 252 content entries (200 main missions, 12 final tasks and 40 test questions); 36 area/level/target cases; map gates at 60 and 70; first-answer scoring; best/latest scores; badges; certificate; keyboard aliases; manual shots; swipe segments; pause effects; three-life Game Over; timed missions and tests; saved lives; reset isolation; four local logos; and English visible text. These are not physical phone, IFP or classroom tests.

Demonstrasi.mp4 uses scripted inputs on the same game engine. It is not a recording of students. Classroom learning gains have not been measured.

## Original world and atlas prompts

> Use case: stylized-concept

> Asset type: original illustration for the English learning adventure game GEBING, used as both in-game world map and start-screen background.

> Primary request: A wide 16:9 lush floating-island world map. Polished colorful 3D clay adventure game illustration with saturated emerald and turquoise grassy islands. Warm coral-roof school campus on the left island, cozy home in the center, little neighborhood buildings on the right island, and a glowing violet crystal mountain in the distance. Curved cream paths and small bridges link the islands. Atmospheric navy and teal sky with soft mist.

> Composition/framing: panoramic 16:9 landscape, elevated three-quarter isometric view, the entire floating world visible with breathing room at edges; distinct landmarks arranged left-center-right, keep the central foreground grassy and navigable with useful negative space for overlay game UI. Rich depth and beautiful chunky miniature diorama forms.

> Lighting/mood: welcoming magical adventure, soft warm sunlight and luminous violet crystal glow, playful and polished.

> Constraints: exactly one image. No text, no lettering, no logos, no watermark, no characters, no recognizable IP references. The image itself must be scenery, not a mockup or screenshot of a user interface.

> Use case: stylized-concept

> Asset type: production sprite atlas for GEBING, an original English learning adventure game.

> Primary request: Generate ONE 1024x1024 square RGBA PNG sprite atlas with a genuinely transparent background. Exactly 4 columns by 4 rows, 16 equally sized cells, each cell 256x256 pixels. No visible grid lines. Place one isolated object at the exact center of each cell, keeping each object entirely inside the middle 180x180 area of its cell with generous empty transparent gutters, so the atlas can be cut by exact uniform coordinates for drawImage use. Every object uses the same polished original colorful 3D clay miniature style, smooth rounded forms, soft warm upper-left illumination, emerald and turquoise palette with warm coral and violet accents, matching a lush floating-island adventure world.

> Composition and cell order, strict row-major from upper-left:

> Row 1: open book; ruler; pencil; school bag.

> Row 2: spoon; plate; cooking pan; toothbrush.

> Row 3: school building; library bookshelf; cozy house; hospital building.

> Row 4: friendly small teal robot explorer full body; teal scooter; glowing violet crystal; leafy tree.

> Constraints: exactly sixteen isolated objects, exactly four columns and four rows, perfectly uniform cell centers at x=128,384,640,896 and y=128,384,640,896. Objects fully visible, consistent visual scale and generous padding. Truly transparent background, not a checkerboard illustration. No text, letters, numerals, logos, borders, frames, captions, ground planes, environmental scenery, or shadows crossing cells. No brand or known character references. No additional objects. Hospital may use a simple medical plus symbol without lettering. Do not produce variants.

## Human runner prompt

> Original transparent sprite sheet for an English learning game. Human teenage runner viewed from behind, teal sports shirt, navy shorts, white shoes, friendly stylized 3D art. Six horizontal cells, same full-body size and position, different running strides with alternating arms and legs. No labels, logos, scenery or known characters.

## Adventure update: six connected features

- Movement is the answer. School collisions, projectile impacts, lane gates and card cuts grade the chosen option. Aim/focus controls never check correctness or reveal the correct target. The support shot flies to the learner-selected aim, including a wrong target.
- Restoration uses unique completed missions: lighting at four, plants at eight, full life at twelve. The world background regains colour gradually. Replay cannot increase restoration past twelve. Original local raster assets are reused.
- Four contextual Final Challenges each have three linked tasks: Ready for Art, Lunch at Home, Two Jobs in Town, A Place to Study. They have their own three-life saved run. New players must finish the final challenge before the area test.
- My Word Book collects word/phrase cards with local images or icons, explanations and contextual questions. Wrong mission, final and test answers flag practice. Two correct practice responses clear a weak card; another wrong response resets its practice count. Practice has no timer, life cost, game points or test-score effects.
- Each area has three mastery stars: twelve completed missions, correct first responses without hints on twelve distinct question IDs, and final-challenge completion. Clean responses can be earned on a later new run, but repairing an error in the current run does not rewrite the first response. Earned stars persist without duplication.
- Classic, Ocean Blue (3), Sun Gold (6), Purple Star (9), and Crystal Light (12) are fixed cosmetic rewards. Local sprite colour filters change the robot and human runner. No random rewards, purchases, lives or score advantages.
- Existing v1 profiles migrate additively: preserve all tests, badges, points and certificates. Completed old missions restore their world and award the completion star; no old score is treated as proof of hint-free mastery or final completion. Previous test takers retain test access. Reset clears only the active profile, including new adventure fields.
- Certificate includes all four supplied logos, with original logo wording unchanged. UI, instruction text and challenge content use simple English.

Verification: tools/verify-adventure.cjs exercises actual canvas-engine physics across 36 target/level cases, final checkpoints, all tests, first-answer persistence, hints, timers, lives, mastery, cosmetics, practice and migration. tools/harness.cjs is the shared Node VM/canvas harness. Demonstrasi.mp4 uses scripted engine inputs, not a classroom recording. Browser and classroom testing remain a separate review activity.

## School collision correction

School damage now checks the character body against the same obstacle rectangles used for drawing. Landing on clear ground does not imply a failed answer or cost a life. The former proximity-based jump-failure heuristic was removed because it penalised safe obstacle jumps near answer platforms. Real obstacle collisions still cost one life with a grace period. Wrong answers and time-outs remain unchanged. The targeted regression covers both obstacles, both directions, Easy and Normal mode, top-edge clearance, ordinary landings, actual contact and single-hit protection.

## Visual and feedback update

The start screen uses the original local world, robot and crystal assets with a bold game title, four play styles and the four supplied logos. The map marks the next unfinished world and displays twelve mission progress segments. Each arena has its own accent colour and local background sprites. The selected aim or lane has a visible focus state, without checking or revealing correctness. Jump rings, a runner trail, short success callouts, a combo banner and a three-note completion sound provide immediate feedback. Settings > Less background movement and the device reduced-motion preference suppress extra motion. All effects are local and cosmetic: obstacle collision fixes, lives, timers, tests, stars, rewards and saved progress keep their existing rules. polish.js contains this presentation layer.

## Question bank and flying Cut update

question-bank.js preserves the original 12 mission questions in each area and adds 38 authored questions per area. Stable IDs identify all 200 questions. Each question has three unique choices, one correct answer and a short explanation. The main bank does not replace the 40 test questions or 12 linked final tasks. Each new run draws four questions at each of three levels, without duplicate IDs. The immediately previous new-run packet is excluded; later runs may repeat questions. Choices are shuffled. Checkpoints keep the packet, current option order, remaining clock, lives and first-answer/hint flags. Old checkpoints continue the original packet. Mastery counts distinct clean question IDs; repeated answers to the same ID cannot increase mastery. Earlier earned stars stay saved.

cut-flight.js uses six original generated robot sword poses and a fruit-crate sheet. The hero winds up, flies to the selected crate, swings, follows through and lands. The selected answer is graded once at sword impact. Two clipped crate pieces separate, spin and fall, with small wood particles. A wrong cut costs one life; its feedback waits until the cut ends. A fatal wrong cut shows Game Over immediately. Keyboard, click and swipe share the same grading gate. Pause and hidden windows freeze the animation. Reduced motion uses short pose changes without flight trails or particle effects. The clock is held during the committed move.

New assets: assets/robot-sword-black.png and assets/fruit-crates-black.png. Created with image generation from the existing original robot design. Transparency generation returned an RGB matte, so one black-background edit was used and the images are drawn with screen compositing on the dark arena. The original prompts and the exact black-matte edit prompt are retained in assets/cut-art-prompts.txt. No third-party character or music recording was added.

Targeted verification: tools/verify-bank-cut.cjs covers all bank counts and answer schemas, balanced random packets, consecutive packet separation, resume order and clock, legacy checkpoints, impact timing, single-life loss, retry scoring, pause/hidden animation, reduced motion, click/swipe/keyboard controls, and no duplicate mastery credit.
