import { LoadingButton } from "@mui/lab";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { createUser, getCompanies, updateUserById } from "../../api/functions";
import { useTheme } from "@emotion/react";

function EditUserDialog(props) {
  const currentSessionUser = JSON.parse(localStorage.getItem("user"));

  const theme = useTheme();

  const { onClose, open, user, ...other } = props;
  const [currentUser, setUser] = useState(user);
  // const radioGroupRef = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const [isSaving, setIsSaving] = useState(false);

  const [companies, setCompanies] = useState([]);
  const [isGettingCompanies, setIsGettingCompanies] = useState([]);

  useEffect(() => {
    if (companies.length === 0 && currentSessionUser.is_super_admin) {
      fetchCompanies();
    }
    if (!open) {
      setUser(user);
    }
  }, [user, open]);

  const handleEntering = () => {
    // if (radioGroupRef.current != null) {
    //   radioGroupRef.current.focus();
    // }
  };

  const handleSaveClick = async (data) => {
    console.log("data", data);
    setIsSaving(true);

    try {
      var res;
      // If updating user
      if (currentUser?.id) {
        res = await updateUserById({
          id: currentUser.id,
          email: data.email,
          is_admin: data.isAdmin,
          is_premium: data.isPremium,
          name: data.name,
          company_id: data.company,
        });
      } else {
        // If creating user
        res = await createUser({
          email: data.email,
          is_admin: data.isAdmin,
          is_premium: data.isPremium,
          name: data.name,
          company_id: data.company,
        });
      }

      setIsSaving(false);
      alert(res.message);
      onClose({ modified: true });
    } catch (err) {
      setIsSaving(false);
      alert(err + " : Error deleting user");
      onClose({ modified: false });
    }
  };

  const fetchCompanies = async () => {
    setIsGettingCompanies(true);

    try {
      const res = await getCompanies();

      setCompanies([...res]);
    } catch (err) {
      setCompanies([]);

      alert(err + " : Error fetching companies");
    }

    setIsGettingCompanies(false);
  };

  return (
    <Dialog
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <form onSubmit={handleSubmit(handleSaveClick)}>
        <DialogTitle>
          {/* <Typography variant="h3"> */}
          {currentUser?.id ? "Edit" : "Create"} user
          {/* </Typography> */}
        </DialogTitle>

        <DialogContent dividers>
          <TextField
            fullWidth
            placeholder="Name"
            {...register("name")}
            required
            sx={{ m: 1 }}
            defaultValue={currentUser?.name}
          />
          <TextField
            fullWidth
            placeholder="Email"
            {...register("email")}
            required
            sx={{ m: 1 }}
            defaultValue={currentUser?.email}
          />
          <FormControlLabel
            disabled={
              currentSessionUser?.is_admin &&
              currentUser.id === currentSessionUser.id
            }
            control={<Checkbox defaultChecked={currentUser?.is_admin} />}
            label="Is Admin"
            {...register("isAdmin")}
            sx={{ m: 1 }}
            value
          />
          <FormControlLabel
            control={<Checkbox defaultChecked={currentUser?.is_premium} />}
            label="Is premium"
            {...register("isPremium")}
            sx={{ m: 1 }}
            value
          />

          <Controller
            name="company"
            control={control}
            defaultValue={
              currentSessionUser?.company_id ?? currentUser?.company_id ?? ""
            }
            rules={{ required: "Company needed" }}
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                select
                label="Company"
                value={value}
                onChange={onChange}
                sx={{ m: 1 }}
                disabled={
                  !currentSessionUser?.is_super_admin ||
                  (currentSessionUser?.is_super_admin &&
                    currentSessionUser.id === currentUser.id)
                }
              >
                <MenuItem key="0" value={""}></MenuItem>
                {currentSessionUser?.is_super_admin ? (
                  companies.map((company) => (
                    <MenuItem key={company.id} value={company.id}>
                      {company.name}
                    </MenuItem>
                  ))
                ) : currentSessionUser?.company_id ? (
                  <MenuItem value={currentSessionUser.company_id}>
                    {currentSessionUser.company_name}
                  </MenuItem>
                ) : (
                  <MenuItem key="0" value={""}></MenuItem>
                )}
              </TextField>
            )}
          />
          {errors.company && errors.company.type === "required" && (
            <Typography variant="body" sx={{ color: theme.palette.error.main }}>
              Please choose a company
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose({ modified: false })}>Cancel</Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSaving}
            sx={{
              m: 1,
            }}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default EditUserDialog;

EditUserDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};
