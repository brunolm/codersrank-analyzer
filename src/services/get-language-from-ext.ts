const getMap = (extensions: string[], languageName: string) => {
  return {
    ...extensions.reduce((obj, ext) => {
      obj[ext] = languageName

      return obj
    }, {}),
  }
}

const map = {
  ...getMap(['bsl', 'os'], '1C Enterprise'),
  ...getMap(['asm'], 'Assembly'),
  ...getMap(['bat'], 'Batchfile'),
  ...getMap(['c'], 'C'),
  ...getMap(['cpp', 'cxx'], 'C++'),
  ...getMap(['cs'], 'C#'),
  ...getMap(['css'], 'CSS'),
  ...getMap(['clj'], 'Clojure'),
  ...getMap(['cbl', 'cob', 'cpy'], 'COBOL'),
  ...getMap(['coffee'], 'CoffeeScript'),
  ...getMap(['cr'], 'Crystal'),
  ...getMap(['dart'], 'Dart'),
  ...getMap(['groovy', 'gvy', 'gy', 'gsh'], 'Groovy'),
  ...getMap(['cshtml'], 'HTML+Razor'),
  ...getMap(['ex', 'exs'], 'Elixir'),
  ...getMap(['elm'], 'Elm'),
  ...getMap(['erb'], 'ERB'),
  ...getMap(['erl', 'hrl'], 'Erlang'),
  ...getMap(['fs', 'fsi', 'fsx', 'fsscript'], 'F#'),
  ...getMap(['f90', 'f95', 'f03', 'f08', 'for'], 'Fortran'),
  ...getMap(['go'], 'Go'),
  ...getMap(['lhs', 'lhs'], 'Haskell'),
  ...getMap(['html', 'htm'], 'HTML'),
  ...getMap(['json'], 'JSON'),
  ...getMap(['java'], 'Java'),
  ...getMap(['js', 'jsx'], 'JavaScript'),
  ...getMap(['ipynb'], 'Jupyter Notebook'),
  ...getMap(['kt', 'kts'], 'Kotlin'),
  ...getMap(['less'], 'Less'),
  ...getMap(['liquid'], 'Liquid'),
  ...getMap(['lua'], 'Lua'),
  ...getMap(['m'], 'MATLAB'),
  ...getMap(['mm'], 'Objective-C'),
  ...getMap(['p', 'ab', 'w', 'i', 'x', 'cls'], 'OpenEdge ABL'),
  ...getMap(['pl'], 'Perl'),
  ...getMap(['php'], 'PHP'),
  ...getMap(['pks', 'pkb'], 'PLSQL'),
  ...getMap(['proto'], 'Protocol Buffer'),
  ...getMap(['ps1', 'psm1'], 'Powershell'),
  ...getMap(['py'], 'Python'),
  ...getMap(['r'], 'R'),
  ...getMap(['rb'], 'Ruby'),
  ...getMap(['rs'], 'Rust'),
  ...getMap(['scala'], 'Scala'),
  ...getMap(['sass'], 'SASS'),
  ...getMap(['scss'], 'SCSS'),
  ...getMap(['sh'], 'Shell'),
  ...getMap(['st'], 'Smalltalk'),
  ...getMap(['styl'], 'Stylus'),
  ...getMap(['svelte'], 'Svelte'),
  ...getMap(['swift'], 'Swift'),
  ...getMap(['ts', 'tsx'], 'TypeScript'),
  ...getMap(['vue'], 'Vue'),
}

export const getLanguageFromExt = (ext = '') => {
  const key = ext.replace(/^[.]/, '').toLowerCase()

  return map[key] || ''
}
