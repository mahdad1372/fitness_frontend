import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Badge from "../../ui/badge/Badge";


interface HealthMetric {
  id: number;
  user_id: number;
  cholesterol: number;
  blood_pressure: string;
  heart_rate: number;
}


export default function Healthmetrics() {
  const [health, setHealth] = useState<HealthMetric[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHealthMetrics = async () => {
    try {
      const token = Cookies.get("token");
      const userRole = Cookies.get("userrole");
      const userId = Cookies.get("userId");

      if (!token) {
        throw new Error("Unauthorized");
      }

      const url =
        userRole === "ADMIN"
          ? "http://localhost:7000/health_metric/all"
          : `http://localhost:7000/health_metric/${userId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch health metrics");
      }

      const data = await response.json();
      console.log(data)
      // Non-admin usually gets a single object → normalize to array
      setHealth(data);
    } catch (error) {
      console.error("Error fetching health metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthMetrics();
  }, []);

  const handleDeleteMetric = async (id: number) => {
    const token = Cookies.get("token");

    if (!token) {
      alert("Unauthorized");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this health record?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:7000/health_metric/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete health metric");
      }

      setHealth((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete health metric");
    }
  };

  if (loading) {
    return <div className="p-5">Loading...</div>;
  }
console.log(health[0])
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
              >
                Health id 
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                User id 
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                cholesterol
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                blood_pressure
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                heart_rate
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {health.map((health) => (
              <TableRow >
                <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                  {health.id}
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {health.user_id}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {health.cholesterol}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {health.blood_pressure}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {health.heart_rate}
                </TableCell>
                <TableCell className="px-4 py-3 text-start">
              
                <button
                onClick={() => handleDeleteUser(health.id)}
                className="rounded-md bg-red-500 px-3 py-1 text-sm font-medium text-white hover:bg-red-600 transition"
                >
                Delete
                </button>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
