import FormGroup from '~/components/FormGroup';
import InputMultiSelect from '~/components/InputMultiSelect/InputMultiSelect';

const ActorForm = () => {
  return (
    <>
    {/* <!-- Sign In Form --> */}
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          DIỄN VIÊN THAM GIA
        </h3>
      </div>
      <form action="#">
        <div className="p-6.5">
            <FormGroup
              label="Các diễn viên"
              isRequire
              element={<InputMultiSelect />}
            />
        </div>
      </form>
    </div>
  </>
  );
};

export default ActorForm;
