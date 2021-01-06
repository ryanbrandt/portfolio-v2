import React from "react";

interface Props {
  /**
   * Function to execute on file selection change
   */
  onChange: (files: Array<File>) => void;

  /**
   * Optional label for file selector
   */
  label?: string;

  /**
   * Flag indicating whether multiple files may be selected
   */
  multiple?: boolean;

  /**
   * Optional string defining accepted file type (e.g. image/png)
   */
  accept?: string;
}

const FileInput: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const [selectedFiles, setSelectedFiles] = React.useState<Array<File>>(
    new Array<File>()
  );

  const _handleFileSelection = (e: React.ChangeEvent) => {
    const { onChange } = props;

    const { target } = e;
    const castedTarget = target as HTMLInputElement;

    if (castedTarget.files) {
      const { files } = castedTarget;
      const fileList: Array<File> = Object.keys(files).map(
        (key: any) => files[key]
      );

      setSelectedFiles(fileList);
      onChange(fileList);
    }
  };

  const { label, multiple, accept } = props;

  return (
    <div className="file_input-container">
      {label && <p className="file_input-label">{label}</p>}
      <label className="file_input-wrapper">
        Choose Files
        <input
          className="file_input-hidden"
          type="file"
          onChange={_handleFileSelection}
          multiple={multiple}
          accept={accept}
        />
      </label>
      <p>
        {selectedFiles.length > 0
          ? `${selectedFiles.length} files selected`
          : "No files selected"}
      </p>
    </div>
  );
};

export default FileInput;
