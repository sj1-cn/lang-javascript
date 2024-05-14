import {parser} from "@sj1/lezer-javascript"
import {SyntaxNode} from "@lezer/common"
import {LRLanguage, LanguageSupport, Sublanguage, sublanguageProp, defineLanguageFacet,
        delimitedIndent, flatIndent, continuedIndent, indentNodeProp,
        foldNodeProp, foldInside, syntaxTree} from "@codemirror/language"
import {EditorSelection, Text} from "@codemirror/state"
import {EditorView} from "@codemirror/view"
import {completeFromList, ifNotIn} from "@codemirror/autocomplete"
import {snippets} from "./snippets"
import {localCompletionSource, dontComplete} from "./complete"

/// A language provider based on the [Lezer JavaScript
/// parser](https://github.com/lezer-parser/javascript), extended with
/// highlighting and indentation information.
export const javascriptLanguage = LRLanguage.define({
  name: "javascript",
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        IfStatement: continuedIndent({except: /^\s*({|else\b)/}),
        TryStatement: continuedIndent({except: /^\s*({|catch\b|finally\b)/}),
        LabeledStatement: flatIndent,
        SwitchBody: context => {
          let after = context.textAfter, closed = /^\s*\}/.test(after), isCase = /^\s*(case|default)\b/.test(after)
          return context.baseIndent + (closed ? 0 : isCase ? 1 : 2) * context.unit
        },
        Block: delimitedIndent({closing: "}"}),
        ArrowFunction: cx => cx.baseIndent + cx.unit,
        "TemplateString BlockComment": () => null,
        "Statement Property": continuedIndent({except: /^{/})
      }),
      foldNodeProp.add({
        "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType": foldInside,
        BlockComment(tree) { return {from: tree.from + 2, to: tree.to - 2} }
      })
    ]
  }),
  languageData: {
    closeBrackets: {brackets: ["(", "[", "{", "'", '"', "`"]},
    commentTokens: {line: "//", block: {open: "/*", close: "*/"}},
    indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
    wordChars: "$"
  }
})

let kwCompletion = (name: string) => ({label: name, type: "keyword"})

const keywords = "break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map(kwCompletion)
const typescriptKeywords = keywords.concat(["declare", "implements", "private", "protected", "public"].map(kwCompletion))

/// JavaScript support. Includes [snippet](#lang-javascript.snippets)
/// and local variable completion.
export function javascript(config: {} = {}) {
  let lang = javascriptLanguage
  let completions = snippets.concat(keywords)
  return new LanguageSupport(lang, [
    javascriptLanguage.data.of({
      autocomplete: ifNotIn(dontComplete, completeFromList(completions))
    }),
    javascriptLanguage.data.of({
      autocomplete: localCompletionSource
    }),
    [],
  ])
}


