# 赵涛涛 - 个人故事与学术主页

这是赵涛涛的个人故事与学术主页，发布在 GitHub Pages。页面不再使用传统简历分栏，而是从 2014 年开始，按时间讲述求学、选择、研究和论文背后的经历。

公开主页：

```text
https://zhaotaotao0215-lab.github.io/
```

## 页面内容

- 2014 年至今的七章滚动叙事
- 中考复读、高考、大学与研究生阶段的真实经历
- 大创项目、奖学金和研究选择背后的个人感受
- 论文在故事中的上下文与可点击原文链接
- “广播驱赶性”概念互动
- 深色/浅色阅读主题

## 研究成果

学术索引页：

```text
https://zhaotaotao0215-lab.github.io/research/
```

目前收录三篇英文论文，每篇都有独立页面、DOI、出版社链接、中英文检索摘要以及 BibTeX、RIS 和 JSON 引用数据：

- *Auditing digital-twin acceleration measurements for synthetic-to-real induction motor fault diagnosis*. [DOI](https://doi.org/10.1088/1361-6501/aea0f5)
- *Leader-actuated synchronization-herdability in chaotic networks*. [DOI](https://doi.org/10.1016/j.chaos.2026.119004)
- *Broadcast Herdability of Stochastic Swarm Densities*. [DOI](https://doi.org/10.1016/j.cnsns.2026.110727)

## 项目结构

```text
.
├── index.html        # 故事正文、论文链接与 SEO 元信息
├── styles.css        # 叙事排版、响应式与打印样式
├── script.js         # 阅读进度、章节导航、主题与论文互动
├── assets/           # 头像与故事封面
├── research/         # 可索引的学术主页、论文详情与引用文件
├── publications.bib  # 全部论文的 BibTeX 数据
├── llms.txt          # 面向检索工具的站点索引
├── llms-full.txt     # 机器可读的研究成果摘要
├── robots.txt        # 搜索引擎抓取规则
├── sitemap.xml       # 公开页面站点地图
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

- 新增故事：在 `.story-article` 中添加一个 `section.chapter`，并同步章节目录。
- 新增论文：在正文和 `.paper-index` 中补充链接，并在 `research/` 中添加独立论文页。
- 更新外链：保持 `target="_blank"` 和 `rel="noopener noreferrer"`。
- 更新封面：替换 `assets/story-portrait.jpg`，并确认横向裁切适合桌面和手机。
- 更新颜色：修改 `styles.css` 顶部的深色与浅色主题变量。

## 维护检查清单

- 公开链接、论文链接和邮箱链接可以正常打开。
- 阅读进度和章节目录会随滚动更新。
- 明暗主题切换后正文、边框和互动区域均清晰。
- 手机宽度下封面、章节标题和长论文标题不挤压。
- 点击“发出一次广播”后，散点会向目标位置靠拢。
