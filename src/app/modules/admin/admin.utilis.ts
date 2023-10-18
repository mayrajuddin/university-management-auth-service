import { Admin } from './admin.Model';

const findLastAdminId = async () => {
  const lastAdmin = await Admin.findOne({}, { _id: 0, id: 1 }).sort({
    createdAt: -1,
  });
};
