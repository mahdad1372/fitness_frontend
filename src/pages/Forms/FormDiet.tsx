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
    workoutsperweek:0,
    Activitylevel : "",
    sleephour:0,
    calories:0,
    protein:0,
    carbohydrates:0,
    fats:0
  });
  // const [calories,setcalories] = useState(0);
  // const [protein,setprotein] = useState(0);
  // const [fat,setfat] = useState(0);
  // const [carbs,setcarbs] = useState(0);
  const Genderoptions = [
    { value: "Male", text: "Male" },
    { value: "Female", text: "Female" },
  ];

  const exercisesOptions = [
    { value: "FAT_LOSS", text: "Weight Loss / Fat Loss (Reduce body fat)" },
    { value: "MAINTENANCE", text: "Weight Maintenance (Maintain current weight)" },
    { value: "MUSCLE_GAIN", text: "Muscle Gain / Bulking (Increase muscle mass)" },
    { value: "BODY_RECOMPOSITION", text: "Body Recomposition (Lose fat + gain muscle)" },
    { value: "PERFORMANCE_ENHANCEMENT", text: "Performance Enhancement (Improve athletic performance)" },
    { value: "Healthy Lifestyle", text: "Healthy Lifestyle (General wellness and balanced nutrition)" }
  ];

  const Activitylevel = [
   { value: "SEDENTARY", text: "SEDENTARY (Little/no exercise)" },
   { value: "LIGHTLY_ACTIVE", text: "LIGHTLY_ACTIVE (Light exercise 1–3 days/week)" },
   { value: "MODERATELY_ACTIVE", text: "MODERATELY_ACTIVE (Moderate exercise 3–5 days/week)" },
   { value: "VERY_ACTIVE", text: "VERY_ACTIVE (Hard exercise 6–7 days/week)" },
   { value: "ATHLETE", text: "ATHLETE (Intense training / physical job)" },
  ]

  const workoutsperweek = [
    {value :"1", text:"1"},
    {value :"2", text:"2"},
    {value :"3", text:"3"},
    {value :"4", text:"4"},
    {value :"5", text:"5"},
    {value :"6", text:"6"},
    {value :"7", text:"7"},
  ]

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



  if (loading) return null;
  
  const diet_estimate = () => {
    var heightmeters = info.height/100;
    var BMI = info.weight / (heightmeters * heightmeters)
    var bmiDeficit = 0
    var workoutDeficit = 0
    var BMR = 0
    var sleepDeficit = 0
    var activity_factor = 0
    var TDEE = 0
    var TargetCalories = 0
    var Protein = 0
    var Fats = 0
    var Carbohydrates = 0
    if(BMI < 18.5){
        bmiDeficit = 0
    }else if(BMI < 25){
        bmiDeficit = 0.15
    }else if(BMI < 30){
        bmiDeficit = 0.2
    }else{
        bmiDeficit = 0.25
    }
    if(info.gender == "Male"){
       BMR = 10*info.weight +6.25 *info.height - 5 * info.age + 5
    }else{
       BMR = 10*info.weight +6.25 *info.height - 5 * info.age -161
    }
    if(info.workoutsperweek < 2){
      workoutDeficit = 0.25
    }else if(info.workoutsperweek > 1 && info.workoutsperweek < 5){
      workoutDeficit = 0.2
    }else if(info.workoutsperweek > 4 && info.workoutsperweek < 7){
      workoutDeficit = 0.15
    }else{
      workoutDeficit = 0.1
    }
    if(info.sleephour < 5){
      sleepDeficit = 0.1
    }else if (info.sleephour < 7 && info.sleephour > 4){
      sleepDeficit = 0.15
    }else if (info.sleephour < 9 && info.sleephour > 4){
      sleepDeficit = 0.2
    }else{
      sleepDeficit = 0.25
    }
    var minDeficit = sleepDeficit
    if(workoutDeficit< minDeficit){
      minDeficit = workoutDeficit
    }else if( bmiDeficit < minDeficit){
      minDeficit = bmiDeficit
    }
    if(info.Activitylevel === "SEDENTARY"){
      activity_factor = 1.2
    }else if(info.Activitylevel === "LIGHTLY_ACTIVE"){
      activity_factor = 1.375
    }else if(info.Activitylevel === "MODERATELY_ACTIVE"){
      activity_factor = 1.55
    }else if(info.Activitylevel === "VERY_ACTIVE"){
      activity_factor = 1.725
    }else{
      activity_factor = 1.9
    }
    TDEE = BMR * activity_factor
    if(info.goaldiet === "FAT_LOSS"){
      Protein = info.weight * 2
      TargetCalories = TDEE * (1-minDeficit)
      Fats = 0.8 * info.weight
    }else if(info.goaldiet === "MUSCLE_GAIN"){
      Fats = info.weight * 0.9
      Protein = info.weight * 1.8
      TargetCalories = TDEE * (1.1)
    }else if(info.goaldiet === "MAINTENANCE"){
      Fats = info.weight * 0.8
      Protein = info.weight * 1.6
      TargetCalories = TDEE
    }else if(info.goaldiet === "BODY_RECOMPOSITION"){
      Fats = info.weight * 0.8
      Protein = info.weight * 1.8
      TargetCalories = TDEE* (0.95)
    }else if(info.goaldiet === "PERFORMANCE_ENHANCEMENT"){
      Fats = info.weight * 0.9
      Protein = info.weight * 2.2
      TargetCalories = TDEE* (1.05)
    }else{
      Fats = info.weight * 0.8
      Protein = info.weight * 1.6
      TargetCalories = TDEE
    }
    Carbohydrates = (TargetCalories - ((Protein*4) + (Fats*9)))/4

    setinfo(prev => ({...prev, calories: Math.round(TargetCalories)}));
    setinfo(prev => ({...prev, fats: Math.round(Fats)}));
    setinfo(prev => ({...prev, protein: Math.round(Protein)}));
    setinfo(prev => ({...prev, carbohydrates: Math.round(Carbohydrates)}));
    if (info.Activitylevel.length === 0) {
      alert("Please select Activitylevel");
      return;
    }
    if (info.workoutsperweek === 0) {
      alert("Please select workoutsperweek");
      return;
    }
    if (info.goaldiet.length === 0) {
      alert("Please select Goal diet");
      return;
    }
    if (info.gender.length === 0) {
      alert("Please select gender");
      return;
    }
    if (info.age === 0) {
      alert("Please add age");
      return;
    }
    if (info.height === 0) {
      alert("Please add height");
      return;
    }
    if (info.weight === 0) {
      alert("Please add weight");
      return;
    }
    if (info.sleephour === 0) {
      alert("Please add sleephour");
      return;
    }
    openModal();
  }


  
  return (
    <ComponentCard title="Add diet">
      <form  className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
        <div className = "relative z-52">
        <MultiSelect
          label="Select Goal diet"
          options={exercisesOptions}
          onChange={(values) =>
            setinfo(prev => ({ ...prev, goaldiet: values[0] }))
          }
        />
     </div>
        <div className = "relative z-52">
        <MultiSelect
          label="Activity level"
          options={Activitylevel}
          onChange={(values) =>
            setinfo(prev => ({ ...prev, Activitylevel: values[0] }))
          }
        />
     </div>
             <div className = "relative z-52">
        <MultiSelect
          label="workouts per week "
          options={workoutsperweek}
          onChange={(values) =>
            setinfo(prev => ({ ...prev, workoutsperweek: Number(values[0])}))
          }
        />
     </div>
        </div>
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
        <div className="grid grid-cols-3 gap-6">
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
          <div>
            <Label>Sleep hour</Label>
            <Input
              type="number"
              name="sleephour" 
              value={info.sleephour}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
        <button
          type="button"
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
          onClick={diet_estimate}
        >
          Calculate the calories and Macros and genertae diet
        </button>
         <button
          type="button"
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
          onClick={()=>{
              // setFormData(prev => ({
              //     ...prev,
              //     calories: calories,
              //     protein: protein,
              //     fats: fat,
              //     carbohydrates: carbs,
              //                       }));
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
            <p className="mb-3 text-lg text-gray-500 dark:text-gray-400 lg:mb-7">
             Your body should be consume calories : {info.calories} kcal/day
    
            </p>
            <p className="mb-3 text-lg text-gray-500 dark:text-gray-400 lg:mb-7">
             Carbohydrates : {info.carbohydrates} gr/day

            </p>
            <p className="mb-3 text-lg text-gray-500 dark:text-gray-400 lg:mb-7">
             Protein :{info.protein} gr/day

            </p>
             <p className="mb-3 text-lg text-gray-500 dark:text-gray-400 lg:mb-7">
             Fats : {info.fats} gr/day
            </p>
          </div>
        </div>
      </Modal>
      </div>
    </ComponentCard>
  );
}