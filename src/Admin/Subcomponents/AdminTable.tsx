import React, { Fragment, useContext } from "react";
import { connect } from "react-redux";

import { Table, TablRow, TableCell, AppContext } from "handsome-ui";
import { RootState } from "../../store/rootReducer";
import { getFilteredAdminData } from "../selectors";

import EmptyResults from "../../Common/Components/EmptyResults";

interface Props {}

interface StateProps {
  data: any; // TODO
}

const AdminTable = (props: Props & StateProps) => {
  const isMobile = useContext(AppContext);

  const { data } = props;

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
        <TablRow
          key={`${item.name}_${i}`}
          className="fadeable-content"
          onClick={() => null}
          darkened={i % 2 === 0}
        >
          <TableCell>{item.name}</TableCell>
          {!isMobile && (
            <Fragment>
              <TableCell>{item.created}</TableCell>
              <TableCell>{item.modified}</TableCell>
            </Fragment>
          )}
        </TablRow>
      ))}
    </Table>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    data: getFilteredAdminData(state),
  };
};

export default connect<any, any, any, any>(mapStateToProps, null)(AdminTable); // TODO
