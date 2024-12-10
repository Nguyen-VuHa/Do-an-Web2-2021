import Button from '~/components/Button';
import FormGroup from '~/components/FormGroup';
import Input from '~/components/Input';
import InputMultiSelect from '~/components/InputMultiSelect/InputMultiSelect';
import useCategoryStore from '~/stores/category.store';
import useMovieStore from '~/stores/movie.store';
import { ISelectOption } from '~/types/common.type';

const CategoryForm = () => {
  const { categories } = useCategoryStore();
  const { categoriesSelected, setCategorySelect, removeCategorySelect } =
    useMovieStore();

  return (
    <>
      {/* <!-- Sign In Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            THỂ LOẠI PHIM
          </h3>
        </div>
        <form action="#">
          <div className="p-6.5">
            <FormGroup
              label="Thể loại"
              isRequire
              element={
                <InputMultiSelect
                  isCustomize
                  componentCustomize={<CreateCategory />}
                  values={categoriesSelected}
                  onSelect={(value) => {
                    setCategorySelect(value);
                  }}
                  onRemove={(value) => {
                    removeCategorySelect(value);
                  }}
                  options={categories.map((category) => {
                    let optionItem: ISelectOption = {
                      value: category.category_id,
                      label: category.category_name,
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

const CreateCategory = () => {
  const { isCreateCategory, categoryForm, setCategoryForm, reqCreateCategory } = useCategoryStore()

  return (
    <div className="flex items-center space-x-2">
      <Input
        placeholder="Nhập thể loại phim..."
        value={categoryForm}
        onChange={(e) => {
          setCategoryForm(e.target.value);
        }}
      />
      <Button 
        className="w-fit !py-1" 
        disabled={!categoryForm}
        onClick={() => {
          if(!isCreateCategory && categoryForm) {
            reqCreateCategory()
          }
        }}
        loading={isCreateCategory}
        type='button'
      >
        <span className="whitespace-nowrap">Tạo mới</span>
      </Button>
    </div>
  );
};

export default CategoryForm;
