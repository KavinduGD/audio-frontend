import { useEffect, useState } from "react";
import Topic1 from "../../components/topic1";
import JobSettings from "./components/job_settings/job_settings_create";
import { useLocation } from "react-router-dom";
import JobSettingsDisplay from "./components/job_settings/job_settings_display";
import PreprocessCreate from "./components/preprocess_settings/preprocess_create";
import PreprocessDisplay from "./components/preprocess_settings/preprocess_display";
import { useJobsContext } from "../../hooks/use_jobs_data";
import TrainSettingsCreate from "./components/train_settings/train_settings_create";
import TrainSettingsDisplay from "./components/train_settings/train_settings_display";
import TrainResult from "./components/train_result/train_result";
import DeploySettingsCreate from "./components/deploy_settings/deploy_setting_create";
import DeploySettingsDisplay from "./components/deploy_settings/deploy_setting_display";
import ApproveSettingsCreate from "./components/approve_settings/approve_setting_create";
import ApproveSettingsDisplay from "./components/approve_settings/approve_settings_display";
import Predict from "./components/predict/predict";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Job() {
  const { jobs } = useJobsContext();

  const query = useQuery();
  const job_id = query.get("job_id");
  const [job, setJob] = useState(null);

  useEffect(() => {
    if (jobs.length > 0) {
      const job = jobs.find((job) => job.job_id == job_id);
      setJob(job);
    }
  }, [jobs]);

  return (
    <div>
      <Topic1
        topic="Job Train and Management  home"
        topic_bottom="When you create a training job, Amazon SageMaker sets up the
          distributed compute cluster, performs the training, and deletes the
          cluster when training has completed. The resulting model artifacts are
          stored in the location you specified when you created the training job."
      />

      {!job && <p>No Job found </p>}
      {!job && !job_id && <JobSettings />}
      {job && (
        <>
          <JobSettingsDisplay job={job} />
          <div className="mt-[30px]" />
          {job.class_configs.length == 0 ? (
            <PreprocessCreate job={job} />
          ) : (
            <PreprocessDisplay job={job} />
          )}
          <div className="mt-[30px]" />

          {job.train_architecture_type &&
          [1, 2, 3, 4].includes(parseInt(job.train_architecture_type)) ? (
            <TrainSettingsDisplay job={job} />
          ) : (
            <TrainSettingsCreate job={job} />
          )}
          <div className="mt-[30px]" />

          {job.training_job_status == "Completed" && <TrainResult job={job} />}
          <div className="mt-[30px]" />

          {job.training_job_status == "Completed" &&
          !job.deploy_instance_type ? (
            <DeploySettingsCreate job={job} />
          ) : (
            <DeploySettingsDisplay job={job} />
          )}
          <div className="mt-[30px]" />
          {job.endpoint_status == "InService" && job.approved ? (
            <ApproveSettingsDisplay job={job} />
          ) : (
            <ApproveSettingsCreate job={job} />
          )}
          <div className="mt-[30px]" />
          {job.endpoint_status == "InService" && <Predict job={job} />}

          <div className="mt-[30px]" />
        </>
      )}
    </div>
  );
}

export default Job;
