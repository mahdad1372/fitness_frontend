import React, { createContext, useContext, useState } from "react";

export type WorkoutScheduleItem = {
  Day: string;
  Exercise: string;
  Sets: number | string;
  Reps: string;
  status: string;
};

type WorkoutData = {
  user_id: number;
  type: string[];
  exercises: string[];

  gym_Scheduale: WorkoutScheduleItem[];

  rest_seconds: number;
  rpe: number;
  sets: number;
  calories: number;
  protein: number;
  fats: number;
  carbohydrates: number;
  weight: number;
  height:number;
  goal_diet: string;
  goal_gym: string;
  Exerciseaimtype: string;
  muscle_size: number;
  bmi:number;
  deadlift: number;
  day_scheduale: string;
  consume_gym_scheduale: boolean;
  editfood:boolean,
  editgoal:boolean,
  edituser:boolean,
  edithealthmetric:boolean,
  editworkout:boolean,
  food_id:number,
  goal_id:number,
  health_id:number,
  workout_id:number
};

type WorkoutContextType = {
  formData: WorkoutData;
  setFormData: React.Dispatch<React.SetStateAction<WorkoutData>>;
  startWorkout: () => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(
  undefined
);

export const WorkoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [formData, setFormData] = useState<WorkoutData>({
    user_id: 0,
    type: [],
    exercises: [],

    gym_Scheduale: [],

    Exerciseaimtype: "",
    rest_seconds: 0,
    rpe: 0,
    sets: 0,
    calories: 0,
    protein: 0,
    fats: 0,
    carbohydrates: 0,
    weight: 0,
    height:0,
    bmi:0,
    goal_diet: "",
    goal_gym: "",
    muscle_size: 0,
    deadlift: 0,
    day_scheduale: "",
    consume_gym_scheduale: false,
    editfood:false,
    editgoal:false,
    edituser:false,
    edithealthmetric:false,
    editworkout:false,
    workout_id:0,
    goal_id:0,
    food_id:0,
    health_id:0
  });

  const startWorkout = () => {
    console.log("Workout started:", formData);
  };

  return (
    <WorkoutContext.Provider
      value={{ formData, setFormData, startWorkout }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      "useWorkout must be used inside WorkoutProvider"
    );
  }

  return context;
};