import { useState, useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Cookies from "js-cookie";

export default function DefaultInputs() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    user_id: 0,
    food_name: "",
    category: "",
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fats: 0,
    meal_time: 0,
    notes: "",
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
      const response = await fetch("http://localhost:7000/foods/addfoods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("foods added successfully!");
        setFormData(prev => ({
          ...prev,
            food_name: "",
            category: "",
            calories: 0,
            protein: 0,
            carbohydrates: 0,
            fats: 0,
            meal_time: 0,
            notes:""
        }));
      } else {
        alert("Error adding foods.");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  if (loading) return null;

  return (
    <ComponentCard title="Foods">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="food_name">food name</Label>
            <Input
              type="text"
              name="food_name"
              value={formData.food_name}
              onChange={handleChange}
              placeholder="food_name"
            />
          </div>

          <div>
            <Label htmlFor="category">category</Label>
            <Input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="calories">calories</Label>
            <Input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="protein">protein</Label>
            <Input
              type="number"
              name="protein"
              value={formData.protein}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="carbohydrates">carbohydrates </Label>
            <Input
              type="number"
              name="carbohydrates"
              value={formData.carbohydrates}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="fats">fats</Label>
            <Input
              type="number"
              name="fats"
              value={formData.fats}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="meal_time">meal_time</Label>
            <Input
              type="text"
              name="meal_time"
              value={formData.meal_time}
              onChange={handleChange}
              placeholder="meal_time"
            />
          </div>
        <div>
            <Label htmlFor="notes">notes</Label>
            <Input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="notes"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Save Foods
          </button>
        </div>
      </form>
    </ComponentCard>
  );
}