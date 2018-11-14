class Student {
  fullName: string;

  constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string,
  ) {
    this.fullName = `${firstName} ${middleInitial} ${lastName}`;
  }

}

interface Person {
  firstName: string;
  lastName: string;
}

export default function greet(p: Person) {
  return `Hello ${p.firstName} ${p.lastName}`
}

const u = new Student('Tom', 'M', 'Riddle');

greet(u);
