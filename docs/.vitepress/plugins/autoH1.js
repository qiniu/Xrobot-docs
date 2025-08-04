export default (md) => {
  const hasH1 = (content) => /^\s*#\s+.+/m.test(content);

  md.core.ruler.before("normalize", "auto_add_h1", (state) => {
    const { frontmatter } = state.env;
    const src = state.src;
    if (frontmatter?.title && !hasH1(src)) {
      state.src = `# ${frontmatter.title}\n\n` + src;
    }
    return false;
  });
};
