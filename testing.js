class Rooms {
  constructor(
    roomDescription = "in front of cave",
    item = "staff",
    nextRoom = "narrow passage",
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
    this.nextRoom = `Treasure Room`;
    this.roomDescription = `Dark Room`;
    this.door = false;
    this.doorLock = `crawl`;
  }
  // Method to convert the current room to the 3rd room 'Treasure Room';
  treasureRoom(){
      this.name = `Treasure Room`;
      this.nextRoom = `Graveyard Room`;
      this.roomDescription = `Treasure room where the key is`;
      this.door = true;
      this.item = `key`;
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
console.log(currentRoom);

currentRoom.narrowPassage();
// let status = currentRoom.name;
// console.log(status);
console.log(currentRoom);
