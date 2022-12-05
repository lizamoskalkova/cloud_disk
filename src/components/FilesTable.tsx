import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../store";
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
import { useState } from "react";
import { LinkDialog } from "./LinkDialog";

export const FilesTable = () => {
  const { fileArray } = useAppSelector((state) => state.files);
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
              <TableCell />
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </MUITableContainer>
    </Box>
  );
};
