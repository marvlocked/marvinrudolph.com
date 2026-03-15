import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    react: true,
    ignores: [
      '**/route-tree.gen.ts',
    ],
    rules: {
      // Bug for false-positives
      // See https://github.com/facebook/react/issues/34775
      // @TODO Enable again after it has been fixed
      'react-hooks/refs': 'off',
      // This rule is a bit too annoying. Maybe enable it in the future.
      'react-refresh/only-export-components': 'off',
    },
  },
)
