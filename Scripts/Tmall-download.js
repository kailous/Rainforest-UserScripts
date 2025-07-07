// ==UserScript==
// @name         天猫产品资源下载器
// @version      3.5.3
// @description  获取天猫商品主图、详情图、SKU图，打包为 zip），文件名为“产品名称 - 图包.zip”自动下载！支持自动滚动加载！
// @author       kailous
// @match        *://*.tmall.com/*
// @grant        none
// @run-at       document-idle
// @require      https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js
// @updateURL    https://raw.githubusercontent.com/kailous/Rainforest-UserScripts/main/Scripts/Tmall-download.js
// ==/UserScript==

(function () {
  'use strict';

  // ✅ 获取产品标题
  function getProductName() {
    const titleNode = document.querySelector('[class*="--mainTitle--"], h1[class*="--mainTitle--"]');
    if (titleNode && titleNode.textContent.trim()) {
      return titleNode.textContent.trim().replace(/[\\\/:*?"<>|]/g, '_');
    }
    const altTitle = document.title.split('-')[0] || '未命名产品';
    return altTitle.trim().replace(/[\\\/:*?"<>|]/g, '_');
  }

  // ✅ 清洗链接为原图
  function extractOriginalImageUrl(url) {
    if (!url || typeof url !== 'string') return null;
    if (url.startsWith('//')) url = 'https:' + url;
    if (!url.startsWith('http')) return null;
    if (url.includes('.gif')) return null;

    const match = url.match(/^(https:\/\/.*?alicdn\.com\/imgextra\/[^"']+?\.(jpg|png|jpeg))/i);
    return match ? match[1] : null;
  }

  // ✅ 主图
  function getMainImageUrls() {
    const imgs = document.querySelectorAll('ul[class*="thumbnail"] li img');
    const urls = [];
    imgs.forEach(img => {
      const src = img.getAttribute('src') || img.getAttribute('data-ks-lazyload') || img.getAttribute('data-src');
      const url = extractOriginalImageUrl(src);
      if (url) urls.push(url);
    });
    return [...new Set(urls)];
  }

  // ✅ 详情图
  function getDetailImageUrls() {
    const imgs = document.querySelectorAll('.descV8-singleImage img');
    const urls = [];
    imgs.forEach(img => {
      const src = img.getAttribute('src') || img.getAttribute('data-src') || img.getAttribute('data-ks-lazyload');
      const url = extractOriginalImageUrl(src);
      if (url) urls.push(url);
    });
    return [...new Set(urls)];
  }

  // ✅ SKU 图（新增）
  function getSkuImageUrls() {
    const imgs = Array.from(document.querySelectorAll('img[class*="--valueItemImg--"]'));
    const urls = imgs
      .map(img => img.src)
      .filter(src => src && src.includes('alicdn.com'))
      .map(src => {
        // 去除缩略后缀（如 _90x90q30.jpg_.webp）
        const clean = src.replace(/_\d+x\d+q\d+\.jpg.*$/, '');
        return clean;
      });
    return Array.from(new Set(urls)); // 去重
  }

  // ✅ 下载并打包所有图片
  async function downloadAllImagesAsZip() {
    const productName = getProductName();
    const zip = new JSZip();

    const mainFolder = zip.folder('主图');
    const detailFolder = zip.folder('详情图');
    const skuFolder = zip.folder('SKU');

    const mainUrls = getMainImageUrls();
    const detailUrls = getDetailImageUrls();
    const skuUrls = getSkuImageUrls();

    const addImagesToZip = async (urls, folder) => {
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          const ext = url.split('.').pop().split('?')[0];
          const filename = `${String(i + 1).padStart(2, '0')}.${ext}`;
          folder.file(filename, blob);
        } catch (err) {
          console.error('❌ 下载失败:', url, err);
        }
      }
    };

    await addImagesToZip(mainUrls, mainFolder);
    await addImagesToZip(detailUrls, detailFolder);
    await addImagesToZip(skuUrls, skuFolder);

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(zipBlob);
    a.download = `${productName} - 图包.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }

  // ✅ 自动滚动到底部以加载所有图片
  function scrollToBottomSlowly() {
    return new Promise(resolve => {
      window.scrollTo({ top: 0, behavior: 'instant' }); // 回到顶部
      let totalScrolled = 0;
      const step = 400;
      const delay = 200;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        totalScrolled += step;
        window.scrollBy(0, step);
        if (totalScrolled >= scrollHeight) {
          clearInterval(timer);
          setTimeout(resolve, 0); // 等待懒加载触发
        }
      }, delay);
    });
  }

// ✅ 按钮点击后滚动并下载
async function scrollAndDownload() {
  const btn = document.getElementById('downloadZipBtn');
  if (!btn) return;
  const span = btn.querySelector('span');
  if (!span) return;

  btn.style.pointerEvents = 'none';
  span.textContent = '加载中...';

  await scrollToBottomSlowly();

  span.textContent = '打包中...';
  await downloadAllImagesAsZip();

  span.textContent = '下载完成';
  btn.style.pointerEvents = 'auto';
}

// ✅ 插入按钮（立即显示，不延迟）
function insertDownloadButton() {
  const actionContainer = document.querySelector('[class*="--LeftButtonListForEmphasize--"]');

  // 创建外层按钮容器
  const btndiv = document.createElement('div');
  btndiv.id = 'downloadZipBtn';
  btndiv.className = 'xM6AVLCbLn--btnItem--_994489b';
  btndiv.style = `
    background: linear-gradient(90deg, rgb(0, 180, 0), rgb(0, 150, 0));
    padding: 0 16px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `;
  btndiv.onclick = scrollAndDownload;

  // 创建文字内容
  const btnText = document.createElement('span');
  btnText.textContent = '下载资源';
  btnText.className = 'xM6AVLCbLn--title--_0efde0e';
  btnText.style = `
    font-size: 16px;
    font-weight: bold;
    color: rgb(255, 255, 255);
    line-height: 24px;
  `;

  btndiv.appendChild(btnText);

  // 插入按钮到指定容器中（第 2 个位置），否则兜底插入 body
  if (actionContainer && actionContainer.children.length >= 1) {
    actionContainer.insertBefore(btndiv, actionContainer.children[1]);
  } else if (actionContainer) {
    actionContainer.appendChild(btndiv);
  } else {
    console.warn('⚠️ 未找到 actionContainer，插入到 body');
    document.body.appendChild(btndiv);
  }
}

  window.addEventListener('load', () => {
    insertDownloadButton(); // 不再延迟插入
  });

})();
