const User = require('../models/User');
const Task = require('../models/Task');
const ActivityLog = require('../models/ActivityLog');

exports.getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalUsers,
      activeUsers,
      inactiveUsers,
      totalTasks,
      completedTasks,
      pendingTasks,
      todayLogins,
      todayTasksCreated,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ status: 'Active' }),
      User.countDocuments({ status: 'Inactive' }),
      Task.countDocuments(),
      Task.countDocuments({ status: 'Completed' }),
      Task.countDocuments({ status: 'Pending' }),
      ActivityLog.countDocuments({ action: 'login', timestamp: { $gte: today } }),
      ActivityLog.countDocuments({ action: 'task_create', timestamp: { $gte: today } }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        totalTasks,
        completedTasks,
        pendingTasks,
        recentActivity: { todayLogins, todayTasksCreated },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
