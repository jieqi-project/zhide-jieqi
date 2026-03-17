# 志德岁时纪·节气上上签
纯前端静态网页，包含两个核心功能：节气抽签与拼贴画板。移动端优先设计（375px 基准），可直接部署到 Vercel。

## 本地预览
- 在项目根目录启动静态服务器（任选一种）：
- Python: `python3 -m http.server 8000`
- Node: `npx serve .`
- 浏览器访问 `http://localhost:8000/`。

## 目录结构
- index.html：入口与两个页面（抽签、拼贴）
- styles.css：移动端样式与布局
- app.js：交互逻辑（摇一摇抽签、贴纸拖拽缩放旋转、保存图片）
- assets/backgrounds：示例底图（SVG）
- assets/stickers：示例贴纸（SVG）

## 部署到 Vercel
- 登录 vercel.com，Import 本仓库
- Framework 选择 “Other”，Root 为 `/`
- 自动部署后获得访问链接（二维码可指向该链接）
- 可选：使用 vercel.json 做缓存与清晰 URL

## 更新方式（每月）
- 在 `assets/backgrounds/` 放入新一套底图，命名如 `2026-03-spring-*.jpg|webp|svg`
- 在 `app.js` 的 `backgrounds` 数组追加路径即可展示
- 在 `fortunes` 中为对应节气填写文案与签别

## 资源规范（建议）
- 底图：JPG/WEBP 宽 ≥ 750px，≤ 200KB；或 SVG
- 贴纸：SVG 100x100px+，透明背景
- UI：按钮/图标优先 SVG

## 版权与隐私
- 本项目不收集数据，用户通过浏览器保存图片到本地
- 资源需确保版权可用

## License
- MIT
