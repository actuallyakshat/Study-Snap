const User = require("../Models/User");

const getDetails = async (req, res) => {
  try {
    const { auth0Id, email, name } = req.body;
    let user = await User.findOne({ auth0Id })
      .populate({
        path: "todos",
        options: { sort: { order: 1 } },
      })
      .populate({
        path: "completedTimers",
        options: { sort: { _id: -1 } },
      });
    if (!user) {
      user = new User({
        auth0Id,
        email,
        name,
      });
      await user.save();

      user = await User.findOne({ auth0Id });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editProfile = async (req, res) => {
  try {
    const { auth0Id, newName } = req.body;
    const user = await User.findOne({ auth0Id: auth0Id });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found." });
    }
    user.name = newName;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User name updated successfully.",
      user,
    });
  } catch (error) {
    console.error("Error changing user name:", error);
    // Return error response
    res.status(500).json({
      success: false,
      error: "Server error. Failed to update user name.",
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const auth0Id = req.body.auth0Id;
    const user = await User.findOne({ auth0Id: auth0Id });
    if (user) {
      await user.deleteOne();
    } else if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User account deleted successfully" });
  } catch (error) {
    console.error("Error deleting user account:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = {
  getDetails,
  editProfile,
  deleteAccount,
};
