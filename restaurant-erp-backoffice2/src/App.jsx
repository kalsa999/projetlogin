import { useState } from 'react'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

const initialForms = {
  register: {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  },
  login: {
    email: '',
    password: '',
  },
}

const initialPasswordForm = {
  current_password: '',
  password: '',
  password_confirmation: '',
}

const modeContent = {
  register: {
    title: 'Creer un compte',
    subtitle: 'Inscription client via React et Laravel.',
    endpoint: '/api/register',
    submitLabel: "S'inscrire",
    loadingLabel: 'Creation en cours...',
    successMessage: (data) => `Compte cree pour ${data.user.name}.`,
  },
  login: {
    title: 'Se connecter',
    subtitle: 'Connexion rapide avec email et mot de passe.',
    endpoint: '/api/login',
    submitLabel: 'Se connecter',
    loadingLabel: 'Connexion en cours...',
    successMessage: (data) => `Connexion reussie. Bonjour ${data.user.name}.`,
  },
}

function App() {
  const [mode, setMode] = useState('register')
  const [forms, setForms] = useState(initialForms)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [passwordForm, setPasswordForm] = useState(initialPasswordForm)
  const [passwordErrors, setPasswordErrors] = useState({})
  const [passwordStatus, setPasswordStatus] = useState({ type: '', message: '' })
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  const currentContent = modeContent[mode]
  const currentForm = forms[mode]

  function switchMode(nextMode) {
    setMode(nextMode)
    setErrors({})
    setStatus({ type: '', message: '' })
  }

  function handleChange(event) {
    const { name, value } = event.target

    setForms((current) => ({
      ...current,
      [mode]: {
        ...current[mode],
        [name]: value,
      },
    }))
  }

  function handlePasswordChange(event) {
    const { name, value } = event.target

    setPasswordForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch(`${API_BASE_URL}${currentContent.endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(currentForm),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrors(data.errors ?? {})
        setStatus({
          type: 'error',
          message:
            data.message ??
            (mode === 'login'
              ? 'La connexion a echoue.'
              : "L'inscription a echoue."),
        })
        return
      }

      setStatus({
        type: 'success',
        message: currentContent.successMessage(data),
      })

      setForms((current) => ({
        ...current,
        [mode]: initialForms[mode],
      }))

      if (mode === 'login') {
        setCurrentUser(data.user)
        setPasswordStatus({ type: '', message: '' })
        setPasswordErrors({})
        setPasswordForm(initialPasswordForm)
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          "Impossible de joindre l'API. Verifie que le backend Laravel tourne sur http://localhost:8000.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handlePasswordSubmit(event) {
    event.preventDefault()
    setIsUpdatingPassword(true)
    setPasswordErrors({})
    setPasswordStatus({ type: '', message: '' })

    try {
      const response = await fetch(`${API_BASE_URL}/api/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: currentUser.email,
          ...passwordForm,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setPasswordErrors(data.errors ?? {})
        setPasswordStatus({
          type: 'error',
          message: data.message ?? 'La mise a jour du mot de passe a echoue.',
        })
        return
      }

      setPasswordForm(initialPasswordForm)
      setPasswordStatus({
        type: 'success',
        message: data.message ?? 'Mot de passe mis a jour.',
      })
    } catch (error) {
      setPasswordStatus({
        type: 'error',
        message: "Impossible de joindre l'API pour changer le mot de passe.",
      })
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  function handleLogout() {
    setCurrentUser(null)
    setMode('login')
    setStatus({ type: '', message: '' })
    setErrors({})
    setPasswordForm(initialPasswordForm)
    setPasswordErrors({})
    setPasswordStatus({ type: '', message: '' })
  }

  if (currentUser) {
    return (
      <main className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow eyebrow-dark">Session active</p>
            <h1 className="dashboard-title">Page vide</h1>
            <p className="dashboard-copy">
              Connecte en tant que {currentUser.name} ({currentUser.email})
            </p>
          </div>
          <button type="button" className="ghost-button" onClick={handleLogout}>
            Se deconnecter
          </button>
        </header>

        <section className="blank-stage" />

        <section className="password-panel">
          <div className="password-card">
            <h2>Changer le mot de passe</h2>
            <p className="password-copy">
              Renseigne d'abord le mot de passe actuel, puis choisis le nouveau.
            </p>

            <form className="register-form" onSubmit={handlePasswordSubmit}>
              <div className="field">
                <label htmlFor="current_password">Mot de passe actuel</label>
                <input
                  id="current_password"
                  name="current_password"
                  type="password"
                  value={passwordForm.current_password}
                  onChange={handlePasswordChange}
                  autoComplete="current-password"
                  required
                />
                {passwordErrors.current_password && (
                  <p className="field-error">{passwordErrors.current_password[0]}</p>
                )}
              </div>

              <div className="field">
                <label htmlFor="new_password">Nouveau mot de passe</label>
                <input
                  id="new_password"
                  name="password"
                  type="password"
                  value={passwordForm.password}
                  onChange={handlePasswordChange}
                  autoComplete="new-password"
                  required
                />
                {passwordErrors.password && (
                  <p className="field-error">{passwordErrors.password[0]}</p>
                )}
              </div>

              <div className="field">
                <label htmlFor="new_password_confirmation">Confirmation</label>
                <input
                  id="new_password_confirmation"
                  name="password_confirmation"
                  type="password"
                  value={passwordForm.password_confirmation}
                  onChange={handlePasswordChange}
                  autoComplete="new-password"
                  required
                />
              </div>

              <button
                className="submit-button"
                type="submit"
                disabled={isUpdatingPassword}
              >
                {isUpdatingPassword
                  ? 'Mise a jour en cours...'
                  : 'Mettre a jour le mot de passe'}
              </button>

              {passwordStatus.message && (
                <p className={`status-message status-${passwordStatus.type}`}>
                  {passwordStatus.message}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <p className="eyebrow">Restaurant ERP</p>
        <h1>{currentContent.title}</h1>
        <p className="hero-copy">{currentContent.subtitle}</p>

        <div className="hero-card">
          <span className="hero-dot" />
          <div>
            <strong>Endpoint backend</strong>
            <p>{API_BASE_URL}{currentContent.endpoint}</p>
          </div>
        </div>
      </section>

      <section className="form-panel">
        <div className="auth-card">
          <div className="mode-switcher">
            <button
              type="button"
              className={`mode-button ${mode === 'login' ? 'is-active' : ''}`}
              onClick={() => switchMode('login')}
            >
              Connexion
            </button>
            <button
              type="button"
              className={`mode-button ${mode === 'register' ? 'is-active' : ''}`}
              onClick={() => switchMode('register')}
            >
              Inscription
            </button>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className="field">
                <label htmlFor="name">Nom complet</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={currentForm.name}
                  onChange={handleChange}
                  placeholder="Khalid Mokhtari"
                  autoComplete="name"
                  required
                />
                {errors.name && <p className="field-error">{errors.name[0]}</p>}
              </div>
            )}

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={currentForm.email}
                onChange={handleChange}
                placeholder="khalid@email.com"
                autoComplete="email"
                required
              />
              {errors.email && <p className="field-error">{errors.email[0]}</p>}
            </div>

            <div className="field">
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                value={currentForm.password}
                onChange={handleChange}
                placeholder={
                  mode === 'login' ? 'Ton mot de passe' : 'Au moins 8 caracteres'
                }
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                required
              />
              {errors.password && <p className="field-error">{errors.password[0]}</p>}
            </div>

            {mode === 'register' && (
              <div className="field">
                <label htmlFor="password_confirmation">Confirmation</label>
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  value={currentForm.password_confirmation}
                  onChange={handleChange}
                  placeholder="Retape le mot de passe"
                  autoComplete="new-password"
                  required
                />
              </div>
            )}

            <button className="submit-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? currentContent.loadingLabel : currentContent.submitLabel}
            </button>

            {status.message && (
              <p className={`status-message status-${status.type}`}>
                {status.message}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  )
}

export default App
