import * as Yup from 'yup';

const editFolderSchema = Yup.object().shape({
  folder_name: Yup.string()
    .required('Tên thư mục là bắt buộc')
    .max(250, 'Tên thư mục không được vượt quá 250 ký tự'),
});

export default editFolderSchema;
