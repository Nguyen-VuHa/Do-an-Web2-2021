import { IObject } from '~/types/common.type';
import axiosInstanceCrawler from './axiosCrawler.config';
import { ICrawlMovieResponse, IURLToBase64Response } from '~/types/crawler.type';

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
