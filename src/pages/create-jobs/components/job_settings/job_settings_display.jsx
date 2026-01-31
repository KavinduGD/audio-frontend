import Box from "../../../../components/box";
import DisplayOne from "../../../../components/display_one";

function JobSettingsDisplay({ job }) {
  const job_type =
    job.job_type === "binary"
      ? "Binary Classification"
      : "Multi-class Classification";
  return (
    <Box
      topic={`Job id - ${job.job_id}`}
      button_1_fun={() => console.log("clicked")}
      button_1_topic="Edit job"
    >
      <div className="p-5">
        <div className="flex justify-between">
          <DisplayOne topic="Job id" value={job.job_id} />
          <DisplayOne topic="Job date" value={job.job_date} />
          <DisplayOne topic="Job name" value={job.job_name} />
          <DisplayOne topic="Job type" value={job_type} />
        </div>
        <div className="mt-[20px]">
          <DisplayOne topic="Job description" value={job.job_description} />
        </div>
      </div>
    </Box>
  );
}

export default JobSettingsDisplay;
