import Button from '~/components/Button';
import FormGroup from '~/components/FormGroup';
import Input from '~/components/Input';
import InputMultiSelect from '~/components/InputMultiSelect/InputMultiSelect';
import useActorStore from '~/stores/actor.store';
import useMovieStore from '~/stores/movie.store';
import { ISelectOption } from '~/types/common.type';

const ActorForm = () => {
  const { actors } = useActorStore();
  const { actorSelected, errMovieForm, setActorSelect, removeActorSelect } =
    useMovieStore();

  return (
    <>
      {/* <!-- Sign In Form --> */}
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            DIỄN VIÊN THAM GIA
          </h3>
        </div>
        <div>
          <div className="p-6.5">
            <FormGroup
              label="Các diễn viên"
              isRequire
              element={
                <InputMultiSelect
                  isCustomize
                  componentCustomize={<CreateActor />}
                  values={actorSelected}
                  onSelect={(value) => {
                    setActorSelect(value);
                  }}
                  onRemove={(value) => {
                    removeActorSelect(value);
                  }}
                  options={actors.map((actor) => {
                    let optionItem: ISelectOption = {
                      value: actor.actor_id,
                      label: actor.actor_name,
                    };
                    return optionItem;
                  })}
                />
              }
              messageError={errMovieForm.actors}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const CreateActor = () => {
  const { isCreateActor, actorForm, setActorForm, reqCreateActor } =
    useActorStore();

  const handleSubmitCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isCreateActor && actorForm) {
      reqCreateActor();
    }
  };

  return (
    <form
      id="form-actor"
      onSubmit={handleSubmitCreate}
      className="flex items-center space-x-2"
    >
      <Input
        placeholder="Nhập thể loại phim..."
        value={actorForm}
        onChange={(e) => {
          setActorForm(e.target.value);
        }}
      />
      <Button
        className="!w-fit !py-1"
        disabled={!actorForm}
        loading={isCreateActor}
      >
        <span className="whitespace-nowrap">Tạo mới</span>
      </Button>
    </form>
  );
};

export default ActorForm;
