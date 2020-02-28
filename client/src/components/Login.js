import React from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";
import { Pack } from '@potion/layout';
import { Svg, Circle } from "@potion/element";

class Login extends React.Component{
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", this.state.credentials)
      .then(res => {
        console.log("login response", res);
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/bubbles");
      })
      .catch(err =>
        console.log(
          "login error",
          err)
      );
  };
render(){
  return (
    <div className='formParent'>
        <form onSubmit={this.login}>
          <h1>Welcome to the Bubble App!</h1>
          <h2>Sign In</h2>
          <input
            style={{width: "460px"}}
            type="text"
            name="username"
            placeholder="Enter Your Username Here"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            style={{width: "460px"}}
            type="password"
            name="password"
            placeholder="Enter Your Password Here"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button style={{width: "464px"}}>Log in</button>
        </form>
        <h3> Add some color to the bubbles!</h3>
        <Svg width={400} height={400}>
      <Pack
        data={{
          children: [
            { value: 1, key: '1' },
            { value: 2, key: '2' },
            { value: 3, key: '3' },
          ],
        }}
        sum={datum => datum.value}
        size={[400, 400]}
        includeRoot={false}
        nodeEnter={d => ({ ...d, r: 0 })}
        animate
      >{nodes => nodes.map(({ x, y, r, key }) => (
        <Circle
          key={key}
          cx={x}
          cy={y}
          r={r}
          fill="lightgray"
        />
      ))}</Pack>
    </Svg>
    
     </div>

    );
  }
};

export default Login;
