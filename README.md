# 赵涛涛 - 个人学术主页

这是赵涛涛的个人学术主页，发布在 GitHub Pages。主页采用简洁的传统学术网站结构，集中展示学术身份、研究动态、论文和引用文件。

公开主页：

```text
https://zhaotaotao0215-lab.github.io/
```

## 页面内容

- 固定侧栏与学术主页式信息排版
- 研究动态、正式论文链接与引用文件
- 独立的论文详情页、检索词和标准引用数据

## 研究成果

学术索引页：

```text
https://zhaotaotao0215-lab.github.io/research/
```

目前收录三篇英文论文，每篇都有独立页面、DOI、出版社链接、中英文检索摘要、规范主题词以及 BibTeX、RIS 和 JSON 引用数据：

- *Auditing digital-twin acceleration measurements for synthetic-to-real induction motor fault diagnosis*. [DOI](https://doi.org/10.1088/1361-6501/aea0f5)
- *Leader-actuated synchronization-herdability in chaotic networks*. [DOI](https://doi.org/10.1016/j.chaos.2026.119004)
- *Broadcast Herdability of Stochastic Swarm Densities*. [DOI](https://doi.org/10.1016/j.cnsns.2026.110727)

辅助入口：

- [研究主题与中英文关键词](https://zhaotaotao0215-lab.github.io/research/topics/)
- [标准引用与引用文件下载](https://zhaotaotao0215-lab.github.io/research/citations/)

## 项目结构

```text
.
├── index.html        # 学术主页、论文链接与 SEO 元信息
├── academic.css      # 学术主页排版与响应式样式
├── assets/           # 个人头像
├── research/         # 可索引的学术主页、主题索引、论文详情与引用文件
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

- 新增论文：在主页的 Publications 中补充条目，并在 `research/` 中添加独立论文页。
- 更新外链：保持 `target="_blank"` 和 `rel="noopener noreferrer"`。
- 更新主页样式：修改 `academic.css`。

## 维护检查清单

- 公开链接、论文链接和邮箱链接可以正常打开。
- 手机宽度下头像、个人信息和长论文标题不挤压。
- DOI、出版社页面与 BibTeX、RIS、CSL-JSON 文件保持可用。

## 书目信息核对（2026-10-06）

- [CNSNS 出版社条目](https://www.sciencedirect.com/science/article/abs/pii/S1007570426010816)列为 Volume 163, Part 6, November 2026, 110727，已同步主页、论文页及引用文件。
- [CCDC 官方 PDF](https://cmsweb.com.sg/rps2prod/ccdc2026/epro/pdf/SunCIS-31.pdf)印刷页码为 3361–3366，与之前提供的 3318–3323 不一致。主页暂不列页码；正式 IEEE 条目尚未重新核验。题名、作者及会议信息已与[会务官网](https://cmsweb.com.sg/rps2prod/ccdc2026/epro/html/SunCIS-31.html)核对。
- IOP、《控制与决策》和部分 Elsevier 页面访问受限；本次没有确认这些论文新增的卷期、文章号或正式出版状态，保留之前的数据。
- 作者当前机构为青岛大学系统科学研究院，当前兴趣为追逃博弈；论文原有署名及研究主题按其出版记录保留。
