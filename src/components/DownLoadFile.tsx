import { Button } from "@mui/material";
import GetAppIcon from "@material-ui/icons/GetApp";

export const DownLoadFile = ({ item }) => {
  const onDownload = () => {
    fetch(item.link, {
      method: "GET",
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", item.name);
        document.body.appendChild(link);
        link.click();
      });
  };

  return (
    <Button onClick={onDownload}>
      <GetAppIcon style={{ color: "#1976d2" }} />
    </Button>
  );
};
