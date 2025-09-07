import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <Card className="p-2">
      <CardHeader>
        <CardTitle className={task.completed ? "line-through" : ""}>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
        <div className="flex justify-between mt-2">
          <Button onClick={onToggle}>{task.completed ? "Mark Pending" : "Complete"}</Button>
          <Button variant="destructive" onClick={onDelete}>Delete</Button>
        </div>
      </CardContent>
    </Card>
  );
}
