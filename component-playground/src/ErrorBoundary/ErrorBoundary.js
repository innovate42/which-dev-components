// @flow
import * as React from "react"
import * as Sentry from "@sentry/browser"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationTriangle } from "@fortawesome/pro-duotone-svg-icons"

type ErrorProps = {|
  error: Error
|}

class DefaultError extends React.Component<ErrorProps> {
  static defaultProps: ErrorProps

  render() {
    return (
      <div>
        <FontAwesomeIcon icon={faExclamationTriangle} size="lg" color="#F47C24" />
        &nbsp;{this.props.error.message}
        <pre>{this.props.error.stack}</pre>
      </div>
    )
  }
}

DefaultError.defaultProps = {
  error: new Error("No error was provided.")
}

type Props = {|
  children: React.Node,
  ErrorUI: React.ComponentType<ErrorProps>
|}

type State = {
  hasError: boolean,
  error: ?Error
}

export class ErrorBoundary extends React.Component<Props, State> {
  static defaultProps: $Shape<Props>

  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: undefined }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.

    // Add
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error(error.stack)

    // we need to figure out a way of disabling. Maybe a uiError type doesn't send a sentry error
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })
      Sentry.captureException(error)
    })
  }

  render() {
    const { ErrorUI } = this.props
    if (this.state.hasError && this.state.error) {
      return (
        // Note that there seems to be a problem if ErrorUI is not a class component
        <ErrorUI error={this.state.error} />
      )
    }

    return this.props.children
  }
}

ErrorBoundary.defaultProps = {
  ErrorUI: DefaultError
}
