import * as React from 'react';
import './App.css';
import SignIn from '../src/components/pages/login/SignIn';
import SignUp from '../src/components/pages/login/SignUp';
interface State {
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="App">
        <SignIn/>
      </div>
    );
  }
}
export default App;
