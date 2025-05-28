import useRestaurent from "@/store/useRestaurent";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";



export type filterOptionState = {
  id: string;
  lebal: string;
};

const filterOption: filterOptionState[] = [
  { id: "burger", lebal: "Burger" },
  { id: "Thali", lebal: "Thali" },
  { id: "Brayani", lebal: "Brayano" },
  { id: "moms", lebal: "moms" },
];

const FilterPage = () => {
  const {setAppliedFilter}=useRestaurent();
  const appliedFilterHandler = (value: string) => {
    setAppliedFilter(value)
  };
  
  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg"> filter by cusions</h1>
        <Button
          variant={"link"}
          className="bg-orange-500 hover:bg-orange-400 rounded-2xl"
        >
          Reset
        </Button>
      </div>
      {filterOption.map((Option) => (
        <div className="my-5 space-x-2 flex items-center">
          <Checkbox
            onClick={() => appliedFilterHandler(Option.lebal)}
            className=""
            id="{option.id}"
          />
          <label>{Option.lebal}</label>
        </div>
      ))}
    </div>
  );
};
export default FilterPage;
