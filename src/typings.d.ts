/**
 * The `PRISMA_CONFIG` is a global stage specific config file.
 * It is configured in `./config/config.<stage>.js` and imported in
 * `./index.html`.
 */
declare const PRISMA_CONFIG: {
  /**
   * Stage identifier. Can be used in the future (e.g. for logging).
   */
  stage: string;
  /**
   * The URL to our old Angular 1 based frontend.
   */
  oldFrontendUrl: string;
  /**
   * The URL to our old platform APIs.
   */
  oldBackendUrl: string;
  /**
   * The URL to our shipper registration APIs.
   * See https://gitlab.com/prisma-capacity/shipper-registration.
   * Also see https://prisma-capacity.gitlab.io/shipper-registration/:branchName.
   */
  shipperRegistration: string;
  /**
   * The Amplitude API key.
   * See https://help.amplitude.com/hc/en-us/articles/115001361248-JavaScript-SDK-Installation.
   */
  amplitudeKey: string;
};

declare module '!raw-loader!*' {
  const src: string;
  export default src;
}

declare module '!file-loader!*' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.woff2' {
  const src: string;
  export default src;
}

declare module '*.woff' {
  const src: string;
  export default src;
}

declare module 'flatnest';
