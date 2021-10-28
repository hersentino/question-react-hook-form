import React from 'react'
import {useForm} from 'react-hook-form'
import './App.css';


function Form({ defaultValues, children, onSubmit }) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, child => {
        return  React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name
              }
            })
       })}
    </form>
  );
}

function Input({ register, name, ...rest }) {
  return <input {...register(name)} {...rest} />;
}

const Child = (props) => {
  console.log('register', props)
  return (
    <Input name='email' register={props.register}/>
  )
}


function App() {
  return (
    <div className="App">
      <Form onSubmit={e => console.log(e)}>
        <Child />
        <button type='submit'>submit</button>
      </Form>
    </div>
  );
}

export default App;
