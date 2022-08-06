import {render} from '@testing-library/react';
import TodoForm from '../components/ToDoForm';

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

// Does it render properly to the screen?
describe("Form Component", () => {
    it("rendered form", () => {
        const{getByTestId} = render(<TodoForm/>);
        const frm = getByTestId("todoform");
        expect(frm).toBeTruthy();
    })
})

