import {render,fireEvent,waitFor } from '@testing-library/react';
import ToDoItem from '../components/ToDoItem';

delete window.matchMedia
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
})

// Does Button In a List Item render properly to the screen?
describe("Button In a List Item", () => {
    it("rendered button in list item", () => {
        const{getByTestId} = render(<ToDoItem todo={{id:1, name:"First Task", priority:0, status:0}}/>);
        const frm = getByTestId("buttonmodal");
        expect(frm).toBeTruthy();
    })

    it("rendered list item", () => {
        const{getByTestId} = render(<ToDoItem todo={{id:1, name:"First Task", priority:0, status:0}}/>);
        const frm = getByTestId("listitem");
        expect(frm).toBeTruthy();
    })

    it("click the modal button and see the modal", () => {
        const{baseElement, getByTestId} = render(<ToDoItem todo={{id:1, name:"First Task", priority:0, status:0}}/>);
        const btn = getByTestId("buttonmodal");
        fireEvent.click(btn);
        expect(baseElement).toMatchSnapshot();
        waitFor(() => expect(queryByText('Edit Task')).toBeInTheDocument());
    })
})


