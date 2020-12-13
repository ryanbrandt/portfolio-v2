import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Input, Text, Button } from "handsome-ui";
import { RootState } from "../../store/rootReducer";
import { getAdminWorkActiveItem } from "../selectors";

interface Props {
  create?: boolean;
}

interface StateProps {
  activeItem: any; // TODO
}

interface DispatchProps {}

interface WorkFormState {
  name: string;
  dateString: string;
  description: string;
  tags: Array<string>;
  source: string;
}

const WorkForm = (props: Props & StateProps & DispatchProps) => {
  const { create, activeItem } = props;

  const initialFormState: WorkFormState = {
    name: "",
    dateString: "",
    description: "",
    tags: [],
    source: "",
  };

  if (activeItem && !create) {
    initialFormState.name = activeItem.name;
    initialFormState.dateString = activeItem.datestring;
    initialFormState.description = activeItem.description;
    initialFormState.tags = activeItem.tags;
    initialFormState.source = activeItem.source;
  }

  const [form, setForm] = useState<WorkFormState>(initialFormState);

  const _renderInputs = (): React.ReactNode => {
    return (
      <Fragment>
        <Input
          label="Name"
          value={form.name}
          onChange={(value: string) => setForm({ ...form, name: value })}
        />
        <Input
          label="Date String"
          value={form.dateString}
          onChange={(value: string) => setForm({ ...form, dateString: value })}
        />
        <Input
          label="Source"
          value={form.source}
          onChange={(value: string) => setForm({ ...form, source: value })}
        />
        <Text
          label="Description"
          value={form.description}
          onChange={(value: string) => setForm({ ...form, description: value })}
        />
      </Fragment>
    );
  };

  return (
    <div className="fadeable-content flex_center_col">
      <div>
        <h1 className="aligned_text">
          {create ? "Create Work Item" : "Manage Work Item"}
        </h1>
        {_renderInputs()}
        <div className="flex_center_col">
          <Button
            title={create ? "Create Item" : "Update Item"}
            onClick={() => null}
            inverting
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    activeItem: getAdminWorkActiveItem(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {};
};

export default connect<StateProps, DispatchProps, Props, any>(
  mapStateToProps,
  mapDispatchToProps
)(WorkForm);
