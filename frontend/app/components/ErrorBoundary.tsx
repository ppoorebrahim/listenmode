"use client"

import { Component, ReactNode } from "react"

export default class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-red-500 p-4">Something went wrong.</div>
    }

    return this.props.children
  }
}
