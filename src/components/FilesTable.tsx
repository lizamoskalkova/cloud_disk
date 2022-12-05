import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { AppDispatch, useAppDispatch, useAppSelector } from "../store";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer as MUITableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { useReducer, useState } from "react";
import { LinkDialog } from "./LinkDialog";
import GetAppIcon from "@material-ui/icons/GetApp";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteFile } from "../store/fileSlice";

export const FilesTable = () => {
  const { fileArray } = useAppSelector((state) => state.files);
  const dispatch = useAppDispatch();

  const removeFile = (id: string) => {
    dispatch(deleteFile({ id }));
  };

  return (
    <Box sx={{ ml: 15, mt: 5 }}>
      <MUITableContainer
        component={Paper}
        sx={{ maxWidth: 1000, background: "transparent" }}
      >
        <Table
          sx={{
            minWidth: 700,
            borderSpacing: "0px 9px ",
          }}
          size="small"
        >
          <TableHead>
            <TableRow sx={{ fontStyle: "italic" }}>
              <TableCell sx={{ width: 200 }}>Name</TableCell>
              <TableCell>Size</TableCell>
              <TableCell sx={{ width: "100" }}>Date</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Download</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fileArray.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>
                  {item.lastModifiedDate.toString().slice(0, 10)}
                </TableCell>
                <TableCell>
                  <LinkDialog link={item.link} />
                </TableCell>
                <TableCell>
                  <GetAppIcon style={{ color: "#1976d2" }} />
                </TableCell>
                <TableCell onClick={() => removeFile(item.id)}>
                  <DeleteIcon style={{ color: "#1976d2" }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </MUITableContainer>
    </Box>
  );
};
