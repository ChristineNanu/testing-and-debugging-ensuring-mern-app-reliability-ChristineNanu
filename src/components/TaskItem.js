export default function TaskItem({task, onToggle}) {
  return (
    <li onClick={() => onToggle(task._id)}>
      {task.completed ? '✅' : '⬜'} {task.name}
    </li>
  );
}
