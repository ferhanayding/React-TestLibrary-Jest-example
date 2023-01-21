import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  //  documentin içinde bu var mı diye tarar.
});
// expect : beklenti beklediğimiz şey
test("list item test", () => {
  render(<App />);
  const listItems = screen.getAllByRole("listitem");
  expect(listItems.length).toBe(3);
  // veya
  expect(listItems).toHaveLength(3);
  // de kullanılabilir
});
test("title test", () => {
  render(<App />);
  const titleItem = screen.getByTestId("hello");
  expect(titleItem).toBeInTheDocument();
  // documentte var mı
});
test("sum test", () => {
  render(<App />);
  const sumItem = screen.getByTitle("sum");
  expect(sumItem.textContent).toEqual("6");
});
