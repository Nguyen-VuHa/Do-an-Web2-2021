import * as Yup from 'yup';

const editFolderSchema = Yup.object().shape({
  folder_name: Yup.string()
    .required('Trường này là bắt buộc')
    .max(250, 'Trường này không được vượt quá 250 ký tự'),
});

export default editFolderSchema;
