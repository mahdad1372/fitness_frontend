import { createContext, useContext, useState } from "react";

type WorkoutData = {
  user_id: number;
  type: string[];
  exercises: string[];
  rest_seconds: number;
  rpe: number;
  sets: number;
};

type WorkoutContextType = {
  formData: WorkoutData;
  setFormData: React.Dispatch<React.SetStateAction<WorkoutData>>;
  startWorkout: () => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<WorkoutData>({
    user_id: 0,
    type: [],
    exercises: [],
    rest_seconds: 0,
    rpe: 0,
    sets: 0,
  });

  const startWorkout = () => {
    console.log("Workout started:", formData);
  };

  return (
    <WorkoutContext.Provider value={{ formData, setFormData, startWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used inside WorkoutProvider");
  }
  return context;
};