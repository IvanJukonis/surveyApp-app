import React, { useState, useEffect } from 'react';
import formStyles from '../Form/vehicles.module.css';
import { ModalConfirm, ModalSuccess, Button, Inputs, OptionInput, Loader } from 'Components/Shared';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createVehicle, updateVehicle } from 'redux/vehiculo/thunks';
//import { getAllInvolveds } from 'redux/involved/thunks';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';

const schema = Joi.object({
  involved: Joi.alternatives()
    .try(
      Joi.array().items(Joi.string().hex().length(24).required()),
      Joi.string().hex().length(24).required()
    )
    .messages({
      'alternatives.types': 'Involved must be an array or a hexadecimal ID',
      'string.hex': 'Involved must be a hexadecimal ID',
      'string.length': 'Involved must have exactly 24 characters'
    }),
  activity: Joi.string().hex().length(24).required().messages({
    'string.hex': 'Activity has to be a hexadecimal ID',
    'string.length': 'Activity must have exactly 24 characters',
    'string.base': 'Activity must be chosen',
    'any.required': 'Activity is required'
  }),
  slots: Joi.number().min(0).max(20).required().messages({
    'number.base': 'Slots must be a number',
    'number.min': 'Slots must be at least 1',
    'number.max': 'Slots cannot exceed 20',
    'any.required': 'Slots is required'
  }),
  firstName: Joi.string()
    .min(3)
    .max(15)
    .regex(/^[a-zA-Z ]+$/)
    .messages({
      'string.base': 'The first name must be a text string',
      'string.empty': 'The first name is a required field',
      'string.min': 'The first name must be at least 3 characters',
      'string.max': 'The first name must be at most 15 characters',
      'string.pattern.base': 'The first name must contain only letters'
    })
    .required(),

  lastName: Joi.string()
    .min(3)
    .max(15)
    .messages({
      'string.base': 'The last name must be a text string',
      'string.empty': 'The last name is a required field',
      'string.min': 'The last name must be at least 3 characters',
      'string.max': 'The last name must be at most 15 characters'
    })
    .required(),

  dni: Joi.number().min(10000000).max(99999999).integer().messages({
    'number.base': 'The DNI must be a number',
    'number.empty': 'The DNI is a required field',
    'number.min': 'The DNI must be at least 10,000,000',
    'number.max': 'The DNI must be at most 99,999,999',
    'number.integer': 'The DNI must be an integer'
  }),

  birthday: Joi.date()
    .messages({
      'date.base': 'The birthday must be a valid date',
      'date.empty': 'The birthday is a required field'
    })
    .required(),

  phone: Joi.string()
    .min(10)
    .messages({
      'string.base': 'The phone number must be a text string',
      'string.empty': 'The phone number is a required field',
      'string.min': 'The phone number must be at least 10 digits'
    })
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'string.base': 'The email must be a text string',
      'string.empty': 'The email is a required field',
      'string.email': 'The email must be a valid email address',
      'string.minDomainSegments': 'The email must have at least 2 domain segments',
      'string.tlds.allow': 'The email must have a valid top-level domain (com or net)'
    }),

  city: Joi.string()
    .min(3)
    .max(15)
    .messages({
      'string.base': 'The city must be a text string',
      'string.empty': 'The city is a required field',
      'string.min': 'The city must be at least 3 characters',
      'string.max': 'The city must be at most 15 characters'
    })
    .required(),

  postalCode: Joi.string()
    .min(4)
    .max(5)
    .messages({
      'string.base': 'The postal code must be a text string',
      'string.empty': 'The postal code is a required field',
      'string.min': 'The postal code must be at least 4 digits',
      'string.max': 'The postal code must be at most 5 digits'
    })
    .required(),

  membership: Joi.string().valid('Black', 'Classic', 'Only_classes').messages({
    'any.only': 'The membership must be one of Black, Classic, or Only_classes'
  }),

  isActive: Joi.boolean()
    .messages({
      'boolean.base': 'The isActive field must be a boolean',
      'boolean.empty': 'The isActive field is a required field'
    })
    .required()
});

const FormVehicles = () => {
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [updVehicle, setUpdVehicle] = useState({});

  const { id } = useParams();
  const locationObject = useLocation();
  const updateData = locationObject.state.params;
  const vehicles = useSelector((state) => state.vehicles.list);
  const trainers = useSelector((state) => state.trainers.list);
  const activities = useSelector((state) => state.activities.list);
  const dispatch = useDispatch();
  const history = useHistory();
  const updateItem = vehicles.find((item) => item._id === id);
  const isLoading = useSelector((state) => state.vehicles.pending);

  const daysArray = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const vehiclesData = {
    activity: updateItem?.activity ? updateItem.activity._id : '',
    day: updateItem?.day,
    hour: updateItem?.hour,
    slots: updateItem?.slots,
    trainer: updateItem?.trainer ? updateItem.trainer.map((item) => item._id) : []
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: {
      ...vehiclesData
    }
  });

  useEffect(() => {
    //getVehicles(dispatch);
    //getTrainers(dispatch);
    //getAllActivities(dispatch);
  }, []);

  const vehicleBody = {
    method: updateData.mode === 'edit' ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updVehicle)
  };

  const openModal = async (data) => {
    let trainerArray = data.trainer;
    if (typeof data.trainer !== 'object') {
      trainerArray = [data.trainer];
    }
    setModalConfirmOpen(true);
    setUpdVehicle({ ...data, trainer: trainerArray });
  };

  const formSubmit = async () => {
    if (updateData.mode === 'edit') {
      setModalConfirmOpen(false);
      await updateVehicle(id, vehicleBody, dispatch);
      await setModalSuccessOpen(true);
      setTimeout(() => {
        history.push('/admin/vehicles');
        setModalSuccessOpen(false);
      }, 2000);
    } else {
      await createVehicle(vehicleBody, dispatch);
      await setModalSuccessOpen(true);
      setTimeout(() => {
        history.goBack();
        setModalSuccessOpen(false);
      }, 2000);
    }
  };

  const Hours = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00'
  ];
  return (
    <div className={formStyles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <form className={formStyles.form} onSubmit={handleSubmit(openModal)}>
          <div className={formStyles.container}>
            <h2 className={formStyles.formTitle}>
              {updateData.mode === 'edit' ? 'Update' : 'Create'} Vehicle
            </h2>
            <div className={formStyles.inputs}>
              <OptionInput
                data={Hours}
                dataLabel="Hour"
                name="hour"
                register={register}
                error={errors.hour?.message}
              />

              <OptionInput
                data={daysArray}
                dataLabel="Day"
                name="day"
                register={register}
                error={errors.day?.message}
              />

              <OptionInput
                data={trainers}
                dataLabel="Trainers"
                name="trainer"
                register={register}
                error={errors.trainer?.message}
              />

              <OptionInput
                data={activities}
                dataLabel="Activities"
                name="activity"
                register={register}
                error={errors.activity?.message}
              />

              <Inputs
                type={'text'}
                isDisabled={false}
                nameInput={'slots'}
                nameTitle="Slots"
                register={register}
                error={errors.slots?.message}
              />
            </div>
            <div className={formStyles.buttons}>
              <span className={formStyles.cancelButton}>
                <Button clickAction={() => history.push('/admin/vehicles')} text="Cancel" />
              </span>
              <Button clickAction={() => reset()} text="Reset" />
              <Button
                clickAction={() => {}}
                text={updateData.mode === 'edit' ? 'Update' : 'Create'}
              />
            </div>
          </div>
        </form>
      )}

      {modalConfirmOpen && (
        <ModalConfirm
          method={updateData.mode === 'edit' ? 'Edit' : 'Create'}
          onConfirm={formSubmit}
          setModalConfirmOpen={setModalConfirmOpen}
          message={
            updateData.mode === 'edit'
              ? 'Are you sure you want to update this?'
              : 'Are you sure you want to create this?'
          }
        />
      )}
      <div>
        {modalSuccessOpen && (
          <ModalSuccess
            setModalSuccessOpen={setModalSuccessOpen}
            message={
              updateData.mode === 'edit'
                ? 'The vehicle has been updated successfully'
                : 'The vehicle has been created successfully'
            }
          />
        )}
      </div>
    </div>
  );
};

export default FormVehicles;
