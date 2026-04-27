import { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import MultiSelect from "../../components/form/MultiSelect";
import Cookies from "js-cookie";
import { useWorkout } from "../../context/WorkoutContext";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";

export default function Formdiet() {
  const { formData, setFormData, startWorkout } = useWorkout();
  const [loading, setLoading] = useState(true);
    const { isOpen, openModal, closeModal } = useModal();
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();
  const [info, setinfo] = useState({
    age: 0,
    gender: "",
    height: 0,
    weight: 0,
    goaldiet:"",
  });
  const [calories,setcalories] = useState(0);
  const [protein,setprotein] = useState(0);
  const [fat,setfat] = useState(0);
  const [carbs,setcarbs] = useState(0);
  const Genderoptions = [
    { value: "Male", text: "Male" },
    { value: "Female", text: "Female" },
  ];

  const exercisesOptions = [
    { value: "Gain weight", text: "Gain weight" },
    { value: "Loss weight", text: "Loss weight" },
    { value: "Maintain weight", text: "Maintain weight" },

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

    setinfo(prev => ({
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
  
  const calculate_calories_macros = () => {
    let BMR = 0
    if (info.gender === "Male"){
      BMR = 10 * info.weight + 6.25 * info.height - 5 * info.age + 5
    } else{
      BMR = 10 * info.weight + 6.25 * info.height - 5 * info.age - 161
    }
    let TDEE = BMR * 1.55
    if(info.goaldiet === "Loss weight"){
      setcalories(TDEE - 300)
    }
    if(info.goaldiet === "Gain weight"){
      setcalories(TDEE + 300)
    }
    if(info.goaldiet === "Maintain weight"){
      setcalories(TDEE)
    }
    setprotein(1.6* info.weight)
    setfat((calories*20)/100)
    setcarbs(calories)
    setFormData(prev => ({ ...prev, weight:info.weight }))
    setFormData(prev => ({ ...prev, goal_diet:info.goaldiet}))
    openModal();
  }


  return (
    <ComponentCard title="Add diet">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Exercises */}
        <MultiSelect
          label="Select Goal diet"
          options={exercisesOptions}
          onChange={(values) =>
            setinfo(prev => ({ ...prev, goaldiet: values[0] }))
          }
          
        />

        {/* Sets + Rest */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label>Age</Label>
            <Input
              type="number"
              name="age"
              value={info.age}
              onChange={handleChange}
            />
          </div>

          <div>
        <MultiSelect
          label="Select gender"
          options={Genderoptions}
          onChange={(values) =>
            setinfo(prev => ({ ...prev, gender: values[0] }))
          }
        />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label>Height</Label>
            <Input
              type="number"
              name="height"
              value={info.height}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Weight</Label>
            <Input
              type="number"
              name="weight" 
              value={info.weight}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="grid grid-cols-2 gap-6">
        <button
          type="button"
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
          onClick={calculate_calories_macros}
        >
          Calculate the calories and Macros and genertae diet
        </button>
         <button
          type="button"
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
          onClick={()=>{
              setFormData(prev => ({
                  ...prev,
                  calories: calories,
                  protein: protein,
                  fats: fat,
                  carbohydrates: carbs,
                                    }));
            navigate("/consume_meal");
          }}
        >
          Let's go for consuming the Meal
        </button>
          </div>

      </form>
      <div>
      <Modal isOpen={isOpen} onClose={() => {
            closeModal();
        }}
     className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Nutrision result
            </h4>
            <p className="mb-6 text-lg text-gray-500 dark:text-gray-400 lg:mb-7">
             Your body should be consume calories :{calories}kcal ,protein : {protein}g, 
             carbohydrate:{carbs}g , Fats : {fat}g
            </p>
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Diet Plan
            </h4>
            <p className="mb-6 text-lg text-gray-500 dark:text-gray-400 lg:mb-7">
             Breakfast :  calories :{(calories*25)/100}kcal , protein : {(protein*25)/100}g, 
              carbohydrate:{(carbs*25)/100}g , Fats : {(fat*25)/100}g
            </p>
            <p className="mb-6 text-lg text-gray-500 dark:text-gray-400 lg:mb-7">
             Lunch :  calories :{(calories*35)/100}kcal , protein : {(protein*35)/100}g, 
              carbohydrate:{(carbs*35)/100}g , Fats : {(fat*35)/100}g
            </p>
             <p className="mb-6 text-lg text-gray-500 dark:text-gray-400 lg:mb-7">
             Dinner :  calories :{(calories*30)/100}kcal , protein : {(protein*30)/100}g, 
              carbohydrate:{(carbs*30)/100}g , Fats : {(fat*30)/100}g
            </p>
            <p className="mb-6 text-lg text-gray-500 dark:text-gray-400 lg:mb-7">
             Snack :  calories :{(calories*10)/100}kcal , protein : {(protein*10)/100}g, 
              carbohydrate:{(carbs*10)/100}g , Fats : {(fat*10)/100}g
            </p>
          </div>
        </div>
      </Modal>
      </div>
    </ComponentCard>
  );
}