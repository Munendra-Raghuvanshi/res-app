import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectItem } from "@/components/ui/select";

const Order = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Orders Overview</h1>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between sm:items-center items-start bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border- border-gray-200 dark:border-gray-700">
          <div className="flex-1 mb-6 sm:mb-0">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
              dolorem.
            </h2>
            <p className="text-gray-700 dark:text-gray-400 mt-2 ">
              <span className="font-semibold">addresh</span>
              Lorem, ipsum dolor.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              <span className="font-semibold">Total Amount: </span>
              160
            </p>
          </div>
          <div className="w-full sm:w-1/3">
            <Label>Order Status</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="select Sttus" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[
                    "Pending",
                    "confirmed",
                    "Preparing",
                    "outForDilivery",
                    "Delivered",
                  ].map((status: string, idx: number) => (
                    <SelectItem key={idx} value={status.toLowerCase()}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Order;
