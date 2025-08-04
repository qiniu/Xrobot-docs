import{_ as s,c as n,o as p,ae as e}from"./chunks/framework.Cd-3tpCq.js";const r=JSON.parse('{"title":"设备API","description":"","frontmatter":{"title":"设备API"},"headers":[],"relativePath":"xrobot/api/device.md","filePath":"xrobot/api/device.md","lastUpdated":1754295241000}'),t={name:"xrobot/api/device.md"};function i(l,a,o,c,x,d){return p(),n("div",null,a[0]||(a[0]=[e(`<h1 id="设备api" tabindex="-1">设备API <a class="header-anchor" href="#设备api" aria-label="Permalink to &quot;设备API&quot;">​</a></h1><h2 id="_1-设备绑定【设备激活码】" tabindex="-1">1. 设备绑定【设备激活码】 <a class="header-anchor" href="#_1-设备绑定【设备激活码】" aria-label="Permalink to &quot;1. 设备绑定【设备激活码】&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>请求：</span></span>
<span class="line"><span>POST https://xrobo.qiniu.com/xiaozhi/device/bind/dfbea67edc2340708a03084d5b578387/605192 【605192 就是激活码】</span></span>
<span class="line"><span>Content-Type: application/json</span></span>
<span class="line"><span>authorization Bearer 4fxxxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>响应：</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>&quot;code&quot;:0,&quot;msg&quot;:&quot;success&quot;,&quot;data&quot;:null</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="_2-设备绑定【设备-mac-地址】" tabindex="-1">2. 设备绑定【设备 MAC 地址】 <a class="header-anchor" href="#_2-设备绑定【设备-mac-地址】" aria-label="Permalink to &quot;2. 设备绑定【设备 MAC 地址】&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请求：</span></span>
<span class="line"><span>POST https://xrobo.qiniu.com/xiaozhi/device/preregister</span></span>
<span class="line"><span>Content-Type: application/json</span></span>
<span class="line"><span>authorization Bearer 4fxxxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>agent_id: &quot;dfbea67edc2340708a03084d5b578387&quot;</span></span>
<span class="line"><span>mac_addresses: [&quot;0e:8e:18:32:ec:22&quot;] 【设备 mac 地址】</span></span>
<span class="line"><span>serial_numbers: []</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>响应：</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>&quot;success_count&quot;:0,</span></span>
<span class="line"><span>&quot;failed&quot;:[{&quot;value&quot;:&quot;0e:8e:18:32:ec:22&quot;,&quot;reason&quot;:&quot;已存在&quot;}] 【错误响应】</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="_3-解除绑定" tabindex="-1">3. 解除绑定 <a class="header-anchor" href="#_3-解除绑定" aria-label="Permalink to &quot;3. 解除绑定&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请求：</span></span>
<span class="line"><span>POST https://xrobo.qiniu.com/xiaozhi/device/unbind</span></span>
<span class="line"><span>Content-Type: application/json</span></span>
<span class="line"><span>authorization Bearer 4fxxxxxxxxxxxxxxxxxxxxxxx</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>deviceId: &quot;8c:bf:ea:8f:38:28&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>响应：</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>&quot;code&quot;:0,&quot;msg&quot;:&quot;success&quot;,&quot;data&quot;:null</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,7)]))}const h=s(t,[["render",i]]);export{r as __pageData,h as default};
