import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';
import ButtonIcon from '~/components/ButtonIcon';
import useMovieStore from '~/stores/movie.store';
import { MdDelete } from 'react-icons/md';
import { CgArrowsExchange } from 'react-icons/cg';

interface PosterFormProps {
  openMediaSelect?: () => void;
}

const PosterForm: React.FC<PosterFormProps> = ({ openMediaSelect }) => {
  const { posterSelected, setDataKeyValue } = useMovieStore();
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-4 px-6.5 gap-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:grid-cols-5">
        {posterSelected.map((poster, index) => {
          return (
            <div
              key={poster?.movie_poster_id || index}
              className="relative w-full h-[350px] overflow-hidden cursor-pointer"
            >
              <div className="absolute top-[5px] right-[5px] flex space-x-1 rounded-md dark:bg-boxdark bg-stroke p-1">
                <ButtonIcon
                  color="success"
                  onClick={() => {
                    setDataKeyValue('posterUpdate', poster);
                    openMediaSelect && openMediaSelect();
                  }}
                >
                  <CgArrowsExchange size={22} />
                </ButtonIcon>
                {poster.type && poster.type === 'create' && (
                  <ButtonIcon
                    color="danger"
                    onClick={() => {
                      setDataKeyValue(
                        'posterSelected',
                        posterSelected.filter(
                          (poster_slt) =>
                            poster_slt.movie_poster_id !==
                            poster.movie_poster_id,
                        ),
                      );
                    }}
                  >
                    <MdDelete size={22} />
                  </ButtonIcon>
                )}
              </div>
              <img
                src={poster?.poster_url || ''}
                className="w-full h-full"
                alt="NO POSTER"
              />
            </div>
          );
        })}
        {posterSelected.length < 5 && (
          <div
            className="relative space-y-3 block w-full h-[350px] text-warning flex flex-col justify-center items-center cursor-pointer appearance-none rounded border-2 border-dashed border-warning hover:border-warning/70 py-4 px-4"
            onClick={() => {
              openMediaSelect && openMediaSelect();
            }}
          >
            <MdOutlinePhotoSizeSelectActual size={50} />
            <span>Chọn poster</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PosterForm;
