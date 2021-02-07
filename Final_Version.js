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
///////////////////////////////////////////////////////////////////////////////////////////
//Room Template
class Rooms {
  constructor(
    //Room One
    roomDescription = `After a long journey you finally arrives at the dungeon. With the fatigue of many miles and the wizard who summoned a hero, you stands in front of ominous stone door etched into the face of the mountain. It is an fitting that it leads to the great beast that has been plaguing the countryside.\nThe Wizard: " You are the chosen one, the ONLY one who can wield the power great enough to slay the dragon! Hold my staff to reveal the password sigils, speak the words and enter the cavern to fulfill your destiny!"\n >_`,
    loot = ["staff"],
    nextRoom = this.narrowPassage,
    name = "entrance",
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
    this.roomDescription = `You look around only and to see jagged walls in close proximity. They stretch downward making the small passage even more narrow with every inch. The only possible way to fit is to crawl on the floor...\n>_`;
    this.loot = [' ']
    // this.door = false;
    // this.doorLock = `crawl`;

  }
  // Method to convert the current room to the 3rd room 'Treasure Room';
  treasureRoom() {
    this.name = `Treasure Room`;
    this.nextRoom = this.graveyardRoom;
    this.roomDescription = `The narrow passage opens suddenly to a treasure room with filled with riches that tempt ${playerName} to take them.\n The only way forward is to open a sturdy looking door on the opposite side of the chamber.\n>_`;
    //this.door = true;
    this.loot = [`key`];
  }
  // Method to convert the current room to the 4th room 'Graveyard Room';
  graveyardRoom() {
    this.loot = [`Sword of Truth`];
    this.name = `Graveyard`;
    this.nextRoom = this.throneRoom;
    this.roomDescription = `This chamber is naught but an unsanctioned graveyard littered by piles bones without headstones or burials.\n As ${playerName} takes each step the ground makes an audible "CRRUUUNNCH!".\nThere is a single plain door on each wall providing four directions to travel, forward, right, left and backward.\n${playerName} couldn't help but notice a small glint amidst the mounds of skeletons, perhaps it should be examined...>_`
    // this.door = true;
    // this.secretDoor = false;
    // this.fakeDoor = false;
    //this.doorLock = `key`;
  }
  // Method to convert the current room to the 5th room 'Ancient Armory'
  ancientArmory() {
    this.loot = [`Shield of Light`];
    this.name = `Ancient Armory`;
    this.nextRoom = this.graveyardRoom;
    this.roomDescription = `The room has a likeness to the treasure room but lacks it's luster.\nUseless, aged tools of war neatly line the walls as if asking to be used again.\n Something catches your eye and you see a faintly glowing shield that seems untouched by time.\nIt seems like a good idea for ${playerName} to take the shield.\n>_`;
    // this.door = true;
  }
  // Method to convert the current room to the 6th room `Throne Room1;
  throneRoom() {
    this.name = `Throne Room`;
    this.nextRoom = this.firstRoom;
    this.roomDescription = `${playerName} walks down an ornate hallway that leads to an even grander throne room.\nThe expanse of the chamber is captivating but a thundering crash and deafening roar knocks ${playerName} on their back!\nA towering dragon is looming over you with the contrast of a menacing grin and the majesty of it's natural prowess.\nThe Dragon: "Pathetic creature!!! How dare you enter MY DOMAIN! I claimed these ruins long ago, soon I will claim your kingdom too but first I will take your life!\nWithout the proper means to protect yourself the Dragon tears and burns ${playerName} asunder!\nThe kingdom fell under the dark rule of the Dragon, which he rules until this very day...\n${playerName} had failed only to become join the rest of the bones in the graveyard...\nThe End>_`;
    this.loot = [' '];
    //this.door = true;
  }
  lootAdded(item){
    this.loot.push(item)
  }
  lootRemoved(item) {
    let newArr =[]
    console.log(this.loot)
    this.loot.forEach(element => {
      if (element!= item){
        newArr.push(element)
      }
    });
  }
  displayDescription() {
    return this.roomDescription
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

  inventory() {
    return `You have ${this.playerInventory} on you`;
  }
  equip(item) {
    this.playerInventory.push(item);
  }
  drop(item) {
    let newArr =[]
    console.log(this.playerInventory)
    this.playerInventory.forEach(element => {
      if (element!= item){
        newArr.push(element)
      }
    });
  this.playerInventory = newArr
   console.log(this.playerInventory)
   
  }
  
}

/////////////////////
//Main Game Sequence
/////////////////////
async function start() {
  //Establish Objects
  let player = new Player();
  let currentRoom = new Rooms();

  //Establish Character Name
  playerName = await ask(`What is your character's name?`);

  //Player Instructions
  await ask(`In order for ${playerName} to progress through the game you must type in the actions
  in the format of...\n  verb  +  object's name   example: open door\nThese will be key phrases hinted at throughout the game play, good luck!\n\nPress enter when you're ready...`);

  //First Room Description
  let answer = await ask(
    currentRoom.displayDescription()
  );

    answer = answer.toLowerCase()

  while (!answer.includes("hold staff")) {
    if (answer.includes("staff")) {
      answer = await ask("The wizard always keep the staff\n>_");
    } else {
      answer = await ask(
        `The Wizard: "${playerName}! You must hold the staff to see the sigils!\n>_"`
      );
    }
  }

  answer = answer.toLowerCase()

  // loop for the 1st task shows the spell and if answer is read spell goes on, if not gives a hint
  if (answer === "hold staff") {
    answer = await ask(
      `The sigils appear around the stone and grow brighter the longer you hold the staff...\nWizard: The spell has appeared! Now ${playerName}! Cast the spell!\n>_ `
    );
  }

  answer = answer.toLowerCase()

  while (!answer.includes("cast spell")) {
    answer = await ask(
      `The Wizard: "${playerName}! You must cast the spell to open the dungeon!"`
    );
  }

  answer = answer.toLowerCase()

  if (answer.includes("cast spell")) {
    currentRoom.narrowPassage()
    console.log(
      `The door slides open with in a slow rumble and finishes the process with a resounding BOOM!\n Wizard: The fate of the kingdom rests in your hands now ${playerName}!\nYou step inside the cave only to be engulfed by darkness...\n`
    );
    answer = await ask(
      `${playerName} cannot see at all! Check your inventory for tools you use.\n>_`
    );
  }

  answer = answer.toLowerCase()

  while (!answer.includes("check inventory")) {
    answer = await ask(
      `${playerName} cannot see at all! Check your inventory for tools you use.\n>_`
    );
  }

  answer = answer.toLowerCase()

  if (answer.includes("check inventory")) {
    answer = await ask(`${player.inventory()}\n>_`);
  }

  answer = answer.toLowerCase()

  while (!answer.includes("light torch")) {
    answer = await ask(
      `${playerName} cannot see at all! ${playerName} looks for their torch to light...\n>_`
    );
  }

  answer = answer.toLowerCase()

  if (answer.includes("light torch")) {
    console.log(
      `The room blazes with illumination as the torch catches fire!\n`
    );
    answer = await ask(
      currentRoom.displayDescription()
    );
  }

  answer = answer.toLowerCase()

  while (!answer.includes("crawl floor")) {
    answer = await ask(
      `The only way ${playerName} can progress is to crawl along the floor!`
    );
  }

  answer = answer.toLowerCase()

  //Treasure Room method
  if (answer.includes("crawl floor")) {
    currentRoom.treasureRoom()
    console.log(
      `${playerName} barely fits but manages to make it past a prolonged and suffocating squeeze!\nThe small opening drops ${playerName} down into the next room, too high to climb back out.`
    );
    answer = await ask(
      currentRoom.displayDescription()
    );
  }

  answer = answer.toLowerCase()

  if (answer.includes("take key")) {
    player.equip("key");
    answer = await ask(player.inventory());
  }
  while (!answer.includes("open door")) {
    answer = await ask(
      `The only way ${playerName} can progress is to open the door!`
    );
  }

  answer = answer.toLowerCase()

  //Graveyard Room method without key
  if (answer.includes("open door")) {
    currentRoom.graveyardRoom()
    answer = await ask(
      currentRoom.displayDescription()
    );
  }

  answer = answer.toLowerCase()

  while (
    !answer.includes("travel left") &&
    !answer.includes("travel forward")
  ) {
    answer = await ask(
      `The only way ${playerName} can progress is to travel forward, travel right, travel left!\n>_`
    );
  }

  answer = answer.toLowerCase()

  //Ancient Armory method
  if (
    answer.includes("travel left") &&
    !player.playerInventory.includes("key")
  ) {
    answer = await ask(
      `This door is locked, and ${playerName} doesn't have a key.\n>_`
    );
  }

  answer = answer.toLowerCase()

  if (
    answer.includes("travel left") &&
    player.playerInventory.includes("key")
  ) {
    currentRoom.ancientArmory()
    answer = await ask(
      currentRoom.displayDescription()
    );
  }

  answer = answer.toLowerCase()

  while (!answer.includes("travel back") && !answer.includes("take shield") && !player.playerInventory.includes('shield')) {
    answer = await ask(
      `${playerName} looks around and sees the only way out is the door ${playerName} came through. ${playerName} thinks that shield looks powerful...\n>_`
    );
  }

  answer = answer.toLowerCase()

  if (answer.includes("take shield")&& !player.playerInventory.includes("shield")) {
    while(player.playerInventory.includes('torch')){
        answer = await ask(`${playerName} you have to much stuff in your hand drop something`)
        
        answer = answer.toLowerCase()
        
        if (answer.includes("drop torch")){
          answer = answer.toLowerCase()
          
          //console.log(player.playerInventory)
           player.drop("torch");
           //currentRoom.lootAdded("torch") 
           //console.log(currentRoom.loot())
          answer = await ask(`${playerName} you can now pick up the sheild.`)
          answer = answer.toLowerCase()
        }
    }
    answer = await ask(
      `The shield glows brighter and BRIGHTER the closer that ${playerName} with each step towards it.\nNow ${playerName} must travel backward to the graveyard room as the new found light sources reveals the armory as a dead-end.\n>_`
    );
  }

  answer = answer.toLowerCase()
  
  while (answer !== "travel backward") {
    answer = await ask(
      `${playerName} looks around and sees the only way out is the door ${playerName} came through`
    );
  }

  answer = answer.toLowerCase()

  if (answer === "travel backward") {
    answer = await ask(
      `This chamber is naught but an unsanctioned graveyard littered by piles bones without headstones or burials.\n As ${playerName} takes each step the ground makes an audible "CRRUUUNNCH!".\nThere is a single plain door on each wall providing four directions to travel, forward, right, left and backwards\n${playerName} couldn't help but notice a small glint amidst the mounds of skeletons, perhaps it should be examined...>_`
    );
  }

  answer = answer.toLowerCase()

  //Throne Room
  if (
    answer == "travel forward" &&
    player.playerStash.includes("Sword of Truth") &&
    player.playerStash.includes("Shield of Light")
  ) {
    currentRoom.throneRoom()
    answer = await ask(
      `${playerName} walks down an ornate hallway that leads to an even grander throne room.\nThe expanse of the chamber is captivating but a thundering crash and deafening roar knocks ${playerName} on their back!\nA towering dragon is looming over you with the contrast of a menacing grin and the majesty of it's natural prowess.\nThe Dragon: "You must be the chosen one!!! Even with the weapons of the "chosen" you cannot defeat me! I claimed these ruins long ago, soon I will claim your kingdom too, but first I will take your life!\nWith sword and shield in hand the only choice ${playerName} has is the slay the dragon, once and for all!\n>_`
    );
  }

  answer = answer.toLowerCase()

  if (answer == "slay dragon") {
    console.log(
      `The Dragon breathes fire down at ${playerName} as they hold up the shield in desperation!\n To ${playerName}'s surprise the flames disperse around him leaving ${playerName} unharmed.\nAs ${playerName} peered over the shield he realized the dragon was blinded by the Shield of Light!\n${playerName} seized the moment and plunged the Sword of Truth into it's dark and twisted heart!\nThe Dragon roared and crashed one last time as it fell and the floor with it.\n${playerName} returned to the kingdom as a celebrated hero for ages to come...\nThe End>_`
    );
    process.exit();
  } else if (answer == "travel forward") {
    console.log(
      currentRoom.displayDescription()
    );
    process.exit();
  }
}

//Call to Begin the Program
start();
