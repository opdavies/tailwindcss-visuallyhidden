const _ = require('lodash')
const cssMatcher = require('jest-matcher-css')
const defaultConfig = require('tailwindcss/defaultConfig')
const plugin = require('./index')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

const generatePluginCss = (options = {}) => {
  return postcss(
    tailwindcss({
      corePlugins: disableCorePlugins(),
      plugins: [plugin(options)]
    })
  )
  .process('@tailwind utilities;', {
    from: undefined
  })
  .then(result => {
    return result.css
  })
};

const disableCorePlugins = () => {
  return _.mapValues(defaultConfig.variants, plugin => {
    return false
  })
}

expect.extend({
  toMatchCss: cssMatcher
})

test('it generates the visually hidden class', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`
      .visuallyhidden {
        border: 0;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
        white-space: nowrap;
      }

      .not-visuallyhidden {
        clip: auto;
        clip-path: none;
        height: auto;
        margin: auto;
        overflow: auto;
        position: relative;
        width: auto;
        white-space: normal;
      }

      .visuallyhidden.focusable:active {
        clip: auto;
        clip-path: none;
        height: auto;
        margin: 0;
        overflow: visible;
        position: static;
        width: auto;
        white-space: inherit;
      }

      .visuallyhidden.focusable:focus {
        clip: auto;
        clip-path: none;
        height: auto;
        margin: 0;
        overflow: visible;
        position: static;
        width: auto;
        white-space: inherit;
      }
    `)
  })
})

test('it generates the visually hidden class with variants', () => {
  return generatePluginCss({ variants: ['hover', 'focus'] }).then(css => {
    expect(css).toMatchCss(`
      .visuallyhidden {
        border: 0;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
        white-space: nowrap;
      }

      .not-visuallyhidden {
        clip: auto;
        clip-path: none;
        height: auto;
        margin: auto;
        overflow: auto;
        position: relative;
        width: auto;
        white-space: normal;
      }

      .visuallyhidden.focusable:active {
        clip: auto;
        clip-path: none;
        height: auto;
        margin: 0;
        overflow: visible;
        position: static;
        width: auto;
        white-space: inherit;
      }

      .visuallyhidden.focusable:focus {
        clip: auto;
        clip-path: none;
        height: auto;
        margin: 0;
        overflow: visible;
        position: static;
        width: auto;
        white-space: inherit;
      }

      .hover\\:visuallyhidden:hover {
        border: 0;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
        white-space: nowrap;
      }

      .hover\\:not-visuallyhidden:hover {
        clip: auto;
        clip-path: none;
        height: auto;
        margin: auto;
        overflow: auto;
        position: relative;
        width: auto;
        white-space: normal;
      }

      .hover\\:focusable:hover {
        clip: auto;
        clip-path: none;
        height: auto;
        margin: 0;
        overflow: visible;
        position: static;
        width: auto;
        white-space: inherit;
      }

      .hover\\:focusable:hover {
        clip: auto;
        clip-path: none;
        height: auto;
        margin: 0;
        overflow: visible;
        position: static;
        width: auto;
        white-space: inherit;
      }

      .focus\\:visuallyhidden:focus {
        border: 0;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
        white-space: nowrap;
      }

      .focus\\:not-visuallyhidden:focus {
        clip: auto;
        clip-path: none;
        height: auto;
        margin: auto;
        overflow: auto;
        position: relative;
        width: auto;
        white-space: normal;
      }

      .focus\\:focusable:focus {
        clip: auto;
        clip-path: none;
        height: auto;
        margin: 0;
        overflow: visible;
        position: static;
        width: auto;
        white-space: inherit;
      }

      .focus\\:focusable:focus {
        clip: auto;
        clip-path: none;
        height: auto;
        margin: 0;
        overflow: visible;
        position: static;
        width: auto;
        white-space: inherit;
      }
    `)
  })
})
