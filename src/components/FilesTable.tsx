import { Box } from "@mui/material";
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
import {  useState } from "react";
import { LinkDialog } from "./LinkDialog";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteFile } from "../store/fileSlice";
import { DownLoadFile } from "./DownLoadFile";
import { supabaseClient } from "../api/Supabase";

export const FilesTable = () => {
  const { fileArray } = useAppSelector((state) => state.files);
  const { fileFromDB } = useAppSelector((state) => state.files);

  const dispatch = useAppDispatch();
  const [Data, setData] = useState<any[]>([]);

  const removeFile = (id: string) => {
    dispatch(deleteFile({ id }));
  };

  const files = async () => {
    const data = await supabaseClient.storage.from("files").list();
    const farray = data.data;
    if ( farray !== null) {
      setData( farray);
    }
    console.log(Data)
    return Data
  };


  const getSize = (size: string) => {
    const numsize = parseInt(size);
    if (numsize > 1048576) {
      const res = (numsize / 1048576).toFixed(2).toString() + " MB";
      return res;
    } else if (numsize > 1024) {
      const res = (numsize / 1024).toFixed(2).toString() + " KB";
      return res;
    }
    const res = numsize.toFixed(2).toString() + " B";
    return res;
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
          <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
          <TableHead>
            <TableRow sx={{ fontWeight: "bold" }}>
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
                <TableCell>{getSize(item.size)}</TableCell>
                <TableCell>
                  {item.lastModifiedDate.toString().slice(0, 10)}
                </TableCell>
                <TableCell>
                  <LinkDialog link={item.link} />
                </TableCell>
                <TableCell>
                  <DownLoadFile item={item} />
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
