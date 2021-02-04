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
