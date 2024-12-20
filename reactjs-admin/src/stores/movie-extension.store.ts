import toast from 'react-hot-toast';
import { create } from 'zustand';
import {
  apiCrawlMovieDetail,
  apiCrawlMovieDetailByFile,
} from '~/apis/crawler.api';
import { ICrawlMovieDetail } from '~/types/crawler.type';

interface MovieExtensionState {
  setDataKeyValue: (key: string, value: any) => void;
  urlCrawler: string;
  isCrawlData: boolean;
  movieData: ICrawlMovieDetail[];
  fileCrawler: File | null;
  isUploadFileCrawler: boolean;
  isProcessCrawlFile: boolean;

  removeMovie: (title_movie: string) => void;

  reqCrawlMovieDetail: () => Promise<void>;
  reqCrawlMovieDetailByFile: (file: File) => Promise<void>;
}

const useMovieExtensionStore = create<MovieExtensionState>((set, get) => ({
  setDataKeyValue: (key, value) => {
    set({
      [key]: value,
    });
  },
  urlCrawler: '',
  isCrawlData: false,
  movieData: [],
  fileCrawler: null,
  isUploadFileCrawler: false,
  isProcessCrawlFile: false,

  removeMovie: (title_movie) => {
    set({
      movieData: get().movieData.filter((movie) => movie.title !== title_movie),
    });
    toast.success(`Đã xoá item: "${title_movie}"`);
  },

  reqCrawlMovieDetail: async () => {
    set({ isCrawlData: true });
    try {
      const res = await apiCrawlMovieDetail({
        _url: get().urlCrawler,
      });

      if (res && !res.error && res.data) {
        if (res.data.length <= 0) {
          toast.error('Không tồn tại dữ liệu phim');
          return;
        }

        const merged = [...get().movieData, ...res.data].filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.title === value.title),
        );

        set({
          movieData: merged,
          urlCrawler: '',
        });
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({ isCrawlData: false });
    }
  },

  reqCrawlMovieDetailByFile: async (file) => {
    set({
      isProcessCrawlFile: true,
    });
    try {
      const payload = new FormData();

      payload.append('file', file);

      const res = await apiCrawlMovieDetailByFile(payload);

      if (res && !res.error && res.data) {
        if (res.data.length <= 0) {
          toast.error('Không tồn tại dữ liệu phim');
          return;
        }

        const merged = [...get().movieData, ...res.data].filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.title === value.title),
        );

        set({
          movieData: merged,
          fileCrawler: null,
          isUploadFileCrawler: false,
        });
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error?.toString() as string);
    } finally {
      set({
        isProcessCrawlFile: false,
      });
    }
  },
}));

export default useMovieExtensionStore;
