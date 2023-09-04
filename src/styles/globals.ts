import { css } from "@linaria/core";

export const globals = css`
  /* stylelint-disable-next-line selector-pseudo-class-no-unknown */
  :global() {
    *,
    *::before,
    *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :where([hidden]:not([hidden="until-found"])) {
      display: none !important;
    }

    :where(html) {
      text-size-adjust: none;
      color-scheme: dark light;
    }

    @media (prefers-reduced-motion: no-preference) {
      :where(html:focus-within) {
        scroll-behavior: smooth;
      }
    }

    :where(body) {
      line-height: 1.5;
      font-family: system-ui, sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    :where(input, button, textarea, select) {
      font: inherit;
      color: inherit;
    }

    :where(textarea) {
      resize: vertical;
      resize: block;
    }

    :where(button, label, select, summary, [role="button"], [role="option"]) {
      cursor: pointer;
    }

    :where(:disabled) {
      cursor: not-allowed;
    }

    :where(label:has(> input:disabled), label:has(+ input:disabled)) {
      cursor: not-allowed;
    }

    :where(button) {
      border-style: solid;
    }

    :where(a) {
      color: inherit;
      text-underline-offset: 0.2ex;
    }

    :where(ul, ol) {
      list-style: none;
    }

    :where(img, svg, video, canvas, audio, iframe, embed, object) {
      display: block;
    }

    :where(img, picture, svg) {
      max-inline-size: 100%;
      block-size: auto;
    }

    :where(p, h1, h2, h3, h4, h5, h6) {
      overflow-wrap: break-word;
    }

    :where(h1, h2, h3) {
      line-height: calc(1em + 0.5rem);
    }

    :where(hr) {
      border: none;
      border-block-start: 1px solid;
      color: inherit;
      block-size: 0;
      overflow: visible;
    }

    :where(:focus-visible) {
      outline: 3px solid Highlight;
      outline-offset: 2px;
      scroll-margin-block: 10vh;
    }

    :where(.visually-hidden:not(:focus-within, :active)) {
      clip-path: inset(50%) !important;
      height: 1px !important;
      width: 1px !important;
      overflow: hidden !important;
      position: absolute !important;
      white-space: nowrap !important;
      border: 0 !important;
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    *,
    *::before,
    *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    :where([hidden]:not([hidden="until-found"])) {
      display: none !important;
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    :where(html) {
      text-size-adjust: none;
      color-scheme: dark light;
    }

    @media (prefers-reduced-motion: no-preference) {
      :where(html:focus-within) {
        scroll-behavior: smooth;
      }
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    :where(body) {
      line-height: 1.5;
      font-family: system-ui, sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    :where(input, button, textarea, select) {
      font: inherit;
      color: inherit;
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    :where(textarea) {
      resize: vertical;
      resize: block;
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    :where(button, label, select, summary, [role="button"], [role="option"]) {
      cursor: pointer;
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    :where(:disabled) {
      cursor: not-allowed;
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    :where(label:has(> input:disabled), label:has(+ input:disabled)) {
      cursor: not-allowed;
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    :where(button) {
      border-style: solid;
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    :where(a) {
      color: inherit;
      text-underline-offset: 0.2ex;
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    :where(ul, ol) {
      list-style: none;
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    :where(img, svg, video, canvas, audio, iframe, embed, object) {
      display: block;
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    :where(img, picture, svg) {
      max-inline-size: 100%;
      block-size: auto;
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    :where(p, h1, h2, h3, h4, h5, h6) {
      overflow-wrap: break-word;
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    :where(h1, h2, h3) {
      line-height: calc(1em + 0.5rem);
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    :where(hr) {
      border: none;
      border-block-start: 1px solid;
      color: inherit;
      block-size: 0;
      overflow: visible;
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    :where(:focus-visible) {
      outline: 3px solid Highlight;
      outline-offset: 2px;
      scroll-margin-block: 10vh;
    }

    /* stylelint-disable-next-line no-duplicate-selectors */
    :where(.visually-hidden:not(:focus-within, :active)) {
      clip-path: inset(50%) !important;
      height: 1px !important;
      width: 1px !important;
      overflow: hidden !important;
      position: absolute !important;
      white-space: nowrap !important;
      border: 0 !important;
    }
  }
`;
