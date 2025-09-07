import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, toggleTask, deleteTask, setTasks } from "../store/tasksSlice";
import TaskCard from "@/components/TaskCard";
import TaskFilter from "@/components/TaskFilter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// Example:
toast.success("Task added!");
toast.error("Task deleted!");

export default function Dashboard() {
  const { tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((t) => ({
          id: t.id,
          title: t.title,
          description: "",
          completed: t.completed,
        }));
        dispatch(setTasks(formatted));
      });
  }, []);

  const handleAdd = () => {
    if (!title.trim()) return;
    const newTask = { id: Date.now(), title, description, completed: false };
    dispatch(addTask(newTask));
    toast({ title: "Task added!" });
    setTitle("");
    setDescription("");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Add Task Form */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add Task</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button onClick={handleAdd}>Add Task</Button>
        </CardContent>
      </Card>

      {/* Filter */}
      <TaskFilter filter={filter} setFilter={setFilter} />

      {/* Task List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={() => dispatch(toggleTask(task.id))}
            onDelete={() => dispatch(deleteTask(task.id))}
          />
        ))}
      </div>
    </div>
  );
}
