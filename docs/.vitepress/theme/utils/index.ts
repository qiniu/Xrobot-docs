export function apply_prefix(link: string, prefix: string) {
    if (!prefix) return link;
    if (link.startsWith("/") && prefix.endsWith("/")) {
      return prefix.slice(0, -1) + link;
    } else if (!link.startsWith("/") && !prefix.endsWith("/")) {
      return prefix + "/" + link;
    }
    return prefix + link;
  }