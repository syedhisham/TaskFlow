const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const User = require("../models/User.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");
const ApiResponse = require("../utils/ApiResponse.js");


const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;
  
  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Fill all the fields");
  }

  const emailExists = await User.findOne({email});
  if (emailExists) {
    throw new ApiError(400,"Email is already registered");
  }
  const usernameExists = await User.findOne({username});
  if (usernameExists) {
    throw new ApiError(400,"username is already registered");
  }

 
  const avatarLocalPath = req.files?.avatar[0]?.path;


  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }

  const user = await User.create({
    username,
    fullName,
    avatar: avatar.url,
    username: username.toLowerCase(),
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

module.exports = { registerUser };
