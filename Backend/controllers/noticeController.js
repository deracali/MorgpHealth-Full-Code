import Notice from '../models/notice.js'

// Controller to create a new notice
const createNotice = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const newNotice = new Notice({
      userId,
      title,
      content,
    });

    await newNotice.save();
    res.status(201).json({
      message: 'Notice created successfully!',
      notice: newNotice,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Error creating notice',
      error: error.message,
    });
  }
};

// Controller to get all notices
const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    res.status(200).json({
      message: 'Notices retrieved successfully!',
      notices,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching notices',
      error: error.message,
    });
  }
};

// Controller to get a single notice by ID
const getNoticeById = async (req, res) => {
  const { id } = req.params;
  try {
    const notice = await Notice.findById(id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    res.status(200).json({
      message: 'Notice retrieved successfully!',
      notice,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching notice',
      error: error.message,
    });
  }
};

// Controller to delete a notice by ID
const deleteNotice = async (req, res) => {
  const { id } = req.params;
  try {
    const notice = await Notice.findByIdAndDelete(id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    res.status(200).json({
      message: 'Notice deleted successfully!',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting notice',
      error: error.message,
    });
  }
};



export {createNotice, getAllNotices, deleteNotice}