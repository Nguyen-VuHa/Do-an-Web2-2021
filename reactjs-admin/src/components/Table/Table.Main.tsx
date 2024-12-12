import React from 'react';
import { HeaderTable } from '~/types/table.type';

type TableProps = {
  headers: HeaderTable[];
  data?: any[];
  dataKey?: any;
  loading?: boolean;
};

const Table: React.FC<TableProps> = ({
  headers,
  data,
  dataKey = 'id',
  loading = false,
}) => {
  return (
    <div className="relative max-w-full overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            {headers.map((header) => {
              return (
                <th
                  key={header.id}
                  className="min-w-[220px] py-4 px-4 text-start font-medium text-black dark:text-white xl:pl-11"
                >
                  {header.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr className="h-[50vh]">
              <td className="p-10">
                <div className="absolute left-0 top-[30%] w-full p-5 flex flex-col justify-center items-center space-y-2">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-solid border-primary border-t-transparent"></div>
                </div>
              </td>
            </tr>
          )}
          {!loading &&
            data &&
            data.length > 0 &&
            data.map((dt) => {
              return (
                <tr key={dt[dataKey]}>
                  {headers.map((header) => {
                    return (
                      <td
                        key={`${dt[dataKey]}-${header.id}`}
                        className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11"
                      >
                        {header.extendsion ? (
                          header.extendsion(dt)
                        ) : (
                          <p className="text-black dark:text-white">
                            {dt[header.key]}
                          </p>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
