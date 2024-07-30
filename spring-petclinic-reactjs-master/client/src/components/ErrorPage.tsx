import * as React from 'react';

interface IError {
  status: string;
  message: string;
}

interface IErrorPageState {
  error?: IError;
}

export default class ErrorPage extends React.Component<{}, IErrorPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/oups')
      .then(response => response.json())
      .then((error: IError) => this.setState({error}))
      .catch(err => console.error('Fetch error:', err)); // Handle fetch errors
  }

  render() {
    const { error } = this.state;

    return (
      <span>
        <img src='/images/pets.png' alt='Pet' />

        <h2>Something happened...</h2>
        {error ? (
          <span>
            <p><b>Status:</b> {error.status}</p>
            <p><b>Message:</b> {error.message}</p>
          </span>
        ) : (
          <p><b>Unknown error</b></p>
        )}
      </span>
    );
  }
}
