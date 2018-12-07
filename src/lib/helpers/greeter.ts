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

interface IPerson {
  firstName: string;
  lastName: string;
}

export default function greet(p: IPerson) {
  return `Hello ${p.firstName} ${p.lastName}`
}

const u = new Student('Tom', 'M', 'Riddle');

greet(u);
