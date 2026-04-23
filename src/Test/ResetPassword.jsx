import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    LinearProgress,
    IconButton,
    InputAdornment
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function ResetPassword() {

    const [searchParams] = useSearchParams();
    const reset_token = searchParams.get("token");

    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    const getPasswordStrength = () => {
        let score = 0;

        if (password.length > 7) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        return score;
    };

    const strength = getPasswordStrength();

    const handleReset = async () => {

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {

            const response = await fetch(`${apiUrl}/auth/reset_password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: reset_token,
                    new_password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);

                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } else {
                setMessage(data.detail || "Something went wrong");
            }

        } catch {
            setMessage("Something went wrong. Please try again.");
        }

        setLoading(false);
    };

    if (success) {
        return (
            <Box
                sx={{
                    minHeight: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "Poppins"
                }}
            >
                <Paper sx={{ p: 5, textAlign: "center", borderRadius: 3 }}>
                    <CheckCircleIcon
                        sx={{ fontSize: 60, color: "success.main", mb: 2 }}
                    />

                    <Typography variant="h5" sx={{ fontWeight: 600, fontFamily: "Poppins" }}>
                        Password reset successful
                    </Typography>

                    <Typography sx={{ mt: 1, fontFamily: "Poppins" }}>
                        Redirecting to login page...
                    </Typography>
                </Paper>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Poppins"
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    width: 420,
                    borderRadius: 3
                }}
            >

                <Typography
                    variant="h5"
                    sx={{
                        textAlign: "center",
                        mb: 3,
                        fontWeight: 600,
                        fontFamily: "Poppins",
                    }}
                >
                    Reset your password
                </Typography>

                <TextField
                    label="New Password"
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 2 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                {password && (
                    <Box sx={{ mb: 2 }}>
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

                <TextField
                    label="Confirm Password"
                    fullWidth
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {message && (
                    <Typography
                        sx={{
                            mt: 2,
                            fontSize: 14,
                            color: "error.main"
                        }}
                    >
                        {message}
                    </Typography>
                )}

                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 3,
                        py: 1.2,
                        fontWeight: 600,
                        textTransform: "none",
                    }}
                    disabled={loading || strength < 2}
                    onClick={handleReset}
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </Button>

            </Paper>
        </Box>
    );
}