import * as Ast from '@unified-latex/unified-latex-types';
import { Plugin as Plugin_2 } from 'unified';
import { Root } from 'xast';
import { VFile } from 'unified-lint-rule/lib';
import { VFile as VFile_2 } from 'vfile';
import { VisitInfo } from '@unified-latex/unified-latex-util-visit';
import * as Xast from 'xast';

/**
 * Attach `renderInfo` needed for converting some macros into their
 * katex equivalents.
 */
export declare function attachNeededRenderInfo(ast: Ast.Ast): void;

/**
 * Convert the `unified-latex` AST `tree` into an HTML string. If you need
 * more precise control or further processing, consider using `unified`
 * directly with the `unifiedLatexToPretext` plugin.
 *
 * For example,
 * ```
 * unified()
 *      .use(unifiedLatexFromString)
 *      .use(unifiedLatexToPretext)
 *      .use(rehypeStringify)
 *      .processSync("\\LaTeX to convert")
 * ```
 */
export declare function convertToPretext(tree: Ast.Node | Ast.Node[], options?: PluginOptions): string;

declare type EnvironmentReplacements = typeof environmentReplacements;

/**
 * Rules for replacing a macro with an html-like macro
 * that will render has pretext when printed.
 */
declare const environmentReplacements: Record<string, (node: Ast.Environment, info: VisitInfo, file?: VFile) => Ast.Node | Ast.Node[]>;

export declare const KATEX_SUPPORT: {
    macros: string[];
    environments: string[];
};

export declare const katexSpecificEnvironmentReplacements: Record<string, (node: Ast.Environment) => Ast.Node | Ast.Node[]>;

export declare const katexSpecificMacroReplacements: Record<string, (node: Ast.Macro) => Ast.Node | Ast.Node[]>;

declare type MacroReplacements = typeof macroReplacements;

declare const macroReplacements: Record<string, (node: Ast.Macro, info: VisitInfo, file?: VFile_2) => Ast.Node>;

export declare type PluginOptions = PluginOptions_2 & {
    /**
     * A boolean where if it's true then the output won't be wrapped in the <pretext><article> ... etc. tags.
     * If it's false (default), a valid and complete PreTeXt document is returned.
     */
    producePretextFragment?: boolean;
};

declare type PluginOptions_2 = {
    /**
     * Functions called to replace environments during processing. Key values should match environment names.
     *  You probably want to use the function `htmlLike(...)` to return a node that gets converted to specific HTML.
     */
    environmentReplacements?: EnvironmentReplacements;
    /**
     * Functions called to replace macros during processing. Key values should match macro names.
     * You probably want to use the function `htmlLike(...)` to return a node that gets converted to specific HTML.
     */
    macroReplacements?: MacroReplacements;
    /**
     * A boolean where if it's true then the output won't be wrapped in the <pretext><article> ... etc. tags.
     * If it's false (default), a valid and complete PreTeXt document is returned.
     */
    producePretextFragment?: boolean;
};

declare type PluginOptions_3 = {
    macrosThatBreakPars?: string[];
    environmentsThatDontBreakPars?: string[];
} | void;

/**
 * Unified plugin to convert a `unified-latex` AST into a `xast` AST representation of PreTeXt source.
 */
export declare const unifiedLatexToPretext: Plugin_2<PluginOptions[], Ast.Root, Xast.Root>;

/**
 * Unified plugin to wrap paragraphs in `\html-tag:p{...}` macros.
 * Because `-` and `:` cannot occur in regular macros, there is no risk of
 * a conflict.
 */
export declare const unifiedLatexWrapPars: Plugin_2<PluginOptions_3[], Ast.Root, Ast.Root>;

/**
 * Wrap paragraphs in `<p>...</p>` tags.
 *
 * Paragraphs are inserted at
 *   * parbreak tokens
 *   * macros listed in `macrosThatBreakPars`
 *   * environments not listed in `environmentsThatDontBreakPars`
 */
export declare function wrapPars(nodes: Ast.Node[], options?: {
    macrosThatBreakPars?: string[];
    environmentsThatDontBreakPars?: string[];
}): Ast.Node[];

/**
 * Unified plugin to convert a `XAST` AST to a string.
 */
export declare const xmlCompilePlugin: Plugin_2<void[], Root, string>;

export { }
