import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Alerts from "./pages/UiElements/Alerts";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Worksouttable from "./pages/Tables/WorkoutsTables";
import HealthmetricsTabls from "./pages/Tables/HealthmetrixTables";
import GoalTables from "./pages/Tables/GoalTables";
import FoodTables from "./pages/Tables/FoodTables";
import Formworkouts from "../src/pages/Forms/Formworkouts";
import Trackworkouts from "./components/tables/BasicTables/Trackworkouts";
import { WorkoutProvider } from "./context/WorkoutContext";
import Formdiet from "./pages/Forms/FormDiet";
import FormMealConsume from "./pages/Forms/FormMealConsume";
import Formweight from "../src/pages/Forms/Formweight";
import FormGym from "../src/pages/Forms/FormGym";
import ForTrainingGym from "./pages/Forms/FormTrainingGym";
export default function App() {
  return (
    <>
      <Router>
          <WorkoutProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/form-elements" element={<FormElements />} />
            <Route path="/workouts-tables" element={<Worksouttable />} />
            <Route path="/basic-tables" element={<BasicTables />} />
            <Route path="/health-tables" element={<HealthmetricsTabls />} />
            <Route path="/goal-tables" element={<GoalTables />} />
            <Route path="/food-tables" element={<FoodTables />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/addworkouts" element={<Formworkouts/>} />
            <Route path="/trackworkouts" element={<Trackworkouts/>} />
            <Route path="/adddiet" element={<Formdiet/>} />
            <Route path="/consume_meal" element={<FormMealConsume/>}/>
            <Route path="/evaluate_weight" element={<Formweight />}/>
            <Route path="/addgymscheduale" element={<FormGym/>}/>
            <Route path="/traininggym" element={<ForTrainingGym/>}/>
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </WorkoutProvider>
      </Router>
    </>
  );
}
