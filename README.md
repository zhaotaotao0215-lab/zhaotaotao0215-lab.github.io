# GitHub Resume

这是一个可以直接发布到 GitHub Pages 的暗色交互式个人简历网页。

## 使用方式

1. 如需继续修改简历内容，编辑 `index.html`。
2. 如需继续更换头像，替换 `assets/avatar.png`，并保持文件名不变；也可以在 `index.html` 中改成你的图片路径。
3. `styles.css` 控制页面样式，`script.js` 控制筛选和搜索。
4. 在 GitHub 新建一个仓库：
   - 如果想作为个人主页，仓库名用 `你的GitHub用户名.github.io`。
   - 如果想作为项目页面，仓库名可以用 `resume`、`cv` 等。
5. 上传本文件夹里的所有文件到仓库根目录，也就是让 `index.html` 直接出现在仓库首页文件列表中。
6. 在仓库 `Settings -> Pages` 中选择 `Deploy from a branch`，分支选 `main`，目录选 `/ (root)`。

不要把身份证号、家庭住址、手机号等敏感信息放进公开简历仓库。GitHub Pages 发布后网页通常会公开可访问。

发布后，个人主页地址通常是：

```text
https://你的GitHub用户名.github.io/
```

项目页面地址通常是：

```text
https://你的GitHub用户名.github.io/仓库名/
```

## 本地预览

直接双击 `index.html` 即可在浏览器预览。

## 文件结构

```text
github-resume/
  index.html
  styles.css
  script.js
  assets/
    avatar.png
  .nojekyll
  README.md
```
