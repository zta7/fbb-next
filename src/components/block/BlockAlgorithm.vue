<script setup>
import * as monaco from 'monaco-editor'
import {
  ref, computed, toRefs, watch, onMounted,
} from 'vue'
import { useBlockStore } from 'stores/block'
import { Algorithm } from 'src/models/Algorithm'

const $block = useBlockStore()

const props = defineProps({
  target: Algorithm,
})
const { target: algorithm } = toRefs(props)
const editorRef = ref(null)
let editor = null
const defaultOptions = {
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 2,
  suggest: {
    filterGraceful: false,
    showKeywords: true,
  },
  'semanticHighlighting.enabled': true,
}

onMounted(() => {
  watch(algorithm, (n) => {
    console.log(n)
    if (!editor) {
      editor = monaco.editor.create(editorRef.value, { ...defaultOptions })
      editor.onDidChangeModelContent(() => {
        algorithm.value.content = editor.getValue()
      })
    }
    editor.setValue(n.content)
  }, { immediate: true })
})

const varTexts = computed(() => [
  ...$block.block.inputs.map((e) => e.label),
  ...$block.block.outputs.map((e) => e.label),
  ...$block.block.internals.map((e) => e.label),
  ...$block.block.temps.map((e) => e.label),
])

let completionDispose; let varSemanticDispose; let
  functionSemanticDispose
const initVars = (language) => {
  if (!language) return
  if (completionDispose) completionDispose.dispose()
  if (varSemanticDispose) varSemanticDispose.dispose()
  if (functionSemanticDispose) functionSemanticDispose.dispose()
  // const functionSnippents = [flatten(this.tree.map((t) => t.children).filter((e) => e))]
  const functionSnippents = []
  const texts = varTexts.value.concat(functionSnippents.map((e) => e.caption))
  if (texts.length > 0) {
    varSemanticDispose = monaco.languages.registerDocumentSemanticTokensProvider(language, {
      getLegend: () => ({
        tokenModifiers: [],
        tokenTypes: ['entity'],
      }),
      provideDocumentSemanticTokens: (model) => {
        const lines = model.getLinesContent()
        const data = []
        let prevLine = 0
        let prevChar = 0
        const regex = new RegExp(`\\b(?:${texts.join(' | ')})\\b`, 'g')
        for (let i = 0; i < lines.length; i += 1) {
          const line = lines[i]
          // eslint-disable-next-line no-cond-assign
          for (let match = null; match = regex.exec(line);) {
            data.push(
              i - prevLine,
              prevLine === i ? match.index - prevChar : match.index,
              match[0].length,
              0,
              0,
            )
            prevLine = i
            prevChar = match.index
          }
        }

        return {
          data: new Uint32Array(data),
          resultId: null,
        }
      },

      // releaseDocumentSemanticTokens: () => {
      // },
    })
  }

  const Vars = varTexts.value.map((s) => ({
    label: s,
    documentation: 'Variable',
    insertText: s,
  }))
  function createDependencyProposals(range) {
    return [
      ...Vars.map((e) => ({
        ...e,
        range,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.KeepWhitespace,
      })),
      ...functionSnippents.map((e) => ({
        label: e.caption,
        insertText: e.snippet,
        documentation: 'snippet',
        range,
        kind: monaco.languages.CompletionItemKind.Function,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      })),
    ]
  }
  this.completionDispose = monaco.languages.registerCompletionItemProvider(language, {
    provideCompletionItems(model, position) {
      const word = model.getWordUntilPosition(position)
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      }
      return {
        suggestions: createDependencyProposals(range),
      }
    },
  })
}
console.log(initVars)

</script>
<template>
  <div class="fit">
    <div
      ref="editorRef"
      class="absolute-full" />
  </div>
</template>
