# README

`@umijs/max` 模板项目，更多功能参考 [Umi Max 简介](https://next.umijs.org/zh-CN/docs/max/introduce)

[antd 文档地址](https://ant.design/components/overview-cn/)

[ProComponents](https://procomponents.ant.design/docs/intro)

#### 全局安装依赖

`pnpm i lodash -w`

#### 局部安装依赖

`pnpm i tyh-ui2 --filter @`

# version

```
版本号基本是由三位数字组成：
   1   .   0   .   0
[MAJOR].[MINOR].[PATCH]
```

三位数字分别代表不同意思：

MAJOR 进行不兼容的 API 更改时的版本  
MINOR 以向后兼容的方式添加功能时的版本  
PATCH 向后兼容的错误修复程序的版本

```
$ npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]

'npm [-v | --version]' to print npm version
'npm view <pkg> version' to view a package's published version
'npm ls' to inspect current package/dependency versions
```

## prerelease

`npm version prerelease`

package.json 中的版本号 1.0.0 变为 1.0.1-0

## prepatch

`npm version prepatch`  
package.json 中的版本号 1.0.1-1 变为 1.0.2-0

## preminor

`npm version preminor`  
package.json 中的版本号 1.0.2-0 变为 1.1.0-0

## premajor

`npm version premajor`  
package.json 中的版本号 1.1.0-0 变为 2.0.0-0

## patch: 主要目的升级 patch

`npm version patch`  
package.json 中的版本号 2.0.0-0 变为 2.0.0

再次执行 `npm version patch`  
package.json 中的版本号 2.0.0 变为 2.0.1;

---

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中
