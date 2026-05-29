import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import PageMeta from "../../components/common/PageMeta";
import Healthmetrics from "../../components/form/form-elements/Healthmetricsform";
import Foodform from "../../components/form/form-elements/Foodform";
import Goalform from "../../components/form/form-elements/Goalform";
export default function FormElements() {
  return (
    <div>
      <PageMeta
        title="React.js Form Elements Dashboard | Fitness - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for Fitness - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Fitness Elements" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <DefaultInputs />
          <Foodform />
        </div>
        <div className="space-y-6">
          <Healthmetrics />
               <Goalform />
        </div>
      </div>
    </div>
  );
}
