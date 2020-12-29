import path from 'path';
import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import tslint from "rollup-plugin-tslint"
import postcss from 'rollup-plugin-postcss'
import clear from 'rollup-plugin-clear'
import {DEFAULT_EXTENSIONS} from '@babel/core';
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

const rootPath = path.resolve(__dirname)
    , defaults = {compilerOptions: {declaration: true}}
    , override = {compilerOptions: {declaration: false}}


, createPrefixConfig = ()=>({
    //  入口
    input: {
        index: 'src/main.tsx',
    },
    //  出口
    output: {
        format: 'cjs',  //  common js 模块格式
        dir:path.join(path.resolve(__dirname),'dist'),
        sourceMap: true,
        experimentalCodeSplitting: true,
        name:'[filename]',
        exports: "auto",
    },
    // 是否开启代码分割
    // 将模块视为外部模块，不会打包在库中
    // external: id => external.some(e => id.indexOf(e) === 0),
    // 文件监听
    watch: {
        include: 'src/**',
        clearScreen: true
    },
    plugins: [
        clear({
            targets: ['dist', 'build']
        }),
        typescript({
            module:'ESNext',
            include: [
                "*.ts+(|x)",
                "**/*.ts+(|x)"
            ],
            exclude: [ "*.d.ts", "**/*.d.ts" ],
            tsconfigDefaults: defaults,
            tsconfig: "tsconfig.json",
            tsconfigOverride: override
        }),
        postcss(),
        tslint({
            throwOnError: true,
            throwOnWarning: true,
            include: ['src/**/*.ts', 'src/**/*.tsx'],
            exclude: ['node_modules/**', '*.js', '*.scss', '*.css'],
        }),

        babel({
            exclude: 'node_modules/**', // 只编译源代码
            runtimeHelpers: true,
            extensions: [
                ...DEFAULT_EXTENSIONS,
                '.ts',
                '.tsx'
            ]
        }),
        resolve({browser:true}),
        commonjs({ include: /node_modules/ }),
    ]
}) , entries = ['src/main.tsx','src/popup/index.tsx']

export default entries.map(item=>Object.assign(createPrefixConfig(), {
    input: {
        index: item,
    },}))

// export default createModuleConfig;
