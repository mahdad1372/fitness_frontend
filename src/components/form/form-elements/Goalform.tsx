import { useState, useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Cookies from "js-cookie";
import DatePicker from "../date-picker.tsx";
export default function DefaultInputs() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    user_id: 0,
    goal_type: "",
    target_value: 0,
    current_value: 0,
    start_date:"",
    end_date:"",
    status: "",
  });

  // Get userId from cookie
  useEffect(() => {
    const id = Cookies.get("userId");
    if (id) {
      setUserId(Number(id));
    }
    setLoading(false);
  }, []);

  // Sync user_id into formData
  useEffect(() => {
    if (userId !== null) {
      setFormData(prev => ({
        ...prev,
        user_id: userId,
      }));
    }
  }, [userId]);

  // Unified change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };
const handleDateChange = (id: string, date: Date | Date[] | string | null) => {
  if (!date) return;

  let finalDate: string;

  if (Array.isArray(date)) {
    // Take the first date if array
    const d = date[0];
    finalDate = d.toISOString().split("T")[0];
  } else if (date instanceof Date) {
    finalDate = date.toISOString().split("T")[0];
  } else if (typeof date === "string") {
    finalDate = date; // already string
  } else {
    console.error("Invalid date value:", date);
    return;
  }

  setFormData(prev => ({
    ...prev,
    [id]: finalDate,
  }));
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:7000/goals/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Goal added successfully!");
        setFormData(prev => ({
          ...prev,
        goal_type: "",
    target_value: 0,
    current_value: 0,
    start_date:"",
    end_date:"",
    status: "",
        }));
      } else {
        alert("Error adding foods.");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  if (loading) return null;
console.log(formData.start_date)
  return (
    <ComponentCard title="Goal">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="goal_type">goal_type</Label>
            <Input
              type="text"
              name="goal_type"
              value={formData.goal_type}
              onChange={handleChange}
              placeholder="goal_type"
            />
          </div>
          <div>
            <Label htmlFor="current_value">current_value</Label>
            <Input
              type="text"
              name="current_value"
              value={formData.current_value}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="target_value">target_value</Label>
            <Input
              type="text"
              name="target_value"
              value={formData.target_value}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<DatePicker
  id="start_date"
  label="start_date"
  placeholder="start_date"
  
  onChange={(date) =>
    handleDateChange("start_date", date)
  }
/>

<DatePicker
  id="end_date"
  label="end_date"
  placeholder="end_date"
  onChange={(date) =>
    handleDateChange("end_date", date)
  }
/>
          <div>
            <Label htmlFor="status">Status</Label>
            <Input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              placeholder="status"
            />
          </div>
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Save Goal
          </button>
        </div>
      </form>
    </ComponentCard>
  );
}