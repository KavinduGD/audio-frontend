import Topic1 from "../../components/topic1";
import Pre_data_chart_table from "./components/predata_set_table_chart/predata_chart_table";
import Input_data_chart_table from "./components/input_data_set_table_chart/input_chart_table";
import UploadPreData from "./components/upload_pre-data";
import InputAudioTable from "./components/input_audio_table";
import MoveData from "./components/move_data";
import PreAudioTable from "./components/pre_audio_table";

function DataSet() {
  return (
    <div className="">
      <Topic1
        topic="Dataset Upload and Management home"
        topic_bottom="When you create a training job, Amazon SageMaker sets up the
          distributed compute cluster, performs the training, and deletes the
          cluster when training has completed. The resulting model artifacts are
          stored in the location you specified when you created the training job."
      />
      <Pre_data_chart_table />
      <div className="mt-[30px]" />

      <PreAudioTable />
      <div className="mt-[30px]" />

      <UploadPreData />
      <div className="mt-[30px]" />

      <Input_data_chart_table />
      <div className="mt-[30px]" />

      <InputAudioTable />
      <div className="mt-[30px]" />

      <MoveData />
      <div className="mt-[30px]" />
    </div>
  );
}

export default DataSet;
