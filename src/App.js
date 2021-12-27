import React from "react";
import { useForm } from "react-hook-form";
import { deepMap } from "react-children-utilities";
import "./App.css";

function Input({ register, name, ...rest }) {
  return <input {...register(name)} {...rest} />;
}

const Child = () => <Input name="email" />;

function Form({ defaultValues, children, onSubmit }) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  console.log("children1", children);

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {deepMap(children, (child) => {
          console.log("children", children);
          return child.props.name? React.createElement(child.type, {
            ...{
              ...child.props,
              register: methods.register,
              key: child.props.name
            }
          })
        : child;
     })}
      </form>
  );
}

function App() {
  return (
    <div className="App">
      <Form onSubmit={(e) => console.log(e)}>
        <div><Input name="email1" /></div>
        <Input name="email" />
        <Child />
        <button type="submit">submit</button>
      </Form>
    </div>
  );
}

export default App;
