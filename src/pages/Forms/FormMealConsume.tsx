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
export default function FormMealConsume() {
  const { formData, setFormData, startWorkout } = useWorkout();
  const [loading, setLoading] = useState(true);
  const { isOpen, openModal, closeModal } = useModal();
  const [userId, setUserId] = useState<number | null>(null);
  const [evaluation,setevaluation] = useState("");
  const [buttontxt,setbuttontxt] = useState("");
  const navigate = useNavigate();
const [breakfast, setBreakfast] = useState([
  {
    Carbohydrate: 0,
    Protein: 0,
    Fats: 0,
    calories: 0,
  },
  {
    Carbohydrate: 0,
    Protein: 0,
    Fats: 0,
    calories: 0,
  },
    {
    Carbohydrate: 0,
    Protein: 0,
    Fats: 0,
    calories: 0,
  },
  {
    Carbohydrate: 0,
    Protein: 0,
    Fats: 0,
    calories: 0,
  }
]);
const [lunch, setlunch] = useState([
  {
    Carbohydrate: 0,
    Protein: 0,
    Fats: 0,
    calories: 0,
  },
  {
    Carbohydrate: 0,
    Protein: 0,
    Fats: 0,
    calories: 0,
  },
    {
    Carbohydrate: 0,
    Protein: 0,
    Fats: 0,
    calories: 0,
  },
  {
    Carbohydrate: 0,
    Protein: 0,
    Fats: 0,
    calories: 0,
  }
]);
const [dinner, setdinner] = useState([
  {
    Carbohydrate: 0,
    Protein: 0,
    Fats: 0,
    calories: 0,
  },
  {
    Carbohydrate: 0,
    Protein: 0,
    Fats: 0,
    calories: 0,
  },
    {
    Carbohydrate: 0,
    Protein: 0,
    Fats: 0,
    calories: 0,
  },
  {
    Carbohydrate: 0,
    Protein: 0,
    Fats: 0,
    calories: 0,
  }
]);
const [Snack, setsnack] = useState([
  {
    Carbohydrate: 0,
    Protein: 0,
    Fats: 0,
    calories: 0,
  },
  {
    Carbohydrate: 0,
    Protein: 0,
    Fats: 0,
    calories: 0,
  },
    {
    Carbohydrate: 0,
    Protein: 0,
    Fats: 0,
    calories: 0,
  },
  {
    Carbohydrate: 0,
    Protein: 0,
    Fats: 0,
    calories: 0,
  }
]);
  const [calories,setcalories] = useState(0);
  const [protein,setprotein] = useState(0);
  const [fat,setfat] = useState(0);
  const [carbs,setcarbs] = useState(0);
  const ProteinSources = [
    { value: "Chicken", text: "Chicken" },
    { value: "Fish", text: "Fish" },
    { value: "Eggs", text: "Eggs" },
    { value: "Beef", text: "Beef" },
    { value: "Beans", text: "Beans" },
    { value: "Yogurt", text: "Yogurt" },
  ];

  const Grain = [
    { value: "Rice", text: "Rice" },
    { value: "Bread", text: "Bread" },
    { value: "Pasta", text: "Pasta" },
    { value: "Oats", text: "Oats" },
    { value: "Potatoes", text: "Potatoes" },
  ];
    const Fats = [
    { value: "Nuts", text: "Nuts" },
    { value: "Olive oil", text: "Olive oil" },
    { value: "Butter", text: "Butter" },
  ];
    const Vegetables = [
    { value: "Broccoli", text: "Broccoli" },
    { value: "Carrots", text: "Carrots" },
    { value: "Spinach", text: "Spinach" },
    { value: "Salad", text: "Salad" },
    { value: "Avocado", text: "Avocado" },
  ];

  const foodsnutrition = [
    {name : "Chicken",calories:165,protein:31,carbs:0,fat:3.6},
    {name : "Beef",calories:250,protein:26,carbs:0,fat:15},
    {name : "Fish",calories:208,protein:20,carbs:0,fat:13},
    {name : "Eggs",calories:70,protein:6,carbs:1,fat:5},
    {name : "Beans",calories:116,protein:9,carbs:20,fat:0.4},
    {name : "Yogurt",calories:59,protein:10,carbs:3.6,fat:0.4},
    { name: "Rice", calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { name: "Bread", calories: 265, protein: 9, carbs: 49, fat: 3.2 },
  { name: "Pasta", calories: 131, protein: 5, carbs: 25, fat: 1.1 },
  { name: "Oats", calories: 389, protein: 17, carbs: 66, fat: 7 },
  { name: "Potatoes", calories: 77, protein: 2, carbs: 17, fat: 0.1 },
  { name: "Fruits", calories: 89, protein: 1, carbs: 23, fat: 0.3 },
  { name: "Olive Oil", calories: 884, protein: 0, carbs: 0, fat: 100 },
  { name: "Nuts", calories: 579, protein: 21, carbs: 22, fat: 50 },
  { name: "Avocado", calories: 160, protein: 2, carbs: 9, fat: 15 },
  { name: "Butter", calories: 717, protein: 0.9, carbs: 0, fat: 81 },
  { name: "Broccoli", calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
  { name: "Carrot", calories: 41, protein: 1, carbs: 10, fat: 0.2 },
  { name: "Spinach", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
  { name: "Salad", calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2 }
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
  
    const result = foodsnutrition.filter(food => food.name === "Chicken");
const updatefooditem = (index: number, field: string, value: number) => {
  setBreakfast(prev => {
    const updated = [...prev]; // copy array
    updated[index] = {
      ...updated[index],       // copy object
      [field]: value           // update field
    };
    return updated;
  });
};
const updatelunchitem = (index: number, field: string, value: number) => {
  setlunch(prev => {
    const updated = [...prev]; // copy array
    updated[index] = {
      ...updated[index],       // copy object
      [field]: value           // update field
    };
    return updated;
  });
};
const updatedinneritem = (index: number, field: string, value: number) => {
  setdinner(prev => {
    const updated = [...prev]; // copy array
    updated[index] = {
      ...updated[index],       // copy object
      [field]: value           // update field
    };
    return updated;
  });
};
const updatesnackitem = (index: number, field: string, value: number) => {
  setsnack(prev => {
    const updated = [...prev]; // copy array
    updated[index] = {
      ...updated[index],       // copy object
      [field]: value           // update field
    };
    return updated;
  });
};
  

const totalProtein = breakfast.reduce(
  (sum, item) => sum + item.Protein,
  0
) + lunch.reduce(
  (sum, item) => sum + item.Protein,
  0
) + dinner.reduce(
  (sum, item) => sum + item.Protein,
  0
)+ Snack.reduce(
  (sum, item) => sum + item.Protein,
  0
);

const totalcarbohydrate = breakfast.reduce(
  (sum, item) => sum + item.Carbohydrate,
  0
) + lunch.reduce(
  (sum, item) => sum + item.Carbohydrate,
  0
) + dinner.reduce(
  (sum, item) => sum + item.Carbohydrate,
  0
)+ Snack.reduce(
  (sum, item) => sum + item.Carbohydrate,
  0
);
const totalfats = breakfast.reduce(
  (sum, item) => sum + item.Fats,
  0
) + lunch.reduce(
  (sum, item) => sum + item.Fats,
  0
) + dinner.reduce(
  (sum, item) => sum + item.Fats,
  0
)+ Snack.reduce(
  (sum, item) => sum + item.Fats,
  0
);
const totalcalories = breakfast.reduce(
  (sum, item) => sum + item.calories,
  0
) + lunch.reduce(
  (sum, item) => sum + item.calories,
  0
) + dinner.reduce(
  (sum, item) => sum + item.calories,
  0
)+ Snack.reduce(
  (sum, item) => sum + item.calories,
  0
);
const adherence_score = (num1: number,num2: number)=>{
  let adherence = num1/num2 
  return adherence * 100
}

const average_adherence = (num1: number,num2: number,num3:number,num4:number)=>{
  let average = num1 + num2 + num3 + num4
  return average/4
}

const evaluate_score = (num1: number) => {
  if(num1 >= 90){
    setbuttontxt("Let's measure your current weight")
    setevaluation("Excellent, you done your diet completely");
  }
  if(num1>75 && num1<90){
    setbuttontxt("Let's measure your current weight")
    setevaluation("Very good you have followed your diet");
  }
  if(num1>50 && num1<75){
    setbuttontxt("Let's go to adjeust the plan food consuming again ")
    setevaluation("Needs Improvement your diet");
  }
  if(num1 < 50){
    setbuttontxt("Let's go to adjeust the plan food consuming again ")
    setevaluation("Poor");
  }
};
const evaluation_button = (num1: number) => {
      evaluate_score(num1);
      openModal();
}
const button_navigation_click = () => {
  if(evaluation == "Needs Improvement your diet" || evaluation == "Poor"){
    closeModal();
  }else{
      navigate("/evaluate_weight");
  }
}

  return (
    <ComponentCard title="Meal consume">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2>Breakfast</h2>
        <div className="grid grid-cols-4 gap-6" >
          <div className="relative z-52">
        <MultiSelect
          label="Select food contain carbohydrate"
          options={Grain}
          onChange={(e) => {
            const selectedFoods = foodsnutrition.filter(food =>
            e.includes(food.name)
          );

          if (selectedFoods.length === 0) return;
          const totals = selectedFoods.reduce(
            (acc, food) => {
            acc.carbs += food.carbs;
            acc.protein += food.protein;
            acc.fats += food.fat;
            acc.calories += food.calories;
             return acc;
            },
            { carbs: 0, protein: 0, fats: 0, calories: 0 }
           
          );
          updatefooditem(0, "Carbohydrate", totals.carbs);
          updatefooditem(0, "Protein", totals.protein);
          updatefooditem(0, "Fats", totals.fats);
          updatefooditem(0, "calories", totals.calories);
          }}
        />
          </div>

          <div className="relative z-52">
        <MultiSelect
           label="Select food contain Protein"
          options={ProteinSources}
          onChange={(e) => {
            const selectedFoods = foodsnutrition.filter(food =>
            e.includes(food.name)
          );

          if (selectedFoods.length === 0) return;
          const totals = selectedFoods.reduce(
            (acc, food) => {
            acc.carbs += food.carbs;
            acc.protein += food.protein;
            acc.fats += food.fat;
            acc.calories += food.calories;
             return acc;
            },
            { carbs: 0, protein: 0, fats: 0, calories: 0 }
           
          );
          updatefooditem(1, "Carbohydrate", totals.carbs);
          updatefooditem(1, "Protein", totals.protein);
          updatefooditem(1, "Fats", totals.fats);
          updatefooditem(1, "calories", totals.calories);
          }}
        />
          </div>
                    <div className="relative z-52">
        <MultiSelect
          label="Select food contain fats"
          options={Fats}
          onChange={(e) => {
            const selectedFoods = foodsnutrition.filter(food =>
            e.includes(food.name)
          );

          if (selectedFoods.length === 0) return;
          const totals = selectedFoods.reduce(
            (acc, food) => {
            acc.carbs += food.carbs;
            acc.protein += food.protein;
            acc.fats += food.fat;
            acc.calories += food.calories;
             return acc;
            },
            { carbs: 0, protein: 0, fats: 0, calories: 0 }
           
          );
          updatefooditem(2, "Carbohydrate", totals.carbs);
          updatefooditem(2, "Protein", totals.protein);
          updatefooditem(2, "Fats", totals.fats);
          updatefooditem(2, "calories", totals.calories);
          }}
        />
          </div>

          <div className="relative z-52">
        <MultiSelect
           label="Select vegetables"
          options={Vegetables}
          onChange={(e) => {
            const selectedFoods = foodsnutrition.filter(food =>
            e.includes(food.name)
          );

          if (selectedFoods.length === 0) return;
          const totals = selectedFoods.reduce(
            (acc, food) => {
            acc.carbs += food.carbs;
            acc.protein += food.protein;
            acc.fats += food.fat;
            acc.calories += food.calories;
             return acc;
            },
            { carbs: 0, protein: 0, fats: 0, calories: 0 }
           
          );
          updatefooditem(3, "Carbohydrate", totals.carbs);
          updatefooditem(3, "Protein", totals.protein);
          updatefooditem(3, "Fats", totals.fats);
          updatefooditem(3, "calories", totals.calories);
          }}
        />
          </div>
        </div>
  <h2>Lunch</h2>
        <div className="grid grid-cols-4 gap-6">
          <div className="relative z-51">
        <MultiSelect
          label="Select food contain carbohydrate"
          options={Grain}
          onChange={(e) => {
            const selectedFoods = foodsnutrition.filter(food =>
            e.includes(food.name)
          );

          if (selectedFoods.length === 0) return;
          const totals = selectedFoods.reduce(
            (acc, food) => {
            acc.carbs += food.carbs;
            acc.protein += food.protein;
            acc.fats += food.fat;
            acc.calories += food.calories;
             return acc;
            },
            { carbs: 0, protein: 0, fats: 0, calories: 0 }
           
          );
          updatelunchitem(0, "Carbohydrate", totals.carbs);
          updatelunchitem(0, "Protein", totals.protein);
          updatelunchitem(0, "Fats", totals.fats);
          updatelunchitem(0, "calories", totals.calories);
          }}
        />
          </div>

          <div className="relative z-51">
        <MultiSelect
           label="Select food contain Protein"
          options={ProteinSources}
          onChange={(e) => {
            const selectedFoods = foodsnutrition.filter(food =>
            e.includes(food.name)
          );

          if (selectedFoods.length === 0) return;
          const totals = selectedFoods.reduce(
            (acc, food) => {
            acc.carbs += food.carbs;
            acc.protein += food.protein;
            acc.fats += food.fat;
            acc.calories += food.calories;
             return acc;
            },
            { carbs: 0, protein: 0, fats: 0, calories: 0 }
           
          );
          updatelunchitem(1, "Carbohydrate", totals.carbs);
          updatelunchitem(1, "Protein", totals.protein);
          updatelunchitem(1, "Fats", totals.fats);
          updatelunchitem(1, "calories", totals.calories);
          }}
        />
          </div>
                    <div className="relative z-51">
        <MultiSelect
          label="Select food contain fats"
          options={Fats}
          onChange={(e) => {
            const selectedFoods = foodsnutrition.filter(food =>
            e.includes(food.name)
          );

          if (selectedFoods.length === 0) return;
          const totals = selectedFoods.reduce(
            (acc, food) => {
            acc.carbs += food.carbs;
            acc.protein += food.protein;
            acc.fats += food.fat;
            acc.calories += food.calories;
             return acc;
            },
            { carbs: 0, protein: 0, fats: 0, calories: 0 }
           
          );
          updatelunchitem(2, "Carbohydrate", totals.carbs);
          updatelunchitem(2, "Protein", totals.protein);
          updatelunchitem(2, "Fats", totals.fats);
          updatelunchitem(2, "calories", totals.calories);
          }}
        />
          </div>

          <div className="relative z-51">
        <MultiSelect
           label="Select vegetables"
          options={Vegetables}
          onChange={(e) => {
            const selectedFoods = foodsnutrition.filter(food =>
            e.includes(food.name)
          );

          if (selectedFoods.length === 0) return;
          const totals = selectedFoods.reduce(
            (acc, food) => {
            acc.carbs += food.carbs;
            acc.protein += food.protein;
            acc.fats += food.fat;
            acc.calories += food.calories;
             return acc;
            },
            { carbs: 0, protein: 0, fats: 0, calories: 0 }
           
          );
          updatelunchitem(3, "Carbohydrate", totals.carbs);
          updatelunchitem(3, "Protein", totals.protein);
          updatelunchitem(3, "Fats", totals.fats);
          updatelunchitem(3, "calories", totals.calories);
          }}
        />
          </div>
        </div>
          <h2>Dinner</h2>
        <div className="grid grid-cols-4 gap-6">
          <div className="relative z-51">
        <MultiSelect
          label="Select food contain carbohydrate"
          options={Grain}
          onChange={(e) => {
            const selectedFoods = foodsnutrition.filter(food =>
            e.includes(food.name)
          );

          if (selectedFoods.length === 0) return;
          const totals = selectedFoods.reduce(
            (acc, food) => {
            acc.carbs += food.carbs;
            acc.protein += food.protein;
            acc.fats += food.fat;
            acc.calories += food.calories;
             return acc;
            },
            { carbs: 0, protein: 0, fats: 0, calories: 0 }
           
          );
          updatedinneritem(0, "Carbohydrate", totals.carbs);
          updatedinneritem(0, "Protein", totals.protein);
          updatedinneritem(0, "Fats", totals.fats);
          updatedinneritem(0, "calories", totals.calories);
          }}
        />
          </div>

          <div className="relative z-49">
        <MultiSelect
           label="Select food contain Protein"
          options={ProteinSources}
          onChange={(e) => {
            const selectedFoods = foodsnutrition.filter(food =>
            e.includes(food.name)
          );

          if (selectedFoods.length === 0) return;
          const totals = selectedFoods.reduce(
            (acc, food) => {
            acc.carbs += food.carbs;
            acc.protein += food.protein;
            acc.fats += food.fat;
            acc.calories += food.calories;
             return acc;
            },
            { carbs: 0, protein: 0, fats: 0, calories: 0 }
           
          );
          updatedinneritem(1, "Carbohydrate", totals.carbs);
          updatedinneritem(1, "Protein", totals.protein);
          updatedinneritem(1, "Fats", totals.fats);
          updatedinneritem(1, "calories", totals.calories);
          }}
        />
          </div>
                    <div className="relative z-50">
        <MultiSelect
          label="Select food contain fats"
          options={Fats}
          onChange={(e) => {
            const selectedFoods = foodsnutrition.filter(food =>
            e.includes(food.name)
          );

          if (selectedFoods.length === 0) return;
          const totals = selectedFoods.reduce(
            (acc, food) => {
            acc.carbs += food.carbs;
            acc.protein += food.protein;
            acc.fats += food.fat;
            acc.calories += food.calories;
             return acc;
            },
            { carbs: 0, protein: 0, fats: 0, calories: 0 }
           
          );
          updatedinneritem(2, "Carbohydrate", totals.carbs);
          updatedinneritem(2, "Protein", totals.protein);
          updatedinneritem(2, "Fats", totals.fats);
          updatedinneritem(2, "calories", totals.calories);
          }}
        />
          </div>

          <div className="relative z-50">
        <MultiSelect
           label="Select vegetables"
          options={Vegetables}
          onChange={(e) => {
            const selectedFoods = foodsnutrition.filter(food =>
            e.includes(food.name)
          );

          if (selectedFoods.length === 0) return;
          const totals = selectedFoods.reduce(
            (acc, food) => {
            acc.carbs += food.carbs;
            acc.protein += food.protein;
            acc.fats += food.fat;
            acc.calories += food.calories;
             return acc;
            },
            { carbs: 0, protein: 0, fats: 0, calories: 0 }
           
          );
          updatedinneritem(3, "Carbohydrate", totals.carbs);
          updatedinneritem(3, "Protein", totals.protein);
          updatedinneritem(3, "Fats", totals.fats);
          updatedinneritem(3, "calories", totals.calories);
          }}
        />
          </div>
        </div>
          <h2>Snack</h2>
        <div className="grid grid-cols-4 gap-6">
          <div className="relative z-50">
        <MultiSelect
          label="Select food contain carbohydrate"
          options={Grain}
          onChange={(e) => {
            const selectedFoods = foodsnutrition.filter(food =>
            e.includes(food.name)
          );

          if (selectedFoods.length === 0) return;
          const totals = selectedFoods.reduce(
            (acc, food) => {
            acc.carbs += food.carbs;
            acc.protein += food.protein;
            acc.fats += food.fat;
            acc.calories += food.calories;
             return acc;
            },
            { carbs: 0, protein: 0, fats: 0, calories: 0 }
           
          );
          updatesnackitem(0, "Carbohydrate", totals.carbs);
          updatesnackitem(0, "Protein", totals.protein);
          updatesnackitem(0, "Fats", totals.fats);
          updatesnackitem(0, "calories", totals.calories);
          }}
        />
          </div>

          <div className="relative z-50">
        <MultiSelect
           label="Select food contain Protein"
          options={ProteinSources}
          onChange={(e) => {
            const selectedFoods = foodsnutrition.filter(food =>
            e.includes(food.name)
          );

          if (selectedFoods.length === 0) return;
          const totals = selectedFoods.reduce(
            (acc, food) => {
            acc.carbs += food.carbs;
            acc.protein += food.protein;
            acc.fats += food.fat;
            acc.calories += food.calories;
             return acc;
            },
            { carbs: 0, protein: 0, fats: 0, calories: 0 }
           
          );
          updatesnackitem(1, "Carbohydrate", totals.carbs);
          updatesnackitem(1, "Protein", totals.protein);
          updatesnackitem(1, "Fats", totals.fats);
          updatesnackitem(1, "calories", totals.calories);
          }}
        />
          </div>
                    <div className="relative z-50">
        <MultiSelect
          label="Select food contain fats"
          options={Fats}
          onChange={(e) => {
            const selectedFoods = foodsnutrition.filter(food =>
            e.includes(food.name)
          );

          if (selectedFoods.length === 0) return;
          const totals = selectedFoods.reduce(
            (acc, food) => {
            acc.carbs += food.carbs;
            acc.protein += food.protein;
            acc.fats += food.fat;
            acc.calories += food.calories;
             return acc;
            },
            { carbs: 0, protein: 0, fats: 0, calories: 0 }
           
          );
          updatesnackitem(2, "Carbohydrate", totals.carbs);
          updatesnackitem(2, "Protein", totals.protein);
          updatesnackitem(2, "Fats", totals.fats);
          updatesnackitem(2, "calories", totals.calories);
          }}
        />
          </div>

          <div className="relative z-50">
        <MultiSelect
           label="Select vegetables"
          options={Vegetables}
          onChange={(e) => {
            const selectedFoods = foodsnutrition.filter(food =>
            e.includes(food.name)
          );

          if (selectedFoods.length === 0) return;
          const totals = selectedFoods.reduce(
            (acc, food) => {
            acc.carbs += food.carbs;
            acc.protein += food.protein;
            acc.fats += food.fat;
            acc.calories += food.calories;
             return acc;
            },
            { carbs: 0, protein: 0, fats: 0, calories: 0 }
           
          );
          updatesnackitem(3, "Carbohydrate", totals.carbs);
          updatesnackitem(3, "Protein", totals.protein);
          updatesnackitem(3, "Fats", totals.fats);
          updatesnackitem(3, "calories", totals.calories);
          }}
        />
          </div>
        </div>
        {/* <div className="grid grid-cols-2 gap-6">
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
        </div> */}

        {/* Submit */}
        <div className="grid grid-cols-2 gap-6">
        <button
          type="button"
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
          onClick={()=>{
            evaluation_button(average_adherence(
              Number(adherence_score(totalcarbohydrate,formData.carbohydrates).toFixed(2))
            ,Number(adherence_score(totalProtein,formData.protein).toFixed(2)),
            Number(adherence_score(totalcalories,formData.calories).toFixed(2)),
            Number(adherence_score(totalfats,formData.fats).toFixed(2))))
          }}
        >
         Calculate with the adherence score and make the comparison with the diet 
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
            Compare Planned vs Actual
            </h4>
            <p className="mb-6 text-lg text-gray-500 dark:text-gray-400 lg:mb-7">
              Here we make the comparison between the actual consumed and target 
            </p>
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            actual vs target
            </h4>
            <p className="mb-6 text-lg text-gray-500 dark:text-gray-400 lg:mb-7">
            Calories -- {totalcalories} / {formData.calories.toFixed(2)} -- 
            Adherence score is : {adherence_score(totalcalories,formData.calories).toFixed(2)}
           
            </p>
            <p className="mb-6 text-lg text-gray-500 dark:text-gray-400 lg:mb-7">
             Carbohydrates -- {totalcarbohydrate} / {formData.carbohydrates.toFixed(2)} -- 
            Adherence score is : {adherence_score(totalcarbohydrate,formData.carbohydrates).toFixed(2)}
            </p>
             <p className="mb-6 text-lg text-gray-500 dark:text-gray-400 lg:mb-7">
            Protein -- {totalProtein.toFixed(2)} / {formData.protein.toFixed(2)} -- 
            Adherence score is : {adherence_score(totalProtein,formData.protein).toFixed(2)}
            </p>
            <p className="mb-6 text-lg text-gray-500 dark:text-gray-400 lg:mb-7">
            fats -- {totalfats} / {formData.fats.toFixed(2)}  -- 
            Adherence score is : {adherence_score(totalfats,formData.fats).toFixed(2)}
            </p>
                      
           <p className="mb-6 text-lg text-gray-500 dark:text-gray-400 lg:mb-7">
            Final adherence is this -- {average_adherence(
              Number(adherence_score(totalcarbohydrate,formData.carbohydrates).toFixed(2))
            ,Number(adherence_score(totalProtein,formData.protein).toFixed(2)),
            Number(adherence_score(totalcalories,formData.calories).toFixed(2)),
            Number(adherence_score(totalfats,formData.fats).toFixed(2))).toFixed(2)} %
            </p>
            <p className="mb-6 text-lg text-gray-500 dark:text-gray-400 lg:mb-7">
              Evaluation of the score is : {evaluation}
            </p>
                    <button
          type="button"
          className="w-100 bg-green-600 text-white py-3 rounded-lg"
          onClick={()=>{
            evaluation_button(average_adherence(
              Number(adherence_score(totalcarbohydrate,formData.carbohydrates).toFixed(2))
            ,Number(adherence_score(totalProtein,formData.protein).toFixed(2)),
            Number(adherence_score(totalcalories,formData.calories).toFixed(2)),
            Number(adherence_score(totalfats,formData.fats).toFixed(2))))
            button_navigation_click();
          }}
        >
         {buttontxt}
        </button>
          </div>
        </div>
      </Modal>
      </div>
    </ComponentCard>
  );
}