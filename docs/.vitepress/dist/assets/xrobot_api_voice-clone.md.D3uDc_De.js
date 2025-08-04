import{_ as s,c as n,o as p,ae as t}from"./chunks/framework.Cd-3tpCq.js";const d=JSON.parse('{"title":"音色克隆API","description":"","frontmatter":{"title":"音色克隆API"},"headers":[],"relativePath":"xrobot/api/voice-clone.md","filePath":"xrobot/api/voice-clone.md","lastUpdated":1754295241000}'),e={name:"xrobot/api/voice-clone.md"};function i(l,a,o,c,r,h){return p(),n("div",null,a[0]||(a[0]=[t(`<h1 id="音色克隆api" tabindex="-1">音色克隆API <a class="header-anchor" href="#音色克隆api" aria-label="Permalink to &quot;音色克隆API&quot;">​</a></h1><h2 id="接口基本信息" tabindex="-1">接口基本信息 <a class="header-anchor" href="#接口基本信息" aria-label="Permalink to &quot;接口基本信息&quot;">​</a></h2><h3 id="baseurl" tabindex="-1">baseUrl <a class="header-anchor" href="#baseurl" aria-label="Permalink to &quot;baseUrl&quot;">​</a></h3><p><a href="https://xrobo.qiniu.com" target="_blank" rel="noreferrer">https://xrobo.qiniu.com</a></p><h3 id="headers" tabindex="-1">Headers <a class="header-anchor" href="#headers" aria-label="Permalink to &quot;Headers&quot;">​</a></h3><p>将<code>&lt;token&gt;</code>替换为账户的 token</p><div class="language-Plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">Plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Authorization: Bearer &lt;token&gt;</span></span>
<span class="line"><span>Content-Type: application/json</span></span></code></pre></div><h3 id="responsebody" tabindex="-1">ResponseBody <a class="header-anchor" href="#responsebody" aria-label="Permalink to &quot;ResponseBody&quot;">​</a></h3><p>code: 当前请求的状态码，成功时为 0，失败时为非 0</p><p>msg: 错误信息，只有在请求失败时才会有值</p><p>reqid: 唯一的请求 ID</p><p>data: 请求实际返回的信息</p><div class="language-Go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">Go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;code&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;int&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;msg&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;reqid&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;data&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">object</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="创建音色栏位" tabindex="-1">创建音色栏位 <a class="header-anchor" href="#创建音色栏位" aria-label="Permalink to &quot;创建音色栏位&quot;">​</a></h2><h3 id="接口路径" tabindex="-1">接口路径 <a class="header-anchor" href="#接口路径" aria-label="Permalink to &quot;接口路径&quot;">​</a></h3><p>POST /v1/voice-clones</p><h3 id="传入参数" tabindex="-1">传入参数 <a class="header-anchor" href="#传入参数" aria-label="Permalink to &quot;传入参数&quot;">​</a></h3><p>model_id: &quot;QN_ACV&quot;</p><h3 id="返回参数" tabindex="-1">返回参数 <a class="header-anchor" href="#返回参数" aria-label="Permalink to &quot;返回参数&quot;">​</a></h3><p>id: 音色的唯一 id</p><p>name: 默认的音色名称，形如&quot;复刻音色-XXXXX&quot;，(XXXXX 为大写字母、小写字母、数字组成的随机字符串)</p><p>language: &quot;&quot;</p><p>demo_url: &quot;&quot;</p><p>state: &quot;Init&quot;</p><div class="language-Plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">Plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>POST /v1/voice-clones</span></span>
<span class="line"><span>Authorization: Bearer &lt;token&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;model_id&quot;: &lt;string&gt;</span><span>  // QN_ACV</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>响应</span></span>
<span class="line"><span>200</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;code&quot;: &lt;int&gt;,</span></span>
<span class="line"><span>    &quot;data&quot;: {</span></span>
<span class="line"><span>        &quot;id&quot; &lt;string&gt;</span><span> // 音色 id</span></span>
<span class="line"><span>        &quot;name&quot;: &lt;string&gt;,</span><span> // 音色名字，默认为&quot;复刻音色-XXXXX&quot;</span></span>
<span class="line"><span>        &quot;language&quot;: &lt;string&gt;,</span><span> // 音色对应语言</span></span>
<span class="line"><span>        &quot;demo_url&quot;: &lt;string&gt;</span><span> // 试听地址</span></span>
<span class="line"><span>        &quot;state&quot;: &lt;string&gt;,</span><span> // 状态，Init/Success/Training/Failed</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="训练音色" tabindex="-1">训练音色 <a class="header-anchor" href="#训练音色" aria-label="Permalink to &quot;训练音色&quot;">​</a></h2><h3 id="接口路径-1" tabindex="-1">接口路径 <a class="header-anchor" href="#接口路径-1" aria-label="Permalink to &quot;接口路径&quot;">​</a></h3><p>PUT /v1/voice-clones/<code>&lt;id&gt;</code></p><h3 id="传入参数-1" tabindex="-1">传入参数 <a class="header-anchor" href="#传入参数-1" aria-label="Permalink to &quot;传入参数&quot;">​</a></h3><p>id: 待训练的音色，id 由&quot;创建音色栏位&quot;接口创建，可以通过&quot;音色列取&quot;接口查看有哪些 id</p><p>key: 可以为&quot;&quot;或者一个合法的音频 url 连接，如果为空则表示只修改 name，不为空则根据 url 对应文件进行训练。</p><p>name: 必填，当前音色的名称，如果填入与原名称不同的字符串，将会更新原音色的名称</p><h3 id="返回参数-1" tabindex="-1">返回参数 <a class="header-anchor" href="#返回参数-1" aria-label="Permalink to &quot;返回参数&quot;">​</a></h3><p>id: 音色的唯一 id</p><p>name: 音色名称</p><p>language: 音色语言</p><p>demo_url: 音色的试听链接</p><p>state: [&quot;Init&quot;, &quot;Success&quot;, &quot;Training&quot;, &quot;Failed&quot;]，表示当前音色的状态，只有处于&quot;Success&quot;状态的音色才可以使用</p><div class="language-Plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">Plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>PUT /v1/voice-clones/&lt;id&gt;</span></span>
<span class="line"><span>Authorization: Bearer &lt;token&gt;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;key&quot;: &lt;string&gt;</span><span> // 可选，如果为空则表示只修改 name，不为空则根据上传的文件进行训练。</span></span>
<span class="line"><span>    &quot;name&quot;: &lt;string&gt;</span><span> // 可选，如果不为空则更新音色名称（限制为20字符以内,汉字/字母/数字都是一个字符）</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>响应</span></span>
<span class="line"><span>200</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;code&quot;: &lt;int&gt;,</span></span>
<span class="line"><span>    &quot;data&quot;: {</span></span>
<span class="line"><span>        &quot;id&quot;: &lt;string&gt;,</span></span>
<span class="line"><span>        &quot;name&quot;: &lt;string&gt;,</span></span>
<span class="line"><span>        &quot;language&quot;: &lt;string&gt;,</span></span>
<span class="line"><span>        &quot;demo_url&quot;: &lt;string&gt;,</span></span>
<span class="line"><span>        &quot;state&quot;: &lt;string&gt;,</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="获取音色" tabindex="-1">获取音色 <a class="header-anchor" href="#获取音色" aria-label="Permalink to &quot;获取音色&quot;">​</a></h2><p>根据 id 获取音色信息</p><h3 id="接口路径-2" tabindex="-1">接口路径 <a class="header-anchor" href="#接口路径-2" aria-label="Permalink to &quot;接口路径&quot;">​</a></h3><p>GET /v1/voice-clones/<code>&lt;id&gt;</code></p><h3 id="传入参数-2" tabindex="-1">传入参数 <a class="header-anchor" href="#传入参数-2" aria-label="Permalink to &quot;传入参数&quot;">​</a></h3><p>id: 待查询的音色</p><h3 id="返回参数-2" tabindex="-1">返回参数 <a class="header-anchor" href="#返回参数-2" aria-label="Permalink to &quot;返回参数&quot;">​</a></h3><p>id: 音色的唯一 id</p><p>name: 音色名称</p><p>language: 音色语言</p><p>demo_url: 音色的试听链接</p><p>state: [&quot;Init&quot;, &quot;Success&quot;, &quot;Training&quot;, &quot;Failed&quot;]，表示当前音色的状态，只有处于&quot;Success&quot;状态的音色才可以使用</p><div class="language-Plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">Plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GET /v1/voice-clones/&lt;id&gt;</span></span>
<span class="line"><span>Authorization: Bearer &lt;token&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>响应</span></span>
<span class="line"><span>200</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;code&quot;: &lt;int&gt;,</span></span>
<span class="line"><span>    &quot;data&quot;: {</span></span>
<span class="line"><span>        &quot;id&quot;: &lt;string&gt;,</span></span>
<span class="line"><span>        &quot;name&quot;: &lt;string&gt;,</span></span>
<span class="line"><span>        &quot;language&quot;: &lt;string&gt;,</span></span>
<span class="line"><span>        &quot;demo_url&quot;: &lt;string&gt;,</span></span>
<span class="line"><span>        &quot;state&quot;: &lt;string&gt;,</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="音色列取" tabindex="-1">音色列取 <a class="header-anchor" href="#音色列取" aria-label="Permalink to &quot;音色列取&quot;">​</a></h2><p>列取当前用户复刻音色</p><h3 id="接口路径-3" tabindex="-1">接口路径 <a class="header-anchor" href="#接口路径-3" aria-label="Permalink to &quot;接口路径&quot;">​</a></h3><p>GET /v1/voice-clones</p><h3 id="返回参数-3" tabindex="-1">返回参数 <a class="header-anchor" href="#返回参数-3" aria-label="Permalink to &quot;返回参数&quot;">​</a></h3><p>id: 音色的唯一 id</p><p>name: 音色名称</p><p>language: 音色语言</p><p>demo_url: 音色的试听链接</p><p>state: [&quot;Init&quot;, &quot;Success&quot;, &quot;Training&quot;, &quot;Failed&quot;]，表示当前音色的状态，只有处于&quot;Success&quot;状态的音色才可以使用</p><div class="language-Plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">Plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GET /v1/voice-clones</span></span>
<span class="line"><span>Authorization: Bearer &lt;token&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>响应</span></span>
<span class="line"><span>200</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;code&quot;: &lt;int&gt;,</span></span>
<span class="line"><span>    &quot;data&quot;: {</span></span>
<span class="line"><span>        &quot;voices&quot;: [</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                &quot;id&quot;: &lt;string&gt;,</span></span>
<span class="line"><span>                &quot;name&quot;: &lt;string&gt;,</span></span>
<span class="line"><span>                &quot;language&quot;: &lt;string&gt;,</span></span>
<span class="line"><span>                &quot;demo_url&quot;: &lt;string&gt;,</span></span>
<span class="line"><span>                &quot;state&quot;: &lt;string&gt;,</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="删除音色" tabindex="-1">删除音色 <a class="header-anchor" href="#删除音色" aria-label="Permalink to &quot;删除音色&quot;">​</a></h2><p>删除用户账户下的指定音色</p><h3 id="接口路径-4" tabindex="-1">接口路径 <a class="header-anchor" href="#接口路径-4" aria-label="Permalink to &quot;接口路径&quot;">​</a></h3><p>DELETE /v1/voice-clones/<code>&lt;id&gt;</code></p><h3 id="传入参数-3" tabindex="-1">传入参数 <a class="header-anchor" href="#传入参数-3" aria-label="Permalink to &quot;传入参数&quot;">​</a></h3><p>id: 待删除的音色 id</p><div class="language-Plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">Plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>DELETE /v1/voice-clones/&lt;id&gt;</span></span>
<span class="line"><span>Authorization: Bearer &lt;token&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>响应</span></span>
<span class="line"><span>200</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;code&quot;: &lt;int&gt;,</span></span>
<span class="line"><span>    &quot;data&quot;: {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,70)]))}const q=s(e,[["render",i]]);export{d as __pageData,q as default};
