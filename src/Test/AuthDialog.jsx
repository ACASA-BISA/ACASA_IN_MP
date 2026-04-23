import React, { useState, useRef } from "react";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Typography,
    Box,
    IconButton,
    FormControl,
    FormControlLabel,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    LinearProgress,
    CircularProgress,
    Snackbar,
    Alert
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeContext } from "../ThemeContext";
import ReCAPTCHA from "react-google-recaptcha";

export default function AuthDialog({ isOpen, onClose, onAuthSuccess }) {
    const [authLoading, setAuthLoading] = useState(false);
    const [forgotLoading, setForgotLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [purpose, setPurpose] = useState("");
    const [customPurpose, setCustomPurpose] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [forgotOpen, setForgotOpen] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [legalOpen, setLegalOpen] = useState(false);
    const [legalType, setLegalType] = useState(null); // "terms" or "privacy"
    const [captchaToken, setCaptchaToken] = useState(null);
    const [forgotCaptchaToken, setForgotCaptchaToken] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const { mode, toggleTheme } = React.useContext(ThemeContext);

    const captchaRef = useRef(null);
    const forgotCaptchaRef = useRef(null);

    const apiUrl = process.env.REACT_APP_API_URL;
    const SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

    const inputGlassStyle = {
        "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            backdropFilter: "blur(8px)",
            backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(255,255,255,0.75)",
            transition: "all 0.2s ease",
        },

        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.25)",
        },

        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.5)",
        },

        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
            borderWidth: "1.5px",
        },

        "& .MuiInputLabel-root": {
            color: "text.secondary",
        }
    };

    const purpose_options = [
        "Academic research",
        "Policy planning and analysis",
        "Capacity strengthening",
        "Agri industry application",
        "Financial or credit institutions",
        "Other",
    ];

    const finalPurpose = purpose === "Other" ? customPurpose : purpose;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (authLoading) return; // Prevent double click

        if (!captchaToken) {
            setError("Please complete the captcha");
            return;
        }

        setAuthLoading(true);
        setError("");

        try {
            if (isLogin) {
                const response = await fetch(`${apiUrl}/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email,
                        password,
                        captcha_token: captchaToken
                    }),
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.detail || "Login failed");

                localStorage.setItem("access_token", data.access_token);

                captchaRef.current.reset();
                setCaptchaToken(null);

                onAuthSuccess();
                onClose();
            } else {
                const response = await fetch(`${apiUrl}/auth/signup`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        purpose: finalPurpose,
                        captcha_token: captchaToken
                    }),
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.detail || "Signup failed");

                setSnackbarMessage("Signup successful. Please check your email.");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);

                captchaRef.current.reset();
                setCaptchaToken(null);

                setIsLogin(true);
            }
        } catch (err) {
            setError(err.message);

            // Reset captcha on error too
            captchaRef.current.reset();
            setCaptchaToken(null);
        } finally {
            setAuthLoading(false); // Always unlock
        }
    };

    const handleForgotPassword = async () => {

        // Prevent multiple clicks
        if (forgotLoading) return;

        // Ensure CAPTCHA is completed
        if (!forgotCaptchaToken) {
            setSnackbarMessage("Please complete the captcha");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        setForgotLoading(true);

        try {
            const response = await fetch(`${apiUrl}/auth/forgot_password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: resetEmail,
                    captcha_token: forgotCaptchaToken,
                    frontend_url: window.location.origin
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Something went wrong");
            }

            // Success message (generic for security)
            setSnackbarMessage("If the email exists, a reset link has been sent.");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);

            // Reset CAPTCHA safely
            forgotCaptchaRef.current?.reset();
            setForgotCaptchaToken(null);

            // Reset form
            setForgotOpen(false);
            setResetEmail("");

        } catch (err) {
            // Error handling
            setSnackbarMessage(err.message || "Request failed");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);

            // Reset CAPTCHA on error too
            forgotCaptchaRef.current?.reset();
            setForgotCaptchaToken(null);

        } finally {
            // Always release loading state
            setForgotLoading(false);
        }
    };

    const getPasswordStrength = () => {
        let score = 0;

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        return score;
    };

    const strength = getPasswordStrength();

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                elevation: 0,
                sx: {
                    borderRadius: 4,
                    backdropFilter: "blur(25px)",
                    background:
                        mode === "dark"
                            ? "rgba(30,30,30,0.75)"
                            : "rgba(255,255,255,0.75)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
                    overflow: "hidden",
                },
            }}
        >
            <DialogContent sx={{ p: 0 }}>

                <Box sx={{ display: "flex", minHeight: 480 }}>

                    {/* LEFT PANEL */}
                    <Box
                        sx={{
                            width: "40%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            p: 5,
                            background:
                                mode === "dark"
                                    ? "rgba(255,255,255,0.05)"
                                    : "rgba(255,255,255,0.4)",
                            backdropFilter: "blur(15px)",
                            borderRight: "1px solid rgba(255,255,255,0.15)",
                        }}
                    >
                        <Box
                            component="img"
                            src={
                                mode === "dark"
                                    ? "Home_imgs/Acasa Logo white1.png"
                                    : "Home_imgs/Acasa1.png"
                            }
                            sx={{ width: 150, mb: 2 }}
                        />

                        <Typography
                            variant="body2"
                            sx={{
                                color: "text.secondary",
                                lineHeight: 1.6,
                                fontFamily: "Poppins",
                            }}
                        >
                            Atlas of Climate Adaptation
                            <br />
                            in Indian Agriculture
                        </Typography>
                    </Box>

                    {/* RIGHT PANEL */}
                    <Box
                        sx={{
                            width: "60%",
                            p: 5,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            position: "relative",
                        }}
                    >

                        {/* CLOSE */}
                        <IconButton
                            onClick={onClose}
                            sx={{
                                position: "absolute",
                                right: 16,
                                top: 16,
                                color: "text.secondary",
                                fontFamily: "Poppins",
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        {/* TITLE */}
                        <Typography variant="h5" sx={{ fontWeight: 600, fontFamily: "Poppins", }}>
                            {isLogin ? "Sign in to your account" : "Create your account"}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 3, fontFamily: "Poppins", }}
                        >
                            {isLogin
                                ? "Login to download datasets. We encourage the use of this data for research and professional purposes."
                                : "Create an account to download datasets. We encourage the use of this data for research and professional purposes while exploration and visualization remain freely accessible."}
                        </Typography>

                        {/* FORM */}
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >

                            {!isLogin && (
                                <>
                                    <TextField
                                        label="Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        fullWidth
                                        sx={inputGlassStyle}
                                    />

                                    {purpose === "Other" ? (
                                        <TextField
                                            label="Your Purpose"
                                            value={customPurpose}
                                            onChange={(e) => setCustomPurpose(e.target.value)}
                                            required
                                            fullWidth
                                            sx={inputGlassStyle}
                                        />
                                    ) : (
                                        <FormControl fullWidth required sx={inputGlassStyle}>
                                            <InputLabel>Purpose</InputLabel>

                                            <Select
                                                value={purpose}
                                                label="Purpose"
                                                onChange={(e) => {
                                                    if (e.target.value === "Other") {
                                                        setPurpose("Other");
                                                    } else {
                                                        setPurpose(e.target.value);
                                                    }
                                                }}
                                            >
                                                {purpose_options.map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    )}
                                </>
                            )}

                            <TextField
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError("");
                                }}
                                required
                                fullWidth
                                sx={inputGlassStyle}
                            />

                            <TextField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                                required
                                fullWidth
                                sx={inputGlassStyle}
                            />
                            {/* PASSWORD STRENGTH (SIGNUP ONLY) */}
                            {!isLogin && password && (
                                <Box sx={{ mt: -1 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={(strength / 4) * 100}
                                        sx={{
                                            height: 6,
                                            borderRadius: 5,
                                            backgroundColor: "rgba(255,255,255,0.15)"
                                        }}
                                    />

                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontFamily: "Poppins",
                                            color: "text.secondary"
                                        }}
                                    >
                                        Password strength
                                    </Typography>
                                </Box>
                            )}
                            {isLogin && (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        textAlign: "right",
                                        cursor: "pointer",
                                        color: "primary.main",
                                        fontFamily: "Poppins",
                                        "&:hover": { textDecoration: "underline" }
                                    }}
                                    onClick={() => {
                                        setResetEmail(email);
                                        setForgotOpen(true);

                                        setCaptchaToken(null);
                                        captchaRef.current?.reset();

                                        setForgotCaptchaToken(null);
                                        forgotCaptchaRef.current?.reset();
                                    }}
                                >
                                    Forgot Password?
                                </Typography>
                            )}

                            {error && (
                                <Typography color="error" variant="body2" sx={{ fontFamily: "Poppins" }}>
                                    {error}
                                </Typography>
                            )}

                            {/* TERMS */}
                            {!isLogin && (
                                <FormControlLabel
                                    control={<Checkbox required />}
                                    label={
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ fontFamily: "Poppins" }}
                                        >
                                            I agree to the{" "}
                                            <Link
                                                component={RouterLink}
                                                to="/termsofservice"
                                                underline="hover"
                                            >
                                                Terms of Service
                                            </Link>{" "}
                                            and{" "}
                                            <Link
                                                component={RouterLink}
                                                to="/privacypolicy"
                                                underline="hover"
                                            >
                                                Privacy Policy
                                            </Link>
                                        </Typography>
                                    }
                                />
                            )}

                            {/* BUTTON */}
                            <ReCAPTCHA
                                ref={captchaRef}
                                sitekey={SITE_KEY}
                                theme={mode === "dark" ? "dark" : "light"}
                                onChange={(token) => setCaptchaToken(token)}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={authLoading || !captchaToken || (!isLogin && strength < 2)}
                                sx={{
                                    borderRadius: 2,
                                    py: 1.4,
                                    fontWeight: 600,
                                    textTransform: "none",
                                    mt: 1,
                                    boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
                                    background: "linear-gradient(135deg,#2b6cb0,#2f7bd8)"
                                }}
                            >
                                {authLoading ? (
                                    <CircularProgress size={20} color="inherit" />
                                ) : isLogin ? "Login" : "Create Account"}
                            </Button>

                            {/* SWITCH */}
                            <Typography
                                variant="body2"
                                align="center"
                                sx={{ color: "text.secondary", fontFamily: "Poppins" }}
                            >
                                {isLogin
                                    ? "Don't have an account?"
                                    : "Already have an account?"}{" "}
                                <Box
                                    component="span"
                                    onClick={() => {
                                        setIsLogin(!isLogin);
                                        setCaptchaToken(null);
                                        captchaRef.current?.reset();
                                    }}
                                    sx={{
                                        color: "primary.main",
                                        cursor: "pointer",
                                        fontWeight: 500,
                                        "&:hover": { textDecoration: "underline" },
                                    }}
                                >
                                    {isLogin ? "Sign Up" : "Login"}
                                </Box>
                            </Typography>

                        </Box>
                    </Box>
                </Box>
            </DialogContent>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    variant="filled"
                    sx={{
                        borderRadius: 2,
                        backdropFilter: "blur(12px)",
                        background:
                            mode === "dark"
                                ? "rgba(40,40,40,0.85)"
                                : "rgba(255,255,255,0.9)",
                        color: "text.primary",
                        border: "1px solid rgba(255,255,255,0.18)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                        alignItems: "center",
                        fontFamily: "Poppins"
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Dialog
                open={forgotOpen}
                onClose={() => {
                    setForgotOpen(false);
                    setResetEmail("");
                }}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>
                    Reset Password
                    <IconButton
                        onClick={() => {
                            setForgotOpen(false);
                            setResetEmail("");
                        }}
                        sx={{ position: "absolute", right: 10, top: 10 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2, fontFamily: "Poppins" }}
                    >
                        Enter your email address and we will send you a password reset link.
                    </Typography>

                    <TextField
                        label="Email"
                        fullWidth
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        sx={inputGlassStyle}
                    />
                    <ReCAPTCHA
                        ref={forgotCaptchaRef}
                        sitekey={SITE_KEY}
                        theme={mode === "dark" ? "dark" : "light"}
                        onChange={(token) => setForgotCaptchaToken(token)}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 3,
                            borderRadius: 2,
                            py: 1.4,
                            fontFamily: "Poppins",
                            fontWeight: 600,
                            textTransform: "none",
                            boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
                            background: "linear-gradient(135deg,#2b6cb0,#2f7bd8)"
                        }}
                        onClick={handleForgotPassword}
                        disabled={forgotLoading || !resetEmail || !forgotCaptchaToken}
                    >
                        Send reset link
                    </Button>

                </DialogContent>
            </Dialog>
        </Dialog>
    );
}