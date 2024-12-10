import toast from 'react-hot-toast';
import { create } from 'zustand';
import { apiCreateCategory, fetchAllCategories } from '~/apis/category.api';
import { STATUS_SUCCESS } from '~/constants/statusCode';
import { BodyCreateCategory, Category } from '~/types/movie-meta.type';

interface CategoryState {
  isFetchCategory: boolean;
  isCreateCategory: boolean;
  categories: Category[];
  categoryForm: string,
  setCategoryForm: (val: string) => void,
  reqFetchAllCategories: () => Promise<void>;
  reqCreateCategory: () => Promise<void>;
}

const useCategoryStore = create<CategoryState>((set, get) => ({
  isFetchCategory: false,
  isCreateCategory: false,
  categories: [],
  categoryForm: '',

  setCategoryForm: (val) => {
    set({
      categoryForm: val
    })
  },
  reqCreateCategory: async () => {
    set({
      isCreateCategory: true
    })
    try {
      const payload: BodyCreateCategory = {
        category_name: get().categoryForm
      }

      const res = await apiCreateCategory(payload);

      if(res && res.statusCode === STATUS_SUCCESS && res.data) {
        let categoryList = [res.data].concat(get().categories);

        set({
          categories: categoryList,
          categoryForm: '',
        })
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({
        isCreateCategory: false
      })
    }
  },
  reqFetchAllCategories: async () => {
    set({
      isFetchCategory: true,
    });
    try {
      let res = await fetchAllCategories();

      if (res.statusCode === STATUS_SUCCESS) {
        set({
          categories: res.data || [],
        });
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({
        isFetchCategory: false,
      });
    }
  },
}));

export default useCategoryStore;
