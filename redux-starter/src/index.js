import { compose, pipe } from "lodash/fp";
import { Map } from "immutable";
import { produce } from "immer";
import store from "./store";
import { bugAdded, bugResolved } from "./actions";

const unsubscribe = store.subscribe(() => {
  console.log("store changed", store.getState());
});

store.dispatch(bugAdded("big bug"));

unsubscribe();

// store.dispatch({
//   type: actions.BUG_REMOVED,
//   payload: {
//     id: 1,
//   },
// });

store.dispatch(bugResolved(1));

console.log(store.getState());

// --------------

let input = "    Javascript   ";

const trim = (str) => str.trim();
const wrap = (type) => (str) => `<${type}>${str}</${type}>`;
const toLowerCase = (str) => str.toLowerCase();

// const transform = compose(wrapInDiv, toLowerCase, trim);
// compose is a HOF !
// but problem here is we still have to read functions from right to left
// solution: pipe

const transformOrdered = pipe(trim, toLowerCase, wrap("span"));
const result = transformOrdered(input);
// console.log(result);

// -----------------
// update an object without mutating data

const person = { name: "John", address: { country: "USA", city: "SF" } };
const updated = {
  ...person,
  address: {
    ...person.address,
    city: "New York",
  },
  name: "Bob",
};
updated.address.city = "New York";
// console.log(person);
// console.log(updated);

// ---------- intro to immutable.js

let book = Map({ title: "Harry Potter" });

function publish(book) {
  return book.set("isPublished", true);
}

publish(book);

// console.log(book.toJS());

// ------------- intro to immer

let Book = { title: "Harry Potter" };

function Publish(book) {
  return produce(book, (draftBook) => {
    draftBook.isPublished = true;
  });
}

let updatedBook = Publish(Book);

// console.log(Book);
// console.log(updatedBook);
