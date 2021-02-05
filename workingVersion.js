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
    roomDescription = "in front of cave",
    item = "staff",
    nextRoom = "narrow passage",
    name = "entrance",
    door = false,
    secretDoor = false,
    fakeDoor = "fake door",
    doorLock = "reading spell"
  ) {
    //Room Setup
    this.item = item;
    this.roomDescription = roomDescription;
    this.nextRoom = nextRoom;
    this.name = name;
    this.door = door;
    this.secretDoor = secretDoor;
    this.fakeDoor = fakeDoor;
    this.doorLock = doorLock;
  }
  // Method to convert the current room to the 1st room 'Cave Entrance'
  firstRoom() {
    currentRoom = new Rooms();
  }
  // Method to convert the current room to the 2nd room 'Narrow Passage'
  narrowPassage() {
    this.name = `Narrow Passage`;
    this.nextRoom = `Treasure Room`;
    this.roomDescription = `Dark Room`;
    this.door = false;
    this.doorLock = `crawl`;
  }
  // Method to convert the current room to the 3rd room 'Treasure Room';
  treasureRoom() {
    this.name = `Treasure Room`;
    this.nextRoom = `Graveyard Room`;
    this.roomDescription = `Treasure room where the key is`;
    this.door = true;
    this.item = `key`;
  }
  // Method to convert the current room to the 4th room 'Graveyard Room';
  graveyardRoom() {
    this.item = `Sword of Truth`;
    this.name = `Graveyard`;
    this.nextRoom = `Throne Room`;
    this.roomDescription = `Room filled with bones and a magical sword`;
    this.door = true;
    this.secretDoor = false;
    this.fakeDoor = false;
    this.doorLock = `key`;
  }
  // Method to convert the current room to the 5th room 'Ancient Armory'
  ancientArmory() {
    this.item = `Shield of Light`;
    this.name = `Ancient Armory`;
    this.nextRoom = `Graveyard`;
    this.roomDescription = `Room filled mostly with old useless weapons`;
    this.door = true;
  }
  // Method to convert the current room to the 6th room `Throne Room1;
  throneRoom() {
    this.name = `Throne Room`;
    this.nextRoom = `Graveyard Room`;
    this.roomDescription = `Elegant Throne room inhabited by an evil dragon!`;
    this.door = true;
  }
}

//Player Template
class Player {
  constructor(playerName, playerInventory = "torch", status = "normal") {
    this.playerName = playerName;
    this.currentRoom;
    this.playerInventory = playerInventory;
    this.status = status;
  }

  inventory() {
    return `You have ${this.playerInventory} on you`;
  }
  equip() {
    // this.playerInventory.push(thingy);
    //return this.inventory();
  }
  drop() {
    // this.playerInventory.filter((item) => item != thingy);
    // return this.inventory();
  }
}
/////Function to sanitize answer
// let verb;
// let object;
// async function answerSan(answer) {
//   let answer1 = answer;
//   if (typeof answer1 == "string"){
//   answer1 = answer1.split(" ");
//   }
//   console.log(answer1);
//   console.log(answer1.length);
//   while (answer1.length != 2) {
//     console.log(answer1.length);
//     console.log(`enter right format`);
//     answer1 = await ask(`>_`);
//     console.log(answer1 + "answer1");
//     if (typeof answer1 == "string"){
//       answer1 = answer1.split(" ");
//     }
//     console.log(answer1);
//     //break;
//   }
//   verb = answer1[0].toLowerCase();
//   object = answer1[1].toLowerCase();
//   return answer1;
// }

/////////////////////
//Main Game Sequence
/////////////////////
async function start() {
  //Establish Character Name
  playerName = await ask(`What is your character's name?`);

  //Player Instructions
  await ask(`In order for ${playerName} to progress through the game you must type in the actions
  in the format of...\n  verb  +   object's Name   example: open door\nThese will be key phrases hinted at throughout the game play, good luck!\n\nPress enter when you're ready...`);

  //First Description
  const welcomeMessage = `After a long journey ${playerName} finally arrives at the dungeon. With the fatigue of many miles and the wizard who summoned you, you stand in front of ominous door that leads you to the great beast that has been plaguing the countryside.\nThe Wizard: "${playerName}! You are the chosen one, the ONLY one who can wield the power great enough to slay the dragon! Hold my staff to reveal the password sigils, speak the words and enter the cavern to fulfill your destiny!\n >_"`;

  //Player must 'speak the words and enter' or 'examine'

  let answer = await ask(welcomeMessage);
  //// answer Sanitization
  let verb;
  let object;
  string1 = answer.split(" ");

  // verb = string1[0].toLowerCase();
  // object = string1[1].toLowerCase();
  console.log(object);
  console.log(verb);
  console.log(string1);
// while loop woth everything inside and if for each condition
while(string1.length !== 2 || verb !== "hold" || object !== "staff"){
//loop if it is no 2 word
  while (string1.length !== 2) {
    console.log(`enter right format`);
    answer = await ask(`>_`);
    string1 = answer.split(" ");
  }
  console.log(verb);
  console.log(object);
  if (string1.length == 2) {
    verb = string1[0].toLowerCase();
    object = string1[1].toLowerCase();
  }
  // loop if it is not the desired answer
  while (verb !== "hold" || object !== "staff") {
    answer = await ask(
      `You can't ${verb} the ${object}!\nWizard:${playerName}! you must hold the staff with me to reveal the sigils!!\n>_`
      );
      string1 = answer.split(" ");
      if (string1.length == 2) {
        verb = string1[0].toLowerCase();
        object = string1[1].toLowerCase();
      }
    }
  }
  // loop for the 1st task shows the spell and if answer is read spell goes on, if not gives a hint
  if (verb == "hold" || object == "staff") {
    console.log(`working`);
    
  }

  //Else player does not type proper input, give them action options

  //If player inputs 'take the staff', change the room

  //If player inputs 'examine', describe the room more

  //If player inputs 'look in my backpack', describe your inventory

  //Second Room Description

  //Player must 'travel forward' or 'examine'

  //If player does not type proper input, give them a hint

  //If player inputs 'travel forward', change the room

  //If player inputs 'examine', describe the room more

  //If player inputs 'look in my backpack', describe your inventory

  //Third Room Description

  //Player must 'travel forward' or 'pick up the key' or 'examine'

  //If player does not type proper input, give them a hint

  //If player inputs 'travel forward', change the room

  //If player inputs 'examine', describe the room more

  //If player inputs 'look in my backpack', describe your inventory

  //Fourth Room Description

  //Player must 'travel forward' or 'use the key' or 'pick up the sword'

  //If player does not type proper input, give them a hint

  //If player inputs 'open door in front on you', change the room to throne room

  //If player inputs 'open door to the left', change the room to ancient armory

  //If player inputs 'open door to the right', indicate fake door

  //If player inputs 'examine', describe the room more

  //If player inputs 'look in my backpack', describe your inventory

  //Fifth Room Description

  //Player must 'travel forward' or 'pick up the shield' or 'examine' or 'drop torch'

  //If player does not type proper input, give them a hint

  //If player inputs 'travel forward', change the room

  //If player inputs 'examine', describe the room more

  //If player inputs 'look in my backpack', describe your inventory

  //Sixth Room Description

  //Player must 'slay the dragon' or 'run away' or 'examine'

  //If player does not type proper input, give them a hint

  //If player inputs 'travel forward', change the room

  //If player inputs 'examine', describe the room more

  //If player inputs 'look in my backpack', describe your inventory

  //Victory, Defeat or Exit
  process.exit();
}

//Call to Begin the Program
start();
