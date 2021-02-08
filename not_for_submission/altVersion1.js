//User Input Management
const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//First Room
let dungeonEntrance = {
  description : `After a long journey ${playerName} finally arrives at the dungeon. With the fatigue of many miles and the wizard who summoned a hero, ${playerName} stands in front of ominous stone door etched into the face of the mountain. It is an fitting that it leads to the great beast that has been plaguing the countryside.\nThe Wizard: "${playerName}! You are the chosen one, the ONLY one who can wield the power great enough to slay the dragon! Hold my staff to reveal the password sigils, speak the words and enter the cavern to fulfill your destiny!"\n >_`,
  loot : [`tablet`],
}

//Second Room
let narrowPassage = {
  description : `${playerName} looks around only and to see jagged walls in close proximity. They stretch downward making the small passage even more narrow with every inch. The only possible way to fit is to crawl on the floor...\n>_`,
  loot : [` `],
}

//Third Room
let treasureRoom = {
  description : `The narrow passage opens suddenly to a treasure room with filled with riches that tempt ${playerName} to take them.\n The only way forward is through to open a sturdy looking door on the opposite side of the chamber.\n>_`,
  loot : [`key`],
}

//Fourth Room 
let graveyard = {
  description : `This chamber is naught but an unsanctioned graveyard littered by piles bones without headstones or burials.\n As ${playerName} takes each step the ground makes an audible "CRRUUUNNCH!".\nThere is a single plain door on each wall providing four directions to travel, forward, right, left and backward.\n${playerName} couldn't help but notice a small glint amidst the mounds of skeletons, perhaps it should be examined...>_`,
  loot : ['sword of truth'],
  door : 'closed'
}

//Fifth Room 
let ancientArmory = {
  description : `The room has a likeness to the treasure room but lacks it's luster.\nUseless, aged tools of war neatly line the walls as if asking to be used again.\n Something catches your eye and you see a faintly glowing shield that seems untouched by time.\nIt seems like a good idea for ${playerName} to take the shield.\n>_`,
  loot : ['shield of light'],
  door : 'open'
}

//Sixth Room 
let throneRoom = {
  gameOverDescription : `${playerName} walks down an ornate hallway that leads to an even grander throne room.\nThe expanse of the chamber is captivating but a thundering crash and deafening roar knocks ${playerName} on their back!\nA towering dragon is looming over you with the contrast of a menacing grin and the majesty of it's natural prowess.\nThe Dragon: "Pathetic creature!!! How dare you enter MY DOMAIN! I claimed these ruins long ago, soon I will claim your kingdom too but first I will take your life!\nWithout the proper means to protect yourself the Dragon tears and burns ${playerName} asunder!\nThe kingdom fell under the dark rule of the Dragon, which he rules until this very day...\n${playerName} had failed only to become join the rest of the bones in the graveyard...\nThe End>_`,
  victoryDescription : `${playerName} walks down an ornate hallway that leads to an even grander throne room.\nThe expanse of the chamber is captivating but a thundering crash and deafening roar knocks ${playerName} on their back!\nA towering dragon is looming over you with the contrast of a menacing grin and the majesty of it's natural prowess.\nThe Dragon: "You must be the chosen one!!! Even with the weapons of the "chosen" you cannot defeat me! I claimed these ruins long ago, soon I will claim your kingdom too, but first I will take your life!\nWith sword and shield in hand the only choice ${playerName} has is the slay the dragon, once and for all!\n>_`,
  loot : [' '],
}

//Starting Room Location 
let currentRoom = dungeonEntrance

//Room Transitions
let roomConnections = {
  dungeonEntrance: [narrowPassage],
  narrowPassage: [treasureRoom],
  treasureRoom: [graveyard],
  graveyard: [ancientArmory, throneRoom],
  ancientArmory: [graveyard],
  throneRoom: [' '],
}

//Transition Function 
function changeRoom (nextRoom) {
  if(roomConnections[currentRoom].includes(nextRoom)) {
    currentRoom = nextRoom
  }
}

//Adding Loot to Player's Current Room Inventory
function lootAdded(item) {
  currentRoom.loot.push(item);
}

//Removing Loot From Player's Current Room Inventory
function lootRemoved(item) {
  let resetLoot =[]
  console.log(currentRoom.loot)
  currentRoom.loot.forEach(element => {
    if (element!= item){
      resetLoot.push(element)
    }
  })
currentRoom.loot = resetLoot
console.log(currentRoom.loot)
}

//Player Stats
let player = {
inventory : ['torch'],
status : ['alive'],
}

//Player Held Items Display
  inventory() {
    return `You have these item(s)... ${player.inventory}`;
  };
  
  //Player Item Pickup
  function equip(item) {
    player.inventory.push(item);
  }
  
  //Player Item Drop
  function drop(item) {
    let resetStash =[]
    console.log(player.inventory)
    this.player.inventory.forEach(element => {
      if (element!= item){
        resetStash.push(element)
      }
    });
  player.inventory = newArr
  console.log(player.inventory)
  }


//Main Game Sequence
async function gameSequence() {
  
  //Establish Character Name
  playerName = await ask(`What is your character's name?`);

  //Player Instructions
  await ask(`In order for ${playerName} to progress through the game you must type in the actions
  in the format of...\n  verb  +  object's name   example: open door\nThese will be key phrases hinted at throughout the game play, good luck!\n\nPress enter when you're ready...`);

  //First Room Description
  let answer = await ask(
    `After a long journey ${playerName} finally arrives at the dungeon. With the fatigue of many miles and the wizard who summoned a hero, ${playerName} stands in front of ominous stone door etched into the face of the mountain. It is an fitting that it leads to the great beast that has been plaguing the countryside.\nThe Wizard: "${playerName}! You are the chosen one, the ONLY one who can wield the power great enough to slay the dragon! Touch the stone tablet to reveal the password sigils, speak the words and enter the cavern to fulfill your destiny!"\n${playerName} checks the room for loot...${(currentRoom.loot)}>_`
  );

  //Immovable Object
  while (!answer.includes("touch tablet")) {
    if (answer.includes("tablet")) {
      answer = await ask(`The tablet is too heavy for ${playerName} to take...\n>_`);
    } else {
      answer = await ask(
        `The Wizard: "${playerName}! You must hold the staff to see the sigils!\n>_"`
      );
    }
  }

  //Tablet Interaction
  if (answer === "touch tablet") {
    answer = await ask(
      `The sigils appear around the stone and grow brighter after you make contact with the stone...\nWizard: The spell has appeared! Now ${playerName}! Cast the spell!\n>_ `
    );
  }

  //Tablet Puzzle Failure
  while (!answer.includes("cast spell")) {
    answer = await ask(
      `The Wizard: "${playerName}! You must cast the spell to open the dungeon!"`
    );
  }

  //Table Puzzle Victory
  if (answer.includes("cast spell")) {
    changeRoom(narrowPassage)
    console.log(
      `The door slides open with in a slow rumble and finishes the process with a resounding BOOM!\n${playerName} must travel forward into the dungeon.\nWizard: The fate of the kingdom rests in your hands now ${playerName}!\n>_`
    );

    //Incorrect Player Input
    while(!answer.includes("travel forward")){
      answer = await ask(`\n${playerName} must travel forward into the dungeon.\n>_`)
    }

    //Successful Narrow Passage Transition
    if(answer.includes("travel forward")){
      answer = await ask(`${playerName} steps inside the cave only to be engulfed by darkness...\n>_`)
    }
    
    //Narrow Passage Darkness Puzzle
    answer = await ask(
      `${playerName} cannot see at all! Check the inventory for any tools.\n>_`
    );
  }

  //Darkness Puzzle Failure Part 1
  while (!answer.includes("check inventory")) {
    answer = await ask(
      `${playerName} cannot see at all! Check your inventory for tools you use.\n>_`
    );
  }

  //Darkness Puzzle Victory Part 2
  if (answer.includes("check inventory")) {
    answer = await ask(`${playerName} finds a ${player.inventory()} in their pack.\n>_`);
  }

  //Darkness Puzzle Failure Part 2
  while (!answer.includes("light torch")) {
    answer = await ask(
      `${playerName} cannot see at all! ${playerName} looks for their torch to light...\n>_`
    );
  }

  //Darkness Puzzle Victory Part 2
  if (answer.includes("light torch")) {
    console.log(
      `The room blazes with illumination as the torch catches fire!\n`
    );
    answer = await ask(
      `${playerName} looks around only and to see jagged walls in close proximity. They stretch downward making the small passage even more narrow with every inch. The only possible way to fit is to crawl on the floor...\n${playerName} checks the room for loot...${(currentRoom.loot)}>_`
    );
  }

  //Incorrect Player Input
  while (!answer.includes("crawl floor")) {
    answer = await ask(
      `The only way ${playerName} can progress is to crawl along the floor!`
    );
  }

  //Successful Treasure Room Transition 
  if (answer.includes("crawl floor")) {
    changeRoom(treasureRoom)
    console.log(
      `${playerName} barely fits but manages to make it past a prolonged and suffocating squeeze!\nThe small opening drops ${playerName} down into the next room, too high to climb back out.`
    );
    answer = await ask(
      `The narrow passage opens suddenly to a treasure room with filled with riches that tempt ${playerName} to take them.\n The only way forward is to open a sturdy looking door on the opposite side of the chamber.\n${playerName} checks the room for loot...${(currentRoom.loot)}>_`
    );
  }

  //Don't Be Greedy
  while (answer.includes("take treasure")){
    answer = await ask(`${playerName} has more important things to do right now!`)
  }

  //The Key to the Ancient Armory
  if (answer.includes("take key")) {
    equip("key");
    lootRemoved("key");
    answer = await ask(`This might come in handy! It seems the only way through the room is to open the large door on the far end.`);
  }

  //Incorrect Player Input
  while (!answer.includes("open door")) {
    answer = await ask(
      `The only way ${playerName} can progress is to open the door!`
    );
  }

  //Double Room Loop
  while(currentRoom !== throneRoom)
  {

  //Successful Graveyard Transition 
  if (currentRoom === treasureRoom &&
    answer.includes("open door") ||
    currentRoom === ancientArmory &&
    answer.includes("travel back")
  ) {
    changeRoom(graveyard)
    console.log(`The door shuts itself behind you and sets off a trap that collapses the entire treasure room!`)
    answer = await ask(
      `This chamber is naught but an unsanctioned graveyard littered by piles bones without headstones or burials.\n As ${playerName} takes each step the ground makes an audible "CRRUUUNNCH!".\nThere is a heavy door on the left and a grand arch way directly in across the room.\n${playerName} checks the room for loot...${(currentRoom.loot)}>_`
    );
  }

  //Incorrect Player Input
  while (currentRoom === graveyard &&
    !answer.includes("open door") &&
    !answer.includes("travel forward") &&
    !answer.includes("take sword")
  ) {
    answer = await ask(
      `The only way ${playerName} can progress is to open the door or travel forward!\n>_`
    );
  }

  //Take the Sword 
  if (answer.includes("take sword")) {
    equip("sword of truth");
    lootRemoved("sword of truth");
    answer = await ask(`${playerName}: "This is the fabled sword of truth! There's no way I could lose to the dragon with this!"\nThe only way to progress from here is to open the door to the left or to travel forward.\n>_`  
    );
  }
  
  //Failed Door Opening
  if (answer.includes("open door")) {
    if (currentRoom === graveyard &&
      currentRoom.door === 'locked'
      )
    {
    answer = await ask(
      `This door is locked, and ${playerName} doesn't have a key.\n>_`
    );
  }

  //Successful Door Open
  if (
    player.inventory.includes("key") ||
    currentRoom.door === 'open'
  ) 
  {
    currentRoom.door === "open"
    answer = await ask(`The door is open! ${playerName} can now travel left as well as forward!`)
  }
}

    //Incorrect Player Input
    while (
      currentRoom === graveyard &&
      !answer.includes("travel left") &&
      !answer.includes("travel forward") &&
      !answer.includes("take sword")
    ) {
      answer = await ask(
        `The only way ${playerName} can progress is to open the door or travel forward!\n>_`
      );
    }
    
    //Successful Ancient Armory Transition 
    if (currentRoom === graveyard && answer.includes("travel left")) {
    changeRoom(ancientArmory)
    answer = await ask(
      `The room has a likeness to the treasure room but lacks it's luster.\nUseless, aged tools of war neatly line the walls as if asking to be used again.\n${playerName} checks the room for loot...${(currentRoom.loot)}>_`
    );
  }

  //Incorrect Player Input
  while (!answer.includes("travel back") && !answer.includes("take shield") && !player.playerInventory.includes('shield')) {
    answer = await ask(
      `${playerName} looks around and sees the only way out is the previously locked door.\n>_`
    );
  }

  //Take the Shield
  if (currentRoom === ancientArmory && answer.includes("take shield")&& !player.inventory.includes("shield")) {
    while(player.inventory.includes('torch')){
        answer = await ask(`${playerName} you have to much stuff in your hand drop something`)
        if (answer.includes("drop torch")){
           drop("torch");
           lootAdded('torch') 
           console.log(currentRoom.loot)
          answer = await ask(`${playerName} you can now pick up the sheild.`)
        }
        if (answer.includes("take shield")) {
          equip("shield of light");
          lootRemoved("shield of light");
          answer = await ask(`${playerName}: "This is the legendary shield of light! I am UNSTOPPABLE!"\nThe only way to progress from here is to travel back to the graveyard.\n>_`  
          );
        }
      }
  
  //Incorrect Player Input
  while (currentRoom === ancientArmory && !answer.includes("travel back")) {
    answer = await ask(
      `${playerName} looks around and sees the only way out is to travel back.\n>_`
    );
  }

  //Successful Throne Room Transition
  if (currentRoom === graveyard &&
    answer.includes("travel forward") 
  ) 
  {
    changeRoom(throneRoom)
  }
}

  //End Scenarios 
  //Victory Puzzle Part 1
  if (
    currentRoom === throneRoom &&
    player.playerStash.includes("sword of truth") &&
    player.playerStash.includes("shield of light")
  ) {
    answer = await ask(
      `${playerName} walks down an ornate hallway that leads to an even grander throne room.\nThe expanse of the chamber is captivating but a thundering crash and deafening roar knocks ${playerName} on their back!\nA towering dragon is looming over you with the contrast of a menacing grin and the majesty of it's natural prowess.\nThe Dragon: "You must be the chosen one!!! Even with the weapons of the "chosen" you cannot defeat me! I claimed these ruins long ago, soon I will claim your kingdom too, but first I will take your life!\nWith sword and shield in hand the only choice ${playerName} has is the slay the dragon, once and for all!\n>_`
    );
  }

  //Victory Part 2
  if (
    !answer.includes("slay dragon") &&
    player.inventory.includes("sword of truth") &&
    player.inventory.includes("shield of light")
  ) {
    answer = await ask(
      `${playerName} checks the room for loot...${(currentRoom.loot)}>_\n${playerName} walks down an ornate hallway that leads to an even grander throne room.\nThe expanse of the chamber is captivating but a thundering crash and deafening roar knocks ${playerName} on their back!\nA towering dragon is looming over you with the contrast of a menacing grin and the majesty of it's natural prowess.\nThe Dragon: "Pathetic creature!!! How dare you enter MY DOMAIN! I claimed these ruins long ago, soon I will claim your kingdom too but first I will take your life!\nWithout the proper means to protect yourself the Dragon tears and burns ${playerName} asunder!\nThe kingdom fell under the dark rule of the Dragon, which he rules until this very day...\n${playerName} had failed only to join the rest of the bones in the graveyard...\nThe End>_`
    );
  }

  //Game Over Part 1
  if (answer.includes("slay dragon") &&
  player.inventory.includes("sword of truth") &&
  player.inventory.includes("shield of light")
  ) {
    console.log(
      `The Dragon breathes fire down at ${playerName} as they hold up the shield in desperation!\n To ${playerName}'s surprise the flames disperse around the shield!\nAs ${playerName} peered over the shield he realized the dragon was blinded by the Shield of Light!\n${playerName} seized the moment and plunged the Sword of Truth into it's dark and twisted heart!\nThe Dragon roared and crashed one last time as it fell and the floor with it.\n${playerName} returned to the kingdom as a celebrated hero for ages to come...\nThe End>_`
    );
    process.exit();
  } 

  //Game Over Part 2
  if (
    !answer.includes("slay dragon") &&
    player.inventory.includes("sword of truth") &&
    player.inventory.includes("shield of light")
  ) {
    player.status = 'dead'
    console.log(
      `${playerName} checks the room for loot...${(currentRoom.loot)}>_\n${playerName} walks down an ornate hallway that leads to an even grander throne room.\nThe expanse of the chamber is captivating but a thundering crash and deafening roar knocks ${playerName} on their back!\nA towering dragon is looming over you with the contrast of a menacing grin and the majesty of it's natural prowess.\nThe Dragon: "Pathetic creature!!! How dare you enter MY DOMAIN! I claimed these ruins long ago, soon I will claim your kingdom too but first I will take your life!\nWithout the proper means to protect themselves, the Dragon tears and burns ${playerName} asunder!\nThe kingdom fell under the dark rule of the Dragon, which he rules until this very day...\n${playerName} had failed only to join the rest of the bones in the graveyard...\nThe End>_`
    );   
  }
}


//Call to Begin the Game
gameSequence()
