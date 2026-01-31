import InputText from "../../../../../components/input_text";
import SelectOptions from "../../../../../components/SelectOptions";

function MultiClass({
  mainMultiClassNamesWithCount,
  setMainMultiClassNamesWithCount,
  otherMultiClassNamesWithCount,
  setOtherMultiClassNamesWithCount,
  handleAddMainClass,
  handleRemoveMainClass,
  handleAddOtherClass,
  handleRemoveOtherClass,
  input_data,
}) {
  const handleAddMainClassName = (value, index) => {
    const newClasses = [...mainMultiClassNamesWithCount];
    newClasses[index].className = value;
    setMainMultiClassNamesWithCount(newClasses);
  };

  const handleAddMainCount = (value, index) => {
    const newClasses = [...mainMultiClassNamesWithCount];
    newClasses[index].count = value;
    setMainMultiClassNamesWithCount(newClasses);
  };

  const handleAddOtherClassName = (value, index) => {
    const newClasses = [...otherMultiClassNamesWithCount];
    newClasses[index].className = value;
    setOtherMultiClassNamesWithCount(newClasses);
  };

  const handleAddOtherCount = (value, index) => {
    const newClasses = [...otherMultiClassNamesWithCount];
    newClasses[index].count = value;
    setOtherMultiClassNamesWithCount(newClasses);
  };

  return (
    <div>
      <div className="border-b-[1px] border-gray-200 dark:border-[#4b4949] w-full pb-[15px]">
        <p className="mb-[5px]">Main class names</p>
        {mainMultiClassNamesWithCount.map((otherClassName, index) => (
          <div className="flex gap-[30px] mb-[10px]" key={index}>
            <SelectOptions
              name={`Class ${index + 1}`}
              options={input_data.map((cls) => ({
                value: cls.name,
                label: cls.name,
              }))}
              input_fun={(value) => handleAddMainClassName(value, index)}
              value={otherClassName.className}
            />
            <InputText
              name="Count"
              value={otherClassName.count}
              input_fun={(value) => handleAddMainCount(value, index)}
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
            onClick={handleAddMainClass}
            className="px-[10px] py-[3px] text-[14px] bg-white dark:bg-[#2A2E33] text-[#545b64] font-bold rounded-[2px] border-[#545b64] border-[1px]  dark:text-[#D5DBDB]
dark:border-[#879596] dark:hover:text-[#e6fafa] dark:hover:border-[#aab7b8] hover:text-[#16191f] hover:border-[#16191f]"
          >
            <p className="">Add class</p>
          </button>
          {mainMultiClassNamesWithCount.length > 1 && (
            <button
              onClick={handleRemoveMainClass}
              className="px-[10px] py-[3px] text-[14px] bg-white dark:bg-[#2A2E33] text-[#545b64] font-bold rounded-[2px] border-[#545b64] border-[1px]  dark:text-[#D5DBDB]
dark:border-[#879596] dark:hover:text-[#e6fafa] dark:hover:border-[#aab7b8] hover:text-[#16191f] hover:border-[#16191f]"
            >
              <p className="flex items-center gap-[5px]">Remove class</p>
            </button>
          )}
        </div>
      </div>
      <div className="mt-[7px]">
        <p className="mb-[5px]">Other class names</p>

        {otherMultiClassNamesWithCount.map((otherClassName, index) => (
          <div className="flex gap-[30px] mb-[10px]" key={index}>
            <SelectOptions
              name={`Class ${index + 1}`}
              options={input_data.map((cls) => ({
                value: cls.name,
                label: cls.name,
              }))}
              input_fun={(value) => handleAddOtherClassName(value, index)}
              value={otherClassName.className}
            />
            <InputText
              name="Count"
              value={otherClassName.count}
              input_fun={(value) => handleAddOtherCount(value, index)}
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
            onClick={handleAddOtherClass}
            className="px-[10px] py-[3px] text-[14px] bg-white dark:bg-[#2A2E33] text-[#545b64] font-bold rounded-[2px] border-[#545b64] border-[1px]  dark:text-[#D5DBDB]
dark:border-[#879596] dark:hover:text-[#e6fafa] dark:hover:border-[#aab7b8] hover:text-[#16191f] hover:border-[#16191f]"
          >
            <p className="">Add class</p>
          </button>
          {otherMultiClassNamesWithCount.length > 1 && (
            <button
              onClick={handleRemoveOtherClass}
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

export default MultiClass;
