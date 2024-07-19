import { Avatar, Button, Stack, Typography } from "@mui/material";
import { useGetMe } from "../../hooks/useGetMe";
import EditIcon from "@mui/icons-material/Edit";
import { API_URL } from "../../constants/urls";
import { snackVar } from "../../constants/snack";

const Profile = () => {
  const me = useGetMe();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files?.[0] as Blob);
      const res = await fetch(`${API_URL}/users/image`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Failed to upload image");
      }
      snackVar({
        message: "Image uploaded successfully",
        type: "success",
      });
    } catch (error) {
      snackVar({
        message: "Failed to upload image",
        type: "error",
      });
    }
  };

  return (
    <Stack
      spacing={4}
      sx={{ marginTop: "3rem", alignItems: "center", justifyContent: "center" }}
    >
      <Typography variant="h4">{me?.data?.me.username}</Typography>
      <Avatar sx={{ width: 300, height: 300 }} src={me?.data?.me.imageUrl} />
      <Button
        component="label"
        variant="contained"
        color="primary"
        startIcon={<EditIcon />}
      >
        Change Avatar
        <input
          type="file"
          hidden
          onChange={handleFileUpload}
          accept="image/jpeg"
        />
      </Button>
    </Stack>
  );
};

export default Profile;
