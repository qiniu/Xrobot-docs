import{_ as s,c as n,o as p,ae as t}from"./chunks/framework.Cd-3tpCq.js";const e="/assets/4.captcha-eg.CJKjNfF9.png",x=JSON.parse('{"title":"用户API","description":"","frontmatter":{"title":"用户API"},"headers":[],"relativePath":"xrobot/api/user.md","filePath":"xrobot/api/user.md","lastUpdated":1754295241000}'),o={name:"xrobot/api/user.md"};function i(l,a,c,u,r,q){return p(),n("div",null,a[0]||(a[0]=[t(`<h1 id="用户api" tabindex="-1">用户API <a class="header-anchor" href="#用户api" aria-label="Permalink to &quot;用户API&quot;">​</a></h1><h2 id="_1-用户注册" tabindex="-1">1. 用户注册 <a class="header-anchor" href="#_1-用户注册" aria-label="Permalink to &quot;1. 用户注册&quot;">​</a></h2><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请求：</span></span>
<span class="line"><span>POST https://xrobo.qiniu.com/xiaozhi/user/register</span></span>
<span class="line"><span>Content-Type: application/json</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>&quot;username&quot;: &quot;&quot;,</span></span>
<span class="line"><span>&quot;password&quot;: &quot;&quot;,</span></span>
<span class="line"><span>&quot;captcha&quot;: &quot;etnjx&quot;, 【下面的方法获取】</span></span>
<span class="line"><span>&quot;mobileCaptcha&quot;: &quot;&quot;, 【否】</span></span>
<span class="line"><span>&quot;captchaId&quot;: &quot;&quot; 【uuid：cfa94872-48b6-425b-8e6a-17b912b6b6f4&quot;】</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>响应：</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>&quot;code&quot;: 0,</span></span>
<span class="line"><span>&quot;msg&quot;: &quot;&quot;,</span></span>
<span class="line"><span>&quot;data&quot;: {}</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 如何获取 captcha</span></span>
<span class="line"><span>GET https://xrobo.qiniu.com/xiaozhi/user/captcha?uuid=cfa94872-48b6-425b-8e6a-17b912b6b6f4 [uuid 随机生成]</span></span></code></pre></div><p>响应： <img src="`+e+`" class="img-center"></p><h2 id="_2-用户登录" tabindex="-1">2. 用户登录 <a class="header-anchor" href="#_2-用户登录" aria-label="Permalink to &quot;2. 用户登录&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>请求：</span></span>
<span class="line"><span>POST https://xrobo.qiniuapi.com/xiaozhi/user/login</span></span>
<span class="line"><span>Content-Type: application/json</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>areaCode: &quot;+86&quot;</span></span>
<span class="line"><span>captcha: &quot;xxxxx&quot;</span></span>
<span class="line"><span>captchaId: &quot;d4224c42-a0a2-4e38-87a5-edc3ad03c014&quot;</span></span>
<span class="line"><span>mobile: &quot;&quot;</span></span>
<span class="line"><span>password: &quot;xxxx&quot;</span></span>
<span class="line"><span>username: &quot;xxx&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>响应：</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>&quot;code&quot;: 0,</span></span>
<span class="line"><span>&quot;msg&quot;: &quot;success&quot;,</span></span>
<span class="line"><span>&quot;data&quot;: {</span></span>
<span class="line"><span>&quot;token&quot;: &quot;4fxxxxxxxxxxxxxxxxxxxxxxx&quot;, 【后续创建 agent 等操作，需要带上 token】</span></span>
<span class="line"><span>&quot;expire&quot;: 43200,</span></span>
<span class="line"><span>&quot;clientHash&quot;: &quot;xxxxxx&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="_3-声音复刻" tabindex="-1">3. 声音复刻 <a class="header-anchor" href="#_3-声音复刻" aria-label="Permalink to &quot;3. 声音复刻&quot;">​</a></h2><p>见 <a href="./voice-clone">声音复刻</a></p>`,9)]))}const h=s(o,[["render",i]]);export{x as __pageData,h as default};
