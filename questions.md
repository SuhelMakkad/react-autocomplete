1. What is the difference between Component and PureComponent? Give an example where it might break my app.

- PureComponent will do a shallow comparison of the props and state, and will only re-render if they have changed.
- When an nested object or array is passed to a PureComponent it will re-render the component regardless of the fact that the object or array has not changed. As the reference to the object or array is different on every render.

```jsx
<PureComponentExample
  data={{
    name: "John",
    age: 25,
  }}
/>
```

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

- shouldComponentUpdate is used to decide whether to re-render the component or not. This is done by returning a boolean value by comparing the current props and state with the next props and state. Since shouldComponentUpdate is not aware of the context changes, it will not re-render the component when the context changes if the return value is false.

```jsx
class Component extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    // This component will not re-render when the context changes
    return <div>{this.context.data}</div>;
  }
}
```

3. Describe 3 ways to pass information from a component to its PARENT.

- Callbacks: Pass a function as a prop to the child component and call it from the child component.

```jsx
<ChildComponent setData={setState} />
```

- Context: Use context to pass data through the component tree without having to pass the props down manually at every level.

```jsx
const Context = React.createContext(defaultValue);
<Context.Provider
  value={{
    data,
    setData,
  }}
>
  <ChildComponent />
</Context.Provider>;

// In the child component
const context = React.useContext(Context);
<Context.Consumer>
  <button onClick={context.setData}>click me</button>
</Context.Consumer>;
```

- Refs + useImperativeHandle: Use refs to pass a reference to the child component to the parent component. useImperativeHandle allows the child component to customize the instance value that is exposed to the parent component.

4. Give 2 ways to prevent components from re-rendering.

- shouldComponentUpdate: Implement the shouldComponentUpdate lifecycle method and return false to prevent the component from re-rendering.
- React.memo: Wrap the component with React.memo to prevent re-rendering when the props have not changed.

5. What is a fragment and why do we need it? Give an example where it might break my app.

- Fragments are used to group multiple elements without adding an extra node to the DOM. They allow you to return multiple elements from a component without having to wrap them in a parent element.
- Not sure on when it will break the app.

6. Give 3 examples of the HOC pattern.

- Higher Order Components (HOCs) are functions that take a component and return a new component with additional props or functionality.

- HOC that checks for the authentication

```jsx
const withAuth = (Component) => {
  return (props) => {
    if (isLoggedIn) {
      return <Component {...props} />;
    }

    return <Login />;
  };
};

const AuthComponent = withAuth(Component);
```

- HOC for loading state

```jsx
const withLoadingState = (Component) => {
  return (props) => {
    if (isLoading) {
      return <Loading />;
    }

    return <Component {...props} />;
  };
};

const LoadingComponent = withLoadingState(Component);
```

- HOC for getting the external data

```jsx
const withUserData = (Component) => {
  return (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      fetchData().then((data) => {
        setUser(data);
      });
    }, []);

    return <Component {...props} user={user} />;
  };
};

const UserDataComponent = withUserData(Component);
```

7. What's the difference in handling exceptions in promises, callbacks and async...await?

- With promises: we can use catch to handle the error.

```jsx
fetchData()
  .then((data) => {
    setData(data);
  })
  .catch((error) => {
    setError(error);
  });
```

- With async/await: we can use try/catch to handle the error.

```jsx
try {
  const data = await fetchData();
  setData(data);
} catch (error) {
  setError(error);
}
```

- With callbacks: we can have a error state in the callback function.

```jsx
fetchData((error, data) => {
  if (error) {
    setError(error);
    return;
  }

  setData(data);
});
```

8. How many arguments does setState take and why is it async.

- setState can have two type of arguments

  - update state
  - callback function that will expose the previous state and new state will be the return value.

- setState is async in nature as it is batched with other state updates and will not immediately reflect the new state.

```jsx
setState(count + 1);

setState((prevState) => prevState + 1);
```

9. List the steps needed to migrate a Class to Function Component.

- Replace class with regular functions.
- Use the useState hook to manage the state in function components.
- Use the useEffect hook to replace the lifecycle methods in class components.
- this keyword is not needed
- If context is used, use the useContext hook to access the context values.

10. List a few ways styles can be used with components.

- Inline styles: Use the style attribute to apply inline styles to elements.

```jsx
const styles = {
    fontSize: "1rem"
}

<div style={styles}>Hello</div>
```

- CSS Modules: Create a CSS file with the .module.css extension and import it in the component.

```jsx
import styles from "./styles.module.css";

<div className={styles.container}>Hello</div>;
```

- Styled-components: Use the styled-components library to create styled components.

```jsx
import styled from "styled-components";

const Container = styled.div`
  color: red;
  font-size: 16px;
`;

<Container>Hello</Container>;
```

11. How to render an HTML string coming from the server.

- To set the HTML contents coming from the server we can use the dangerouslySetInnerHTML property to set the innerHTML of an element.

```jsx
<div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
```
