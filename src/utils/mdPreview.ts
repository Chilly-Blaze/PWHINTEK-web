/*
 * @Author: ChillyBlaze
 * @Date: 2022-05-25 15:14:43
 * @LastEditTime: 2022-05-25 17:04:36
 * @FilePath: /front-end/src/utils/mdPreview.ts
 * @Description: v-md-editor配置
 */
//@ts-nocheck
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
// 引入你所使用的主题 此处以 github 主题为例
import githubTheme from '@kangc/v-md-editor/lib/theme/github'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index'
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index'
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css'
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'

// highlightjs
import hljs from 'highlight.js'

export default VMdPreview.use(githubTheme, {
	Hljs: hljs,
})
	.use(createLineNumbertPlugin())
	.use(createHighlightLinesPlugin())
	.use(createCopyCodePlugin())
