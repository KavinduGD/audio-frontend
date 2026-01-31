function DisplayOne({ topic, value, gap = "gap-[8px]" }) {
  return (
    <div className={`flex flex-col ${gap}`}>
      <p className="text-light_grey dark:text-[#95A5A6] text-[14px]">{topic}</p>
      <p className="text-light_black dark:text-[#D5DBDB] text-[14px]">
        {value}
      </p>
    </div>
  );
}

export default DisplayOne;
