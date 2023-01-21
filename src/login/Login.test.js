import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";

test("username input rendered", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl).toBeInTheDocument();
});
test("username input should be empty", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl.value).toBe("");
});
test("password input rendered", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});
test("username input should be changed", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const testValue = "test";
  fireEvent.change(userInputEl, { target: { value: testValue } });
  expect(userInputEl.value).toBe(testValue);
});
test("password input should be changed", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(passwordInputEl).toBe(testValue);
});
test("password input should be empty", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe("");
});
test("button  rendered", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeInTheDocument();
});
test("button disabled", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeDisabled();
});
test("button disabled", () => {
  render(<Login />);
  const errEl = screen.getByTestId("error");
  expect(errEl).not.toBeVisible();
  // görünmemesi lazım...
});
test("button should not be disabled when inputs exist ", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(userInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(buttonEl).not.toBeDisabled();
});

test("loading should not be rendered", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toHaveTextContent(/please wait/i);
});

test("loading should not be rendered", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toHaveTextContent(/please wait/i);
});
