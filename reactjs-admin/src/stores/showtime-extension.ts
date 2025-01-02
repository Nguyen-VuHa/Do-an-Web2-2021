import toast from 'react-hot-toast';
import { create } from 'zustand';
import { apiCrawlShowtimeData } from '~/apis/crawler.api';
import { ICrawlShowtimeData } from '~/types/crawler.type';

interface ShowtimeExtensionState {
  setStateShowtimeExtension: (key: string, value: any) => void;
  urlCrawler: string;
  isCrawlData: boolean;
  isProcessCreateShowtime: boolean;
  showtimeData: ICrawlShowtimeData[];

  resetShowtimeExtension: () => void;

  reqCrawlShowtimeData: () => Promise<void>;
}

const useShowtimeExtensionStore = create<ShowtimeExtensionState>(
  (set, get) => ({
    setStateShowtimeExtension: (key, value) => {
      set({
        [key]: value,
      });
    },

    urlCrawler: '',
    isCrawlData: false,
    isProcessCreateShowtime: false,
    showtimeData: [],

    resetShowtimeExtension: () => {
      set({
        showtimeData: [],
        urlCrawler: '',
        isCrawlData: false,
        isProcessCreateShowtime: false,
      });
    },

    reqCrawlShowtimeData: async () => {
      set({ isCrawlData: true });
      try {
        const res = await apiCrawlShowtimeData({
          _url: get().urlCrawler,
        });

        if (res && !res.error && res.data) {
          if (res.data.length <= 0 || !res.data[0].movie) {
            toast.error('Không tồn tại dữ liệu phim');
            return;
          }

          const merged = [...get().showtimeData, ...res.data].filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.movie === value.movie),
          );

          set({
            showtimeData: merged,
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
  }),
);

export default useShowtimeExtensionStore;
