import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = Yup.object().shape({
  type: Yup.string().required('Type is required'),
  textInput: Yup.string().when('type', {
    is: 'A', // ตรวจสอบว่า type เป็น A หรือไม่
    then: Yup.string()
      .required('This field is required when type is A')
      .oneOf(['Hello'], 'You must enter "Hello"'),
    otherwise: Yup.string().notRequired(), // หากไม่ใช่ A สามารถไม่กรอกได้
  }),
});

function MyForm() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <select {...field}>
            <option value="">Select Type</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        )}
      />
      <Controller
        name="textInput"
        control={control}
        render={({ field }) => (
          <input type="text" {...field} placeholder="Enter Hello" />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
