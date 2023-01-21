import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login.jsx";

// axios ile aldığımız veriden ne beklediğimizi test ediyoruz
jest.mock("axios", () => ({
  __esModule: true,
  // ES6 veya üstünü kullanıyorsak esmodule:true eklememiz gerekiyor
  default: {
    get: () => ({
      data: { id: 1, name: "Leanne Graham" },
    }),
  },
}));

test("username input rendered", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  // placeholdera göre username inputunu bulduk
  expect(userInputEl).toHaveLength();
  // bu input screende yani ekranda var mı diye kontrol ettik.
});

test("username input should be empty", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  // placeholdera göre username inputunu bulduk
  expect(userInputEl.value).toBe("");
  // username inputu boş  bi valueya mı sahip diye kontrol ettik.
});

test("password input rendered", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  // placeholdera göre password inputunu bulduk
  expect(passwordInputEl).toBeInTheDocument();
  // bu input screende yani ekranda var mı diye kontrol ettik.
});

test("username input should be changed", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  // placeholdera göre username inputunu bulduk
  const testValue = "test";
  // bir simulasyon için test value oluşturduk
  fireEvent.change(userInputEl, { target: { value: testValue } });
  // fireEvent.change ile change olduğunda deyip ...
  // expect ile de change olduğunda olusturduğumuz test value'su inputun içinde var mı diye kontrol ettik
  expect(userInputEl.value).toBe(testValue);
});

// yukardakinin aynısı password için
test("password input should be changed", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(passwordInputEl.value).toBe(testValue);
});

// password alanı boş mu?
test("password input should be empty", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe("");
});

// button screende var mı?
test("button  rendered", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeInTheDocument();
});

// button disable mı?
test("button disabled", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  // role'e göre buttonu bulduk.
  expect(buttonEl).toBeDisabled();
  // adisable mı diye kontrol ettik.
});
test("button disabled", () => {
  render(<Login />);
  const errEl = screen.getByTestId("error");
  // login js'de error fieldına verdiğimiz data-testid'ye göre bu field'ı bulmuş olduk.
  expect(errEl).not.toBeVisible();
  // görünür mü diy kontrol ettik
});
// bazı fireeventler yani actionlar olduğunda buttonun görünürlüğünü kontrol ettik.
test("button should not be disabled when inputs exist ", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(userInputEl, { target: { value: testValue } });
  // user input change olduğunda.... önemli : value "test" olursa...
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  // password input change olduğunda.... önemli : value "test" olursa....
  expect(buttonEl).not.toBeDisabled();
  // o zaman benim beklentim buttonun disable olmamasıdır dedik.
});

// buttonun içindeki textcontext i kontrol ettik.
test("loading should not be rendered", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toHaveTextContent(/please wait/i);
  // buttonun içindeki yazıda "please wait" yazmadığını iddia ettik.
});

//  bazı actionlar sonucunda buttonun içinde "please wait yazması lazım dedik."
test("loading should not be rendered", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(userInputEl, { target: { value: testValue } });
  // user input change olduğunda.... önemli : value "test" olursa...

  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  // passowrd input change olduğunda.... önemli : value "test" olursa...
  fireEvent.click(buttonEl);
  // buttona click olduğunda... önemli: yukardaki fireeventlerde sağlanmış olması lazımki bu satıra geçsin
  expect(buttonEl).toHaveTextContent(/please wait/i);
  //  bu 3 fairda olmuşsa bizim beklentimiz butonun içinde "please wait" yazısını görmek
  // bunu login js in içindeki handleClick fonksiyonda son satırda olan setLoading(false) yazısını silerek deneyebilirsiniz..
});
// fetch test
test("user should not be after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(userInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);
  //  bu fire eventler gerçekleştiği zaman...
  const userItem = await screen.findByText("Leanne Graham");
  //  screende "Leanne Graham" ı göreceğiz.. tabi async bir fonksyion olduğu için önce beklemek için await' kullandık.
  expect(userItem).toBeInTheDocument();
  // bunların hepsi gerçekleştiği zaman yani username ve password yazıp login'e basınca user'ın nameini yazan bir "userItem" olması gerekiyor dedik.
});

// kaynak
// https://www.digitalocean.com/community/tutorials/how-to-test-a-react-app-with-jest-and-react-testing-library
