# Bin · 个人主页

一个纯静态的单页个人主页,零依赖、零构建步骤,直接托管在 GitHub Pages 上。

## 本地预览

直接双击 `index.html` 即可,或者起一个本地服务器:

```bash
python -m http.server 8000
# 然后打开 http://localhost:8000
```

## 文件结构

| 文件 | 作用 |
| --- | --- |
| `index.html` | 页面内容(结构) |
| `styles.css` | 样式与主题变量 |
| `script.js` | 主题切换、菜单、打字机、滚动动画 |
| `404.html` | 找不到页面时的自定义页面 |
| `favicon.svg` | 网站图标 |

## 怎么改成你自己的

1. **文字内容** —— 都在 `index.html` 里,直接搜索替换即可。重点看这几处:
   - `<h1>` 里的名字
   - `#about` 段的自我介绍
   - `#skills` 里的技能标签
   - `#work` 里的项目卡片(想加项目,复制一整段 `<article class="project">`)
   - `#contact` 里的邮箱和 GitHub 链接
2. **颜色** —— 改 `styles.css` 顶部的 `:root` 变量,`--accent` / `--accent-2` 决定整站配色。
3. **站点信息** —— `index.html` 头部的 `<title>` 和 `meta description` 会显示在搜索结果和分享卡片里。

## 部署

推送到 GitHub 仓库后,在 **Settings → Pages** 里选择
`Source: Deploy from a branch` → `Branch: main` → `/ (root)` 即可。

这个仓库名为 `<用户名>.github.io`,所以站点地址是 `https://<用户名>.github.io/`。
