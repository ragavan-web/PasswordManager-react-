import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

const PasswordManager = () => {
  const [website, setWebsite] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordsList, setPasswordsList] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)

  const onAddPassword = event => {
    event.preventDefault()
    if (website === '' || username === '' || password === '') {
      return
    }

    const newPassword = {
      id: uuidv4(),
      website,
      username,
      password,
    }

    setPasswordsList(prev => [...prev, newPassword])
    setWebsite('')
    setUsername('')
    setPassword('')
  }

  const onDeletePassword = id => {
    setPasswordsList(prev => prev.filter(each => each.id !== id))
  }

  const filteredPasswords = passwordsList.filter(each =>
    each.website.toLowerCase().includes(searchInput.toLowerCase()),
  )

  return (
    <div className="app-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        alt="app logo"
        className="logo"
      />

      {/* ADD PASSWORD SECTION */}
      <div className="top-container">
        <form className="form-container" onSubmit={onAddPassword}>
          <h1>Add New Password</h1>

          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              alt="website"
            />
            <input
              type="text"
              placeholder="Enter Website"
              value={website}
              onChange={e => setWebsite(e.target.value)}
            />
          </div>

          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              alt="username"
            />
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              alt="password"
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Add</button>
        </form>

        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          alt="password manager"
          className="manager-img"
        />
      </div>

      {/* PASSWORDS LIST SECTION */}
      <div className="bottom-container">
        <div className="header-row">
          <h1>Your Passwords</h1>
          <p>{filteredPasswords.length}</p>

          <div className="search-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
            />
            <input
              type="search"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        <div className="show-container">
          <input
            type="checkbox"
            id="showPasswords"
            checked={showPasswords}
            onChange={() => setShowPasswords(prev => !prev)}
          />
          <label htmlFor="showPasswords">Show passwords</label>
        </div>

        {filteredPasswords.length === 0 ? (
          <div className="no-passwords">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
            />
            <p>No Passwords</p>
          </div>
        ) : (
          <ul>
            {filteredPasswords.map(each => (
              <li key={each.id}>
                <p>{each.website}</p>
                <p>{each.username}</p>
                {showPasswords ? (
                  <p>{each.password}</p>
                ) : (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                    alt="stars"
                  />
                )}
                <button
                  type="button"
                  data-testid="delete"
                  onClick={() => onDeletePassword(each.id)}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                    alt="delete"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default PasswordManager
