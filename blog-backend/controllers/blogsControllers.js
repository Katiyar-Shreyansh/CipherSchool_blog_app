import blogSchema from "../models/blogModel.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogSchema.find({});
    res.status(200).send({
      success: true,
      blogs,
    });
  } catch (error) {
    res.status(500).sent({
      success: false,
      message: "Something went wrong while fetching blogs!",
    });
  }
};

export const getUserBlogs = async (req, res) => {
  const user_id = req.params.id;
  try {
    const userBlogs = await blogSchema.find({ user_id });
    res.status(200).send({
      success: true,
      userBlogs,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const createBlog = async (req, res) => {
  try {
    const userId = req.user._id;
    const { category, title, body, user_name } = req.body;

    if (!category || !title || !body || !user_name ) {
      return res.status(400).send({
        success: false,
        message: "All fields are mandatory!",
      });
    }

    const blog = new blogSchema({
      title,
      body,
      category,
      user_id: userId,
      user_name
    });

    await blog.save();
    res.status(201).send({
      success: true,
      message: "Blog created!",
      blog
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
export const getSingleBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await blogSchema.findOne({ _id: id });

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: `No blog with id ${id} found!`,
      });
    }

    res.status(200).send({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  console.log(id)
  try {
    const blog = await blogSchema.findOne({ _id: id });
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: `No blog with id ${id} found!`,
      });
    }

    if (blog.user_id !== userId) {
      return res.status(401).send({
        success: false,
        message: "Not authorized to perform this action!",
      });
    }

    const updatedBlog = await blogSchema.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).send({
      success: true,
      message: "Blog updated!",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;
  try {
    const blog = await blogSchema.findOne({ _id: id });
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: `No blog with id ${id} found!`,
      });
    }
    if (blog.user_id !== userId) {
      return res.status(401).send({
        success: false,
        message: "Not authorized to perform this action!",
      });
    }
    const deletedBlog = await blogSchema.findOneAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Blog deleted!",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
