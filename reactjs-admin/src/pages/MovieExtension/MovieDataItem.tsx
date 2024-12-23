import { PhotoView } from 'react-photo-view';
import ButtonIcon from '~/components/ButtonIcon';
import Tag from '~/components/Tag';
import { ICrawlMovieDetail } from '~/types/crawler.type';
import { FaTrash } from 'react-icons/fa';
import useMovieExtensionStore from '~/stores/movie-extension.store';
import { GiCheckMark } from 'react-icons/gi';

interface MovieDataItemProps {
  data: ICrawlMovieDetail;
  isProcessCreate?: boolean;
  isProcessLoading?: boolean;
  isProcessCompleted?: string;
}
const MovieDataItem: React.FC<MovieDataItemProps> = ({
  data,
  isProcessCreate,
  isProcessCompleted = '',
  isProcessLoading,
}) => {
  const { removeMovie } = useMovieExtensionStore();

  return (
    <div className="relative space-y-2 p-4 max-w-full cursor-pointer rounded-md transition-all duration-300 hover:bg-primary hover:bg-opacity-20">
      <div className="absolute flex space-x-2 top-3 right-3">
        {isProcessCompleted && isProcessCompleted !== '' && (
          <>
            {isProcessLoading && (
              <div className="flex items-center space-x-2 text-success">
                <span>Đang xử lý...</span>
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-solid border-t-transparent"></div>
              </div>
            )}
            {isProcessCompleted && isProcessCompleted === 'success' && (
              <ButtonIcon color="success">
                <GiCheckMark />
              </ButtonIcon>
            )}

            {isProcessCompleted && isProcessCompleted === 'failed' && (
              <span className="text-rose">Xử lý thất bại</span>
            )}
          </>
        )}
        {!isProcessCreate && isProcessCompleted === '' && (
          <ButtonIcon
            color="danger"
            onClick={() => {
              removeMovie(data.title);
            }}
          >
            <FaTrash />
          </ButtonIcon>
        )}
      </div>

      <div className="flex flex-col space-y-5">
        <ul className="space-y-1 text-sm">
          <li>
            <h2 className="text-warning text-lg">{data.title}</h2>
          </li>
          <li>
            <Tag color="pink" label={`${data.duration} phút`}></Tag>
          </li>
          <li className="flex flex-wrap gap-1">
            {data.categories.split(',').map((category) => {
              return (
                <Tag key={category} color="sky" label={`${category}`}></Tag>
              );
            })}
          </li>
          <li>
            <Tag color="warning" label={`${data.director}`}></Tag>
          </li>
          <li className="flex flex-wrap gap-1">
            {data.actors.split(',').map((actor) => {
              if (actor)
                return (
                  <Tag key={actor} color="warning" label={`${actor}`}></Tag>
                );
            })}
          </li>
          <li className="flex items-center space-x-2">
            <Tag color="cyan" label={data.start_date}></Tag>
            <span>Đến</span>
            <Tag color="cyan" label={data.end_date}></Tag>
          </li>
          <li>
            <Tag color="warning" label={`Trailer ID: ${data.trailer_id}`}></Tag>
          </li>
          <li className="bg-gray text-gray bg-opacity-20 p-2 rounded-lg ">
            <p className="line-clamp-3 overflow-hidden">{data.description}</p>
          </li>
        </ul>
        <div className="flex flex-wrap gap-2">
          {data.poster_url &&
            data.poster_url.length > 0 &&
            data.poster_url.map((poster) => {
              return (
                <div key={poster}>
                  <PhotoView src={poster || ''}>
                    <img
                      className="w-[150px] h-full"
                      src={poster}
                      alt="NO POSTER"
                    />
                  </PhotoView>
                </div>
              );
            })}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default MovieDataItem;
