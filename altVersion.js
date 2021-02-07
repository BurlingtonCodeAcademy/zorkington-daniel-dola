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

// let currentRoom = dungeonEntrance

// let roomConnections = {
//   dungeonEntrance: ['narrowPassage'],
//   narrowPassage: ['treasureRoom'],
//   treasureRoom: ['graveyard'],
//   graveyard: ['ancientArmory', 'throneRoom'],
//   ancientArmory: ['graveyard'],
//   throneRoom: ['graveyard'],
// }

// function changeRoom (nextRoom) {
//   if(roomConnections[currentRoom].includes(nextRoom)) {
//     currentRoom =  nextRoom
//   }
// }

// let dungeonEntrance = {
//   description : `After a long journey ${playerName} finally arrives at the dungeon. With the fatigue of many miles and the wizard who summoned a hero, ${playerName} stands in front of ominous stone door etched into the face of the mountain. It is an fitting that it leads to the great beast that has been plaguing the countryside.\nThe Wizard: "${playerName}! You are the chosen one, the ONLY one who can wield the power great enough to slay the dragon! Hold my staff to reveal the password sigils, speak the words and enter the cavern to fulfill your destiny!"\n >_`,
//   loot : `There is no treasure in sight.`,
// }

// let narrowPassage = {
//   description : `${playerName} looks around only and to see jagged walls in close proximity. They stretch downward making the small passage even more narrow with every inch. The only possible way to fit is to crawl on the floor...\n>_`,
//   loot : `There is no treasure in sight.`,
// }

// let treasureRoom = {
//   description : `The narrow passage opens suddenly to a treasure room with filled with riches that tempt ${playerName} to take them.\n The only way forward is through to open a sturdy looking door on the opposite side of the chamber.\n>_`,
//   loot : `There is no treasure in sight.`,
// }

// let graveyard = {
//   description : `This chamber is naught but an unsanctioned graveyard littered by piles bones without headstones or burials.\n As ${playerName} takes each step the ground makes an audible "CRRUUUNNCH!".\nThere is a single plain door on each wall providing four directions to travel, forward, right, left and backward.\n${playerName} couldn't help but notice a small glint amidst the mounds of skeletons, perhaps it should be examined...>_`,
//   loot : [''],
// }

// let ancientArmory = {
//   description : `The room has a likeness to the treasure room but lacks it's luster.\nUseless, aged tools of war neatly line the walls as if asking to be used again.\n Something catches your eye and you see a faintly glowing shield that seems untouched by time.\nIt seems like a good idea for ${playerName} to take the shield.\n>_`,
//   loot : [''],
// }

// let throneRoom = {
//   gameOverDescription : `${playerName} walks down an ornate hallway that leads to an even grander throne room.\nThe expanse of the chamber is captivating but a thundering crash and deafening roar knocks ${playerName} on their back!\nA towering dragon is looming over you with the contrast of a menacing grin and the majesty of it's natural prowess.\nThe Dragon: "Pathetic creature!!! How dare you enter MY DOMAIN! I claimed these ruins long ago, soon I will claim your kingdom too but first I will take your life!\nWithout the proper means to protect yourself the Dragon tears and burns ${playerName} asunder!\nThe kingdom fell under the dark rule of the Dragon, which he rules until this very day...\n${playerName} had failed only to become join the rest of the bones in the graveyard...\nThe End>_`,
//   victoryDescription : `${playerName} walks down an ornate hallway that leads to an even grander throne room.\nThe expanse of the chamber is captivating but a thundering crash and deafening roar knocks ${playerName} on their back!\nA towering dragon is looming over you with the contrast of a menacing grin and the majesty of it's natural prowess.\nThe Dragon: "You must be the chosen one!!! Even with the weapons of the "chosen" you cannot defeat me! I claimed these ruins long ago, soon I will claim your kingdom too, but first I will take your life!\nWith sword and shield in hand the only choice ${playerName} has is the slay the dragon, once and for all!\n>_`,
//   loot : [''],
// }

// let player = {
// inventory : ['torch'],
// status : ['healthy'],
// }

/////////////////////
//Main Game Sequence
/////////////////////
async function start() {
  //Establish Objects
  // let player = new Player();
  // let currentRoom = new Rooms();

  //Establish Character Name
  playerName = await ask(`What is your character's name?`);

  //Player Instructions
  await ask(`In order for ${playerName} to progress through the game you must type in the actions
  in the format of...\n  verb  +  object's name   example: open door\nThese will be key phrases hinted at throughout the game play, good luck!\n\nPress enter when you're ready...`);

  //First Room Description
  let answer = await ask(
    `After a long journey ${playerName} finally arrives at the dungeon. With the fatigue of many miles and the wizard who summoned a hero, ${playerName} stands in front of ominous stone door etched into the face of the mountain. It is an fitting that it leads to the great beast that has been plaguing the countryside.\nThe Wizard: "${playerName}! You are the chosen one, the ONLY one who can wield the power great enough to slay the dragon! Hold my staff to reveal the password sigils, speak the words and enter the cavern to fulfill your destiny!"\n >_`
  );

  while (answer !== "hold staff") {
    answer = await ask(
      `The Wizard: "${playerName}! You must hold the staff to see the sigils!"`
    );
  }

  // loop for the 1st task shows the spell and if answer is read spell goes on, if not gives a hint
  if (answer === "hold staff") {
    
    answer = await ask(
      `door The sigils appear around the stone and grow brighter the longer you hold the staff...\nWizard: The spell has appeared! Now ${playerName}! Cast the spell!\n>_ `
    );
  }

  while (answer !== "cast spell") {
    answer = await ask(
      `The Wizard: "${playerName}! You must cast the spell to open the dungeon!"`
    );
  }

  if (answer === "cast spell") {
    console.log(
      `The door slides open with in a slow rumble and finishes the process with a resounding BOOM!\n Wizard: The fate of the kingdom rests in your hands now ${playerName}!\nYou step inside the cave only to be engulfed by darkness...\n`
    );
    answer = await ask(
      `${playerName} cannot see at all! ${playerName} looks for their torch to light...\n>_`
    );
  }

  while (answer !== "light torch") {
    answer = await ask(
      `${playerName} cannot see at all! ${playerName} looks for their torch to light...\n>_`
    );
  }

  //Narrow passage method
  
  if (answer === "light torch" && player.playerInventory.includes("torch")) {
    console.log(
      `The room blazes with illumination as the torch catches fire!\n`
    );
    answer = await ask(
      `${playerName} looks around only and to see jagged walls in close proximity. They stretch downward making the small passage even more narrow with every inch. The only possible way to fit is to crawl on the floor...\n>_`
    );
  }

  while (answer !== "crawl floor") {
    answer = await ask(
      `The only way ${playerName}can progress is to crawl along the floor!`
    );
  }

  //Treasure Room method
  if (answer === "crawl floor") {
    console.log(
      `${playerName} barely fits but manages to make it past a prolonged and suffocating squeeze!`
    );
    answer = await ask(
      `The narrow passage opens suddenly to a treasure room with filled with riches that tempt ${playerName} to take them.\n The only way forward is through to open a sturdy looking door on the opposite side of the chamber.\n>_`
    );
  }

  while (answer !== "open door") {
    answer = await ask(
      `The only way ${playerName}can progress is to open the door!`
    );
  }

  //Graveyard Room method without key
  if (answer === "open door") {
    answer = await ask(
      `This chamber is naught but an unsanctioned graveyard littered by piles bones without headstones or burials.\n As ${playerName} takes each step the ground makes an audible "CRRUUUNNCH!".\nThere is a single plain door on each wall providing four directions to travel, forward, right, left and backward.\n${playerName} couldn't help but notice a small glint amidst the mounds of skeletons, perhaps it should be examined...>_`
    );
  }

  while (
    answer !== "travel left" ||
    answer !== "travel right" ||
    answer !== "travel forward" ||
    answer !== "travel backward"
  ) {
    answer = await ask(
      `The only way ${playerName}can progress is to travel forward, travel right, travel left or travel back!`
    );
  }

  //Ancient Armory method
  if (answer === "travel left" && player.playerInventory.includes(key)) {
    answer = await ask(
      `The room has a likeness to the treasure room but lacks it's luster.\nUseless, aged tools of war neatly line the walls as if asking to be used again.\n Something catches your eye and you see a faintly glowing shield that seems untouched by time.\nIt seems like a good idea for ${playerName} to take the shield.\n>_`
    );
  }

  while (answer !== "travel back" || answer !== "take shield") {
    answer = await ask(
      `${playerName} looks around and sees the only way out is the door ${playerName} came through. ${playerName} thinks that shield looks powerful...\n>_`
    );
  }

  if (answer === "take shield") {
    answer = await ask(
      `The shield glows brighter and BRIGHTER the closer that ${playerName} with each step towards it.\nRealizing the torch light is no longer ${playerName} drops the torch.\nNow ${playerName} must travel backward to the graveyard room as the new found light sources reveals the armory as a dead-end.\n>_`
    );
  }

  while (answer !== "travel backward") {
    answer = await ask(
      `${playerName} looks around and sees the only way out is the door ${playerName} came through`
    );
  }

  if (answer === "travel backward") {
    answer = await ask(
      `This chamber is naught but an unsanctioned graveyard littered by piles bones without headstones or burials.\n As ${playerName} takes each step the ground makes an audible "CRRUUUNNCH!".\nThere is a single plain door on each wall providing four directions to travel, forward, right, left and backwards\n${playerName} couldn't help but notice a small glint amidst the mounds of skeletons, perhaps it should be examined...>_`
    );
  }

  while (
    answer !== "travel left" ||
    answer !== "travel forward" ||
    answer !== "travel backward"
  ) {
    answer = await ask(
      `The only way ${playerName}can progress is to travel forward, travel right, travel left or travel back!`
    );
  }

  // if (answer === "travel right") {
  //   //False Door
  //   answer = await ask(
  //     `Once the door is fully open ${playerName} sees nothing but a wall immediately behind it, how strange...\n>_`
  //   );
  // }

  //Throne Room
  if (
    answer == "travel forward" &&
    player.playerStash.includes("Sword of Truth") &&
    player.playerStash.includes("Shield of Light")
  ) {
    answer = await ask(
      `${playerName} walks down an ornate hallway that leads to an even grander throne room.\nThe expanse of the chamber is captivating but a thundering crash and deafening roar knocks ${playerName} on their back!\nA towering dragon is looming over you with the contrast of a menacing grin and the majesty of it's natural prowess.\nThe Dragon: "You must be the chosen one!!! Even with the weapons of the "chosen" you cannot defeat me! I claimed these ruins long ago, soon I will claim your kingdom too, but first I will take your life!\nWith sword and shield in hand the only choice ${playerName} has is the slay the dragon, once and for all!\n>_`
    );
  }

  if (answer == "slay dragon") {
    console.log(
      `The Dragon breathes fire down at ${playerName} as they hold up the shield in desperation!\n To ${playerName}'s surprise the flames disperse around him leaving ${playerName} unharmed.\nAs ${playerName} peered over the shield he realized the dragon was blinded by the Shield of Light!\n${playerName} seized the moment and plunged the Sword of Truth into it's dark and twisted heart!\nThe Dragon roared and crashed one last time as it fell and the floor with it.\n${playerName} returned to the kingdom as a celebrated hero for ages to come...\nThe End>_`
    );
    process.exit();
  } else if (answer == "travel forward") {
    console.log(
      `${playerName} walks down an ornate hallway that leads to an even grander throne room.\nThe expanse of the chamber is captivating but a thundering crash and deafening roar knocks ${playerName} on their back!\nA towering dragon is looming over you with the contrast of a menacing grin and the majesty of it's natural prowess.\nThe Dragon: "Pathetic creature!!! How dare you enter MY DOMAIN! I claimed these ruins long ago, soon I will claim your kingdom too but first I will take your life!\nWithout the proper means to protect yourself the Dragon tears and burns ${playerName} asunder!\nThe kingdom fell under the dark rule of the Dragon, which he rules until this very day...\n${playerName} had failed only to become join the rest of the bones in the graveyard...\nThe End>_`
    );
  }

  //Victory, Defeat or Exit
  process.exit();
}

//Call to Begin the Program
start();
