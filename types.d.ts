declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => void
  }

  interface SVGAnimateElement {
    beginElement?(): void
    endElement?(): void
  }
}

export {}
