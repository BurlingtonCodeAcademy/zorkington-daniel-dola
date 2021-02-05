class Rooms {
  constructor(
    roomDescription = "in front of cave",
    item = "staff",
    nextRoom = this.narrowPassage,
    name = "entrance",
    door = false,
    secretDoor = false,
    fakeDoor = "fake door",
    doorLock = "reading spell"
  ) {
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
  firstRoom() {}

  // Method to convert the current room to the 2nd room 'Narrow Passage'
  narrowPassage() {
    this.name = `Narrow Passage`;

    this.roomDescription = `Dark Room`;
    this.door = false;
    this.doorLock = `crawl`;
    this.nextRoom = this.treasureRoom;
  }

  // Method to convert the current room to the 3rd room 'Treasure Room' with the key in it;
  treasureRoom() {
    this.item = `key`;
    this.name = `Treasure Room`;
    this.nextRoom = `Graveyard Room`;
    this.roomDescription = `Treasure room where the key is`;
    this.door = true;
  }

  // Method to convert the current room to the 4th room 'Graveyard Room' with the sowrd in it;
  graveyardRoom() {
    // on Dan's file
  }
  // Method to convert the current room to the 4th room 'Graveyard Room';
  graveyardRoom(){
    this.item = `Sword of Truth`;
    this.name = `Graveyard`;
    this.nextRoom = 
    this.roomDescription = `Room filled with bones and a magical sword`;
    this.door = true;
    this.fakeDoor = false;
    this.doorLock = `key`;
  }
  // Method to convert the current room to the 5th room 'Ancient Armory'
    ancientArmory(){
    this.item = `Shield of Light`;
    this.name = `Ancient Armory`;
    this.nextRoom = 
    this.roomDescription = `Room filled mostly with old useless weapons`;
    this.door = true;
  }
  // Method to convert the current room to the 6th room `Throne Room1;
    throneRoom(){
    this.name = `Throne Room`
    this.nextRoom = `Graveyard Room`
    this.roomDescription = `Elegant Throne room inhabited by an evil dragon!`
    this.door = true;
  }
  

  examine() {
    return;
  }
  travel() {
    return;
  }
}

let currentRoom = new Rooms();
//console.log(currentRoom);
console.log(currentRoom.roomDescription)

currentRoom.nextRoom();
//currentRoom.narrowPassage();
// let status = currentRoom.name;
// console.log(status);
//console.log(currentRoom);
console.log(currentRoom.roomDescription)

currentRoom.nextRoom();

//console.log(currentRoom);
console.log(currentRoom.roomDescription)


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


async function testing(){
    let answer = await ask(`type in`);
    answer= answer.split(" ")
    let verb = answer[0].toLowerCase();
    let object = answer[1].toLowerCase();
    console.log(`the verb ${verb}`)
    console.log(`the object ${object}`)
}
testing();






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