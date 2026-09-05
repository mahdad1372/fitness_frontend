import {
  ArrowDownIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function EcommerceMetrics() {
  // ---------- Blood pressure state ----------
  const [bpData, setBpData] = useState({
    averageSystolic: 0,
    averageDiastolic: 0,
    hasData: false,
    loading: true,
  });

  const [datastreambloodpressure, setdatastreambloodpressure] = useState(false);

  const [bpInput, setBpInput] = useState({
    systolic: "",
    diastolic: "",
  });

  const [bpSaving, setBpSaving] = useState(false);

  // ---------- Heart rate state ----------
  const [bpmData, setBpmData] = useState({
    average_bpm: 0,
  });

  // ---------- Cardiovascular state ----------
  const [cardioData, setCardioData] = useState({
    cardio: 0,
    status: "",
    loading: false,
  });

  const ensureBloodPressureDataSource = (): Promise<void> => {
    const userId = Cookies.get("userId");
    const token = Cookies.get("token");

    if (!userId || !token) {
      console.error("User ID or token not found");
      return Promise.resolve();
    }


    return fetch(`http://localhost:7000/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            `Failed to fetch user: ${res.status} ${JSON.stringify(data)}`
          );
        }

        return data;
      })
      .then((data) => {
        const user = Array.isArray(data) ? data[0] : data;

        // Datasource already exists
        if (user?.bloodPressureDataSource != null) {
          setdatastreambloodpressure(true);
          return;
        }


       

        if(datastreambloodpressure === false){
        return fetch(
          `http://localhost:7000/google-fit/blood-pressure/datasource/${userId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then(async (res) => {
            const data = await res.json();

            if (!res.ok) {
              throw new Error(
                `Failed to create blood pressure datasource: ${res.status} ${JSON.stringify(
                  data
                )}`
              );
            }

            return data;
          })
          .then((created) => {
            console.log(
              "Blood pressure datasource created successfully:",
              created
            );
          });
        }

      });
  };

  const patchBloodPressure = (): Promise<void> => {
    const userId = Cookies.get("userId");
    const token = Cookies.get("token");

    if (!userId || !token) {
      return Promise.resolve();
    }

    // Generate test values between 60 and 79
    const systolic = randomInRange(60, 79);
    const diastolic = randomInRange(60, 79);
    setBpSaving(true);

    return fetch(
      `http://localhost:7000/google-fit/blood-pressure/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          systolic,
          diastolic,
        }),
      }
    )
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            `PATCH blood pressure failed: ${res.status} ${JSON.stringify(
              data
            )}`
          );
        }

        return data;
      })
      .then((data) => {
        console.log(
          "Blood pressure PATCH successful:",
          data
        );

        setBpSaving(false);
      })
      .catch((err) => {
        console.error(
          "Error patching blood pressure:",
          err
        );

        setBpSaving(false);

        throw err;
      });
  };

  /**
   * Fetch the current blood pressure data from the API
   * and update the React state.
   */
  const fetchBloodPressure = (): Promise<void> => {
    const userId = Cookies.get("userId");
    const token = Cookies.get("token");

    if (!userId || !token) {
      console.error("User ID or token not found");
      return Promise.resolve();
    }
    setBpData((prev) => ({
      ...prev,
      loading: true,
    }));

    return fetch(
      `http://localhost:7000/google-fit/blood-pressure/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            `Failed to fetch blood pressure: ${res.status} ${JSON.stringify(
              data
            )}`
          );
        }

        return data;
      })
      .then((data) => {
      

        setBpData({
          averageSystolic: data.averageSystolic ?? 0,
          averageDiastolic: data.averageDiastolic ?? 0,
          hasData: (data.pointsCount ?? 0) > 0,
          loading: false,
        });
      })
      .catch((err) => {
        console.error(
          "Error fetching blood pressure:",
          err
        );

        setBpData((prev) => ({
          ...prev,
          loading: false,
        }));
      });
  };

  // ============================================================
  // INITIAL BLOOD PRESSURE FLOW
  // ============================================================

  useEffect(() => {


    ensureBloodPressureDataSource()
      .then(() => {
        if(bpData.averageSystolic > 0 && bpData.averageDiastolic > 0){
        return patchBloodPressure();
        }
      })
      .then(() => {


        return fetchBloodPressure();
      })
      .catch((err) => {
        console.error(
          "Blood pressure initialization failed:",
          err
        );
      });
  }, []);

  // ============================================================
  // PREFILL BLOOD PRESSURE INPUT
  // ============================================================

  useEffect(() => {
    if (
      !bpData.loading &&
      !bpData.hasData &&
      bpInput.systolic === "" &&
      bpInput.diastolic === ""
    ) {
      setBpInput({
        systolic: String(randomInRange(60, 79)),
        diastolic: String(randomInRange(60, 79)),
      });
    }
  }, [
    bpData.loading,
    bpData.hasData,
    bpInput.systolic,
    bpInput.diastolic,
  ]);

  // ============================================================
  // HEART RATE
  // ============================================================

  useEffect(() => {
    const userId = Cookies.get("userId");
    const token = Cookies.get("token");

    if (!userId || !token) {
      console.error(
        "User ID or token cookie not found"
      );
      return;
    }

    fetch(
      `http://localhost:7000/google-fit/heart-rate/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            `Failed to fetch heart rate: ${res.status} ${JSON.stringify(
              data
            )}`
          );
        }

        return data;
      })
      .then((data) => {


        setBpmData({
          average_bpm: data.averageBpm ?? 0,
        });
      })
      .catch((err) => {
        console.error(
          "Error fetching heart rate data:",
          err
        );
      });
  }, []);

  // ============================================================
  // CARDIOVASCULAR
  // ============================================================

  useEffect(() => {
    const userId = Cookies.get("userId");

    if (!userId) {
      console.error(
        "User ID cookie not found"
      );
      return;
    }

    fetch(
      `http://localhost:7000/health_metric/cardiovascular/${userId}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            `Failed to fetch cardiovascular data: ${res.status} ${JSON.stringify(
              data
            )}`
          );
        }

        return data;
      })
      .then((data) => {
        console.log(
          "Cardiovascular data:",
          data
        );

        setCardioData({
          cardio: data.cardio ?? 0,
          status: data.status ?? "",
          loading: false,
        });
      })
      .catch((err) => {
        console.error(
          "Error fetching cardiovascular data:",
          err
        );

        setCardioData((prev) => ({
          ...prev,
          loading: false,
        }));
      });
  }, []);
// ---------- Heart rate state ----------
const [hrDataSourceExists, setHrDataSourceExists] = useState(false);
const [hrInput, setHrInput] = useState("");
const [hrSaving, setHrSaving] = useState(false);

/**
 * Make sure the user has a heart rate datasource.
 * Does NOT write any reading.
 */


  const patchHeartrate = (): Promise<void> => {
    const userId = Cookies.get("userId");
    const token = Cookies.get("token");

    if (!userId || !token) {
      console.error("User ID or token not found");
      return Promise.resolve();
    }

    // Generate test values between 60 and 79
    const bpm = randomInRange(60, 79);
    setBpSaving(true);

    return fetch(
      `http://localhost:7000/google-fit/heart-rate/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bpm
        }),
      }
    )
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            `PATCH blood pressure failed: ${res.status} ${JSON.stringify(
              data
            )}`
          );
        }

        return data;
      })
      .then((data) => {
        console.log(
          "Heart rate PATCH successful:",
          data
        );

        setBpSaving(false);
      })
      .catch((err) => {
        console.error(
          "Error patching Heart rate",
          err
        );

        setBpSaving(false);

        throw err;
      });
  };

const ensureHeartRateDataSource = (): Promise<void> => {
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");

  if (!userId || !token) {
    console.error("User ID or token not found");
    return Promise.resolve();
  }

  return fetch(`http://localhost:7000/users/${userId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`Failed to fetch user: ${res.status} ${JSON.stringify(data)}`);
      }
      return data;
    })
    .then((data) => {
      const user = Array.isArray(data) ? data[0] : data;

      if (user?.heartRateDataSource != null) {
        setHrDataSourceExists(true);
        return;
      }

      return fetch(`http://localhost:7000/google-fit/heart-rate/datasource/${userId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(async (res) => {
          const created = await res.json();
          if (!res.ok) {
            throw new Error(
              `Failed to create heart rate datasource: ${res.status} ${JSON.stringify(created)}`
            );
          }
          return created;
        })
        .then((created) => {
          console.log("Heart rate datasource created:", created);
          setHrDataSourceExists(true);
        });
    });
};

/**
 * Fetch the current heart rate average and update state.
 */
const fetchHeartRate = (): Promise<void> => {
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");

  if (!userId || !token) {
    console.error("User ID or token not found");
    return Promise.resolve();
  }

  return fetch(`http://localhost:7000/google-fit/heart-rate/${userId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`Failed to fetch heart rate: ${res.status} ${JSON.stringify(data)}`);
      }
      return data;
    })
    .then((data) => {
      setBpmData({
        average_bpm: data.averageBpm ?? data.average_bpm ?? 0,
      });
    })
    .catch((err) => {
      console.error("Error fetching heart rate data:", err);
    });
};

/**
 * Save a REAL heart rate value typed by the user.
 */

  useEffect(() => {
    console.log(
      "Starting blood pressure initialization..."
    );

    ensureHeartRateDataSource()
      .then(() => {
        console.log(
          "Datasource ready. Calling PATCH..."
        );
        if(bpmData.average_bpm > 0){
        return patchHeartrate();
        }
      })
      .then(() => {
        console.log(
          "PATCH completed. Fetching blood pressure..."
        );

        return fetchHeartRate();
      })
      .catch((err) => {
        console.error(
          "Blood pressure initialization failed:",
          err
        );
      });
  }, []);

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">

      {/* Blood pressure */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">

        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="mt-5">

          <span className="text-sm text-gray-500 dark:text-gray-400">
            Blood pressure
          </span>

          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {bpData.loading
              ? "Loading..."
              : `${bpData.averageSystolic}/${bpData.averageDiastolic} mmHg`}
          </h4>

          {bpSaving && (
            <p className="mt-2 text-sm text-gray-500">
              Saving...
            </p>
          )}

        </div>
      </div>

      {/* Heart rate */}
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

      {/* Cardiovascular */}
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
              {cardioData.cardio.toFixed(2)}
            </h4>
          </div>

          <Badge color="error">
            <ArrowDownIcon />
            Risk heart attack {cardioData.status}
          </Badge>

        </div>
      </div>

    </div>
  );
}