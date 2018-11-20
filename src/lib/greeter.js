var Student = (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
export default function greet(p) {
    return "Hello " + p.firstName + " " + p.lastName;
}
var u = new Student('Tom', 'M', 'Riddle');
greet(u);
//# sourceMappingURL=greeter.js.map