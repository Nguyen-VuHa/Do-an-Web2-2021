import Button from '~/components/Button';
import FormGroup from '~/components/FormGroup';
import Input from '~/components/Input';
import InputMultiSelect from '~/components/InputMultiSelect/InputMultiSelect';
import useDirectorStore from '~/stores/director.store';
import useMovieStore from '~/stores/movie.store';
import { ISelectOption } from '~/types/common.type';

const DirectorForm = () => {
  const { directors } = useDirectorStore();
  const { directorSelected, setDirectorSelect, removeDirectorSelect } =
    useMovieStore();

  return (
    <>
      {/* <!-- Sign In Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            ĐẠO DIỄN PHIM
          </h3>
        </div>
        <form action="#">
          <div className="p-6.5">
            <FormGroup
              label="Đạo diễn"
              isRequire
              element={
                <InputMultiSelect
                  isSingleValue
                  isCustomize
                  componentCustomize={<CreateDirector />}
                  values={directorSelected}
                  onSelect={(value) => {
                    setDirectorSelect(value);
                  }}
                  onRemove={(value) => {
                    removeDirectorSelect(value);
                  }}
                  options={directors.map((director) => {
                    let optionItem: ISelectOption = {
                      value: director.director_id,
                      label: director.director_name,
                    };
                    return optionItem;
                  })}
                />
              }
            />
          </div>
        </form>
      </div>
    </>
  );
};

const CreateDirector = () => {
  const { isCreateDirector, directorForm, setDirectorForm, reqCreateDirector } =
    useDirectorStore();

  return (
    <div className="flex items-center space-x-2">
      <Input
        placeholder="Nhập tên đạo diễn..."
        value={directorForm}
        onChange={(e) => {
          setDirectorForm(e.target.value);
        }}
      />
      <Button
        className="w-fit !py-1"
        disabled={!directorForm}
        onClick={() => {
          if (!isCreateDirector && directorForm) {
            reqCreateDirector();
          }
        }}
        loading={isCreateDirector}
        type="button"
      >
        <span className="whitespace-nowrap">Tạo mới</span>
      </Button>
    </div>
  );
};

export default DirectorForm;
