// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Paper from "@mui/material/Paper";
// import IconButton from "@mui/material/IconButton";
// import InputAdornment from "@mui/material/InputAdornment";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { Snackbar } from "@mui/material";
// import { AuthContext } from "../contexts/AuthContext";

// const defaultTheme = createTheme();

// export default function Authentication() {
//   const [username, setUsername] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [showPassword, setShowPassword] = React.useState(false);
//   const [name, setName] = React.useState("");
//   const [error, setError] = React.useState("");
//   const [message, setMessage] = React.useState("");
//   const [formState, setFormState] = React.useState(0);
//   const [open, setOpen] = React.useState(false);

//   // ✅ Image state
//   const [imageUrl, setImageUrl] = React.useState("");
//   // ✅ API call for random image
//   React.useEffect(() => {
//     async function getImage() {
//       const accessKey = "JqlzucYSMAN6jceyp8IeBlQUv9prNyt0qif2ZCg5TU8";
//       const url = `https://api.unsplash.com/photos/random?query=wallpaper-4k&client_id=${accessKey}`;

//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         setImageUrl(data.urls?.regular); // update state yahan
//       } catch (err) {
//         console.log(err.message);
//       }
//     }

//     getImage();
//   }, []);

//   const { handleLogin, handleRegister } = React.useContext(AuthContext);

//   let handleAuth = async () => {
//     try {
//       if (formState === 0) {
//         let result = await handleLogin(username, password);
//         console.log(result);
//         setName("");
//       }
//       if (formState === 1) {
//         //register logic
//         let result = await handleRegister(name, username, password);
//         console.log(result);
//         setMessage(result);
//         setOpen(true); //snackbar open ho jayega
//         setError("");
//         setFormState(0);
//         setPassword("");
//         setUsername("");
//         setName("");
//       }
//     } catch (err) {
//       console.log(err);
//       let message = (err?.response?.data.message);
//       setError(message);
//     }
//   };

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") return; // agar bahar click kare toh ignore
//     setOpen(false);
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Grid container component="main" sx={{ height: "100vh" }}>
//         <CssBaseline />
//         {/* Left Image */}
//         <Grid
//           item
//           size={{
//             xs: false,
//             sm: 4,
//             md: 7,
//           }}
//           sx={{
//             backgroundImage: `url(${imageUrl})`,
//             backgroundRepeat: "no-repeat",
//             backgroundColor: (t) =>
//               t.palette.mode === "light"
//                 ? t.palette.grey[50]
//                 : t.palette.grey[900],
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             className: "img-fluid",
//           }}
//         />

//         {/* Right Form */}
//         <Grid
//           item
//           size={{
//             xs: 12,
//             sm: 8,
//             md: 5,
//           }}
//           component={Paper}
//           elevation={6}
//           square
//         >
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <div>
//               <Button
//                 variant={formState === 0 ? "contained" : ""}
//                 onClick={() => {
//                   setFormState(0);
//                 }}
//               >
//                 Sign In
//               </Button>
//               <Button
//                 variant={formState === 1 ? "contained" : ""}
//                 onClick={() => {
//                   setFormState(1);
//                 }}
//               >
//                 Sign Up
//               </Button>
//             </div>

//             <Box component="form" noValidate sx={{ mt: 1 }}>
//               {formState === 1 ? (
//                 <TextField
//                   margin="normal"
//                   required
//                   fullWidth
//                   id="username"
//                   label="Full Name"
//                   name="username"
//                   value={name}
//                   autoFocus
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               ) : (
//                 <></>
//               )}

//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="username"
//                 label="Username"
//                 name="username"
//                 value={username}
//                 autoFocus
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 value={password}
//                 type={showPassword ? "text" : "password"} // 👈 Show / Hide logic
//                 onChange={(e) => setPassword(e.target.value)}
//                 id="password"
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={() => setShowPassword(!showPassword)}
//                         edge="end"
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               <p style={{ color: "red" }}>{error}</p>

//               <Button
//                 type="button"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//                 onClick={handleAuth}
//               >
//                 {formState === 0 ? "Login " : "Register"}
//               </Button>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>

//       <Snackbar
//         open={open}
//         autoHideDuration={4000}
//         message={message}
//         onClose={handleClose}
//       />
//     </ThemeProvider>
//   );
// }




import { toast } from "react-toastify";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Authentication() {
  const { handleLogin, handleRegister } = useContext(AuthContext);

  const [formState, setFormState] = useState(0); // 0 = Login, 1 = Register
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // 🔥 Random background image (Desktop only)
  useEffect(() => {
    async function getImage() {
      try {
        const res = await fetch(
          "https://api.unsplash.com/photos/random?query=technology,bluebackground,abstract&client_id=JqlzucYSMAN6jceyp8IeBlQUv9prNyt0qif2ZCg5TU8"
        );
        const data = await res.json();
        setImageUrl(data?.urls?.regular);
      } catch (err) {
        console.log(err);
      }
    }
    getImage();
  }, []);

  const handleAuth = async () => {
    try {
      setError("");
      if (formState === 0) {
        if (!username || !password) {
          setError("Please fill all fields");
          return;
        }
        await handleLogin(username, password);
      } else {
        if (!name || !username || !password) {
          setError("Please fill all fields");
          return;
        }
        await handleRegister(name, username, password);
        toast.success("Registration Successful! Please Login.");
        setFormState(0);
      }
      setName("");
      setUsername("");
      setPassword("");
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-slate-900 to-black text-white overflow-hidden">

      {/* ================= LEFT IMAGE (DESKTOP ONLY) ================= */}
      <div
        className="hidden lg:block w-1/2 bg-cover bg-center animate-imageReveal"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      {/* ================= RIGHT FORM (WITH CIRCLE RAIN) ================= */}
      <div className="relative w-full lg:w-1/2 flex items-center justify-center px-6 overflow-hidden">

        {/* 🔵 Circle Rain — FORM SIDE ONLY */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(14)].map((_, i) => (
            <span
              key={i}
              className="circle-rain"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* 🧾 Auth Card */}
        <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 animate-slideUp">

          <h2 className="text-3xl font-bold text-center mb-2">
            {formState === 0 ? "Welcome Back 👋" : "Create Account 🚀"}
          </h2>

          <p className="text-center text-gray-400 mb-6">
            Apna Video Call
          </p>

          {/* 🔀 Toggle */}
          <div className="flex mb-6 bg-black/40 rounded-lg p-1">
            <button
              onClick={() => setFormState(0)}
              className={`flex-1 py-2 rounded-lg ${
                formState === 0 ? "bg-indigo-600" : ""
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setFormState(1)}
              className={`flex-1 py-2 rounded-lg ${
                formState === 1 ? "bg-indigo-600" : ""
              }`}
            >
              Register
            </button>
          </div>

          {/* 📝 Form */}
          {formState === 1 && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="auth-input"
            />
          )}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input pr-12"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-gray-400"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {error && <p className="text-red-400 mt-2">{error}</p>}

          <button
            onClick={handleAuth}
            className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-lg font-semibold hover:opacity-90 transition"
          >
            {formState === 0 ? "Login" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
