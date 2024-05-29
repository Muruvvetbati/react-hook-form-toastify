import React from 'react';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import '../app.css';

const initialFormData = {
  title: '',
  description: '',
  people: [],
};
export default function TaskHookForm(props) {
  const { kisiler, submitFn } = props; //destructure

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialFormData,
    mode: 'onChange',
  });

  function onSubmit(data, e) {
    //e.preventDefault(); gerekyok
    submitFn({
      ...data,
      id: nanoid(5),
      status: 'yapılacak',
    });
    e.target.reset(); // formun tüm alanlarını otomatik olarak resetler sıfırlar
  }
  const validateTitle = (value) => {
    return value.trim().length >= 3 || 'Task başlığı en az 3 karakter olmalı';
  };

  const validateDescription = (value) => {
    return (
      value.trim().length >= 10 || 'Task açıklaması en az 10 karakter olmalı'
    );
  };
  const validatePeople = (value) => {
    if (value.length > 3) {
      return 'En fazla 3 kişi seçebilirsiniz';
    }
    if (value.length == 0) {
      return 'Lütfen en az bir kişi seçin';
    }
  };
  return (
    <div>
      <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-line">
          <label className="input-label" htmlFor="title">
            Başlık
          </label>
          <input
            className="input-text"
            id="title"
            type="text"
            {...register('title', {
              required: 'Task başlığı yazmalısınız',
              validate: validateTitle,
            })}

            //onChange={handleOthersChange}// kendi getiriyor
            //value={formData.title} //kendi getiriryor setliyor
          />
          <p className="input-error">{errors.title?.message}</p>
        </div>

        <div className="form-line">
          <label className="input-label" htmlFor="description">
            Açıklama
          </label>
          <textarea
            className="input-textarea"
            rows="3"
            id="description"
            {...register('description', {
              required: 'Task açıklaması yazmalısınız',
              validate: validateDescription,
            })}
            //name="description"
            //onChange={handleOthersChange}
            //value={formData.description}
          ></textarea>
          <p className="input-error">{errors.description?.message}</p>
        </div>

        <div className="form-line">
          <label className="input-label">İnsanlar</label>
          <div>
            {kisiler.map((p) => (
              <label className="input-checkbox" key={p}>
                <input
                  type="checkbox"
                  name="people"
                  value={p} //checkbox valuesi
                  {...register('people', {
                    validate: validatePeople,
                  })}

                  //onChange={handleCheckboxChange}
                  //checked={formData.people.includes(p)}
                />
                {p}
              </label>
            ))}
          </div>
          <p className="input-error">{errors.people?.message}</p>
        </div>

        <div className="form-line">
          <button className="submit-button" type="submit" disabled={!isValid}>
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
