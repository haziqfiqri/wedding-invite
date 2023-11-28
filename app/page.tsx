"use client";

import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  Switch,
  TextField,
  Typography,
  Dialog,
  CircularProgress,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type FormState = {
  fullname: { value: string; error: string };
  telephone: { value: string; error: string };
  attendance: { value: boolean; error: string };
  paxAdult: { value: string; error: string };
  paxChild: { value: string; error: string };
};

export default function Home() {
  const theme = useTheme();

  const [form, setForm] = useState<FormState>({
    fullname: {
      value: "",
      error: "",
    },
    telephone: {
      value: "",
      error: "",
    },
    attendance: {
      value: false,
      error: "",
    },
    paxAdult: {
      value: "",
      error: "",
    },
    paxChild: {
      value: "",
      error: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormState, value: string) => {
    setForm({
      ...form,
      [field]: {
        ...form[field],
        value: value,
        error: "",
      },
    });
  };

  const handleAttendanceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      attendance: {
        ...form.attendance,
        value: event.target.checked,
        error: "",
      },
    });
  };

  const validateForm = (): boolean => {
    let isValid = true;
    let newFormState = { ...form };
    const regexPax = /^\d+$/;
    const regexTelephone = /(\+?6?01[0-46-9]\d{7,8})|(\+?6?5\d{8})/;

    if (!form.attendance.value) {
      if (!form.fullname.value) {
        newFormState.fullname.error = "Full name is required";
        isValid = false;
      }
      if (!form.telephone.value) {
        newFormState.telephone.error = "Telephone is required";
        isValid = false;
      }
      if (form.telephone.value) {
        if (!regexTelephone.test(form.telephone.value)) {
          newFormState.telephone.error = "Telephone is not valid";
          isValid = false;
        }
      }

      newFormState.paxAdult.error = "";
      newFormState.paxChild.error = "";
      newFormState.paxAdult.value = "0";
      newFormState.paxChild.value = "0";
    } else {
      if (!form.fullname.value) {
        newFormState.fullname.error = "Full name is required";
        isValid = false;
      }
      if (!form.telephone.value) {
        newFormState.telephone.error = "Telephone is required";
        isValid = false;
      }
      if (form.telephone.value) {
        if (!regexTelephone.test(form.telephone.value)) {
          newFormState.telephone.error = "Telephone is not valid";
          isValid = false;
        }
      }
      if (!form.paxAdult.value) {
        newFormState.paxAdult.error = "Pax adult is required";
        isValid = false;
      }
      if (!form.paxChild.value) {
        newFormState.paxChild.value = "0";
      }
      if (form.paxAdult.value) {
        if (!regexPax.test(form.paxAdult.value)) {
          newFormState.paxAdult.error = "Pax adult is not valid";
          isValid = false;
        }
      }
      if (form.paxChild.value) {
        if (!regexPax.test(form.paxChild.value)) {
          newFormState.paxChild.error = "Pax child is not valid";
          isValid = false;
        }
      }
    }

    setForm(newFormState);
    return isValid;
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      const formKey = key as keyof FormState;

      let value: string;

      if (formKey === "attendance") {
        value = form[formKey].value ? "Yes" : "No";
      } else {
        value = form[formKey].value;
      }

      formData.append(formKey, value);
    });

    // convert formdata to json
    const json: any = {};
    formData.forEach((value, key) => {
      json[key] = value;
    });

    const initialFormState: FormState = {
      fullname: { value: "", error: "" },
      telephone: { value: "", error: "" },
      attendance: { value: false, error: "" },
      paxAdult: { value: "", error: "" },
      paxChild: { value: "", error: "" },
    };

    fetch(process.env.GOOGLE_APPSCRIPT as string, {
      method: "POST",
      body: JSON.stringify(json),
      redirect: "follow",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setForm(initialFormState);

        if (data.result === "updated") {
          toast("We updated your response");
        } else {
          toast("Thank you for your response");
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <main>
      <Container disableGutters maxWidth="xl">
        <Stack boxShadow={4}>
          <Stack component="section">
            <Image
              src="/assets/Front.webp"
              alt="Front"
              width={2000}
              height={2000}
              style={{
                width: "auto",
                height: "auto",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                objectFit: "contain",
              }}
              quality={100}
              priority={true}
            />
          </Stack>

          <Stack component="section">
            <Image
              src="/assets/Invitee.webp"
              alt="Invitee"
              width={2000}
              height={2000}
              style={{
                width: "auto",
                height: "auto",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                objectFit: "contain",
                marginTop: "-2px",
              }}
              quality={100}
              priority={true}
            />
          </Stack>

          <Stack component="section" position="relative">
            <Image
              src="/assets/RSVP.webp"
              alt="Invitee"
              width={2000}
              height={2000}
              style={{
                width: "auto",
                height: "auto",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                objectFit: "contain",
                marginTop: "-2px",
              }}
              quality={100}
              priority={true}
            />
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              toastStyle={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.light,
                fontFamily: theme.typography.fontFamily,
                textAlign: "center",
              }}
            />
            <Stack
              sx={{
                position: "absolute",
                width: "100%",
                [theme.breakpoints.up("sm")]: {
                  top: "40%",
                  left: "50%",
                  transform: "scale(1) translate(-50%, -50%)",
                  paddingLeft: "28px",
                  paddingRight: "28px",
                },
                [theme.breakpoints.down("md")]: {
                  top: "40%",
                  left: "47%",
                  transform: "scale(0.93) translate(-50%, -50%)",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                },
                [theme.breakpoints.down("sm")]: {
                  top: "34%",
                  left: "40%",
                  transform: "scale(0.80) translate(-50%, -50%)",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                },
                [theme.breakpoints.down("xs")]: {
                  top: "28%",
                  left: "33%",
                  transform: "scale(0.63) translate(-50%, -50%)",
                  paddingLeft: "0px",
                  paddingRight: "0px",
                },
              }}
              component="form"
              noValidate
              autoComplete="off"
            >
              <Typography
                fontSize={20}
                fontWeight={400}
                sx={{
                  color: theme.palette.primary.main,
                }}
              >
                Full name
              </Typography>
              <TextField
                variant="outlined"
                margin="none"
                size="small"
                focused
                InputProps={{
                  style: {
                    borderRadius: "10px",
                    color: theme.palette.primary.main,
                  },
                }}
                value={form.fullname.value}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("fullname", e.target.value)
                }
                error={!!form.fullname.error}
                helperText={form.fullname.error}
              />
              <Typography
                fontSize={20}
                fontWeight={400}
                sx={{
                  color: theme.palette.primary.main,
                  marginBlockStart: "20px",
                }}
              >
                Telephone number
              </Typography>
              <TextField
                variant="outlined"
                margin="none"
                size="small"
                focused
                InputProps={{
                  style: {
                    borderRadius: "10px",
                    color: theme.palette.primary.main,
                  },
                }}
                value={form.telephone.value}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("telephone", e.target.value)
                }
                error={!!form.telephone.error}
                helperText={form.telephone.error}
              />
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ marginBlockStart: "20px" }}
              >
                <Typography
                  fontSize={20}
                  fontWeight={400}
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                >
                  Attending?
                </Typography>
                <Switch
                  checked={form.attendance.value}
                  onChange={handleAttendanceChange}
                  sx={{
                    marginBlockEnd: "16px",
                  }}
                />
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  marginBlockEnd: "20px",
                }}
              >
                <Stack sx={{ flex: 1 }}>
                  <Typography
                    fontSize={20}
                    fontWeight={400}
                    sx={{
                      color: form.attendance.value
                        ? theme.palette.primary.main
                        : theme.palette.primary.dark,
                    }}
                  >
                    Adult Pax
                  </Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    focused
                    InputProps={{
                      style: {
                        borderRadius: "10px",
                        color: theme.palette.primary.main,
                      },
                    }}
                    value={form.paxAdult.value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange("paxAdult", e.target.value)
                    }
                    error={!!form.paxAdult.error}
                    helperText={form.paxAdult.error}
                    disabled={form.attendance.value === false}
                  />
                </Stack>
                <Stack sx={{ flex: 1 }}>
                  <Typography
                    fontSize={20}
                    fontWeight={400}
                    sx={{
                      color: form.attendance.value
                        ? theme.palette.primary.main
                        : theme.palette.primary.dark,
                    }}
                  >
                    Child Pax (3-12 y/o)
                  </Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    focused
                    InputProps={{
                      style: {
                        borderRadius: "10px",
                        color: theme.palette.primary.main,
                      },
                    }}
                    value={form.paxChild.value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInputChange("paxChild", e.target.value)
                    }
                    error={!!form.paxChild.error}
                    helperText={form.paxChild.error}
                    disabled={form.attendance.value === false}
                  />
                </Stack>
              </Stack>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                  },
                  color: theme.palette.primary.light,
                  fontWeight: "light",
                  fontSize: "20px",
                  marginBlockStart: "16px",
                  borderRadius: "10px",
                }}
                disableElevation
                onClick={handleSubmit}
              >
                Submit RSVP
              </Button>
            </Stack>
          </Stack>

          <Stack component="section" position="relative">
            <Image
              src="/assets/Contact.webp"
              alt="Invitee"
              width={2000}
              height={2000}
              style={{
                width: "auto",
                height: "auto",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                objectFit: "contain",
                marginTop: "-2px",
              }}
              quality={100}
              priority={true}
            />
            <Box
              position="absolute"
              sx={{
                top: "23.5%",
                left: "45%",
                [theme.breakpoints.down("lg")]: {
                  transform: "scale(0.93)",
                },
                [theme.breakpoints.down("md")]: {
                  transform: "scale(0.83)",
                },
                [theme.breakpoints.down("sm")]: {
                  transform: "scale(0.73)",
                  left: "44%",
                },
                [theme.breakpoints.down("xs")]: {
                  transform: "scale(0.63)",
                  top: "23%",
                  left: "42%",
                },
              }}
            >
              <Link
                rel="noreferrer"
                target="_blank"
                href="https://ul.waze.com/ul?place=ChIJ6c2cyBNbzDERi4RrsGg15-w&ll=3.20655930%2C101.51117170&navigate=yes"
              >
                <Image
                  src="/assets/Waze.png"
                  alt="Waze"
                  width={54}
                  height={54}
                />
              </Link>
            </Box>

            <Box
              position="absolute"
              sx={{
                top: "36%",
                left: "45%",
                [theme.breakpoints.down("lg")]: {
                  transform: "scale(0.93)",
                },
                [theme.breakpoints.down("md")]: {
                  transform: "scale(0.83)",
                },
                [theme.breakpoints.down("sm")]: {
                  transform: "scale(0.73)",
                  left: "44%",
                },
                [theme.breakpoints.down("xs")]: {
                  transform: "scale(0.63)",
                  top: "35%",
                  left: "42%",
                },
              }}
            >
              <Link
                rel="noreferrer"
                target="_blank"
                href="https://www.google.com/maps/dir/3.100538,101.471092/kebun+by+brick+%26+glass/@3.1600243,101.4206278,12z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x31cc5b13c89ccde9:0xece73568b06b848b!2m2!1d101.5111717!2d3.2065593?entry=ttu"
              >
                <Image
                  src="/assets/GoogleMap.min.svg"
                  alt="GoogleMap"
                  width={60}
                  height={60}
                />
              </Link>
            </Box>

            <Box
              position="absolute"
              sx={{
                top: "57.5%",
                left: "35%",
                [theme.breakpoints.down("lg")]: {
                  transform: "scale(0.93)",
                },
                [theme.breakpoints.down("md")]: {
                  transform: "scale(0.83)",
                },
                [theme.breakpoints.down("sm")]: {
                  transform: "scale(0.73)",
                },
                [theme.breakpoints.down("xs")]: {
                  transform: "scale(0.63)",
                  top: "56.5%",
                },
              }}
            >
              <Link
                rel="noreferrer"
                target="_blank"
                href="https://wa.me/+60123456789"
              >
                <Image
                  src="/assets/Whatsapp.png"
                  alt="Whatsapp"
                  width={52}
                  height={52}
                />
              </Link>
            </Box>

            <Box
              position="absolute"
              sx={{
                top: "57.5%",
                left: "58%",
                [theme.breakpoints.down("lg")]: {
                  transform: "scale(0.93)",
                },
                [theme.breakpoints.down("md")]: {
                  transform: "scale(0.83)",
                },
                [theme.breakpoints.down("sm")]: {
                  transform: "scale(0.73)",
                  left: "56%",
                },
                [theme.breakpoints.down("xs")]: {
                  transform: "scale(0.63)",
                  top: "56.5%",
                  left: "54%",
                },
              }}
            >
              <Link rel="noreferrer" target="_blank" href="tel:+60123456789">
                <Image
                  src="/assets/Phone.svg"
                  alt="Phone"
                  width={52}
                  height={52}
                />
              </Link>
            </Box>

            <Box
              position="absolute"
              sx={{
                top: "70.5%",
                left: "35%",
                [theme.breakpoints.down("lg")]: {
                  transform: "scale(0.93)",
                },
                [theme.breakpoints.down("md")]: {
                  transform: "scale(0.83)",
                },
                [theme.breakpoints.down("sm")]: {
                  transform: "scale(0.73)",
                },
                [theme.breakpoints.down("xs")]: {
                  transform: "scale(0.63)",
                  top: "68.5%",
                },
              }}
            >
              <Link
                rel="noreferrer"
                target="_blank"
                href="https://wa.me/+60123456789"
              >
                <Image
                  src="/assets/Whatsapp.png"
                  alt="Whatsapp"
                  width={52}
                  height={52}
                />
              </Link>
            </Box>

            <Box
              position="absolute"
              top="69.5%"
              left="57%"
              sx={{
                top: "70.5%",
                left: "58%",
                [theme.breakpoints.down("lg")]: {
                  transform: "scale(0.93)",
                },
                [theme.breakpoints.down("md")]: {
                  transform: "scale(0.83)",
                },
                [theme.breakpoints.down("sm")]: {
                  transform: "scale(0.73)",
                  left: "56%",
                },
                [theme.breakpoints.down("xs")]: {
                  transform: "scale(0.63)",
                  top: "68.5%",
                  left: "54%",
                },
              }}
            >
              <Link rel="noreferrer" target="_blank" href="tel:+60123456789">
                <Image
                  src="/assets/Phone.svg"
                  alt="Phone"
                  width={52}
                  height={52}
                />
              </Link>
            </Box>
          </Stack>
        </Stack>
        <Dialog
          open={isSubmitting}
          PaperComponent={() => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent",
                boxShadow: "none",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        />
      </Container>
    </main>
  );
}
