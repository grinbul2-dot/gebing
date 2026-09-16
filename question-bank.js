'use strict';
// 50 authored missions per area. IDs never depend on shuffled position.
const EXTRA_MISSIONS=[
[
// Discover: 14 applications in daily school life.
['Your pencil tip is too short to write. What do you use?','A sharpener','A bottle','A chair','A sharpener makes a pencil ready to write.','✏️','Things we use'],
['You need to remove a pencil mark. Choose a tool.','An eraser','A pen','A ruler','An eraser removes pencil marks.','✏️','Things we use'],
['You must carry five books to school. What can hold them?','A school bag','A cup','A hat','A school bag holds your books.','🎒','Things we use'],
['The teacher says, “Write this in your notebook.” What do you need?','A pen','A spoon','A comb','Use a pen to write in a notebook.','🖊️','Things we use'],
['You want to play football at school. Where do you go?','The field','The library','The office','Play football on the field.','⚽','Places'],
['Your hands are dirty before lunch. Where should you wash them?','At the sink','On a bookshelf','In your bag','Wash your hands at a sink.','💧','Places'],
['You need to cut paper for a class poster. Choose a tool.','Scissors','A cup','A ball','Scissors cut paper.','✂️','Things we use'],
['The classroom is dark. What can give you light?','A lamp','A bag','An eraser','A lamp gives light so you can see.','💡','Things we use'],
['The teacher says, “Open your book.” What should you do?','Open the cover.','Put it in the bin.','Close your bag.','Open the cover to read the book.','📘','Follow steps'],
['You are thirsty after PE. What do you take from your bag?','A water bottle','A ruler','A notebook','A water bottle holds water to drink.','💧','Things we use'],
['You need to stick a picture onto paper. What do you use?','Glue','Soap','A towel','Glue sticks the picture to the paper.','🖼️','Things we use'],
['You want to know the time before class. What do you look at?','The clock','The bin','The door','A clock shows the time.','🕒','Things we use'],
['You need a new word in English. Which book helps you find its meaning?','A dictionary','A drawing book','An empty notebook','A dictionary explains words.','📘','Things we use'],
['The teacher says, “Put the chairs in a line.” What do you move?','The chairs','The windows','The clocks','Move the chairs to make a line.','🪑','Follow steps'],
// Connect: 13 tasks with positions, times, number or two clues.
['There are two rulers near you. Complete: ___ are rulers.','These','This','That','Use these for two or more things near you.','📏','Sentences'],
['One clock is on the far wall. Complete: ___ is our clock.','That','These','Those','Use that for one thing far away.','🕒','Sentences'],
['The bag is below your chair. Where is the bag?','Under the chair','On the chair','Inside the chair','Below means under.','🎒','Where things are'],
['The pencil is inside the pencil case. Where should you look?','In the pencil case','Under the desk','On the floor','Inside the case means in the case.','✏️','Where things are'],
['The bin is beside the door. Where is it?','Next to the door','Above the door','Inside the door','Beside means next to.','♻️','Where things are'],
['Maths starts at 08.00. English starts at 09.00. Which lesson is first?','Maths','English','Both at 09.00','08.00 comes before 09.00, so Maths is first.','📅','Times and lessons'],
['Tuesday: Art, PE, then English. Which lesson comes after PE?','English','Art','Science','English follows PE in this timetable.','📅','Times and lessons'],
['Your group has four students. Each needs one pencil. How many pencils do you take?','Four','Two','Six','Take one pencil for each of the four students.','✏️','Follow steps'],
['The lab is between the library and the office. Which place is in the middle?','The lab','The office','The library','Between means in the middle of two places.','🔬','Where things are'],
['The notice says, “Library: open 08.00–14.00.” When can you enter?','At 10.00','At 07.00','At 15.00','10.00 is between 08.00 and 14.00.','📚','Times and lessons'],
['First write your name. Then answer the questions. What do you do first?','Write your name.','Answer the questions.','Close the book.','The first step is to write your name.','📝','Follow steps'],
['Two bags are far from you. Ask about them.','What are those?','What is this?','What is that?','Use those for two or more things far away.','🎒','Sentences'],
['You see one eraser near you. Complete the question: “Is ___ an eraser?”','this','these','those','Use this for one thing near you.','✏️','Sentences'],
// Solve: 11 tasks that combine needs or choose a useful plan.
['You must draw a straight line and then remove a pencil mistake. Which pair do you need?','Ruler and eraser','Glue and bottle','Ball and scissors','A ruler draws the line. An eraser removes the mistake.','📏','Use the clues'],
['Your poster needs a paper star. You must cut it out and stick it on. Choose the tools.','Scissors and glue','Ruler and cup','Eraser and bottle','Cut with scissors, then stick with glue.','✂️','Use the clues'],
['The library closes at 12.00. Lunch ends at 13.00. It is 11.45. You need both places. Where first?','Library','Canteen','Field','The library closes soon. Visit it before lunch.','📚','Use the clues'],
['You will have PE, then Art. Which set helps with both lessons?','Sports shoes and coloured pencils','A spoon and a towel','Glue and a dictionary','Use sports shoes for PE and coloured pencils for Art.','⚽','Use the clues'],
['Your bottle leaks onto your books. What should you do first?','Close the bottle and move the books away.','Put more books in the water.','Leave the bottle open.','Stop the leak and keep the books dry.','💧','Use the clues'],
['The classroom floor is wet near the door. What is a helpful choice?','Tell the teacher and walk around it.','Run across the wet floor.','Push a friend through the door.','Tell the teacher so the water can be cleaned up.','🪣','Use the clues'],
['You borrowed a library book. You have finished reading it. What should you do?','Return it to the library.','Throw it away.','Write on every page.','Return a borrowed book so another student can read it.','📘','Use the clues'],
['A new student needs lunch and then a book. Which route helps?','Canteen → library','Library → field','Office → toilet','Buy lunch at the canteen, then find a book in the library.','🗺️','Follow steps'],
['It is raining. Your class must read quietly. Which place is best?','Inside the library','On the open field','Beside a busy road','The library is indoors and suitable for quiet reading.','📚','Use the clues'],
['You need to measure a leaf and write its length. What should you bring?','Ruler, pencil and notebook','Ball, towel and plate','Glue, cup and comb','Measure with a ruler, then write in your notebook.','🍃','Use the clues'],
['The lesson starts at 08.00. It is 07.55 and your book is still in your bag. What helps you get ready?','Take out the book and sit down.','Go to the canteen for a long meal.','Hide the bag in the library.','Get your book ready before the lesson starts.','📅','Use the clues']
],
[
// Discover: 14.
['Your hair is untidy. What can you use?','A comb','A spoon','A plate','Use a comb to tidy your hair.','🪮','Things we use'],
['Your face is wet after washing. What do you need?','A towel','A pan','A pencil','A towel dries your face.','🧺','Things we use'],
['You want to sleep. Where do you lie down?','On the bed','In the fridge','On the stove','A bed is a place to sleep.','🛏️','Places'],
['You need to hang up your clean shirts. Where do they go?','In the wardrobe','In the sink','In the fridge','Keep clothes in a wardrobe.','🚪','Places'],
['The room is too dark to read. What should you turn on?','A lamp','A chair','A pillow','Turn on a lamp to get light.','💡','Things we use'],
['You want to drink some water. Which object can hold it?','A glass','A comb','A towel','Pour water into a glass to drink.','🥛','Things we use'],
['There is dust on the floor. What can you use to sweep it?','A broom','A fork','A pillow','Sweep the floor with a broom.','🧹','Things we use'],
['You want to sit with your family in the living room. Choose a seat.','A sofa','A fridge','A sink','A sofa is a seat in a living room.','🛋️','Things we use'],
['You need to wash a dirty plate. Where do you put it?','In the sink','On the bed','In the wardrobe','Wash dirty plates in the sink.','🍽️','Places'],
['Your books are in a pile. Which object helps you store them neatly?','A bookshelf','A kettle','A pan','A bookshelf holds books neatly.','📚','Things we use'],
['You are washing your hands. What helps remove the dirt?','Soap','Glue','Cooking oil','Use soap and water to wash your hands.','🧼','Things we use'],
['You need to open a locked front door. What do you use?','A key','A spoon','A pencil','A key opens a lock.','🔑','Things we use'],
['The sun is too bright through the window. What can you close?','The curtains','The bookshelf','The lamp','Close the curtains to block some sunlight.','🪟','Things we use'],
['Your plant needs water. Which object can you use to carry water to it?','A watering can','A pillow','A shoe box','A watering can holds water for plants.','🌱','Things we use'],
// Connect: 13.
['Two cups are near you. Complete: ___ are cups.','These','That','This','Use these for two or more things near you.','☕','Sentences'],
['One pan is far from you. Complete: ___ is a pan.','That','These','Those','Use that for one thing far away.','🍲','Sentences'],
['The lamp is on top of the desk. Where is it?','On the desk','Under the desk','Behind the desk','On top of the desk means on the desk.','💡','Where things are'],
['The shoes are inside a box. Where should you look?','In the box','On the box','Behind the door','Look inside the box for the shoes.','👟','Where things are'],
['The sofa is beside the window. Where is the sofa?','Next to the window','Under the window glass','Inside the window','Beside means next to.','🛋️','Where things are'],
['First wash the apples. Then put them in a bowl. What comes second?','Put them in a bowl.','Wash them.','Put them in a drawer.','Put the apples in a bowl after washing them.','🍎','Follow steps'],
['Five people need one cup each. There are already three cups. How many more do you need?','Two','Three','Five','Three cups and two more make five cups.','☕','Follow steps'],
['The washing machine is between the sink and the door. What is in the middle?','The washing machine','The sink','The door','The washing machine is between the other two things.','🚪','Where things are'],
['Two towels are far from you. Complete: ___ are clean towels.','Those','This','That','Use those for two or more things far away.','🧺','Sentences'],
['You point to one plate beside you. Ask about it.','What is this?','What are those?','What are these?','This is for one thing near you.','🍽️','Sentences'],
['Dinner is at 18.00. It is 17.45. What happens in fifteen minutes?','Dinner','Breakfast at 07.00','Lunch at 12.00','Fifteen minutes after 17.45 is 18.00, dinner time.','🕒','Times and lessons'],
['The red box is above the blue box. Which box is lower?','The blue box','The red box','Both boxes are above each other','The blue box is below the red one.','📦','Where things are'],
['The note says, “Put the spoon beside the plate.” Which action is right?','Put it next to the plate.','Put it under the bed.','Put it inside the fridge.','Beside the plate means next to the plate.','🥄','Follow steps'],
// Solve: 11.
['You want to wash your hands and dry them. Which pair do you need?','Soap and towel','Comb and plate','Pencil and pan','Wash with soap and water, then dry with a towel.','🧼','Use the clues'],
['Your shirt is clean but still wet. Where should you put it first?','On the clothes line','Inside a closed drawer','Under a pillow','Hang the wet shirt on the line to dry.','👕','Use the clues'],
['A glass breaks on the floor. What is the best first action?','Keep away and tell an adult.','Pick up the pieces with bare hands.','Walk on the pieces.','An adult can help remove the sharp pieces safely.','🥛','Use the clues'],
['You are making a fruit snack. Which order is right?','Wash the fruit → cut it → serve it','Serve the fruit → wash it → buy it','Cut the fruit → put it on the floor','Wash the fruit before cutting and serving it.','🍎','Follow steps'],
['You need to write homework in a quiet room. Which set is useful?','Desk, chair and pencil','Stove, pan and spoon','Shower, soap and towel','A desk, chair and pencil help you write homework.','📝','Use the clues'],
['The bin is full and there is rubbish on the desk. What helps tidy the room?','Empty the bin, then clear the desk.','Put the rubbish under the bed.','Leave the bin and add more rubbish.','Make room in the bin, then put the rubbish in it.','♻️','Use the clues'],
['You want cold water, then a clean glass. Which two places should you check?','Fridge and kitchen cupboard','Wardrobe and bed','Bookshelf and sofa','Cold water can be in the fridge. Clean glasses are in the cupboard.','🥛','Use the clues'],
['Your school bag is beside the door, but your notebook is on the desk. What should you do before leaving?','Put the notebook in the bag.','Put the bag in the sink.','Leave the notebook at home.','Pack the notebook so you can use it at school.','🎒','Use the clues'],
['The pan is hot. You need to move it. What should you do?','Ask an adult to help.','Grab it with bare hands.','Put your face near it.','Ask an adult for help with a hot pan.','🍲','Use the clues'],
['You will eat soup, then wash the bowl. Choose the correct pair.','Spoon and sink','Comb and wardrobe','Pillow and desk','Eat with a spoon, then wash the bowl in the sink.','🥄','Use the clues'],
['You must feed the cat at 16.00, then water a plant at 16.15. It is 16.00. What do you do first?','Feed the cat.','Water the plant.','Go to bed.','The plan puts feeding the cat before watering the plant.','🐱','Follow steps']
],
[
// Discover: 14.
['You need to buy some bread. Where do you go?','A bakery','A bank','A library','A bakery sells bread.','🍞','Places'],
['Your bicycle has a broken wheel. Who can fix it?','A mechanic','A farmer','A teacher','A mechanic repairs things such as bicycles.','🚲','Jobs'],
['You need to catch a bus. Where should you wait?','At the bus stop','Inside the market stall','On the football field','Wait for a bus at the bus stop.','🚌','Places'],
['You want to watch a film on a big screen. Where do you go?','A cinema','A post office','A bank','A cinema shows films on a big screen.','🎬','Places'],
['A person delivers letters to homes. What is the job?','A postman','A cook','A farmer','A postman delivers letters.','📬','Jobs'],
['You want to have lunch at a place that serves meals. Where do you go?','A restaurant','A police station','A bank','A restaurant serves meals.','🍽️','Places'],
['A person cooks meals in a restaurant. What is the job?','A cook','A driver','A librarian','A cook prepares meals.','🍲','Jobs'],
['You want to borrow a town library book. Who can help you there?','A librarian','A farmer','A driver','A librarian helps people use the library.','📚','Jobs'],
['You want to put your savings into a bank account. Where do you go?','A bank','A bakery','A cinema','A bank looks after money in accounts.','🏦','Places'],
['You need to cross a busy road. Where should you cross?','At a safe crossing','Between moving cars','Around a blind corner','Use a safe crossing and check for traffic.','🚦','Places'],
['The light for people crossing is red. What should you do?','Wait.','Run across.','Stand in the road.','Wait until it is safe to cross.','🚦','Follow steps'],
['You have an empty wrapper in the park. Where should it go?','In a bin','In a pond','On a flower','Put rubbish in a bin.','♻️','Follow steps'],
['A person drives a bus around town. What is the job?','A bus driver','A doctor','A cook','A bus driver drives the bus.','🚌','Jobs'],
['You want to buy a notebook and a pen. Which shop should you visit?','A shop that sells school things','A fruit stall','A shoe repair shop','A shop that sells school things has notebooks and pens.','📝','Places'],
// Connect: 13.
['The bakery is beside the bank. Where is the bakery?','Next to the bank','Under the bank','Inside the bank','Beside means next to.','🍞','Where things are'],
['The market is between the park and the bank. Which place is in the middle?','The market','The park','The bank','The market is between the two places.','🥕','Where things are'],
['The hospital is across from the library. Which word means across from?','Opposite','Inside','Below','Opposite means across from.','🏥','Where things are'],
['The bus leaves at 08.30. It is 08.20. How long do you have?','Ten minutes','Thirty minutes','One hour','08.30 is ten minutes after 08.20.','🚌','Times and lessons'],
['The shop opens at 09.00 and closes at 16.00. When is it open?','At 11.00','At 08.00','At 17.00','11.00 is between opening and closing time.','🏪','Times and lessons'],
['The sign says, “Turn left for the library.” Which way should you go?','Left','Right','Back home','Follow the sign and turn left.','⬅️','Follow steps'],
['The route is bank → bakery → park. Where do you go after the bakery?','Park','Bank','Hospital','The park comes after the bakery on this route.','🗺️','Follow steps'],
['A guide says, “The museum is behind the library.” Where is the museum?','At the back of the library','Inside the library','In front of the library','Behind means at the back of something.','🏛️','Where things are'],
['You point to two shops far away. Complete: ___ are shops.','Those','This','That','Use those for two or more things far away.','🏪','Sentences'],
['One bus is near you. Complete: ___ is our bus.','This','These','Those','Use this for one thing near you.','🚌','Sentences'],
['A ticket costs two coins. You need three tickets. How many coins do you need?','Six','Three','Five','Two coins for each of three tickets makes six coins.','🎟️','Use the clues'],
['The note says, “Meet me outside the market.” Where should you wait?','In front of the market entrance','Inside a closed shop','Under a market table','Wait outside, near the market entrance.','🥕','Follow steps'],
['The park closes at 18.00. Which visit ends before it closes?','17.00 to 17.30','18.30 to 19.00','19.00 to 20.00','The visit from 17.00 to 17.30 ends before 18.00.','🌳','Times and lessons'],
// Solve: 11.
['You need bread and stamps. Which two places should you visit?','Bakery and post office','Bank and park','Hospital and cinema','Buy bread at the bakery and stamps at the post office.','🍞','Use the clues'],
['Your bus leaves at 10.00. It is 09.55. The bus stop is near you. What is the best plan?','Go to the bus stop now.','Watch a long film first.','Have a long meal first.','Go now so you do not miss the bus.','🚌','Use the clues'],
['You borrowed a book and need vegetables for dinner. Which route does both jobs?','Library → market','Bank → cinema','Park → bus stop','Return the book at the library, then buy vegetables at the market.','📚','Follow steps'],
['The bakery closes at 12.00 and the bank at 15.00. It is 11.30. You need both. Where first?','Bakery','Bank','Neither until 14.00','Visit the bakery before it closes at 12.00.','🍞','Use the clues'],
['A visitor needs a quiet place to read indoors because it is raining. Where is best?','Library','Open park','Busy bus stop','The library is indoors and suitable for quiet reading.','📚','Use the clues'],
['You find a lost child in the market. What is a helpful action?','Tell a police officer.','Leave the child alone.','Send the child into the road.','A police officer can help the child find their family.','👮','Use the clues'],
['You need exercise, then a meal. Which plan fits both needs?','Walk in the park, then eat at a restaurant.','Sit at the bank, then go home hungry.','Wait at the bus stop all afternoon.','Walking gives exercise. A restaurant serves meals.','🌳','Use the clues'],
['The library is closed today. Your task is to buy fruit. Where should you go?','Market','Library','Police station','You can still buy fruit at the market.','🍎','Use the clues'],
['A town sign says, “No bikes on this path.” You have a bicycle. What should you do?','Use a path where bikes are allowed.','Ride faster on this path.','Hide the sign.','Follow the sign and use a suitable route.','🚲','Follow steps'],
['You need to take a train at 14.00. The station is twenty minutes away. Which leaving time gives you ten minutes to wait?','13.30','13.50','14.00','Leave at 13.30, arrive at 13.50, and wait ten minutes.','🚆','Use the clues'],
['A visitor wants a book to borrow, not a book to buy. Which place should you suggest?','Library','Bookshop','Bakery','Borrow a book at a library. A bookshop sells books.','📘','Use the clues']
],
[
// Discover: 14 contextual language tasks; fruit crates carry the answer labels.
['You need to pack a snack for school. Which item is food?','An apple','A ruler','An eraser','An apple is food you can eat as a snack.','🍎','Things we use'],
['You want to carry drinking water on a trip. Choose a useful object.','A bottle','A pencil','A towel','A bottle holds drinking water.','💧','Things we use'],
['You must write a shopping list. Which pair is useful?','Paper and pen','Soap and comb','Plate and fork','Use a pen to write the list on paper.','📝','Things we use'],
['You have dirty hands before eating fruit. What do you need?','Soap and water','Glue and paper','A book and lamp','Wash your hands with soap and water before eating.','🧼','Things we use'],
['You need to buy oranges. Which place should you choose?','A fruit stall','A bank','A library','A fruit stall sells fruit such as oranges.','🍊','Places'],
['You want to draw a picture of a banana. Which tool can make yellow lines?','A yellow pencil','A spoon','A comb','Use a yellow pencil to draw yellow lines.','🍌','Things we use'],
['You need somewhere to keep your school books. Choose the best object.','A bookshelf','A frying pan','A water bottle','A bookshelf holds books.','📚','Things we use'],
['A teacher asks you to sit down. What should you use?','A chair','A sink','A cupboard shelf','Sit on a chair.','🪑','Follow steps'],
['Your friend wants to know the time. Which object can help?','A clock','A ruler','An apple','A clock shows the time.','🕒','Things we use'],
['You are at home and want to wash an apple. Where should you go?','To the kitchen sink','To the bed','To the wardrobe','Wash an apple at the kitchen sink.','🍎','Places'],
['You need to keep fruit juice cold. Choose a place.','Fridge','Bookshelf','School bag','A fridge keeps drinks cold.','🧊','Places'],
['You need a place to put fruit on the table. Choose a container.','A bowl','A comb','A clock','A bowl can hold fruit on a table.','🍇','Things we use'],
['A person grows the apples you buy. What is the job?','Farmer','Driver','Librarian','A farmer can grow fruit such as apples.','🌱','Jobs'],
['You have an empty juice box. Where should you put it?','In the right rubbish bin','Under a desk','In a plant pot','Put the empty box in the right bin.','♻️','Follow steps'],
// Connect: 13.
['There is one apple near you. Complete: ___ is an apple.','This','These','Those','Use this for one thing near you.','🍎','Sentences'],
['Three oranges are far from you. Complete: ___ are oranges.','Those','This','That','Use those for two or more things far away.','🍊','Sentences'],
['Two bananas are near you. Choose the correct sentence.','These are bananas.','This are bananas.','That is bananas.','Use “these are” for two or more things near you.','🍌','Sentences'],
['One pear is far away. Choose the correct sentence.','That is a pear.','Those is a pear.','These are a pear.','Use “that is” for one thing far away.','🍐','Sentences'],
['The fruit bowl is below the shelf. Where is it?','Under the shelf','On the shelf','Above the shelf','Below the shelf means under the shelf.','🍎','Where things are'],
['The apple box is between the orange box and the pear box. Which box is in the middle?','Apple box','Orange box','Pear box','The apple box is between the other two boxes.','📦','Where things are'],
['The shopping list says: two apples and one pear. How many pieces of fruit do you need?','Three','Two','Four','Two apples and one pear make three pieces of fruit.','🍐','Follow steps'],
['First wash the fruit. Then put it on a clean plate. What comes first?','Wash the fruit.','Put it on the plate.','Put it in your school bag.','Wash the fruit before putting it on the plate.','🍎','Follow steps'],
['You need three apples. There is one in your bag. How many more do you need?','Two','Three','Four','One apple and two more make three.','🎒','Use the clues'],
['The market opens at 07.00. Which time is after it opens?','08.00','06.00','05.30','08.00 is after 07.00.','🕒','Times and lessons'],
['“Are these oranges?” You see two apples near you. Choose the right reply.','No, they are apples.','Yes, they are oranges.','It is a chair.','Say no, then name the fruit correctly.','🍎','Sentences'],
['The bag is beside the desk. Which instruction puts it in that place?','Put the bag next to the desk.','Put the bag on the desk.','Put the bag inside a cupboard.','Beside means next to.','🎒','Follow steps'],
['Lunch is at 12.00. Art is at 13.00. Which activity comes after lunch?','Art','Breakfast','Lunch again at 11.00','Art at 13.00 comes after lunch at 12.00.','🎨','Times and lessons'],
// Solve: 11.
['You need to return a book and buy apples. Which pair of places helps?','Library and market','Bank and field','Hospital and bedroom','Return the book at the library and buy apples at the market.','📚','Use the clues'],
['You are preparing a fruit snack. Your hands and the apples are dirty. What should happen before eating?','Wash your hands and the apples.','Eat first and wash later.','Put the apples under your bed.','Clean your hands and the fruit before eating.','🍎','Use the clues'],
['The market closes at 14.00. The library closes at 17.00. It is 13.30 and you need both. Where first?','Market','Library','Either at 16.00','The market closes first, so visit it first.','🕒','Use the clues'],
['You must draw a fruit bowl and write its name. Which set is useful?','Paper, pencil and coloured pencils','Soap, towel and comb','Pan, spoon and plate','The drawing tools let you draw and label the fruit bowl.','🎨','Use the clues'],
['Your friend needs one cup for each of four people. There are six cups. What should you do?','Set out four cups.','Set out two cups.','Buy six more cups.','There are enough cups. Put out one for each person.','☕','Use the clues'],
['You need a clean desk for homework. A fruit bowl and empty wrappers cover it. What is best?','Move the bowl and put the wrappers in a bin.','Add more wrappers.','Put your notebook in the bowl.','Clear a space for your notebook and remove the rubbish.','📝','Use the clues'],
['The sign says, “Wash fruit before eating.” Which order follows it?','Wash → eat','Eat → wash','Buy → eat without washing','Wash the fruit first, then eat it.','🍐','Follow steps'],
['You have a ruler and a spoon. A friend needs to draw a 5 cm line. Which object should you lend?','The ruler','The spoon','Neither object','A ruler can measure and draw a 5 cm line.','📏','Use the clues'],
['A picnic needs water to drink and something to sit on. Choose a useful pair.','Water bottles and a mat','A lamp and a dictionary','Soap and a ruler','Take water to drink and a mat to sit on.','🧺','Use the clues'],
['You have two jobs: water the garden, then read indoors. Which order of objects fits?','Watering can → book','Book → spoon','Plate → pillow','Use the watering can in the garden, then read a book indoors.','🌱','Follow steps'],
['A visitor asks for a quiet place to borrow a book. Your friend suggests a fruit stall. What should you say?','Go to the library instead.','Yes, buy a banana to borrow a book.','Go to the bank for the book.','The library is the place to borrow books and read quietly.','📚','Use the clues']
]
];
const MISSION_BANKS=MISSIONS.map((original,a)=>{
 const old=original.map((q,i)=>({...q,id:`m${a+1}-${String(i+1).padStart(2,'0')}`,level:Math.floor(i/4)}));
 const added=EXTRA_MISSIONS[a].map((v,i)=>({...Q(v[0],[v[1],v[2],v[3]],v[4],v[5],v[6]),id:`m${a+1}-${String(i+13).padStart(2,'0')}`,level:i<14?0:i<27?1:2}));
 return [...old,...added];
});
function validMissionSet(ids,a){return Array.isArray(ids)&&ids.length===12&&new Set(ids).size===12&&ids.every(id=>MISSION_BANKS[a].some(q=>q.id===id));}
function drawMissionSet(a,p=profile()){
 p.lastMissionPacks??={};const last=new Set(p.lastMissionPacks[a]||[]),ids=[];
 for(let level=0;level<3;level++)ids.push(...shuffled(MISSION_BANKS[a].filter(q=>q.level===level&&!last.has(q.id))).slice(0,4).map(q=>q.id));
 p.lastMissionPacks[a]=ids.slice();return ids;
}
function missionQuestion(a,run){return MISSION_BANKS[a].find(q=>q.id===run.questionIds?.[run.index])||MISSION_BANKS[a][run.index];}
function validOptionOrder(order,q){return Array.isArray(order)&&order.length===3&&new Set(order).size===3&&order.every(v=>q.options.includes(v));}
