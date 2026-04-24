import { useState,useEffect } from "react";
import ComponentCard from "../../common/ComponentCard.tsx";
import Label from "../Label.tsx";
import Input from "../input/InputField.tsx";
import Select from "../Select.tsx";
import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons/index.ts";
import DatePicker from "../date-picker.tsx";
import Cookies from "js-cookie";
export default function Healthmetricsform() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    user_id: 0,
    cholesterol: 0,
    blood_pressure: 0,
    heart_rate: 0,
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


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:7000/health_metric/addmetrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Workout added successfully!");
        setFormData(prev => ({
          ...prev,
         cholesterol: 0,
        blood_pressure: 0,
        heart_rate: 0,
        }));
      } else {
        alert("Error adding workout.");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  if (loading) return null;

  return (
    <ComponentCard title="Health metrics">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="cholesterol">Cholesterol</Label>
          <Input
           type="number"
          name="cholesterol"
          value={formData.cholesterol}
          onChange={handleChange}
          placeholder="e.g. 200"
          />
          
          </div>

          <div>
            <Label htmlFor="blood_pressure">blood_pressure</Label>
            <Input
              type="number"
              name="blood_pressure"
              value={formData.blood_pressure}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="heart_rate">heart_rate</Label>
            <Input
              type="number"
              name="heart_rate"
              value={formData.heart_rate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Save Health metrics
          </button>
        </div>
      </form>
    </ComponentCard>
  );
}
