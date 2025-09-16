import React, { useCallback, useEffect, useReducer, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
const paginationModel = { page: 0, pageSize: 5 };
const defProps = {
  data: [],
  columns: [],
  onSelected: () => {},
  tableProps: {},
};
export default React.memo(function DataTable({
  data = defProps.data,
  columns = defProps.columns,
  onSelected = defProps.onSelected,
  tableProps = defProps.tableProps,
}) {
  const [selectedId, setSelectedId] = useState([]);

  const [state, dispatch] = useReducer(
    (initialState, action) => {
      switch (action.type) {
        case "UPDATE-ROWS": {
          return {
            ...initialState,
            data: {
              ...initialState.data,
              rows: action.value,
            },
          };
        }
        case "SELECTED-ROW": {
          return {
            ...initialState,
            data: {
              ...initialState.data,
              selectedRow: action.value,
            },
          };
        }
        default: {
          console.warn("your action type is invalid");
        }
      }
    },
    {
      data: {
        rows: [],
        selectedRow: null,
      },
    }
  );
  useEffect(() => {
    dispatch({
      type: "UPDATE-ROWS",
      value: data.map((item, index) => {
        return { id: item?._id, index: index + 1, ...item };
      }),
    });
  }, [data]);

  useEffect(() => {
    try {
      onSelected(state.data.selectedRow || null);
    } catch (err) {
      console.warn(err);
    }
  }, [state.data.selectedRow]);

  const setRowInfo = useCallback(
    (e) => {
      const selectedIds = [...e.ids][0];
      setSelectedId(selectedIds ? [selectedIds] : []);
      const selectedRowInfo = state.data.rows.find(
        (item) => item?._id == [...e.ids][0]
      );
      dispatch({ type: "SELECTED-ROW", value: selectedRowInfo || null });
    },
    [state.data.rows]
  );

  return (
    <DataGrid
      rows={state.data.rows}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      onRowSelectionModelChange={setRowInfo}
      pageSizeOptions={[5, data?.length]}
      rowSelectionModel={{ ids: new Set(selectedId), type: "include" }}
      checkboxSelection
      // rowSelectionModel={{ids:"",type:"exclude" || "exclude"}}
      sx={{
        fontFamily: "dana-md",
        "& .MuiDataGrid-columnSeparator": {
          display: "none",
        },
        "& .MuiTablePagination-root ": {
          direction: "ltr",
        },
        "& .MuiPopper-root ": {
          position: "absolute",
          top: "0",
          right: "0",
        },
      }}
      {...tableProps}
    />
  );
});
