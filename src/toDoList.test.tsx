import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import { ToDoList } from "./toDoList"; 
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("ToDoList", () => {
    test("Default display test", () => {
        render(<ToDoList />);
        const itemsBrought = screen.getByText("Items bought: 0");
        const apple = screen.getByText("Apples");
        const banana = screen.getByText("Bananas");

        expect(itemsBrought).toBeInTheDocument();
        expect(apple).toBeInTheDocument();
        expect(banana).toBeInTheDocument();
    })

    test("Checkbox checking and proper value updating", () => {
        render(
            <MemoryRouter initialEntries={["/todolist/ABC"]}>
            <Routes>
              <Route path="/todolist/:name" element={<ToDoList />} />
            </Routes>
          </MemoryRouter>
          );
          // check if list name is correct
          const nameOfList = screen.getByTestId("name-of-list");
          expect(nameOfList).toBeInTheDocument();

          // checking if Items bought updates properly from list
          const itemsBought = screen.getByTestId("items-bought");
          expect(itemsBought.textContent).toEqual("Items bought: 0");
        
          const checkboxBananas = screen.getByTestId("checkbox-Bananas");
          const checkboxApples = screen.getByTestId("checkbox-Apples");

          fireEvent.click(checkboxBananas);
          expect(itemsBought.textContent).toEqual("Items bought: 1");

          fireEvent.click(checkboxApples);
          expect(itemsBought.textContent).toEqual("Items bought: 2");

          // checking if unchecking items updates properly
          fireEvent.click(checkboxApples);
          expect(itemsBought.textContent).toEqual("Items bought: 1");

          fireEvent.click(checkboxBananas);
          expect(itemsBought.textContent).toEqual("Items bought: 0");
    })
});