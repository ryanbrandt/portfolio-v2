import React, { Fragment, useContext } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Table, TableRow, TableCell, AppContext } from "handsome-ui";

import { history } from "../../routes";
import { RootState } from "../../store/rootReducer";
import { adminSetActiveItemId } from "../actions";
import { getFilteredAdminData } from "../selectors";

import EmptyResults from "../../Common/Components/EmptyResults";

interface Props {}

interface DispatchProps {
  setActiveItem: (id: number) => void;
}

interface StateProps {
  data: any; // TODO
}

const AdminTable = (props: Props & DispatchProps & StateProps) => {
  const isMobile = useContext(AppContext);

  const { data, setActiveItem } = props;

  const _handleRowSelection = (id: number) => {
    setActiveItem(id);
    history.push("admin/manage");
  };

  if (data.length < 1) {
    return <EmptyResults />;
  }

  return (
    <Table
      className="fadeable-content"
      style={{ width: "100%" }}
      headers={isMobile ? ["Name"] : ["Name", "Created", "Modified"]}
    >
      {data.map((item: any, i: number) => (
        <TableRow
          key={`${item.name}_${i}`}
          className="fadeable-content"
          onClick={() => _handleRowSelection(item.id)}
          darkened={i % 2 === 0}
        >
          <TableCell>{item.name}</TableCell>
          {!isMobile && (
            <Fragment>
              <TableCell>{item.created}</TableCell>
              <TableCell>{item.modified}</TableCell>
            </Fragment>
          )}
        </TableRow>
      ))}
    </Table>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setActiveItem: (id: number) => dispatch(adminSetActiveItemId(id)),
  };
};

const mapStateToProps = (state: RootState) => {
  return {
    data: getFilteredAdminData(state),
  };
};

export default connect<StateProps, DispatchProps, Props, any>(
  mapStateToProps,
  mapDispatchToProps
)(AdminTable); // TODO
