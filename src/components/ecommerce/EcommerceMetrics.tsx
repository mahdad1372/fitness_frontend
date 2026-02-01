import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
export default function EcommerceMetrics() {
  // 1. Initialize state for blood pressure data
  const [bpData, setBpData] = useState({
    averageSystolic: 0,
    averageDiastolic: 0,
    loading: true
  });
    const [bpmData, setbpmData] = useState({
    average_bpm: 0,
  });
const [cardioData, setCardioData] = useState({
  cardio: 0,
  status: "",
  loading:false
});
  useEffect(() => {
    fetch("http://localhost:7000/google-fit/heart-rate")
      .then((res) => res.json())
      .then((data) => {
        setbpmData({
          average_bpm: data.average_bpm,
        });
      })
      .catch((err) => {
        console.error("Error fetching BP data:", err);
        setBpData((prev) => ({ ...prev, loading: false }));
      });
  }, []);
  // 2. Fetch data from your Spring Boot API
  useEffect(() => {
    fetch("http://localhost:7000/google-fit/blood-pressure")
      .then((res) => res.json())
      .then((data) => {
        setBpData({
          averageSystolic: data.averageSystolic,
          averageDiastolic: data.averageDiastolic,
          loading: false
        });
      })
      .catch((err) => {
        console.error("Error fetching BP data:", err);
        setBpData((prev) => ({ ...prev, loading: false }));
      });
  }, []);
useEffect(() => {
  const userId = Cookies.get("userId"); 

  if (!userId) {
    console.error("User ID cookie not found");
    return;
  }

  fetch(`http://localhost:7000/health_metric/cardiovascular/${userId}`, {
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
  
      setCardioData({
        cardio: data.cardio,
        status: data.status,
        loading: false
      });
    })
    .catch((err) => {
      console.error("Error fetching cardiovascular data:", err);
      setCardioData((prev) => ({ ...prev, loading: false }));
    });
}, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
             Blood pressure
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {bpData.averageDiastolic} mmHg
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Heartrate
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {bpmData.average_bpm} bpm
            </h4>
          </div>

          <Badge color="error">
            <ArrowDownIcon />
            9.05%
          </Badge>
        </div>
      </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Cardiovascular
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {cardioData.cardio}
            </h4>
          </div>

          <Badge color="error">
            <ArrowDownIcon />
            Risk heart attack {cardioData.status}
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
