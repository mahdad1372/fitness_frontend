import { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import MultiSelect from "../../components/form/MultiSelect";
import Cookies from "js-cookie";
import { useWorkout } from "../../context/WorkoutContext";
import { useNavigate } from "react-router-dom";

export default function Formworkouts() {
  const { formData, setFormData, startWorkout } = useWorkout();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  const multiOptions = [
    { value: "Shoulder", text: "Shoulder" },
    { value: "Chest", text: "Chest" },
    { value: "Leg", text: "Leg" },
    { value: "Biceps", text: "Biceps" },
  ];

  const exercisesOptions = [
    { value: "Chest Press", text: "Chest Press" },
    { value: "Arm Circles", text: "Arm Circles" },
    { value: "Dumbbell Upright Row", text: "Dumbbell Upright Row" },
    { value: "Chest Dip", text: "Chest Dip" },
    { value: "Leg Press", text: "Leg Press" },
    { value: "Machine Hack Squat", text: "Machine Hack Squat" },
  ];

  useEffect(() => {
    const id = Cookies.get("userId");
    if (id) setUserId(Number(id));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (userId !== null) {
      setFormData(prev => ({ ...prev, user_id: userId }));
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔥 Basic validation
    if (formData.type.length === 0) {
      alert("Please select workout type");
      return;
    }

    if (formData.exercises.length === 0) {
      alert("Please select exercises");
      return;
    }

    if (formData.sets <= 0) {
      alert("Sets must be greater than 0");
      return;
    }

    // ✅ Start workout (context)
    startWorkout();

    // 👉 Navigate to tracking page
    navigate("/trackworkouts");
  };

  if (loading) return null;

  return (
    <ComponentCard title="Workouts">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Workout Type */}
        <MultiSelect
          label="Select workout type"
          options={multiOptions}
          onChange={(values) =>
            setFormData(prev => ({ ...prev, type: values }))
          }
        />

        {/* Exercises */}
        <MultiSelect
          label="Select exercises"
          options={exercisesOptions}
          onChange={(values) =>
            setFormData(prev => ({ ...prev, exercises: values }))
          }
        />

        {/* Sets + Rest */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label>Sets</Label>
            <Input
              type="number"
              name="sets"
              value={formData.sets}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Rest (seconds)</Label>
            <Input
              type="number"
              name="rest_seconds"
              value={formData.rest_seconds}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* RPE */}
        <div>
          <Label>RPE</Label>
          <Input
            type="number"
            name="rpe"
            value={formData.rpe}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Start Workout
        </button>
      </form>
    </ComponentCard>
  );
}