import React, { useState, useEffect } from "react"

var jwtDecode = require("jwt-decode")

type Props = {}

const noop = () => undefined

const EndpointDropdown = ({ setEndpoint, endpoint }) => {
  const [dropdown, setDropdown] = useState(false)

  return (
    <li className={`nav-item dropdown  ${dropdown ? "show" : ""}`}>
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded={dropdown}
        onClick={evt => {
          setDropdown(!dropdown)
        }}
      >
        {endpoint}
      </a>
      <div className={`dropdown-menu ${dropdown ? "show" : ""}`} aria-labelledby="navbarDropdown" onClick={evt => evt.preventDefault()}>
        <div className="row">
          <div className="container-fluid">
            <form className="">
              <div className="form-group">
                <label className="">Endpoint</label>
                <input
                  className="form-control"
                  name="endpoint"
                  id="endpoint"
                  type="text"
                  value={endpoint}
                  onChange={evt => {
                    setEndpoint(evt.target.value)
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </li>
  )
}

const LoginDropDown = ({ onSetUser }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [dropdown, setDropdown] = useState(false)
  const [message, setMessage] = useState(null)

  const login = async () => {
    return {}
  }

  return (
    <li className={`nav-item dropdown  ${dropdown ? "show" : ""}`}>
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded={dropdown}
        onClick={evt => {
          setDropdown(!dropdown)
        }}
      >
        {username ? username : "Session"}
      </a>
      <div className={`dropdown-menu ${dropdown ? "show" : ""}`} aria-labelledby="navbarDropdown" onClick={evt => evt.preventDefault()}>
        <div className="row">
          <div className="container-fluid">
            <form className="">
              <div className="form-group">
                <label className="">Username</label>
                <input
                  className="form-control"
                  name="username"
                  id="username"
                  type="text"
                  value={username}
                  onChange={evt => {
                    setUsername(evt.target.value)
                  }}
                />
              </div>
              <div className="form-group">
                <label className="">Password</label>
                <input
                  className="form-control"
                  name="password"
                  id="password"
                  type="password"
                  onChange={evt => {
                    setPassword(evt.target.value)
                  }}
                />
                <br className="" />
              </div>
              {message}
              <button type="submit" id="btnLogin" className="btn btn-success btn-sm" onClick={() => login(username, password)}>
                Login
              </button>

              <button
                type="clear"
                className="btn btn-cancel btn-sm"
                onClick={() => {
                  onSetUser(undefined)
                  setMessage(null)
                }}
              >
                Clear
              </button>
            </form>
          </div>
        </div>
      </div>
    </li>
  )
}

export const Header = ({ children, onSetUser = noop, endpoint, setEndpoint }: Props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Limio Component Playground
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <LoginDropDown onSetUser={onSetUser} />
          <EndpointDropdown endpoint={endpoint} setEndpoint={setEndpoint} />
        </ul>
        <div className="form-inline my-2 my-lg-0">{children}</div>
      </div>
    </nav>
  )
}
