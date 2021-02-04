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
  //Gives Interaction Option
  examine() {
    return;
  }
  //Facilitates Room Change
  travel() {
    return;
  }
  //Room Two
  narrowPassage() {
    return;
  }
  //Room Three
  treasureRoom() {
    return;
  }
  //Room Four
  graveRoom() {
    return; 
  }
  //Room Five
  armory() {
    return;
  }
  //Room Six
  throneRoom() {
    return;
  }
}

//Room One

//Room Two

//Room Three

//Room Four

//Room Five

//Room Six

//Character Template
class Character {
  constructor(inventory = "torch", status = "normal") {
    this.inventory = inventory;
    this.status = status;
  }
  equip() {
    return;
  }
  drop() {
    return;
  }
}

//Main Game Sequence
async function start() {
  //Game Introduction
  const welcomeMessage = `After a long journey you finally arrive at the dungeon.
      With the fatigue of many miles and the wizard who summoned you, you stand in front of
      ominous door that leads you to the great beast that has been plaguing the countryside.\n
      The Wizard: "You are the chosen one, the ONLY one who can wield the power great
      enough to slay the dragon! Go forth and fulfill your destiny!"`;
  //Player Prompts Game Start
  let characterAction = await ask(welcomeMessage);
  
  if (characterAction !== ) {

  } 
  //Room One

  //Room Two

  //Room Three

  //Room Four

  //Room Five

  //Room Six

  //Victory, Defeat or Exit
  process.exit();
}

//Call to Begin the Program
start();

