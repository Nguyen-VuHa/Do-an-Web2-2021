import React from 'react';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa6';
import { GiCheckMark } from 'react-icons/gi';
import ButtonIcon from '~/components/ButtonIcon';
import InputMultiSelect from '~/components/InputMultiSelect/InputMultiSelect';
import Tag from '~/components/Tag';
import useCinemaStore from '~/stores/cinema.store';
import { ICinemaForm } from '~/types/cinema.type';
import { provinces } from '~/utils/provinces';

interface CinemaDataItemProps {
  data: ICinemaForm;
  isProcessCreate?: boolean;
  isProcessLoading?: boolean;
  isProcessCompleted?: string;
}

const CinemaDataItem: React.FC<CinemaDataItemProps> = ({
  data,
  isProcessCreate,
  isProcessCompleted = '',
  isProcessLoading,
}) => {
  const { cinemaCrawlData, setStateCinema } = useCinemaStore();
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
              setStateCinema(
                'cinemaCrawlData',
                cinemaCrawlData.filter(
                  (cinema) => cinema.cinema_name !== data.cinema_name,
                ),
              );
              toast.success(`Đã xoá rạp chiếu "${data.cinema_name}"`);
            }}
          >
            <FaTrash />
          </ButtonIcon>
        )}
      </div>
      <div className="flex flex-col space-y-5">
        <ul className="space-y-1 text-sm">
          <li>
            <h2 className="text-warning text-lg">{data.cinema_name}</h2>
          </li>
          <li>
            <Tag color="pink" label={`${data.slug}`}></Tag>
          </li>
          <li>
            <Tag color="warning" label={`${data.area}`}></Tag>
          </li>
          <li>
            <InputMultiSelect
              isSingleValue
              options={provinces}
              values={[data.area]}
              onSelect={(value) => {
                setStateCinema(
                  'cinemaCrawlData',
                  cinemaCrawlData.map((cinema) => {
                    return cinema.cinema_name === data.cinema_name
                      ? {
                          ...cinema,
                          area: value,
                        }
                      : cinema;
                  }),
                );
              }}
              onRemove={() => {
                setStateCinema(
                  'cinemaCrawlData',
                  cinemaCrawlData.map((cinema) => {
                    return cinema.cinema_name === data.cinema_name
                      ? {
                          ...cinema,
                          area: '',
                        }
                      : cinema;
                  }),
                );
              }}
            />
          </li>
          <li>
            <Tag color="success" label={`${data.address}`}></Tag>
          </li>
          <li className="bg-gray text-gray bg-opacity-20 p-2 rounded-lg ">
            <iframe
              src={data.embed_map_url}
              className="w-full"
              height="350"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </li>
        </ul>
      </div>
      <hr />
    </div>
  );
};

export default CinemaDataItem;
