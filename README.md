# 打包工具

## 拆包流程

主要是值得注意的是cmd中的依赖替换成了数字，需要通过source-map数字对应的路径，找到对应的定义和版本


pack目录
-.packCommon
  - android
    - fake.js
    - bundle.js
    - sourcemap.json
    - meta.json
  - ios
    - fake.js
    - bundle.js
    - sourcemap.json
    - meta.json





最终生成
-.bundles
  - android
    - assets
    - common
      - bundle.js
      - meta.js
      - sourcemap.json
    - index.android.js
  - ios
    - assets
    - common
      - bundle.js
      - meta.js
      - sourcemap.json
    - index.ios.js


