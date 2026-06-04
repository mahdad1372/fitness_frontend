import { useState, useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Cookies from "js-cookie";
import DatePicker from "../date-picker.tsx";
import { useWorkout } from "../../../context/WorkoutContext";
import { useNavigate } from "react-router-dom";
export default function DefaultInputs() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
const { formData, setFormData, startWorkout } = useWorkout();
  const [formData2, setFormData2] = useState({
    user_id: 0,
    goal_type: "",
    target_value: 0,
    current_value: 0,
    start_date:"",
    end_date:"",
    status: "",
  });
useEffect(() => {
  if (formData.editgoal === true) {
fetch(`http://localhost:7000/goals/${formData.goal_id}`)
  .then((response) => response.json())
  .then((data) => {


    const goal = data[0];

    setFormData2((prev) => ({
      ...prev,
      goal_type: goal.goal_type,
      target_value: goal.target_value,
      current_value: goal.current_value,
      start_date: goal.start_date,
      end_date: goal.end_date,
      status: goal.status,
    }));
  });
  }

  setLoading(false);
}, []);
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
      setFormData2(prev => ({
        ...prev,
        user_id: userId,
      }));
    }
  }, [userId]);

  // Unified change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setFormData2(prev => ({
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

  setFormData2(prev => ({
    ...prev,
    [id]: finalDate,
  }));
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
if(formData.editgoal == true){
   await fetch(`http://localhost:7000/goals/updategoal/${formData.goal_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData2),
      });
    setFormData(prev => ({ ...prev, editgoal: false, }))
    navigate("/goal-tables")
}
else{
    try {
      const response = await fetch("http://localhost:7000/goals/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData2),
      });

      if (response.ok) {
        alert("goal added successfully!");
        setFormData2(prev => ({
          ...prev,
          user_id: 0,
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
}

  };


  if (loading) return null;
  return (
    <ComponentCard title="Goal">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="goal_type">goal_type</Label>
            <Input
              type="text"
              name="goal_type"
              value={formData2.goal_type}
              onChange={handleChange}
              placeholder="goal_type"
            />
          </div>
          <div>
            <Label htmlFor="current_value">current_value</Label>
            <Input
              type="text"
              name="current_value"
              value={formData2.current_value}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="target_value">target_value</Label>
            <Input
              type="text"
              name="target_value"
              value={formData2.target_value}
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
              value={formData2.status}
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
           {formData.editgoal === true ? "Edit Goal":"save goal"}
          </button>
        </div>
      </form>
    </ComponentCard>
  );
}