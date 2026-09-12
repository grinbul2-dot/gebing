/* Bank konten: jawaban benar selalu ditulis pertama di sumber, lalu DIACAK saat tampil.
   Format: pertanyaan, [jawaban benar, pengecoh, pengecoh], penjelasan, ikon, kompetensi. */
const AREA_META=[
 {
  "name": "School Sprint",
  "place": "School",
  "tag": "RUN · JUMP · LEARN",
  "icon": "🎒",
  "color": "#52e5bb",
  "badge": "School Master",
  "guide": "Nara",
  "desc": "Explore the school. Find things and rooms from the clues.",
  "controls": "A D / ← → move • W / Space / Z jump • S duck • You can use the screen buttons too",
  "vocab": [
   [
    "ruler",
    "Use it to draw straight lines."
   ],
   [
    "library",
    "Read and borrow books here."
   ],
   [
    "canteen",
    "Buy food at school here."
   ],
   [
    "science",
    "Learn about plants, animals and the world."
   ],
   [
    "English",
    "The language in this game."
   ],
   [
    "art",
    "Draw and paint pictures."
   ],
   [
    "next to",
    "Beside something."
   ]
  ]
 },
 {
  "name": "Household Launch",
  "place": "Home",
  "tag": "READ · AIM · SHOOT",
  "icon": "🏡",
  "color": "#ffbe68",
  "badge": "Home Hero",
  "guide": "Bimo",
  "desc": "Help people at home. Choose the right thing, then aim and shoot.",
  "controls": "Choose an answer • Pull the ball back and let go • Or use WASD to aim and Space / X / F to shoot",
  "vocab": [
   [
    "pan",
    "Cook soup in it."
   ],
   [
    "stove",
    "Use it to heat food."
   ],
   [
    "plate",
    "Put food on it."
   ],
   [
    "spoon",
    "Use it to eat soup."
   ],
   [
    "between",
    "In the middle of two things."
   ],
   [
    "under",
    "Below something."
   ],
   [
    "toothbrush",
    "Use it to clean your teeth."
   ]
  ]
 },
 {
  "name": "Neighborhood Rush",
  "place": "Town",
  "tag": "READ · RUN · EXPLORE",
  "icon": "🏃",
  "color": "#66c9ff",
  "badge": "Town Explorer",
  "guide": "Sari",
  "desc": "Run through the town. Read each clue and choose the right path.",
  "controls": "A D / ← → change lanes • W / Shift run faster • S slow down • You can tap a lane too",
  "vocab": [
   [
    "hospital",
    "Doctors help sick people here."
   ],
   [
    "post office",
    "Send letters here."
   ],
   [
    "market",
    "Buy fruit and vegetables here."
   ],
   [
    "farmer",
    "A person who grows food."
   ],
   [
    "doctor",
    "A person who helps sick people."
   ],
   [
    "park",
    "Walk and play outside here."
   ],
   [
    "police officer",
    "A person who helps keep people safe."
   ]
  ]
 },
 {
  "name": "Crystal Finale",
  "place": "Crystal Gate",
  "tag": "THINK · SWIPE · WIN",
  "icon": "💎",
  "color": "#c8a1ff",
  "badge": "Crystal Star",
  "guide": "Kira",
  "desc": "Use all the clues. Fly and cut the fruit box with your answer to find the last crystal.",
  "controls": "Swipe or click a fruit box • A D choose • Space / X cut • You can press 1–3 too",
  "vocab": [
   [
    "because",
    "Use this word to give a reason."
   ],
   [
    "need",
    "Something you must have."
   ],
   [
    "borrow",
    "Use a thing, then give it back."
   ],
   [
    "return",
    "Give something back."
   ],
   [
    "timetable",
    "A list of times for lessons or events."
   ],
   [
    "safe",
    "Away from danger."
   ]
  ]
 }
];
const Q=(text,options,why,icon='💬',skill='Meaning',type='choice',image=null)=>({text,options,answer:options[0],why,icon,skill,type,image});
const MISSIONS=[[
 Q('Draw a straight line. Which tool do you need?',['Ruler','Eraser','School bag'],'A ruler helps us draw straight lines.','📏','Things we use'),
 Q('A ruler is only used to rub out pencil marks.',['False','True'],'A ruler draws lines. An eraser rubs out marks.','📏','Things we use','truefalse'),
 Q('Look at the crates. Which fruit has the darkest crate?',['Grapes','Apples','Bananas'],'The crate with grapes is drawn in dark gray.','🍇','Things we use','choice','assets/fruit-crates-black.png'),
 Q('You made a mistake with your pencil. What do you need?',['Eraser','Pen','Chair'],'An eraser rubs out pencil marks.','✏️','Things we use'),
 Q('Match the object to the place.',['Book->Library', 'Stamps->Post Office', 'Fruit->Market'],'Books are borrowed at a library, stamps are sent at a post office, fruit is bought at a market.','📚','Places','matching'),
 Q('Order the cooking steps.',['Wash hands', 'Set plates', 'Serve food'],'First wash your hands to be clean, then set the plates, then serve the food.','🍽️','Follow steps','sequence'),
 Q('You need to borrow a storybook. Where should you go?',['Library','Canteen','Toilets'],'We borrow books from the library.','📚','Places'),
 Q('It is break time. You want to buy lunch at school.',['Canteen','Library','Science lab'],'The canteen sells food and drinks.','🥪','Places'),
 Q('Monday: 08.00 English, 09.00 Art. It is 09.00. Which lesson starts now?',['Art','English','Science'],'The timetable shows Art at 09.00.','🎨','Times and lessons'),
 Q('We study plants and test new ideas. Which lesson is this?',['Science','Art','English'],'In Science, we learn about plants and test ideas.','🔬','Times and lessons'),
 Q('The library is next to the classroom. Where is the library?',['Beside the classroom','Under the classroom','Inside a bag'],'Next to means beside.','🏫','Where things are'),
 Q('Rani holds a pencil close to her. Complete: What is ___?',['this','that','those'],'Use this for one thing near the speaker.','✏️','Sentences'),
 Q('Take your sketchbook and coloured pencils. Which lesson are you ready for?',['Art','PE','Mathematics'],'A sketchbook and coloured pencils are useful in Art.','🎨','Use the clues'),
 Q('You need a quiet place and a book about animals. Where is the best place?',['Library','Busy canteen','Football field'],'A library has books and is usually quiet.','📚','Use the clues'),
 Q('Your friend asks, “Is this a ruler?” It is a pencil. Choose a helpful reply.',['No, it is a pencil.','Yes, it is a ruler.','It is in the library.'],'Say no. Then name the right thing.','✏️','Sentences'),
 Q('It is time for Science. You must look closely at a leaf. What should you do?',['Take a leaf to the lab.','Take a ball to the field.','Buy lunch at the canteen.'],'The leaf and lab match the Science task.','🍃','Use the clues')
],[
 Q('Choose the object you use to brush your teeth.',['Toothbrush','Comb','Towel'],'A toothbrush cleans our teeth.','🪥','Things we use'),
 Q('You want to boil water. What can you put the water in?',['Kettle','Stove','Sofa'],'Put water in a kettle. A stove makes it hot.','🫖','Things we use'),
 Q('The soup is ready. Choose something to eat it with.',['Spoon','Pillow','Comb'],'We use a spoon to eat soup.','🥄','Things we use'),
 Q('Keep the milk cold. Where should you put it?',['Fridge','Wardrobe','Bookshelf'],'A fridge keeps food and drinks cold.','🥛','Places'),
 Q('Put one plate for each person. There are three people. Choose the right set.',['Three plates','Two plates','One plate'],'Three people need three plates, one each.','🍽️','Follow steps'),
 Q('The ball is below the table. Complete: It is ___ the table.',['under','on','between'],'Under means below something.','⚽','Where things are'),
 Q('A chair is between the bed and the desk. Where is it?',['In the middle of them','On the bed','Under the desk'],'Between means in the middle of two things.','🪑','Where things are'),
 Q('The towel is far from you. Ask about that one object.',['What is that?','What are these?','What is this?'],'Use that for one thing far away.','🧺','Sentences'),
 Q('You want to cook soup. You have a stove. What do you put the soup in?',['Pan','Plate','Glass'],'We can cook soup in a pan on a stove.','🍲','Use the clues'),
 Q('The floor is wet. Choose the safest first action.',['Dry it with a mop.','Run across the floor.','Put a pillow on it.'],'A mop dries the floor. This helps people stay safe.','🪣','Use the clues'),
 Q('Prepare a place to study at night. Choose the most useful pair.',['Desk and lamp','Bed and spoon','Fridge and towel'],'A desk and lamp help you read and write.','💡','Use the clues'),
 Q('Wash your hands, set the table, then eat. What happens before eating?',['Set the table','Go to bed','Brush your hair'],'Set the table first. Then eat.','🧼','Follow steps')
],[
 Q('You need to send a letter. Where should you go?',['Post office','Hospital','Park'],'We send letters at a post office.','✉️','Places'),
 Q('You need fresh vegetables for dinner. Where can you buy them?',['Market','Police station','Library'],'A market sells vegetables and other food.','🥕','Places'),
 Q('A person grows rice in a field. What is the job?',['Farmer','Doctor','Teacher'],'A farmer grows food, like rice.','🌾','Jobs'),
 Q('Who helps sick people?',['Doctor','Farmer','Postman'],'A doctor helps sick people get better.','🩺','Jobs'),
 Q('The park is opposite the market. Where is the park?',['Across from the market','Inside the market','Under the market'],'Opposite means across from something.','🌳','Where things are'),
 Q('You want to borrow a book, then send a letter. Choose the route.',['Library → post office','Market → hospital','Park → bank'],'Match each need to the correct place in order.','🗺️','Follow steps'),
 Q('The sign says “Keep the park clean.” What should you do?',['Put litter in a bin.','Leave paper on the grass.','Throw bottles into a pond.'],'Putting litter in a bin keeps the park clean.','♻️','Follow steps'),
 Q('“Where is the bank?” Choose a reply about its location.',['It is next to the market.','She is a doctor.','It is a pencil.'],'A where question asks about a place or position.','🏦','Sentences'),
 Q('A visitor in Nglipar needs fruit and a place to read. Choose two stops.',['Market and library','Hospital and bank','Station and police station'],'Buy fruit at the market. Read books at the library.','🍉','Use the clues'),
 Q('Your friend lost a bag in town. Who can help?',['Police officer','Farmer','Cook'],'Tell a police officer about the lost thing.','🎒','Jobs'),
 Q('The library closes at 15.00. It is 14.30. The park closes at 18.00. Which should you visit first?',['Library','Park','Either at 17.00'],'The library closes first. Visit it first.','🕒','Use the clues'),
 Q('Look at the character. What is he holding in his hand?',['A sword','A flower','A shield'],'He is holding a sword.','⚔️','Use the clues','choice','assets/robot-sword-black.png'),
 Q('You want exercise in fresh air. Choose the best plan.',['Walk in the park.','Sit inside the bank.','Wait at the post office.'],'Walking in the park matches both exercise and fresh air.','🌳','Use the clues')
],[
 Q('Art starts soon. Collect the best pair for drawing.',['Sketchbook + pencils','Plate + spoon','Towel + soap'],'Drawing uses a sketchbook and pencils.','🎨','Things we use'),
 Q('I am a place with books. You can borrow them, but you should be quiet.',['Library','Market','Canteen'],'Both borrowing books and quiet reading point to a library.','📚','Use the clues'),
 Q('“Is that a hospital?” The building is a bank. Choose the correct reply.',['No, it is a bank.','Yes, it is.','They are doctors.'],'It is a bank, so say no and name it.','🏦','Sentences'),
 Q('Put the cup on the table. Which position follows the instruction?',['On top of the table','Below the table','Beside the door'],'On means on top of something.','☕','Where things are'),
 Q('You need to clean your teeth, then dry your face. Select the correct order.',['Toothbrush → towel','Towel → ruler','Comb → plate'],'A toothbrush is for teeth, and a towel is for drying.','🪥','Follow steps'),
 Q('Tuesday: Science, then English. Which class follows Science?',['English','Art','PE'],'The timetable puts English after Science.','📅','Times and lessons'),
 Q('The teacher asks for a straight 10 cm line. Choose the tool and say why.',['Ruler: it helps me draw 10 cm.','Eraser: it holds water.','Bag: it draws lines.'],'A ruler helps you draw a straight 10 cm line.','📏','Use the clues'),
 Q('A farmer brings vegetables to sell. Where should the farmer go?',['Market','School lab','Bedroom'],'A market is a place to sell vegetables.','🥬','Jobs'),
 Q('Plan a study evening. Your room is dark and your books are on the floor. Choose the best action.',['Turn on a lamp. Put the books on the desk.','Put books in the fridge.','Turn off all lights and read.'],'The lamp gives light. Put your books on the desk to study.','💡','Use the clues'),
 Q('You have a letter and a library book to return. Both places are open. Choose a useful route.',['Post office → library','Park → canteen','Bank → market'],'You can send the letter and return the book.','✉️','Use the clues'),
 Q('One book is near you; two bags are far away. Choose the correct sentence.',['This is a book. Those are bags.','These is a book. That are bags.','That are a book. This is bags.'],'Use this for one thing near you. Use those for two or more things far away.','📚','Sentences'),
 Q('Our class visits a park. We need drinking water and a clean area. Choose the best plan.',['Bring water bottles and use the bins.','Bring only pillows and leave litter.','Bring plates but no water.'],'Bring water to drink. Use bins to keep the park clean.','🌿','Use the clues')
]];
const TESTS=[[
 Q('You need to measure a notebook. What do you use?',['A ruler','A bag','A chair'],'A ruler measures length.','📏','Things we use'),
 Q('Where can students buy a snack at school?',['At the canteen','At the library','At the laboratory'],'The canteen is the place to buy food.','🥪','Places'),
 Q('A student is holding one book. Complete: ___ is a book.',['This','These','Those'],'Use this for one thing near you.','📘','Sentences'),
 Q('08.00 Art; 09.00 English; 10.00 Science. What follows English?',['Science','Art','PE'],'Science follows English at 10.00.','📅','Times and lessons'),
 Q('We learn about plants and animals in ___.',['Science','PE','Art'],'Plants and animals are studied in Science.','🍃','Times and lessons'),
 Q('The canteen is beside the library. “Beside” means ___.',['next to','under','inside'],'Beside and next to describe the same position.','🏫','Where things are'),
 Q('“Is this a pen?” You see a ruler. Choose the correct reply.',['No, it is a ruler.','Yes, it is a pen.','It is on Monday.'],'Correct the object: it is a ruler.','📏','Sentences'),
 Q('Lina needs a book and a quiet place. Where should she go?',['Library','Canteen','Sports field'],'The library has books and a quiet place to study.','📚','Use the clues'),
 Q('You will draw a school garden. Which set is most useful?',['Paper and coloured pencils','Spoon and bowl','Soap and towel'],'Use paper and pencils to draw.','🎨','Use the clues'),
 Q('After English, you will test an idea in Science. Where do you go?',['Science lab','Canteen','Toilets'],'We test Science ideas in a lab.','🔬','Use the clues')
],[
 Q('Which object keeps food cold?',['Fridge','Lamp','Desk'],'A fridge keeps food cold.','🥛','Things we use'),
 Q('Which object do you use to eat soup?',['Spoon','Comb','Pencil'],'A spoon is used to eat soup.','🥄','Things we use'),
 Q('The shoes are below the bed. They are ___ the bed.',['under','on','between'],'Below the bed means under the bed.','👟','Where things are'),
 Q('One chair is far away. What do you ask?',['What is that?','What are these?','What is this?'],'Use that for one thing far away.','🪑','Sentences'),
 Q('Four people need one glass each. How many glasses do you prepare?',['Four','Two','Three'],'One glass for each of four people means four glasses.','🥛','Follow steps'),
 Q('A desk is between a bed and a wardrobe. It is ___.',['in the middle of them','on the bed','inside the wardrobe'],'Between means in the middle of two things.','🛏️','Where things are'),
 Q('You have a pan. What makes it hot so you can cook?',['Stove','Sofa','Pillow'],'A stove makes food hot.','🍳','Use the clues'),
 Q('You want to read at night. Which pair is useful?',['Book and lamp','Plate and towel','Soap and kettle'],'Read the book. Use the lamp for light.','💡','Use the clues'),
 Q('First wash the fruit, then cut it, then serve it. What do you do just before you serve the fruit?',['Cut the fruit.','Buy a lamp.','Eat the fruit.'],'Cut the fruit. Then serve it.','🍎','Follow steps'),
 Q('Water is on the floor. Which action makes the room safer?',['Mop the floor.','Run on the water.','Cover it with books.'],'Mop the water so people do not fall.','🪣','Use the clues')
],[
 Q('Where do you send a letter?',['Post office','Park','Hospital'],'We send letters at a post office.','✉️','Places'),
 Q('A library is a place where you buy food.',['False','True'],'You read and borrow books at a library.','📚','Places','truefalse'),
 Q('You use a pencil to write or draw.',['True','False'],'A pencil is a tool for writing and drawing.','✏️','Things we use','truefalse'),
 Q('Who grows vegetables?',['Farmer','Doctor','Teacher'],'A farmer grows food.','🥕','Jobs'),
 Q('Who helps sick people?',['Doctor','Postman','Farmer'],'A doctor helps sick people.','🩺','Jobs'),
 Q('The bank is opposite the park. It is ___.',['across from the park','inside the park','under the park'],'Opposite means across from.','🏦','Where things are'),
 Q('“Where is the market?” Choose the right answer.',['Next to the bank.','I am a farmer.','This is a pen.'],'The answer tells us where the market is.','🛒','Sentences'),
 Q('You need vegetables, then stamps. Choose the right order.',['Market → post office','Park → hospital','Bank → library'],'Buy vegetables at the market and stamps at the post office.','🗺️','Follow steps'),
 Q('A sign says “Use the bin.” What should you do?',['Put rubbish in the bin.','Drop rubbish on the road.','Put rubbish in a river.'],'Put your rubbish in the bin.','♻️','Follow steps'),
 Q('The post office closes at 14.00; the market at 17.00. It is 13.30. You need both. Where first?',['Post office','Market','Neither until 16.00'],'The post office closes sooner, so visit it first.','🕜','Use the clues'),
 Q('A visitor wants books and fresh fruit. Which places should you suggest?',['Library and market','Bank and hospital','Police station and park'],'Books are at the library; fruit is at the market.','📚','Use the clues'),
 Q('You find a lost wallet. Who can help you report it?',['Police officer','Farmer','Gardener'],'Tell a police officer about the lost thing.','👛','Jobs')
],[
 Q('It is Art day. Which pair should you pack?',['Sketchbook and pencils','Plate and fork','Soap and comb'],'The pair matches a drawing activity.','🎨','Things we use'),
 Q('“Is that a library?” It is a market. Choose the correct reply.',['No, it is a market.','Yes, it is a library.','They are books.'],'Say no. Then say it is a market.','🏪','Sentences'),
 Q('The lamp is on the desk. Where is the lamp?',['On top of the desk','Under the desk','Inside the wardrobe'],'On means on top of something.','💡','Where things are'),
 Q('Wednesday: English → Science → Art. Which lesson comes before Art?',['Science','English','PE'],'Science is immediately before Art.','📅','Times and lessons'),
 Q('I work in fields and grow rice. Who am I?',['A farmer','A doctor','A teacher'],'Growing rice in fields is a farmer’s work.','🌾','Jobs'),
 Q('You need a quiet place to read and borrow a book. Where do you go?',['Library','Busy market','Canteen'],'The library is quiet and has books to borrow.','📚','Use the clues'),
 Q('Three cups are near you. Complete: ___ are cups.',['These','This','That'],'Use these for two or more things near you.','☕','Sentences'),
 Q('You have a letter to send and vegetables to buy. Which two places do you visit?',['Post office → market','Library → park','Bank → school'],'Each stop matches one task.','✉️','Use the clues'),
 Q('Prepare lunch safely: wash hands, set plates, serve food. What comes after washing hands?',['Set plates.','Serve food immediately.','Go to bed.'],'The next step is setting the plates.','🍽️','Follow steps'),
 Q('You plan to study in a dark, untidy room. What is the best thing to do?',['Switch on a lamp and clear the desk.','Hide your books and turn off the lamp.','Put a plate on your pillow.'],'You need light and a tidy desk to study.','💡','Use the clues')
]];
const LEARNING={"cp": "Read short texts and pictures about daily life. Find key facts, follow clues and choose a useful answer. Use class speaking and writing tasks with this game.", "source": "Learning source: BSKAP Decision 046/H/KR/2025, English, Phase D. This game uses part of the reading goals.", "tp": ["Name things, rooms, lessons, places and jobs.", "Use this, that, these and those. Say where things are.", "Read times and follow steps.", "Use two or more clues to choose an answer.", "Get 70 or more in each area test. Read the answers and try again."]};
const OBJECT_ICONS={'ruler':'📏','eraser':'⌫','pencil':'✏️','pen':'🖊️','bag':'🎒','chair':'🪑','library':'📚','canteen':'🥪','science':'🔬','lab':'🔬','art':'🎨','english':'💬','pe':'⚽','toothbrush':'🪥','comb':'🪮','towel':'🧺','kettle':'🫖','stove':'♨','sofa':'🛋️','spoon':'🥄','pillow':'🛏️','fridge':'🧊','wardrobe':'🚪','bookshelf':'📚','plate':'🍽️','glass':'🥛','bed':'🛏️','pan':'🍲','mop':'🪣','desk':'📝','lamp':'💡','post office':'✉️','hospital':'🏥','park':'🌳','market':'🥕','police':'👮','farmer':'🌾','doctor':'🩺','teacher':'🧑‍🏫','postman':'📬','bank':'🏦','book':'📘','water':'💧','bin':'♻️'};
function objectIcon(text){const t=text.toLowerCase();for(const [k,v]of Object.entries(OBJECT_ICONS))if(new RegExp('\\b'+k+'\\b').test(t))return v;return '💬';}
