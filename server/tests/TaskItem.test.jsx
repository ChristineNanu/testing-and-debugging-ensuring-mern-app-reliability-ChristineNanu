import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '../components/TaskItem';

test('renders a task and toggles it', () => {
  const mockToggle = jest.fn();
  render(<TaskItem task={{_id:'1',name:'Test',completed:false}} onToggle={mockToggle} />);
  fireEvent.click(screen.getByText(/Test/i));
  expect(mockToggle).toHaveBeenCalledWith('1');
});
