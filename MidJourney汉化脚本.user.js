// ==UserScript==
// @name         MidJourney汉化脚本
// @version      1.0.0
// @updateURL    https://raw.githubusercontent.com/kailous/Rainforest-UserScripts/main/MidJourney汉化脚本.user.js#bypass=true
// @description  汉化MidJourney网站上的文本，并为特定按钮添加样式
// @author       kailous
// @match        https://www.midjourney.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const translations = {
        // 左侧菜单栏
        "Explore": "探索",
        "Create": "创建",
        "Organize": "画廊",
        "Chat": "聊天",
        "General Chaos": "综合讨论",
        "Daily Theme": "每日主题",
        "Newbies": "新手专区",
        "Tasks": "任务",
        "Help": "帮助",
        "Updates": "更新内容",
        "Dark Mode": "暗色模式",
        "Light Mode": "亮色模式",
        "System": "跟随系统",
        "Manage Subscription": "管理订阅",
        "Manage Uploads": "管理上传",
        "Midjourney Discord": "MidJourney 交流群",
        "Log Out": "退出登录",
        "Manage Profile": "管理个人资料",
        "Menu": "菜单",
        // 聊天室
        "Lobby": "大厅",
        "All Images": "所有图片",
        "Your Images": "你的图片",
        "Show other's creations:": "显示他人的创作：",
        "once in progress": "正在进行时",
        "immediately": "即时",
        "once completed": "完成后",
        "auto": "自动",
        "Join Voice Chat": "加入语音聊天",
        // 通用
        "Loading...": "加载中...",
        "Search": "搜索",
        // 参数
        "stylize": "风格化",
        "v": "写实模型",
        "niji": "插画模型",
        "ar": "画幅比例",
        "seed": "种子",
        "iw": "参考图权重",
        "quality": "质量",
        // 工作台
        "Rerun": "重新运行",
        "Use": "使用",
        "Hide": "隐藏",
        "More": "更多",
        "+ use text": "+ 使用文本",
        "Looking for more": "寻找更多",
        "Edit Prompt:": "编辑提示：",
        "Reset Prompt": "重置提示",
        "Submit": "提交",
        "Back": "返回",
        "Close": "关闭",
        "Restore": "恢复",
        "Erase": "擦除",
        "Scale": "缩放",
        "What will you imagine?": "你会创造出什么样的想象？",
        "Select <br>images <br>below": "请选择<br>下方的<br>图片",
        "Choose a file": "选择一个文件",
        "drop it here": "将其拖到这里",
        " to upload": "进行上传",
        // 参数控制台
        "Image Size": "图片尺寸",
        "Portrait": "纵向",
        "Square": "方形",
        "Landscape": "横向",
        "Reset": "重置",
        "Model": "模型",
        "Mode": "模式",
        "Version": "版本",
        "Personalize": "个性化",
        "Standard": "标准",
        "Raw": "原始",
        "On": "开启",
        "Off": "关闭",
        "Aesthetics": "美学",
        "Stylization": "风格化",
        "Weirdness": "怪异度",
        "Variety": "多样性",
        "More Options": "更多选项",
        "Speed": "速度",
        "Relax": "轻松",
        "Fast": "快速",
        "Turbo": "极速",
        // 参数控制台说明
        "Personalize your prompt based on images you've ranked. You can rank images in Tasks. This setting is only available on versions 6 or higher.": "根据你已排名的图像个性化你的提示。你可以在任务中对图像进行排名。此设置仅适用于版本6或更高版本。",
        "Midjourney routinely releases new model versions to improve efficiency, coherency, and quality. The latest model is the default, but each model excels at producing different types of images.": "Midjourney定期发布新模型版本，以提高效率、一致性和质量。最新的模型是默认模型，但每个模型在生成不同类型的图像时都有其擅长之处。",
        "Raw mode replaces the default aesthetic of some Midjourney Model Versions. Using it can help you create more photo-realistic images, cinematic scenes, or cuter characters.": "原始模式替换了一些Midjourney模型版本的默认美学。使用它可以帮助你创建更加照片般真实的图像、电影场景或更可爱的角色。",
        "Influences how varied the images are. High values will produce more unusual and unexpected results and compositions. Lower values have more reliable, repeatable results": "影响图像的多样性。较高的数值会产生更多不寻常和意想不到的结果和构图。较低的数值则会产生更可靠和可重复的结果。",
        "Introduces quirky qualities to your generated images, resulting in unique and unexpected outcomes": "为生成的图像引入古怪的特质，产生独特且意想不到的结果。",
        "Influences how strongly the Midjourney aesthetic is applied. Low stylization values produce images that closely match the prompt but are less artistic. High stylization values create images that are very artistic but less connected to the prompt": "影响Midjourney美学应用的强度。低风格化数值会生成与提示更匹配但艺术性较低的图像。高风格化数值会生成非常艺术但与提示关联较少的图像。",
        "The speed at which the images generate.": "图像生成的速度。",
        "Generates at a slower, variable rate, but won't spend Fast Hours. Not available on the Basic plan": "以较慢的可变速率生成图像，但不会消耗快速小时。基本计划不可用。",
        "The default speed. Generates at a moderate rate and spends Fast Hours": "默认速度。以适中的速率生成图像，并消耗快速小时。",
        "Generates at a much faster rate, but spends twice as many Fast Hours": "以更快的速度生成图像，但消耗两倍的快速小时。",
        // 更多选项
        "Vary Subtle": "轻微变化",
        "Vary Strong": "强烈变化",
        "Copy": "复制",
        "Report": "举报",
        "Download": "下载",
        "Open in Discord": "在Discord中打开",
        "Prompt": "提示",
        "Job ID": "任务ID",
        "Seed": "种子",
        "Image": "图像",
        "Image URL": "图像网址",
        "Confirm report": "确认举报",
        "Like": "喜欢",
        "Vary": "变化",
        "Zoom": "缩放",
        "Expand": "扩展",
        "More": "更多",
        "Use": "使用",
        "Share & Save": "分享与保存",
        "Subtle": "轻微",
        "Strong": "强烈",
        "Creative": "创意",
        "Up": "向上",
        "Down": "向下",
        "Left": "向左",
        "Right": "向右",
        "Editor": "编辑器",
        "Save Image": "保存图像",
        "Copy Image": "复制图像",
        "Copy Image URL": "复制图像网址",
        "Style": "风格",
        // 标签
        "Upscale": "增强质量",
        "Pan": "扩展",
        "Remix": "混合",
        "Vary Region": "区域重绘",
        "Variation": "变体",
        // 时间
        "Yesterday": "昨天",
        "Today": "今天",
        // 浮动标签
        "Use as Style Ref [--sref] (shift for multiple)": "用作风格参考 [–sref]（按住Shift选择多个）",
        "Use as Character Ref [--cref] (shift for multiple)": "用作角色参考 [--cref]（按住Shift选择多个）",
        "Use as Image Prompt (shift for multiple)": "用作图像提示（按住Shift选择多个）",
        "Complete": "完成",
        // 个人资料管理
        "Edit your profile and connected accounts": "编辑您的个人资料和已连接的账户",
        "Connected accounts": "已连接的账户",
        "Connect your Discord or Google accounts to use them to log in to Midjourney. Visit our help site to learn more.": "连接您的 Discord 或 Google 账户以使用它们登录 Midjourney。访问我们的帮助网站以了解更多信息。",
        "Discord": "Discord",
        "Disconnect Discord": "断开 Discord",
        "Google": "Google",
        "Connect Google": "连接 Google",
        "Account details": "账户详情",
        "Email": "电子邮件",
        "Midjourney ID": "Midjourney ID",
        "Terms of Service": "服务条款",
        "Accepted": "已接受",
        // 订阅管理
        "Choose the plan that works for you": "选择适合您的订阅计划",
        "Your": "您的",
        "Standard Plan": "标准计划",
        "ACTIVE": "已激活",
        "Usage Details": "使用详情",
        "Fast Hours": "快速小时",
        "Included": "包含",
        "Rollover": "结转",
        "Bonus": "奖励",
        "Buy more Fast hours": "购买更多快速小时",
        "standard": "标准",
        "Basic": "基础",
        "Pro": "专业",
        "Mega": "超级",
        "Plan Features": "计划功能",
        "Plan": "计划",
        "15h Fast generations": "15小时快速生成",
        "Unlimited Relaxed generations": "无限轻松生成",
        "General commercial terms": "一般商业条款",
        "Access to member gallery": "访问会员画廊",
        "Optional credit top ups": "可选信用充值",
        "3 concurrent fast jobs": "3个并行快速任务",
        "Billing & Payment": "账单与支付",
        "Price": "价格",
        "Billing period": "账单周期",
        "Renewal date": "续订日期",
        "Edit Billing": "编辑账单",
        "View Invoices": "查看发票",
        "Cancel Plan": "取消计划",
        "Change Plan": "更改计划",
        "Yearly Billing": "年度计费",
        "Monthly Billing": "月度计费",
        "Downgrade Plan": "降级计划",
        "Upgrade Plan": "升级计划",
        "View monthly billing": "查看月度账单",
        "Limited generations (~200 / month)": "有限的生成次数（约200次/月）",
        "15h Fast generations": "15小时快速生成",
        "30h Fast generations": "30小时快速生成",
        "Stealth image generation": "隐形图像生成",
        "12 concurrent fast jobs": "12个并行快速任务",
        "Active": "已激活",
        "20% off billed annually": "年度计费享八折优惠",
        "60h Fast generations": "60小时快速生成",
        "/ month": "/月",
        // 常见问题
        "Frequently Asked Questions": "常见问题",
        "Can't find the answer you're looking for?": "找不到您要找的答案？",
        "Read the <a>Quick Start Guide</a>": "阅读快速入门指南",
        "or visit the #member-support channel to ask for help.": "或访问 #member-support 频道寻求帮助。",
        "What are \"Fast Hours\"?": "什么是“快速小时”？",
        "What is unlimited relaxed generation?": "什么是无限轻松生成？",
        "What if I want MORE fast?": "如果我想要更多的快速时间怎么办？",
        "What is the Community Gallery?": "什么是社区画廊？",
        "What if I don't want my images to appear in the Gallery?": "如果我不想让我的图像出现在画廊中怎么办？",
        "How does commercial use work?": "商业用途如何运作？",
        "Can I cancel my subscription plan?": "我可以取消我的订阅计划吗？",
        "Can I upgrade my subscription plan?": "我可以升级我的订阅计划吗？",
        "How can I": "我如何",
        "delete": "删除",
        "my account?": "我的帐户？",
        "Where do I find and manage my survey data?": "我在哪里可以找到和管理我的调查数据？",
        // 错误提示
        "Creation failed": "创建失败",
        "Sorry, while the prompt you entered was deemed safe, the resulting image was detected as having content that might violate our community guidelines and has been blocked. Your account status will not be affected by this.": "抱歉，虽然您输入的提示被认为是安全的，但生成的图片被检测为包含可能违反我们社区准则的内容，因此已被屏蔽。您的帐户状态不会受此影响。",
    };

    const ignoreClasses = {
        // "dark:bg-dark-850": false,
        // "dark:text-dark-400": false
    };

    // 判断元素是否具有忽略的 class
    function hasIgnoredClass(element) {
        for (const className in ignoreClasses) {
            if (element.closest(`.${className.replace(/:/g, '\\:')}`)) {
                return true;
            }
        }
        return false;
    }

    // 动态翻译日期和时间的函数
    function translateDynamicText(text) {
        // 匹配类似“2 days ago”的格式
        if (/(\d+)\s+days?\s+ago/i.test(text)) {
            return text.replace(/(\d+)\s+days?\s+ago/i, '$1天前');
        }

        // 匹配类似“13 Aug 2024”的格式
        if (/(\d+)\s+(\w+)\s+(\d{4})/i.test(text)) {
            const monthNames = {
                "Jan": "1月",
                "Feb": "2月",
                "Mar": "3月",
                "Apr": "4月",
                "May": "5月",
                "Jun": "6月",
                "Jul": "7月",
                "Aug": "8月",
                "Sep": "9月",
                "Oct": "10月",
                "Nov": "11月",
                "Dec": "12月"
            };
            return text.replace(/(\d+)\s+(\w+)\s+(\d{4})/i, (match, day, month, year) => {
                return `${year}年${monthNames[month]}${day}日`;
            });
        }

        return text;
    }

    // 替换文本函数
    function translateText() {
        // 获取所有文本节点
        const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = textNodes.nextNode()) {
            let text = node.nodeValue.trim();

            if (translations[text] && !hasIgnoredClass(node.parentNode)) {
                node.nodeValue = translations[text];
            } else if (/\d+%\s*Complete/.test(text)) {
                // 如果检测到 "35% Complete" 这样的文本，且确保整个文本匹配
                const percentage = text.match(/\d+%/)[0];  // 提取百分比
                const translatedText = `${percentage} 完成`;  // 组合翻译后的文本
                node.nodeValue = translatedText;
            } else {
                // 动态翻译日期和时间
                const translatedText = translateDynamicText(text);
                if (translatedText !== text && !hasIgnoredClass(node.parentNode)) {
                    node.nodeValue = translatedText;
                }
            }
        }
        // 替换所有 placeholder 属性
        const elementsWithPlaceholder = document.querySelectorAll('[placeholder]');
        elementsWithPlaceholder.forEach((element) => {
            const placeholderText = element.getAttribute('placeholder').trim();
            if (translations[placeholderText] && !hasIgnoredClass(element)) {
                element.setAttribute('placeholder', translations[placeholderText]);
            }
        });

        // 处理鼠标悬停时的提示文本翻译
        const titleElements = document.querySelectorAll('button[title]');
        titleElements.forEach((element) => {
            const titleText = element.getAttribute('title').trim();
            if (translations[titleText] && !hasIgnoredClass(element)) {
                element.setAttribute('title', translations[titleText]);
            }
        });

        // 处理特殊情况的文本翻译（如 Upscale 标签）
        const upscaleElements = document.querySelectorAll('span.relative.select-none.inline-block.text-xs.cursor-pointer.font-medium');
        upscaleElements.forEach(element => {
            if (element.textContent.includes('Upscale')) {
                element.innerHTML = element.innerHTML.replace('Upscale', translations['Upscale']);
            }
        });

        // 查找并替换含有 <br> 标签的元素内容，包括 span
        document.querySelectorAll('span, div, p, a').forEach(element => {
            const originalContent = element.innerHTML.trim();

            // 检查是否在翻译字典中，直接使用字典中定义的原始内容作为查找标准
            for (let key in translations) {
                if ((key.includes('<br>') || key.includes('<span>') || key.includes('<a>')) && originalContent === key) {
                    element.innerHTML = translations[key];
                    break;
                }
            }
        });

        // 首先定位到 class="flex flex-row w-full flex-center" 的父级 div 元素
        const parentDiv = document.querySelector('div.flex.flex-row.w-full.flex-center');

        if (parentDiv) {
            // 在 parentDiv 下选择所有符合条件的 div 子元素
            const childDivs = parentDiv.querySelectorAll('div[style="height: 54px; margin-top: 0px;"]');

            // 对每个子 div 元素的 style 属性进行替换
            childDivs.forEach(childDiv => {
                childDiv.setAttribute('style', 'height: 54px; margin-top: 0px; white-space: nowrap;');
            });
        }
    }
    // 观察页面变化并进行翻译
    const observer = new MutationObserver(translateText);
    observer.observe(document.body, { childList: true, subtree: true });

    // 初始翻译
    translateText();
})();
