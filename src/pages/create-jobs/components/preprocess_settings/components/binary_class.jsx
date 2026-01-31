import InputText from "../../../../../components/input_text";
import SelectOptions from "../../../../../components/SelectOptions";

function BinaryClass({
  mainClassName,
  setMainClassName,
  mainClassCount,
  setMainClassCount,
  otherClassesWithCount,
  setOtherClassesWithCount,
  handleAddClass,
  handleRemoveClass,
  input_data,
}) {
  const handleAddClassName = (value, index) => {
    const newClasses = [...otherClassesWithCount];
    newClasses[index].className = value;
    setOtherClassesWithCount(newClasses);
  };

  const handleAddCount = (value, index) => {
    const newClasses = [...otherClassesWithCount];
    newClasses[index].count = value;
    setOtherClassesWithCount(newClasses);
  };

  return (
    <div>
      <div className="flex justify-between gap-[30px] pb-[15px] border-b-[1px] border-gray-200 dark:border-[#4b4949] w-full">
        <SelectOptions
          name="Main Class"
          options={input_data.map((cls) => ({
            value: cls.name,
            label: cls.name,
          }))}
          value={mainClassName}
          input_fun={setMainClassName}
        />
        <InputText
          name="Main Class Count"
          value={mainClassCount}
          input_fun={(value) => setMainClassCount(value)}
          type="number"
        />
        <div className="flex flex-col gap-[5px]">
          <p className="w-[200px] text-[15px] text-[#2d323f] dark:text-dark_white leading-4">
            Sample Count
          </p>
          <p className="w-[200px] text-[13px] text-[#1A2029] dark:text-[#879596] pt-[5px]">
            {mainClassName === ""
              ? "-"
              : input_data.find((cls) => cls.name === mainClassName).count}
          </p>
        </div>
      </div>

      <div className="mt-[5px]">
        <p className="mb-[5px]">Other class names</p>

        {otherClassesWithCount.map((otherClassName, index) => (
          <div className="flex gap-[30px] mb-[10px]" key={index}>
            <SelectOptions
              name={`Class ${index + 1}`}
              options={input_data.map((cls) => ({
                value: cls.name,
                label: cls.name,
              }))}
              input_fun={(value) => handleAddClassName(value, index)}
              value={otherClassName.className}
            />
            <InputText
              name="Count"
              value={otherClassName.count}
              input_fun={(value) => handleAddCount(value, index)}
              type="number"
            />
            <div className="flex flex-col gap-[5px]">
              <p className="w-[200px] text-[15px] text-[#2d323f] dark:text-dark_white leading-4">
                Sample Count
              </p>
              <p className="w-[200px] text-[13px] text-[#1A2029] dark:text-[#879596] pt-[5px]">
                {otherClassName.className === ""
                  ? "-"
                  : input_data.find(
                      (cls) => cls.name === otherClassName.className
                    ).count}
              </p>
            </div>
          </div>
        ))}
        <div className="mt-[20px] flex gap-[20px] ">
          <button
            onClick={handleAddClass}
            className="px-[10px] py-[3px] text-[14px] bg-white dark:bg-[#2A2E33] text-[#545b64] font-bold rounded-[2px] border-[#545b64] border-[1px]  dark:text-[#D5DBDB]
        dark:border-[#879596] dark:hover:text-[#e6fafa] dark:hover:border-[#aab7b8] hover:text-[#16191f] hover:border-[#16191f]"
          >
            <p className="">Add class</p>
          </button>
          {otherClassesWithCount.length > 1 && (
            <button
              onClick={handleRemoveClass}
              className="px-[10px] py-[3px] text-[14px] bg-white dark:bg-[#2A2E33] text-[#545b64] font-bold rounded-[2px] border-[#545b64] border-[1px]  dark:text-[#D5DBDB]
        dark:border-[#879596] dark:hover:text-[#e6fafa] dark:hover:border-[#aab7b8] hover:text-[#16191f] hover:border-[#16191f]"
            >
              <p className="flex items-center gap-[5px]">Remove class</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BinaryClass;
