import FormGroup from '~/components/FormGroup';
import Input from '~/components/Input';
import InputMultiSelect from '~/components/InputMultiSelect/InputMultiSelect';
import useScreenStore from '~/stores/screen.store';

const ScreenForm = () => {
  const {
    screenForm,
    screenType,
    cinemaSelect,
    screenFormError,
    setStateScreen,
  } = useScreenStore();
  return (
    <>
      <div className="border-b border-stroke dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          THÔNG TIN PHÒNG CHIẾU
        </h3>
      </div>
      <form action="#" className="py-6.5">
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <FormGroup
            label="Tên phòng chiếu"
            isRequire
            element={
              <Input
                placeholder="Ví dụ: Screen 1..."
                name="screen_name"
                value={screenForm.screen_name}
                onChange={(e) => {
                  setStateScreen('screenForm', {
                    ...screenForm,
                    screen_name: e.target.value,
                  });
                }}
              />
            }
            messageError={screenFormError?.screen_name || ''}
          />
          <FormGroup
            label="Chọn loại phòng"
            isRequire
            element={
              <InputMultiSelect
                isSingleValue
                options={screenType}
                values={[screenForm.screen_type]}
                onSelect={(value) => {
                  setStateScreen('screenForm', {
                    ...screenForm,
                    screen_type: value,
                  });
                }}
                onRemove={() => {
                  setStateScreen('screenForm', {
                    ...screenForm,
                    screen_type: '',
                  });
                }}
              />
            }
            messageError={screenFormError?.screen_type || ''}
          />
        </div>
        <div className="mb-4.5">
          <FormGroup
            label="Chọn rạp chiếu"
            isRequire
            element={
              <InputMultiSelect
                isSingleValue
                options={cinemaSelect}
                values={[screenForm.cinema]}
                onSelect={(value) => {
                  setStateScreen('screenForm', {
                    ...screenForm,
                    cinema: value,
                  });
                }}
                onRemove={() => {
                  setStateScreen('screenForm', {
                    ...screenForm,
                    cinema: null,
                  });
                }}
              />
            }
            messageError={screenFormError?.cinema || ''}
          />
        </div>
      </form>
    </>
  );
};

export default ScreenForm;
