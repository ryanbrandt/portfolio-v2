import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Table, TableRow, TableCell, useIsMobile, Trash } from "handsome-ui";

import { history } from "../../routes";
import { RootState } from "../../store/rootReducer";
import { adminSetActiveItemId } from "../actions";
import { getFilteredAdminData } from "../selectors";
import { ResumeItem, WorkItem } from "../../utils/types";

import AdminDeleteModal from "./AdminDeleteModal";
import EmptyResults from "../../Common/Components/EmptyResults";
import { PLACEHOLDER_WORK_ITEM } from "../../Work/constants";

interface Props {}

interface DispatchProps {
  setActiveItem: (id: number) => void;
}

interface StateProps {
  data: Array<ResumeItem | WorkItem>;
}

const AdminTable = (props: Props & DispatchProps & StateProps) => {
  const MOBILE_HEADERS = ["Name"];
  const DEFAULT_HEADERS = ["Name", "Created", "Modified"];

  const isMobile = useIsMobile();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<ResumeItem | WorkItem>(
    PLACEHOLDER_WORK_ITEM
  );

  const { data, setActiveItem } = props;

  const _handleRowSelection = (id: number) => {
    setActiveItem(id);
    history.push("admin/manage");
  };

  const handleDeleteClick = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    item: ResumeItem | WorkItem
  ) => {
    e.stopPropagation();

    setDeleteItem(item);
    setDeleteModalOpen(true);
  };

  const _renderDefaultColumns = (item: ResumeItem | WorkItem) => {
    if (isMobile) {
      return null;
    }

    return (
      <Fragment>
        <TableCell>{item.created}</TableCell>
        <TableCell>{item.modified}</TableCell>
      </Fragment>
    );
  };

  const _renderDeleteSection = (item: ResumeItem | WorkItem) => {
    return (
      <TableCell className="flex_center_col">
        <Trash
          onClick={(e) => handleDeleteClick(e, item)}
          className="home_icon"
        />
      </TableCell>
    );
  };

  const _renderDeleteModal = () => {
    return (
      <AdminDeleteModal
        item={deleteItem}
        onClose={() => setDeleteModalOpen(false)}
        open={deleteModalOpen}
      />
    );
  };

  if (data.length < 1) {
    return <EmptyResults />;
  }

  return (
    <Fragment>
      <Table
        className="admin_table fadeable-content"
        headers={isMobile ? MOBILE_HEADERS : DEFAULT_HEADERS}
      >
        {data.map((item: ResumeItem | WorkItem, i: number) => (
          <TableRow
            key={`${item.name}_${i}`}
            className="fadeable-content"
            onClick={() => _handleRowSelection(item.id)}
            darkened={i % 2 === 0}
          >
            <TableCell>{item.name}</TableCell>
            {_renderDefaultColumns(item)}
            {_renderDeleteSection(item)}
          </TableRow>
        ))}
      </Table>
      {_renderDeleteModal()}
    </Fragment>
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

export default connect<StateProps, DispatchProps, Props, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(AdminTable);
