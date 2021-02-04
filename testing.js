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
  // throne room
  // shield room

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
