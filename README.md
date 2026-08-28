# 赵涛涛 - 个人简历

这是赵涛涛的个人简历主页，发布在 GitHub Pages。

公开主页：

```text
https://zhaotaotao0215-lab.github.io/
```

## 基本信息

- 姓名：赵涛涛
- 邮箱：2057798834@qq.com
- 学校：青岛大学
- 专业：系统科学
- 研究方向：多智能体系统、博弈控制、随机群体密度、精确可控性、分组编队

## 最新论文

Taotao Zhao, Zhijian Ji, Lanhao Zhao, Linrong Tan,
“Broadcast Herdability of Stochastic Swarm Densities,”
*Communications in Nonlinear Science and Numerical Simulation*, 110727, 2026.
[DOI](https://doi.org/10.1016/j.cnsns.2026.110727)

## 页面内容

- 研究论文
- 项目经历
- 教育经历
- 奖学金

## 项目结构

```text
.
├── index.html        # 主页内容、SEO 元信息、简历时间线
├── styles.css        # 页面视觉、响应式、打印样式
├── script.js         # 搜索、筛选、结果计数交互
├── assets/           # 头像等主页资源
└── nm/               # 课程/专题页面子目录
```

## 本地预览

直接打开 `index.html`，或在当前目录运行：

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

然后访问：

```text
http://127.0.0.1:8765/
```

## 发布方式

本项目保持纯静态结构，不需要构建步骤。推送到 GitHub Pages 对应仓库后，
`index.html` 会作为公开主页入口。

## 内容维护

- 更新研究方向：修改 `index.html` 中侧边栏简介、方向标签和“研究聚焦”文案。
- 新增论文：在 `.timeline` 中复制一段 `details.entry`，设置 `data-type="research"` 和相关 `data-keywords`。
- 新增项目、教育或奖项：分别使用 `data-type="project"`、`education`、`honor`。
- 更新外链：保持 `target="_blank"` 和 `rel="noopener noreferrer"`。
- 更新头像：替换 `assets/avatar.png`，并确认尺寸与清晰度适合网页和分享预览。

## 维护检查清单

- 公开链接、论文链接和邮箱链接可以正常打开。
- 搜索框能匹配标题、来源、正文和关键词。
- 分类筛选按钮的高亮状态与结果数量正确。
- 手机宽度下头像、姓名、筛选按钮和时间线不挤压。
- 打印预览背景清晰，搜索和筛选控件不会干扰简历内容。
