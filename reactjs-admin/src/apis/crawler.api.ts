import { IObject } from '~/types/common.type';
import axiosInstanceCrawler from './axiosCrawler.config';
import {
  ICrawlMovieResponse,
  ICrawlResponse,
  ICrawlShowtimeData,
  IURLToBase64Response,
} from '~/types/crawler.type';
import { ICinemaForm } from '~/types/cinema.type';

const MOVIE_CRAWL_PATH = '/crawl-data';

export const apiCrawlMovieDetail = async (
  params: IObject<string>,
): Promise<ICrawlMovieResponse> => {
  const path = MOVIE_CRAWL_PATH;
  return axiosInstanceCrawler.get(path, { params });
};

export const apiCrawlMovieDetailByFile = async (
  data: FormData,
): Promise<ICrawlMovieResponse> => {
  const path = '/crawl-file';
  return axiosInstanceCrawler.post(path, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const apiURLtoBase64 = async (
  params: IObject<string>,
): Promise<IURLToBase64Response> => {
  const path = '/image-to-base64';
  return axiosInstanceCrawler.get(path, { params });
};

export const apiCrawlEmbedURL = async (
  params: IObject<string>,
): Promise<ICrawlResponse<string>> => {
  const path = '/crawl-embed-map';
  return axiosInstanceCrawler.get(path, { params });
};

export const apiCrawlCinemaDetail = async (
  params: IObject<string>,
): Promise<ICrawlResponse<ICinemaForm[]>> => {
  const path = '/crawl-cinema-data';
  return axiosInstanceCrawler.get(path, { params });
};

export const apiCrawlShowtimeData = async (
  params: IObject<string>,
): Promise<ICrawlResponse<ICrawlShowtimeData[]>> => {
  const path = '/crawl-showtime-data';
  return axiosInstanceCrawler.get(path, { params });
};
