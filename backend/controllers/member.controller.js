import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const createMember = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }
  
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
  
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role: "Member",
      });
  
      await user.save();
      res.status(201).json({ message: "User created successfully!", user });
    } catch (error) {
      console.error("Error in createMember:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

export const loginMember = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required!" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password!" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password!" });
        }

        const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        };

        const { password: pwd, ...userWithoutPassword } = user.toObject({ getters: true });

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({
            message: "Login successful!",
            token,
            user: userWithoutPassword,
        });

    } catch (error) {
        console.log("Error occurred in loginMember controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
