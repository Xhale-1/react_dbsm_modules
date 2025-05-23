import { SayHello } from "./types";

export function sayHello({
    name,
    name2,
    age,
}: SayHello):void {
    console.log('Hell!');
    console.log('Your first name is ${name}');
    console.log('Your name2 is ${name2}');
    console.log('Your age is ${age}');
}