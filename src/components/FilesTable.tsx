import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { supabaseClient } from "../api/Supabase";

export const FilesTable = () => {
  const rows: GridRowsProp = [
    { id: 1, col1: "item1", col2: "World" },
    { id: 2, col1: "item2", col2: "is Awesome" },
    { id: 3, col1: "item3", col2: "is Amazing" },
  ];
  const columns: GridColDef[] = [
    { field: "col1", headerName: "Name", width: 500 },
    { field: "col2", headerName: "Date", width: 150 },
    { field: "col3", headerName: "Size", width: 150 },
    { field: "col4", headerName: "Link", width: 150 },
  ];

  /*const uploadFiles = async (event) => {
    const { data, error} = await supabaseClient.storage.from("public/files").download("folder/liza.png");
    console.log(data);
  }*/
  return (
    <Box>
      <DataGrid
        sx={{
          borderColor: "rgba(11, 76, 181, 0.88)",
          ml: 20,
          mt: 7,
          width: 950,
          height: 400,
          background: "white",
        }}
        rows={rows}
        columns={columns}
      />
    </Box>
  );
};
