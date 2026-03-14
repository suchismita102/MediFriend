const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User');

const signup = async (req,res)=>{
    try{
        const {name,email,password} = req.body;

        const user = await UserModel.findOne({email});

        if(user){
            return res.status(409).json({
                message:'User already exists, you can login',
                success:false
            });
        }

        const userModel = new UserModel({name,email,password});

        userModel.password = await bcrypt.hash(password,10);

        await userModel.save();

        res.status(201).json({
            message:"Signup successfull",
            success:true
        })

    } catch(err) {
        console.log(err);  

        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
const login = async (req,res)=>{
    try{
        const {email,password} = req.body;

        const user = await UserModel.findOne({email});
        const errorMsg = 'Auth failed: email or password invalid';
        if(!user){
            return res.status(403).json({
                message: errorMsg,
                success:false
            });
        }
        const isPassEqual = await bcrypt.compare(password,user.password);
        if(!isPassEqual) {
            return res.status(403).json({
                message: errorMsg,
                success:false
            });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message:"Login successfull",
            success:true,
            jwtToken,
            email,
            name: user.name
        })

    } catch(err) {
        console.log(err);  

        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
const getProfile = async (req,res)=>{
    try{
        const user = await UserModel.findById(req.user._id).select('-password');

        res.status(200).json({
            success:true,
            user
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

const updateProfile = async (req, res) => {
  try {
    const { name, email, password, profilePic } = req.body;

    
    if (!name || name.length < 3 || name.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 3 and 100 characters",
      });
    }

    if (password && (password.length < 4 || password.length > 100)) {
      return res.status(400).json({
        success: false,
        message: "Password must be between 4 and 100 characters",
      });
    }

    
    if (email) {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
        return res.status(409).json({
          success: false,
          message: "This email is already used by another account",
        });
      }
    }

    
    const updateData = { name, profilePic };
    if (email) updateData.email = email;
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    
    const updatedUser = await UserModel.findByIdAndUpdate(
        req.user._id,
        updateData,
        { returnDocument: "after" }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
    signup,
    login,
    getProfile,
    updateProfile
}