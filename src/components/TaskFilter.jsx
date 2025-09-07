import { Button } from "@/components/ui/button";

export default function TaskFilter({ filter, setFilter }) {
  const options = ["All", "Completed", "Pending"];
  return (
    <div className="flex gap-2 mb-4">
      {options.map((opt) => (
        <Button
          key={opt}
          variant={filter === opt ? "default" : "outline"}
          onClick={() => setFilter(opt)}
        >
          {opt}
        </Button>
      ))}
    </div>
  );
}
