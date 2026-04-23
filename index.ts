
class User {
  public id: number;
  public name: string;
  public email: string;
  private password: string;
  public phone: string;
  private _age!: number;

  constructor(id: number, name: string, email: string, password: string, phone: string, age: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.age = age;
  }

  set age(value: number) {
    if (value >= 18 && value <= 60) {
      this._age = value;
    } else {
      throw new Error("Age must be between 18 and 60");
    }
  }

  get age(): number {
    return this._age;
  }

  displayInfo(): void {
    console.log(`ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this._age}`);
  }
}


class Admin extends User {
  manageNotes(): void {
    console.log("Admin is managing notes...");
  }
}

class Note {
  public id: number;
  public title: string;
  public content: string;
  public user: User;

  constructor(id: number, title: string, content: string, user: User) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.user = user;
  }

  preview(): string {
    return this.content.substring(0, 20) + "...";
  }
}


class NoteBook {
  private notes: Note[] = [];

  addNote(note: Note): void {
    this.notes.push(note);
  }

  removeNote(noteId: number): void {
    this.notes = this.notes.filter(note => note.id !== noteId);
  }

  getNotes(): Note[] {
    return this.notes;
  }
}

class UserWithNotebook extends User {
  notebooks: NoteBook[] = [];

  addNotebook(notebook: NoteBook): void {
    this.notebooks.push(notebook);
  }
}


class Storage<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  removeItem(item: T): void {
    this.items = this.items.filter(i => i !== item);
  }

  getAllItems(): T[] {
    return this.items;
  }
}



const user1 = new User(1, "Ali", "ali@mail.com", "1234", "0100000000", 25);
const admin1 = new Admin(2, "Admin", "admin@mail.com", "admin123", "0111111111", 30);


const note1 = new Note(1, "Note 1", "This is the first note content", user1);
const note2 = new Note(2, "Note 2", "Second note content here", user1);


const notebook = new NoteBook();
notebook.addNote(note1);
notebook.addNote(note2);


const userWithNB = new UserWithNotebook(3, "Omar", "omar@mail.com", "1234", "0122222222", 28);
userWithNB.addNotebook(notebook);


const storage = new Storage<string>();
storage.addItem("Hello");
storage.addItem("World");


user1.displayInfo();
admin1.manageNotes();

console.log(note1.preview());
console.log(notebook.getNotes());
console.log(storage.getAllItems());