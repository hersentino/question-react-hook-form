import React from 'react'
import {useForm, FormProvider} from 'react-hook-form'
import {deepMap, hasComplexChildren} from "react-children-utilities"
import './App.css';


function Input({ register, name }) {
  return <input ref={register(name)} />;
}

const Child = () => {
  return (
    <Input name='email' />
  )
}

const test = (children, methods)=> deepMap(children, (child) => {
  console.log("children", children)

  if (hasComplexChildren(children) === true)
  test(children, methods)

 return React.createElement(child.type, {
     ...{
       ...child.props,
       register: methods.register,
       key: child.props.name
     }
   })
})

function Form({ defaultValues, children, onSubmit }) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;


  console.log("children1", children)

  return (
    <FormProvider {...methods}>
    <form onSubmit={handleSubmit(onSubmit)}>
      {test(children, methods)}
    </form>
    </FormProvider>
  );
}






function App() {
  return (
    <div className="App">
      <Form onSubmit={e => console.log(e)}>
        <div>
          <Input />
        </div>

        <Child />
        <button type='submit'>submit</button>
      </Form>
    </div>
  );
}

export default App;
