//User Input Setup
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
//Room Template
class Rooms {
  constructor(
    //Room One
    roomDescription = `After a long journey you finally arrives at the dungeon.\nWith the fatigue of many miles and the wizard who summoned a hero, you stand in front of an ominous stone door etched into the face of the mountain.\nIt is an fitting that it leads to the great beast that has been plaguing the countryside.\nThe Wizard: " You are the chosen one, the ONLY one who can wield the power great enough to slay the dragon! Hold my staff to reveal the password sigils, speak the words and enter the cavern to fulfill your destiny!"\n >_`,
    loot = ["staff"],
    nextRoom = this.narrowPassage,
    name = "entrance"
    // door = false,
    // secretDoor = false,
    // fakeDoor = "fake door",
    // doorLock = "reading spell"
  ) {
    //Room Setup
    this.loot = loot;
    this.roomDescription = roomDescription;
    this.nextRoom = nextRoom;
    this.name = name;
    // this.door = door;
    // this.secretDoor = secretDoor;
    // this.fakeDoor = fakeDoor;
    // this.doorLock = doorLock;
  }
  // Method to convert the current room to the 1st room 'Cave Entrance'
  firstRoom() {
    currentRoom = new Rooms();
  }
  // Method to convert the current room to the 2nd room 'Narrow Passage'
  narrowPassage() {
    this.name = `Narrow Passage`;
    this.nextRoom = this.treasureRoom;
    this.roomDescription = `${playerName} looks around only and to see jagged walls in close proximity.\nThey stretch downward making the small passage even more narrow with every inch. The only possible way to fit is to crawl on the floor...\n>_`;
    this.loot = [" "];
    // this.door = false;
    // this.doorLock = `crawl`;
  }
  // Method to convert the current room to the 3rd room 'Treasure Room';
  treasureRoom() {
    this.name = [`Treasure Room`];
    this.nextRoom = this.graveyardRoom;
    this.roomDescription = `The narrow passage opens suddenly to a treasure room filled with riches that tempt ${playerName} to take them.\n The only way forward is to open a sturdy looking door on the opposite side of the chamber.\n>_`;
    //this.door = true;
    this.loot = [`key`];
  }
  // Method to convert the current room to the 4th room 'Graveyard Room';
  graveyardRoom() {
    this.loot = [`sword`];
    this.name = `Graveyard`;
    this.nextRoom = this.throneRoom;
    this.roomDescription = `This chamber is naught but an unsanctioned graveyard littered by piles bones without headstones or burials.\nAs ${playerName} takes each step the ground makes an audible "CRRUUUNNCH!".\nThere is a single heavy door on the left wall and an ornate archway on the opposite side of the room.\n${playerName} couldn't help but notice a small glint amidst the mounds of skeletons, upon inspection ${playerName} realizes it a sword.\nThis is no ordinary sword! It is the long lost Sword of Truth!\n>_`;
  }
  // Method to convert the current room to the 5th room 'Ancient Armory'
  ancientArmory() {
    this.loot = [`shield`];
    this.name = `Ancient Armory`;
    this.nextRoom = this.graveyardRoom;
    this.roomDescription = `The room has a likeness to the treasure room but lacks it's luster.\nUseless, aged tools of war neatly line the walls as if asking to be used again.\n Something catches ${playerName}'s eye.\nA faintly glowing shield that seems untouched by time.\nIt seems like a good idea for ${playerName} to take the shield.\n>_`;
    // this.door = true;
  }
  // Method to convert the current room to the 6th room `Throne Room1;
  throneRoom() {
    this.name = `Throne Room`;
    this.nextRoom = this.firstRoom;
    this.roomDescription = `${playerName} walks down an ornate hallway that leads to an even grander throne room.\nThe expanse of the chamber is captivating but a thundering crash and deafening roar knocks ${playerName} on their back!\nA towering dragon is looming over ${playerName} with a menacing grin in contrast to it's majesty and natural prowess.\nThe Dragon: "Pathetic creature!!! How dare you enter MY DOMAIN! I claimed these ruins long ago, soon I will claim your kingdom too but first I will take your life!\nWithout the proper means to protect ${playerName} the Dragon tears and burns ${playerName} asunder!\nThe kingdom fell under the dark rule of the Dragon, which he rules until this very day...\n${playerName} had failed only to become join the rest of the bones in the graveyard...\nThe End>_`;
    this.loot = [" "];
    //this.door = true;
  }
  //Method to Display Current Room Description
  displayDescription() {
    return this.roomDescription;
  }
}
//Player Template
class Player {
  constructor(playerName, playerInventory = ["torch"], status = "normal") {
    this.playerName = playerName;
    this.currentRoom;
    this.playerInventory = playerInventory;
    this.status = status;
  }
  //Player's List of Held Items
  inventory() {
    return `You have ${this.playerInventory} on you`;
  }
  //Player Takes Item from Room
  equip(item) {
    this.playerInventory.push(item);
  }
  //Player Drops Item in Room
  drop(item) {
    let newArr = [];
    // console.log(this.playerInventory);
    this.playerInventory.forEach((element) => {
      if (element != item) {
        newArr.push(element);
      }
    });
    this.playerInventory = newArr;
    // console.log(this.playerInventory);
  }
}

/////////////////////
//Main Game Sequence
/////////////////////
async function start() {
  //Establish Objects
  let player = new Player();
  let currentRoom = new Rooms();
  //console.log(currentRoom.displayDiscription())
  //Establish Character Name
  playerName = await ask(
    `${welcomeIcon}\n\nWhat is your character's name?\n>_`
  );

  //Player Instructions
  await ask(
    `In order for ${playerName} to progress through the game you must type in the actions in the format of...\n  verb  +  object's name   example: open door\nThese will be key phrases hinted at throughout the game play, good luck!\n\nPress enter when you're ready...\n`
  );

  //First Room Description
  let answer = await ask(currentRoom.displayDescription());
  //Answer Sanitization
  answer = answer.toLowerCase();
  //Entrance Puzzle Failure Loop 1
  while (!answer.includes("hold staff")) {
    //Immovable Object
    if (answer.includes("staff")) {
      answer = await ask(
        `${playerName} wouldn't part an old man from his walking stick!\n>_`
      );
    } else {
      answer = await ask(
        `${wizardIcon}\nThe Wizard: "${playerName}! You must hold the staff to see the sigils!\n>_`
      );
    }
    answer = answer.toLowerCase();
  }
  //Answer Sanitization
  answer = answer.toLowerCase();

  //Dungeon Entrance Puzzle Step 1 Complete
  if (answer === "hold staff") {
    answer = await ask(
      `The sigils appear around the stone and grow brighter the longer you hold the staff...\n${wizardIcon}\nWizard: The spell has appeared! Now ${playerName}! Cast the spell!\n>_ `
    );
  }
  //Answer Sanitization
  answer = answer.toLowerCase();
  //Dungeon Entrance Puzzle Failure Loop 2
  while (!answer.includes("cast spell")) {
    answer = await ask(
      `${wizardIcon}\nThe Wizard: "${playerName}! You must cast the spell to open the dungeon!\n>_"`
    );
    answer = answer.toLowerCase();
  }
  //Answer Sanitization
  answer = answer.toLowerCase();
  //Dungeon Entrance Puzzle Step 2 Complete
  //Narrow Passage Room Transition
  if (answer.includes("cast spell")) {
    currentRoom.narrowPassage();
    console.log(
      `The door slides open with in a slow rumble and finishes the process with a resounding BOOM!\n${wizardIcon}\nWizard: The fate of the kingdom rests in your hands now ${playerName}!\nYou step inside the cave only to be engulfed by darkness...\n`
    );
    answer = await ask(
      `${playerName} cannot see at all! Check your inventory for tools you use.\n>_`
    );
  }
  //Answer Sanitization
  answer = answer.toLowerCase();
  //Narrow Passage Failure Loop 1
  while (!answer.includes("check inventory")) {
    answer = await ask(
      `${playerName} cannot see at all! Check your inventory for tools you use.\n>_`
    );
    answer = answer.toLowerCase();
  }
  //Answer Sanitization
  answer = answer.toLowerCase();
  //Narrow Passage Inventory Check
  if (answer.includes("check inventory")) {
    answer = await ask(`${player.inventory()}\n>_`);
  }
  //Answer Sanitization
  answer = answer.toLowerCase();
  //Narrow Passage Puzzle Failure Loop
  while (!answer.includes("light torch")) {
    answer = await ask(
      `${playerName} cannot see at all! ${playerName} looks for their torch to light...\n>_`
    );
    answer = answer.toLowerCase();
  }
  //Answer Sanitization
  answer = answer.toLowerCase();
  //Narrow Passage Puzzle Success
  if (answer.includes("light torch")) {
    console.log(
      `The room blazes with illumination as the torch catches fire!\n>_`
    );
    answer = await ask(currentRoom.displayDescription());
  }
  //Answer Sanitization
  answer = answer.toLowerCase();
  //Narrow Passage Puzzle Failure Loop
  while (!answer.includes("crawl floor")) {
    answer = await ask(
      `The only way ${playerName} can progress is to crawl along the floor!\n>_`
    );

    answer = answer.toLowerCase();
  }
  //Answer Sanitization
  answer = answer.toLowerCase();
  //Narrow Passage Puzzle Success
  //Treasure Room Transition
  if (answer.includes("crawl floor")) {
    currentRoom.treasureRoom();
    console.log(
      `${playerName} barely fits but manages to make it past a prolonged and suffocating squeeze!\nThe small opening drops ${playerName} down into the next room, too high to climb back out.\n>_`
    );
    answer = await ask(currentRoom.displayDescription());
  }
  //Answer Sanitization
  answer = answer.toLowerCase();
  //Player Adds Key to Inventory
  while (!answer.includes("open door")) {
    if (answer.includes("take key")) {
      player.equip("key");
      answer = await ask(`${player.inventory()}\n>_`);
    } else {
      answer = await ask(
        `The only way ${playerName} can progress is to open the door!\n>_`
      );
    }
    answer = answer.toLowerCase();
  }
  //Answer Sanitization
  answer = answer.toLowerCase();

  //Graveyard Room method without key
  if (answer.includes("open door")) {
    currentRoom.graveyardRoom();
    answer = await ask(currentRoom.displayDescription());
  }
  //Answer Sanitization
  answer = answer.toLowerCase();
  //Graveyard Puzzle Failure Loop
  while (!answer.includes("take sword")) {
    answer = await ask(
      `It's not safe to go without a weapon, How would you slay the monster!\n>_`
    );
    answer = answer.toLowerCase();
  }
  //Graveyard Puzzle Success
  //Player Adds Sword to Inventory
  if (answer.includes("take sword")) {
    player.equip("sword");
    answer = await ask(`${player.inventory()}\n>_`);
  }

  answer = answer.toLowerCase();

  //Incorrect Player Input
  while (
    !answer.includes("travel left") &&
    !answer.includes("travel forward")
  ) {
    answer = await ask(
      `The only way ${playerName} can progress is to travel forward, travel left!\n>_`
    );
    answer = answer.toLowerCase();
  }
  //Answer Sanitization
  answer = answer.toLowerCase();
  //Locked Door Failure Without the Key
  if (
    answer.includes("travel left") &&
    !player.playerInventory.includes("key")
  ) {
    answer = await ask(
      `This door is locked, and ${playerName} doesn't have a key.\n>_`
    );
    answer = answer.toLowerCase();
    while (!answer.includes("travel forward")) {
      answer = await ask(
        `The only way ${playerName} can progress now is to travel forward!\n>_`
      );
      answer = answer.toLowerCase();
    }
  }
  //Answer Sanitization
  answer = answer.toLowerCase();
  //Locked Door Success With Key
  if (
    answer.includes("travel left") &&
    player.playerInventory.includes("key")
  ) {
    currentRoom.ancientArmory();
    answer = await ask(currentRoom.displayDescription());
    //Answer Sanitization
    answer = answer.toLowerCase();
    while (
      !answer.includes("travel back") &&
      !answer.includes("take shield") &&
      !player.playerInventory.includes("shield")
    ) {
      answer = await ask(
        `${playerName} looks around and sees the only way out is the door ${playerName} came through.\n${playerName} thinks that shield looks powerful...\n>_`
      );
      answer = answer.toLowerCase();
    }
    //Answer Sanitization
    answer = answer.toLowerCase();
    //Player Shield Pickup Management
    if (
      answer.includes("shield") &&
      !player.playerInventory.includes("shield")
    ) {
      while (player.playerInventory.includes("torch")) {
        answer = await ask(
          `${playerName} you have too much stuff in your hand drop something\n>_`
        );
        answer = answer.toLowerCase();
        if (answer.includes("drop torch")) {
          player.drop("torch");
          answer = await ask(
            `${player.inventory()}\n${playerName} you can now take the shield.\n>_`
          );
        }
        answer = answer.toLowerCase();
      }
      answer = answer.toLowerCase();
    }
    //Answer Sanitization
    answer = answer.toLowerCase();
    //Incorrect Player Input
    while (!answer.includes("travel back") && !answer.includes("take shield")) {
      answer = await ask(
        `${playerName} Can only travel back to the graveyard room as the new and improved light sources confirms the armory as a dead-end.\n>_`
      );
      answer = answer.toLowerCase();
    }
    if (answer.includes("take shield")) {
      player.equip("shield");
      answer = await ask(
        `${player.inventory()}\nThe shield glows brighter and BRIGHTER the closer that ${playerName} with each step towards it.\nThis must be the fabled Shield of Light!\n${playerName} looks around and sees the only way out is travel back to the graveyard.\n>_`
      );
      answer = answer.toLowerCase();
      while (!answer.includes("travel back")) {
        answer = await ask(
          `${playerName} Can only travel back to the graveyard room as the new and improved light sources confirms the armory as a dead-end.\n>_`
        );
        answer = answer.toLowerCase();
      }
    }
    //Answer Sanitization
    answer = answer.toLowerCase();
    //Re-Enter the Graveyard
    if (answer.includes("travel back")) {
      answer = await ask(
        `The armory collapses as ${playerName} barely makes it through the doorway!\nThis chamber is naught but an unsanctioned graveyard littered by piles bones without headstones or burials.\nAs ${playerName} takes each step the ground makes an audible "CRRUUUNNCH!".\nThe only direction to travel is forward through the ornate archway on the other side of the room.\n>_`
      );
    }
    //Answer Sanitization
    answer = answer.toLowerCase();
    //Incorrect Player Input
    while (!answer.includes("travel forward")) {
      answer = await ask(
        `The only way ${playerName} can progress now is to travel forward!\n>_`
      );
      answer = answer.toLowerCase();
    }
    //Answer Sanitization
    answer = answer.toLowerCase();
    //
  }
  //Throne Room Successful Transition
  //Victory Requires Having the Sword and the Shield
  if (
    answer.includes("travel forward") &&
    player.playerInventory.includes("shield")
  ) {
    currentRoom.throneRoom();
    answer = await ask(
      `${playerName} walks down an ornate hallway that leads to an even grander throne room.\nThe expanse of the chamber is captivating but a thundering crash and deafening roar knocks ${playerName} on their back!\nA towering dragon is looming over you with the contrast of a menacing grin and the majesty of it's natural prowess.\nThe Dragon: "You must be the chosen one!!! Even with the weapons of the "chosen" you cannot defeat me! I claimed these ruins long ago, soon I will claim your kingdom too, but first I will take your life!\nWith sword and shield in hand the only choice ${playerName} has is the slay the dragon, once and for all!\n>_`
    );
    answer = answer.toLowerCase();
    //One Last Chance for the Player to Act
    if (!answer.includes("slay dragon")) {
      answer = await ask(`The dragon lunges toward ${playerName}!\n>_`);
    }
    //Answer Sanitization
    answer = answer.toLowerCase();
    //Victory Scenario
    if (answer.includes("slay dragon")) {
      console.log(
        `${deadMonster}\nThe Dragon breathes fire down at ${playerName} as they hold up the shield in desperation!\n To ${playerName}'s surprise the flames disperse around him leaving ${playerName} unharmed.\nAs ${playerName} peered over the shield he realized the dragon was blinded by the Shield of Light!\n${playerName} seized the moment and plunged the Sword of Truth into it's dark and twisted heart!\nThe Dragon roared and crashed one last time as it fell and the floor with it.\n${playerName} returned to the kingdom as a celebrated hero for ages to come...\nThe End>_`
      );
      process.exit();
    }
    //Defeat Scenario 1
    else {
      console.log(
        `${playerName} doesn't react in time!\nThe Dragon tears and burns ${playerName} asunder!\nThe kingdom fell under the dark rule of the Dragon, which he rules until this very day...\n${playerName} had failed only to join the rest of the bones in the graveyard...\nThe End>_`
      );
      console.log(deadIcon);
      process.exit();
    }
  }
  //Defeat Scenario 2
  else if (
    answer.includes("travel forward") &&
    !player.playerInventory.includes("shield")
  ) {
    console.log(
      `${playerName} walks down an ornate hallway that leads to an even grander throne room.\nThe expanse of the chamber is captivating but a thundering crash and deafening roar knocks ${playerName} on their back!\nA towering dragon is looming over ${playerName} with the with a menacing grin in contrast to it's majesty and natural prowess.\nThe Dragon: "Pathetic creature!!! How dare you enter MY DOMAIN! I claimed these ruins long ago, soon I will claim your kingdom too but first I will take your life!\nWithout the proper means to protect themselves, the Dragon tears and burns ${playerName} asunder!\nThe kingdom fell under the dark rule of the Dragon, which he rules until this very day...\n${playerName} had failed only to join the rest of the bones in the graveyard...\nThe End>_`
    );
    console.log(memeIcon);
    process.exit();
  }
}
//// images
let deadIcon =
`  ▄    ▄▄▄▄▄▄▄    ▄
 ▀▀▄ ▄█████████▄ ▄▀▀
     ██ ▀███▀ ██     
   ▄ ▀████▀████▀ ▄    
 ▀█    ██▀█▀██    █▀  `;
 let wizardIcon = 
 ` ▒▓▒▓▒▓▒▓▒▓▒▓ ▄▀▀▀▄
  ██▀████▀██  ▀▄▀  █
 O▀████████▀O     █
    ▀█▄▄█▀        █
   ▓▒▓▒▓▒▓▒       █
 `;
 let deadMonster = 
 `      ▄██████▄
     ▄███ X █████████▄
    ▄█████████████████▄
  ▄█████ ▼ ▼ ▼ ▼ ▼▼▼▼▼
 ▄███████▄ ▲ ▲▲▲▲▲▲▲▲
 ████████████████████▀▀`;
 let welcomeIcon =
 ` █▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
 █░░╦ ╦╔╗╦ ╔╗╔╗╔╦╗╔╗░░█
 █░░║║║╠ ║ ║ ║║║║║╠ ░░█
 █░░╚╩╝╚╝╚╝╚╝╚╝╩ ╩╚╝░░█
 █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█`;
 let memeIcon =
 `     ▄▄▄▀▀▀▀▀▀▀▀▀▄▄▄         
   ▄▀               ▀▀▄▄     
  ▄▀                    ▀▄   
 ▄▀                       █  
 █                         █ 
▐                           █
█    ▀▀█▄▄▄   ▄▌            ▐
▌     ▌ ██▀█▀▀   ▄▄▄▄▄    ▌ ▐
▌     ▀▄▄▄▀      ▌ ▀███▄▄▀  ▐
▌                 ▀▄▄▄▄▀   ▄▌
▐    ▐▀                   ▄▀ 
 █   ▌  ▄▀▀▀▄▄▄          ▄▀  
  █  ▀    ▄▄▄▄ ▀▀▌  ▌   █    
   ▀▄         ▀   ▄▀  ▄▀     
     ▀▄▄▄         ▄▄▀▀       
        ▐▀▀▀▀▀▀▀▀▀           
        █                    
█▀▀█ █▀▀█ █▀▀ 　 █  █ █▀▀█ █  █
█▄▄█ █▄▄▀ █▀▀ 　 █▄▄█ █  █ █  █
▀  ▀ ▀ ▀▀ ▀▀▀ 　 ▄▄▄█ ▀▀▀▀  ▀▀▀
█ ▄▀ ▀█▀  █▀▀▄  █▀▀▄ ▀█▀  █▄  █  █▀▀█
█▀▄   █   █  █  █  █  █   █ █ █  █ ▄▄
█  █ ▄█▄  █▄▄▀  █▄▄▀ ▄█▄  █  ▀█  █▄▄█
█▀▄▀█  █▀▀▀ ▀█
█ █ █  █▀▀▀ █▀
█   █  █▄▄▄ ▄ 
`;
//Call to Begin the Program
start();
