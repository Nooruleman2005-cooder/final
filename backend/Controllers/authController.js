import userModel from '../Models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import sendMail from '../utils/sendMail.js'
import crypto from 'crypto';

// ********** Signup **********
export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "Uswer Already Exsist....",
                success: false
            })
        }

        const hashesPassword = await bcrypt.hash((password), 10);

        const newUser = new userModel({
            name,
            email,
            password: hashesPassword
        });

        await newUser.save();

        return res.status(200).json({
            message: "User SignUp Successfully....",
            success: true
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'Server Error....',
            success: false
        });
    }
}

// ********** Login ***********
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User Not Found....",
                success: false
            })
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(401).json({
                message: "Invalid Credentails....",
                success: false
            })
        }

        const jwtToken = jwt.sign({
            email: user.email,
            id: user._id
        },
            process.env.JWT_SECRETE,
            { expiresIn: '24h' }
        )

        return res.status(200).json({
            message: "User Login Successfully....",
            name: user.name,
            email,
            success: true,
            jwtToken
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'Server Error....',
            success: false
        });
    }
}

// *************** Forget Password ***************
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User Not Found....",
                success: false

            })
        }
        const resetToken = crypto.randomBytes(32).toString("hex");
        const tokenExpire = Date.now() + 10 * 60 * 1000;

        user.resetToken = resetToken;
        user.tokenExpire = tokenExpire;

        await user.save();

        const resetURL = `http://localhost:5173/reset-password/${resetToken}`;

        const message = `
            <h2>Password Reset Request</h2>
            <p>You requested to reset your password.</p>
            <p>Click the link below to reset your password:</p>
            <a href="${resetURL}" target="_blank">Reset Password</a>
            <p>This link will expire in 10 minutes.</p>
        `;

        await sendMail(user.email, "Password Reset Link ", message);

        return res.status(200).json({
            message: "Password reset email sent successfully",
            success: true
        });

    } catch (err) {
        console.error("Forgot Password Error:", err);
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
}

// ********** Reset Password **********
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await userModel.findOne({
            resetToken: token,
            tokenExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: "Reset link is invalid or has expired. Please request a new one.",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.tokenExpire = undefined;
        await user.save();

        return res.status(200).json({
            message: "Password reset successful",
            success: true
        });

    } catch (err) {
        console.error("Reset Password Error:", err);
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};
