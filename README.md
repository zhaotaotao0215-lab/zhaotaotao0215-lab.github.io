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

- 个人简介与研究方向
- 研究论文与期刊/会议筛选
- 教育经历
- 奖项与项目
- 深色/浅色主题切换
- 浏览器打印简历

## 项目结构

```text
.
├── index.html        # 主页内容、SEO 元信息、论文与履历区块
├── styles.css        # 页面视觉、响应式、打印样式
├── script.js         # 主题、论文筛选、打印与导航交互
├── assets/           # 头像等主页资源
├── robots.txt        # 搜索引擎抓取规则
├── sitemap.xml       # 公开主页站点地图
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

- 更新研究方向：修改 `index.html` 中的首屏简介和 `.research-facts`。
- 新增论文：在 `.publication-list` 中复制一段 `article.publication`，设置 `data-category` 和 `data-publication`。
- 新增教育、奖项或项目：在对应区块的 `.chronology` 中添加条目。
- 更新外链：保持 `target="_blank"` 和 `rel="noopener noreferrer"`。
- 更新头像：替换 `assets/avatar.png`，并确认尺寸与清晰度适合网页和分享预览。
- 更新颜色：修改 `styles.css` 顶部的深色与浅色主题变量。

## 维护检查清单

- 公开链接、论文链接和邮箱链接可以正常打开。
- 期刊/会议筛选按钮的状态与论文数量正确。
- 明暗主题切换后文字、边框和头像均清晰。
- 手机宽度下头像、姓名、导航和论文标题不挤压。
- 打印预览为浅色排版，导航和筛选控件不会干扰简历内容。
