import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

export default function StudySyncDashboard() {
  const [task, setTask] = useState("");
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() && subject.trim()) {
      const newTask = {
        id: Date.now(),
        task,
        subject,
        deadline,
        done: false,
      };
      setTasks([...tasks, newTask]);
      setTask("");
      setSubject("");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">StudySync Planner</h1>

      <Card className="max-w-xl mx-auto p-4 mb-6">
        <CardContent className="grid gap-4">
          <Input
            placeholder="Task name"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Input
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <div>
            <label className="text-sm font-semibold">Select Deadline</label>
            <Calendar
              selected={deadline}
              onSelect={setDeadline}
              className="mt-2"
            />
          </div>
          <Button onClick={addTask}>Add Task</Button>
        </CardContent>
      </Card>

      <div className="max-w-xl mx-auto space-y-4">
        {tasks.length === 0 && (
          <p className="text-center text-gray-500">No tasks added yet.</p>
        )}
        {tasks.map((t) => (
          <Card key={t.id} className="p-4">
            <CardContent className="flex justify-between items-center">
              <div>
                <h2 className={`text-lg font-semibold ${t.done ? "line-through text-gray-400" : ""}`}>{t.task}</h2>
                <p className="text-sm text-gray-500">Subject: {t.subject}</p>
                <p className="text-sm text-gray-500">Deadline: {t.deadline.toLocaleDateString()}</p>
              </div>
              <Button variant="outline" onClick={() => toggleTask(t.id)}>
                {t.done ? "Undo" : "Done"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
