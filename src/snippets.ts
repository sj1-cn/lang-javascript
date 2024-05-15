import {Completion, snippetCompletion as snip} from "@codemirror/autocomplete"

/// A collection of JavaScript-related
/// [snippets](#autocomplete.snippet).
export const snippets: readonly Completion[] = [
  snip("function ${name}(${params}) {\n\t${}\n}", {
    label: "function",
    detail: "definition",
    type: "keyword"
  }),
  snip("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n\t${}\n}", {
    label: "for",
    detail: "loop",
    type: "keyword"
  }),
  snip("for (let ${name} of ${collection}) {\n\t${}\n}", {
    label: "for",
    detail: "of loop",
    type: "keyword"
  }),
  snip("do {\n\t${}\n} while (${})", {
    label: "do",
    detail: "loop",
    type: "keyword"
  }),
  snip("while (${}) {\n\t${}\n}", {
    label: "while",
    detail: "loop",
    type: "keyword"
  }),
  snip("try {\n\t${}\n} catch (${error}) {\n\t${}\n}", {
    label: "try",
    detail: "/ catch block",
    type: "keyword"
  }),
  snip("if (${}) {\n\t${}\n}", {
    label: "if",
    detail: "block",
    type: "keyword"
  }),
  snip("if (${}) {\n\t${}\n} else {\n\t${}\n}", {
    label: "if",
    detail: "/ else block",
    type: "keyword"
  }),
  snip("module ${module};{\n\t${}\n}", {
    label: "module",
    detail: "default",
    type: "keyword"
  }),
  snip("type ${name} extends ${type};", {
    label: "type",
    detail: "definition",
    type: "keyword"
  }),
  snip("dict ${name} {\n\t${}\n}", {
    label: "dict",
    detail: "definition",
    type: "keyword"
  }),
  snip("entity ${name} extends ${type};", {
    label: "entity",
    detail: "definition",
    type: "keyword"
  }),
  snip("transcation ${name} extends ${type};", {
    label: "transcation",
    detail: "definition",
    type: "keyword"
  }),
  snip("relationship ${name} <${leftType} - ${rightType}> ${type};", {
    label: "relationship",
    detail: "definition",
    type: "keyword"
  })
]